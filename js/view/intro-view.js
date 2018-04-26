import AbstractView from './abstract-view';
import footerTemplate from '../template/footer-template';

export default class IntroView extends AbstractView {
  constructor() {
    super();
    this.text = `Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.`;
  }

  get template() {
    return `
    <div id="main" class="central__content">
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup>${this.text}</p>
      </div>
    </div>
    ${footerTemplate}`;
  }

  bind() {
    const startBtn = this.element.querySelector(`.intro__asterisk`);
    startBtn.onclick = (evt) => {
      evt.preventDefault();
      this.onNextButtonClick();
    };
  }

  onNextButtonClick() {
  }
}
