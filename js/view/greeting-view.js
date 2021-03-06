import AbstractView from '../abstract-view';

export default class GreetingView extends AbstractView {
  constructor() {
    super();
    this.title = `Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!`;
    this.text = `Правила игры просты.<br>
    Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
    Задача кажется тривиальной, но не думай, что все так просто.<br>
    Фотореализм обманчив и коварен.<br>
    Помни, главное — смотреть очень внимательно.`;
  }

  get template() {
    return `
    <div class="greeting central--blur">
      <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
        <h1 class="greeting__asterisk">*</h1>
        <div class="greeting__challenge">
          <h3>${this.title}</h3>
          <p>${this.text}</p>
        </div>
      <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
    </div>`;
  }

  bind() {
    const continueButton = this.element.querySelector(`.greeting__continue`);
    continueButton.onclick = (evt) => {
      evt.preventDefault();
      this.onNextButtonClick();
    };
  }

  onNextButtonClick() {}
}
