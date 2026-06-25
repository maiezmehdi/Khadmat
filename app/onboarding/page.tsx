'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { useApp } from '@/lib/context';
import { LangSwitch } from '@/components/ui/LangSwitch';
import { cn } from '@/lib/utils';

const SLIDES = [
  {
    emoji: '🔍',
    title_fr: 'Trouvez le bon pro',
    title_dr: 'لقى الحرفي المناسب',
    desc_fr: 'Des centaines de professionnels vérifiés près de chez vous, disponibles 7j/7.',
    desc_dr: 'مئات الحرفيين الموثوقين قريبين منك، متاحين كل أيام.',
    bg: '#111827',
    glow: '#10B981',
    accent: '#10B981',
  },
  {
    emoji: '📅',
    title_fr: 'Réservez en 2 clics',
    title_dr: 'احجز بضغطتين فقط',
    desc_fr: 'Choisissez votre créneau, confirmez et c\'est parti. Simple et rapide.',
    desc_dr: 'اختار الوقت المناسب وأكد — وهاك ! بسيط وسريع.',
    bg: '#0D1F16',
    glow: '#16A34A',
    accent: '#16A34A',
  },
  {
    emoji: '🛡️',
    title_fr: 'Pros vérifiés & sécurisés',
    title_dr: 'حرفيين موثوقين وآمنين',
    desc_fr: 'Identités vérifiées, paiement sécurisé et avis clients authentiques.',
    desc_dr: 'هويات موثوقة، دفع آمن وتقييمات حقيقية من العملاء.',
    bg: '#111128',
    glow: '#10B981',
    accent: '#10B981',
  },
];

export default function OnboardingPage() {
  const { lang } = useApp();
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const slide = SLIDES[current];
  const isLast = current === SLIDES.length - 1;

  // intentionally no redirect — onboarding is always accessible

  const goTo = (index: number) => {
    if (fading || index === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 200);
  };

  const goNext = () => {
    if (isLast) finish();
    else goTo(current + 1);
  };

  const finish = () => {
    localStorage.setItem('onboarding_done', '1');
    router.push('/auth/login');
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0 && !isLast) goTo(current + 1);
      if (dx > 0 && current > 0) goTo(current - 1);
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col select-none transition-colors duration-500"
      style={{ backgroundColor: slide.bg }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${slide.glow}18, transparent)`,
        }}
      />

      {/* Top bar */}
      <div className="relative flex items-center justify-between px-6 pt-safe pt-8 pb-2">
        <LangSwitch />
        <button
          onClick={finish}
          className="text-white/40 text-sm font-medium px-3 py-1 rounded-full hover:text-white/70 transition-colors"
        >
          {lang === 'dr' ? 'تخطى' : 'Passer'}
        </button>
      </div>

      {/* Slide content */}
      <div
        className={cn(
          'relative flex-1 flex flex-col items-center justify-center px-8 text-center transition-opacity duration-200',
          fading ? 'opacity-0' : 'opacity-100'
        )}
      >
        {/* Illustration */}
        <div
          className="w-36 h-36 rounded-[36px] flex items-center justify-center text-7xl mb-10 transition-all duration-500"
          style={{
            background: `${slide.accent}12`,
            border: `1.5px solid ${slide.accent}25`,
            boxShadow: `0 0 80px ${slide.glow}35, 0 8px 32px rgba(0,0,0,0.4)`,
          }}
        >
          {slide.emoji}
        </div>

        <h1
          className={cn(
            'text-3xl font-display font-bold text-white mb-4 leading-tight',
            lang === 'dr' ? 'font-arabic' : ''
          )}
        >
          {lang === 'dr' ? slide.title_dr : slide.title_fr}
        </h1>

        <p
          className={cn(
            'text-white/55 text-[15px] leading-relaxed max-w-[280px]',
            lang === 'dr' ? 'font-arabic' : ''
          )}
        >
          {lang === 'dr' ? slide.desc_dr : slide.desc_fr}
        </p>
      </div>

      {/* Bottom controls */}
      <div className="relative px-6 pb-safe pb-10">
        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '28px' : '8px',
                height: '8px',
                background: i === current ? slide.accent : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={goNext}
          className="w-full rounded-[16px] py-4 font-semibold text-base flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98]"
          style={{ background: slide.accent, color: '#111827' }}
        >
          <span className={lang === 'dr' ? 'font-arabic' : ''}>
            {isLast
              ? lang === 'dr' ? 'ابدأ الآن' : 'Commencer'
              : lang === 'dr' ? 'التالي' : 'Suivant'}
          </span>
          {!isLast && <ChevronRight size={18} strokeWidth={2.5} />}
        </button>

        {/* Already have account */}
        {isLast && (
          <p className="text-center text-sm text-white/40 mt-4">
            <span className={lang === 'dr' ? 'font-arabic' : ''}>
              {lang === 'dr' ? 'عندك حساب؟ ' : 'Déjà un compte ? '}
            </span>
            <button
              onClick={finish}
              className="font-semibold"
              style={{ color: slide.accent }}
            >
              {lang === 'dr' ? 'ادخل' : 'Se connecter'}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
