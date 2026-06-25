'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { BOOKINGS } from '@/lib/mock-data';

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { lang } = useApp();
  const { t } = useTranslation(lang);
  const router = useRouter();

  const booking = BOOKINGS.find(b => b.id === id) ?? BOOKINGS[1];
  const pro = booking.pro;

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const ratingLabels = {
    fr: ['', 'Très mauvais', 'Mauvais', 'Correct', 'Bien', 'Excellent'],
    dr: ['', 'ضعيف', 'مقبول', 'معقول', 'باهي', 'ممتاز'],
  };

  const handleSubmit = async () => {
    if (rating === 0) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-[#F5A623]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-[#27AE60]" />
        </div>
        <h2 className={`text-2xl font-display font-bold text-[#1A1614] mb-3 ${lang === 'dr' ? 'font-arabic' : ''}`}>
          {lang === 'dr' ? 'شكراً على تقييمك!' : 'Merci pour votre avis !'}
        </h2>
        <p className={`text-[#9C9189] mb-8 ${lang === 'dr' ? 'font-arabic' : ''}`}>
          {lang === 'dr'
            ? 'تقييمك يساعد الحرفيين وبقية المستخدمين على الاختيار.'
            : 'Votre avis aide les artisans et la communauté à s\'améliorer.'}
        </p>
        <Button onClick={() => router.push('/bookings')} fullWidth size="lg">
          <span className={lang === 'dr' ? 'font-arabic' : ''}>
            {lang === 'dr' ? 'ارجع للحجوزات' : 'Retour aux réservations'}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-6 pb-24">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#9C9189] hover:text-[#1A1614] mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="text-sm">{t('back')}</span>
      </button>

      <h1 className={`text-2xl font-display font-bold text-[#1A1614] mb-1 ${lang === 'dr' ? 'font-arabic' : ''}`}>
        {t('leave_review')}
      </h1>
      <p className={`text-[#9C9189] mb-8 ${lang === 'dr' ? 'font-arabic' : ''}`}>
        {t('your_experience')}
      </p>

      {/* Pro info */}
      {pro && (
        <div className="flex items-center gap-4 bg-[#F7F5F2] rounded-[20px] p-4 mb-8">
          <Avatar src={pro.user?.avatar_url} name={pro.user?.full_name ?? ''} size="lg" />
          <div>
            <p className="font-semibold text-[#1A1614]">{pro.user?.full_name}</p>
            <p className={`text-sm text-[#9C9189] ${lang === 'dr' ? 'font-arabic' : ''}`}>
              {lang === 'dr' ? booking.category?.name_dr : booking.category?.name_fr}
            </p>
            {booking.price_final && (
              <p className="text-sm font-medium text-[#F5A623] mt-0.5">{booking.price_final} DT</p>
            )}
          </div>
        </div>
      )}

      {/* Star rating */}
      <div className="mb-8">
        <p className={`text-sm font-semibold text-[#1A1614] mb-4 ${lang === 'dr' ? 'font-arabic' : ''}`}>
          {lang === 'dr' ? 'أعطي تقييمك' : 'Donnez une note'}
        </p>
        <div className="flex gap-3 justify-center">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(star)}
              className="text-5xl transition-all hover:scale-110 active:scale-95 leading-none"
            >
              <span className={
                star <= (hovered || rating)
                  ? 'text-[#F5A623] drop-shadow-sm'
                  : 'text-[#E0DDD8]'
              }>★</span>
            </button>
          ))}
        </div>
        {(hovered || rating) > 0 && (
          <p className={`text-center text-sm font-medium text-[#9C9189] mt-3 ${lang === 'dr' ? 'font-arabic' : ''}`}>
            {ratingLabels[lang][hovered || rating]}
          </p>
        )}
      </div>

      {/* Comment */}
      <div className="mb-8">
        <label className={`text-sm font-semibold text-[#1A1614] mb-2 block ${lang === 'dr' ? 'font-arabic' : ''}`}>
          {lang === 'dr' ? 'رأيك (اختياري)' : 'Votre commentaire (optionnel)'}
        </label>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows={4}
          placeholder={lang === 'dr'
            ? 'شنو كان رأيك في الخدمة؟...'
            : 'Décrivez votre expérience avec ce pro...'}
          className={`w-full bg-white border border-[#E0DDD8] rounded-[12px] px-4 py-3 text-sm text-[#1A1614] placeholder:text-[#9C9189] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent resize-none transition-all ${lang === 'dr' ? 'text-right font-arabic' : ''}`}
        />
        <p className="text-xs text-[#9C9189] mt-1.5 text-right">{comment.length}/300</p>
      </div>

      <Button
        fullWidth
        size="lg"
        onClick={handleSubmit}
        loading={loading}
        disabled={rating === 0}
      >
        <span className={lang === 'dr' ? 'font-arabic' : ''}>{t('submit_review')}</span>
      </Button>
    </div>
  );
}
