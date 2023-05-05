// 20230309完成组件静态框架和样式（交互留到和站点信息联动的时候添加）只考虑了一个指挥中心和主站，并且没有考虑辅站
<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512 290" preserveAspectRatio="none" v-if="siteList.length < 6">
      <g :transform="'translate('+(512-102.4*(siteList.length))*0.5+',10)'">
        <g :transform="'translate('+102.4*(siteList.length-1)*0.5+',0)'">
          <g transform="scale(0.2,0.2)">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#command-center-on"></use>
          </g>
          <g>
            <text fill="#808080" x="31.2" y="71.2" font-size="10" font-weight=800>{{centerList[0].name}}</text>
            <line x1="51.2" y1="76.2" x2="51.2" y2="91.2" stroke="#808080" stroke-width="5"/>
          </g>
        </g>
        <template v-for="(item,index) in siteList">
          <g :transform="'translate('+102.4*index+',111.2)'" :key="item.id" @click="updateCurrentSiteId(item.id)">
            <g transform="scale(0.2,0.2)">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#site-off"></use>
            </g>
            <g >
              <text fill="#808080" :x="0.5*(102.4-10*(item.name.length))" y="61.2" font-size="10" font-weight=800>{{item.name}}</text>
              <line x1="51.2" y1="0" x2="51.2" y2="-15" stroke="#808080" stroke-width="5"/>
            </g>
          </g>
        </template>
        <g transform="translate(51.2,93.7)">
          <line x1="-2.5" y1="0" :x2="102.4*(siteList.length-1)+2.5" y2="0" stroke="#808080" stroke-width="5"/>
        </g>
      </g>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512 290" preserveAspectRatio="none" v-if="siteList.length >= 6">
      <g :transform="'translate('+(512-51.2*(siteList.length))*0.5+',40)'">
        <g :transform="'translate('+51.2*(siteList.length-1)*0.5+',0)'">
          <g transform="scale(0.1,0.1)">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#command-center-on"></use>
          </g>
          <g>
            <text fill="#808080" x="15.6" y="35.6" font-size="5" font-weight=800>{{centerList[0].name}}</text>
            <line x1="25.6" y1="38.1" x2="25.6" y2="43.1" stroke="#808080" stroke-width="2.5"/>
          </g>
        </g>
        <template v-for="(item,index) in siteList">
          <g :transform="'translate('+51.2*index+',50.6)'" :key="item.id">
            <g transform="scale(0.1,0.1)">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#site-off"></use>
            </g>
            <g >
              <text fill="#808080" :x="0.5*(51.2-5*(item.name.length))" y="35.6" font-size="5" font-weight=800>{{item.name}}</text>
              <line x1="25.6" y1="0" x2="25.6" y2="-5" stroke="#808080" stroke-width="2.5"/>
            </g>
          </g>
        </template>
        <g transform="translate(25.6,44.35)">
          <line x1="-1.25" y1="0" :x2="51.2*(siteList.length-1)+1.25" y2="0" stroke="#808080" stroke-width="2.5"/>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
  export default {
    name:'CommandFrame',
    data(){
      return{

      }
    },
    mounted(){
      
    },
    computed:{
      centerList(){
        return this.$store.state.centerList;
      },
      siteList(){
        return this.$store.state.centerList[0].siteList
      }
    },
    methods:{
      updateCurrentSiteId(id){
        this.$store.commit("updateCurrentSiteId",id);
      }
    }
  }
</script>

<style scoped>
  div{
    width: 30rem;
    height: 18rem;
    margin: 0;
    padding: 0;
  }
  svg{
    width: 100%;
    height: 100%;
  }
</style>