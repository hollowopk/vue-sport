import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //保存用户身份信息
    userMessage:{
      account:'',
      avatar:'',
      email:'',
      id:'',
      name:"",
      password:'',
      sex:"",
    }
  },
  mutations: {
    /** 存储用户信息 */
    setUser(state,value){
    let userMessage = JSON.parse(JSON.stringify(value,['account','avatar','email','id','name','password','sex']))
    state.userMessage = userMessage;    
    },
    /**退出登录，清除用户信息 */
    clearUser(state){
    for(var i=0;i<state.userMessage.length;i++){
       //console.log('store', state.userMessage[i]);
    }
    }
  },
  getters:{
    /**获取最新的用户信息 */
    getUserMessage(state){
        return state.userMessage;
    }
  },
  actions: {
  },
  modules: {
  }
})
