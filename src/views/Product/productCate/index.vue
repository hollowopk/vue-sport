<template>
  <div class="productCate">
    <Divider />
    <div class="restitle">
      <div class="cir">
        <p></p>
      </div>
      <div class="restitle_1">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/product' }"
            >商城首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>{{ catName }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="conta">
      <!--商品二级目录-->
      <el-menu :default-active="activeIndex" class="cate_nav">
        <template v-for="(item, index) in cateList">
          <el-menu-item
            :index="index.toString()"
            :key="item.cat_id"
            class="list_item"
          >
            <div class="list_intr" @click="changeNav(index)">
              {{ item.cat_name }}
            </div>
          </el-menu-item>
        </template>
      </el-menu>

      <!--商品列表-->
      <div class="cate_list" v-cloak @scroll="handleScroll">
        <!--v-cloak指令保持在元素上知到关联实例结束才编译，避免了元素闪现-->
        <div class="cat_item" v-for="item in goodsList" :key="item.goods_id">
          <div class="images" @click="getGoodsDetail(item.goods_id)">
            <img
              :src="
                item.goods_small_logo
                  ? item.goods_small_logo
                  : 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'
              "
              alt=""
            />
          </div>
          <div class="intr">
            <div class="introduce">
              {{ item.goods_name }}
            </div>
            <div class="price">￥{{ item.goods_price }}</div>
            <div class="bug" @click="getGoodsDetail(item.goods_id)">
              立即购买
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Divider from "../../../components/Divider.vue";
export default {
  name: "productCate",
  components: { Divider },
  data() {
    return {
      // 类别id
      catId: "",
      //类别名称
      catName: "",
      //类别数据
      cateList: [],
      //商品列表
      goodsList: [],
      //激活索引
      activeIndex: "0",
      //商品列表总个数
      totalNum: 0,
      //页码
      pageNum: 1,
      pageSize: 20,
      onOff: true,
      //面包屑导航数据,

      //路由跳转参数
      paramsM:{}
    };
  },
  mounted() {
    if (this.$route.params) {
      this.catId = this.$route.params.item.cat_id;
      this.catName = this.$route.params.item.cat_name;
      this.cateList = this.$route.params.item.children;
      this.getProLists(Number(this.activeIndex));
    }
    window.addEventListener("scroll", this.throttleFun, true);
  },
  methods: {
    /**
     * 获取商品列表,
     */
    getProLists(index) {
      if (index != this.activeIndex) {
        this.totalNum = 0;
        this.goodsList = [];
        this.pageNum = 1;
      }
      this.$http
        .getProductLists({
          cid: this.cateList[index].cat_id,
          pagenum: this.pageNum,
        })
        .then((res) => {

          if (res.status === 200) {
            this.goodsList.push(...res.data.message.goods);
            this.totalNum = res.data.message.total;
            this.onOff = false;
          }
        });
    },

    /**
     * 切换菜单
     */
    changeNav(i) {
      this.getProLists(i);
      this.activeIndex = String(i);
    },

    /**
     * 商品详情页面
     */
    getGoodsDetail(id) {
      //首先判断用户是否登录
      let userMessage = sessionStorage.getItem("userMessage");
      this.paramsM ={
          goods_id: id,
          secondCat: this.catName,
          threeCat: this.cateList[this.activeIndex].cat_name,
        };
      if(userMessage){
          this.$router.push({
        name: "productDetail",
       params: { name: this.paramsM}
      });
      }else{
         this.$router.push({ name: "login", params: { name: this.paramsM,path:'productDetail' } })
        //用户未登录，先进入登录页面进行登录

      }
      
    },

    handleScroll(e) {
      let tar = e.target.scrollingElement;
      let scrollDistance =
        // 正文全文高
        tar.scrollHeight -
        // 被卷去的高
        tar.scrollTop -
        // 可见区域的宽度
        tar.clientHeight;
      // 滚动条距离底部小于等于0证明已经到底了，可以请求接口了
      if (scrollDistance < 0.5) {
        //这个开关是为了避免请求数据中 再次被请求
        if (this.pageNum < Math.ceil(this.totalNum / this.pageSize)) {
          this.$nextTick(() => {
            this.pageNum += 1;
            this.getProLists(this.activeIndex);
          });
        } else {
         /**
          *  this.$message({
            message: "数据已完全加载完成",
            type: "success",
          });
          */
        }

      
      }
    },
    // 节流
    throttle(fn, wait) {
      let last;
      let timer;
      let interval = wait;
      return function () {
        let args = arguments;
        let now = +new Date();
        if (last && now - last < interval) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            last = now;
            fn.apply(this, args);
          }, interval);
        } else {
          last = now;
          fn.apply(this, args);
        }
      };
      /**
      *  let context, args;
      let previous = 0;
      return function() {
        let now = new Date();
        context = this;
        args = arguments; // 取throttle执行作用域的this
        if (now - previous > wait) {
          fn.apply(context, args); // 用apply指向调用throttle的对象，相当于throttle.fn(args);
          previous = now;
        }
      };
      */
    },

    throttleFun(event) {
      this.throttle(this.handleScroll(event), 50000);
    },
  },
};
</script>
<style scoped lang="less">
[v-cloak] {
  display: none;
}
.productCate {
  width: 100%;
  display: flex;
  flex-direction: column;
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
  .conta {
    flex: 1;
    width: 60%;
    margin: 40px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position:relative;
    .cate_nav {
      width: 120px;
      text-align: center;
      height: 330px;
      top: 180px;
      left: 100px;
      position: fixed;
      background-color: aqua;
      .list_item {
        display: flex;
        flex-direction: row;
        height: 40px;
        line-height: 40px;
        .list_images {
          flex: 30%;
          width: 30px;
          height: 30px;
        }
        .list_intr {
          flex: 50%;
        
        }
      }
    }
    .cate_list {
      flex: 2;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-evenly;
      background-color: #eee;
      .cat_item {
        flex: 22%;
        margin: 7px 10px;
        padding-bottom: 5px;
        background-color: white;
        text-align: center;
        .images {
          width: 100%;
          text-align: center;
          img {
            width: 80%;
            height: 80%;
          }
        }
        .intr {
          .introduce {
            text-align: left;
            color: black;
            height: 35px;
            font-size: 13px;
            overflow: hidden; 
            text-overflow: ellipsis;
            display: -webkit-box; 
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .price {
            float: left;
            margin-left: 3px;
            color: #B61D1D;
            font-size: 18px;
            font-weight: 400;
          }
          .bug {
            width: 80px;
            height: 30px;
            line-height: 30px;
            background-color:#B61D1D;
            color: white;
            font-size: 15px;
            float: right;
            margin-right: 5px;
            cursor: pointer;
          }
        }
      }
    }
    .cate_list:after {
      content: "";
      flex: auto;
    }
  }
}
</style>