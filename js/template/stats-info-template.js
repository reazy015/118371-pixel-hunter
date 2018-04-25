export default (gameState) => {
  return `<ul class="stats">
    ${gameState.answers.map((answerType) => `<li class="stats__result stats__result--${answerType}"></li>`).join(``)}
  </ul>`;
};
