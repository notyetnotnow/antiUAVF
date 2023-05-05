<template>
  <div v-if="node" @contextmenu.stop="showPopup">
    <div v-show="showMenu" :style="{ top: popupTop + 'px', left: popupLeft + 'px' }" class="popup">
      <p class="popup-item" v-if="node.level<3" @click="showInsert">添加</p>
      <p class="popup-item" @click="deleteNode">删除</p>
      <p class="popup-item" @click="showUpdate">修改</p>
    </div>
    <div v-show="showInsertMenu" :style="{ top: popupTop + 'px', left: popupLeft + 'px' }" class="update-menu">
      <div v-if="node.level==1">
        <label for="sitename" class="update-menu-item">站点名称:</label>
        <input type="text" id="sitename" ref="siteName" name="sitename" >
        <label for="sitestate" class="update-menu-item">站点状态:</label>
        <input type="text" id="sitestate" ref="siteState" name="sitestate" >
        <input type="button" value="提交" class="pushbutton" @click="submitInsert">
      </div>
      <div v-if="node.level==2">
        <label for="equipmentname" class="update-menu-item">设备名称:</label>
        <input type="text" id="equipmentname" ref="equipmentName"><br/>
        <label for="equipmentstate" class="update-menu-item">设备状态:</label>
        <input type="text" id="equipmentstate" ref="equipmentState"><br/>
        <label for="equipmentip" class="update-menu-item">设备ip:</label>
        <input type="text" id="equipmentip" ref="equipmentIp"><br/>
        <label for="equipmentlongitude" class="update-menu-item">设备经度:</label>
        <input type="text" id="equipmentlongitude" ref="equipmentLongitude"><br/>
        <label for="equipmentlatitude" class="update-menu-item">设备纬度:</label>
        <input type="text" id="equipmentlatitude" ref="equipmentLatitude"><br/>
        <label for="equipmentelevation" class="update-menu-item">设备高度:</label>
        <input type="text" id="equipmentelevation" ref="equipmentElevation"><br/>
        <input type="button" value="提交" class="pushbutton" @click="submitInsert">
      </div>
    </div>
    <div v-show="showUpdateMenu" :style="{ top: popupTop + 'px', left: popupLeft + 'px' }" class="update-menu">
      <div v-if="node.level==1">
        <label for="centernameU" class="update-menu-item">中心名称:</label>
        <input type="text" id="centernameU" ref="centerNameU"><br/>
        <label for="centerstateU" class="update-menu-item">中心状态:</label>
        <input type="text" id="centerstateU" ref="centerStateU"><br/>
        <input type="button" value="提交" class="pushbutton" @click="submitUpdate">
      </div>
      <div v-if="node.level==2">
        <label for="sitenameU" class="update-menu-item">站点名称:</label>
        <input type="text" id="sitenameU" ref="siteNameU"><br/>
        <label for="sitestateU" class="update-menu-item">站点状态:</label>
        <input type="text" id="sitestateU" ref="siteStateU"><br/>
        <input type="button" value="提交" class="pushbutton" @click="submitUpdate">
      </div>
      <div v-if="node.level==3">
        <label for="equipmentnameU" class="update-menu-item">设备名称:</label>
        <input type="text" id="equipmentnameU" ref="equipmentNameU"><br/>
        <label for="equipmentstateU" class="update-menu-item">设备状态:</label>
        <input type="text" id="equipmentstateU" ref="equipmentStateU"><br/>
        <label for="equipmentipU" class="update-menu-item">设备ip:</label>
        <input type="text" id="equipmentipU" ref="equipmentIpU"><br/>
        <label for="equipmentlongitudeU" class="update-menu-item">设备经度:</label>
        <input type="text" id="equipmentlongitudeU" ref="equipmentLongitudeU"><br/>
        <label for="equipmentlatitudeU" class="update-menu-item">设备纬度:</label>
        <input type="text" id="equipmentlatitudeU" ref="equipmentLatitudeU"><br/>
        <label for="equipmentelevationU" class="update-menu-item">设备高度:</label>
        <input type="text" id="equipmentelevationU" ref="equipmentElevationU"><br/>
        <input type="button" value="提交" class="pushbutton" @click="submitUpdate">
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
        showInsertMenu: false,
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
        if(this.node.level==2){
          this.$store.commit("updateCurrentSiteId",this.node.data.id);
        }
        if(this.node.level==3){
          this.$store.commit("updateCurrentSiteId",this.node.parent.data.id);
        }
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
      showInsert(event) {
        // 计算弹窗位置
        this.popupTop = event.pageY;
        this.popupLeft = event.pageX;
        // 在下一个周期显示弹窗，本周期将弹窗隐藏解决多次连续右击出现多个弹窗的情况
        setTimeout(() => {
          this.showInsertMenu = true
        }, 0);
      },
      hideInsert() {
        // 隐藏弹窗
        this.showInsertMenu = false;
      },
      showUpdate(event) {
        // 计算弹窗位置
        this.popupTop = event.pageY;
        this.popupLeft = event.pageX;
        if(this.node.level == 1){
          this.$refs.centerNameU.value = this.node.data.name;
          this.$refs.centerStateU.value = this.node.data.state;
        }else if(this.node.level == 2){
          this.$refs.siteNameU.value = this.node.data.name;
          this.$refs.siteStateU.value = this.node.data.state;
        }else if(this.node.level == 3){
          this.$refs.equipmentNameU.value = this.node.data.name;
          this.$refs.equipmentStateU.value = this.node.data.state;
          this.$refs.equipmentIpU.value = this.node.data.ip;
          this.$refs.equipmentLongitudeU.value = this.node.data.longitude;
          this.$refs.equipmentLatitudeU.value = this.node.data.latitude;
          this.$refs.equipmentElevationU.value = this.node.data.elevation;
        }
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
      submitInsert(){
        if(this.node.level==1){
          let name = this.$refs.siteName.value;
          let state = this.$refs.siteState.value;
          let belong = this.node.data.id;
          this.hideInsert();
          axios.get(`http://localhost:8080/insertSite?name=${name}&state=${state}&belong=${belong}`)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          })
        }
        if(this.node.level==2){
          let name = this.$refs.equipmentName.value;
          let state = this.$refs.equipmentState.value;
          let belong = this.node.data.id;
          let longitude = this.$refs.equipmentLongitude.value;
          let latitude = this.$refs.equipmentLatitude.value;
          let elevation = this.$refs.equipmentElevation.value;
          let ip = this.$refs.equipmentIp.value;
          let type = 0;
          switch(name){
          case "服务器":
            type = 0;
            break;
          case "雷达":
            type = 1;
            break;
          case "光电":
            type = 2;
            break;
          case "干扰":
            type = 3;
            break;
          case "测向":
            type = 4;
            break;
          case "诱骗":
            type = 5;
            break;
          default:
            type = 0;
          }
          this.hideInsert();
          axios.get(`http://localhost:8080/insertEquipment?name=${name}&state=${state}&belong=${belong}&longitude=${longitude}&latitude=${latitude}&elevation=${elevation}&ip=${ip}&type=${type}`)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          })
        }
      },
      submitUpdate(){
        if(this.node.level==1){
          let name = this.$refs.centerNameU.value;
          let state = this.$refs.centerStateU.value;
          let id = this.node.data.id;
          this.hideUpdate();
          axios.get(`http://localhost:8080/updateCenter?name=${name}&state=${state}&id=${id}`)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          })
        }
        if(this.node.level==2){
          let name = this.$refs.siteNameU.value;
          let state = this.$refs.siteStateU.value;
          let id = this.node.data.id;
          this.hideUpdate();
          axios.get(`http://localhost:8080/updateSite?name=${name}&state=${state}&id=${id}`)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          })
        }
        if(this.node.level==3){
          let name = this.$refs.equipmentNameU.value;
          let state = this.$refs.equipmentStateU.value;
          let id = this.node.data.id;
          let longitude = this.$refs.equipmentLongitudeU.value;
          let latitude = this.$refs.equipmentLatitudeU.value;
          let elevation = this.$refs.equipmentElevationU.value;
          let ip = this.$refs.equipmentIpU.value;
          let type = 0;
          switch(name){
          case "服务器":
            type = 0;
            break;
          case "雷达":
            type = 1;
            break;
          case "光电":
            type = 2;
            break;
          case "干扰":
            type = 3;
            break;
          case "测向":
            type = 4;
            break;
          case "诱骗":
            type = 5;
            break;
          default:
            type = 0;
          }
          this.hideUpdate();
          axios.get(`http://localhost:8080/updateEquipment?name=${name}&state=${state}&id=${id}&longitude=${longitude}&latitude=${latitude}&elevation=${elevation}&ip=${ip}&type=${type}`)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          })
        }
      },

    },
    watch:{
      'node.expanded'(val) {
        this.$nextTick(() => this.expanded = val);
      },
      'node.showInsertMenu'(val) {
        this.$nextTick(() => this.showInsertMenu = val);
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
      document.addEventListener('contextmenu', this.hideInsert);
      document.addEventListener('contextmenu', this.hideUpdate);
    },
    beforeUnmount() {
      document.removeEventListener('click', this.hidePopup);
      document.removeEventListener('contextmenu', this.hidePopup);
      document.removeEventListener('contextmenu', this.hideInsert);
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