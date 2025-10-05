export function computeKaratRates(perGram24k: number) {
  const k24 = perGram24k;
  const k22 = perGram24k * 0.9167;
  const k18 = perGram24k * 0.75;
  return {
    k24: round0(k24),
    k22: round0(k22),
    k18: round0(k18)
  };
}

function round0(n: number) {
  return Math.round(n);
}

export function ounceToGram(pricePerOunceInInr: number) {
  return pricePerOunceInInr / 31.1034768;
}