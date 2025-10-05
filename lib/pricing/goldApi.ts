type GoldApiResponse = {
  price: number;
};

export async function fetchGoldApiUSD(): Promise<{xauUsdPerOunce: number; xagUsdPerOunce: number}> {
  const key = process.env.GOLDAPI_KEY;
  if (!key) throw new Error('GOLDAPI_KEY not set');

  const headers = {'x-access-token': key, 'Content-Type': 'application/json'};

  const [xauRes, xagRes] = await Promise.all([
    fetch('https://www.goldapi.io/api/XAU/USD', {headers, next: {revalidate: 60}}),
    fetch('https://www.goldapi.io/api/XAG/USD', {headers, next: {revalidate: 60}})
  ]);

  const [xauJson, xagJson] = (await Promise.all([xauRes.json(), xagRes.json()])) as [GoldApiResponse, GoldApiResponse];

  if (!xauRes.ok) throw new Error('GoldAPI XAU error');
  if (!xagRes.ok) throw new Error('GoldAPI XAG error');

  return {xauUsdPerOunce: Number((xauJson as any).price), xagUsdPerOunce: Number((xagJson as any).price)};
}