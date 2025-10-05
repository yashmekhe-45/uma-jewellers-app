export async function fetchUsdInr(): Promise<number> {
  const url =
    process.env.FX_API_URL ||
    'https://api.exchangerate.host/latest?base=USD&symbols=INR';

  const res = await fetch(url, {next: {revalidate: 300}});
  const json = await res.json();

  if (!res.ok || !json?.rates?.INR) {
    throw new Error('Failed to fetch USD/INR rate');
  }
  return Number(json.rates.INR);
}