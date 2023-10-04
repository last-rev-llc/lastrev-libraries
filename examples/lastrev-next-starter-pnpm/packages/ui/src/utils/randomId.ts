export const randomId = () => [...Array(10)].map(() => Math.random().toString(36)[2]).join('');
