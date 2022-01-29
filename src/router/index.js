import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import AboutOur from '../views/AboutOur'
import Menus from '../views/Menus'
import Calorie from '../views/Calorie'
import OwnDetail from '../views/OwnDetail'
import Details from '../views/Menus/Details'
import MaterialSec from "../views/Calorie/MaterialSec"

import OwnMessage from '../views/OwnMessage'
import PrefMessage from '../views/OwnMessage/PrefMessage'
import ChanMessage from '../views/OwnMessage/ChanMessage'
import FindMessage from '../views/OwnMessage/FindMessage'

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
      {
        path:'/login',
        name:'login',
        component:Login
      },
      {
        path:'details',
        name:'details',
        component:Details 
      },
      {
        path:'materialSec',
        name:'materialSec',
        component:MaterialSec 
        
      }
     
    ]
  },
  {
    path:'/ownmessage',
    name:'ownmessage',
    component:OwnMessage,
    redirect:'/ownmessage/prefmessage',
    children:[
      {
        path:'prefmessage',
        name:'prefmessage',
        component:PrefMessage
      },
      {
        path:'chanmessage',
        name:'chanmessage',
        component:ChanMessage
      },
      {
        path:'findmessage',
        name:'findmessage',
        component:FindMessage
      }
    ]
  }

 
]


const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
