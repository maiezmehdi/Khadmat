'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, User, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { useToast } from '@/components/ui/Toast';
import { LangSwitch } from '@/components/ui/LangSwitch';
import { cn } from '@/lib/utils';

type AuthTab = 'login' | 'signup';
type Step = 'form' | 'otp';

export default function LoginPage() {
  const { lang } = useApp();
  const { t } = useTranslation(lang);
  const { toast } = useToast();
  const router = useRouter();

  const [tab, setTab] = useState<AuthTab>('login');
  const [step, setStep] = useState<Step>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('onboarding_done')) {
      router.replace('/onboarding');
    }
  }, [router]);

  const switchTab = (next: AuthTab) => {
    setTab(next);
    setPhone('');
    setName('');
    setOtp('');
    setStep('form');
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'signup' && !name.trim()) {
      toast(lang === 'dr' ? 'دخّل اسمك' : 'Entrez votre prénom.', 'error');
      return;
    }
    if (!phone || phone.length < 8) {
      toast(lang === 'dr' ? 'دخّل رقم هاتف صحيح' : 'Entrez un numéro valide.', 'error');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setStep('otp');
    toast(lang === 'dr' ? 'تم إرسال الكود بنجاح' : 'Code envoyé !', 'success');
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast(lang === 'dr' ? 'الكود 6 أرقام' : 'Le code fait 6 chiffres.', 'error');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    toast(lang === 'dr' ? 'مرحبا بيك !' : 'Bienvenue !', 'success');
    router.push('/');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[20px] bg-[#10B981]/10 mb-4">
            <span className="text-3xl">🏠</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-[#111827] leading-none">
            Khad<span className="text-[#10B981]">amat</span>
          </h1>
          <p className="text-sm font-arabic text-[#6B7280] mt-1">خدامات</p>
        </div>

        <div className="bg-white rounded-[24px] border border-[#E5E7EB] shadow-sm overflow-hidden">

          {/* Lang switch */}
          <div className="flex justify-end px-5 pt-4">
            <LangSwitch />
          </div>

          {step === 'form' ? (
            <>
              {/* Tabs */}
              <div className="mx-5 mt-3 mb-5 bg-[#F8FAF9] rounded-[14px] p-1 flex">
                {(['login', 'signup'] as AuthTab[]).map(tabKey => (
                  <button
                    key={tabKey}
                    onClick={() => switchTab(tabKey)}
                    className={cn(
                      'flex-1 py-2.5 text-sm font-semibold rounded-[11px] transition-all duration-200',
                      tab === tabKey
                        ? 'bg-white text-[#111827] shadow-sm'
                        : 'text-[#6B7280] hover:text-[#111827]'
                    )}
                  >
                    <span className={lang === 'dr' ? 'font-arabic' : ''}>
                      {tabKey === 'login'
                        ? (lang === 'dr' ? 'تسجيل الدخول' : 'Se connecter')
                        : (lang === 'dr' ? 'إنشاء حساب' : "S'inscrire")}
                    </span>
                  </button>
                ))}
              </div>

              <form onSubmit={handleSendOtp} className="px-5 pb-5 flex flex-col gap-4">
                {tab === 'signup' && (
                  <Input
                    label={lang === 'dr' ? 'الاسم الكامل' : 'Prénom & Nom'}
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={lang === 'dr' ? 'محمد بن علي' : 'Mohamed Ben Ali'}
                    icon={<User size={16} />}
                  />
                )}

                <div>
                  <Input
                    label={t('phone_number')}
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98 123 456"
                    icon={<Phone size={16} />}
                    maxLength={8}
                  />
                  <p className="text-xs text-[#6B7280] mt-1.5 ml-1">+216 · Tunisia 🇹🇳</p>
                </div>

                <Button type="submit" fullWidth size="lg" loading={loading}>
                  <span className={lang === 'dr' ? 'font-arabic' : ''}>
                    {lang === 'dr' ? 'ابعث الكود' : 'Recevoir le code'}
                  </span>
                </Button>

                <p className={cn('text-center text-xs text-[#6B7280]', lang === 'dr' ? 'font-arabic' : '')}>
                  {tab === 'login'
                    ? (lang === 'dr' ? 'ماعندكش حساب؟ ' : 'Pas encore de compte ? ')
                    : (lang === 'dr' ? 'عندك حساب؟ ' : 'Déjà un compte ? ')}
                  <button
                    type="button"
                    onClick={() => switchTab(tab === 'login' ? 'signup' : 'login')}
                    className="text-[#10B981] font-semibold"
                  >
                    {tab === 'login'
                      ? (lang === 'dr' ? 'سجّل الآن' : "S'inscrire")
                      : (lang === 'dr' ? 'ادخل' : 'Se connecter')}
                  </button>
                </p>
              </form>
            </>
          ) : (
            <div className="px-5 pb-5 pt-2">
              <button
                onClick={() => { setStep('form'); setOtp(''); }}
                className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#111827] mb-5 transition-colors"
              >
                <ArrowLeft size={14} />
                <span>{t('back')}</span>
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-[16px] bg-[#10B981]/10 flex items-center justify-center text-2xl mx-auto mb-3">
                  💬
                </div>
                <h2 className={cn('text-xl font-display font-bold text-[#111827] mb-1', lang === 'dr' ? 'font-arabic' : '')}>
                  {lang === 'dr' ? 'أدخل الكود' : 'Vérification'}
                </h2>
                <p className={cn('text-sm text-[#6B7280]', lang === 'dr' ? 'font-arabic' : '')}>
                  {lang === 'dr' ? 'أرسلنا كود لـ' : 'Code envoyé au'}{' '}
                  <span className="font-semibold text-[#111827]">+216 {phone}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                <Input
                  label={t('enter_otp')}
                  type="text"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="• • • • • •"
                  className="text-center text-2xl tracking-[0.5em] font-bold"
                  maxLength={6}
                />
                <Button type="submit" fullWidth size="lg" loading={loading}>
                  <span className={lang === 'dr' ? 'font-arabic' : ''}>{t('verify')}</span>
                </Button>
                <button
                  type="button"
                  className={cn('text-sm text-[#10B981] font-semibold text-center', lang === 'dr' ? 'font-arabic' : '')}
                  onClick={() => toast(lang === 'dr' ? 'تم إعادة إرسال الكود' : 'Code renvoyé !', 'info')}
                >
                  {t('resend_otp')}
                </button>
              </form>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-[#6B7280] mt-6 px-4">
          {lang === 'dr'
            ? <span className="font-arabic">بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية</span>
            : "En continuant, vous acceptez nos conditions d'utilisation"}
        </p>
      </div>
    </div>
  );
}
