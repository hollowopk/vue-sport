import axios from "../utils/otherRequest"
import base from "./base"

const http ={
      /**
     * 商品分类
     */
       getProductCate() {
        return axios.get( base.otherBaseUrl + base.produceCate);
    },

    /**
     * 商品列表搜索
     */
    getProductLists(params){
      return axios.get(base.otherBaseUrl + base.productLists + 
        `?cid=${params.cid}` +  `&pagenum=${params.pagenum}`);
    },

    /**
     * 商品详情
     */
     getGoodsDetail(params){
       return axios.get(base.otherBaseUrl + base.goodsDetail + 
         `?goods_id=${params.goods_id}`);
     }

   

}
export default http;