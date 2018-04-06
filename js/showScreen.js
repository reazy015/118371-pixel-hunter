const mainScreen = document.querySelector(`main.central`);

const showScreen = (screen = null) => {
  if (!screen) {
    return;
  }

  mainScreen.innerHTML = ``;
  mainScreen.appendChild(screen);
};

export default showScreen;