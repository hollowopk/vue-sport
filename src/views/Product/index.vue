<template>
  <div class="product">
    <!--商品分类-->
    <div class="cates">
      <div class="cates_container">
        <!--左侧菜单-->
        <div class="left_menu">
          <div
            :class="index == activeIndex ? 'active' : ''"
            v-for="(item, index) in productCate"
            :key="index"
          >
            <div class="title">
              {{ item.name }}
            </div>
            <div
              class="menu_list"
              v-for="item1 in item.cateList"
              :key="item1.cat_id"
              @click="handleGoosCate(item1)"
            >
              {{ item1.cat_name }}
            </div>
          </div>
        </div>
        <!--中间轮播图-->
        <div class="center_swiper">
          <div class="left_swiper">
            <el-carousel :interval="5000" arrow="always" height="470px">
              <el-carousel-item v-for="item in picUrl" :key="item.id" >
                <img :src="item.pic" alt="" />
              </el-carousel-item>
            </el-carousel>
          </div>

          <div class="right_swiper">
            <div class="top_info">
              
              <img src="http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000156212712_1_400x400.jpg" alt="" />
            
            </div>
            <div class="center_info">
             
              <img src="http://image5.suning.cn/uimg/b2c/newcatentries/0070142014-000000000625173988_1_400x400.jpg" alt="" />
            
            </div>
            <div class="bottom_info">
              
              <img src="http://image5.suning.cn/uimg/b2c/newcatentries/0070177940-000000010048040389_2_400x400.jpg" alt="" />
          
            </div>
          </div>
        </div>
        <!--右侧商品内容-->
        <div class="right_content">
          <collectAndCart />
        </div>
        
      </div>


      <div class="hot_goods">
        <!--食品推荐-->
        <div class="title_1">
          <h3>热销食品&nbsp;·&nbsp;精心推荐</h3>
          <p>Recipe recommendation</p>
          <b></b>
        </div>

        <div class="food">
          <div
            class="food_items"
            v-for="item2 in foodsList"
            :key="item2.goods_id"
            @click="handGoodsDetails(item2.goods_id, true)"
          >
            <div class="images">
              <img
                :src="
                  item2.goods_small_logo
                    ? item2.goods_small_logo
                    : 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i3/26442188/O1CN01Np1Jht1S29KTXAFaZ_!!0-item_pic.jpg_580x580Q90.jpg_.webp'
                "
                alt=""
              />
            </div>
            <div class="intr">
              {{ item2.goods_name }}
            </div>
            <div class="pri">
              <span class="price">￥{{ item2.goods_price }}</span>
              <span>
                <el-button
                  class="buy"
                  type="warning"
                  @click="handGoodsDetails(item2.goods_id, true)"
                  >立即购买</el-button
                >
              </span>
            </div>
          </div>
        </div>

        <!--运动产品推荐-->
        <div class="title_1">
          <h3>热销产品&nbsp;·&nbsp;精心推荐</h3>
          <p>Recipe recommendation</p>
          <b></b>
        </div>

        <div class="food">
          <div
            class="food_items"
            v-for="item2 in sportsList"
            :key="item2.goods_id"
            @click="handGoodsDetails(item2.goods_id, false)"
          >
            <div class="images">
              <img
                :src="
                  item2.goods_small_logo
                    ? item2.goods_small_logo
                    : 'https://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i3/166710294328387414/TB2iocHXsga61Bjy1XaXXafzVXa_!!0-saturn_solar.jpg_580x580Q90.jpg_.webp'
                "
                alt=""
              />
            </div>
            <div class="intr">
              {{ item2.goods_name }}
            </div>
            <div class="pri">
              <span class="price">￥{{ item2.goods_price }}</span>
              <span>
                <el-button
                  class="buy"
                  type="warning"
                  @click="handGoodsDetails(item2.goods_id, false)"
                  >立即购买</el-button
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixs"></div>
    <footerTop />
    <footerBottom />
  </div>
</template>
<script>
import collectAndCart from './CollectAndCart'
import footerTop from "@/components/footer/footerTop.vue";
import footerBottom from "@/components/footer/footerBottom.vue";
export default {
  name: "product",
  components: {
    collectAndCart,
    footerTop,
    footerBottom,
  },
  data() {
    return {
      //当前商品分类激活索引
      activeIndex: 0,
      //商品分类
      productCate: [
        {
          name: "",
          cateList: [],
        },
        {
          name: "",
          cateList: [],
        },
      ],
      //二级标题是否显示：
      secondCat: false,
      //二级标题索引
      secondIndex: 0,
      //左侧一级分类
      leftDataList: [],
      //右侧二级分类
      rightDataList: [],
      //右侧轮播图显示或者二级标题显示标识 ,true默认显示轮播，false显示商品二级分类
      rightFlag: true,
      //热销食品列表
      foodsList: [],
      //热销运动产品列表
      sportsList: [],
      //区别是食品还是运动产品
      flag: true,
      //路由参数
      paramsM: {},
      picUrl: [
        {
          id: 1,
          pic: require("../../assets/images/商城轮播3.jpg"),
        },
        {
          id: 2,
          pic: require("../../assets/images/商城轮播4.jpg"),
        },
        {
          id: 3,
          pic: require("../../assets/images/商城轮播2.jpg"),
        },
        {
          id: 4,
          pic: require("../../assets/images/商城轮播1.jpg"),
        },
      ],
    };
  },
  created() {
    this.getProductCateData();
  },
  methods: {
    /**
     * 获取商品分类数据
     */
    getProductCateData() {
      this.$http.getProductCate().then((res) => {
        if (res.status === 200) {
          let data = res.data.message;
          for (var i = 0; i < data.length; i++) {
            if (i === 7) {
              this.productCate[0].name = data[i].cat_name;
              this.productCate[0].cateList.push(...data[i].children);
            } else if (i === 20) {
              this.productCate[1].name = data[i].cat_name;
              this.productCate[1].cateList.push(...data[i].children);
            }
          }
          console.log("111", this.productCate[0].cateList[1]);
          this.getGoodsHot(this.productCate[0].cateList[1], true);
          this.getGoodsHot(this.productCate[1].cateList[0], false);

          console.log("productCate", this.productCate[1].cateList);
          //商品保存本地
          /* this.$addStorageEvent('productCate',this.productCate);
            this.leftDataList = this.productCate.map(item =>item.cat_name);
            this.rightDataList = this.productCate[0].children;
         */
        }
      });
    },

    /**
     *商品详情页面
     */
    handGoodsDetails(id, flag) {
      //首先判断用户是否登录
      let userMessage = sessionStorage.getItem("userMessage");
      if (flag) {
        this.paramsM = {
          goods_id: id,
          secondCat: "牛奶冲调",
          threeCat: "酸牛奶",
        };
      } else {
        this.paramsM = {
          goods_id: id,
          secondCat: "热门推荐",
          threeCat: "哑铃",
        };
      }

      if (userMessage) {
        this.$router.push({
          name: "productDetail",
          params: { name: this.paramsM },
        });
      } else {
        this.$router.push({
          name: "login",
          params: { name: this.paramsM, path: "productDetail" },
        });
        //用户未登录，先进入登录页面进行登录
      }
    },

    /**
    商品列表
     */
    getGoodsHot(chil, flag) {
      for (const key in chil) {
        if (key === "children") {
          for (var i = 0; i < chil.children.length; i++) {
            if (i == 0) {
              this.$http
                .getProductLists({
                  cid: chil.children[i].cat_id,
                  pagenum: 1,
                })
                .then((res) => {
                  if (res.status === 200) {
                    if (flag) {
                      this.foodsList.push(
                        ...res.data.message.goods.slice(0, 8)
                      );
                    } else {
                      this.sportsList.push(
                        ...res.data.message.goods.slice(0, 8)
                      );
                    }
                  }
                });
            }
          }
        }
      }
    },

    /**
     * 处理用户点击左侧菜单事件
     */
    handleGoosCate(item) {
      this.$router.push({ name: "productCate", params: { item: item } });
    },

    /**
     * 二级标题处理
     */
    visibleSecCat(index) {
      this.secondCat = true;
      this.secondCat = index;
    },
    invisibleSecCat() {
      this.secondCat = false;
    },
  },
};
</script>
<style scoped lang="less">
.product{
  width: 100%;
  .cates {
  width: 100%;
  height: 100%;
  padding-top: 40px;
  background-color: #eee;
  clear: both;
  .cates_container {
    border-radius: 30px 30px 0 0;
    background-color: white;
    width: 80%;
    height: 470px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    .left_menu {
      flex: 1;
      margin-top: 20px;
      border-radius: 20px 0px 0px 20px;
      div {
        margin-left: 15px;
        .title {
          margin-top: 10px;
          margin-bottom: 5px;
          color:@primaryColor;
          height: 20px;
          line-height: 20px;
          font-size: 15px;
        }
        .menu_list {
          cursor: pointer;
          color: #aaa;
          font-size: 13px;
          height: 20px;
          line-height: 20px;
        }
      }
    }
    div .acitve {
      color: @primaryColor;
      border-left: 5px solid @primaryColor;
    }

    .center_swiper {
      margin: 0px 10px;
      flex: 6;
      display: flex;
      flex-direction: row;
      .left_swiper {
        flex: 5;
        img {
          border-radius: 30px 30px 0 0;
          margin-top: 20px;
          margin-right: 10px;
          box-sizing: border-box;
          width: 98%;
          height: 470px;
        }
      }
      .right_swiper {
        flex: 2;
        display: flex;
        flex-direction: column;
        .top_info {
          flex: 33%;
       
          img {
            margin: 0 auto;
           width: 200px;
           height: 150px;
          }
        }
        .center_info {
          flex: 33%;
          margin: 6px 0px;
       
           img {
            margin: 0 auto;
           width: 200px;
           height: 150px;
          }
        }
        .bottom_info {
          flex: 33%;
        
           img {
            margin: 0 auto;
          
           width: 200px;
           height: 150px;
          }
        }
      }
    }
    .right_content {
      flex: 2;
    
  
    }
  }
  .hot_goods {
    width: 80%;
    background-color: white;
    margin: 0 auto;
    .title_1 {
      padding-top: 50px;
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
    .food {
      width: 80%;
      display: flex;
      margin: 0 auto;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      .food_items {
        background-color: rgb(228, 235, 232);
        flex: 0 1 22%;
        margin: 14px;
        padding: 15px 5px;
        border-radius: 10%;
        .images {
          text-align: center;
          
          img {
            width: 70%;
          }
        }
        .intr {
          text-align: center;
          color: #3c3c3c;
          text-align: left;
          height:38px;
          font-size: 14px;
          font-weight: 100;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .pri {
          margin-top: 5px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .price {
            flex: 1;
            color: #f40;
            font-size: 20px;
            margin-top: 20px;
            height: 22px;
            line-height: 22px;
          }
          .buy {
            flex: 3;
            margin-top: 10px;
          }
        }
      }
      .food_items:hover {
        background-color: white;
        box-shadow: 0 19px 39px 0 rgb(0 0 0 / 12%);
        border-radius: 10%;
      }
    }
    .food:after {
      content: "";
      flex: auto;
    }
  }
}
}


 /deep/.el-carousel__indicators--horizontal {
        position: absolute;
      
        right: 10px;
        bottom: 10px;
        text-align: center;
 
        .el-carousel__indicator--horizontal button {
            width: 8px;
            height: 8px;
            background: #eee;
            border-radius: 50%;
            opacity: 1;
        }
        .el-carousel__indicator--horizontal.is-active button {
            width: 24px;
            height: 8px;
            background:@primaryColor;
            opacity: 1;
            border-radius: 10px;
        }
}

</style>