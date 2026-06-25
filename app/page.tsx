'use client';

import Link from 'next/link';
import { Search, Star, Shield, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import { CategoryGrid } from '@/components/blocks/CategoryGrid';
import { ProCard } from '@/components/blocks/ProCard';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { CATEGORIES, PROS, INDICATIVE_PRICES } from '@/lib/mock-data';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { lang } = useApp();
  const { t } = useTranslation(lang);
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('onboarding_done')) {
      router.replace('/onboarding');
    }
  }, [router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const featuredPros = PROS.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="text-white relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
        />
        {/* Dark overlay so text is readable */}
        <div className="absolute inset-0 bg-[#111827]/70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/20 text-[#10B981] text-sm font-medium px-3 py-1.5 rounded-full mb-6">
              <span>🇹🇳</span> Tunisia&apos;s #1 Home Services Platform
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4">
              {lang === 'dr' ? (
                <span className="font-arabic">الحرفيين المضمونين،<br /><span className="text-[#10B981]">قريبين منك.</span></span>
              ) : (
                <>Les pros du quotidien,<br /><span className="text-[#10B981]">à portée de main.</span></>
              )}
            </h1>
            <p className={`text-[#6B7280] text-lg mb-8 leading-relaxed ${lang === 'dr' ? 'font-arabic' : ''}`}>
              {t('tagline_sub')}
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-3 max-w-xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={20} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('search_placeholder')}
                  className={`w-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-[#6B7280] rounded-[12px] pl-12 pr-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all ${lang === 'dr' ? 'text-right font-arabic' : ''}`}
                />
              </div>
              <Button type="submit" size="lg" className="flex-shrink-0 px-4 sm:px-8">
                <Search size={20} className="sm:hidden" />
                <span className="hidden sm:inline">{t('search')}</span>
              </Button>
            </form>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-8 flex-wrap">
              {[
                { label: lang === 'dr' ? 'حرفي موثوق' : 'Pros vérifiés', value: '500+' },
                { label: lang === 'dr' ? 'حجز ناجح' : 'Réservations', value: '12k+' },
                { label: lang === 'dr' ? 'تقييم متوسط' : 'Note moyenne', value: '4.8★' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-display font-bold text-[#10B981]">{stat.value}</p>
                  <p className={`text-xs text-[#6B7280] ${lang === 'dr' ? 'font-arabic' : ''}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Categories */}
        <section className="py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-display font-bold text-[#111827] ${lang === 'dr' ? 'font-arabic' : ''}`}>
              {lang === 'dr' ? 'اختار الخدمة' : 'Nos services'}
            </h2>
            <Link href="/search" className="flex items-center gap-1 text-sm text-[#10B981] font-semibold hover:gap-2 transition-all">
              {t('view_all')} <ArrowRight size={14} />
            </Link>
          </div>
          <CategoryGrid categories={CATEGORIES} />
        </section>

        {/* How it works */}
        <section className="py-10 bg-white rounded-[24px] px-6 sm:px-10 mb-10">
          <h2 className={`text-xl font-display font-bold text-[#111827] mb-6 text-center ${lang === 'dr' ? 'font-arabic' : ''}`}>
            {t('how_it_works')}
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {[
              { icon: Search, title: t('step1_title'), desc: t('step1_desc'), num: '01' },
              { icon: Clock, title: t('step2_title'), desc: t('step2_desc'), num: '02' },
              { icon: Star, title: t('step3_title'), desc: t('step3_desc'), num: '03' },
            ].map(step => (
              <div key={step.num} className="flex flex-col items-center text-center gap-2">
                <div className="relative mb-1">
                  <div className="w-14 h-14 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                    <step.icon size={22} className="text-[#10B981]" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 text-[10px] font-bold text-[#111827] bg-[#10B981] rounded-full flex items-center justify-center leading-none">
                    {step.num.replace('0', '')}
                  </span>
                </div>
                <h3 className={`font-semibold text-[#111827] text-xs sm:text-sm leading-tight ${lang === 'dr' ? 'font-arabic' : ''}`}>{step.title}</h3>
                <p className={`hidden sm:block text-xs text-[#6B7280] leading-relaxed ${lang === 'dr' ? 'font-arabic' : ''}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Pros */}
        <section className="py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-display font-bold text-[#111827] ${lang === 'dr' ? 'font-arabic' : ''}`}>
              {t('featured_pros')}
            </h2>
            <Link href="/search" className="flex items-center gap-1 text-sm text-[#10B981] font-semibold hover:gap-2 transition-all">
              {t('view_all')} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="-mx-4 sm:mx-0 overflow-x-auto scrollbar-hide sm:overflow-visible">
            <div className="flex gap-3 px-4 pb-2 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
              {featuredPros.map(pro => (
                <div key={pro.id} className="flex-shrink-0 w-44 sm:w-auto">
                  <ProCard pro={pro} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Indicative Prices */}
        <section className="py-10">
          <h2 className={`text-xl font-display font-bold text-[#111827] mb-4 ${lang === 'dr' ? 'font-arabic' : ''}`}>
            {t('indicative_prices')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {INDICATIVE_PRICES.map(price => {
              const cat = CATEGORIES.find(c => c.slug === price.category);
              if (!cat) return null;
              return (
                <Link key={price.category} href={`/search?category=${price.category}`}>
                  <div className="bg-white rounded-[16px] px-4 py-3 border border-[#E5E7EB] hover:border-[#10B981] hover:shadow-sm transition-all flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${cat.color}22` }}
                    >
                      <span className="text-xl leading-none">{cat.icon}</span>
                    </div>
                    <span className={`text-sm font-medium text-[#111827] flex-1 ${lang === 'dr' ? 'font-arabic' : ''}`}>
                      {lang === 'dr' ? cat.name_dr : cat.name_fr}
                    </span>
                    <span className="text-sm font-bold text-[#10B981] flex-shrink-0">{price.min}–{price.max} DT</span>
                    <ChevronRight size={14} className="text-[#6B7280] flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Join as Pro CTA */}
        <section className="py-10 mb-10">
          <div className="bg-[#111827] rounded-[24px] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h2 className={`text-2xl sm:text-3xl font-display font-bold text-white mb-3 ${lang === 'dr' ? 'font-arabic' : ''}`}>
                {t('join_title')}
              </h2>
              <p className={`text-[#6B7280] mb-4 max-w-md ${lang === 'dr' ? 'font-arabic' : ''}`}>
                {t('join_desc')}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <Shield size={14} className="text-[#10B981]" />
                  <span className={lang === 'dr' ? 'font-arabic' : ''}>{t('commission_rate')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <Star size={14} className="text-[#10B981]" />
                  <span className={lang === 'dr' ? 'font-arabic' : ''}>{t('subscription_label')}</span>
                </div>
              </div>
            </div>
            <Link href="/auth/register-pro" className="flex-shrink-0">
              <Button size="lg" className="whitespace-nowrap">
                <span className={lang === 'dr' ? 'font-arabic' : ''}>{t('join_as_pro')}</span>
                <ChevronRight size={18} />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
