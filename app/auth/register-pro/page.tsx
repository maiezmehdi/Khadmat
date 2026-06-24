'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Upload, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { useToast } from '@/components/ui/Toast';
import { CATEGORIES } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const STEPS = ['infos', 'services', 'docs'] as const;
type Step = typeof STEPS[number];

export default function RegisterProPage() {
  const { lang } = useApp();
  const { t } = useTranslation(lang);
  const { toast } = useToast();
  const router = useRouter();
  const [step, setStep] = useState<Step>('infos');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleCategory = (slug: string) => setSelectedCategories(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]);

  const handleSubmit = async () => {
    setLoading(true); await new Promise(r => setTimeout(r, 2000)); setLoading(false); setSubmitted(true);
  };

  if (submitted) return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-[#27AE60]/10 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-[#27AE60]" /></div>
      <h2 className={`text-2xl font-display font-bold text-[#1A1614] mb-3 ${lang === 'dr' ? 'font-arabic' : ''}`}>{lang === 'dr' ? 'تم تقديم طلبك!' : 'Candidature envoyée !'}</h2>
      <p className={`text-[#9C9189] mb-8 ${lang === 'dr' ? 'font-arabic' : ''}`}>{lang === 'dr' ? 'سيتصل بيك فريق خدامات خلال 24-48 ساعة.' : 'Notre équipe vous contactera sous 24–48h.'}</p>
      <Button onClick={() => router.push('/')} fullWidth size="lg">{lang === 'dr' ? 'ارجع للرئيسية' : "Retour à l'accueil"}</Button>
    </div>
  );

  const stepIndex = STEPS.indexOf(step);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-[#9C9189] hover:text-[#1A1614] mb-6"><ArrowLeft size={18} /><span className="text-sm">{t('back')}</span></button>
      <h1 className={`text-2xl font-display font-bold text-[#1A1614] mb-2 ${lang === 'dr' ? 'font-arabic' : ''}`}>{t('join_as_pro')}</h1>
      <p className={`text-[#9C9189] mb-8 ${lang === 'dr' ? 'font-arabic' : ''}`}>{lang === 'dr' ? 'انضم لآلاف الحرفيين على خدامات' : 'Rejoignez des milliers de pros sur Khadamat'}</p>
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0', i < stepIndex ? 'bg-[#27AE60] text-white' : i === stepIndex ? 'bg-[#F5A623] text-[#1A1614]' : 'bg-[#E0DDD8] text-[#9C9189]')}>{i < stepIndex ? '✓' : i + 1}</div>
            {i < STEPS.length - 1 && <div className={cn('flex-1 h-1 rounded-full', i < stepIndex ? 'bg-[#27AE60]' : 'bg-[#E0DDD8]')} />}
          </div>
        ))}
      </div>

      {step === 'infos' && (
        <div className="flex flex-col gap-4">
          <h2 className={`font-semibold text-[#1A1614] ${lang === 'dr' ? 'font-arabic' : ''}`}>{lang === 'dr' ? '1. معلوماتك الشخصية' : '1. Vos informations'}</h2>
          <div className="grid grid-cols-2 gap-4"><Input label={t('first_name')} placeholder="Mohamed" /><Input label={t('last_name')} placeholder="Ben Ali" /></div>
          <Input label={t('phone_number')} type="tel" placeholder="98 123 456" />
          <div>
            <label className={`text-sm font-semibold text-[#1A1614] mb-1.5 block ${lang === 'dr' ? 'font-arabic' : ''}`}>{t('your_city')}</label>
            <select className="w-full bg-white border border-[#E0DDD8] rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]">
              {['Tunis', 'Sfax', 'Sousse', 'Monastir', 'Bizerte'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <Button size="lg" fullWidth onClick={() => setStep('services')}>{lang === 'dr' ? 'التالي' : 'Suivant'}</Button>
        </div>
      )}

      {step === 'services' && (
        <div className="flex flex-col gap-4">
          <h2 className={`font-semibold text-[#1A1614] ${lang === 'dr' ? 'font-arabic' : ''}`}>{lang === 'dr' ? '2. اختار خدماتك' : '2. Vos services'}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map(cat => (
              <button key={cat.slug} type="button" onClick={() => toggleCategory(cat.slug)} className={cn('flex flex-col items-center gap-2 p-4 rounded-[16px] border-2 transition-all', selectedCategories.includes(cat.slug) ? 'border-[#F5A623] bg-[#F5A623]/5' : 'border-[#E0DDD8] bg-white')}>
                <span className="text-2xl">{cat.icon}</span>
                <span className={`text-xs font-medium text-center leading-tight ${lang === 'dr' ? 'font-arabic' : ''}`}>{lang === 'dr' ? cat.name_dr : cat.name_fr}</span>
                {selectedCategories.includes(cat.slug) && <CheckCircle size={14} className="text-[#F5A623]" />}
              </button>
            ))}
          </div>
          <div className="flex gap-3"><Button variant="ghost" size="lg" onClick={() => setStep('infos')} className="flex-1">{t('back')}</Button><Button size="lg" onClick={() => setStep('docs')} disabled={selectedCategories.length === 0} className="flex-1">{lang === 'dr' ? 'التالي' : 'Suivant'}</Button></div>
        </div>
      )}

      {step === 'docs' && (
        <div className="flex flex-col gap-4">
          <h2 className={`font-semibold text-[#1A1614] ${lang === 'dr' ? 'font-arabic' : ''}`}>{lang === 'dr' ? '3. الوثائق المطلوبة' : '3. Documents requis'}</h2>
          {[{ label: lang === 'dr' ? 'صورة البطاقة الوطنية' : "Carte d'identité nationale", required: true }, { label: lang === 'dr' ? 'سيلفي مع البطاقة' : 'Selfie avec la CIN', required: true }, { label: lang === 'dr' ? 'وثيقة المهنة (اختياري)' : 'Justificatif de métier (optionnel)', required: false }].map(doc => (
            <div key={doc.label} className="flex items-center justify-between bg-[#F7F5F2] rounded-[12px] px-4 py-4 border border-dashed border-[#E0DDD8] hover:border-[#F5A623] transition-colors cursor-pointer group">
              <div><p className={`text-sm font-medium text-[#1A1614] ${lang === 'dr' ? 'font-arabic' : ''}`}>{doc.label}</p>{doc.required && <p className="text-xs text-[#E8472A] mt-0.5">{lang === 'dr' ? 'مطلوب' : 'Obligatoire'}</p>}</div>
              <Upload size={18} className="text-[#9C9189] group-hover:text-[#F5A623] transition-colors" />
            </div>
          ))}
          <div className="bg-[#F5A623]/10 rounded-[12px] p-4 border border-[#F5A623]/20">
            <p className={`text-sm text-[#D4881A] ${lang === 'dr' ? 'font-arabic' : ''}`}>{lang === 'dr' ? '⚡ سيتصل بيك فريق خدامات خلال 24-48 ساعة.' : '⚡ Notre équipe validera votre profil sous 24–48h. Vous recevrez un SMS de confirmation.'}</p>
          </div>
          <div className="flex gap-3"><Button variant="ghost" size="lg" onClick={() => setStep('services')} className="flex-1">{t('back')}</Button><Button size="lg" onClick={handleSubmit} loading={loading} className="flex-1"><span className={lang === 'dr' ? 'font-arabic' : ''}>{t('apply')}</span></Button></div>
        </div>
      )}
    </div>
  );
}
