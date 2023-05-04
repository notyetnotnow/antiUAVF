<template>
  <div v-if="node" @contextmenu="showPopup">
    <div v-show="showMenu" :style="{ top: popupTop + 'px', left: popupLeft + 'px' }" class="popup">
      <p class="popup-item" v-if="node.level<3" @click="showUpdate">添加</p>
      <p class="popup-item" @click="deleteNode">删除</p>
      <p class="popup-item">修改</p>
    </div>
    <div v-show="showUpdateMenu" :style="{ top: popupTop + 'px', left: popupLeft + 'px' }" class="update-menu">
      <div v-if="node.level==1">
        <label for="sitename" class="update-menu-item">站点名称:</label>
        <input type="text" id="sitename" ref="siteName" name="sitename" >
        <label for="sitestate" class="update-menu-item">站点状态:</label>
        <input type="text" id="sitestate" ref="siteState" name="sitestate" >
        <input type="button" value="提交" class="pushbutton" @click="submit">
      </div>
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
  import axios from 'axios';
  import {addClass, removeClass} from "./model/dom"
    
  export default {
    name:"TreeNode",
    components: {

    },
    data(){
      return{
        expanded:true,
        showMenu: false,
        showUpdateMenu: false,
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
      },
      showUpdate(event) {
        // 计算弹窗位置
        this.popupTop = event.pageY;
        this.popupLeft = event.pageX;
        // 在下一个周期显示弹窗，本周期将弹窗隐藏解决多次连续右击出现多个弹窗的情况
        setTimeout(() => {
          this.showUpdateMenu = true
        }, 0);
      },
      hideUpdate() {
        // 隐藏弹窗
        this.showUpdateMenu = false;
      },
      deleteNode(){
        let level = this.node.level;
        let id = this.node.data.id;
        axios.get(`http://localhost:8080/deleteByLevelAndId?level=${level}&id=${id}`)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        })
      },
      submit(){
        if(this.node.level==1){
          let name = this.$refs.siteName.value;
          let state = this.$refs.siteState.value;
          let belong = this.node.data.id;
          this.hideUpdate();
          axios.get(`http://localhost:8080/insertSite?name=${name}&state=${state}&belong=${belong}`)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          })
        }
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
      document.addEventListener('contextmenu', this.hideUpdate);
    },
    beforeUnmount() {
      document.removeEventListener('click', this.hidePopup);
      document.addEventListener('contextmenu', this.hidePopup);
      document.removeEventListener('contextmenu', this.hideUpdate);
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
  .update-menu {
    position: absolute;
    z-index: 9999;
    background-color: #fff;
    border: 0.05rem solid #ccc;
    border-radius: 0.3rem;
    box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
    padding: 0.1rem 0;
    width: 6rem;

  }
  .update-menu-item {
    display: inline;
    padding: 0.1rem 0.2rem;
    margin: 0.1rem;
    font-size: 0.2rem;
    color: #333;
    text-decoration: none;
    cursor: pointer;
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .update-menu-item:hover {
    background-color: #f5f5f5;
  }
  input{
    display: inline;
    width: 2.5rem;
    padding: 0.1rem 0.2rem;
    margin: 0.1rem;
    font-size: 0.2rem;
    color: #333;
    text-decoration: none;
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .pushbutton{
    width: 1.5rem;
    height: 1rem;
    font-size: 0.2rem;
    margin: 0 2.2rem 0 2.2rem;
  }
</style>