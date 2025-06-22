/**
 * 详细命盘占卜分析模块
 * 提供六个维度的详细占卜结果：恋愛、出会い、結婚、総合運、人生、仕事
 */

/**
 * 详细占卜结果数据库
 */
const DETAILED_FORTUNE_DATA = {
  // 恋愛运势数据
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

  // 出会い运势数据
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

  // 結婚运势数据
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

  // 総合運数据
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

  // 人生运势数据
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

  // 仕事运势数据
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
 * 詳細な占卜分析を生成
 */
export function generateDetailedFortune(eightCharResult, astrologyPositions, userData) {
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