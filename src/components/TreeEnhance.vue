<template>
  <div>
    <tree-node 
      v-for = "child in root.childNodes"
      :node="child"
      :key="getNodeKey(child)"></tree-node>
  </div>
</template>

<script>
  import TreeNode from "./TreeNode.vue"
  import TreeStore from "./model/tree-store"
  export default {
    name:"TreeEnhance",
    components:{ TreeNode },
    computed:{
      data: function(){
        return this.$store.state.centerList ? this.$store.state.centerList : null;
      }
    },
    methods:{
      getNodeKey: function(child) {
        return child.key;
      }
    },
    created(){
      console.log(this.data);
      this.store = new TreeStore({
        data: this.data,
      });

      this.root = this.store.root;
    }
  }
</script>

<style scoped>

</style>