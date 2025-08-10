/**
 * 微信分享配置工具
 * 集成微信JS-SDK实现原生分享体验
 */

/**
 * 检查是否在微信浏览器中
 * @returns {boolean}
 */
export function isWechatBrowser() {
  return /micromessenger/i.test(navigator.userAgent);
}

/**
 * 动态加载微信JS-SDK
 * @returns {Promise<boolean>} 加载成功返回true
 */
export function loadWechatJSSDK() {
  return new Promise((resolve, reject) => {
    // 检查是否已经加载
    if (window.wx) {
      resolve(true);
      return;
    }

    // 创建script标签
    const script = document.createElement('script');
    script.src = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js';
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('微信JS-SDK加载失败'));
    
    document.head.appendChild(script);
  });
}

/**
 * 配置微信分享参数
 * @param {Object} config - 分享配置
 * @param {string} config.title - 分享标题
 * @param {string} config.desc - 分享描述  
 * @param {string} config.link - 分享链接
 * @param {string} config.imgUrl - 分享图片URL
 * @param {Function} config.success - 分享成功回调
 * @param {Function} config.cancel - 分享取消回调
 */
export async function configWechatShare(config) {
  try {
    // 检查微信环境
    if (!isWechatBrowser()) {
      console.log('非微信环境，跳过微信分享配置');
      return false;
    }

    // 加载微信JS-SDK
    await loadWechatJSSDK();

    // 这里需要后端提供签名信息
    // 暂时使用模拟配置，实际使用时需要调用后端API获取签名
    const wxConfig = {
      debug: false, // 生产环境设为false
      appId: 'your_app_id', // 需要配置
      timestamp: Math.floor(Date.now() / 1000),
      nonceStr: generateNonceStr(),
      signature: 'your_signature', // 需要后端提供
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage', 
        'onMenuShareQQ',
        'onMenuShareQZone',
        'updateAppMessageShareData',
        'updateTimelineShareData'
      ]
    };

    // 配置微信JS-SDK
    window.wx.config(wxConfig);

    // 微信配置成功后设置分享参数
    window.wx.ready(() => {
      // 新版API：分享给朋友
      window.wx.updateAppMessageShareData({
        title: config.title,
        desc: config.desc,
        link: config.link,
        imgUrl: config.imgUrl,
        success: config.success || (() => console.log('分享给朋友成功')),
        cancel: config.cancel || (() => console.log('取消分享给朋友'))
      });

      // 新版API：分享到朋友圈
      window.wx.updateTimelineShareData({
        title: config.title,
        link: config.link,
        imgUrl: config.imgUrl,
        success: config.success || (() => console.log('分享到朋友圈成功')),
        cancel: config.cancel || (() => console.log('取消分享到朋友圈'))
      });

      // 兼容旧版API
      window.wx.onMenuShareAppMessage({
        title: config.title,
        desc: config.desc,
        link: config.link,
        imgUrl: config.imgUrl,
        success: config.success,
        cancel: config.cancel
      });

      window.wx.onMenuShareTimeline({
        title: config.title,
        link: config.link,
        imgUrl: config.imgUrl,
        success: config.success,
        cancel: config.cancel
      });

      console.log('微信分享配置成功');
    });

    // 微信配置失败处理
    window.wx.error((res) => {
      console.error('微信JS-SDK配置失败:', res);
    });

    return true;
  } catch (error) {
    console.error('配置微信分享失败:', error);
    return false;
  }
}

/**
 * 生成随机字符串（用于微信签名）
 * @returns {string}
 */
function generateNonceStr() {
  return Math.random().toString(36).slice(2, 15) + 
         Math.random().toString(36).slice(2, 15);
}

/**
 * 获取微信签名（需要后端API支持）
 * @param {string} url - 当前页面URL
 * @returns {Promise<Object>} 签名信息
 */
export async function getWechatSignature() {
  try {
    // 这里应该调用后端API获取微信签名
    // const response = await fetch('/api/wechat/signature', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ url })
    // });
    // return await response.json();

    // 暂时返回模拟数据
    console.warn('微信签名功能需要后端API支持');
    return {
      appId: 'your_app_id',
      timestamp: Math.floor(Date.now() / 1000),
      nonceStr: generateNonceStr(),
      signature: 'mock_signature'
    };
  } catch (error) {
    console.error('获取微信签名失败:', error);
    throw error;
  }
}

/**
 * 自定义分享触发（在非微信环境使用）
 * @param {Object} shareData - 分享数据
 */
export function triggerCustomShare(shareData) {
  if (navigator.share) {
    // 使用Web Share API
    navigator.share({
      title: shareData.title,
      text: shareData.desc,
      url: shareData.link
    }).then(() => {
      console.log('Web Share API分享成功');
    }).catch((error) => {
      console.log('Web Share API分享失败:', error);
      fallbackShare(shareData);
    });
  } else {
    fallbackShare(shareData);
  }
}

/**
 * 降级分享方案
 * @param {Object} shareData - 分享数据
 */
function fallbackShare(shareData) {
  // 复制链接到剪贴板
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareData.link).then(() => {
      alert('链接已复制到剪贴板，请手动分享');
    }).catch(() => {
      showShareModal(shareData);
    });
  } else {
    showShareModal(shareData);
  }
}

/**
 * 显示分享模态框
 * @param {Object} shareData - 分享数据
 */
function showShareModal(shareData) {
  // 创建分享模态框
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;

  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 300px;
    text-align: center;
  `;

  content.innerHTML = `
    <h3>${shareData.title}</h3>
    <p>${shareData.desc}</p>
    <input type="text" value="${shareData.link}" style="width: 100%; padding: 10px; margin: 10px 0;" readonly>
    <div>
      <button onclick="navigator.clipboard && navigator.clipboard.writeText('${shareData.link}').then(() => alert('已复制'))" 
              style="margin: 5px; padding: 10px 20px;">复制链接</button>
      <button onclick="this.closest('[style*=fixed]').remove()" 
              style="margin: 5px; padding: 10px 20px;">关闭</button>
    </div>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  // 点击背景关闭
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

/**
 * 生成分享的Open Graph meta标签
 * @param {Object} shareData - 分享数据
 */
export function generateOpenGraphMeta(shareData) {
  const metaTags = [
    { property: 'og:title', content: shareData.title },
    { property: 'og:description', content: shareData.desc },
    { property: 'og:image', content: shareData.imgUrl },
    { property: 'og:url', content: shareData.link },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: shareData.title },
    { name: 'twitter:description', content: shareData.desc },
    { name: 'twitter:image', content: shareData.imgUrl }
  ];

  // 移除现有的meta标签
  metaTags.forEach(tag => {
    const selector = tag.property ? `meta[property="${tag.property}"]` : `meta[name="${tag.name}"]`;
    const existing = document.querySelector(selector);
    if (existing) {
      existing.remove();
    }
  });

  // 添加新的meta标签
  metaTags.forEach(tag => {
    const meta = document.createElement('meta');
    if (tag.property) {
      meta.setAttribute('property', tag.property);
    } else {
      meta.setAttribute('name', tag.name);
    }
    meta.setAttribute('content', tag.content);
    document.head.appendChild(meta);
  });
}

/**
 * 统计分享事件（如果有统计需求）
 * @param {string} platform - 分享平台
 * @param {string} type - 分享类型
 */
export function trackShareEvent(platform, type) {
  // 这里可以集成统计分析工具
  // 比如 Google Analytics, 百度统计等
  
  if (window.gtag) {
    window.gtag('event', 'share', {
      method: platform,
      content_type: type,
      content_id: window.location.pathname
    });
  }

  console.log(`分享统计: ${platform} - ${type}`);
}