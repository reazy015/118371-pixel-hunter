import timer from './timer';
import {assert} from 'chai';

describe(`Timer function`, () => {
  it(`Should throw an error if time argument is negative`, () => {
    assert.throws(() => timer(-1), /Time argument can not be negative/);
  });
  it(`Should trow an error if time argument not of type number`, () => {
    assert.throws(() => timer(`test`), /Time argument has to be of type number/);
    assert.throws(() => timer([]), /Time argument has to be of type number/);
    assert.throws(() => timer(null), /Time argument has to be of type number/);
    assert.throws(() => timer(true), /Time argument has to be of type number/);
  });
  it(`Should throw an error if time argument not integer`, () => {
    assert.throws(() => timer(1.25), /Time argument hast to be integer/);
    assert.throws(() => timer(4.15), /Time argument hast to be integer/);
    assert.throws(() => timer(3.45), /Time argument hast to be integer/);
  });
  it(`Should return timer object with specified time`, () => {
    assert.equal(timer(15).time, 15);
    assert.equal(timer(21).time, 21);
    assert.equal(timer(13).time, 13);
  });
  it(`Should reduce time value by one every time when tick method is used`, () => {
    const timerObject = timer(30);
    assert.equal(timerObject.tick(), 29);
    assert.equal(timerObject.tick(), 28);
    assert.equal(timerObject.tick(), 27);
  });
  it(`Should return  timer ending message`, () => {
    const timerObject = timer(1);
    assert.equal(timerObject.tick(), `Time is over!`);
  });
});
