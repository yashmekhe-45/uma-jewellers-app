import {NextResponse} from 'next/server';
import {computeKaratRates} from '@/utils/pricing';
import {getLatestRatesINR} from '@/lib/pricing';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  const manualGold = Number(process.env.GOLD_MANUAL_INR_PER_G || '0');
  const manualSilver = Number(process.env.SILVER_MANUAL_INR_PER_G || '0');

  let goldPerGram24k: number | null = null;
  let silverPerGram: number | null = null;
  let source: 'manual' | 'api' | 'mixed' = 'manual';

  try {
    const api = await getLatestRatesINR();
    goldPerGram24k = api.goldInrPerGram24k;
    silverPerGram = api.silverInrPerGram;
    source = 'api';
  } catch (e) {
    if (manualGold > 0) goldPerGram24k = manualGold;
    if (manualSilver > 0) silverPerGram = manualSilver;
    source = (manualGold > 0 || manualSilver > 0) ? 'manual' : 'manual';
  }

  if (!goldPerGram24k) {
    goldPerGram24k = manualGold > 0 ? manualGold : 6800;
    source = source === 'api' ? 'mixed' : source;
  }
  if (!silverPerGram) {
    silverPerGram = manualSilver > 0 ? manualSilver : 90;
    source = source === 'api' ? 'mixed' : source;
  }

  const karats = computeKaratRates(goldPerGram24k);

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    source,
    gold: {
      perGram: Math.round(goldPerGram24k),
      per10Gram: Math.round(goldPerGram24k * 10),
      karats
    },
    silver: {
      perGram: Math.round(silverPerGram),
      per10Gram: Math.round(silverPerGram * 10)
    }
  });
}