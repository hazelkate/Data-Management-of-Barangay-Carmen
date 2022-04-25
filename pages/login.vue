<template>
    <div class="d-flex justify-center center-screen container">
        
        <v-card
        height="450"
        width="500"
        class="card pa-7"
        >
            <v-card-title class="mt-5 d-flex justify-center logofont">
                Barangay Carmen
            </v-card-title>

            <v-card-text class="container mt-5">

                <v-text-field
                v-model="username"
                filled
                rounded
                label="Username"
                type="text"
                color="primary"
                class="caption"
                prepend-inner-icon="mdi-account-circle"
                />

                <v-text-field
                v-model="password"
                filled
                rounded
                label="Password"
                class="input-group--focused caption"
                @click:append="show = !show"
                prepend-inner-icon="mdi-lock"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="show ? 'text' : 'password'"
                />

                <v-btn
                block
                x-large
                rounded
                depressed
                style="text-transform:none;"
                color="primary"
                class="overline"
                @click="authorize()"
                :disabled="loginCheck"
                :loading="init"
                >
                    Login
                </v-btn>

            </v-card-text>
            
        </v-card>
    </div>
</template>

<script>
    import Moralis from 'moralis'
    import { mapState,mapActions } from 'vuex'
    export default {
        layout: 'create',

        middleware: 'is_loggedin',


        data() {
            return {
                init:false,
                username: '',
                password: '',
                show:false,
                rules: {
                    required: value => !!value || 'Required.',
                    emailMatch: () => (`The email and password you entered don't match`),
                },
            }
        },

        computed: {
            loginCheck : function (){
                return this.username != '' && this.password != ''  ? false : true
            },
            ...mapState(['user'])
        },

        methods: {

            ...mapActions(['loggedin']),

            async authorize () {

                this.init = true;

                try {
                    const user = await Moralis.User.logIn(this.username, this.password, { usePost: true });
                 

                    this.$store.commit('authorize_loggin', user)

                    this.$store.dispatch('snackbar/setSnackbar', {
                        text :  "Login Success",
                        color : 'success',
                        icon: 'mdi-lock-open'
                    });

                    this.$router.push('/access/statistic/overview')
                    // this.role(this.user.get('role'));

                    
                } catch (error) {
                    
                    console.log(error.message)
                    this.$store.dispatch('snackbar/setSnackbar', {
                        text :  error.message,
                        color : 'error',
                        icon: 'mdi-account-alert'
                    });
                }

                this.init = false
                
            },

            role : function (role){

                switch(role){
                    case "Admin" || "Staff":
                        this.$router.push('/access/statistic/overview')
                        break;
                }
                
            }
        },

        mounted(){
            this.loggedin()
        },
    }
</script>

<style lang="scss" scoped>
.card {
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
}
.center-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;700&family=Permanent+Marker&display=swap');
.logofont{
font-family: 'Kalam', cursive;
font-family: 'Permanent Marker', cursive;
}
</style>
