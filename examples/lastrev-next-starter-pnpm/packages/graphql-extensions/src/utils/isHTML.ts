const htmlRegex = /<([a-z][^\s<>]*)[^<>]*>/i;
const isHTML = (value: string) => htmlRegex.test(value);

export default isHTML;
