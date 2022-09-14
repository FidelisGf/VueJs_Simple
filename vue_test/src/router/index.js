/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '../views/Empresa/ListView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path : '/list-empresa',
    name : 'list-empresa',

    component: () => import(/* webpackChunkName: "about" */ '../views/Empresa/ListView.vue')

  },
  {
    path : '/edit-empresa/:id',
    name : 'edit-empresa',

    component: () => import(/* webpackChunkName: "about" */ '../views/Empresa/EditView.vue')

  }
]

const router = new VueRouter({
  routes
})

export default router
