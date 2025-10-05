import {fetchMetalsApiINR} from './metalsApi';
import {fetchGoldApiUSD} from './goldApi';
import {fetchUsdInr} from './fx';
import {ounceToGram} from '@/utils/pricing';

type Rates = { goldInrPerGram24k: number; silverInrPerGram: number };

export async function getLatestRatesINR(): Promise<Rates> {
  const provider = (process.env.PRICE_API_PROVIDER || 'metalsapi').toLowerCase();

  if (provider === 'metalsapi') {
    const result = await fetchMetalsApiINR();
    if (result.mode === 'inr') {
      const {xauInrPerOunce, xagInrPerOunce} = result;
      return {
        goldInrPerGram24k: ounceToGram(xauInrPerOunce),
        silverInrPerGram: ounceToGram(xagInrPerOunce)
      };
    } else {
      const {xauUsdPerOunce, xagUsdPerOunce} = result;
      const usdInr = await fetchUsdInr();
      return {
        goldInrPerGram24k: ounceToGram(xauUsdPerOunce * usdInr),
        silverInrPerGram: ounceToGram(xagUsdPerOunce * usdInr)
      };
    }
  }

  if (provider === 'goldapi') {
    const {xauUsdPerOunce, xagUsdPerOunce} = await fetchGoldApiUSD();
    const usdInr = await fetchUsdInr();
    return {
      goldInrPerGram24k: ounceToGram(xauUsdPerOunce * usdInr),
      silverInrPerGram: ounceToGram(xagUsdPerOunce * usdInr)
    };
  }

  throw new Error('Unsupported PRICE_API_PROVIDER');
}