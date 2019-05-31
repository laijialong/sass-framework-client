import Vue from 'vue'
import App from './App'

import YxLogger from './plugins/yx-logger'
//import YxLogger from 'yx-logger'
Vue.prototype.$log = YxLogger

//import wxUtils from "./utils/wxUtils"
//Vue.prototype.$sys = wxUtils
//
//import logUtils from "./utils/logUtils"
//Vue.prototype.$log = logUtils
//
//import strUtils from "./utils/strUtils"
//Vue.prototype.$str = strUtils
//
//import store from './store'
//// import store from './store_dhsh_user'
//Vue.prototype.$store = store
//
//import pages from './assets/config_page'
//// import pages from './assets/config_page_dhsh_user'
//Vue.prototype.$pages = pages
//
import request from './assets/config_http_req'
Vue.prototype.$request = request
//
//import '@/assets/icon/iconfont.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
