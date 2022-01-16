<template>
  <div class="box">
    <div class="search">
      <div class="title">
        <h2>超过10万种食谱数据</h2>
        <span>食物做法查询,吃适合的食物</span>
      </div>
      <img src="@/assets/bohe_images/bg.png" />
      <div class="container">
        <input
          type="text"
          placeholder="超全食谱营养库，饭前查一查饮食更健康"
          @keyup.enter="search"
          v-model="content"
        />
        <!-- <img src="@/assets/bohe_images/sousuo.png" alt=""> -->
      </div>
    </div>
    <div class="title_1">
      <h3>饮食讲搭配&nbsp;·&nbsp;健康伴您行</h3>
      <p>Talk about diet matching and health with you</p>
      <b></b>
    </div>
    <div class="swipper">
      <el-carousel :interval="4000" type="card" height="270px">
        <el-carousel-item v-for="item in picUrl" :key="item.id">
          <img :src="item.pic" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="box_2">
      <div class="box_3">
        <ul class="pro_con">
          <li>
            <img src="@/assets/bohe_images/10.png" alt="" />
            <div class="black">
              <img src="@/assets/bohe_images/8.png" alt="" />
              <i></i>
              <h4>排毒养颜</h4>
              <p>羹类食物有助于排毒养颜,有延年益寿的功效...</p>
              <a href="#">了解详情</a>
            </div>
          </li>
          <li>
            <img src="@/assets/bohe_images/11.png" alt="" />
            <div class="black">
              <img src="@/assets/bohe_images/9.png" alt="" />
              <i></i>
              <h4>清热去火</h4>
              <p>蜂蜜柚子类食物有助于清热解毒，润肠通便的功效...</p>
              <a href="#">了解详情</a>
            </div>
          </li>
          <li>
            <img src="@/assets/bohe_images/12.png" alt="" />
            <div class="black">
              <img src="@/assets/bohe_images/7.png" alt="" />
              <i></i>
              <h4>增强免疫</h4>
              <p>鱼类食物有助于补充蛋白质,其眼睛有明目的功效...</p>
              <a href="#">了解详情</a>
            </div>
          </li>
          <li>
            <img src="@/assets/bohe_images/13.png" alt="" />
            <div class="black">
              <img src="@/assets/bohe_images/8.png" alt="" />
              <i></i>
              <h4>补血滋阴</h4>
              <p>阿胶类食物有助于补血润燥,补血益气的功效...</p>
              <a href="#">了解详情</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  methods: {
    search() {},
  },
  components: {  },
  data() {
    return {
      picUrl: [
        {
          id: "1",
          pic: require("../assets/bohe_images/3.png"),
          txt: "红枣银耳羹",
        },
        {
          id: "2",
          pic: require("../assets/bohe_images/6.png"),
          txt: "红枣银耳羹",
        },
        {
          id: "3",
          pic: require("../assets/bohe_images/5.png"),
          txt: "红枣银耳羹",
        },
      ],
      content: "",
      neirong: [{}, {}, {}, {}],
    };
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
::-webkit-input-placeholder {
  color: rgb(255, 255, 255);
  font-size: 17px;
  font-weight: 100;
}
:-moz-placeholder {
  color: rgb(255, 255, 255);
  font-size: 17px;
  font-weight: 100;
}
::-moz-placeholder {
  color: rgb(255, 255, 255);
  font-size: 17px;
  font-weight: 100;
}
:-ms-input-placeholder {
  color: rgb(255, 255, 255);
  font-size: 17px;
  font-weight: 100;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.search {
  width: 100%;
  height: 540px;
  background: url("../assets/bohe_images/1.png") no-repeat center;
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
    span {
      padding-top: 20px;
      display: block;
      font-weight: 100;
      color: #fff;
      font-size: 22px;
      text-align: center;
    }
  }
  .container {
    margin-top: 115px;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 750px;
      height: 40px;
      border-radius: 35px;
      border: 0.5px solid #fff;
      padding-left: 25px;
      //background: rgba(rgb(233, 190, 190), 0.6);
      color: rgb(255, 255, 255);
      font-size: 18px;
      font-weight: 100;
      background: url("../assets/bohe_images/sousuo.png") no-repeat 0 0;
      background-size: 35px 35px;
      background-position: 698px;
      //position: relative;
    }
    input:focus {
      outline: none;
    }
  }
}
.swipper {
  width: 1280px;
  margin: 50px auto;
}
.title_1 {
  margin-top: 50px;
  margin-bottom: 30px;
  text-align: center;
  h3 {
    font-size: 30px;
    color: #333;
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
    background: #444;
    margin: 0 auto;
    display: block;
  }
}
.box_2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .box_3 {
    text-align: center;
    margin: 0 auto;
    
    .pro_con {
      width: 100%;
      height: 350px;
      margin-top: 40px;
      li {
        width: 260px;
        height: 260px;
        position: relative;
        float: left;
        margin: 0 30px;
        list-style-type: none;
        &:hover {
          .black img {
            margin-top: 45px;
          }
          .black i {
            opacity: 0;
            margin-top: 0;
          }
          .black p {
            opacity: 1;
          }
          .black a {
            opacity: 1;
          }
          .black {
            background: rgba(238, 255, 177, 0.5);
          }
        }
        img {
          width: 260px;
          height: 260px;
          border-radius: 15px;
        }
      }
      .black {
        width: 260px;
        height: 260px;
        background: rgba(247, 255, 209, 0.2);
        position: absolute;
        left: 0;
        top: 0;
        overflow: hidden;
        img {
          margin-top: 25px;
          width: 50px;
          height: 50px;
          transition: 0.3s;
        }
        i {
          display: block;
          width: 20px;
          height: 2px;
          background: rgb(49, 49, 49);
          margin: 37px auto 20px;
          transition: 0.3s;
        }
        h4 {
          margin-top: 25px;
          text-align: center;
          font-size: 22px;
          color: rgb(70, 70, 70);
          font-weight: 100;
        }
        p {
          text-align: center;
          padding: 0 10px;
          color: rgb(63, 63, 63);
          font-size: 14px;
          margin: 15px 0 18px;
          opacity: 0;
          transition: 0.3s;
        }
        a {
          text-align: center;
          display: block;
          height: 28px;
          width: 98px;
          color: #fff;
          font-size: 14px;
          border: 1px solid #fff;
          margin: 0 auto;
          text-decoration: none;
          line-height: 26px;
          opacity: 0;
          transition: 0.3s;
        }
      }
    }
  }
}
</style>>