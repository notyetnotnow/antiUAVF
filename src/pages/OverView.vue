<template>
  <div class="over-view">
    <div class="sketchy-messages">
      <div class="title">
        <span >站点信息</span>
      </div>
      <div>
        <tree-enhance :data="treeData"></tree-enhance>
      </div>
    </div>
    <div class="exhibition-messages">
      <div class="command-frame">
        <command-frame/>
      </div>
      <div class="equipment-messages">
        <div class="title">{{$store.state.centerList[0].siteList[0].name}}</div>
        <ul>
          <li v-for="messagesCard in messagesCards" :key="messagesCard.id">
            <equipment-card class=""  :messagesCard="messagesCard" />
          </li>
        </ul>
      </div>
    </div>
    <div class="stream-messages title">
      <div>提示信息</div>
    </div>
  </div>
</template>

<script>
  import CommandFrame from '@/components/CommandFrame.vue';
  import EquipmentCard from '@/components/EquipmentCard.vue';
  import TreeEnhance from '@/components/TreeEnhance.vue';
  import axios from 'axios';
  
  export default {
    components: { CommandFrame,EquipmentCard, TreeEnhance },
    name:'OverView',
    data(){
      return{
        
      }
    },
    methods:{
      
    },
    mounted(){
      axios.get('http://localhost:8080/selectCenters')
      .then(response => {
        this.$store.commit("updateCenterList",response.data);
      })
      .catch(error => {
        console.log(error);
      })
      var source = new EventSource("http://localhost:8080/sse");
      source.addEventListener("message", function(event) {
        this.$store.commit("updateCenterList",JSON.parse(event.data));
      }.bind(this));
    },
    computed:{
      messagesCards(){
        return this.$store.state.centerList[0].siteList[0].equipmentList;
      },
      treeData(){
        return this.$store.state.centerList;
      },
      
    },
    watch: {

    }
  }
</script>

<style scoped>
  .over-view{
    position: absolute;
    top: 1.5rem;
    display: flex;
    width: 100%;
    height: 93%;
  }
  .title{
    font-size: 0.5rem;
    line-height: 1rem;
    height: 1rem;
  }
  .sketchy-messages{
    width: 20%;
    height: 100%;
    background-color: skyblue;
    border: 2px solid blue;
  }
  .sketchy-messages .tree-element{
    background-color: skyblue;
  }
  .exhibition-messages{
    width: 60%;
    height: 100%;
    border-top: 2px solid blue;
    border-bottom: 2px solid blue;
  }
  .command-frame{
    background-color: skyblue;
    width: 100%;
    height: 50%;
    border-bottom: 2px solid blue;
    
  }
  .equipment-messages{
    background-color: skyblue;
    width: 100%;
    height: 50%;
    border-bottom: 2px solid blue;
  }
  .equipment-messages .title{
    color: #808080;
    font-size: 1rem;
    text-align: center;
    font-weight: 800;
    padding-top: 0.5rem;
    padding-bottom: 0;
  }
  .stream-messages{
    background-color: skyblue;
    width: 20%;
    height: 100%;
    border: 2px solid blue;
  }
  ul{
    list-style-type: none;
  }
  li{
    float: left;
    width: 33%;
    margin-top: 0.2rem;
  } 
</style>
