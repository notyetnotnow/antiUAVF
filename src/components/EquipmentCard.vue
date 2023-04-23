<template>
  <div class="tab-card">
    <div class="svg-div">
      <svg class="svg">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#'+svgName"></use>
      </svg>
    </div>
    <div class="text-div">
      <span>名称：{{messagesCard.name}}</span>
      <span>经度：{{messagesCard.longitude}}</span>
      <span>纬度：{{messagesCard.latitude}}</span>
      <span>高度：{{messagesCard.elevation}}</span>
      <span>IP：{{messagesCard.ip}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'EquipmentCard',
    props:['messagesCard'],
    data(){
      return{
        
      }
    },
    computed:{
      svgName : function(){
        return this.messagesCard.state ? this.messagesCard.type == 0 ? 'server-on':(this.messagesCard.type == 1 ? 'radar-on':(this.messagesCard.type == 2 ? 'photo-electricity-on':(this.messagesCard.type == 3 ? 'disturb-on':(this.messagesCard.type == 4 ? 'direction-find-on':(this.messagesCard.type == 5 ? 'decoy-on':''))))):this.messagesCard.type == 0 ? 'server-off':(this.messagesCard.type == 1 ? 'radar-off':(this.messagesCard.type == 2 ? 'photo-electricity-off':(this.messagesCard.type == 3 ? 'disturb-off':(this.messagesCard.type == 4 ? 'direction-find-off':(this.messagesCard.type == 5 ? 'decoy-off':'')))))
      }
    }

  }
</script>

<style scoped>
  .tab-card{
    width: 8rem;
    height: 4rem;
    display: flex;
    justify-content: space-between;
  }
  .svg-div{
    width: 4rem;
    height: 4rem;
  }
  .svg{
    margin: 0;
    padding: 0;
    width: 4rem;
    height: 4rem;
  }
  .text-div{
    margin: 0;
    padding: 0;
    width: 4rem;
    height: 4rem;
  }
  .text-div span{
    display: block;
    font-size: 0.4rem;
    height: 0.8rem;
    line-height: 0.8rem;
  }
</style>