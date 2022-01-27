import axios from "../utils/request"
import base from "./base"

const api ={
      /**
     * 登陆接口api
     */
       getLogin(params) {
        return axios.post( base.baseUrl + base.login, params);
    },

    /**
     * 退出登录接口api
     */
    getLogout(){
      return axios.get(base.baseUrl + base.logout);
    },

    /**
     * 新用户注册
     */
    getRegist(params){
      return axios.get(base.baseUrl + base.regist+ `/${params.account}`+ `/${params.password}`

      )
    },

    /**
     * 获取导航菜单数据
     */
    getNavLists(params){
      return axios.get(base.baseUrl + base.navLists +  `?sort=${params.sort}` );
    },

    /**
     * 用户每日打卡
     */
    getInsertUserRecord(params){
      return axios.get(base.baseUrl + base.insertUserRecode  + `/${params.height}` + `/${params.weight}` 
      + `/${params.Calorie}` + `/${params.drink}` + `/${params.steps}`);
    },

    /**
     * 用户今日打卡数据
     */
    getTodayUserRecode(params){
        return axios.get(base.baseUrl + base.todayUserRecode 
        +`/${params.timeDiff}`);
    },

    /**
     * 完善个人信息
     * http://localhost:8000/changeData/https://img2.baidu.com/it/u=3133556706,4251837595&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500
     * /zhangsan/2022-01-15%2000:00:00/1/1745251097@qq.com/1745251097
     */
    updateUserMessage(params){
      return axios.get(base.baseUrl + base.prefUserMessage +`/${params.avatar}`
      +`/${params.name}` + `/${params.birthday}` + `/${params.sex}` 
      + `/${params.email}` 
      + `/${params.phone}`);
    },

    /**
     * 修改用户名
     */
    changePwd(params){
      return axios.get(base.baseUrl + base.changePwd + `/${params.oldPwd}`
      +`/${params.newPwd}`  );
    }
}
export default api;