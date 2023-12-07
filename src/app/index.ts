import { createApp } from 'vue'
import App from './App.vue'
import {router} from "./provides";
import './styles/index.scss'
export const application = createApp(App).use(router)
