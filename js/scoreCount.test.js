import {assert} from 'chai';
import scoreCount from './scoreCount';
import {ANSWER_TYPES} from "./gameConstants";

const allCorrectFastAnswers = Array(10).fill(ANSWER_TYPES.FAST);
const nineCorrectFastAnswers = Array(9).fill(ANSWER_TYPES.NORMAL);
const allCorrectAnswers = Array(10).fill(ANSWER_TYPES.NORMAL);
const allSlowAnswers = Array(10).fill(ANSWER_TYPES.SLOW);
const allFastAnswers = Array(10).fill(ANSWER_TYPES.FAST);
const onlyEightAnswers = Array(8).fill(ANSWER_TYPES.NORMAL);
const nineNormalAnswers = Array(10).fill(ANSWER_TYPES.NORMAL).fill(ANSWER_TYPES.WRONG, 9);
const sevenSlowAnswers = Array(10).fill(ANSWER_TYPES.SLOW).fill(ANSWER_TYPES.WRONG, 7);
const differentAnswers = Array(10).fill(ANSWER_TYPES.FAST).fill(ANSWER_TYPES.NORMAL, 2).fill(ANSWER_TYPES.SLOW, 5).fill(ANSWER_TYPES.WRONG, 9);

describe(`score counting function`, () => {
  it(`Should return -1 if there is null instead of answerList or there are less then 10 answers in list`, () => {
    assert.equal(-1, scoreCount(null, 3));
    assert.equal(-1, scoreCount(nineCorrectFastAnswers, 3));
  });
  it(`Live counter should not be a negative number`, () => {
    assert.throws(() => scoreCount(allCorrectFastAnswers, -1), /Lives count can not be a negative number/);
  });
  it(`Points should not be awarded if the player answered less than 10 questions`, () => {
    assert.equal(scoreCount(onlyEightAnswers, 0), -1);
  });
  it(`Returns 1150, if called with 10 correct answers and with three lives`, () => {
    assert.equal(scoreCount(allCorrectAnswers, 3), 1150);
  });
  it(`Returns 1000, if called with 9 correct answers and with two lives`, () => {
    assert.equal(scoreCount(nineNormalAnswers, 2), 1000);
  });
  it(`Returns 650, if called with 10 slow answers and with three lives`, () => {
    assert.equal(scoreCount(allSlowAnswers, 3), 650);
  });
  it(`Returns 350, if called with 7 correct slow answers and with zero lives`, () => {
    assert.equal(scoreCount(sevenSlowAnswers, 0), 350);
  });
  it(`Returns 1650, if called with 10 correct fast answers and with three lives`, () => {
    assert.equal(scoreCount(allFastAnswers, 3), 1650);
  });
  it(`Returns 900, if called with 2 fast, 3 normal, 4 slow and 1 incorrect answers and with two lives`, () => {
    assert.equal(scoreCount(differentAnswers, 2), 900);
  });
});
