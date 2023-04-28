<template>
  <div v-if="nodes" :style="{'padding-left': level * 0.4 + 'rem'}" class="tree-node">
    <div v-for="node in nodes" :key="node.id">
      {{node.name}}
      <tree-node :nodes = "getListFrom(node)" :level="level+1"></tree-node>
    </div>
  </div>
</template>

<script>
  export default {
    name:"TreeNode",
    data(){
      return{
        
      }
    },
    props:['nodes','level'],
    computed:{
      
    },
    methods:{
      getListFrom(nodeObject){
        // 遍历 myObject 的属性
        for (const prop in nodeObject) {
          // 检查属性是否是数组类型
          if (Array.isArray(nodeObject[prop])) {
            return nodeObject[prop];
          }
        }
      }
    },
  }
</script>

<style scoped>
  .tree-node{
    font-size: 0.5rem;
  }
  .tree-node:hover{
    cursor:pointer;
    background-color: white;
  }
</style>