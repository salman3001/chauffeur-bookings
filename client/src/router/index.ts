import { createRouter, createWebHistory } from 'vue-router'
import MainRoutes from './MainRoutes'
import AuthRoutes from './AuthRoutes'
import { useNavGuard } from '@/composables/helpers/useNavGuard'
import AdminRoutes from './AdminRoutes'
import DevRoutes from './DevRoutes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/Error.vue')
    },
    MainRoutes,
    AdminRoutes,
    AuthRoutes,
    DevRoutes
  ]
})

router.beforeEach((to, from, next) => {
  useNavGuard(to.meta, next)
})
