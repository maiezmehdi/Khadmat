'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, X, Crown, TrendingUp, Shield, Zap, Headphones, Star, BarChart2, BadgeCheck, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/lib/context';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

type BillingCycle = 'monthly' | 'annual';
type PlanId = 'free' | 'basic' | 'premium';

interface Plan {
  id: PlanId;
  name_fr: string;
  name_dr: string;
  price_monthly: number;
  price_annual: number;
  commission: number;
  color: string;
  bgClass: string;
  borderClass: string;
  icon: LucideIcon;
  badge_fr?: string;
  badge_dr?: string;
  features: { fr: string; dr: string; included: boolean }[];
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name_fr: 'Gratuit',
    name_dr: 'مجاني',
    price_monthly: 0,
    price_annual: 0,
    commission: 15,
    color: '#6B7280',
    bgClass: 'bg-white',
    borderClass: 'border-[#E5E7EB]',
    icon: Shield,
    features: [
      { fr: 'Profil visible dans la recherche', dr: 'ملفك ظاهر في البحث', included: true },
      { fr: 'Accepter des réservations', dr: 'قبول الحجوزات', included: true },
      { fr: 'Commission 15%', dr: 'عمولة 15%', included: true },
      { fr: 'Badge pro certifié', dr: 'شارة حرفي موثوق', included: false },
      { fr: 'Statistiques & revenus', dr: 'إحصائيات ومداخيل', included: false },
      { fr: 'Mis en avant dans la recherche', dr: 'مُبرز في البحث', included: false },
      { fr: 'Support prioritaire', dr: 'دعم ذو أولوية', included: false },
    ],
  },
  {
    id: 'basic',
    name_fr: 'Basic',
    name_dr: 'أساسي',
    price_monthly: 30,
    price_annual: 25,
    commission: 12,
    color: '#3B82F6',
    bgClass: 'bg-white',
    borderClass: 'border-[#3B82F6]',
    icon: TrendingUp,
    badge_fr: 'Populaire',
    badge_dr: 'الأكثر طلباً',
    features: [
      { fr: 'Profil visible dans la recherche', dr: 'ملفك ظاهر في البحث', included: true },
      { fr: 'Accepter des réservations', dr: 'قبول الحجوزات', included: true },
      { fr: 'Commission réduite 12%', dr: 'عمولة مخفضة 12%', included: true },
      { fr: 'Badge pro certifié', dr: 'شارة حرفي موثوق', included: true },
      { fr: 'Statistiques de base', dr: 'إحصائيات أساسية', included: true },
      { fr: 'Mis en avant dans la recherche', dr: 'مُبرز في البحث', included: false },
      { fr: 'Support prioritaire', dr: 'دعم ذو أولوية', included: true },
    ],
  },
  {
    id: 'premium',
    name_fr: 'Premium',
    name_dr: 'بريميوم',
    price_monthly: 60,
    price_annual: 50,
    commission: 10,
    color: '#10B981',
    bgClass: 'bg-[#111827]',
    borderClass: 'border-[#10B981]',
    icon: Crown,
    badge_fr: 'Recommandé',
    badge_dr: 'موصى به',
    features: [
      { fr: 'Profil visible dans la recherche', dr: 'ملفك ظاهر في البحث', included: true },
      { fr: 'Accepter des réservations', dr: 'قبول الحجوزات', included: true },
      { fr: 'Commission la plus basse 10%', dr: 'أقل عمولة 10%', included: true },
      { fr: 'Badge Premium ⭐ visible', dr: 'شارة بريميوم ⭐ ظاهرة', included: true },
      { fr: 'Statistiques avancées & revenus', dr: 'إحصائيات متقدمة ومداخيل', included: true },
      { fr: 'Top des résultats + page d\'accueil', dr: 'أول نتائج البحث + الرئيسية', included: true },
      { fr: 'Support 24h/7j en priorité', dr: 'دعم 24/7 ذو أولوية', included: true },
    ],
  },
];

const PERKS: { icon: LucideIcon; fr: string; dr: string }[] = [
  { icon: BadgeCheck, fr: 'Badge vérifié affiché sur votre profil', dr: 'شارة موثوق ظاهرة في ملفك' },
  { icon: TrendingUp, fr: 'Meilleur classement dans les résultats', dr: 'ترتيب أعلى في نتائج البحث' },
  { icon: BarChart2, fr: 'Tableau de bord statistiques complet', dr: 'لوحة إحصائيات شاملة' },
  { icon: Headphones, fr: 'Support prioritaire dédié aux pros', dr: 'دعم مخصص للحرفيين' },
];

export default function SubscriptionPage() {
  const { lang } = useApp();
  const { toast } = useToast();
  const router = useRouter();
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const [loading, setLoading] = useState<PlanId | null>(null);
  const currentPlan: PlanId = 'free';

  const handleSubscribe = async (planId: PlanId) => {
    if (planId === 'free') return;
    setLoading(planId);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(null);
    toast(
      lang === 'dr'
        ? `تم الاشتراك في خطة ${planId === 'basic' ? 'أساسي' : 'بريميوم'} بنجاح!`
        : `Abonnement ${planId === 'basic' ? 'Basic' : 'Premium'} activé !`,
      'success'
    );
    router.back();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-24">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="text-sm">{lang === 'dr' ? 'ارجع' : 'Retour'}</span>
      </button>

      {/* Header */}
      <div className="mb-8 text-center">
        <div className="w-14 h-14 bg-[#10B981]/10 rounded-[16px] flex items-center justify-center mx-auto mb-4">
          <Crown size={26} className="text-[#10B981]" />
        </div>
        <h1 className={`text-2xl font-display font-bold text-[#111827] mb-2 ${lang === 'dr' ? 'font-arabic' : ''}`}>
          {lang === 'dr' ? 'اختار خطتك' : 'Choisissez votre plan'}
        </h1>
        <p className={`text-[#6B7280] text-sm ${lang === 'dr' ? 'font-arabic' : ''}`}>
          {lang === 'dr'
            ? 'طوّر خدمتك واكسب أكثر مع خطط خدامات للحرفيين'
            : 'Développez votre activité et gagnez plus avec Khadamat'}
        </p>
      </div>

      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setBilling('monthly')}
          className={cn(
            'text-sm font-semibold transition-colors',
            billing === 'monthly' ? 'text-[#111827]' : 'text-[#6B7280]'
          )}
        >
          {lang === 'dr' ? 'شهري' : 'Mensuel'}
        </button>
        <button
          onClick={() => setBilling(b => b === 'monthly' ? 'annual' : 'monthly')}
          className={cn(
            'relative w-12 h-6 rounded-full transition-colors',
            billing === 'annual' ? 'bg-[#10B981]' : 'bg-[#E5E7EB]'
          )}
        >
          <span className={cn(
            'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200',
            billing === 'annual' ? 'left-6' : 'left-0.5'
          )} />
        </button>
        <button
          onClick={() => setBilling('annual')}
          className={cn(
            'flex items-center gap-1.5 text-sm font-semibold transition-colors',
            billing === 'annual' ? 'text-[#111827]' : 'text-[#6B7280]'
          )}
        >
          {lang === 'dr' ? 'سنوي' : 'Annuel'}
          <span className="text-[10px] font-bold text-[#16A34A] bg-[#16A34A]/10 px-1.5 py-0.5 rounded-full">
            -2 {lang === 'dr' ? 'أشهر مجاناً' : 'mois offerts'}
          </span>
        </button>
      </div>

      {/* Plan cards */}
      <div className="flex flex-col gap-4 mb-10">
        {PLANS.map(plan => {
          const isCurrent = plan.id === currentPlan;
          const isPremium = plan.id === 'premium';
          const price = billing === 'annual' ? plan.price_annual : plan.price_monthly;
          const isLoading = loading === plan.id;

          return (
            <div
              key={plan.id}
              className={cn(
                'rounded-[20px] border-2 p-5 transition-all',
                plan.bgClass,
                plan.borderClass,
                isPremium ? 'shadow-xl' : 'shadow-sm'
              )}
            >
              {/* Plan header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className={cn(
                      'text-lg font-display font-bold',
                      isPremium ? 'text-white' : 'text-[#111827]'
                    )}>
                      {lang === 'dr' ? plan.name_dr : plan.name_fr}
                    </h2>
                    {plan.badge_fr && (
                      <span className={cn(
                        'text-[10px] font-bold px-2 py-0.5 rounded-full',
                        isPremium
                          ? 'bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/30'
                          : 'bg-[#F97316]/20 text-[#C2410C] border border-[#F97316]/30'
                      )}>
                        {lang === 'dr' ? plan.badge_dr : plan.badge_fr}
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6B7280]/15 text-[#6B7280]">
                        {lang === 'dr' ? 'حالي' : 'Actuel'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={cn('text-3xl font-display font-bold', isPremium ? 'text-[#10B981]' : 'text-[#111827]')}>
                      {price === 0 ? (lang === 'dr' ? 'مجاني' : 'Gratuit') : `${price} DT`}
                    </span>
                    {price > 0 && (
                      <span className={cn('text-sm', isPremium ? 'text-[#6B7280]' : 'text-[#6B7280]')}>
                        /{lang === 'dr' ? 'شهر' : 'mois'}
                      </span>
                    )}
                  </div>
                  {billing === 'annual' && plan.price_monthly > 0 && (
                    <p className={cn('text-xs mt-0.5', isPremium ? 'text-[#6B7280]' : 'text-[#6B7280]')}>
                      {lang === 'dr'
                        ? `عوض ${plan.price_monthly} DT/شهر`
                        : `au lieu de ${plan.price_monthly} DT/mois`}
                    </p>
                  )}
                </div>
                <div
                  className="w-11 h-11 rounded-[12px] flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: isPremium ? `${plan.color}25` : `${plan.color}15` }}
                >
                  <plan.icon size={22} style={{ color: plan.color }} />
                </div>
              </div>

              {/* Commission highlight */}
              <div className={cn(
                'flex items-center gap-2 rounded-[10px] px-3 py-2 mb-4 text-sm font-semibold',
                isPremium ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#F8FAF9] text-[#111827]'
              )}>
                <Zap size={14} style={{ color: plan.color }} />
                <span className={lang === 'dr' ? 'font-arabic' : ''}>
                  {lang === 'dr' ? `عمولة ${plan.commission}% فقط` : `Commission ${plan.commission}% seulement`}
                </span>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2 mb-5">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    {f.included ? (
                      <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${plan.color}20` }}>
                        <Check size={10} style={{ color: plan.color }} />
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-[#E5E7EB]/50 flex items-center justify-center flex-shrink-0">
                        <X size={10} className="text-[#6B7280]" />
                      </span>
                    )}
                    <span className={cn(
                      'text-sm',
                      lang === 'dr' ? 'font-arabic' : '',
                      f.included
                        ? isPremium ? 'text-white/90' : 'text-[#111827]'
                        : 'text-[#6B7280] line-through'
                    )}>
                      {lang === 'dr' ? f.dr : f.fr}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {isCurrent ? (
                <div className={cn(
                  'w-full rounded-[12px] py-3 text-center text-sm font-semibold',
                  'bg-[#F8FAF9] text-[#6B7280]'
                )}>
                  {lang === 'dr' ? 'خطتك الحالية' : 'Plan actuel'}
                </div>
              ) : (
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isLoading}
                  className={cn(
                    'w-full rounded-[12px] py-3 text-sm font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60',
                    isPremium
                      ? 'bg-[#10B981] text-white hover:bg-[#059669]'
                      : 'bg-[#111827] text-white hover:bg-[#1F2937]'
                  )}
                >
                  {isLoading && (
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  )}
                  <span className={lang === 'dr' ? 'font-arabic' : ''}>
                    {isLoading
                      ? (lang === 'dr' ? 'جارٍ التفعيل...' : 'Activation...')
                      : plan.id === 'basic'
                        ? (lang === 'dr' ? 'اشترك في الأساسي' : 'Choisir Basic')
                        : (lang === 'dr' ? 'اشترك في بريميوم ⭐' : 'Passer en Premium ⭐')}
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Perks section */}
      <div className="bg-white rounded-[20px] border border-[#E5E7EB] p-5 mb-6">
        <h3 className={`font-display font-bold text-[#111827] mb-4 ${lang === 'dr' ? 'font-arabic' : ''}`}>
          {lang === 'dr' ? 'مزايا الاشتراك' : 'Pourquoi s\'abonner ?'}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {PERKS.map((perk, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-8 h-8 bg-[#10B981]/10 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5">
                <perk.icon size={15} className="text-[#10B981]" />
              </div>
              <p className={`text-xs text-[#6B7280] leading-snug ${lang === 'dr' ? 'font-arabic' : ''}`}>
                {lang === 'dr' ? perk.dr : perk.fr}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className={`text-center text-xs text-[#6B7280] ${lang === 'dr' ? 'font-arabic' : ''}`}>
        {lang === 'dr'
          ? 'يمكنك إلغاء الاشتراك في أي وقت. لا التزامات طويلة الأمد.'
          : 'Résiliable à tout moment. Aucun engagement long terme.'}
      </p>
    </div>
  );
}
