import AbstractView from '../abstract-view';
import statsBarTemplate from "../templates/statsBarTemplate";
import {PictureType} from "../utils/constants";

export default class GameThreeView extends AbstractView {
  constructor(model) {
    super();
    this.gameState = model.gameState;
    this.data = model.gameData[this.gameState.questionNumber];
    this.gameQuestion = this.data.question;
    this.gameAnswers = this.data.answers;
    this.images = this.gameAnswers.map((answer) => answer.image);
    this.imageType = this.gameQuestion === `Найдите рисунок среди изображений` ? PictureType.PAINT : PictureType.PHOTO;
    this.time = this.gameState.time;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this.gameQuestion}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${this.images[0].url}" alt="Option 1" width="${this.images[0].width}" height="${this.images[0].height}">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${this.images[1].url}" alt="Option 1" width="${this.images[1].width}" height="${this.images[1].height}">
        </div>
        <div class="game__option">
          <img src="${this.images[2].url}" alt="Option 1" width="${this.images[2].width}" height="${this.images[2].height}">
        </div>
      </form>
      <div class="stats">
        ${statsBarTemplate(this.gameState)}
      </div>
    </div>`;
  }

  bind() {
    const answersForm = this.element.querySelector(`.game__content`);
    answersForm.addEventListener(`click`, (evt) => {
      const imagesUrl = this.images.map((img) => img.url);
      if (evt.target.classList.contains(`game__option`)) {
        const userAnswer = this.gameAnswers[imagesUrl.indexOf(evt.target.children[0].src)].type;
        this.isCorrect = userAnswer === this.imageType;
      }

      this.onFormClick(this.isCorrect);
    });
  }

  onFormClick() {}
}
