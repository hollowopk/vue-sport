<template>
  <div class="box" style="overflow-y: scroll; width: 100%; height: 100%"><!--v-loading="loading"-->
   <el-backtop :visibility-height="clientH - 1000" :bottom="60">
       <i class="el-icon-caret-top"></i>
  </el-backtop>
    <Divider />
    <div class="restitle">
      <div class="cir">
        <p></p>
      </div>
      <div class="restitle_1">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/menus' }">菜谱首页</el-breadcrumb-item>
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
            <div class="title">食材明细
              <span>
                <el-button @click="handFoodClock">今日打卡该食物</el-button>
              </span>
            </div>
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
            :percentage="percentage_1 >= 100 ? 100 : percentage_1"
            :color="colors"
            :show-text="true"
          ></el-progress>
          <p>蛋白质</p>
        </div>
        <div class="circle_1">
          <el-progress
            type="dashboard"
            v-if="percentage_3"
            :percentage="percentage_3 >= 100 ? 100 : percentage_3"
            :color="colors"
            :show-text="true"
          ></el-progress>
          <p>&nbsp;&nbsp;&nbsp;糖</p>
        </div>
        <div class="circle_1">
          <el-progress
            type="dashboard"
            v-if="percentage_2"
            :percentage="percentage_2 >= 100 ? 100 : percentage_2"
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
              style="height:186px;"
            ></el-step>
          </el-steps>
        </div>
      </div>

      <!-- 清除浮动-->
       <div class="styinfo"> 
    </div>
    </div>
   
    <!-- <div class="swipper">
      <el-carousel height="278px" width="340px">
        <el-carousel-item v-for="item in picUrl" :key="item.id">
          <img :src="item.pic" />
        </el-carousel-item>
      </el-carousel>
    </div> -->
    <footerBottom />
  </div>
</template>

<script>
import Divider from "../../../components/Divider.vue"
import footerBottom from "@/components/footer/footerBottom.vue"
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  components:{Divider,footerBottom},
  methods: {
    ...mapMutations(["setCal"]),
    ...mapGetters(["getCal"]),
    search(name) {
      this.fullscreenLoading = true;
        this.$api.getRecipe(
          {name:name}
        ).then((res) => {
        if(res.status === 200){
        var res = res.data.extend.pageInfo[0];
        this.resDetails.stepsPic = res.stepsPic;
        this.resDetails.steps = res.steps;
        this.resDetails.image = res.avatar;
        this.resname = res.name;
        this.resDetails.Method[0] = res.taste;
        this.resDetails.Method[1] = res.cookingMethod;
        this.resDetails.Method[2] = res.time;
        this.resDetails.Method[3] = res.difficulty;
        //菜谱热量
        this.menuCale = res.energy;
        this.percentage_2 =parseFloat(res.energy / 2.89).toFixed(2) -0;
        this.percentage_3 = parseFloat(res.protein / 0.2388).toFixed(2) -0;
        this.percentage_1 = parseFloat(res.carbohydrate / 0.317).toFixed(2) -0;
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

    /**
     * 菜单打卡，热量累加
     */
    handFoodClock(){
      //判断用户是否登录,true用户以登录 ，false用户未登录
      if(sessionStorage.getItem("userMessage")){
          //计算热量, 只计算主料
        /*  let calenum =0;
          let cale =0;
          for(var i=0;i<this.resDetails.MainNum.length;i++){
           calenum += this.handleCal(this.resDetails.MainNum[i]);
          }
          cale = calenum *(this.percentage_1 + this.percentage_1 + this.percentage_3) / 100;
         */
        //将摄入热量存储vuex中
          this.setCal(this.menuCale);
           console.log("消耗的热量",this.getCal());
           //消息提示，打卡成功
           this.$message({
             message:"打卡成功",
             type:"success",
             customClass:"message_style"
           })
      }else{
        this.$router.push({ name: "login", params: { name: this.paramsM,path:'details' } })
         // this.$router.push("/login",);
      }
    },

    /**
     * 食物热量核对方法
     */
   /* handleCal(quan){
      let index =0;
      let cal="";
     if(quan.indexOf('节') > 0){
       return 200;
      }else if(quan.indexOf('克') >0){
        //以g为单位的，返回数量
        index = quan.indexOf('克');
        cal = quan.substring(0,index);
        return  Number(cal);
      }
      else if(quan.indexOf('块') >0){
        //以块为单位的，像鸡胸肉
        return 300;
      }else if(quan.indexOf('根') >0){
        //以根为单位的，像黄瓜
        return 70;
      }else if(quan.indexOf('适量') > 0){
        //适量，直接返回确定的数量
        return  300;
      }else if(quan.indexOf('个') >0){
        //以个为单位的，像银耳
        return 50;
      }else if(quan.indexOf('g') >0){
        //以g为单位的，返回数量
        index = quan.indexOf('g');
        cal = quan.substring(0,index);
        return  Number(cal);
      }else if(quan.indexOf('张') > 0){
        //以张为单位的
        return 200;
      }else if(quan.indexOf('碗') > 0){
        return 400;
      }else if(quan.indexOf('只') >0){
        return 800;
      }
      else {
        return 500;
      }
    }
    */
    
  },
  mounted() {
   
    //获取页面高度
    this.clientH = document.body.clientHeight;
    let name = this.$route.params.name;
    //先判断路由是否传参
    if(name){
      this.paramsM = name;
      this.search(this.paramsM);
    }else{
     this.search();
    }
    
    if (document.body.scrollTop) {
      document.body.scrollTop = 0;
    } else {
      document.documentElement.scrollTop = 0;
    }
  },
  data() {
    return {
      //菜谱热量
      menuCale:0,
      //页面携带参数,默认空字符串，查询所有菜单
      paramsM:"",
      //可视高度
      clientH:0,
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
<style>
.message_style{
  margin-top: 0%;
  margin-left: 40%;
}
</style>
<style scoped lang="less">
html,
body {
  background: rgb(0, 0, 0);
  
}
.box {
  height: 100%;
  .el-backtop{
       background-color:@primaryColor;
      .el-icon-caret-top{
         
          color:white;
      }
  }
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
  margin-bottom: -70px;
  display: flex;

  .cir {
    margin-right: 5px;
    p {
      display: block;
      height: 10px;
      width: 5px;
      background-color:@ownMessageColor;
    }
  }
  .restitle_1 {
    margin-top: -2px;
  
   ::v-deep .el-breadcrumb{
      .el-breadcrumb__item{
        .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link
        {
          font-weight: 400;
          font-size: 20px;

        }
        .el-breadcrumb__inner a, .el-breadcrumb__inner{
          font-weight: 300;
          font-size:20px ;
        }
        .el-breadcrumb__inner:hover{
          color:@primaryColor
        }
      }
    }
  }
}
.introduce {
  width: 1100px;
  height: 2000px;
  margin: 50px auto;
  margin-top: 90px;
  margin-bottom: 30px;
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

  ::v-deep{
     .steps {
      margin-left: 80px;
      .el-step{
        .el-step__head.is-finish{
             color: #009688;
             .el-step__line-inner{
               color:#009688;
             }
        }
        .el-step__main{
          .el-step__title{
            color: #009688;
          }.el-step__description{
            color: #009688;
          }
        }
      }
      
    }
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
  .styinfo{
  height:0px;
  clear: both;
}

}
.introduce::after{
                content:"";/*添加一个内容*/
                display:inline-block;/*转换为一个块元素*/
                clear:both;/*清除两侧浮动*/
            }

</style>