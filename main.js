import App from './App'
import store from './store'
// 引入全局uView
import uView from '@/uni_modules/uview-ui'
// 引入mockjs 
import Mock from './src/mock.js'
import constData from '@/utils/pagesConstData.json'
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
Vue.use(uView)
Vue.prototype.$CData =constData
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.config.globalProperties.$CData=constData
  return {
    app
  }
}
// #endif
