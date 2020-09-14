import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        headerTitle:"Thomas-movie",
        cityTitle: '广州',
        cityId: 20
     },
     mutations: {
         changeHt(state, payload) {
             state.headerTitle = payload;
         },
         changeCity(state, payload) {
             state.cityTitle = payload.nm;
             state.cityId = payload.id;
         }
     },
     actions: {

     }
})
