<template>
  <div v-if="node">
    <div class="node-tree" :style="{ 'padding-left': (node.level - 1) * 0.5 + 'rem' }" @click="expandOrCollapse">{{node.data.name}}</div>
    <div ref="nodeDivTransition" class="node-wrapper">
      <tree-node 
        v-for = "child in node.childNodes"
        :node="child"
        :key="child.key">
      </tree-node>
    </div>
  </div>
</template>

<script>

  
  export default {
    name:"TreeNode",
    components: {

    },
    data(){
      return{
        expanded:true,
      }
    },
    props:['node'],
    computed: {

    },
    methods:{
      expandOrCollapse(){
        const transitionEl = this.$refs.nodeDivTransition;
        if(transitionEl.style.height == ''){
          transitionEl.style.height = transitionEl.scrollHeight + "px";
          this.expanded = !this.expanded;
          setTimeout(function() {
            transitionEl.style.height = "0";
          }, 0);
        }else{
          if (this.expanded) {
            transitionEl.style.height = "0";
          } else {
            transitionEl.style.height = transitionEl.scrollHeight + "px";
          }
          this.expanded = !this.expanded;
        }
        
      },
    },
  }
</script>

<style scoped>
  .node-tree{
    font-size: 0.5rem;
    line-height: 0.7rem;
    height: 0.7rem;
  }
  .node-tree:hover{
    cursor: pointer;
    background-color: white;
  }
  .node-wrapper {
    overflow: hidden;
    transition-property: height;
    transition-timing-function: ease-in-out;
    transition-duration: 1s;
  }
</style>