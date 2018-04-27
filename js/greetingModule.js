import GreetingView from './view/greeting-view';
import showScreen from './showScreen';
import rulesScreen from './rulesModule';

const greetingScreen = new GreetingView();

greetingScreen.onNextButtonClick = () => {
  showScreen(rulesScreen);
};

export default greetingScreen.element;
