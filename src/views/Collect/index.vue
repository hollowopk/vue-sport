<template>
  <div class="collect">
    <!--返回商城首页-->
    <el-page-header @back="goBack" content="收藏夹"> </el-page-header>

    <!--购物车表-->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="商品信息" width="600">
        <template slot-scope="scope">
         <div @click="goDetails(scope.row.goods_id)">
              <div class="iamge">
            <img :src="scope.row.goods_small_logo" alt="" />
          </div>
          <div class="intr">
            {{ scope.row.goods_name }}
          </div>
         </div>
        </template>
      </el-table-column>
      <el-table-column prop="goods_price" label="单价" width="220">
      </el-table-column>
      <!--
      <el-table-column prop="num" label="数量" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="all_price" label="金额" show-overflow-tooltip>
      </el-table-column>
      -->
      <el-table-column prop="opera" label="操作" show-overflow-tooltip>
           <template slot-scope="scope">
               <el-button type="text" @click="deleteCollectGoods(scope.row)">{{scope.row.opera}}</el-button>
           </template>
      </el-table-column>
    </el-table>
   

    <!--支付弹窗-->
    <el-dialog
  title="支付提示"
  :visible.sync="fufeiDialog"
  width="30%"
  center>
  <span>无法开通JSAPI支付任务，无法获取RSA2(SHA256)秘钥,广告位招租</span>
  
    <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="fufeiDialog = false">取 消</el-button>
    <el-button size="mini" type="primary" @click="fufeiDialog = false">确 定</el-button>
  </span>
  
</el-dialog>
  </div>
</template>

<script>
export default {
  name: "collect",
  data() {
    return {
      cartData: [],
      oneData: {
          goods_id:"",//商品id
        goods_small_logo: "", //图片
        goods_name: "", //商品标题
        goods_price: "", //价格
        num: "", //数量
        all_price: "", //总价
        opera: "移除收藏夹", //操作
       
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
     * 获取收藏夹数据
     */

    handleGetCart() {
      this.$api.getCollect().then((res) => {
        if (res.status === 200) {
          this.cartData = res.data.extend.list;
          this.getGoodsMessage();
        }
      });
    },

    /**
     *  商品详情查看
     */
    goDetails(id){
       let paramsM= {
            goods_id: id,
          secondCat: "收藏夹",
          threeCat: "商品详情",
        };
         this.$router.push({
          name: "productDetail",
          params: { name: paramsM },
        });
    },

    /**
     * 商品移除
     */
    deleteCollectGoods(scope){
        console.log("scope",scope.goods_id);
        if(scope.goods_id){
            this.$api.addCollect({
          goodsid:Number(scope.goods_id),
          collect:0
        }).then((res) => {
          if(res.status === 200){
           console.log("this.tableData",this.tableData);
           this.tableData.forEach((item,index) => {
               if(item.goods_id === scope.goods_id){
                   this.tableData.splice(index,1);
               }
           })
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
     * 根据收藏夹数据获得商品详细信息
     */
    getGoodsMessage() {
      this.cartData.forEach((item) => {
        if (item) {
          
          this.$http.getGoodsDetail({ goods_id: item.goodid }).then((res) => {
            if (res.status === 200) {
              let data = res.data.message;
             this.oneData.goods_id = data.goods_id;
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
.collect {
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
          div{
              cursor: pointer;
              .iamge {
          width: 150px;
          height: 100px;
          float: left;
          img {
            width: 88%;
            margin: 10px;
          }
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
         .intr:hover{
          color: @primaryColor;
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