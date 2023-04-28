<template>
  <div>
    <tree-node 
      v-for = "child in root.childNodes"
      :node="child"
      :key="child.key">
    </tree-node>
  </div>
</template>

<script>
  import TreeNode from "./TreeNode.vue"
  import TreeStore from "./model/tree-store"
  export default {
    name:"TreeEnhance",
    components:{ TreeNode },
    data(){
      return{
        root: null,
        store: null,
      }
    },
    props:{
      data: {
        type: Array
      },
    },
    computed:{
      
    },
    methods:{
      
    },
    watch:{
      data(newVal) {
        this.store.setData(newVal);
      },
    },
    created(){
      this.store = new TreeStore({
        data: this.data,
      });

      this.root = this.store.root;
    }
  }
</script>

<style scoped>

</style>