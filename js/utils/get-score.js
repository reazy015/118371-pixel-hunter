import {TASK_COUNT, LIVES_COUNT, Points, AnswerType} from './constants';

const getScore = (answers, lives) => {
  if (!Array.isArray(answers)) {
    throw new Error(`Answers should be of type array`);
  }

  if (typeof lives !== `number`) {
    throw new Error(`Lives should be of type number`);
  }

  if (lives < 0) {
    throw new Error(`Lives should not be a negative value`);
  }
  if (lives > LIVES_COUNT) {
    throw new Error(`Lives should not be more than ` + LIVES_COUNT);
  }

  if (answers.length < TASK_COUNT) {
    return -1;
  }

  let score = lives * Points.LIFE_BONUS;
  answers.forEach((item) => {
    switch (item) {
      case AnswerType.SLOW:
        score += (Points.CORRECT + Points.FINE);
        break;
      case AnswerType.FAST:
        score += (Points.CORRECT + Points.BONUS);
        break;
      case AnswerType.NORMAL:
        score += Points.CORRECT;
        break;
      default:
        break;
    }
  });

  return score;
};

export default getScore;
