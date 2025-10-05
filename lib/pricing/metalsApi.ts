type InrMode = {mode: 'inr'; xauInrPerOunce: number; xagInrPerOunce: number};
type UsdMode = {mode: 'usd'; xauUsdPerOunce: number; xagUsdPerOunce: number};

export async function fetchMetalsApiINR(): Promise<InrMode | UsdMode> {
  const key = process.env.METALS_API_KEY;
  if (!key) throw new Error('METALS_API_KEY not set');

  const inrUrl = `https://metals-api.com/api/latest?access_key=${encodeURIComponent(
    key
  )}&base=INR&symbols=XAU,XAG`;
  let res = await fetch(inrUrl, {next: {revalidate: 60}});
  let json: any = await res.json();

  if (res.ok && json && json.success !== false && json.rates?.XAU && json.rates?.XAG) {
    return {
      mode: 'inr',
      xauInrPerOunce: Number(json.rates.XAU),
      xagInrPerOunce: Number(json.rates.XAG)
    };
  }

  const usdUrl = `https://metals-api.com/api/latest?access_key=${encodeURIComponent(
    key
  )}&base=USD&symbols=XAU,XAG`;
  res = await fetch(usdUrl, {next: {revalidate: 60}});
  json = await res.json();

  if (!res.ok || json?.success === false || !json.rates?.XAU || !json.rates?.XAG) {
    const errorMsg = json?.error?.info || res.statusText || 'Metals-API error';
    throw new Error(errorMsg);
  }

  return {
    mode: 'usd',
    xauUsdPerOunce: Number(json.rates.XAU),
    xagUsdPerOunce: Number(json.rates.XAG)
  };
}