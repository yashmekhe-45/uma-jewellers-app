'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import {usePathname} from 'next/navigation';

export default function NavBar() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();

  const base = `/${locale}`;

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-4">
        <Link href={base} className="flex items-center gap-2">
          <span className="inline-block h-8 w-8 rounded-full bg-brand-gold" />
          <div className="leading-tight">
            <div className="font-semibold">Uma Jewellers</div>
            <div className="text-xs text-gray-500">Beed, Maharashtra</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href={base}
            className={linkCls(pathname === base)}
          >
            {t('home')}
          </Link>
          <Link
            href={`${base}/catalogue`}
            className={linkCls(pathname?.startsWith(`${base}/catalogue`))}
          >
            {t('catalogue')}
          </Link>
          <Link
            href={`${base}/workshop`}
            className={linkCls(pathname?.startsWith(`${base}/workshop`))}
          >
            {t('workshop')}
          </Link>
          <Link
            href={`${base}/admin`}
            className={linkCls(pathname?.startsWith(`${base}/admin`))}
          >
            {t('admin')}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

function linkCls(active?: boolean) {
  return [
    'text-sm hover:text-brand-gold',
    active ? 'text-brand-gold font-medium' : 'text-gray-700'
  ].join(' ');
}