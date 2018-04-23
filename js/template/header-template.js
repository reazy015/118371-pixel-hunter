const headerTemplate = (game) => {
  const headerBtn = `
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
`;

  const emptyHeart = `<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`;
  const fullHeart = `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`;
  let template;

  if (game) {
    template = `
    <header class="header">
        ${headerBtn}
        <h1 class="game__timer">${game.time}</h1>
        <div class="game__lives">
            ${new Array(3 - game.lives).fill(emptyHeart).join(``)}
            ${new Array(game.lives).fill(fullHeart).join(``)}
        </div>
     </header>`;
  } else {
    template = `
    <header class="header">
        ${headerBtn}
    </header>`;
  }
  return template;
};

export default headerTemplate;
