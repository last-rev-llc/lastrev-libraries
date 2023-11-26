export const FV = (rate, nper, pmt, pv, type) => {
  const pow = Math.pow(1 + rate, nper);
  let fv = 0;
  if (rate) {
    fv = (pmt * (1 + rate * type) * (1 - pow)) / rate - pv * pow;
  } else {
    fv = -1 * (pv + pmt * nper);
  }
  return Number(fv.toFixed(2));
};

export function fv(rate, nper, pmt, pv, when) {
  const isRateZero = rate === 0;

  if (isRateZero) {
    return -(pv + pmt * nper);
  }

  const temp = (1 + rate) ** nper;
  return -pv * temp - ((pmt * (1 + rate * when)) / rate) * (temp - 1);
}

function _rbl(rate, per, pmt, pv, when) {
  return fv(rate, per - 1, pmt, pv, when);
}

export function pmt(rate, nper, pv, fv = 0, when) {
  const isRateZero = rate === 0;
  const temp = (1 + rate) ** nper;
  const maskedRate = isRateZero ? 1 : rate;
  const fact = isRateZero ? nper : ((1 + maskedRate * when) * (temp - 1)) / maskedRate;

  return -(fv + pv * temp) / fact;
}

export function ipmt(rate, per, nper, pv, fv = 0, when) {
  // Payments start at the first period, so payments before that
  // don't make any sense.
  if (per < 1) {
    return Number.NaN;
  }

  // If payments occur at the beginning of a period and this is the
  // first period, then no interest has accrued.
  if (when === 1 && per === 1) {
    return 0;
  }

  const totalPmt = pmt(rate, nper, pv, fv, when);
  let ipmtVal = _rbl(rate, per, totalPmt, pv, when) * rate;

  // If paying at the beginning we need to discount by one period
  if (when === 1 && per > 1) {
    ipmtVal = ipmtVal / (1 + rate);
  }

  return ipmtVal;
}

export function ppmt(rate, per, nper, pv, fv = 0, when) {
  const total = pmt(rate, nper, pv, fv, when);
  return total - ipmt(rate, per, nper, pv, fv, when);
}
