<template>
    <div class="breadcrumb">
         <!--面包屑导航-->
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <template v-for="(item,index) in breadData" >
              <el-breadcrumb-item :key="index">{{item}}</el-breadcrumb-item>
          </template>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    </div>
</template>
<script>
export default {
    name:'breadcrumb',
    props:{
        breadData:{
            type:Array,
            default:()=>[]
        }
    }
}
</script>
<style scoped lang="less">
.header {
    transform: translate(30px, 5px);
  }
</style>