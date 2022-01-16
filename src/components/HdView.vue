<template>
  <div class="header">
    <a href="#">
      <img class="logo" src="@/assets/bohe_images/1.png" />
    </a>

    <div class="nav">
      <el-menu
        mode="horizontal"
        :default-active="activeIndex"
        class="el-menu-demo"
      >
        <template v-for="item in navList">
          <el-menu-item :index="item.index" :key="item.index" >
            <span @click="changeNav(item.path, item.index)">{{
              item.name
            }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <!--
     <ul class="nav">
      <li>
        <a @click="goTest" style="cursor: pointer"> 健康菜谱 </a>
      </li>
      <li><a @click="goAbout">在线预约</a></li>
      <li><a @click="goAbout"> 食物</a></li>
      <li><a @click="goAbout">在线预约</a></li>
     <li><a href="https://yhy.imut.cloud">可视大屏</a></li>
      <li>
        <a @click="goData"> 用户数据 </a>
        <div class="down">
          <div class="list">
            <div class="box">
              <p>会员中心</p>
            </div>
          </div>
        </div>
      </li>
      <li>
        <a href="#"> 关于我们 </a>
        <div class="down">
          <div class="list">
            <div class="box">
              <p>团队简介</p>
            </div>
          </div>
        </div>
      </li> 
      
    </ul>
    -->
    <div class="tel">
      <p>云计算中心<span @click="handleLogin">用户登录</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "recipes",
  data() {
    return {
      //默认选中菜单
      activeIndex: "1",
      navList: [
        {
          index: "1",
          name: "首页",
          path: "/recipes",
        },
        {
          index: "2",
          name: "健康菜谱",
          path: "/menus",
        },
        {
          index: "3",
          name: "食物热量",
          path: "/calorie",
        },
        {
          index: "4",
          name: "个人中心",
          path: "/owndetail",
        },
      ],
    };
  },
  methods: {
    /**
     * 切换菜单栏
     */
    changeNav(path, i) {
      this.activeIndex = i;
      console.log(i, path);
      this.$router.push(path);
    },
    /**
     * 用户登录页面跳转
     */
    handleLogin(){
       this.$router.push("/login");
    },
    
    goTest() {
      this.$router.push("/News");
    },
    goData() {
      this.$router.push("/data");
    },
    goAbout() {
      this.$router.push("/about");
    },
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
.active{
   border-bottom: 2px solid #009688;
  color: #009688;
}
.header {
  width: 1160px;
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
    margin-left: 100px;
    margin-top: 5px;
    .el-menu.el-menu--horizontal{
      border-bottom: none;
    }
    .el-menu--horizontal>.el-menu-item.is-active{
      border-bottom: 2px solid #009688;
      color: #009688;
      transition: 2s;
    }
    .el-menu{
      .el-menu-item{
        font-size: 20px;
        margin-left: 30px;
      }
     
    }
    /* li {
      float: left;
      position: relative;
      &:hover {
        .down {
          display: block;
        }
      }
      a {
        display: block;
        line-height: 80px;
        padding: 0 25px;
        font-size: 16px;
        color: #333;
        &:hover {
          color: #009ee6;
        }
      }
      .down {
        width: 130px;
        background: #333;
        border-top: 2px solid #009ee6;
        position: absolute;
        top: 65px;
        left: 0;
        display: none;
        .list {
          height: 40px;
          line-height: 7px;
          &:hover {
            background: #666;
            .box {
              border-color: #009ee6;
            }
          }
          .box {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 2px solid #ccc;
            float: left;
            margin-left: 5px;
            margin-top: 15px;
          }
          p {
            float: left;
            margin-left: 18px;
            color: #ccc;
            width: 150px;
            font-size: 15px;
            &:hover {
              color: #fff;
            }
          }
        }
      }
    } */
  }
  .tel {
    float: right;
    text-align: right;
    margin-top: 22px;
    cursor: pointer;
    p {
      font-size: 14px;
      color: #666;
      span {
        font-size: 19px;
        color: #333;
        display: block;
        font-weight: 600;
      }
    }
  }
}
</style>>
