import assert from 'assert';
import getScore from './get-score';
import {LIVES_COUNT, AnswerType} from "./constants";

const allCorrectAnswers = Array(10).fill(AnswerType.NORMAL);

const allSlowAnswers = Array(10).fill(AnswerType.SLOW);

const allFastAnswers = Array(10).fill(AnswerType.FAST);

const onlyEightAnswers = Array(8).fill(AnswerType.NORMAL);

const nineNormalAnswers = Array(10).fill(AnswerType.NORMAL).fill(AnswerType.WRONG, 9);

const sevenSlowAnswers = Array(10).fill(AnswerType.SLOW).fill(AnswerType.WRONG, 7);

const differentAnswers = Array(10).fill(AnswerType.FAST).fill(AnswerType.NORMAL, 2).fill(AnswerType.SLOW, 5).fill(AnswerType.WRONG, 9);

describe(`Check error handling`, () => {
  it(`Answers should not allow set non array`, () => {
    const errorMessage = /Answers should be of type array/;
    assert.throws(() => getScore({}, 3), errorMessage);
    assert.throws(() => getScore(1, 3), errorMessage);
    assert.throws(() => getScore(`Lalala`, 3), errorMessage);
  });

  it(`Lives should not allow set non number`, () => {
    const errorMessage = /Lives should be of type number/;
    assert.throws(() => getScore(allCorrectAnswers, []), errorMessage);
    assert.throws(() => getScore(allCorrectAnswers, {}), errorMessage);
    assert.throws(() => getScore(allCorrectAnswers, `Lalala`), errorMessage);
    assert.throws(() => getScore(allCorrectAnswers), errorMessage);
  });

  it(`Lives should not allow set negative values`, () => {
    assert.throws(() => getScore(allCorrectAnswers, -1), /Lives should not be a negative value/);
  });

  it(`Lives should not be more than ${LIVES_COUNT}`, () => {
    assert.throws(() => getScore(allCorrectAnswers, 4), new RegExp(`Lives should not be more than ${LIVES_COUNT}`));
  });

});

describe(`Check total points`, () => {
  it(`Points should not be awarded if the player answered less than 10 questions`, () => {
    assert.equal(getScore(onlyEightAnswers, 0), -1);
  });

  it(`Returns 1150, if called with 10 correct answers and with three lives`, () => {
    assert.equal(getScore(allCorrectAnswers, 3), 1150);
  });

  it(`Returns 1000, if called with 9 correct answers and with two lives`, () => {
    assert.equal(getScore(nineNormalAnswers, 2), 1000);
  });

  it(`Returns 650, if called with 10 slow answers and with three lives`, () => {
    assert.equal(getScore(allSlowAnswers, 3), 650);
  });

  it(`Returns 350, if called with 7 correct slow answers and with zero lives`, () => {
    assert.equal(getScore(sevenSlowAnswers, 0), 350);
  });

  it(`Returns 1650, if called with 10 correct fast answers and with three lives`, () => {
    assert.equal(getScore(allFastAnswers, 3), 1650);
  });

  it(`Returns 900, if called with 2 fast, 3 normal, 4 slow and 1 incorrect answers and with two lives`, () => {
    assert.equal(getScore(differentAnswers, 2), 900);
  });

});
