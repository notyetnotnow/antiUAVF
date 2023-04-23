import VueRouter from "vue-router"

import OverView from "../pages/OverView"
import RealTimeSituation from "../pages/RealTimeSituation"
import HistoryRecords from "../pages/HistoryRecords"

export default new VueRouter({
  routes:[
    {
      name:'',
      path:'',
      component:OverView
    },
    {
      name:'overview',
      path:'/overview',
      component:OverView
    },
    {
      name:'realtimesituation',
      path:'/realtimesituation',
      component:RealTimeSituation
    },
    {
      name:'historyrecords',
      path:'/historyrecords',
      component:HistoryRecords
    },
  ]
}) 
