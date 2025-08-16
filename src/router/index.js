import { createRouter, createWebHistory } from 'vue-router'
import store from '../store' // 导入 Vuex store
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  // 原有的通用结果页面，保持向后兼容
  {
    path: '/results/:id',
    name: 'results',
    component: () => import('../views/ResultsPage.vue')
  },
  // 新增：生辰八字结果页面
  {
    path: '/bazi-results/:id',
    name: 'bazi-results',
    component: () => import('../views/BaziResultsPage.vue'),
    meta: { 
      requiresUserData: true,
      analysisType: 'bazi',
      title: '生辰八字結果'
    }
  },
  // 新增：占星分析结果页面
  {
    path: '/astrology-results/:id',
    name: 'astrology-results',
    component: () => import('../views/AstrologyResultsPage.vue'),
    meta: { 
      requiresUserData: true,
      analysisType: 'astrology',
      title: '占星分析結果'
    }
  },
  // 分享页面路由（支持数据恢复）
  {
    path: '/bazi-results/shared',
    name: 'bazi-results-shared',
    component: () => import('../views/BaziResultsPage.vue'),
    meta: { 
      requiresSharedData: true,
      analysisType: 'bazi',
      title: '生辰八字結果'
    }
  },
  {
    path: '/astrology-results/shared', 
    name: 'astrology-results-shared',
    component: () => import('../views/AstrologyResultsPage.vue'),
    meta: {
      requiresSharedData: true,
      analysisType: 'astrology',
      title: '占星分析結果'
    }
  },
  // 行运分析页面
  {
    path: '/transit-analysis',
    name: 'transit-analysis', 
    component: () => import('../views/TransitAnalysisPage.vue'),
    meta: { 
      requiresUserData: true,
      title: '行運盤分析'
    }
  },
  // 新增：错误页面
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/ErrorPage.vue'),
    props: route => ({ 
      error: route.query.error || 'Unknown error',
      message: route.query.message || 'An error occurred'
    })
  },
  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundPage.vue')
  }
]

const router = createRouter({
  // 确保base路径与vue.config.js中的publicPath匹配
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 处理GitHub Pages的SPA重定向
router.beforeEach((to, from, next) => {
  // 检查是否是从404页面重定向过来的
  const redirectPath = sessionStorage.getItem('spa_redirect');
  if (redirectPath && to.path === '/' && to.query.spa) {
    sessionStorage.removeItem('spa_redirect');
    // 清除spa参数并导航到原始路径
    const query = { ...to.query };
    delete query.spa;
    router.replace({ path: '/' + redirectPath, query });
    return;
  }
  next();
});

// 增强的路由守卫
router.beforeEach(async (to, from, next) => {
  console.log('路由守卫检查:', to.name, to.meta);
  
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 命盤`;
  } else {
    document.title = '命盤 - 生辰八字・占星分析';
  }
  
  // 处理分享页面（从URL恢复数据）
  if (to.meta.requiresSharedData) {
    try {
      const { restoreDataFromUrl, validateShareData } = await import('../utils/dataEncoder.js');
      // 将查询对象转换为URLSearchParams格式
      const searchParams = new URLSearchParams(to.query).toString();
      const sharedData = restoreDataFromUrl(searchParams);
      
      if (sharedData && validateShareData(sharedData)) {
        // 将分享数据保存到store
        console.log('从分享链接恢复数据:', sharedData);
        store.commit('setUserData', sharedData.userData);
        store.commit('setCalculationResults', sharedData.calculationResults);
        store.commit('setAnalysisType', sharedData.analysisType);
        
        console.log('分享数据恢复成功，允许访问');
        next();
        return;
      } else {
        console.log('分享数据无效，重定向到首页');
        // 静默重定向，不显示alert
        next({ name: 'home' });
        return;
      }
    } catch (error) {
      console.error('处理分享数据失败:', error);
      // 静默重定向，不显示alert
      next({ name: 'home' });
      return;
    }
  }
  
  if (to.meta.requiresUserData) {
    // 从 Vuex store 获取用户数据
    const userData = store.getters.getUserData;
    const calculationResults = store.getters.getCalculationResults;
    
    console.log('路由守卫检查用户数据:', userData);
    console.log('路由守卫检查计算结果:', calculationResults);
    
    // 验证用户数据完整性
    const hasValidUserData = userData && 
                             userData.birthdate &&
                             userData.birthHour !== null &&
                             userData.birthHour !== undefined &&
                             userData.birthHour !== '' &&
                             userData.birthMinute !== null &&
                             userData.birthMinute !== undefined &&
                             userData.birthMinute !== '' &&
                             userData.birthplace &&
                             userData.birthplace.trim() !== '' &&
                             userData.gender;
    
    console.log('用户数据验证结果:', hasValidUserData);
    
    if (!hasValidUserData) {
      console.log('用户数据不完整，尝试恢复或重定向');
      
      // 检查是否是从GitHub Pages重定向过来的（说明可能是有效链接）
      const fromSPA = to.query.spa || sessionStorage.getItem('spa_redirect');
      
      if (fromSPA) {
        // 如果是SPA重定向，显示友好提示并跳转到首页
        console.log('检测到SPA重定向，但数据已失效');
        // 可以在这里显示一个提示，告诉用户链接可能已过期
        next({ name: 'home', query: { expired: '1' } });
      } else {
        // 正常的应用内导航，静默重定向
        next({ name: 'home' });
      }
      return;
    }
    
    // 对于结果页面，还需要检查是否有计算结果
    if ((to.name === 'bazi-results' || to.name === 'astrology-results') && !calculationResults) {
      console.log('没有计算结果');
      
      // 同样检查是否是从外部链接进入
      const fromSPA = to.query.spa || sessionStorage.getItem('spa_redirect');
      
      if (fromSPA) {
        console.log('外部链接访问但无计算结果，可能链接已过期');
        next({ name: 'home', query: { expired: '1' } });
      } else {
        // 应用内导航，静默重定向
        next({ name: 'home' });
      }
      return;
    }
    
    console.log('用户数据验证通过，允许访问');
    next();
  } else {
    next();
  }
});

// 路由错误处理
router.onError((error) => {
  console.error('Router error:', error);
  
  // 导航到错误页面
  router.push({
    name: 'error',
    query: {
      error: error.name || 'RouterError',
      message: error.message || 'Navigation failed'
    }
  });
});

// 添加路由元信息用于调试
router.afterEach((to, from) => {
  console.log(`路由跳转: ${from.name} -> ${to.name}`);
  
  // 发送页面浏览统计（如果需要）
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: to.meta.title || to.name,
      page_location: window.location.href
    });
  }
});

export default router