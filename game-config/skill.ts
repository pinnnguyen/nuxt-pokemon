export const SkillToName = {
  suicide: {
    label: 'Tự sát',
    des: '',
  },
}

export const SkillList = [
  {
    damage_convert_single_70: {
      target: 'enemy',
      area: 1,
      mp: 70,
      value: 210,
      special: {
        sign: 'damage_convert',
        value: 30,
      },
    },
    damage_convert_aoe_80: {
      target: 'enemy',
      area: 5,
      mp: 80,
      value: 110,
      special: {
        sign: 'damage_convert',
        value: 30,
      },
    },
    true_damage_single_60: {
      target: 'enemy',
      area: 1,
      mp: 60,
      value: 72,
      special: {
        sign: 'true_damage',
      },
    },
    true_damage_aoe_80: {
      target: 'enemy',
      area: 5,
      mp: 80,
      value: 48,
      special: {
        sign: 'true_damage',
      },
    },
    damage_single_50: {
      target: 'enemy',
      area: 1,
      mp: 50,
      value: 300,
    },
    damage_single_60: {
      target: 'enemy',
      area: 1,
      mp: 60,
      value: 360,
    },
    damage_single_70: {
      target: 'enemy',
      area: 1,
      mp: 70,
      value: 420,
    },
    damage_single_90: {
      target: 'enemy',
      area: 1,
      mp: 90,
      value: 540,
    },
    damage_single_90_special: {
      target: 'enemy',
      area: 1,
      mp: 70,
      value: 462,
    },
    damage_single_120: {
      target: 'enemy',
      area: 1,
      mp: 120,
      value: 720,
    },
    damage_aoe_60: {
      target: 'enemy',
      area: 5,
      mp: 60,
      value: 180,
    },
    damage_aoe_70: {
      target: 'enemy',
      area: 5,
      mp: 70,
      value: 210,
    },
    damage_aoe_80: {
      target: 'enemy',
      area: 5,
      mp: 80,
      value: 240,
    },
    damage_aoe_90: {
      target: 'enemy',
      area: 5,
      mp: 90,
      value: 270,
    },
    damage_aoe_90_special: {
      target: 'enemy',
      area: 5,
      mp: 90,
      value: 297,
    },
    heal_single_50: {
      target: 'team',
      area: 1,
      mp: 50,
      value: 100,
    },
    heal_single_60: {
      target: 'team',
      area: 1,
      mp: 60,
      value: 120,
    },
    heal_single_70: {
      target: 'team',
      area: 1,
      mp: 70,
      value: 144,
    },
    heal_aoe_60: {
      target: 'team',
      area: 5,
      mp: 60,
      value: 60,
    },
    heal_aoe_70: {
      target: 'team',
      area: 5,
      mp: 70,
      value: 72,
    },
    heal_aoe_80: {
      target: 'team',
      area: 5,
      mp: 80,
      value: 84,
    },
    heal_aoe_90: {
      target: 'team',
      area: 5,
      mp: 90,
      value: 96,
    },
    heal_aoe_90_special: {
      target: 'team',
      area: 5,
      mp: 80,
      value: 92.4,
    },
    heal_self_60: {
      target: 'self',
      area: 1,
      mp: 60,
      value: 20,
    },
    shield_self_50: {
      target: 'self',
      area: 1,
      mp: 50,
      value: 0,
      effect: {
        1: {
          sign: 'defend',
          value: 37.5,
          turn: 2,
        },
        2: {
          sign: 'taunt',
          value: 100,
          turn: 1,
        },
      },
    },
    shield_self_60: {
      target: 'self',
      area: 1,
      mp: 60,
      value: 0,
      effect: {
        1: {
          sign: 'defend',
          value: 45,
          turn: 2,
        },
        2: {
          sign: 'taunt',
          value: 100,
          turn: 1,
        },
      },
    },
    shield_self_70_special: {
      target: 'self',
      area: 1,
      mp: 70,
      value: 0,
      effect: {
        1: {
          sign: 'defend',
          value: 57.7,
          turn: 2,
        },
        2: {
          sign: 'taunt',
          value: 100,
          turn: 1,
        },
      },
    },
    return_self_50: {
      target: 'self',
      area: 1,
      mp: 50,
      value: 0,
      effect: {
        1: {
          sign: 'damageReturn',
          value: 37.5,
          turn: 2,
        },
        2: {
          sign: 'taunt',
          value: 100,
          turn: 1,
        },
      },
    },
    return_self_60: {
      target: 'self',
      area: 1,
      mp: 60,
      value: 0,
      effect: {
        1: {
          sign: 'damageReturn',
          value: 45,
          turn: 2,
        },
        2: {
          sign: 'taunt',
          value: 100,
          turn: 1,
        },
      },
    },
    miss_self_50: {
      target: 'self',
      area: 1,
      mp: 50,
      value: 0,
      effect: {
        1: {
          sign: 'avoid',
          value: 37.5,
          turn: 2,
        },
        2: {
          sign: 'taunt',
          value: 100,
          turn: 1,
        },
      },
    },
    disarm_aoe: {
      target: 'enemy',
      area: 5,
      mp: 90,
      mp_reduce: 'yes',
      value: 0,
      effect: {
        1: {
          sign: 'disarm',
          value: 100,
          turn: 2,
        },
      },
    },
    silent_aoe: {
      target: 'enemy',
      area: 5,
      mp: 90,
      mp_reduce: 'yes',
      value: 0,
      effect: {
        1: {
          sign: 'silent',
          value: 100,
          turn: 2,
        },
      },
    },
    attack_aoe: {
      target: 'team',
      area: 5,
      mp: 70,
      value: 0,
      effect: {
        1: {
          sign: 'attack',
          value: 26.3,
          turn: 2,
        },
      },
    },
    attack_aoe_35: {
      target: 'team',
      area: 5,
      mp: 35,
      value: 0,
      effect: {
        1: {
          sign: 'attack',
          value: 13.2,
          turn: 2,
        },
      },
    },
    defend_aoe: {
      target: 'team',
      area: 5,
      mp: 70,
      value: 0,
      effect: {
        1: {
          sign: 'defend',
          value: 26.3,
          turn: 2,
        },
      },
    },
    defend_aoe_35: {
      target: 'team',
      area: 5,
      mp: 35,
      value: 0,
      effect: {
        1: {
          sign: 'defend',
          value: 13.2,
          turn: 2,
        },
      },
    },
    weaken_aoe: {
      target: 'enemy',
      area: 5,
      mp: 70,
      value: 0,
      effect: {
        1: {
          sign: 'weaken',
          value: 26.3,
          turn: 2,
        },
      },
    },
    weaken_aoe_35: {
      target: 'enemy',
      area: 5,
      mp: 35,
      value: 0,
      effect: {
        1: {
          sign: 'weaken',
          value: 13.2,
          turn: 2,
        },
      },
    },
    curse_aoe: {
      target: 'enemy',
      area: 5,
      mp: 70,
      value: 0,
      effect: {
        1: {
          sign: 'curse',
          value: 26.3,
          turn: 2,
        },
      },
    },
    curse_aoe_35: {
      target: 'enemy',
      area: 5,
      mp: 35,
      value: 0,
      effect: {
        1: {
          sign: 'curse',
          value: 13.2,
          turn: 2,
        },
      },
    },
    suicide: {
      target: 'enemy',
      area: 1,
      mp: 50,
      value: 50000,
      special: {
        sign: 'suicide',
      },
    },
    mp_buff: {
      target: 'team',
      area: 5,
      mp: 90,
      mp_reduce: 'yes',
      value: 0,
      effect: {
        1: {
          sign: 'mpBuff',
          value: 100,
          turn: 2,
        },
      },
    },
    mp_stop: {
      target: 'enemy',
      area: 5,
      mp: 90,
      mp_reduce: 'yes',
      value: 0,
      effect: {
        1: {
          sign: 'mpStop',
          value: 100,
          turn: 2,
        },
      },
    },
    heal_reduce: {
      target: 'enemy',
      area: 5,
      mp: 90,
      value: 216,
      effect: {
        1: {
          sign: 'hpRestoreReduce',
          value: 100,
          turn: 3,
        },
      },
    },
    stun_aoe: {
      target: 'enemy',
      area: 5,
      mp: 90,
      mp_reduce: 'yes',
      value: 0,
      effect: {
        1: {
          sign: 'disarm',
          value: 100,
          turn: 1,
        },
        2: {
          sign: 'silent',
          value: 100,
          turn: 1,
        },
      },
    },
    anti_effect_team: {
      target: 'team',
      area: 5,
      mp: 60,
      mp_reduce: 'yes',
      value: 0,
      effect: {
        1: {
          sign: 'antiEffect',
          value: 100,
          turn: 3,
        },
      },
    },
    anti_effect_enemy: {
      target: 'enemy',
      area: 5,
      mp: 60,
      mp_reduce: 'yes',
      value: 0,
      effect: {
        1: {
          sign: 'antiEffect',
          value: 100,
          turn: 3,
        },
      },
    },
  },
]
