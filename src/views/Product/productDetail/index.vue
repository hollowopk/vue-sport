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

    <div class="goods">
        <!--轮播图和简介-->
    <div class="container">
      <div class="left_info">
        <div class="block">
          <el-carousel
            trigger="click"
            height="350px"
            indicator-position="outside"
          >
            <el-carousel-item v-for="(item,index) in introduce.pics" :key="index">
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
                <el-input-number
                 v-model="buyNum"
                  @change="handleChange" 
                  :min="1"
                  :step="1" 
                  size="mini"
                  controls-position="right"
                  :max="introduce.goods_number"
                   label="描述文字"></el-input-number>
               <span>
                  库存：{{introduce.goods_number}}件
               </span>
            </div>
            <div class="btn">
                <el-button type="danger">立即购买</el-button>
                 <el-button @click="handleAddCate">加入购物车</el-button>
            </div>
            <div class="collect" @click="openCollectDialog">
           
             <div :class="isCollect ? 'iconfont icon-shoucang1' 
             : 'iconfont icon-shoucang'"></div>
             <span>{{collectTitle}}</span>
            </div>
            <div class="oth">
                <span>服务承诺</span>
                 <span>破损包退</span>
                  <span>正品保障</span>
                   <span>极速退款</span>
            </div>
      </div>
    </div>
    <!--商品加购的弹窗-->
    <el-dialog
  :title="!isCollect ? '收藏该商品': '取消收藏该商品'"
  :visible.sync="collectDialogVisible"
  width="30%"
  >
 <div class="container">
 
    <div class="left_de">
      <img :src="introduce.pics ? introduce.pics[0].pics_mid : ''" alt="">
    </div>
    <div class="right_de">
      <div class="right_title">{{introduce.goods_name}}</div>
      <div class="right_price"> ￥{{introduce.goods_price}}</div>
    </div>

 </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" size="mini" @click="addCollect">确 定</el-button>
    <el-button type="text" @click="centerDialogVisible = false">取 消</el-button>
  </span>
</el-dialog>

    <!--商品详情-->
    <div class="deta_intr">
        
         <div class="title_1">
      <h3>规格参数</h3>
      <p>Specification parameters</p>
     
    </div>
        <!--规格参数-->
        <div class="goods_attrs">
            <div v-for="(item,index) in introduce.attrs"
            :key="index">
            {{item.attr_name}} ：{{item.attr_vals ? item.attr_vals:'其他'}}
        </div>
        </div>
          <div class="title_1">
      <h3>详细介绍</h3>
      <p>Detailed introduction</p>
     
        <!--图片展示-->
          <div class="descBox" v-html='introduce.goods_introduce'></div>
    </div>
    </div>
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
      buyNum:1,
      //商品加购弹窗
      collectDialogVisible:false,
      // 标识时候收藏
      isCollect:false,
      //收藏商品
       collectData:[],
       //收藏title
       collectTitle:'收藏该商品',
       
    };
  },

  mounted() {
    if (this.$route.params) {
      this.goodsId = this.$route.params.name.goods_id;
      this.secondCat = this.$route.params.name.secondCat;
      this.threeCat = this.$route.params.name.threeCat;
      this.getGoodsDetail();
       this.getCollect();
    }
     document.documentElement.scrollTop = 0;
   
  },
  methods: {

    /**
     * 获取商品详情
     */
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

    /**
     * 加入购物车
     */
    handleAddCate(){
        if(this.buyNum >= 1){
          this.$api.addCart({
            goodsid:Number(this.goodsId),
            cart:this.buyNum
          }).then((res) => {
            if(res.status === 200){
              this.$message({
                message:'已成功添加该商品至购物车',
                type:'success'
              })
            }
          })
        }
    },

    /**
     * 获取商品收藏数据
     */
    getCollect(){
      this.$api.getCollect()
      .then((res) => {
          if(res.status === 200){
            this.collectData = res.data.extend.list;
          }
           this.collectData.forEach(item => {
      if(item.goodid === this.goodsId && item.collect == 1){
        this.isCollect = true;
        this.collectTitle = '取消收藏';
      }
    })
      })
    },

    /**
     * 商品收藏
     */
    addCollect(){
      if(!this.isCollect){
        this.$api.addCollect({
          goodsid:Number(this.goodsId),
          collect:1
        }).then((res) => {
          if(res.status === 200){
            this.collectDialogVisible = false;
             this.$message({
                message:'已成功收藏',
                type:'success'
              });
               this.isCollect = true;
                 this.collectTitle = '取消收藏';
          }
        })
      }else{
         this.$api.addCollect({
          goodsid:Number(this.goodsId),
          collect:0
        }).then((res) => {
          if(res.status === 200){
            this.collectDialogVisible = false;
             this.$message({
                message:'已取消商品收藏',
                type:'success'
              });
               this.isCollect = false;
                 this.collectTitle = '收藏该商品';
          }
        })
      }

    },

    /**
     * 收藏弹窗
     */
    openCollectDialog(){
      this.collectDialogVisible = !this.collectDialogVisible;
    },

    /**
     * 计时器
     */
    handleChange(value) {
     
    
    },
  },
};
</script>
<style scoped lang="less">
@import '../../../theme/iconfont.less';
 .icon-shoucang1{
  color: yellow;
}
.productDetail {
  width: 100%;
  .el-dialog{
    height: 100px;
    .container{
      margin-top: 10px;
      .left_de{
        width: 100px;
        height: 100px;
        img{
          width: 100%;
        }
        
      }
      .right_de{
        width: 300px;
        height: 25px;
       
        .right_title{
          margin-left: 20px;
          text-align: left;
           font-size: 12px;
            overflow: hidden; 
            text-overflow: ellipsis;
            display: -webkit-box; 
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .right_price{
           margin-left: 20px;
           margin-top: 10px;
            text-align: left;
          color: red;
        }
        
      }
    }
  }

  /deep/ .el-dialog{
    .el-dialog__header{
      font-size: 14px;
    }
    .el-dialog__body{
      height:100px;
    }
  }
  
  //表头
  .restitle {
    flex: 1;
    width: 1130px;
    height: 20px;
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 40px;

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
  .goods {
    width: 60%;
    border: 1px solid #ccc;
    margin: 0 auto;
    .container {
      width: 100%;
      text-align: center;
      height: 430px;

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
          text-align: left;
        margin-top: 30px;
        margin-right: 20px;
        .con_in {
          font-weight: 400;
          font-size: 18px;
        }
        .con_price {
        
          margin-top: 10px;
          background-color: #eee;
          height: 80px;

          font-size: 15px;
          color: #aaa;
          .odd_price {
            margin-left: 20px;
            height: 40px;
            line-height: 40px;
            span {
              text-decoration: line-through;
              font-size: 20px;
            }
          }
          .new_price {
            margin-left: 20px;
            height: 40px;
            line-height: 40px;
            span {
              color: red;
              font-size: 23px;
              font-weight: 600;
            }
          }
        }
        .con_num {
          margin-top: 20px;

          margin-left: 20px;
          border-top: 1px solid #eee;
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #eee;
          color: #aaa;
          font-size: 15px;
          display: flex;
          justify-content: center;
          flex-direction: row;
          .num_number {
            flex: 50%;
            span {
              color: red;
              margin-left: 3px;
            }
          }
          .num_weight {
            flex: 50%;
            span {
              color: red;
              margin-left: 3px;
            }
          }
        }
        .num {
          margin-top: 15px;
          font-size: 15px;
          height: 40px;
          line-height: 40px;
          span{
            margin-left: 20px;
          }
        }
        .btn {
          margin-top: 15px;
          height: 50px;
          line-height: 50px;
          display: flex;
          justify-content: center;
          flex-direction: row;
          .el-button {
            flex: 50%;
            margin: 0 10%;
          }
        }
        .collect{
             margin-top: 15px;
             margin-left: 40px;
             cursor: pointer;
             div{
               float: left;
             }
             span{
               margin-left: 5px;
               color: #888;
               font-size: 16px;
             }
        }
        .oth {
          margin-top: 30px;
          display: flex;
          justify-content: center;
          flex-direction: row;
          color: #aaa;
          font-size: 12px;
          span {
            flex: 22%;
            margin: 0px 10px;
          }
        }
      }
    }
    .deta_intr {
      width: 75%;
      margin: 0 auto;
      margin-top: 20px;
      .title_1 {
        margin-top: 50px;
        margin-bottom: 30px;
        text-align: center;
        h3 {
          font-size: 30px;
          color: rgb(255, 86, 98);
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
          background: rgb(255, 86, 98);
          margin: 0 auto;
          display: block;
        }
      }
      .goods_attrs{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
       text-align:left;
       margin-left: 80px;
        div{
          flex: 50%;
         
          height: 30px;
          line-height: 30px;
          color: #555;
        }
      }
      .goods_attrs:after {
    content: "";
   
    flex: auto;
  }
    }
  }
}
//内容
</style>