import appConfig from '@/config/app.config'
import type { RouteRecordRaw } from 'vue-router'

const DevRoutes: RouteRecordRaw = {
  path: '/dev',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'Typography',
      path: 'typography',
      component: () => import('@/views/dev/Typography.vue')
    },
    {
      name: 'Shadow',
      path: 'shadow',
      component: () => import('@/views/dev/Shadow.vue')
    },
    {
      name: 'Icons',
      path: 'icons',
      component: () => import('@/views/dev/Icons.vue')
    }
  ]
}

export default appConfig.isDev ? DevRoutes : ({} as any)
