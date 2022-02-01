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
    },
    //摄入热量
    cale:0,
    //消耗热量
    sport:0,
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
    },

    /**摄入热量 */
    setCal(state,value){
     if(sessionStorage.getItem("cale")){
       sessionStorage.removeItem("cale");
     }
     state.cale += value;
     //保存本地
     sessionStorage.setItem("cale",state.cale);
    },

    /**
     * 清空摄入热量
     */
    clearCal(state){
      state.cale = 0;
      //本地清空
      sessionStorage.removeItem("cale");
    },

    /**
     * 消耗热量
     */
    setSport(state,value){
      if(sessionStorage.getItem("sport")){
        sessionStorage.removeItem("sport");
      }else{

      }
      state.sport +=value;
      sessionStorage.setItem("sport",state.sport);
    },

    /**
     * 清空消耗热量
     */
    clearSport(state){
      state.sport = 0;
      sessionStorage.removeItem("sport");
    }
  },
  getters:{
    /**获取最新的用户信息 */
    getUserMessage(state){
      
        return state.userMessage;
    },
    /**获取摄入热量 */
    getCal(state){
      return sessionStorage.getItem("cale");
    },
    /**获取消耗热量 */
    getSport(state){
      return sessionStorage.getItem("sport");
    }
  },
  actions: {
  },
  modules: {
  }
})
