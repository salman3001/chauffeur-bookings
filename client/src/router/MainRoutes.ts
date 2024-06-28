import type { RouteRecordRaw } from 'vue-router'

const MainRoutes: RouteRecordRaw = {
  path: '/',
  meta: {
    requiresAuth: true
  },
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'Dashboard',
      path: '/',
      component: () => import('@/views/dashboard/index.vue')
    },
    {
      name: 'Typography',
      path: '/ui/typography',
      component: () => import('@/views/components/Typography.vue')
    },
    {
      name: 'Shadow',
      path: '/ui/shadow',
      component: () => import('@/views/components/Shadow.vue')
    },
    {
      name: 'Icons',
      path: '/icons',
      component: () => import('@/views/pages/Icons.vue')
    }
  ]
}

export default MainRoutes
