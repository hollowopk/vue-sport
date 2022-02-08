<template>
  <!-- 食物热量详情页 -->
  <div class="box">
    <div class="search">
      <div class="title">
        <h2>超过50万种食物数据</h2>
        <span>食物营养查询,吃适合的食物</span>
      </div>
      <img src="@/assets/bohe_images/bg.png" />
      <div class="container">
        <input
          type="text"
          placeholder="超全食物营养库，饭前查一查饮食更健康"
          @keyup.enter="search"
          v-model="content"
        />
        <!-- <img src="@/assets/bohe_images/sousuo.png" alt=""> -->
      </div>
    </div>
    <div class="restitle">
      <div class="cir">
        <p></p>
      </div>
      <div class="restitle_1">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/material' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>{{ resname }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="container_2">
      <div class="solid">
        <p>食物营养详情</p>
        <hr class="hh" />
      </div>
      <div class="data">
        <ul class="data_1">
          <li
            v-for="(Resitem, Resindex) in resData"
            :key="Resindex"
            @click="goDetails(Resitem.name)"
          >
            <div class="data_1_txt" style="cursor: pointer">
              {{ Resitem.name }}
              <p>
                热量:{{ Resitem.energy }}大卡(每100克)&nbsp;&nbsp;蛋白质:{{
                  Resitem.protein
                }}克(每100克)
              </p>
            </div>
            <el-divider content-position="right">{{
              Resitem.category
            }}</el-divider>
            <!-- <div class="xian" style="width: 850px">
                <hr
                  size="1"
                  color="#E3E3E3"
                  width="830px"
                  style="margin: 0 auto"
                />
              </div> -->
          </li>
          <!-- 分页 -->
          <el-pagination
            background
            @current-change="pageChange"
            layout="prev, pager, next"
            :current-page.sync="page"
            :total="total_page"
            :page-size="pageSize"
            style="position: absolute; top: 780px"
          >
          </el-pagination>
        </ul>
      </div>
    </div>
    <div class="card_title">
      <div class="card_title_1">
        <b></b>
        易氧健康&nbsp;吃的放心用的舒心
        <p>
          团队耕耘项目多年,以“让科技领导食物营养”为宗旨；不断加强创新能力以及对食物研究深度，为中国用户提供包含食谱查询、食物营养查询,个人健康可视化数据中心;让年轻人、中老年人轻松拥抱健康生活。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total_page: 60,
      page: 1,
      resname: "",
      pageSize: 10,
      resData: "",
      content: "",
      contents: [
        {
          picUrl: require("../assets/bohe_images/1_1.png"),
          name: "调味品",
          describe: "食盐 榨菜 酱油 醋 芝麻酱",
        },
        {
          picUrl: require("../assets/bohe_images/1_2.png"),
          name: "谷薯芋、杂豆、主食",
          describe: "米饭 鲜玉米 馒头 燕麦片 红薯",
        },
        {
          picUrl: require("../assets/bohe_images/1_3.png"),
          name: "蛋类、肉类及制品",
          describe: "鸡蛋 咸鸭蛋 猪肉(瘦) 鸡 鲤鱼",
        },
        {
          picUrl: require("../assets/bohe_images/1_4.png"),
          name: "奶类及制品",
          describe: "牛奶 酸奶 奶酪 全脂牛奶粉 奶片",
        },
        {
          picUrl: require("../assets/bohe_images/1_5.png"),
          name: "蔬果和菌藻",
          describe: "苹果 香蕉 番茄 黄瓜 小白菜",
        },
        {
          picUrl: require("../assets/bohe_images/1_6.png"),
          name: "坚果、大豆及制品",
          describe: "核桃(干) 花生米(生) 栗子 黄豆 豆浆",
        },
        {
          picUrl: require("../assets/bohe_images/1_7.png"),
          name: "饮料",
          describe: "咖啡粉 茶水 杏仁露 椰子汁 啤酒",
        },
        {
          picUrl: require("../assets/bohe_images/1_8.png"),
          name: "食用油、油脂及制品",
          describe: "豆油 花生油 色拉油 辣椒油 猪油(炼)",
        },
        {
          picUrl: require("../assets/bohe_images/1_9.png"),
          name: "零食、点心、冷饮",
          describe: "饼干 巧克力 太妃糖 红薯干 冰淇淋",
        },
        {
          picUrl: require("../assets/bohe_images/1_10.png"),
          name: "其它",
          describe: "枸杞 陈皮 冬虫夏草 葛根 薄荷(鲜)",
        },
      ],
    };
  },
  methods: {
    search() {
      this.foodRequest("/api/food/name/", {
        category: this.content,
        pageSize: this.pageSize,
        pn: this.page,
      }).then((res) => {
        if (res.extend.pageInfo.list != "") {
          this.resData = res.extend.pageInfo.list;
          this.$notify({
            title: "搜索成功",
            message: "搜索成功",
            type: "success",
          });
        } else {
          this.resData = "";
          this.$message({
            message: "暂时没有更多了哦,搜索其他的试试吧...",
            type: "warning",
          });
        }
        this.total_page = parseInt(res.extend.pageInfo.total);
        this.resname = this.content;
      });
    },
    //页面变化监听函数
    pageChange(current) {
      this.page = current;
      this.search();
      //this.pageIn(this.page);
      //alert(current)
    },
    //跳转到食物详情
    goDetails(detailed) {
      this.$router.push({ name: "Materialfor", params: { name: detailed } });
    },
  },
  mounted() {
    //自动加载到顶部
    if (document.body.scrollTop) {
      document.body.scrollTop = 0;
    } else {
      document.documentElement.scrollTop = 0;
    }
    //跳转接收参数
    var name = this.$route.params.name;
    if (name) {
      this.content = name;
      this.search();
    } else {
      this.content = "";
    }
  },
};
</script>

<style lang="less" scoped>
// 动画
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
//针对不同浏览器，输入框内placeholder字体控制
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
//大盒子
.box {
  width: 100%;
  //搜索部分背景
  .search {
    width: 100%;
    height: 540px;
    background: url("../assets/bohe_images/1.png") no-repeat center;
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
  //搜索框
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
      background: url("../assets/bohe_images/sousuo.png") no-repeat 0 0;
      background-size: 35px 35px;
      background-position: 698px;
      //position: relative;
    }
    input:focus {
      outline: none;
    }
  }
  //尾部字体
  .card_title {
    width: 100%;
    height: 200px;
    margin: 50px auto;
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
  }
  // 中间方框
  .container_2 {
    width: 850px;
    height: 820px;
    margin: 0 auto;
    border: 1px solid rgb(227, 227, 227);
    margin-top: 80px;
    .el-divider .el-divider--horizontal {
      height: 10px;
    }
    position: relative;
    .solid {
      height: 38px;
      line-height: 38px;
      p {
        margin-left: 22px;
      }
      .hh {
        width: 846px;
        margin: 0 auto;
        color: rgb(97, 204, 115);
        margin-bottom: 10px;
      }
    }
    .data {
      margin-top: 24px;
      .data_1 {
        li {
          list-style-type: none;
          .data_1_txt {
            margin-left: 25px;
            margin-top: -10px;
            margin-bottom: -10px;
            font-size: 17px;
            font-weight: 100;
            color: rgb(63, 150, 41);
            letter-spacing: 5.5px;
            &:hover {
              color: rgb(0, 0, 0);
            }
            p {
              font-size: 13px;
              color: rgb(153, 153, 153);
              line-height: 18px;
              letter-spacing: 0.5px;
              margin-top: 3px;
            }
          }
        }
      }
    }
  }
  //表头
  .restitle {
    width: 850px;
    height: 20px;
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: -80px;
    display: flex;
    .cir {
      margin-right: 5px;
      p {
        display: block;
        height: 10px;
        width: 5px;
        background: rgb(97, 204, 115);
      }
    }
    .restitle_1 {
      margin-top: -2px;
    }
  }
}
</style>
