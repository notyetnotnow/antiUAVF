import Vue from "vue";
import Vuex from "vuex"; 
Vue.use(Vuex);
const state = {
  userInfo:{},
  centerList:[
    {
      id: 1,
      name: "指挥中心",
      state: true,
      siteList:[
        {
          id: 1,
          name: "老龙山",
          state: true,
          equipmentList:[
            {id:1, name:"服务器", longitude:106.2, latitude:31.6, elevation:300.0, ip:"192.168.1.2", state:true, type:0}
          ]
        }
      ],
    }
  ],
    
}

const actions = {

}

const mutations = {
  updateCenterList(state, payload){
    state.centerList = payload;
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})