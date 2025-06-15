/**
 * 城市坐标数据库
 * 包含日本、中国、港澳台地区的主要城市坐标信息
 */

// 城市坐标数据库
export const CITY_COORDINATES = {
  // 日本
  '東京': { lat: 35.6762, lng: 139.6503, country: 'JP' },
  '东京': { lat: 35.6762, lng: 139.6503, country: 'JP' },
  '大阪': { lat: 34.6937, lng: 135.5023, country: 'JP' },
  '京都': { lat: 35.0116, lng: 135.7681, country: 'JP' },
  '横浜': { lat: 35.4437, lng: 139.6380, country: 'JP' },
  '横滨': { lat: 35.4437, lng: 139.6380, country: 'JP' },
  '名古屋': { lat: 35.1815, lng: 136.9066, country: 'JP' },
  '福岡': { lat: 33.5904, lng: 130.4017, country: 'JP' },
  '福冈': { lat: 33.5904, lng: 130.4017, country: 'JP' },
  '札幌': { lat: 43.0642, lng: 141.3469, country: 'JP' },
  '仙台': { lat: 38.2682, lng: 140.8694, country: 'JP' },
  '広島': { lat: 34.3853, lng: 132.4553, country: 'JP' },
  '广岛': { lat: 34.3853, lng: 132.4553, country: 'JP' },
  '沖縄': { lat: 26.2125, lng: 127.6792, country: 'JP' },
  '冲绳': { lat: 26.2125, lng: 127.6792, country: 'JP' },

  // 中国主要城市
  '北京': { lat: 39.9042, lng: 116.4074, country: 'CN' },
  '上海': { lat: 31.2304, lng: 121.4737, country: 'CN' },
  '广州': { lat: 23.1291, lng: 113.2644, country: 'CN' },
  '深圳': { lat: 22.5431, lng: 114.0579, country: 'CN' },
  '杭州': { lat: 30.2741, lng: 120.1551, country: 'CN' },
  '南京': { lat: 32.0603, lng: 118.7969, country: 'CN' },
  '苏州': { lat: 31.2989, lng: 120.5853, country: 'CN' },
  '武汉': { lat: 30.5928, lng: 114.3055, country: 'CN' },
  '成都': { lat: 30.5728, lng: 104.0668, country: 'CN' },
  '重庆': { lat: 29.5630, lng: 106.5516, country: 'CN' },
  '西安': { lat: 34.3416, lng: 108.9398, country: 'CN' },
  '天津': { lat: 39.3434, lng: 117.3616, country: 'CN' },
  '青岛': { lat: 36.0986, lng: 120.3719, country: 'CN' },
  '大连': { lat: 38.9140, lng: 121.6147, country: 'CN' },
  '厦门': { lat: 24.4798, lng: 118.0819, country: 'CN' },
  '福州': { lat: 26.0745, lng: 119.2965, country: 'CN' },
  '济南': { lat: 36.6512, lng: 117.1201, country: 'CN' },
  '郑州': { lat: 34.7466, lng: 113.6254, country: 'CN' },
  '长沙': { lat: 28.2282, lng: 112.9388, country: 'CN' },
  '哈尔滨': { lat: 45.8038, lng: 126.5349, country: 'CN' },
  '沈阳': { lat: 41.8057, lng: 123.4315, country: 'CN' },
  '长春': { lat: 43.8171, lng: 125.3235, country: 'CN' },
  '石家庄': { lat: 38.0428, lng: 114.5149, country: 'CN' },
  '太原': { lat: 37.8706, lng: 112.5489, country: 'CN' },
  '呼和浩特': { lat: 40.8414, lng: 111.7525, country: 'CN' },
  '银川': { lat: 38.4681, lng: 106.2731, country: 'CN' },
  '西宁': { lat: 36.6171, lng: 101.7782, country: 'CN' },
  '兰州': { lat: 36.0611, lng: 103.8343, country: 'CN' },
  '乌鲁木齐': { lat: 43.8256, lng: 87.6168, country: 'CN' },
  '拉萨': { lat: 29.6520, lng: 91.1721, country: 'CN' },
  '昆明': { lat: 25.0389, lng: 102.7183, country: 'CN' },
  '贵阳': { lat: 26.6470, lng: 106.6302, country: 'CN' },
  '南宁': { lat: 22.8170, lng: 108.3669, country: 'CN' },
  '海口': { lat: 20.0444, lng: 110.1989, country: 'CN' },
  '三亚': { lat: 18.2533, lng: 109.5007, country: 'CN' },
  
  // 浙江省详细城市
  '台州': { lat: 28.6568, lng: 121.4281, country: 'CN' },
  '天台': { lat: 29.1444, lng: 121.0114, country: 'CN' },
  '天台县': { lat: 29.1444, lng: 121.0114, country: 'CN' },
  '玉环': { lat: 28.1356, lng: 121.2318, country: 'CN' },
  '玉环县': { lat: 28.1356, lng: 121.2318, country: 'CN' },
  '温州': { lat: 28.0015, lng: 120.6997, country: 'CN' },
  '嘉兴': { lat: 30.7463, lng: 120.7550, country: 'CN' },
  '湖州': { lat: 30.8936, lng: 120.0856, country: 'CN' },
  '绍兴': { lat: 30.0023, lng: 120.5810, country: 'CN' },
  '金华': { lat: 29.1028, lng: 119.6471, country: 'CN' },
  '衢州': { lat: 28.9569, lng: 118.8739, country: 'CN' },
  '舟山': { lat: 29.9850, lng: 122.2068, country: 'CN' },
  '丽水': { lat: 28.4517, lng: 119.9217, country: 'CN' },

  // 港澳台
  '香港': { lat: 22.3193, lng: 114.1694, country: 'HK' },
  '澳门': { lat: 22.1987, lng: 113.5439, country: 'MO' },
  '澳門': { lat: 22.1987, lng: 113.5439, country: 'MO' },
  '台北': { lat: 25.0330, lng: 121.5654, country: 'TW' },
  '臺北': { lat: 25.0330, lng: 121.5654, country: 'TW' },
  '高雄': { lat: 22.6273, lng: 120.3014, country: 'TW' },
  '台中': { lat: 24.1477, lng: 120.6736, country: 'TW' },
  '臺中': { lat: 24.1477, lng: 120.6736, country: 'TW' }
};

// 省份映射到主要城市
export const PROVINCE_TO_CITY = {
  '北京市': '北京', '上海市': '上海', '天津市': '天津', '重庆市': '重庆',
  '河北': '石家庄', '河北省': '石家庄', '山西': '太原', '山西省': '太原',
  '内蒙古': '呼和浩特', '辽宁': '沈阳', '辽宁省': '沈阳', '吉林': '长春', '吉林省': '长春',
  '黑龙江': '哈尔滨', '黑龙江省': '哈尔滨', '江苏': '南京', '江苏省': '南京',
  '浙江': '杭州', '浙江省': '杭州', '安徽': '合肥', '安徽省': '合肥',
  '福建': '福州', '福建省': '福州', '江西': '南昌', '江西省': '南昌',
  '山东': '济南', '山东省': '济南', '河南': '郑州', '河南省': '郑州',
  '湖北': '武汉', '湖北省': '武汉', '湖南': '长沙', '湖南省': '长沙',
  '广东': '广州', '广东省': '广州', '广西': '南宁', '海南': '海口', '海南省': '海口',
  '四川': '成都', '四川省': '成都', '贵州': '贵阳', '贵州省': '贵阳',
  '云南': '昆明', '云南省': '昆明', '西藏': '拉萨', '陕西': '西安', '陕西省': '西安',
  '甘肃': '兰州', '甘肃省': '兰州', '青海': '西宁', '青海省': '西宁',
  '宁夏': '银川', '新疆': '乌鲁木齐'
};

/**
 * 获取城市列表（用于前端选择组件）
 */
export function getCityList() {
  const cities = { japanese: [], chinese: [], hkTaiwan: [] };

  Object.entries(CITY_COORDINATES).forEach(([cityName, cityData]) => {
    const cityItem = { value: cityName, label: cityName };

    if (cityData.country === 'JP' && !cities.japanese.find(item => item.value === cityName)) {
      cities.japanese.push(cityItem);
    } else if (cityData.country === 'CN' && !cities.chinese.find(item => item.value === cityName)) {
      cities.chinese.push(cityItem);
    } else if (['HK', 'MO', 'TW'].includes(cityData.country) && !cities.hkTaiwan.find(item => item.value === cityName)) {
      cities.hkTaiwan.push(cityItem);
    }
  });

  // 排序
  cities.japanese.sort((a, b) => a.label.localeCompare(b.label));
  cities.chinese.sort((a, b) => a.label.localeCompare(b.label));
  cities.hkTaiwan.sort((a, b) => a.label.localeCompare(b.label));

  return cities;
}

/**
 * 根据地点获取坐标
 */
export function getCoordinatesFromLocation(location) {
  // 精确匹配
  if (CITY_COORDINATES[location]) return CITY_COORDINATES[location];

  // 包含匹配
  for (const [key, coords] of Object.entries(CITY_COORDINATES)) {
    if (location.includes(key) || key.includes(location)) return coords;
  }

  // 省份匹配
  for (const [province, city] of Object.entries(PROVINCE_TO_CITY)) {
    if (location.includes(province) && CITY_COORDINATES[city]) return CITY_COORDINATES[city];
  }

  // 默认东京
  return { lat: 35.6762, lng: 139.6503, country: 'JP' };
}