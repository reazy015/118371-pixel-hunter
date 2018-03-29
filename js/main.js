const screensList = document.querySelectorAll(`template`);
const mainScreen = document.querySelector(`main.central`);
const keyCodes = {
  altKey: 18,
  arrowLeft: 37,
  arrowRight: 39
};
let screenIndex = 0;

const getScreen = (index) => screensList[index].content.cloneNode(true);
const showScreen = (screen) => {
  while (mainScreen.firstElementChild) {
    mainScreen.removeChild(mainScreen.firstElementChild);
  }
  mainScreen.append(screen);
};
const screenKeyHandler = (evt) => {
  if (evt.altKey && evt.keyCode === keyCodes.arrowLeft) {
    screenIndex--;
    if (screenIndex >= 0) {
      showScreen(getScreen(screenIndex));
    } else {
      screenIndex++;
    }
  }

  if (evt.altKey && evt.keyCode === keyCodes.arrowRight) {
    screenIndex++;
    if (screenIndex < screensList.length) {
      showScreen(getScreen(screenIndex));
    } else {
      screenIndex--;
    }
  }
};

showScreen(getScreen(screenIndex));
document.addEventListener(`keydown`, screenKeyHandler);
