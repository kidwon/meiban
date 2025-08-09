// pdfReportGenerator.js - PDF报告生成器
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

/**
 * 生成综合分析PDF报告 - 使用HTML转图片方式支持中文
 * @param {Object} userData - 用户数据
 * @param {Object} calculationResults - 计算结果
 * @param {Object} transitReport - 行运分析报告
 * @param {string} currentLanguage - 当前语言
 * @returns {Promise} PDF生成Promise
 */
export async function generateComprehensivePDFReport(userData, calculationResults, transitReport, currentLanguage = 'zh') {
  // 调试：检查传入的数据
  console.log('PDF Generator - Input data:')
  console.log('userData:', userData)
  console.log('calculationResults:', calculationResults)
  console.log('transitReport:', transitReport)
  console.log('currentLanguage:', currentLanguage)
  
  // 创建一个临时的HTML容器来渲染报告内容
  const reportContainer = document.createElement('div')
  reportContainer.style.cssText = `
    position: absolute;
    top: -10000px;
    left: -10000px;
    width: 210mm;
    min-height: auto;
    height: auto;
    background: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 12px;
    line-height: 1.6;
    color: #333;
    padding: 20mm;
    box-sizing: border-box;
    overflow: visible;
  `
  
  // 生成HTML内容
  reportContainer.innerHTML = generateReportHTML(userData, calculationResults, transitReport, currentLanguage)
  
  // 添加到页面
  document.body.appendChild(reportContainer)
  
  try {
    // 等待DOM渲染完成和字体加载
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // 强制重新计算布局
    reportContainer.style.display = 'block'
    const computedHeight = reportContainer.scrollHeight
    const computedWidth = reportContainer.scrollWidth
    
    console.log('Report container dimensions:', { width: computedWidth, height: computedHeight })
    
    // 使用html2canvas截图
    const canvas = await html2canvas(reportContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: computedWidth,
      height: computedHeight,
      logging: false,
      windowWidth: computedWidth,
      windowHeight: computedHeight,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0
    })
    
    // 创建PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    
    // 计算图片尺寸
    const imgWidth = 210 // A4宽度(mm)
    const imgHeight = (canvas.height * imgWidth) / canvas.width // 按比例计算高度
    const pageHeight = 297 // A4高度(mm)
    
    console.log('Canvas dimensions:', { width: canvas.width, height: canvas.height })
    console.log('PDF dimensions:', { imgWidth, imgHeight, pageHeight })
    console.log('Pages needed:', Math.ceil(imgHeight / pageHeight))
    
    // 如果内容高度小于一页，直接添加（包含页眉页脚）
    const headerHeight = 15 // 页眉高度(mm)
    const footerHeight = 15 // 页脚高度(mm)  
    const topMargin = 10 // 内容顶部边距(mm)
    const availableContentHeight = pageHeight - headerHeight - footerHeight - topMargin
    
    if (imgHeight <= availableContentHeight) {
      const imgData = canvas.toDataURL('image/jpeg', '0.95')
      
      // 添加页眉
      addPageHeader(pdf, 1, 1, imgWidth, headerHeight, currentLanguage)
      
      // 添加内容（留出页眉空间和顶部边距）
      const contentY = headerHeight + topMargin
      pdf.addImage(imgData, 'JPEG', 0, contentY, imgWidth, imgHeight)
      
      // 添加页脚
      addPageFooter(pdf, 1, 1, imgWidth, pageHeight, footerHeight, currentLanguage)
      
      console.log('Single page PDF created with header/footer')
      return pdf
    }
    
    // 智能分页处理 - 避免在文本中间截断
    const totalPages = await intelligentPagination(pdf, canvas, imgWidth, imgHeight, pageHeight, currentLanguage)
    
    console.log(`Multi-page PDF created with ${totalPages} pages`)
    
    return pdf
    
  } finally {
    // 清理临时元素
    document.body.removeChild(reportContainer)
  }
}

/**
 * 生成报告HTML内容
 */
function generateReportHTML(userData, calculationResults, transitReport, currentLanguage) {
  const translations = getTranslations(currentLanguage)
  
  console.log('Generating HTML with translations:', translations.title)
  
  let html = `
    <div class="report-container">
      <div class="report-header">
        <h1 style="text-align: center; margin-bottom: 30px; color: #2c3e50; font-size: 24px; font-weight: bold;">
          ${translations.title}
        </h1>
      </div>
  `
  
  // 个人信息部分
  console.log('Adding personal info...')
  html += generatePersonalInfoHTML(userData, translations)
  
  // 生辰八字分析
  if (calculationResults && calculationResults.bazi) {
    console.log('Adding Bazi analysis...')
    html += generateBaziAnalysisHTML(calculationResults.bazi, translations)
  } else {
    console.log('No Bazi data available')
    html += `
      <div class="section" style="margin-bottom: 25px;">
        <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">
          ${translations.baziAnalysis}
        </h2>
        <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin-bottom: 15px;">
          暂无生辰八字分析数据
        </div>
      </div>
    `
  }
  
  // 占星分析
  if (calculationResults && calculationResults.astrology) {
    console.log('Adding Astrology analysis...')
    html += generateAstrologyAnalysisHTML(calculationResults.astrology, translations)
  } else {
    console.log('No Astrology data available')
    html += `
      <div class="section" style="margin-bottom: 25px;">
        <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #9b59b6; padding-bottom: 5px;">
          ${translations.astrologyAnalysis}
        </h2>
        <div style="background: #d1ecf1; padding: 15px; border-left: 4px solid #17a2b8; margin-bottom: 15px;">
          暂无占星分析数据
        </div>
      </div>
    `
  }
  
  // 行运分析
  if (transitReport) {
    console.log('Adding Transit analysis...')
    html += generateTransitAnalysisHTML(transitReport, translations)
  } else {
    console.log('No Transit data available')
    html += `
      <div class="section" style="margin-bottom: 25px;">
        <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #20c997; padding-bottom: 5px;">
          ${translations.transitAnalysis}
        </h2>
        <div style="background: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin-bottom: 15px;">
          暂无行运分析数据
        </div>
      </div>
    `
  }
  
  // 页脚
  const currentDate = new Date().toLocaleDateString(
    currentLanguage === 'zh' ? 'zh-CN' : 
    currentLanguage === 'ja' ? 'ja-JP' : 'en-US'
  )
  
  html += `
      <div class="report-footer" style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 10px;">
        <p>${translations.footer}</p>
        <p>${translations.generatedOn}: ${currentDate}</p>
      </div>
    </div>
  `
  
  console.log('Final HTML length:', html.length)
  console.log('Final HTML preview:', html.substring(0, 500) + '...')
  
  return html
}

/**
 * 生成个人信息HTML
 */
function generatePersonalInfoHTML(userData, translations) {
  console.log('generatePersonalInfoHTML called with userData:', userData)
  
  const personalInfo = `
    <div class="section" style="margin-bottom: 35px; page-break-inside: avoid;">
      <h2 style="color: #34495e; font-size: 18px; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 5px; page-break-after: avoid;">
        ${translations.personalInfo}
      </h2>
      <div class="info-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
        <p><strong>${translations.name}:</strong> ${userData?.name || 'N/A'}</p>
        <p><strong>${translations.gender}:</strong> ${translations[userData?.gender] || userData?.gender || 'N/A'}</p>
        <p><strong>${translations.birthDate}:</strong> ${userData?.birthdate || 'N/A'}</p>
        <p><strong>${translations.birthTime}:</strong> ${userData?.birthHour || '00'}:${String(userData?.birthMinute || 0).padStart(2, '0')}</p>
        <p style="grid-column: 1 / -1;"><strong>${translations.birthPlace}:</strong> ${userData?.birthplace || 'N/A'}</p>
      </div>
    </div>
  `
  
  console.log('Generated personal info HTML length:', personalInfo.length)
  return personalInfo
}

/**
 * 生成生辰八字分析HTML
 */
function generateBaziAnalysisHTML(baziResults, translations) {
  let html = `
    <div class="section" style="margin-bottom: 25px;">
      <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">
        ${translations.baziAnalysis}
      </h2>
  `
  
  // 四柱八字
  if (baziResults.pillars) {
    html += `
      <h3 style="color: #2c3e50; font-size: 14px; margin: 15px 0 10px 0;">${translations.fourPillars}</h3>
      <div class="pillars-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 15px;">
    `
    
    const pillarNames = ['年柱', '月柱', '日柱', '时柱']
    const pillars = baziResults.pillars
    
    for (let i = 0; i < pillarNames.length; i++) {
      if (pillars[i]) {
        html += `<div style="text-align: center; padding: 8px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px;">
          <div style="font-weight: bold; color: #495057;">${pillarNames[i]}</div>
          <div style="margin-top: 5px;">${pillars[i]}</div>
        </div>`
      }
    }
    html += `</div>`
  }
  
  // 五行分析
  if (baziResults.elements) {
    html += `
      <h3 style="color: #2c3e50; font-size: 14px; margin: 15px 0 10px 0;">${translations.elements}</h3>
      <div class="elements-grid" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-bottom: 15px;">
    `
    
    const elements = ['木', '火', '土', '金', '水']
    for (const element of elements) {
      if (baziResults.elements[element]) {
        html += `<div style="text-align: center; padding: 6px; background: #e8f5e8; border: 1px solid #28a745; border-radius: 4px;">
          <div style="font-weight: bold;">${element}</div>
          <div>${baziResults.elements[element]}</div>
        </div>`
      }
    }
    html += `</div>`
  }
  
  // 性格分析
  if (baziResults.personality) {
    html += `
      <h3 style="color: #2c3e50; font-size: 14px; margin: 15px 0 10px 0;">${translations.personality}</h3>
      <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #17a2b8; margin-bottom: 15px;">
        ${typeof baziResults.personality === 'string' ? baziResults.personality : JSON.stringify(baziResults.personality)}
      </div>
    `
  }
  
  html += `</div>`
  return html
}

/**
 * 生成占星分析HTML
 */
function generateAstrologyAnalysisHTML(astrologyResults, translations) {
  let html = `
    <div class="section" style="margin-bottom: 25px;">
      <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #9b59b6; padding-bottom: 5px;">
        ${translations.astrologyAnalysis}
      </h2>
  `
  
  // 太阳星座
  if (astrologyResults.sun) {
    html += `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #2c3e50; font-size: 14px; margin: 15px 0 10px 0;">
          ${translations.sunSign}: ${astrologyResults.sun.sign || 'N/A'}
        </h3>
        ${astrologyResults.sun.description ? 
          `<div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin-bottom: 10px;">
            ${astrologyResults.sun.description}
          </div>` : ''}
      </div>
    `
  }
  
  // 月亮星座
  if (astrologyResults.moon) {
    html += `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #2c3e50; font-size: 14px; margin: 15px 0 10px 0;">
          ${translations.moonSign}: ${astrologyResults.moon.sign || 'N/A'}
        </h3>
        ${astrologyResults.moon.description ? 
          `<div style="background: #d1ecf1; padding: 15px; border-left: 4px solid #17a2b8; margin-bottom: 10px;">
            ${astrologyResults.moon.description}
          </div>` : ''}
      </div>
    `
  }
  
  // 上升星座
  if (astrologyResults.ascendant) {
    html += `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #2c3e50; font-size: 14px; margin: 15px 0 10px 0;">
          ${translations.ascendantSign}: ${astrologyResults.ascendant.sign || 'N/A'}
        </h3>
        ${astrologyResults.ascendant.description ? 
          `<div style="background: #f8d7da; padding: 15px; border-left: 4px solid #dc3545; margin-bottom: 10px;">
            ${astrologyResults.ascendant.description}
          </div>` : ''}
      </div>
    `
  }
  
  // 详细占星分析 - 事业分析
  if (astrologyResults.career) {
    html += `
      <h3 style="color: #2c3e50; font-size: 14px; margin: 20px 0 10px 0;">${translations.careerAnalysis || '事业发展分析'}</h3>
      <div style="background: #e8f5e8; padding: 15px; border-left: 4px solid #28a745; margin-bottom: 15px;">
    `
    if (astrologyResults.career.strengths) {
      html += `<p><strong>${translations.careerStrengths || '事业优势'}:</strong> ${astrologyResults.career.strengths}</p>`
    }
    if (astrologyResults.career.suggestions && Array.isArray(astrologyResults.career.suggestions)) {
      html += `<p><strong>${translations.careerSuggestions || '适合职业'}:</strong> ${astrologyResults.career.suggestions.join(', ')}</p>`
    }
    html += `</div>`
  }
  
  // 感情分析
  if (astrologyResults.relationships) {
    html += `
      <h3 style="color: #2c3e50; font-size: 14px; margin: 20px 0 10px 0;">${translations.relationshipAnalysis || '感情关系分析'}</h3>
      <div style="background: #ffe8e8; padding: 15px; border-left: 4px solid #e74c3c; margin-bottom: 15px;">
    `
    if (astrologyResults.relationships.love) {
      html += `<p><strong>${translations.loveStyle || '恋爱风格'}:</strong> ${astrologyResults.relationships.love}</p>`
    }
    if (astrologyResults.relationships.friendship) {
      html += `<p><strong>${translations.friendshipStyle || '友谊风格'}:</strong> ${astrologyResults.relationships.friendship}</p>`
    }
    if (astrologyResults.relationships.compatibility && Array.isArray(astrologyResults.relationships.compatibility)) {
      html += `<p><strong>${translations.compatibleSigns || '相配星座'}:</strong> ${astrologyResults.relationships.compatibility.join(', ')}</p>`
    }
    html += `</div>`
  }
  
  // 性格关键词
  if (astrologyResults.planetKeywords) {
    html += `
      <h3 style="color: #2c3e50; font-size: 14px; margin: 20px 0 10px 0;">${translations.personalityKeywords || '性格关键词'}</h3>
      <div style="background: #f0f8ff; padding: 15px; border-left: 4px solid #007bff; margin-bottom: 15px;">
    `
    Object.entries(astrologyResults.planetKeywords).forEach(([planet, keywords]) => {
      if (Array.isArray(keywords)) {
        html += `<p><strong>${translations[planet] || planet}:</strong> ${keywords.join(', ')}</p>`
      }
    })
    html += `</div>`
  }
  
  // 运势概览
  if (astrologyResults.fortune) {
    html += `
      <h3 style="color: #2c3e50; font-size: 14px; margin: 20px 0 10px 0;">${translations.fortuneOverview || '综合运势'}</h3>
      <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #6c757d; margin-bottom: 15px;">
    `
    if (astrologyResults.fortune.overall) {
      html += `<p>${astrologyResults.fortune.overall}</p>`
    }
    html += `</div>`
  }
  
  html += `</div>`
  return html
}

/**
 * 生成行运分析HTML
 */
function generateTransitAnalysisHTML(transitReport, translations) {
  let html = `
    <div class="section" style="margin-bottom: 25px;">
      <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #20c997; padding-bottom: 5px;">
        ${translations.transitAnalysis}
      </h2>
  `
  
  // 总体概览
  if (transitReport.overview) {
    html += `
      <h3 style="color: #2c3e50; font-size: 14px; margin: 15px 0 10px 0;">${translations.overview}</h3>
    `
    
    if (transitReport.overview.summary) {
      html += `
        <div style="background: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin-bottom: 15px;">
          ${transitReport.overview.summary}
        </div>
      `
    }
    
    // 主要主题
    if (transitReport.overview.keyThemes && transitReport.overview.keyThemes.length > 0) {
      html += `
        <h4 style="color: #495057; font-size: 13px; margin: 10px 0 8px 0;">${translations.keyThemes}</h4>
        <div style="background: #f8f9fa; padding: 12px; border: 1px solid #dee2e6; border-radius: 4px; margin-bottom: 15px;">
          ${transitReport.overview.keyThemes.join(', ')}
        </div>
      `
    }
  }
  
  // 重要生命周期
  if (transitReport.majorCycles && transitReport.majorCycles.length > 0) {
    html += `
      <h3 style="color: #2c3e50; font-size: 14px; margin: 15px 0 10px 0;">${translations.lifeCycles}</h3>
    `
    
    for (const cycle of transitReport.majorCycles) {
      html += `
        <div style="margin-bottom: 15px; padding: 12px; background: #e7f3ff; border: 1px solid #b3d9ff; border-radius: 4px;">
          <h4 style="color: #004085; font-size: 13px; margin: 0 0 8px 0;">
            ${cycle.name} (${cycle.progress}%)
          </h4>
          ${cycle.description ? `<div>${cycle.description}</div>` : ''}
          ${cycle.themes ? `<p><strong>主题:</strong> ${Array.isArray(cycle.themes) ? cycle.themes.join(', ') : cycle.themes}</p>` : ''}
          ${cycle.advice ? `<p><strong>建议:</strong> ${cycle.advice}</p>` : ''}
        </div>
      `
    }
  }
  
  // 人生指导
  if (transitReport.lifeGuidance) {
    html += `
      <h3 style="color: #2c3e50; font-size: 14px; margin: 15px 0 10px 0;">${translations.lifeGuidance}</h3>
    `
    
    const guidanceItems = [
      { key: 'primaryFocus', label: translations.primaryFocus || '主要专注', value: transitReport.lifeGuidance.primaryFocus },
      { key: 'currentChallenge', label: translations.currentChallenge || '当前挑战', value: transitReport.lifeGuidance.currentChallenge },
      { key: 'currentOpportunity', label: translations.currentOpportunity || '重要机遇', value: transitReport.lifeGuidance.currentOpportunity }
    ]
    
    for (const item of guidanceItems) {
      if (item.value) {
        html += `
          <div style="margin-bottom: 12px;">
            <h4 style="color: #6f42c1; font-size: 13px; margin: 0 0 5px 0;">${item.label}</h4>
            <div style="background: #f8f9fa; padding: 10px; border-left: 3px solid #6f42c1;">
              ${item.value}
            </div>
          </div>
        `
      }
    }
    
    // 情感、实践、精神建议
    if (transitReport.lifeGuidance.emotional || transitReport.lifeGuidance.practical || transitReport.lifeGuidance.spiritual) {
      html += `<h4 style="color: #495057; font-size: 13px; margin: 15px 0 8px 0;">详细建议</h4>`
      
      if (transitReport.lifeGuidance.emotional) {
        html += `
          <div style="margin-bottom: 10px; padding: 10px; background: #ffe6f2; border-left: 3px solid #e91e63;">
            <strong>情感建议:</strong> ${transitReport.lifeGuidance.emotional}
          </div>
        `
      }
      
      if (transitReport.lifeGuidance.practical) {
        html += `
          <div style="margin-bottom: 10px; padding: 10px; background: #e6f7ff; border-left: 3px solid #1890ff;">
            <strong>实践建议:</strong> ${transitReport.lifeGuidance.practical}
          </div>
        `
      }
      
      if (transitReport.lifeGuidance.spiritual) {
        html += `
          <div style="margin-bottom: 10px; padding: 10px; background: #f6f0ff; border-left: 3px solid #722ed1;">
            <strong>精神建议:</strong> ${transitReport.lifeGuidance.spiritual}
          </div>
        `
      }
    }
  }
  
  // 分野別詳細アドバイス / 分领域详细建议
  if (transitReport.recommendations) {
    html += `
      <h3 style="color: #2c3e50; font-size: 14px; margin: 20px 0 10px 0;">${translations.detailedRecommendations || '分野別詳細アドバイス'}</h3>
    `
    
    // 事业发展
    if (transitReport.recommendations.career) {
      html += `
        <div style="margin-bottom: 15px;">
          <h4 style="color: #28a745; font-size: 13px; margin: 0 0 8px 0;">💼 ${translations.careerDevelopment || '事业发展'}</h4>
          <div style="background: #e8f5e8; padding: 12px; border: 1px solid #28a745; border-radius: 4px;">
      `
      if (transitReport.recommendations.career.focus) {
        html += `<p><strong>重点方向:</strong> ${transitReport.recommendations.career.focus}</p>`
      }
      if (transitReport.recommendations.career.advice) {
        html += `<p><strong>具体建议:</strong> ${transitReport.recommendations.career.advice}</p>`
      }
      if (transitReport.recommendations.career.timing) {
        html += `<p><strong>时机把握:</strong> ${transitReport.recommendations.career.timing}</p>`
      }
      html += `</div></div>`
    }
    
    // 人际关系
    if (transitReport.recommendations.relationships) {
      html += `
        <div style="margin-bottom: 15px;">
          <h4 style="color: #dc3545; font-size: 13px; margin: 0 0 8px 0;">❤️ ${translations.relationships || '人际关系'}</h4>
          <div style="background: #f8e8e8; padding: 12px; border: 1px solid #dc3545; border-radius: 4px;">
      `
      if (transitReport.recommendations.relationships.focus) {
        html += `<p><strong>关系重点:</strong> ${transitReport.recommendations.relationships.focus}</p>`
      }
      if (transitReport.recommendations.relationships.advice) {
        html += `<p><strong>关系建议:</strong> ${transitReport.recommendations.relationships.advice}</p>`
      }
      if (transitReport.recommendations.relationships.compatibility) {
        html += `<p><strong>相性建议:</strong> ${transitReport.recommendations.relationships.compatibility}</p>`
      }
      html += `</div></div>`
    }
    
    // 健康管理
    if (transitReport.recommendations.health) {
      html += `
        <div style="margin-bottom: 15px;">
          <h4 style="color: #fd7e14; font-size: 13px; margin: 0 0 8px 0;">🏥 ${translations.healthManagement || '健康管理'}</h4>
          <div style="background: #fff3e0; padding: 12px; border: 1px solid #fd7e14; border-radius: 4px;">
      `
      if (transitReport.recommendations.health.physical) {
        html += `<p><strong>身体健康:</strong> ${transitReport.recommendations.health.physical}</p>`
      }
      if (transitReport.recommendations.health.mental) {
        html += `<p><strong>心理健康:</strong> ${transitReport.recommendations.health.mental}</p>`
      }
      if (transitReport.recommendations.health.emotional) {
        html += `<p><strong>情感健康:</strong> ${transitReport.recommendations.health.emotional}</p>`
      }
      html += `</div></div>`
    }
    
    // 个人成长
    if (transitReport.recommendations.personal) {
      html += `
        <div style="margin-bottom: 15px;">
          <h4 style="color: #6f42c1; font-size: 13px; margin: 0 0 8px 0;">🌟 ${translations.personalGrowth || '个人成长'}</h4>
          <div style="background: #f3e5f5; padding: 12px; border: 1px solid #6f42c1; border-radius: 4px;">
      `
      if (transitReport.recommendations.personal.priorities) {
        const priorities = Array.isArray(transitReport.recommendations.personal.priorities) 
          ? transitReport.recommendations.personal.priorities.join(', ') 
          : transitReport.recommendations.personal.priorities
        html += `<p><strong>发展重点:</strong> ${priorities}</p>`
      }
      if (transitReport.recommendations.personal.methods) {
        const methods = Array.isArray(transitReport.recommendations.personal.methods) 
          ? transitReport.recommendations.personal.methods.join(', ') 
          : transitReport.recommendations.personal.methods
        html += `<p><strong>成长方法:</strong> ${methods}</p>`
      }
      html += `</div></div>`
    }
    
    // 财务规划
    if (transitReport.recommendations.financial) {
      html += `
        <div style="margin-bottom: 15px;">
          <h4 style="color: #17a2b8; font-size: 13px; margin: 0 0 8px 0;">💰 ${translations.financialPlanning || '财务规划'}</h4>
          <div style="background: #e6f7ff; padding: 12px; border: 1px solid #17a2b8; border-radius: 4px;">
      `
      if (transitReport.recommendations.financial.approach) {
        html += `<p><strong>理财方针:</strong> ${transitReport.recommendations.financial.approach}</p>`
      }
      if (transitReport.recommendations.financial.advice) {
        html += `<p><strong>财务建议:</strong> ${transitReport.recommendations.financial.advice}</p>`
      }
      if (transitReport.recommendations.financial.priority) {
        html += `<p><strong>优先考虑:</strong> ${transitReport.recommendations.financial.priority}</p>`
      }
      html += `</div></div>`
    }
    
    // 时机把握
    if (transitReport.recommendations.timing) {
      html += `
        <div style="margin-bottom: 15px;">
          <h4 style="color: #20c997; font-size: 13px; margin: 0 0 8px 0;">⏰ ${translations.timingGuidance || '时机把握'}</h4>
          <div style="background: #e6fff9; padding: 12px; border: 1px solid #20c997; border-radius: 4px;">
      `
      if (transitReport.recommendations.timing.bestTiming) {
        html += `<p><strong>最佳时机:</strong> ${transitReport.recommendations.timing.bestTiming}</p>`
      }
      if (transitReport.recommendations.timing.avoidTiming) {
        html += `<p><strong>避免时期:</strong> ${transitReport.recommendations.timing.avoidTiming}</p>`
      }
      if (transitReport.recommendations.timing.keyDates) {
        const keyDates = Array.isArray(transitReport.recommendations.timing.keyDates) 
          ? transitReport.recommendations.timing.keyDates.join(', ') 
          : transitReport.recommendations.timing.keyDates
        html += `<p><strong>重要日期:</strong> ${keyDates}</p>`
      }
      html += `</div></div>`
    }
  }
  
  // 未来展望
  if (transitReport.futureOutlook) {
    html += `
      <h3 style="color: #2c3e50; font-size: 14px; margin: 20px 0 10px 0;">${translations.futureOutlook || '未来展望'}</h3>
    `
    
    if (transitReport.futureOutlook.next3Months) {
      html += `
        <div style="margin-bottom: 12px; padding: 12px; background: #e8f4fd; border-left: 4px solid #0066cc;">
          <h4 style="color: #0066cc; font-size: 13px; margin: 0 0 5px 0;">📅 ${translations.next3Months || '今后3个月'}</h4>
          <p>${transitReport.futureOutlook.next3Months}</p>
        </div>
      `
    }
    
    if (transitReport.futureOutlook.next6Months) {
      html += `
        <div style="margin-bottom: 12px; padding: 12px; background: #fff4e6; border-left: 4px solid #ff8c00;">
          <h4 style="color: #ff8c00; font-size: 13px; margin: 0 0 5px 0;">📅 ${translations.next6Months || '今后6个月'}</h4>
          <p>${transitReport.futureOutlook.next6Months}</p>
        </div>
      `
    }
    
    if (transitReport.futureOutlook.nextYear) {
      html += `
        <div style="margin-bottom: 12px; padding: 12px; background: #f0f8e6; border-left: 4px solid #52c41a;">
          <h4 style="color: #52c41a; font-size: 13px; margin: 0 0 5px 0;">📅 ${translations.nextYear || '来年展望'}</h4>
          <p>${transitReport.futureOutlook.nextYear}</p>
        </div>
      `
    }
    
    if (transitReport.futureOutlook.longTerm) {
      html += `
        <div style="margin-bottom: 12px; padding: 12px; background: #faf0ff; border-left: 4px solid #9254de;">
          <h4 style="color: #9254de; font-size: 13px; margin: 0 0 5px 0;">🔮 ${translations.longTerm || '长期展望'}</h4>
          <p>${transitReport.futureOutlook.longTerm}</p>
        </div>
      `
    }
  }
  
  // 外惑星影响
  if (transitReport.outerPlanets) {
    html += `
      <h3 style="color: #2c3e50; font-size: 14px; margin: 20px 0 10px 0;">${translations.outerPlanetsInfluence || '外惑星深度影响'}</h3>
    `
    
    const planets = ['saturn', 'uranus', 'neptune', 'pluto']
    planets.forEach(planet => {
      if (transitReport.outerPlanets[planet]) {
        const planetData = transitReport.outerPlanets[planet]
        html += `
          <div style="margin-bottom: 15px; padding: 12px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px;">
            <h4 style="color: #495057; font-size: 13px; margin: 0 0 8px 0;">
              🪐 ${planetData.name || planet} - ${planetData.influence || '影响中'}
            </h4>
            ${planetData.description ? `<p>${planetData.description}</p>` : ''}
            ${planetData.advice ? `<p><strong>建议:</strong> ${planetData.advice}</p>` : ''}
          </div>
        `
      }
    })
  }
  
  html += `</div>`
  return html
}

/**
 * 获取翻译文本
 */
function getTranslations(currentLanguage) {
  const translations = {
    zh: {
      title: '个人命理综合分析报告',
      personalInfo: '基本信息',
      name: '姓名',
      gender: '性别',
      birthDate: '出生日期',
      birthTime: '出生时间',
      birthPlace: '出生地点',
      baziAnalysis: '生辰八字分析',
      fourPillars: '四柱八字',
      elements: '五行分析',
      personality: '性格特质',
      astrologyAnalysis: '占星分析',
      sunSign: '太阳星座',
      moonSign: '月亮星座',
      ascendantSign: '上升星座',
      transitAnalysis: '行运分析',
      overview: '总体概览',
      keyThemes: '主要主题',
      lifeCycles: '重要生命周期',
      lifeGuidance: '人生指导',
      primaryFocus: '主要专注',
      currentChallenge: '当前挑战',
      currentOpportunity: '重要机遇',
      footer: '本报告由命盤系统生成',
      shortFooter: '命盤系统',
      generatedOn: '生成时间',
      male: '男',
      female: '女',
      // 扩展的翻译键
      careerAnalysis: '事业发展分析',
      careerStrengths: '事业优势',
      careerSuggestions: '适合职业',
      relationshipAnalysis: '感情关系分析',
      loveStyle: '恋爱风格',
      friendshipStyle: '友谊风格',
      compatibleSigns: '相配星座',
      personalityKeywords: '性格关键词',
      fortuneOverview: '综合运势',
      detailedRecommendations: '分领域详细建议',
      careerDevelopment: '事业发展',
      relationships: '人际关系',
      healthManagement: '健康管理',
      personalGrowth: '个人成长',
      financialPlanning: '财务规划',
      timingGuidance: '时机把握',
      futureOutlook: '未来展望',
      next3Months: '今后3个月',
      next6Months: '今后6个月',
      nextYear: '来年展望',
      longTerm: '长期展望',
      outerPlanetsInfluence: '外惑星深度影响',
      sun: '太阳',
      moon: '月亮',
      mars: '火星',
      venus: '金星',
      mercury: '水星',
      jupiter: '木星',
      saturn: '土星'
    },
    ja: {
      title: '個人命理総合分析レポート',
      personalInfo: '基本情報',
      name: '氏名',
      gender: '性別',
      birthDate: '生年月日',
      birthTime: '生時間',
      birthPlace: '出生地',
      baziAnalysis: '生辰八字分析',
      fourPillars: '四柱八字',
      elements: '五行分析',
      personality: '性格特性',
      astrologyAnalysis: '占星分析',
      sunSign: '太陽サイン',
      moonSign: '月サイン',
      ascendantSign: 'アセンダントサイン',
      transitAnalysis: '行運分析',
      overview: '総合概観',
      keyThemes: '主要テーマ',
      lifeCycles: '重要なライフサイクル',
      lifeGuidance: '人生指導',
      primaryFocus: '主要焦点',
      currentChallenge: '現在の課題',
      currentOpportunity: '重要な機会',
      footer: '本レポートは命盤システムにより生成',
      shortFooter: '命盤システム',
      generatedOn: '生成日時',
      male: '男性',
      female: '女性',
      // 扩展的翻译键
      careerAnalysis: 'キャリア発展分析',
      careerStrengths: 'キャリア強み',
      careerSuggestions: '適職',
      relationshipAnalysis: '恋愛関係分析',
      loveStyle: '恋愛スタイル',
      friendshipStyle: '友情スタイル',
      compatibleSigns: '相性の良い星座',
      personalityKeywords: '性格キーワード',
      fortuneOverview: '総合運勢',
      detailedRecommendations: '分野別詳細アドバイス',
      careerDevelopment: 'キャリア発展',
      relationships: '人間関係',
      healthManagement: '健康管理',
      personalGrowth: '個人成長',
      financialPlanning: '財務計画',
      timingGuidance: 'タイミング指導',
      futureOutlook: '未来展望',
      next3Months: '今後3ヶ月',
      next6Months: '今後6ヶ月',
      nextYear: '来年展望',
      longTerm: '長期展望',
      outerPlanetsInfluence: '外惑星深度影響',
      sun: '太陽',
      moon: '月',
      mars: '火星',
      venus: '金星',
      mercury: '水星',
      jupiter: '木星',
      saturn: '土星'
    },
    en: {
      title: 'Comprehensive Personal Numerology & Astrology Report',
      personalInfo: 'Personal Information',
      name: 'Name',
      gender: 'Gender',
      birthDate: 'Birth Date',
      birthTime: 'Birth Time',
      birthPlace: 'Birth Place',
      baziAnalysis: 'Bazi Analysis',
      fourPillars: 'Four Pillars',
      elements: 'Five Elements Analysis',
      personality: 'Personality Traits',
      astrologyAnalysis: 'Astrology Analysis',
      sunSign: 'Sun Sign',
      moonSign: 'Moon Sign',
      ascendantSign: 'Ascendant Sign',
      transitAnalysis: 'Transit Analysis',
      overview: 'Overview',
      keyThemes: 'Key Themes',
      lifeCycles: 'Major Life Cycles',
      lifeGuidance: 'Life Guidance',
      primaryFocus: 'Primary Focus',
      currentChallenge: 'Current Challenge',
      currentOpportunity: 'Important Opportunity',
      footer: 'This report is generated by Meiban system',
      shortFooter: 'Meiban System',
      generatedOn: 'Generated on',
      male: 'Male',
      female: 'Female',
      // 扩展的翻译键
      careerAnalysis: 'Career Development Analysis',
      careerStrengths: 'Career Strengths',
      careerSuggestions: 'Suitable Careers',
      relationshipAnalysis: 'Relationship Analysis',
      loveStyle: 'Love Style',
      friendshipStyle: 'Friendship Style',
      compatibleSigns: 'Compatible Signs',
      personalityKeywords: 'Personality Keywords',
      fortuneOverview: 'Overall Fortune',
      detailedRecommendations: 'Detailed Field Recommendations',
      careerDevelopment: 'Career Development',
      relationships: 'Relationships',
      healthManagement: 'Health Management',
      personalGrowth: 'Personal Growth',
      financialPlanning: 'Financial Planning',
      timingGuidance: 'Timing Guidance',
      futureOutlook: 'Future Outlook',
      next3Months: 'Next 3 Months',
      next6Months: 'Next 6 Months',
      nextYear: 'Next Year Outlook',
      longTerm: 'Long-term Outlook',
      outerPlanetsInfluence: 'Outer Planets Deep Influence',
      sun: 'Sun',
      moon: 'Moon',
      mars: 'Mars',
      venus: 'Venus',
      mercury: 'Mercury',
      jupiter: 'Jupiter',
      saturn: 'Saturn'
    }
  }
  
  return translations[currentLanguage] || translations.zh
}

/**
 * 下载PDF文件
 */
export function downloadPDF(pdf, filename) {
  const timestamp = new Date().toISOString().slice(0, 10)
  const fullFilename = `${filename}-${timestamp}.pdf`
  pdf.save(fullFilename)
}

/**
 * 从DOM元素生成PDF（用于包含图表等复杂内容）
 */
export async function generatePDFFromElement(elementId) {
  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`)
  }
  
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff'
  })
  
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })
  
  const imgWidth = 210
  const pageHeight = 295
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  let heightLeft = imgHeight
  let position = 0
  
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight
  
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }
  
  return pdf
}

/**
 * 智能分页函数 - 避免在文本中间截断，并添加页眉页脚
 */
async function intelligentPagination(pdf, canvas, imgWidth, imgHeight, pageHeight, currentLanguage) {
  const headerHeight = 15 // 页眉高度(mm)
  const footerHeight = 15 // 页脚高度(mm)
  const contentHeight = pageHeight - headerHeight - footerHeight // 内容区域高度
  const topMargin = 10 // 内容顶部边距(mm)
  
  let currentY = 0
  let pageNum = 0
  
  // 预先计算实际需要的页数
  let totalPages = 1
  let simulatedY = 0
  while (simulatedY < imgHeight) {
    const remainingHeight = imgHeight - simulatedY
    let simulatedPageHeight = Math.min(contentHeight, remainingHeight)
    
    if (remainingHeight > contentHeight) {
      simulatedPageHeight = findOptimalBreakPoint(canvas, simulatedY, contentHeight, imgWidth, imgHeight)
    }
    
    simulatedY += simulatedPageHeight
    if (simulatedY < imgHeight) {
      totalPages++
    }
  }
  
  console.log('Starting intelligent pagination with headers/footers...')
  console.log(`Content area height: ${contentHeight}mm, calculated pages: ${totalPages}`)
  
  while (currentY < imgHeight) {
    const remainingHeight = imgHeight - currentY
    let actualContentHeight = Math.min(contentHeight, remainingHeight)
    
    // 如果不是最后一页，尝试找到合适的分页点
    if (remainingHeight > contentHeight) {
      actualContentHeight = findOptimalBreakPoint(canvas, currentY, contentHeight, imgWidth, imgHeight)
    }
    
    console.log(`Page ${pageNum + 1}: currentY=${currentY}, contentHeight=${actualContentHeight}, remaining=${remainingHeight}`)
    
    // 计算在原始canvas中的像素位置
    const canvasY = (currentY / imgHeight) * canvas.height
    const canvasContentHeight = (actualContentHeight / imgHeight) * canvas.height
    
    // 创建当前页面的canvas
    const pageCanvas = document.createElement('canvas')
    const pageCtx = pageCanvas.getContext('2d')
    
    // 设置canvas尺寸（为内容区域）
    pageCanvas.width = canvas.width
    pageCanvas.height = canvasContentHeight
    
    // 绘制当前页面内容部分
    pageCtx.drawImage(
      canvas,
      0, canvasY, // 源起始位置
      canvas.width, canvasContentHeight, // 源区域尺寸
      0, 0, // 目标位置
      canvas.width, canvasContentHeight // 目标尺寸
    )
    
    // 转换为图片数据
    const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95)
    
    // 添加新页面（第一页除外）
    if (pageNum > 0) {
      pdf.addPage()
    }
    
    // 添加页眉
    addPageHeader(pdf, pageNum + 1, totalPages, imgWidth, headerHeight, currentLanguage)
    
    // 添加内容（留出页眉空间和顶部边距）
    const contentY = headerHeight + topMargin
    pdf.addImage(pageImgData, 'JPEG', 0, contentY, imgWidth, actualContentHeight)
    
    // 添加页脚
    addPageFooter(pdf, pageNum + 1, totalPages, imgWidth, pageHeight, footerHeight, currentLanguage)
    
    // 更新位置和页码
    currentY += actualContentHeight
    pageNum++
  }
  
  return pageNum
}

/**
 * 寻找最佳分页点 - 避免在文本中间截断
 */
function findOptimalBreakPoint(canvas, startY, maxHeight, imgWidth, imgHeight) {
  const ctx = canvas.getContext('2d')
  const startPixelY = (startY / imgHeight) * canvas.height
  const maxPixelHeight = (maxHeight / imgHeight) * canvas.height
  
  // 从理想分页点往上搜索空白区域（段落间隙）
  const searchRange = maxPixelHeight * 0.15 // 搜索范围为页面高度的15%
  const targetY = startPixelY + maxPixelHeight
  
  // 从目标位置向上搜索，寻找空白行（段落间隙）
  for (let searchY = targetY; searchY > targetY - searchRange && searchY > startPixelY; searchY -= 2) {
    if (isEmptyRow(ctx, Math.floor(searchY), canvas.width)) {
      // 找到空白行，这是一个好的分页点
      const adjustedHeight = ((searchY - startPixelY) / canvas.height) * imgHeight
      console.log(`Found optimal break point at ${adjustedHeight}mm (was ${maxHeight}mm)`)
      return Math.max(adjustedHeight, maxHeight * 0.7) // 确保不会过短
    }
  }
  
  // 如果没找到理想的分页点，尝试避开文本行的中间部分
  const lineHeight = 20 // 估计的行高（像素）
  const adjustedHeight = maxHeight - (maxHeight % (lineHeight / (canvas.height / imgHeight)))
  
  console.log(`Using line-adjusted break point: ${adjustedHeight}mm`)
  return Math.max(adjustedHeight, maxHeight * 0.8)
}

/**
 * 检查是否为空白行
 */
function isEmptyRow(ctx, y, width) {
  try {
    const imageData = ctx.getImageData(0, y, width, 1)
    const data = imageData.data
    
    // 检查行中的像素，如果大部分都是白色或接近白色，则认为是空白行
    let whitePixels = 0
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      
      // 如果RGB值都大于240，认为是白色或接近白色
      if (r > 240 && g > 240 && b > 240) {
        whitePixels++
      }
    }
    
    // 如果90%以上的像素都是白色，认为这是一个空白行
    return (whitePixels / (data.length / 4)) > 0.9
  } catch (error) {
    // 如果出错，返回false
    return false
  }
}

/**
 * 添加页眉
 */
function addPageHeader(pdf, currentPage, totalPages, pageWidth, headerHeight, currentLanguage) {
  const translations = getTranslations(currentLanguage)
  
  // 设置页眉字体
  pdf.setFontSize(10)
  pdf.setTextColor(100, 100, 100) // 灰色
  
  // 页眉左侧 - 报告标题
  pdf.text(translations.title, 20, 8)
  
  // 页眉右侧 - 页码
  const pageText = `${currentPage} / ${totalPages}`
  const pageTextWidth = pdf.getTextWidth(pageText)
  pdf.text(pageText, pageWidth - 20 - pageTextWidth, 8)
  
  // 页眉下方分割线
  pdf.setDrawColor(200, 200, 200) // 浅灰色线条
  pdf.setLineWidth(0.5)
  pdf.line(20, headerHeight - 2, pageWidth - 20, headerHeight - 2)
  
  // 重置文本颜色
  pdf.setTextColor(0, 0, 0)
}

/**
 * 添加页脚
 */
function addPageFooter(pdf, currentPage, totalPages, pageWidth, pageHeight, footerHeight, currentLanguage) {
  const translations = getTranslations(currentLanguage)
  const footerY = pageHeight - footerHeight
  
  // 页脚上方分割线
  pdf.setDrawColor(200, 200, 200) // 浅灰色线条
  pdf.setLineWidth(0.5)
  pdf.line(20, footerY + 2, pageWidth - 20, footerY + 2)
  
  // 设置页脚字体
  pdf.setFontSize(8)
  pdf.setTextColor(120, 120, 120) // 更浅的灰色
  
  // 页脚左侧 - 生成信息
  const currentDate = new Date().toLocaleDateString(
    currentLanguage === 'zh' ? 'zh-CN' : 
    currentLanguage === 'ja' ? 'ja-JP' : 'en-US'
  )
  pdf.text(`${translations.generatedOn}：${currentDate}`, 20, footerY + 8)
  
  // 页脚右侧 - 系统信息
  const systemInfo = translations.shortFooter
  const systemInfoWidth = pdf.getTextWidth(systemInfo)
  pdf.text(systemInfo, pageWidth - 20 - systemInfoWidth, footerY + 8)
  
  // 重置文本颜色
  pdf.setTextColor(0, 0, 0)
}