import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import Vconsole from "vconsole";
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  const vconsole = new Vconsole();
}
createApp(App).use(store).use(ElementPlus).use(router).mount('#app')
