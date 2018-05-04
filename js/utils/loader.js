const SERVER_URL = `https://es.dump.academy/pixel-hunter/questions`;

const checkStatus = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}`)
        .then(checkStatus)
        .then((data) => data);
  }
}
