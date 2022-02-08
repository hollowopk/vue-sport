<template>
  <div class="box">
    <div class="search">
      <div class="title">
        <h2>超过50万种食物数据</h2>
        <span>根据食物名称查询,吃适合的食物</span>
      </div>
      <img src="@/assets/bohe_images/bg.png" />
      <div class="container">
        <input
          type="text"
          placeholder="超全食谱营养库，饭前查一查饮食更健康"
          @keyup.enter="search"
          v-model="content"
        />
        <!-- <img src="@/assets/bohe_images/sousuo.png" alt=""> -->
      </div>
    </div>
    <div class="title_1">
      <h3>食材多种&nbsp;·&nbsp;营养分类</h3>
      <p>Recipe recommendation</p>
      <b></b>
    </div>
    <div class="center">
      <ul class="circle">
        <li v-for="(Citem, Cindex) in contents" :key="Cindex">
          <div class="circle_box" @click="goSec(Cindex)">
            <img :src="Citem.picUrl" />
            <div class="title">
              {{ Citem.name }}
              <p>{{ Citem.describe }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer_1">
      <div class="txt">
        <div class="tx">
          健康监测器
          <p>健康饮食的推荐工具 根据每日打卡数据绘制出健康表</p>
        </div>
        <div class="but">
          <el-button type="primary" round @click="goMyself">马上体验</el-button>
        </div>
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
    name:'calorie',
  
  data() {
    return {
      content: "",
      contents: [
        {
          picUrl: require("../../assets/bohe_images/1_1.png"),
          name: "调味品",
          describe: "食盐 榨菜 酱油 醋 芝麻酱",
        },
        {
          picUrl: require("../../assets/bohe_images/1_2.png"),
          name: "谷薯芋、杂豆、主食",
          describe: "米饭 鲜玉米 馒头 燕麦片 红薯",
        },
        {
          picUrl: require("../../assets/bohe_images/1_3.png"),
          name: "蛋类、肉类及制品",
          describe: "鸡蛋 咸鸭蛋 猪肉(瘦) 鸡 鲤鱼",
        },
        {
          picUrl: require("../../assets/bohe_images/1_4.png"),
          name: "奶类及制品",
          describe: "牛奶 酸奶 奶酪 全脂牛奶粉 奶片",
        },
        {
          picUrl: require("../../assets/bohe_images/1_5.png"),
          name: "蔬果和菌藻",
          describe: "苹果 香蕉 番茄 黄瓜 小白菜",
        },
        {
          picUrl: require("../../assets/bohe_images/1_6.png"),
          name: "坚果、大豆及制品",
          describe: "核桃(干) 花生米(生) 栗子 黄豆 豆浆",
        },
        {
          picUrl: require("../../assets/bohe_images/1_7.png"),
          name: "饮料",
          describe: "咖啡粉 茶水 杏仁露 椰子汁 啤酒",
        },
        {
          picUrl: require("../../assets/bohe_images/1_8.png"),
          name: "食用油、油脂及制品",
          describe: "豆油 花生油 色拉油 辣椒油 猪油(炼)",
        },
        {
          picUrl: require("../../assets/bohe_images/1_9.png"),
          name: "零食、点心、冷饮",
          describe: "饼干 巧克力 太妃糖 红薯干 冰淇淋",
        },
        {
          picUrl: require("../../assets/bohe_images/1_10.png"),
          name: "其它",
          describe: "枸杞 陈皮 冬虫夏草 葛根 薄荷(鲜)",
        },
      ],
    };
  },
  methods: {
    search() {
      this.goDetails()
      this.content = "";
    },
    goSec(index){
      this.$router.push({name:'materialSec',params: {name:index}})
    },
    goDetails() {
      this.$router.push({ name: "MaterialThird", params: { name: this.content } });
    },
    goMyself() {
      this.$router.push("/owndetail/timedata")
    },
  },
  mounted() {
    if (document.body.scrollTop) {
      document.body.scrollTop = 0;
    } else {
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
.box {
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
  .center {
    width: 980px;
    height: 1100px;
    margin: 0 auto;
    .circle {
      li {
        width: 230px;
        height: 190px;
        margin: 40px 48px;
        list-style-type: none;
        float: left;
        cursor: pointer;
        .circle_box {
          text-align: center;
          .title {
            margin-top: 30px;
            font-size: 15px;
            p {
              margin-top: 15px;
              font-size: 14px;
              font-weight: 100;
            }
          }
        }
      }
    }
  }
  .footer_1 {
    width: 100%;
    height: 220px;
    background: rgb(243, 243, 243);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
    margin-top: 100px;
    .txt {
      margin-top: 30px;
      text-align: center;
      .tx {
        font-weight: 100;
        font-size: 18px;
        letter-spacing: 2px;
        p {
          font-size: 14px;
          margin-top: 15px;
        }
      }
      .but {
        margin-top: 30px;
        text-align: center;
      }
    }
  }
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
}
</style>