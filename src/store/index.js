import { createStore } from 'vuex'

export default createStore({
  state: {
    // 用户输入的数据
    userData: null,
    // 计算结果
    calculationResults: null
  },
  getters: {
    getUserData: state => state.userData,
    getCalculationResults: state => state.calculationResults
  },
  mutations: {
    setUserData(state, data) {
      state.userData = data;
    },
    setCalculationResults(state, results) {
      state.calculationResults = results;
    }
  },
  actions: {
    // 保存用户数据
    saveUserData({ commit }, data) {
      commit('setUserData', data);
    },
    // 计算命盘和八字
    calculateFortune({ commit, state }, data = null) {
      const userData = data || state.userData;
      if (!userData) return;
      
      // 这里将来会添加实际的计算逻辑
      // 目前只是一个演示数据
      const mockResults = {
        eightCharacters: {
          year: { heavenlyStem: '甲', earthlyBranch: '子' },
          month: { heavenlyStem: '丙', earthlyBranch: '寅' },
          day: { heavenlyStem: '戊', earthlyBranch: '午' },
          hour: { heavenlyStem: '庚', earthlyBranch: '申' }
        },
        elements: ['木', '火', '土', '金'],
        fortune: {
          overview: '大吉',
          career: '★★★☆☆',
          wealth: '★★★★☆',
          love: '★★★★★',
          health: '★★★☆☆'
        }
      };
      
      // 保存计算结果
      commit('setCalculationResults', mockResults);
      
      return mockResults;
    }
  }
})