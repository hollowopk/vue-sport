<template>
    <div class="product">
       <!--商品分类-->
       <div class="cates">
           <div class="cates_container">
               <!--左侧菜单-->
               <div class="left_menu">
                   <div :class="index == activeIndex ? 'active' : ''" 
                   v-for="(item,index) in leftDataList"
                   :key="index"
                    @click="handleCateChange(index)">
                   {{item}}
                   </div>
               </div>
               <!--右侧商品内容-->
               <div class="right_content">
                   <div class="goods_group"
                   v-for="item1 in rightDataList"
                   :key="item1.cat_id"
                  >
                   <!--商品二级分类标题-->
                        <div class="goods_title">
                            <span class="title">
                                {{item1.cat_name}}
                            </span>
                        </div>
                    <!--商品二级分类列表-->
                        <div class="goods_list">
                            <span mplate v-for="item2 in item1.children"
                            :key="item2.cat_id">
                            <img :src="item2.cat_icon" />
                            <span class="goods_name">{{item2.cat_name}}</span>
                            </span>
                        </div>
                   </div>
               </div>
           </div>
       </div>
    </div>
</template>
<script>
export default {
    name:'product',
    data(){
        return{
            //当前商品分类激活索引
            activeIndex:0,
            //商品分类
            productCate:[],
            //左侧一级分类
             leftDataList:[],
             //右侧二级分类
             rightDataList:[],
        }
    },
    created(){
        this.getProductCateData();
    },
    methods:{
        /**
         * 获取商品分类数据
         */
        getProductCateData(){
            this.$http.getProductCate().then((res) => {
                if(res.status === 200){
                    let data = res.data.message;
                    for(var i =0;i < data.length;i++){
                        if(i===1 || i===2 || i===7 || i===20){
                            this.productCate.push(data[i]);
                        }
                    };
                    //商品保存本地
                    this.$addStorageEvent('productCate',this.productCate);
                    this.leftDataList = this.productCate.map(item =>item.cat_name);
                    this.rightDataList = this.productCate[0].children;
                   
                }
                
            })
        },

        /**
         * 处理用户点击左侧菜单事件
         */
        handleCateChange(index){
            if(index != this.activeIndex)
           {
            let rightDataList = this.productCate[index].children;
            this.rightDataList = rightDataList;
            this.activeIndex = index;
           }
        }
    }
}
</script>
<style scoped lang="less">
.cates{
    width: 100%;
    height: 400px;
    .cates_container{
        width: 80%;
        height: 200px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        .left_menu{
            flex: 1;
            background-color: aqua;
            div{
                cursor: pointer;
            }
        }
        div .acitve{
            color:@primaryColor;
            border-left: 5px solid @primaryColor;
        }
        .right_content{
            flex:4;
            background-color: #009688;
            .goods_group{
                 height: 30px;
                    line-height: 30px;
                .goods_title{
                }
                .goods_list{
                   
                    display: flex;
                     flex-direction: row;
                     flex-wrap: wrap;
                  span{
                      flex:20%;
                        img{
                        width: 30px;
                        height: 20px;
                    }
                    .goods_name{

                    }
                  }
                }
            }
        }
    }
}
</style>