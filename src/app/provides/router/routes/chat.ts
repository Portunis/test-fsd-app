import type { RouteRecordRaw } from 'vue-router'
export const routeName = 'ChatPage'
export const route: RouteRecordRaw = {
    name: routeName,
    path: '/chat',
    component: () => import('../../../../pages/chat'),
}