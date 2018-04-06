import mainScreen from './introModule';
import showScreen from './showScreen';

const returnToMainScreen = () => {
    showScreen(mainScreen);
}

export default returnToMainScreen;