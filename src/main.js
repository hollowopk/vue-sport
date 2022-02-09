import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import api from "./api/index"
import http from "./api/http"
import echarts from './assets/js/echarts'

import { postRequest } from './assets/js/Respone'
import { putRequest } from './assets/js/Respone'
import { getRequest } from './assets/js/Respone'
import { deleteRequest } from './assets/js/Respone'
import { foodRequest } from './assets/js/Respone'

Vue.prototype.$echarts = window.echarts //将全局Echarts挂载到Vue原型对象上
Vue.prototype.$api = api;
Vue.prototype.$http = http;
Vue.config.productionTip = false

Vue.prototype.$addStorageEvent = function (key, newVal) {
      // 创建一个StorageEvent事件
      var newStorageEvent = document.createEvent('StorageEvent');
      const storage = {
          setItem: function (k, val) {
              sessionStorage.setItem(k, val);

              // 初始化创建的事件
              newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

              // 派发对象
              window.dispatchEvent(newStorageEvent)
          }
      }
      return storage.setItem(key, newVal);
  }


// 将封装的请求转化为组件的形式引用
Vue.prototype.postRequest = postRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.foodRequest = foodRequest

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
