/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '../views/Empresa/ListView.vue'
import axios, { Axios } from 'axios'
Vue.use(VueRouter)

const routes = [
  
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },

  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
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
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
    // If logged in, or going to the Login page.
   
    if (token || to.name === 'login') {
      next()
    } else {
      // Not logged in, redirect to login.
      next({name: 'login'})
    }
  }
);

export default router
