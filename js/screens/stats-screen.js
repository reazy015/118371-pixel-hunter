import App from './../application';
import HeaderView from "../view/header-view";
import StatsView from "../view/stats-view";
import FooterView from "../view/footer-view";

class StatsScreen {
  constructor(gameState) {
    this.header = new HeaderView();
    this.content = new StatsView(gameState);
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

export default StatsScreen;
