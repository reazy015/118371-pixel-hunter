const GAME_CONDITIONS = {
  MIN_REQUIRED_ANSWERS: 10,
  CORRECT_ANSWER: 100,
  EXTRA_LIVE_SCORE: 50,
  BONUS: 50,
  FAST_ANSWER_TIME: 10,
  SLOW_ANSWER_TIME: 20
};

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
      if (answer.time < GAME_CONDITIONS.FAST_ANSWER_TIME) {
        score += GAME_CONDITIONS.BONUS;
      }
      if (answer.time > GAME_CONDITIONS.SLOW_ANSWER_TIME) {
        score -= GAME_CONDITIONS.BONUS;
      }
    }
  });

  return score;
};

export default scoreCount;
