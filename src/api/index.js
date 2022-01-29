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
     *
     */
    updateUserMessage(params){
      return axios.get(base.baseUrl + base.prefUserMessage +`/${params.avatar}`
      +`/${params.name}` + `/${params.birthday}` + `/${params.sex}` 
      + `/${params.email}` 
      + `/${params.phone}`
      + `/${params.age}`);
    },

    /**
     * 修改用户密码
     */
    changePwd(params){
      return axios.get(base.baseUrl + base.changePwd + `/${params.oldPwd}`
      +`/${params.newPwd}`  );
    },

    /**
     * 食谱
     */
    getRecipe(params){
      return axios.get(base.baseUrl + base.recipe + `/${params.name}`);
    },

    /**
     * 分类查询食物
     */
    getFoodByCat(params){
      return axios.get(base.baseUrl + base.food + `/${params.category}`);
    }

}
export default api;