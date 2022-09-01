import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { // data
        dependences: []
    },
    getters: { // computed properties
        ticketsCount(){

        }
    },
    actions: { // make the call
        fetchDependences(){

        }
    },
    mutations: { // update

    }
})