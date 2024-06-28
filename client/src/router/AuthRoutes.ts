import type { RouteRecordRaw } from 'vue-router'

const AuthRoutes: RouteRecordRaw = {
  path: '/auth',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    guest: true
  },
  children: [
    {
      name: 'Login',
      path: '/auth/login',
      component: () => import('@/views/auth/Login.vue'),
      meta: {}
    },
    {
      name: 'Register',
      path: '/auth/register',
      component: () => import('@/views/auth/Register.vue')
    }
  ]
}

export default AuthRoutes
