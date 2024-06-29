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
      path: 'login',
      component: () => import('@/views/auth/Login.vue'),
      meta: {}
    },
    {
      name: 'Register',
      path: 'register',
      component: () => import('@/views/auth/Register.vue')
    },
    {
      name: 'Check-Email',
      path: 'check-email',
      component: () => import('@/views/auth/CheckEmail.vue')
    },
    {
      name: 'Confirming-Email',
      path: 'confirming-email',
      component: () => import('@/views/auth/ConfirmingEmail.vue')
    },
    {
      name: 'Forgot-Password',
      path: 'forgot-password',
      component: () => import('@/views/auth/ForgotPassword.vue')
    },
    {
      name: 'Reset-Password',
      path: 'reset-password',
      component: () => import('@/views/auth/ResetPassword.vue')
    }
  ]
}

export default AuthRoutes
