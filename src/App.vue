<template>
  <div>
    <div>
      <nav-menu/>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
  import SvgIcon from './assets/SvgIcon.vue'
  import NavMenu from './components/NavMenu.vue'

  export default {
    name: 'App',
    components: {
      NavMenu,
      SvgIcon
    }
  }
</script>

<style>
  /* .main{
    width: 100%;
    height: 26.58rem;
    background-color: skyblue;
  } */
</style>
