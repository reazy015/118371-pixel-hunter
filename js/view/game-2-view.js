import AbstractView from '../abstract-view';
import statsBarTemplate from "../templates/stats-bar-template";

export default class GameTwoView extends AbstractView {
  constructor(model) {
    super();
    this.gameState = model.gameState;
    this.data = model.gameData[this.gameState.questionNumber];
    this.gameQuestion = this.data.question;
    this.gameAnswers = this.data.answers;
    this.imageOne = this.gameAnswers[0].image;
    this.imageTwo = this.gameAnswers[1].image;
    this.imageOneType = this.gameAnswers[0].type;
    this.imageTwoType = this.gameAnswers[1].type;
    this.time = this.gameState.time;
  }

  get template() {
    return `
    <div class="game">
    <p class="game__task">${this.gameQuestion}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${this.imageOne.url}" alt="Option 1" width="${this.imageOne.width}" height="${this.imageOne.height}">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${this.imageTwo.url}" alt="Option 2" width="${this.imageTwo.width}" height="${this.imageTwo.height}">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="painting">
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
      let userAnswerOne = answersForm.querySelector(`input[name=question1]:checked`);
      let userAnswerTwo = answersForm.querySelector(`input[name=question2]:checked`);
      if (userAnswerOne && userAnswerTwo) {
        userAnswerOne = userAnswerOne.value;
        userAnswerTwo = userAnswerTwo.value;
        this.isCorrect = userAnswerOne === this.imageOneType && userAnswerTwo === this.imageTwoType;
        this.onFormClick(this.isCorrect);
      }
    });
  }

  onFormClick() {}
}
