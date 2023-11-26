export function popRandom(cumulative, agregated, years) {
  let i = (Math.random() * cumulative.length) | 0;
  return {
    remaningCumulative: cumulative.splice(i, 1)[0],
    remaningAgregated: agregated.splice(i, 1)[0],
    remaningYears: years.splice(i, 1)[0]
  };
}
