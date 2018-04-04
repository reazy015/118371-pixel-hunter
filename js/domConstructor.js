function getElementFromTemplate(stringTemplate) {
  let result = document.createElement('template');
  result.innerHTML = stringTemplate;
  return result.content.cloneNode(true);
}

export default getElementFromTemplate;