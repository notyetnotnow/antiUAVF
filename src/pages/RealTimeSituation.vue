<template>
  <div>
    <!-- <div class="mapbox">
      <el-amap ref="map" 
        map-style="amap://styles/62009be025f187dd3eafe327d2e55b8e" 
        :center="center" 
        :zoom="zoom" 
        view-mode="3D" 
        :extra-options="{vectorMapForeign: 'style_zh_cn'}" 
        @init="initMap" 
        @click="clickMap">
      </el-amap>
    </div> -->
  </div>
</template>

<script>
  export default {
    name:'RealTimeSituation',
    data: function() {
      return {
        zoom: 12,
        center: [121.59996, 31.197646],
      };
    },

    methods: {
      getMap() {
        console.log(this.$refs.map.$$getInstance());
      },
      clickMap(e){
        console.log('click map :', e );
      },
      initMap(e){
        console.log('init map: ', e);
      }
    }
  }
</script>

<style scoped>
  .mapbox{
    margin-top: 50px;
    width: 1000px;
    height: 1000px;
    float: left;
  }
</style>