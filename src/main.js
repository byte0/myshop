import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 区分Vue组件和小程序组件
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
