export default (template = ``, tagName = `div`) => {
  const outer = document.createElement(tagName);
  outer.innerHTML = template.trim();
  return outer;
};
