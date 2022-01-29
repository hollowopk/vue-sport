<template>
     <div class="footer">
      <div class="logo">
        <img src="@/assets/bohe_images/logo.png" alt="" />
      </div>
      <div class="logo_title">
        易氧运动&nbsp;致力中国好健康
        <p>运动 · 饮食 · 健康 · 打卡 · 营养 · 分析 · 规划 · 督促 · 多平台</p>
      </div>
    </div>
</template>
<script>
export default {
    name:"footerTop"
}
</script>
<style scoped lang="less">
.footer {
  margin-top: 630px;
  width: 100%;
  height: 320px;
  background-color: @ownMessageColor;
  display: flex;
  .logo {
    margin-top: 50px;
    margin: auto 0;
    img {
      width: 250px;
      height: 90px;
      margin-left: 130%;
    }
  }
  .logo_title {
    margin-top: 50px;
    padding-left: 30%;
    font-weight: 100;
    font-size: 38px;
    margin: auto 0;
    p {
      margin-top: 30px;
      font-size: 18px;
      margin-left: -10px;
    }
  }
}
</style>