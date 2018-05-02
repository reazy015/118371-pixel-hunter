import {LIVES_COUNT, TASK_COUNT, TimeLimits} from "./utils/constants";

export default class GameModel {
  constructor() {
    this.restartGame();
  }

  restartGame() {
    this._gameState = {
      time: TimeLimits.INITIAL,
      lives: LIVES_COUNT,
      answers: Array(TASK_COUNT).fill(`unknown`),
      questionNumber: 0,
      win: false
    };
  }

  get gameState() {
    return this._gameState;
  }

  hasNextLevel() {
    return this._gameState.questionNumber !== TASK_COUNT;

  }

  recordAnswer(answer) {
    this._gameState.answers[this._gameState.questionNumber] = answer;
    this._gameState.questionNumber++;
  }

  takeOffLife() {
    this._gameState.lives--;
  }

  isDead() {
    return this._gameState.lives <= 0;
  }

  win() {
    this._gameState.win = true;
  }

  tick() {
    this._gameState.time--;
  }

  restartTime() {
    this._gameState.time = TimeLimits.INITIAL;
  }
}
