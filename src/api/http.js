import axios from "../utils/otherRequest"
import base from "./base"

const http ={
      /**
     * 商品分类
     */
       getProductCate() {
        return axios.get( base.otherBaseUrl + base.produceCate);
    },

   

}
export default http;