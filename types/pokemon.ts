export type StatsKey =
    'p_attack'
    | 'm_attack'
    | 'critical'
    | 'speed'
    | 'p_def'
    | 'm_def'
    | 'hp'
    | 'skill_atk'
    | 'skill_def'
    | 'mp_restore'
    | string

export interface BaseStats {
  main: number
  total: number
  bonus: {
    level: number
    point: number
  }
  quality: number
  level: number
}

export type ElementKey =
    'normal' |
    'fighting' |
    'flying' |
    'poison' |
    'ground' |
    'rock' |
    'bug' |
    'ghost' |
    'steel' |
    'fire' |
    'water' |
    'grass' |
    'electric' |
    'psychic' |
    'ice' |
    'dragon' |
    'dark' |
    'fairy'

export interface ElementBonus {
  defend: {
    [key in ElementKey]: {
      level: number
      total: number
    }
  }
  attack: {
    [key in ElementKey]: {
      level: number
      total: number
    }
  }
}

export interface Pokemon {
  _id?: string
  sid?: string
  pokedex?: number
  info: {
    author: string
    quality: number
    cp?: number
    perfect: number
    name?: string
    gen?: number
    pokedex: number
    role?: string
    point?: number
    training?: number
  }
  stats: {
    [key in StatsKey | string]: BaseStats
  }
  element: string[]
  skill: {
    sign: string
    name: string
    level: number
  }
  training?: {
    exp: number
    maxExp: number
    level: number
  }
  element_bonus?: ElementBonus
}
