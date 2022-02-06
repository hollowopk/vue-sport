<template>
  <div class="login">
    <!--登录模块-->
    <div class="bg-style">
      <div class="bg-left">
        <div class="title">
          <h2>易氧运动</h2>
          <!-- <img src="@/assets/bohe_images/bg.png" />-->
        </div>
      </div>
      <div class="bg-right">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ actionStatus ? "登录" : "注册" }}</span>
          </div>
          <div>
            <!--用户登录表-->
            <el-form
              v-show="actionStatus"
              :model="loginForm"
              :validate-on-rule-change="false"
              status-icon
              :rules="loginRules"
              ref="loginForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item prop="username" label-width="0px">
                <el-input
                  v-model.number="loginForm.username"
                  placeholder="username"
                  suffix-icon="el-icon-search"
                  ref="login1" @keyup.enter.native="handelTab(1,$event,3,'login')"
                ></el-input>
              </el-form-item>
              <el-form-item label-width="0px" prop="password">
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  autocomplete="off"
                  placeholder="password"
                  suffix-icon="el-icon-lock"
                  ref="login2" @keyup.enter.native="handelTab(2,$event,3,'login')"
                ></el-input>
              </el-form-item>

              <el-form-item label-width="0px" prop="code">
                <el-row :gutter="18">
                  <el-col :span="12">
                    <el-input size="small" v-model="loginForm.code"
                     ref="login3" @keyup.enter.native="handelTab(3,$event,3,'login')"></el-input>
                  </el-col>
                  <el-col :span="8">
                    <!--验证码-->
                    <span class="coderight" @click="refreshCode">
                      <identify :identifyCode="identifyCode"></identify>
                    </span>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item style="margin-left: 0px">
                <el-button type="primary" @click="submitForm" style="margin-left: -100px">登录</el-button>
                <el-button  @click="resetForm">重置</el-button>
                <el-button type="text" @click="changeStatus">去注册</el-button>
              </el-form-item>
            </el-form>

            <!--用户注册表-->
            <el-form
              v-show="!actionStatus"
              :model="rigisterForm"
              status-icon
              :rules="rigisterRules"
              :validate-on-rule-change="false"
              ref="rigisterForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item prop="username" label-width="0px">
                <el-input
                  v-model.number="rigisterForm.username"
                  placeholder="username"
                  suffix-icon="el-icon-search"
                   ref="register1" @keyup.enter.native="handelTab(1,$event,3,'register')"
                ></el-input>
              </el-form-item>

              <el-form-item label-width="0px" prop="password">
                <el-input
                  type="password"
                  v-model="rigisterForm.password"
                  autocomplete="off"
                  placeholder="password"
                  suffix-icon="el-icon-lock"
                   ref="register2" @keyup.enter.native="handelTab(2,$event,3,'register')"
                ></el-input>
              </el-form-item>
              <el-form-item label-width="0px" prop="passwordAgain">
                <el-input
                  type="password"
                  v-model="rigisterForm.passwordAgain"
                  placeholder="password again"
                  suffix-icon="el-icon-lock"
                   ref="register3" @keyup.enter.native="handelTab(3,$event,3,'register')"
                ></el-input>
              </el-form-item>

              <el-form-item >
                <el-button @click="handleRigister" style="margin-left: -100px">注册</el-button>
                <el-button type="text" @click="changeStatus" >去登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </div>
    <!--功能模块-->
    <div class="introduce">
      <div class="menus">
        <template v-for="item in navList">
          <div class="menus-item" :key="item.index" >
            <div>
           <img :src="item.card" alt="" @click="handelMemus(item.path)">
          </div>
          <div>
            <span @click="handelMemus(item.path)">{{item.msg}}</span>
          </div>
          </div>
        </template>
        <!--
          <div class="menus-item">
          <div>
            <img src="../../assets/images/introduceContainer1.gif" alt="" />
          </div>
          <div>
            <span>丰富的食物讯息</span>
          </div>
        </div>
        <div class="menus-item">
          <div>
            <img src="../../assets/images/introduceContainer1.gif" alt="" />
          </div>
          <div>
            <span>丰富的食物讯息</span>
          </div>
        </div>
        <div class="menus-item">
          <div>
            <img src="../../assets/images/introduceContainer1.gif" alt="" />
          </div>
          <div>
            <span>丰富的食物讯息</span>
          </div>
        </div>
        <div class="menus-item">
          <div>
            <img src="../../assets/images/introduceContainer1.gif" alt="" />
          </div>
          <div>
            <span>丰富的食物讯息</span>
          </div>
        </div>
        -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations,mapGetters } from "vuex";
import identify from "../../components/identify.vue";
import { nextFocus } from "@/utils/nextFocus";
export default {
  name: "login",
  components: {
    identify,
  },
  data() {
    //再次输入密码字段校验
    var validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.rigisterForm.password) {
        this.rigisterForm.password = "";
        this.rigisterForm.passwordAgain = "";
        callback(new Error("两次输入密码不一致!，请再次输入"));
      } else {
        callback();
      }
    };
    //验证码校验
    var validateCode = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入验证码"));
      } else if (value !== this.identifyCode) {
        this.loginForm.code = "";
        callback(new Error("验证码不正确"));
      } else {
        callback();
      }
    };
    return {
      //下方的导航组件
      navList:[
        {
            index:1,
            card:require("../../assets/images/menus.jpg"),
            msg:"美味的菜谱信息",
            path:"/menus"
        },
         {
            index:2,
            card:require("../../assets/images/cal.jpg"),
            msg:"丰富的热量讯息",
            path:"/calorie"
        },
        {
            index:3,
            card:require("../../assets/images/yundong.jpg"),
            msg:"完善的运动资讯",
            path:"/menus"
        },
         {
            index:4,
            card:require("../../assets/images/owndeatils.jpg"),
            msg:"科学的个人中心",
            path:"/owndetail"
        },
      ],
      //登录或者注册状态：
      actionStatus: true,
      //登录信息
      loginForm: {
        username: "",
        password: "",
        code: "", //验证码
      },
      //注册信息
      rigisterForm: {
        username: "",
        password: "",
        passwordAgain: "",
      },
      //注册表单验证
      rigisterRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        passwordAgain: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
      },
      //登录表单验证
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, validator: validateCode, trigger: "blur" }],
      },
      //验证码
      identifyCode: "",
      //验证码字符串
      identifyCodes: "abcdefghijklnmopqrstuvwxyz",
      //ABCDEFGHIJKLMNOPQRSTUVWXYZ
      //未登录查看相应数据的提示语
      prompt:'',

      //路由携带数据
      params:"",
      //路由路径
      path:'',

    };
  },
  mounted() {
    
    if(this.$route.params.actionStatus){
          this.actionStatus = ! this.$route.params.actionStatus;
        }
    //监听路由参数
    if(this.$route.params.path){
         let name = this.$route.params.name;
      this.params = name;
      this.path = this.$route.params.path;
    
    }

     this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    ...mapMutations(["setUser"]),
    ...mapGetters(['getUserMessage']),
    /**
     * 用户登录
     */
    submitForm() {
        this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$api
            .getLogin({
              username: this.loginForm.username,
              password: this.loginForm.password,
            })
            .then((res) => {
              if (res.status === 200) {
                //将用户信息存入vuex中
             //   this.setUser(JSON.stringify(res.data.extend.user));
                //存入本地
                this.$addStorageEvent('userMessage',JSON.stringify(res.data.extend.user));
                //sessionStorage.setItem("userMessage", );
                //跳转回上一个页面
              if(this.params){
                this.$router.push({ name: this.path, params: { name: this.params } });
              }
              else{
                 this.$router.back();
              }
              }else{
              }
            },e => {
               this.$message({
                  message:'用户名或密码错误，请重新输入',
                  type:'error',
               })
                //刷新验证码
                this.refreshCode();
            })
        } 
      });
    },

    /**
     * 跳转其他页面
     */
    handelMemus(path){
      this.$router.push(path);
    },
    /**
     * 重置表单
     */
    resetForm() {
      this.$refs.loginForm.resetFields();
    },

    /**
     * 用户注册
     */
    handleRigister() {
             let detail =Object.assign({},this.rigisterForm);
      this.$refs.rigisterForm.validate((valid) => {
        if (valid) { 
          this.$api.getRegist(
           {
            account: this.rigisterForm.username,
           password: this.rigisterForm.password
           }
          ).then((res) => {
           if(res.status === 200){
               //注册成功之后
          this.loginForm.username = detail.username;
          this.loginForm.password = detail.password;
          //返回登录表单
          this.actionStatus = true;
           }
          })
        } else {
          console.log("错误提交");
          //表单数据清空
        }
      });
    },
     /**
     * 回车换行
     */
    handelTab(i,e,sum,ref){
        let that = this;
        if(i < sum && that.$refs[ref+i]){
          that.$nextTick(() => {
            e.target.blur();
            let index = i+1;
            that.$refs[ref+index].focus();
          })
        }
    },

    /**
     * 切换注册登录表单
     */
    changeStatus() {
      this.actionStatus = !this.actionStatus;
    },

    /**
     * 产生随机数
     */
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    /**
     * 刷新验证码
     */
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },

    /**
     * 验证码随机数
     */
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
      console.log(this.identifyCode);
    },
  },
};
</script>
<style scoped lang="less">
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
.login {
  margin-left: 0px;
  width: 100%;
  .bg-style {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 540px;
    background:  url("../../assets/bohe_images/1.png")  no-repeat center;
   opacity: 0.6;
    .bg-left {
      flex: 2;
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
      }
    }
    .bg-right {
      flex: 1;
      padding-right: 100px;
      padding-top: 100px;
      .box-card {
        width: 80%;
        height: 360px;
        .el-form {
          padding: 0 20px;
          .el-form-item {
            width: 100%;
            btn-items {
              width: 100%;
              display: flex;
              flex-direction: row;
              .el-button {
                flex: 33.33%;
              }
            }
          }
        }
      }
      /*  margin-top: 115px;
    display: flex;
    justify-content: center;
    align-items: center; */
    }
    input:focus {
      outline: none;
    }
  }
  .introduce {
    width: 80%;
    margin: 0 auto;
    .menus {
      display: flex;
      margin-top:50px;
      justify-content: center;
      .menus-item {
        flex: 25%;
        text-align: center;
       
        div{
          img{
            border-radius: 50%;
            margin-bottom:25px;
             cursor: pointer;
          }
        }
        div{
           span {
          font-size: 20px;
          color: #aaa;
           cursor: pointer;
        }
        }
        
      }
    }
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>