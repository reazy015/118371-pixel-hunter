import App from './../application';
import IntroView from '../view/intro-view';
import FooterView from "../view/footer-view";

export default class IntroScreen {
  constructor() {
    this.content = new IntroView();
    this.footer = new FooterView();
    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  init() {
    this.content.onNextButtonClick = () => App.showGreeting();
  }
}
