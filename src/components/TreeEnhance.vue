<template>
  <div>
    <tree-node :nodes="nodes" :level=0></tree-node>
  </div>
</template>

<script>
  import TreeNode from "./TreeNode.vue"
  export default {
    name:"TreeEnhance",
    components:{ TreeNode },
    computed:{
      nodes: function(){
        return this.$store.state.centerList ? this.$store.state.centerList : null;
      }
    }
  }
</script>

<style lang="css" scoped>

</style>