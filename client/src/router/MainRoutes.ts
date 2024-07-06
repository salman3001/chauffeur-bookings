import type { RouteRecordRaw } from 'vue-router'

const BookingRoutes: RouteRecordRaw = {
  path: '/',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'Home',
      path: '',
      component: () => import('@/views/book-now/book-now.vue')
    },
    {
      name: 'Book-Chauffeur',
      path: 'book-now/:chauffeurId/:dateTime/:duration',
      component: () => import('@/views/book-now/book-chauffeur.vue')
    },
    {
      name: 'Profile',
      path: '/profile',
      component: () => import('@/views/Profile.vue')
    },
    {
      name: 'Notifications',
      path: '/notifications',
      component: () => import('@/views/Notifications.vue')
    }
  ]
}

export default BookingRoutes
