'use client';

import Link from 'next/link';
import { Search, Star, Shield, Clock, ChevronRight, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { CategoryGrid } from '@/components/blocks/CategoryGrid';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { ProCard } from '@/components/blocks/ProCard';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { CATEGORIES, PROS, INDICATIVE_PRICES } from '@/lib/mock-data';
import { useState, useEffect, useRef, useCallback } from 'react';
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

interface AiSuggestion {
  category: string | null;
  confidence: 'high' | 'medium' | 'low';
  label_fr?: string;
  label_dr?: string;
}

export default function HomePage() {
  const { lang } = useApp();
  const { t } = useTranslation(lang);
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<AiSuggestion | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('onboarding_done')) {
      router.replace('/onboarding');
    }
  }, [router]);

  const fetchAiSuggestion = useCallback(async (q: string) => {
    if (q.trim().length < 3) {
      setAiSuggestion(null);
      return;
    }
    setAiLoading(true);
    try {
      const res = await fetch('/api/search-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      setAiSuggestion(data.category ? data : null);
    } catch {
      setAiSuggestion(null);
    } finally {
      setAiLoading(false);
    }
  }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setAiSuggestion(null);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => fetchAiSuggestion(val), 700);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiSuggestion?.category && aiSuggestion.confidence !== 'low') {
      router.push(`/search?category=${aiSuggestion.category}&q=${encodeURIComponent(query)}`);
    } else {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = () => {
    if (aiSuggestion?.category) {
      router.push(`/search?category=${aiSuggestion.category}&q=${encodeURIComponent(query)}`);
    }
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
              <div className="flex items-center bg-white rounded-[16px] shadow-2xl gap-2 pr-2">
                <div className={`flex items-center gap-3 flex-1 px-4 py-3.5 ${lang === 'dr' ? 'flex-row-reverse' : ''}`}>
                  {aiLoading ? (
                    <Loader2 size={20} className="text-[#10B981] flex-shrink-0 animate-spin" />
                  ) : (
                    <Search size={20} className="text-[#9CA3AF] flex-shrink-0" />
                  )}
                  <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder={t('search_placeholder')}
                    className={`flex-1 bg-transparent text-[#111827] placeholder:text-[#9CA3AF] text-base outline-none min-w-0 ${lang === 'dr' ? 'text-right font-arabic' : ''}`}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#10B981] hover:bg-[#059669] active:scale-95 text-white rounded-[10px] px-4 py-2.5 font-semibold text-sm transition-all flex-shrink-0 flex items-center gap-1.5"
                >
                  <span className={`hidden sm:inline ${lang === 'dr' ? 'font-arabic' : ''}`}>{t('search')}</span>
                  <ArrowRight size={17} />
                </button>
              </div>
              {/* AI Suggestion */}
              <AnimatePresence>
                {aiSuggestion?.category && (
                  <motion.button
                    type="button"
                    onClick={handleSuggestionClick}
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 flex items-center gap-2 bg-[#10B981]/15 hover:bg-[#10B981]/25 border border-[#10B981]/30 text-white rounded-[12px] px-3 py-2 text-sm transition-colors w-full text-left"
                  >
                    <Sparkles size={14} className="text-[#10B981] flex-shrink-0" />
                    <span className="text-white/80 text-xs">
                      {lang === 'dr' ? 'الذكاء الاصطناعي يقترح:' : 'IA suggère :'}
                    </span>
                    <span className={`font-semibold text-white flex items-center gap-1.5 ${lang === 'dr' ? 'font-arabic' : ''}`}>
                      {(() => {
                        const cat = CATEGORIES.find(c => c.slug === aiSuggestion.category);
                        return (
                          <>
                            {cat && <CategoryIcon slug={cat.slug} size={13} color="#10B981" />}
                            {lang === 'dr' ? (aiSuggestion.label_dr || cat?.name_dr) : (aiSuggestion.label_fr || cat?.name_fr)}
                          </>
                        );
                      })()}
                    </span>
                    <ArrowRight size={13} className="text-[#10B981] ml-auto flex-shrink-0" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.form>

            {/* Stats */}
            <motion.div variants={stagger} className="flex items-center gap-6 mt-8 flex-wrap">
              {[
                { label: lang === 'dr' ? 'حرفي موثوق' : 'Pros vérifiés', value: '500+', gold: false },
                { label: lang === 'dr' ? 'حجز ناجح' : 'Réservations', value: '12k+', gold: false },
                { label: lang === 'dr' ? 'تقييم متوسط' : 'Note moyenne', value: '4.8★', gold: true },
              ].map(stat => (
                <motion.div key={stat.label} variants={fadeUp} className="text-center">
                  <p className={`text-2xl font-display font-bold ${stat.gold ? 'text-[#F59E0B]' : 'text-white'}`}>{stat.value}</p>
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
                        <CategoryIcon slug={cat.slug} size={20} color={cat.color} />
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

        {/* Ooredoo Ad Banner */}
        <motion.section className="mb-10" variants={fadeUp} {...inView}>
          <p className="text-[10px] text-[#9CA3AF] uppercase tracking-widest mb-2 px-1">
            {lang === 'dr' ? 'إعلان ممول' : 'Annonce sponsorisée'}
          </p>
          <a href="https://www.ooredoo.tn" target="_blank" rel="noopener noreferrer" className="block">
            <img
              src="/ooredoo-banner.png"
              alt="Ooredoo — FIFA World Cup Qatar 2022"
              className="w-full rounded-[16px] object-cover shadow-md hover:opacity-95 transition-opacity"
            />
          </a>
        </motion.section>

      </div>
    </div>
  );
}
