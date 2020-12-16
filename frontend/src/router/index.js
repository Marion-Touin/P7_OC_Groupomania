import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import connexion from '../views/connexion'
import inscription from '../views/inscription'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: connexion
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: inscription
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
