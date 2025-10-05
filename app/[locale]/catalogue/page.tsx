import {useTranslations} from 'next-intl';

export default function CataloguePage() {
  const t = useTranslations('Nav');
  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <h1 className="text-2xl font-semibold">{t('catalogue')}</h1>
      <p className="text-gray-600 mt-2">Coming soon: Product listing, filters and details.</p>
    </div>
  );
}