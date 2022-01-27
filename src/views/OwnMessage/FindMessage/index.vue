<template>
  <div class="findmessage">
    <!--面包屑导航-->
    <BreadCrumb :breadData="breadData"></BreadCrumb>
    <div class="form">
      <el-form
        ref="passForm"
        :rules="rules"
        :model="passForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="account">
          <el-input v-model="passForm.account" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="旧密码" prop="oldPass">
          <el-input v-model="passForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="passForm.newPass"></el-input>
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="newPassAgain">
          <el-input v-model="passForm.newPassAgain"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleChangePass">保存</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/BreadCrumb.vue"
export default {
  name: "findmessage",
   components:{
    BreadCrumb
  },
  data() {
    //新密码字段校验
    var validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入新密码"));
      } else if (value == this.passForm.oldPass) {
        this.passForm.newPass = "";
        callback(new Error(" 新密码不能和原来密码一样，请重新输入"));
      } else {
        callback();
      }
    };
    //再次输入密码字段校验
    var validatePassAgain = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.passForm.newPass) {
        this.passForm.newPass = "";
        this.passForm.newPassAgain = "";
        callback(new Error("两次输入密码不一致,请再次输入"));
      } else {
        callback();
      }
    };
    return {
      //表单数据对象
      passForm: {
        account: "",
        oldPass: "",
        newPass: "",
        newPassAgain: "",
      },
      //面包屑数据
      breadData:['个人信息','找回密码'],
      rules: {
        oldPass: [
          { required: true, message: "请输入原来的密码", trigger: "blur" },
        ],
        newPass: [{ required: true, validator: validatePass, trigger: "blur" }],
        newPassAgain: [
          { required: true, validator: validatePassAgain, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    let obj = JSON.parse(sessionStorage.getItem("userMessage"));
    this.passForm.account = obj.account;
  },
  methods: {
    handleChangePass() {
      this.$refs.passForm.validate((valid) => {
        if (valid) {
          this.$api
            .changePwd({
              oldPwd: this.passForm.oldPass,
              newPwd: this.passForm.newPass,
            })
            .then((res) => {
              if (res.status === 200) {
                //获取修改密码后的用户信息
                let newUserMessage = res.data.extend.user;
                //修改session中的数据
                sessionStorage.removeItem("userMessage");
                this.$addStorageEvent(
                  "userMessage",
                  JSON.stringify(newUserMessage)
                );
                this.$message({
                  message: "密码修改成功",
                  type: "success",
                });
              }
            });
        } else {
          this.$message({
            message: "密码修改失败，请重新修改",
            type: "error",
          });
        }
        //清除表单中填入的数据,保留account
        this.saveAccount();
      });
    },
    /**
     * 清除表单数据
     */
    resetForm() {
      this.saveAccount();
    },
    /**
     * 清除表单数据，但是保留默认的用户名
     */
    saveAccount(){
        for (const key in this.passForm) {
          if (key != 'account') {
            this.passForm[key] ="";
            
          }
        }
    }
  },
};
</script>
<style scoped lang="less">
.findmessage {
  transform: translate(0, 15px);
  .header {
    transform: translate(30px, 5px);
  }
  .form {
    width: 60%;
    margin: 0 auto;
     .el-button--primary{
    background-color:@primaryColor;
    color: white;
  }
  }
}
</style>