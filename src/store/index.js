import Vue from "vue";
import Vuex from "vuex"; 
Vue.use(Vuex);
const state = {
  userInfo:{},
  commandCenter:[
    {
      id: 1,
      name: "指挥中心",
      state: true,
      sitesInfo:[],
    }
  ],
    
}

const actions = {

}

const mutations = {

}

export default new Vuex.Store({
  state,
  actions,
  mutations
})