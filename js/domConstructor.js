function getElementFromTemplate(stringTemplate) {
  let result = document.createElement('div');
  result.innerHTML = stringTemplate;
  return result;
}

export default getElementFromTemplate;