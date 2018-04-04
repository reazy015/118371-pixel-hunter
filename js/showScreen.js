const mainScreen = document.querySelector(`main.central`);

const showScreen = (screen) => {
  while (mainScreen.firstElementChild) {
    mainScreen.removeChild(mainScreen.firstElementChild);
  }
  mainScreen.appendChild(screen);
};

export default showScreen;