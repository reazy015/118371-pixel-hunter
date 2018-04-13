import {assert} from 'chai';
import scoreCount from './scoreCount';

const allCorrectFasttAnswers = Array(10).fill({
  correct: true,
  time: 8
});
const allCorrectSlowAnswers = Array(10).fill({
  correct: true,
  time: 25
});
const allCorrectMiddletimedAnswers = Array(10).fill({
  correct: true,
  time: 15
});
const nineCorrectFastAnswers = Array(9).fill({
  correct: true,
  time: 9
});
const allDifferentAnswers = Array(10).fill({
  correct: true,
  time: 15
}).fill({
  correct: false,
  time: 10
}, 3).fill({
  correct: true,
  time: 5
}, 7).fill({
  correct: true,
  time: 8
}, 9);

describe(`score counting function`, () => {
  it(`Should return -1 if there is null instead of answerList or there are less then 10 answers in list`, () => {
    assert.equal(-1, scoreCount(null, 3));
    assert.equal(-1, scoreCount(nineCorrectFastAnswers, 3));
  });
  it(`Live counter should not be a negative number`, () => {
    assert.throws(() => scoreCount(allCorrectFasttAnswers, -1), /Lives count can not be a negative number/);
  });
  it(`Should return 1650, all answers correct and lives counter is fullfilled`, () => {
    assert.equal(1650, scoreCount(allCorrectFasttAnswers, 3));
  });
  it(`Should return 1500, all answers correct and lives are spent`, () => {
    assert.equal(1500, scoreCount(allCorrectFasttAnswers, 0));
  });
  it(`Should return 1000, all answers correct, no time bonus, lives are spent`, () => {
    assert.equal(1000, scoreCount(allCorrectMiddletimedAnswers, 0));
  });
  it(`Should return 500, all answers correct minus time bonus, lives are spent`, () => {
    assert.equal(500, scoreCount(allCorrectSlowAnswers, 0));
  });
  it(`Should return 750, different time, not all answers correct, no live bonus`, () => {
    assert.equal(750, scoreCount(allDifferentAnswers, 0));
  });
});
