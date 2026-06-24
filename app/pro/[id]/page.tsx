'use client';

import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, CheckCircle, Shield, Star } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ReviewCard } from '@/components/blocks/ReviewCard';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { PROS, CATEGORIES, REVIEWS } from '@/lib/mock-data';

export default function ProPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { lang } = useApp();
  const { t } = useTranslation(lang);
  const router = useRouter();

  const pro = PROS.find(p => p.id === id) ?? PROS[0];
  const reviews = REVIEWS.filter(r => r.pro_id === id);
  const bio = lang === 'dr' ? pro.bio_dr : pro.bio_fr;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-52 md:pb-28">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#9C9189] hover:text-[#1A1614] mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="text-sm">{t('back')}</span>
      </button>

      {/* Profile Card */}
      <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-[#E0DDD8] mb-6">
        {/* Cover */}
        <div className="h-32 sm:h-48 bg-gradient-to-br from-[#1A1614] to-[#2a2320] relative">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #F5A623, transparent)' }}
          />
        </div>

        <div className="px-5 pb-6">
          {/* Avatar — overlaps cover */}
          <div className="-mt-12 mb-3">
            <Avatar
              src={pro.user?.avatar_url}
              name={pro.user?.full_name ?? ''}
              size="xl"
              online
              className="border-4 border-white rounded-full"
            />
          </div>

          {/* Name + badges + location — fully below cover */}
          <div className="mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-display font-bold text-[#1A1614]">
                {pro.user?.full_name}
              </h1>
              {pro.is_approved && (
                <Badge variant="success" className="flex items-center gap-1">
                  <CheckCircle size={11} />
                  {t('verified')}
                </Badge>
              )}
              {pro.subscription === 'premium' && (
                <Badge variant="active">Premium ⭐</Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#9C9189] mt-1 flex-wrap">
              <MapPin size={13} />
              <span>{pro.user?.city}</span>
              {pro.years_exp && (
                <>
                  <span>·</span>
                  <span>{pro.years_exp} {t('years_exp')}</span>
                </>
              )}
            </div>
          </div>

          <Rating value={pro.rating_avg} count={pro.rating_count} size="md" className="mb-4" />

          {bio && (
            <p className={`text-[#1A1614]/80 leading-relaxed mb-5 ${lang === 'dr' ? 'font-arabic text-right' : ''}`}>
              {bio}
            </p>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: lang === 'dr' ? 'الحجوزات' : 'Réservations', value: '200+' },
              { label: t('response_time'), value: `${pro.response_time ?? 20} ${t('minutes')}` },
              { label: lang === 'dr' ? 'نسبة القبول' : 'Taux accept.', value: '95%' },
            ].map(stat => (
              <div key={stat.label} className="bg-[#F7F5F2] rounded-[12px] p-3 text-center">
                <p className="font-bold text-[#1A1614] text-base">{stat.value}</p>
                <p className={`text-xs text-[#9C9189] mt-0.5 ${lang === 'dr' ? 'font-arabic' : ''}`}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Services */}
          {pro.services && pro.services.length > 0 && (
            <div className="mb-5">
              <h2 className={`font-semibold text-[#1A1614] mb-3 ${lang === 'dr' ? 'font-arabic' : ''}`}>
                {t('services_offered')}
              </h2>
              <div className="flex flex-col gap-2">
                {pro.services.map(service => {
                  const cat = CATEGORIES.find(c => c.id === service.category_id);
                  return (
                    <div key={service.id} className="flex items-center justify-between bg-[#F7F5F2] rounded-[12px] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{cat?.icon}</span>
                        <span className={`text-sm font-medium text-[#1A1614] ${lang === 'dr' ? 'font-arabic' : ''}`}>
                          {lang === 'dr' ? cat?.name_dr : cat?.name_fr}
                        </span>
                      </div>
                      <div className="text-sm text-right">
                        <span className="font-bold text-[#1A1614]">{service.price_from} DT</span>
                        {service.price_to && <span className="text-[#9C9189]"> – {service.price_to} DT</span>}
                        <span className="text-[#9C9189] text-xs block">
                          {service.price_unit === 'heure' ? t('per_hour') : service.price_unit === 'forfait' ? t('flat_rate') : t('quote')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 bg-[#27AE60]/10 rounded-full px-3 py-1.5 text-xs font-medium text-[#27AE60]">
              <Shield size={12} />
              <span className={lang === 'dr' ? 'font-arabic' : ''}>{lang === 'dr' ? 'هوية موثقة' : 'Identité vérifiée'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F5A623]/10 rounded-full px-3 py-1.5 text-xs font-medium text-[#D4881A]">
              <Star size={12} />
              <span className={lang === 'dr' ? 'font-arabic' : ''}>{lang === 'dr' ? 'محترف موثوق' : 'Pro certifié'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="mb-6">
          <h2 className={`font-display font-bold text-[#1A1614] text-lg mb-4 ${lang === 'dr' ? 'font-arabic' : ''}`}>
            {t('reviews')} ({pro.rating_count})
          </h2>
          <div className="flex flex-col gap-3">
            {reviews.map(r => (
              <ReviewCard key={r.id} review={r} lang={lang} />
            ))}
            {pro.rating_count > reviews.length && (
              <button className={`text-sm text-[#F5A623] font-semibold text-center py-2 ${lang === 'dr' ? 'font-arabic' : ''}`}>
                {lang === 'dr' ? 'شوف كل التقييمات' : `Voir les ${pro.rating_count} avis`}
              </button>
            )}
          </div>
        </section>
      )}

      {/* Fixed Book Button */}
      <div className="fixed bottom-20 md:bottom-6 left-0 right-0 px-4 z-30">
        <div className="max-w-3xl mx-auto">
          <Link href={`/booking?pro=${pro.id}`}>
            <Button fullWidth size="lg" className="shadow-xl">
              {lang === 'dr'
                ? `احجز الآن · ${pro.services?.[0]?.price_from} DT`
                : `Réserver · dès ${pro.services?.[0]?.price_from} DT`}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
