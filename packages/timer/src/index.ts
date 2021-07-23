const unitMap = {
  s: 1e9,
  ms: 1e6,
  us: 1e3,
  ns: 1
};

export default class Timer {
  private start = process.hrtime();
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public end(unit: 's' | 'ms' | 'us' | 'ns' = 'ms') {
    const endTime = process.hrtime(this.start);
    return `${this.name} in ${(endTime[0] * 1e9 + endTime[1]) / unitMap[unit]} ${unit}`;
  }
}
