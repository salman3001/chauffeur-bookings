import type { RouteRecordRaw } from 'vue-router'

const BookingRoutes: RouteRecordRaw = {
  path: '/bookings',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'Bookings',
      path: '',
      component: () => import('@/views/bookings/bookings.index.vue')
    },
    {
      name: 'Bookings.Show',
      path: ':id',
      component: () => import('@/views/bookings/booking.show.vue')
    }
  ]
}

export default BookingRoutes
