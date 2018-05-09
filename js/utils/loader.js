import {DATA_URL, STATS_URL, DEFAULT_NAME} from "./constants";

const toJSON = (response) => response.json();

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const getImagesUrls = (data) => {
  const answers = data.map((item) => item.answers);
  const urls = [];
  answers.forEach((answer) => {
    answer.forEach((item) => {
      urls.push(item.image.url);
    });
  });
  return urls;
};

export default class Loader {
  static async loadData() {
    const response = await fetch(DATA_URL);
    checkStatus(response);
    return await toJSON(response);
  }

  static loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => reject(`Не удалось загрузить картнку: ${url}`);
      image.src = url;

    });
  }

  static preloadImages(data) {
    const urls = getImagesUrls(data);
    const promises = urls.map((url) => {
      return this.loadImage(url);
    });
    return Promise.all(promises);
  }

  static async loadResults(name = DEFAULT_NAME) {
    const response = await fetch(`${STATS_URL}-${name}`);
    checkStatus(response);
    return await toJSON(response);
  }

  static async saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    const response = await fetch(`${STATS_URL}-${name}`, requestSettings);
    return checkStatus(response);
  }
}
