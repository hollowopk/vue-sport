<template>
    <div class="owndetail">
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
  name: "owndetail",
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
.owndetail {
 // background-color: @ownMessageColor;
  background: url("../../assets/images/ownmessage-back.jpg") no-repeat 0 0;
  background-color: '#F5FFFA';
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

