import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mustations'
import createLogger from 'vuex/dist/logger'
// createLogger

Vue.use(Vuex)

// 非生产环境debug
const debug = process.env.NODE_DEV !== 'production'

export default new Vuex.Store({
  actions,
  state,
  mutations,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})