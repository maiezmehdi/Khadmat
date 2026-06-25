'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, CalendarDays, Clock, CreditCard, Banknote, CheckCircle } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Rating } from '@/components/ui/Rating';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { useToast } from '@/components/ui/Toast';
import { PROS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

const PAYMENT_METHODS = [
  { id: 'cod', icon: Banknote, labelFr: 'Paiement à la livraison', labelDr: 'دفع عند الوصول' },
  { id: 'flouci', icon: CreditCard, labelFr: 'Paiement Flouci', labelDr: 'دفع بفلوسي' },
  { id: 'konnect', icon: CreditCard, labelFr: 'Paiement Konnect', labelDr: 'دفع بكونكت' },
];

function BookingContent() {
  const { lang } = useApp();
  const { t } = useTranslation(lang);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const proId = searchParams.get('pro') ?? '1';

  const pro = PROS.find(p => p.id === proId) ?? PROS[0];

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [payment, setPayment] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !address) {
      toast(lang === 'dr' ? 'عبّي كل الحقول المطلوبة' : 'Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    toast(t('booking_success'), 'success');
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-[#16A34A]" />
        </div>
        <h2 className={`text-2xl font-display font-bold text-[#111827] mb-3 ${lang === 'dr' ? 'font-arabic' : ''}`}>
          {t('booking_confirmed')}
        </h2>
        <p className={`text-[#6B7280] mb-8 ${lang === 'dr' ? 'font-arabic' : ''}`}>
          {t('booking_success')}
        </p>
        <Button onClick={() => router.push('/bookings')} fullWidth size="lg">
          {t('my_bookings')}
        </Button>
        <Button variant="ghost" onClick={() => router.push('/')} fullWidth size="md" className="mt-3">
          {lang === 'dr' ? 'ارجع للرئيسية' : "Retour à l'accueil"}
        </Button>
      </div>
    );
  }

  const service = pro.services?.[0];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
      {/* Back */}
      <button onClick={() => router.back()} className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-6 transition-colors">
        <ArrowLeft size={18} />
        <span className="text-sm">{t('back')}</span>
      </button>

      <h1 className={`text-2xl font-display font-bold text-[#111827] mb-6 ${lang === 'dr' ? 'font-arabic' : ''}`}>
        {t('confirm_booking')}
      </h1>

      {/* Pro Summary */}
      <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-4 mb-6 flex items-center gap-4">
        <Avatar src={pro.user?.avatar_url} name={pro.user?.full_name ?? ''} size="lg" />
        <div>
          <h3 className="font-semibold text-[#111827]">{pro.user?.full_name}</h3>
          <Rating value={pro.rating_avg} count={pro.rating_count} />
          {service && (
            <p className="text-sm text-[#6B7280] mt-0.5">
              {t('price_from')} <span className="font-semibold text-[#111827]">{service.price_from} DT</span>
            </p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Date */}
        <div>
          <label className={`text-sm font-semibold text-[#111827] mb-1.5 flex items-center gap-2 ${lang === 'dr' ? 'font-arabic' : ''}`}>
            <CalendarDays size={15} className="text-[#10B981]" />
            {t('choose_date')} *
          </label>
          <input
            type="date"
            value={date}
            min={today}
            onChange={e => setDate(e.target.value)}
            required
            className="w-full bg-white border border-[#E5E7EB] rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          />
        </div>

        {/* Time */}
        <div>
          <label className={`text-sm font-semibold text-[#111827] mb-1.5 flex items-center gap-2 ${lang === 'dr' ? 'font-arabic' : ''}`}>
            <Clock size={15} className="text-[#10B981]" />
            {t('choose_time')} *
          </label>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.map(slot => (
              <button
                key={slot}
                type="button"
                onClick={() => setTime(slot)}
                className={cn(
                  'py-2.5 rounded-[10px] text-sm font-medium border transition-colors',
                  time === slot
                    ? 'bg-[#111827] text-white border-[#111827]'
                    : 'bg-white text-[#111827] border-[#E5E7EB] hover:border-[#10B981]'
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Address */}
        <Input
          label={`${t('your_address')} *`}
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder={lang === 'dr' ? 'حط عنوانك' : 'Ex: 12 Rue de Carthage, Tunis'}
          icon={<MapPin size={16} />}
          required
        />

        {/* Note */}
        <div>
          <label className={`text-sm font-semibold text-[#111827] mb-1.5 block ${lang === 'dr' ? 'font-arabic' : ''}`}>
            {t('add_note')}
          </label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder={lang === 'dr' ? 'ضيف ملاحظات للحرفي...' : 'Décrivez votre besoin en détail...'}
            rows={3}
            className={`w-full bg-white border border-[#E5E7EB] rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] resize-none ${lang === 'dr' ? 'text-right font-arabic' : ''}`}
          />
        </div>

        {/* Payment */}
        <div>
          <label className={`text-sm font-semibold text-[#111827] mb-3 block ${lang === 'dr' ? 'font-arabic' : ''}`}>
            {t('payment_method')}
          </label>
          <div className="flex flex-col gap-2">
            {PAYMENT_METHODS.map(pm => (
              <button
                key={pm.id}
                type="button"
                onClick={() => setPayment(pm.id)}
                className={cn(
                  'flex items-center gap-3 w-full px-4 py-3.5 rounded-[12px] border text-left transition-colors',
                  payment === pm.id
                    ? 'border-[#10B981] bg-[#10B981]/5'
                    : 'border-[#E5E7EB] bg-white hover:border-[#6B7280]'
                )}
              >
                <pm.icon size={18} className={payment === pm.id ? 'text-[#10B981]' : 'text-[#6B7280]'} />
                <span className={`text-sm font-medium ${lang === 'dr' ? 'font-arabic' : ''} ${payment === pm.id ? 'text-[#111827]' : 'text-[#6B7280]'}`}>
                  {lang === 'dr' ? pm.labelDr : pm.labelFr}
                </span>
                {payment === pm.id && (
                  <CheckCircle size={16} className="text-[#10B981] ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        {date && time && address && (
          <div className="bg-[#F8FAF9] rounded-[16px] p-4 border border-[#E5E7EB]">
            <h3 className={`font-semibold text-[#111827] mb-3 ${lang === 'dr' ? 'font-arabic' : ''}`}>
              {t('booking_summary')}
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className={`text-[#6B7280] ${lang === 'dr' ? 'font-arabic' : ''}`}>{t('choose_date')}</span>
                <span className="font-medium">{date}</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-[#6B7280] ${lang === 'dr' ? 'font-arabic' : ''}`}>{t('choose_time')}</span>
                <span className="font-medium">{time}</span>
              </div>
              {service && (
                <div className="flex justify-between border-t border-[#E5E7EB] pt-2 mt-1">
                  <span className={`font-semibold text-[#111827] ${lang === 'dr' ? 'font-arabic' : ''}`}>{t('price_estimate')}</span>
                  <span className="font-bold text-[#10B981]">{service.price_from}–{service.price_to} DT</span>
                </div>
              )}
            </div>
          </div>
        )}

        <Button type="submit" size="lg" fullWidth loading={loading}>
          <span className={lang === 'dr' ? 'font-arabic' : ''}>{t('confirm_booking')}</span>
        </Button>
      </form>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense>
      <BookingContent />
    </Suspense>
  );
}
