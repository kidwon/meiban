import { createStore } from 'vuex'
import { calculateFullFortune } from '../utils/calculator.js'

// 本地存储的 key
const USER_DATA_KEY = 'meiban_user_data'
const CALCULATION_RESULTS_KEY = 'meiban_calculation_results'

// 从本地存储加载数据
function loadFromStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error(`从本地存储加载 ${key} 失败:`, error)
    return null
  }
}

// 保存数据到本地存储
function saveToStorage(key, data) {
  try {
    if (data === null || data === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(data))
    }
  } catch (error) {
    console.error(`保存 ${key} 到本地存储失败:`, error)
  }
}

export default createStore({
  state: {
    // 用户输入的数据 - 从本地存储恢复
    userData: loadFromStorage(USER_DATA_KEY),
    // 计算结果 - 从本地存储恢复
    calculationResults: loadFromStorage(CALCULATION_RESULTS_KEY)
  },
  getters: {
    getUserData: state => state.userData,
    getCalculationResults: state => state.calculationResults,
    // 检查是否有有效的用户数据（名字为可选）
    hasValidUserData: state => {
      return state.userData && 
             state.userData.birthdate && 
             state.userData.birthHour !== '' && 
             state.userData.birthMinute !== '' && 
             state.userData.birthplace && 
             state.userData.gender
    },
    // 检查是否有计算结果
    hasCalculationResults: state => state.calculationResults !== null
  },
  mutations: {
    setUserData(state, data) {
      state.userData = data
      // 同步保存到本地存储
      saveToStorage(USER_DATA_KEY, data)
    },
    setCalculationResults(state, results) {
      state.calculationResults = results
      // 同步保存到本地存储
      saveToStorage(CALCULATION_RESULTS_KEY, results)
    },
    // 清空所有数据
    clearAllData(state) {
      state.userData = null
      state.calculationResults = null
      // 清空本地存储
      saveToStorage(USER_DATA_KEY, null)
      saveToStorage(CALCULATION_RESULTS_KEY, null)
    }
  },
  actions: {
    // 保存用户数据
    saveUserData({ commit }, data) {
      commit('setUserData', data)
      console.log('用户数据已保存:', data)
    },
    
    // 计算命盘和八字
    calculateFortune({ commit, state }, data = null) {
      const userData = data || state.userData
      if (!userData) {
        console.warn('没有用户数据，无法进行计算')
        return null
      }
      
      try {
        console.log('开始计算命盘...')
        // 使用完整的计算功能
        const results = calculateFullFortune(userData)
        
        // 保存计算结果
        commit('setCalculationResults', results)
        console.log('计算结果已保存:', results)
        
        return results
      } catch (error) {
        console.error('命盘计算失败:', error)
        
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
        }
        
        commit('setCalculationResults', mockResults)
        return mockResults
      }
    },
    
    // 清空所有数据
    clearAllData({ commit }) {
      commit('clearAllData')
      console.log('所有数据已清空')
    },
    
    // 重新计算（如果有用户数据的话）
    recalculate({ dispatch, state }) {
      if (state.userData) {
        return dispatch('calculateFortune')
      } else {
        console.warn('没有用户数据，无法重新计算')
        return null
      }
    }
  }
})