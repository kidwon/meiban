<template>
  <div class="lesson-container">
    <AppNavigation />
    
    <LanguageSwitcher 
      :compact="isMobile"
      :show-names="!isMobile"
      @language-changed="onLanguageChanged"
    />
    
    <header class="header">
      <nav class="breadcrumb">
        <router-link to="/learn">{{ $t('nav.learn') }}</router-link>
        <span class="separator">›</span>
        <router-link to="/learn/category/astrology">{{ $t('learn.categories.astrology') }}</router-link>
        <span class="separator">›</span>
        <span class="current">{{ $t('lesson.lessonContent.astrologyPlanets.breadcrumb') }}</span>
      </nav>
      <h1 class="title">{{ $t('lesson.lessonContent.astrologyPlanets.title') }}</h1>
      <div class="lesson-meta">
        <span class="category">{{ $t('learn.categories.astrology') }}</span>
        <span class="difficulty">{{ $t('learn.difficulty.intermediate') }}</span>
        <span class="duration">{{ $t('learn.readTime', { minutes: 25 }) }}</span>
      </div>
    </header>

    <div class="content-container">
      <article class="lesson-content">
        <div class="lesson-intro">
          <h2>{{ $t('lesson.lessonContent.common.overview') }}</h2>
          <p>{{ $t('lesson.lessonContent.astrologyPlanets.intro') }}</p>
        </div>

        <div class="lesson-objectives">
          <h3>{{ $t('lesson.lessonContent.common.objectives') }}</h3>
          <ul>
            <li>{{ $t('lesson.lessonContent.astrologyPlanets.objectives.obj1') }}</li>
            <li>{{ $t('lesson.lessonContent.astrologyPlanets.objectives.obj2') }}</li>
            <li>{{ $t('lesson.lessonContent.astrologyPlanets.objectives.obj3') }}</li>
            <li>{{ $t('lesson.lessonContent.astrologyPlanets.objectives.obj4') }}</li>
          </ul>
        </div>

        <div class="lesson-body">
          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.astrologyPlanets.classification.title') }}</h3>
            <p>{{ $t('lesson.lessonContent.astrologyPlanets.classification.intro') }}</p>
            
            <div class="planet-categories">
              <div class="category-card personal">
                <h4>🌟 个人行星 (Personal Planets)</h4>
                <div class="category-info">
                  <p><strong>包含</strong>：太阳、月亮、水星、金星、火星</p>
                  <p><strong>运行周期</strong>：快速（几天到2年）</p>
                  <p><strong>影响范围</strong>：个人性格、日常行为、基本需求</p>
                  <p><strong>重要性</strong>：决定个人的基本特质和表达方式</p>
                </div>
                <div class="category-planets">
                  <span class="planet-tag sun">☉ 太阳</span>
                  <span class="planet-tag moon">☽ 月亮</span>
                  <span class="planet-tag mercury">☿ 水星</span>
                  <span class="planet-tag venus">♀ 金星</span>
                  <span class="planet-tag mars">♂ 火星</span>
                </div>
              </div>

              <div class="category-card social">
                <h4>🌍 社会行星 (Social Planets)</h4>
                <div class="category-info">
                  <p><strong>包含</strong>：木星、土星</p>
                  <p><strong>运行周期</strong>：中等（12-29年）</p>
                  <p><strong>影响范围</strong>：社会关系、人生方向、价值观念</p>
                  <p><strong>重要性</strong>：连接个人与社会的桥梁</p>
                </div>
                <div class="category-planets">
                  <span class="planet-tag jupiter">♃ 木星</span>
                  <span class="planet-tag saturn">♄ 土星</span>
                </div>
              </div>

              <div class="category-card transpersonal">
                <h4>🌌 外行星 (Outer Planets)</h4>
                <div class="category-info">
                  <p><strong>包含</strong>：天王星、海王星、冥王星</p>
                  <p><strong>运行周期</strong>：缓慢（84-248年）</p>
                  <p><strong>影响范围</strong>：时代精神、集体意识、深层转化</p>
                  <p><strong>重要性</strong>：代表世代特征和深层心理</p>
                </div>
                <div class="category-planets">
                  <span class="planet-tag uranus">♅ 天王星</span>
                  <span class="planet-tag neptune">♆ 海王星</span>
                  <span class="planet-tag pluto">♇ 冥王星</span>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>个人行星详解</h3>
            
            <div class="planets-detailed personal-planets">
              <div class="planet-card sun">
                <div class="planet-header">
                  <div class="planet-symbol">☉</div>
                  <div class="planet-info">
                    <h4>太阳 Sun</h4>
                    <span class="planet-keywords">自我 | 意志 | 生命力 | 创造</span>
                  </div>
                  <div class="planet-rulership">
                    <span class="rules">守护</span>
                    <span class="sign">狮子座 ♌</span>
                  </div>
                </div>
                
                <div class="planet-content">
                  <div class="basic-meaning">
                    <h5>基本含义</h5>
                    <p>太阳代表核心自我、生命目标和个人意志。它是意识的中心，象征着我们想要成为什么样的人，以及如何表达自己的独特性。</p>
                  </div>
                  
                  <div class="characteristics">
                    <h5>核心特质</h5>
                    <ul>
                      <li><strong>生命力</strong>：活力、热情、创造力的源泉</li>
                      <li><strong>自我意识</strong>：个人身份认同和存在感</li>
                      <li><strong>领导力</strong>：指挥、组织和影响他人的能力</li>
                      <li><strong>创造性</strong>：艺术表达和自我实现的冲动</li>
                      <li><strong>权威性</strong>：建立威信和获得认可的需求</li>
                    </ul>
                  </div>
                  
                  <div class="life-areas">
                    <h5>影响领域</h5>
                    <div class="areas-grid">
                      <div class="area-item">
                        <strong>个人发展</strong>
                        <p>自我实现的方向和目标</p>
                      </div>
                      <div class="area-item">
                        <strong>事业成就</strong>
                        <p>职业发展和社会地位</p>
                      </div>
                      <div class="area-item">
                        <strong>创造表达</strong>
                        <p>艺术、娱乐和创意活动</p>
                      </div>
                      <div class="area-item">
                        <strong>父亲关系</strong>
                        <p>与父亲或权威人物的关系</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="expressions">
                    <h5>表达方式</h5>
                    <div class="expression-states">
                      <div class="positive-expression">
                        <h6>正面表达</h6>
                        <p>自信、慷慨、有领导力、富有创造性、能够激励他人、具有高贵品格</p>
                      </div>
                      <div class="negative-expression">
                        <h6>负面表达</h6>
                        <p>自负、专横、爱炫耀、过度自我中心、缺乏同理心、傲慢自大</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="planet-card moon">
                <div class="planet-header">
                  <div class="planet-symbol">☽</div>
                  <div class="planet-info">
                    <h4>月亮 Moon</h4>
                    <span class="planet-keywords">情感 | 直觉 | 安全感 | 滋养</span>
                  </div>
                  <div class="planet-rulership">
                    <span class="rules">守护</span>
                    <span class="sign">巨蟹座 ♋</span>
                  </div>
                </div>
                
                <div class="planet-content">
                  <div class="basic-meaning">
                    <h5>基本含义</h5>
                    <p>月亮代表情感世界、直觉反应和内在需求。它反映了我们的情感模式、安全感来源和潜意识的运作方式。</p>
                  </div>
                  
                  <div class="characteristics">
                    <h5>核心特质</h5>
                    <ul>
                      <li><strong>情感反应</strong>：本能的情绪表达和感受方式</li>
                      <li><strong>直觉能力</strong>：超理性的感知和判断</li>
                      <li><strong>安全需求</strong>：对稳定和保护的渴望</li>
                      <li><strong>滋养本能</strong>：照顾他人和自我关怀的冲动</li>
                      <li><strong>记忆储存</strong>：过往经验的情感印记</li>
                    </ul>
                  </div>
                  
                  <div class="life-areas">
                    <h5>影响领域</h5>
                    <div class="areas-grid">
                      <div class="area-item">
                        <strong>情感生活</strong>
                        <p>内心感受和情绪表达</p>
                      </div>
                      <div class="area-item">
                        <strong>家庭关系</strong>
                        <p>家庭环境和亲密关系</p>
                      </div>
                      <div class="area-item">
                        <strong>生活习惯</strong>
                        <p>日常作息和生活模式</p>
                      </div>
                      <div class="area-item">
                        <strong>母亲关系</strong>
                        <p>与母亲或养育者的关系</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="expressions">
                    <h5>表达方式</h5>
                    <div class="expression-states">
                      <div class="positive-expression">
                        <h6>正面表达</h6>
                        <p>体贴、直觉敏锐、富有同情心、善于照顾他人、情感丰富、适应性强</p>
                      </div>
                      <div class="negative-expression">
                        <h6>负面表达</h6>
                        <p>情绪化、过度敏感、缺乏安全感、过度依赖、情绪不稳定、抗拒变化</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="planet-card mercury">
                <div class="planet-header">
                  <div class="planet-symbol">☿</div>
                  <div class="planet-info">
                    <h4>水星 Mercury</h4>
                    <span class="planet-keywords">沟通 | 思维 | 学习 | 信息</span>
                  </div>
                  <div class="planet-rulership">
                    <span class="rules">守护</span>
                    <span class="sign">双子座 ♊ | 处女座 ♍</span>
                  </div>
                </div>
                
                <div class="planet-content">
                  <div class="basic-meaning">
                    <h5>基本含义</h5>
                    <p>水星代表思维方式、沟通能力和信息处理。它影响我们如何思考、学习、表达想法和与他人交流。</p>
                  </div>
                  
                  <div class="characteristics">
                    <h5>核心特质</h5>
                    <ul>
                      <li><strong>思维模式</strong>：逻辑推理和信息分析能力</li>
                      <li><strong>沟通技巧</strong>：语言表达和交流方式</li>
                      <li><strong>学习能力</strong>：接收和处理新知识的方式</li>
                      <li><strong>适应性</strong>：灵活应对变化的能力</li>
                      <li><strong>好奇心</strong>：探索和了解世界的冲动</li>
                    </ul>
                  </div>
                  
                  <div class="life-areas">
                    <h5>影响领域</h5>
                    <div class="areas-grid">
                      <div class="area-item">
                        <strong>学习教育</strong>
                        <p>学习方式和知识获取</p>
                      </div>
                      <div class="area-item">
                        <strong>沟通交流</strong>
                        <p>语言表达和人际沟通</p>
                      </div>
                      <div class="area-item">
                        <strong>信息处理</strong>
                        <p>数据分析和逻辑思维</p>
                      </div>
                      <div class="area-item">
                        <strong>兄弟姐妹</strong>
                        <p>与兄弟姐妹的关系</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="expressions">
                    <h5>表达方式</h5>
                    <div class="expression-states">
                      <div class="positive-expression">
                        <h6>正面表达</h6>
                        <p>机智、善于表达、学习能力强、逻辑清晰、适应性强、富有好奇心</p>
                      </div>
                      <div class="negative-expression">
                        <h6>负面表达</h6>
                        <p>善变、肤浅、缺乏专注、过度理性、说话尖刻、信息过载</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="planet-card venus">
                <div class="planet-header">
                  <div class="planet-symbol">♀</div>
                  <div class="planet-info">
                    <h4>金星 Venus</h4>
                    <span class="planet-keywords">爱情 | 美感 | 价值 | 和谐</span>
                  </div>
                  <div class="planet-rulership">
                    <span class="rules">守护</span>
                    <span class="sign">金牛座 ♉ | 天秤座 ♎</span>
                  </div>
                </div>
                
                <div class="planet-content">
                  <div class="basic-meaning">
                    <h5>基本含义</h5>
                    <p>金星代表爱情、美感和价值观。它影响我们如何表达爱意、审美品味和对美好事物的追求。</p>
                  </div>
                  
                  <div class="characteristics">
                    <h5>核心特质</h5>
                    <ul>
                      <li><strong>爱的表达</strong>：情感表达和亲密关系的方式</li>
                      <li><strong>审美品味</strong>：对美的感知和欣赏能力</li>
                      <li><strong>价值观念</strong>：对金钱和物质的态度</li>
                      <li><strong>和谐追求</strong>：寻求平衡和美好的冲动</li>
                      <li><strong>魅力吸引</strong>：个人魅力和吸引力的来源</li>
                    </ul>
                  </div>
                  
                  <div class="life-areas">
                    <h5>影响领域</h5>
                    <div class="areas-grid">
                      <div class="area-item">
                        <strong>爱情关系</strong>
                        <p>恋爱模式和伴侣选择</p>
                      </div>
                      <div class="area-item">
                        <strong>财富价值</strong>
                        <p>金钱观念和消费习惯</p>
                      </div>
                      <div class="area-item">
                        <strong>艺术美感</strong>
                        <p>审美趣味和艺术天赋</p>
                      </div>
                      <div class="area-item">
                        <strong>社交魅力</strong>
                        <p>人际吸引力和社交技巧</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="expressions">
                    <h5>表达方式</h5>
                    <div class="expression-states">
                      <div class="positive-expression">
                        <h6>正面表达</h6>
                        <p>富有魅力、审美能力强、善于合作、温和友善、追求和谐、品味优雅</p>
                      </div>
                      <div class="negative-expression">
                        <h6>负面表达</h6>
                        <p>虚荣、物质主义、缺乏原则、过度依赖、懒惰、表面化</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="planet-card mars">
                <div class="planet-header">
                  <div class="planet-symbol">♂</div>
                  <div class="planet-info">
                    <h4>火星 Mars</h4>
                    <span class="planet-keywords">行动 | 激情 | 竞争 | 勇气</span>
                  </div>
                  <div class="planet-rulership">
                    <span class="rules">守护</span>
                    <span class="sign">白羊座 ♈</span>
                  </div>
                </div>
                
                <div class="planet-content">
                  <div class="basic-meaning">
                    <h5>基本含义</h5>
                    <p>火星代表行动力、竞争性和性驱力。它影响我们如何追求目标、面对挑战和表达愤怒。</p>
                  </div>
                  
                  <div class="characteristics">
                    <h5>核心特质</h5>
                    <ul>
                      <li><strong>行动驱力</strong>：执行力和实现目标的冲动</li>
                      <li><strong>竞争精神</strong>：争胜和超越他人的欲望</li>
                      <li><strong>勇气胆量</strong>：面对困难和危险的勇敢</li>
                      <li><strong>性能量</strong>：性欲和生殖冲动的表达</li>
                      <li><strong>愤怒表达</strong>：情绪爆发和冲突处理方式</li>
                    </ul>
                  </div>
                  
                  <div class="life-areas">
                    <h5>影响领域</h5>
                    <div class="areas-grid">
                      <div class="area-item">
                        <strong>事业成就</strong>
                        <p>工作动力和竞争优势</p>
                      </div>
                      <div class="area-item">
                        <strong>性与激情</strong>
                        <p>性表达和亲密关系</p>
                      </div>
                      <div class="area-item">
                        <strong>运动竞技</strong>
                        <p>体育活动和竞争比赛</p>
                      </div>
                      <div class="area-item">
                        <strong>冲突处理</strong>
                        <p>争执和愤怒的表达</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="expressions">
                    <h5>表达方式</h5>
                    <div class="expression-states">
                      <div class="positive-expression">
                        <h6>正面表达</h6>
                        <p>勇敢、有行动力、竞争力强、独立自主、富有激情、保护他人</p>
                      </div>
                      <div class="negative-expression">
                        <h6>负面表达</h6>
                        <p>暴躁、冲动、好斗、缺乏耐心、破坏性、过度攻击</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>社会行星详解</h3>
            
            <div class="planets-detailed social-planets">
              <div class="planet-card jupiter">
                <div class="planet-header">
                  <div class="planet-symbol">♃</div>
                  <div class="planet-info">
                    <h4>木星 Jupiter</h4>
                    <span class="planet-keywords">扩展 | 智慧 | 信念 | 机遇</span>
                  </div>
                  <div class="planet-rulership">
                    <span class="rules">守护</span>
                    <span class="sign">射手座 ♐</span>
                  </div>
                </div>
                
                <div class="planet-content">
                  <div class="basic-meaning">
                    <h5>基本含义</h5>
                    <p>木星代表扩展、成长和智慧。它带来机遇、信念和对高层次知识的追求，是幸运和成功的指示星。</p>
                  </div>
                  
                  <div class="characteristics">
                    <h5>核心特质</h5>
                    <ul>
                      <li><strong>扩展性</strong>：追求成长和发展的冲动</li>
                      <li><strong>智慧性</strong>：高等教育和哲学思考</li>
                      <li><strong>乐观性</strong>：积极的人生态度和信念</li>
                      <li><strong>慷慨性</strong>：给予和分享的精神</li>
                      <li><strong>探索性</strong>：对未知世界的好奇和探索</li>
                    </ul>
                  </div>
                  
                  <div class="life-areas">
                    <h5>影响领域</h5>
                    <div class="areas-grid">
                      <div class="area-item">
                        <strong>高等教育</strong>
                        <p>大学学习和学术研究</p>
                      </div>
                      <div class="area-item">
                        <strong>哲学宗教</strong>
                        <p>信仰体系和人生观</p>
                      </div>
                      <div class="area-item">
                        <strong>国外关系</strong>
                        <p>外国文化和国际交流</p>
                      </div>
                      <div class="area-item">
                        <strong>法律正义</strong>
                        <p>法律事务和公正观念</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="planet-card saturn">
                <div class="planet-header">
                  <div class="planet-symbol">♄</div>
                  <div class="planet-info">
                    <h4>土星 Saturn</h4>
                    <span class="planet-keywords">限制 | 结构 | 责任 | 成熟</span>
                  </div>
                  <div class="planet-rulership">
                    <span class="rules">守护</span>
                    <span class="sign">摩羯座 ♑</span>
                  </div>
                </div>
                
                <div class="planet-content">
                  <div class="basic-meaning">
                    <h5>基本含义</h5>
                    <p>土星代表限制、责任和结构。它带来挑战和磨练，但也教会我们纪律、成熟和真正的成就。</p>
                  </div>
                  
                  <div class="characteristics">
                    <h5>核心特质</h5>
                    <ul>
                      <li><strong>限制性</strong>：边界、规则和约束的设定</li>
                      <li><strong>责任感</strong>：义务和承诺的履行</li>
                      <li><strong>结构性</strong>：秩序和组织的建立</li>
                      <li><strong>成熟性</strong>：通过磨练获得的智慧</li>
                      <li><strong>权威性</strong>：传统和等级制度的尊重</li>
                    </ul>
                  </div>
                  
                  <div class="life-areas">
                    <h5>影响领域</h5>
                    <div class="areas-grid">
                      <div class="area-item">
                        <strong>事业发展</strong>
                        <p>长期规划和职业成就</p>
                      </div>
                      <div class="area-item">
                        <strong>社会地位</strong>
                        <p>声誉和权威的建立</p>
                      </div>
                      <div class="area-item">
                        <strong>人生课题</strong>
                        <p>需要克服的挑战和限制</p>
                      </div>
                      <div class="area-item">
                        <strong>传统价值</strong>
                        <p>传统观念和社会规范</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>外行星简介</h3>
            
            <div class="outer-planets-summary">
              <div class="outer-planet-item uranus">
                <div class="planet-icon">♅</div>
                <div class="planet-summary">
                  <h4>天王星 Uranus</h4>
                  <p><strong>关键词</strong>：革新、独立、突变、科技</p>
                  <p><strong>影响</strong>：带来突然的变化和创新思维，代表个人独立性和反传统精神</p>
                  <p><strong>周期</strong>：84年，在每个星座停留约7年</p>
                </div>
              </div>

              <div class="outer-planet-item neptune">
                <div class="planet-icon">♆</div>
                <div class="planet-summary">
                  <h4>海王星 Neptune</h4>
                  <p><strong>关键词</strong>：梦想、直觉、迷惑、灵性</p>
                  <p><strong>影响</strong>：带来灵感和想象力，但也可能造成迷惑和不切实际</p>
                  <p><strong>周期</strong>：164年，在每个星座停留约14年</p>
                </div>
              </div>

              <div class="outer-planet-item pluto">
                <div class="planet-icon">♇</div>
                <div class="planet-summary">
                  <h4>冥王星 Pluto</h4>
                  <p><strong>关键词</strong>：转化、权力、深度、重生</p>
                  <p><strong>影响</strong>：带来深层的转化和重生，涉及权力和控制的议题</p>
                  <p><strong>周期</strong>：248年，在每个星座停留12-32年不等</p>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>行星逆行现象</h3>
            
            <div class="retrograde-section">
              <div class="retrograde-explanation">
                <h4>🔄 什么是逆行？</h4>
                <p>行星逆行是从地球观察时，行星似乎在向后运行的现象。在占星学中，逆行行星的能量表达会发生变化，通常更加内化和深刻。</p>
              </div>

              <div class="retrograde-effects">
                <h4>💫 逆行的影响</h4>
                <div class="retrograde-grid">
                  <div class="retrograde-item">
                    <h5>水星逆行</h5>
                    <p><strong>频率</strong>：每年3-4次，每次约3周</p>
                    <p><strong>影响</strong>：沟通、交通、电子设备容易出现问题</p>
                    <p><strong>建议</strong>：检查细节，避免重要决策</p>
                  </div>
                  
                  <div class="retrograde-item">
                    <h5>金星逆行</h5>
                    <p><strong>频率</strong>：每18个月一次，每次约6周</p>
                    <p><strong>影响</strong>：爱情关系和财务问题需要重新评估</p>
                    <p><strong>建议</strong>：反思感情和价值观</p>
                  </div>
                  
                  <div class="retrograde-item">
                    <h5>火星逆行</h5>
                    <p><strong>频率</strong>：每2年一次，每次约2.5个月</p>
                    <p><strong>影响</strong>：行动力下降，计划容易受阻</p>
                    <p><strong>建议</strong>：重新规划目标和策略</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>行星应用技巧</h3>
            
            <div class="application-tips">
              <div class="tip-category">
                <h4>🎯 分析步骤</h4>
                <ol>
                  <li><strong>确定行星位置</strong>：查看行星落在哪个星座</li>
                  <li><strong>分析宫位</strong>：了解行星在哪个生活领域发挥作用</li>
                  <li><strong>观察相位</strong>：研究行星之间的角度关系</li>
                  <li><strong>考虑逆行</strong>：注意是否有行星处于逆行状态</li>
                  <li><strong>综合解读</strong>：将所有信息综合得出结论</li>
                </ol>
              </div>

              <div class="tip-category">
                <h4>🔍 解读重点</h4>
                <div class="interpretation-points">
                  <div class="point-item">
                    <strong>个人行星优先</strong>
                    <p>太阳、月亮、上升的重要性最高，决定基本性格</p>
                  </div>
                  <div class="point-item">
                    <strong>注意守护关系</strong>
                    <p>行星在其守护星座时力量最强，表达最自然</p>
                  </div>
                  <div class="point-item">
                    <strong>考虑世代特征</strong>
                    <p>外行星更多反映世代特征而非个人特质</p>
                  </div>
                  <div class="point-item">
                    <strong>结合实际生活</strong>
                    <p>理论分析要与实际生活经验相结合验证</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="lesson-practice">
          <h3>行星能量探索</h3>
          <div class="practice-box">
            <p>现在让我们深入分析您的行星配置，了解各行星在您生命中的独特表达！</p>
            <button class="practice-btn" @click="startPractice">
              分析我的行星能量
            </button>
          </div>
        </div>

        <div class="lesson-navigation">
          <router-link to="/learn/astrology/zodiac-signs" class="nav-btn prev-btn">
            ← 上一课：十二星座详解
          </router-link>
          <router-link to="/learn/astrology/houses" class="nav-btn next-btn">
            下一课：宫位详解 →
          </router-link>
        </div>
      </article>
    </div>

    <footer class="footer">
      <p>{{ $t('footer.copyright') }}</p>
    </footer>
  </div>
</template>

<script>
import LanguageSwitcher from '../../components/LanguageSwitcher.vue'
import AppNavigation from '../../components/AppNavigation.vue'
import i18nMixin from '../../mixins/i18n.js'

export default {
  name: 'AstrologyPlanets',
  mixins: [i18nMixin],
  
  components: {
    LanguageSwitcher,
    AppNavigation
  },
  
  computed: {
    isMobile() {
      return window.innerWidth <= 768
    }
  },
  
  mounted() {
    document.title = '行星详解 - ' + this.$t('app.title')
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', '深入学习占星学中十大行星的含义、特质和影响领域，掌握行星分析的核心技巧。')
    }
    
    this.handleResize = () => {
      this.$forceUpdate()
    }
    window.addEventListener('resize', this.handleResize)
  },
  
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  
  methods: {
    onLanguageChanged(language) {
      console.log('Language changed to:', language)
    },
    
    startPractice() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.lesson-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 20px 20px 20px;
  font-family: 'Noto Sans JP', sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header styles - reuse pattern */
.header {
  margin-bottom: 40px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #666;
}

.breadcrumb a {
  color: #d35400;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.separator {
  color: #ccc;
}

.current {
  color: #666;
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #2c3e50;
  font-family: 'Shippori Mincho', serif;
}

.lesson-meta {
  display: flex;
  gap: 15px;
  align-items: center;
  font-size: 0.9rem;
}

.category {
  background: #e67e22;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
}

.difficulty {
  background: #fff3cd;
  color: #856404;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
}

.duration {
  color: #666;
  font-weight: 500;
}

/* Content */
.content-container {
  flex: 1;
}

.lesson-content {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.lesson-intro {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.lesson-intro h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.lesson-intro p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
}

.lesson-objectives {
  margin-bottom: 30px;
}

.lesson-objectives h3 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.lesson-objectives ul {
  padding-left: 20px;
}

.lesson-objectives li {
  margin-bottom: 10px;
  line-height: 1.6;
  color: #555;
}

.content-section {
  margin-bottom: 40px;
}

.content-section h3 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.content-section p {
  line-height: 1.7;
  color: #555;
  margin-bottom: 15px;
}

/* Planet Categories */
.planet-categories {
  display: grid;
  gap: 25px;
  margin: 30px 0;
}

.category-card {
  border-radius: 15px;
  padding: 25px;
  border-left: 4px solid #e67e22;
}

.category-card.personal {
  background: linear-gradient(135deg, #fff8dc 0%, #ffeaa7 100%);
}

.category-card.social {
  background: linear-gradient(135deg, #e8f4f8 0%, #b3e5fc 100%);
}

.category-card.transpersonal {
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
}

.category-card h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.category-info p {
  margin: 0 0 8px 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.category-info strong {
  color: #e67e22;
}

.category-planets {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.planet-tag {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
}

.planet-tag.sun { background: #f39c12; }
.planet-tag.moon { background: #95a5a6; }
.planet-tag.mercury { background: #f1c40f; }
.planet-tag.venus { background: #e74c3c; }
.planet-tag.mars { background: #c0392b; }
.planet-tag.jupiter { background: #3498db; }
.planet-tag.saturn { background: #2c3e50; }
.planet-tag.uranus { background: #16a085; }
.planet-tag.neptune { background: #9b59b6; }
.planet-tag.pluto { background: #34495e; }

/* Planets Detailed */
.planets-detailed {
  display: grid;
  gap: 30px;
  margin: 30px 0;
}

.planet-card {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border-left: 4px solid;
}

.planet-card.sun { border-left-color: #f39c12; }
.planet-card.moon { border-left-color: #95a5a6; }
.planet-card.mercury { border-left-color: #f1c40f; }
.planet-card.venus { border-left-color: #e74c3c; }
.planet-card.mars { border-left-color: #c0392b; }
.planet-card.jupiter { border-left-color: #3498db; }
.planet-card.saturn { border-left-color: #2c3e50; }

.planet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.planet-symbol {
  font-size: 2.5rem;
  color: #e67e22;
  margin-right: 15px;
}

.planet-info {
  flex: 1;
}

.planet-info h4 {
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-size: 1.4rem;
  font-family: 'Shippori Mincho', serif;
}

.planet-keywords {
  color: #666;
  font-size: 0.9rem;
  font-style: italic;
}

.planet-rulership {
  text-align: center;
}

.rules {
  display: block;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 3px;
}

.sign {
  font-size: 0.9rem;
  color: #e67e22;
  font-weight: 500;
}

.planet-content {
  padding: 25px;
  background: white;
}

.basic-meaning, .characteristics, .life-areas, .expressions {
  margin-bottom: 20px;
}

.basic-meaning h5, .characteristics h5, .life-areas h5, .expressions h5 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.1rem;
  font-family: 'Shippori Mincho', serif;
}

.basic-meaning p {
  line-height: 1.6;
  color: #555;
}

.characteristics ul {
  padding-left: 20px;
}

.characteristics li {
  margin-bottom: 8px;
  line-height: 1.5;
  font-size: 0.9rem;
}

.characteristics strong {
  color: #e67e22;
}

.areas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.area-item {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.area-item strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 0.9rem;
  font-family: 'Shippori Mincho', serif;
}

.area-item p {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.4;
  color: #666;
}

.expression-states {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.positive-expression, .negative-expression {
  padding: 15px;
  border-radius: 8px;
}

.positive-expression {
  background: #d4edda;
  border-left: 4px solid #28a745;
}

.negative-expression {
  background: #f8d7da;
  border-left: 4px solid #dc3545;
}

.positive-expression h6, .negative-expression h6 {
  margin: 0 0 8px 0;
  font-family: 'Shippori Mincho', serif;
}

.positive-expression p, .negative-expression p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Outer Planets Summary */
.outer-planets-summary {
  display: grid;
  gap: 20px;
  margin: 25px 0;
}

.outer-planet-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid;
}

.outer-planet-item.uranus { border-left-color: #16a085; }
.outer-planet-item.neptune { border-left-color: #9b59b6; }
.outer-planet-item.pluto { border-left-color: #34495e; }

.planet-icon {
  font-size: 2rem;
  color: #e67e22;
  min-width: 50px;
  text-align: center;
}

.planet-summary h4 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-family: 'Shippori Mincho', serif;
}

.planet-summary p {
  margin: 0 0 5px 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.planet-summary strong {
  color: #e67e22;
}

/* Retrograde Section */
.retrograde-section {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  margin: 25px 0;
  border-left: 4px solid #e67e22;
}

.retrograde-explanation, .retrograde-effects {
  margin-bottom: 25px;
}

.retrograde-explanation h4, .retrograde-effects h4 {
  color: #e67e22;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.retrograde-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.retrograde-item {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border-left: 3px solid #e67e22;
}

.retrograde-item h5 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.retrograde-item p {
  margin: 0 0 8px 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.retrograde-item strong {
  color: #e67e22;
}

/* Application Tips */
.application-tips {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin: 25px 0;
}

.tip-category {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  border-left: 4px solid #e67e22;
}

.tip-category h4 {
  color: #e67e22;
  margin-bottom: 20px;
  font-family: 'Shippori Mincho', serif;
}

.tip-category ol {
  padding-left: 20px;
}

.tip-category li {
  margin-bottom: 10px;
  line-height: 1.6;
  font-size: 0.9rem;
}

.tip-category strong {
  color: #2c3e50;
}

.interpretation-points {
  display: grid;
  gap: 15px;
}

.point-item {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid #e67e22;
}

.point-item strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 5px;
  font-family: 'Shippori Mincho', serif;
}

.point-item p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #666;
}

/* Practice and Navigation */
.practice-box {
  background: #fff;
  border: 2px solid #3498db;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.practice-btn {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;
}

.practice-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.3);
}

.lesson-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.nav-btn {
  display: inline-block;
  color: #e67e22;
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #e67e22;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #e67e22;
  color: white;
  transform: translateY(-1px);
}

/* Footer */
.footer {
  text-align: center;
  font-size: 0.9rem;
  color: #95a5a6;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .lesson-container {
    padding: 70px 15px 15px 15px;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .lesson-meta {
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .lesson-content {
    padding: 20px;
  }
  
  .planet-header {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .planet-symbol {
    margin-right: 0;
  }
  
  .areas-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .expression-states {
    grid-template-columns: 1fr;
  }
  
  .outer-planet-item {
    flex-direction: column;
    text-align: center;
  }
  
  .planet-icon {
    min-width: auto;
  }
  
  .retrograde-grid {
    grid-template-columns: 1fr;
  }
  
  .application-tips {
    grid-template-columns: 1fr;
  }
  
  .lesson-navigation {
    flex-direction: column;
    gap: 15px;
  }
  
  .nav-btn {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.5rem;
  }
  
  .areas-grid {
    grid-template-columns: 1fr;
  }
  
  .category-planets {
    justify-content: center;
  }
}
</style>