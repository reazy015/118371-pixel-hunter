const APP_ID = 12031991;
const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
export const DATA_URL = SERVER_URL + `/questions`;
export const STATS_URL = SERVER_URL + `/stats/` + APP_ID;
export const DEFAULT_NAME = `Неопознанный енот`;


export const TASK_COUNT = 10;
export const LIVES_COUNT = 3;

export const Points = {
  CORRECT: 100,
  BONUS: 50,
  FINE: -50,
  LIFE_BONUS: 50
};

export const TimeLimits = {
  FAST: 10,
  SLOW: 20,
  INITIAL: 30,
  TICK: 1000,
};


export const PictureType = {
  PHOTO: `photo`,
  PAINT: `painting`
};

export const AnswerType = {
  NORMAL: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`,
  UNKNOWN: `unknown`
};
