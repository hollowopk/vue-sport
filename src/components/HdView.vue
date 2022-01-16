<template>
  <div class="header">
    <a href="#">
      <img class="logo" src="@/assets/images/logo4.png" />
    </a>
    <ul class="nav">
      <li><a href="#">首页</a></li>
      <li>
        <a @click="goTest" style="cursor: pointer"> 新闻中心 </a>
      </li>
      <li><a @click="goAbout">在线预约</a></li>
      <li><a href="https://yhy.imut.cloud">可视大屏</a></li>
      <li>
        <a @click="goData"> 用户数据 </a>
        <div class="down">
          <div class="list">
            <div class="box">
              <p>会员中心</p>
            </div>
          </div>
        </div>
      </li>
      <li>
        <a href="#"> 关于我们 </a>
        <div class="down">
          <div class="list">
            <div class="box">
              <p>团队简介</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="tel">
      <p>云计算中心<span>lvguowei2024@163.com</span></p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goTest () {
      this.$router.push('/News')
    },
    goData () {
      this.$router.push('/data')
    },
    goAbout(){
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
.header {
  width: 1160px;
  height: 80px;
  margin: 0 auto;
  a .logo {
    float: left;
    margin-top: 15px;
    width: 160px;
    height: 55px;
  }
  .nav {
    float: left;
    margin-left: 100px;
    margin-top: 5px;
    li {
      float: left;
      position: relative;
      &:hover {
        .down {
          display: block;
        }
      }
      a {
        display: block;
        line-height: 80px;
        padding: 0 25px;
        font-size: 16px;
        color: #333;
        &:hover {
          color: #009ee6;
        }
      }
      .down {
        width: 130px;
        background: #333;
        border-top: 2px solid #009ee6;
        position: absolute;
        top: 65px;
        left: 0;
        display: none;
        .list {
          height: 40px;
          line-height: 7px;
          &:hover {
            background: #666;
            .box {
              border-color: #009ee6;
            }
          }
          .box {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 2px solid #ccc;
            float: left;
            margin-left: 5px;
            margin-top: 15px;
          }
          p {
            float: left;
            margin-left: 18px;
            color: #ccc;
            width: 150px;
            font-size: 15px;
            &:hover {
              color: #fff;
            }
          }
        }
      }
    }
  }
  .tel {
    float: right;
    text-align: right;
    margin-top: 22px;
    p {
      font-size: 14px;
      color: #666;
      span {
        font-size: 19px;
        color: #333;
        display: block;
        font-weight: 600;
      }
    }
  }
}
</style>>
