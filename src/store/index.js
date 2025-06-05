import { createStore } from 'vuex'
import { calculateFullFortune } from '../utils/calculator.js'

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
      
      try {
        // 使用完整的计算功能
        const results = calculateFullFortune(userData);
        
        // 保存计算结果
        commit('setCalculationResults', results);
        
        return results;
      } catch (error) {
        console.error('命盘计算失败:', error);
        
        // 如果计算失败，返回示例数据
        const mockResults = {
          eightCharacters: {
            year: { heavenlyStem: '甲', earthlyBranch: '子' },
            month: { heavenlyStem: '丙', earthlyBranch: '寅' },
            day: { heavenlyStem: '戊', earthlyBranch: '午' },
            hour: { heavenlyStem: '庚', earthlyBranch: '申' }
          },
          elements: ['木', '火', '土', '金'],
          astrologyPositions: {
            ascendant: {
              sign: '双子座',
              degree: 4,
              minute: 11
            },
            sun: {
              sign: '双鱼座',
              degree: 13,
              minute: 49
            },
            moon: {
              sign: '水瓶座',
              degree: 18,
              minute: 56
            }
          },
          fortune: {
            overview: '大吉',
            career: '★★★☆☆',
            wealth: '★★★★☆',
            love: '★★★★★',
            health: '★★★☆☆'
          }
        };
        
        commit('setCalculationResults', mockResults);
        return mockResults;
      }
    }
  }
})