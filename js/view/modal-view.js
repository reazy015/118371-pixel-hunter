import AbstractView from '../abstract-view';

export default class ModalView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <div class="game__modal">
      <h3 class="game__modal-question">Вы действительно хотите выйти?</h3>
      <p class="game__modal-text">Все результаты текущей игры будут утеряны!</p>
      <button type="button" class="game__modal-button  game__modal-button--reset">Да</button>
      <button type="button" class="game__modal-button  game__modal-button--continue">Нет</button>
    </div>`;
  }

  bind() {
    this.element.querySelector(`.game__modal-button--reset`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onResetClick();
    });
    this.element.querySelector(`.game__modal-button--continue`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onContinueClick();
    });
  }

  onResetClick() {

  }

  onContinueClick() {

  }
}
