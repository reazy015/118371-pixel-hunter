import {ANSWER_TYPES} from "./gameConstants";

const recordAnswer = (isCorrect, answerType, gameState) => {
  if (isCorrect) {
    gameState.answers[gameState.questionNumber] = answerType;
  } else {
    gameState.answers[gameState.questionNumber] = ANSWER_TYPES.WRONG;
    gameState.lives--;
  }
  gameState.questionNumber++;
  // console.log(gameState.answers, gameState.lives, gameState.questionNumber);
};

export default recordAnswer;
