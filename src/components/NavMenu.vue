<template>
  <div>
    <div class="navmenu">
      <div class="flex-center">
        <sw-scroll :getCurrentTitle='getCurrentTitle'/>
        <div class="title-head">{{currentTitle}}</div>
      </div>
      <div class="user" @click="">
        <svg class="svg">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user-off"></use>
        </svg>
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
        currentTitle:'概览'
      }
    },
    methods:{
      getCurrentTitle(value){
        this.currentTitle = value;
      }  
    },
    mounted(){

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
  .svg{
    width: 1rem;
    height: 1rem;
  }
</style>
