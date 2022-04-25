<template>
  <div>
  <v-overlay :value="user.get('role') != 'Admin' ? true : false">
    You dont have access
  </v-overlay>
  <v-stepper
    v-model="e6"
    vertical
  >
    <v-stepper-step
      :complete="e6 > 1"
      step="1"
    >
      Personal Information
    </v-stepper-step>

    <v-stepper-content step="1">
      <!-- Firstname, Middlename, Lastname -->
      <v-card
        outlined
        class="mb-12"
      >


      <v-card-title class="caption">
        👍Fill out required fields
      </v-card-title>
      
      <v-card-text class="pa-5">

          
          <v-file-input
            accept="image/*"
            label="Profilepic"
            hint="provide an image (PNG, JPG, or GIF)"
            show-size
            prepend-icon="mdi-camera"
            v-model="account.profilepic"
            filled
            rounded
            class="mt-2"
          ></v-file-input>

        <v-text-field
        filled
        rounded
        label="Firstname"
        class="my-2"
        v-model="account.firstname"
        />

        <v-text-field
        filled
        rounded
        label="Midlename"
        class="my-2"
        v-model="account.middlename"
        />
        
        <v-text-field
        filled
        rounded
        label="Lastname"
        class="my-2"
        v-model="account.lastname"
        />
        
      </v-card-text>
      
      </v-card>


      <v-btn
        color="primary"
        :disabled="personalInfo"
        @click="e6 = 2"
      >
        Continue
      </v-btn>

    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
    >
      Email and contact number
    </v-stepper-step>

    <v-stepper-content step="2">
      <!-- Email, Contact Number -->
      <v-card
        outlined
        class="mb-12"
      >


      <v-card-title class="caption">
        👍Fill out required fields
      </v-card-title>
      
      <v-card-text class="pa-5">
        
        <v-text-field
        filled
        rounded
        label="Email Address"
        class="my-2"
        v-model="account.email"
        type="email"
        />

        <v-text-field
        filled
        rounded
        label="Contact Number"
        class="my-2"
        v-model="account.contact"
        />
        
      </v-card-text>
      
      </v-card>
      <v-btn
        color="primary"
        @click="e6 = 3"
        :disabled="contactInfo"
      >
        Continue
      </v-btn>
      <v-btn
      @click="e6 = 1"
      text>
        Return
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 3"
      step="3"
    >
      Account credential
    </v-stepper-step>

    <v-stepper-content step="3">
     <!-- Username, Password -->
      <v-card
        outlined
        class="mb-12"
      >


      <v-card-title class="caption">
        👍Fill out required fields
      </v-card-title>
      
      <v-card-text class="pa-5">
        
        <v-text-field
        filled
        rounded
        label="Username"
        class="my-2"
        v-model="account.username"
        />

        <v-text-field
        filled
        rounded
        label="Password"
        class="my-2"
        v-model="account.password"
        />
        
      </v-card-text>
      
      </v-card>
      <v-btn
        color="primary"
        @click="e6 = 4"
        :disabled="accountInfo"
      >
        Continue
      </v-btn>
      <v-btn
        @click="e6 = 2"
        text
      >
        Return
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">
      Role
    </v-stepper-step>
    <v-stepper-content step="4">
      <!-- Role -->
      <v-card
        outlined
        class="mb-12"
      >


      <v-card-title class="caption">
        👍Fill out required fields
      </v-card-title>
      
      <v-card-text class="pa-5">
        
        <v-select
        filled
        rounded
        label="Account Role"
        :items="role"
        class="my-2"
        v-model="account.role"
        />
        
      </v-card-text>
      
      </v-card>
      <v-btn
        color="primary"
        :disabled="roleInfo"
        @click.once="create()"
        :loading="attempt"
      >
        Create Account
      </v-btn>
      <v-btn
        @click="e6 = 3"
        text
      >
        Return
      </v-btn>
    </v-stepper-content>
  </v-stepper>
  </div>
</template>


<script>
  import Moralis from 'moralis';
  import { mapState } from 'vuex';
  export default {
    data () {
      return {
        e6: 1,

        url: null,
        image: null,

        attempt: false,

        account:{

          firstname: '',
          middlename: '',
          lastname: '',


          email: '',
          contact: '',

          username: '',
          password: '',

          role: '',

          profilepic: ''

          
        },

        role:[
          'Staff',
          'ZoneLeader',
          'Summon',
          'Blotter',
          'Lupon',
          'Incident'
        ]
      }
    },

    methods: {
      async create (){
        this.attempt = true
        const profilepic = new Moralis.File(this.account.profilepic.name, this.account.profilepic);
        const user = new Moralis.User();
        user.set("profilepic", profilepic);
        user.set("firstname", this.account.firstname);
        user.set("middlename", this.account.middlename);
        user.set("lastname", this.account.lastname);
        user.set("username", this.account.username);
        user.set("password", this.account.password);
        user.set("email", this.account.email);
        user.set("contactnumber", this.account.contact);
        user.set("role", this.account.role);

        try {
          await user.signUp();
          this.$store.dispatch('snackbar/setSnackbar', {
              text : "Account successfuly registered",
              color : 'success'
          });
        } catch (error) {
          this.$store.dispatch('snackbar/setSnackbar', {
              text : error.message,
              color : 'error'
          });
        }
        this.attempt = false;
      },

      Preview_image() {
        return this.url = this.image != null ?  URL.createObjectURL(this.image) : null
      },
    },

    computed:{

      ...mapState(['user']),

      personalInfo : function (){
        return this.account.profilepic == '' || this.account.firstname == '' || this.account.middlename == '' || this.account.lastname == '' ? true : false;
      },

      contactInfo : function (){
        return this.account.email == '' || this.account.contact == '' ? true : false;
      },

      accountInfo : function (){
        return this.account.username == '' || this.account.password == '' ? true : false;
      },

      roleInfo : function (){
        return this.account.role == '' ? true : false;
      }
      
    },

  
  }
</script>


