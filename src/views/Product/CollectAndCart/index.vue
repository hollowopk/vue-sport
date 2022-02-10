<template>
  <div class="collectAndCollect">
    <div class="info">
        <!--用户未登录-->
      <div class="no_login" v-if="JSON.stringify(userMessage) === '{}'">
        <div class="avatar">
         <el-avatar :size="30" :src="circleUrl"></el-avatar>
          <div class="avatar_name">
              Hi,你好
          </div>
        </div>
        <div class="no-datail">
         <el-button @click="handleLogin">登录</el-button>
         <el-button @click="handleRegister">注册</el-button>
        </div>
      </div>
       <!--用户已登录-->
      <div class="ale_login" v-else>
        <div class="avatar">
             <el-avatar :size="30" :src="userMessage.avatar"></el-avatar>
          <div class="avatar_name">Hi,{{userMessage.account}}你好</div>
        </div>
        <div class="own-datail">
          <div class="cart" @click="goCart">购物车</div>
          <div class="collect" @click="goCollect">收藏夹</div>
          <div class="shezhi">设置</div>
        </div>
      </div>
      <div class="image">
        <img src="" alt="" />
      </div>
      <div class="own_icon">
        <div class="own_collect"></div>
        <div class="own_collect"></div>
        <div class="own_collect"></div>
        <div class="own_collect"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "collectAndCollect",
  data(){
      return{
          //未登录和已登录的表示 true表示未登录,false表示已登录
          flag:true,
         circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        userMessage:{},
      }
  },
   mounted(){
     //监听session
   this.monitorSession();
  },
  methods:{
        /**
     * 监听session,获取数据
     */
    monitorSession(){
         //监听session的改变
    window.addEventListener("setItem", (e) => {
      if (e !== null) {
        let obj = Object.assign(e);
        
       this.userMessage = JSON.parse(obj.newValue);
      } else {
        this.userMessage = {};
      }
    });
    //刷新页面之后
  if (sessionStorage.getItem("userMessage")) {
      let userMessage = sessionStorage.getItem("userMessage");
      this.userMessage = JSON.parse(userMessage);
    }
    
    },
    
    /**
     *跳转至购物车页面
     */
    goCart(){
      this.$router.push("/cart");
    },

    /**
     * 跳转至收藏夹
     */
    goCollect(){
        this.$router.push("/collect");
    },

    /**
     *用户登录按钮
     */
    handleLogin(){
        this.$router.push("/login");
    },

    /**
     * 用户注册按钮
     */
    handleRegister(){
        this.$router.push({name:'login',params:{actionStatus:true}});
    }
  }
};
</script>
<style scoped lang="less">
.collectAndCollect {
  margin-top: 20px;
  margin-right: 20px;
  height: 450px;
  background-color: #eee;
  border-radius: 30px 30px 30px 0;
}
.info {
  width: 80%;
  margin: 0 auto;
 padding-top: 30px;
 
  .no_login{
      .avatar{
          text-align: center;
          .avatar_name{
              font-size: 13px;
              color: #666;
          }
      }
  }
  .no-datail{
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      color: #aaa;
      .el-button{
          flex: 40%;
      }
  }
  .ale_login{
      .avatar{
          text-align: center;
          .avatar_name{
              font-size: 13px;
              color: #666;
          }
      }
      .own-datail{
          margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      color: #aaa;
      .cart{
          flex: 30%;
          cursor: pointer;
      }
      .cart:hover{
        color: @primaryColor;
      }
      .collect{
          flex: 30%;
           cursor: pointer;
      }
      .collect:hover{
        color: @primaryColor;
      }
      .shezhi{
          flex: 30%;
           cursor: pointer;
      }
      }
       
  }
}
</style>