const unitMap = {
  s: 1e9,
  ms: 1e6,
  us: 1e3,
  ns: 1
};

export type TimerUnits = 's' | 'ms' | 'us' | 'ns';

function safeNumber(x: bigint): number {
  if (x > Number.MAX_SAFE_INTEGER) {
    throw new Error(`Number exceeds maximum safe integer: ${x}`);
  }
  return Number(x);
}

export class SimpleTimer {
  private readonly start = process.hrtime();
  private elapsed: [number, number] | undefined;

  public end() {
    if (this.elapsed) {
      throw Error('Timer already ended');
    }
    this.elapsed = process.hrtime(this.start);
    return this;
  }

  public getElapsedString(unit: TimerUnits): number {
    if (!this.elapsed) throw Error('Timer not ended yet');
    const [secs, nanos] = this.elapsed;
    const elapsedTime = BigInt(secs) * BigInt(1e9) + BigInt(nanos);
    return safeNumber(elapsedTime / BigInt(unitMap[unit]));
  }

  public get millis() {
    return this.getElapsedString('ms');
  }
  public get seconds() {
    return this.getElapsedString('s');
  }
  public get micros() {
    return this.getElapsedString('us');
  }
  public get nanos() {
    return this.getElapsedString('ns');
  }
}

export class HumanReadableTimer {
  private timer = new SimpleTimer();
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public end(units: TimerUnits = 'ms') {
    this.timer.end();
    return `${this.name} in ${this.timer.getElapsedString(units)} ${units}`;
  }
}
