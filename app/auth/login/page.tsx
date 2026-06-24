'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { useToast } from '@/components/ui/Toast';
import { LangSwitch } from '@/components/ui/LangSwitch';

type Step = 'phone' | 'otp';

export default function LoginPage() {
  const { lang } = useApp();
  const { t } = useTranslation(lang);
  const { toast } = useToast();
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 8) { toast(lang === 'dr' ? 'دخّل رقم هاتف صحيح' : 'Entrez un numéro valide.', 'error'); return; }
    setLoading(true); await new Promise(r => setTimeout(r, 1000)); setLoading(false); setStep('otp');
    toast(lang === 'dr' ? 'تم إرسال الكود بنجاح' : 'Code envoyé avec succès !', 'success');
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) { toast(lang === 'dr' ? 'الكود 6 أرقام' : 'Le code fait 6 chiffres.', 'error'); return; }
    setLoading(true); await new Promise(r => setTimeout(r, 1000)); setLoading(false);
    toast(lang === 'dr' ? 'مرحبا بيك !' : 'Bienvenue !', 'success');
    router.push('/');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-[#1A1614] mb-1">Khad<span className="text-[#F5A623]">amat</span></h1>
          <p className="text-sm font-arabic text-[#9C9189]">خدامات</p>
        </div>
        <div className="bg-white rounded-[24px] border border-[#E0DDD8] p-6 shadow-sm">
          <div className="flex justify-end mb-4"><LangSwitch /></div>
          {step === 'phone' ? (
            <>
              <h2 className={`text-xl font-display font-bold text-[#1A1614] mb-2 ${lang === 'dr' ? 'font-arabic text-right' : ''}`}>{t('welcome')}</h2>
              <p className={`text-sm text-[#9C9189] mb-6 ${lang === 'dr' ? 'font-arabic text-right' : ''}`}>{t('enter_phone')}</p>
              <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                <div>
                  <Input label={t('phone_number')} type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="98 123 456" icon={<Phone size={16} />} maxLength={8} />
                  <p className="text-xs text-[#9C9189] mt-1.5 ml-1">+216 · Tunisia 🇹🇳</p>
                </div>
                <Button type="submit" fullWidth size="lg" loading={loading}><span className={lang === 'dr' ? 'font-arabic' : ''}>{lang === 'dr' ? 'ابعث الكود' : 'Recevoir le code'}</span></Button>
              </form>
            </>
          ) : (
            <>
              <button onClick={() => setStep('phone')} className="flex items-center gap-1 text-sm text-[#9C9189] hover:text-[#1A1614] mb-4"><ArrowLeft size={14} /> {t('back')}</button>
              <h2 className={`text-xl font-display font-bold text-[#1A1614] mb-2 ${lang === 'dr' ? 'font-arabic text-right' : ''}`}>{t('verify')}</h2>
              <p className={`text-sm text-[#9C9189] mb-6 ${lang === 'dr' ? 'font-arabic text-right' : ''}`}>{t('otp_sent')} +216 {phone}</p>
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                <Input label={t('enter_otp')} type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="_ _ _ _ _ _" className="text-center text-2xl tracking-widest font-bold" maxLength={6} />
                <Button type="submit" fullWidth size="lg" loading={loading}><span className={lang === 'dr' ? 'font-arabic' : ''}>{t('verify')}</span></Button>
                <button type="button" className={`text-sm text-[#F5A623] font-semibold text-center ${lang === 'dr' ? 'font-arabic' : ''}`} onClick={() => toast('Code renvoyé !', 'info')}>{t('resend_otp')}</button>
              </form>
            </>
          )}
        </div>
        <p className="text-center text-xs text-[#9C9189] mt-6">En continuant, vous acceptez nos conditions d&apos;utilisation</p>
      </div>
    </div>
  );
}
