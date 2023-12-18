const htmlRegex = /<([a-z][^\s<>]*)[^<>]*>/i;

export const isHTML = (value: string) => htmlRegex.test(value);
