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
          name: 'Users.Index',
          path: '',
          component: () => import('@/views/admin/users/index.user.vue')
        },
        {
          name: 'Users.Create',
          path: 'create',
          component: () => import('@/views/admin/users/create.user.vue')
        },
        {
          name: 'Users.Edit',
          path: ':id/edit',
          component: () => import('@/views/admin/users/edit.user.vue')
        }
      ]
    },
    {
      path: 'cars',
      children: [
        {
          name: 'Cars.Index',
          path: '',
          component: () => import('@/views/admin/cars/cars.index.vue')
        },
        {
          name: 'Cars.Create',
          path: 'create',
          component: () => import('@/views/admin/cars/cars.create.vue')
        },
        {
          name: 'Cars.Edit',
          path: ':id/edit',
          component: () => import('@/views/admin/cars/cars.edit.vue')
        }
      ]
    }
  ]
}

export default AdminRoutes
