import {GAME_CONDITIONS, LIVES_COUNT} from './gameConstants';

const getGameState = () => {
  return {
    time: 15,
    lives: LIVES_COUNT,
    win: false,
    questionNumber: 0,
    answers: Array(GAME_CONDITIONS.MIN_REQUIRED_ANSWERS).fill(`unknown`)
  };
};

export default getGameState;
