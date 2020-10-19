import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Asteroids from '@/components/AsteroidsDisplay';
import Login from '@/components/Login';
import Register from '@/components/Register';
import AsteroidFilter from '@/components/IdFilter'
import firebase from '../components/firebaseConfig'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/asteroids',
    name: 'Asteroids',
    component: Asteroids,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/filters',
    name: 'Filters',
    component: AsteroidFilter,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/signup',
    name: 'Register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)) {
    if(firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
