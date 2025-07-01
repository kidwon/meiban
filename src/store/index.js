import { createStore } from 'vuex'
import { calculateFullFortune } from '../utils/calculator.js'

// 从 localStorage 恢复状态
function loadState() {
  try {
    const serializedState = localStorage.getItem('meibanAppState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('无法加载保存的状态:', error);
    return undefined;
  }
}

// 保存状态到 localStorage
function saveState(state) {
  try {
    const serializedState = JSON.stringify({
      userData: state.userData,
      calculationResults: state.calculationResults,
      settings: state.settings
    });
    localStorage.setItem('meibanAppState', serializedState);
  } catch (error) {
    console.error('无法保存状态:', error);
  }
}

// 初始状态
const initialState = {
  // 用户输入的数据
  userData: null,
  // 计算结果
  calculationResults: null,
  // 行运分析结果
  transitResults: null,
  // 应用设置
  settings: {
    language: 'ja',
    theme: 'default',
    notifications: true,
    autoSave: true
  },
  // 应用状态
  loading: false,
  error: null
};

// 尝试从 localStorage 恢复状态
const persistedState = loadState();

export default createStore({
  state: {
    ...initialState,
    ...persistedState
  },
  
  getters: {
    getUserData: state => state.userData,
    getCalculationResults: state => state.calculationResults,
    getTransitResults: state => state.transitResults,
    getSettings: state => state.settings,
    isLoading: state => state.loading,
    getError: state => state.error,
    
    // 检查是否有完整的用户数据
    hasCompleteUserData: state => {
      return state.userData && 
             state.userData.name && 
             state.userData.birthdate && 
             state.userData.birthHour !== '' && 
             state.userData.birthMinute !== '' && 
             state.userData.birthplace && 
             state.userData.gender;
    },
    
    // 检查是否有计算结果
    hasCalculationResults: state => {
      return state.calculationResults && 
             state.calculationResults.eightCharacters && 
             state.calculationResults.astrologyPositions;
    },
    
    // 获取用户年龄
    getUserAge: state => {
      if (!state.userData || !state.userData.fullBirthDateTime) return null;
      const birthDate = new Date(state.userData.fullBirthDateTime);
      const today = new Date();
      const ageInMs = today - birthDate;
      return Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 365.25));
    },
    
    // 获取格式化的用户信息
    getFormattedUserInfo: state => {
      if (!state.userData) return null;
      
      const birthDate = new Date(state.userData.fullBirthDateTime);
      return {
        name: state.userData.name,
        age: Math.floor((new Date() - birthDate) / (1000 * 60 * 60 * 24 * 365.25)),
        birthDateFormatted: `${birthDate.getFullYear()}年${birthDate.getMonth() + 1}月${birthDate.getDate()}日`,
        birthTimeFormatted: `${state.userData.birthHour}時${state.userData.birthMinute}分`,
        birthPlace: state.userData.birthplace,
        gender: state.userData.gender === 'male' ? '男性' : '女性'
      };
    }
  },
  
  mutations: {
    // 设置加载状态
    setLoading(state, loading) {
      state.loading = loading;
    },
    
    // 设置错误信息
    setError(state, error) {
      state.error = error;
    },
    
    // 清除错误
    clearError(state) {
      state.error = null;
    },
    
    // 设置用户数据
    setUserData(state, data) {
      state.userData = data;
      if (state.settings.autoSave) {
        saveState(state);
      }
    },
    
    // 设置计算结果
    setCalculationResults(state, results) {
      state.calculationResults = results;
      if (state.settings.autoSave) {
        saveState(state);
      }
    },
    
    // 设置行运结果
    setTransitResults(state, results) {
      state.transitResults = results;
      // 行运结果不需要持久化，因为它们是基于特定时间的
    },
    
    // 更新应用设置
    updateSettings(state, settings) {
      state.settings = { ...state.settings, ...settings };
      saveState(state);
    },
    
    // 清除用户数据
    clearUserData(state) {
      state.userData = null;
      state.calculationResults = null;
      state.transitResults = null;
      state.error = null;
      localStorage.removeItem('meibanAppState');
    },
    
    // 清除行运结果
    clearTransitResults(state) {
      state.transitResults = null;
    },
    
    // 清除计算结果
    clearCalculationResults(state) {
      state.calculationResults = null;
      if (state.settings.autoSave) {
        saveState(state);
      }
    }
  },
  
  actions: {
    // 保存用户数据
    saveUserData({ commit }, data) {
      commit('clearError');
      commit('setUserData', data);
    },
    
    // 计算命盘和八字
    async calculateFortune({ commit, state }, data = null) {
      const userData = data || state.userData;
      if (!userData) {
        const error = '缺少用户数据，请先填写基本信息';
        commit('setError', error);
        throw new Error(error);
      }
      
      commit('setLoading', true);
      commit('clearError');
      
      try {
        // 使用完整的计算功能
        const results = calculateFullFortune(userData);
        
        // 保存计算结果
        commit('setCalculationResults', results);
        
        return results;
      } catch (error) {
        console.error('命盘计算失败:', error);
        commit('setError', '命盘计算失败，请检查输入数据或稍后重试');
        
        // 如果计算失败，返回示例数据以保证应用不崩溃
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
      } finally {
        commit('setLoading', false);
      }
    },
    
    // 计算行运盘
    async calculateTransit({ commit, state }, { transitDate }) {
      const userData = state.userData;
      if (!userData) {
        const error = '缺少用户数据，请先填写基本信息';
        commit('setError', error);
        throw new Error(error);
      }
      
      commit('setLoading', true);
      commit('clearError');
      
      try {
        // 动态导入行运计算模块
        const [
          { calculateTransitChart },
          { generateDetailedTransitReport }
        ] = await Promise.all([
          import('../utils/transitCalculator.js'),
          import('../utils/transitReportGenerator.js')
        ]);
        
        // 计算行运数据
        const transitData = calculateTransitChart(userData, transitDate);
        
        // 生成详细报告
        const detailedReport = generateDetailedTransitReport(transitData, userData);
        
        // 保存结果
        commit('setTransitResults', detailedReport);
        
        return detailedReport;
      } catch (error) {
        console.error('行运计算失败:', error);
        commit('setError', '行运计算失败，请检查输入数据或稍后重试');
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },
    
    // 重新计算（强制刷新）
    async recalculateFortune({ dispatch, state }) {
      if (!state.userData) {
        throw new Error('缺少用户数据');
      }
      
      // 清除现有结果
      this.commit('clearCalculationResults');
      
      // 重新计算
      return await dispatch('calculateFortune');
    },
    
    // 更新应用设置
    updateAppSettings({ commit }, settings) {
      commit('updateSettings', settings);
    },
    
    // 切换自动保存
    toggleAutoSave({ commit, state }) {
      const newAutoSave = !state.settings.autoSave;
      commit('updateSettings', { autoSave: newAutoSave });
      
      // 如果开启自动保存，立即保存当前状态
      if (newAutoSave) {
        saveState(state);
      }
    },
    
    // 手动保存状态
    manualSave({ state }) {
      saveState(state);
    },
    
    // 清除所有数据
    resetApp({ commit }) {
      commit('clearUserData');
      commit('clearError');
    },
    
    // 清除行运数据
    clearTransitData({ commit }) {
      commit('clearTransitResults');
    },
    
    // 清除错误信息
    clearErrorMessage({ commit }) {
      commit('clearError');
    },
    
    // 初始化应用（恢复数据）
    async initializeApp({ state, dispatch, commit }) {
      try {
        commit('setLoading', true);
        
        // 如果有用户数据但没有计算结果，重新计算
        if (state.userData && !state.calculationResults) {
          await dispatch('calculateFortune');
        }
        
        // 清除可能存在的错误信息
        commit('clearError');
        
        return true;
      } catch (error) {
        console.error('应用初始化失败:', error);
        commit('setError', '应用初始化失败');
        return false;
      } finally {
        commit('setLoading', false);
      }
    },
    
    // 导出用户数据
    exportUserData({ state }) {
      if (!state.userData) {
        throw new Error('没有用户数据可以导出');
      }
      
      const exportData = {
        userData: state.userData,
        calculationResults: state.calculationResults,
        exportTime: new Date().toISOString(),
        version: '1.0'
      };
      
      return exportData;
    },
    
    // 导入用户数据
    async importUserData({ commit, dispatch }, importData) {
      try {
        if (!importData.userData) {
          throw new Error('导入数据格式错误');
        }
        
        commit('setLoading', true);
        
        // 设置用户数据
        commit('setUserData', importData.userData);
        
        // 如果有计算结果，也导入
        if (importData.calculationResults) {
          commit('setCalculationResults', importData.calculationResults);
        } else {
          // 否则重新计算
          await dispatch('calculateFortune');
        }
        
        return true;
      } catch (error) {
        console.error('导入数据失败:', error);
        commit('setError', '导入数据失败：' + error.message);
        throw error;
      } finally {
        commit('setLoading', false);
      }
    }
  },
  
  modules: {
    // 可以添加模块化的 store
    // 例如：用户模块、计算模块、设置模块等
  }
})