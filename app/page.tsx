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
      <section className="bg-[#1A1614] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #F5A623 0%, transparent 50%), radial-gradient(circle at 80% 20%, #F5A623 0%, transparent 40%)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#F5A623]/20 text-[#F5A623] text-sm font-medium px-3 py-1.5 rounded-full mb-6">
              <span>🇹🇳</span> Tunisia&apos;s #1 Home Services Platform
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4">
              {lang === 'dr' ? (
                <span className="font-arabic">الحرفيين المضمونين،<br /><span className="text-[#F5A623]">قريبين منك.</span></span>
              ) : (
                <>Les pros du quotidien,<br /><span className="text-[#F5A623]">à portée de main.</span></>
              )}
            </h1>
            <p className={`text-[#9C9189] text-lg mb-8 leading-relaxed ${lang === 'dr' ? 'font-arabic' : ''}`}>
              {t('tagline_sub')}
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-3 max-w-xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C9189]" size={20} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('search_placeholder')}
                  className={`w-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-[#9C9189] rounded-[12px] pl-12 pr-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent transition-all ${lang === 'dr' ? 'text-right font-arabic' : ''}`}
                />
              </div>
              <Button type="submit" size="lg" className="flex-shrink-0">
                {t('search')}
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
                  <p className="text-2xl font-display font-bold text-[#F5A623]">{stat.value}</p>
                  <p className={`text-xs text-[#9C9189] ${lang === 'dr' ? 'font-arabic' : ''}`}>{stat.label}</p>
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
            <h2 className={`text-xl font-display font-bold text-[#1A1614] ${lang === 'dr' ? 'font-arabic' : ''}`}>
              {lang === 'dr' ? 'اختار الخدمة' : 'Nos services'}
            </h2>
            <Link href="/search" className="flex items-center gap-1 text-sm text-[#F5A623] font-semibold hover:gap-2 transition-all">
              {t('view_all')} <ArrowRight size={14} />
            </Link>
          </div>
          <CategoryGrid categories={CATEGORIES} />
        </section>

        {/* How it works */}
        <section className="py-10 bg-white rounded-[24px] px-6 sm:px-10 mb-10">
          <h2 className={`text-xl font-display font-bold text-[#1A1614] mb-8 text-center ${lang === 'dr' ? 'font-arabic' : ''}`}>
            {t('how_it_works')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Search, title: t('step1_title'), desc: t('step1_desc'), num: '01' },
              { icon: Clock, title: t('step2_title'), desc: t('step2_desc'), num: '02' },
              { icon: Star, title: t('step3_title'), desc: t('step3_desc'), num: '03' },
            ].map(step => (
              <div key={step.num} className="flex flex-col items-center text-center gap-3">
                <div className="relative">
                  <div className="w-16 h-16 bg-[#F5A623]/10 rounded-[16px] flex items-center justify-center">
                    <step.icon size={28} className="text-[#F5A623]" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-bold text-[#9C9189]">{step.num}</span>
                </div>
                <h3 className={`font-semibold text-[#1A1614] ${lang === 'dr' ? 'font-arabic' : ''}`}>{step.title}</h3>
                <p className={`text-sm text-[#9C9189] leading-relaxed ${lang === 'dr' ? 'font-arabic' : ''}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Pros */}
        <section className="py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-display font-bold text-[#1A1614] ${lang === 'dr' ? 'font-arabic' : ''}`}>
              {t('featured_pros')}
            </h2>
            <Link href="/search" className="flex items-center gap-1 text-sm text-[#F5A623] font-semibold hover:gap-2 transition-all">
              {t('view_all')} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {featuredPros.map(pro => (
              <ProCard key={pro.id} pro={pro} />
            ))}
          </div>
        </section>

        {/* Indicative Prices */}
        <section className="py-10">
          <h2 className={`text-xl font-display font-bold text-[#1A1614] mb-6 ${lang === 'dr' ? 'font-arabic' : ''}`}>
            {t('indicative_prices')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {INDICATIVE_PRICES.map(price => {
              const cat = CATEGORIES.find(c => c.slug === price.category);
              if (!cat) return null;
              return (
                <Link key={price.category} href={`/search?category=${price.category}`}>
                  <div className="bg-white rounded-[16px] p-4 border border-[#E0DDD8] hover:border-[#F5A623] hover:shadow-sm transition-all text-center">
                    <span className="text-2xl">{cat.icon}</span>
                    <p className={`text-xs font-medium text-[#1A1614] mt-2 mb-1 ${lang === 'dr' ? 'font-arabic' : ''}`}>
                      {lang === 'dr' ? cat.name_dr : cat.name_fr}
                    </p>
                    <p className="text-xs text-[#9C9189]">{price.min}–{price.max} DT</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Join as Pro CTA */}
        <section className="py-10 mb-10">
          <div className="bg-[#1A1614] rounded-[24px] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h2 className={`text-2xl sm:text-3xl font-display font-bold text-white mb-3 ${lang === 'dr' ? 'font-arabic' : ''}`}>
                {t('join_title')}
              </h2>
              <p className={`text-[#9C9189] mb-4 max-w-md ${lang === 'dr' ? 'font-arabic' : ''}`}>
                {t('join_desc')}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-[#9C9189]">
                  <Shield size={14} className="text-[#F5A623]" />
                  <span className={lang === 'dr' ? 'font-arabic' : ''}>{t('commission_rate')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#9C9189]">
                  <Star size={14} className="text-[#F5A623]" />
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
