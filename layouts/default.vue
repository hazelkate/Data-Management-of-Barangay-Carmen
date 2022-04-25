<template>
  <v-app style="background-color: #F8F5F1;">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
    >
                  <v-list shaped>
                    <v-list-group
                        color="#343F56"
                        v-for="item in items"
                        :key="item.title"
                        v-model="item.active"
                        :prepend-icon="item.action"
                        no-action
                    >
                        <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" ></v-list-item-title>
                        </v-list-item-content>
                        </template>

                        <v-list-item
                            class="mt-1"
                            v-for="child in item.items"
                            :key="child.title"
                            :to="child.link"
                        >
                        <v-list-item-content>
                            <v-list-item-title v-text="child.title" class="caption"></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>






    </v-navigation-drawer>

    
    <v-app-bar
      clipped-left
      app
      color="#333333"
      flat
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      
      <v-toolbar-title v-text="title" class="overline" />
      

      <v-spacer></v-spacer>

      
        <v-menu
          v-if="user.length != 0"

          transition="slide-y-transition"
          bottom
          content-class="my-menu"
          
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
                <v-badge
                v-if="notification.count != 0"
                color="#F05454"
                :content="notification.count"
                overlap
                left
                bordered

                >
                  <v-icon
                  >
                    mdi-bell-ring
                  </v-icon>
                </v-badge>

                <v-icon
                v-if="notification.count == 0"
                >
                  mdi-bell
                </v-icon>
            </v-btn>
          </template>
          <v-list v-if="notification.length != 0">

            <v-list-item
              v-for="(notif,key) in notification.results"
              :key="key"
            >
                <v-list-item-icon>
                <v-avatar
                size="30"
                >
                  <img
                  :lazy-src="notif.get('notifiedby').get('profilepic')._url"
                  :src="notif.get('notifiedby').get('profilepic')._url"
                  >
                </v-avatar>
              </v-list-item-icon>
              <v-list-item-content>
              <v-list-item-title>{{notif.get('content')}}</v-list-item-title>
              <v-list-item-subtitle>{{notif.get('notifiedby').get('firstname')}}&nbsp;{{notif.get('notifiedby').get('lastname')}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

          </v-list>
        </v-menu>

        
      

      <v-menu
      v-if="user.length != 0"
      transition="slide-y-transition"
      bottom
      content-class="my-menu elevation-1"
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          depressed
          fab
          small
          color="white"
          rounded
          v-bind="attrs"
          v-on="on"
          style="text-transform:none;"
        >
          <v-avatar
          size="30"
          >
            <img
            :lazy-src="user.attributes.profilepic._url"
            :src="user.attributes.profilepic._url"
            >
          </v-avatar>
        </v-btn>
      </template>



      <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
              size="30"
              >
                <img
                :lazy-src="user.attributes.profilepic._url"
                :src="user.attributes.profilepic._url"
                >
              </v-avatar>
              <h3>{{user.attributes.firstname}}</h3>
              <p class="text-caption mt-1">
                {{user.attributes.email}}
              </p>
              <v-divider class="my-3"></v-divider>
              <span class="overline">{{user.attributes.role}}</span>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click="logout()"
              >
                Disconnect Account
              </v-btn>
            </div>
          </v-list-item-content>
      </v-card>
    </v-menu>

    </v-app-bar>


    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>



    <v-footer
      app
      color="white"
    >
      <v-avatar
      size="30"
      class="mr-2"
      >
      <v-img
      lazy-src="https://www.vhv.rs/dpng/d/573-5731936_coc-college-logo-vector-phinma-cagayan-de-oro.png"
      src="https://www.vhv.rs/dpng/d/573-5731936_coc-college-logo-vector-phinma-cagayan-de-oro.png"
      >

      </v-img>
      </v-avatar>
      <span class="overline">Cagayan de Oro College </span>
    </v-footer>

    <TheSnackbar/>
  </v-app>
</template>


<script>
import { mapActions,mapState,mapMutations } from 'vuex'
import TheSnackbar from '@/components/TheSnackbar.vue';
import Moralis from 'moralis'
export default {
  components:{
    TheSnackbar
  },
  middleware: 'loggedin' ,
  data () {
    return {
      drawer: false,
      notification: [],
      items: [
              { 
                action: 'mdi-chart-bar',
                items: [
                    { 
                      title: '📈 Overview',
                      link: '/access/statistic/overview'
                    },
                    { 
                      title: '🧑‍🤝‍🧑 Resident',
                      link: '/access/statistic/resident'
                    },
                    { 
                      title: '🏠 House Hold',
                      link: '/access/statistic/household'
                    },
                    { 
                      title: '🎓 Out of School Youth',
                      link: '/access/statistic/outofschool'
                    },
                    { 
                      title: '💉 Vaccine',
                      link: '/access/statistic/vaccine'
                    },
                    { 
                      title: 'Resident with in the zone',
                      link: '/access/statistic/zone'
                    },
                ],
                title: 'Statistical',
              },

              { 
                action: 'mdi-note-text-outline',
                items: [
                    { 
                      title: '🚨 Summon',
                      link: '/access/report/summon'
                    },
                    { 
                      title: '📑 Blotter',
                      link: '/access/report/blotter'
                    },
                    { 
                      title: '🔥 Incident',
                      link: '/access/report/incident'
                    },
                    { 
                      title: '⚖ Lupon',
                      link: '/access/report/lupon'
                    },
                ],
                title: 'Report',
              },
              { 
                action: 'mdi-export',
                items: [
                    { 
                      title: 'Manage',
                      link: '/access/data/export'
                    }
                ],
                title: 'Export Data',
              },

              { 
                action: 'mdi-account',
                items: [
                    { 
                      title: 'Create Account',
                      link: '/access/account/create'
                    },
                    { 
                      title: 'Manage Account',
                      link: '/access/account/manage'
                    },

                    { 
                      title: 'Recent Login',
                      link: '/access/account/logger'
                    }
                ],
                title: 'Accounts',
              },

      ],
      title: 'Barangay Carmen'
    }
  },

  computed:{
    ...mapState(
        [
          'user'
        ]
      ),
  },
  
  methods:{

    ...mapActions(['loggedin']),
    ...mapMutations(['authorize_loggin']),

    async getNotif (){
        const response = await Moralis.Cloud.run("getNotification");
        this.notification = response;
        console.log(response)
    },

    async logout() {
      await Moralis.User.logOut();
      this.authorize_loggin([]);
      this.$router.push('/login')
    }
  },

  mounted(){
      this.getNotif();
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;700&family=Permanent+Marker&display=swap');
.logofont{
font-family: 'Kalam', cursive;
font-family: 'Permanent Marker', cursive;
}

.my-menu {
  margin-top: 60px;
  contain: initial;
  overflow: visible;
}
.my-menu::before {
  position: absolute;
  content: "";
  top: 0;
  right: 10px;
  transform: translateY(-100%);
  width: 10px; 
  height: 13px; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 13px solid #fff;
}
</style>