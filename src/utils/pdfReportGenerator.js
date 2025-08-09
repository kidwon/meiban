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
  // 创建一个临时的HTML容器来渲染报告内容
  const reportContainer = document.createElement('div')
  reportContainer.style.cssText = `
    position: absolute;
    top: -10000px;
    left: -10000px;
    width: 210mm;
    background: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 12px;
    line-height: 1.6;
    color: #333;
    padding: 20mm;
    box-sizing: border-box;
  `
  
  // 生成HTML内容
  reportContainer.innerHTML = generateReportHTML(userData, calculationResults, transitReport, currentLanguage)
  
  // 添加到页面
  document.body.appendChild(reportContainer)
  
  try {
    // 使用html2canvas截图
    const canvas = await html2canvas(reportContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: reportContainer.offsetWidth,
      height: reportContainer.offsetHeight
    })
    
    // 创建PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    
    // 计算图片尺寸
    const imgWidth = 210 // A4宽度
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    const pageHeight = 297 // A4高度
    
    let yPosition = 0
    
    // 分页处理
    while (yPosition < imgHeight) {
      const remainingHeight = imgHeight - yPosition
      const currentHeight = Math.min(pageHeight, remainingHeight)
      
      // 创建当前页面的canvas
      const pageCanvas = document.createElement('canvas')
      const pageCtx = pageCanvas.getContext('2d')
      
      pageCanvas.width = canvas.width
      pageCanvas.height = (currentHeight / imgHeight) * canvas.height
      
      // 绘制当前页面部分
      pageCtx.drawImage(
        canvas,
        0, (yPosition / imgHeight) * canvas.height, // 源位置
        canvas.width, (currentHeight / imgHeight) * canvas.height, // 源尺寸
        0, 0, // 目标位置
        pageCanvas.width, pageCanvas.height // 目标尺寸
      )
      
      // 添加到PDF
      const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95)
      
      if (yPosition > 0) {
        pdf.addPage()
      }
      
      pdf.addImage(pageImgData, 'JPEG', 0, 0, imgWidth, currentHeight)
      
      yPosition += currentHeight
    }
    
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
  
  let html = `
    <div class="report-container">
      <div class="report-header">
        <h1 style="text-align: center; margin-bottom: 30px; color: #2c3e50; font-size: 24px; font-weight: bold;">
          ${translations.title}
        </h1>
      </div>
  `
  
  // 个人信息部分
  html += generatePersonalInfoHTML(userData, translations)
  
  // 生辰八字分析
  if (calculationResults && calculationResults.bazi) {
    html += generateBaziAnalysisHTML(calculationResults.bazi, translations)
  }
  
  // 占星分析
  if (calculationResults && calculationResults.astrology) {
    html += generateAstrologyAnalysisHTML(calculationResults.astrology, translations)
  }
  
  // 行运分析
  if (transitReport) {
    html += generateTransitAnalysisHTML(transitReport, translations)
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
  
  return html
}

/**
 * 生成个人信息HTML
 */
function generatePersonalInfoHTML(userData, translations) {
  return `
    <div class="section" style="margin-bottom: 25px;">
      <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #3498db; padding-bottom: 5px;">
        ${translations.personalInfo}
      </h2>
      <div class="info-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
        <p><strong>${translations.name}:</strong> ${userData.name || 'N/A'}</p>
        <p><strong>${translations.gender}:</strong> ${translations[userData.gender] || userData.gender || 'N/A'}</p>
        <p><strong>${translations.birthDate}:</strong> ${userData.birthdate || 'N/A'}</p>
        <p><strong>${translations.birthTime}:</strong> ${userData.birthHour || '00'}:${String(userData.birthMinute || 0).padStart(2, '0')}</p>
        <p style="grid-column: 1 / -1;"><strong>${translations.birthPlace}:</strong> ${userData.birthplace || 'N/A'}</p>
      </div>
    </div>
  `
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
    
    for (const cycle of transitReport.majorCycles.slice(0, 3)) {
      html += `
        <div style="margin-bottom: 15px; padding: 12px; background: #e7f3ff; border: 1px solid #b3d9ff; border-radius: 4px;">
          <h4 style="color: #004085; font-size: 13px; margin: 0 0 8px 0;">
            ${cycle.name} (${cycle.progress}%)
          </h4>
          ${cycle.description ? `<div>${cycle.description}</div>` : ''}
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
      { key: 'primaryFocus', label: translations.primaryFocus, value: transitReport.lifeGuidance.primaryFocus },
      { key: 'currentChallenge', label: translations.currentChallenge, value: transitReport.lifeGuidance.currentChallenge },
      { key: 'currentOpportunity', label: translations.currentOpportunity, value: transitReport.lifeGuidance.currentOpportunity }
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
      generatedOn: '生成时间',
      male: '男',
      female: '女'
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
      generatedOn: '生成日時',
      male: '男性',
      female: '女性'
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
      generatedOn: 'Generated on',
      male: 'Male',
      female: 'Female'
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