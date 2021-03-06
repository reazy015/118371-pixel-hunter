import App from './../application';
import HeaderView from "../view/header-view";
import StatsView from "../view/stats-view";
import FooterView from "../view/footer-view";

export default class StatsScreen {
  constructor(data) {
    this.header = new HeaderView();
    this.content = new StatsView(data);
    this.footer = new FooterView();
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  init() {
    this.header.onBackButtonClick = () => App.showGreeting();
  }
}
