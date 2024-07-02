import appConfig from '@/config/app.config'
import type { RouteRecordRaw } from 'vue-router'

const DevRoutes: RouteRecordRaw = {
  path: '/dev',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'Icons',
      path: 'icons',
      component: () => import('@/views/dev/Icons.vue')
    }
  ]
}

export default appConfig.isDev ? DevRoutes : ({} as any)
