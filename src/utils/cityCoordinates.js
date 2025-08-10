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

  // 新增日本城市 - 关东地区
  '千葉': { lat: 35.6074, lng: 140.1065, country: 'JP' },
  '千叶': { lat: 35.6074, lng: 140.1065, country: 'JP' },
  '川崎': { lat: 35.5308, lng: 139.7029, country: 'JP' },
  'さいたま': { lat: 35.8617, lng: 139.6455, country: 'JP' },
  '埼玉': { lat: 35.8617, lng: 139.6455, country: 'JP' },
  '宇都宮': { lat: 36.5658, lng: 139.8836, country: 'JP' },
  '宇都宫': { lat: 36.5658, lng: 139.8836, country: 'JP' },
  '水戸': { lat: 36.3418, lng: 140.4468, country: 'JP' },
  '水户': { lat: 36.3418, lng: 140.4468, country: 'JP' },
  '前橋': { lat: 36.3902, lng: 139.0606, country: 'JP' },
  '前桥': { lat: 36.3902, lng: 139.0606, country: 'JP' },

  // 新增日本城市 - 关西地区
  '神戸': { lat: 34.6901, lng: 135.1956, country: 'JP' },
  '神户': { lat: 34.6901, lng: 135.1956, country: 'JP' },
  '奈良': { lat: 34.6851, lng: 135.8048, country: 'JP' },
  '和歌山': { lat: 34.2261, lng: 135.1675, country: 'JP' },
  '大津': { lat: 35.0044, lng: 135.8686, country: 'JP' },

  // 新增日本城市 - 中部地区  
  '静岡': { lat: 34.9769, lng: 138.3830, country: 'JP' },
  '静冈': { lat: 34.9769, lng: 138.3830, country: 'JP' },
  '新潟': { lat: 37.9022, lng: 139.0232, country: 'JP' },
  '金沢': { lat: 36.5946, lng: 136.6256, country: 'JP' },
  '金泽': { lat: 36.5946, lng: 136.6256, country: 'JP' },
  '富山': { lat: 36.6959, lng: 137.2137, country: 'JP' },
  '福井': { lat: 36.0652, lng: 136.2217, country: 'JP' },
  '長野': { lat: 36.6513, lng: 138.1810, country: 'JP' },
  '长野': { lat: 36.6513, lng: 138.1810, country: 'JP' },
  '甲府': { lat: 35.6642, lng: 138.5686, country: 'JP' },

  // 新增日本城市 - 九州地区
  '熊本': { lat: 32.7898, lng: 130.7417, country: 'JP' },
  '鹿児島': { lat: 31.5966, lng: 130.5571, country: 'JP' },
  '鹿儿岛': { lat: 31.5966, lng: 130.5571, country: 'JP' },
  '長崎': { lat: 32.7448, lng: 129.8737, country: 'JP' },
  '长崎': { lat: 32.7448, lng: 129.8737, country: 'JP' },
  '大分': { lat: 33.2382, lng: 131.6126, country: 'JP' },
  '宮崎': { lat: 31.9077, lng: 131.4202, country: 'JP' },
  '宫崎': { lat: 31.9077, lng: 131.4202, country: 'JP' },
  '佐賀': { lat: 33.2494, lng: 130.2989, country: 'JP' },
  '佐贺': { lat: 33.2494, lng: 130.2989, country: 'JP' },

  // 新增日本城市 - 东北地区
  '盛岡': { lat: 39.7036, lng: 141.1527, country: 'JP' },
  '盛冈': { lat: 39.7036, lng: 141.1527, country: 'JP' },
  '山形': { lat: 38.2404, lng: 140.3633, country: 'JP' },
  '福島': { lat: 37.7503, lng: 140.4676, country: 'JP' },
  '福岛': { lat: 37.7503, lng: 140.4676, country: 'JP' },
  '青森': { lat: 40.8244, lng: 140.7400, country: 'JP' },
  '秋田': { lat: 39.7186, lng: 140.1023, country: 'JP' },

  // 新增日本城市 - 四国及其他地区
  '高松': { lat: 34.3401, lng: 134.0434, country: 'JP' },
  '松山': { lat: 33.8416, lng: 132.7657, country: 'JP' },
  '徳島': { lat: 34.0658, lng: 134.5594, country: 'JP' },
  '德岛': { lat: 34.0658, lng: 134.5594, country: 'JP' },
  '高知': { lat: 33.5597, lng: 133.5311, country: 'JP' },
  '那覇': { lat: 26.2125, lng: 127.6792, country: 'JP' },
  '那霸': { lat: 26.2125, lng: 127.6792, country: 'JP' },

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
  
  // 新增中国城市 - 缺失省会城市
  '合肥': { lat: 31.8206, lng: 117.2272, country: 'CN' },
  '南昌': { lat: 28.6820, lng: 115.8581, country: 'CN' },
  
  // 新增中国城市 - 重要地级市 (江苏省)
  '无锡': { lat: 31.4912, lng: 120.3117, country: 'CN' },
  '常州': { lat: 31.7720, lng: 119.9740, country: 'CN' },
  '徐州': { lat: 34.2058, lng: 117.2841, country: 'CN' },
  '南通': { lat: 32.0166, lng: 120.8658, country: 'CN' },
  '连云港': { lat: 34.5986, lng: 119.1248, country: 'CN' },
  '淮安': { lat: 33.5975, lng: 119.0153, country: 'CN' },
  '盐城': { lat: 33.3775, lng: 120.1573, country: 'CN' },
  '扬州': { lat: 32.3932, lng: 119.4215, country: 'CN' },
  '镇江': { lat: 32.2044, lng: 119.4519, country: 'CN' },
  '泰州': { lat: 32.4849, lng: 119.9151, country: 'CN' },
  '宿迁': { lat: 33.9630, lng: 118.2757, country: 'CN' },
  
  // 新增中国城市 - 重要地级市 (广东省)
  '珠海': { lat: 22.2711, lng: 113.5767, country: 'CN' },
  '汕头': { lat: 23.3540, lng: 116.6817, country: 'CN' },
  '佛山': { lat: 23.0218, lng: 113.1219, country: 'CN' },
  '韶关': { lat: 24.8049, lng: 113.5914, country: 'CN' },
  '湛江': { lat: 21.2717, lng: 110.3594, country: 'CN' },
  '肇庆': { lat: 23.0515, lng: 112.4654, country: 'CN' },
  '江门': { lat: 22.5902, lng: 113.0946, country: 'CN' },
  '茂名': { lat: 21.6681, lng: 110.9253, country: 'CN' },
  '惠州': { lat: 23.0795, lng: 114.4166, country: 'CN' },
  '梅州': { lat: 24.2886, lng: 116.1226, country: 'CN' },
  '汕尾': { lat: 22.7868, lng: 115.3647, country: 'CN' },
  '河源': { lat: 23.7463, lng: 114.6975, country: 'CN' },
  '阳江': { lat: 21.8577, lng: 111.9821, country: 'CN' },
  '清远': { lat: 23.6816, lng: 113.0372, country: 'CN' },
  '东莞': { lat: 23.0204, lng: 113.7518, country: 'CN' },
  '中山': { lat: 22.5150, lng: 113.3927, country: 'CN' },
  '潮州': { lat: 23.6618, lng: 116.6227, country: 'CN' },
  '揭阳': { lat: 23.5536, lng: 116.3558, country: 'CN' },
  '云浮': { lat: 22.9292, lng: 112.0440, country: 'CN' },
  
  // 新增中国城市 - 重要地级市 (山东省)
  '威海': { lat: 37.5016, lng: 122.1201, country: 'CN' },
  '烟台': { lat: 37.4638, lng: 121.4478, country: 'CN' },
  '潍坊': { lat: 36.7069, lng: 119.1619, country: 'CN' },
  '临沂': { lat: 35.1041, lng: 118.3563, country: 'CN' },
  '淄博': { lat: 36.8135, lng: 118.0548, country: 'CN' },
  '济宁': { lat: 35.4154, lng: 116.5874, country: 'CN' },
  '泰安': { lat: 36.1943, lng: 117.0888, country: 'CN' },
  '聊城': { lat: 36.4568, lng: 115.9854, country: 'CN' },
  '德州': { lat: 37.4341, lng: 116.3074, country: 'CN' },
  '东营': { lat: 37.4346, lng: 118.6748, country: 'CN' },
  '滨州': { lat: 37.3835, lng: 117.9708, country: 'CN' },
  '菏泽': { lat: 35.2334, lng: 115.4697, country: 'CN' },
  '枣庄': { lat: 34.8107, lng: 117.3235, country: 'CN' },
  '日照': { lat: 35.4164, lng: 119.5269, country: 'CN' },
  '莱芜': { lat: 36.2142, lng: 117.6770, country: 'CN' },
  
  // 新增中国城市 - 其他重要地级市
  '包头': { lat: 40.6578, lng: 109.8397, country: 'CN' },
  '鄂尔多斯': { lat: 39.6086, lng: 109.7811, country: 'CN' },
  '赤峰': { lat: 42.2588, lng: 118.9568, country: 'CN' },
  '大庆': { lat: 46.5907, lng: 125.1031, country: 'CN' },
  '齐齐哈尔': { lat: 47.3544, lng: 123.9180, country: 'CN' },
  '牡丹江': { lat: 44.5831, lng: 129.6333, country: 'CN' },
  '绵阳': { lat: 31.4677, lng: 104.6794, country: 'CN' },
  '德阳': { lat: 31.1270, lng: 104.3980, country: 'CN' },
  '南充': { lat: 30.7953, lng: 106.0847, country: 'CN' },
  '宜宾': { lat: 28.7518, lng: 104.6308, country: 'CN' },
  '遵义': { lat: 27.7257, lng: 106.9348, country: 'CN' },
  '安顺': { lat: 26.2455, lng: 105.9472, country: 'CN' },
  '曲靖': { lat: 25.4898, lng: 103.7968, country: 'CN' },
  '大理': { lat: 25.6064, lng: 100.2670, country: 'CN' },
  '丽江': { lat: 26.8721, lng: 100.2275, country: 'CN' },
  '桂林': { lat: 25.2736, lng: 110.2900, country: 'CN' },
  '柳州': { lat: 24.3146, lng: 109.4281, country: 'CN' },
  '洛阳': { lat: 34.6196, lng: 112.4540, country: 'CN' },
  '开封': { lat: 34.7970, lng: 114.3074, country: 'CN' },
  '新乡': { lat: 35.3030, lng: 113.9268, country: 'CN' },
  
  // 浙江省详细城市
  '台州': { lat: 28.6568, lng: 121.4281, country: 'CN' },
  '天台': { lat: 29.1444, lng: 121.0114, country: 'CN' },
  '玉环': { lat: 28.1356, lng: 121.2318, country: 'CN' },
  '温州': { lat: 28.0015, lng: 120.6997, country: 'CN' },
  '嘉兴': { lat: 30.7463, lng: 120.7550, country: 'CN' },
  '湖州': { lat: 30.8936, lng: 120.0856, country: 'CN' },
  '绍兴': { lat: 30.0023, lng: 120.5810, country: 'CN' },
  '金华': { lat: 29.1028, lng: 119.6471, country: 'CN' },
  '衢州': { lat: 28.9569, lng: 118.8739, country: 'CN' },
  '舟山': { lat: 29.9850, lng: 122.2068, country: 'CN' },
  '丽水': { lat: 28.4517, lng: 119.9217, country: 'CN' },

  // 港澳台地区
  '香港': { lat: 22.3193, lng: 114.1694, country: 'HK' },
  '澳门': { lat: 22.1987, lng: 113.5439, country: 'MO' },
  '澳門': { lat: 22.1987, lng: 113.5439, country: 'MO' },
  '台北': { lat: 25.0330, lng: 121.5654, country: 'TW' },
  '臺北': { lat: 25.0330, lng: 121.5654, country: 'TW' },
  '高雄': { lat: 22.6273, lng: 120.3014, country: 'TW' },
  '台中': { lat: 24.1477, lng: 120.6736, country: 'TW' },
  '臺中': { lat: 24.1477, lng: 120.6736, country: 'TW' },
  '台南': { lat: 22.9999, lng: 120.2269, country: 'TW' },
  '臺南': { lat: 22.9999, lng: 120.2269, country: 'TW' },
  '新竹': { lat: 24.8138, lng: 120.9675, country: 'TW' },
  '基隆': { lat: 25.1276, lng: 121.7392, country: 'TW' },
  '嘉义': { lat: 23.4801, lng: 120.4491, country: 'TW' },
  '嘉義': { lat: 23.4801, lng: 120.4491, country: 'TW' },
  '桃园': { lat: 24.9937, lng: 121.2654, country: 'TW' },
  '桃園': { lat: 24.9937, lng: 121.2654, country: 'TW' }
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