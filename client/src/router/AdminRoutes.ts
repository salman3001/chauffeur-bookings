import { UserType } from '@/utils/enums/UserType'
import type { RouteRecordRaw } from 'vue-router'

const AdminRoutes: RouteRecordRaw = {
  path: '/admin',
  meta: {
    requiresAuth: true,
    role: UserType.ADMIN
  },
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'Dashboard',
      path: 'dashboard',
      component: () => import('@/views/admin/Dashboard.vue')
    },
    {
      path: 'users',
      children: [
        {
          name: 'Users',
          path: '',
          component: () => import('@/views/admin/users/Index.vue')
        }
      ]
    }
  ]
}

export default AdminRoutes
