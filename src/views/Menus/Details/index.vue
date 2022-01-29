<template>
  <div class="box" ><!--v-loading="loading"-->
    <div class="restitle">
      <div class="cir">
        <p></p>
      </div>
      <div class="restitle_1">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/menus' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ resname }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="introduce">
      <div class="ups">
        <div class="image_1">
          <img :src="resDetails.image" alt="" />
          <div
            class="php"
            style="
              display: block;
              font-size: 28px;
              text-algin: center;
              font-weight: 100;
              margin-left: 120px;
              margin-top: 28px;
            "
          >
            {{ resname }}
          </div>
        </div>
        <div class="detail">
          <div class="bili">
            <i></i>
            <div class="title">食材明细</div>
          </div>
          <p>主料</p>
          <div class="title_1">
            <ul>
              <li v-for="(item,index) in resDetails.MainTxt" :key="index">{{ item }}</li>
            </ul>
            <br />
            <div class="haha">
              <ul>
                <li v-for="(item,index) in resDetails.MainNum" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
          <p>配料</p>
          <div class="title_1">
            <ul>
              <li v-for="(item,index) in resDetails.AuxiliaryTxt" :key="index">
                {{ item }}
              </li>
            </ul>
            <br />
            <div class="haha">
              <ul>
                <li v-for="(item,index) in resDetails.AuxiliaryNum" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
          <div class="title_1" style="height: 55px">
            <ul>
              <li style="font-size: 16px">口味：{{ resDetails.Method[0] }}</li>
              <li style="font-size: 16px">方法：{{ resDetails.Method[1] }}</li>
              <li style="font-size: 16px">时间：{{ resDetails.Method[2] }}</li>
              <li style="font-size: 16px">难度：{{ resDetails.Method[3] }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="public_title">
        <div class="title">
          <h3>本道菜品 · 营养分析</h3>
          <p>Nutritional analysis</p>
          <b></b>
        </div>
      </div>
      <div class="analys">
        <div class="circle_1">
          <el-progress
            type="dashboard"
            v-if="percentage_1"
            :percentage="percentage_1"
            :color="colors"
            :show-text="true"
          ></el-progress>
          <p>蛋白质</p>
        </div>
        <div class="circle_1">
          <el-progress
            type="dashboard"
            v-if="percentage_3"
            :percentage="percentage_3"
            :color="colors"
            :show-text="true"
          ></el-progress>
          <p>&nbsp;&nbsp;&nbsp;糖</p>
        </div>
        <div class="circle_1">
          <el-progress
            type="dashboard"
            v-if="percentage_2"
            :percentage="percentage_2"
            :color="colors"
            :show-text="true"
          ></el-progress>
          <p>&nbsp;&nbsp;热量</p>
        </div>
      </div>
      <div class="public_title">
        <div class="title">
          <h3>本道菜品 · 做法步骤</h3>
          <p>Practice steps</p>
          <b></b>
        </div>
      </div>
      <div class="down">
        <ul class="imageUrl">
          <li
            v-for="(Picitem, Picindex) in resDetails.stepsPic"
            :key="Picindex"
          >
            <img :src="Picitem" alt="" />
          </li>
        </ul>
        <div class="steps">
          <el-steps direction="vertical" :active="resDetails.steps.length">
            <el-step
              v-for="(Resitem, Resindex) in resDetails.steps"
              :title="'步骤' + parseInt(Resindex + 1)"
              :description="Resitem"
              :key="Resindex"
            ></el-step>
          </el-steps>
        </div>
      </div>
    </div>
    <!-- <div class="swipper">
      <el-carousel height="278px" width="340px">
        <el-carousel-item v-for="item in picUrl" :key="item.id">
          <img :src="item.pic" />
        </el-carousel-item>
      </el-carousel>
    </div> -->
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
  methods: {
    search(name) {
      console.log("name",name);
      this.fullscreenLoading = true;
        this.$api.getRecipe(
          {name:name}
        ).then((res) => {
        if(res.status === 200){
          console.log("res",res.data.extend.pageInfo[0]);
        var res = res.data.extend.pageInfo[0];
        this.resDetails.stepsPic = res.stepsPic;
        this.resDetails.steps = res.steps;
        this.resDetails.image = res.avatar;
        this.resname = res.name;
        this.resDetails.Method[0] = res.taste;
        this.resDetails.Method[1] = res.cookingMethod;
        this.resDetails.Method[2] = res.time;
        this.resDetails.Method[3] = res.difficulty;
        this.percentage_2 =parseFloat(res.energy);
        console.log("111111",res.energy,this.percentage_2);
        this.percentage_3 = parseFloat(res.protein);
        this.percentage_1 = parseFloat(res.carbohydrate);
        this.resDetails.Ingredients = res.composition;
        for (var i = 0, j = 0; i < res.composition.length; i++) {
          if (res.composition[i].category == "主料") {
            this.resDetails.MainTxt[i] = res.composition[i].foodName;
            this.resDetails.MainNum[i] = res.composition[i].quantity;
          } else {
            this.resDetails.AuxiliaryTxt[j] = res.composition[i].foodName;
            this.resDetails.AuxiliaryNum[j] = res.composition[i].quantity;
            j++;
          }
        }
        }
      });
      this.fullscreenLoading = false;
    },
  },
  mounted() {
    var name = this.$route.params.name;
    this.search(name);
    if (document.body.scrollTop) {
      document.body.scrollTop = 0;
    } else {
      document.documentElement.scrollTop = 0;
    }
  },
  data() {
    return {
      fullscreenLoading: false,
      contents: "",
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#ADFF2F", percentage: 60 },
        { color: "#1E90FF", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
      picUrl: [
      ],
      resDetails: {
        image: "", //菜品图片
        MainTxt: [], //主料
        MainNum: [], //主料数量
        AuxiliaryTxt: [], //辅料
        AuxiliaryNum: [], //辅料数量
        Method: [], //口味、工艺、耗时、难度
        Ingredients: [],
        stepsPic: [
          //菜谱详细步骤图片
         
        ],
        steps: [
          //菜谱详细步骤配文
       
        ],
      },
      percentage_1:0, //蛋白质
      percentage_2:0, //糖
      percentage_3:0, //热量
      resname: "",
    };
  },
};
</script>

<style scoped lang="less">
html,
body {
  background: rgb(0, 0, 0);
}
.swipper {
  width: 1278px;
  margin: 50px auto;
  width: 640px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
//表头
.restitle {
  width: 1130px;
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
.introduce {
  width: 1100px;
  height: 530px;
  margin: 50px auto;
  margin-top: 90px;
  .ups {
    display: flex;
    .image_1 {
      img {
        width: 400px;
        height: 400px;
        border-radius: 15px;
        box-shadow: 0 0 15px rgb(248, 238, 184);
      }
    }
    .detail {
      margin-top: 0px;
      p {
        margin-left: 95px;
        margin-bottom: 10px;
        font-size: 18px;
      }
      .bili {
        display: flex;
        i {
          width: 5px;
          height: 5px;
          background: rgb(255, 86, 98);
          border-radius: 50%;
          margin-left: 100px;
          margin-top: 12px;
        }
        .title {
          font-weight: 100;
          font-size: 23px;
          color: rgb(255, 86, 98);
          margin-left: 10px;
          margin-bottom: 10px;
        }
      }
      .title_1 {
        font-weight: 400;
        margin-bottom: 20px;
        font-size: 18px;
        width: 500px;
        height: 150px;
        border: 1px solid rgba(255, 86, 98, 0.5);
        border-radius: 15px;
        margin-left: 70px;
        ul {
          float: left;
          margin-top: 5px;
          width: 500px;
          height: 12px;
          li {
            color: rgb(0, 0, 0);
            font-size: 20px;
            list-style-type: none;
            float: left;
            margin-left: 25px;
            line-height: 40px;
          }
        }
        .haha {
          ul {
            margin-left: -20px;
            li {
              font-size: 12px;
              margin-left: 45px;
              color: rgba(0, 0, 0, 0.5);
            }
          }
        }
      }
    }
  }
  .down {
    display: flex;
    margin-top: 30px;
    margin-left: 80px;
    .imageUrl {
      li {
        list-style-type: none;
        margin-bottom: 10px;
        img {
          width: 170px;
          height: 170px;
        }
      }
    }

    .steps {
      margin-left: 80px;
    }
  }
  .public_title {
    width: 1160px;
    height: 140px;
    margin: 0 auto;
    //background: #ccc;
    text-align: center;
    overflow: hidden;
    // 公共标题样式
    .title {
      margin-top: 60px;
      h3 {
        font-size: 28px;
        color: rgb(255, 86, 98);
        font-weight: 100;
      }
      p {
        font-size: 14px;
        color: #888;
        margin: 10px 0 25px;
        text-transform: uppercase;
      }
      b {
        width: 70px;
        height: 2px;
        background: rgb(255, 86, 98);
        margin: 0 auto;
        display: block;
      }
    }
  }
  .analys {
    margin-top: 40px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    .circle_1 {
      margin: 0 60px;
      p {
        font-weight: 100;
        font-size: 22px;
        margin-left: 32px;
      }
    }
  }
}
.card_title {
  width: 100%;
  height: 200px;
  margin: 50px auto;
  margin-top: 145%;
  margin-bottom: 20px;
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
</style>