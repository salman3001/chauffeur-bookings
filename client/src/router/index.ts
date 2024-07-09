import { createRouter, createWebHistory } from 'vue-router'
import MainRoutes from './MainRoutes'
import AuthRoutes from './AuthRoutes'
import { useNavGuard } from '@/composables/helpers/useNavGuard'
import AdminRoutes from './AdminRoutes'
import DevRoutes from './DevRoutes'
import BookingRoutes from './BookingRoutes'

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
    BookingRoutes,
    DevRoutes
  ]
})

router.beforeEach((to, from, next) => {
  useNavGuard(to.meta, next)
})
