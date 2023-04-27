<template>
  <div v-if="node">
      {{node.name}}
  </div>
</template>

<script>

  export default {
    name:"TreeNode",
    data(){
      return{
        
      }
    },
    props:['node'],
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
  .node-tree{
    font-size: 0.5rem;
  }
  .node-tree:hover{
    cursor: pointer;
    background-color: white;
  }
</style>