import App from "../application";
import HeaderView from "../view/header-view";
import RulesView from "../view/rules-view";
import FooterView from "../view/footer-view";

export default class RulesScreen {
  constructor() {
    this.header = new HeaderView();
    this.content = new RulesView();
    this.footer = new FooterView();
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  init() {
    this.content.onInputChange = (value) => {
      if (value === ``) {
        this.content.disableButton();
      } else {
        this.content.enableButton();
      }
    };

    this.content.onFormSubmit = (playerName) => {
      App.start(playerName);
    };

    this.header.onBackButtonClick = () => App.showGreeting();

  }
}
