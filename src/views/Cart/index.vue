<template>
  <div class="cart">
    <!--返回商城首页-->
    <el-page-header @back="goBack" content="购物车"> </el-page-header>

    <!--购物车表-->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="商品信息" width="500">
        <template slot-scope="scope">
          <div class="iamge">
            <img :src="scope.row.goods_small_logo" alt="" />
          </div>
          <div class="intr">
            {{ scope.row.goods_name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="goods_price" label="单价" width="120">
      </el-table-column>
      <el-table-column prop="num" label="数量" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="all_price" label="金额" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="opera" label="操作" show-overflow-tooltip>
           <template slot-scope="scope">
               <el-button type="text" @click="deleteCartGoods">{{scope.row.opera}}</el-button>
           </template>
      </el-table-column>
    </el-table>
    <div  class="handleBuy">
       <div class="right">
            <div class="goods_num">
            已选商品<span>{{allNum}}</span>件
        </div>
        <div class="goods_pri">
            合计(不含运费):<span>{{allPrice}}</span>元
        </div>
      <el-button size="mini" round @click="handleFuFei">结算</el-button>
       </div>

    </div>

    <!--支付弹窗-->
    <el-dialog
  title="支付提示"
  :visible.sync="fufeiDialog"
  width="30%"
  center>
  <span>该功能正在开发......</span>
  
    <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="fufeiDialog = false">取 消</el-button>
    <el-button size="mini" type="primary" @click="fufeiDialog = false">确 定</el-button>
  </span>
  
</el-dialog>
  </div>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {
      cartData: [],
      oneData: {
        goods_small_logo: "", //图片
        goods_name: "", //商品标题
        goods_price: "", //价格
        num: "", //数量
        all_price: "", //总价
        opera: "移除购物车", //操作
       
      },
       fufeiDialog:false,//付费弹窗
      multipleSelection: [],
      tableData: [],
      data: { key: [] },
      //选择的商品数量
      allNum:0,
      allPrice:0,
    };
  },
  beforeMount() {
    this.handleGetCart();
    this.data.key = this.tableData;
    console.log("this.tableData", this.tableData);
  },
  methods: {
    /**
     * 获取购物车数据
     */

    handleGetCart() {
      this.$api.getCart().then((res) => {
        if (res.status === 200) {
          this.cartData = res.data.extend.list;
          this.getGoodsMessage();
        }
      });
    },

    /**
     * 根据购物车数据获得商品详细信息
     */
    getGoodsMessage() {
      this.cartData.forEach((item) => {
        if (item) {
          console.log("item", item);
          this.$http.getGoodsDetail({ goods_id: item.goodid }).then((res) => {
            if (res.status === 200) {
              let data = res.data.message;
              this.oneData.goods_small_logo = data.goods_small_logo;
              this.oneData.goods_name = data.goods_name;
              this.oneData.goods_price = data.goods_price;
              this.oneData.num = item.cart;
              this.oneData.all_price =
                this.oneData.goods_price * this.oneData.num;
            }
            let id = item.id - 1;
            // this.$set(this.tableData[id],JSON.parse(JSON.stringify(this.oneData)));
            // this.tableData[id] = JSON.parse(JSON.stringify(this.oneData));
            this.$set(
              this.tableData,
              id,
              JSON.parse(JSON.stringify(this.oneData))
            );
          });
        }
      });
    },

    /**
     * 商品结算
     */
    handleFuFei(){
      this.fufeiDialog = true;
    },

    /**
     * 删除某个商品
     */
    deleteCartGoods(){
      /*    this.$api.addCart({
            goodsid:Number(this.goodsId),
            cart:this.buyNum
          }).then((res) => {
            if(res.status === 200){
             
            }
          })
          */
    },

    /**
     * 返回商城首页
     */
    goBack() {
      this.$router.push("/product");
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
        this.allNum = 0;
        this.allPrice = 0;
        val.forEach(item => {
            this.allNum += item.num;
            this.allPrice += item.all_price;
        })
    },
  },
};
</script>
<style scoped lang="less">
 .el-button--primary{
    background-color:@primaryColor;
    color: white;
  }
.cart {
  width: 80%;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 50px;
  .el-table {
    margin-top: 20px;
    .el-table-column {
      height: 150px;
      line-height: 150px;
    }
    .el-table__row {
      height: 150px;
      line-height: 150px;
      .cell {
        .iamge {
          width: 150px;
          height: 100px;
          float: left;
          img {
            width: 88%;
            margin: 10px;
          }
        }
        .intr {
              float: left;
              width: 300px;
          margin-top: 20px;
            overflow: hidden; 
            text-overflow: ellipsis;
            display: -webkit-box; 
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          
        }
      }
    }
  }
 
}
 .handleBuy{
      position: fixed;
      width: 80%;
      bottom: 0px;
      height: 50px;
    left: 50%;
    transform: translateX(-50%);
      background-color: #eee;
      .right{
          float: right;
          width: 40%;
           display: flex;
      flex-direction: row;
      justify-content: right;
      color: #aaa;
      font-size: 17;
        .goods_num{
           height: 50px;
           line-height: 50px;
          flex: 3;
          span{
              color: rgb(255, 86, 98);
              font-size: 20px;
              margin-left: 5px;
               margin-right: 5px;
          }
      }
      .goods_pri{
           flex: 3;
           text-align: left;
             height: 50px;
           line-height: 50px;
            span{
             color: rgb(255, 86, 98);
              font-size: 20px;
              margin-left: 5px;
               margin-right: 5px;
          }
      }
      .el-button{
            height: 40px;
          margin: auto;
           flex: 1;
           font-size: 17px;
           background-color: rgb(255, 86, 98);    
      }
      }
  }
</style>