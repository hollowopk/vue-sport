import Vue from 'vue'
import VueRouter from 'vue-router'
import AboutOur from '../views/AboutOur'

Vue.use(VueRouter)

const routes = [
  {
    path: '/recipes',
    name: 'recipes',
    component: AboutOur
  }
]

const router = new VueRouter({
  routes
})

export default router
