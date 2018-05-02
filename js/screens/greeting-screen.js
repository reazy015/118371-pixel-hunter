import App from "../application";
import GreetingView from '../view/greeting-view';
import FooterView from "../view/footer-view";

export default class GreetingScreen {
  constructor() {
    this.content = new GreetingView();
    this.footer = new FooterView();
    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  init() {
    this.content.onNextButtonClick = () => App.showRules();
  }
}
