<template>
  <div>

    <v-overlay :value="user.get('role') != 'Admin' ? true : false">
      You dont have access
    </v-overlay>
    <v-card
    class="card"
    outlined
    elevation="1"
    >
        <v-card-text
        class="container">
          <v-data-table
            :headers="headers"
            :items="resident"
            sort-by="name"
            :search="search"
            show-expand
          >



          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              Last Login: {{item.updatedAt}}
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
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>

                        <v-text-field
                        v-model="editedItem.firstname"
                        filled
                        rounded
                        label="First Name"
                        >
                        </v-text-field>

                        <v-text-field
                        v-model="editedItem.middlename"
                        filled
                        rounded
                        label="Middle Name"
                        >
                        </v-text-field>
                        
                        <v-text-field
                        v-model="editedItem.lastname"
                        filled
                        rounded
                        label="Last Name"
                        >
                        </v-text-field>

                        <v-text-field
                        v-model="editedItem.username"
                        filled
                        rounded
                        disabled
                        label="Username"
                        >
                        </v-text-field>

                        <v-text-field
                        v-model="editedItem.email"
                        filled
                        rounded
                        label="Email"
                        >
                        </v-text-field>


                        <v-text-field
                        v-model="editedItem.contactnumber"
                        filled
                        rounded
                        label="Contact Number"
                        >
                        </v-text-field>

                        <v-select
                        v-model="editedItem.role"
                        filled
                        rounded
                        :items="role"
                        label="Role"
                        >
                        </v-select>

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
                @click="init()"
              >
                Reset
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
    </v-card>
  </div>
</template>
<script>
  import moment from 'moment'
  import Moralis from 'moralis';
  import { mapState } from 'vuex'
  export default {
    data: () => ({
      activeObj: [],
      dialog: false,
      dialogDelete: false,

      search: '',

      headers: [
        { text: 'FirstName', value: 'attributes.user.attributes.firstname' },
        { text: 'MiddleName', value: 'attributes.user.attributes.middlename' },
        { text: 'LastName', value: 'attributes.user.attributes.lastname' },
        { text: 'Email', value: 'attributes.user.attributes.email' },
      ],
      resident: [],
      editedIndex: -1,
      
      editedItem: {
        firstname:'',
        middlename:'',
        lastname:'',
        username:'',
        email:'',
        contactnumber:'',
        role:''
      },

      defaultItem: {
        firstname:'',
        middlename:'',
        lastname:'',
        username:'',
        email:'',
        contactnumber:'',
        role:''
      },

      role:[
          'Staff',
          'ZoneLeader',
          'Summon',
          'Blotter',
          'Lupon',
          'Incident',
          'Admin'
      ],
    }),


    

    computed: {
      
      ...mapState(['user']),

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
      this.init(); //loads resident data

      this.initSocket();
    },

    methods: {


      async initSocket() {
        let query = new Moralis.Query('User');
        let subscription = await query.subscribe();


        subscription.on('create', (object) => {
          this.resident.unshift(object);
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
          this.resident.splice(this.editedIndex, 1)
          this.closeDelete()
        });

      },

      async init (){
        const response = await Moralis.Cloud.run("getRecentLogins");
        this.resident =  response;
      },

      async updateData (){
        const resident = this.activeObj;
        await resident.save({
          firstname: this.editedItem.firstname,
          middlename: this.editedItem.middlename,
          lastname: this.editedItem.lastname,
          email: this.editedItem.email,
          contactnumber: this.editedItem.contactnumber
        })
        .then((resident) => {
n 
          this.$store.dispatch('snackbar/setSnackbar', {
            text : "Successfuly updated",
            color : 'warning'
          });

          return resident;

        }, (error) => {

          this.$store.dispatch('snackbar/setSnackbar', {
            text : error.message,
            color : 'error'
          });

        });
      },

      async deleteData (obj){
        const resident = this.activeObj;
        resident.unset(obj);
        await resident.destroy();

        this.$store.dispatch('snackbar/setSnackbar', {
            text : "Successfuly deleted",
            color : 'primary'
        });
      },

       

      editItem (item) {
        this.activeObj = item;
        this.editedIndex = this.resident.indexOf(item)
        this.editedItem = Object.assign({}, item.attributes)
        console.log(this.editedItem)
        this.dialog = true
      },

      deleteItem (item) {
        this.activeObj = item;
        this.editedIndex = this.resident.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.deleteData(this.activeObj)
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

      save () {
        if (this.editedIndex > -1) {

          this.updateData()

        } else {
          this.createData();
        }
        this.close()
      },
    },

    filters:{


      format_time : function (time) {
        return moment(time).startOf('hour').fromNow(); 
      },
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