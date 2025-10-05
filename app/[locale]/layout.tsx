import '../globals.css';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import NavBar from '@/components/NavBar';
import {SHOP} from '@/config/shop';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'mr'}, {locale: 'hi'}];
}

export const metadata = {
  title: 'Uma Jewellers - Beed',
  description: 'Gold, Silver, Diamond | Uma Jewellers, Beed, Maharashtra'
};

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: 'en' | 'mr' | 'hi'};
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#B8860B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6 text-center text-sm text-gray-600">
              <div className="mx-auto max-w-6xl px-4">
                <div className="font-medium">{SHOP.name}</div>
                <div className="mt-1">{SHOP.addressLine}</div>
                <div className="mt-1">Hours: {SHOP.hours} • Weekly off: {SHOP.weeklyOff}</div>
              </div>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}