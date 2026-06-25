'use client';

import Link from 'next/link';
import { Search, Star, Shield, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { CategoryGrid } from '@/components/blocks/CategoryGrid';
import { ProCard } from '@/components/blocks/ProCard';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { CATEGORIES, PROS, INDICATIVE_PRICES } from '@/lib/mock-data';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const inView = { initial: 'hidden', whileInView: 'visible' as const, viewport: { once: true, margin: '-60px' } };

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
          <motion.div className="max-w-2xl" variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#10B981]/20 text-[#10B981] text-sm font-medium px-3 py-1.5 rounded-full mb-6">
              <span>🇹🇳</span> Tunisia&apos;s #1 Home Services Platform
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4">
              {lang === 'dr' ? (
                <span className="font-arabic">الحرفيين المضمونين،<br /><span className="text-[#10B981]">قريبين منك.</span></span>
              ) : (
                <>Les pros du quotidien,<br /><span className="text-[#10B981]">à portée de main.</span></>
              )}
            </motion.h1>
            <motion.p variants={fadeUp} className={`text-white/70 text-lg mb-8 leading-relaxed ${lang === 'dr' ? 'font-arabic' : ''}`}>
              {t('tagline_sub')}
            </motion.p>

            {/* Search Bar */}
            <motion.form variants={fadeUp} onSubmit={handleSearch} className="max-w-xl">
              <div className="flex items-center bg-white rounded-[16px] shadow-2xl overflow-hidden">
                <div className={`flex items-center gap-3 flex-1 px-4 py-3.5 ${lang === 'dr' ? 'flex-row-reverse' : ''}`}>
                  <Search size={20} className="text-[#9CA3AF] flex-shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('search_placeholder')}
                    className={`flex-1 bg-transparent text-[#111827] placeholder:text-[#9CA3AF] text-base outline-none min-w-0 ${lang === 'dr' ? 'text-right font-arabic' : ''}`}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#10B981] hover:bg-[#059669] text-white h-full px-5 py-3.5 font-semibold text-sm transition-colors flex items-center gap-1.5 flex-shrink-0"
                >
                  <span className={lang === 'dr' ? 'font-arabic' : ''}>{t('search')}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.form>

            {/* Stats */}
            <motion.div variants={stagger} className="flex items-center gap-6 mt-8 flex-wrap">
              {[
                { label: lang === 'dr' ? 'حرفي موثوق' : 'Pros vérifiés', value: '500+' },
                { label: lang === 'dr' ? 'حجز ناجح' : 'Réservations', value: '12k+' },
                { label: lang === 'dr' ? 'تقييم متوسط' : 'Note moyenne', value: '4.8★' },
              ].map(stat => (
                <motion.div key={stat.label} variants={fadeUp} className="text-center">
                  <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
                  <p className={`text-xs text-white/60 ${lang === 'dr' ? 'font-arabic' : ''}`}>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Categories */}
        <motion.section className="py-10" variants={stagger} {...inView}>
          <motion.div variants={fadeUp} className="flex items-start justify-between mb-1">
            <div>
              <h2 className={`text-xl font-display font-bold text-[#111827] ${lang === 'dr' ? 'font-arabic' : ''}`}>
                {lang === 'dr' ? 'اختار الخدمة' : 'Nos services'}
              </h2>
              <p className={`text-sm text-[#6B7280] mt-0.5 ${lang === 'dr' ? 'font-arabic' : ''}`}>
                {lang === 'dr' ? 'كل الحرفيين اللي تحتاجهم' : 'Tous les artisans dont vous avez besoin'}
              </p>
            </div>
            <Link href="/search" className="flex items-center gap-1 text-sm text-[#10B981] font-semibold hover:gap-2 transition-all mt-1">
              {t('view_all')} <ArrowRight size={14} />
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-5">
            <CategoryGrid categories={CATEGORIES} />
          </motion.div>
        </motion.section>

        {/* How it works */}
        <motion.section className="py-10 mb-10 bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5] rounded-[24px] px-6 sm:px-10" variants={stagger} {...inView}>
          <motion.div variants={fadeUp} className="text-center mb-8">
            <h2 className={`text-xl font-display font-bold text-[#111827] mb-1.5 ${lang === 'dr' ? 'font-arabic' : ''}`}>
              {t('how_it_works')}
            </h2>
            <p className={`text-sm text-[#6B7280] ${lang === 'dr' ? 'font-arabic' : ''}`}>
              {lang === 'dr' ? '٣ خطوات بسيطة تلقى الحرفي متاعك' : '3 étapes simples pour trouver votre artisan'}
            </p>
          </motion.div>
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {[
              { icon: Search, title: t('step1_title'), desc: t('step1_desc'), color: '#10B981', bg: '#10B981' },
              { icon: Clock,  title: t('step2_title'), desc: t('step2_desc'), color: '#3B82F6', bg: '#3B82F6' },
              { icon: Star,   title: t('step3_title'), desc: t('step3_desc'), color: '#F59E0B', bg: '#F59E0B' },
            ].map(step => (
              <motion.div key={step.color} variants={fadeUp} className="bg-white rounded-[20px] p-4 sm:p-6 flex flex-col items-center text-center gap-3 shadow-sm border border-white">
                <div
                  className="w-14 h-14 rounded-[16px] flex items-center justify-center"
                  style={{ backgroundColor: `${step.bg}15` }}
                >
                  <step.icon size={24} style={{ color: step.color }} />
                </div>
                <h3 className={`font-semibold text-[#111827] text-xs sm:text-sm leading-tight ${lang === 'dr' ? 'font-arabic' : ''}`}>{step.title}</h3>
                <p className={`hidden sm:block text-xs text-[#6B7280] leading-relaxed ${lang === 'dr' ? 'font-arabic' : ''}`}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Pros */}
        <motion.section className="py-10" variants={stagger} {...inView}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-display font-bold text-[#111827] ${lang === 'dr' ? 'font-arabic' : ''}`}>
              {t('featured_pros')}
            </h2>
            <Link href="/search" className="flex items-center gap-1 text-sm text-[#10B981] font-semibold hover:gap-2 transition-all">
              {t('view_all')} <ArrowRight size={14} />
            </Link>
          </motion.div>
          <div className="-mx-4 sm:mx-0 overflow-x-auto scrollbar-hide sm:overflow-visible">
            <div className="flex gap-3 px-4 pb-2 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
              {featuredPros.map((pro, i) => (
                <motion.div
                  key={pro.id}
                  variants={fadeUp}
                  transition={{ delay: i * 0.07 }}
                  className="flex-shrink-0 w-44 sm:w-auto"
                >
                  <ProCard pro={pro} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Indicative Prices */}
        <motion.section className="py-10" variants={stagger} {...inView}>
          <motion.h2 variants={fadeUp} className={`text-xl font-display font-bold text-[#111827] mb-4 ${lang === 'dr' ? 'font-arabic' : ''}`}>
            {t('indicative_prices')}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {INDICATIVE_PRICES.map((price, i) => {
              const cat = CATEGORIES.find(c => c.slug === price.category);
              if (!cat) return null;
              return (
                <motion.div key={price.category} variants={fadeUp} transition={{ delay: i * 0.05 }}>
                  <Link href={`/search?category=${price.category}`}>
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
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Join as Pro CTA */}
        <motion.section className="py-10 mb-10" variants={fadeUp} {...inView}>
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
        </motion.section>
      </div>
    </div>
  );
}
