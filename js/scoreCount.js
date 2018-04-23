import {GAME_CONDITIONS, ANSWER_TIME_LIMITS} from './gameConstants';

const scoreCount = (answersList, gameLivesCount) => {
  if (!answersList || answersList.length < GAME_CONDITIONS.MIN_REQUIRED_ANSWERS) {
    return -1;
  }
  if (gameLivesCount < 0) {
    throw new Error(`Lives count can not be a negative number`);
  }

  let score = gameLivesCount * GAME_CONDITIONS.EXTRA_LIVE_SCORE;
  answersList.forEach((answer) => {
    if (answer.correct) {
      score += GAME_CONDITIONS.CORRECT_ANSWER;
      if (answer.time < ANSWER_TIME_LIMITS.FAST_ANSWER) {
        score += GAME_CONDITIONS.BONUS;
      }
      if (answer.time > ANSWER_TIME_LIMITS.SLOW_ANSWER) {
        score -= GAME_CONDITIONS.BONUS;
      }
    }
  });

  return score;
};

export default scoreCount;
