import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'

import http from './http'
Vue.prototype.$http = http

Vue.config.productionTip = false

Vue.mixin({ // mixin 混合入 为所有的vue对象都添加该代码块
  computed: {
    uploadUrl () {
      return this.$http.defaults.baseURL + '/upload'
    },
    isSuperAdmin () {
      return ['admin', 'superadmin'].includes(this.$store.state.user.logininfo._doc.username)
    },
    loginInfo () {
      return this.$store.state.user.logininfo._doc
    }
  },
  // mounted(){
  //   console.log('mixin~~~', this.$store.state.user.logininfo)
  // },
  methods: {
    getAuthHeader () {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
