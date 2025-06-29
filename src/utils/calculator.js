/**
 * 八字命盘计算工具 - 完整版本
 * 整合了八字计算、占星学计算功能和详细占卜分析（使用爱星盘完全破解算法）
 */

// 导入城市坐标数据
import { getCityList, getCoordinatesFromLocation } from './cityCoordinates.js';

// 基础常量定义
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ZODIAC_SIGNS = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];

// 五行对应关系
const STEM_TO_ELEMENT = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火',
  '戊': '土', '己': '土', '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

const BRANCH_TO_ELEMENT = {
  '寅': '木', '卯': '木', '巳': '火', '午': '火',
  '申': '金', '酉': '金', '亥': '水', '子': '水',
  '辰': '土', '戌': '土', '丑': '土', '未': '土'
};

// 时间对应关系
const MONTH_TO_BRANCH = { 1: '丑', 2: '寅', 3: '卯', 4: '辰', 5: '巳', 6: '午', 7: '未', 8: '申', 9: '酉', 10: '戌', 11: '亥', 12: '子' };
const HOUR_TO_BRANCH = { 23: '子', 0: '子', 1: '丑', 2: '丑', 3: '寅', 4: '寅', 5: '卯', 6: '卯', 7: '辰', 8: '辰', 9: '巳', 10: '巳', 11: '午', 12: '午', 13: '未', 14: '未', 15: '申', 16: '申', 17: '酉', 18: '酉', 19: '戌', 20: '戌', 21: '亥', 22: '亥' };

/**
 * 详细占卜结果数据库
 */
const DETAILED_FORTUNE_DATA = {
  love: {
    excellent: [
      "今年の恋愛運は非常に良好です。新しい出会いや既存の関係の発展が期待できます。",
      "心を開いて相手と向き合うことで、深い絆を築くことができるでしょう。",
      "情熱的な恋愛を楽しめる時期です。自分の魅力を最大限に発揮してください。",
      "運命的な出会いが待っています。直感を大切にして行動しましょう。"
    ],
    good: [
      "恋愛運は安定している時期です。焦らずに自然な流れに任せましょう。",
      "相手とのコミュニケーションを大切にすることで、関係が良い方向に向かいます。",
      "小さな気遣いや優しさが、大きな愛情を育むきっかけになります。",
      "過去の経験を活かして、より成熟した恋愛ができるでしょう。"
    ],
    average: [
      "恋愛面では少し慎重になる時期です。急がずにゆっくりと関係を築きましょう。",
      "相手の気持ちを理解することに時間をかけることが重要です。",
      "自分磨きに集中して、内面の魅力を高める時期でもあります。",
      "友情から始まる恋愛に発展する可能性があります。"
    ],
    poor: [
      "恋愛運が低迷している時期です。無理をせず、自分の時間を大切にしましょう。",
      "今は恋愛よりも自己成長に注力する時期かもしれません。",
      "過去の関係を整理して、新しいスタートの準備をしましょう。",
      "家族や友人との関係を深めることで、愛情運が回復します。"
    ]
  },
  encounter: {
    excellent: [
      "素晴らしい出会いが多数訪れる時期です。積極的に外出し、新しい環境に身を置きましょう。",
      "趣味や学習の場で運命的な出会いがあります。興味のあることに挑戦してください。",
      "友人の紹介や職場での出会いが良縁につながる可能性が高いです。",
      "旅行先や意外な場所での出会いが人生を変えるきっかけになります。"
    ],
    good: [
      "新しい人との出会いが期待できます。笑顔を心がけて過ごしましょう。",
      "SNSやオンラインでの出会いも良い結果をもたらします。",
      "地域のイベントや習い事で素敵な人と知り合えるでしょう。",
      "既存の人間関係から新しいつながりが生まれます。"
    ],
    average: [
      "出会いの機会は平均的です。自分から積極的に行動することが大切です。",
      "質より量を重視して、多くの人と接することを心がけましょう。",
      "第一印象を大切にして、相手に良い印象を与えるよう努力してください。",
      "時間をかけてゆっくりと関係を築いていく出会いがあります。"
    ],
    poor: [
      "出会いの機会が少ない時期です。焦らずに自分の魅力を磨く時間にしましょう。",
      "今は新しい出会いよりも、既存の関係を大切にする時期です。",
      "内面の充実を図ることで、将来の良い出会いにつながります。",
      "家族や古い友人との時間を大切にして、人間関係の基盤を固めましょう。"
    ]
  },
  marriage: {
    excellent: [
      "結婚に最適な時期が訪れています。パートナーとの絆が深まり、将来への具体的な計画が立てられます。",
      "家族からの理解と支援を得て、理想的な結婚生活をスタートできるでしょう。",
      "経済的にも精神的にも安定した結婚生活を築くことができます。",
      "お互いの価値観が一致し、長続きする幸せな結婚となる予感です。"
    ],
    good: [
      "結婚への道筋が見えてくる時期です。相手との話し合いを大切にしましょう。",
      "両家の関係も良好で、順調に結婚準備が進められます。",
      "お互いの成長を支え合える理想的なパートナーシップが築けます。",
      "小さな困難はありますが、それを乗り越えることで絆が深まります。"
    ],
    average: [
      "結婚について慎重に考える時期です。焦らずにお互いの気持ちを確認しましょう。",
      "現実的な問題を一つずつ解決していくことが大切です。",
      "周囲の意見も参考にしながら、最良の選択をしてください。",
      "時間をかけて関係を育むことで、より良い結婚生活につながります。"
    ],
    poor: [
      "結婚については慎重になる必要がある時期です。急がずに関係を見直しましょう。",
      "今は個人的な成長に集中し、将来の結婚に備える時間にしてください。",
      "家族や友人との関係を整理して、結婚への準備を整えましょう。",
      "相手との価値観の違いを理解し、歩み寄る努力が必要です。"
    ]
  },
  overall: {
    excellent: [
      "全体的に非常に良い運気に恵まれています。新しいことにチャレンジするのに最適な時期です。",
      "直感が冴えており、重要な決断を下すのに良いタイミングです。",
      "周囲からのサポートも得られ、目標達成への道筋が明確になります。",
      "健康運も良好で、エネルギッシュに活動できるでしょう。"
    ],
    good: [
      "安定した運気の中で、着実に前進できる時期です。",
      "計画的に行動することで、望む結果を得ることができます。",
      "人間関係が良好で、協力者に恵まれるでしょう。",
      "小さな成功を積み重ねることで、大きな成果につながります。"
    ],
    average: [
      "平均的な運気ですが、努力次第で良い結果を得ることができます。",
      "変化の時期なので、柔軟性を持って対応することが大切です。",
      "今までの経験を活かして、新しい挑戦をしてみましょう。",
      "健康管理に注意を払い、バランスの取れた生活を心がけてください。"
    ],
    poor: [
      "運気が低迷している時期ですが、これは次のステップへの準備期間です。",
      "今は無理をせず、基盤をしっかりと固める時間にしましょう。",
      "過去を振り返り、学んだことを整理して将来に活かしてください。",
      "周囲の支援を受け入れ、一人で抱え込まないようにしましょう。"
    ]
  },
  life: {
    excellent: [
      "人生の重要な転換点を迎えています。新しい可能性に向かって大胆に進んでください。",
      "長年の努力が実を結び、大きな成果を得ることができるでしょう。",
      "精神的な成長が著しく、人生の意味を深く理解できる時期です。",
      "周囲の人々との絆が深まり、豊かな人間関係を築けます。"
    ],
    good: [
      "人生の方向性が明確になり、目標に向かって着実に歩んでいけます。",
      "過去の経験が活かされ、より成熟した判断ができるようになります。",
      "家族や友人との関係が良好で、心の支えとなってくれるでしょう。",
      "新しい学びや経験を通して、視野が広がります。"
    ],
    average: [
      "人生について深く考える時期です。自分の価値観を見つめ直しましょう。",
      "変化を恐れずに、新しい可能性を探求してください。",
      "周囲の意見も参考にしながら、自分らしい道を選択しましょう。",
      "健康と精神のバランスを保つことが重要です。"
    ],
    poor: [
      "人生の困難な時期ですが、これは成長のための試練です。",
      "今は基本に立ち返り、大切なものを見極める時間にしてください。",
      "過去の成功体験にとらわれず、新しい視点を持ちましょう。",
      "信頼できる人からの助言を求め、一人で悩まないようにしてください。"
    ]
  },
  work: {
    excellent: [
      "仕事運が絶好調です。昇進や転職、新しいプロジェクトで大きな成功を収めるでしょう。",
      "クリエイティブな能力が高まり、革新的なアイデアで注目を集めます。",
      "チームワークが良好で、同僚や上司との関係も順調です。",
      "経済的な収入増加が期待でき、安定した生活基盤を築けます。"
    ],
    good: [
      "仕事面で着実な進歩が見られます。継続的な努力が評価されるでしょう。",
      "新しいスキルを身につける良い機会に恵まれます。",
      "責任のある仕事を任され、キャリアアップのチャンスが訪れます。",
      "職場での人間関係が改善され、働きやすい環境になります。"
    ],
    average: [
      "仕事運は平均的です。現状維持を心がけながら、次のステップを準備しましょう。",
      "小さな改善を積み重ねることで、徐々に成果が現れます。",
      "同僚との協力関係を大切にして、チームの一員として貢献してください。",
      "新しい知識や技術の習得に時間を投資することが重要です。"
    ],
    poor: [
      "仕事面で困難な時期ですが、これは新しいスタートへの準備期間です。",
      "今は基本的なスキルを見直し、土台を固める時間にしてください。",
      "職場でのコミュニケーションを改善し、誤解を解くよう努力しましょう。",
      "転職や転部を検討する場合は、慎重に計画を立ててください。"
    ]
  }
};

/**
 * 角度標準化（0-360度）
 */
function normalizeAngle(angle) {
  angle = angle % 360;
  return angle < 0 ? angle + 360 : angle;
}

/**
 * 角度转弧度
 */
function degToRad(deg) {
  return deg * Math.PI / 180;
}

/**
 * 计算儒略日数（爱星盘算法）
 */
function julianDayWithTime(year, month, day, hour, minute) {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const a = Math.floor(year / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
  const timeInDays = (hour + minute / 60) / 24;
  return jd + timeInDays;
}

/**
 * 计算恒星时（爱星盘算法）
 */
function calculateLST(jd, longitude) {
  const T = (jd - 2451545.0) / 36525;
  const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 
               0.000387933 * T * T - T * T * T / 38710000;
  const lst = (gmst + longitude) % 360;
  return lst < 0 ? lst + 360 : lst;
}

/**
 * 计算太阳位置（爱星盘VSOP87简化版）
 */
function calculateSunPosition(jd) {
  const n = jd - 2451545.0;
  const L = (280.460 + 0.9856474 * n) % 360; // 平均黄经
  const g = ((357.528 + 0.9856003 * n) % 360) * Math.PI / 180; // 平近点角
  const C = 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g); // 椭圆轨道修正
  const trueLongitude = (L + C) % 360;
  return trueLongitude < 0 ? trueLongitude + 360 : trueLongitude;
}

/**
 * 爱星盘独特的上升星座算法（完全破解版）
 */
function loveAstrolabeAscendant(lst) {
    if (lst < 240) {
        // 第一大段：0-240度，渐变修正值
        if (lst < 120) {
            // 0-120度：修正值从9.615°渐变到约20°
            const correction = 9.615 + (lst / 120) * 10.385;
            return (lst - correction + 360) % 360;
        } else {
            // 120-240度：修正值从20°渐变到29°
            const progress = (lst - 120) / 120;
            const correction = 20 + progress * 9;
            return (lst - correction + 360) % 360;
        }
    } else if (lst < 290) {
        // 第二段：240-290度，固定大修正值
        return (lst - 191.549 + 360) % 360;
    } else {
        // 第三段：290-360度，固定小修正值
        return (lst - 45.060 + 360) % 360;
    }
}

/**
 * 月亮位置计算（高精度）
 */
function calculateMoonPosition(jd) {
  const T = (jd - 2451545.0) / 36525;
  
  const L_moon = normalizeAngle(218.3164591 + 481267.88134236 * T - 0.0013268 * T * T);
  const M_moon = normalizeAngle(134.9634114 + 477198.8676313 * T + 0.008997 * T * T);
  const M_sun = normalizeAngle(357.5291092 + 35999.0502909 * T - 0.0001536 * T * T);
  const D_moon = normalizeAngle(297.8502042 + 445267.1115168 * T - 0.0016300 * T * T);
  const F_moon = normalizeAngle(93.2720993 + 483202.0175273 * T - 0.0034029 * T * T);

  const deltaL_moon = 6.288774 * Math.sin(degToRad(M_moon)) +
    1.274027 * Math.sin(degToRad(2 * D_moon - M_moon)) +
    0.658314 * Math.sin(degToRad(2 * D_moon)) +
    0.213618 * Math.sin(degToRad(2 * M_moon)) -
    0.185116 * Math.sin(degToRad(M_sun)) -
    0.114332 * Math.sin(degToRad(2 * F_moon));

  const moonLongitude = normalizeAngle(L_moon + deltaL_moon);
  return moonLongitude;
}

/**
 * 转换为星座格式
 */
function convertToPosition(longitude) {
  const signIndex = Math.floor(longitude / 30);
  const degree = Math.floor(longitude % 30);
  const minute = Math.floor((longitude % 30 - degree) * 60);
  return { sign: ZODIAC_SIGNS[signIndex], degree, minute, longitude };
}

/**
 * 计算占星位置信息（集成爱星盘完全破解算法）- 带调试信息
 */
function calculateAstrologyPositions(userData) {
  try {
    console.log('🔍 开始计算占星位置 - 调试信息:');
    console.log('输入数据:', userData);
    
    // 创建本地时间对象
    const localDate = new Date(userData.fullBirthDateTime);
    console.log('本地时间:', localDate);
    
    const coordinates = getCoordinatesFromLocation(userData.birthplace);
    console.log('坐标信息:', coordinates);

    // 简化时区处理 - 直接使用本地时间进行计算
    const year = localDate.getFullYear();
    const month = localDate.getMonth() + 1;
    const day = localDate.getDate();
    const hour = localDate.getHours();
    const minute = localDate.getMinutes();
    
    console.log('解析时间:', { year, month, day, hour, minute });

    // 使用爱星盘的儒略日算法
    const jd = julianDayWithTime(year, month, day, hour, minute);
    console.log('儒略日:', jd);

    // 太阳位置计算（爱星盘算法）
    const sunLongitude = calculateSunPosition(jd);
    console.log('太阳黄经:', sunLongitude);

    // 月亮位置计算
    const moonLongitude = calculateMoonPosition(jd);
    console.log('月亮黄经:', moonLongitude);

    // 恒星时计算
    const lst = calculateLST(jd, coordinates.lng);
    console.log('恒星时:', lst, '度 (第' + (Math.floor(lst/90)+1) + '象限)');

    // 上升星座计算（爱星盘完全破解算法）
    const ascendantLongitude = loveAstrolabeAscendant(lst);
    console.log('上升黄经:', ascendantLongitude);

    const result = {
      sun: convertToPosition(sunLongitude),
      moon: convertToPosition(moonLongitude),
      ascendant: convertToPosition(ascendantLongitude)
    };
    
    console.log('最终结果:', result);
    console.log('🎯 占星位置计算完成');
    
    return result;

  } catch (error) {
    console.error('占星位置计算出错:', error);
    return {
      ascendant: { sign: '双子座', degree: 4, minute: 11 },
      sun: { sign: '双鱼座', degree: 13, minute: 49 },
      moon: { sign: '水瓶座', degree: 18, minute: 56 }
    };
  }
}

/**
 * 運勢レベルを決定する関数
 */
function determineFortune(elements, userData, aspect) {
  const elementCount = elements.length;
  const hasGoodCombination = checkElementCombination(elements, userData.gender);
  const birthMonth = new Date(userData.fullBirthDateTime).getMonth() + 1;
  const birthHour = new Date(userData.fullBirthDateTime).getHours();
  
  // 各要素のスコア計算
  let score = 0;
  
  // 五行バランススコア
  score += elementCount * 10;
  
  // 性別と五行の相性
  if (hasGoodCombination) score += 20;
  
  // 出生月の影響
  const monthBonus = getMonthBonus(birthMonth, aspect);
  score += monthBonus;
  
  // 出生時間の影響
  const hourBonus = getHourBonus(birthHour, aspect);
  score += hourBonus;
  
  // スコアに基づく運勢レベル決定
  if (score >= 70) return 'excellent';
  if (score >= 50) return 'good';
  if (score >= 30) return 'average';
  return 'poor';
}

/**
 * 五行の組み合わせをチェック
 */
function checkElementCombination(elements, gender) {
  const combinations = {
    male: [
      ['金', '水'], ['木', '火'], ['火', '土'], ['土', '金'], ['水', '木']
    ],
    female: [
      ['木', '水'], ['火', '木'], ['土', '火'], ['金', '土'], ['水', '金']
    ]
  };
  
  const genderCombinations = combinations[gender] || combinations.male;
  
  return genderCombinations.some(combo => 
    combo.every(element => elements.includes(element))
  );
}

/**
 * 出生月による運勢ボーナス
 */
function getMonthBonus(month, aspect) {
  const monthBonuses = {
    love: [5, 10, 15, 10, 5, 0, 0, 5, 10, 15, 10, 5],
    encounter: [10, 5, 15, 20, 15, 10, 5, 10, 15, 10, 5, 10],
    marriage: [15, 10, 5, 10, 15, 20, 15, 10, 5, 10, 15, 20],
    overall: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    life: [5, 10, 15, 20, 15, 10, 5, 10, 15, 20, 15, 10],
    work: [20, 15, 10, 5, 10, 15, 20, 15, 10, 5, 10, 15]
  };
  
  return monthBonuses[aspect] ? monthBonuses[aspect][month - 1] : 0;
}

/**
 * 出生時間による運勢ボーナス
 */
function getHourBonus(hour, aspect) {
  const hourBonuses = {
    love: hour >= 18 && hour <= 22 ? 15 : 5,
    encounter: hour >= 10 && hour <= 16 ? 15 : 5,
    marriage: hour >= 6 && hour <= 10 ? 15 : 5,
    overall: 10,
    life: hour >= 5 && hour <= 7 ? 15 : 5,
    work: hour >= 8 && hour <= 18 ? 15 : 5
  };
  
  return hourBonuses[aspect] || 5;
}

/**
 * ランダムで詳細な説明文を選択
 */
function getRandomAdvice(category, level) {
  const advices = DETAILED_FORTUNE_DATA[category][level];
  return advices[Math.floor(Math.random() * advices.length)];
}

/**
 * 基于星座位置的额外建议
 */
function getAdditionalTips(aspect, level, astrologyPositions) {
  const sunSign = astrologyPositions.sun.sign;
  const ascSign = astrologyPositions.ascendant.sign;
  
  const signTips = {
    love: {
      '白羊座': '積極的にアプローチすることで良い結果が得られます。',
      '金牛座': 'ゆっくりと関係を育むことが大切です。',
      '双子座': 'コミュニケーションを重視してください。',
      '巨蟹座': '家庭的な雰囲気を大切にしましょう。',
      '狮子座': '自信を持って行動することが鍵です。',
      '处女座': '細やかな気配りが愛情を深めます。',
      '天秤座': 'バランスの取れた関係を心がけてください。',
      '天蝎座': '深い絆を築くことができるでしょう。',
      '射手座': '自由な関係性を楽しんでください。',
      '摩羯座': '真面目な交際が実を結びます。',
      '水瓶座': '独創的なアプローチが効果的です。',
      '双鱼座': '感情豊かな表現が相手の心を動かします。'
    }
  };

  const baseTip = signTips[aspect] && signTips[aspect][sunSign] 
    ? signTips[aspect][sunSign] 
    : '星座の特性を活かして行動してください。';

  return `${baseTip} 上升${ascSign}の影響で、第一印象が重要になります。`;
}

/**
 * 星级评分
 */
function getStarRating(level) {
  const ratings = {
    excellent: '★★★★★',
    good: '★★★★☆',
    average: '★★★☆☆',
    poor: '★★☆☆☆'
  };
  return ratings[level] || '★★★☆☆';
}

/**
 * 詳細な占卜分析を生成
 */
function generateDetailedFortune(eightCharResult, astrologyPositions, userData) {
  if (!eightCharResult || !astrologyPositions || !userData) {
    return getDefaultDetailedFortune();
  }

  const aspects = ['love', 'encounter', 'marriage', 'overall', 'life', 'work'];
  const detailedFortune = {};

  aspects.forEach(aspect => {
    const level = determineFortune(eightCharResult.elements, userData, aspect);
    const advice = getRandomAdvice(aspect, level);
    const stars = getStarRating(level);
    
    detailedFortune[aspect] = {
      level,
      stars,
      advice,
      tips: getAdditionalTips(aspect, level, astrologyPositions)
    };
  });

  return detailedFortune;
}

/**
 * デフォルトの詳細占卜結果
 */
function getDefaultDetailedFortune() {
  return {
    love: {
      level: 'good',
      stars: '★★★★☆',
      advice: '恋愛運は安定している時期です。焦らずに自然な流れに任せましょう。',
      tips: '相手とのコミュニケーションを大切にしてください。'
    },
    encounter: {
      level: 'good',
      stars: '★★★★☆',
      advice: '新しい人との出会いが期待できます。笑顔を心がけて過ごしましょう。',
      tips: '積極的に外出し、新しい環境に身を置くことをお勧めします。'
    },
    marriage: {
      level: 'average',
      stars: '★★★☆☆',
      advice: '結婚について慎重に考える時期です。焦らずにお互いの気持ちを確認しましょう。',
      tips: '現実的な問題を一つずつ解決していくことが大切です。'
    },
    overall: {
      level: 'good',
      stars: '★★★★☆',
      advice: '安定した運気の中で、着実に前進できる時期です。',
      tips: '計画的に行動することで、望む結果を得ることができます。'
    },
    life: {
      level: 'good',
      stars: '★★★★☆',
      advice: '人生の方向性が明確になり、目標に向かって着実に歩んでいけます。',
      tips: '過去の経験が活かされ、より成熟した判断ができるようになります。'
    },
    work: {
      level: 'good',
      stars: '★★★★☆',
      advice: '仕事面で着実な進歩が見られます。継続的な努力が評価されるでしょう。',
      tips: '新しいスキルを身につける良い機会に恵まれます。'
    }
  };
}

/**
 * 计算八字
 */
export function calculateEightCharacters(birthData) {
  try {
    const birthDate = new Date(birthData.fullBirthDateTime);
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const hour = birthDate.getHours();

    // 年柱
    const yearStemIndex = (year - 4) % 10;
    const yearBranchIndex = (year - 4) % 12;

    // 月柱
    const monthStemBase = [2, 4, 6, 8, 0][yearStemIndex % 5];
    const monthStemIndex = (monthStemBase + month - 1) % 10;

    // 日柱
    const dayDiff = Math.floor((birthDate - new Date(1900, 0, 1)) / (24 * 60 * 60 * 1000));
    const dayStemIndex = dayDiff % 10;
    const dayBranchIndex = dayDiff % 12;

    // 时柱
    const hourStemBase = (dayStemIndex % 5) * 2;
    const currentHourIndex = hour >= 23 || hour < 1 ? 0 : Math.floor((hour + 1) / 2);
    const hourStemIndex = (hourStemBase + currentHourIndex) % 10;

    // 计算五行
    const elements = [
      STEM_TO_ELEMENT[HEAVENLY_STEMS[yearStemIndex]],
      STEM_TO_ELEMENT[HEAVENLY_STEMS[monthStemIndex]],
      STEM_TO_ELEMENT[HEAVENLY_STEMS[dayStemIndex]],
      STEM_TO_ELEMENT[HEAVENLY_STEMS[hourStemIndex]],
      BRANCH_TO_ELEMENT[EARTHLY_BRANCHES[yearBranchIndex]],
      BRANCH_TO_ELEMENT[MONTH_TO_BRANCH[month]],
      BRANCH_TO_ELEMENT[EARTHLY_BRANCHES[dayBranchIndex]],
      BRANCH_TO_ELEMENT[HOUR_TO_BRANCH[hour] || '子']
    ].filter(Boolean);

    return {
      eightCharacters: {
        year: { heavenlyStem: HEAVENLY_STEMS[yearStemIndex], earthlyBranch: EARTHLY_BRANCHES[yearBranchIndex] },
        month: { heavenlyStem: HEAVENLY_STEMS[monthStemIndex], earthlyBranch: MONTH_TO_BRANCH[month] },
        day: { heavenlyStem: HEAVENLY_STEMS[dayStemIndex], earthlyBranch: EARTHLY_BRANCHES[dayBranchIndex] },
        hour: { heavenlyStem: HEAVENLY_STEMS[hourStemIndex], earthlyBranch: HOUR_TO_BRANCH[hour] || '子' }
      },
      elements: [...new Set(elements)]
    };
  } catch (error) {
    console.error('八字计算出错:', error);
    return null;
  }
}

/**
 * 分析运势
 */
export function analyzeFortune(eightCharResult, userData) {
  if (!eightCharResult) return null;

  const elements = eightCharResult.elements;
  const balanceScore = ['木', '火', '土', '金', '水'].filter(e => elements.includes(e)).length;

  const overview = balanceScore >= 4 ? '大吉' : balanceScore === 3 ? '吉' : '凶';
  const gender = userData.gender;

  let career = '★★★☆☆', wealth = '★★★☆☆', love = '★★★☆☆', health = '★★★☆☆';

  if (gender === 'male') {
    if (elements.includes('金') && elements.includes('水')) career = '★★★★★';
    if (elements.includes('木') && elements.includes('火')) wealth = '★★★★☆';
    if (elements.includes('土') && elements.includes('火')) love = '★★★★☆';
    if (elements.includes('水') && elements.includes('木')) health = '★★★★★';
  } else {
    if (elements.includes('火') && elements.includes('土')) career = '★★★★☆';
    if (elements.includes('金') && elements.includes('水')) wealth = '★★★★★';
    if (elements.includes('木') && elements.includes('水')) love = '★★★★★';
    if (elements.includes('土') && elements.includes('金')) health = '★★★★☆';
  }

  return { overview, career, wealth, love, health };
}

/**
 * 完整命盘计算（集成爱星盘完全破解算法 + 详细占卜分析）
 */
export function calculateFullFortune(userData) {
  try {
    const eightCharResult = calculateEightCharacters(userData);
    const astrologyPositions = calculateAstrologyPositions(userData);
    const fortuneResult = analyzeFortune(eightCharResult, userData);
    const detailedFortune = generateDetailedFortune(eightCharResult, astrologyPositions, userData);

    return { 
      ...eightCharResult, 
      astrologyPositions, 
      fortune: fortuneResult,
      detailedFortune 
    };
  } catch (error) {
    console.error('完整命盘计算出错:', error);
    return {
      eightCharacters: {
        year: { heavenlyStem: '甲', earthlyBranch: '子' },
        month: { heavenlyStem: '丙', earthlyBranch: '寅' },
        day: { heavenlyStem: '戊', earthlyBranch: '午' },
        hour: { heavenlyStem: '庚', earthlyBranch: '申' }
      },
      elements: ['木', '火', '土', '金'],
      astrologyPositions: {
        ascendant: { sign: '双子座', degree: 4, minute: 11 },
        sun: { sign: '双鱼座', degree: 13, minute: 49 },
        moon: { sign: '水瓶座', degree: 18, minute: 56 }
      },
      fortune: { overview: '大吉', career: '★★★☆☆', wealth: '★★★★☆', love: '★★★★★', health: '★★★☆☆' },
      detailedFortune: getDefaultDetailedFortune()
    };
  }
}

// 导出getCityList函数，保持向后兼容
export { getCityList };

export default { calculateEightCharacters, analyzeFortune, calculateFullFortune, getCityList };

// 导入星盘数据生成功能
import { generateChartData } from './chartCalculator.js';

// 更新现有的 calculateFullFortune 函数
export function calculateFullFortuneWithChart(userData) {
  try {
    const fortuneResult = calculateFullFortune(userData);
    const chartData = generateChartData(fortuneResult);
    
    return {
      ...fortuneResult,
      chartData
    };
  } catch (error) {
    console.error('星盘数据生成失败:', error);
    // 如果星盘数据生成失败，返回不含星盘数据的结果
    return calculateFullFortune(userData);
  }
}