import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import AboutOur from '../views/AboutOur/index.vue'
import Menus from '../views/Menus'
import Calorie from '../views/Calorie'

import Product from '../views/Product'
import ProductCate from '../views/Product/productCate'
import ProductDetail from '../views/Product/productDetail'

import Cart from '../views/Cart'
import Collect from '../views/Collect'

import OwnDetail from '../views/OwnDetail'
import Energy from '../views/OwnDetail/Energy'
import Body from '../views/OwnDetail/Body'
import Steps from '../views/OwnDetail/Steps'
import TimeData from '../views/OwnDetail/TimeData'

import Details from '../views/Menus/Details'
import MaterialSec from "../views/Calorie/MaterialSec"

import Sport from '../views/Sport'
import SportsEquipment from '../views/Sport/SportsEquipment'
import Ball from '../views/Sport/Ball'
import SportDetails from '../views/Sport/Details'

import OwnMessage from '../views/OwnMessage'
import PrefMessage from '../views/OwnMessage/PrefMessage'
import ChanMessage from '../views/OwnMessage/ChanMessage'
import FindMessage from '../views/OwnMessage/FindMessage'

import MaterialThird from '../views/MaterialThird'
import Materialfor from '../views/Materialfor'
import Introduce from '../views/Introduce'

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
        path:'sport',
        name:'sport',
        redirect:'/sport/ball',
        component:Sport,
        children:[
          {
            path:'ball',
            name:'ball',
            component:Ball
          },
          {
            path:'sportsEquipment',
            name:'sportsEquipment',
            component:SportsEquipment
          }
        ]
      },
      {
        path:'product',
        name:'product',
        component:Product,
      },{
        path: '/materialthird',
        name: 'MaterialThird',
        component: MaterialThird
      }, {
        path: '/materialfor',
        name: 'Materialfor',
        component: Materialfor
      }, {
        path: '/introduce',
        name: 'Introduce',
        component: Introduce
      },{
        path:'owndetail',
        name:'owndetail',
        component:OwnDetail,
        redirect:'/owndetail/timedata',
        children:[
          {
            path:'energy',
            name:'energy',
            component:Energy
          },
          {
            path:'body',
            name:'body',
            component:Body
          },
          {
            path:'steps',
            name:'steps',
            component:Steps
          },
          {
            path:'timedata',
            name:'timedata',
            component:TimeData
          }
        ]

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
        
      },
      {
        path:'sportsDetails',
        name:'sportsDetails',
        component:SportDetails 
        
      },
      {
        path:'productCate',
        name:'productCate',
        component:ProductCate
      },
      {
        path:'productDetail',
        name:'productDetail',
        component:ProductDetail
      },
      {
        path:'cart',
        name:'cart',
        component:Cart
      },
      
      {
        path:'collect',
        name:'collect',
        component:Collect
      },
     
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
