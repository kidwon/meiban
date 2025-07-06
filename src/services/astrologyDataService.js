/**
 * 占星数据服务 - 统一管理占星相关的数据和描述
 * src/services/astrologyDataService.js
 */

// 星座描述数据
export const signDescriptions = {
  // 太阳星座描述
  sun: {
    '白羊座': '您具有開拓精神和領導能力，喜歡迎接挑戰，行動力強。',
    '金牛座': '您穩重實際，重視安全感，具有持久的毅力和藝術品味。',
    '双子座': '您聰明好奇，善於溝通，喜歡學習新事物，適應能力強。',
    '巨蟹座': '您情感豐富，重視家庭，具有強烈的保護欲和直觉力。',
    '狮子座': '您自信大方，具有表演天賦，喜歡成為注意的焦點。',
    '处女座': '您注重細節，追求完美，具有強烈的服務精神。',
    '天秤座': '您追求和諧平衡，具有藝術氣質，善於外交。',
    '天蝎座': '您深刻敏銳，具有洞察力，意志力堅強。',
    '射手座': '您樂觀開朗，喜歡自由，具有哲學思維。',
    '摩羯座': '您踏實務實，有強烈的責任感和成就欲。',
    '水瓶座': '您獨立創新，思維前衛，關心人道主義。',
    '双鱼座': '您富有想像力，敏感直覺，具有藝術天賦。'
  },
  
  // 月亮星座描述
  moon: {
    '白羊座': '情感直接衝動，需要即時的情感回應，喜歡刺激的情感體驗。',
    '金牛座': '情感穩定持久，需要安全感，喜歡溫暖舒適的環境。',
    '双子座': '情感變化多樣，需要智力刺激，喜歡與人交流分享。',
    '巨蟹座': '情感深刻敏感，需要歸屬感，重視家庭親情。',
    '狮子座': '情感熱烈大方，需要被欣賞，喜歡成為焦點。',
    '处女座': '情感細膩理性，需要秩序感，喜歡照顧他人。',
    '天秤座': '情感追求和諧，需要伴侶關係，避免衝突。',
    '天蝎座': '情感深邃強烈，需要深度連結，具有強烈的占有欲。',
    '射手座': '情感自由樂觀，需要空間自由，喜歡探索新體驗。',
    '摩羯座': '情感內斂實際，需要穩定結構，重視傳統價值。',
    '水瓶座': '情感獨立理性，需要友誼支持，關心集體利益。',
    '双鱼座': '情感敏感夢幻，需要精神共鳴，具有同理心。'
  },
  
  // 上升星座描述
  ascendant: {
    '白羊座': '給人積極主動的第一印象，展現出領導者的氣質。',
    '金牛座': '給人穩重可靠的印象，展現出優雅的品味。',
    '双子座': '給人聰明機智的印象，展現出良好的溝通能力。',
    '巨蟹座': '給人溫暖親切的印象，展現出關懷他人的特質。',
    '狮子座': '給人自信大方的印象，展現出王者風範。',
    '处女座': '給人細心周到的印象，展現出專業能力。',
    '天秤座': '給人優雅和諧的印象，展現出良好的社交技巧。',
    '天蝎座': '給人神秘深邃的印象，展現出強烈的個人魅力。',
    '射手座': '給人樂觀自由的印象，展現出冒險精神。',
    '摩羯座': '給人成熟穩重的印象，展現出責任感。',
    '水瓶座': '給人獨特創新的印象，展現出前衛思維。',
    '双鱼座': '給人溫柔夢幻的印象，展現出藝術氣質。'
  }
};

// 事业相关数据
export const careerData = {
  // 事业优势
  strengths: {
    '白羊座': '您具有天生的領導才能和開拓精神，適合在需要創新和決策的環境中發揮。',
    '金牛座': '您擅長務實的工作，在需要穩定性和持續努力的領域表現優秀。',
    '双子座': '您具有優秀的溝通能力和學習適應性，適合多元化的工作環境。',
    '巨蟹座': '您具有強烈的責任心和照顧他人的能力，在服務性行業表現突出。',
    '狮子座': '您具有天生的表演天賦和領袖魅力，適合需要展現個人魅力的工作。',
    '处女座': '您注重細節和品質，在需要精確性和專業技能的領域表現優異。',
    '天秤座': '您具有優秀的協調能力和美感，適合需要平衡和美學的工作。',
    '天蝎座': '您具有深度洞察力和研究能力，適合需要深入分析的專業領域。',
    '射手座': '您具有國際視野和哲學思維，適合教育、出版或國際事務。',
    '摩羯座': '您具有強烈的目標導向和管理能力，適合企業管理和長期規劃。',
    '水瓶座': '您具有創新思維和人道主義精神，適合科技和社會改革領域。',
    '双鱼座': '您具有豐富的想像力和同理心，適合藝術創作和心理輔導。'
  },
  
  // 建议职业
  suggestions: {
    '白羊座': ['創業家', '銷售經理', '運動教練', '軍事指揮官'],
    '金牛座': ['銀行家', '建築師', '廚師', '園藝師'],
    '双子座': ['記者', '教師', '翻譯', '市場營銷'],
    '巨蟹座': ['護士', '心理諮詢師', '房地產', '餐飲業'],
    '狮子座': ['演員', '政治家', '時尚設計師', '娛樂業'],
    '处女座': ['會計師', '醫生', '編輯', '質量管理'],
    '天秤座': ['律師', '外交官', '設計師', '人力資源'],
    '天蝎座': ['研究員', '偵探', '心理學家', '外科醫生'],
    '射手座': ['教授', '旅遊業', '出版社', '國際貿易'],
    '摩羯座': ['CEO', '政府官員', '工程師', '項目經理'],
    '水瓶座': ['科學家', 'IT工程師', '社會工作者', '發明家'],
    '双鱼座': ['藝術家', '音樂家', '治療師', '慈善工作']
  }
};

// 感情相关数据
export const relationshipData = {
  // 爱情表现（基于月亮星座）
  love: {
    '白羊座': '在愛情中您熱情主動，喜歡直接表達感情，需要伴侶能跟上您的節奏。',
    '金牛座': '在愛情中您忠誠穩定，重視身體接觸和物質安全感，喜歡長久的關係。',
    '双子座': '在愛情中您需要智力刺激，喜歡與伴侶分享想法，重視溝通交流。',
    '巨蟹座': '在愛情中您深情溫柔，重視情感安全感，喜歡照顧和被照顧。',
    '狮子座': '在愛情中您慷慨熱烈，需要被欣賞和讚美，喜歡浪漫的表達方式。',
    '处女座': '在愛情中您細心體貼，重視實際的關愛表現，喜歡為伴侶服務。',
    '天秤座': '在愛情中您追求和諧平衡，重視美感和浪漫，善於妥協和配合。',
    '天蝎座': '在愛情中您深刻專一，需要深度的情感連結，占有欲較強。',
    '射手座': '在愛情中您需要自由空間，喜歡與伴侶一起探索世界，重視精神契合。',
    '摩羯座': '在愛情中您認真負責，重視長期承諾，喜歡穩定發展的關係。',
    '水瓶座': '在愛情中您獨立理性，重視友誼基礎，需要理解和尊重。',
    '双鱼座': '在愛情中您浪漫夢幻，具有強烈的同情心，容易犧牲自己。'
  },
  
  // 友谊表现（基于上升星座）
  friendship: {
    '白羊座': '在友誼中積極主動，喜歡帶領朋友探索新事物，是值得信賴的夥伴。',
    '金牛座': '在友誼中忠誠可靠，重視長久的友誼關係，是很好的傾聽者。',
    '双子座': '在友誼中善於交際，朋友圈廣泛，喜歡與朋友分享新知。',
    '巨蟹座': '在友誼中關懷體貼，重視深度的情感連結，是很好的支持者。',
    '狮子座': '在友誼中慷慨大方，喜歡成為朋友圈的中心人物，重視忠誠。',
    '处女座': '在友誼中細心周到，願意幫助朋友解決實際問題，值得依賴。',
    '天秤座': '在友誼中追求和諧，善於調解朋友間的矛盾，重視公平。',
    '天蝎座': '在友誼中深刻真誠，雖然朋友不多但關係深厚，非常忠誠。',
    '射手座': '在友誼中樂觀開朗，喜歡與朋友分享冒險經歷，重視自由。',
    '摩羯座': '在友誼中可靠穩重，雖然交友謹慎但關係長久，重視品質。',
    '水瓶座': '在友誼中獨特有趣，重視友誼勝過愛情，關心朋友的個人發展。',
    '双鱼座': '在友誼中溫柔體貼，具有強烈的同情心，是很好的情感支持。'
  },
  
  // 相容星座（基于太阳星座）
  compatibility: {
    '白羊座': ['狮子座', '射手座', '双子座', '水瓶座'],
    '金牛座': ['处女座', '摩羯座', '巨蟹座', '双鱼座'],
    '双子座': ['天秤座', '水瓶座', '白羊座', '狮子座'],
    '巨蟹座': ['天蝎座', '双鱼座', '金牛座', '处女座'],
    '狮子座': ['白羊座', '射手座', '双子座', '天秤座'],
    '处女座': ['金牛座', '摩羯座', '巨蟹座', '天蝎座'],
    '天秤座': ['双子座', '水瓶座', '狮子座', '射手座'],
    '天蝎座': ['巨蟹座', '双鱼座', '处女座', '摩羯座'],
    '射手座': ['白羊座', '狮子座', '天秤座', '水瓶座'],
    '摩羯座': ['金牛座', '处女座', '天蝎座', '双鱼座'],
    '水瓶座': ['双子座', '天秤座', '白羊座', '射手座'],
    '双鱼座': ['巨蟹座', '天蝎座', '金牛座', '摩羯座']
  }
};

// 运势描述数据
export const fortuneData = {
  overview: {
    '大吉': '您的整體運勢非常強勁，各方面都有良好的發展機會。這是實現目標的絕佳時機。',
    '吉': '您的運勢穩定向上，雖然可能會有一些小挑戰，但整體趨勢是積極的。',
    '中': '您的運勢平穩，適合穩紮穩打，不要急於求成，重點是保持現有的優勢。',
    '凶': '您的運勢面臨一些挑戰，需要謹慎行事，但這也是成長和學習的機會。'
  }
};

// 行星关键词数据
export const planetKeywords = {
  sun: ['自我', '意志', '創造力', '領導力', '自信'],
  moon: ['情感', '直覺', '需求', '習慣', '記憶'],
  ascendant: ['外表', '第一印象', '面具', '起點', '生命主題'],
  mercury: ['溝通', '思維', '學習', '邏輯', '表達'],
  venus: ['愛情', '美感', '和諧', '藝術', '價值觀'],
  mars: ['行動', '競爭', '欲望', '勇氣', '衝突']
};

// 分析标签页配置
export const analysisTabs = [
  { id: 'personality', name: '性格分析' },
  { id: 'career', name: '事業運' },
  { id: 'relationships', name: '人際關係' },
  { id: 'fortune', name: '運勢' }
];

/**
 * 获取星座描述
 * @param {string} planetType - 行星类型 (sun, moon, ascendant)
 * @param {string} sign - 星座名称
 * @returns {string} 描述内容
 */
export function getSignDescription(planetType, sign) {
  return signDescriptions[planetType]?.[sign] || `您的${planetType}星座展現獨特的特質。`;
}

/**
 * 获取事业优势描述
 * @param {string} sunSign - 太阳星座
 * @returns {string} 事业优势描述
 */
export function getCareerStrengths(sunSign) {
  return careerData.strengths[sunSign] || '您具有獨特的職業優勢。';
}

/**
 * 获取建议职业列表
 * @param {string} sunSign - 太阳星座
 * @returns {Array} 职业建议数组
 */
export function getSuggestedCareers(sunSign) {
  return careerData.suggestions[sunSign] || ['待發掘'];
}

/**
 * 获取爱情描述
 * @param {string} moonSign - 月亮星座
 * @returns {string} 爱情描述
 */
export function getLoveDescription(moonSign) {
  return relationshipData.love[moonSign] || '您在愛情中有獨特的表達方式。';
}

/**
 * 获取友谊描述
 * @param {string} ascSign - 上升星座
 * @returns {string} 友谊描述
 */
export function getFriendshipDescription(ascSign) {
  return relationshipData.friendship[ascSign] || '您在友誼中展現獨特的魅力。';
}

/**
 * 获取相容星座
 * @param {string} sunSign - 太阳星座
 * @returns {Array} 相容星座数组
 */
export function getCompatibleSigns(sunSign) {
  return relationshipData.compatibility[sunSign] || ['待發現'];
}

/**
 * 获取运势总体描述
 * @param {string} overview - 运势等级
 * @returns {string} 运势描述
 */
export function getFortuneDescription(overview) {
  return fortuneData.overview[overview] || '您的運勢有其獨特的發展軌跡。';
}

/**
 * 获取行星关键词
 * @param {string} planetType - 行星类型
 * @returns {Array} 关键词数组
 */
export function getPlanetKeywords(planetType) {
  return planetKeywords[planetType] || [];
}

/**
 * 格式化出生信息
 * @param {Object} userData - 用户数据
 * @returns {Object} 格式化的出生信息对象
 */
export function formatBirthInfo(userData) {
  if (!userData) return { basic: '', detailed: '', coordinates: '' };
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };
  
  const formatTime = (hour, minute) => {
    const h = hour || '00';
    const m = minute || '00';
    return `${h}:${m}`;
  };
  
  const formatCoordinates = (latitude, longitude) => {
    if (!latitude || !longitude) return '';
    const lat = parseFloat(latitude).toFixed(4);
    const lng = parseFloat(longitude).toFixed(4);
    const latDir = latitude >= 0 ? 'N' : 'S';
    const lngDir = longitude >= 0 ? 'E' : 'W';
    return `(${Math.abs(lng)}°${lngDir}, ${Math.abs(lat)}°${latDir})`;
  };
  
  const getLunarInfo = (dateStr) => {
    // 简化的农历信息，实际项目中应该使用专业的农历转换库
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    
    // 天干地支简化计算（实际应使用专业算法）
    const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    
    const stemIndex = (year - 4) % 10;
    const branchIndex = (year - 4) % 12;
    
    return `${heavenlyStems[stemIndex]}${earthlyBranches[branchIndex]}年`;
  };
  
  const birthDate = formatDate(userData.birthDate);
  const birthTime = formatTime(userData.birthHour, userData.birthMinute);
  const birthPlace = userData.birthplace || '';
  const coordinates = formatCoordinates(userData.latitude, userData.longitude);
  const lunarYear = getLunarInfo(userData.birthDate);
  
  return {
    basic: `${birthDate} ${birthTime}`,
    location: `${birthPlace} ${coordinates}`,
    lunar: lunarYear ? `生於 ${lunarYear}` : '',
    full: `${birthDate} ${birthTime} / ${birthPlace} ${coordinates}`
  };
}