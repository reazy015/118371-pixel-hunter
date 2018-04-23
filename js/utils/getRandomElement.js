const getRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * (arr.length - 0))];
};

export default getRandomElement;
