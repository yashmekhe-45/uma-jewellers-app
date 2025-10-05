import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import Rates from '@/components/Rates';
import {SHOP, whatsappLinks} from '@/config/shop';

export default function HomePage() {
  const t = useTranslations('Home');
  const locale = useLocale();

  const wa = whatsappLinks('Hello Uma Jewellers, I would like to know about today’s rates and designs.');

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <section className="rounded-xl bg-gradient-to-br from-brand-gold/20 to-amber-50 border border-amber-200 p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-brand-dark">
          {t('headline')}
        </h1>
        <p className="mt-2 text-gray-700">{t('sub')}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/catalogue`}
            className="inline-flex items-center rounded-lg bg-brand-gold px-4 py-2 text-white hover:opacity-90"
          >
            {t('viewCatalogue')}
          </Link>
          <Link
            href={`/${locale}/workshop`}
            className="inline-flex items-center rounded-lg border border-brand-gold px/4 py-2 text-brand-dark hover:bg-amber-50"
          >
            {t('visitWorkshop')}
          </Link>
          <a
            href={wa[0]}
            target="_blank"
            className="inline-flex items-center rounded-lg border border-green-600 px-4 py-2 text-green-700 hover:bg-green-50"
          >
            WhatsApp
          </a>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">{t('todayRates')}</h2>
        <p className="text-sm text-gray-500">{t('rateNote')}</p>
        <div className="mt-4">
          <Rates />
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <InfoCard title={t('hallmarkTitle')} body={t('hallmarkBody')} />
        <InfoCard title={t('addressTitle')} body={SHOP.addressLine} />
        <InfoCard title={t('contactTitle')} body={`WhatsApp: ${SHOP.whatsappNumbers.join(', ')}`} />
      </section>
    </div>
  );
}

function InfoCard({title, body}: {title: string; body: string}) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{body}</p>
    </div>
  );
}