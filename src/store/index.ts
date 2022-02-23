import { createStore } from 'vuex'

export default createStore({
  state: {
    configInfo: {}
  },
  mutations: {
    SET_CONFIG_INFO(state, data) {
      state.configInfo = data
    }
  },
  actions: {
  },
  modules: {
  }
})
