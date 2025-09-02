// i18n/locales/en.js - 英文翻译文件
export default {
  app: {
    title: 'Destiny Chart',
    subtitle: 'BaZi・Astrology・Divination Analysis'
  },
  
  form: {
    name: 'Name',
    optional: 'Optional',
    required: 'Required',
    namePlaceholder: 'Enter your name (optional)',
    birthdate: 'Birth Date',
    birthTime: 'Birth Time',
    hour: 'Hour',
    minute: 'Min',
    birthplace: 'Birth Place',
    birthplacePlaceholder: 'Select city or enter directly',
    gender: 'Gender',
    genders: {
      male: 'Male',
      female: 'Female'
    },
    requiredNote: 'Required fields'
  },
  
  regions: {
    japanese: 'Japan',
    chinese: 'China',
    hkTaiwan: 'HK/Macao/Taiwan'
  },
  
  analysis: {
    selectType: 'Select Analysis Type',
    bazi: {
      title: 'BaZi Analysis',
      description: 'Traditional Chinese',
      shareDescription: 'Share {name}\'s BaZi (Eight Characters) destiny reading results and explore the mysteries of Eastern divination with friends!'
    },
    astrology: {
      title: 'Astrology',
      description: 'Western Astrology'
    }
  },
  
  astrology: {
    resultsTitle: 'Astrology Analysis Results',
    chartSuffix: '\'s Birth Chart',
    interactiveChart: 'Interactive Birth Chart',
    detailedAnalysis: 'Detailed Astrology Analysis',
    birthDataSummary: 'Birth Data',
    planetDetails: 'Planet Details',
    keywords: 'Keywords',
    personalityAnalysis: 'Personality Analysis',
    careerAnalysis: 'Career Tendencies',
    relationshipAnalysis: 'Relationship Analysis',
    fortuneAnalysis: 'Fortune Analysis',
    corePersonality: 'Core Personality (Sun Sign)',
    emotionalNeeds: 'Emotional Needs (Moon Sign)',
    externalImpression: 'External Impression (Rising Sign)',
    careerStrengths: 'Career Strengths',
    suitableCareers: 'Suitable Career Directions',
    loveExpression: 'Love Expression',
    friendshipTraits: 'Friendship Traits',
    compatibleSigns: 'Compatible Signs',
    overallFortune: 'Overall Fortune',
    guest: 'Guest',
    shareDescription: 'Share {name}\'s astrology analysis results and explore the mysteries of astrology with friends!',
    // Function Navigation
    functionNav: {
      basicAnalysis: 'Basic Analysis',
      transitAnalysis: 'Transit Analysis',
      aiExpert: 'Ask Meimei'
    },
    recommendationsTitle: 'Recommended Features for You',
    recommendations: {
      transitDescription: 'Explore your future fortune in detail',
      aiExpertDescription: 'Intelligent AI answers all your questions',
      recommended: 'Recommended',
      popular: 'Popular',
      new: 'New'
    },
    exploreMoreTitle: 'Want Deeper Insights?',
    exploreMoreSubtitle: 'Experience more profound insights and personalized analysis',
    exploreNow: 'Explore Now',
    whyChooseAdvanced: 'Why Choose Advanced Analysis?',
    comparison: {
      basicAnalysis: 'Basic Analysis',
      basicDescription: 'Current birth chart and basic traits',
      advancedAnalysis: 'Advanced Analysis',
      advancedDescription: 'Future predictions and deep personalization'
    },
    userGuide: {
      welcome: {
        title: 'Welcome to Astrology Analysis!',
        content: 'On this page, you can view your detailed astrology analysis results. Let us guide you through using these features effectively.'
      },
      navigation: {
        title: 'Feature Navigation',
        content: 'Use this navigation bar to easily switch between basic analysis, transit analysis, and compatibility analysis.'
      },
      chartInteraction: {
        title: 'Interactive Chart',
        content: 'Click on planets in the chart to view detailed information. Hover over them to see more details.'
      },
      recommendations: {
        title: 'Recommended Features',
        content: 'We recommend the most suitable advanced analysis features for you. Click to learn more.'
      },
      advancedFeatures: {
        title: 'Advanced Features',
        content: 'Try advanced features like transit analysis or compatibility analysis for deeper insights.'
      },
      next: 'Next',
      previous: 'Previous',
      finish: 'Finish'
    },
    tooltips: {
      interaction: 'Great! You\'ve got the hang of it',
      success: 'Operation completed!',
      info: 'Tip: You can also use keyboard shortcuts'
    },
    calculating: 'Calculating birth chart...',
    fortuneLabels: {
      career: 'Career Luck',
      wealth: 'Wealth Luck',
      love: 'Love Luck',
      health: 'Health Luck'
    },
    planetNames: {
      sun: 'Sun',
      moon: 'Moon',
      ascendant: 'Ascendant'
    },
    analysisLabels: {
      advantages: 'Advantages',
      risks: 'Risks',
      actions: 'Actions',
      triggers: 'Triggers',
      impression: 'How Others See You',
      techniques: 'Techniques',
      approach: 'Approach',
      strengths: 'Strengths',
      direction: 'Direction',
      suggestions: 'Suggestions'
    },
    signNames: {
      '白羊座': 'Aries',
      '金牛座': 'Taurus', 
      '双子座': 'Gemini',
      '巨蟹座': 'Cancer',
      '狮子座': 'Leo',
      '处女座': 'Virgo',
      '天秤座': 'Libra',
      '天蝎座': 'Scorpio',
      '射手座': 'Sagittarius',
      '摩羯座': 'Capricorn',
      '水瓶座': 'Aquarius',
      '双鱼座': 'Pisces'
    },
    titleTemplates: {
      sun: 'Sun {sign} | Core Personality',
      moon: 'Moon {sign} | Emotions & Attachment',
      ascendant: 'Ascendant {sign} | First Impression',
      venus: 'Venus {sign} | Relationships & Values',
      mars: 'Mars {sign} | Action Style',
      mercury: 'Mercury {sign} | Communication',
      'mercury-midheaven': 'Mercury {mercury} × MC {midheaven} | Thinking & Communication',
      career: 'Midheaven {sign} | Career Direction',
      fallback: {
        sun: 'Sun Sign | Core Personality',
        moon: 'Moon Sign | Emotions & Attachment', 
        ascendant: 'Ascendant | First Impression',
        venus: 'Venus | Relationships & Values',
        mars: 'Mars | Action Style',
        mercury: 'Mercury | Communication',
        'mercury-midheaven': 'Thinking & Communication',
        career: 'Career Direction'
      }
    },
    detailed: {
      sun: {
        gemini: {
          advantages: 'Curious and quick-learning, excellent communication skills, versatile and adaptable thinking.',
          risks: 'Tendency to lose interest quickly, difficulty in deep focus, can appear superficial.',
          actions: 'Develop concentration skills, choose key areas for deep development, transform versatility into strength.'
        },
        aries: {
          advantages: 'Proactive and pioneering, strong action orientation, natural leadership qualities.',
          risks: 'Impulsive and impatient, sometimes overly self-centered.',
          actions: 'Learn to think before acting, develop teamwork spirit, channel enthusiasm into lasting motivation.'
        },
        taurus: {
          advantages: 'Steady and reliable, perseverant, practical approach, strong aesthetic sense.',
          risks: 'Stubborn and resistant to change, sometimes overly conservative.',
          actions: 'Maintain open-mindedness, appropriately embrace new things, transform stability into reliable strength.'
        },
        cancer: {
          advantages: 'Emotionally rich, intuitive, caring for others, strong protective instincts.',
          risks: 'Overly emotional, excessive defensiveness, prone to dwelling on the past.',
          actions: 'Learn emotional management, establish healthy boundaries, transform caring abilities into positive influence.'
        },
        leo: {
          advantages: 'Confident and radiant, strong self-expression, natural charisma and creativity.',
          risks: 'Overly proud, needs excessive attention, can appear arrogant.',
          actions: 'Maintain humility, learn to listen to others, use personal charm to inspire and help others.'
        },
        virgo: {
          advantages: 'Detail-oriented, strong analytical skills, pursuit of perfection, strong service spirit.',
          risks: 'Overly critical, perfectionism leading to procrastination, prone to anxiety.',
          actions: 'Learn to accept "good enough" standards, use analytical skills to solve practical problems.'
        },
        libra: {
          advantages: 'Harmony-seeking, excellent diplomatic skills, great aesthetic sense, good at balancing interests.',
          risks: 'Indecisive, excessive conflict avoidance, sometimes lacks principled stance.',
          actions: 'Develop decision-making skills, learn to maintain principles in harmony, transform balance into leadership advantage.'
        },
        scorpio: {
          advantages: 'Strong willpower, deep insight, intense focus, powerful inner strength.',
          risks: 'Overly suspicious, vengeful, prone to obsessing over details.',
          actions: 'Learn forgiveness and letting go, use deep insight for positive exploration and research.'
        },
        sagittarius: {
          advantages: 'Optimistic and cheerful, broad vision, freedom-loving, philosophical thinking and international perspective.',
          risks: 'Impatient, irresponsible, sometimes appears frivolous.',
          actions: 'Develop responsibility and persistence, transform broad vision into actual achievements.'
        },
        capricorn: {
          advantages: 'Strong sense of responsibility, clear goals, down-to-earth, strong execution ability.',
          risks: 'Overly serious, lacks flexibility, sometimes appears cold.',
          actions: 'Learn to relax and enjoy life, transform pragmatism into sustained success.'
        },
        aquarius: {
          advantages: 'Independent, forward-thinking, humanitarian spirit, innovative mindset.',
          risks: 'Overly rational, emotionally detached, sometimes appears eccentric.',
          actions: 'Balance rationality with emotion, transform innovative thinking into socially beneficial contributions.'
        },
        pisces: {
          advantages: 'Rich imagination, strong empathy, outstanding artistic talent, keen intuition.',
          risks: 'Overly sensitive, lacks realism, prone to indulging in fantasies.',
          actions: 'Learn to be practical, transform artistic talent and empathy into actual ability to help others.'
        }
      },
      moon: {
        aries: {
          description: 'Emotions are direct and impulsive, seeking immediate emotional reactions and stimulating emotional experiences.',
          triggers: 'When delayed or restricted, anger and frustration can explode.',
          actions: 'Direct emotional energy toward constructive activities, release through moderate exercise and challenges.'
        },
        taurus: {
          description: 'Emotions are stable and lasting, need security, prefer warm and comfortable environments.',
          triggers: 'When facing sudden changes or unstable situations, shows strong resistance or stubbornness.',
          actions: 'Respect your slow pace, take time to create comfortable environments.'
        },
        gemini: {
          description: 'Emotions are diverse and variable, need intellectual stimulation, enjoy communication and sharing.',
          triggers: 'When feeling bored or lonely, easily lose focus and become scattered.',
          actions: 'While enjoying diverse interests, also cherish opportunities for deep communication.'
        },
        cancer: {
          description: 'Emotions are deep and delicate, need sense of belonging, value family and kinship relationships.',
          triggers: 'When rejected or feeling isolated, tend to withdraw into shell.',
          actions: 'Ensure safe spaces, build deep connections with trustworthy people.'
        },
        leo: {
          description: 'Emotions are passionate and generous, need appreciation, enjoy being center of attention.',
          triggers: 'When dignity or face is threatened, become defensive or emotionally explosive.',
          actions: 'Create safe expression spaces, shift focus from "being praised" to "being understood".'
        },
        virgo: {
          description: 'Emotions are delicate and rational, need sense of order, enjoy caring for others.',
          triggers: 'When in chaotic or disorderly situations, become anxious and critical.',
          actions: 'Don\'t pursue perfection, value accumulation of small improvements.'
        },
        libra: {
          description: 'Emotions seek harmony, need partnerships, avoid conflicts.',
          triggers: 'When facing unfair treatment or conflict situations, deeply hurt.',
          actions: 'Build balanced relationships, learn to appropriately express your feelings.'
        },
        scorpio: {
          description: 'Emotions are deep and intense, need profound connections, have strong possessiveness.',
          triggers: 'When betrayed or feeling untrusted, generate strong revenge impulses.',
          actions: 'Learn trust and forgiveness, transform deep emotions into power to heal self and others.'
        },
        sagittarius: {
          description: 'Emotions are optimistic and free, need exploration and growth, hate being bound.',
          triggers: 'When freedom is restricted or forced to handle trivial details, feel frustrated.',
          actions: 'While pursuing freedom, also take corresponding responsibilities.'
        },
        capricorn: {
          description: 'Emotions are reserved and practical, need sense of achievement, value social status.',
          triggers: 'When feeling disrespected or losing control, become cold and distant.',
          actions: 'Learn to express inner emotions, maintain humanity while pursuing success.'
        },
        aquarius: {
          description: 'Emotions are independent and objective, need autonomy, value friendship and ideals.',
          triggers: 'When forced to comply or independence is restricted, feel strong resentment.',
          actions: 'While maintaining independence, also cultivate emotional connections with others.'
        },
        pisces: {
          description: 'Emotions are sensitive and empathetic, need spiritual sustenance, easily influenced by environment.',
          triggers: 'When in negative environment or feeling misunderstood, easily fall into depression.',
          actions: 'Protect your sensitivity, transform empathy and intuition into practical actions to help others.'
        }
      },
      ascendant: {
        aries: {
          impression: 'Give energetic and proactive first impression, easily become a leader.',
          risks: 'May appear too hasty or lack patience, sometimes creating pressure.',
          actions: 'Maintain enthusiasm while learning to listen to others, cultivate patience and empathy.'
        },
        taurus: {
          impression: 'Give stable and reliable, warm and friendly impression, making people feel safe and comfortable.',
          risks: 'May appear too stubborn or resistant to change, sometimes seeming inflexible.',
          actions: 'While maintaining stability, appropriately show openness and adaptability.'
        },
        gemini: {
          impression: 'Give intelligent and witty, socially skilled impression, easily attracting attention.',
          risks: 'May appear superficial or lacking depth, sometimes seeming unreliable.',
          actions: 'While showing versatility, also demonstrate focus and depth.'
        },
        cancer: {
          impression: 'Give warm and caring, emotionally rich impression, making people feel cared for.',
          risks: 'May appear overly sensitive or emotional, sometimes feeling oppressive.',
          actions: 'While expressing care, also show strength and independence.'
        },
        leo: {
          impression: 'Give confident and sunny, charming impression, easily becoming the center of attention.',
          risks: 'May appear overly self-centered or dramatic, sometimes feeling distant.',
          actions: 'While showing confidence, also demonstrate humility and care for others.'
        },
        virgo: {
          impression: 'Give careful and thorough, professionally competent impression, feeling trustworthy.',
          risks: 'May appear overly critical or perfectionist, sometimes creating pressure.',
          actions: 'While pursuing perfection, also show flexibility and tolerance.'
        },
        libra: {
          impression: 'Give elegant and harmonious, good at coordination impression, feeling comfortable.',
          risks: 'May appear too indecisive or lack position, sometimes feeling not firm enough.',
          actions: 'While maintaining harmony, also courageously express your own views.'
        },
        scorpio: {
          impression: 'Give profound and mysterious, charismatic impression, easily making lasting impressions.',
          risks: 'May appear too mysterious or hard to approach, sometimes feeling uneasy.',
          actions: 'Moderately show inner depth while maintaining appropriate openness.'
        },
        sagittarius: {
          impression: 'Give optimistic and open, freedom-loving impression, making people feel relaxed and happy.',
          risks: 'May appear too scattered or lack focus, sometimes feeling not serious enough.',
          actions: 'While maintaining free spirit, also show responsibility and focus.'
        },
        capricorn: {
          impression: 'Give mature and stable, trustworthy impression, making people feel secure.',
          risks: 'May appear too serious or distant, sometimes feeling oppressive.',
          actions: 'While maintaining professionalism, also show warmth and approachability.'
        },
        aquarius: {
          impression: 'Give unique and creative impression, easily attracting like-minded people.',
          risks: 'May appear too eccentric or aloof, sometimes hard to understand.',
          actions: 'While maintaining uniqueness, also build emotional connections with others.'
        },
        pisces: {
          impression: 'Give gentle and understanding, artistically inclined impression.',
          risks: 'May appear too sensitive or not firm enough, sometimes feeling unreliable.',
          actions: 'While expressing empathy, also show inner strength and decisiveness.'
        }
      },
      mercury: {
        aries: {
          communication: 'Direct and fast thinking, frank and honest expression, good at initiating topics.',
          risks: 'Speaking may be too impulsive or lacking deep thought, easily causing misunderstandings.',
          techniques: 'Cultivate patience, listen to others\' opinions before expressing your views.'
        },
        taurus: {
          communication: 'Steady and practical expression, warm voice, like to communicate with concrete facts.',
          risks: 'Sometimes may appear stubborn or refuse to accept new viewpoints.',
          techniques: 'Keep an open mind, appropriately try to accept different ways of thinking.'
        },
        gemini: {
          communication: 'Active and diverse thinking, lively and interesting expression, good at thinking from multiple perspectives.',
          risks: 'May lack depth or consistency, easily confusing others.',
          techniques: 'Keep logic clear, appropriately go deep into topics rather than constantly jumping.'
        },
        cancer: {
          communication: 'Warm and emotional expression, good at understanding others\' emotions, having intuitive insight.',
          risks: 'May be too subjective or emotional, affecting objective analysis.',
          techniques: 'Balance rationality and sensibility, consider logic when expressing emotions.'
        },
        leo: {
          communication: 'Confident and lively expression, good at storytelling, can attract audience attention.',
          risks: 'May be too self-centered or dramatic, ignoring others\' viewpoints.',
          techniques: 'Give others enough opportunity to express, learn to listen and praise others.'
        },
        virgo: {
          communication: 'Accurate and detailed expression, clear logic, good at analyzing and solving problems.',
          risks: 'May be too critical or judgmental, making others feel pressured.',
          techniques: 'When pointing out problems, also give constructive suggestions, pay attention to tone and expression.'
        },
        libra: {
          communication: 'Elegant and balanced expression, good at coordination and finding common ground, avoiding conflicts.',
          risks: 'May be too indecisive or lack clear position, difficult to make decisions.',
          techniques: 'Dare to express your true opinions, find appropriate balance between balance and firmness.'
        },
        scorpio: {
          communication: 'Profound and direct expression, good at seeing problem essence, dislike superficial communication.',
          risks: 'May appear too sharp or aggressive, easily creating confrontation.',
          techniques: 'Pay attention to tone when expressing views, give others space to express.'
        },
        sagittarius: {
          communication: 'Optimistic and open expression, good at sharing experiences and ideas, having philosophical thinking.',
          risks: 'May be too general or lack attention to details, easily overlooking specifics.',
          techniques: 'While sharing big picture, also pay attention to specific implementation details.'
        },
        capricorn: {
          communication: 'Serious and practical expression, good at structured thinking, value efficiency and results.',
          risks: 'May appear too conservative or rigid, lacking creativity.',
          techniques: 'Appropriately show flexibility and humor, incorporate friendliness into seriousness.'
        },
        aquarius: {
          communication: 'Unique and forward-thinking expression, good at thinking about future and innovation, having objective rationality.',
          risks: 'May appear too detached or hard to understand, lacking emotional connection.',
          techniques: 'Consider audience understanding when sharing ideas, appropriately show human side.'
        },
        pisces: {
          communication: 'Rich emotional expression, having intuitive insight, good at artistic expression.',
          risks: 'May appear too vague or emotional, lacking clear logic.',
          techniques: 'Combine rational analysis when expressing feelings, improve clarity of expression.'
        }
      },
      venus: {
        aries: {
          relationships: 'Passionate and direct in relationships, like to pursue and take initiative, charm full of vitality.',
          approach: 'Need to learn patience and consider partner\'s thoughts, maintain rationality in passion.'
        },
        taurus: {
          relationships: 'Pursue stability and comfort in relationships, value material security, enjoy creating romantic atmosphere.',
          approach: 'Avoid being too stubborn, appropriately accept changes and freshness in relationships.'
        },
        gemini: {
          relationships: 'Need intellectual stimulation and communication in relationships, enjoy diverse experiences and novelty.',
          approach: 'Learn deep connection, cultivate deep relationships while enjoying diversity.'
        },
        cancer: {
          relationships: 'Gentle and caring in relationships, value emotional security, hope to be loved and protected.',
          approach: 'Avoid excessive dependency, maintain independence while giving love.'
        },
        leo: {
          relationships: 'Generous and romantic in relationships, need to be praised and appreciated, enjoy creating surprises for partner.',
          approach: 'Learn to share spotlight, appreciate partner while showing yourself.'
        },
        virgo: {
          relationships: 'Careful and thoughtful in relationships, express love through practical actions, value spiritual compatibility.',
          approach: 'Appropriately relax perfectionism, learn to accept partner\'s imperfections.'
        },
        libra: {
          relationships: 'Pursue harmony and beauty in relationships, good at coordination and balance, need partnership and beautiful environment.',
          approach: 'Dare to express true thoughts, maintain personality while pursuing harmony.'
        },
        scorpio: {
          relationships: 'Passionate and profound in relationships, seek soul compatibility, having strong possessiveness and loyalty.',
          approach: 'Learn to trust and open up, avoid excessive jealousy or suspicion.'
        },
        sagittarius: {
          relationships: 'Optimistic and open in relationships, seek spiritual compatibility and growth partnership, need freedom space.',
          approach: 'Take responsibility in relationships while enjoying freedom.'
        },
        capricorn: {
          relationships: 'Strong sense of responsibility in relationships, value long-term commitment and stable building, practical way of expressing love.',
          approach: 'Appropriately show emotional and romantic side, avoid being too serious.'
        },
        aquarius: {
          relationships: 'Value friendship and spiritual communication in relationships, need independent space and freedom of thought.',
          approach: 'Cultivate deep emotional connection while maintaining independence.'
        },
        pisces: {
          relationships: 'Romantic and imaginative in relationships, having strong empathy and dedication spirit.',
          approach: 'Learn to set boundaries, protect yourself while giving love.'
        }
      },
      mars: {
        aries: {
          strengths: 'Strong and direct action power, having pioneering spirit, able to respond and decide quickly.',
          risks: 'May be too impulsive or lack patience, easy to give up on challenging projects.',
          actions: 'Learn to make detailed plans, cultivate persistence and patience.'
        },
        taurus: {
          strengths: 'Steady and lasting action, having strong endurance and execution, able to persist to the end.',
          risks: 'May be too stubborn or refuse to change, missing better opportunities.',
          actions: 'Keep open mind, appropriately adjust methods and strategies.'
        },
        gemini: {
          strengths: 'Flexible and diverse action, good at handling multiple tasks simultaneously, strong adaptability.',
          risks: 'May lack focus or persistence, easy to give up halfway.',
          actions: 'Learn to set priorities, focus on most important goals.'
        },
        cancer: {
          strengths: 'Action driven by emotion and intuition, showing great strength when protecting loved ones.',
          risks: 'May be too emotional or defensive, affecting objectivity of decisions.',
          actions: 'Combine rational thinking when making important decisions, avoid pure emotional reactions.'
        },
        leo: {
          strengths: 'Action full of confidence and leadership, able to inspire and motivate others.',
          risks: 'May be too self-centered or arrogant, ignoring others\' opinions.',
          actions: 'Learn to listen to others\' opinions, be humble while showing leadership.'
        },
        virgo: {
          strengths: 'Precise and efficient action, good at analyzing and solving problems, paying attention to details.',
          risks: 'May be too concerned about details or perfectionist, affecting action efficiency.',
          actions: 'Learn to broaden perspective, find balance between pursuing perfection and advancing progress.'
        },
        libra: {
          strengths: 'Balanced and coordinated action, good at working in teams, able to consider interests of all parties.',
          risks: 'May be too indecisive or avoid conflicts, missing important opportunities.',
          actions: 'Dare to make decisions when necessary, don\'t worry too much about offending others.'
        },
        scorpio: {
          strengths: 'Profound and focused action, having strong willpower and penetration.',
          risks: 'May be too aggressive or revengeful, affecting interpersonal relationships.',
          actions: 'Learn forgiveness and letting go, transform passion into positive force for change.'
        },
        sagittarius: {
          strengths: 'Action full of idealism, having exploratory spirit and big picture view.',
          risks: 'May be too optimistic or lack attention to details, affecting execution results.',
          actions: 'Make specific feasible plans while maintaining ideals.'
        },
        capricorn: {
          strengths: 'Steady and organized action, having strong organizational ability and sense of responsibility.',
          risks: 'May be too conservative or rigid, missing innovation opportunities.',
          actions: 'Appropriately welcome challenges and changes, incorporate flexibility into steadiness.'
        },
        aquarius: {
          strengths: 'Action with innovation and foresight, able to act for collective interests.',
          risks: 'May be too idealistic or rebellious, ignoring practical situations.',
          actions: 'Consider practical feasibility while pursuing ideals.'
        },
        pisces: {
          strengths: 'Action rich in empathy and intuition, able to work for others\' welfare.',
          risks: 'May lack direction or be indecisive due to over-sensitivity.',
          actions: 'Set clear goals, maintain firm action while keeping empathy.'
        }
      },
      midheaven: {
        aries: {
          career: 'Suitable for work requiring leadership and pioneering spirit, such as entrepreneurship, sales, competition, etc.',
          advantages: 'Having natural leadership talent and pioneering ability, able to stand out in competitive environment.',
          suggestions: 'Use your initiative and decisiveness, but also learn teamwork.'
        },
        taurus: {
          career: 'Suitable for stable work, such as finance, art, beauty, architecture, etc.',
          advantages: 'Having patience and persistence, able to steadily build position in your field.',
          suggestions: 'Use your practical talents, but also stay open to new opportunities.'
        },
        gemini: {
          career: 'Suitable for work requiring communication and information processing, such as media, education, technology, etc.',
          advantages: 'Having excellent communication and learning abilities, able to adapt to diverse work environments.',
          suggestions: 'Use your versatility, but also specialize deeply in certain areas.'
        },
        cancer: {
          career: 'Suitable for work requiring care for others, such as healthcare, education, catering, etc.',
          advantages: 'Having strong empathy and intuitive ability, able to understand and meet others\' needs.',
          suggestions: 'Use your emotional advantages, but also maintain appropriate professional distance in workplace.'
        },
        leo: {
          career: 'Suitable for work requiring creativity and performance, such as entertainment, art, sales, etc.',
          advantages: 'Having natural performance ability and charm, able to perform excellently in front of public.',
          suggestions: 'Use your creative talents, but also learn teamwork and humility.'
        },
        virgo: {
          career: 'Suitable for work requiring precision and analytical ability, such as accounting, research, healthcare, etc.',
          advantages: 'Having excellent analytical ability and rigorous attitude to details.',
          suggestions: 'Use your professional abilities, but also learn big picture thinking and flexibility.'
        },
        libra: {
          career: 'Suitable for work requiring aesthetics and interpersonal coordination, such as law, design, diplomacy, etc.',
          advantages: 'Having excellent interpersonal communication ability and aesthetic taste.',
          suggestions: 'Use your coordination abilities, but also learn to make decisions at critical moments.'
        },
        scorpio: {
          career: 'Suitable for work requiring deep research and insight, such as psychology, investigation, finance, etc.',
          advantages: 'Having strong insight and willpower, able to handle complex and challenging problems.',
          suggestions: 'Use your deep thinking abilities, but also learn to cooperate and trust others.'
        },
        sagittarius: {
          career: 'Suitable for work requiring exploration and education, such as education, travel, publishing, etc.',
          advantages: 'Having broad vision and philosophical thinking, able to thrive in multicultural environments.',
          suggestions: 'Use your global perspective, but also stay focused on specific projects.'
        },
        capricorn: {
          career: 'Suitable for work requiring management and execution, such as management, government, enterprise, etc.',
          advantages: 'Having strong sense of responsibility and organizational ability, able to take important leadership positions.',
          suggestions: 'Use your management talents, but also incorporate humanity into leadership.'
        },
        aquarius: {
          career: 'Suitable for work requiring innovation and social responsibility, such as technology, public welfare, environmental protection, etc.',
          advantages: 'Having forward-looking vision and humanitarian spirit, able to contribute to social progress.',
          suggestions: 'Use your innovative abilities, but also find balance between ideals and reality.'
        },
        pisces: {
          career: 'Suitable for work requiring creativity and service spirit, such as art, healthcare, public welfare, etc.',
          advantages: 'Having rich imagination and strong empathy, able to make outstanding contributions in creative fields and serving others.',
          suggestions: 'Use your artistic talents, but also maintain realistic understanding in career development.'
        }
      }
    },
    actions: {
      back: 'Back to Home',
      download: 'Download Report',
      share: 'Share',
      transitAnalysis: 'Transit Analysis',
      aiExpert: 'Ask Meimei'
    },
    advancedFeatures: {
      title: 'Advanced Analysis Features',
      transitDescription: 'Detailed analysis of timing changes and important planetary transits',
      transitFeatures: {
        futureTrends: '• Future 3-year trends',
        transitPlanets: '• Important planetary transits',
        timingDiagnosis: '• Optimal timing diagnosis'
      },
      aiExpertDescription: 'Intelligent AI expert Q&A service based on your birth chart',
      aiExpertFeatures: {
        personalizedQA: '• Personalized astrology Q&A',
        deepAnalysis: '• Deep interpretation & guidance',
        instantResponse: '• 24/7 instant responses'
      }
    },
    alerts: {
      aiExpertInDevelopment: 'Meimei is learning! Stay tuned.',
      reportTitle: 'My Astrology Analysis Report',
      reportDescription: '\'s Personal Birth Chart Analysis',
      linkCopied: 'Link copied to clipboard',
      copyManually: 'Please manually copy the current page link to share'
    },
    generating: 'Generating PDF...',
    pdfError: 'PDF generation failed. Please try again later',
    signs: {
      descriptions: {
        sun: {
          'aries': 'You have pioneering spirit and leadership abilities, enjoy challenges, and possess strong initiative.',
          'taurus': 'You are stable and practical, value security, and have enduring persistence and artistic taste.',
          'gemini': 'You are intelligent and curious, skilled at communication, love learning new things, and adapt easily.',
          'cancer': 'You are emotionally rich, value family, and have strong protective instincts and intuition.',
          'leo': 'You are confident and generous, have performance talents, and enjoy being the center of attention.',
          'virgo': 'You pay attention to details, pursue perfection, and have a strong service spirit.',
          'libra': 'You pursue harmony and balance, have artistic temperament, and excel at diplomacy.',
          'scorpio': 'You are deep and perceptive, possess insight, and have strong willpower.',
          'sagittarius': 'You are optimistic and cheerful, love freedom, and have philosophical thinking.',
          'capricorn': 'You are practical and realistic, have strong responsibility and achievement drive.',
          'aquarius': 'You are independent and innovative, forward-thinking, and care about humanitarian causes.',
          'pisces': 'You are imaginative, sensitive and intuitive, and possess artistic talents.'
        },
        moon: {
          'aries': 'Emotions are direct and impulsive, need immediate emotional response, enjoy stimulating emotional experiences.',
          'taurus': 'Emotions are stable and lasting, need security, prefer warm and comfortable environments.',
          'gemini': 'Emotions are varied and changeable, need intellectual stimulation, enjoy communicating and sharing with others.',
          'cancer': 'Emotions are deep and sensitive, need belonging, value family and kinship.',
          'leo': 'Emotions are passionate and generous, need appreciation, enjoy being the focus of attention.',
          'virgo': 'Emotions are delicate and rational, need sense of order, enjoy caring for others.',
          'libra': 'Emotions seek harmony, need partnership, avoid conflict.',
          'scorpio': 'Emotions are deep and intense, need deep connections, have strong possessiveness.',
          'sagittarius': 'Emotions are free and optimistic, need space and freedom, enjoy exploring new experiences.',
          'capricorn': 'Emotions are introverted and practical, need stable structure, value traditional values.',
          'aquarius': 'Emotions are independent and rational, need friendship support, care about collective interests.',
          'pisces': 'Emotions are sensitive and dreamy, need spiritual resonance, possess empathy.'
        },
        ascendant: {
          'aries': 'Give a positive and proactive first impression, displaying leadership qualities.',
          'taurus': 'Give a stable and reliable impression, displaying elegant taste.',
          'gemini': 'Give an intelligent and witty impression, displaying excellent communication skills.',
          'cancer': 'Give a warm and friendly impression, displaying caring qualities.',
          'leo': 'Give a confident and generous impression, displaying royal demeanor.',
          'virgo': 'Give a careful and thoughtful impression, displaying professional abilities.',
          'libra': 'Give an elegant and harmonious impression, displaying excellent social skills.',
          'scorpio': 'Give a mysterious and profound impression, displaying strong personal charisma.',
          'sagittarius': 'Give an optimistic and free impression, displaying adventurous spirit.',
          'capricorn': 'Give a mature and stable impression, displaying sense of responsibility.',
          'aquarius': 'Give a unique and innovative impression, displaying avant-garde thinking.',
          'pisces': 'Give a gentle and dreamy impression, displaying artistic temperament.'
        }
      }
    },
    career: {
      strengths: {
        'aries': 'You have natural leadership and pioneering spirit, suitable for environments requiring innovation and decision-making.',
        'taurus': 'You excel at practical work, performing excellently in fields requiring stability and continuous effort.',
        'gemini': 'You have excellent communication skills and learning adaptability, suitable for diverse work environments.',
        'cancer': 'You have strong responsibility and caring abilities, particularly outstanding in service industries.',
        'leo': 'You have natural performance talents and leadership charisma, suitable for work requiring personal charm.',
        'virgo': 'You focus on details and quality, performing excellently in fields requiring precision and professional skills.',
        'libra': 'You have excellent coordination abilities and aesthetic sense, suitable for work requiring balance and aesthetics.',
        'scorpio': 'You have deep insight and research abilities, suitable for professional fields requiring in-depth analysis.',
        'sagittarius': 'You have international vision and philosophical thinking, suitable for education, publishing, or international affairs.',
        'capricorn': 'You have strong goal orientation and management abilities, suitable for corporate management and long-term planning.',
        'aquarius': 'You have innovative thinking and humanitarian spirit, suitable for technology and social reform fields.',
        'pisces': 'You have rich imagination and empathy, suitable for artistic creation and psychological counseling.'
      },
      suggestions: {
        'aries': ['Entrepreneur', 'Sales Manager', 'Sports Coach', 'Military Commander'],
        'taurus': ['Banker', 'Architect', 'Chef', 'Gardener'],
        'gemini': ['Journalist', 'Teacher', 'Translator', 'Marketing'],
        'cancer': ['Nurse', 'Psychologist', 'Real Estate', 'Restaurant Business'],
        'leo': ['Actor', 'Politician', 'Fashion Designer', 'Entertainment Industry'],
        'virgo': ['Accountant', 'Doctor', 'Editor', 'Quality Management'],
        'libra': ['Lawyer', 'Diplomat', 'Designer', 'Human Resources'],
        'scorpio': ['Researcher', 'Detective', 'Psychologist', 'Surgeon'],
        'sagittarius': ['Professor', 'Tourism', 'Publishing', 'International Trade'],
        'capricorn': ['CEO', 'Government Official', 'Engineer', 'Project Manager'],
        'aquarius': ['Scientist', 'IT Engineer', 'Social Worker', 'Inventor'],
        'pisces': ['Artist', 'Musician', 'Therapist', 'Charity Worker']
      }
    },
    relationships: {
      love: {
        'aries': 'In love, you are passionate and proactive, like to express feelings directly, need partners who can keep up with your pace.',
        'taurus': 'In love, you are loyal and stable, value physical touch and material security, prefer long-term relationships.',
        'gemini': 'In love, you need intellectual stimulation, enjoy sharing thoughts with partners, value communication.',
        'cancer': 'In love, you are affectionate and gentle, value emotional security, enjoy caring and being cared for.',
        'leo': 'In love, you are generous and passionate, need appreciation and praise, enjoy romantic expressions.',
        'virgo': 'In love, you are careful and considerate, value practical expressions of care, enjoy serving partners.',
        'libra': 'In love, you pursue harmony and balance, value beauty and romance, good at compromise and cooperation.',
        'scorpio': 'In love, you are deep and devoted, need deep emotional connections, somewhat possessive.',
        'sagittarius': 'In love, you need freedom and space, enjoy exploring the world with partners, value spiritual compatibility.',
        'capricorn': 'In love, you are serious and responsible, value long-term commitment, prefer stable developing relationships.',
        'aquarius': 'In love, you are independent and rational, value friendship foundation, need understanding and respect.',
        'pisces': 'In love, you are romantic and dreamy, have strong compassion, easily sacrifice yourself.'
      },
      friendship: {
        'aries': 'In friendship, you are active and leading, enjoy guiding friends to explore new things, a trustworthy partner.',
        'taurus': 'In friendship, you are loyal and reliable, value long-term friendships, an excellent listener.',
        'gemini': 'In friendship, you are sociable with wide friend circles, enjoy sharing new knowledge with friends.',
        'cancer': 'In friendship, you are caring and considerate, value deep emotional connections, an excellent supporter.',
        'leo': 'In friendship, you are generous, enjoy being the center of friend groups, value loyalty.',
        'virgo': 'In friendship, you are careful and thoughtful, willing to help friends solve practical problems, dependable.',
        'libra': 'In friendship, you pursue harmony, good at mediating conflicts between friends, value fairness.',
        'scorpio': 'In friendship, you are deep and sincere, though friends are few but relationships are deep, very loyal.',
        'sagittarius': 'In friendship, you are optimistic and cheerful, enjoy sharing adventure experiences with friends, value freedom.',
        'capricorn': 'In friendship, you are reliable and stable, though cautious in making friends but relationships last long, value quality.',
        'aquarius': 'In friendship, you are unique and interesting, value friendship over romance, care about friends\' personal development.',
        'pisces': 'In friendship, you are gentle and considerate, have strong compassion, excellent emotional support.'
      },
      compatibility: {
        'aries': ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
        'taurus': ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
        'gemini': ['Libra', 'Aquarius', 'Aries', 'Leo'],
        'cancer': ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
        'leo': ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
        'virgo': ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
        'libra': ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
        'scorpio': ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
        'sagittarius': ['Aries', 'Leo', 'Libra', 'Aquarius'],
        'capricorn': ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
        'aquarius': ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
        'pisces': ['Cancer', 'Scorpio', 'Taurus', 'Capricorn']
      }
    },
    fortune: {
      overview: {
        'Great Fortune': 'Your overall fortune is very strong with good development opportunities in all aspects. This is an excellent time to achieve goals.',
        'Good Fortune': 'Your fortune is stable and upward, though there may be some small challenges, the overall trend is positive.',
        'Moderate Fortune': 'Your fortune is stable, suitable for steady progress without rushing for quick success, focus on maintaining current advantages.',
        'Challenging Fortune': 'Your fortune faces some challenges requiring careful action, but this is also an opportunity for growth and learning.'
      }
    },
    planetKeywords: {
      sun: ['Self', 'Will', 'Creativity', 'Leadership', 'Confidence'],
      moon: ['Emotion', 'Intuition', 'Needs', 'Habits', 'Memory'],
      ascendant: ['Appearance', 'First Impression', 'Mask', 'Starting Point', 'Life Theme'],
      mercury: ['Communication', 'Thinking', 'Learning', 'Logic', 'Expression'],
      venus: ['Love', 'Aesthetics', 'Harmony', 'Art', 'Values'],
      mars: ['Action', 'Competition', 'Desire', 'Courage', 'Conflict']
    }
  },
  
  features: {
    title: 'Service Features',
    detailed: {
      title: 'Detailed Analysis',
      description: 'Professional chart calculation'
    },
    personalized: {
      title: 'Personalized',
      description: 'Your unique fortune reading'
    },
    transit: {
      title: 'Transit Analysis',
      description: 'Timing and trend analysis'
    }
  },
  
  // Navigation
  nav: {
    menuToggle: 'Menu Toggle',
    home: 'Home',
    learn: 'Learning Center',
    about: 'About Us',
    contact: 'Contact Us',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service'
  },

  // About Page
  about: {
    pageTitle: 'About Us',
    title: 'About Destiny Chart',
    subtitle: 'Bridging Ancient Wisdom with Modern Technology',
    metaDescription: 'Destiny Chart provides professional BaZi and Western astrology analysis services. Learn about our mission, services, and technology.',
    mission: {
      title: 'Our Mission',
      description1: 'Destiny Chart is dedicated to combining ancient divination wisdom with modern technology, providing accessible, high-quality astrological analysis services for everyone.',
      description2: 'We deeply study traditional knowledge of Eastern BaZi (Four Pillars of Destiny) and Western astrology, combining precise astronomical calculations to provide accurate and insightful analysis results.',
      description3: 'Our goal is to help people understand themselves more deeply and find direction in life through divination.'
    },
    services: {
      title: 'Our Services',
      bazi: {
        title: 'BaZi Analysis',
        description: 'Based on ancient Chinese Four Pillars theory, detailed analysis of destiny from birth year, month, day, and hour. Comprehensive assessment of Five Elements configuration, major luck periods, flowing years, and personality traits.'
      },
      western: {
        title: 'Western Astrology',
        description: 'Using modern astrological theory to interpret your birth chart in detail. Analyzing personality and fortune from planetary configurations, zodiac characteristics, and house influences.'
      },
      transit: {
        title: 'Transit Analysis',
        description: 'Analyzing current and future celestial influences on you, informing you of important periods and opportunities.'
      }
    },
    methodology: {
      title: 'Our Methodology',
      description1: 'We combine traditional divination theory with modern astronomical calculations to provide the most accurate analysis results:',
      point1: 'Precise Astronomical Calculations: Using VSOP87 algorithm for accurate planetary position calculations',
      point2: 'Traditional Theory Application: Interpretation system based on classical divination literature',
      point3: 'Multi-language Support: Providing services in Chinese, Japanese, and English',
      point4: 'Privacy Protection: All data stored locally, strictly protecting privacy',
      description2: 'All analysis results undergo strict quality control to ensure accuracy and reliability.'
    },
    accuracy: {
      title: 'Precision & Reliability',
      description1: 'We value both technical precision and traditional divination knowledge.',
      description2: 'Through the following technical features, we achieve industry-leading analysis precision:',
      tech1: {
        title: 'High-Precision Astronomical Calculations',
        description: 'Julian day conversion and VSOP87 algorithm planetary position calculations'
      },
      tech2: {
        title: 'Regional Optimization',
        description: 'Ascendant calculation algorithm optimized for Chinese regions'
      },
      tech3: {
        title: 'Traditional Theory Integration',
        description: 'Comprehensive interpretation system based on classical divination literature'
      }
    },
    accessibility: {
      title: 'Language & Accessibility',
      description1: 'Our services are available in Chinese, Japanese, and English, making them accessible to users worldwide.',
      description2: 'We also use responsive design, ensuring comfortable use on smartphones, tablets, and computers.'
    },
    privacy: {
      title: 'Privacy & Security',
      description1: 'We prioritize user privacy. All personal data is stored locally in your browser and not sent to servers.',
      description2: 'We also employ the latest security technologies to protect customer information.'
    },
    cta: 'Start Analysis Now'
  },

  // Privacy Page
  privacy: {
    pageTitle: 'Privacy Policy',
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated',
    metaDescription: 'Destiny Chart privacy policy. Detailed explanation of personal information collection, use, and protection. Google AdSense compliant privacy policy.',
    introduction: {
      title: 'Introduction',
      description1: 'Destiny Chart (https://meiban.info) prioritizes user privacy. This privacy policy explains what information we collect, how we use and protect this information.',
      description2: 'Using our services indicates your agreement to this privacy policy.'
    },
    collection: {
      title: 'Information We Collect',
      personal: {
        title: 'Personal Information',
        name: 'Name (optional)',
        birthdate: 'Birth date',
        birthtime: 'Birth time',
        birthplace: 'Birth place',
        gender: 'Gender'
      },
      automatic: {
        title: 'Automatically Collected Information',
        ip: 'IP address',
        browser: 'Browser information',
        device: 'Device information',
        usage: 'Usage statistics',
        cookies: 'Cookie data'
      }
    },
    usage: {
      title: 'Purpose of Information Use',
      calculate: 'Calculation and result generation for divination analysis',
      provide: 'Service provision and improvement',
      improve: 'User experience enhancement',
      communicate: 'Customer communication',
      analytics: 'Website analysis and performance improvement',
      ads: 'Relevant advertisement display'
    },
    adsense: {
      title: 'Google AdSense',
      description1: 'This website uses Google AdSense to display advertisements. AdSense uses cookies to serve ads based on user interests.',
      description2: 'Google AdSense may collect the following information:',
      cookies: {
        title: 'AdSense Cookies',
        doubleclick: 'DoubleClick DART Cookie',
        personalization: 'Personalized advertising cookies',
        analytics: 'Analytics cookies'
      },
      optout: 'You can opt out of personalized ads in Google Ad Settings.',
      learnmore: 'For details, please refer to',
      googlePrivacy: 'Google Privacy Policy'
    },
    analytics: {
      title: 'Google Analytics',
      description1: 'This website uses Google Analytics to analyze website usage.',
      description2: 'Google Analytics collects anonymous data without personal identification information.',
      optout: 'You can install the Google Analytics opt-out add-on to disable data collection:',
      optoutLink: 'Opt-out Add-on'
    },
    cookies: {
      title: 'About Cookies',
      description1: 'This website uses cookies to improve services and user experience.',
      types: {
        title: 'Cookie Types',
        essential: {
          title: 'Essential Cookies',
          description: 'Required for basic website functionality'
        },
        analytics: {
          title: 'Analytics Cookies',
          description: 'Website usage analysis'
        },
        advertising: {
          title: 'Advertising Cookies',
          description: 'Relevant advertisement display'
        },
        functional: {
          title: 'Functional Cookies',
          description: 'User settings storage'
        }
      },
      control: 'You can manage cookies in your browser settings.'
    },
    storage: {
      title: 'Data Storage',
      description1: 'Your divination analysis data is primarily stored locally in your browser and not sent to our servers.',
      description2: 'This maximizes protection of your privacy.',
      retention: 'You can delete data at any time by clearing your browser\'s local storage.'
    },
    sharing: {
      title: 'Data Sharing',
      description1: 'We do not share your personal information with third parties except as required by law. However, the following exceptions apply:',
      google: 'Sharing with service providers like Google AdSense and Google Analytics',
      legal: 'Legal requirements or law enforcement requests',
      protection: 'Website security and operational protection',
      consent: 'Situations with your explicit consent'
    },
    rights: {
      title: 'Your Rights',
      access: 'Right to access personal information',
      correct: 'Right to correct information',
      delete: 'Right to delete information',
      portability: 'Data portability rights',
      object: 'Right to object to processing',
      restrict: 'Right to restrict processing',
      contact: 'Please contact us to exercise these rights.'
    },
    security: {
      title: 'Security',
      description1: 'We take appropriate technical and organizational measures to protect your personal information from unauthorized access, loss, and destruction.',
      description2: 'However, please understand that information transmission over the internet is not 100% secure.'
    },
    international: {
      title: 'International Transfers',
      description1: 'Depending on service provider locations, your information may be transferred across borders.',
      description2: 'We strive to ensure destination countries also provide appropriate protection levels.'
    },
    children: {
      title: 'Children\'s Privacy',
      description1: 'This service is not directed at children under 13.',
      description2: 'We do not knowingly collect personal information from children under 13.'
    },
    changes: {
      title: 'Policy Changes',
      description1: 'We may update this privacy policy as needed.',
      description2: 'If there are significant changes, we will notify users on the website.'
    },
    contact: {
      title: 'Contact Us',
      description: 'If you have any questions about this privacy policy, please contact us through:',
      email: {
        label: 'Email Address'
      },
      website: {
        label: 'Website',
        link: 'Contact Us Page'
      }
    }
  },

  // Contact Page
  contact: {
    pageTitle: 'Contact Us',
    title: 'Contact Us',
    subtitle: 'Feel free to contact us with any questions or suggestions',
    metaDescription: 'Destiny Chart contact us page. We provide support for various inquiries including technical issues, privacy concerns, and more.',
    info: {
      title: 'Contact Information',
      email: {
        title: 'General Inquiries',
        description: 'Questions and suggestions about our services'
      },
      privacy: {
        title: 'Privacy Related Inquiries',
        description: 'Data protection and privacy related questions'
      },
      website: {
        title: 'Official Website',
        description: 'Latest information and service details'
      }
    },
    form: {
      title: 'Contact Form',
      name: {
        label: 'Name',
        placeholder: 'Please enter your name'
      },
      email: {
        label: 'Email Address',
        placeholder: 'your.email@example.com'
      },
      subject: {
        label: 'Inquiry Type',
        placeholder: 'Please select inquiry type',
        options: {
          general: 'General Inquiry',
          technical: 'Technical Issue',
          privacy: 'Privacy Related',
          feedback: 'Feedback',
          partnership: 'Partnership'
        }
      },
      message: {
        label: 'Message',
        placeholder: 'Please enter detailed message...'
      },
      consent: {
        text: 'I agree to the privacy policy',
        link: 'Privacy Policy'
      },
      submit: 'Send',
      submitting: 'Sending...',
      success: 'Message sent successfully. We will reply as soon as possible.',
      error: 'An error occurred while sending. Please try again later.'
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: {
        accuracy: {
          question: 'How accurate is the divination analysis?',
          answer: 'We combine precise astronomical calculations with traditional divination theory to provide the highest level of accuracy. However, we recommend using divination as a reference.'
        },
        privacy: {
          question: 'Is personal information securely protected?',
          answer: 'Yes. Your data is primarily stored locally in your browser and not sent to our servers. Please see our privacy policy for details.'
        },
        technical: {
          question: 'What to do when encountering technical issues?',
          answer: 'Please update your browser to the latest version, clear cache, and try again. If the problem persists, please contact technical support.'
        },
        languages: {
          question: 'What languages are supported?',
          answer: 'We currently provide services in Chinese, Japanese, and English. You can switch languages using the button in the top right corner.'
        },
        mobile: {
          question: 'Can mobile devices be used?',
          answer: 'Yes. This website uses responsive design and works comfortably on smartphones and tablets.'
        }
      }
    },
    response: {
      title: 'Response Time',
      urgent: {
        title: 'Urgent Inquiries',
        description: 'Response within 24 hours'
      },
      general: {
        title: 'General Inquiries',
        description: 'Response within 1-3 business days'
      },
      complex: {
        title: 'Complex Technical Issues',
        description: 'Response within 3-7 business days'
      }
    }
  },

  // Terms Page
  terms: {
    pageTitle: 'Terms of Service',
    title: 'Terms of Service',
    lastUpdated: 'Last Updated',
    metaDescription: 'Destiny Chart terms of service. Detailed explanation of service usage conditions, user responsibilities, disclaimers, and more.',
    introduction: {
      title: 'Introduction',
      description1: 'These Terms of Service ("Terms") govern the use of services ("Services") provided by Destiny Chart (https://meiban.info).',
      description2: 'Please read these Terms carefully before using our Services.',
      description3: 'Using our Services indicates your agreement to these Terms.'
    },
    acceptance: {
      title: 'Acceptance of Terms',
      description1: 'By accessing or using our Services, you agree to be bound by all terms and conditions of these Terms.',
      description2: 'If you do not agree to these Terms, please do not use our Services.'
    },
    service: {
      title: 'Service Description',
      description1: 'Our Services provide the following features:',
      feature1: 'BaZi (Four Pillars of Destiny) analysis and interpretation',
      feature2: 'Western astrology analysis and interpretation',
      feature3: 'Transit analysis and future predictions',
      feature4: 'Multi-language support (Chinese, Japanese, English)',
      description2: 'Our Services are for entertainment and educational purposes only and are not professional advice.'
    },
    responsibilities: {
      title: 'User Responsibilities',
      description1: 'When using our Services, you are responsible for:',
      accurate: 'Providing accurate information',
      legal: 'Complying with laws and regulations',
      respectful: 'Respecting other users',
      security: 'Maintaining account security',
      compliance: 'Complying with these Terms'
    },
    prohibited: {
      title: 'Prohibited Activities',
      description1: 'The following activities are prohibited:',
      illegal: 'Illegal or unlawful activities',
      harmful: 'Harmful, threatening, or defamatory content',
      spam: 'Spam or harassment',
      unauthorized: 'Unauthorized access',
      interference: 'Service interference',
      violate: 'Intellectual property infringement',
      impersonate: 'Impersonating others'
    },
    intellectual: {
      title: 'Intellectual Property',
      description1: 'All content, features, and functionality of our Services are the exclusive property of Destiny Chart and its licensors.',
      description2: 'Including text, graphics, logos, icons, images, audio clips, software, etc.',
      description3: 'Protected by copyright, trademark, and other intellectual property laws.'
    },
    privacy: {
      title: 'Privacy and Data',
      description1: 'Your privacy is important to us.',
      description2: 'For information about data collection and use, please see our',
      link: 'Privacy Policy'
    },
    disclaimers: {
      title: 'Disclaimers',
      entertainment: {
        title: 'Entertainment Purpose',
        description: 'Our Services are for entertainment and educational purposes only and are not substitutes for professional advice, medical, legal, or financial counseling.'
      },
      accuracy: {
        title: 'About Accuracy',
        description: 'Divination analysis results are for reference only. We recommend consulting professionals for important life decisions.'
      },
      decisions: {
        title: 'Decision Responsibility',
        description: 'All decisions based on our Services results are your own responsibility.'
      },
      professional: {
        title: 'Professional Advice',
        description: 'Our Services are not substitutes for medical, legal, financial, or psychological professional advice.'
      }
    },
    liability: {
      title: 'Limitation of Liability',
      description1: 'To the maximum extent permitted by law, Destiny Chart is not liable for direct, indirect, incidental, or consequential damages arising from use of our Services.',
      description2: 'Including but not limited to loss of profits, data loss, business interruption, etc.',
      description3: 'Some jurisdictions may not allow exclusion or limitation of damages.'
    },
    availability: {
      title: 'Service Availability',
      description1: 'We do not guarantee that our Services will always be available.',
      description2: 'Services may be temporarily interrupted due to maintenance, updates, or other reasons.',
      description3: 'We reserve the right to change, suspend, or terminate Services at any time without notice.'
    },
    modifications: {
      title: 'Terms Changes',
      description1: 'We reserve the right to modify these Terms as needed.',
      description2: 'If there are significant changes, we will notify users on the website. Continued use after changes constitutes acceptance of modified Terms.'
    },
    termination: {
      title: 'Service Termination',
      description1: 'We reserve the right to terminate or suspend your use of Services for any reason at any time.',
      description2: 'After service termination, relevant Terms provisions will remain in effect.'
    },
    governing: {
      title: 'Governing Law',
      description1: 'These Terms are governed by and construed in accordance with the laws of the People\'s Republic of China.',
      description2: 'Disputes related to these Terms will be resolved in the jurisdiction courts of the People\'s Republic of China.'
    },
    contact: {
      title: 'Contact Us',
      description: 'If you have any questions about these Terms, please contact us through:',
      email: {
        label: 'Email Address'
      },
      website: {
        label: 'Website',
        link: 'Contact Us Page'
      }
    }
  },

  // Learn Page
  learn: {
    pageTitle: 'Learning Center',
    title: 'Divination Learning Center',
    subtitle: 'Learn ancient wisdom, understand your destiny',
    metaDescription: 'Comprehensive learning center for BaZi and Western astrology. Providing educational content from beginner to advanced users.',
    intro: {
      title: 'Welcome to the World of Divination',
      description1: 'In our learning center, you can systematically learn BaZi (Four Pillars of Destiny) and Western astrology from basics to applications.',
      description2: 'Understand ancient wisdom from a modern perspective and master practical knowledge for daily life applications.'
    },
    paths: {
      title: 'Learning Courses',
      bazi: {
        title: 'BaZi Course',
        description: 'Learn ancient Chinese Four Pillars theory from the basics',
        lessons: {
          basics: 'Basic Theory',
          'heavenly-stems': 'Understanding Heavenly Stems',
          'earthly-branches': 'Understanding Earthly Branches',
          'five-elements': 'Five Elements Theory',
          'reading-pillars': 'Reading Four Pillars',
          'interpreting-chart': 'Chart Interpretation'
        }
      },
      astrology: {
        title: 'Western Astrology Course',
        description: 'From modern astrology basic concepts to practice',
        lessons: {
          introduction: 'Introduction to Astrology',
          'zodiac-signs': 'Twelve Zodiac Signs',
          planets: 'Planetary Meanings',
          houses: 'House System',
          aspects: 'Aspect Theory',
          'birth-chart': 'Birth Chart Reading'
        }
      },
      reading: {
        title: 'Chart Reading Course',
        description: 'Practical skills for reading actual charts',
        lessons: {
          preparation: 'Reading Preparation',
          'analysis-method': 'Analysis Methods',
          interpretation: 'Interpretation Techniques',
          timing: 'Timing Analysis',
          synthesis: 'Comprehensive Judgment',
          practice: 'Practice Exercises'
        }
      }
    },
    lessons: 'Lessons',
    difficulty: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced'
    },
    featured: {
      title: 'Featured Articles'
    },
    articles: {
      'understanding-birth-chart': {
        title: 'Understanding Birth Charts',
        excerpt: 'Detailed explanation of birth chart reading basics in Western astrology'
      },
      'five-elements-theory': {
        title: 'Five Elements Theory Basics',
        excerpt: 'Basic concepts and practical applications of the Five Elements theory inherited from ancient China'
      },
      'career-astrology': {
        title: 'Career Astrology',
        excerpt: 'Methods for career selection and aptitude analysis using astrology'
      },
      'relationship-compatibility': {
        title: 'Compatibility Analysis Methods',
        excerpt: 'Practical techniques for analyzing compatibility between two people using astrology'
      }
    },
    categories: {
      title: 'Categories',
      fundamentals: 'Fundamentals',
      astrology: 'Western Astrology',
      bazi: 'BaZi',
      practical: 'Practical Applications',
      relationships: 'Relationships',
      career: 'Career'
    },
    categoryDescriptions: {
      fundamentals: 'Basic concepts and historical background of divination',
      astrology: 'Theory and practice of Western astrology',
      bazi: 'Chinese Four Pillars theory',
      practical: 'Application methods in daily life',
      relationships: 'Interpersonal relationships and compatibility analysis',
      career: 'Career and professional choices'
    },
    exploreCategory: 'Explore Category',
    quickStart: {
      title: 'Quick Start Guide',
      description: 'Simple guide for divination beginners:',
      step1: 'Learn basic theory',
      step2: 'Try actual analysis',
      step3: 'Interpret results',
      step4: 'Apply to daily life',
      cta: 'Start Analysis'
    },
    readTime: '{minutes} minute read'
  },

  // Article Common
  article: {
    publishedOn: 'Published on',
    nextReading: 'Related Articles',
    breadcrumb: {
      learn: 'Learning Center'
    },
    relatedArticles: {
      zodiacSigns: 'Meanings of the Twelve Zodiac Signs',
      planetMeanings: 'Planetary Symbolism',
      astrologyHouses: 'Astrological Houses',
      baziBasics: 'BaZi Basics',
      heavenlyStems: 'Understanding Heavenly Stems',
      earthlyBranches: 'Understanding Earthly Branches'
    },
    understandingBirthChart: {
      pageTitle: 'Understanding Birth Charts',
      title: 'Understanding Birth Charts: Astrology Fundamentals',
      metaDescription: 'Detailed explanation of birth chart reading basics in Western astrology. Learn the basic meanings and interpretation methods of planets, zodiac signs, and houses.',
      introduction: 'A birth chart is a cosmic blueprint recording the celestial configuration at the moment of your birth. This article explains the basic reading and interpretation methods of birth charts in detail.',
      description1: 'The birth chart is one of the most important elements in Western astrology. Created from birth date, time, and place, it reveals a person\'s personality, talents, life lessons, and opportunities.',
      description2: 'When properly understood, it can help you understand yourself more deeply and gain clues to finding direction in life.',
      sections: {
        whatIs: {
          title: 'What is a Birth Chart',
          description1: 'A birth chart (natal chart) is a diagram recording the exact positions of celestial bodies at the moment of your birth.',
          keyElements: {
            title: 'Elements Needed to Create a Birth Chart',
            birthDate: 'Birth Date',
            birthDateDesc: 'Exact date needed',
            birthTime: 'Birth Time',
            birthTimeDesc: 'Time accurate to the minute',
            birthPlace: 'Birth Place',
            birthPlaceDesc: 'Longitude and latitude information'
          },
          description2: 'From this information, we can accurately calculate which zodiac signs the Sun, Moon, and planets are in, and which houses they occupy.'
        },
        components: {
          title: 'Main Components of a Birth Chart',
          planets: {
            title: 'Planets',
            description: 'Birth charts include 10 main celestial bodies, each representing different aspects of life:',
            personal: {
              title: 'Personal Planets',
              sun: 'Sun - Core identity',
              moon: 'Moon - Emotions and instincts',
              mercury: 'Mercury - Communication and thinking',
              venus: 'Venus - Love and aesthetics',
              mars: 'Mars - Action and energy'
            },
            social: {
              title: 'Social Planets',
              jupiter: 'Jupiter - Expansion and growth',
              saturn: 'Saturn - Limitations and responsibility'
            },
            generational: {
              title: 'Generational Planets',
              uranus: 'Uranus - Innovation and change',
              neptune: 'Neptune - Dreams and intuition',
              pluto: 'Pluto - Transformation and regeneration'
            }
          },
          zodiac: {
            title: 'Twelve Zodiac Signs',
            description: 'Which zodiac sign each planet is in determines how that planet\'s energy is expressed.'
          },
          houses: {
            title: 'Houses',
            description: 'Houses represent 12 life areas, showing which life domain planetary energy manifests in.',
            tip: {
              title: 'Tip',
              description: 'The Ascendant is the beginning of the 1st house, representing your external impression and life attitude.'
            }
          }
        },
        howToRead: {
          title: 'How to Read a Birth Chart',
          description: 'When interpreting a birth chart, the following step-by-step method is effective:',
          steps: {
            step1: {
              title: 'Confirm the Big Three',
              description: 'First confirm Sun sign, Moon sign, and Ascendant to understand the basic personality framework.'
            },
            step2: {
              title: 'Analyze Planetary Configurations',
              description: 'Confirm which zodiac sign and house each planet is in, reading tendencies in various life areas.'
            },
            step3: {
              title: 'Observe Aspects',
              description: 'Observe angular relationships (aspects) between planets to understand energy interactions.'
            },
            step4: {
              title: 'Integrate Overall Patterns',
              description: 'Integrate individual elements to read overall personality tendencies and life themes.'
            }
          }
        },
        bigThree: {
          title: 'The Big Three',
          description: 'The three most important elements in astrology:',
          sun: {
            title: 'Sun Sign',
            description: 'Represents your core personality, life purpose, and creative energy.'
          },
          moon: {
            title: 'Moon Sign',
            description: 'Represents your emotional nature, unconscious reactions, and inner needs.'
          },
          ascendant: {
            title: 'Ascendant (Rising Sign)',
            description: 'Represents your impression on others and your approach to life.'
          }
        },
        gettingStarted: {
          title: 'Getting Started',
          description: 'After learning the theory, it\'s important to actually create and analyze your own birth chart. Why not try creating your birth chart using our service?',
          cta: 'Create My Birth Chart'
        }
      }
    },
    fiveElements: {
      pageTitle: 'Five Elements Theory Basics',
      title: 'Five Elements Theory Basics: Ancient Chinese Wisdom',
      metaDescription: 'Basic concepts and practical applications of Five Elements theory inherited from ancient China. Detailed explanation of the characteristics and interrelationships of Wood, Fire, Earth, Metal, and Water.',
      introduction: 'Five Elements theory is a fundamental philosophical thought inherited from ancient China, believing that all things in the universe are composed of five elements: Wood, Fire, Earth, Metal, and Water.',
      description1: 'Five Elements theory is an important concept fundamental to BaZi (Four Pillars of Destiny). Understanding this theory allows deeper comprehension of natural cycles and life processes.',
      description2: 'Each element has unique characteristics and influences each other to maintain cosmic harmony.',
      sections: {
        elements: {
          title: 'The Five Elements',
          description: 'Each of the Five Elements has unique characteristics and symbolism:',
          attributes: {
            direction: 'Direction',
            season: 'Season',
            color: 'Color',
            emotion: 'Emotion'
          },
          wood: {
            title: 'Wood',
            direction: 'East',
            season: 'Spring',
            color: 'Green',
            emotion: 'Anger',
            description: 'Symbolizes growth, development, and creativity. Like spring\'s new green full of vitality, with upward energy.'
          },
          fire: {
            title: 'Fire',
            direction: 'South',
            season: 'Summer',
            color: 'Red',
            emotion: 'Joy',
            description: 'Represents passion, activity, and light. Bright like the sun, with radiating energy.'
          },
          earth: {
            title: 'Earth',
            direction: 'Center',
            season: 'Late Summer',
            color: 'Yellow',
            emotion: 'Pensiveness',
            description: 'Symbolizes stability, nurturing, and inclusiveness. Stable like the earth, with capacity to embrace all.'
          },
          metal: {
            title: 'Metal',
            direction: 'West',
            season: 'Autumn',
            color: 'White',
            emotion: 'Grief',
            description: 'Represents concentration, refinement, and justice. Has sharp, pure qualities and power to remove impurities.'
          },
          water: {
            title: 'Water',
            direction: 'North',
            season: 'Winter',
            color: 'Black/Blue',
            emotion: 'Fear',
            description: 'Symbolizes wisdom, fluidity, and storage. Soft like water, flowing to low places, nourishing all things.'
          }
        },
        interactions: {
          title: 'Five Elements Interactions',
          description: 'The Five Elements have two basic relationships: generating and controlling.',
          generative: {
            title: 'Generative Cycle (Creative Cycle)',
            description: 'The relationship where one element generates and nurtures the next:',
            woodFire: 'Wood burns to create Fire',
            fireEarth: 'Fire becomes ash to create Earth',
            earthMetal: 'Earth produces Metal',
            metalWater: 'Metal condenses Water',
            waterWood: 'Water nourishes Wood'
          },
          destructive: {
            title: 'Destructive Cycle (Control Cycle)',
            description: 'The relationship where one element controls or restrains another:',
            examples: {
              title: 'Examples of Control',
              woodEarth: 'Wood absorbs Earth\'s nutrients',
              earthWater: 'Earth absorbs Water',
              waterFire: 'Water extinguishes Fire',
              fireMetal: 'Fire melts Metal',
              metalWood: 'Metal (axe) cuts Wood'
            }
          }
        },
        bazi: {
          title: 'Five Elements in BaZi',
          description: 'In BaZi, the eight characters (Heavenly Stems and Earthly Branches) derived from birth year, month, day, and hour each correspond to Five Elements.',
          pillars: {
            title: 'Four Pillars and Five Elements',
            description: 'Year, Month, Day, and Hour pillars each represent Five Elements balance:',
            year: 'Year Pillar',
            yearDesc: 'Ancestral influence, basic personality',
            month: 'Month Pillar',
            monthDesc: 'Growth period, social aspects',
            day: 'Day Pillar',
            dayDesc: 'Personal character, spouse relationship',
            hour: 'Hour Pillar',
            hourDesc: 'Later years, children relationship'
          },
          balance: {
            title: 'Five Elements Balance',
            description: 'Ideal charts have balanced Five Elements configuration. If there are deficiencies or excesses, consider supplementation methods.',
            tips: {
              title: 'Balance Adjustment Tips',
              tip1: 'Wear colors of deficient elements',
              tip2: 'Pay attention to corresponding directions',
              tip3: 'Utilize characteristics of corresponding seasons',
              tip4: 'Use generative relationships for strengthening'
            }
          }
        },
        practical: {
          title: 'Practical Applications',
          description: 'Five Elements theory can be applied in various aspects of daily life:',
          personality: {
            title: 'Personality Analysis',
            description: 'Understanding which element is strong can reveal basic personality tendencies.'
          },
          career: {
            title: 'Career Choice',
            description: 'Can find careers and work styles suitable for your Five Elements balance.'
          },
          health: {
            title: 'Health Management',
            description: 'Each element relates to specific body parts and can serve as health management indicators.'
          },
          success: {
            title: 'Key to Success',
            description: 'Understanding Five Elements balance and maintaining harmony can lead to a more fulfilling life.'
          }
        },
        gettingStarted: {
          title: 'Understanding Your Five Elements',
          description: 'After learning the theory, analyze your own Five Elements balance. Through BaZi analysis, you can confirm your Five Elements configuration.',
          cta: 'Analyze My Five Elements'
        }
      }
    }
  },

  footer: {
    copyright: '© 2025 Destiny Chart - BaZi・Astrology・Divination Analysis'
  },
  
  alerts: {
    birthdateRequired: 'Please select birth date',
    birthTimeRequired: 'Please select birth time',
    birthMinuteRequired: 'Please select birth minute',
    birthplaceRequired: 'Please enter birth place',
    genderRequired: 'Please select gender'
  },

  notFound: {
    transitRequiresData: 'Please enter basic information first to use transit analysis.',
    issueReported: 'Issue reported. Thank you for your cooperation.'
  },
  
  languageSwitcher: {
    title: 'Select Language',
    current: 'Current Language'
  },
  
  transitAnalysis: {
    title: 'Personal Transit In-Depth Analysis',
    subtitle: 'Professional transit analysis based on your birth data',
    selectDate: 'Select Analysis Date',
    quickSelect: 'Quick Select',
    today: 'Today',
    birthday: 'Birthday',
    newYear: 'New Year',
    customDate: 'Custom Date',
    analysisDate: 'Analysis Date',
    analysisTime: 'Analysis Time',
    preview: 'Analysis Preview',
    previewDate: 'Analysis Date',
    ageAtTime: 'Age at Time',
    daysToBirthday: 'Days to Birthday',
    yearsOld: ' years old',
    days: ' days',
    startAnalysis: 'Start Analysis',
    analyzing: 'Analyzing...',
    analyzingTitle: 'Analyzing Your Transit Chart',
    analyzingDesc: 'This may take a moment',
    analyzingYourTransit: 'Analyzing Your Transit Chart...',
    calculatingPlanets: 'Please wait, we are calculating planetary positions and aspect relationships',
    step1: 'Calculating Transit Planetary Positions',
    step2: 'Analyzing Aspect Relationships',
    step3: 'Generating Detailed Report',
    analysisSteps: {
      prepare: 'Preparing data...',
      calculate: 'Calculating celestial positions...',
      analyze: 'Analyzing transit influences...',
      interpret: 'Generating personal interpretation...',
      complete: 'Analysis complete!'
    },
    analysisInProgress: 'Conducting In-Depth Personal Transit Analysis',
    analysisError: 'An error occurred during analysis, please try again later',
    reportTitle: '\'s Transit Analysis',
    age: 'Age',
    birthPlace: 'Birth Place',
    intensity: {
      high: 'High Intensity',
      medium: 'Medium Intensity',
      low: 'Gentle Intensity'
    },
    overview: 'Overview',
    keyThemes: 'Current Key Themes',
    lifeCycles: 'Major Life Cycles',
    majorAspects: 'Major Aspects Analysis',
    guidance: 'Life Guidance',
    opportunities: 'Opportunities & Potential',
    challenges: 'Challenges & Lessons',
    recommendations: 'Categorized Recommendations',
    futureOutlook: 'Future Outlook',
    next3Months: 'Next 3 Months',
    next6Months: 'Next 6 Months',
    nextYear: 'Next Year',
    nextYearOutlook: 'Next Year Outlook',
    longTerm: 'Long-term Outlook',
    longTermDevelopment: 'Long-term Development',
    newAnalysis: 'New Analysis',
    shareReport: 'Share Report',
    shareTitle: 'My Transit Analysis Report',
    shareText: '\'s Personal Transit Analysis',
    linkCopied: 'Link copied to clipboard',
    copyManually: 'Please manually copy the current page link to share',
    orb: 'Orb',
    careerFocus: 'Career Development Focus',
    relationshipFocus: 'Relationship Focus',
    personalGrowth: 'Personal Growth Focus',
    personalGrowthFocus: 'Personal Growth Focus',
    physicalHealth: 'Physical Health',
    mentalHealth: 'Mental Health',
    emotionalHealth: 'Emotional Health',
    timing: 'Timeframe',
    timeframe: 'Timeframe',
    focusAreas: 'Focus Areas',
    priorities: 'Priority Development',
    priorityDevelopment: 'Priority Development',
    methods: 'Recommended Methods',
    recommendedMethods: 'Recommended Methods',
    approach: 'Approach',
    bestTiming: 'Best Timing',
    avoidTiming: 'Caution Period',
    cautionPeriod: 'Caution Period',
    keyDates: 'Key Dates',
    advice: 'Advice',
    outerPlanetsInfluence: 'Outer Planets Deep Influence',
    overallTheme: 'Overall Theme',
    planetInfluence: ' Influence',
    relatedAspects: 'Related Aspects',
    guidanceAdvice: 'Guidance Advice',
    majorTransitAspects: 'Major Transit Aspects',
    lifeGuidanceAdvice: 'Life Guidance & Advice',
    currentFocus: 'Current Focus',
    mainChallenge: 'Main Challenge',
    importantOpportunity: 'Important Opportunity',
    emotionalAdvice: 'Emotional Advice',
    practicalAdvice: 'Practical Advice',
    spiritualAdvice: 'Spiritual Advice',
    detailedRecommendations: 'Detailed Field Recommendations',
    downloadReport: 'Download PDF Report',
    noReportError: 'No analysis report available for download',
    generating: 'Generating...',
    pdfError: 'PDF generation failed. Please try again later',
    reanalyze: 'Re-analyze',
    returnHome: 'Return Home',
    tabs: {
      career: 'Career Development',
      relationships: 'Relationships',
      health: 'Health Management',
      personal: 'Personal Growth',
      financial: 'Financial Planning',
      timing: 'Timing Guidance'
    }
  },
  
  common: {
    back: 'Back'
  },

  starChart: {
    title: 'Star Chart',
    viewMode: {
      title: 'Chart Display Mode',
      description: 'Choose your preferred star chart display method'
    },
    controls: {
      showAspects: 'Show Aspects',
      hideAspects: 'Hide Aspects',
      showHouses: 'Show Houses',
      hideHouses: 'Hide Houses',
      fullscreen: 'Fullscreen',
      reset: 'Reset View',
      title: 'Display Controls',
      animation: 'Enable Animation',
      zodiacLabels: 'Zodiac Labels',
      rotationSpeed: 'Rotation Speed',
      showEquator: 'Show Equator Ring',
      showHorizon: 'Show Horizon Ring',
      latitude: 'Latitude',
      longitude: 'Longitude'
    },
    legends: {
      planets: 'Planets',
      majorAspects: 'Major Aspects'
    },
    tooltip: {
      degree: '°',
      minute: "'"
    },
    aspects: {
      conjunction: 'Conjunction',
      sextile: 'Sextile',
      square: 'Square',
      trine: 'Trine',
      opposition: 'Opposition'
    },
    houses: {
      descriptions: {
        1: 'Self & Personality',
        2: 'Wealth & Values',
        3: 'Communication & Learning',
        4: 'Home & Roots',
        5: 'Creativity & Love',
        6: 'Work & Health',
        7: 'Relationships & Partnership',
        8: 'Transformation & Sharing',
        9: 'Philosophy & Travel',
        10: 'Career & Reputation',
        11: 'Friendship & Hope',
        12: 'Subconscious & Sacrifice'
      }
    },
    zodiac: {
      aries: 'Aries',
      taurus: 'Taurus',
      gemini: 'Gemini',
      cancer: 'Cancer',
      leo: 'Leo',
      virgo: 'Virgo',
      libra: 'Libra',
      scorpio: 'Scorpio',
      sagittarius: 'Sagittarius',
      capricorn: 'Capricorn',
      aquarius: 'Aquarius',
      pisces: 'Pisces'
    },
    planets: {
      sun: 'Sun',
      moon: 'Moon',
      mercury: 'Mercury',
      venus: 'Venus',
      mars: 'Mars',
      jupiter: 'Jupiter',
      saturn: 'Saturn',
      uranus: 'Uranus',
      neptune: 'Neptune',
      pluto: 'Pluto',
      north_node: 'North Node',
      south_node: 'South Node',
      ascendant: 'Ascendant',
      midheaven: 'Midheaven',
      chiron: 'Chiron'
    },
    astro3d: {
      title: 'Astronomical 3D Visualization',
      timeLocation: 'Time & Location',
      dateTime: 'Date & Time',
      latitude: 'Latitude',
      longitude: 'Longitude',
      altitude: 'Altitude (meters)',
      latitudePlaceholder: 'e.g. 35.6812',
      longitudePlaceholder: 'e.g. 139.7671',
      altitudePlaceholder: 'e.g. 0',
      displayOptions: 'Display Options',
      runTests: 'Run System Tests',
      selfCheck: 'Self Check',
      testResults: 'Test Results',
      description: 'Astro3D provides astronomical-grade 3D visualization based on real celestial mechanics. Use the controls above to adjust time, location, and display options to explore the celestial sphere from your perspective.'
    }
  },

  transitReport: {
    header: {
      title: 'Personal Transit In-Depth Analysis Report',
      anonymousUser: 'Anonymous User',
      unknownPlace: 'Unknown Location'
    },
    
    errors: {
      missingData: 'Missing required input data',
      invalidDate: 'Invalid date',
      dateFormatError: 'Date format error',
      dateError: 'Date error',
      analysisError: 'An error occurred during analysis, please try again later',
      unknownPhase: 'Unable to determine current phase',
      reanalysis: 'Re-analysis',
      unknownIntensity: 'Unknown intensity',
      outerPlanetError: 'Outer planet analysis failed',
      reanalysisNeeded: 'Re-analysis needed',
      systemError: 'Analysis system error',
      retryLater: 'Please try again later',
      patience: 'Stay patient',
      checkData: 'Check input data',
      trustProcess: 'Trust the process',
      unknown: 'Unknown',
      stayHealthy: 'Stay healthy',
      stayCalm: 'Stay calm',
      bePatient: 'Be patient',
      beCautious: 'Be cautious',
      waitForFix: 'Wait for system fix',
      dataValidation: 'Data validation',
      avoidNow: 'Avoid analysis now',
      needRecalculation: 'Need recalculation',
      contactSupport: 'Please contact technical support'
    },

    overview: {
      midlifePhase: 'You are in an important transitional period of life. The influence of outer planets is helping you transform deeply and redefine the meaning and direction of your life.',
      saturnReturnPhase: 'You are experiencing a Saturn return period, which is a crucial time for establishing adult foundations. While full of challenges, it is also full of opportunities.',
      jupiterReturnPhase: 'Jupiter return brings expansive and growth energy, this is a good time to pursue higher goals and broaden your horizons.',
      stablePhase: 'You are currently in a relatively stable development phase, suitable for consolidating existing achievements and preparing for important future changes.',
      summaryTemplate: 'At {age} years old, you are experiencing {totalAspects} important transit aspects, {majorAspects} of which are strong aspects. {cyclesCount} important life cycles are currently activated.',
      fallbackSummary: 'Experiencing an important life stage',
      fallbackPhase: 'Currently in a stable development period',
      fallbackTheme: 'Stable development'
    },

    intensity: {
      high: 'High Intensity',
      medium: 'Medium Intensity',
      gentle: 'Gentle Intensity'
    },

    themes: {
      responsibility: 'Taking responsibility',
      expansion: 'Expansion and growth',
      innovation: 'Innovation and breakthrough',
      maturation: 'Maturation and transformation',
      stability: 'Stable development'
    },

    cycles: {
      noMajorCycles: 'No major life cycles are currently activated',
      stablePhase: 'Stable period',
      stableDescription: 'You are in a relatively peaceful development period, able to focus on daily growth and accumulation.',
      stableThemes: {
        development: 'Stable development',
        skillBuilding: 'Skill enhancement',
        foundation: 'Foundation building'
      },
      stableAdvice: 'Use this stable period to perfect skills and prepare for important cycles to come.',
      unknownCycle: 'Unknown cycle',
      phases: {
        early: 'Early',
        middle: 'Middle',
        late: 'Late'
      },
      defaultDescription: 'Experiencing important influence from {cycleName}.',
      defaultThemes: {
        growth: 'Personal growth',
        responsibility: 'Taking responsibility'
      },
      defaultAdvice: 'Focus on the growth opportunities this cycle brings.',
      analysisError: 'Analysis error',
      unknown: 'Unknown',
      analysisErrorDescription: 'Unable to analyze current life cycles',
      reanalysisNeeded: 'Re-analysis needed',
      retryAdvice: 'Please retry analysis later'
    },

    outerPlanets: {
      saturn: {
        name: 'Saturn',
        theme: 'Responsibility and structural rebuilding',
        description: 'Saturn is asking you to take on more responsibility and build a more solid life structure. While you may feel pressure, this is an important time for long-term achievement.',
        advice: 'Face challenges patiently, focus on building long-term foundations. Avoid shortcuts, steady effort will bring lasting results.'
      },
      uranus: {
        name: 'Uranus',
        theme: 'Breakthrough and innovation',
        description: 'Uranus brings breakthrough and transformative energy. You may suddenly want to change the status quo and pursue greater freedom and independence.',
        advice: 'Embrace change, but avoid being too impulsive. Find innovative ways to solve old problems while maintaining some stability.'
      },
      neptune: {
        name: 'Neptune',
        theme: 'Spiritual awakening and intuition',
        description: 'Neptune enhances your intuition and spiritual sensitivity. This is a good time for artistic creation, spiritual cultivation, and empathy development.',
        advice: 'Trust your intuition while maintaining connection with reality. Avoid over-idealization, balance spiritual pursuits with practical life.'
      },
      pluto: {
        name: 'Pluto',
        theme: 'Deep transformation and rebirth',
        description: 'Pluto brings deep psychological transformation. You may let go of old patterns and experience inner death and rebirth.',
        advice: 'Bravely face the inner transformation process. Release old patterns that no longer serve you and embrace the new self.'
      },
      mildInfluence: 'Current outer planet influences are relatively mild, a time for stable development.',
      analysisError: 'Outer planet analysis error occurred',
      themes: {
        peaceful: 'Peaceful development',
        transformation: 'Deep transformation',
        building: 'Foundation building',
        breakthrough: 'Breakthrough innovation',
        growth: 'Steady growth'
      }
    },

    aspects: {
      unknown: 'Unknown',
      applying: 'Applying',
      separating: 'Separating',
      defaultDescription: 'This aspect is bringing important influences to your life.',
      defaultKeyword: 'Growth',
      defaultAdvice: 'Stay open-minded and actively respond to changes.',
      
      saturnConjunction: {
        description: 'Saturn conjunction brings serious responsibilities and challenges, but also opportunities to build solid foundations.',
        keywords: 'Responsibility,Challenge,Foundation,Maturity',
        advice: 'Patiently take on responsibilities, focus on establishing long-term goals.'
      },
      saturnSquare: {
        description: 'Saturn square brings pressure and obstacles, requiring effort and persistence to overcome difficulties.',
        keywords: 'Pressure,Obstacles,Persistence,Growth',
        advice: 'Do not retreat from difficulties, break through limitations through hard work.'
      },
      saturnTrine: {
        description: 'Saturn trine provides stable support, a good time to establish long-term plans.',
        keywords: 'Stability,Support,Planning,Achievement',
        advice: 'Use this stable period to make long-term plans and steadily advance goals.'
      },
      saturnOpposition: {
        description: 'Saturn opposition requires finding balance between responsibility and freedom.',
        keywords: 'Balance,Responsibility,Freedom,Adjustment',
        advice: 'While taking responsibility, maintain personal freedom and seek balance.'
      },
      jupiterConjunction: {
        description: 'Jupiter conjunction brings opportunities for expansion and growth, a time to pursue higher goals.',
        keywords: 'Expansion,Growth,Opportunity,Optimism',
        advice: 'Actively seize growth opportunities, but avoid over-optimism and risks.'
      },
      jupiterTrine: {
        description: 'Jupiter trine brings luck and smoothness, a good time to achieve goals.',
        keywords: 'Luck,Smooth,Success,Confidence',
        advice: 'Seize favorable timing to advance plans while maintaining humility and gratitude.'
      },
      uranusConjunction: {
        description: 'Uranus conjunction brings sudden changes and innovative opportunities.',
        keywords: 'Change,Innovation,Breakthrough,Freedom',
        advice: 'Embrace change and innovation, but avoid overly radical actions.'
      },
      uranusSquare: {
        description: 'Uranus square may bring unexpected changes and instability.',
        keywords: 'Unexpected,Change,Instability,Adaptation',
        advice: 'Stay flexible, adapt to sudden changes, but avoid impulsive decisions.'
      },
      neptuneConjunction: {
        description: 'Neptune conjunction enhances intuition and spiritual sensitivity.',
        keywords: 'Intuition,Spiritual,Creativity,Dreams',
        advice: 'Develop spiritual aspects while maintaining connection with reality.'
      },
      neptuneSquare: {
        description: 'Neptune square may bring confusion and conflict between ideals and reality.',
        keywords: 'Confusion,Ideals,Reality,Balance',
        advice: 'Find balance between ideals and reality, avoid self-deception.'
      },
      plutoConjunction: {
        description: 'Pluto conjunction brings deep psychological transformation and rebirth.',
        keywords: 'Transformation,Rebirth,Power,Change',
        advice: 'Bravely face inner transformation, release old patterns no longer needed.'
      },
      plutoSquare: {
        description: 'Pluto square brings intense transformational pressure and power struggles.',
        keywords: 'Pressure,Transformation,Power,Resistance',
        advice: 'Wisely handle power relationships, gain true power through inner transformation.'
      }
    },

    lifeCycles: {
      saturnReturn1: {
        title: 'First Saturn Return (29-30 years old)',
        description: 'This is a crucial period transitioning from youth to adulthood. Saturn return demands establishing true adult responsibilities and life direction. This may be a period full of challenges but also growth opportunities.',
        themes: 'Adult responsibility,Life direction,Foundation building,Mature growth',
        advice: 'Do not avoid responsibility, bravely face life\'s challenges. The efforts during this time will lay the foundation for the next 30 years.'
      },
      jupiterReturn3: {
        title: 'Third Jupiter Return (36 years old)',
        description: 'Jupiter return brings opportunities for expansion and growth. This is a time to reassess life goals and seek higher-level development. There may be new learning opportunities or international development.',
        themes: 'Opportunity expansion,Broadened horizons,Learning growth,Positive progress',
        advice: 'Keep an open mind and actively seize growth opportunities. This is a good time to improve yourself and expand your influence.'
      },
      saturnOpposition: {
        title: 'Saturn Opposition (43-45 years old)',
        description: 'This is an important testing period in mid-life. You need to make adjustments on established foundations, balancing responsibility with freedom, tradition with innovation. This may be a period of reorientation.',
        themes: 'Mid-term evaluation,Balance adjustment,Reorientation,Wisdom accumulation',
        advice: 'Face this turning period with wisdom and patience. Avoid extreme changes, seek gradual adjustments.'
      }
    },

    lifeGuidance: {
      emotionalAdvice: 'Maintain emotional openness and honesty, share your feelings and confusions with trusted people.',
      practicalAdvice: 'Make specific and achievable plans, realize goals step by step. Avoid over-idealization or impatience.',
      focus: {
        foundation: 'Focus on building life foundations, developing skills and establishing relationships.',
        achievement: 'Balance career development with family responsibilities, pursue meaningful achievements.',
        wisdom: 'Share experience and wisdom, take on guiding roles, focus on inner growth.',
        legacy: 'Focus on life legacy, share wisdom with younger generations, pursue spiritual satisfaction.'
      },
      challenge: {
        specific: 'The challenge brought by {transitPlanet} {aspect} {natalPlanet} requires you to actively face and resolve.',
        peaceful: 'Currently there are no particularly obvious challenging aspects, it is a relatively peaceful period.'
      },
      opportunity: {
        specific: '{transitPlanet} {aspect} {natalPlanet} brings good development opportunities, actively seize them.',
        general: 'Look for small opportunities in daily life, accumulate foundations for growth.'
      },
      spiritual: {
        exploration: 'Explore the spiritual world, seek life meaning and values.',
        integration: 'Integrate life experiences, find balance between spiritual pursuits and real responsibilities.',
        transcendence: 'Transcend material pursuits, focus on spiritual legacy and contemplation of life\'s meaning.'
      },
      fallbackFocus: 'Focus on current stable development',
      fallbackChallenge: 'Overcome small difficulties in daily life',
      fallbackOpportunity: 'Seize growth opportunities around you',
      fallbackEmotional: 'Maintain emotional balance',
      fallbackPractical: 'Focus on practical actions',
      fallbackSpiritual: 'Focus on inner growth'
    },

    recommendations: {
      career: {
        focus: 'Focus on skill improvement and professional development',
        advice: 'Look for work opportunities that align with your values, balance work and life.',
        timing: 'Suitable for advancing important career plans during stable periods',
        fallbackFocus: 'Stable development',
        fallbackAdvice: 'Maintain current status',
        fallbackTiming: 'No special requirements'
      },
      relationships: {
        focus: 'Improve communication quality, deepen emotional connections',
        advice: 'Maintain sincerity and openness in relationships while respecting each other\'s boundaries.',
        areas: {
          communication: 'Communication',
          intimacy: 'Intimate relationships',
          boundaries: 'Boundary setting'
        },
        fallbackFocus: 'Maintain relationships',
        fallbackAdvice: 'Keep good communication',
        fallbackArea: 'Existing relationships'
      },
      health: {
        physical: 'Pay attention to regular routines, maintain moderate exercise and balanced diet.',
        mental: 'Learn to manage stress, find healthy ways to release.',
        emotional: 'Cultivate emotional expression abilities, build support systems.',
        fallbackPhysical: 'Pay attention to health',
        fallbackMental: 'Maintain psychological balance',
        fallbackEmotional: 'Emotional stability'
      },
      personal: {
        priorities: {
          awareness: 'Self-awareness',
          skills: 'Skill development',
          relationships: 'Relationship building'
        },
        methods: {
          reflection: 'Reflection and meditation',
          learning: 'Continuous learning',
          practice: 'Practical application'
        },
        fallbackPriority: 'Personal development',
        fallbackMethod: 'Learning and growth'
      },
      financial: {
        approach: 'Adopt stable and conservative financial strategies',
        advice: 'Build emergency funds, avoid high-risk investments.',
        priority: 'Financial security and long-term planning',
        fallbackApproach: 'Stable financial management',
        fallbackAdvice: 'Maintain financial stability',
        fallbackPriority: 'Risk control'
      },
      timing: {
        bestTiming: 'Moon phase transitions and seasonal changes',
        avoidHigh: 'Avoid making major decisions during high-stress periods',
        avoidNone: 'No particular periods to avoid',
        keyDates: 'Pay attention to new moon and full moon periods each month, energy changes are more obvious',
        fallbackBest: 'Act at appropriate timing',
        fallbackAvoid: 'Avoid impulsiveness',
        fallbackKey: 'Pay attention to important timing'
      }
    },

    futureOutlook: {
      next3Months: 'Focus on changes brought by currently activated aspects over the next three months, especially those involving personal growth and relationship adjustments.',
      next6Months: 'The next six months is a period to consolidate current change results, recommend maintaining patience and not rushing.',
      nextYear: 'Next year\'s development will build on this year\'s foundation, continuing to deepen current transformation processes.',
      longTerm: {
        foundation: 'The coming years will be an important period for building life foundations, focus on skill development and relationship building.',
        development: 'Entering an important development period of life, career and family will be main focuses.',
        experience: 'A period of life experience accumulation, can consider taking on more guidance and leadership roles.',
        wisdom: 'Entering a period of wisdom sharing, can pass on life experiences to younger generations.'
      },
      fallback3Months: 'Focus on short-term changes',
      fallback6Months: 'Consolidate current achievements',
      fallbackYear: 'Continue stable development',
      fallbackLongTerm: 'Maintain long-term planning'
    }
  },
  
  // Share functionality translations
  share: {
    title: 'Share Results',
    share: 'Share',
    wechat: 'WeChat Share',
    generating: 'Preparing to share...',
    success: 'Share successful!',
    copyLink: 'Copy Link',
    qq: 'Share to QQ',
    weibo: 'Share to Weibo', 
    email: 'Share via Email',
    wechatTip: 'Please tap the "..." button in the top right corner to share',
    error: 'Share failed, please try again later'
  },

  // Lesson translations
  lesson: {
    overview: 'Course Overview',
    objectives: 'Learning Objectives',
    objective1: 'Master basic concepts and principles',
    objective2: 'Understand practical application methods',
    objective3: 'Acquire independent analysis abilities',
    content: 'Course Content',
    example: 'Example',
    practice: 'Practice',
    previous: 'Previous Lesson',
    next: 'Next Lesson',
    notFound: 'Lesson not found',
    placeholder1: 'This is the main content of the course. We will explore relevant concepts in depth to provide you with comprehensive understanding.',
    placeholder2: 'Through practical cases and detailed explanations, you will learn how to apply theoretical knowledge to actual analysis.',
    placeholder3: 'After mastering this knowledge, you will be able to independently perform related astrological analysis.',
    exampleText: 'This is a specific example to help you better understand the content you have learned.',
    practiceInstruction: 'Click the button below to start practical exercises and apply your learned knowledge to real birth chart analysis.',
    startPractice: 'Start Practice',
    
    lessons: {
      bazi: {
        basics: 'Bazi Basics',
        'heavenly-stems': 'Heavenly Stems Detailed',
        'earthly-branches': 'Earthly Branches Detailed',
        'five-elements': 'Five Elements Theory',
        'reading-pillars': 'Reading Four Pillars'
      },
      astrology: {
        introduction: 'Astrology Introduction',
        'zodiac-signs': 'Twelve Zodiac Signs',
        planets: 'Planets Detailed',
        houses: 'Houses Detailed',
        aspects: 'Aspects Detailed'
      },
      reading: {
        preparation: 'Reading Preparation',
        'analysis-method': 'Analysis Method'
      }
    },
    
    // Detailed lesson content
    lessonContent: {
      common: {
        overview: 'Course Overview',
        objectives: 'Learning Objectives',
        practice: 'Practice Thinking',
        navigation: 'Course Navigation',
        previous: 'Previous Lesson',
        next: 'Next Lesson',
        startPractice: 'Start Practice',
        testMyAttributes: 'Test My Attributes'
      },
      
      baziHeavenlyStems: {
        title: 'Heavenly Stems Detailed Explanation',
        breadcrumb: 'Heavenly Stems Detailed',
        intro: 'The Heavenly Stems are one of the core elements of Bazi astrology, consisting of ten symbols that represent different energy attributes and characteristics. Understanding the meaning of the Heavenly Stems deeply is crucial for accurate Bazi analysis.',
        objectives: {
          obj1: 'Master the basic meanings and attributes of the ten Heavenly Stems',
          obj2: 'Understand the yin-yang pairing relationships of the Heavenly Stems',
          obj3: 'Learn the Five Element classification and characteristics of the Heavenly Stems',
          obj4: 'Understand the role of Heavenly Stems in fortune-telling analysis'
        },
        overview: {
          title: 'Overview of the Ten Heavenly Stems',
          description: 'There are ten Heavenly Stems in total: Jia, Yi, Bing, Ding, Wu, Ji, Geng, Xin, Ren, Gui. Every two Heavenly Stems form a group, representing yang and yin energies respectively.',
          stems: {
            wood: 'Jia-Yi - Wood',
            fire: 'Bing-Ding - Fire',
            earth: 'Wu-Ji - Earth',
            metal: 'Geng-Xin - Metal',
            water: 'Ren-Gui - Water'
          }
        },
        detailed: {
          title: 'Detailed Explanation of Heavenly Stems',
          jia: {
            name: 'Jia - Yang Wood',
            element: 'Wood',
            symbolLabel: 'Symbol',
            symbol: 'Towering trees, pillar materials',
            traitsLabel: 'Traits',
            traits: 'Upright, principled, strong leadership, inflexible',
            personalityLabel: 'Personality',
            personality: 'Proactive, strong sense of justice, likes straightforward approach',
            careerLabel: 'Career Tendencies',
            career: 'Managers, entrepreneurs, judges, teachers'
          },
          yi: {
            name: 'Yi - Yin Wood',
            element: 'Wood',
            symbolLabel: 'Symbol',
            symbol: 'Flowers, grass, vines, flexible things',
            traitsLabel: 'Traits',
            traits: 'Gentle, highly adaptable, good at flexibility',
            personalityLabel: 'Personality',
            personality: 'Gentle and delicate, compassionate, good at communication',
            careerLabel: 'Career Tendencies',
            career: 'Artists, counselors, nurses, gardeners'
          },
          bing: {
            name: 'Bing - Yang Fire',
            element: 'Fire',
            symbolLabel: 'Symbol',
            symbol: 'Sun, blazing fire',
            traitsLabel: 'Traits',
            traits: 'Passionate, bright and honest, strong influence',
            personalityLabel: 'Personality',
            personality: 'Optimistic, infectious, likes to be the center of attention',
            careerLabel: 'Career Tendencies',
            career: 'Actors, hosts, sales, politicians'
          },
          ding: {
            name: 'Ding - Yin Fire',
            element: 'Fire',
            symbolLabel: 'Symbol',
            symbol: 'Candle light, hearth fire',
            traitsLabel: 'Traits',
            traits: 'Warm and delicate, persistently stable, illuminating others',
            personalityLabel: 'Personality',
            personality: 'Thoughtful, patient, good at caring for others',
            careerLabel: 'Career Tendencies',
            career: 'Doctors, chefs, designers, psychologists'
          },
          wu: {
            name: 'Wu - Yang Earth',
            element: 'Earth',
            symbolLabel: 'Symbol',
            symbol: 'High mountains, city walls',
            traitsLabel: 'Traits',
            traits: 'Stable and reliable, highly tolerant, good defense',
            personalityLabel: 'Personality',
            personality: 'Steady and stable, strong sense of responsibility, trustworthy',
            careerLabel: 'Career Tendencies',
            career: 'Architects, engineers, bankers, security guards'
          },
          ji: {
            name: 'Ji - Yin Earth',
            element: 'Earth',
            symbolLabel: 'Symbol',
            symbol: 'Fields, fertile soil',
            traitsLabel: 'Traits',
            traits: 'Nourishes all things, silently dedicated, tolerant and generous',
            personalityLabel: 'Personality',
            personality: 'Gentle and tolerant, enjoys helping others, values family',
            careerLabel: 'Career Tendencies',
            career: 'Agriculture, service industry, social work, accountants'
          },
          geng: {
            name: 'Geng - Yang Metal',
            element: 'Metal',
            symbolLabel: 'Symbol',
            symbol: 'Swords, steel',
            traitsLabel: 'Traits',
            traits: 'Hard and sharp, decisive and powerful, righteous',
            personalityLabel: 'Personality',
            personality: 'Firm and decisive, not afraid of difficulties, has sense of justice',
            careerLabel: 'Career Tendencies',
            career: 'Military personnel, police officers, surgeons, lawyers'
          },
          xin: {
            name: 'Xin - Yin Metal',
            element: 'Metal',
            symbolLabel: 'Symbol',
            symbol: 'Jewelry, refined gold',
            traitsLabel: 'Traits',
            traits: 'Exquisite and elegant, high quality, pursuing perfection',
            personalityLabel: 'Personality',
            personality: 'Meticulous, high aesthetic taste, pursuing fine craftsmanship',
            careerLabel: 'Career Tendencies',
            career: 'Jewelry designers, art appraisers, precision instruments'
          },
          ren: {
            name: 'Ren - Yang Water',
            element: 'Water',
            symbolLabel: 'Symbol',
            symbol: 'Rivers, lakes, seas, surging waves',
            traitsLabel: 'Traits',
            traits: 'Flowing and changing, embracing all things, highly adaptable',
            personalityLabel: 'Personality',
            personality: 'Flexible and witty, good at adaptation, adventurous spirit',
            careerLabel: 'Career Tendencies',
            career: 'Trading, tourism, navigation, media'
          },
          gui: {
            name: 'Gui - Yin Water',
            element: 'Water',
            symbolLabel: 'Symbol',
            symbol: 'Rain and dew, sweet spring',
            traitsLabel: 'Traits',
            traits: 'Moistens all things, delicate and meticulous, silently dedicated',
            personalityLabel: 'Personality',
            personality: 'Careful and considerate, sharp intuition, compassionate',
            careerLabel: 'Career Tendencies',
            career: 'Researchers, psychologists, nursing, literary creation'
          }
        },
        combinations: {
          title: 'Heavenly Stem Combinations',
          description: 'There are combination relationships between Heavenly Stems, which represent harmony, cooperation, and conflict resolution.',
          list: {
            jiaji: {combo: 'Jia-Ji Combination', result: 'Transform to Earth', meaning: 'Represents the combination of benevolence and righteousness, balancing firmness and flexibility'},
            yigeng: {combo: 'Yi-Geng Combination', result: 'Transform to Metal', meaning: 'Represents the combination of benevolence and authority'},
            bingxin: {combo: 'Bing-Xin Combination', result: 'Transform to Water', meaning: 'Represents the combination of propriety and justice'},
            dingren: {combo: 'Ding-Ren Combination', result: 'Transform to Wood', meaning: 'Represents the combination of propriety and wisdom'},
            wugui: {combo: 'Wu-Gui Combination', result: 'Transform to Fire', meaning: 'Represents the combination of trustworthiness and wisdom'}
          }
        },
        application: {
          title: 'Practical Application',
          subtitle: 'Application in Bazi Analysis',
          points: {
            dayMaster: {
              title: 'Day Master Analysis',
              description: 'The Day Stem represents the person, understand basic personality through analyzing Day Stem attributes'
            },
            tenGods: {
              title: 'Ten Gods Relationship',
              description: 'The relationship between other Heavenly Stems and Day Stem forms Ten Gods, reflecting various aspects of life'
            },
            pattern: {
              title: 'Pattern Judgment',
              description: 'Heavenly Stem combinations influence the level of Bazi patterns'
            },
            luck: {
              title: 'Major Luck and Yearly Fortune',
              description: 'The interaction between Major Luck and Yearly Fortune Heavenly Stems with natal chart Heavenly Stems'
            }
          }
        },
        metaDescription: 'Learn the detailed meanings, attributes, and characteristics of the ten Heavenly Stems, master the core elements of Bazi astrology.',
        practice: {
          title: 'Practical Application',
          subtitle: 'Application in Bazi Analysis',
          points: {
            dayMaster: {
              title: 'Day Master Analysis',
              description: 'The Day Stem represents the person, understand basic personality through analyzing Day Stem attributes'
            },
            tenGods: {
              title: 'Ten Gods Relationship',
              description: 'The relationship between other Heavenly Stems and Day Stem forms Ten Gods, reflecting various aspects of life'
            },
            pattern: {
              title: 'Pattern Judgment',
              description: 'Heavenly Stem combinations influence the level of Bazi patterns'
            },
            luck: {
              title: 'Major Luck and Yearly Fortune',
              description: 'The interaction between Major Luck and Yearly Fortune Heavenly Stems with natal chart Heavenly Stems'
            }
          }
        },
        exercise: {
          question: 'Observe the people around you and try to guess what their Day Stem might be based on their personality traits.',
          button: 'Test My Heavenly Stem Attributes'
        }
      },

      // Bazi lesson content
      baziBasics: {
        title: 'Bazi Fundamentals',
        breadcrumb: 'Bazi Basics',
        intro: 'Bazi astrology is an important component of Chinese traditional culture, revealing the fundamental laws and development trends of life by analyzing an individual\'s birth year, month, day, and hour.',
        metaDescription: 'Learn the fundamentals of Bazi astrology, understand the Heavenly Stems and Earthly Branches system and Five Element theory, and begin your Bazi learning journey.',
        objectives: {
          obj1: 'Understand the basic concepts and historical origins of Bazi astrology',
          obj2: 'Master the composition and meaning of the Four Pillars (year, month, day, hour)',
          obj3: 'Understand the basic concepts of Heavenly Stems and Earthly Branches',
          obj4: 'Learn the basic methods of Bazi chart construction'
        },
        sections: {
          whatIsBazi: {
            title: 'What is Bazi?',
            description: 'Bazi, also known as "Four Pillars Bazi," is based on a person\'s birth year, month, day, and hour, each represented by a combination of Heavenly Stems and Earthly Branches, totaling eight characters, hence called "Bazi."',
            composition: {
              title: 'Components of Bazi',
              year: 'Year Pillar',
              yearDesc: 'Heavenly Stem and Earthly Branch of birth year',
              month: 'Month Pillar',
              monthDesc: 'Heavenly Stem and Earthly Branch of birth month',
              day: 'Day Pillar',
              dayDesc: 'Heavenly Stem and Earthly Branch of birth day',
              hour: 'Hour Pillar',
              hourDesc: 'Heavenly Stem and Earthly Branch of birth hour'
            }
          },
          stemsBranches: {
            title: 'Heavenly Stems and Earthly Branches System',
            description: 'The Heavenly Stems and Earthly Branches is an ancient Chinese system for recording years, months, days, and hours, and also the foundation of Bazi astrology.',
            heavenlyStems: {
              title: 'Ten Heavenly Stems',
              sequence: 'Jia, Yi, Bing, Ding, Wu, Ji, Geng, Xin, Ren, Gui',
              wood: 'Jia and Yi belong to Wood (Jia is Yang Wood, Yi is Yin Wood)',
              fire: 'Bing and Ding belong to Fire (Bing is Yang Fire, Ding is Yin Fire)',
              earth: 'Wu and Ji belong to Earth (Wu is Yang Earth, Ji is Yin Earth)',
              metal: 'Geng and Xin belong to Metal (Geng is Yang Metal, Xin is Yin Metal)',
              water: 'Ren and Gui belong to Water (Ren is Yang Water, Gui is Yin Water)'
            },
            earthlyBranches: {
              title: 'Twelve Earthly Branches',
              sequence: 'Zi, Chou, Yin, Mao, Chen, Si, Wu, Wei, Shen, You, Xu, Hai',
              water: 'Zi and Hai belong to Water',
              wood: 'Yin and Mao belong to Wood',
              fire: 'Si and Wu belong to Fire',
              metal: 'Shen and You belong to Metal',
              earth: 'Chen, Xu, Chou, and Wei belong to Earth'
            }
          },
          fiveElements: {
            title: 'Five Element Theory',
            description: 'The Five Elements (Wood, Fire, Earth, Metal, Water) are the core theory of Bazi analysis, describing the interrelationships between things.',
            elements: {
              wood: {
                name: 'Wood',
                traits: 'Represents growth, upward movement, benevolence',
                associations: 'Spring, East, Green'
              },
              fire: {
                name: 'Fire',
                traits: 'Represents warmth, upward movement, propriety and wisdom',
                associations: 'Summer, South, Red'
              },
              earth: {
                name: 'Earth',
                traits: 'Represents tolerance, stability, trustworthiness',
                associations: 'Late Summer, Center, Yellow'
              },
              metal: {
                name: 'Metal',
                traits: 'Represents contraction, cutting, righteousness',
                associations: 'Autumn, West, White'
              },
              water: {
                name: 'Water',
                traits: 'Represents coldness, downward movement, wisdom',
                associations: 'Winter, North, Black'
              }
            },
            relationships: {
              title: 'Five Element Relationships',
              generating: 'Generating Cycle',
              generatingCycle: 'Wood feeds Fire, Fire creates Earth, Earth produces Metal, Metal collects Water, Water nourishes Wood',
              overcoming: 'Overcoming Cycle',
              overcomingCycle: 'Wood depletes Earth, Earth absorbs Water, Water extinguishes Fire, Fire melts Metal, Metal cuts Wood'
            }
          },
          example: {
            title: 'Example Analysis',
            caseTitle: 'Example: Born March 15, 1990 at 10:00 AM',
            table: {
              year: 'Year Pillar',
              month: 'Month Pillar',
              day: 'Day Pillar',
              hour: 'Hour Pillar'
            },
            analysisTitle: 'Simple Analysis',
            analysisContent: 'The Day Master Jia Wood is born in Mao month, gaining seasonal energy, but Year Pillar Geng Metal and Hour Stem Ji Earth create pressure on Jia Wood. Detailed analysis is needed to determine the strength and weakness of the Bazi and the favorable elements.'
          }
        },
        practice: {
          question: 'Try to construct your own Bazi chart and see how well you understand the Four Pillars?',
          button: 'Start Bazi Analysis'
        }
      },
        overview: {
          title: 'Heavenly Stems Overview',
          description: 'The Ten Heavenly Stems are: Jia, Yi, Bing, Ding, Wu, Ji, Geng, Xin, Ren, Gui. They are classified by the Five Elements, with each element containing two Heavenly Stems of Yin and Yang.',
          stems: {
            wood: 'Wood',
            fire: 'Fire',
            earth: 'Earth',
            metal: 'Metal',
            water: 'Water'
          }
        },
        detailed: {
          title: 'Heavenly Stems Detailed',
          jia: {
            name: 'Jia Wood',
            element: 'Yang Wood',
            symbolLabel: 'Symbolism',
            symbol: 'Large Tree, Pillar',
            traitsLabel: 'Traits',
            traits: 'Upright, growth-oriented, responsible',
            personalityLabel: 'Personality',
            personality: 'Jia Wood is like a towering tree with a strong will to grow upward. Personality is upright and unyielding, with leadership ability and pioneering spirit.',
            careerLabel: 'Suitable Career',
            career: 'Suitable for management, entrepreneurship, education and other work requiring authority and leadership'
          },
          yi: {
            name: 'Yi Wood',
            element: 'Yin Wood',
            symbolLabel: 'Symbolism',
            symbol: 'Flowers, Vines',
            traitsLabel: 'Traits',
            traits: 'Flexible, adaptable, harmonious',
            personalityLabel: 'Personality',
            personality: 'Yi Wood is like flexible vines with the ability to adapt flexibly. Personality is gentle, good at flexibility, and harmonious in relationships.',
            careerLabel: 'Suitable Career',
            career: 'Suitable for art, design, service, diplomacy and other work requiring delicacy and flexibility'
          },
          bing: {
            name: 'Bing Fire',
            element: 'Yang Fire',
            symbolLabel: 'Symbolism',
            symbol: 'Sun, Sunlight',
            traitsLabel: 'Traits',
            traits: 'Enthusiastic, bright, charismatic',
            personalityLabel: 'Personality',
            personality: 'Bing Fire is like the sun, bright and open, with the ability to warm others. Personality is cheerful and lively, with great charisma.',
            careerLabel: 'Suitable Career',
            career: 'Suitable for entertainment, sales, public relations, speaking and other work requiring passion and expressiveness'
          },
          ding: {
            name: 'Ding Fire',
            element: 'Yin Fire',
            symbolLabel: 'Symbolism',
            symbol: 'Lamplight, Candlelight',
            traitsLabel: 'Traits',
            traits: 'Gentle, lasting, compassionate',
            personalityLabel: 'Personality',
            personality: 'Ding Fire is like warm candlelight, though not as intense as Bing Fire, but more lasting and stable. Personality is delicate and compassionate.',
            careerLabel: 'Suitable Career',
            career: 'Suitable for medical, nursing, counseling, literature and other work requiring care and empathy'
          },
          wu: {
            name: 'Wu Earth',
            element: 'Yang Earth',
            symbolLabel: 'Symbolism',
            symbol: 'High Mountain, City Wall',
            traitsLabel: 'Traits',
            traits: 'Steady, supportive, responsible',
            personalityLabel: 'Personality',
            personality: 'Wu Earth is like a steady mountain with the ability to support all things. Personality is practical and reliable with a strong sense of responsibility.',
            careerLabel: 'Suitable Career',
            career: 'Suitable for construction, real estate, agriculture, finance and other work requiring stability and accumulation'
          },
          ji: {
            name: 'Ji Earth',
            element: 'Yin Earth',
            symbolLabel: 'Symbolism',
            symbol: 'Farmland, Fertile Soil',
            traitsLabel: 'Traits',
            traits: 'Inclusive, nurturing, coordinating',
            personalityLabel: 'Personality',
            personality: 'Ji Earth is like fertile farmland with the ability to nourish all things. Personality is gentle and inclusive, good at coordination.',
            careerLabel: 'Suitable Career',
            career: 'Suitable for education, training, service, agriculture and other work requiring nurturing and service'
          },
          geng: {
            name: 'Geng Metal',
            element: 'Yang Metal',
            symbolLabel: 'Symbolism',
            symbol: 'Steel, Sword',
            traitsLabel: 'Traits',
            traits: 'Decisive, resolute, action-oriented',
            personalityLabel: 'Personality',
            personality: 'Geng Metal is like a sharp sword with strong decisive and cutting ability. Personality is resolute and decisive with strong action ability.',
            careerLabel: 'Suitable Career',
            career: 'Suitable for military, police, law, surgery, machinery and other work requiring decisiveness and precision'
          },
          xin: {
            name: 'Xin Metal',
            element: 'Yin Metal',
            symbolLabel: 'Symbolism',
            symbol: 'Jewelry, Accessories',
            traitsLabel: 'Traits',
            traits: 'Refined, aesthetic, detail-oriented',
            personalityLabel: 'Personality',
            personality: 'Xin Metal is like exquisite jewelry with refinement and beauty. Personality is delicate, focusing on quality and aesthetics.',
            careerLabel: 'Suitable Career',
            career: 'Suitable for jewelry, beauty, design, precision manufacturing and other work requiring refinement and beauty'
          },
          ren: {
            name: 'Ren Water',
            element: 'Yang Water',
            symbolLabel: 'Symbolism',
            symbol: 'Rivers, Ocean',
            traitsLabel: 'Traits',
            traits: 'Broad-minded, flowing, adaptable',
            personalityLabel: 'Personality',
            personality: 'Ren Water is like rushing rivers with strong fluidity and inclusiveness. Personality is broad-minded with strong adaptability.',
            careerLabel: 'Suitable Career',
            career: 'Suitable for trade, transportation, tourism, media and other work requiring flow and communication'
          },
          gui: {
            name: 'Gui Water',
            element: 'Yin Water',
            symbolLabel: 'Symbolism',
            symbol: 'Rain, Spring Water',
            traitsLabel: 'Traits',
            traits: 'Introverted, wise, intuitive',
            personalityLabel: 'Personality',
            personality: 'Gui Water is like gentle rain and dew with the ability to moisten all things. Personality is introverted, rich in wisdom and intuition.',
            careerLabel: 'Suitable Career',
            career: 'Suitable for research, consulting, writing, psychology and other work requiring thinking and insight'
          }
        },
        combinations: {
          title: 'Heavenly Stem Combinations',
          description: 'There are special combination relationships between Heavenly Stems, called "Five Heavenly Stem Combinations," which have important significance in fortune-telling analysis.',
          list: {
            jiaji: {
              combo: 'Jia-Ji Combination',
              result: 'Forms Earth',
              meaning: 'Represents the union of honesty and steadiness'
            },
            yigeng: {
              combo: 'Yi-Geng Combination',
              result: 'Forms Metal',
              meaning: 'Represents the union of benevolence and righteousness, combining soft and hard'
            },
            bingxin: {
              combo: 'Bing-Xin Combination',
              result: 'Forms Water',
              meaning: 'Represents the union of dignity and wisdom'
            },
            dingren: {
              combo: 'Ding-Ren Combination',
              result: 'Forms Wood',
              meaning: 'Represents the union of kindness and gentleness'
            },
            wugui: {
              combo: 'Wu-Gui Combination',
              result: 'Forms Fire',
              meaning: 'Represents the union of propriety and wisdom, brightness'
            }
          }
        },
        application: {
          title: 'Practical Application',
          subtitle: 'Application in Bazi Analysis',
          points: {
            dayMaster: {
              title: 'Day Master Analysis',
              description: 'The Day Stem represents the person; analyze Day Stem attributes to understand basic personality'
            },
            tenGods: {
              title: 'Ten Gods Relations',
              description: 'Relationships between other Heavenly Stems and Day Stem form Ten Gods, reflecting all aspects of life'
            },
            pattern: {
              title: 'Pattern Assessment',
              description: 'Heavenly Stem combinations affect the quality of Bazi patterns'
            },
            luck: {
              title: 'Luck Periods',
              description: 'Interaction between Luck Period and Annual Heavenly Stems with natal chart Heavenly Stems'
            }
          }
        },
        practice: {
          question: 'Please observe the Heavenly Stem configuration in your Bazi and think about how the characteristics of each stem influence your personality?',
          button: 'Analyze My Heavenly Stem Configuration'
        }
      },

      baziEarthlyBranches: {
        title: 'Earthly Branches Detailed',
        breadcrumb: 'Earthly Branches',
        metaDescription: 'Learn the meanings, zodiac correspondences, and relationships of the twelve Earthly Branches, master important concepts like hidden stems.',
        intro: 'The Earthly Branches are another symbol system that pairs with Heavenly Stems in Bazi astrology, consisting of twelve symbols corresponding to the twelve zodiac animals, representing different time cycles and energy characteristics.',
        objectives: {
          obj1: 'Master the basic meanings and attributes of the twelve Earthly Branches',
          obj2: 'Understand the correspondence between Earthly Branches and zodiac animals',
          obj3: 'Learn the punishment, clash, harm, and combination relationships of Earthly Branches',
          obj4: 'Understand the role of Earthly Branches in fortune-telling analysis'
        },
        overview: {
          title: 'Earthly Branches Overview',
          intro: 'The twelve Earthly Branches are arranged clockwise, corresponding to twelve time periods and twelve zodiac animals, forming a complete temporal and spatial system.'
        },
        classification: {
          title: 'Five Elements Classification of Earthly Branches',
          water: {
            title: 'Water: Zi, Hai',
            desc: 'Zi is Yang Water, Hai is Yin Water, representing winter and north direction'
          },
          wood: {
            title: 'Wood: Yin, Mao',
            desc: 'Yin is Yang Wood, Mao is Yin Wood, representing spring and east direction'
          },
          fire: {
            title: 'Fire: Si, Wu',
            desc: 'Si is Yin Fire, Wu is Yang Fire, representing summer and south direction'
          },
          metal: {
            title: 'Metal: Shen, You',
            desc: 'Shen is Yang Metal, You is Yin Metal, representing autumn and west direction'
          },
          earth: {
            title: 'Earth: Chen, Xu, Chou, Wei',
            desc: 'The four Earth branches represent the end months of four seasons, with storage and transformation functions'
          }
        },
        detailed: {
          title: 'Detailed Analysis of Twelve Earthly Branches',
          common: {
            timeLabel: 'Time',
            seasonLabel: 'Season',
            traitsLabel: 'Traits',
            hiddenLabel: 'Hidden Stems'
          },
          zi: {
            title: 'Zi - Rat (Water)',
            time: 'Zi hour (23:00-1:00)',
            season: 'Mid-winter, peak water energy',
            traits: 'Clever and flexible, resourceful, highly adaptable',
            hidden: 'Gui Water'
          },
          chou: {
            title: 'Chou - Ox (Earth)',
            time: 'Chou hour (1:00-3:00)',
            season: 'Late winter, earth storage',
            traits: 'Hardworking and steadfast, persistent, inclusive',
            hidden: 'Ji Earth, Gui Water, Xin Metal'
          },
          yin: {
            title: 'Yin - Tiger (Wood)',
            time: 'Yin hour (3:00-5:00)',
            season: 'Early spring, wood energy emerging',
            traits: 'Brave and decisive, strong leadership, high sense of justice',
            hidden: 'Jia Wood, Bing Fire, Wu Earth'
          },
          mao: {
            title: 'Mao - Rabbit (Wood)',
            time: 'Mao hour (5:00-7:00)',
            season: 'Mid-spring, peak wood energy',
            traits: 'Gentle and refined, socially adept, strong aesthetic sense',
            hidden: 'Yi Wood'
          },
          chen: {
            title: 'Chen - Dragon (Earth)',
            time: 'Chen hour (7:00-9:00)',
            season: 'Late spring, water storage',
            traits: 'Intelligent and wise, versatile, authoritative',
            hidden: 'Wu Earth, Yi Wood, Gui Water'
          },
          si: {
            title: 'Si - Snake (Fire)',
            time: 'Si hour (9:00-11:00)',
            season: 'Early summer, fire energy growing',
            traits: 'Profound wisdom, mysterious, sharp intuition',
            hidden: 'Bing Fire, Wu Earth, Geng Metal'
          },
          wu: {
            title: 'Wu - Horse (Fire)',
            time: 'Wu hour (11:00-13:00)',
            season: 'Mid-summer, peak fire energy',
            traits: 'Passionate and energetic, quick action, carefree',
            hidden: 'Ding Fire, Ji Earth'
          },
          wei: {
            title: 'Wei - Sheep (Earth)',
            time: 'Wei hour (13:00-15:00)',
            season: 'Late summer, wood storage',
            traits: 'Gentle and kind, compassionate, artistic talent',
            hidden: 'Ji Earth, Ding Fire, Yi Wood'
          },
          shen: {
            title: 'Shen - Monkey (Metal)',
            time: 'Shen hour (15:00-17:00)',
            season: 'Early autumn, metal energy growing',
            traits: 'Clever and witty, versatile, adaptable',
            hidden: 'Geng Metal, Ren Water, Wu Earth'
          },
          you: {
            title: 'You - Rooster (Metal)',
            time: 'You hour (17:00-19:00)',
            season: 'Mid-autumn, peak metal energy',
            traits: 'Diligent and punctual, detail-oriented, perfectionist',
            hidden: 'Xin Metal'
          },
          xu: {
            title: 'Xu - Dog (Earth)',
            time: 'Xu hour (19:00-21:00)',
            season: 'Late autumn, fire storage',
            traits: 'Loyal and reliable, strong sense of justice, responsible',
            hidden: 'Wu Earth, Xin Metal, Ding Fire'
          },
          hai: {
            title: 'Hai - Pig (Water)',
            time: 'Hai hour (21:00-23:00)',
            season: 'Early winter, water energy growing',
            traits: 'Simple and kind, tolerant and generous, wise',
            hidden: 'Ren Water, Jia Wood'
          }
        },
        relationships: {
          title: 'Earthly Branch Relationships',
          sixHarmony: {
            title: 'Six Harmonies',
            desc: 'Six Harmonies represent harmonious combination relationships that help strengthen each other\'s power.',
            combinations: {
              zichou: 'Zi-Chou combine to Earth',
              yinhai: 'Yin-Hai combine to Wood',
              maoxu: 'Mao-Xu combine to Fire',
              chenyou: 'Chen-You combine to Metal',
              sishen: 'Si-Shen combine to Water',
              wuwei: 'Wu-Wei combine to Earth'
            }
          },
          triad: {
            title: 'Three Harmonies',
            desc: 'Three Harmony formations are powerful combinations of three Earthly Branches forming specific Five Element reinforcements.',
            combinations: {
              shuiju: {
                name: 'Shen-Zi-Chen',
                result: 'Water Formation'
              },
              huoju: {
                name: 'Yin-Wu-Xu',
                result: 'Fire Formation'
              },
              jinju: {
                name: 'Si-You-Chou',
                result: 'Metal Formation'
              },
              muju: {
                name: 'Hai-Mao-Wei',
                result: 'Wood Formation'
              }
            }
          },
          clash: {
            title: 'Clashes',
            desc: 'Clashes represent opposing conflict relationships that create turbulence and change.',
            combinations: {
              ziwu: 'Zi-Wu clash',
              chouwei: 'Chou-Wei clash',
              yinshen: 'Yin-Shen clash',
              maoyou: 'Mao-You clash',
              chenxu: 'Chen-Xu clash',
              sihai: 'Si-Hai clash'
            }
          },
          punishment: {
            title: 'Punishments',
            desc: 'Punishments represent mutual restraint and penalty relationships that require special attention.',
            types: {
              wuli: 'Zi-Mao punishment - Rudeness punishment',
              wuen: 'Yin-Si-Shen punishment - Ingratitude punishment',
              shishi: 'Chou-Xu-Wei punishment - Bullying punishment',
              zixing: 'Chen-Wu-You-Hai self-punishment - Self punishment'
            }
          }
        },
        hiddenStems: {
          title: 'Hidden Stems in Earthly Branches',
          intro: 'Each Earthly Branch contains hidden Heavenly Stems within, and these hidden stems play important roles in Bazi analysis.',
          table: {
            branch: 'Branch',
            primary: 'Primary Qi',
            middle: 'Middle Qi',
            residue: 'Residual Qi'
          }
        },
        practice: {
          question: 'Observe the characteristics of the twelve zodiac animals and think about their connection with the energy traits of corresponding Earthly Branches?',
          button: 'Test My Earthly Branch Attributes'
        }
      },

      baziFiveElements: {
        title: 'Five Elements Theory In-Depth Analysis',
        breadcrumb: 'Five Elements Theory',
        metaDescription: 'Deeply learn the core concepts of Five Elements theory, generation and destruction cycles, and methods for judging strength and weakness to master the theoretical foundation of Bazi fortune-telling analysis.',
        intro: 'Five Elements theory is the theoretical foundation of Bazi astrology, revealing the laws of universal operation through the interaction of five basic elements: Metal, Wood, Water, Fire, and Earth.',
        objectives: {
          obj1: 'Deeply understand the basic meanings and attributes of the Five Elements',
          obj2: 'Master the laws of Five Elements generation and destruction cycles',
          obj3: 'Learn to judge the strength and weakness of Five Elements',
          obj4: 'Understand the core role of Five Elements in fortune-telling analysis'
        },
        philosophy: {
          title: 'Five Elements Philosophical Thought',
          cosmic: {
            title: 'Cosmic View',
            content: 'The Five Elements embody the ancient Chinese cosmic view, where all things are composed of five basic elements, and these elements are in constant motion and change, forming the myriad phenomena of the universe.'
          },
          balance: {
            title: 'Wisdom of Balance',
            content: 'The core of Five Elements theory is harmony and balance. The five elements are interdependent and mutually constraining, maintaining a dynamic equilibrium that sustains the harmonious development of life and the universe.'
          },
          unity: {
            title: 'Unity of Heaven and Human',
            content: 'Five Elements theory emphasizes the unity of humans and nature. Human constitution, personality, and destiny are all influenced by the Five Elements, corresponding to natural change patterns and achieving the ideal state of harmony between heaven and humanity.'
          }
        },
        detailed: {
          title: 'Five Elements Detailed Analysis',
          wood: {
            title: 'Wood: Growth and Creation',
            characteristics: {
              title: 'Characteristics',
              content: 'Wood has the properties of growth, expansion, and ascension, symbolizing the vitality of spring. It is flexible and resilient, full of upward motivation, always growing toward the light.'
            },
            correspondences: {
              title: 'Correspondences',
              season: 'Season: Spring',
              direction: 'Direction: East',
              emotion: 'Emotion: Anger',
              organ: 'Organs: Liver and Gallbladder',
              color: 'Colors: Green, Blue'
            },
            states: {
              title: 'States',
              prosperous: 'Prosperous: Strongest in spring (Yin-Mao months)',
              resting: 'Resting: Weakest in autumn (Shen-You months)',
              dead: 'Dead: Constrained in seasonal transitions (Chen-Xu-Chou-Wei months)'
            }
          },
          fire: {
            title: 'Fire: Light and Passion',
            characteristics: {
              title: 'Characteristics',
              content: 'Fire has the properties of brightness, warmth, and upward movement, symbolizing the intensity of summer. It is active and passionate, delighting in warming others and bringing light.'
            },
            correspondences: {
              title: 'Correspondences',
              season: 'Season: Summer',
              direction: 'Direction: South',
              emotion: 'Emotion: Joy',
              organ: 'Organs: Heart and Small Intestine',
              color: 'Colors: Red, Purple'
            },
            states: {
              title: 'States',
              prosperous: 'Prosperous: Strongest in summer (Si-Wu months)',
              resting: 'Resting: Weakest in winter (Hai-Zi months)',
              dead: 'Dead: Constrained in seasonal transitions (Chen-Xu-Chou-Wei months)'
            }
          },
          earth: {
            title: 'Earth: Stability and Tolerance',
            characteristics: {
              title: 'Characteristics',
              content: 'Earth has the properties of tolerance, carrying, and nurturing, symbolizing the virtue of the earth. It is stable and honest, embracing all things and nurturing life.'
            },
            correspondences: {
              title: 'Correspondences',
              season: 'Season: Late Summer (seasonal transitions)',
              direction: 'Direction: Center',
              emotion: 'Emotion: Pensiveness',
              organ: 'Organs: Spleen and Stomach',
              color: 'Colors: Yellow, Brown'
            },
            states: {
              title: 'States',
              prosperous: 'Prosperous: Strongest in seasonal transitions (Chen-Xu-Chou-Wei months)',
              resting: 'Resting: Weakest in winter (Hai-Zi months)',
              dead: 'Dead: Constrained in spring (Yin-Mao months)'
            }
          },
          metal: {
            title: 'Metal: Restraint and Decisiveness',
            characteristics: {
              title: 'Characteristics',
              content: 'Metal has the properties of restraint, cutting, and firmness, symbolizing the bleakness of autumn. It is hard and decisive, values rules, and has the ability to organize things.'
            },
            correspondences: {
              title: 'Correspondences',
              season: 'Season: Autumn',
              direction: 'Direction: West',
              emotion: 'Emotion: Grief',
              organ: 'Organs: Lungs and Large Intestine',
              color: 'Colors: White, Gold'
            },
            states: {
              title: 'States',
              prosperous: 'Prosperous: Strongest in autumn (Shen-You months)',
              resting: 'Resting: Weakest in spring (Yin-Mao months)',
              dead: 'Dead: Constrained in summer (Si-Wu months)'
            }
          },
          water: {
            title: 'Water: Wisdom and Flow',
            characteristics: {
              title: 'Characteristics',
              content: 'Water has the properties of flow, downward movement, and moistening, symbolizing the depth of winter. It is flexible and wise, nourishing all things, and has the wisdom to flow to the lowest places.'
            },
            correspondences: {
              title: 'Correspondences',
              season: 'Season: Winter',
              direction: 'Direction: North',
              emotion: 'Emotion: Fear',
              organ: 'Organs: Kidneys and Bladder',
              color: 'Colors: Black, Blue'
            },
            states: {
              title: 'States',
              prosperous: 'Prosperous: Strongest in winter (Hai-Zi months)',
              resting: 'Resting: Weakest in summer (Si-Wu months)',
              dead: 'Dead: Constrained in seasonal transitions (Chen-Xu-Chou-Wei months)'
            }
          }
        },
        relationships: {
          title: 'Five Elements Relationship Network',
          generation: {
            title: 'Generation Cycle',
            subtitle: 'Mutually generating and supporting',
            cycles: {
              waterWood: 'Water generates Wood: Water nourishes wood',
              woodFire: 'Wood generates Fire: Wood fuels fire',
              fireEarth: 'Fire generates Earth: Fire creates earth (ash)',
              earthMetal: 'Earth generates Metal: Earth produces metal',
              metalWater: 'Metal generates Water: Metal collects water'
            }
          },
          destruction: {
            title: 'Destruction Cycle',
            subtitle: 'Mutually restraining and controlling',
            cycles: {
              waterFire: 'Water destroys Fire: Water extinguishes fire',
              fireEarth: 'Fire destroys Metal: Fire melts metal',
              metalWood: 'Metal destroys Wood: Metal cuts wood',
              woodEarth: 'Wood destroys Earth: Wood depletes earth',
              earthWater: 'Earth destroys Water: Earth absorbs water'
            }
          }
        },
        strength: {
          title: 'Five Elements Strength and Weakness Analysis',
          factors: {
            title: 'Influencing Factors',
            seasonal: {
              title: 'Seasonal Factors',
              content: 'Each of the Five Elements has its seasons of prosperity and decline. They are strongest during their corresponding seasonal rule and weakest when restrained by opposing seasons.'
            },
            support: {
              title: 'Support Factors',
              content: 'The more elements of the same type and generating elements there are, the stronger that element becomes. Conversely, many restraining elements make it weaker.'
            },
            position: {
              title: 'Positional Factors',
              content: 'The position of Heavenly Stems and Earthly Branches also affects strength. Deeply rooted elements are more stable, while floating elements are more changeable.'
            }
          },
          balance: {
            title: 'Balance Types',
            balanced: {
              title: 'Balanced Harmony Type',
              desc: 'Five Elements forces are relatively balanced, mutually restraining and supporting in an ideal state'
            },
            strong: {
              title: 'Excessively Strong Type',
              desc: 'One element is too strong, disrupting overall balance and requiring appropriate consumption'
            },
            weak: {
              title: 'Excessively Weak Type',
              desc: 'One element is too weak, requiring appropriate support and strengthening'
            },
            specialized: {
              title: 'Specialized Prosperity Type',
              desc: 'One element is extremely prosperous, overwhelming others and requiring special treatment'
            }
          }
        },
        application: {
          title: 'Practical Application Techniques',
          analysis: {
            title: 'Analysis Steps',
            step1: '1. Determine the Day Master\'s Five Element to clarify the core attribute of the person',
            step2: '2. Analyze monthly branch influence to judge the Day Master\'s basic prosperity',
            step3: '3. Comprehensively consider the support and restraint from other stems and branches',
            step4: '4. Analyze the overall Five Elements force comparison to determine favorable and unfavorable elements',
            step5: '5. Combine with major luck periods and yearly influences for comprehensive judgment'
          },
          harmony: {
            title: 'Harmony Methods',
            deficiency: {
              title: 'Deficiency Supplementation Method',
              content: 'For deficient elements, strengthening can be achieved through corresponding Five Element properties'
            },
            excess: {
              title: 'Excess Drainage Method',
              content: 'For overly strong elements, harmony can be achieved through restraining or consuming methods'
            },
            circulation: {
              title: 'Connecting Flow Method',
              content: 'Between opposing elements, intermediate elements can be used to resolve conflicts and create flow'
            }
          }
        },
        practice: {
          question: 'Observe natural phenomena and think about how Five Elements generation and destruction cycles manifest in real life?',
          button: 'Analyze My Five Elements Configuration'
        }
      },

      baziReadingPillars: {
        title: 'Four Pillars Reading Techniques',
        breadcrumb: 'Four Pillars Reading',
        intro: 'Four Pillars reading is the core skill of Bazi fortune-telling analysis, requiring comprehensive application of Heavenly Stems and Earthly Branches, Five Elements theory, and various patterns for systematic chart analysis.',
        objectives: {
          obj1: 'Master the analysis methods for year, month, day, and hour pillars',
          obj2: 'Learn to judge the level and quality of chart patterns',
          obj3: 'Understand the operating mechanism of Major Luck and yearly fortune',
          obj4: 'Be able to perform systematic fortune-telling analysis'
        },
        practice: {
          question: 'Choose a chart example and try systematic analysis using Four Pillars reading methods?',
          button: 'Practice Four Pillars Reading'
        }
      },

      // Astrology lesson content
      astrologyIntroduction: {
        title: 'Introduction to Astrology',
        breadcrumb: 'Astrology Intro',
        intro: 'Western astrology is an ancient discipline that studies how celestial movements influence human life. By analyzing the positions of celestial bodies at an individual\'s birth moment, we can deeply understand personality traits, natural talents, and life development directions.',
        objectives: {
          obj1: 'Understand the history and basic principles of Western astrology',
          obj2: 'Recognize the core elements of astrology: signs, planets, houses',
          obj3: 'Understand the basic composition of a birth chart',
          obj4: 'Master the analytical approach of astrology'
        },
        practice: {
          question: 'Observe the constellations in the night sky and think about how ancient people connected celestial phenomena with human life?',
          button: 'View My Birth Chart'
        }
      },

      astrologyZodiacSigns: {
        title: 'Twelve Zodiac Signs Detailed',
        breadcrumb: 'Zodiac Signs',
        intro: 'The twelve zodiac signs are fundamental elements of astrology, each with unique personality traits, elemental attributes, and ruling planets. Deep understanding of the signs helps accurately interpret individual characteristics.',
        objectives: {
          obj1: 'Master the basic traits and symbolic meanings of the twelve zodiac signs',
          obj2: 'Understand the four element classification and three modality classification of signs',
          obj3: 'Learn to analyze the interrelationships between signs',
          obj4: 'Understand the role of signs in chart analysis'
        },
        practice: {
          question: 'Observe friends of different zodiac signs around you and verify whether they possess corresponding sign traits?',
          button: 'Deep Analyze My Zodiac Sign'
        }
      },

      astrologyPlanets: {
        title: 'Planets Detailed Explanation',
        breadcrumb: 'Planets Detailed',
        intro: 'Planets are the core elements of astrology, each representing different aspects of personality and various domains of life. Understanding the meanings, traits, and energy expressions of planets is the key foundation for mastering astrological analysis.',
        objectives: {
          obj1: 'Master the basic meanings and symbols of the ten major planets',
          obj2: 'Understand the classification and hierarchical structure of planets',
          obj3: 'Learn to analyze planetary expressions in different signs',
          obj4: 'Understand the basic concepts of planetary retrograde and aspects'
        },
        practice: {
          question: 'Observe your own behavioral patterns and think about which planetary influences are most evident in you?',
          button: 'Analyze My Planetary Configuration'
        }
      },

      astrologyHouses: {
        title: 'Houses Detailed Explanation',
        breadcrumb: 'Houses Detailed',
        intro: 'The twelve houses represent twelve important areas of life, from personal identity to relationships, from career development to spiritual growth. Understanding the meanings of houses is key to interpreting a complete birth chart.',
        objectives: {
          obj1: 'Master the basic meanings and life areas of the twelve houses',
          obj2: 'Understand the angular, succedent, and cadent house classifications',
          obj3: 'Learn to analyze planetary expressions in different houses',
          obj4: 'Understand the importance of house rulers and house relationships'
        },
        practice: {
          question: 'Reflect on important moments in your life and think about which house themes they belong to?',
          button: 'Explore My House Emphasis'
        }
      },

      astrologyAspects: {
        title: 'Aspects Detailed Explanation',
        breadcrumb: 'Aspects Detailed',
        intro: 'Aspects are angular relationships between planets, revealing how different planetary energies interact. Mastering aspect analysis is a key skill for deeply understanding chart dynamics.',
        objectives: {
          obj1: 'Master the meanings and influences of major aspects',
          obj2: 'Understand the difference between harmonious and challenging aspects',
          obj3: 'Learn to calculate and identify aspects in birth charts',
          obj4: 'Understand the role of aspects in personality analysis'
        },
        practice: {
          question: 'Observe your internal conflicts and harmonious aspects, and think about what kind of planetary aspects they might correspond to?',
          button: 'Analyze My Aspect Patterns'
        }
      },

      // Reading technique lessons
      readingPreparation: {
        title: 'Preparation for Reading',
        breadcrumb: 'Reading Preparation',
        intro: 'Accurate fortune-telling analysis requires thorough preparation work, including data collection, mastery of fundamental knowledge, and the correct analytical mindset.',
        objectives: {
          obj1: 'Master methods for accurately collecting birth information',
          obj2: 'Understand the use of various fortune-telling analysis tools',
          obj3: 'Cultivate an objective and impartial analytical attitude',
          obj4: 'Learn to formulate systematic analysis plans'
        },
        practice: {
          question: 'Prepare to analyze a chart case and check whether your preparation work is sufficient?',
          button: 'Begin Analysis Preparation'
        }
      },

      readingAnalysisMethod: {
        title: 'Analysis Methods',
        breadcrumb: 'Analysis Methods',
        intro: 'Systematic analysis methods are the guarantee for accurate chart interpretation. Through scientific procedures and methods, subjective speculation can be avoided to obtain objective and accurate analysis results.',
        objectives: {
          obj1: 'Master systematic analysis procedures',
          obj2: 'Learn to apply various analysis tools',
          obj3: 'Understand the importance of comprehensive analysis',
          obj4: 'Develop logical reasoning abilities'
        },
        practice: {
          question: 'Apply the learned analysis methods and try systematic analysis of a complete chart case?',
          button: 'Apply Analysis Methods'
      }
    }
  },

  // AI Chat related texts
  aiChat: {
    welcome: {
      title: 'Welcome to AI Astrology Expert',
      description: 'I am your personal AI astrologer, providing personalized astrological advice and answers based on your detailed birth chart information. Feel free to ask me any questions about your chart.'
    },
    suggestedQuestions: {
      title: 'Suggested Questions'
    },
    input: {
      placeholder: 'Enter your question...',
      send: 'Send',
      enterToSend: 'Press Enter to send',
      shiftEnterForNewLine: 'Shift+Enter for new line'
    },
    streaming: {
      thinking: 'Meimei is reading charts...'
    },
    loading: {
      title: 'Preparing Your Personal AI Astrologer',
      description: 'Complete birth chart data is needed to provide personalized service',
      refresh: 'Reload Data'
    },
    errors: {
      networkError: 'Network connection error, please check your network settings',
      apiKeyError: 'DeepSeek API key configuration error, please verify your API key',
      rateLimitError: 'Too many requests, please try again later',
      quotaError: 'API quota exceeded, please check your DeepSeek account balance',
      serverError: 'DeepSeek service is temporarily unavailable, please try again later',
      defaultError: 'AI service is temporarily unavailable, please retry later'
    }
  }
};