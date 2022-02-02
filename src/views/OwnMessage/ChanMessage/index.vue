<template>
  <div class="chanmessage">
    <!--面包屑导航-->
    <BreadCrumb :breadData="breadData"></BreadCrumb>
    
    <!--表格-->
    <div class="form">
      <el-form
        ref="prefData"
        :rules="rules"
        :model="prefData"
        label-width="80px"
      >
        <el-form-item label="头像" prop="avatar">
          <!--图片上传-->

          <el-upload
            class="avatar-uploader"
            ref="upload"
            :show-file-list="false"
            action="#"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :auto-upload="false"
            :data="prefData"
          >
            <img v-if="prefData.avatar" :src="prefData.avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="prefData.birthday"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            @change="changeDate"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="prefData.email"></el-input>
        </el-form-item>

        <el-form-item label="名称" prop="name">
          <el-input v-model="prefData.name"></el-input>
        </el-form-item>
         <el-form-item label="年龄" prop="age">
          <el-input v-model="prefData.age"></el-input>
        </el-form-item>

        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="prefData.phone"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="prefData.sex">
            <el-option
            v-for="item in sexs"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span>{{item.label}}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/BreadCrumb.vue"
export default {
  name: "chanmessage",
  components:{
    BreadCrumb
  },
  data() {
   //手机号字段验证
    var validatePhone = (rule,value,callback) => {
      var reg = /^1[0-9]{10}$/;
      if(value == ''){
          callback(new Error("请输入手机号"));
      }else if( !reg.test(value)){
        this.prefData.phone = "";
        callback(new Error('手机号的格式不正确，请重新输入'));
      }else {
        callback();
      }
    }
    return {
      //完善个人信数据
      prefData: {
        avatar: "",
        birthday: "",
        email: "",
        name: "",
        age:"",//年龄字段，新加
        phone: "",
        sex: "",
      },
      //性别选项
      sexs:[
        {
          label:"男",
          value:1,
        },
        {
          label:"女",
          value:2
        }
      ],
      //面包屑数据
      breadData:['个人信息','修改信息'],
      dialogImageUrl: "",
      dialogVisible: false,
      hideUpload: false,
      rules:{
          avatar: [
            { required: true, message: '请选择头像文件', trigger: 'blur' },
          ],
          birthday:[
            {type:'string', required: true, message: '请选择出生日期', trigger: 'change'}
          ],
          email:[
            {required: true,type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          name:[
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          age:[
            { required: true, message: '请输入年龄', trigger: 'blur' }
          ],
          phone:[
            {required: true,validator:validatePhone , trigger: 'blur'}
          ],
          sex:[
            {required: true, message: '请选择性别', trigger: 'blur'}
          ]
      }
    };
  },
  mounted(){
    //监听session,为表格赋初始值
     let obj = JSON.parse(sessionStorage.getItem("userMessage"));
     const {avatar,birthday,email,name,password,phone,sex,version:age} = obj;
     this.prefData = {avatar,birthday,email,name,password,phone,sex,age};  

  },
 
  methods: {
      /**
       * 完善信息
       */
      handleSubmit() {
      this.$refs.prefData.validate((valid) => {
        if (valid) {
            this.$api.updateUserMessage({
            avatar:encodeURIComponent(encodeURIComponent(this.prefData.avatar)),
            name:this.prefData.name,
            birthday:this.prefData.birthday,
            sex:Number(this.prefData.sex),
            email:this.prefData.email,
            phone:this.prefData.phone,
            age:Number(this.prefData.age)
        }).then((res) => {
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
                  message: "个人信息修改成功",
                  type: "success",
                });
              }
        })
        }else {
          this.$message({
            message: "个人信息修改失败，请重新修改",
            type: "error",
          });
        }
       
      })
    },
    /**
     * 根据出生日期自动获得年龄
     */
    changeDate(e){
     var date = new Date();
     var year = date.getFullYear();
     var ayear = e.substring(0,4);
     this.prefData.age = year - Number(ayear);
    },
    /**
     * 清除表单数据
     */
    resetForm() {
      this.$refs.prefData.resetFields();
    },
  

    handleChange(file, fileList) {
      this.prefData.avatar = URL.createObjectURL(file.raw);
    },

    beforeUpload(file) {
      return true;
    },
  }
};
</script>

<style scoped lang="less">
.chanmessage {
  transform: translate(0, 15px);
  .header {
    transform: translate(30px, 5px);
  }

  .form {
    width: 60%;
    margin: 0 auto;
    .el-form {
      .el-form-item {
        margin-bottom: 15px;
         .el-button--primary{
    background-color:@primaryColor;
    color: white;
  }
        .avatar-uploader {
          border: 2px solid #ddd !important;
          display: inline-block;
          text-align: center;
          cursor: pointer;
          height: 80px;
          width: 80px;
          line-height: 80px;
          border-radius: 15px;
          outline: 0;
          img {
            width: 80px;
            height: 80px;
            border-radius: 15px;
          }
          .el-icon-plus {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }

  ::v-deep {
    .form
      .el-form
      .el-form-item
      .el-form-item__content
      .avatar-uploader
      .el-upload--text
      .el-upload__input {
      display: none;
    }
  }
}
</style>