<template>
  <div class="over-view">
    <div class="sketchy-messages">
      <div class="title">
        <span >站点信息</span>
      </div>
      <div>
        <el-tree
          class="tree-element"
          :data="data"
          node-key="id"
          highlight-current
          check-on-click-node
          default-expand-all
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          :allow-drop="allowDrop"
          :allow-drag="allowDrag">
        </el-tree>
      </div>
    </div>
    <div class="exhibition-messages">
      <div class="command-frame">
        <command-frame/>
      </div>
      <div class="equipment-messages">
        <div class="title">老龙山</div>
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
  import axios from 'axios';
  export default {
    components: { CommandFrame,EquipmentCard },
    name:'OverView',
    data(){
      return{
        data:[
          {id:1,label:"芙蓉汉城",
            children:[
              {id:101,label:"雷达"},
              {id:102,label:"光电"},
              {id:103,label:"干扰"},
              {id:104,label:"测向"},
              {id:105,label:"诱骗"}
            ]
          },
          {id:2,label:"老龙山",
            children:[
              {id:201,label:"雷达"},
              {id:202,label:"光电"},
              {id:203,label:"干扰"},
              {id:204,label:"测向"},
              {id:205,label:"诱骗"}
            ]
          },
        ],
        defaultProps:{
          children:'children',
          label:'label'
        },
        showCard: false
      }
    },
    methods:{
      handleDragStart(node) {
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      }
    },
    mounted(){
      axios.get('http://localhost:8080/selectCenters')
      .then(response => {
        this.$store.commit("updateCenterList",response.data);
      })
      .catch(error => {
        console.log(error);
      })
    },
    computed:{
      messagesCards: function(){
        console.log(this.$store.state.centerList[0].siteList[0].equipmentList);
        return this.$store.state.centerList[0].siteList[0].equipmentList;
      }
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
