<template>
    <div>
        <Divider />
        <!--导航-->
         <div class="restitle">
      <div class="cir">
        <p></p>
      </div>
      <div class="restitle_1">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/sport' }">运动首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!--详细介绍-->
    <div class="container">
      <div class="title">{{ title }}:(强度:中)</div>
      <div class="clock">
       
        <el-button type="primary" @click="handClock">今日打卡该运动</el-button>
      </div>
      <div class="introduce">
         <div class="con_left">
        <img :src="detail.icon" alt="">
        <div class="trod">
          <span>消耗{{detail.energy}}大卡/每小时 (以60kg体重为参考)</span>
         <span class="info"> 运动强度：4.0MET，属于中强度运动</span>
         <span>千步活动量时间：8分钟，做该运动8分钟相当于中速步行1000步（即以4km/h的速度走10分钟）。</span>
</div>
      </div>
      <div class="con_right">
        <div class="rititle">
          运动热量消耗计算器：
        </div>
        <!--计算表单-->
        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="体重">
    <el-input type="text" v-model="ruleForm.height" autocomplete="off" >
      <i slot="suffix" class="dw">千克</i>
    </el-input>
  </el-form-item>
  <el-form-item label="运动时间" >
    <el-input type="text" v-model="ruleForm.time" autocomplete="off">
      <i slot="suffix" class="dw"> 分钟</i>
    </el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">计算</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
      </div>
      </div>
      <!--模板-->
     <div class="food">
      <div class="fotitle">
          消耗这些热量相当摄入食物：
      </div>
        <div class="list">
          <table>
            <tr>
              <th>食物名称</th>
              <th>份量</th>
            </tr>
            <tr>
              <td>米饭</td>
              <td>208.7克</td>
            </tr>
             <tr>
              <td>苹果</td>
              <td>461.5克</td>
            </tr>
             <tr>
              <td>鸡蛋</td>
              <td>167.8克</td>
            </tr>
             <tr>
              <td>豆浆</td>
              <td>1500.0克</td>
            </tr>
             <tr>
              <td>豆浆</td>
              <td>333.3克</td>
            </tr>
          </table>
        </div>
     </div>
    </div>
    </div>
</template>
<script>
import Divider from "../../../components/Divider.vue"
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
    name:'sportsDetails',
     components:{Divider},
    data(){
        return{
            detail:{},
            //标题
            title:'',
            //热量计算表
            ruleForm:{
              height:60,
              time:'',
            },
            cal:0,
        }
    },
    mounted(){
       this.detail = this.$route.params.name;
        this.handleStr();
    },
 
  methods:{
    ...mapMutations(["setSport"]),
    /**
     * 打卡该运动
     */
    handClock(){
      //判断用户是否登录,true用户以登录 ，false用户未登录
      if(sessionStorage.getItem("userMessage")){
         //如果用户不使用计算器计算热量
         if(this.cal === 0){
           this.cal = Number(this.detail.energy);
         }
            this.setSport(this.cal);
          //消息提示，打卡成功
          this.$message({
             message:"打卡成功",
             type:"success",
             customClass:"message_style"
          })
         
      }else{
         this.$router.push({ name: "login", params: { name: this.detail,path: 'sportsDetails'} });
      }
    },
    /**对标题字段进行处理
     * 
     */
    handleStr(){
      if(this.detail.name.indexOf("(") > 0){
         let index = this.detail.name.indexOf("(");
        console.log("detail",index);
      this.title = this.detail.name.substring(0,index);
      }else{
        this.title = this.detail.name;
      }
    },
    /**
     * 计算消耗热量
     */
    submitForm(){
        //每千克每分钟消耗热量
      let dan = 210/60/60;
      this.cal = parseFloat(dan * this.ruleForm.height * Number(this.ruleForm.time)).toFixed(2);
       //消息提示，打卡成功
          this.$message({
             message:'您做该运动'+`${this.ruleForm.time}`+'共计消耗了'+`${this.cal}`+'的热量',
             type:"success",
          })
    },
    resetForm(){
      this.$refs.ruleForm.resetFields();
    }
  }
}
</script>
<style scoped lang="less">
.message_style{
  margin-top: 0%;
  margin-left: 40%;
}
 .el-button--primary{
    background-color:@primaryColor;
    color: white;
  }
   .el-button--primary:hover{
    background-color:@primaryColor;
    color: white;
  }
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
.container{
  width: 70%;
  margin: 120px auto 0px;
  .title{
    font-size: 18px;
    font-weight: 200;
    float: left;
  }
  .clock{
    float: right;
    margin-right: 100px;
  }
   .introduce{
      width: 100%;
      margin: 20px 50px 10px;
      display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .con_left{
     margin-top: 20px;
      width: 600px;
      padding-right: 20px;
     display: flex;
     flex-direction: row;
     img {
       width:150px;
       height:170px;
     }
     .trod{
        flex:2;
       margin: 0px  20px;
       span{
         margin-top: 10px;
         display: block;
         height: 30px;
         line-height: 30px;
       }
     }
    }
    .con_right{
       margin-top: 20px;
      width: 300px;
      .rititle{
        font-size: 20px;
        margin-bottom:10px;
      }
      .el-form{
        .el-form-item{
          .el-input{
            .dw{
              font-style:normal;
		color:#aaa;
		font-weight: bold;
		line-height: 45px;
            }
          }
        }
      }
    }
    }
}
.food{
  display: block;
    font-size: 14px;
    line-height: 26px;
    color: #333;
    .fotitle{
      color: @primaryColor;
      font-size: 20px;
      margin: 10px 0 10px;
    }
    .list{
      table{
        width: 60%;
        float: left;
    border: 1px solid @primaryColor;
    border-collapse: collapse;
    background: #fff;
    font-size: 12px;
    font-family: SimSun;
    tr{
      td{
        padding: 4px;
    border: 1px solid @primaryColor;
    font-weight: normal;
    line-height: 20px;
    color: #666;
    background: #f9fafd;
    text-align: center;
      }
    }
      }
    }
}
</style>