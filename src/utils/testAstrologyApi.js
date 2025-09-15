/**
 * 星盘API集成测试工具
 * src/utils/testAstrologyApi.js
 */

import { fetchAstrologyData, checkApiHealth } from '../services/astrologyApiService.js';
import { createCompatibleAstrologyData } from './astrologyDataAdapter.js';
import { calculateFullFortune } from './calculator.js';

// 测试数据（基于您提供的示例）
const TEST_USER_DATA = {
  name: 'kid',
  birthdate: '1981-11-17',
  birthHour: 0,
  birthMinute: 50,
  birthplace: '浙江省台州市天台县',
  gender: 'male',
  // 为了兼容现有系统，添加完整的出生时间
  fullBirthDateTime: '1981-11-17T00:50:00.000Z'
};

/**
 * 测试API服务连通性
 */
export async function testApiConnectivity() {
  console.log('🔍 开始测试API连通性...');
  
  try {
    const isHealthy = await checkApiHealth();
    console.log(isHealthy ? '✅ API连通性测试通过' : '❌ API连通性测试失败');
    return isHealthy;
  } catch (error) {
    console.error('❌ API连通性测试出错:', error);
    return false;
  }
}

/**
 * 测试API数据获取
 */
export async function testApiDataFetch() {
  console.log('🔍 开始测试API数据获取...');
  
  try {
    const apiData = await fetchAstrologyData(TEST_USER_DATA);
    
    if (apiData && apiData.planet && Array.isArray(apiData.planet)) {
      console.log('✅ API数据获取成功');
      console.log('📊 获取到的行星数据数量:', apiData.planet.length);
      console.log('📊 获取到的宫位数据数量:', apiData.house?.length || 0);
      return apiData;
    } else {
      console.error('❌ API数据格式不正确');
      return null;
    }
  } catch (error) {
    console.error('❌ API数据获取失败:', error);
    return null;
  }
}

/**
 * 测试数据适配器转换
 */
export async function testDataAdapter() {
  console.log('🔍 开始测试数据适配器...');
  
  try {
    const apiData = await fetchAstrologyData(TEST_USER_DATA);
    if (!apiData) {
      console.error('❌ 无法获取API数据进行适配器测试');
      return null;
    }
    
    const adaptedData = createCompatibleAstrologyData(apiData);
    
    // 检查转换后的数据结构
    const requiredFields = ['astrologyPositions', 'fortune'];
    const missingFields = requiredFields.filter(field => !adaptedData[field]);
    
    if (missingFields.length === 0) {
      console.log('✅ 数据适配器测试通过');
      console.log('📊 转换后的行星数据:', Object.keys(adaptedData.astrologyPositions));
      return adaptedData;
    } else {
      console.error('❌ 数据适配器测试失败，缺少字段:', missingFields);
      return null;
    }
  } catch (error) {
    console.error('❌ 数据适配器测试出错:', error);
    return null;
  }
}

/**
 * 测试完整集成流程
 */
export async function testFullIntegration() {
  console.log('🔍 开始测试完整集成流程...');
  
  try {
    const results = await calculateFullFortune(TEST_USER_DATA);
    
    if (results && results.astrologyPositions) {
      console.log('✅ 完整集成测试通过');
      console.log('📊 计算结果数据源:', results.dataSource || '未知');
      
      // 检查关键行星位置
      const keyPlanets = ['sun', 'moon', 'ascendant'];
      const availablePlanets = keyPlanets.filter(planet => results.astrologyPositions[planet]);
      
      console.log('📊 可用的关键行星:', availablePlanets);
      
      if (availablePlanets.length >= 3) {
        console.log('✅ 关键行星数据完整');
        return results;
      } else {
        console.warn('⚠️ 部分关键行星数据缺失');
        return results;
      }
    } else {
      console.error('❌ 完整集成测试失败，缺少占星位置数据');
      return null;
    }
  } catch (error) {
    console.error('❌ 完整集成测试出错:', error);
    return null;
  }
}

/**
 * 对比本地计算和API计算结果
 */
export async function compareCalculationMethods() {
  console.log('🔍 开始对比本地计算和API计算...');
  
  try {
    // 临时关闭API使用本地计算
    const originalUseApi = process.env.VUE_APP_USE_EXTERNAL_ASTROLOGY_API;
    process.env.VUE_APP_USE_EXTERNAL_ASTROLOGY_API = 'false';
    
    const localResults = await calculateFullFortune(TEST_USER_DATA);
    
    // 恢复API设置
    process.env.VUE_APP_USE_EXTERNAL_ASTROLOGY_API = originalUseApi;
    
    const apiResults = await calculateFullFortune(TEST_USER_DATA);
    
    console.log('📊 本地计算结果 - 太阳星座:', localResults.astrologyPositions.sun?.sign);
    console.log('📊 API计算结果 - 太阳星座:', apiResults.astrologyPositions.sun?.sign);
    
    console.log('📊 本地计算结果 - 上升星座:', localResults.astrologyPositions.ascendant?.sign);
    console.log('📊 API计算结果 - 上升星座:', apiResults.astrologyPositions.ascendant?.sign);
    
    return {
      local: localResults,
      api: apiResults,
      comparison: {
        sunSignMatch: localResults.astrologyPositions.sun?.sign === apiResults.astrologyPositions.sun?.sign,
        ascendantSignMatch: localResults.astrologyPositions.ascendant?.sign === apiResults.astrologyPositions.ascendant?.sign
      }
    };
  } catch (error) {
    console.error('❌ 计算方法对比失败:', error);
    return null;
  }
}

/**
 * 运行所有测试
 */
export async function runAllTests() {
  console.log('🚀 开始运行星盘API集成测试套件...');
  console.log('=' .repeat(50));
  
  const results = {
    connectivity: false,
    dataFetch: false,
    adapter: false,
    fullIntegration: false,
    comparison: null
  };
  
  // 1. 测试API连通性
  results.connectivity = await testApiConnectivity();
  console.log('');
  
  // 2. 测试数据获取
  if (results.connectivity) {
    const apiData = await testApiDataFetch();
    results.dataFetch = !!apiData;
    console.log('');
    
    // 3. 测试数据适配器
    if (results.dataFetch) {
      const adaptedData = await testDataAdapter();
      results.adapter = !!adaptedData;
      console.log('');
    }
  }
  
  // 4. 测试完整集成
  const fullResults = await testFullIntegration();
  results.fullIntegration = !!fullResults;
  console.log('');
  
  // 5. 对比计算方法
  if (results.fullIntegration) {
    results.comparison = await compareCalculationMethods();
    console.log('');
  }
  
  // 输出测试总结
  console.log('📋 测试结果总结:');
  console.log('=' .repeat(50));
  console.log('API连通性:', results.connectivity ? '✅ 通过' : '❌ 失败');
  console.log('数据获取:', results.dataFetch ? '✅ 通过' : '❌ 失败');
  console.log('数据适配:', results.adapter ? '✅ 通过' : '❌ 失败');
  console.log('完整集成:', results.fullIntegration ? '✅ 通过' : '❌ 失败');
  
  if (results.comparison) {
    console.log('计算对比:', results.comparison.comparison ? '📊 已完成' : '❌ 失败');
  }
  
  const passedTests = Object.values(results).filter(r => r === true).length;
  const totalTests = 4; // connectivity, dataFetch, adapter, fullIntegration
  
  console.log('');
  console.log(`🎯 测试通过率: ${passedTests}/${totalTests} (${Math.round(passedTests/totalTests*100)}%)`);
  
  if (passedTests === totalTests) {
    console.log('🎉 所有测试通过！星盘API集成成功！');
  } else {
    console.log('⚠️ 部分测试失败，请检查配置和网络连接');
  }
  
  return results;
}

// 导出测试用数据供其他模块使用
export { TEST_USER_DATA };

// 如果直接运行此脚本，执行全部测试
if (typeof window !== 'undefined' && window.location) {
  // 在浏览器环境中，可以通过控制台调用
  window.testAstrologyApi = {
    runAllTests,
    testApiConnectivity,
    testApiDataFetch,
    testDataAdapter,
    testFullIntegration,
    compareCalculationMethods
  };
  
  console.log('💡 星盘API测试工具已加载，可通过 window.testAstrologyApi 调用各种测试');
}