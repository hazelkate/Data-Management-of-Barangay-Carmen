<template>
    <v-card
    class="card"
    outlined
    elevation="1"
    
    >
        <v-card-text
        class="container">
          <v-data-table
            :headers="headers"
            :items="summon"
            sort-by="name"
            :search="search"
            show-expand
          >
          <template v-slot:item.createdAt="{ item }">
              {{ item.createdAt | format_time }}
            </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              Respondent: {{item.attributes.respondent.attributes.firstname}} {{item.attributes.respondent.attributes.middlename}} {{item.attributes.respondent.attributes.lastname}}
            </td>
          </template>

            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title>
                  <v-text-field
                  filled
                  rounded
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
                  class="mt-5"
                  v-model="search"
                  />
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      depressed
                      rounded
                      icon
                    >
                      <v-icon>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>

                        <v-select
                        v-model="editedItem.complainant"
                        filled
                        rounded
                        :items="users"
                        label="Complainant"
                        item-value="id"
                        item-text="name"
                        :disabled="editedIndex != -1"
                        >

                          <template v-slot:selection="{ item }">
                            {{item.attributes.firstname}} {{item.attributes.middlename}} {{item.attributes.lastname}}
                          </template>

                          <template v-slot:item="{ item }">
                            {{item.attributes.firstname}} {{item.attributes.middlename}} {{item.attributes.lastname}}
                          </template>

                        </v-select>

                      
                        <v-text-field
                          v-model="editedItem.complain"
                          filled
                          rounded
                          label="Complain"
                        />

                       <v-combobox
                        v-model="editedItem.status"
                        filled
                        rounded
                        :items="status"
                        label="Status"
                        >
                        </v-combobox>

                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn
                color="primary"
                @click="init"
              >
                Reset
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
    </v-card>
</template>
<script>
  import moment from 'moment'
  import Moralis from 'moralis'
  export default {
    data: () => ({

      dialog: false,
      dialogDelete: false,

      dupplicate: false,

      search: '',

      users:[],

      activeObj: [],

      status:[
        'Inprocess',
        'Proccess',
        'Done',
        'Reject',
      ],



      headers: [
        { text: 'ID',          value: 'id' },
        { text: 'FirstName', value: 'attributes.complainant.attributes.firstname' },
        { text: 'MiddleName', value: 'attributes.complainant.attributes.middlename' },
        { text: 'LastName', value: 'attributes.complainant.attributes.lastname' },
        { text: 'Complain', value: 'attributes.complain' },
        { text: 'Date', value: 'createdAt' },
        { text: 'Status', value: 'attributes.status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      summon: [],
      editedIndex: -1,

      editedItem: {
        complainant: '',
        complain: '',
        status: ''
      },

      defaultItem: {
        complainant: '',
        complain: '',
        status: ''
      },

    }),

    computed: {

      formTitle () {
        return this.editedIndex === -1 ? 'New Data' : 'Edit Data'
      },
      

    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    mounted () {

      this.init()

      this.loadResident()


      this.initSocket()

    },

    methods: {


      async createData (){
        
        this.dupplicate = false; //Initialize Search in DB

        let resident = this.users.find(o => o.id === this.editedItem.complainant)
        let status = this.editedItem.status
        let complain = this.editedItem.complain
        let respondent = Moralis.User.current()

        const Summon = Moralis.Object.extend("Summon");
        const query = new Moralis.Query(Summon);
        const summon = new Summon();
        query.equalTo("complainant", resident);
        const results = await query.find();
        console.log(results);
        if(results.length != 0){

          for(const find in results){
            if(results[find].attributes.status != "Done"){
              this.dupplicate = true;
              break;
            }
          }

          if(this.dupplicate == false){
            await summon.save({
              complainant: resident,
              complain: complain,
              respondent: respondent,
              status: status
            })
            .then((success) => {

              const Notification = Moralis.Object.extend("Notification");
              const notification = new Notification();
              notification.set("content", "Added a summon data");
              notification.set("notifiedby", Moralis.User.current())
              notification.save();


              this.$store.dispatch('snackbar/setSnackbar', {
                text : "Successfuly created",
                color : 'primary'
              });

              return success;

            }, (error) => {

              this.$store.dispatch('snackbar/setSnackbar', {
                text : error.message,
                color : 'error'
              });
            });
          }else{
            this.$store.dispatch('snackbar/setSnackbar', {
                text : "Cannot add data due to pending summon",
                color : 'error',
                icon: 'mdi-alert-circle-outline'
            });
          }

        }else{
          await summon.save({
              complainant: resident,
              complain: complain,
              respondent: respondent,
              status: status
            })
            .then((success) => {

              const Notification = Moralis.Object.extend("Notification");
              const notification = new Notification();
              notification.set("content", "Added a summon data");
              notification.set("notifiedby", Moralis.User.current())
              notification.save();


              this.$store.dispatch('snackbar/setSnackbar', {
                text : "Successfuly created",
                color : 'primary'
              });

              return success;

            }, (error) => {

              this.$store.dispatch('snackbar/setSnackbar', {
                text : error.message,
                color : 'error'
              });
            });
        }
      },

      async loadResident (){
        const Resident = Moralis.Object.extend("Resident");
        const query = new Moralis.Query(Resident);
        const results = await query.find();
        this.users =  results.reverse();
      },

      async init (){
        const response = await Moralis.Cloud.run("getSummon");
        this.summon =  response.reverse();
      },


      async initSocket() {
        let query = new Moralis.Query('Summon');
        let subscription = await query.subscribe();


        subscription.on('create', (object) => {
          this.summon.unshift(object);
          this.$store.dispatch('snackbar/setSnackbar', {
            text : "New data appeared",
            color : 'purple'
          });
        });

        subscription.on('update', (object) => {
          this.$store.dispatch('snackbar/setSnackbar', {
            text : object.attributes.responsible.get('username') + " updated a data",
            color : 'purple'
          });
          console.log(object);
        });

        subscription.on('delete', (object) => {
          this.$store.dispatch('snackbar/setSnackbar', {
            text : "Data with id of '" +object.id + "' has been deleted",
            color : 'purple'
          });
          this.summon.splice(this.editedIndex, 1)
          this.closeDelete()
        });

      },

      async updateData (){

        let status = this.editedItem.status
        let complain = this.editedItem.complain
        let respondent = Moralis.User.current()

        const ActiveObj = this.activeObj;
        await ActiveObj.save({
          complain: complain,
          respondent: respondent,
          status: status
        })
        .then((success) => {

          this.$store.dispatch('snackbar/setSnackbar', {
            text : "Successfuly updated",
            color : 'warning'
          });

          return success;

        }, (error) => {

          this.$store.dispatch('snackbar/setSnackbar', {
            text : error.message,
            color : 'error'
          });

        });
      },

      async deleteData (obj){
        const Vaccine = this.activeObj;
        Vaccine.unset(obj);
        await Vaccine.destroy();

        this.$store.dispatch('snackbar/setSnackbar', {
            text : "Successfuly deleted",
            color : 'primary'
        });
      },

      editItem (item) {
        this.activeObj = item;
        this.editedIndex = this.summon.indexOf(item)
        this.editedItem = Object.assign({}, item.attributes)
        console.log(this.editedItem)
        this.dialog = true
      },

      deleteItem (item) {
        this.activeObj = item
        this.editedIndex = this.summon.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.deleteData(this.activeObj);
      },

      close () {
        this.activeObj = []
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save (){
        if (this.editedIndex > -1) {
          this.updateData()
        } else {
          this.createData()
        }
        this.close()
      },
    },

    filters:{
      format_time : function (time) {
        return moment(time).format('lll');;
      }
    }
  }
</script>


<style scoped>
.card {
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
}
</style> 