<template>
  <div class="clock">
    <!--打卡弹窗-->
    <el-dialog title="打卡数据" 
      v-if="clockDialog" 
      :destroy-on-close="true" 
      :visible.sync="clockDialog" 
      :close="cancelClock"
      width="50%">
      <span>
        <!--打卡表单-->
        <el-form
        id="clockForm"
          :model="clockForm"
          status-icon
          ref="clockForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="clockForm.username"
              autocomplete="off"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="身高" prop="height">
            <el-input v-model="clockForm.height" autocomplete="off"
            ref="input1" @keyup.enter.native="handelTab(1,$event)"></el-input>
          </el-form-item>
          <el-form-item label="体重" prop="weight">
            <el-input v-model="clockForm.weight"
            ref="input2" @keyup.enter.native="handelTab(2,$event)"></el-input>
          </el-form-item>
          <el-form-item label="摄入热量" prop="calorie">
            <el-input v-model="clockForm.calorie" :disabled="true"
            ref="input3" @keyup.enter.native="handelTab(3,$event)"></el-input>
          </el-form-item>
          <el-form-item label="喝水量" prop="drink">
            <el-input v-model="clockForm.drink" 
           ref="input4" @keyup.enter.native="handelTab(4,$event)"></el-input>
          </el-form-item>
          <el-form-item label="消耗热量" prop="steps">
            <el-input v-model="clockForm.stpes"  :disabled="true"
            ref="input5" @keyup.enter.native="handelTab(5,$event)"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelClock">取 消</el-button>
        <el-button type="primary" @click="handleClock">打卡</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { nextFocus } from "../utils/nextFocus";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "click",
  props: {
    childClockDialog: {
      type: Boolean,
       require:true
    },
    childClockForm: {
      type: Object,
      require:true,
      default:function(){
        return {};
      }
    },
  },
   data(){
        return{ 
          clockForm: {
          },
          clockDialog:false,
        }
    },
    created(){
       
    },
    mounted(){
       this.clockForm = JSON.parse(JSON.stringify(this.childClockForm));
        this.clockDialog = this.childClockDialog;
       //获取摄入热量
            this.clockForm.calorie = sessionStorage.getItem("cale");
            //获取消耗热量
            this.clockForm.stpes =  sessionStorage.getItem("sport");
    },
  watch:{
    childClockForm:{
      handler(){
         this.clockForm = JSON.parse(JSON.stringify(this.childClockForm));
      },
      immediate:true,
      deep:true
    },
    childClockDialog:{
      handler(){
         this.clockDialog = this.childClockDialog;
         if(sessionStorage.getItem("cale")){
             this.clockForm.calorie = sessionStorage.getItem("cale");
         }else{
            this.clockForm.calorie= 0;
         }
         if(sessionStorage.getItem("sport")){
             this.clockForm.stpes = sessionStorage.getItem("sport");
         }else{
            this.clockForm.stpes= 0;
         }
        /**
         *  this.$nextTick(() => {
           if(this.childClockDialog){
             //回车到下一项
             nextFocus('clockForm',this.handleClock());
           }
         })
         */
      },
      immediate:true,
      deep:true
    }
  },
  methods: {
      ...mapGetters(["getCal","getSport"]),
   
    /**
     * 打卡事件
     */
    handleClock() {
      this.$api.getInsertUserRecord({
        height:Number(this.clockForm.height),
        weight:Number(this.clockForm.weight),
        Calorie:Number(this.clockForm.calorie),
        drink:Number(this.clockForm.drink),
        steps:Number(this.clockForm.stpes)
      }).then((res) => {
          if(res.status === 200){
            //提交数据成功之后的处理
            this.$message({
              message:"恭喜您，今日打卡成功",
              type:'success',
              customClass:"message_style",
            })
            this.cancelClock();
          }
      })
    },
    
    /**
     * 取消打卡
     */
    cancelClock() {
      this.$emit('closeClockDialog' ,false);
    },

    /**
     * 回车换行
     */
    handelTab(i,e){
        let that = this;
        if(i <= 4 && that.$refs['input'+i]){
          that.$nextTick(() => {
            e.target.blur();
            let index = i+1;
            that.$refs['input'+index].focus();
          })
        }else{
          
        }
    }
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
.clock {
 
  .el-button--primary{
    background-color:@primaryColor;
    color: white;
  }
   ::v-deep {
    .el-dialog__wrapper
      .el-dialog
      .el-dialog__header{
      color: white;
     background-color:@primaryColor ;
     opacity: 0.5;
     .el-dialog__title{
        color: white;
     }
     .el-dialog__headerbtn{
       .el-dialog__close
       {
         color: white;
       }
     }
    }
  }
}
</style>