import IntroView from './view/intro-view';
import showScreen from './showScreen';
import greetingScreen from './greetingModule';

const introScreen = new IntroView();

introScreen.onNextButtonClick = () => {
  showScreen(greetingScreen);
};

export default introScreen.element;
