// utils/transitReportGenerator.js - 本地化版本
import { getTranslation, getCurrentLanguage } from '../i18n/index.js'

/**
 * 行运解释配置 - 已本地化
 */
const TRANSIT_INTERPRETATIONS = {
  aspects: {
    // 土星相位
    '土星合相': {
      description: 'transitReport.aspects.saturnConjunction.description',
      keywords: 'transitReport.aspects.saturnConjunction.keywords',
      advice: 'transitReport.aspects.saturnConjunction.advice'
    },
    '土星四分相': {
      description: 'transitReport.aspects.saturnSquare.description', 
      keywords: 'transitReport.aspects.saturnSquare.keywords',
      advice: 'transitReport.aspects.saturnSquare.advice'
    },
    '土星三分相': {
      description: 'transitReport.aspects.saturnTrine.description',
      keywords: 'transitReport.aspects.saturnTrine.keywords', 
      advice: 'transitReport.aspects.saturnTrine.advice'
    },
    '土星对分相': {
      description: 'transitReport.aspects.saturnOpposition.description',
      keywords: 'transitReport.aspects.saturnOpposition.keywords',
      advice: 'transitReport.aspects.saturnOpposition.advice'
    },
    
    // 木星相位
    '木星合相': {
      description: 'transitReport.aspects.jupiterConjunction.description',
      keywords: 'transitReport.aspects.jupiterConjunction.keywords',
      advice: 'transitReport.aspects.jupiterConjunction.advice'
    },
    '木星三分相': {
      description: 'transitReport.aspects.jupiterTrine.description',
      keywords: 'transitReport.aspects.jupiterTrine.keywords',
      advice: 'transitReport.aspects.jupiterTrine.advice'
    },
    
    // 天王星相位
    '天王星合相': {
      description: 'transitReport.aspects.uranusConjunction.description',
      keywords: 'transitReport.aspects.uranusConjunction.keywords',
      advice: 'transitReport.aspects.uranusConjunction.advice'
    },
    '天王星四分相': {
      description: 'transitReport.aspects.uranusSquare.description',
      keywords: 'transitReport.aspects.uranusSquare.keywords', 
      advice: 'transitReport.aspects.uranusSquare.advice'
    },
    
    // 海王星相位
    '海王星合相': {
      description: 'transitReport.aspects.neptuneConjunction.description',
      keywords: 'transitReport.aspects.neptuneConjunction.keywords',
      advice: 'transitReport.aspects.neptuneConjunction.advice'
    },
    '海王星四分相': {
      description: 'transitReport.aspects.neptuneSquare.description',
      keywords: 'transitReport.aspects.neptuneSquare.keywords',
      advice: 'transitReport.aspects.neptuneSquare.advice'
    },
    
    // 冥王星相位
    '冥王星合相': {
      description: 'transitReport.aspects.plutoConjunction.description',
      keywords: 'transitReport.aspects.plutoConjunction.keywords',
      advice: 'transitReport.aspects.plutoConjunction.advice'
    },
    '冥王星四分相': {
      description: 'transitReport.aspects.plutoSquare.description',
      keywords: 'transitReport.aspects.plutoSquare.keywords',
      advice: 'transitReport.aspects.plutoSquare.advice'
    }
  },

  lifeCycles: {
    saturn_return_1: {
      title: 'transitReport.lifeCycles.saturnReturn1.title',
      description: 'transitReport.lifeCycles.saturnReturn1.description',
      themes: 'transitReport.lifeCycles.saturnReturn1.themes',
      advice: 'transitReport.lifeCycles.saturnReturn1.advice'
    },
    jupiter_return_3: {
      title: 'transitReport.lifeCycles.jupiterReturn3.title',
      description: 'transitReport.lifeCycles.jupiterReturn3.description',
      themes: 'transitReport.lifeCycles.jupiterReturn3.themes',
      advice: 'transitReport.lifeCycles.jupiterReturn3.advice'
    },
    saturn_opposition: {
      title: 'transitReport.lifeCycles.saturnOpposition.title', 
      description: 'transitReport.lifeCycles.saturnOpposition.description',
      themes: 'transitReport.lifeCycles.saturnOpposition.themes',
      advice: 'transitReport.lifeCycles.saturnOpposition.advice'
    }
  }
}

/**
 * 生成完整的行运分析报告 - 本地化版本
 */
export function generateDetailedTransitReport(transitData, userData, language = null) {
  try {
    console.log('📊 开始生成详细行运报告');
    
    // 获取当前语言
    const currentLang = language || getCurrentLanguage()
    const t = (key) => getTranslation(key, currentLang)
    
    const { age, aspects, currentCycles, outerPlanetAnalysis, transitDate } = transitData
    
    // 验证输入数据
    if (!transitData || !userData) {
      throw new Error(t('transitReport.errors.missingData'))
    }
    
    // 格式化日期的安全函数
    const formatDate = (dateStr) => {
      try {
        const date = new Date(dateStr)
        if (isNaN(date.getTime())) {
          throw new Error(t('transitReport.errors.invalidDate'))
        }
        
        // 根据语言格式化日期
        if (currentLang === 'en') {
          return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        } else if (currentLang === 'ja') {
          return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
        } else {
          return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
        }
      } catch (error) {
        console.warn('日期格式化失败:', dateStr, error)
        return t('transitReport.errors.dateFormatError')
      }
    }

    const report = {
      header: {
        title: t('transitReport.header.title'),
        user: userData.name || t('transitReport.header.anonymousUser'),
        age: age || 0,
        analysisDate: formatDate(transitDate),
        birthDate: formatDate(userData.fullBirthDateTime),
        birthPlace: userData.birthplace || t('transitReport.header.unknownPlace')
      },
      
      overview: generateOverview(transitData, currentLang),
      majorCycles: generateMajorCyclesAnalysis(currentCycles || [], age || 0, currentLang),
      outerPlanets: generateOuterPlanetReport(outerPlanetAnalysis || {}, age || 0, currentLang),
      majorAspects: generateMajorAspectsReport((aspects || []).slice(0, 8), currentLang),
      lifeGuidance: generateLifeGuidance(transitData, age || 0, currentLang),
      recommendations: generateDetailedRecommendations(transitData, currentLang),
      futureOutlook: generateFutureOutlook(age || 0, aspects || [], currentLang)
    }

    console.log('✅ 详细行运报告生成完成')
    return report
    
  } catch (error) {
    console.error('❌ 生成详细行运报告失败:', error)
    console.error('错误堆栈:', error.stack)
    
    // 返回默认报告以防止应用崩溃
    return getDefaultTransitReport(userData, language)
  }
}

/**
 * 生成报告概述 - 本地化版本
 */
function generateOverview(transitData, language) {
  try {
    const t = (key) => getTranslation(key, language)
    const { age, aspects, currentCycles } = transitData
    
    let phaseDescription = ''
    if (age >= 42 && age <= 46) {
      phaseDescription = t('transitReport.overview.midlifePhase')
    } else if (age >= 28 && age <= 32) {
      phaseDescription = t('transitReport.overview.saturnReturnPhase')
    } else if (age >= 35 && age <= 37) {
      phaseDescription = t('transitReport.overview.jupiterReturnPhase')
    } else {
      phaseDescription = t('transitReport.overview.stablePhase')
    }

    const majorAspectsCount = (aspects || []).filter(a => a.intensity === 'strong').length
    const currentCyclesCount = (currentCycles || []).length

    const summaryTemplate = t('transitReport.overview.summaryTemplate')
    const summary = summaryTemplate
      .replace('{age}', age)
      .replace('{totalAspects}', (aspects || []).length)
      .replace('{majorAspects}', majorAspectsCount)
      .replace('{cyclesCount}', currentCyclesCount)

    return {
      summary,
      phaseDescription,
      keyThemes: extractKeyThemes(aspects || [], currentCycles || [], language),
      intensity: calculateCurrentIntensity(aspects || [], currentCycles || [], language)
    }
  } catch (error) {
    console.error('生成概述失败:', error)
    const t = (key) => getTranslation(key, language)
    return {
      summary: t('transitReport.overview.fallbackSummary'),
      phaseDescription: t('transitReport.overview.fallbackPhase'),
      keyThemes: [t('transitReport.overview.fallbackTheme')],
      intensity: t('transitReport.intensity.gentle')
    }
  }
}

/**
 * 生成主要周期分析 - 本地化版本
 */
function generateMajorCyclesAnalysis(currentCycles, age, language) {
  try {
    const t = (key) => getTranslation(key, language)
    
    if (!currentCycles || currentCycles.length === 0) {
      return [{
        name: t('transitReport.cycles.noMajorCycles'),
        progress: 0,
        phase: t('transitReport.cycles.stablePhase'),
        description: t('transitReport.cycles.stableDescription'),
        themes: [
          t('transitReport.cycles.stableThemes.development'),
          t('transitReport.cycles.stableThemes.skillBuilding'),
          t('transitReport.cycles.stableThemes.foundation')
        ],
        advice: t('transitReport.cycles.stableAdvice')
      }]
    }

    return currentCycles.map(cycle => {
      const interpretation = TRANSIT_INTERPRETATIONS.lifeCycles[cycle.key]
      const progress = Math.round((cycle.progress || 0) * 100)
      
      let phase
      if ((cycle.progress || 0) < 0.3) {
        phase = t('transitReport.cycles.phases.early')
      } else if ((cycle.progress || 0) < 0.7) {
        phase = t('transitReport.cycles.phases.middle')
      } else {
        phase = t('transitReport.cycles.phases.late')
      }

      return {
        name: cycle.name || t('transitReport.cycles.unknownCycle'),
        progress,
        phase,
        description: interpretation ? t(interpretation.description) : t('transitReport.cycles.defaultDescription').replace('{cycleName}', cycle.name),
        themes: interpretation ? t(interpretation.themes).split(',') : [t('transitReport.cycles.defaultThemes.growth'), t('transitReport.cycles.defaultThemes.responsibility')],
        advice: interpretation ? t(interpretation.advice) : t('transitReport.cycles.defaultAdvice')
      }
    })
  } catch (error) {
    console.error('生成周期分析失败:', error)
    const t = (key) => getTranslation(key, language)
    return [{
      name: t('transitReport.cycles.analysisError'),
      progress: 0,
      phase: t('transitReport.cycles.unknown'),
      description: t('transitReport.cycles.analysisErrorDescription'),
      themes: [t('transitReport.cycles.reanalysisNeeded')],
      advice: t('transitReport.cycles.retryAdvice')
    }]
  }
}

/**
 * 生成外行星报告 - 本地化版本
 */
function generateOuterPlanetReport(outerPlanetAnalysis, age, language) {
  try {
    const t = (key) => getTranslation(key, language)
    const { saturn = [], uranus = [], neptune = [], pluto = [], summary } = outerPlanetAnalysis
    
    const planetReports = []

    // 土星影响
    if (saturn.length > 0) {
      planetReports.push({
        planet: t('transitReport.outerPlanets.saturn.name'),
        theme: t('transitReport.outerPlanets.saturn.theme'),
        description: t('transitReport.outerPlanets.saturn.description'),
        aspects: saturn.map(aspect => formatAspectForReport(aspect, language)),
        advice: t('transitReport.outerPlanets.saturn.advice')
      })
    }

    // 天王星影响  
    if (uranus.length > 0) {
      planetReports.push({
        planet: t('transitReport.outerPlanets.uranus.name'),
        theme: t('transitReport.outerPlanets.uranus.theme'),
        description: t('transitReport.outerPlanets.uranus.description'),
        aspects: uranus.map(aspect => formatAspectForReport(aspect, language)),
        advice: t('transitReport.outerPlanets.uranus.advice')
      })
    }

    // 海王星影响
    if (neptune.length > 0) {
      planetReports.push({
        planet: t('transitReport.outerPlanets.neptune.name'),
        theme: t('transitReport.outerPlanets.neptune.theme'),
        description: t('transitReport.outerPlanets.neptune.description'),
        aspects: neptune.map(aspect => formatAspectForReport(aspect, language)),
        advice: t('transitReport.outerPlanets.neptune.advice')
      })
    }

    // 冥王星影响
    if (pluto.length > 0) {
      planetReports.push({
        planet: t('transitReport.outerPlanets.pluto.name'),
        theme: t('transitReport.outerPlanets.pluto.theme'),
        description: t('transitReport.outerPlanets.pluto.description'),
        aspects: pluto.map(aspect => formatAspectForReport(aspect, language)),
        advice: t('transitReport.outerPlanets.pluto.advice')
      })
    }

    return {
      summary: summary || { description: t('transitReport.outerPlanets.mildInfluence') },
      planets: planetReports,
      overallTheme: determineOverallTheme(planetReports, language)
    }
  } catch (error) {
    console.error('生成外行星报告失败:', error)
    const t = (key) => getTranslation(key, language)
    return {
      summary: { description: t('transitReport.outerPlanets.analysisError') },
      planets: [],
      overallTheme: t('transitReport.outerPlanets.reanalysisNeeded')
    }
  }
}

/**
 * 生成主要相位报告 - 本地化版本
 */
function generateMajorAspectsReport(aspects, language) {
  try {
    const t = (key) => getTranslation(key, language)
    
    return (aspects || []).map(aspect => {
      const key = `${aspect.transitPlanet || '未知'}${aspect.aspect || '未知'}`
      const interpretation = TRANSIT_INTERPRETATIONS.aspects[key]
      
      return {
        title: `${aspect.transitPlanet || t('transitReport.aspects.unknown')} ${aspect.aspect || t('transitReport.aspects.unknown')} ${aspect.natalPlanet || t('transitReport.aspects.unknown')}`,
        orb: (aspect.orb || 0).toFixed(1),
        intensity: aspect.intensity || 'unknown',
        direction: aspect.applying ? t('transitReport.aspects.applying') : t('transitReport.aspects.separating'),
        description: interpretation ? t(interpretation.description) : t('transitReport.aspects.defaultDescription'),
        keywords: interpretation ? t(interpretation.keywords).split(',') : [t('transitReport.aspects.defaultKeyword')],
        advice: interpretation ? t(interpretation.advice) : t('transitReport.aspects.defaultAdvice')
      }
    })
  } catch (error) {
    console.error('生成相位报告失败:', error)
    return []
  }
}

/**
 * 生成人生指导 - 本地化版本
 */
function generateLifeGuidance(transitData, age, language) {
  try {
    const t = (key) => getTranslation(key, language)
    const { aspects } = transitData

    return {
      primaryFocus: determinePrimaryFocus(aspects || [], age, language),
      currentChallenge: identifyMainChallenge(aspects || [], language),
      currentOpportunity: identifyMainOpportunity(aspects || [], language),
      emotionalAdvice: t('transitReport.lifeGuidance.emotionalAdvice'),
      practicalAdvice: t('transitReport.lifeGuidance.practicalAdvice'),
      spiritualAdvice: getAgeAppropriateSpirit(age, language)
    }
  } catch (error) {
    console.error('生成人生指导失败:', error)
    const t = (key) => getTranslation(key, language)
    return {
      primaryFocus: t('transitReport.lifeGuidance.fallbackFocus'),
      currentChallenge: t('transitReport.lifeGuidance.fallbackChallenge'),
      currentOpportunity: t('transitReport.lifeGuidance.fallbackOpportunity'),
      emotionalAdvice: t('transitReport.lifeGuidance.fallbackEmotional'),
      practicalAdvice: t('transitReport.lifeGuidance.fallbackPractical'),
      spiritualAdvice: t('transitReport.lifeGuidance.fallbackSpiritual')
    }
  }
}

/**
 * 生成详细建议 - 本地化版本
 */
function generateDetailedRecommendations(transitData, language) {
  try {
    const { aspects = [], currentCycles = [], age = 0 } = transitData
    
    return {
      career: generateCareerRecommendations(aspects, age, language),
      relationships: generateRelationshipRecommendations(aspects, language),
      health: generateHealthRecommendations(language),
      personal: generatePersonalGrowthRecommendations(aspects, currentCycles, language),
      financial: generateFinancialRecommendations(aspects, language),
      timing: generateTimingRecommendations(aspects, language)
    }
  } catch (error) {
    console.error('生成详细建议失败:', error)
    const t = (key) => getTranslation(key, language)
    return {
      career: { 
        focus: t('transitReport.recommendations.career.fallbackFocus'), 
        advice: t('transitReport.recommendations.career.fallbackAdvice'), 
        timing: t('transitReport.recommendations.career.fallbackTiming') 
      },
      relationships: { 
        focus: t('transitReport.recommendations.relationships.fallbackFocus'), 
        advice: t('transitReport.recommendations.relationships.fallbackAdvice'), 
        areas: [t('transitReport.recommendations.relationships.fallbackArea')] 
      },
      health: { 
        physical: t('transitReport.recommendations.health.fallbackPhysical'), 
        mental: t('transitReport.recommendations.health.fallbackMental'), 
        emotional: t('transitReport.recommendations.health.fallbackEmotional') 
      },
      personal: { 
        priorities: [t('transitReport.recommendations.personal.fallbackPriority')], 
        methods: [t('transitReport.recommendations.personal.fallbackMethod')] 
      },
      financial: { 
        approach: t('transitReport.recommendations.financial.fallbackApproach'), 
        advice: t('transitReport.recommendations.financial.fallbackAdvice'), 
        priority: t('transitReport.recommendations.financial.fallbackPriority') 
      },
      timing: { 
        bestTiming: t('transitReport.recommendations.timing.fallbackBest'), 
        avoidTiming: t('transitReport.recommendations.timing.fallbackAvoid'), 
        keyDates: t('transitReport.recommendations.timing.fallbackKey') 
      }
    }
  }
}

/**
 * 生成未来展望 - 本地化版本
 */
function generateFutureOutlook(age, aspects, language) {
  try {
    const t = (key) => getTranslation(key, language)
    
    return {
      next3Months: t('transitReport.futureOutlook.next3Months'),
      next6Months: t('transitReport.futureOutlook.next6Months'),
      nextYear: t('transitReport.futureOutlook.nextYear'),
      longTerm: generateLongTermOutlook(age, language)
    }
  } catch (error) {
    console.error('生成未来展望失败:', error)
    const t = (key) => getTranslation(key, language)
    return {
      next3Months: t('transitReport.futureOutlook.fallback3Months'),
      next6Months: t('transitReport.futureOutlook.fallback6Months'),
      nextYear: t('transitReport.futureOutlook.fallbackYear'),
      longTerm: t('transitReport.futureOutlook.fallbackLongTerm')
    }
  }
}

/**
 * 辅助函数 - 本地化版本
 */

function extractKeyThemes(aspects, currentCycles, language) {
  const t = (key) => getTranslation(key, language)
  
  const themes = []
  
  // 从相位中提取主题
  aspects.forEach(aspect => {
    if (aspect.transitPlanet === '土星') {
      themes.push(t('transitReport.themes.responsibility'))
    } else if (aspect.transitPlanet === '木星') {
      themes.push(t('transitReport.themes.expansion'))
    } else if (aspect.transitPlanet === '天王星') {
      themes.push(t('transitReport.themes.innovation'))
    }
  })
  
  // 从生命周期中提取主题
  currentCycles.forEach(cycle => {
    if (cycle.name && cycle.name.includes('土星')) {
      themes.push(t('transitReport.themes.maturation'))
    }
  })
  
  return themes.length > 0 ? [...new Set(themes)].slice(0, 4) : [t('transitReport.themes.stability')]
}

function calculateCurrentIntensity(aspects, currentCycles, language) {
  const t = (key) => getTranslation(key, language)
  
  const strongAspects = aspects.filter(a => a.intensity === 'strong').length
  const activeCycles = currentCycles.length
  
  if (strongAspects >= 3 || activeCycles >= 2) {
    return t('transitReport.intensity.high')
  } else if (strongAspects >= 1 || activeCycles >= 1) {
    return t('transitReport.intensity.medium')
  } else {
    return t('transitReport.intensity.gentle')
  }
}

function formatAspectForReport(aspect, language) {
  const t = (key) => getTranslation(key, language)
  
  return {
    description: `${aspect.transitPlanet || t('transitReport.aspects.unknown')} ${aspect.aspect || t('transitReport.aspects.unknown')} ${aspect.natalPlanet || t('transitReport.aspects.unknown')}`,
    orb: (aspect.orb || 0).toFixed(1)
  }
}

function determineOverallTheme(planetReports, language) {
  const t = (key) => getTranslation(key, language)
  
  if (planetReports.length === 0) {
    return t('transitReport.outerPlanets.themes.peaceful')
  } else if (planetReports.length >= 3) {
    return t('transitReport.outerPlanets.themes.transformation')
  } else if (planetReports.some(p => p.planet.includes('土星'))) {
    return t('transitReport.outerPlanets.themes.building')
  } else if (planetReports.some(p => p.planet.includes('天王星'))) {
    return t('transitReport.outerPlanets.themes.breakthrough')
  } else {
    return t('transitReport.outerPlanets.themes.growth')
  }
}

function determinePrimaryFocus(aspects, age, language) {
  const t = (key) => getTranslation(key, language)
  
  if (age < 30) {
    return t('transitReport.lifeGuidance.focus.foundation')
  } else if (age < 45) {
    return t('transitReport.lifeGuidance.focus.achievement')
  } else if (age < 60) {
    return t('transitReport.lifeGuidance.focus.wisdom')
  } else {
    return t('transitReport.lifeGuidance.focus.legacy')
  }
}

function identifyMainChallenge(aspects, language) {
  const t = (key) => getTranslation(key, language)
  
  const challengingAspects = aspects.filter(a => ['四分相', 'square', '对分相', 'opposition'].includes(a.aspect))
  if (challengingAspects.length > 0) {
    const aspect = challengingAspects[0]
    return t('transitReport.lifeGuidance.challenge.specific')
      .replace('{transitPlanet}', aspect.transitPlanet)
      .replace('{aspect}', aspect.aspect)
      .replace('{natalPlanet}', aspect.natalPlanet)
  }
  return t('transitReport.lifeGuidance.challenge.peaceful')
}

function identifyMainOpportunity(aspects, language) {
  const t = (key) => getTranslation(key, language)
  
  const positiveAspects = aspects.filter(a => ['三分相', 'trine', '六分相', 'sextile'].includes(a.aspect))
  if (positiveAspects.length > 0) {
    const aspect = positiveAspects[0]
    return t('transitReport.lifeGuidance.opportunity.specific')
      .replace('{transitPlanet}', aspect.transitPlanet)
      .replace('{aspect}', aspect.aspect) 
      .replace('{natalPlanet}', aspect.natalPlanet)
  }
  return t('transitReport.lifeGuidance.opportunity.general')
}

function getAgeAppropriateSpirit(age, language) {
  const t = (key) => getTranslation(key, language)
  
  if (age < 30) {
    return t('transitReport.lifeGuidance.spiritual.exploration')
  } else if (age < 50) {
    return t('transitReport.lifeGuidance.spiritual.integration')
  } else {
    return t('transitReport.lifeGuidance.spiritual.transcendence')
  }
}

function generateCareerRecommendations(aspects, age, language) {
  const t = (key) => getTranslation(key, language)
  
  return {
    focus: t('transitReport.recommendations.career.focus'),
    advice: t('transitReport.recommendations.career.advice'),
    timing: t('transitReport.recommendations.career.timing')
  }
}

function generateRelationshipRecommendations(aspects, language) {
  const t = (key) => getTranslation(key, language)
  
  return {
    focus: t('transitReport.recommendations.relationships.focus'),
    advice: t('transitReport.recommendations.relationships.advice'),
    areas: [
      t('transitReport.recommendations.relationships.areas.communication'),
      t('transitReport.recommendations.relationships.areas.intimacy'),
      t('transitReport.recommendations.relationships.areas.boundaries')
    ]
  }
}

function generateHealthRecommendations(language) {
  const t = (key) => getTranslation(key, language)
  
  return {
    physical: t('transitReport.recommendations.health.physical'),
    mental: t('transitReport.recommendations.health.mental'),
    emotional: t('transitReport.recommendations.health.emotional')
  }
}

function generatePersonalGrowthRecommendations(aspects, currentCycles, language) {
  const t = (key) => getTranslation(key, language)
  
  return {
    priorities: [
      t('transitReport.recommendations.personal.priorities.awareness'),
      t('transitReport.recommendations.personal.priorities.skills'),
      t('transitReport.recommendations.personal.priorities.relationships')
    ],
    methods: [
      t('transitReport.recommendations.personal.methods.reflection'),
      t('transitReport.recommendations.personal.methods.learning'),
      t('transitReport.recommendations.personal.methods.practice')
    ]
  }
}

function generateFinancialRecommendations(aspects, language) {
  const t = (key) => getTranslation(key, language)
  
  return {
    approach: t('transitReport.recommendations.financial.approach'),
    advice: t('transitReport.recommendations.financial.advice'),
    priority: t('transitReport.recommendations.financial.priority')
  }
}

function generateTimingRecommendations(aspects, language) {
  const t = (key) => getTranslation(key, language)
  
  const hasChallengingAspects = aspects.some(a => ['四分相', 'square', '对分相', 'opposition'].includes(a.aspect))
  
  return {
    bestTiming: t('transitReport.recommendations.timing.bestTiming'),
    avoidTiming: hasChallengingAspects ? t('transitReport.recommendations.timing.avoidHigh') : t('transitReport.recommendations.timing.avoidNone'),
    keyDates: t('transitReport.recommendations.timing.keyDates')
  }
}

function generateLongTermOutlook(age, language) {
  const t = (key) => getTranslation(key, language)
  
  if (age < 30) {
    return t('transitReport.futureOutlook.longTerm.foundation')
  } else if (age < 45) {
    return t('transitReport.futureOutlook.longTerm.development') 
  } else if (age < 60) {
    return t('transitReport.futureOutlook.longTerm.experience')
  } else {
    return t('transitReport.futureOutlook.longTerm.wisdom')
  }
}

/**
 * 默认报告 - 用于错误处理
 */
function getDefaultTransitReport(userData, language = null) {
  const currentLang = language || getCurrentLanguage()
  const t = (key) => getTranslation(key, currentLang)
  
  return {
    header: {
      title: t('transitReport.header.title'),
      user: userData?.name || t('transitReport.header.anonymousUser'),
      age: 0,
      analysisDate: t('transitReport.errors.dateError'),
      birthDate: t('transitReport.errors.dateError'),
      birthPlace: userData?.birthplace || t('transitReport.header.unknownPlace')
    },
    overview: {
      summary: t('transitReport.errors.analysisError'),
      phaseDescription: t('transitReport.errors.unknownPhase'),
      keyThemes: [t('transitReport.errors.reanalysis')],
      intensity: t('transitReport.errors.unknownIntensity')
    },
    majorCycles: [],
    outerPlanets: {
      summary: { description: t('transitReport.errors.outerPlanetError') },
      planets: [],
      overallTheme: t('transitReport.errors.reanalysisNeeded')
    },
    majorAspects: [],
    lifeGuidance: {
      primaryFocus: t('transitReport.errors.reanalysis'),
      currentChallenge: t('transitReport.errors.systemError'),
      currentOpportunity: t('transitReport.errors.retryLater'),
      emotionalAdvice: t('transitReport.errors.patience'),
      practicalAdvice: t('transitReport.errors.checkData'),
      spiritualAdvice: t('transitReport.errors.trustProcess')
    },
    recommendations: {
      career: { focus: t('transitReport.errors.reanalysisNeeded'), advice: t('transitReport.errors.systemError'), timing: t('transitReport.errors.unknown') },
      relationships: { focus: t('transitReport.errors.reanalysisNeeded'), advice: t('transitReport.errors.systemError'), areas: [t('transitReport.errors.unknown')] },
      health: { physical: t('transitReport.errors.stayHealthy'), mental: t('transitReport.errors.stayCalm'), emotional: t('transitReport.errors.bePatient') },
      personal: { priorities: [t('transitReport.errors.reanalysis')], methods: [t('transitReport.errors.checkData')] },
      financial: { approach: t('transitReport.errors.beCautious'), advice: t('transitReport.errors.waitForFix'), priority: t('transitReport.errors.dataValidation') },
      timing: { bestTiming: t('transitReport.errors.retryLater'), avoidTiming: t('transitReport.errors.avoidNow'), keyDates: t('transitReport.errors.waitForFix') }
    },
    futureOutlook: {
      next3Months: t('transitReport.errors.reanalysisNeeded'),
      next6Months: t('transitReport.errors.waitForFix'),
      nextYear: t('transitReport.errors.needRecalculation'),
      longTerm: t('transitReport.errors.contactSupport')
    }
  }
}

// 导出主要函数
export { 
  TRANSIT_INTERPRETATIONS 
}