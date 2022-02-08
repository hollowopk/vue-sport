<template>
  <div class="leftnav">
    <div class="nav-title">
      <div class="container">
        <input
          type="text"
          placeholder="种类丰富的运动，总有一款适合你"
          @keyup.enter="searchSport"
          v-model="content"
        />
      </div>
    </div>
    <div class="nav">
      <el-menu
        mode="horizontal"
        :default-active="activeIndex"
        class="el-menu-demo"
      >
        <template v-for="item in navLists">
          <el-menu-item :key="item.navID" :index="item.navID">
            <span @click="changeNav(item.navID, item.msg)">{{ item.msg }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: "leftnav",
  data() {
    return {
      activeIndex: "1",
      //查询参数
      content: "",
      navLists: [
        {
          navID: "1",
          msg: "健身器械",
          path: "/sport/sportsEquipment",
        },
        {
          navID: "2",
          msg: "日常活动",
          path: "/sport/dailyActivities",
        },
        {
          navID: "3",
          msg: "体育运动",
          path: "/sport/athleticSports",
        },
        {
          navID: "4",
          msg: "球类运动",
          path: "/sport/ballGame",
        },
      ],
    };
  },
  mounted() {
    this.changeNav(this.activeIndex, this.navLists[this.activeIndex].msg);
  },
  methods: {
    /**
     * 切换菜单
     */
    changeNav(id, msg) {
      this.activeIndex = String(id);
      this.$router.push({ name: "sportsEquipment", query: { category: msg } });
    },

    /**
     * 搜索运动
     */
    searchSport() {
      if (this.content) {
        this.$router.push({
          name: "sportsEquipment",
          query: { name: this.content },
        });
      } else {
        //查询所有运动
        this.$router.push({ name: "sportsEquipment", query: { name: "all" } });
      }
    },
  },
};
</script>
<style scoped lang="less">
/deep/ .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
  background-color: transparent;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
.nav-title {
  width: 100%;
  .container {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 750px;
      height: 40px;
      border-radius: 35px;
      border: 0.5px solid @primaryColor;
      padding-left: 25px;
      //background: rgba(rgb(233, 190, 190), 0.6);
      color: grey;
      font-size: 18px;
      font-weight: 100;
      background-size: 35px 35px;
      background-position: 698px;
      //position: relative;
    }
    input:focus {
      outline: none;
    }
  }
}
.active {
  border-bottom: 2px solid @primaryColor;
  color: @primaryColor;
}
.nav {
  width: 60%;
  margin: 0 auto;
  margin-top: 5px;
  .el-menu.el-menu--horizontal {
      border-bottom: none;
       background-color: transparent;
    }
 .el-menu--horizontal > .el-menu-item.is-active {
      border-bottom: 2px solid @ownMessageColor;
      color: @ownMessageColor;
     
    }

  .el-menu {
    display: flex;
    background-color: transparent;
    flex-direction: row;
    .el-menu-item {
      text-align: center;
      flex: 20%;
      color: #1f6b39;
      font-size: 20px;
      margin-left: 3px;
    }
    .el-menu-item:hover {
      background-color: transparent;
    }
    .el-menu-item .is-active {
      border-bottom: 2px solid @primaryColor;
      color: @primaryColor;
      transition: 2s;
    }
  }
}
</style>


