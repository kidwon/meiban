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
        <span class="current">{{ $t('lesson.lessonContent.baziEarthlyBranches.breadcrumb') }}</span>
      </nav>
      <h1 class="title">{{ $t('lesson.lessonContent.baziEarthlyBranches.title') }}</h1>
      <div class="lesson-meta">
        <span class="category">{{ $t('learn.categories.bazi') }}</span>
        <span class="difficulty">{{ $t('learn.difficulty.intermediate') }}</span>
        <span class="duration">{{ $t('learn.readTime', { minutes: 25 }) }}</span>
      </div>
    </header>

    <div class="content-container">
      <article class="lesson-content">
        <div class="lesson-intro">
          <h2>{{ $t('lesson.lessonContent.common.overview') }}</h2>
          <p>{{ $t('lesson.lessonContent.baziEarthlyBranches.intro') }}</p>
        </div>

        <div class="lesson-objectives">
          <h3>{{ $t('lesson.lessonContent.common.objectives') }}</h3>
          <ul>
            <li>{{ $t('lesson.lessonContent.baziEarthlyBranches.objectives.obj1') }}</li>
            <li>{{ $t('lesson.lessonContent.baziEarthlyBranches.objectives.obj2') }}</li>
            <li>{{ $t('lesson.lessonContent.baziEarthlyBranches.objectives.obj3') }}</li>
            <li>{{ $t('lesson.lessonContent.baziEarthlyBranches.objectives.obj4') }}</li>
          </ul>
        </div>

        <div class="lesson-body">
          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziEarthlyBranches.overview.title') }}</h3>
            <p>{{ $t('lesson.lessonContent.baziEarthlyBranches.overview.intro') }}</p>
            
            <div class="branches-circle">
              <div class="circle-container">
                <div class="branch-item" style="--angle: 0deg">
                  <div class="branch-symbol">子</div>
                  <div class="zodiac">🐭</div>
                  <div class="time">23-1点</div>
                </div>
                <div class="branch-item" style="--angle: 30deg">
                  <div class="branch-symbol">丑</div>
                  <div class="zodiac">🐮</div>
                  <div class="time">1-3点</div>
                </div>
                <div class="branch-item" style="--angle: 60deg">
                  <div class="branch-symbol">寅</div>
                  <div class="zodiac">🐯</div>
                  <div class="time">3-5点</div>
                </div>
                <div class="branch-item" style="--angle: 90deg">
                  <div class="branch-symbol">卯</div>
                  <div class="zodiac">🐰</div>
                  <div class="time">5-7点</div>
                </div>
                <div class="branch-item" style="--angle: 120deg">
                  <div class="branch-symbol">辰</div>
                  <div class="zodiac">🐲</div>
                  <div class="time">7-9点</div>
                </div>
                <div class="branch-item" style="--angle: 150deg">
                  <div class="branch-symbol">巳</div>
                  <div class="zodiac">🐍</div>
                  <div class="time">9-11点</div>
                </div>
                <div class="branch-item" style="--angle: 180deg">
                  <div class="branch-symbol">午</div>
                  <div class="zodiac">🐴</div>
                  <div class="time">11-13点</div>
                </div>
                <div class="branch-item" style="--angle: 210deg">
                  <div class="branch-symbol">未</div>
                  <div class="zodiac">🐑</div>
                  <div class="time">13-15点</div>
                </div>
                <div class="branch-item" style="--angle: 240deg">
                  <div class="branch-symbol">申</div>
                  <div class="zodiac">🐵</div>
                  <div class="time">15-17点</div>
                </div>
                <div class="branch-item" style="--angle: 270deg">
                  <div class="branch-symbol">酉</div>
                  <div class="zodiac">🐔</div>
                  <div class="time">17-19点</div>
                </div>
                <div class="branch-item" style="--angle: 300deg">
                  <div class="branch-symbol">戌</div>
                  <div class="zodiac">🐶</div>
                  <div class="time">19-21点</div>
                </div>
                <div class="branch-item" style="--angle: 330deg">
                  <div class="branch-symbol">亥</div>
                  <div class="zodiac">🐷</div>
                  <div class="time">21-23点</div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziEarthlyBranches.classification.title') }}</h3>
            <div class="elements-classification">
              <div class="element-group water">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.classification.water.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziEarthlyBranches.classification.water.desc') }}</p>
              </div>
              <div class="element-group wood">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.classification.wood.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziEarthlyBranches.classification.wood.desc') }}</p>
              </div>
              <div class="element-group fire">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.classification.fire.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziEarthlyBranches.classification.fire.desc') }}</p>
              </div>
              <div class="element-group metal">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.classification.metal.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziEarthlyBranches.classification.metal.desc') }}</p>
              </div>
              <div class="element-group earth">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.classification.earth.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziEarthlyBranches.classification.earth.desc') }}</p>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.title') }}</h3>
            
            <div class="detailed-branches">
              <div class="branch-detail">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.zi.title') }}</h4>
                <div class="detail-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.timeLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.zi.time') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.seasonLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.zi.season') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.zi.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.hiddenLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.zi.hidden') }}</p>
                </div>
              </div>

              <div class="branch-detail">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.chou.title') }}</h4>
                <div class="detail-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.timeLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.chou.time') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.seasonLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.chou.season') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.chou.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.hiddenLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.chou.hidden') }}</p>
                </div>
              </div>

              <div class="branch-detail">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.yin.title') }}</h4>
                <div class="detail-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.timeLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.yin.time') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.seasonLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.yin.season') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.yin.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.hiddenLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.yin.hidden') }}</p>
                </div>
              </div>

              <div class="branch-detail">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.mao.title') }}</h4>
                <div class="detail-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.timeLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.mao.time') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.seasonLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.mao.season') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.mao.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.hiddenLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.mao.hidden') }}</p>
                </div>
              </div>

              <div class="branch-detail">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.chen.title') }}</h4>
                <div class="detail-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.timeLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.chen.time') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.seasonLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.chen.season') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.chen.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.hiddenLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.chen.hidden') }}</p>
                </div>
              </div>

              <div class="branch-detail">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.si.title') }}</h4>
                <div class="detail-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.timeLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.si.time') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.seasonLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.si.season') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.si.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.hiddenLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.si.hidden') }}</p>
                </div>
              </div>

              <div class="branch-detail">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.wu.title') }}</h4>
                <div class="detail-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.timeLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.wu.time') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.seasonLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.wu.season') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.wu.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.hiddenLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.wu.hidden') }}</p>
                </div>
              </div>

              <div class="branch-detail">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.wei.title') }}</h4>
                <div class="detail-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.timeLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.wei.time') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.seasonLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.wei.season') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.wei.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.hiddenLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.wei.hidden') }}</p>
                </div>
              </div>

              <div class="branch-detail">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.shen.title') }}</h4>
                <div class="detail-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.timeLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.shen.time') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.seasonLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.shen.season') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.shen.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.hiddenLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.shen.hidden') }}</p>
                </div>
              </div>

              <div class="branch-detail">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.you.title') }}</h4>
                <div class="detail-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.timeLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.you.time') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.seasonLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.you.season') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.you.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.hiddenLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.you.hidden') }}</p>
                </div>
              </div>

              <div class="branch-detail">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.xu.title') }}</h4>
                <div class="detail-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.timeLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.xu.time') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.seasonLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.xu.season') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.xu.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.hiddenLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.xu.hidden') }}</p>
                </div>
              </div>

              <div class="branch-detail">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.hai.title') }}</h4>
                <div class="detail-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.timeLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.hai.time') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.seasonLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.hai.season') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.hai.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.common.hiddenLabel') }}</strong>：{{ $t('lesson.lessonContent.baziEarthlyBranches.detailed.hai.hidden') }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.title') }}</h3>
            
            <div class="relationships-section">
              <div class="relationship-type">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.sixHarmony.title') }}</h4>
                <div class="combinations-grid">
                  <div class="combo">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.sixHarmony.combinations.zichou') }}</div>
                  <div class="combo">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.sixHarmony.combinations.yinhai') }}</div>
                  <div class="combo">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.sixHarmony.combinations.maoxu') }}</div>
                  <div class="combo">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.sixHarmony.combinations.chenyou') }}</div>
                  <div class="combo">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.sixHarmony.combinations.sishen') }}</div>
                  <div class="combo">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.sixHarmony.combinations.wuwei') }}</div>
                </div>
                <p>{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.sixHarmony.desc') }}</p>
              </div>

              <div class="relationship-type">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.triad.title') }}</h4>
                <div class="three-combinations">
                  <div class="tri-combo">
                    <span class="combo-name">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.triad.combinations.shuiju.name') }}</span>
                    <span class="result">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.triad.combinations.shuiju.result') }}</span>
                  </div>
                  <div class="tri-combo">
                    <span class="combo-name">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.triad.combinations.huoju.name') }}</span>
                    <span class="result">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.triad.combinations.huoju.result') }}</span>
                  </div>
                  <div class="tri-combo">
                    <span class="combo-name">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.triad.combinations.jinju.name') }}</span>
                    <span class="result">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.triad.combinations.jinju.result') }}</span>
                  </div>
                  <div class="tri-combo">
                    <span class="combo-name">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.triad.combinations.muju.name') }}</span>
                    <span class="result">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.triad.combinations.muju.result') }}</span>
                  </div>
                </div>
                <p>{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.triad.desc') }}</p>
              </div>

              <div class="relationship-type">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.clash.title') }}</h4>
                <div class="clashes-grid">
                  <div class="clash">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.clash.combinations.ziwu') }}</div>
                  <div class="clash">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.clash.combinations.chouwei') }}</div>
                  <div class="clash">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.clash.combinations.yinshen') }}</div>
                  <div class="clash">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.clash.combinations.maoyou') }}</div>
                  <div class="clash">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.clash.combinations.chenxu') }}</div>
                  <div class="clash">{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.clash.combinations.sihai') }}</div>
                </div>
                <p>{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.clash.desc') }}</p>
              </div>

              <div class="relationship-type">
                <h4>{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.punishment.title') }}</h4>
                <div class="punishments">
                  <div class="punishment-group">
                    {{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.punishment.types.wuli') }}
                  </div>
                  <div class="punishment-group">
                    {{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.punishment.types.wuen') }}
                  </div>
                  <div class="punishment-group">
                    {{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.punishment.types.shishi') }}
                  </div>
                  <div class="punishment-group">
                    {{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.punishment.types.zixing') }}
                  </div>
                </div>
                <p>{{ $t('lesson.lessonContent.baziEarthlyBranches.relationships.punishment.desc') }}</p>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziEarthlyBranches.hiddenStems.title') }}</h3>
            <p>{{ $t('lesson.lessonContent.baziEarthlyBranches.hiddenStems.intro') }}</p>
            
            <div class="hidden-stems-table">
              <div class="table-header">
                <div>{{ $t('lesson.lessonContent.baziEarthlyBranches.hiddenStems.table.branch') }}</div>
                <div>{{ $t('lesson.lessonContent.baziEarthlyBranches.hiddenStems.table.primary') }}</div>
                <div>{{ $t('lesson.lessonContent.baziEarthlyBranches.hiddenStems.table.middle') }}</div>
                <div>{{ $t('lesson.lessonContent.baziEarthlyBranches.hiddenStems.table.residue') }}</div>
              </div>
              <div class="table-row">
                <div class="branch">子</div>
                <div class="stem">癸</div>
                <div class="empty">-</div>
                <div class="empty">-</div>
              </div>
              <div class="table-row">
                <div class="branch">丑</div>
                <div class="stem">己</div>
                <div class="stem">癸</div>
                <div class="stem">辛</div>
              </div>
              <div class="table-row">
                <div class="branch">寅</div>
                <div class="stem">甲</div>
                <div class="stem">丙</div>
                <div class="stem">戊</div>
              </div>
              <div class="table-row">
                <div class="branch">卯</div>
                <div class="stem">乙</div>
                <div class="empty">-</div>
                <div class="empty">-</div>
              </div>
              <div class="table-row">
                <div class="branch">辰</div>
                <div class="stem">戊</div>
                <div class="stem">乙</div>
                <div class="stem">癸</div>
              </div>
              <div class="table-row">
                <div class="branch">巳</div>
                <div class="stem">丙</div>
                <div class="stem">戊</div>
                <div class="stem">庚</div>
              </div>
              <div class="table-row">
                <div class="branch">午</div>
                <div class="stem">丁</div>
                <div class="stem">己</div>
                <div class="empty">-</div>
              </div>
              <div class="table-row">
                <div class="branch">未</div>
                <div class="stem">己</div>
                <div class="stem">丁</div>
                <div class="stem">乙</div>
              </div>
              <div class="table-row">
                <div class="branch">申</div>
                <div class="stem">庚</div>
                <div class="stem">壬</div>
                <div class="stem">戊</div>
              </div>
              <div class="table-row">
                <div class="branch">酉</div>
                <div class="stem">辛</div>
                <div class="empty">-</div>
                <div class="empty">-</div>
              </div>
              <div class="table-row">
                <div class="branch">戌</div>
                <div class="stem">戊</div>
                <div class="stem">辛</div>
                <div class="stem">丁</div>
              </div>
              <div class="table-row">
                <div class="branch">亥</div>
                <div class="stem">壬</div>
                <div class="stem">甲</div>
                <div class="empty">-</div>
              </div>
            </div>
          </section>
        </div>

        <div class="lesson-practice">
          <h3>{{ $t('lesson.lessonContent.common.practice') }}</h3>
          <div class="practice-box">
            <p>{{ $t('lesson.lessonContent.baziEarthlyBranches.practice.question') }}</p>
            <button class="practice-btn" @click="startPractice">
              {{ $t('lesson.lessonContent.baziEarthlyBranches.practice.button') }}
            </button>
          </div>
        </div>

        <div class="lesson-navigation">
          <router-link to="/learn/bazi/heavenly-stems" class="nav-btn prev-btn">
            ← {{ $t('lesson.lessonContent.common.previous') }}：{{ $t('lesson.lessons.bazi.heavenly-stems') }}
          </router-link>
          <router-link to="/learn/bazi/five-elements" class="nav-btn next-btn">
            {{ $t('lesson.lessonContent.common.next') }}：{{ $t('lesson.lessons.bazi.five-elements') }} →
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
  name: 'BaziEarthlyBranches',
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
    document.title = this.$t('lesson.lessonContent.baziEarthlyBranches.title') + ' - ' + this.$t('app.title')
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', this.$t('lesson.lessonContent.baziEarthlyBranches.metaDescription'))
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
  max-width: 900px;
  margin: 0 auto;
  padding: 80px 20px 20px 20px;
  font-family: 'Noto Sans JP', sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header styles - reuse from previous lessons */
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

/* Branches Circle */
.branches-circle {
  margin: 30px 0;
  display: flex;
  justify-content: center;
}

.circle-container {
  position: relative;
  width: 400px;
  height: 400px;
  border: 3px solid #9b59b6;
  border-radius: 50%;
  background: radial-gradient(circle, #f8f9fa, #ffffff);
}

.branch-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
  transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-180px) rotate(calc(-1 * var(--angle)));
  text-align: center;
  font-size: 0.8rem;
}

.branch-symbol {
  font-size: 1.2rem;
  font-weight: 600;
  color: #9b59b6;
  font-family: 'Shippori Mincho', serif;
  margin-bottom: 2px;
}

.zodiac {
  font-size: 1.1rem;
  margin-bottom: 2px;
}

.time {
  font-size: 0.7rem;
  color: #666;
}

/* Elements Classification */
.elements-classification {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 25px 0;
}

.element-group {
  padding: 15px;
  border-radius: 12px;
  color: white;
  text-align: center;
}

.element-group.water { background: linear-gradient(135deg, #3498db, #2980b9); }
.element-group.wood { background: linear-gradient(135deg, #27ae60, #2ecc71); }
.element-group.fire { background: linear-gradient(135deg, #e74c3c, #c0392b); }
.element-group.metal { background: linear-gradient(135deg, #95a5a6, #7f8c8d); }
.element-group.earth { background: linear-gradient(135deg, #f39c12, #e67e22); }

.element-group h4 {
  margin-bottom: 8px;
  font-family: 'Shippori Mincho', serif;
}

.element-group p {
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
}

/* Detailed Branches */
.detailed-branches {
  display: grid;
  gap: 15px;
  margin: 25px 0;
}

.branch-detail {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 15px;
  border-left: 4px solid #9b59b6;
}

.branch-detail h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.detail-content p {
  margin-bottom: 5px;
  line-height: 1.4;
  font-size: 0.9rem;
}

.detail-content strong {
  color: #9b59b6;
}

/* Relationships */
.relationships-section {
  margin: 30px 0;
}

.relationship-type {
  margin-bottom: 30px;
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
}

.relationship-type h4 {
  color: #9b59b6;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.combinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin: 15px 0;
}

.combo {
  background: #e8f5e8;
  color: #2d5a2d;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  font-size: 0.9rem;
  font-family: 'Shippori Mincho', serif;
}

.three-combinations {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin: 15px 0;
}

.tri-combo {
  background: #fff3e0;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
}

.combo-name {
  display: block;
  font-weight: 600;
  color: #e67e22;
  margin-bottom: 5px;
  font-family: 'Shippori Mincho', serif;
}

.result {
  font-size: 0.8rem;
  color: #666;
}

.clashes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  margin: 15px 0;
}

.clash {
  background: #f8d7da;
  color: #721c24;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  font-size: 0.9rem;
  font-family: 'Shippori Mincho', serif;
}

.punishments {
  margin: 15px 0;
}

.punishment-group {
  background: #fff3cd;
  color: #856404;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 0.9rem;
  font-family: 'Shippori Mincho', serif;
}

/* Hidden Stems Table */
.hidden-stems-table {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  margin: 25px 0;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: 80px repeat(3, 1fr);
  text-align: center;
}

.table-header {
  background: #9b59b6;
  color: white;
  font-weight: 600;
  padding: 12px 0;
  font-family: 'Shippori Mincho', serif;
}

.table-row {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.table-row:last-child {
  border-bottom: none;
}

.branch {
  font-weight: 600;
  color: #9b59b6;
  font-family: 'Shippori Mincho', serif;
}

.stem {
  color: #2c3e50;
  font-family: 'Shippori Mincho', serif;
}

.empty {
  color: #ccc;
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
  
  .circle-container {
    width: 300px;
    height: 300px;
  }
  
  .branch-item {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-130px) rotate(calc(-1 * var(--angle)));
  }
  
  .elements-classification {
    grid-template-columns: 1fr;
  }
  
  .combinations-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .three-combinations {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .clashes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .table-header, .table-row {
    grid-template-columns: 60px repeat(3, 1fr);
    font-size: 0.8rem;
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
  
  .circle-container {
    width: 250px;
    height: 250px;
  }
  
  .branch-item {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-110px) rotate(calc(-1 * var(--angle)));
    font-size: 0.7rem;
  }
  
  .combinations-grid,
  .three-combinations,
  .clashes-grid {
    grid-template-columns: 1fr;
  }
}
</style>