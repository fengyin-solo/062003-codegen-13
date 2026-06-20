/**
 * 偶像养成事务所 — 全部数值规则集中配置
 * 调整平衡性时只需修改此文件
 */
export const GAME_CONFIG = {
  // ── 胜利 / 失败条件 ──
  victory: {
    targetGroups: 3,        // 需培养出道组合数
    totalDays: 1095,        // 3 年（天）
    requirePositiveProfit: true,
  },

  // ── 初始资源 ──
  initial: {
    money: 80000,
    fans: 200,
    traineeCount: 5,
    statMin: 18,
    statMax: 42,
    fatigue: 10,
    stress: 8,
  },

  // ── 五维属性键名 ──
  stats: ['vocal', 'dance', 'rap', 'looks', 'charm'],
  statLabels: {
    vocal: '唱功',
    dance: '舞蹈',
    rap: '说唱',
    looks: '颜值',
    charm: '魅力',
  },

  // ── 日程活动 ──
  activities: {
    vocal: {
      label: '声乐课',
      icon: '🎤',
      statGain: { vocal: [4, 7] },
      fatigue: [10, 14],
      stress: [2, 4],
      moneyCost: 400,
      requiresTraining: true,
    },
    dance: {
      label: '舞蹈课',
      icon: '💃',
      statGain: { dance: [4, 7] },
      fatigue: [12, 16],
      stress: [2, 4],
      moneyCost: 400,
      requiresTraining: true,
    },
    rap: {
      label: '说唱课',
      icon: '🎧',
      statGain: { rap: [4, 7] },
      fatigue: [10, 14],
      stress: [3, 5],
      moneyCost: 400,
      requiresTraining: true,
    },
    physical: {
      label: '体能训练',
      icon: '🏋️',
      statGain: { dance: [1, 3], looks: [0, 1] },
      fatigue: [6, 10],
      stress: [-2, 0],
      moneyCost: 250,
      requiresTraining: true,
    },
    rest: {
      label: '休息',
      icon: '😴',
      statGain: {},
      fatigue: [-28, -18],
      stress: [-10, -5],
      moneyCost: 0,
      requiresTraining: false,
    },
    pr: {
      label: '公关活动',
      icon: '📸',
      statGain: { charm: [2, 4], looks: [1, 3] },
      fatigue: [5, 8],
      stress: [6, 14],
      fansGain: [80, 250],
      moneyCost: 1200,
      requiresTraining: false,
    },
  },

  // ── 疲劳 / 压力阈值 ──
  thresholds: {
    fatigueExhausted: 75,   // 训练效果减半
    fatigueCollapse: 92,    // 强制休息
    stressHigh: 65,         // 训练效果 -20%
    stressBreakdown: 88,    // 当天无法训练
    statCap: 100,
  },

  // ── 每日运营成本 ──
  dailyCosts: {
    baseOperatingCost: 600,
    perTraineeCost: 250,
    perDebutedCost: 800,
    perGroupCost: 500,
  },

  // ── 周末内部评级 ──
  rating: {
    interval: 7,
    debutScoreThreshold: 58,  // 综合评分达标可出道
    minGroupSize: 2,
    maxGroupSize: 5,
    scoreWeights: {
      vocal: 0.22,
      dance: 0.22,
      rap: 0.16,
      looks: 0.2,
      charm: 0.2,
    },
  },

  // ── 单曲发行 ──
  single: {
    creationCost: 15000,
    baseSales: 800,
    statWeight: 0.45,
    fansWeight: 0.35,
    charmWeight: 0.2,
    revenuePerSale: 6,
    cooldownDays: 30,
  },

  // ── 练习生关系 ──
  relationships: {
    min: -100,
    max: 100,
    synergyThreshold: 55,       // 默契线
    competitionThreshold: -35,    // 竞争线
    synergyBonus: 0.25,           // 默契训练加成
    competitionStress: [12, 22],
    dailyDrift: [-3, 3],
    trainingTogether: [4, 9],
    statGapCompetition: 18,
    initialRange: [-15, 25],
  },

  // ── 随机事件 ──
  events: {
    dailyChance: 0.18,
    types: {
      negative_news: {
        label: '负面新闻',
        weight: 22,
        fansLoss: [150, 600],
        stressGain: [8, 18],
        description: '媒体曝出练习生训练期间发生冲突，粉丝舆论下滑。',
      },
      poaching: {
        label: '挖角危机',
        weight: 14,
        successChance: 0.28,
        description: '竞争对手试图挖走你旗下最有潜力的练习生！',
      },
      illness: {
        label: '生病',
        weight: 20,
        duration: [2, 4],
        statDecay: [1, 3],
        stressGain: [5, 10],
        description: '一名练习生身体不适，需要休养。',
      },
      inspiration: {
        label: '灵感爆发',
        weight: 22,
        statBoost: [6, 14],
        description: '一名练习生突然迸发出创作灵感，能力大幅提升！',
      },
      fan_surge: {
        label: '粉丝暴涨',
        weight: 22,
        fansGain: [300, 900],
        description: '一段练习室花絮意外走红，粉丝数激增！',
      },
    },
  },

  // ── 组合分工系统 ──
  positions: {
    leaderTypes: {
      charismatic: {
        label: '魅力型队长',
        icon: '👑',
        description: '提升全队魅力训练与公关效果',
        effects: {
          charmTrainingBonus: 0.2,
          prFansBonus: 0.25,
          teamStressReduction: 0.1,
        },
      },
      skillful: {
        label: '实力型队长',
        icon: '💪',
        description: '提升全队核心训练效率',
        effects: {
          vocalTrainingBonus: 0.15,
          danceTrainingBonus: 0.15,
          rapTrainingBonus: 0.15,
        },
      },
      caring: {
        label: '亲和型队长',
        icon: '💗',
        description: '促进队内关系和谐，降低疲劳压力',
        effects: {
          fatigueReduction: 0.15,
          stressReduction: 0.2,
          relationshipBoost: 0.3,
        },
      },
      allrounder: {
        label: '全能型队长',
        icon: '⭐',
        description: '均衡提升各项表现，单曲表现加成',
        effects: {
          allTrainingBonus: 0.08,
          singleSalesBonus: 0.15,
        },
      },
    },
    memberRoles: {
      mainVocal: {
        label: '主唱',
        icon: '🎤',
        keyStats: ['vocal', 'charm'],
        description: '负责歌曲核心演唱，vocal与charm突出',
        effects: {
          vocalBonus: 0.25,
          singleVocalWeight: 1.5,
        },
      },
      mainDancer: {
        label: '主舞',
        icon: '💃',
        keyStats: ['dance', 'charm'],
        description: '舞台表演核心，dance与charm突出',
        effects: {
          danceBonus: 0.25,
          singleDanceWeight: 1.5,
        },
      },
      mainRapper: {
        label: '主Rap',
        icon: '🎧',
        keyStats: ['rap', 'charm'],
        description: '负责说唱部分，rap与charm突出',
        effects: {
          rapBonus: 0.25,
          singleRapWeight: 1.5,
        },
      },
      visual: {
        label: '门面',
        icon: '✨',
        keyStats: ['looks', 'charm'],
        description: '组合形象担当，looks与charm突出',
        effects: {
          looksBonus: 0.2,
          charmBonus: 0.15,
          singleFansBonus: 0.2,
        },
      },
      center: {
        label: 'Center',
        icon: '🌟',
        keyStats: ['charm', 'looks', 'dance'],
        description: '舞台中心位，综合魅力突出',
        effects: {
          charmBonus: 0.2,
          singleCharmWeight: 1.4,
        },
      },
      maknae: {
        label: '忙内',
        icon: '🌸',
        keyStats: ['charm'],
        description: '组合最小成员，粉丝好感度加成',
        effects: {
          stressReduction: 0.1,
          singleFansBonus: 0.1,
        },
      },
      leadVocal: {
        label: '领唱',
        icon: '🎵',
        keyStats: ['vocal'],
        description: '主唱辅助，vocal训练收益提升',
        effects: {
          vocalBonus: 0.15,
        },
      },
      leadDancer: {
        label: '领舞',
        icon: '🕺',
        keyStats: ['dance'],
        description: '主舞辅助，dance训练收益提升',
        effects: {
          danceBonus: 0.15,
        },
      },
    },
  },

  // ── 练习生名字池 ──
  names: [
    '林星遥', '苏晚晴', '陈予安', '顾念初', '沈知夏',
    '江月白', '陆清欢', '唐小满', '许未央', '韩鹿鸣',
    '方念慈', '宋时雨', '叶知秋', '周慕青', '赵星河',
  ],

  // ── 存档 ──
  storage: {
    savesKey: 'idol-agency-saves-v1',
    themeKey: 'idol-agency-theme',
    maxSlots: 5,
  },
}
