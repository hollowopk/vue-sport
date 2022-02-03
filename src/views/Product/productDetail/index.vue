<template>
  <div class="productDetail">
    <!--面包屑-->
    <div class="restitle">
      <div class="cir">
        <p></p>
      </div>
      <div class="restitle_1">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/product' }"
            >商城首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>{{ secondCat }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ threeCat }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <pre>{{ introduce }}</pre>
    <!--轮播图和简介-->
    <div class="container">
      <div class="left_info">
        <div class="block">
          <el-carousel
            trigger="click"
            height="350px"
            indicator-position="outside"
          >
            <el-carousel-item v-for="item in introduce.pics" :key="item">
              <img :src="item.pics_mid" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="right_info">
          <div class="con_in">{{introduce.goods_name}}</div>
          <div class="con_price">
            <div class="odd_price">
                  原价
              <span>
                  ￥{{Number(introduce.goods_price + 9)}}
              </span>
            </div>
            <div class="new_price">
                  促销价
              <span>
                  ￥{{introduce.goods_price}}
              </span>
            </div>
          </div>
          <div class="con_num">
              <span class="num_number">现存数量:
                  <span>
                      {{introduce.goods_weight}}
                  </span>
              </span>
               <span class="num_weight">累计评价:
                   <span>
                       {{introduce.goods_number}}
                   </span>
               </span>
          </div>
            <div class="num">
                数量： 
                <el-input-number v-model="buyNum" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                库存：{{introduce.goods_number}}件
            </div>
            <div class="btn">
                <el-button type="danger">立即购买</el-button>
                 <el-button>加入购物车</el-button>
            </div>
            <div class="oth">
                <span>服务承诺</span>
                 <span>破损包退</span>
                  <span>正品保障</span>
                   <span>极速退款</span>
            </div>
      </div>
    </div>
    <!--详细参数-->
    <div class="deta_intr">
        <div class="title">商品详情</div>
          <div class="descBox" v-html='introduce.goods_introduce'></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "productDetail",

  data() {
    return {
      // 商品id
      goodsId: "",
      //二级导航,
      secondCat: "",
      //三级导航,
      threeCat: "",
      //商品详情
      introduce: {},
      //购买数量：
      buyNum:1
    };
  },

  mounted() {
    if (this.$route.params) {
      this.goodsId = this.$route.params.goods_id;
      this.secondCat = this.$route.params.secondCat;
      this.threeCat = this.$route.params.threeCat;
      this.getGoodsDetail();
    }
  },
  methods: {
    getGoodsDetail() {
      this.$http
        .getGoodsDetail({
          goods_id: this.goodsId,
        })
        .then((res) => {
          if (res.status === 200) {
            this.introduce = res.data.message;
          }
        });
    },
     handleChange(value) {
        this.buyNum ++;
      }
  },
};
</script>
<style scoped lang="less">
.productDetail {
  width: 100%;
  //表头
  .restitle {
    flex: 1;
    width: 1130px;
    height: 20px;
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 10px;
    display: flex;

    .cir {
      margin-right: 5px;
      p {
        display: block;
        height: 10px;
        width: 5px;
        background-color: @ownMessageColor;
      }
    }
    .restitle_1 {
      margin-top: -2px;

      ::v-deep .el-breadcrumb {
        .el-breadcrumb__item {
          .el-breadcrumb__inner a,
          .el-breadcrumb__inner.is-link {
            font-weight: 400;
            font-size: 20px;
          }
          .el-breadcrumb__inner a,
          .el-breadcrumb__inner {
            font-weight: 300;
            font-size: 20px;
          }
          .el-breadcrumb__inner:hover {
            color: @primaryColor;
          }
        }
      }
    }
  }
  .container {
    width: 60%;
    margin: 0 auto;
    height: 500px;
    margin-top: 30px;
    display: flex;
  
    flex-direction: row;

    .left_info {
      flex: 3;

      .block {
        width: 90%;
        margin: 20px;
        .el-carousel {
          width: 95%;
          text-align: center;
          .el-carousel-item {
            width: 100%;
            text-align: center;
            img {
              width: 80%;
              padding: 10px;
              height: 80%;
            }
          }
        }
      }
    }
    .right_info {
      flex: 3;
      margin-top: 30px;
      .con_in{
          font-weight: 400;
          font-size: 18px;
      }
      .con_price{
          margin-top: 10px;
       
          background-color: #eee;
          height: 80px;
       
            font-size: 15px;
            color: #aaa;
           .odd_price{
                  margin-left:20px;
               height: 40px;
               line-height: 40px;
                span{
                  text-decoration: line-through;
                font-size: 20px;
            }
           
           }
            .new_price{
                   margin-left:20px;
                  height: 40px;
               line-height: 40px;
                 span{
                color: red;
                font-size: 23px;
                font-weight: 600;
              
            }
            }

      }
      .con_num{
          margin-top: 20px;
    
        margin-left:20px;
          border-top: 1px solid #eee;
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #eee;
          color: #aaa;
          font-size: 15px;
          display: flex;
          justify-content: center;
          flex-direction: row;
          .num_number{
              flex: 50%;
            span{
                color: red;
                margin-left:3px;
            }
          }
          .num_weight{
               flex: 50%;
                 span{
                color: red;
                margin-left:3px;
            }
          }
      }
      .num{
          margin-top: 15px;
          font-size: 15px;
          height: 40px;
          line-height: 40px;
      }
      .btn{
            margin-top: 15px;
             height: 50px;
          line-height: 50px;
             display: flex;
          justify-content: center;
          flex-direction: row;
        .el-button{
            flex: 50%;
            margin:0 10%;
        }
      }
      .oth{
          margin-top: 40px;
            display: flex;
          justify-content: center;
          flex-direction: row;
          color: #aaa;
          font-size: 12px;
          span{
              flex: 22%;
              margin: 0px 10px;
          }
      }
    }
  }
  .deta_intr{
       width: 40%;
    margin: 0 auto;
    margin-top: 30px;
    .title{
        margin: 20px 0px;
        font-size: 30px;
    color: rgb(58, 55, 55);
    font-weight: 100;
    }
  }
}
//内容
</style>