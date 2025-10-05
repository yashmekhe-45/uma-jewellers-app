'use client';

import {useLocale} from 'next-intl';
import {usePathname} from 'next/navigation';
import Link from 'next/link';

const localeLabels: Record<string, string> = {
  en: 'English',
  mr: 'मराठी',
  hi: 'हिंदी'
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname() || '/en';

  const pathWithoutLocale = pathname.replace(/^\/(en|mr|hi)/, '');

  return (
    <div className="flex items-center gap-2">
      {(['en', 'mr', 'hi'] as const).map((l) => (
        <Link
          key={l}
          href={`/${l}${pathWithoutLocale || '/'}`}
          prefetch={false}
          className={[
            'rounded px-2 py-1 text-xs border',
            l === locale ? 'bg-brand-gold text-white border-brand-gold' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          ].join(' ')}
        >
          {localeLabels[l]}
        </Link>
      ))}
    </div>
  );
}