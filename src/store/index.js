import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo:null,
  },
  mutations: {
     // 更新状态值
     updateState(state, data) {
      state[data.name] = data.value;
    }
  },
  actions: {
    // 异步更新状态值
    updateState(context, data) {
      context.commit('updateState', data);
    }
  },
  modules: {}
});
