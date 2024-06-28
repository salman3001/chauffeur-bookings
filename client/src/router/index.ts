import { createRouter, createWebHistory } from 'vue-router'
import MainRoutes from './MainRoutes'
import AuthRoutes from './AuthRoutes'
import { useNavGuard } from '@/composables/helpers/useNavGuard'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/auth/Error.vue')
    },
    MainRoutes,
    AuthRoutes
  ]
})

router.beforeEach((to, from, next) => {
  useNavGuard(to.meta, next)
})
