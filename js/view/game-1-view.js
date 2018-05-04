import AbstractView from '../abstract-view';
import statsBarTemplate from "../templates/statsBarTemplate";

export default class GameOneView extends AbstractView {
  constructor(model) {
    super();
    this.gameState = model.gameState;
    this.data = model.gameData[this.gameState.questionNumber];
    this.gameQuestion = this.data.question;
    this.gameAnswers = this.data.answers;
    this.image = this.gameAnswers[0].image;
    this.imageType = this.gameAnswers[0].type;
    this.time = this.gameState.time;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this.gameQuestion}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this.image.url}" alt="Option 1" width="${this.image.width}" height="${this.image.height}">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="painting">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
      <div class="stats">
        ${statsBarTemplate(this.gameState)}
      </div>
  </div>`;
  }

  bind() {
    const answersForm = this.element.querySelector(`.game__content`);

    answersForm.addEventListener(`change`, () => {
      const userAnswer = answersForm.querySelector(`input[name=question1]:checked`).value;
      this.isCorrect = userAnswer === this.imageType;
      this.onFormClick(this.isCorrect);
    });
  }

  onFormClick() {}
}
