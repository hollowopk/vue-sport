<template>
  <!-- 食物热量详细信息 -->
  <div class="box">
    
    <div class="restitle">
      <div class="cir">
        <p></p>
      </div>
      <div class="restitle_1">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/calorie' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item :to="{ path: '/materialSec' }">{{
            firstname
          }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ resname }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="container_2">
      <div class="solid">
        <p>{{ resname }}的营养详情</p>
        <hr class="hh" />
      </div>
      <div class="data">
        <ul>
          <li class="data-1">
            名称:&nbsp;
            <p>{{ resname }}</p>
          </li>
          <i></i>
          <li class="data-2">
            热量:&nbsp;
            <p>{{ data_1 }}大卡（100克）</p>
          </li>
          <i></i>
          <li class="data-3">
            分类:&nbsp;
            <p>{{ firstname }}</p>
          </li>
          <i></i>
        </ul>
      </div>
      <div class="container_3">
        <div class="solid">
          <p>营养信息</p>
          <hr class="hh" />
        </div>
        <ul>
          <li class="title_1">
            <p class="name_1">营养素</p>
            <p class="name_2">含量(每100克)</p>
            <p class="name_3">营养素</p>
            <p class="name_2">含量(每100克)</p>
          </li>
          <i></i>
          <li class="title_2">
            <p class="name_1">热量(大卡)</p>
            <p class="name_2">{{data_1}}</p>
            <p class="name_3">碳水化合物(克)</p>
            <p class="name_4">{{data_3}}</p>
          </li>
          <i></i>
          <li class="title_2">
            <p class="name_1">脂肪(克)</p>
            <p class="name_2">{{data_6}}</p>
            <p class="name_3">蛋白质(克)</p>
            <p class="name_4">{{data_8}}</p>
          </li>
          <i></i>
          <li class="title_2">
            <p class="name_1">纤维素(毫克)</p>
            <p class="name_2">{{data_7}}</p>
            <p class="name_3">钙量(毫克)</p>
            <p class="name_4">{{data_2}}</p>
          </li>
          <i></i>
          <li class="title_2">
            <p class="name_1">胡萝卜素(毫克)</p>
            <p class="name_2">{{data_4}}</p>
            <p class="name_3">胆固醇(克)</p>
            <p class="name_4">{{data_5}}</p>
          </li>
          <i></i>
          <li class="title_2">
            <p class="name_1">维生素A(毫克)</p>
            <p class="name_2">{{data_9}}</p>
            <p class="name_3">维生素B1(毫克)</p>
            <p class="name_4">{{data_10}}</p>
          </li>
          <i></i>
          <li class="title_2">
            <p class="name_1">维生素B2(毫克)</p>
            <p class="name_2">{{data_11}}</p>
            <p class="name_3">维生素C(毫克)</p>
            <p class="name_4">{{data_12}}</p>
          </li>
          <i></i>
          <li class="title_2">
            <p class="name_1">维生素E(毫克)</p>
            <p class="name_2">{{data_13}}</p>
            <p class="name_3">含锌量(毫克)</p>
            <p class="name_4">{{data_14}}</p>
          </li>
          <i></i>
        </ul>
        <div class="solid">
          <p>拓展信息</p>
          <hr class="hh" />
        </div>
      </div>
      <div class="container_4">
        <ul>
          <li v-for="(resitem, resindex) in resContent" :key="resindex" v-show="isShow" @click="goDetails(resitem.name)" style="cursor: pointer">
            <img :src="resitem.avatar" alt="" />
            <div class="title">
              {{resitem.name}}
              <p>蛋白质: {{resitem.protein}} (每100克)</p>
              <p>热量(大卡): {{resitem.energy}} (每100克)</p>
            </div>
          </li>
          <li v-show="!isShow" @click="goDetails(resContent.name)" style="cursor: pointer">
            <img :src="resContent.avatar" alt="" />
            <div class="title">
              {{resContent.name}}
              <p>蛋白质: {{resContent.protein}} (每100克)</p>
              <p>热量(大卡): {{resContent.energy}} (每100克)</p>
            </div>
          </li>
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
       isShow:true,
      //拓展信息请求返回值
      resContent: "",
      //食物详细名称
      resname: "",
      //请求参数
      content: "",
      //请求返回值
      resData: "",
      //食物名称分类
      firstname: "",
      //热量
      data_1: "",
      //钙量
      data_2: "",
      //碳水化合物
      data_3: "",
      //胡萝卜素
      data_4: "",
      //胆固醇
      data_5: "",
      //脂肪
      data_6: "",
      //纤维
      data_7: "",
      //蛋白质
      data_8: "",
      //维生素A
      data_9: "",
      //维生素B1
      data_10: "",
      //维生素B2
      data_11: "",
      //维生素C
      data_12: "",
      //维生素E
      data_13: "",
      //含锌量
      data_14: "",
    };
  },
  methods: {
    //总搜索函数
    search() {
      this.getRequest("/api/food/name/", this.content).then((res) => {
        var res = res.extend.pageInfo.list[0];
        //请求返回值
        this.resData = res;
        //食物分类
        this.firstname = res.category;
        //热量
        (this.data_1 = res.energy),
          //钙量
          (this.data_2 = res.ca),
          //碳水化合物
          (this.data_3 = res.carbohydrate),
          //胡萝卜素
          (this.data_4 = res.carotene),
          //胆固醇
          (this.data_5 = res.cholesterol),
          //脂肪
          (this.data_6 = res.fat),
          //纤维
          (this.data_7 = res.fiber),
          //蛋白质
          (this.data_8 = res.protein),
          //维生素A
          (this.data_9 = res.vitaminA),
          //维生素B1
          (this.data_10 = res.vitaminB1),
          //维生素B2
          (this.data_11 = res.vitaminB2),
          //维生素C
          (this.data_12 = res.vitaminC),
          //维生素E
          (this.data_13 = res.vitaminE),
          //含锌量
          (this.data_14 = res.zn),
          console.log(res);
      });
      this.$notify({
        title: "搜索成功",
        message: "搜索成功",
        type: "success",
      });
      //this.content = "";
    },
    getExpand() {
      this.getRequest("/api/recipe/", this.content).then((res) => {
        var res = res.extend.pageInfo;
        if (res.length == 1) {
          this.resContent = res[0];
          this.isShow = false
        } else if (res.length > 1) {
          this.resContent = res;
          this.isShow = true
        } else {
          this.resContent = "";
        }
      });
    },
    goDetails(itemname) {
      this.$router.push({ name: "details", params: { name: itemname } });
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
      this.resname = name;
      this.search();
      this.getExpand();
    } else {
      this.content = "";
    }
  },
};
</script>

<style lang="less" scoped>
.box {
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
  //尾部字体
  .card_title {
    width: 100%;
    height: 200px;
    margin: 120px auto;
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
    height: 840px;
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
      background: rgb(249, 249, 249);
      p {
        margin-left: 22px;
      }
      .hh {
        width: 846px;
        margin: 0 auto;
        color: rgb(28, 189, 55);
        margin-bottom: 10px;
      }
    }
    .data {
      ul {
        margin-top: 20px;
        i {
          display: block;
          width: 830px;
          height: 0.3px;
          background: rgb(227, 227, 227);
          margin: 0 auto;
        }
        .data-1 {
          list-style-type: none;
          display: flex;
          line-height: 18px;
          font-size: 14px;
          font-weight: 600;
          margin: 8px auto;
          margin-left: 12px;
          p {
            font-weight: 100;
            font-size: 15px;
            margin-left: 3px;
          }
        }
        .data-2 {
          list-style-type: none;
          display: flex;
          line-height: 18px;
          font-size: 14px;
          font-weight: 600;
          margin: 8px auto;
          margin-left: 12px;
          p {
            font-weight: 100;
            font-size: 15px;
            margin-left: 3px;
          }
        }
        .data-3 {
          list-style-type: none;
          display: flex;
          line-height: 18px;
          font-size: 14px;
          font-weight: 600;
          margin: 8px auto;
          margin-left: 12px;
          p {
            font-weight: 600;
            font-size: 15px;
            margin-left: 3px;
            color: rgb(255, 51, 51);
          }
        }
      }
    }
    .container_3 {
      .solid {
        margin-top: 30px;
        height: 38px;
        line-height: 38px;
        background: rgb(249, 249, 249);
        p {
          margin-left: 22px;
        }
        .hh {
          width: 846px;
          margin: 0 auto;
          color: rgb(28, 189, 55);
          margin-bottom: 10px;
        }
      }
      ul{
        position: relative;
        i {
          display: block;
          width: 830px;
          height: 0.3px;
          background: rgb(227, 227, 227);
          margin: 0 auto;
        }
        .title_1{
          list-style-type: none;
          font-weight: 1000;
          font-size: 14px;
          margin-left: 20px;
          display: flex;
          margin-top: 18px;
          margin-bottom: 14px;
          .name_2{
            margin-left: 220px;
          }
          .name_3{
            margin-left: 100px;
          }
        }
        .title_2{
          list-style-type: none;
          font-weight: 100;
          font-size: 14px;
          margin-left: 20px;
          display: flex;
          margin-top: 12px;
          margin-bottom: 12px;
          .name_2{
             position: absolute;
            left: 325px;
          }
          .name_3{
            position: absolute;
            left: 450px;
          }
          .name_4{
            position: absolute;
            left: 790px;
          }
        }
      }
    }
    .container_4 {
      ul {
        li {
          list-style-type: none;
          display: flex;
          float: left;
          margin-top: 3px;
          margin-left: 10px;
          img{
            height: 80px;
            width: 80px;
            border-radius: 15px;
            margin-top: 10px;
            margin-left: 10px;
          }
          .title{
            font-size: 13px;
            font-weight: 100;
            margin-left: 15px;
            margin-top: 20px;
            p{
              margin-top: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
