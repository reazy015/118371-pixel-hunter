import {GAME_CONDITIONS, ANSWER_TYPES} from './gameConstants';

const scoreCount = (answersList, gameLivesCount) => {
  if (!answersList || answersList.length < GAME_CONDITIONS.MIN_REQUIRED_ANSWERS) {
    return -1;
  }
  if (gameLivesCount < 0) {
    throw new Error(`Lives count can not be a negative number`);
  }

  let score = gameLivesCount * GAME_CONDITIONS.BONUS;
  answersList.forEach((answer) => {
    switch (answer) {
      case ANSWER_TYPES.SLOW:
        score += (GAME_CONDITIONS.CORRECT_ANSWER - GAME_CONDITIONS.BONUS);
        break;
      case ANSWER_TYPES.FAST:
        score += (GAME_CONDITIONS.CORRECT_ANSWER + GAME_CONDITIONS.BONUS);
        break;
      case ANSWER_TYPES.NORMAL:
        score += GAME_CONDITIONS.CORRECT_ANSWER;
        break;
      default:
        break;
    }
  });

  return score;
};

export default scoreCount;
