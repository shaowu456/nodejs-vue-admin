import { login } from '@/api/user'
const state = {
  name: '',
  avatar: '',
  introduction: '',
  roles: ['admin'],
  logininfo: '33',
  userinfo: {}, // 登录的基本信息
  locationId: '', // 当前选择的仓库Id
  routerName: [],
  isSuperadmin: '',
  captchaCreate: ''
}
const getters = {
  firstLetter: state => {
    return state.userName.substr(0, 1)
  }
}
const mutations = {
  SET_LOGININFO(state, params) {
    state.logininfo = params
  },
  SET_SUPERADMIN(state, params){
    state.isSuperadmin = params
  }
}
const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      login(data)
        .then(res => {
          console.log('~~~login', res)
          let logininfo = res.data
          commit('SET_LOGININFO', logininfo) // 存储登录信息
          let username = logininfo._doc.username
          commit('SET_SUPERADMIN', !!(username === 'superadmin')) // 存储登录信息
          console.log(state)
          console.log(logininfo)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  isSuperadmin(){
    // debugger
    // return this.state.user.isSuperadmin
  }
}

export default {
  namespaced: false,
  getters,
  state,
  mutations,
  actions,
  modules: {
    //
  }
}
