import type { RouteRecordRaw } from 'vue-router'

const BookingRoutes: RouteRecordRaw = {
  path: '/',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'Home',
      path: '',
      component: () => import('@/views/booking/Index.vue')
    }
  ]
}

export default BookingRoutes
