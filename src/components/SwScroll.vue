<template>
  <div> 
    <img src="../assets/58logo.jpg" @click="unfoldOrRetract">
    <div class="initial-status" ref="divTransition">
      <div style="width:6rem;height:1rem">
        <div class="tab" @click='jumpto(ov.id)'>{{ ov.title }}</div>
        <div class="tab" @click='jumpto(rts.id)'>{{ rts.title }}</div>
        <div class="tab" @click='jumpto(hr.id)'>{{ hr.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router'
  export default {
    name:'SwScroll',
    props:['getCurrentTitle'],
    data(){
      return{
        isShow:1,
        isUnfold:false,
        isProcess:false,
        currentId:0,
        ov:{id:0,title:'概览'},
        rts:{id:1,title:'实时态势'},
        hr:{id:2,title:'历史记录'}
      }
    },
    methods:{
      unfoldOrRetract(){
        this.$refs.divTransition.classList.toggle("end-status");
      },
      jumpto(value){
        if(value === this.currentId) return
        this.currentId = value
        if(value === 0){
          router.push({name:'overview'});
          this.getCurrentTitle(this.ov.title)
        }else if(value == 1){
          router.push({name:'realtimesituation'})
          this.getCurrentTitle(this.rts.title)
        }else{
          router.push({name:'historyrecords'})
          this.getCurrentTitle(this.hr.title)
        }
      }
    }
  }
</script>

<style scoped>
  .tab{
    width: 2rem;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.4rem;
    background-color: skyblue;
    text-align: center;
    border-bottom-color: skyblue;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    float: left;
  }
  .tab:hover{
    background-color: aqua;
    border-bottom-color: aqua;
    cursor:pointer;
  }
  .active{
    border-bottom-color: blue;
    border-bottom-width: 3px;
    border-bottom-style: solid;
  }
  img{
    width: 1rem;
    height: 1rem;
    float: left;
    opacity: 98%;
  }
  img:hover{
    cursor:pointer;
  }
  .initial-status{
    overflow: hidden;
    float: left;
    width: 0;
    height: 1rem;
    transition-property: width;
    transition-timing-function: ease-in-out;
    transition-duration: 2s;
  }
  .end-status{
    overflow: hidden;
    float: left;
    width: 6rem;
    height: 1rem;
    transition-property: width;
    transition-timing-function: ease-in-out;
    transition-duration: 2s;
  }
</style>