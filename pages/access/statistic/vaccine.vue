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
            :items="vaccination"
            sort-by="name"
            :search="search"
          >

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
                        v-model="editedItem.resident"
                        filled
                        rounded
                        :items="users"
                        label="Name"
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

                       <v-combobox
                        v-model="editedItem.vaccine"
                        filled
                        rounded
                        :items="vaccine_status"
                        label="Vaccine"
                        persistent-hint
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

      duplicateVaccine: false,

      search: '',

      users:[],

      activeObj: [],

      vaccine_status:[
        'Anti Tetanus',
        'Covid Vaccine',
        'Small Pox',
        'MMR Vaccine',
      ],



      headers: [
        { text: 'FirstName', value: 'attributes.resident.attributes.firstname' },
        { text: 'MiddleName', value: 'attributes.resident.attributes.middlename' },
        { text: 'LastName', value: 'attributes.resident.attributes.lastname' },
        { text: 'Vaccine', value: 'attributes.vaccine' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      vaccination: [],
      editedIndex: -1,

      editedItem: {
        resident: '',
        vaccine: ''
      },

      defaultItem: {
        resident: '',
        vaccine: ''
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
        
        this.duplicateVaccine = false; //Initialize Search in DB

        let resident = this.users.find(o => o.id === this.editedItem.resident)
        let vaccineDetail = this.editedItem.vaccine

        const Vaccination = Moralis.Object.extend("Vaccination");
        const query = new Moralis.Query(Vaccination);
        const vaccination = new Vaccination();
        query.equalTo("resident", resident);
        const results = await query.find();
        if(results.length != 0){

          for(const vaccines in results){
            if(results[vaccines].attributes.vaccine == vaccineDetail){
              this.duplicateVaccine = true;
              break;
            }
          }

          if(this.duplicateVaccine == false){
            await vaccination.save({
              resident: resident,
              vaccine: vaccineDetail,
              responsible: Moralis.User.current()
            })
            .then((vaccine) => {

              const Notification = Moralis.Object.extend("Notification");
              const notification = new Notification();
              notification.set("content", "Added a vaccination data");
              notification.set("notifiedby", Moralis.User.current())
              notification.save();


              this.$store.dispatch('snackbar/setSnackbar', {
                text : "Successfuly created",
                color : 'primary'
              });

              return resident;

            }, (error) => {

              this.$store.dispatch('snackbar/setSnackbar', {
                text : error.message,
                color : 'error'
              });
            });
          }else{
            this.$store.dispatch('snackbar/setSnackbar', {
                text : "Cannot add data due to duplicate vaccine",
                color : 'error',
                icon: 'mdi-alert-circle-outline'
            });
          }

        }else{
          await vaccination.save({
              resident: resident,
              vaccine: vaccineDetail,
              responsible: Moralis.User.current()
            })
            .then((vaccine) => {

              const Notification = Moralis.Object.extend("Notification");
              const notification = new Notification();
              notification.set("content", "Added a vaccination data");
              notification.set("notifiedby", Moralis.User.current())
              notification.save();


              this.$store.dispatch('snackbar/setSnackbar', {
                text : "Successfuly created",
                color : 'primary'
              });

              return resident;

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
        const Vaccination = Moralis.Object.extend("Vaccination");
        const query = new Moralis.Query(Vaccination);
        const results = await query.find();
        this.vaccination =  results.reverse();
      },


      async initSocket() {
        let query = new Moralis.Query('Vaccination');
        let subscription = await query.subscribe();


        subscription.on('create', (object) => {
          this.vaccination.unshift(object);
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
          this.vaccination.splice(this.editedIndex, 1)
          this.closeDelete()
        });

      },

      async updateData (){
        let vaccineDetail = this.editedItem.vaccine
        const Vaccine = this.activeObj;
        await Vaccine.save({
          vaccine: vaccineDetail,
          responsible: Moralis.User.current()
        })
        .then((zone) => {

          this.$store.dispatch('snackbar/setSnackbar', {
            text : "Successfuly updated",
            color : 'warning'
          });

          return zone;

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
        this.editedIndex = this.vaccination.indexOf(item)
        this.editedItem = Object.assign({}, item.attributes)
        console.log(this.editedItem)
        this.dialog = true
      },

      deleteItem (item) {
        this.activeObj = item
        this.editedIndex = this.vaccination.indexOf(item)
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
          console.log(this.editedItem.vaccine)
        }
        this.close()
      },
    },

    filters:{
      format_time : function (time) {
        return moment(time).fromNow(); 
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