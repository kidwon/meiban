// i18n/locales/zh.js - 中文翻译文件
export default {
  app: {
    title: '命盘',
    subtitle: '生辰八字・紫微斗数・西方占星分析'
  },
  
  form: {
    name: '姓名',
    optional: '可选',
    required: '必填',
    namePlaceholder: '请输入您的姓名（可选）',
    birthdate: '出生日期',
    birthTime: '出生时间',
    hour: '时',
    minute: '分',
    birthplace: '出生地',
    birthplacePlaceholder: '选择城市或直接输入',
    gender: '性别',
    genders: {
      male: '男',
      female: '女'
    },
    requiredNote: '为必填项'
  },
  
  regions: {
    japanese: '日本',
    chinese: '中国',
    hkTaiwan: '港澳台'
  },
  
  analysis: {
    selectType: '选择分析类型',
    bazi: {
      title: '生辰八字',
      description: '传统命理分析',
      shareDescription: '分享{name}的生辰八字命盘结果，和朋友一起探索东方命理的奥秘！'
    },
    astrology: {
      title: '西方占星',
      description: '现代星盘解读'
    }
  },
  
  astrology: {
    resultsTitle: '占星分析结果',
    chartSuffix: '的星盘',
    interactiveChart: '互动星盘图',
    detailedAnalysis: '详细占星分析',
    birthDataSummary: '出生信息',
    planetDetails: '行星详情',
    keywords: '关键词',
    personalityAnalysis: '性格特质分析',
    careerAnalysis: '事业发展倾向',
    relationshipAnalysis: '人际关系分析',
    fortuneAnalysis: '运势倾向分析',
    corePersonality: '核心性格（太阳星座）',
    emotionalNeeds: '情感需求（月亮星座）',
    externalImpression: '外在印象（上升星座）',
    careerStrengths: '事业优势',
    suitableCareers: '适合职业方向',
    loveExpression: '爱情表现',
    friendshipTraits: '友谊特质',
    compatibleSigns: '相容星座',
    overallFortune: '综合运势',
    guest: '访客',
    shareDescription: '分享{name}的星座分析结果，和朋友一起探索占星的奥秘！',
    // 功能导航
    functionNav: {
      basicAnalysis: '基础分析',
      transitAnalysis: '行运分析',
      aiExpert: '问问冥冥'
    },
    recommendationsTitle: '为您推荐的功能',
    recommendations: {
      transitDescription: '深入了解未来运势',
      aiExpertDescription: '智能AI为您答疑解惑',
      recommended: '推荐',
      popular: '热门',
      new: '新功能'
    },
    exploreMoreTitle: '想要更深入的分析？',
    exploreMoreSubtitle: '体验更深层的洞察和个性化分析',
    exploreNow: '立即体验',
    whyChooseAdvanced: '为什么选择高级分析？',
    comparison: {
      basicAnalysis: '基础分析',
      basicDescription: '当前星盘和基本特质',
      advancedAnalysis: '高级分析',
      advancedDescription: '未来预测和深度个性化'
    },
    userGuide: {
      welcome: {
        title: '欢迎使用占星分析！',
        content: '在这个页面，您可以查看详细的占星分析结果。让我们为您介绍如何高效使用这些功能。'
      },
      navigation: {
        title: '功能导航',
        content: '通过这个导航栏，您可以轻松在基础分析、行运分析和合盘分析之间切换。'
      },
      chartInteraction: {
        title: '交互式星盘',
        content: '点击星盘上的行星可以查看详细信息。将鼠标悬停在上面可以获得更多详情。'
      },
      recommendations: {
        title: '推荐功能',
        content: '我们为您推荐最适合的高级分析功能。点击了解更多详情。'
      },
      advancedFeatures: {
        title: '高级功能',
        content: '尝试行运分析或合盘分析等高级功能，获得更深入的洞察。'
      },
      next: '下一步',
      previous: '上一步',
      finish: '完成'
    },
    tooltips: {
      interaction: '很棒！您掌握了操作方法',
      success: '操作完成！',
      info: '提示：您也可以使用键盘快捷键'
    },
    calculating: '正在计算星盘...',
    fortuneLabels: {
      career: '事业运',
      wealth: '财运',
      love: '爱情运',
      health: '健康运'
    },
    planetNames: {
      sun: '太阳',
      moon: '月亮',
      ascendant: '上升星座'
    },
    analysisLabels: {
      advantages: '优势',
      risks: '风险',
      actions: '做法',
      triggers: '触发点',
      impression: '他人看到的你',
      techniques: '技巧',
      approach: '方式',
      strengths: '强项',
      direction: '方向',
      suggestions: '建议'
    },
    signNames: {
      '白羊座': '白羊座',
      '金牛座': '金牛座', 
      '双子座': '双子座',
      '巨蟹座': '巨蟹座',
      '狮子座': '狮子座',
      '处女座': '处女座',
      '天秤座': '天秤座',
      '天蝎座': '天蝎座',
      '射手座': '射手座',
      '摩羯座': '摩羯座',
      '水瓶座': '水瓶座',
      '双鱼座': '双鱼座'
    },
    titleTemplates: {
      sun: '太阳{sign}｜核心人格',
      moon: '月亮{sign}｜情绪与依恋',
      ascendant: '上升{sign}｜第一印象与人设',
      venus: '金星{sign}｜关系与价值观',
      mars: '火星{sign}｜行动风格',
      mercury: '水星{sign}｜沟通方式',
      'mercury-midheaven': '水星{mercury} × MC{midheaven}｜思考与沟通',
      career: '中天{sign}｜事业方向',
      fallback: {
        sun: '太阳星座｜核心人格',
        moon: '月亮星座｜情绪与依恋', 
        ascendant: '上升星座｜第一印象与人设',
        venus: '金星｜关系与价值观',
        mars: '火星｜行动风格',
        mercury: '水星｜沟通方式',
        'mercury-midheaven': '思考与沟通',
        career: '事业方向'
      }
    },
    detailed: {
      sun: {
        gemini: {
          advantages: '好奇心旺盛，学习能力强，善于沟通表达，思维活跃多变。',
          risks: '容易三分钟热度，难以深入专研，有时显得肤浅。',
          actions: '培养专注力，选择重点领域深入发展，将多样性转化为优势。'
        },
        aries: {
          advantages: '积极主动，勇于开拓，行动力强，具有领导潜质。',
          risks: '冲动易怒，缺乏耐心，有时过于自我中心。',
          actions: '学会三思而后行，培养团队合作精神，将热情转化为持久动力。'
        },
        taurus: {
          advantages: '踏实稳重，有毅力，实用主义，具有艺术审美能力。',
          risks: '固执己见，抗拒变化，有时过于保守。',
          actions: '保持开放心态，适当接受新事物，将稳定性转化为可靠的力量。'
        },
        cancer: {
          advantages: '情感丰富，直觉敏锐，善于照顾他人，具有强烈的保护欲。',
          risks: '情绪化严重，过度防御，容易陷入过往情结。',
          actions: '学会情绪管理，建立健康的边界，将关爱他人的能力转化为正面影响力。'
        },
        leo: {
          advantages: '自信阳光，表现欲强，具有天生的领袖气质和创造力。',
          risks: '过于自负，需要过多关注，有时显得傲慢。',
          actions: '保持谦逊，学会倾听他人，将个人魅力用于激励和帮助他人。'
        },
        virgo: {
          advantages: '注重细节，分析能力强，追求完美，具有很强的服务精神。',
          risks: '过度挑剔，完美主义导致拖延，容易焦虑。',
          actions: '学会接受"够好"的标准，将分析能力用于解决实际问题。'
        },
        libra: {
          advantages: '追求和谐，具有良好的外交能力，审美观念出色，善于平衡各方利益。',
          risks: '优柔寡断，过度避免冲突，有时缺乏原则立场。',
          actions: '培养决断力，学会在和谐中坚持原则，将平衡能力转化为领导优势。'
        },
        scorpio: {
          advantages: '意志坚强，洞察力深刻，专注力极强，具有强大的内在力量。',
          risks: '过于猜疑，报复心强，容易钻牛角尖。',
          actions: '学会宽容和释怀，将深刻的洞察力用于正面的探索和研究。'
        },
        sagittarius: {
          advantages: '乐观开朗，视野开阔，热爱自由，具有哲学思维和国际视野。',
          risks: '缺乏耐心，不负责任，有时显得轻浮。',
          actions: '培养责任感和持续性，将广阔视野转化为实际的成就。'
        },
        capricorn: {
          advantages: '责任心强，目标明确，脚踏实地，具有很强的执行力。',
          risks: '过于严肃，缺乏灵活性，有时显得冷漠。',
          actions: '学会放松和享受生活，将实用主义转化为持续的成功。'
        },
        aquarius: {
          advantages: '独立自主，思想前卫，具有人道主义精神，善于创新。',
          risks: '过于理性，情感疏离，有时显得古怪。',
          actions: '平衡理性与感性，将创新思维转化为对社会有益的贡献。'
        },
        pisces: {
          advantages: '富有想象力，同情心强，艺术天赋突出，直觉力敏锐。',
          risks: '过于敏感，缺乏现实感，容易沉溺于幻想。',
          actions: '学会脚踏实地，将艺术天赋和同情心转化为实际的帮助他人的能力。'
        }
      },
      moon: {
        aries: {
          description: '情绪直接冲动，需要即时的情感反应，喜欢刺激性的情感体验。',
          triggers: '被拖延或限制时，容易爆发愤怒和焦躁情绪。',
          actions: '将情绪能量导向建设性活动，通过适度运动和挑战来释放情绪。'
        },
        taurus: {
          description: '情绪稳定持久，需要安全感，喜欢温暖舒适的环境。',
          triggers: '面对急剧变化或不稳定情况时，会表现出强烈抵抗或固执。',
          actions: '尊重自己的慢节奏，花时间营造舒适的环境。'
        },
        gemini: {
          description: '情绪多样多变，需要智力刺激，喜欢与人交流分享。',
          triggers: '感到无聊或孤独时，容易失去专注力变得散漫。',
          actions: '在享受多样兴趣的同时，也要珍视深度沟通的机会。'
        },
        cancer: {
          description: '情绪深沉细腻，需要归属感，重视家庭和亲情关系。',
          triggers: '被拒绝或感到孤立时，容易封闭自己。',
          actions: '确保安全空间，与可信赖的人建立深度连接。'
        },
        leo: {
          description: '情绪热烈慷慨，需要被赞赏，喜欢成为关注焦点。',
          triggers: '尊严或面子受到威胁时，会变得防御或情绪爆发。',
          actions: '创造安全的表达空间，将关注点从"被赞美"转向"被理解"。'
        },
        virgo: {
          description: '情绪细腻理性，需要秩序感，喜欢照顾他人。',
          triggers: '处于混乱无序环境时，容易焦虑和批判。',
          actions: '不追求完美，重视小步改进的积累。'
        },
        libra: {
          description: '情绪追求和谐，需要伙伴关系，避免冲突。',
          triggers: '面对不公平待遇或冲突情况时，会深受伤害。',
          actions: '建立平衡的关系，学会适当表达自己的感受。'
        },
        scorpio: {
          description: '情绪深刻强烈，需要深度连接，具有强烈的占有欲。',
          triggers: '被背叛或感到不被信任时，会产生强烈的报复冲动。',
          actions: '学会信任和宽恕，将深度情感转化为治愈自己和他人的力量。'
        },
        sagittarius: {
          description: '情绪乐观自由，需要探索和成长，讨厌被束缚。',
          triggers: '被限制自由或被迫处理琐碎细节时，会感到沮丧。',
          actions: '在追求自由的同时，也要承担相应的责任。'
        },
        capricorn: {
          description: '情绪内敛实用，需要成就感，重视社会地位。',
          triggers: '感到不被尊重或失去控制时，会变得冷淡疏远。',
          actions: '学会表达内在情感，在追求成功的同时保持人情味。'
        },
        aquarius: {
          description: '情绪独立客观，需要自主权，重视友谊和理想。',
          triggers: '被强迫服从或限制独立性时，会产生强烈反感。',
          actions: '在保持独立性的同时，也要培养与他人的情感连接。'
        },
        pisces: {
          description: '情绪敏感富有同情心，需要精神寄托，容易受环境影响。',
          triggers: '处于负面环境或感到被误解时，容易陷入抑郁。',
          actions: '保护自己的敏感性，将同情心和直觉转化为帮助他人的实际行动。'
        }
      },
      ascendant: {
        aries: {
          impression: '给人活力充沛、积极主动的第一印象，容易成为领导者。',
          risks: '可能显得过于急躁或缺乏耐心，有时让人感到压力。',
          actions: '保持热情的同时，学会倾听他人，培养耐心和同理心。'
        },
        taurus: {
          impression: '给人稳重可靠、温和友善的印象，让人感到安全舒适。',
          risks: '可能显得过于固执或抗拒变化，有时让人觉得不够灵活。',
          actions: '在保持稳定的同时，适当展现开放性和适应能力。'
        },
        gemini: {
          impression: '给人机智聪明、善于交际的印象，容易吸引他人关注。',
          risks: '可能显得三分钟热度或不够深入，有时让人感到不够可靠。',
          actions: '在展现多样性的同时，也要展现专注和深度。'
        },
        cancer: {
          impression: '给人温暖关怀、感情丰富的印象，让人感到被照顾。',
          risks: '可能显得过于敏感或情绪化，有时让人感到压抑。',
          actions: '在表达关怀的同时，也要展现坚强和独立的一面。'
        },
        leo: {
          impression: '给人自信阳光、充满魅力的印象，容易成为焦点。',
          risks: '可能显得过于自我中心或戏剧化，有时让人感到疏远。',
          actions: '在展现自信的同时，也要展现谦逊和对他人的关注。'
        },
        virgo: {
          impression: '给人细心周到、专业能干的印象，让人感到可信赖。',
          risks: '可能显得过于挑剔或完美主义，有时让人感到压力。',
          actions: '在追求完美的同时，也要展现灵活性和包容心。'
        },
        libra: {
          impression: '给人优雅和谐、善于协调的印象，让人感到舒适。',
          risks: '可能显得过于犹豫或缺乏立场，有时让人感到不够坚定。',
          actions: '在保持和谐的同时，也要勇于表达自己的观点。'
        },
        scorpio: {
          impression: '给人深刻神秘、富有磁性的印象，容易让人印象深刻。',
          risks: '可能显得过于神秘或难以接近，有时让人感到不安。',
          actions: '适度展现内在深度，同时保持适当的开放性。'
        },
        sagittarius: {
          impression: '给人乐观开朗、热爱自由的印象，让人感到轻松愉快。',
          risks: '可能显得过于散漫或不够专注，有时让人感到不够稳重。',
          actions: '在保持自由精神的同时，也要展现责任感和专注力。'
        },
        capricorn: {
          impression: '给人成熟稳重、值得信赖的印象，让人感到安全。',
          risks: '可能显得过于严肃或距离感，有时让人感到压抑。',
          actions: '在保持专业的同时，也要展现温暖和亲和力。'
        },
        aquarius: {
          impression: '给人独特个性、富有创意的印象，容易吸引志同道合者。',
          risks: '可能显得过于另类或疏离，有时让人难以理解。',
          actions: '在保持独特性的同时，也要建立与他人的情感连接。'
        },
        pisces: {
          impression: '给人温柔善解人意、富有艺术气质的印象。',
          risks: '可能显得过于敏感或不够坚定，有时让人感到不够可靠。',
          actions: '在表达同情心的同时，也要展现内在的坚强和决断力。'
        }
      },
      mercury: {
        aries: {
          communication: '思维直接快速，表达坦率坦诚，善于发起话题。',
          risks: '说话可能过于冲动或不够深入思考，容易产生误解。',
          techniques: '培养耐心，在表达观点前先倾听他人意见。'
        },
        taurus: {
          communication: '表达稳重实际，声音温和，喜欢与具体事实进行交流。',
          risks: '有时可能显得固执或拒绝接受新观点。',
          techniques: '保持开放心态，适当尝试接受不同的思维方式。'
        },
        gemini: {
          communication: '思维活跃多样，表达生动有趣，善于多角度思考问题。',
          risks: '可能缺乏深度或一致性，容易让人感到混乱。',
          techniques: '保持逻辑清晰，适当深入某个话题而不是一直跳跃。'
        },
        cancer: {
          communication: '表达温暖感性，善于理解他人情绪，具有直觉洞察力。',
          risks: '可能过于主观或情绪化，影响客观分析。',
          techniques: '平衡理性和感性，在表达情感时也要考虑逻辑。'
        },
        leo: {
          communication: '表达自信生动，善于讲故事，能吸引听众注意力。',
          risks: '可能过于自我中心或戏剧化，忽略他人的观点。',
          techniques: '给他人足够的表达机会，学会倾听和赞美他人。'
        },
        virgo: {
          communication: '表达准确细致，逻辑清晰，善于分析和解决问题。',
          risks: '可能过于挑剔或批判，让人感到压力。',
          techniques: '在指出问题时也要给出建设性意见，注意语气和表达方式。'
        },
        libra: {
          communication: '表达优雅平衡，善于协调和寻找共同点，避免冲突。',
          risks: '可能过于犹豫或缺乏明确立场，难以做决定。',
          techniques: '勇于表达自己的真实意见，在平衡与坚定之间找到适当平衡。'
        },
        scorpio: {
          communication: '表达深刻直接，善于洞察问题本质，不喜欢表面交流。',
          risks: '可能显得过于尖锐或激进，容易产生对立。',
          techniques: '在表达视点时注意语气，给他人留下表达的空间。'
        },
        sagittarius: {
          communication: '表达乐观开放，善于分享经验和理念，具有哲学思维。',
          risks: '可能过于泛泛而谈或不够细致，容易忽略细节。',
          techniques: '在分享大方向的同时，也要注意具体实施的细节。'
        },
        capricorn: {
          communication: '表达严谨实用，善于结构化思维，重视效率和结果。',
          risks: '可能显得过于保守或刻板，缺乏创新性。',
          techniques: '适当展现灵活性和幽默感，在严谨中融入亲和力。'
        },
        aquarius: {
          communication: '表达独特前卫，善于思考未来和创新，具有客观理性。',
          risks: '可能显得过于超脱或难以理解，缺乏情感连接。',
          techniques: '在分享理念时考虑受众的理解能力，适当展现人性化的一面。'
        },
        pisces: {
          communication: '表达丰富情感化，具有直觉洞察力，善于艺术性表达。',
          risks: '可能显得过于模糊或情绪化，缺乏清晰的逻辑。',
          techniques: '在表达感受的同时也要结合理性分析，提高表达的清晰度。'
        }
      },
      venus: {
        aries: {
          relationships: '在关系中热情直接，喜欢追求和做主导，魅力充满活力。',
          approach: '需要学会耐心和考虑伴侣的想法，在热情中保持理性。'
        },
        taurus: {
          relationships: '在关系中追求稳定舒适，重视物质安全感，喜欢营造浪漫氛围。',
          approach: '避免过度固执，适当接受关系中的变化和新鲜感。'
        },
        gemini: {
          relationships: '在关系中需要智力刺激和交流，喜欢多样化体验和新鲜感。',
          approach: '学会深入连接，在享受多样性的同时也要培养深度关系。'
        },
        cancer: {
          relationships: '在关系中温柔关怀，重视情感安全，希望被爱护和照顾。',
          approach: '避免过度依赖，在给予爱的同时也要保持独立性。'
        },
        leo: {
          relationships: '在关系中慰慨慢慢，需要被赞美和欣赏，喜欢为伴侣创造惊喜。',
          approach: '学会分享焦点，在展现自己的同时也要欣赏伴侣。'
        },
        virgo: {
          relationships: '在关系中细心周到，通过实际行动表达爱意，重视精神契合。',
          approach: '适当放松完美主义，学会接受伴侣的不完美之处。'
        },
        libra: {
          relationships: '在关系中追求和谐美丽，善于协调平衡，需要伙伴和美好环境。',
          approach: '勇于表达真实想法，在追求和谐的同时也要保持个性。'
        },
        scorpio: {
          relationships: '在关系中激情深刻，寻求灵魂契合，具有强烈的占有欲和忍者力。',
          approach: '学会信任和开放，避免过度独占或疑惑。'
        },
        sagittarius: {
          relationships: '在关系中乐观开放，寻求精神契合和成长伙伴，需要自由空间。',
          approach: '在享受自由的同时也要承担关系中的责任。'
        },
        capricorn: {
          relationships: '在关系中责任感强，重视长期承诺和稳定建设，表达爱的方式实际。',
          approach: '适当展现情感和浪漫一面，避免过度严肃。'
        },
        aquarius: {
          relationships: '在关系中重视友谊和精神交流，需要独立空间和思想自由。',
          approach: '在保持独立性的同时，也要培养深入的情感连接。'
        },
        pisces: {
          relationships: '在关系中浪漫富有想象力，具有强烈的同理心和奉献精神。',
          approach: '学会设定边界，在给予爱的同时也要保护自己。'
        }
      },
      mars: {
        aries: {
          strengths: '行动力强烈直接，具有开拓精神，能够迅速响应和决断。',
          risks: '可能过于冲动或缺乏耐心，容易放弃遇到困难的项目。',
          actions: '学会制定详细计划，培养持续性和耐心。'
        },
        taurus: {
          strengths: '行动稳重持久，具有强大的耐力和执行力，能够坚持到底。',
          risks: '可能过于固执或拒绝改变，错过更好的机会。',
          actions: '保持开放心态，适当调整方法和策略。'
        },
        gemini: {
          strengths: '行动灵活多样，善于同时处理多项任务，适应能力强。',
          risks: '可能缺乏专注力或坚持力，容易半途而废。',
          actions: '学会设定优先级，专注于最重要的目标。'
        },
        cancer: {
          strengths: '行动出于情感和直觉，在保护所爱之人时展现强大力量。',
          risks: '可能过于情绪化或防御性，影响决策的客观性。',
          actions: '在进行重要决定时结合理性思考，避免纯情绪反应。'
        },
        leo: {
          strengths: '行动充满自信和领导力，能够激励和带动他人。',
          risks: '可能过于自我中心或狂妄，忽略他人的意见。',
          actions: '学会倾听他人意见，在展现领导力的同时也要谦逊。'
        },
        virgo: {
          strengths: '行动精确高效，善于分析和解决问题，注重细节。',
          risks: '可能过于挂心细节或完美主义，影响行动效率。',
          actions: '学会拓宽视野，在追求完美和推进进度之间找到平衡。'
        },
        libra: {
          strengths: '行动平衡协调，善于在团队中工作，能够考虑多方利益。',
          risks: '可能过于犹豫或避免冲突，错过重要机会。',
          actions: '在需要时勇于做出决断，不要过分担心得罪他人。'
        },
        scorpio: {
          strengths: '行动深刻专注，具有强大的意志力和穿透力。',
          risks: '可能过于激进或报复心理，影响人际关系。',
          actions: '学会宽恕和放下，将激情转化为积极的改变力量。'
        },
        sagittarius: {
          strengths: '行动充满理想主义，具有探索精神和大局观。',
          risks: '可能过于乐观或缺乏细节考虑，影响执行效果。',
          actions: '在保持理想的同时，也要制定具体可行的计划。'
        },
        capricorn: {
          strengths: '行动稳重有纶，具有强大的组织能力和责任感。',
          risks: '可能过于保守或严苛，错过创新机会。',
          actions: '适当迎接挑战和变化，在稳重中融入灵活性。'
        },
        aquarius: {
          strengths: '行动具有创新性和前瞻性，能够为集体利益而行动。',
          risks: '可能过于理想化或叛逆，忽略实际情况。',
          actions: '在追求理想的同时，也要考虑现实可行性。'
        },
        pisces: {
          strengths: '行动富有同情心和直觉力，能够为他人的福祉而努力。',
          risks: '可能缺乏方向或由于过度敏感而行动不决。',
          actions: '设定明确目标，在保持同情心的同时也要坚定行动。'
        }
      },
      midheaven: {
        aries: {
          career: '适合需要领导力和开拓精神的工作，如创业、销售、竞技等。',
          advantages: '具有天生的领导才能和开拓能力，能够在竞争激烈的环境中脱颖而出。',
          suggestions: '发挥你的主动性和决断力，但也要学会团队合作。'
        },
        taurus: {
          career: '适合稳定性强的工作，如金融、艺术、美容、建筑等。',
          advantages: '具有耐心和持久力，能够在自己的领域中稳步建立地位。',
          suggestions: '发挥你的实用才能，但也要保持对新机会的开放态度。'
        },
        gemini: {
          career: '适合需要沟通和信息处理的工作，如媒体、教育、科技等。',
          advantages: '具有出色的沟通能力和学习能力，能够适应多样化的工作环境。',
          suggestions: '发挥你的多才多艺，但也要在某个领域做深入专研。'
        },
        cancer: {
          career: '适合需要关怀和照顾他人的工作，如医疗、教育、餐饮等。',
          advantages: '具有强烈的同理心和直觉能力，能够理解和满足他人的需要。',
          suggestions: '发挥你的情感优势，但也要在职场中保持适度的专业距离。'
        },
        leo: {
          career: '适合需要创意和表现的工作，如娱乐、艺术、销售等。',
          advantages: '具有天生的表现力和魅力，能够在公众面前表现出色。',
          suggestions: '发挥你的创意才能，但也要学会团队合作和谦逊。'
        },
        virgo: {
          career: '适合需要精确性和分析能力的工作，如会计、研究、医疗等。',
          advantages: '具有出色的分析能力和注重细节的严谨态度。',
          suggestions: '发挥你的专业能力，但也要学会大局观和灵活性。'
        },
        libra: {
          career: '适合需要美感和人际协调的工作，如法律、设计、外交等。',
          advantages: '具有出色的人际沟通能力和审美品味。',
          suggestions: '发挥你的协调能力，但也要学会在关键时刻做决断。'
        },
        scorpio: {
          career: '适合需要深入研究和洞察能力的工作，如心理学、侦探、金融等。',
          advantages: '具有强大的洞察力和意志力，能够处理复杂和挑战性的问题。',
          suggestions: '发挥你的深度思考能力，但也要学会与人合作和信任他人。'
        },
        sagittarius: {
          career: '适合需要探索和教育能力的工作，如教育、旅游、出版等。',
          advantages: '具有广阔的视野和哲学思维，能够在多文化环境中脉茸。',
          suggestions: '发挥你的全球化视野，但也要在具体项目上保持专注。'
        },
        capricorn: {
          career: '适合需要管理和执行能力的工作，如管理、政府、企业等。',
          advantages: '具有强烈的责任感和组织能力，能够承担重要的领导职务。',
          suggestions: '发挥你的管理才能，但也要在领导中融入人性化的一面。'
        },
        aquarius: {
          career: '适合需要创新和社会责任的工作，如科技、公益、环保等。',
          advantages: '具有前瞻性的视野和人道主义精神，能够为社会进步做贡献。',
          suggestions: '发挥你的创新能力，但也要在理想和现实之间找到平衡。'
        },
        pisces: {
          career: '适合需要创意和服务精神的工作，如艺术、医疗、公益等。',
          advantages: '具有丰富的想象力和强烈的同情心，能够在创意领域和服务他人方面做出杰出贡献。',
          suggestions: '发挥你的艺术才能，但也要在职业发展中保持现实的认知。'
        }
      }
    },
    actions: {
      back: '返回首页',
      download: '下载报告',
      share: '分享',
      transitAnalysis: '流年分析',
      aiExpert: '问问冥冥'
    },
    advancedFeatures: {
      title: '高级分析功能',
      transitDescription: '时期别的运势变化与重要天体移动的影响详细分析',
      transitFeatures: {
        futureTrends: '• 未来3年间的运势倾向',
        transitPlanets: '• 重要的天体行运',
        timingDiagnosis: '• 最佳时机诊断'
      },
      aiExpertDescription: '基于您的星盘的智能问答服务，冥冥为您答疑解惑',
      aiExpertFeatures: {
        personalizedQA: '• 个性化占星问答',
        deepAnalysis: '• 深度解读与指导',
        instantResponse: '• 24小时即时回复'
      }
    },
    alerts: {
      aiExpertInDevelopment: '冥冥正在学习中，敬请期待！',
      reportTitle: '我的占星分析报告',
      reportDescription: '的个人星盘分析',
      linkCopied: '链接已复制到剪贴板',
      copyManually: '请手动复制当前页面链接进行分享'
    },
    signs: {
      descriptions: {
        sun: {
          '白羊座': '您具有开拓精神和领导能力，喜欢迎接挑战，行动力强。',
          '金牛座': '您稳重实际，重视安全感，具有持久的毅力和艺术品味。',
          '双子座': '您聪明好奇，善于沟通，喜欢学习新事物，适应能力强。',
          '巨蟹座': '您情感丰富，重视家庭，具有强烈的保护欲和直觉力。',
          '狮子座': '您自信大方，具有表演天赋，喜欢成为注意的焦点。',
          '处女座': '您注重细节，追求完美，具有强烈的服务精神。',
          '天秤座': '您追求和谐平衡，具有艺术气质，善于外交。',
          '天蝎座': '您深刻敏锐，具有洞察力，意志力坚强。',
          '射手座': '您乐观开朗，喜欢自由，具有哲学思维。',
          '摩羯座': '您踏实务实，有强烈的责任感和成就欲。',
          '水瓶座': '您独立创新，思维前卫，关心人道主义。',
          '双鱼座': '您富有想像力，敏感直觉，具有艺术天赋。'
        },
        moon: {
          '白羊座': '情感直接冲动，需要即时的情感回应，喜欢刺激的情感体验。',
          '金牛座': '情感稳定持久，需要安全感，喜欢温暖舒适的环境。',
          '双子座': '情感变化多样，需要智力刺激，喜欢与人交流分享。',
          '巨蟹座': '情感深刻敏感，需要归属感，重视家庭亲情。',
          '狮子座': '情感热烈大方，需要被欣赏，喜欢成为焦点。',
          '处女座': '情感细腻理性，需要秩序感，喜欢照顾他人。',
          '天秤座': '情感追求和谐，需要伴侣关系，避免冲突。',
          '天蝎座': '情感深邃强烈，需要深度连结，具有强烈的占有欲。',
          '射手座': '情感自由乐观，需要空间自由，喜欢探索新体验。',
          '摩羯座': '情感内敛实际，需要稳定结构，重视传统价值。',
          '水瓶座': '情感独立理性，需要友谊支持，关心集体利益。',
          '双鱼座': '情感敏感梦幻，需要精神共鸣，具有同理心。'
        },
        ascendant: {
          '白羊座': '给人积极主动的第一印象，展现出领导者的气质。',
          '金牛座': '给人稳重可靠的印象，展现出优雅的品味。',
          '双子座': '给人聪明机智的印象，展现出良好的沟通能力。',
          '巨蟹座': '给人温暖亲切的印象，展现出关怀他人的特质。',
          '狮子座': '给人自信大方的印象，展现出王者风范。',
          '处女座': '给人细心周到的印象，展现出专业能力。',
          '天秤座': '给人优雅和谐的印象，展现出良好的社交技巧。',
          '天蝎座': '给人神秘深邃的印象，展现出强烈的个人魅力。',
          '射手座': '给人乐观自由的印象，展现出冒险精神。',
          '摩羯座': '给人成熟稳重的印象，展现出责任感。',
          '水瓶座': '给人独特创新的印象，展现出前卫思维。',
          '双鱼座': '给人温柔梦幻的印象，展现出艺术气质。'
        }
      }
    },
    career: {
      strengths: {
        '白羊座': '您具有天生的领导才能和开拓精神，适合在需要创新和决策的环境中发挥。',
        '金牛座': '您擅长务实的工作，在需要稳定性和持续努力的领域表现优秀。',
        '双子座': '您具有优秀的沟通能力和学习适应性，适合多元化的工作环境。',
        '巨蟹座': '您具有强烈的责任心和照顾他人的能力，在服务性行业表现突出。',
        '狮子座': '您具有天生的表演天赋和领袖魅力，适合需要展现个人魅力的工作。',
        '处女座': '您注重细节和品质，在需要精确性和专业技能的领域表现优异。',
        '天秤座': '您具有优秀的协调能力和美感，适合需要平衡和美学的工作。',
        '天蝎座': '您具有深度洞察力和研究能力，适合需要深入分析的专业领域。',
        '射手座': '您具有国际视野和哲学思维，适合教育、出版或国际事务。',
        '摩羯座': '您具有强烈的目标导向和管理能力，适合企业管理和长期规划。',
        '水瓶座': '您具有创新思维和人道主义精神，适合科技和社会改革领域。',
        '双鱼座': '您具有丰富的想像力和同理心，适合艺术创作和心理辅导。'
      },
      suggestions: {
        '白羊座': ['创业家', '销售经理', '运动教练', '军事指挥官'],
        '金牛座': ['银行家', '建筑师', '厨师', '园艺师'],
        '双子座': ['记者', '教师', '翻译', '市场营销'],
        '巨蟹座': ['护士', '心理咨询师', '房地产', '餐饮业'],
        '狮子座': ['演员', '政治家', '时尚设计师', '娱乐业'],
        '处女座': ['会计师', '医生', '编辑', '质量管理'],
        '天秤座': ['律师', '外交官', '设计师', '人力资源'],
        '天蝎座': ['研究员', '侦探', '心理学家', '外科医生'],
        '射手座': ['教授', '旅游业', '出版社', '国际贸易'],
        '摩羯座': ['CEO', '政府官员', '工程师', '项目经理'],
        '水瓶座': ['科学家', 'IT工程师', '社会工作者', '发明家'],
        '双鱼座': ['艺术家', '音乐家', '治疗师', '慈善工作']
      }
    },
    relationships: {
      love: {
        '白羊座': '在爱情中您热情主动，喜欢直接表达感情，需要伴侣能跟上您的节奏。',
        '金牛座': '在爱情中您忠诚稳定，重视身体接触和物质安全感，喜欢长久的关系。',
        '双子座': '在爱情中您需要智力刺激，喜欢与伴侣分享想法，重视沟通交流。',
        '巨蟹座': '在爱情中您深情温柔，重视情感安全感，喜欢照顾和被照顾。',
        '狮子座': '在爱情中您慷慨热烈，需要被欣赏和赞美，喜欢浪漫的表达方式。',
        '处女座': '在爱情中您细心体贴，重视实际的关爱表现，喜欢为伴侣服务。',
        '天秤座': '在爱情中您追求和谐平衡，重视美感和浪漫，善于妥协和配合。',
        '天蝎座': '在爱情中您深刻专一，需要深度的情感连结，占有欲较强。',
        '射手座': '在爱情中您需要自由空间，喜欢与伴侣一起探索世界，重视精神契合。',
        '摩羯座': '在爱情中您认真负责，重视长期承诺，喜欢稳定发展的关系。',
        '水瓶座': '在爱情中您独立理性，重视友谊基础，需要理解和尊重。',
        '双鱼座': '在爱情中您浪漫梦幻，具有强烈的同情心，容易牺牲自己。'
      },
      friendship: {
        '白羊座': '在友谊中积极主动，喜欢带领朋友探索新事物，是值得信赖的伙伴。',
        '金牛座': '在友谊中忠诚可靠，重视长久的友谊关系，是很好的倾听者。',
        '双子座': '在友谊中善于交际，朋友圈广泛，喜欢与朋友分享新知。',
        '巨蟹座': '在友谊中关怀体贴，重视深度的情感连结，是很好的支持者。',
        '狮子座': '在友谊中慷慨大方，喜欢成为朋友圈的中心人物，重视忠诚。',
        '处女座': '在友谊中细心周到，愿意帮助朋友解决实际问题，值得依赖。',
        '天秤座': '在友谊中追求和谐，善于调解朋友间的矛盾，重视公平。',
        '天蝎座': '在友谊中深刻真诚，虽然朋友不多但关系深厚，非常忠诚。',
        '射手座': '在友谊中乐观开朗，喜欢与朋友分享冒险经历，重视自由。',
        '摩羯座': '在友谊中可靠稳重，虽然交友谨慎但关系长久，重视品质。',
        '水瓶座': '在友谊中独特有趣，重视友谊胜过爱情，关心朋友的个人发展。',
        '双鱼座': '在友谊中温柔体贴，具有强烈的同情心，是很好的情感支持。'
      },
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
    },
    fortune: {
      overview: {
        '大吉': '您的整体运势非常强劲，各方面都有良好的发展机会。这是实现目标的绝佳时机。',
        '吉': '您的运势稳定向上，虽然可能会有一些小挑战，但整体趋势是积极的。',
        '中': '您的运势平稳，适合稳扎稳打，不要急于求成，重点是保持现有的优势。',
        '凶': '您的运势面临一些挑战，需要谨慎行事，但这也是成长和学习的机会。'
      }
    },
    planetKeywords: {
      sun: ['自我', '意志', '创造力', '领导力', '自信'],
      moon: ['情感', '直觉', '需求', '习惯', '记忆'],
      ascendant: ['外表', '第一印象', '面具', '起点', '生命主题'],
      mercury: ['沟通', '思维', '学习', '逻辑', '表达'],
      venus: ['爱情', '美感', '和谐', '艺术', '价值观'],
      mars: ['行动', '竞争', '欲望', '勇气', '冲突']
    }
  },
  
  features: {
    title: '服务特色',
    detailed: {
      title: '详细分析',
      description: '专业命盘计算'
    },
    personalized: {
      title: '个性化',
      description: '专属运势解读'
    },
    transit: {
      title: '流年分析',
      description: '时运变化趋势'
    }
  },
  
  // Navigation
  nav: {
    menuToggle: '菜单切换',
    home: '首页',
    learn: '学习中心',
    about: '关于我们',
    contact: '联系我们',
    privacy: '隐私政策',
    terms: '使用条款'
  },

  // About Page
  about: {
    pageTitle: '关于我们',
    title: '关于命盘',
    subtitle: '古代智慧与现代技术的融合',
    metaDescription: '命盘提供专业的生辰八字和西方占星术分析服务。了解我们的使命、服务和技术。',
    mission: {
      title: '我们的使命',
      description1: '命盘致力于将古代命理智慧与现代技术相结合，为每个人提供易于访问的高质量命理分析服务。',
      description2: '我们深入研究东方生辰八字（四柱推命）和西方占星术的传统知识，结合精密的天文计算，为您提供准确而富有洞察力的分析结果。',
      description3: '我们的目标是通过命理帮助人们更深入地了解自己，找到人生的方向。'
    },
    services: {
      title: '提供服务',
      bazi: {
        title: '生辰八字分析',
        description: '基于中国古代四柱推命理论，从您的出生年月日时详细分析命运。综合判断五行配置、大运流年、性格特质等。'
      },
      western: {
        title: '西方占星术',
        description: '运用现代占星学理论，详细解读您的出生图。从行星配置、星座特性、宫位影响等角度分析性格和运势。'
      },
      transit: {
        title: '行运分析',
        description: '分析当前和未来天体运行对您的影响，告知重要时期和机会。'
      }
    },
    methodology: {
      title: '我们的方法',
      description1: '我们结合传统命理理论和现代天文学计算，提供最准确的分析结果：',
      point1: '精密天文计算：使用VSOP87算法精确计算行星位置',
      point2: '传统理论应用：基于古典命理文献的解释系统',
      point3: '多语言支持：提供中文、日语、英语服务',
      point4: '隐私保护：所有数据本地存储，严格保护隐私',
      description2: '所有分析结果都经过严格的质量控制，确保准确性和可靠性。'
    },
    accuracy: {
      title: '精度与可靠性',
      description1: '我们既重视技术精度，也重视命理传统知识。',
      description2: '通过以下技术特点，实现业界最高水准的分析精度：',
      tech1: {
        title: '高精度天文计算',
        description: '儒略日转换和VSOP87算法的行星位置计算'
      },
      tech2: {
        title: '地区优化',
        description: '针对中国地区优化的上升星座计算算法'
      },
      tech3: {
        title: '传统理论整合',
        description: '基于古典命理文献的综合解释系统'
      }
    },
    accessibility: {
      title: '语言与可访问性',
      description1: '我们的服务提供中文、日语、英语三种语言，世界各地的用户都可以使用。',
      description2: '同时采用响应式设计，在智能手机、平板电脑、个人电脑等各种设备上都能舒适使用。'
    },
    privacy: {
      title: '隐私与安全',
      description1: '我们将用户隐私放在首位。所有个人数据都存储在本地浏览器中，不会发送到服务器。',
      description2: '同时采用最新的安全技术，保护客户信息。'
    },
    cta: '立即开始分析'
  },

  // Privacy Page
  privacy: {
    pageTitle: '隐私政策',
    title: '隐私政策',
    lastUpdated: '最后更新日期',
    metaDescription: '命盘的隐私政策。详细说明个人信息的收集、使用和保护。符合Google AdSense要求的隐私方针。',
    introduction: {
      title: '介绍',
      description1: '命盘（https://meiban.info）将用户隐私放在首位。本隐私政策说明我们收集哪些信息，如何使用和保护这些信息。',
      description2: '使用我们的服务即表示您同意本隐私政策。'
    },
    collection: {
      title: '收集的信息',
      personal: {
        title: '个人信息',
        name: '姓名（可选）',
        birthdate: '出生日期',
        birthtime: '出生时间',
        birthplace: '出生地',
        gender: '性别'
      },
      automatic: {
        title: '自动收集的信息',
        ip: 'IP地址',
        browser: '浏览器信息',
        device: '设备信息',
        usage: '使用统计',
        cookies: 'Cookie数据'
      }
    },
    usage: {
      title: '信息使用目的',
      calculate: '命理分析的计算和结果生成',
      provide: '服务提供和改进',
      improve: '用户体验改善',
      communicate: '与客户沟通',
      analytics: '网站分析和性能改进',
      ads: '相关广告显示'
    },
    adsense: {
      title: 'Google AdSense',
      description1: '本网站使用Google AdSense显示广告。AdSense使用Cookie来基于用户兴趣投放广告。',
      description2: 'Google AdSense可能收集以下信息：',
      cookies: {
        title: 'AdSense Cookies',
        doubleclick: 'DoubleClick DART Cookie',
        personalization: '个性化广告Cookie',
        analytics: '分析Cookie'
      },
      optout: '您可以在Google广告设置页面选择退出个性化广告。',
      learnmore: '详情请参阅',
      googlePrivacy: 'Google隐私政策'
    },
    analytics: {
      title: 'Google Analytics',
      description1: '本网站使用Google Analytics分析网站使用情况。',
      description2: 'Google Analytics收集匿名数据，不包含个人身份信息。',
      optout: '您可以安装Google Analytics退出插件来禁用数据收集：',
      optoutLink: '退出插件'
    },
    cookies: {
      title: '关于Cookie',
      description1: '本网站使用Cookie来改进服务和用户体验。',
      types: {
        title: 'Cookie类型',
        essential: {
          title: '必需Cookie',
          description: '网站基本功能所需'
        },
        analytics: {
          title: '分析Cookie',
          description: '网站使用情况分析'
        },
        advertising: {
          title: '广告Cookie',
          description: '相关广告显示'
        },
        functional: {
          title: '功能Cookie',
          description: '用户设置保存'
        }
      },
      control: '您可以在浏览器设置中管理Cookie。'
    },
    storage: {
      title: '数据存储',
      description1: '您的命理分析数据主要存储在本地浏览器中，不会发送到我们的服务器。',
      description2: '这样可以最大程度地保护您的隐私。',
      retention: '您可以随时清除浏览器的本地存储来删除数据。'
    },
    sharing: {
      title: '数据共享',
      description1: '除法律要求外，我们不会与第三方共享您的个人信息。但以下情况除外：',
      google: '与Google AdSense和Google Analytics等服务提供商共享',
      legal: '法律要求或执法部门请求',
      protection: '网站安全和运营保护',
      consent: '获得您明确同意的情况'
    },
    rights: {
      title: '您的权利',
      access: '个人信息访问权',
      correct: '信息更正权',
      delete: '信息删除权',
      portability: '数据可移植性权利',
      object: '处理异议权',
      restrict: '处理限制权',
      contact: '如需行使这些权利，请联系我们。'
    },
    security: {
      title: '安全',
      description1: '我们采取适当的技术和组织措施，保护您的个人信息免受未授权访问、丢失、破坏。',
      description2: '但请理解，互联网上的信息传输并非100%安全。'
    },
    international: {
      title: '国际传输',
      description1: '根据服务提供商所在地，您的信息可能会跨境传输。',
      description2: '我们努力确保传输目的地国家也能提供适当的保护水平。'
    },
    children: {
      title: '儿童隐私',
      description1: '本服务不面向13岁以下儿童。',
      description2: '我们不会故意收集13岁以下儿童的个人信息。'
    },
    changes: {
      title: '政策变更',
      description1: '我们可能会根据需要更新本隐私政策。',
      description2: '如有重要变更，我们会在网站上通知。'
    },
    contact: {
      title: '联系我们',
      description: '如对本隐私政策有任何疑问，请通过以下方式联系我们：',
      email: {
        label: '邮箱地址'
      },
      website: {
        label: '网站',
        link: '联系我们页面'
      }
    }
  },

  // Contact Page
  contact: {
    pageTitle: '联系我们',
    title: '联系我们',
    subtitle: '如有任何问题或建议，请随时联系我们',
    metaDescription: '命盘联系我们页面。我们为各种咨询提供支持，包括技术问题、隐私问题等。',
    info: {
      title: '联系信息',
      email: {
        title: '一般咨询',
        description: '关于服务的问题和建议'
      },
      privacy: {
        title: '隐私相关咨询',
        description: '数据保护和隐私相关问题'
      },
      website: {
        title: '官方网站',
        description: '最新信息和服务详情'
      }
    },
    form: {
      title: '联系表单',
      name: {
        label: '姓名',
        placeholder: '请输入您的姓名'
      },
      email: {
        label: '邮箱地址',
        placeholder: 'your.email@example.com'
      },
      subject: {
        label: '咨询内容',
        placeholder: '请选择咨询内容',
        options: {
          general: '一般咨询',
          technical: '技术问题',
          privacy: '隐私相关问题',
          feedback: '意见反馈',
          partnership: '合作伙伴关系'
        }
      },
      message: {
        label: '留言',
        placeholder: '请输入详细留言...'
      },
      consent: {
        text: '我同意隐私政策',
        link: '隐私政策'
      },
      submit: '发送',
      submitting: '发送中...',
      success: '消息发送成功。我们会尽快回复您。',
      error: '发送过程中出现错误。请稍后重试。'
    },
    faq: {
      title: '常见问题',
      items: {
        accuracy: {
          question: '命理分析的准确度如何？',
          answer: '我们结合精密的天文计算和传统命理理论，提供最高水准的准确度。但建议将命理作为参考使用。'
        },
        privacy: {
          question: '个人信息是否安全保护？',
          answer: '是的。您的数据主要存储在本地浏览器中，不会发送到我们的服务器。详情请查看隐私政策。'
        },
        technical: {
          question: '遇到技术问题怎么办？',
          answer: '请更新浏览器到最新版本，清除缓存后重试。如问题持续，请联系技术支持。'
        },
        languages: {
          question: '支持哪些语言？',
          answer: '目前提供中文、日语、英语服务。您可以通过右上角的按钮切换语言。'
        },
        mobile: {
          question: '移动设备可以使用吗？',
          answer: '是的。本网站采用响应式设计，在智能手机和平板电脑上都能舒适使用。'
        }
      }
    },
    response: {
      title: '响应时间',
      urgent: {
        title: '紧急咨询',
        description: '24小时内回复'
      },
      general: {
        title: '一般咨询',
        description: '1-3个工作日内回复'
      },
      complex: {
        title: '复杂技术问题',
        description: '3-7个工作日内回复'
      }
    }
  },

  // Terms Page
  terms: {
    pageTitle: '使用条款',
    title: '使用条款',
    lastUpdated: '最后更新日期',
    metaDescription: '命盘的使用条款。详细说明服务使用条件、用户责任、免责声明等。',
    introduction: {
      title: '介绍',
      description1: '本使用条款（以下称"本条款"）规定了命盘（https://meiban.info）提供的服务（以下称"本服务"）的使用条件。',
      description2: '使用本服务前，请仔细阅读本条款。',
      description3: '使用本服务即表示您同意本条款。'
    },
    acceptance: {
      title: '条款同意',
      description1: '访问或使用本服务即表示您同意受本条款所有条款的约束。',
      description2: '如不同意本条款，请不要使用本服务。'
    },
    service: {
      title: '服务说明',
      description1: '本服务提供以下功能：',
      feature1: '生辰八字（四柱推命）分析和解释',
      feature2: '西方占星术分析和解释',
      feature3: '行运分析和未来预测',
      feature4: '多语言支持（中文、日语、英语）',
      description2: '本服务仅供娱乐和教育目的，不是专业建议。'
    },
    responsibilities: {
      title: '用户责任',
      description1: '使用本服务时，您需要承担以下责任：',
      accurate: '提供准确信息',
      legal: '遵守法律法规',
      respectful: '尊重其他用户',
      security: '维护账户安全',
      compliance: '遵守本条款'
    },
    prohibited: {
      title: '禁止行为',
      description1: '以下行为被禁止：',
      illegal: '违法行为或违规行为',
      harmful: '有害、威胁性或诽谤性内容',
      spam: '垃圾邮件或骚扰邮件',
      unauthorized: '未授权访问',
      interference: '干扰服务',
      violate: '侵犯知识产权',
      impersonate: '冒充他人'
    },
    intellectual: {
      title: '知识产权',
      description1: '本服务的所有内容、功能、特征均为命盘及其许可方的专有财产。',
      description2: '包括文本、图形、标志、图标、图像、音频剪辑、软件等。',
      description3: '受版权、商标权和其他知识产权法保护。'
    },
    privacy: {
      title: '隐私和数据',
      description1: '您的隐私对我们很重要。',
      description2: '关于数据收集和使用，请查看我们的',
      link: '隐私政策'
    },
    disclaimers: {
      title: '免责声明',
      entertainment: {
        title: '娱乐目的',
        description: '本服务仅供娱乐和教育目的，不是专业建议、医疗、法律、财务咨询的替代。'
      },
      accuracy: {
        title: '关于准确性',
        description: '命理分析结果仅供参考，重要人生决定建议咨询专业人士。'
      },
      decisions: {
        title: '决定责任',
        description: '基于本服务结果的所有决定均由您自行承担责任。'
      },
      professional: {
        title: '专业建议',
        description: '本服务不是医疗、法律、财务、心理专业建议的替代。'
      }
    },
    liability: {
      title: '责任限制',
      description1: '在法律允许的最大范围内，命盘不对因使用本服务而产生的直接、间接、附带、后果性损害承担责任。',
      description2: '包括但不限于利润损失、数据损失、业务中断等。',
      description3: '某些司法管辖区可能不允许排除或限制损害。'
    },
    availability: {
      title: '服务可用性',
      description1: '我们不保证本服务始终可用。',
      description2: '由于维护、更新或其他原因，服务可能暂时中断。',
      description3: '我们保留随时更改、暂停或终止服务的权利，恕不另行通知。'
    },
    modifications: {
      title: '条款变更',
      description1: '我们保留根据需要修改本条款的权利。',
      description2: '如有重要变更，我们会在网站上通知。变更后的使用视为对修改条款的同意。'
    },
    termination: {
      title: '服务终止',
      description1: '我们保留因任何原因随时终止或暂停您使用服务的权利。',
      description2: '服务终止后，相关条款条文仍将保持有效。'
    },
    governing: {
      title: '适用法律',
      description1: '本条款受中华人民共和国法律管辖并按其解释。',
      description2: '与本条款相关的争议将在中华人民共和国管辖法院解决。'
    },
    contact: {
      title: '联系我们',
      description: '如对本条款有任何疑问，请通过以下方式联系我们：',
      email: {
        label: '邮箱地址'
      },
      website: {
        label: '网站',
        link: '联系我们页面'
      }
    }
  },

  // Learn Page
  learn: {
    pageTitle: '学习中心',
    title: '命理学习中心',
    subtitle: '学习古代智慧，理解自己的命运',
    metaDescription: '学习生辰八字和西方占星术的综合学习中心。提供从初学者到高级用户的教育内容。',
    intro: {
      title: '欢迎来到命理世界',
      description1: '在我们的学习中心，您可以系统地学习生辰八字（四柱推命）和西方占星术的基础到应用。',
      description2: '以现代视角理解古代智慧，掌握在日常生活中应用的实用知识。'
    },
    paths: {
      title: '学习课程',
      bazi: {
        title: '生辰八字课程',
        description: '从基础学习中国古代四柱推命理论',
        lessons: {
          basics: '基础理论',
          'heavenly-stems': '天干理解',
          'earthly-branches': '地支理解',
          'five-elements': '五行理论',
          'reading-pillars': '四柱读法',
          'interpreting-chart': '命盘解释'
        }
      },
      astrology: {
        title: '西方占星术课程',
        description: '从现代占星学基本概念到实践',
        lessons: {
          introduction: '占星术入门',
          'zodiac-signs': '十二星座',
          planets: '行星意义',
          houses: '宫位系统',
          aspects: '相位理论',
          'birth-chart': '出生图读法'
        }
      },
      reading: {
        title: '图表解读课程',
        description: '解读实际命盘的实用技能',
        lessons: {
          preparation: '解读准备',
          'analysis-method': '分析方法',
          interpretation: '解释技巧',
          timing: '时机分析',
          synthesis: '综合判断',
          practice: '实践练习'
        }
      }
    },
    lessons: '课程',
    difficulty: {
      beginner: '初级',
      intermediate: '中级',
      advanced: '高级'
    },
    featured: {
      title: '精选文章'
    },
    articles: {
      'understanding-birth-chart': {
        title: '理解出生图',
        excerpt: '详细解释西方占星术基础的出生图读法'
      },
      'five-elements-theory': {
        title: '五行理论基础',
        excerpt: '中国古代传承的五行理论基本概念和实际应用'
      },
      'career-astrology': {
        title: '职业占星术',
        excerpt: '使用占星术进行职业选择和职业适性分析的方法'
      },
      'relationship-compatibility': {
        title: '相性诊断方法',
        excerpt: '用占星术分析两人相性的实用手法'
      }
    },
    categories: {
      title: '分类',
      fundamentals: '基础知识',
      astrology: '西方占星术',
      bazi: '生辰八字',
      practical: '实践应用',
      relationships: '人际关系',
      career: '职业'
    },
    categoryDescriptions: {
      fundamentals: '命理的基本概念和历史背景',
      astrology: '西方占星术的理论和实践',
      bazi: '中国的四柱推命理论',
      practical: '日常生活中的运用方法',
      relationships: '人际关系和相性分析',
      career: '职业和职业选择'
    },
    exploreCategory: '探索分类',
    quickStart: {
      title: '快速开始指南',
      description: '为刚开始命理的人提供的简单指南：',
      step1: '学习基础理论',
      step2: '尝试实际分析',
      step3: '解释结果',
      step4: '应用到日常生活',
      cta: '开始分析'
    },
    readTime: '{minutes}分钟阅读'
  },

  // Article Common
  article: {
    publishedOn: '发布日期',
    nextReading: '相关文章',
    breadcrumb: {
      learn: '学习中心'
    },
    relatedArticles: {
      zodiacSigns: '十二星座的意义',
      planetMeanings: '行星象征',
      astrologyHouses: '占星术的宫位',
      baziBasics: '生辰八字基础',
      heavenlyStems: '天干理解',
      earthlyBranches: '地支理解'
    },
    understandingBirthChart: {
      pageTitle: '理解出生图',
      title: '理解出生图：占星术基础',
      metaDescription: '详细解释西方占星术基础的出生图读法。学习行星、星座、宫位的基本意义和解释方法。',
      introduction: '出生图是记录您出生瞬间天体配置的宇宙设计图。本文详细说明出生图的基本读法和解释方法。',
      description1: '出生图是西方占星术最重要的要素之一。从出生年月日、出生时刻、出生地制作，显示人的性格、才能、人生课题和机会。',
      description2: '正确理解后，能更深入地了解自己，获得找到人生方向的线索。',
      sections: {
        whatIs: {
          title: '什么是出生图',
          description1: '出生图（本命盘）是记录您出生准确瞬间天体位置的图表。',
          keyElements: {
            title: '制作出生图需要的要素',
            birthDate: '出生年月日',
            birthDateDesc: '需要准确日期',
            birthTime: '出生时刻',
            birthTimeDesc: '精确到分钟的时刻',
            birthPlace: '出生地',
            birthPlaceDesc: '经纬度信息'
          },
          description2: '从这些信息可以准确计算太阳、月亮、行星位于哪个星座，位于哪个宫位。'
        },
        components: {
          title: '出生图的主要要素',
          planets: {
            title: '行星',
            description: '出生图包含10个主要天体，各自表示人生的不同方面：',
            personal: {
              title: '个人天体',
              sun: '太阳 - 核心身份',
              moon: '月亮 - 情感和本能',
              mercury: '水星 - 沟通和思考',
              venus: '金星 - 爱和美感',
              mars: '火星 - 行动力和能量'
            },
            social: {
              title: '社会天体',
              jupiter: '木星 - 扩展和成长',
              saturn: '土星 - 限制和责任'
            },
            generational: {
              title: '世代天体',
              uranus: '天王星 - 革新和变化',
              neptune: '海王星 - 梦想和直觉',
              pluto: '冥王星 - 变容和再生'
            }
          },
          zodiac: {
            title: '十二星座',
            description: '各行星位于哪个星座决定该行星能量的表达方式。'
          },
          houses: {
            title: '宫位',
            description: '宫位表示人生的12个分野，显示行星能量在哪个生活领域发挥。',
            tip: {
              title: '提示',
              description: '上升星座（Ascendant）是第1宫的开始，表示您的外在印象和人生态度。'
            }
          }
        },
        howToRead: {
          title: '出生图的读法',
          description: '解读出生图时，以下分阶段的方法很有效：',
          steps: {
            step1: {
              title: '确认Big Three',
              description: '首先确认太阳星座、月亮星座、上升星座，理解基本性格框架。'
            },
            step2: {
              title: '分析行星配置',
              description: '确认各行星位于哪个星座·宫位，读取人生各分野的倾向。'
            },
            step3: {
              title: '观察相位',
              description: '观察行星之间的角度关系（相位），理解能量的相互作用。'
            },
            step4: {
              title: '整合整体模式',
              description: '整合个别要素，读取整体性格倾向和人生主题。'
            }
          }
        },
        bigThree: {
          title: 'Big Three',
          description: '占星术中最重要的3个要素：',
          sun: {
            title: '太阳星座',
            description: '表示您的核心性格、人生目的、创造性能量。'
          },
          moon: {
            title: '月亮星座',
            description: '表示您的情感性质、无意识反应、内在需求。'
          },
          ascendant: {
            title: '上升星座（Ascendant）',
            description: '表示对外界的印象、人生态度方法。'
          }
        },
        gettingStarted: {
          title: '开始尝试',
          description: '学习理论后，实际制作和分析自己的出生图很重要。使用我们的服务，现在就制作您的出生图试试吧？',
          cta: '制作我的出生图'
        }
      }
    },
    fiveElements: {
      pageTitle: '五行理论基础',
      title: '五行理论基础：中国古代智慧',
      metaDescription: '中国古代传承的五行理论基本概念和实际应用。详细解释木·火·土·金·水的特性和相互关系。',
      introduction: '五行理论是中国古代传承的根本哲学思想，认为宇宙万物由木·火·土·金·水五个要素构成。',
      description1: '五行理论是生辰八字（四柱推命）基础的重要概念。理解这个理论，能更深入地理解自然界的循环和人生流程。',
      description2: '各要素都有独特的性质，相互影响维持宇宙的和谐。',
      sections: {
        elements: {
          title: '五个要素',
          description: '五行各自有独特的特性和象征：',
          attributes: {
            direction: '方位',
            season: '季节',
            color: '颜色',
            emotion: '情感'
          },
          wood: {
            title: '木',
            direction: '东',
            season: '春',
            color: '青·绿',
            emotion: '怒',
            description: '象征成长、发展、创造性。如春天的新绿充满生命力，有向上的能量。'
          },
          fire: {
            title: '火',
            direction: '南',
            season: '夏',
            color: '红',
            emotion: '喜',
            description: '表示热情、活动、光明。如太阳般明亮，有扩散性能量。'
          },
          earth: {
            title: '土',
            direction: '中央',
            season: '土用',
            color: '黄',
            emotion: '思',
            description: '象征稳定、养育、包容。如大地般稳定，有接纳一切的包容力。'
          },
          metal: {
            title: '金',
            direction: '西',
            season: '秋',
            color: '白',
            emotion: '悲',
            description: '表示收敛、精炼、正义。有锐利纯粹的性质，有去除杂质的力量。'
          },
          water: {
            title: '水',
            direction: '北',
            season: '冬',
            color: '黑·蓝',
            emotion: '恐',
            description: '象征智慧、流动性、储藏。如水般柔软，流向低处，滋润万物。'
          }
        },
        interactions: {
          title: '五行的相互关系',
          description: '五行之间有相生和相克两种基本关系。',
          generative: {
            title: '相生关系（生成循环）',
            description: '一个要素生成、培育下一个要素的关系：',
            woodFire: '木燃烧生火',
            fireEarth: '火化为灰生土',
            earthMetal: '土生出金属',
            metalWater: '金属生水滴',
            waterWood: '水培育木'
          },
          destructive: {
            title: '相克关系（控制循环）',
            description: '一个要素控制、抑制另一个要素的关系：',
            examples: {
              title: '相克的例子',
              woodEarth: '木吸收土的养分',
              earthWater: '土吸收水',
              waterFire: '水灭火',
              fireMetal: '火熔化金属',
              metalWood: '金属（斧）砍木'
            }
          }
        },
        bazi: {
          title: '生辰八字中的五行',
          description: '在生辰八字中，从出生年月日时导出的八个字（天干地支）各自对应五行。',
          pillars: {
            title: '四柱和五行',
            description: '年柱、月柱、日柱、时柱各柱表示五行的平衡：',
            year: '年柱',
            yearDesc: '祖先影响、基本性格',
            month: '月柱',
            monthDesc: '成长期、社会性',
            day: '日柱',
            dayDesc: '本人性格、配偶关系',
            hour: '时柱',
            hourDesc: '晚年、子女关系'
          },
          balance: {
            title: '五行平衡',
            description: '理想的命盘中五行平衡配置。如有不足或过多，考虑补充方法。',
            tips: {
              title: '平衡调整提示',
              tip1: '佩戴不足要素的颜色',
              tip2: '注意相应方位',
              tip3: '活用对应季节的特性',
              tip4: '利用相生关系补强'
            }
          }
        },
        practical: {
          title: '实际应用',
          description: '五行理论可以在日常生活的各种场面中运用：',
          personality: {
            title: '性格分析',
            description: '根据哪个要素强可以理解人的基本性格倾向。'
          },
          career: {
            title: '职业选择',
            description: '可以找到适合自己五行平衡的职业和工作方式。'
          },
          health: {
            title: '健康管理',
            description: '各要素与身体特定部位相关，可作为健康管理的指针。'
          },
          success: {
            title: '成功的关键',
            description: '理解五行平衡，保持和谐，能过上更充实的人生。'
          }
        },
        gettingStarted: {
          title: '了解您的五行',
          description: '学习理论后，实际分析自己的五行平衡吧。通过生辰八字分析，可以确认您的五行配置。',
          cta: '分析我的五行'
        }
      }
    }
  },

  footer: {
    copyright: '© 2025 命盘 - 生辰八字・紫微斗数・西方占星分析'
  },
  
  alerts: {
    birthdateRequired: '请选择出生日期',
    birthTimeRequired: '请选择出生时间',
    birthMinuteRequired: '请选择出生分钟',
    birthplaceRequired: '请输入出生地',
    genderRequired: '请选择性别'
  },

  notFound: {
    transitRequiresData: '使用行运分析需要先输入基本信息。',
    issueReported: '问题已报告。感谢您的合作。'
  },
  
  languageSwitcher: {
    title: '选择语言',
    current: '当前语言'
  },
  
  transitAnalysis: {
    title: '个人流年深度分析',
    subtitle: '基于您的出生资料进行专业的流年分析',
    selectDate: '选择分析日期',
    quickSelect: '快速选择',
    today: '今天',
    birthday: '生日',
    newYear: '新年',
    customDate: '自定义日期',
    analysisDate: '分析日期',
    analysisTime: '分析时间',
    preview: '分析预览',
    previewDate: '分析日期',
    ageAtTime: '当时年龄',
    daysToBirthday: '距离生日',
    yearsOld: '岁',
    days: '天',
    startAnalysis: '开始分析',
    analyzing: '分析中...',
    analyzingTitle: '正在分析您的流年运势',
    analyzingDesc: '这可能需要一些时间',
    analyzingYourTransit: '正在分析您的行运盘...',
    calculatingPlanets: '请稍候，我们正在计算行星位置和相位关系',
    step1: '计算行运行星位置',
    step2: '分析相位关系',
    step3: '生成详细报告',
    analysisSteps: {
      prepare: '准备数据...',
      calculate: '计算天体位置...',
      analyze: '分析行运影响...',
      interpret: '生成个人解读...',
      complete: '分析完成！'
    },
    analysisInProgress: '正在进行个人行运盘深度分析',
    analysisError: '分析过程中出现错误，请稍后重试',
    reportTitle: '的流年分析',
    age: '年龄',
    birthPlace: '出生地',
    intensity: {
      high: '高强度',
      medium: '中等强度',
      low: '温和强度'
    },
    overview: '总体概览',
    keyThemes: '当前主要主题',
    lifeCycles: '重要生命周期',
    majorAspects: '主要相位分析',
    guidance: '人生指导',
    opportunities: '机遇与契机',
    challenges: '挑战与课题',
    recommendations: '分类建议',
    futureOutlook: '未来展望',
    next3Months: '未来3个月',
    next6Months: '未来6个月',
    nextYear: '未来一年',
    nextYearOutlook: '明年展望',
    longTerm: '长期展望',
    longTermDevelopment: '长期发展',
    newAnalysis: '新分析',
    downloadReport: '下载PDF报告',
    shareReport: '分享报告',
    shareTitle: '我的流年分析报告',
    shareText: '的个人流年深度分析',
    linkCopied: '链接已复制到剪贴板',
    copyManually: '请手动复制当前页面链接进行分享',
    generating: '生成中...',
    noReportError: '没有可下载的分析报告',
    pdfError: 'PDF生成失败，请稍后重试',
    orb: '容许度',
    careerFocus: '事业发展重点',
    relationshipFocus: '人际关系重点',
    personalGrowth: '个人成长重点',
    personalGrowthFocus: '个人成长重点',
    physicalHealth: '身体健康',
    mentalHealth: '心理健康',
    emotionalHealth: '情感健康',
    timing: '时间框架',
    timeframe: '时间框架',
    focusAreas: '关注领域',
    priorities: '优先发展',
    priorityDevelopment: '优先发展',
    methods: '建议方法',
    recommendedMethods: '建议方法',
    approach: '方针',
    bestTiming: '最佳时机',
    avoidTiming: '谨慎时期',
    cautionPeriod: '谨慎时期',
    keyDates: '关键日期',
    advice: '建议',
    outerPlanetsInfluence: '外行星深度影响',
    overallTheme: '总体主题',
    planetInfluence: '的影响',
    relatedAspects: '相关相位',
    guidanceAdvice: '指导建议',
    majorTransitAspects: '重要行运相位',
    lifeGuidanceAdvice: '人生指导与建议',
    currentFocus: '当前重点',
    mainChallenge: '主要挑战',
    importantOpportunity: '重要机遇',
    emotionalAdvice: '情感建议',
    practicalAdvice: '实际建议',
    spiritualAdvice: '精神建议',
    detailedRecommendations: '分领域详细建议',
    reanalyze: '重新分析',
    returnHome: '返回首页',
    tabs: {
      career: '事业发展',
      relationships: '人际关系',
      health: '健康管理',
      personal: '个人成长',
      financial: '财务规划',
      timing: '时机把握'
    }
  },
  
  common: {
    back: '返回'
  },

  starChart: {
    title: '星盘图',
    viewMode: {
      title: '星盘显示模式',
      description: '选择您偏好的星盘显示方式'
    },
    controls: {
      showAspects: '显示相位',
      hideAspects: '隐藏相位',
      showHouses: '显示宫位',
      hideHouses: '隐藏宫位',
      fullscreen: '全屏显示',
      reset: '重置视图',
      title: '显示控制',
      animation: '启用动画',
      zodiacLabels: '星座标签',
      rotationSpeed: '旋转速度',
      showEquator: '显示赤道环',
      showHorizon: '显示地平环',
      latitude: '纬度',
      longitude: '经度'
    },
    astro3d: {
      title: '天文级3D可视化',
      timeLocation: '时间与位置',
      dateTime: '日期时间（本地时区）',
      altitude: '海拔高度',
      altitudePlaceholder: '海拔（米）',
      latitudePlaceholder: '纬度（度）',
      longitudePlaceholder: '经度（度）',
      displayOptions: '显示选项',
      testResults: '测试结果',
      selfCheck: '运行自检',
      runTests: '运行一组内置测试验证天文计算准确性',
      description: '基于天文引擎的精确3D星体位置可视化。世界坐标系：ECT（真黄道-当日）。你可以旋转/缩放查看3D空间关系。'
    },
    legends: {
      planets: '行星',
      majorAspects: '主要相位'
    },
    tooltip: {
      degree: '度',
      minute: '分'
    },
    aspects: {
      conjunction: '合相',
      sextile: '六分相',
      square: '四分相',
      trine: '三分相',
      opposition: '对分相'
    },
    houses: {
      descriptions: {
        1: '自我・个性',
        2: '财富・价值',
        3: '沟通・学习',
        4: '家庭・根源',
        5: '创造・恋爱',
        6: '工作・健康',
        7: '关系・合作',
        8: '转化・共享',
        9: '哲学・远行',
        10: '事业・声誉',
        11: '友谊・希望',
        12: '潜意识・牺牲'
      }
    },
    zodiac: {
      aries: '白羊座',
      taurus: '金牛座',
      gemini: '双子座',
      cancer: '巨蟹座',
      leo: '狮子座',
      virgo: '处女座',
      libra: '天秤座',
      scorpio: '天蝎座',
      sagittarius: '射手座',
      capricorn: '摩羯座',
      aquarius: '水瓶座',
      pisces: '双鱼座'
    },
    planets: {
      sun: '太阳',
      moon: '月亮',
      mercury: '水星',
      venus: '金星',
      mars: '火星',
      jupiter: '木星',
      saturn: '土星',
      uranus: '天王星',
      neptune: '海王星',
      pluto: '冥王星',
      north_node: '北交点',
      south_node: '南交点',
      ascendant: '上升点',
      midheaven: '天顶',
      chiron: '凯龙星'
    }
  },

  transitReport: {
    header: {
      title: '个人行运盘深度分析报告',
      anonymousUser: '匿名用户',
      unknownPlace: '未知地点'
    },
    
    errors: {
      missingData: '缺少必要的输入数据',
      invalidDate: '无效日期',
      dateFormatError: '日期格式错误',
      dateError: '日期错误',
      analysisError: '分析过程中出现错误，请稍后重试',
      unknownPhase: '无法确定当前阶段',
      reanalysis: '重新分析',
      unknownIntensity: '未知强度',
      outerPlanetError: '外行星分析失败',
      reanalysisNeeded: '需要重新分析',
      systemError: '分析系统错误',
      retryLater: '请稍后重试',
      patience: '保持耐心',
      checkData: '检查输入数据',
      trustProcess: '相信过程',
      unknown: '未知',
      stayHealthy: '注意健康',
      stayCalm: '保持平静',
      bePatient: '耐心等待',
      beCautious: '保持谨慎',
      waitForFix: '等待系统修复',
      dataValidation: '数据验证',
      avoidNow: '避免现在分析',
      needRecalculation: '需要重新计算',
      contactSupport: '请联系技术支持'
    },

    overview: {
      midlifePhase: '您正处于人生的重要转换期。外行星的影响正在帮助您深度转化，重新定义人生的意义和方向。',
      saturnReturnPhase: '您正在经历土星回归期，这是建立成人基础的关键时期。虽然充满挑战，但也充满机遇。',
      jupiterReturnPhase: '木星回归带来扩展和成长的能量，这是追求更高目标和拓展视野的良好时期。',
      stablePhase: '您当前处于相对稳定的发展阶段，适合巩固既有成果并为未来的重要变化做准备。',
      summaryTemplate: '{age}岁的您正在经历{totalAspects}个重要的行运相位，其中{majorAspects}个为强力相位。{cyclesCount}个重要的生命周期正在激活中。',
      fallbackSummary: '正在经历人生的重要阶段',
      fallbackPhase: '当前处于稳定发展期',
      fallbackTheme: '稳定发展'
    },

    intensity: {
      high: '高强度',
      medium: '中等强度',
      gentle: '温和强度'
    },

    themes: {
      responsibility: '责任承担',
      expansion: '扩展成长',
      innovation: '创新突破',
      maturation: '成熟蜕变',
      stability: '稳定发展'
    },

    cycles: {
      noMajorCycles: '当前没有主要的生命周期激活',
      stablePhase: '稳定期',
      stableDescription: '您处于相对平静的发展期，可以专注于日常的成长和积累。',
      stableThemes: {
        development: '稳定发展',
        skillBuilding: '技能提升',
        foundation: '基础巩固'
      },
      stableAdvice: '利用这段稳定期完善技能，为即将到来的重要周期做准备。',
      unknownCycle: '未知周期',
      phases: {
        early: '初期',
        middle: '中期',
        late: '后期'
      },
      defaultDescription: '正在经历{cycleName}的重要影响。',
      defaultThemes: {
        growth: '个人成长',
        responsibility: '责任承担'
      },
      defaultAdvice: '专注于这个周期带来的成长机会。',
      analysisError: '分析出错',
      unknown: '未知',
      analysisErrorDescription: '无法分析当前生命周期',
      reanalysisNeeded: '需要重新分析',
      retryAdvice: '请稍后重试分析'
    },

    outerPlanets: {
      saturn: {
        name: '土星',
        theme: '责任与结构重建',
        description: '土星正在要求您承担更多责任，建立更稳固的人生结构。虽然可能感到压力，但这是获得长期成就的重要时期。',
        advice: '耐心面对挑战，专注于建立长期基础。避免走捷径，踏实的努力将带来持久的成果。'
      },
      uranus: {
        name: '天王星',
        theme: '突破与革新',
        description: '天王星带来突破和变革的能量。您可能会突然想要改变现状，追求更大的自由和独立。',
        advice: '拥抱变化，但要避免过于冲动。寻找创新的方式解决旧问题，但保持一定的稳定性。'
      },
      neptune: {
        name: '海王星',
        theme: '精神觉醒与直觉',
        description: '海王星增强您的直觉和精神敏感度。这是艺术创作、精神修养和同理心发展的好时期。',
        advice: '信任您的直觉，但保持与现实的连接。避免过度理想化，在精神追求与实际生活间保持平衡。'
      },
      pluto: {
        name: '冥王星',
        theme: '深度转化与重生',
        description: '冥王星带来深层的心理转化。您可能会放下旧的模式，经历内在的死亡与重生。',
        advice: '勇敢面对内在的转化过程。释放不再服务于您的旧模式，拥抱新的自我。'
      },
      mildInfluence: '当前外行星影响相对温和，是稳定发展的时期。',
      analysisError: '外行星分析出现错误',
      themes: {
        peaceful: '平和发展',
        transformation: '深度转化',
        building: '基础建设',
        breakthrough: '突破革新',
        growth: '稳步成长'
      }
    },

    aspects: {
      unknown: '未知',
      applying: '入相',
      separating: '出相',
      defaultDescription: '这个相位正在为您的生活带来重要影响。',
      defaultKeyword: '成长',
      defaultAdvice: '保持开放的心态，积极应对变化。',
      
      saturnConjunction: {
        description: '土星合相带来严肃的责任和挑战，但也是建立坚实基础的时机。',
        keywords: '责任,挑战,基础,成熟',
        advice: '耐心承担责任，专注于长期目标的建立。'
      },
      saturnSquare: {
        description: '土星四分相带来压力和阻碍，需要通过努力和坚持来克服困难。',
        keywords: '压力,阻碍,坚持,成长',
        advice: '面对困难不要退缩，通过努力工作来突破限制。'
      },
      saturnTrine: {
        description: '土星三分相提供稳定的支持，是建立长期计划的好时机。',
        keywords: '稳定,支持,计划,成就',
        advice: '利用这个稳定期制定长远计划，踏实推进目标。'
      },
      saturnOpposition: {
        description: '土星对分相要求在责任与自由之间找到平衡。',
        keywords: '平衡,责任,自由,调整',
        advice: '在承担责任的同时保持个人自由，寻求平衡点。'
      },
      jupiterConjunction: {
        description: '木星合相带来扩展和成长的机会，是追求更高目标的时期。',
        keywords: '扩展,成长,机会,乐观',
        advice: '积极把握成长机会，但要避免过度乐观和冒险。'
      },
      jupiterTrine: {
        description: '木星三分相带来幸运和顺利，是实现目标的良好时机。',
        keywords: '幸运,顺利,成功,信心',
        advice: '抓住有利时机推进计划，但要保持谦逊和感恩。'
      },
      uranusConjunction: {
        description: '天王星合相带来突然的变化和创新的机会。',
        keywords: '变化,创新,突破,自由',
        advice: '拥抱变化和创新，但要避免过于激进的行动。'
      },
      uranusSquare: {
        description: '天王星四分相可能带来意外的变化和不稳定。',
        keywords: '意外,变化,不稳定,适应',
        advice: '保持灵活性，适应突然的变化，但避免冲动决定。'
      },
      neptuneConjunction: {
        description: '海王星合相增强直觉和精神敏感度。',
        keywords: '直觉,精神,创意,梦想',
        advice: '发展精神层面，但保持与现实的连接。'
      },
      neptuneSquare: {
        description: '海王星四分相可能带来混乱和理想与现实的冲突。',
        keywords: '混乱,理想,现实,平衡',
        advice: '在理想与现实之间找到平衡，避免自我欺骗。'
      },
      plutoConjunction: {
        description: '冥王星合相带来深层的心理转化和重生。',
        keywords: '转化,重生,力量,蜕变',
        advice: '勇敢面对内在转化，释放不再需要的旧模式。'
      },
      plutoSquare: {
        description: '冥王星四分相带来强烈的转化压力和权力斗争。',
        keywords: '压力,转化,权力,抗争',
        advice: '以智慧处理权力关系，通过内在转化获得真正力量。'
      }
    },

    lifeCycles: {
      saturnReturn1: {
        title: '第一次土星回归（29-30岁）',
        description: '这是从青年过渡到成年的关键时期。土星回归要求您建立真正的成人责任和人生方向。这可能是一个充满挑战但也充满成长机会的时期。',
        themes: '成人责任,人生定向,基础建立,成熟成长',
        advice: '不要逃避责任，勇敢面对生活的挑战。这段时间的努力将为未来30年奠定基础。'
      },
      jupiterReturn3: {
        title: '第三次木星回归（36岁）',
        description: '木星回归带来扩展和成长的机会。这是重新评估人生目标，寻求更高层次发展的时期。可能会有新的学习机会或国际化发展。',
        themes: '机遇扩展,视野开阔,学习成长,积极进取',
        advice: '保持开放的心态，积极把握成长机会。这是提升自己、扩大影响力的好时期。'
      },
      saturnOpposition: {
        title: '土星对冲（43-45岁）',
        description: '这是人生中期的重要检验期。您需要在已建立的基础上进行调整，平衡责任与自由，传统与创新。这可能是一个重新定向的时期。',
        themes: '中期评估,平衡调整,重新定向,智慧积累',
        advice: '以智慧和耐心面对这个转折期。避免极端的改变，寻求渐进式的调整。'
      }
    },

    lifeGuidance: {
      emotionalAdvice: '保持情感的开放和诚实，与信任的人分享您的感受和困惑。',
      practicalAdvice: '制定具体可行的计划，一步步实现目标。避免过于理想化或急躁。',
      focus: {
        foundation: '专注于建立人生基础，发展技能和建立关系。',
        achievement: '平衡事业发展与家庭责任，追求有意义的成就。',
        wisdom: '分享经验智慧，承担指导角色，关注内在成长。',
        legacy: '关注人生传承，分享智慧给年轻一代，追求精神层面的满足。'
      },
      challenge: {
        specific: '{transitPlanet}{aspect}{natalPlanet}带来的挑战需要您积极面对和解决。',
        peaceful: '当前没有特别明显的挑战相位，是相对平稳的时期。'
      },
      opportunity: {
        specific: '{transitPlanet}{aspect}{natalPlanet}带来良好的发展机会，要积极把握。',
        general: '寻找日常生活中的小机会，积累成长的基础。'
      },
      spiritual: {
        exploration: '探索精神世界，寻找人生意义和价值观。',
        integration: '整合人生经验，在精神追求与现实责任间找到平衡。',
        transcendence: '超越物质追求，关注精神传承和生命意义的思考。'
      },
      fallbackFocus: '专注于当前的稳定发展',
      fallbackChallenge: '克服日常生活中的小困难',
      fallbackOpportunity: '把握身边的成长机会',
      fallbackEmotional: '保持情感平衡',
      fallbackPractical: '注重实际行动',
      fallbackSpiritual: '关注内在成长'
    },

    recommendations: {
      career: {
        focus: '专注于技能提升和专业发展',
        advice: '寻找与您价值观相符的工作机会，平衡工作与生活。',
        timing: '适合在稳定期推进重要的职业计划',
        fallbackFocus: '稳定发展',
        fallbackAdvice: '保持当前状态',
        fallbackTiming: '无特殊要求'
      },
      relationships: {
        focus: '改善沟通质量，加深情感连接',
        advice: '在关系中保持真诚和开放，同时尊重彼此的边界。',
        areas: {
          communication: '沟通交流',
          intimacy: '亲密关系',
          boundaries: '边界设定'
        },
        fallbackFocus: '维护关系',
        fallbackAdvice: '保持良好沟通',
        fallbackArea: '现有关系'
      },
      health: {
        physical: '注意规律作息，保持适度运动和均衡饮食。',
        mental: '学会管理压力，寻找健康的释放方式。',
        emotional: '培养情感表达能力，建立支持系统。',
        fallbackPhysical: '注意健康',
        fallbackMental: '保持心理平衡',
        fallbackEmotional: '情绪稳定'
      },
      personal: {
        priorities: {
          awareness: '自我觉察',
          skills: '技能发展',
          relationships: '关系建设'
        },
        methods: {
          reflection: '反思冥想',
          learning: '持续学习',
          practice: '实践应用'
        },
        fallbackPriority: '个人发展',
        fallbackMethod: '学习成长'
      },
      financial: {
        approach: '采取稳健保守的理财策略',
        advice: '建立应急基金，避免高风险投资。',
        priority: '财务安全和长期规划',
        fallbackApproach: '稳健理财',
        fallbackAdvice: '保持财务稳定',
        fallbackPriority: '风险控制'
      },
      timing: {
        bestTiming: '月相转换期和季节变化时',
        avoidHigh: '避免在高压力时期做重大决定',
        avoidNone: '无特别需要避免的时期',
        keyDates: '关注每月的新月和满月时期，能量变化较为明显',
        fallbackBest: '适时而动',
        fallbackAvoid: '避免冲动',
        fallbackKey: '关注重要时机'
      }
    },

    futureOutlook: {
      next3Months: '未来三个月重点关注当前激活的相位带来的变化，特别是涉及个人成长和关系调整的部分。',
      next6Months: '未来半年是巩固当前变化成果的时期，建议保持耐心，不要急于求成。',
      nextYear: '明年的发展将建立在今年的基础之上，继续深化当前的转化过程。',
      longTerm: {
        foundation: '未来几年将是建立人生基础的重要时期，专注于技能发展和关系建立。',
        development: '进入人生的重要发展期，事业和家庭将是主要关注点。',
        experience: '人生经验的积累期，可以考虑承担更多指导和领导的角色。',
        wisdom: '进入智慧分享期，可以将人生经验传承给年轻一代。'
      },
      fallback3Months: '关注短期变化',
      fallback6Months: '巩固当前成果',
      fallbackYear: '继续稳定发展',
      fallbackLongTerm: '保持长期规划'
    }
  },
  
  // 分享功能翻译
  share: {
    title: '分享结果',
    share: '分享',
    wechat: '微信分享',
    generating: '准备分享中...',
    success: '分享成功！',
    copyLink: '复制链接',
    qq: 'QQ分享',
    weibo: '微博分享',
    email: '邮件分享',
    wechatTip: '请点击右上角「…」按钮进行分享',
    error: '分享失败，请稍后重试'
  },

  // Lesson Page
  lesson: {
    overview: '课程概述',
    objectives: '学习目标',
    objective1: '掌握基本概念和原理',
    objective2: '理解实际应用方法',
    objective3: '能够独立进行分析',
    content: '课程内容',
    example: '示例',
    practice: '练习',
    previous: '上一课',
    next: '下一课',
    notFound: '课程未找到',
    placeholder1: '这里是课程的主要内容。我们将深入探讨相关概念，为您提供全面的理解。',
    placeholder2: '通过实际案例和详细解释，您将学会如何将理论知识应用到实际分析中。',
    placeholder3: '掌握这些知识后，您就能够独立进行相关的占星学分析了。',
    exampleText: '这是一个具体的示例，帮助您更好地理解所学内容。',
    practiceInstruction: '点击下面的按钮开始实际练习，将所学知识应用到真实的命盘分析中。',
    startPractice: '开始练习',
    descriptions: {
      bazi: {
        basics: '了解八字命理学的基本概念、历史背景和应用价值。',
        'heavenly-stems': '学习天干系统，理解十天干的含义和相互关系。',
        'earthly-branches': '掌握地支知识，了解十二地支的特点和应用。',
        'five-elements': '深入学习五行理论，理解五行相生相克的规律。',
        'reading-pillars': '学会如何解读四柱，分析年、月、日、时柱的意义。',
        'interpreting-chart': '掌握完整的八字解释方法和技巧。'
      },
      astrology: {
        introduction: '西方占星学入门，了解占星学的基础知识和历史。',
        'zodiac-signs': '学习十二星座的特征、象征和基本含义。',
        planets: '了解行星在占星学中的作用和影响。',
        houses: '掌握十二宫位系统及其在命盘中的意义。',
        aspects: '学习行星相位的计算和解释方法。',
        'birth-chart': '综合分析出生图的完整方法。'
      },
      reading: {
        preparation: '命盘分析前的准备工作和基础知识。',
        'analysis-method': '系统化的分析方法和步骤。',
        interpretation: '如何正确解读和诠释命盘信息。',
        timing: '时间点分析和预测技巧。',
        synthesis: '综合分析和整体把握的方法。',
        practice: '实践练习和案例分析。'
      }
    },
    
    lessons: {
      bazi: {
        basics: '八字基础',
        'heavenly-stems': '天干详解',
        'earthly-branches': '地支详解',
        'five-elements': '五行理论',
        'reading-pillars': '四柱解读'
      },
      astrology: {
        introduction: '占星入门',
        'zodiac-signs': '十二星座',
        planets: '行星详解',
        houses: '宫位详解',
        aspects: '相位详解'
      },
      reading: {
        preparation: '解读准备',
        'analysis-method': '分析方法'
      }
    },

    // Detailed lesson content
    lessonContent: {
      common: {
        overview: '课程概述',
        objectives: '学习目标',
        practice: '练习思考',
        navigation: '课程导航',
        previous: '上一课',
        next: '下一课',
        startPractice: '开始练习',
        testMyAttributes: '测试我的属性'
      },
      
      baziHeavenlyStems: {
        title: '天干详解',
        breadcrumb: '天干详解',
        intro: '天干是八字命理学的核心要素之一，由十个符号组成，代表着不同的能量属性和特质。深入理解天干的含义对于准确分析八字至关重要。',
        objectives: {
          obj1: '掌握十天干的基本含义和属性',
          obj2: '理解天干的阴阳配对关系',
          obj3: '学会天干的五行分类和特性',
          obj4: '了解天干在命理分析中的作用'
        },
        overview: {
          title: '十天干概览',
          description: '天干共有十个：甲、乙、丙、丁、戊、己、庚、辛、壬、癸。每两个天干为一组，分别代表阳性和阴性能量。',
          stems: {
            wood: '甲乙 - 木',
            fire: '丙丁 - 火',
            earth: '戊己 - 土',
            metal: '庚辛 - 金',
            water: '壬癸 - 水'
          }
        },
        detailed: {
          title: '天干详解',
          jia: {
            name: '甲 - 阳木',
            element: '木',
            symbolLabel: '象征',
            symbol: '参天大树、栋梁之材',
            traitsLabel: '特质',
            traits: '刚直、有原则、领导力强、不易弯曲',
            personalityLabel: '性格',
            personality: '积极主动、富有正义感、喜欢直来直往',
            careerLabel: '职业倾向',
            career: '管理者、企业家、法官、教师'
          },
          yi: {
            name: '乙 - 阴木',
            element: '木',
            symbolLabel: '象征',
            symbol: '花草藤蔓、柔韧之物',
            traitsLabel: '特质',
            traits: '柔韧、适应性强、善于变通',
            personalityLabel: '性格',
            personality: '温和细腻、富有同情心、擅长沟通',
            careerLabel: '职业倾向',
            career: '艺术家、咨询师、护士、园艺师'
          },
          bing: {
            name: '丙 - 阳火',
            element: '火',
            symbolLabel: '象征',
            symbol: '太阳、熊熊烈火',
            traitsLabel: '特质',
            traits: '热情奔放、光明磊落、影响力强',
            personalityLabel: '性格',
            personality: '乐观开朗、具有感染力、喜欢成为焦点',
            careerLabel: '职业倾向',
            career: '演员、主持人、销售、政治家'
          },
          ding: {
            name: '丁 - 阴火',
            element: '火',
            symbolLabel: '象征',
            symbol: '烛光、炉火',
            traitsLabel: '特质',
            traits: '温暖细致、持续稳定、照亮他人',
            personalityLabel: '性格',
            personality: '体贴入微、富有耐心、善于照顾他人',
            careerLabel: '职业倾向',
            career: '医生、厨师、设计师、心理咨询师'
          },
          wu: {
            name: '戊 - 阳土',
            element: '土',
            symbolLabel: '象征',
            symbol: '高山、城墙',
            traitsLabel: '特质',
            traits: '稳重可靠、包容性强、防御力佳',
            personalityLabel: '性格',
            personality: '踏实稳重、责任感强、值得信赖',
            careerLabel: '职业倾向',
            career: '建筑师、工程师、银行家、保安'
          },
          ji: {
            name: '己 - 阴土',
            element: '土',
            symbolLabel: '象征',
            symbol: '田园、沃土',
            traitsLabel: '特质',
            traits: '滋养万物、默默奉献、包容宽厚',
            personalityLabel: '性格',
            personality: '温和包容、乐于助人、重视家庭',
            careerLabel: '职业倾向',
            career: '农业、服务业、社工、会计'
          },
          geng: {
            name: '庚 - 阳金',
            element: '金',
            symbolLabel: '象征',
            symbol: '刀剑、钢铁',
            traitsLabel: '特质',
            traits: '坚硬锋利、杀伐决断、正义凛然',
            personalityLabel: '性格',
            personality: '刚毅果断、不畏艰难、具有正义感',
            careerLabel: '职业倾向',
            career: '军人、警察、外科医生、律师'
          },
          xin: {
            name: '辛 - 阴金',
            element: '金',
            symbolLabel: '象征',
            symbol: '珠宝、精金',
            traitsLabel: '特质',
            traits: '精致优雅、品质高贵、追求完美',
            personalityLabel: '性格',
            personality: '精致细腻、审美品味高、追求精工细作',
            careerLabel: '职业倾向',
            career: '珠宝设计师、艺术品鉴定、精密仪器'
          },
          ren: {
            name: '壬 - 阳水',
            element: '水',
            symbolLabel: '象征',
            symbol: '江河湖海、汹涌波涛',
            traitsLabel: '特质',
            traits: '流动变化、包容万物、适应性强',
            personalityLabel: '性格',
            personality: '灵活机智、善于变通、具有冒险精神',
            careerLabel: '职业倾向',
            career: '外贸、旅游、航海、媒体'
          },
          gui: {
            name: '癸 - 阴水',
            element: '水',
            symbolLabel: '象征',
            symbol: '雨露、甘泉',
            traitsLabel: '特质',
            traits: '滋润万物、细致入微、默默奉献',
            personalityLabel: '性格',
            personality: '细心体贴、直觉敏锐、富有同情心',
            careerLabel: '职业倾向',
            career: '研究员、心理学家、护理、文学创作'
          }
        },
        combinations: {
          title: '天干相合',
          description: '天干之间存在相合关系，相合代表和谐、合作、化解矛盾。',
          list: {
            jiaji: {combo: '甲己合', result: '化土', meaning: '代表仁义结合，刚柔并济'},
            yigeng: {combo: '乙庚合', result: '化金', meaning: '代表仁义与威严的结合'},
            bingxin: {combo: '丙辛合', result: '化水', meaning: '代表礼仪与正义的结合'},
            dingren: {combo: '丁壬合', result: '化木', meaning: '代表礼仪与智慧的结合'},
            wugui: {combo: '戊癸合', result: '化火', meaning: '代表信义与智慧的结合'}
          }
        },
        application: {
          title: '实际应用',
          subtitle: '在八字分析中的运用',
          points: {
            dayMaster: {
              title: '日主分析',
              description: '日干代表本人，通过分析日干属性了解基本性格'
            },
            tenGods: {
              title: '十神关系',
              description: '其他天干与日干的关系形成十神，反映人生各个方面'
            },
            pattern: {
              title: '格局判断',
              description: '天干组合影响八字格局的高低'
            },
            luck: {
              title: '大运流年',
              description: '大运和流年的天干与命局天干的作用关系'
            }
          }
        },
        metaDescription: '深入学习十天干的含义、属性和特质，掌握八字命理学的核心要素。',
        practice: {
          question: '观察您身边的人，尝试根据他们的性格特质猜测其日干可能是什么？',
          button: '测试我的天干属性'
        }
      },

      // Bazi lesson content
      baziBasics: {
        title: '八字基础入门',
        breadcrumb: '八字基础',
        intro: '八字命理学是中华传统文化的重要组成部分，通过分析个人出生时的年月日时，揭示生命的基本规律和发展趋势。',
        metaDescription: '学习八字命理学基础知识，了解天干地支系统和五行理论，开始您的八字学习之旅。',
        objectives: {
          obj1: '了解八字命理学的基本概念和历史渊源',
          obj2: '掌握年月日时四柱的构成和意义',
          obj3: '理解天干地支的基本概念',
          obj4: '学会八字排盘的基本方法'
        },
        sections: {
          whatIsBazi: {
            title: '什么是八字？',
            description: '八字，又称"四柱八字"，是根据一个人出生的年、月、日、时，各用天干、地支配对来表示，共八个字，因此称为"八字"。',
            composition: {
              title: '八字的构成',
              year: '年柱',
              yearDesc: '出生年份的天干地支',
              month: '月柱',
              monthDesc: '出生月份的天干地支',
              day: '日柱',
              dayDesc: '出生日期的天干地支',
              hour: '时柱',
              hourDesc: '出生时辰的天干地支'
            }
          },
          stemsBranches: {
            title: '天干地支系统',
            description: '天干地支是中国古代的纪年、纪月、纪日、纪时系统，也是八字命理学的基础。',
            heavenlyStems: {
              title: '十天干',
              sequence: '甲、乙、丙、丁、戊、己、庚、辛、壬、癸',
              wood: '甲乙属木（甲为阳木，乙为阴木）',
              fire: '丙丁属火（丙为阳火，丁为阴火）',
              earth: '戊己属土（戊为阳土，己为阴土）',
              metal: '庚辛属金（庚为阳金，辛为阴金）',
              water: '壬癸属水（壬为阳水，癸为阴水）'
            },
            earthlyBranches: {
              title: '十二地支',
              sequence: '子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥',
              water: '子、亥属水',
              wood: '寅、卯属木',
              fire: '巳、午属火',
              metal: '申、酉属金',
              earth: '辰、戌、丑、未属土'
            }
          },
          fiveElements: {
            title: '五行理论',
            description: '五行（木、火、土、金、水）是八字分析的核心理论，描述了事物之间的相互关系。',
            elements: {
              wood: {
                name: '木',
                traits: '代表生长、向上、仁慈',
                associations: '春季、东方、青色'
              },
              fire: {
                name: '火',
                traits: '代表温热、向上、礼智',
                associations: '夏季、南方、红色'
              },
              earth: {
                name: '土',
                traits: '代表包容、稳定、诚信',
                associations: '长夏、中央、黄色'
              },
              metal: {
                name: '金',
                traits: '代表收敛、肃杀、义气',
                associations: '秋季、西方、白色'
              },
              water: {
                name: '水',
                traits: '代表寒冷、向下、智慧',
                associations: '冬季、北方、黑色'
              }
            },
            relationships: {
              title: '五行关系',
              generating: '相生',
              generatingCycle: '木生火、火生土、土生金、金生水、水生木',
              overcoming: '相克',
              overcomingCycle: '木克土、土克水、水克火、火克金、金克木'
            }
          },
          example: {
            title: '实例分析',
            caseTitle: '例：1990年3月15日上午10点出生',
            table: {
              year: '年柱',
              month: '月柱',
              day: '日柱',
              hour: '时柱'
            },
            analysisTitle: '简单分析',
            analysisContent: '日主甲木生于卯月得时令之气，但年柱庚金、时干己土对甲木形成压力，需要通过详细分析来判断八字的强弱和喜用神。'
          }
        },
        practice: {
          question: '请尝试排出自己的生辰八字，看看您对四柱的理解程度如何？',
          button: '开始八字分析'
        }
      },
        overview: {
          title: '天干概述',
          description: '十天干是：甲、乙、丙、丁、戊、己、庚、辛、壬、癸。它们按照五行分类，每个五行包含阴阳两个天干。',
          stems: {
            wood: '木',
            fire: '火',
            earth: '土',
            metal: '金',
            water: '水'
          }
        },
        detailed: {
          title: '天干详解',
          jia: {
            name: '甲木',
            element: '阳木',
            symbolLabel: '象征',
            symbol: '大树、栋梁',
            traitsLabel: '特质',
            traits: '刚直、向上、有担当',
            personalityLabel: '性格特点',
            personality: '甲木如参天大树，具有向上生长的强烈意志。性格刚直不阿，有领导能力和开拓精神。',
            careerLabel: '适合职业',
            career: '适合从事管理、创业、教育等需要权威和领导力的工作'
          },
          yi: {
            name: '乙木',
            element: '阴木',
            symbolLabel: '象征',
            symbol: '花草、藤蔓',
            traitsLabel: '特质',
            traits: '柔韧、灵活、适应性强',
            personalityLabel: '性格特点',
            personality: '乙木如柔韧的藤蔓，具有灵活适应的能力。性格温和，善于变通，人际关系和谐。',
            careerLabel: '适合职业',
            career: '适合从事艺术、设计、服务、外交等需要细腻和灵活性的工作'
          },
          bing: {
            name: '丙火',
            element: '阳火',
            symbolLabel: '象征',
            symbol: '太阳、阳光',
            traitsLabel: '特质',
            traits: '热情、光明、有感染力',
            personalityLabel: '性格特点',
            personality: '丙火如太阳般光明磊落，具有温暖他人的能力。性格开朗活泼，富有感染力。',
            careerLabel: '适合职业',
            career: '适合从事娱乐、销售、公关、演讲等需要热情和表现力的工作'
          },
          ding: {
            name: '丁火',
            element: '阴火',
            symbolLabel: '象征',
            symbol: '灯火、烛光',
            traitsLabel: '特质',
            traits: '温和、持久、细腻',
            personalityLabel: '性格特点',
            personality: '丁火如温暖的烛光，虽然不如丙火炽热，但更持久稳定。性格细腻，富有同情心。',
            careerLabel: '适合职业',
            career: '适合从事医疗、护理、咨询、文学等需要细心和同理心的工作'
          },
          wu: {
            name: '戊土',
            element: '阳土',
            symbolLabel: '象征',
            symbol: '高山、城墙',
            traitsLabel: '特质',
            traits: '稳重、承载、责任感强',
            personalityLabel: '性格特点',
            personality: '戊土如稳重的高山，具有承载万物的能力。性格踏实可靠，有强烈的责任感。',
            careerLabel: '适合职业',
            career: '适合从事建筑、房地产、农业、金融等需要稳定和积累的工作'
          },
          ji: {
            name: '己土',
            element: '阴土',
            symbolLabel: '象征',
            symbol: '田园、沃土',
            traitsLabel: '特质',
            traits: '包容、滋养、协调能力强',
            personalityLabel: '性格特点',
            personality: '己土如肥沃的田园，具有滋养万物的能力。性格温和包容，善于协调。',
            careerLabel: '适合职业',
            career: '适合从事教育、培训、服务、农业等需要培育和服务的工作'
          },
          geng: {
            name: '庚金',
            element: '阳金',
            symbolLabel: '象征',
            symbol: '钢铁、刀剑',
            traitsLabel: '特质',
            traits: '果断、刚毅、行动力强',
            personalityLabel: '性格特点',
            personality: '庚金如锋利的刀剑，具有强烈的杀伐决断能力。性格刚毅果断，行动力强。',
            careerLabel: '适合职业',
            career: '适合从事军警、法律、外科、机械等需要果断和精准的工作'
          },
          xin: {
            name: '辛金',
            element: '阴金',
            symbolLabel: '象征',
            symbol: '珠宝、首饰',
            traitsLabel: '特质',
            traits: '精致、美感、注重细节',
            personalityLabel: '性格特点',
            personality: '辛金如精美的珠宝，具有精致和美感。性格细腻，注重品质和美观。',
            careerLabel: '适合职业',
            career: '适合从事珠宝、美容、设计、精密制造等需要精致和美感的工作'
          },
          ren: {
            name: '壬水',
            element: '阳水',
            symbolLabel: '象征',
            symbol: '江河、大海',
            traitsLabel: '特质',
            traits: '豁达、流动、适应性强',
            personalityLabel: '性格特点',
            personality: '壬水如奔腾的江河，具有强大的流动性和包容性。性格豁达，适应能力强。',
            careerLabel: '适合职业',
            career: '适合从事贸易、运输、旅游、媒体等需要流动和沟通的工作'
          },
          gui: {
            name: '癸水',
            element: '阴水',
            symbolLabel: '象征',
            symbol: '雨露、甘泉',
            traitsLabel: '特质',
            traits: '内敛、智慧、直觉敏锐',
            personalityLabel: '性格特点',
            personality: '癸水如温润的雨露，具有滋润万物的能力。性格内敛，富有智慧和直觉。',
            careerLabel: '适合职业',
            career: '适合从事研究、咨询、写作、心理等需要思考和洞察的工作'
          }
        },
        combinations: {
          title: '天干合化',
          description: '天干之间存在特殊的组合关系，称为"天干五合"，这些组合在命理分析中具有重要意义。',
          list: {
            jiaji: {
              combo: '甲己合',
              result: '化土',
              meaning: '代表诚信、稳重的结合'
            },
            yigeng: {
              combo: '乙庚合',
              result: '化金',
              meaning: '代表仁义、刚柔并济的结合'
            },
            bingxin: {
              combo: '丙辛合',
              result: '化水',
              meaning: '代表威严、智慧的结合'
            },
            dingren: {
              combo: '丁壬合',
              result: '化木',
              meaning: '代表仁慈、温和的结合'
            },
            wugui: {
              combo: '戊癸合',
              result: '化火',
              meaning: '代表礼智、光明的结合'
            }
          }
        },
        application: {
          title: '实际应用',
          subtitle: '八字分析中的运用',
          points: {
            dayMaster: {
              title: '日主分析',
              description: '日干代表本人，通过分析日干的属性来了解基本性格'
            },
            tenGods: {
              title: '十神关系',
              description: '其他天干与日干的关系形成十神，反映人生各个方面'
            },
            pattern: {
              title: '格局判断',
              description: '天干的组合影响八字格局的高低'
            },
            luck: {
              title: '大运流年',
              description: '大运和流年的天干与命局天干的作用关系'
            }
          }
        },
        practice: {
          question: '请观察您的八字中的天干配置，思考每个天干的特质如何影响您的性格？',
          button: '分析我的天干配置'
        }
      },

      baziEarthlyBranches: {
        title: '地支详解',
        breadcrumb: '地支详解', 
        metaDescription: '深入学习十二地支的含义、生肖对应和相互关系，掌握地支藏干等重要概念。',
        intro: '地支是八字命理学中与天干相配的另一套符号系统，共十二个，与十二生肖对应，代表着不同的时间周期和能量特质。',
        objectives: {
          obj1: '掌握十二地支的基本含义和属性',
          obj2: '理解地支与生肖的对应关系',
          obj3: '学会地支的刑冲害合关系',
          obj4: '了解地支在命理分析中的作用'
        },
        overview: {
          title: '地支总览',
          intro: '十二地支按照顺时针方向排列，对应十二个时辰和十二生肖，形成完整的时间和空间体系。'
        },
        classification: {
          title: '地支五行分类',
          water: {
            title: '水：子、亥',
            desc: '子为阳水，亥为阴水，代表冬季和北方方位'
          },
          wood: {
            title: '木：寅、卯',
            desc: '寅为阳木，卯为阴木，代表春季和东方方位'
          },
          fire: {
            title: '火：巳、午',
            desc: '巳为阴火，午为阳火，代表夏季和南方方位'
          },
          metal: {
            title: '金：申、酉',
            desc: '申为阳金，酉为阴金，代表秋季和西方方位'
          },
          earth: {
            title: '土：辰、戌、丑、未',
            desc: '四个土支分别代表四季末月，具有收藏和转换的作用'
          }
        },
        detailed: {
          title: '十二地支详解',
          common: {
            timeLabel: '时间',
            seasonLabel: '季节', 
            traitsLabel: '特质',
            hiddenLabel: '藏干'
          },
          zi: {
            title: '子 - 鼠 (水)',
            time: '子时（23:00-1:00）',
            season: '冬季中期，水旺之时',
            traits: '机智灵活、善于钻营、适应性强',
            hidden: '癸水'
          },
          chou: {
            title: '丑 - 牛 (土)',
            time: '丑时（1:00-3:00）',
            season: '冬季末期，土库之地', 
            traits: '勤劳踏实、坚韧不拔、包容性强',
            hidden: '己土、癸水、辛金'
          },
          yin: {
            title: '寅 - 虎 (木)',
            time: '寅时（3:00-5:00）',
            season: '春季初期，木气萌动',
            traits: '勇猛果敢、领导力强、正义感强',
            hidden: '甲木、丙火、戊土'
          },
          mao: {
            title: '卯 - 兔 (木)',
            time: '卯时（5:00-7:00）',
            season: '春季中期，木气最旺',
            traits: '温和细腻、善于交际、审美能力强',
            hidden: '乙木'
          },
          chen: {
            title: '辰 - 龙 (土)',
            time: '辰时（7:00-9:00）',
            season: '春季末期，水库之地',
            traits: '聪明睿智、变化多端、具有权威',
            hidden: '戊土、乙木、癸水'
          },
          si: {
            title: '巳 - 蛇 (火)',
            time: '巳时（9:00-11:00）',
            season: '夏季初期，火气渐旺',
            traits: '智慧深邃、神秘莫测、直觉敏锐',
            hidden: '丙火、戊土、庚金'
          },
          wu: {
            title: '午 - 马 (火)',
            time: '午时（11:00-13:00）',
            season: '夏季中期，火气最旺',
            traits: '热情奔放、行动迅速、不拘小节',
            hidden: '丁火、己土'
          },
          wei: {
            title: '未 - 羊 (土)',
            time: '未时（13:00-15:00）',
            season: '夏季末期，木库之地',
            traits: '温和善良、富有同情心、艺术天赋',
            hidden: '己土、丁火、乙木'
          },
          shen: {
            title: '申 - 猴 (金)',
            time: '申时（15:00-17:00）',
            season: '秋季初期，金气渐旺',
            traits: '聪明机智、多才多艺、善于变通',
            hidden: '庚金、壬水、戊土'
          },
          you: {
            title: '酉 - 鸡 (金)',
            time: '酉时（17:00-19:00）',
            season: '秋季中期，金气最旺',
            traits: '勤奋守时、注重细节、完美主义',
            hidden: '辛金'
          },
          xu: {
            title: '戌 - 狗 (土)',
            time: '戌时（19:00-21:00）',
            season: '秋季末期，火库之地',
            traits: '忠诚可靠、正义感强、责任心重',
            hidden: '戊土、辛金、丁火'
          },
          hai: {
            title: '亥 - 猪 (水)',
            time: '亥时（21:00-23:00）',
            season: '冬季初期，水气渐旺',
            traits: '纯朴善良、宽容大度、富有智慧',
            hidden: '壬水、甲木'
          }
        },
        relationships: {
          title: '地支关系',
          sixHarmony: {
            title: '六合',
            desc: '六合代表和谐相合的关系，有助于增强彼此的力量。',
            combinations: {
              zichou: '子丑合土',
              yinhai: '寅亥合木',
              maoxu: '卯戌合火',
              chenyou: '辰酉合金',
              sishen: '巳申合水',
              wuwei: '午未合土'
            }
          },
          triad: {
            title: '三合',
            desc: '三合局是三个地支组成的强力组合，形成特定五行的强化。',
            combinations: {
              shuiju: {
                name: '申子辰',
                result: '合水局'
              },
              huoju: {
                name: '寅午戌', 
                result: '合火局'
              },
              jinju: {
                name: '巳酉丑',
                result: '合金局'
              },
              muju: {
                name: '亥卯未',
                result: '合木局'
              }
            }
          },
          clash: {
            title: '相冲',
            desc: '相冲表示对立冲突的关系，会产生动荡和变化。',
            combinations: {
              ziwu: '子午冲',
              chouwei: '丑未冲',
              yinshen: '寅申冲',
              maoyou: '卯酉冲',
              chenxu: '辰戌冲',
              sihai: '巳亥冲'
            }
          },
          punishment: {
            title: '相刑',
            desc: '相刑表示相互制约和惩罚的关系，需要特别注意。',
            types: {
              wuli: '子卯刑 - 无礼之刑',
              wuen: '寅巳申刑 - 无恩之刑',
              shishi: '丑戌未刑 - 恃势之刑',
              zixing: '辰午酉亥自刑 - 自刑'
            }
          }
        },
        hiddenStems: {
          title: '地支藏干',
          intro: '每个地支内部都藏有天干，这些藏干在八字分析中起着重要作用。',
          table: {
            branch: '地支',
            primary: '本气',
            middle: '中气',
            residue: '余气'
          }
        },
        practice: {
          question: '观察十二生肖的特点，思考它们与对应地支的能量特质有什么联系？',
          button: '测试我的地支属性'
        }
      },

      baziFiveElements: {
        title: '五行理论深度解析',
        breadcrumb: '五行理论',
        metaDescription: '五行理论的核心概念、相生相克规律、旺衰强弱判断方法深度学习，掌握八字命理分析的理论基础。',
        intro: '五行理论是八字命理学的理论基础，通过金木水火土五个基本元素的相互作用，揭示万物运行的规律。',
        objectives: {
          obj1: '深入理解五行的基本含义和属性',
          obj2: '掌握五行相生相克的规律',
          obj3: '学会判断五行的旺衰强弱',
          obj4: '了解五行在命理分析中的核心作用'
        },
        philosophy: {
          title: '五行哲学基础',
          intro: '五行理论不仅是一个分类系统，更是一套完整的哲学思想体系。',
          cards: {
            cosmic: {
              title: '🌌 宇宙观',
              content: '五行代表了宇宙运行的基本规律，体现了中国古代"天人合一"的哲学思想，认为人与自然界遵循同样的运行法则。'
            },
            balance: {
              title: '🔄 动态平衡',
              content: '五行不是静态的分类，而是动态的相互作用系统。健康的状态来自于五行之间的动态平衡，而非绝对的平等。'
            },
            unity: {
              title: '⚖️ 对立统一',
              content: '每个五行都有其对立面，相克关系体现了制约和平衡，相生关系体现了促进和发展，两者缺一不可。'
            }
          }
        },
        detailed: {
          title: '五行详解',
          elements: {
            wood: {
              title: '木 - 生长之力',
              season: '春季 | 东方 | 青色',
              characteristics: {
                title: '基本特性',
                traits: {
                  upward: '向上性：具有向上、向外延伸的特性',
                  growth: '生长性：代表生命力、发展、扩张',
                  flexibility: '柔韧性：能屈能伸，适应环境变化',
                  freedom: '条达性：喜欢自由舒展，不受束缚'
                }
              },
              correspondences: {
                title: '对应关系',
                body: {
                  title: '人体',
                  content: '肝胆、眼睛、筋脉、指甲'
                },
                emotion: {
                  title: '情志',
                  content: '怒、仁慈、计划、创新'
                },
                personality: {
                  title: '性格',
                  content: '仁慈、正直、有条理、进取'
                },
                career: {
                  title: '职业',
                  content: '教育、环保、农林、设计'
                }
              },
              states: {
                title: '旺衰状态',
                strong: {
                  title: '木旺时',
                  content: '积极进取、创新能力强、有领导力、富有同情心、计划性强'
                },
                weak: {
                  title: '木弱时',
                  content: '优柔寡断、缺乏自信、计划性差、容易被他人影响'
                },
                excess: {
                  title: '木过旺',
                  content: '固执己见、急躁易怒、过分理想化、不切实际'
                }
              }
            },
            fire: {
              title: '火 - 温热之力',
              season: '夏季 | 南方 | 红色',
              characteristics: {
                title: '基本特性',
                traits: {
                  upward: '炎上性：具有向上升腾的特性',
                  warm: '温热性：温暖、光明、活跃',
                  civilized: '文明性：代表文化、礼仪、智慧',
                  changing: '变化性：快速变化、转化能力强'
                }
              },
              correspondences: {
                title: '对应关系',
                body: {
                  title: '人体',
                  content: '心脏、小肠、血液、舌头'
                },
                emotion: {
                  title: '情志',
                  content: '喜、礼仪、表达、热情'
                },
                personality: {
                  title: '性格',
                  content: '热情、开朗、有礼貌、善表达'
                },
                career: {
                  title: '职业',
                  content: '表演、媒体、外交、销售'
                }
              },
              states: {
                title: '旺衰状态',
                strong: {
                  title: '火旺时',
                  content: '热情洋溢、善于表达、有感染力、聪明机智、善交际'
                },
                weak: {
                  title: '火弱时',
                  content: '沉默寡言、缺乏热情、表达能力差、内向害羞'
                },
                excess: {
                  title: '火过旺',
                  content: '急躁冲动、口舌是非、虚荣心强、缺乏耐心'
                }
              }
            },
            earth: {
              title: '土 - 承载之力',
              season: '长夏 | 中央 | 黄色',
              characteristics: {
                title: '基本特性',
                traits: {
                  bearing: '承载性：包容万物，承载一切',
                  generating: '生化性：孕育生命，化生万物',
                  stable: '稳定性：踏实稳重，可靠持久',
                  balanced: '中和性：居中调和，平衡各方'
                }
              },
              correspondences: {
                title: '对应关系',
                body: {
                  title: '人体',
                  content: '脾胃、肌肉、口唇、四肢'
                },
                emotion: {
                  title: '情志',
                  content: '思、信任、稳重、包容'
                },
                personality: {
                  title: '性格',
                  content: '诚实、可靠、务实、谨慎'
                },
                career: {
                  title: '职业',
                  content: '农业、建筑、管理、服务'
                }
              },
              states: {
                title: '旺衰状态',
                strong: {
                  title: '土旺时',
                  content: '诚实守信、责任感强、踏实稳重、包容性强、执行力佳'
                },
                weak: {
                  title: '土弱时',
                  content: '缺乏自信、犹豫不决、依赖性强、缺乏主见'
                },
                excess: {
                  title: '土过旺',
                  content: '固执保守、行动迟缓、过于谨慎、缺乏变通'
                }
              }
            },
            metal: {
              title: '金 - 收敛之力',
              season: '秋季 | 西方 | 白色',
              characteristics: {
                title: '基本特性',
                traits: {
                  converging: '收敛性：具有收缩、凝聚的特性',
                  stern: '肃杀性：严肃、威严、有杀伐决断',
                  hard: '坚硬性：坚固、持久、不易变形',
                  clean: '清洁性：纯净、清晰、有序'
                }
              },
              correspondences: {
                title: '对应关系',
                body: {
                  title: '人体',
                  content: '肺、大肠、皮肤、鼻子'
                },
                emotion: {
                  title: '情志',
                  content: '悲、义气、决断、严谨'
                },
                personality: {
                  title: '性格',
                  content: '正义、果断、有条理、追求完美'
                },
                career: {
                  title: '职业',
                  content: '军警、法律、金融、精密仪器'
                }
              },
              states: {
                title: '旺衰状态',
                strong: {
                  title: '金旺时',
                  content: '果断决绝、正义感强、组织能力佳、追求完美、执行力强'
                },
                weak: {
                  title: '金弱时',
                  content: '优柔寡断、缺乏原则、意志薄弱、容易妥协'
                },
                excess: {
                  title: '金过旺',
                  content: '过于严厉、缺乏温情、过分苛求、不近人情'
                }
              }
            },
            water: {
              title: '水 - 润下之力',
              season: '冬季 | 北方 | 黑色',
              characteristics: {
                title: '基本特性',
                traits: {
                  flowing: '润下性：向下流动，滋润万物',
                  cool: '寒凉性：冷静、沉静、深沉',
                  flexible: '流动性：变化无常，适应性强',
                  wise: '智慧性：聪明、机智、善思考'
                }
              },
              correspondences: {
                title: '对应关系',
                body: {
                  title: '人体',
                  content: '肾、膀胱、骨骼、耳朵'
                },
                emotion: {
                  title: '情志',
                  content: '恐、智慧、深思、内敛'
                },
                personality: {
                  title: '性格',
                  content: '聪明、深沉、灵活、有智慧'
                },
                career: {
                  title: '职业',
                  content: '研究、技术、贸易、运输'
                }
              },
              states: {
                title: '旺衰状态',
                strong: {
                  title: '水旺时',
                  content: '聪明机智、适应力强、善于变通、深谋远虑、学习能力强'
                },
                weak: {
                  title: '水弱时',
                  content: '记忆力差、缺乏智慧、学习困难、缺乏灵活性'
                },
                excess: {
                  title: '水过旺',
                  content: '过于圆滑、缺乏原则、多疑善变、不够踏实'
                }
              }
            }
          }
        },
        relationships: {
          title: '五行关系网络',
          generation: {
            title: '🌱 相生关系 - 促进发展',
            intro: '相生关系体现了事物之间的相互促进和支持，就像母亲滋养孩子一样。',
            cycles: {
              woodFire: {
                title: '木生火',
                explanation: '木材燃烧生火，代表创意激发热情，计划产生行动'
              },
              fireEarth: {
                title: '火生土',
                explanation: '火烧成灰归于土，代表热情转化为务实，理想落地执行'
              },
              earthMetal: {
                title: '土生金',
                explanation: '土中蕴藏金属，代表积累产生价值，努力获得成果'
              },
              metalWater: {
                title: '金生水',
                explanation: '金属凝露成水，代表规则产生智慧，结构孕育灵活'
              },
              waterWood: {
                title: '水生木',
                explanation: '水滋润树木成长，代表智慧启发创新，思考促进发展'
              }
            }
          },
          destruction: {
            title: '⚔️ 相克关系 - 制约平衡',
            intro: '相克关系体现了事物之间的相互制约和控制，维持系统的平衡和秩序。',
            conflicts: {
              woodEarth: {
                title: '木克土',
                explanation: '树根破土而出，代表创新打破保守，发展克服停滞'
              },
              earthWater: {
                title: '土克水',
                explanation: '土能吸水掩水，代表稳定控制变化，踏实克服浮躁'
              },
              waterFire: {
                title: '水克火',
                explanation: '水能灭火，代表冷静控制冲动，理智克服感情用事'
              },
              fireMetal: {
                title: '火克金',
                explanation: '火能熔金，代表热情化解严厉，温暖克服冷硬'
              },
              metalWood: {
                title: '金克木',
                explanation: '金能伐木，代表规则约束自由，纪律克服散漫'
              }
            }
          }
        },
        strength: {
          title: '五行强弱判断',
          factors: {
            title: '📊 影响因素',
            season: {
              title: '🕰️ 季节时令',
              content: '春季木旺、夏季火旺、长夏土旺、秋季金旺、冬季水旺',
              example: '春天出生的人，木气较旺，容易表现出木的特质'
            },
            quantity: {
              title: '🎯 数量多少',
              content: '八字中某五行出现的次数越多，通常该五行越旺',
              example: '八字中有3个金，金气偏旺'
            },
            support: {
              title: '🤝 生助力量',
              content: '受到相生五行的支持，力量会增强',
              example: '木遇水生，木气增强'
            },
            restraint: {
              title: '⚡ 克制程度',
              content: '受到相克五行的制约，力量会减弱',
              example: '木遇金克，木气减弱'
            },
            root: {
              title: '🌿 根基深浅',
              content: '在地支中是否有根，影响五行的稳定性',
              example: '甲木遇寅木，有根则稳固'
            },
            combination: {
              title: '🔄 组合关系',
              content: '与其他干支的组合会影响五行力量',
              example: '甲己合化土，木性转变'
            }
          },
          balance: {
            title: '⚖️ 平衡状态分析',
            types: {
              ideal: {
                title: '🌈 理想平衡',
                feature: '五行搭配合理，相生有序，相克有制',
                performance: '性格全面发展，各方面能力均衡',
                advantage: '适应性强，发展潜力大'
              },
              excess: {
                title: '📈 某行过旺',
                feature: '某一五行力量过强，缺乏制约',
                performance: '相关特质过于突出，可能偏执',
                adjustment: '需要相克五行来制衡'
              },
              deficient: {
                title: '📉 某行过弱',
                feature: '某一五行力量不足，缺乏表现',
                performance: '相关能力欠缺，发展受限',
                remedy: '需要相生五行来扶助'
              },
              specialized: {
                title: '🎯 专业化格局',
                feature: '某些五行明显偏强或偏弱，形成特殊格局',
                performance: '在特定领域有突出才能',
                development: '适合专业化发展道路'
              }
            }
          }
        },
        application: {
          title: '实战应用技巧',
          analysis: {
            title: '🔍 分析步骤',
            steps: {
              count: {
                title: '统计数量',
                content: '数出八字中各五行出现的次数'
              },
              season: {
                title: '判断时令',
                content: '根据出生季节确定当旺五行'
              },
              generation: {
                title: '分析相生',
                content: '查看各五行的相互扶助关系'
              },
              destruction: {
                title: '考虑相克',
                content: '评估相互制约的影响程度'
              },
              conclusion: {
                title: '综合判断',
                content: '得出五行强弱的最终结论'
              }
            }
          },
          harmony: {
            title: '💡 调和方法',
            remedies: {
              title: '🌿 五行补救',
              methods: {
                color: '颜色调节：穿戴相应五行的颜色',
                direction: '方位选择：居住工作在有利方位',
                career: '职业选择：从事对应五行的行业',
                diet: '饮食调理：选择相应五行的食物'
              }
            },
            environment: {
              title: '🏠 环境布局',
              methods: {
                furniture: '家居布置：根据五行配置家具',
                plants: '植物选择：种植对应五行的植物',
                decoration: '装饰搭配：使用有利五行的装饰品',
                function: '房间功能：合理安排各房间用途'
              }
            },
            relationships: {
              title: '👥 人际关系',
              methods: {
                partnership: '合作伙伴：选择五行互补的人合作',
                friends: '交友圈子：与有利五行的人多交往',
                mentorship: '师傅学习：向五行互补的老师学习',
                marriage: '婚姻匹配：考虑双方五行的搭配'
              }
            }
          }
        },
        practice: {
          title: '五行分析实践',
          question: '现在让我们将五行理论应用到实际分析中，深入了解您的五行构成和平衡状态！',
          button: '分析我的五行平衡'
        },
        navigation: {
          previous: '上一课：地支详解',
          next: '下一课：四柱解读'
        }
      },

      baziReadingPillars: {
        title: '四柱解读技巧',
        breadcrumb: '四柱解读',
        intro: '四柱解读是八字命理分析的核心技能，需要综合运用天干地支、五行理论和各种格局来系统分析命局。',
        objectives: {
          obj1: '掌握年月日时四柱的分析方法',
          obj2: '学会判断命局的格局高低',
          obj3: '理解大运流年的作用机制',
          obj4: '能够进行系统的命理分析'
        },
        practice: {
          question: '选择一个命例，尝试用四柱解读的方法进行系统分析？',
          button: '练习四柱解读'
        }
      },

      // Astrology lesson content  
      astrologyIntroduction: {
        title: '占星学入门',
        breadcrumb: '占星入门',
        intro: '西方占星学是一门研究天体运动如何影响人类生活的古老学问。通过分析个人出生时刻的星体位置，我们可以深入了解性格特质、天赋才能和人生发展方向。',
        objectives: {
          obj1: '了解西方占星学的历史和基本原理',
          obj2: '认识占星学的核心要素：星座、行星、宫位',
          obj3: '理解出生图的基本构成',
          obj4: '掌握占星学的分析思路'
        },
        practice: {
          question: '观察夜空中的星座，思考古人是如何将星象与人生联系起来的？',
          button: '查看我的星盘'
        }
      },

      astrologyZodiacSigns: {
        title: '十二星座详解', 
        breadcrumb: '十二星座',
        intro: '十二星座是占星学的基础要素，每个星座都有独特的性格特质、元素属性和主宰行星，深入了解星座有助于准确解读个人特质。',
        objectives: {
          obj1: '掌握十二星座的基本特质和象征意义',
          obj2: '理解星座的四元素分类和三态分类',
          obj3: '学会分析星座间的相互关系',
          obj4: '了解星座在命盘分析中的作用'
        },
        practice: {
          question: '观察身边不同星座的朋友，验证他们是否具有对应的星座特质？',
          button: '深入分析我的星座'
        }
      },

      astrologyPlanets: {
        title: '行星详解',
        breadcrumb: '行星详解',
        intro: '行星是占星学的核心要素，每颗行星都代表着人格的不同面向和生命的各个领域。理解行星的意义、特质和能量表达，是掌握占星分析的关键基础。',
        objectives: {
          obj1: '掌握十大行星的基本意义和象征',
          obj2: '理解行星的分类和层次结构',
          obj3: '学会分析行星在不同星座中的表现',
          obj4: '了解行星逆行和相位的基本概念'
        },
        practice: {
          question: '观察自己的行为模式，思考哪些行星的影响在你身上体现得最明显？',
          button: '分析我的行星配置'
        }
      },

      astrologyHouses: {
        title: '宫位详解',
        breadcrumb: '宫位详解',
        intro: '十二宫位代表人生的十二个重要领域，从个人身份到人际关系，从事业发展到精神成长。理解宫位的含义是解读完整星盘的关键。',
        objectives: {
          obj1: '掌握十二宫位的基本含义和生活领域',
          obj2: '理解宫位的角宫、续宫、终宫分类',
          obj3: '学会分析行星在不同宫位的表现',
          obj4: '了解宫主星和宫位关系的重要性'
        },
        practice: {
          question: '回顾人生的重要时刻，思考它们分别属于哪个宫位的主题？',
          button: '探索我的宫位重点'
        }
      },

      astrologyAspects: {
        title: '相位详解',
        breadcrumb: '相位详解',
        intro: '相位是行星间的角度关系，揭示了不同行星能量的互动方式。掌握相位分析是深入理解星盘动态的关键技能。',
        objectives: {
          obj1: '掌握主要相位的含义和影响',
          obj2: '理解和谐相位与紧张相位的区别',
          obj3: '学会计算和识别星盘中的相位',
          obj4: '了解相位在个性分析中的作用'
        },
        practice: {
          question: '观察自己的内在冲突和和谐面，思考它们可能对应什么样的行星相位？',
          button: '分析我的相位模式'
        }
      },

      // Reading technique lessons
      readingPreparation: {
        title: '解读前的准备',
        breadcrumb: '解读准备',
        intro: '进行准确的命理分析需要充分的准备工作，包括资料收集、基础知识掌握和正确的分析心态。',
        objectives: {
          obj1: '掌握准确收集出生信息的方法',
          obj2: '了解各种命理分析工具的使用',
          obj3: '培养客观公正的分析态度',
          obj4: '学会制定系统的分析计划'
        },
        practice: {
          question: '准备分析一个命例，检查您的准备工作是否充分？',
          button: '开始准备分析'
        }
      },

      readingAnalysisMethod: {
        title: '分析方法',
        breadcrumb: '分析方法',
        intro: '系统化的分析方法是准确解读命盘的保证。通过科学的步骤和方法，可以避免主观臆断，得出客观准确的分析结果。',
        objectives: {
          obj1: '掌握系统化的分析步骤',
          obj2: '学会运用多种分析工具',
          obj3: '理解综合分析的重要性',
          obj4: '培养逻辑推理能力'
        },
        practice: {
          question: '运用学到的分析方法，尝试对一个完整的命例进行系统分析？',
          button: '应用分析方法'
        }
      }
    },

  // Category Page
  category: {
    articles: '相关文章',
    relatedLessons: '相关课程',
    about: '关于',
    keyPoints: '重点内容',
    gettingStarted: '开始学习',
    gettingStartedText: '准备好开始您的占星学习之旅了吗？立即创建您的个人命盘分析！',
    startAnalysis: '开始分析',
    startLesson: '开始学习',
    introductions: {
      fundamentals: {
        text1: '基础知识是占星学习的重要基石。在这里，您将学习到占星学和八字命理学的核心概念。',
        text2: '我们提供系统化的学习路径，帮助您从零开始，逐步掌握命理学的精髓。',
        point1: '全面的理论基础',
        point2: '实用的分析方法',
        point3: '丰富的案例解析'
      },
      astrology: {
        text1: '西方占星学是一门古老而深奥的学问，通过星体位置来解读人生命运。',
        text2: '学习占星学可以帮助您更好地了解自己和他人，发现隐藏的潜能和生命方向。',
        point1: '星座与行星的意义',
        point2: '宫位系统的运用',
        point3: '相位分析技巧'
      },
      bazi: {
        text1: '八字命理学是中华传统文化的瑰宝，通过出生时间分析人生轨迹。',
        text2: '深入学习八字，可以帮助您理解生命的节奏和发展规律。',
        point1: '天干地支系统',
        point2: '五行生克理论',
        point3: '四柱综合分析'
      },
      practical: {
        text1: '实用技巧专区为您提供具体的应用方法和实践指导。',
        text2: '将理论知识转化为实际能力，解决生活中的具体问题。',
        point1: '实际操作指南',
        point2: '案例分析方法',
        point3: '常见问题解答'
      },
      relationships: {
        text1: '感情关系是人生的重要组成部分，占星学为理解人际关系提供了独特视角。',
        text2: '学习关系占星学，可以帮助您改善人际关系，找到合适的伴侣。',
        point1: '合盘分析技巧',
        point2: '相性判断方法',
        point3: '关系发展预测'
      },
      career: {
        text1: '事业发展是人生规划的重要方面，占星学可以为职业选择提供指导。',
        text2: '通过分析命盘中的事业指标，找到最适合的发展方向。',
        point1: '职业倾向分析',
        point2: '最佳发展时机',
        point3: '事业规划建议'
      }
    }
  },

  // Career Astrology Article
  careerAstrology: {
    introduction: {
      title: '占星学与职业选择',
      text1: '占星学为我们提供了独特的视角来理解个人的职业倾向和发展潜力。',
      text2: '通过分析出生图中的关键要素，我们可以发现最适合的职业道路和发展时机。'
    },
    keyFactors: {
      title: '职业分析的关键要素',
      midheaven: {
        title: '中天星座',
        description: '代表您的职业形象、社会地位和人生目标，是职业分析的核心指标。'
      },
      tenthHouse: {
        title: '第十宫',
        description: '主管事业、声誉和社会地位，揭示您的职业发展方向。'
      },
      sunSign: {
        title: '太阳星座',
        description: '反映您的核心特质和天赋才能，影响职业选择的基础。'
      },
      aspects: {
        title: '行星相位',
        description: '行星间的相位关系影响职业发展的顺利程度和挑战。'
      }
    },
    careerSigns: {
      title: '不同元素的职业倾向',
      introduction: '根据星座的四大元素，我们可以了解不同的职业适性：',
      fire: {
        title: '火象星座（白羊、狮子、射手）',
        description: '充满热情和行动力，适合需要领导力和开创性的工作。',
        career1: '企业管理和创业',
        career2: '销售和市场营销',
        career3: '体育和娱乐行业'
      },
      earth: {
        title: '土象星座（金牛、处女、摩羯）',
        description: '务实稳重，注重细节，适合需要专业技能的实务工作。',
        career1: '金融和会计',
        career2: '工程和技术',
        career3: '医疗和研究'
      },
      air: {
        title: '风象星座（双子、天秤、水瓶）',
        description: '善于沟通交流，思维活跃，适合需要智慧和交流的工作。',
        career1: '媒体和传播',
        career2: '法律和咨询',
        career3: '教育和培训'
      },
      water: {
        title: '水象星座（巨蟹、天蝎、双鱼）',
        description: '感情丰富，直觉敏锐，适合需要同理心和创造力的工作。',
        career1: '艺术和设计',
        career2: '心理咨询',
        career3: '医疗照护'
      }
    },
    practical: {
      title: '实用职业指导建议',
      subtitle: '如何运用占星学进行职业规划：',
      tip1: '分析您的中天星座，了解理想的职业形象',
      tip2: '研究第十宫的行星配置，发现事业发展重点',
      tip3: '考虑太阳星座的特质，选择符合天性的工作',
      tip4: '注意土星的位置，了解需要克服的职业挑战',
      tip5: '观察木星的影响，把握事业发展的机遇'
    },
    conclusion: {
      title: '结论',
      text1: '占星学为职业选择提供了宝贵的洞察，但最终的决定还需要结合现实因素。',
      text2: '建议将占星分析作为参考工具，结合个人兴趣、能力和市场需求做出明智选择。'
    },
    cta: {
      title: '开始您的职业占星分析',
      description: '想要深入了解自己的职业潜力吗？',
      button: '立即分析命盘'
    }
  },

  // Relationship Compatibility Article
  relationshipCompatibility: {
    introduction: {
      title: '占星学与关系相性',
      text1: '占星学为我们理解人际关系提供了深刻的洞察，特别是在感情相性方面。',
      text2: '通过分析两个人的出生图，我们可以了解关系的和谐程度和潜在挑战。'
    },
    keyAspects: {
      title: '关系分析的重要要素',
      sunMoon: {
        title: '日月相位',
        description: '太阳与月亮的相位反映了两人在基本性格和情感需求上的契合度。'
      },
      venus: {
        title: '金星配置',
        description: '金星代表爱情观念和审美趣味，影响关系中的吸引力和和谐感。'
      },
      mars: {
        title: '火星能量',
        description: '火星反映行动力和欲望表达方式，影响关系中的激情和冲突。'
      },
      houses: {
        title: '宫位重叠',
        description: '两人重要行星落入对方特定宫位，会产生特殊的关系动力。'
      }
    },
    elements: {
      title: '元素相性矩阵',
      introduction: '不同元素星座之间的基本相性关系：',
      fire: '火象',
      earth: '土象',
      air: '风象',
      water: '水象'
    },
    compatibility: {
      high: '高',
      medium: '中',
      low: '低'
    },
    redFlags: {
      title: '关系中的警示信号',
      subtitle: '需要特别注意的相位配置：',
      flag1: '太阳与月亮形成紧张相位（刑冲）',
      flag2: '金星与火星存在严重冲突',
      flag3: '土星对个人行星形成压抑相位',
      flag4: '月亮交点轴线产生不利影响',
      flag5: '第七宫主星受到严重伤害'
    },
    tips: {
      title: '改善关系的建议',
      tip1: {
        title: '理解差异',
        description: '接受和欣赏彼此的不同特质，而不是试图改变对方。'
      },
      tip2: {
        title: '沟通技巧',
        description: '根据对方的星座特质调整沟通方式，提高理解效果。'
      },
      tip3: {
        title: '时机选择',
        description: '利用有利的行运时期处理重要关系问题。'
      },
      tip4: {
        title: '互补成长',
        description: '通过关系学习和发展自己缺乏的特质。'
      }
    },
    conclusion: {
      title: '总结',
      text1: '占星相性分析能够帮助我们更好地理解关系动力，但并不决定关系的成败。',
      text2: '最重要的是双方的努力、理解和成长意愿。'
    },
    cta: {
      title: '分析您的感情相性',
      description: '想要了解您与伴侣的星座相性吗？',
      button: '开始相性分析'
    }
  },

  // Article meta
  articleMeta: {
    publishDate: '2024年发布'
  },

  // AI聊天相关文本
  aiChat: {
    welcome: {
      title: '欢迎使用AI占星专家',
      description: '我是您的专属AI占星师，基于您的详细星盘信息为您提供个性化的占星建议和解答。您可以询问任何关于您星盘的问题。'
    },
    suggestedQuestions: {
      title: '建议问题'
    },
    input: {
      placeholder: '请输入您的问题...',
      send: '发送',
      enterToSend: 'Enter发送',
      shiftEnterForNewLine: 'Shift+Enter换行'
    },
    streaming: {
      thinking: '冥冥正在推盘中...'
    },
    loading: {
      title: '正在准备您的专属AI占星师',
      description: '需要您的完整星盘数据来提供个性化服务',
      refresh: '重新加载数据'
    },
    errors: {
      networkError: '网络连接错误，请检查网络设置',
      apiKeyError: 'DeepSeek API密钥配置错误，请检查密钥是否正确',
      rateLimitError: '请求过于频繁，请稍后再试',
      quotaError: 'API配额已用完，请检查DeepSeek账户余额',
      serverError: 'DeepSeek服务暂时不可用，请稍后重试',
      defaultError: 'AI服务暂时不可用，请稍后重试'
    }
  }
};