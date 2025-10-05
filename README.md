# Uma Jewellers App (EN | MR | HI)

Multilingual PWA-ready app for Uma Jewellers (Beed, Maharashtra).

Includes:
- English, Marathi, Hindi via next-intl
- Home with live gold/silver rates (Metals-API or GoldAPI) with fallback to manual env values
- Basic navigation (Home, Catalogue, Workshop, Admin)
- PWA manifest scaffold
- Supabase client stub (for future auth/catalogue)
- Tailwind CSS
- Design mockups in `design-mockups/` to visualize screens

## WhatsApp, Hours, Address
Configured in `config/shop.ts`:
- WhatsApp: 9822670240, 9527506767, 9822874767
- Hours: 10:00 AM to 9:00 PM (Closed on Wednesday)
- Address: Uma Jewellers, Sarafa street, Dhondipura, Beed, Maharashtra 431122

## Live Bullion Prices
Default provider: Metals-API (recommended). Optional: GoldAPI.

- Metals-API:
  - Get a key: https://metals-api.com/
  - Set `PRICE_API_PROVIDER=metalsapi` and `METALS_API_KEY=your_key`
- GoldAPI:
  - Get a key: https://www.goldapi.io/
  - Set `PRICE_API_PROVIDER=goldapi` and `GOLDAPI_KEY=your_key`

The app fetches gold (24K) and silver in INR per gram. 22K and 18K are computed from 24K.
If live API fails, it falls back to manual env values.

## Prerequisites
- Node.js 18+
- pnpm or npm

## Setup
1) Install deps:
   - pnpm install
   - or: npm install
2) Copy `.env.local.example` to `.env.local` and fill values.
3) Run dev:
   - pnpm dev
   - or: npm run dev
4) Open http://localhost:3000/en

## Environment
- Live pricing:
  - PRICE_API_PROVIDER=metalsapi | goldapi
  - METALS_API_KEY=... (if using Metals-API)
  - GOLDAPI_KEY=... (if using GoldAPI)
  - FX_API_URL=https://api.exchangerate.host/latest?base=USD&symbols=INR (default)
- Optional manual fallback:
  - GOLD_MANUAL_INR_PER_G=6800
  - SILVER_MANUAL_INR_PER_G=90
- Supabase (for future Admin/Auth/Catalogue):
  - NEXT_PUBLIC_SUPABASE_URL=
  - NEXT_PUBLIC_SUPABASE_ANON_KEY=

## Roadmap
- Supabase auth + role-based admin (/[locale]/admin)
- Catalogue CRUD + media uploads
- Workshop module (designs + requests)
- CRON + bullion API fetch and computed pricing
- Deploy to Vercel + domain (umajewellers.in)
