import * as types from './mutation-types'

// 方法名通过去mutation-types中获取
const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}
export default mutations