import {assert} from 'chai';
import scoreCount from './scoreCount';

describe(`score counting function`, () => {
  it(`Should return -1 if there is null instead of answerList`, () => {
    assert.equal(-1, scoreCount(null, 3));
  });
  it(`Should return -1 if there is undefined instead of answerList`, () => {
    assert.equal(-1, scoreCount([{}], 2));
  });
  it(`Should return -1 if there are less then 10  answers in answerList`, () => {
    const answers = [
      {correct: true, time: 20},
      {correct: true, time: 30},
      {correct: true, time: 40}
    ];
    assert.equal(-1, scoreCount(answers, 0));
  });
  it(`Should return 1150 when all answers semi timed, correct and full-live`, () => {
    const answers = [
      {correct: true, time: 15},
      {correct: true, time: 15},
      {correct: true, time: 15},
      {correct: true, time: 15},
      {correct: true, time: 15},
      {correct: true, time: 15},
      {correct: true, time: 15},
      {correct: true, time: 15},
      {correct: true, time: 15},
      {correct: true, time: 15}
    ];
    assert.equal(1150, scoreCount(answers, 3));
  });
  it(`Should return 700. 7 correct answers, 2 semi timed, 2 slow, 0 lives`, () => {
    const answers = [
      {correct: true, time: 15},
      {correct: false, time: 15},
      {correct: true, time: 8},
      {correct: true, time: 23},
      {correct: false, time: 15},
      {correct: true, time: 15},
      {correct: true, time: 8},
      {correct: false, time: 15},
      {correct: true, time: 23},
      {correct: true, time: 15}
    ];
    assert.equal(700, scoreCount(answers, 0));
  });
  it(`Should return worst result 350, all answers are slow, 0 lives`, () => {
    const answers = [
      {correct: true, time: 8},
      {correct: false, time: 8},
      {correct: true, time: 8},
      {correct: true, time: 8},
      {correct: false, time: 8},
      {correct: true, time: 8},
      {correct: true, time: 8},
      {correct: false, time: 8},
      {correct: true, time: 8},
      {correct: true, time: 8}
    ];
    assert.equal(350, scoreCount(answers, 0));
  });
  it(`Should return best result, all answers correct, all fast answered, full live`, () => {
    const answers = [
      {correct: true, time: 23},
      {correct: true, time: 23},
      {correct: true, time: 23},
      {correct: true, time: 23},
      {correct: true, time: 23},
      {correct: true, time: 23},
      {correct: true, time: 23},
      {correct: true, time: 23},
      {correct: true, time: 23},
      {correct: true, time: 23}
    ];
    assert.equal(1650, scoreCount(answers, 3));
  });
});
