/**
 * 数据编码器 - 将用户数据和分析结果编码到URL中
 * 解决分享链接失效问题
 */

// 数据版本，用于向后兼容
const DATA_VERSION = '1.0';

// 预留压缩功能接口，暂时不使用以保持稳定性

/**
 * 压缩并编码数据到URL安全的字符串
 * @param {Object} data - 要编码的数据
 * @returns {string} 编码后的字符串
 */
export function encodeDataForUrl(data) {
  try {
    // 1. 准备要编码的数据（精简版本，只保留必要字段）
    const payload = {
      v: DATA_VERSION,
      t: Date.now(),
      u: {
        n: data.userData.name,
        d: data.userData.birthdate,
        h: data.userData.birthHour,
        m: data.userData.birthMinute,
        p: data.userData.birthplace,
        g: data.userData.gender,
        f: data.userData.fullBirthDateTime
      },
      // 极简化计算结果，只保留核心数据
      r: {
        // 八字数据
        e: data.calculationResults.eightCharacters ? {
          y: [data.calculationResults.eightCharacters.year.heavenlyStem, data.calculationResults.eightCharacters.year.earthlyBranch],
          mo: [data.calculationResults.eightCharacters.month.heavenlyStem, data.calculationResults.eightCharacters.month.earthlyBranch],
          d: [data.calculationResults.eightCharacters.day.heavenlyStem, data.calculationResults.eightCharacters.day.earthlyBranch],
          h: [data.calculationResults.eightCharacters.hour.heavenlyStem, data.calculationResults.eightCharacters.hour.earthlyBranch]
        } : null,
        // 五行元素（只保留基本列表）
        el: data.calculationResults.elements || [],
        // 占星位置（只保留主要星体）
        as: data.calculationResults.astrologyPositions ? {
          asc: [data.calculationResults.astrologyPositions.ascendant.sign, data.calculationResults.astrologyPositions.ascendant.degree],
          sun: [data.calculationResults.astrologyPositions.sun.sign, data.calculationResults.astrologyPositions.sun.degree],
          moon: [data.calculationResults.astrologyPositions.moon.sign, data.calculationResults.astrologyPositions.moon.degree]
        } : null,
        // 运势概览（简化）
        f: data.calculationResults.fortune ? {
          o: data.calculationResults.fortune.overview,
          c: data.calculationResults.fortune.career,
          w: data.calculationResults.fortune.wealth,
          l: data.calculationResults.fortune.love,
          h: data.calculationResults.fortune.health
        } : null
      },
      a: data.analysisType
    };
    
    // 2. 转换为JSON字符串
    const jsonString = JSON.stringify(payload);
    
    // 3. 直接使用Base64编码（跳过压缩以避免复杂性）
    const base64 = btoa(encodeURIComponent(jsonString))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    return base64;
  } catch (error) {
    console.error('数据编码失败:', error);
    throw new Error('数据编码失败');
  }
}

/**
 * 从URL编码字符串解码数据
 * @param {string} encodedData - 编码的字符串
 * @returns {Object} 解码后的数据
 */
export function decodeDataFromUrl(encodedData) {
  try {
    // 1. 恢复Base64标准格式
    let base64 = encodedData
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    // 补充缺失的填充字符
    while (base64.length % 4) {
      base64 += '=';
    }
    
    // 2. 从Base64解码
    const jsonString = decodeURIComponent(atob(base64));
    
    // 3. 解析JSON
    const compactData = JSON.parse(jsonString);
    
    // 4. 将精简格式还原为完整格式
    const data = {
      version: compactData.v,
      timestamp: compactData.t,
      userData: {
        name: compactData.u.n,
        birthdate: compactData.u.d,
        birthHour: compactData.u.h,
        birthMinute: compactData.u.m,
        birthplace: compactData.u.p,
        gender: compactData.u.g,
        fullBirthDateTime: compactData.u.f
      },
      calculationResults: expandCalculationResults(compactData.r),
      analysisType: compactData.a
    };
    
    // 5. 版本检查
    if (!data.version || data.version !== DATA_VERSION) {
      console.warn('数据版本不匹配，可能存在兼容性问题');
    }
    
    return data;
  } catch (error) {
    console.error('数据解码失败:', error);
    throw new Error('数据解码失败，链接可能已损坏');
  }
}

/**
 * 将简化的计算结果展开为完整格式
 * @param {Object} compactResults - 简化的计算结果
 * @returns {Object} 展开的计算结果
 */
function expandCalculationResults(compactResults) {
  if (!compactResults) return null;

  const expanded = {};

  // 展开八字数据
  if (compactResults.e) {
    expanded.eightCharacters = {
      year: { 
        heavenlyStem: compactResults.e.y[0], 
        earthlyBranch: compactResults.e.y[1] 
      },
      month: { 
        heavenlyStem: compactResults.e.mo[0], 
        earthlyBranch: compactResults.e.mo[1] 
      },
      day: { 
        heavenlyStem: compactResults.e.d[0], 
        earthlyBranch: compactResults.e.d[1] 
      },
      hour: { 
        heavenlyStem: compactResults.e.h[0], 
        earthlyBranch: compactResults.e.h[1] 
      }
    };
  }

  // 展开五行元素
  if (compactResults.el) {
    expanded.elements = compactResults.el;
  }

  // 展开占星位置
  if (compactResults.as) {
    expanded.astrologyPositions = {
      ascendant: { 
        sign: compactResults.as.asc[0], 
        degree: compactResults.as.asc[1],
        minute: 0 // 为了简化，分钟设为0
      },
      sun: { 
        sign: compactResults.as.sun[0], 
        degree: compactResults.as.sun[1],
        minute: 0
      },
      moon: { 
        sign: compactResults.as.moon[0], 
        degree: compactResults.as.moon[1],
        minute: 0
      }
    };
  }

  // 展开运势
  if (compactResults.f) {
    expanded.fortune = {
      overview: compactResults.f.o,
      career: compactResults.f.c,
      wealth: compactResults.f.w,
      love: compactResults.f.l,
      health: compactResults.f.h
    };
  }

  return expanded;
}

/**
 * 生成包含数据的分享URL
 * @param {Object} userData - 用户数据
 * @param {Object} calculationResults - 计算结果
 * @param {string} analysisType - 分析类型
 * @returns {string} 完整的分享URL
 */
export function generateShareUrl(userData, calculationResults, analysisType = 'astrology') {
  try {
    // 准备要编码的核心数据
    const shareData = {
      userData: {
        name: userData.name,
        birthdate: userData.birthdate,
        birthHour: userData.birthHour,
        birthMinute: userData.birthMinute,
        birthplace: userData.birthplace,
        gender: userData.gender,
        fullBirthDateTime: userData.fullBirthDateTime
      },
      calculationResults,
      analysisType,
      shareId: generateShareId()
    };
    
    // 编码数据
    const encodedData = encodeDataForUrl(shareData);
    
    // 生成完整URL - 使用正确的Vue Router路径格式
    const baseUrl = window.location.origin;
    const routePath = analysisType === 'bazi' ? 'bazi-results' : 'astrology-results';
    
    return `${baseUrl}/#/${routePath}/shared?data=${encodedData}`;
  } catch (error) {
    console.error('生成分享链接失败:', error);
    throw new Error('生成分享链接失败');
  }
}

/**
 * 生成分享ID
 * @returns {string} 唯一的分享ID
 */
function generateShareId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/**
 * 从URL参数中恢复数据
 * @param {string} urlSearchParams - URL search params
 * @returns {Object|null} 恢复的数据或null
 */
export function restoreDataFromUrl(urlSearchParams) {
  try {
    const params = new URLSearchParams(urlSearchParams);
    const encodedData = params.get('data');
    
    if (!encodedData) {
      return null;
    }
    
    return decodeDataFromUrl(encodedData);
  } catch (error) {
    console.error('从URL恢复数据失败:', error);
    return null;
  }
}

/**
 * 验证分享数据的完整性
 * @param {Object} shareData - 分享数据
 * @returns {boolean} 是否有效
 */
export function validateShareData(shareData) {
  if (!shareData || typeof shareData !== 'object') {
    return false;
  }
  
  const { userData, calculationResults } = shareData;
  
  // 验证用户数据
  if (!userData || !userData.name || !userData.birthdate || 
      userData.birthHour === null || userData.birthMinute === null ||
      !userData.birthplace || !userData.gender) {
    return false;
  }
  
  // 验证计算结果
  if (!calculationResults) {
    return false;
  }
  
  return true;
}

/**
 * 生成分享内容
 * @param {Object} userData - 用户数据
 * @param {Object} calculationResults - 计算结果
 * @param {string} analysisType - 分析类型
 * @returns {Object} 分享内容
 */
export function generateShareContent(userData, calculationResults, analysisType) {
  const birthDate = new Date(userData.fullBirthDateTime);
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  
  // 根据分析类型生成不同的分享内容
  if (analysisType === 'bazi') {
    const { eightCharacters } = calculationResults;
    return {
      title: `${userData.name}的生辰八字分析`,
      desc: `${year}年${month}月${day}日生 | ${eightCharacters.year.heavenlyStem}${eightCharacters.year.earthlyBranch}年 ${eightCharacters.month.heavenlyStem}${eightCharacters.month.earthlyBranch}月 | 查看详细命盘分析`,
      imgUrl: `${window.location.origin}/images/bazi-share.jpg`
    };
  } else {
    const { astrologyPositions } = calculationResults;
    return {
      title: `${userData.name}的星盘分析`,
      desc: `${year}年${month}月${day}日生 | 上升${astrologyPositions.ascendant.sign} 太阳${astrologyPositions.sun.sign} | 查看详细占星分析`,
      imgUrl: `${window.location.origin}/images/astrology-share.jpg`
    };
  }
}

/**
 * 检查URL长度是否合理
 * @param {string} url - URL
 * @returns {boolean} 是否在合理范围内
 */
export function isUrlLengthReasonable(url) {
  // 微信分享URL建议不超过1000字符
  return url.length < 1000;
}

/**
 * 生成短链接（如果URL过长）
 * @param {string} longUrl - 长URL
 * @returns {Promise<string>} 短链接
 */
export async function generateShortUrl(longUrl) {
  // 这里可以集成短链接服务，比如t.cn, bit.ly等
  // 暂时返回原链接
  console.warn('URL过长，建议集成短链接服务');
  return longUrl;
}