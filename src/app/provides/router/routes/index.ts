import type { RouteRecordRaw } from 'vue-router'


import { route as mainRoute } from './main-page'
import { route as UIKitRoute } from './ui-kit'

export const routes: readonly RouteRecordRaw[] = [
    mainRoute,
    UIKitRoute
] as const