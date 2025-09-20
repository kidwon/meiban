/**
 * 星盘API服务 - 集成第三方星盘API
 * src/services/astrologyApiService.js
 */

import { getCoordinatesFromLocation } from '../utils/cityCoordinates.js';

// API配置
const API_CONFIG = {
  // 使用 Cloudflare Worker 代理
  baseUrl: 'https://xingpan-proxy.kidyuan.workers.dev',
  // Worker 会在服务端注入 access_token，前端不需要携带
  // API参数配置
  defaultParams: {
    h_sys: 'P', // 宫位系统
    planets: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 't'], // 行星列表
    virtual: ['10'], // 虚点
    // 相位配置
    phase: {
      '0': 0,
      '30': 2,
      '36': 2, 
      '45': 2,
      '60': 6,
      '72': 2,
      '90': 6,
      '120': 6,
      '135': 0.5,
      '144': 2,
      '150': 2,
      '180': 6
    },
    ay: '-1',
    tomorrow_type: '1',
    svg_type: '1'
  },
  // 请求超时时间
  timeout: 15000,
  // 最大重试次数
  maxRetries: 2
};

/**
 * 格式化出生日期时间
 * @param {string} birthdate - 出生日期 (YYYY-MM-DD)
 * @param {number} birthHour - 出生小时
 * @param {number} birthMinute - 出生分钟
 * @returns {string} 格式化的日期时间字符串
 */
function formatBirthDateTime(birthdate, birthHour, birthMinute) {
  const hour = String(birthHour || 0).padStart(2, '0');
  const minute = String(birthMinute || 0).padStart(2, '0');
  return `${birthdate} ${hour}:${minute}`;
}

/**
 * 获取城市坐标信息
 * @param {string} birthplace - 出生地名称
 * @returns {Object} 包含经纬度的对象
 */
function getLocationCoordinates(birthplace) {
  try {
    // 尝试从城市坐标数据中获取
    const coordinates = getCoordinatesFromLocation(birthplace);
    if (coordinates && coordinates.lat && coordinates.lng) {
      return {
        latitude: coordinates.lat,
        longitude: coordinates.lng
      };
    }
    
    // 如果没有找到，返回天台县的坐标作为默认值
    console.warn(`未找到 ${birthplace} 的坐标信息，使用默认坐标`);
    return {
      latitude: 29.13,
      longitude: 121.03
    };
  } catch (error) {
    console.error('获取坐标信息失败:', error);
    // 返回天台县坐标作为后备
    return {
      latitude: 29.13,
      longitude: 121.03
    };
  }
}

/**
 * 构建API请求参数
 * @param {Object} userData - 用户数据
 * @returns {Object} API请求参数
 */
function buildApiParams(userData) {
  const { birthdate, birthHour, birthMinute, birthplace } = userData;
  
  // 获取坐标信息
  const coordinates = getLocationCoordinates(birthplace);
  
  // 格式化出生时间
  const formattedDateTime = formatBirthDateTime(birthdate, birthHour, birthMinute);
  
  // 构建请求参数（不包含 access_token，由 Worker 在服务端注入）
  const params = {
    longitude: coordinates.longitude.toString(),
    latitude: coordinates.latitude.toString(),
    tz: '8.00', // 中国时区 UTC+8
    h_sys: API_CONFIG.defaultParams.h_sys,
    birthday: formattedDateTime,
    ay: API_CONFIG.defaultParams.ay,
    tomorrow_type: API_CONFIG.defaultParams.tomorrow_type,
    svg_type: API_CONFIG.defaultParams.svg_type
  };
  
  // 添加行星参数
  API_CONFIG.defaultParams.planets.forEach((planet, index) => {
    params[`planets[${index}]`] = planet;
  });
  
  // 添加虚点参数
  API_CONFIG.defaultParams.virtual.forEach((virtual, index) => {
    params[`virtual[${index}]`] = virtual;
  });
  
  // 添加相位参数
  Object.entries(API_CONFIG.defaultParams.phase).forEach(([angle, value]) => {
    params[`phase[${angle}]`] = value;
  });
  
  return params;
}

/**
 * 发送API请求
 * @param {Object} params - 请求参数
 * @returns {Promise<Object>} API响应数据
 */
async function sendApiRequest(params) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
  
  try {
    // 构建URLSearchParams
    const formData = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    console.log('🚀 发送星盘API请求 (通过Cloudflare Worker):', API_CONFIG.baseUrl);
    console.log('📋 请求参数:', params);
    console.log('📤 请求体 (form-data):', formData.toString());

    const response = await fetch(API_CONFIG.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': window.location.origin // 为 CORS 设置正确的 Origin
      },
      body: formData,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
    }
    
    const responseText = await response.text();
    console.log('📥 原始响应:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ JSON解析失败:', parseError);
      throw new Error(`响应解析失败: ${responseText}`);
    }

    console.log('✅ API响应成功');
    console.log('📦 响应数据:', data);

    if (data.code !== 0) {
      throw new Error(`API返回错误 (code: ${data.code}): ${data.msg || '未知错误'}`);
    }
    
    return data;
    
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('API请求超时');
    }
    
    console.error('❌ API请求失败:', error);
    throw error;
  }
}

/**
 * 带重试机制的API调用
 * @param {Object} userData - 用户数据
 * @returns {Promise<Object>} API响应数据
 */
async function callApiWithRetry(userData) {
  const params = buildApiParams(userData);
  let lastError;
  
  for (let attempt = 1; attempt <= API_CONFIG.maxRetries; attempt++) {
    try {
      console.log(`🔄 API调用尝试 ${attempt}/${API_CONFIG.maxRetries}`);
      const result = await sendApiRequest(params);
      return result;
    } catch (error) {
      lastError = error;
      
      if (attempt < API_CONFIG.maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 指数退避
        console.warn(`⚠️ 第${attempt}次尝试失败，${delay}ms后重试:`, error.message);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  console.error(`❌ API调用失败，已达到最大重试次数 (${API_CONFIG.maxRetries}):`, lastError);
  throw lastError;
}

/**
 * 获取星盘数据的主要接口
 * @param {Object} userData - 用户输入数据
 * @returns {Promise<Object>} 处理后的星盘数据
 */
export async function fetchAstrologyData(userData) {
  try {
    // 验证输入数据
    if (!userData || !userData.birthdate || !userData.birthplace) {
      throw new Error('缺少必要的出生信息（日期和地点）');
    }
    
    console.log('🌟 开始获取星盘数据');
    console.log('👤 用户数据:', userData);
    
    // 调用API
    const apiResponse = await callApiWithRetry(userData);
    
    if (!apiResponse.data) {
      throw new Error('API返回数据格式错误');
    }
    
    console.log('🎯 星盘数据获取成功');
    return apiResponse.data;
    
  } catch (error) {
    console.error('🚫 获取星盘数据失败:', error);
    throw new Error(`星盘API调用失败: ${error.message}`);
  }
}

/**
 * 检查API服务是否可用
 * @returns {Promise<boolean>} API服务可用性
 */
export async function checkApiHealth() {
  try {
    // 使用测试数据检查API
    const testData = {
      birthdate: '1981-11-17',
      birthHour: 0,
      birthMinute: 50,
      birthplace: '浙江省台州市天台县'
    };
    
    await fetchAstrologyData(testData);
    return true;
  } catch (error) {
    console.error('API健康检查失败:', error);
    return false;
  }
}

/**
 * 设置API令牌 (已弃用，Worker 模式下由服务端管理)
 * @param {string} token - API令牌 (Worker 模式下忽略)
 * @deprecated Worker 模式下 token 由服务端管理，此方法已无效
 */
export function setApiToken() {
  console.warn('⚠️ Worker 模式下 API 令牌由服务端管理，setApiToken 方法已无效');
}

/**
 * 获取当前API配置
 * @returns {Object} 当前配置信息（不包含敏感信息）
 */
export function getApiConfig() {
  return {
    baseUrl: API_CONFIG.baseUrl,
    timeout: API_CONFIG.timeout,
    maxRetries: API_CONFIG.maxRetries,
    proxyMode: 'Cloudflare Worker',
    tokenManagement: 'Server-side'
  };
}

// 导出默认配置供测试使用
export { API_CONFIG };