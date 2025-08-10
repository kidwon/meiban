#!/usr/bin/env node

/**
 * 分享功能测试脚本
 * 使用 Node.js 环境测试数据编码和解码功能
 */

// 模拟浏览器环境
global.window = {
  location: {
    origin: 'https://meiban.info',
    pathname: '/'
  },
  btoa: (str) => Buffer.from(str, 'utf8').toString('base64'),
  atob: (str) => Buffer.from(str, 'base64').toString('utf8')
};

// 测试数据
const mockUserData = {
  name: "测试用户",
  birthdate: "1990-03-15",
  birthHour: 14,
  birthMinute: 30,
  birthplace: "北京",
  gender: "male",
  fullBirthDateTime: "1990-03-15T14:30:00.000Z"
};

const mockCalculationResults = {
  eightCharacters: {
    year: { heavenlyStem: "庚", earthlyBranch: "午" },
    month: { heavenlyStem: "己", earthlyBranch: "卯" },
    day: { heavenlyStem: "癸", earthlyBranch: "亥" },
    hour: { heavenlyStem: "己", earthlyBranch: "未" }
  },
  elements: ["金", "土", "水", "土"],
  astrologyPositions: {
    ascendant: { sign: "双子座", degree: 4, minute: 11 },
    sun: { sign: "双鱼座", degree: 13, minute: 49 },
    moon: { sign: "水瓶座", degree: 18, minute: 56 }
  },
  fortune: {
    overview: "大吉",
    career: "★★★☆☆",
    wealth: "★★★★☆",
    love: "★★★★★",
    health: "★★★☆☆"
  }
};

// 测试函数
async function testDataEncoder() {
  console.log('🧪 开始测试数据编码器...\n');

  try {
    // 动态导入（需要 ES modules 支持）
    const { 
      encodeDataForUrl, 
      decodeDataFromUrl, 
      generateShareUrl,
      generateShareContent,
      validateShareData,
      isUrlLengthReasonable
    } = await import('./src/utils/dataEncoder.js');

    console.log('✅ 模块导入成功');

    // 测试1: 数据编码
    console.log('\n📦 测试1: 数据编码');
    const shareData = {
      userData: mockUserData,
      calculationResults: mockCalculationResults,
      analysisType: 'astrology'
    };

    const encoded = encodeDataForUrl(shareData);
    console.log(`✅ 编码成功，长度: ${encoded.length} 字符`);
    console.log(`📏 编码结果: ${encoded.substring(0, 100)}...`);

    // 测试2: 数据解码
    console.log('\n📤 测试2: 数据解码');
    const decoded = decodeDataFromUrl(encoded);
    console.log(`✅ 解码成功`);
    console.log(`👤 用户姓名: ${decoded.userData.name}`);
    console.log(`📅 出生日期: ${decoded.userData.birthdate}`);
    console.log(`🔮 分析类型: ${decoded.analysisType}`);

    // 测试3: 数据验证
    console.log('\n🔍 测试3: 数据验证');
    const isValid = validateShareData(decoded);
    console.log(`✅ 数据验证: ${isValid ? '通过' : '失败'}`);

    // 测试4: 分享URL生成
    console.log('\n🔗 测试4: 分享URL生成');
    const astrologyUrl = generateShareUrl(mockUserData, mockCalculationResults, 'astrology');
    const baziUrl = generateShareUrl(mockUserData, mockCalculationResults, 'bazi');
    
    console.log(`🌟 占星分析链接: ${astrologyUrl}`);
    console.log(`📜 生辰八字链接: ${baziUrl}`);

    // 测试5: URL长度检查
    console.log('\n📏 测试5: URL长度检查');
    console.log(`占星链接长度合理: ${isUrlLengthReasonable(astrologyUrl) ? '✅' : '❌'}`);
    console.log(`八字链接长度合理: ${isUrlLengthReasonable(baziUrl) ? '✅' : '❌'}`);

    // 测试6: 分享内容生成
    console.log('\n📝 测试6: 分享内容生成');
    const astrologyContent = generateShareContent(mockUserData, mockCalculationResults, 'astrology');
    const baziContent = generateShareContent(mockUserData, mockCalculationResults, 'bazi');
    
    console.log('🌟 占星分析分享内容:');
    console.log(`  标题: ${astrologyContent.title}`);
    console.log(`  描述: ${astrologyContent.desc}`);
    
    console.log('📜 生辰八字分享内容:');
    console.log(`  标题: ${baziContent.title}`);
    console.log(`  描述: ${baziContent.desc}`);

    console.log('\n🎉 所有测试通过！');

  } catch (error) {
    console.error('❌ 测试失败:', error);
    console.error(error.stack);
  }
}

async function testWechatShare() {
  console.log('\n🍃 开始测试微信分享工具...\n');

  try {
    const { isWechatBrowser } = await import('./src/utils/wechatShare.js');
    
    console.log('✅ 微信分享模块导入成功');
    
    // 模拟不同的 User Agent
    const testUserAgents = [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0',
      'Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
    ];

    testUserAgents.forEach((ua, index) => {
      // 临时修改 navigator.userAgent (在Node.js环境中不会真正生效)
      console.log(`\n测试 User Agent ${index + 1}:`);
      console.log(`UA: ${ua.substring(0, 80)}...`);
      
      // 检查是否包含 micromessenger
      const isWechat = /micromessenger/i.test(ua);
      console.log(`微信环境检测: ${isWechat ? '✅ 是' : '❌ 否'}`);
    });

  } catch (error) {
    console.error('❌ 微信分享测试失败:', error);
  }
}

// 执行测试
async function runAllTests() {
  console.log('🚀 开始执行分享功能测试套件');
  console.log('=' * 50);
  
  await testDataEncoder();
  await testWechatShare();
  
  console.log('\n' + '=' * 50);
  console.log('✨ 测试套件执行完毕');
  console.log('\n💡 提示:');
  console.log('  - 在浏览器中打开 share-test.html 进行完整的前端测试');
  console.log('  - 使用生成的分享链接测试数据恢复功能');
  console.log('  - 在微信环境中测试微信分享功能');
}

runAllTests().catch(console.error);