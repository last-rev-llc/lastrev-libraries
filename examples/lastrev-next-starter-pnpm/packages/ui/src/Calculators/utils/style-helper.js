const styleHelper = (styling) => {
  let css = '';
  styling.map((style) => style[0] && (css = `${css}${style[1]}`));
  return css;
};

export default styleHelper;
