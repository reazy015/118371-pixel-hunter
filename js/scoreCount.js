const GAME_CONDITIONS = {
  MIN_REQUIRED_ANSWERS: 10,
  CORRECT_ANSWER: 100,
  EXTRA_LIVE_SCORE: 50,
  TIME_BONUS: 50,
  LIFE: 50,
  GAME_TIME: 30,
  FAST_ANSWER_TIME: 10,
  SLOW_ANSWER_TIME: 20
};

const scoreCount = (answersList, gameLivesCount) => {
  if (!answersList || answersList.length < GAME_CONDITIONS.MIN_REQUIRED_ANSWERS) {
    return -1;
  }

  let score = gameLivesCount * GAME_CONDITIONS.EXTRA_LIVE_SCORE;

  answersList.filter((answer) => answer.correct).map((answer) => {
    const usedTime = GAME_CONDITIONS.GAME_TIME - answer.time;
    score += GAME_CONDITIONS.CORRECT_ANSWER;
    if (usedTime < GAME_CONDITIONS.FAST_ANSWER_TIME) {
      score += GAME_CONDITIONS.TIME_BONUS;
    } else if (usedTime > GAME_CONDITIONS.SLOW_ANSWER_TIME) {
      score -= GAME_CONDITIONS.TIME_BONUS;
    }
  });

  return score;
};

export default scoreCount;
