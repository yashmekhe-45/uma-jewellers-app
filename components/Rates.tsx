'use client';

import useSWR from 'swr';

type RatesResponse = {
  timestamp: string;
  source: 'manual' | 'api' | 'mixed';
  gold: {
    perGram: number;
    per10Gram: number;
    karats: {
      k24: number;
      k22: number;
      k18: number;
    };
  };
  silver: {
    perGram: number;
    per10Gram: number;
  };
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Rates() {
  const {data, error, isLoading} = useSWR<RatesResponse>('/api/prices/current', fetcher, {
    revalidateOnFocus: false
  });

  if (isLoading) return <div className="text-sm text-gray-500">Loading rates…</div>;
  if (error || !data) return <div className="text-sm text-red-600">Failed to load rates</div>;

  const g = data.gold;
  const s = data.silver;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border p-4">
        <div className="font-medium">Gold (INR)</div>
        <div className="mt-2 text-sm grid grid-cols-3 gap-2">
          <RateLine label="24K/g" value={g.karats.k24} />
          <RateLine label="22K/g" value={g.karats.k22} />
          <RateLine label="18K/g" value={g.karats.k18} />
        </div>
        <div className="mt-3 text-xs text-gray-500">10g: ₹{g.per10Gram.toFixed(0)}</div>
      </div>

      <div className="rounded-lg border p-4">
        <div className="font-medium">Silver (INR)</div>
        <div className="mt-2 text-sm">
          <RateLine label="Per g" value={s.perGram} />
          <div className="mt-2 text-xs text-gray-500">10g: ₹{s.per10Gram.toFixed(0)}</div>
        </div>
      </div>

      <div className="col-span-full text-xs text-gray-500">
        Source: {data.source}; Updated: {new Date(data.timestamp).toLocaleString()}
      </div>
    </div>
  );
}

function RateLine({label, value}: {label: string; value: number}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">₹{value.toFixed(0)}</span>
    </div>
  );
}