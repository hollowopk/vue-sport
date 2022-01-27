<template>
  <div class="ownmessage">
    <div class="head">
      <el-page-header @back="goHome" content="个人信息" title="回到首页" >
    </el-page-header>
    </div>
    <div class="container">
      <div class="con-left">
       <Nav />
      </div>
      <div class="con-right">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "./Nav"
export default {
  name: "ownmessage",
  components:{
      Nav
  },
  methods:{
    goHome(){
      this.$router.push('/');
    }
  }
};
</script>
<style scoped lang="less">
.ownmessage {
 // background-color: @ownMessageColor;
  background: url("../../assets/images/ownmessage-back.jpg") no-repeat 0 0;
  height: 700px;
  .head{
    padding-left: 20px;
    padding-top: 30px;
    color: @primaryColor;
    
  }
  .container {
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    transform: translate(0px, 20px);
    .con-left {
      flex: 2;
      height: 600px;
      background-color: white;
      margin-right: 10px;
       
     
      .el-menu{
          padding-left:20px;
          font-size: 20px;
      }
      
    }
    .con-right {
      flex: 6;
      height: 600px;
      background-color: white;
      margin-left: 10px;
    }
  }
}
::v-deep{
  .head .el-page-header .el-page-header__left .el-page-header__title{
    font-size: 20px;
  }
}
</style>