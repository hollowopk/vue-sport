<template>
  <div class="header">
    <a href="#">
      <img class="logo" src="@/assets/bohe_images/logo.png" />
    </a>
    <div class="nav">
      <el-menu
        mode="horizontal"
        :default-active="activeIndex"
        class="el-menu-demo"
      >
        <template v-for="item in navList">
          <el-menu-item :index="item.navID" :key="item.navID">
            <span @click="changeNav(item.path, item.navID)">{{
              item.name
            }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>

    <div class="tel">
      <span @click="showDialog">
        <img src="../assets/images/home-select.png" />
      </span>
      <p>
        <span v-if="JSON.stringify(userMessage) === '{}'" @click="handleLogin"
          >您好,请先登录</span
        >
        <span v-else>
          <!--头像和下拉菜单-->

          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar :src="userMessage.avatar"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type="text" @click="handlerOwnMessage" style="color:#009688;"
                  >个人信息</el-button
                ></el-dropdown-item>
              <el-dropdown-item
                ><el-button type="text" @click="handlerLogout" style="color:#009688;"
                  >退出登录</el-button
                ></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </p>
    </div>

    <!--每日打卡-->
    <Clock
      :childClockDialog="clockDialog"
      :childClockForm="clockForm"
      @closeClockDialog="closeClockDialog"
    ></Clock>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Clock from "./Clock.vue";
export default {
  name: "recipes",
  components: {
    Clock,
  },
  data() {
    return {
      //默认选中菜单
      activeIndex: "1",
      //打卡数据
      clockForm: {
        userId: 0,
        username: "",
        height: "",
        weight: "",
        calorie: "",
        drink: "",
        stpes: "",
      },
      //获取用户信息
      userMessage: {},
      navList: [
       
      ],
      //打卡弹窗
      clockDialog: false,
    };
  },
  created(){
    //获取首页上方导航数据   
    this.getnavList();
   
  },
  mounted(){
     //监听session
   this.monitorSession();
  },
  methods: {
      ...mapMutations(["clearCal","clearSport"]),
    /**
     * 监听session,获取数据
     */
    monitorSession(){
         //监听session的改变
    window.addEventListener("setItem", (e) => {
      if (e !== null) {
        let obj = Object.assign(e);
        
       this.userMessage = JSON.parse(obj.newValue);
        this.clockForm.userId = this.userMessage.id;
        this.clockForm.username = this.userMessage.account;
        
      
      } else {
        this.userMessage = {};
      }
    });
    //刷新页面之后
  if (sessionStorage.getItem("userMessage")) {
      let userMessage = sessionStorage.getItem("userMessage");
      this.userMessage = JSON.parse(userMessage);
      this.clockForm.userId = this.userMessage.id;
      this.clockForm.username = this.userMessage.account;
    }
    
    },

    /**
     * 获取导航数据
     */
    getnavList(){
      this.$api.getNavLists({
        sort:1
      }).then((res) => {
        if(res.status === 200){
          this.navList = res.data.extend.result;
        }
      })
    },
    /**
     * 切换菜单栏
     */
    changeNav(path, i) {
      this.activeIndex = i;
      this.$router.push(path);
    },
    /**
     * 用户登录页面跳转
     */
    handleLogin() {
      this.$router.push("/login");
    },

    /**
     * 显示打卡弹框
     */
    showDialog() {
      //1.首先判断用户是否登录
      let result;
      if (this.userMessage.hasOwnProperty("id")) {
        //1.1判断今日是否打卡 true今日已打卡，false今日未打卡
        this.handleToadyUserRecode().then((res) => {
          result = res;
          if (result == 0) {
            this.clockForm.username = this.userMessage.account;
            
            this.clockDialog = true;
          } else {
            this.$message({
              message: "今日已打卡，请勿重复打卡",
              type: "warning",
              customClass:"message_style",
            });
          }
        });
      } else {
        //2.如果用户未登录，跳转登录界面
        this.$router.push("/login");
      }
    },
    /**
     * 用户退出登录
     */
    handlerLogout() {
      this.$api.getLogout().then((res) => {
        if (res.status == 200) {
          sessionStorage.removeItem("userMessage");
          this.userMessage = {};
          //热量数据清空
          this.clearCal();
          //消耗热量清空
          this.clearSport();
          //切换至首页
          this.$router.push("/recipes");
        }
      });
    },

    /**
     * 点击个人信息按钮 页面调转 
     */
    handlerOwnMessage(){
        this.$router.push("/ownmessage");
    },

    /**
     * 关闭打卡弹窗
     */
    closeClockDialog() {
      this.clockDialog = false;
    },

    /**
     * 获取用户今日打卡数据
     */
    async handleToadyUserRecode() {
      let res = await this.$api.getTodayUserRecode({
        timeDiff: 0,
      });
      return res.data.extend.record.length;
    },
  },
};
</script>
<style>


.message_style{
  margin-top: 0%;
  margin-left: 40%;
}
</style>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
.active {
  border-bottom: 2px solid @primaryColor;
  color: @primaryColor;
}
.header {
 
  width: 90%;
  height: 80px;
  margin: 0 auto;
  a .logo {
    float: left;
    margin-top: 15px;
    width: 160px;
    height: 55px;
  }
  .nav {
    float: left;
    margin-left: 80px;
    margin-top: 5px;
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }
    .el-menu--horizontal > .el-menu-item.is-active {
      border-bottom: 2px solid @primaryColor;
      color: @primaryColor;
      transition: 2s;
    }
    .el-menu {
      .el-menu-item {
        font-size: 20px;
        margin-left: 30px;
      }
    }
  }
  .tel {
    float: right;
    text-align: right;
    margin-top: 22px;
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
      float: left;
      margin-right: 20px;
    }
    p {
      float: left;
      font-size: 14px;
      color: #666;
      span {
        font-size: 17px;
        color: #333;
        display: block;
        text-decoration: underline;
       
      }
    }
  }
}
::v-deep{
   .el-dropdown-menu{
            .el-dropdown-menu__item{
              .el-button{
               span{
                  color: @primaryColor;
               }
              }
            }
          }
}

</style>>
