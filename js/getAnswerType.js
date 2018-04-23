import {ANSWER_TIME_LIMITS, ANSWER_TYPES} from "./gameConstants";

const getAnswerType = (answerTime) => {
  let answerType;
  if (answerTime < ANSWER_TIME_LIMITS.FAST_ANSWER) {
    answerType = ANSWER_TYPES.FAST;
  } else if (answerTime <= ANSWER_TIME_LIMITS.SLOW_ANSWER) {
    answerType = ANSWER_TYPES.NORMAL;
  } else {
    answerType = ANSWER_TYPES.SLOW;
  }
  return answerType;
};

export default getAnswerType;
