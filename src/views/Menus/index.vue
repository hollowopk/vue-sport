<template>
  <div class="box">
    <!--v-loading.fullscreen.lock="fullscreenLoading"-->
    <div class="search">
      <div class="title">
        <h2>超过10万种食谱数据</h2>
        <span>食物做法查询,吃适合的食物</span>
      </div>
      <img src="@/assets/bohe_images/bg.png" />
      <div class="container">
        <input
          type="text"
          placeholder="超全食谱营养库，饭前查一查饮食更健康"
          @keyup.enter="search"
          v-model="content"
        />
      </div>
    </div>

    <div class="title_1">
      <h3>健康食谱&nbsp;·&nbsp;精心推荐</h3>
      <p>Recipe recommendation</p>
      <b></b>
    </div>
    <!-- 长圆角卡片 -->
    <!-- <div class="container_1">
      <ul class="list">
        <li v-for="(Resitem, Resindex) in contents" :key="Resindex">
          <div class="list_box">
            <img :src="Resitem.picUrl" alt="" />
            <div class="list_box_1">
              {{ Resitem.name }}
              <p>{{ Resitem.describe }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div> -->
    <!-- 方形卡片 -->
    <ul class="card" v-show="!isShow">
      <li
        class="card_0"
        v-for="(resitem, resindex) in contents"
        :key="resindex"
      >
        <div
          class="card_1"
          @click="goDetails(resitem.name)"
          style="cursor: pointer"
        >
          <img :src="resitem.avatar" />
          <div class="title_0">
            {{ resitem.name }}
            <p>
              风味:{{ resitem.taste }}&nbsp;&nbsp;难度:{{ resitem.difficulty }}
            </p>
          </div>
        </div>
      </li>
    </ul>
    <ul class="card" v-show="isShow">
      <li class="card_0">
        <div
          class="card_1"
          style="cursor: pointer"
          @click="goDetails(contents.name)"
        >
          <img :src="contents.avatar" />
          <div class="title_0">
            {{ contents.name }}
            <p>
              风味:{{ contents.taste }}&nbsp;&nbsp;难度:{{
                contents.difficulty
              }}
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div class="fixs"></div>
    <!-- <div class="fixs_1"></div> -->
    <footerTop />
    <footerBottom />
  </div>
</template>

<script>
import footerTop from "@/components/footer/footerTop.vue";
import footerBottom from "@/components/footer/footerBottom.vue";
export default {
  name: "menus",
  components: {
    footerTop,
    footerBottom,
  },
  data() {
    return {
      fullscreenLoading: false,
      content: "",
      currentDate: new Date(),
      isShow: false,
      contents: [
        {
          picUrl: require("@/assets/bohe_images/10.png"),
          name: "枸杞燕窝",
          describe: "有助于美容养颜，适合于女性补充所需营养物质",
        },
      ],
    };
  },
  methods: {
    search() {
      (this.fullscreenLoading = true),
        this.$api.getRecipe({ name: this.content }).then((res) => {
          //console.log(res.data.extend.pageInfo.length)
          //console.log(res.status)
          if (res.status === 200) {
            if (res.data.extend.pageInfo.length > 0) {
              this.isShow = false;
            } else {
              this.isShow = true;
              this.$message({
              message: "没有更多了哦~",
              type: "warning",
            });
            }
            this.contents = res.data.extend.pageInfo;
            this.content = "";
            /* this.$notify({
            title: "搜索成功",
            message: "搜索成功",
            type: "success",
          });
          */
          } else {
            this.$message({
              message: "没有更多了哦~",
              type: "warning",
            });
          }
        });
      this.fullscreenLoading = false;
    },
    goDetails(itemname) {
      this.$router.push({ name: "details", params: { name: itemname } });
    },
  },
  mounted() {
    /*  if (document.body.scrollTop) {
      document.body.scrollTop = 0;
    } else {
      document.documentElement.scrollTop = 0;
    }
    */
    var name = this.$route.params.name;
    this.content = name;
    //如果是首页搜索进来的，页面固定在菜单栏的一定高度，直接显示具体的内容
    if (name) {
      this.search();
      document.documentElement.scrollTop = 200;
    } else {
      //alert("111")
      this.content = "";
      this.search();
      document.documentElement.scrollTop = 0;
    }
  },
};
</script>

<style lang="less" scoped>
@keyframes banner {
  0% {
    top: 140px;
  }
  50% {
    top: 180px;
  }
  100% {
    top: 140px;
  }
}
::-webkit-input-placeholder {
  color: rgb(255, 255, 255);
  font-size: 17px;
  font-weight: 100;
}
:-moz-placeholder {
  color: rgb(255, 255, 255);
  font-size: 17px;
  font-weight: 100;
}
::-moz-placeholder {
  color: rgb(255, 255, 255);
  font-size: 17px;
  font-weight: 100;
}
:-ms-input-placeholder {
  color: rgb(255, 255, 255);
  font-size: 17px;
  font-weight: 100;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.box {
  width: 100%;
  .search {
    width: 100%;
    height: 540px;
    background: url("../../assets/bohe_images/1.png") no-repeat center;
    img {
      width: 250px;
      height: 160px;
      position: absolute;
      right: 8%;
      top: 140px;
      animation: banner 6s linear infinite;
    }
    .title {
      padding-top: 140px;
      h2 {
        font-weight: 100;
        font-size: 45px;
        color: #fff;
        text-align: center;
      }
      span {
        padding-top: 20px;
        display: block;
        font-weight: 100;
        color: #fff;
        font-size: 22px;
        text-align: center;
      }
    }
  }
  .container {
    margin-top: 115px;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 750px;
      height: 40px;
      border-radius: 35px;
      border: 0.5px solid #fff;
      padding-left: 25px;
      //background: rgba(rgb(233, 190, 190), 0.6);
      color: rgb(255, 255, 255);
      font-size: 18px;
      font-weight: 100;
      background: url("../../assets/bohe_images/sousuo.png") no-repeat 0 0;
      background-size: 35px 35px;
      background-position: 698px;
      //position: relative;
    }
    input:focus {
      outline: none;
    }
  }
  //标题
  .title_1 {
    margin-top: 50px;
    margin-bottom: 30px;
    text-align: center;
    h3 {
      font-size: 30px;
      color: rgb(255, 86, 98);
      font-weight: 100;
    }
    p {
      font-size: 14px;
      color: #888;
      margin: 10px 0 25px;
      text-transform: uppercase;
    }
  }
  //背景固定
  .fixs {
    background: url("../../assets/bohe_images/26.png") center no-repeat fixed;
    width: 100%;
    height: 720px;
  }
  //暂时无用
  .fixs_1 {
    background: url("../../assets/bohe_images/1.png") center no-repeat;
    width: 100%;
    height: 520px;
  }
  //长圆角行卡片
  .container_1 {
    width: 1280px;
    height: auto;
    margin: 0 auto;
    .list {
      margin-left: 150px;
      li {
        width: 450px;
        height: 130px;
        list-style-type: none;
        margin: 25px 20px;
        float: left;
        //border: 1px solid rgba(136, 136, 136, 0.5);
        box-shadow: 0 2px 6px rgb(255, 86, 98);
        background: rgba(255, 255, 255, 0.5);
        display: flex;
        align-items: center;
        border-radius: 15px;
        .list_box {
          display: flex;
          margin-left: 15px;
          cursor: pointer;
          img {
            width: 110px;
            height: 110px;
            border-radius: 15px;
          }
          .list_box_1 {
            margin-left: 15px;
            margin-top: 25px;
            color: rgb(255, 86, 98);
            font-size: 18px;
            p {
              margin-top: 8px;
              font-size: 14px;
              color: #888;
            }
          }
        }
      }
    }
  }
  //方形卡片
  .card {
    width: 1300px;
    height: auto;
    margin: 0 auto;
    .card_0 {
      margin: 20px 40px;
      width: 220px;
      height: 300px;
      overflow: hidden;
      list-style-type: none;
      box-shadow: 0 7px 15px rgb(138, 137, 137);
      float: left;
      .card_1 {
        img {
          width: 220px;
          height: 220px;
        }
        .title_0 {
          color: black;
          font-size: 18px;
          font-weight: 100;
          margin: 10px 10px;
          p {
            font-size: 13px;
            color: rgb(59, 59, 59);
            margin: 5px 0;
          }
        }
      }
    }
  }
  //尾部
  /* .footer {
    margin-top: 780px;
    width: 100%;
    height: 320px;
    background: rgb(216, 223, 181);
    display: flex;
    .logo {
      margin-top: 50px;
      margin: auto 0;
      img {
        width: 250px;
        height: 90px;
        margin-left: 160%;
      }
    }
    .logo_title {
      margin-top: 50px;
      padding-left: 39%;
      font-weight: 100;
      font-size: 38px;
      margin: auto 0;
      p {
        margin-top: 30px;
        font-size: 18px;
        margin-left: -10px;
      }
    }
  } 
  .card_title {
    width: 100%;
    height: 200px;
    margin: 50px auto;
    margin-top: 130px;
    .card_title_1 {
      width: 1200px;
      height: 200px;
      margin: 0 auto;
      b {
        margin: 0 auto;
        width: 60px;
        height: 4px;
        background: rgb(55, 61, 82);
        display: block;
        border-radius: 5px;
        margin-bottom: 30px;
      }
      text-align: center;
      font-size: 44px;
      color: rgb(55, 61, 82);
      p {
        font-size: 19px;
        font-weight: 100;
        color: rgb(55, 61, 82);
        margin-top: 48px;
      }
    }
  }*/
}
</style>