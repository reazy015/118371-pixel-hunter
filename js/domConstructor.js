function getElementFromTemplate(stringTemplate) {
  const result = document.createElement(`div`);
  result.innerHTML = stringTemplate;
  return result;
}

export default getElementFromTemplate;
