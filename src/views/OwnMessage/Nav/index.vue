<template>
  <div class="nav">
    <div class="nav-title">
      <span>个人信息</span>
    </div>
    <el-menu :default-active="activeIndex">
      <template v-for="item in navList">
        <el-menu-item :index="item.navID" :key="item.navID">
          <i :class="item.icon"></i>
          <span @click="changeNav(item.navID, item.path)">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>

export default {
  name: "mynav",
  data() {
    return {
      activeIndex: "1",
      navList: [],
    };
  },
  created(){
    this.getnavList();
  },
  methods: {
     /**
     * 获取导航数据
     */
    getnavList(){
      this.$api.getNavLists({
        sort:2
      }).then((res) => {
        if(res.status === 200){
          this.navList = res.data.extend.result;
        }
      })
    },
    /**
     * 切换菜单
     */
    changeNav(index, path) {
      this.activeIndex = index;
      this.$router.push(path);
    },
  },
};
</script>
<style scoped lang="less">
.nav-title {
  font-size: 24px;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  span {
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
  }
  ::v-deep {
    .el-menu {
      .el-menu-item.is-active{
        color: #009866;
      }
    }
  }
}
.el-menu{
   .el-menu-item.is-active{
     color:@primaryColor;
   }
   .el-menu-item:focus, .el-menu-item:hover{
     background-color: #daf7f0;
   }
}
</style>