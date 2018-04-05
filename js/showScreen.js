const mainScreen = document.querySelector(`main.central`);

const showScreen = (screen) => {
  if (!screen) {
    return;
  }

  while (mainScreen.firstElementChild) {
    mainScreen.removeChild(mainScreen.firstElementChild);
  }
  mainScreen.appendChild(screen);
};

export default showScreen;