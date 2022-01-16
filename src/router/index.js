import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import AboutOur from '../views/AboutOur'
import Menus from '../views/Menus'
import Calorie from '../views/Calorie'
import OwnDetail from '../views/OwnDetail'

import Login from '../views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'home',
    redirect:'/recipes',
    component:Home,
    children:[
      {
        path: 'recipes',
        name: 'recipes',
        component: AboutOur
      },
      {
        path:'menus',
        name:'menus',
        component:Menus
      },
      {
        path:'calorie',
        name:'calorie',
        component:Calorie
      },
      {
        path:'owndetail',
        name:'owndetail',
        component:OwnDetail
      },
    ]
  },

  {
    path:'/login',
    name:'login',
    component:Login
  },
]

const router = new VueRouter({
  routes
})

export default router
