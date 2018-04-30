import returnToMainScreen from './returnToMainScreen';
import StatsView from './view/stats-view';

const statsScreen = (gameState) => {
  const finalResultScreen = new StatsView(gameState);

  finalResultScreen.backToMainScreen = returnToMainScreen;

  return finalResultScreen.element;
};

export default statsScreen;
