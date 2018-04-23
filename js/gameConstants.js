export const LIVES_COUNT = 3;

export const GAME_CONDITIONS = {
  MIN_REQUIRED_ANSWERS: 10,
  CORRECT_ANSWER: 100,
  EXTRA_LIVE_SCORE: 50,
  BONUS: 50,
};

export const gameTypes = [
  {
    type: `game1`,
    text: `Угадай, фото или рисунок?`
  },
  {
    type: `game2`,
    text: `Угадайте для кажого изображения фото или рисунок`
  },
  {
    type: `game3`,
    text: `Найдите рисунок среди изображени`
  }
];

export const ANSWER_TIME_LIMITS = {
  FAST_ANSWER: 10,
  SLOW_ANSWER: 20
};

export const ANSWER_TYPES = {
  NORMAL: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`,
  UNKNOWN: `unknown`
};
