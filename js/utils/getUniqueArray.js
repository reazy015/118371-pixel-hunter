import getRandomElement from "./getRandomElement";

const createUniqueItemsArray = (array, counter) => {
  const arrayOfPhotos = array.filter((item) => item.imgType === `photo`);
  const arrayOfPainting = array.filter((item) => item.imgType === `paint`);
  let resultArray = [];

  if (counter === 2) {
    resultArray = [
      getRandomElement(arrayOfPhotos),
      getRandomElement(arrayOfPainting)
    ];
    if (Math.floor(Math.random() * 2)) {
      resultArray.reverse();
    }
  }

  if (counter > 2) {
    while (resultArray.length < 3) {
      let item = getRandomElement(arrayOfPhotos);
      arrayOfPhotos.splice(arrayOfPhotos.indexOf(item), 1);
      resultArray.push(item);
    }

    const randomIndex = Math.floor(Math.random() * (counter - 0));
    resultArray[randomIndex] = getRandomElement(arrayOfPainting);
  }

  return resultArray;
};

export default createUniqueItemsArray;
