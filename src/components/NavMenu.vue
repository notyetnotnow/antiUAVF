<template>
  <div>
    <div class="navmenu">
      <div class="flex-center">
        <sw-scroll :getCurrentTitle='getCurrentTitle'/>
        <div class="title-head">{{currentTitle}}</div>
      </div>
      <div v-if="loginState" class="root-user" @click="cancelLogin">A</div>
      <div v-else class="user" @click="showUserUi()">
        <svg class="svg">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user-off"></use>
        </svg>
      </div>
    </div>
    <div class="user-ui" v-show="showUser">
      <label for="userName" class="user-menu-item">用户:</label>
      <input class="input-text" type="text" id="userName" ref="userName"><br/>
      <label for="password" class="user-menu-item">密码:</label>
      <input class="input-text" type="text" id="password" ref="password"><br/>
      <div class="button-div">
        <input type="button" value="登录" class="pushbutton" @click="login">
        <input type="button" value="取消" class="pushbutton" @click="hideUserUi">
      </div>
    </div>
  </div>
</template>

<script>  
  import SwScroll from './SwScroll.vue'

  export default {
    name: 'NavMenu',
    components: {
      SwScroll
      
    },
    data(){
      return {
        currentTitle:'概览',
        showUser:false,
        loginState:false,
      }
    },
    methods:{
      getCurrentTitle(value){
        this.currentTitle = value;
        
      },
      showUserUi(){
        // 在下一个周期显示弹窗，本周期将弹窗隐藏解决多次连续右击出现多个弹窗的情况
        setTimeout(() => {
          this.showUser = true
        }, 0);
      },
      hideUserUi(){
        this.showUser = false;
      },
      login(){
        let user = this.$refs.userName.value;
        let password = this.$refs.password.value;
        this.$axios.get(`http://localhost:8080/checkUser?user=${user}&password=${password}`)
        .then(response => {
          if(response.data.role == "admin"){
            this.$store.commit("updateUser",{"name":user,"role":"admin"});
            this.loginState = true;
            this.hideUserUi();  
          } else if(response.data == ""){
            this.$refs.userName.value = "用户名或密码错误";
            this.$refs.password.value = "";
          }
          
        })
        .catch(error => {
          console.log(error);
        })
            
      },
      cancelLogin(){
        this.$store.commit("updateUser",{"name":"guest","role":"user"});
        this.loginState = false;
      }
    },
    mounted(){
      
    },
    beforeDestroy(){
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navmenu{
    position: absolute;
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: center;
  }
  .title-head{
    width: 4.5rem;
    line-height: 1rem;
    height: 1rem;
    font-size: 0.8rem;
    color: skyblue;
  }
  .flex-center{
    display: flex;
    justify-content: center;
  }
  .user{
    position: absolute;
    right: 1rem;
    width: 1rem;
    height: 1rem;
  }
  .user:hover{
    cursor: pointer;
  }
  .svg{
    width: 1rem;
    height: 1rem;
  }
  .user-ui{
    position: absolute;
    width: 8.5rem;
    height: 4.3rem;
    background-color: white;
    z-index: 100;
    margin: 12rem 21.5rem 12rem 21.5rem;
  }
  .user-menu-item {
    position: relative;
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
  label{
    font-size: 0.2rem;
  }
  .input-text{
    font-size: 0.2rem;
    width: 6rem;
  }
  .button-div{
    margin-top: 0.5rem;
    width: 100%;
    height: 0.8rem;
    display: flex;
    justify-content: center;
  }
  .pushbutton{
    font-size: 0.2rem;
    width: 3rem;
    right: 0.5rem;
    margin-right: 0.5rem;
  }
  .root-user{
    position: absolute;
    right: 1rem;
    width: 1rem;
    height: 1rem;
    background-color: orange;
    border-radius: 1rem;
    color: white;
    font-size: 0.5rem;
    text-align: center;
    line-height: 1rem;
  }
  .root-user:hover{
    cursor: pointer;
  }
</style>
