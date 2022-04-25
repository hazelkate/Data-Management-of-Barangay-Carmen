export const strict = false;

import Moralis from 'moralis';
import _ from 'lodash';

export const state = () => ({

    user:[],




})


export const mutations = {
   

    authorize_loggin(state,user){
        return state.user = user;
    },

}

export const actions = {

    loggedin({commit}){
        const currentUser =  Moralis.User.current();
        if (currentUser) {
           commit('authorize_loggin', currentUser)
        }
    },

    nuxtClientInit  ({ commit,dispatch }, { req }) {


        Moralis.start({ 
            serverUrl: "https://8wkwlohu8u17.usemoralis.com:2053/server", 
            appId: "6CJ1wgYZQ87DmYvCr898C2rdhVpug4LBcZlr4e5s" 
        });

        dispatch('loggedin')

        
    }

}
