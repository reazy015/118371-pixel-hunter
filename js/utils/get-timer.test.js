import assert from 'assert';
import getTimer from './get-timer';

describe(`Check error handling`, () => {

  it(`Time should not allow set non number`, () => {
    assert.throws(() => getTimer(`Lalala`), /Time should be of type number/);
  });

  it(`Time should not allow set non integer number`, () => {
    assert.throws(() => getTimer(1.3), /Time should be integer number/);
  });

  it(`Time should not allow set negative values`, () => {
    assert.throws(() => getTimer(-2), /Time should not be negative value/);
  });

});

describe(`Check timer`, () => {
  it(`Creates a new timer with the specified time`, () => {
    assert.equal(getTimer(30).value, 30);
  });

  it(`Reduces the time by one for each call`, () => {
    const timer = getTimer(30);
    assert.equal(timer.tick(), 29);
    assert.equal(timer.tick(), 28);
  });

  it(`Returns 'Time is over' if it happened`, () => {
    const timer = getTimer(1);
    assert.equal(timer.tick(), `Time is over`);
    assert.equal(timer.tick(), `Time is over`);
  });

});
