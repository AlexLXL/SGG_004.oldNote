import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false // 关闭生成环境的提示
App.mpType = 'app'

const app = new Vue(App)
// 挂载app
app.$mount()
