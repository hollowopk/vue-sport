<template>
  <div class="sports">
    <!--左侧-->
    <div class="sports_aside">
     <LeftNav />
    </div>

    <!--右侧-->
    <div class="sports_right">
     <router-view></router-view>
    </div>
  </div>
</template>
<script>
import LeftNav from './leftNav'
export default {
  name: "sport",
 components:{
     LeftNav
 },

};
</script>
<style scoped lang="less">
.sports {
  width: 90%;
  margin: 0 auto;
   display: flex;
    flex-direction: column;
  .sports_aside {
     flex: 1;
    background-image: url("../../assets/bohe_images/1.png");
    height: 100px;
    top: 0px;
    left: 0px;
    bottom: 0px;
    padding-top: 20px;
    padding-bottom: 20px;
    
  }
  .sports_right{
      flex: 1;
      margin-left: 30px;
      
  }
}
</style>