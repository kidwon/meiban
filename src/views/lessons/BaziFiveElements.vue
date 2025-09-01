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
        <router-link to="/learn/category/bazi">{{ $t('learn.categories.bazi') }}</router-link>
        <span class="separator">›</span>
        <span class="current">{{ $t('lesson.lessonContent.baziFiveElements.breadcrumb') }}</span>
      </nav>
      <h1 class="title">{{ $t('lesson.lessonContent.baziFiveElements.title') }}</h1>
      <div class="lesson-meta">
        <span class="category">{{ $t('learn.categories.bazi') }}</span>
        <span class="difficulty">{{ $t('learn.difficulty.intermediate') }}</span>
        <span class="duration">{{ $t('learn.readTime', { minutes: 30 }) }}</span>
      </div>
    </header>

    <div class="content-container">
      <article class="lesson-content">
        <div class="lesson-intro">
          <h2>{{ $t('lesson.lessonContent.common.overview') }}</h2>
          <p>{{ $t('lesson.lessonContent.baziFiveElements.intro') }}</p>
        </div>

        <div class="lesson-objectives">
          <h3>{{ $t('lesson.lessonContent.common.objectives') }}</h3>
          <ul>
            <li>{{ $t('lesson.lessonContent.baziFiveElements.objectives.obj1') }}</li>
            <li>{{ $t('lesson.lessonContent.baziFiveElements.objectives.obj2') }}</li>
            <li>{{ $t('lesson.lessonContent.baziFiveElements.objectives.obj3') }}</li>
            <li>{{ $t('lesson.lessonContent.baziFiveElements.objectives.obj4') }}</li>
          </ul>
        </div>

        <div class="lesson-body">
          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziFiveElements.philosophy.title') }}</h3>
            <p>{{ $t('lesson.lessonContent.baziFiveElements.philosophy.intro') }}</p>
            
            <div class="philosophy-grid">
              <div class="philosophy-card">
                <h4>🌌 {{ $t('lesson.lessonContent.baziFiveElements.philosophy.cosmic.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziFiveElements.philosophy.cosmic.content') }}</p>
              </div>
              <div class="philosophy-card">
                <h4>🔄 {{ $t('lesson.lessonContent.baziFiveElements.philosophy.balance.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziFiveElements.philosophy.balance.content') }}</p>
              </div>
              <div class="philosophy-card">
                <h4>⚖️ {{ $t('lesson.lessonContent.baziFiveElements.philosophy.unity.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziFiveElements.philosophy.unity.content') }}</p>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziFiveElements.detailed.title') }}</h3>
            
            <div class="elements-detailed">
              <div class="element-detailed wood">
                <div class="element-header">
                  <div class="element-symbol">木</div>
                  <div class="element-info">
                    <h4>{{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.title') }}</h4>
                    <span class="element-season">{{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.correspondences.season') }} | {{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.correspondences.direction') }} | {{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.correspondences.color') }}</span>
                  </div>
                </div>
                
                <div class="element-content">
                  <div class="characteristics">
                    <h5>{{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.characteristics.title') }}</h5>
                    <p>{{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.characteristics.content') }}</p>
                  </div>
                  
                  <div class="correspondences">
                    <h5>{{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.correspondences.title') }}</h5>
                    <ul>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.correspondences.season') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.correspondences.direction') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.correspondences.emotion') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.correspondences.organ') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.correspondences.color') }}</li>
                    </ul>
                  </div>
                  
                  <div class="states">
                    <h5>{{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.states.title') }}</h5>
                    <div class="state-comparison">
                      <div class="state-positive">
                        <h6>{{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.states.prosperous') }}</h6>
                      </div>
                      <div class="state-negative">
                        <h6>{{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.states.resting') }}</h6>
                      </div>
                      <div class="state-excess">
                        <h6>{{ $t('lesson.lessonContent.baziFiveElements.detailed.wood.states.dead') }}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="element-detailed fire">
                <div class="element-header">
                  <div class="element-symbol">火</div>
                  <div class="element-info">
                    <h4>{{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.title') }}</h4>
                    <span class="element-season">{{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.correspondences.season') }} | {{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.correspondences.direction') }} | {{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.correspondences.color') }}</span>
                  </div>
                </div>
                
                <div class="element-content">
                  <div class="characteristics">
                    <h5>{{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.characteristics.title') }}</h5>
                    <p>{{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.characteristics.content') }}</p>
                  </div>
                  
                  <div class="correspondences">
                    <h5>{{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.correspondences.title') }}</h5>
                    <ul>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.correspondences.season') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.correspondences.direction') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.correspondences.emotion') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.correspondences.organ') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.correspondences.color') }}</li>
                    </ul>
                  </div>
                  
                  <div class="states">
                    <h5>{{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.states.title') }}</h5>
                    <div class="state-comparison">
                      <div class="state-positive">
                        <h6>{{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.states.prosperous') }}</h6>
                      </div>
                      <div class="state-negative">
                        <h6>{{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.states.resting') }}</h6>
                      </div>
                      <div class="state-excess">
                        <h6>{{ $t('lesson.lessonContent.baziFiveElements.detailed.fire.states.dead') }}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="element-detailed earth">
                <div class="element-header">
                  <div class="element-symbol">土</div>
                  <div class="element-info">
                    <h4>{{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.title') }}</h4>
                    <span class="element-season">{{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.correspondences.season') }} | {{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.correspondences.direction') }} | {{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.correspondences.color') }}</span>
                  </div>
                </div>
                
                <div class="element-content">
                  <div class="characteristics">
                    <h5>{{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.characteristics.title') }}</h5>
                    <p>{{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.characteristics.content') }}</p>
                  </div>
                  
                  <div class="correspondences">
                    <h5>{{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.correspondences.title') }}</h5>
                    <ul>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.correspondences.season') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.correspondences.direction') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.correspondences.emotion') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.correspondences.organ') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.correspondences.color') }}</li>
                    </ul>
                  </div>
                  
                  <div class="states">
                    <h5>{{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.states.title') }}</h5>
                    <div class="state-comparison">
                      <div class="state-positive">
                        <h6>{{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.states.prosperous') }}</h6>
                      </div>
                      <div class="state-negative">
                        <h6>{{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.states.resting') }}</h6>
                      </div>
                      <div class="state-excess">
                        <h6>{{ $t('lesson.lessonContent.baziFiveElements.detailed.earth.states.dead') }}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="element-detailed metal">
                <div class="element-header">
                  <div class="element-symbol">金</div>
                  <div class="element-info">
                    <h4>{{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.title') }}</h4>
                    <span class="element-season">{{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.correspondences.season') }} | {{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.correspondences.direction') }} | {{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.correspondences.color') }}</span>
                  </div>
                </div>
                
                <div class="element-content">
                  <div class="characteristics">
                    <h5>{{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.characteristics.title') }}</h5>
                    <p>{{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.characteristics.content') }}</p>
                  </div>
                  
                  <div class="correspondences">
                    <h5>{{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.correspondences.title') }}</h5>
                    <ul>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.correspondences.season') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.correspondences.direction') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.correspondences.emotion') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.correspondences.organ') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.correspondences.color') }}</li>
                    </ul>
                  </div>
                  
                  <div class="states">
                    <h5>{{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.states.title') }}</h5>
                    <div class="state-comparison">
                      <div class="state-positive">
                        <h6>{{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.states.prosperous') }}</h6>
                      </div>
                      <div class="state-negative">
                        <h6>{{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.states.resting') }}</h6>
                      </div>
                      <div class="state-excess">
                        <h6>{{ $t('lesson.lessonContent.baziFiveElements.detailed.metal.states.dead') }}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="element-detailed water">
                <div class="element-header">
                  <div class="element-symbol">水</div>
                  <div class="element-info">
                    <h4>{{ $t('lesson.lessonContent.baziFiveElements.detailed.water.title') }}</h4>
                    <span class="element-season">{{ $t('lesson.lessonContent.baziFiveElements.detailed.water.correspondences.season') }} | {{ $t('lesson.lessonContent.baziFiveElements.detailed.water.correspondences.direction') }} | {{ $t('lesson.lessonContent.baziFiveElements.detailed.water.correspondences.color') }}</span>
                  </div>
                </div>
                
                <div class="element-content">
                  <div class="characteristics">
                    <h5>{{ $t('lesson.lessonContent.baziFiveElements.detailed.water.characteristics.title') }}</h5>
                    <p>{{ $t('lesson.lessonContent.baziFiveElements.detailed.water.characteristics.content') }}</p>
                  </div>
                  
                  <div class="correspondences">
                    <h5>{{ $t('lesson.lessonContent.baziFiveElements.detailed.water.correspondences.title') }}</h5>
                    <ul>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.water.correspondences.season') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.water.correspondences.direction') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.water.correspondences.emotion') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.water.correspondences.organ') }}</li>
                      <li>{{ $t('lesson.lessonContent.baziFiveElements.detailed.water.correspondences.color') }}</li>
                    </ul>
                  </div>
                  
                  <div class="states">
                    <h5>{{ $t('lesson.lessonContent.baziFiveElements.detailed.water.states.title') }}</h5>
                    <div class="state-comparison">
                      <div class="state-positive">
                        <h6>{{ $t('lesson.lessonContent.baziFiveElements.detailed.water.states.prosperous') }}</h6>
                      </div>
                      <div class="state-negative">
                        <h6>{{ $t('lesson.lessonContent.baziFiveElements.detailed.water.states.resting') }}</h6>
                      </div>
                      <div class="state-excess">
                        <h6>{{ $t('lesson.lessonContent.baziFiveElements.detailed.water.states.dead') }}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziFiveElements.relationships.title') }}</h3>
            
            <div class="relationships-comprehensive">
              <div class="relationship-section">
                <h4>🌱 {{ $t('lesson.lessonContent.baziFiveElements.relationships.generation.title') }} - {{ $t('lesson.lessonContent.baziFiveElements.relationships.generation.subtitle') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziFiveElements.relationships.generation.subtitle') }}</p>
                
                <div class="generation-cycle">
                  <div class="cycle-container">
                    <div class="cycle-item wood-fire">
                      <span class="from">木</span>
                      <span class="arrow">→</span>
                      <span class="to">火</span>
                      <div class="explanation">
                        <strong>{{ $t('lesson.lessonContent.baziFiveElements.relationships.generation.cycles.woodFire') }}</strong>
                      </div>
                    </div>
                    
                    <div class="cycle-item fire-earth">
                      <span class="from">火</span>
                      <span class="arrow">→</span>
                      <span class="to">土</span>
                      <div class="explanation">
                        <strong>{{ $t('lesson.lessonContent.baziFiveElements.relationships.generation.cycles.fireEarth') }}</strong>
                      </div>
                    </div>
                    
                    <div class="cycle-item earth-metal">
                      <span class="from">土</span>
                      <span class="arrow">→</span>
                      <span class="to">金</span>
                      <div class="explanation">
                        <strong>土生金</strong>
                        <p>土中蕴藏金属，代表积累产生价值，努力获得成果</p>
                      </div>
                    </div>
                    
                    <div class="cycle-item metal-water">
                      <span class="from">金</span>
                      <span class="arrow">→</span>
                      <span class="to">水</span>
                      <div class="explanation">
                        <strong>金生水</strong>
                        <p>金属凝露成水，代表规则产生智慧，结构孕育灵活</p>
                      </div>
                    </div>
                    
                    <div class="cycle-item water-wood">
                      <span class="from">水</span>
                      <span class="arrow">→</span>
                      <span class="to">木</span>
                      <div class="explanation">
                        <strong>水生木</strong>
                        <p>水滋润树木成长，代表智慧启发创新，思考促进发展</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="relationship-section">
                <h4>⚔️ 相克关系 - 制约平衡</h4>
                <p>相克关系体现了事物之间的相互制约和控制，维持系统的平衡和秩序。</p>
                
                <div class="destruction-cycle">
                  <div class="conflict-pairs">
                    <div class="conflict-pair">
                      <div class="conflict-item">
                        <span class="attacker wood">木</span>
                        <span class="vs">克</span>
                        <span class="defender earth">土</span>
                      </div>
                      <div class="conflict-explanation">
                        <strong>木克土</strong>
                        <p>树根破土而出，代表创新打破保守，发展克服停滞</p>
                      </div>
                    </div>
                    
                    <div class="conflict-pair">
                      <div class="conflict-item">
                        <span class="attacker earth">土</span>
                        <span class="vs">克</span>
                        <span class="defender water">水</span>
                      </div>
                      <div class="conflict-explanation">
                        <strong>土克水</strong>
                        <p>土能吸水掩水，代表稳定控制变化，踏实克服浮躁</p>
                      </div>
                    </div>
                    
                    <div class="conflict-pair">
                      <div class="conflict-item">
                        <span class="attacker water">水</span>
                        <span class="vs">克</span>
                        <span class="defender fire">火</span>
                      </div>
                      <div class="conflict-explanation">
                        <strong>水克火</strong>
                        <p>水能灭火，代表冷静控制冲动，理智克服感情用事</p>
                      </div>
                    </div>
                    
                    <div class="conflict-pair">
                      <div class="conflict-item">
                        <span class="attacker fire">火</span>
                        <span class="vs">克</span>
                        <span class="defender metal">金</span>
                      </div>
                      <div class="conflict-explanation">
                        <strong>火克金</strong>
                        <p>火能熔金，代表热情化解严厉，温暖克服冷硬</p>
                      </div>
                    </div>
                    
                    <div class="conflict-pair">
                      <div class="conflict-item">
                        <span class="attacker metal">金</span>
                        <span class="vs">克</span>
                        <span class="defender wood">木</span>
                      </div>
                      <div class="conflict-explanation">
                        <strong>金克木</strong>
                        <p>金能伐木，代表规则约束自由，纪律克服散漫</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziFiveElements.strength.title') }}</h3>
            
            <div class="strength-analysis">
              <div class="analysis-factors">
                <h4>📊 {{ $t('lesson.lessonContent.baziFiveElements.strength.factors.title') }}</h4>
                <div class="factors-grid">
                  <div class="factor-card">
                    <h5>🕰️ {{ $t('lesson.lessonContent.baziFiveElements.strength.factors.seasonal.title') }}</h5>
                    <p>{{ $t('lesson.lessonContent.baziFiveElements.strength.factors.seasonal.content') }}</p>
                  </div>
                  
                  <div class="factor-card">
                    <h5>🎯 {{ $t('lesson.lessonContent.baziFiveElements.strength.factors.support.title') }}</h5>
                    <p>{{ $t('lesson.lessonContent.baziFiveElements.strength.factors.support.content') }}</p>
                  </div>
                  
                  <div class="factor-card">
                    <h5>🤝 {{ $t('lesson.lessonContent.baziFiveElements.strength.factors.position.title') }}</h5>
                    <p>{{ $t('lesson.lessonContent.baziFiveElements.strength.factors.position.content') }}</p>
                  </div>
                  
                  <div class="factor-card">
                    <h5>⚡ 克制程度</h5>
                    <p>受到相克五行的制约，力量会减弱</p>
                    <div class="examples">
                      <strong>例如：</strong>木遇金克，木气减弱
                    </div>
                  </div>
                  
                  <div class="factor-card">
                    <h5>🌿 根基深浅</h5>
                    <p>在地支中是否有根，影响五行的稳定性</p>
                    <div class="examples">
                      <strong>例如：</strong>甲木遇寅木，有根则稳固
                    </div>
                  </div>
                  
                  <div class="factor-card">
                    <h5>🔄 组合关系</h5>
                    <p>与其他干支的组合会影响五行力量</p>
                    <div class="examples">
                      <strong>例如：</strong>甲己合化土，木性转变
                    </div>
                  </div>
                </div>
              </div>

              <div class="balance-states">
                <h4>⚖️ {{ $t('lesson.lessonContent.baziFiveElements.strength.balance.title') }}</h4>
                
                <div class="balance-types">
                  <div class="balance-card ideal">
                    <h5>🌈 {{ $t('lesson.lessonContent.baziFiveElements.strength.balance.balanced.title') }}</h5>
                    <div class="balance-description">
                      <p>{{ $t('lesson.lessonContent.baziFiveElements.strength.balance.balanced.desc') }}</p>
                    </div>
                  </div>
                  
                  <div class="balance-card excess">
                    <h5>📈 {{ $t('lesson.lessonContent.baziFiveElements.strength.balance.strong.title') }}</h5>
                    <div class="balance-description">
                      <p>{{ $t('lesson.lessonContent.baziFiveElements.strength.balance.strong.desc') }}</p>
                    </div>
                  </div>
                  
                  <div class="balance-card deficient">
                    <h5>📉 {{ $t('lesson.lessonContent.baziFiveElements.strength.balance.weak.title') }}</h5>
                    <div class="balance-description">
                      <p>{{ $t('lesson.lessonContent.baziFiveElements.strength.balance.weak.desc') }}</p>
                    </div>
                  </div>
                  
                  <div class="balance-card specialized">
                    <h5>🎯 {{ $t('lesson.lessonContent.baziFiveElements.strength.balance.specialized.title') }}</h5>
                    <div class="balance-description">
                      <p>{{ $t('lesson.lessonContent.baziFiveElements.strength.balance.specialized.desc') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziFiveElements.application.title') }}</h3>
            
            <div class="application-techniques">
              <div class="technique-group">
                <h4>🔍 {{ $t('lesson.lessonContent.baziFiveElements.application.analysis.title') }}</h4>
                <div class="steps-process">
                  <div class="step-item">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h5>统计数量</h5>
                      <p>数出八字中各五行出现的次数</p>
                    </div>
                  </div>
                  <div class="step-item">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h5>判断时令</h5>
                      <p>根据出生季节确定当旺五行</p>
                    </div>
                  </div>
                  <div class="step-item">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h5>分析相生</h5>
                      <p>查看各五行的相互扶助关系</p>
                    </div>
                  </div>
                  <div class="step-item">
                    <div class="step-number">4</div>
                    <div class="step-content">
                      <h5>考虑相克</h5>
                      <p>评估相互制约的影响程度</p>
                    </div>
                  </div>
                  <div class="step-item">
                    <div class="step-number">5</div>
                    <div class="step-content">
                      <h5>综合判断</h5>
                      <p>得出五行强弱的最终结论</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="technique-group">
                <h4>💡 调和方法</h4>
                <div class="harmony-methods">
                  <div class="method-card">
                    <h5>🌿 五行补救</h5>
                    <ul>
                      <li><strong>颜色调节</strong>：穿戴相应五行的颜色</li>
                      <li><strong>方位选择</strong>：居住工作在有利方位</li>
                      <li><strong>职业选择</strong>：从事对应五行的行业</li>
                      <li><strong>饮食调理</strong>：选择相应五行的食物</li>
                    </ul>
                  </div>
                  
                  <div class="method-card">
                    <h5>🏠 环境布局</h5>
                    <ul>
                      <li><strong>家居布置</strong>：根据五行配置家具</li>
                      <li><strong>植物选择</strong>：种植对应五行的植物</li>
                      <li><strong>装饰搭配</strong>：使用有利五行的装饰品</li>
                      <li><strong>房间功能</strong>：合理安排各房间用途</li>
                    </ul>
                  </div>
                  
                  <div class="method-card">
                    <h5>👥 人际关系</h5>
                    <ul>
                      <li><strong>合作伙伴</strong>：选择五行互补的人合作</li>
                      <li><strong>交友圈子</strong>：与有利五行的人多交往</li>
                      <li><strong>师傅学习</strong>：向五行互补的老师学习</li>
                      <li><strong>婚姻匹配</strong>：考虑双方五行的搭配</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="lesson-practice">
          <h3>五行分析实践</h3>
          <div class="practice-box">
            <p>现在让我们将五行理论应用到实际分析中，深入了解您的五行构成和平衡状态！</p>
            <button class="practice-btn" @click="startPractice">
              分析我的五行平衡
            </button>
          </div>
        </div>

        <div class="lesson-navigation">
          <router-link to="/learn/bazi/earthly-branches" class="nav-btn prev-btn">
            ← 上一课：地支详解
          </router-link>
          <router-link to="/learn/bazi/reading-pillars" class="nav-btn next-btn">
            下一课：四柱解读 →
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
  name: 'BaziFiveElements',
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
    document.title = '五行理论深度解析 - ' + this.$t('app.title')
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', '深入学习五行理论的哲学基础、相生相克关系、强弱判断和实际应用技巧。')
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
  background: #9b59b6;
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

/* Philosophy Grid */
.philosophy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.philosophy-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #9b59b6;
  text-align: center;
}

.philosophy-card h4 {
  color: #9b59b6;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.philosophy-card p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

/* Elements Detailed */
.elements-detailed {
  display: grid;
  gap: 30px;
  margin: 30px 0;
}

.element-detailed {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.element-header {
  display: flex;
  align-items: center;
  padding: 20px;
  color: white;
}

.element-detailed.wood .element-header { background: linear-gradient(135deg, #27ae60, #2ecc71); }
.element-detailed.fire .element-header { background: linear-gradient(135deg, #e74c3c, #c0392b); }
.element-detailed.earth .element-header { background: linear-gradient(135deg, #f39c12, #e67e22); }
.element-detailed.metal .element-header { background: linear-gradient(135deg, #95a5a6, #7f8c8d); }
.element-detailed.water .element-header { background: linear-gradient(135deg, #3498db, #2980b9); }

.element-symbol {
  font-size: 3rem;
  font-weight: 700;
  margin-right: 20px;
  font-family: 'Shippori Mincho', serif;
}

.element-info h4 {
  font-size: 1.5rem;
  margin: 0 0 5px 0;
  font-family: 'Shippori Mincho', serif;
}

.element-season {
  font-size: 0.9rem;
  opacity: 0.9;
}

.element-content {
  background: white;
  padding: 25px;
}

.characteristics, .correspondences, .states {
  margin-bottom: 25px;
}

.characteristics h5, .correspondences h5, .states h5 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
  font-family: 'Shippori Mincho', serif;
}

.characteristics ul {
  padding-left: 20px;
}

.characteristics li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.characteristics strong {
  color: #9b59b6;
}

.correspondence-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
}

.corr-item {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.corr-item strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 0.9rem;
  font-family: 'Shippori Mincho', serif;
}

.corr-item p {
  font-size: 0.8rem;
  line-height: 1.4;
  margin: 0;
  color: #666;
}

.state-comparison {
  display: grid;
  gap: 15px;
}

.state-positive, .state-negative, .state-excess {
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid;
}

.state-positive {
  background: #d4edda;
  border-left-color: #28a745;
}

.state-negative {
  background: #f8d7da;
  border-left-color: #dc3545;
}

.state-excess {
  background: #fff3cd;
  border-left-color: #ffc107;
}

.state-positive h6, .state-negative h6, .state-excess h6 {
  margin: 0 0 8px 0;
  font-family: 'Shippori Mincho', serif;
}

.state-positive p, .state-negative p, .state-excess p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Relationships Comprehensive */
.relationships-comprehensive {
  margin: 30px 0;
}

.relationship-section {
  margin-bottom: 40px;
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  border-left: 4px solid #9b59b6;
}

.relationship-section h4 {
  color: #9b59b6;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.generation-cycle {
  margin: 25px 0;
}

.cycle-container {
  display: grid;
  gap: 20px;
}

.cycle-item {
  display: flex;
  align-items: center;
  gap: 15px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.from, .to {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  font-family: 'Shippori Mincho', serif;
}

.wood-fire .from { background: #27ae60; }
.fire-earth .from { background: #e74c3c; }
.earth-metal .from { background: #f39c12; }
.metal-water .from { background: #95a5a6; }
.water-wood .from { background: #3498db; }

.wood-fire .to { background: #e74c3c; }
.fire-earth .to { background: #f39c12; }
.earth-metal .to { background: #95a5a6; }
.metal-water .to { background: #3498db; }
.water-wood .to { background: #27ae60; }

.arrow {
  font-size: 1.5rem;
  color: #9b59b6;
  font-weight: 700;
}

.explanation {
  flex: 1;
}

.explanation strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 5px;
  font-family: 'Shippori Mincho', serif;
}

.explanation p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #666;
}

.destruction-cycle {
  margin: 25px 0;
}

.conflict-pairs {
  display: grid;
  gap: 15px;
}

.conflict-pair {
  background: white;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.conflict-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.attacker, .defender {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  font-family: 'Shippori Mincho', serif;
}

.attacker.wood, .defender.wood { background: #27ae60; }
.attacker.fire, .defender.fire { background: #e74c3c; }
.attacker.earth, .defender.earth { background: #f39c12; }
.attacker.metal, .defender.metal { background: #95a5a6; }
.attacker.water, .defender.water { background: #3498db; }

.vs {
  font-size: 1.1rem;
  font-weight: 700;
  color: #e74c3c;
}

.conflict-explanation {
  flex: 1;
}

.conflict-explanation strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 5px;
  font-family: 'Shippori Mincho', serif;
}

.conflict-explanation p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #666;
}

/* Strength Analysis */
.strength-analysis {
  margin: 30px 0;
}

.analysis-factors {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  border-left: 4px solid #9b59b6;
}

.analysis-factors h4 {
  color: #9b59b6;
  margin-bottom: 20px;
  font-family: 'Shippori Mincho', serif;
}

.factors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.factor-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border-left: 3px solid #9b59b6;
}

.factor-card h5 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.factor-card p {
  margin: 0 0 10px 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.examples {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  margin-top: 10px;
}

.examples strong {
  color: #9b59b6;
}

.balance-states {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  border-left: 4px solid #9b59b6;
}

.balance-states h4 {
  color: #9b59b6;
  margin-bottom: 20px;
  font-family: 'Shippori Mincho', serif;
}

.balance-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.balance-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid;
}

.balance-card.ideal { border-left-color: #28a745; }
.balance-card.excess { border-left-color: #ffc107; }
.balance-card.deficient { border-left-color: #dc3545; }
.balance-card.specialized { border-left-color: #17a2b8; }

.balance-card h5 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.balance-description p {
  margin: 0 0 8px 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.balance-description strong {
  color: #9b59b6;
}

/* Application Techniques */
.application-techniques {
  margin: 30px 0;
}

.technique-group {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  border-left: 4px solid #9b59b6;
}

.technique-group h4 {
  color: #9b59b6;
  margin-bottom: 20px;
  font-family: 'Shippori Mincho', serif;
}

.steps-process {
  display: grid;
  gap: 15px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 15px;
  background: white;
  padding: 15px;
  border-radius: 10px;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #9b59b6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.step-content h5 {
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-family: 'Shippori Mincho', serif;
}

.step-content p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.harmony-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.method-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border-left: 3px solid #9b59b6;
}

.method-card h5 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.method-card ul {
  padding-left: 20px;
  margin: 0;
}

.method-card li {
  margin-bottom: 8px;
  font-size: 0.9rem;
  line-height: 1.5;
}

.method-card strong {
  color: #9b59b6;
}

/* Practice and Navigation */
.practice-box {
  background: #fff;
  border: 2px solid #27ae60;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.practice-btn {
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
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
  box-shadow: 0 6px 20px rgba(39, 174, 96, 0.3);
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
  color: #9b59b6;
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #9b59b6;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #9b59b6;
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
  
  .philosophy-grid {
    grid-template-columns: 1fr;
  }
  
  .element-header {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .element-symbol {
    margin-right: 0;
  }
  
  .correspondence-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .factors-grid {
    grid-template-columns: 1fr;
  }
  
  .balance-types {
    grid-template-columns: 1fr;
  }
  
  .harmony-methods {
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
  
  .correspondence-grid {
    grid-template-columns: 1fr;
  }
  
  .cycle-item {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .conflict-pair {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
}
</style>