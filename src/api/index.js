import axios from "../utils/request"
import base from "./base"

const api ={
      /**
     * 登陆接口
     */
       getLogin(params) {
        return axios.post(base.baseUrl + base.login, params);
    },
}