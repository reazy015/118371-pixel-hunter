const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const DEFAULT_NAME = `Неопознанный енот`;
const APP_ID = 12031991;

const toJSON = (response) => response.json();

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
        .then(checkStatus)
        .then(toJSON);
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`)
        .then(checkStatus)
        .then(toJSON);
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings)
        .then(checkStatus);
  }
}
