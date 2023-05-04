<template>
  <div v-if="node" @contextmenu="showPopup">
    <div v-show="showMenu" :style="{ top: popupTop + 'px', left: popupLeft + 'px' }" class="popup">
      <p class="popup-item">添加</p>
      <p class="popup-item">删除</p>
      <p class="popup-item">修改</p>
    </div>
    <div class="node-tree" 
      :style="{ 'padding-left': (node.level - 1) * 0.5 + 'rem' }"
      @click="clickHandle"
    >
      {{node.data.name}}
    </div>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div v-show="expanded">
        <tree-node 
          v-for = "child in node.childNodes"
          :node="child"
          :key="child.key"
        >
        </tree-node>
      </div>
    </transition>

  </div>
</template>

<script>
  import {addClass, removeClass} from "./model/dom"  
  export default {
    name:"TreeNode",
    components: {

    },
    data(){
      return{
        expanded:true,
        showMenu: false,
        popupTop: 0, // 弹窗距离文档顶部的距离
        popupLeft: 0 // 弹窗距离文档左侧的距离
      }
    },
    props:{
      node: {
        default() {
          return {};
        }
      },
    },
    computed: {

    },
    methods:{
      beforeEnter(el){
        addClass(el, 'collapse-transition');
        if (!el.dataset) el.dataset = {};

        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;

        el.style.height = '0';
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      },
      enter(el) {
        el.dataset.oldOverflow = el.style.overflow;
        if (el.scrollHeight !== 0) {
          el.style.height = el.scrollHeight + 'px';
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
        } else {
          el.style.height = '';
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }

        el.style.overflow = 'hidden';
      },
      afterEnter(el) {
        // for safari: remove class then reset height is necessary
        removeClass(el, 'collapse-transition');
        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
      },

      beforeLeave(el) {
        if (!el.dataset) el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;

        el.style.height = el.scrollHeight + 'px';
        el.style.overflow = 'hidden';
      },

      leave(el) {
        if (el.scrollHeight !== 0) {
          // for safari: add class after set height, or it will jump to zero height suddenly, weired
          addClass(el, 'collapse-transition');
          el.style.height = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        }
      },

      afterLeave(el) {
        removeClass(el, 'collapse-transition');
        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      },

      clickHandle(){
        this.expanded = !this.expanded;
      },

      showPopup(event) {
        // 阻止默认右键菜单
        event.preventDefault();
        
        // 计算弹窗位置
        this.popupTop = event.pageY;
        this.popupLeft = event.pageX;
        // 在下一个周期显示弹窗，本周期将弹窗隐藏解决多次连续右击出现多个弹窗的情况
        setTimeout(() => {
          this.showMenu = true
        }, 0);
      },
      hidePopup() {
        // 隐藏弹窗
        this.showMenu = false;
      }
    },
    watch:{
      'node.expanded'(val) {
        this.$nextTick(() => this.expanded = val);
      }
    },
    created(){
      if (this.node.expanded) {
        this.expanded = true;
      }
    },
    mounted() {
      document.addEventListener('click', this.hidePopup);
      document.addEventListener('contextmenu', this.hidePopup);
    },
    beforeUnmount() {
      document.removeEventListener('click', this.hidePopup);
      document.addEventListener('contextmenu', this.hidePopup);
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
  .collapse-transition{
    transition:1s height ease-in-out,1s padding-top ease-in-out,1s padding-bottom ease-in-out;
  }
  .popup {
    position: absolute;
    z-index: 9999;
    background-color: #fff;
    border: 0.05rem solid #ccc;
    border-radius: 0.3rem;
    box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
    padding: 0.1rem 0;
    width: 2rem;

  }
  .popup-item {
    display: block;
    padding: 0.1rem 0.2rem;
    margin: 0.1rem;
    font-size: 0.2rem;
    color: #333;
    text-decoration: none;
    cursor: pointer;
  }
  .popup-item:hover {
    background-color: #f5f5f5;
  }
</style>