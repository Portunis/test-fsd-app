import type { RouteRecordRaw } from 'vue-router'


import { route as mainRoute } from './main-page'
import { route as UIKitRoute } from './ui-kit'
import { route as chatPage} from "./chat.ts";

export const routes: readonly RouteRecordRaw[] = [
    mainRoute,
    UIKitRoute,
    chatPage
] as const