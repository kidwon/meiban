import { createRouter, createWebHistory } from 'vue-router'
import store from '../store' // 导入 Vuex store
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/results/:id',
    name: 'results',
    component: () => import('../views/ResultsPage.vue')
  },
  {
    path: '/transit-analysis',
    name: 'transit-analysis', 
    component: () => import('../views/TransitAnalysisPage.vue'),
    meta: { requiresUserData: true }
  }
]

const router = createRouter({
  // 确保base路径与vue.config.js中的publicPath匹配
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 修复后的路由守卫
router.beforeEach((to, from, next) => {
  console.log('路由守卫检查:', to.name, to.meta);
  
  if (to.meta.requiresUserData) {
    // 从 Vuex store 获取用户数据，而不是直接从 localStorage
    const userData = store.getters.getUserData;
    console.log('路由守卫检查用户数据:', userData);
    
    // 更完整的数据验证
    const hasValidUserData = userData && 
                             userData.name && 
                             userData.birthdate &&
                             userData.birthHour !== null &&
                             userData.birthHour !== undefined &&
                             userData.birthHour !== '' &&
                             userData.birthMinute !== null &&
                             userData.birthMinute !== undefined &&
                             userData.birthMinute !== '' &&
                             userData.birthplace &&
                             userData.gender;
    
    console.log('用户数据验证结果:', hasValidUserData);
    
    if (!hasValidUserData) {
      console.log('用户数据不完整，重定向到首页');
      // 没有用户数据，重定向到首页
      alert('行運分析需要完整的出生信息，請先填寫基本資料');
      next({ name: 'home' });
    } else {
      console.log('用户数据验证通过，允许访问');
      next();
    }
  } else {
    next();
  }
});

export default router