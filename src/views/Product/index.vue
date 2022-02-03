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
            <img src="@/assets/images/produceSwiper.jpg" alt="" />
          </div>
          <div class="right_swiper">
            <div class="top_info">
              <img src="@/assets/images/menus.jpg" alt="" />
            </div>
            <div class="center_info">
              <img src="@/assets/images/menus.jpg" alt="" />
            </div>
            <div class="bottom_info">
              <img src="@/assets/images/menus.jpg" alt="" />
            </div>
          </div>
        </div>
        <!--右侧商品内容-->
        <div class="right_content">
          <div class="img-swiper"></div>
        </div>
      </div>

      <!--食品推荐-->
      <div class="title_1">
        <h3>食品分类&nbsp;·&nbsp;精心推荐</h3>
        <p>Recipe recommendation</p>
        <b></b>
      </div>

      <div class="food">
        <div
          class="food_items"
          v-for="item2 in productCate[0].cateList[1].children"
          :key="item2.cat_id"
        >
          <div class="images">
            <img :src="item2.cat_icon" alt="" />
          </div>
          <div class="intr">
            {{ item2.cat_name }}
          </div>
        </div>
      </div>
      <div class="food">
        <div
          class="food_items"
          v-for="item2 in productCate[0].cateList[2].children"
          :key="item2.cat_id"
        >
          <div class="images">
            <img :src="item2.cat_icon" alt="" />
          </div>
          <div class="intr">
            {{ item2.cat_name }}
          </div>
        </div>
      </div>

      <!--运动产品推荐-->
      <div class="title_1">
        <h3>产品分类&nbsp;·&nbsp;精心推荐</h3>
        <p>Recipe recommendation</p>
        <b></b>
      </div>

      <div class="food">
        <div
          class="food_items"
          v-for="item2 in productCate[1].cateList[3].children"
          :key="item2.cat_id"
        >
          <div class="images">
            <img :src="item2.cat_icon" alt="" />
          </div>
          <div class="intr">
            {{ item2.cat_name }}
          </div>
        </div>
      </div>
      <div class="food">
        <div
          class="food_items"
          v-for="item2 in productCate[1].cateList[2].children"
          :key="item2.cat_id"
        >
          <div class="images">
            <img :src="item2.cat_icon" alt="" />
          </div>
          <div class="intr">
            {{ item2.cat_name }}
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
import footerTop from "@/components/footer/footerTop.vue";
import footerBottom from "@/components/footer/footerBottom.vue";
export default {
  name: "product",
  components: {
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
          console.log("productCate", this.productCate[0].cateList);
          //商品保存本地
          /* this.$addStorageEvent('productCate',this.productCate);
                    this.leftDataList = this.productCate.map(item =>item.cat_name);
                    this.rightDataList = this.productCate[0].children;
                    */
        }
      });
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
.cates {
  width: 100%;
  height: 100%;
  clear: both;
  .cates_container {
    width: 80%;
    height: 470px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    .left_menu {
      flex: 1;
      background-color: aqua;
      div {
        margin-left: 15px;
        .title {
          margin-top: 10px;
          margin-bottom: 5px;

          height: 20px;
          line-height: 20px;
          font-size: 15px;
        }
        .menu_list {
          cursor: pointer;
          color: #009688;
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
          background-color: antiquewhite;
          img {
            width: 70%;
            height: 70%;
          }
        }
        .center_info {
          flex: 33%;
          margin: 10px 0px;
          background-color: yellow;
        }
        .bottom_info {
          flex: 33%;
          background-color: blue;
        }
      }
    }
    .right_content {
      flex: 2;
      background-color: #009688;
      .goods_group {
        height: 30px;
        line-height: 30px;
        .goods_title {
        }
        .goods_list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          span {
            flex: 20%;
            img {
              width: 30px;
              height: 20px;
            }
            .goods_name {
            }
          }
        }
      }
    }
  }
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
  .food {
    width: 80%;
    display: flex;
    margin: 0 auto;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    .food_items {
      flex: 0 1 25%;
      padding: 20px 10px;

      .images {
        text-align: center;
      }
      .intr {
        text-align: center;
        color: #aaa;
        font-size: 18px;
        font-weight: 100;
      }
    }
  }
  .food:after {
    content: "";
    flex: auto;
  }
}
</style>