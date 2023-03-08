import type { StatsKey } from '~/types/pokemon'

export const STATS_NAME: Record<StatsKey, string> = {
  p_attack: 'Sát thương vật lý',
  m_attack: 'Sát thương phép thuật',
  critical: 'Chí mạng',
  speed: 'Tốc độ',
  hp: 'Máu',
  m_def: 'Phòng thủ vật lý',
  p_def: 'Phòng thủ phép thuật',
  skill_atk: 'Sát thương kỹ năng',
  skill_def: 'Phòng thủ kỹ ',
  mp_restore: 'Hồi năng lượng',
}

export const STATS_LEVEL_BONUS: Record<StatsKey, number> = {
  p_attack: 40,
  m_attack: 40,
  critical: 0.8,
  speed: 0.2,
  hp: 400,
  m_def: 4,
  p_def: 4,
  skill_atk: 4,
  skill_def: 4,
  mp_restore: 0.19,
}
