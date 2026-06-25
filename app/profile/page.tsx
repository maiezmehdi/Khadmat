'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { User, Bell, Globe, LogOut, ChevronRight, Star, CalendarCheck, Camera, Pencil } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { LangSwitch } from '@/components/ui/LangSwitch';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { useToast } from '@/components/ui/Toast';
import { BOOKINGS } from '@/lib/mock-data';

export default function ProfilePage() {
  const { lang, user } = useApp();
  const { t } = useTranslation(lang);
  const { toast } = useToast();

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const mockUser = {
    full_name: 'Ahmed Khalil',
    phone: '+216 98 123 456',
    city: 'Tunis',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  };

  const displayUser = user ?? mockUser;
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(displayUser.avatar_url);
  const [coverPreview, setCoverPreview] = useState<string | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(displayUser.full_name);
  const [phone, setPhone] = useState(displayUser.phone);
  const [city, setCity] = useState(displayUser.city);

  const completedBookings = BOOKINGS.filter(b => b.status === 'completed').length;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      toast(lang === 'dr' ? 'تم تغيير الصورة' : 'Photo de profil mise à jour', 'success');
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
      toast(lang === 'dr' ? 'تم تغيير صورة الغلاف' : 'Photo de couverture mise à jour', 'success');
    }
  };

  const handleSave = () => {
    setEditMode(false);
    toast(lang === 'dr' ? 'تم حفظ التغييرات' : 'Modifications enregistrées', 'success');
  };

  const menuItems = [
    { icon: CalendarCheck, labelFr: 'Mes réservations', labelDr: 'حجوزاتي', href: '/bookings' },
    { icon: Star, labelFr: 'Mes avis', labelDr: 'تقييماتي', href: '#' },
    { icon: Bell, labelFr: 'Notifications', labelDr: 'الإشعارات', href: '#' },
    { icon: Globe, labelFr: 'Langue', labelDr: 'اللغة', href: '#', isLang: true },
    { icon: User, labelFr: 'Devenir pro', labelDr: 'انضم كحرفي', href: '/auth/register-pro' },
  ];

  return (
    <div className="max-w-2xl mx-auto pb-24">
      {/* Cover + Avatar */}
      <div className="relative mb-16">
        {/* Cover photo */}
        <div className="relative h-44 overflow-hidden rounded-b-[24px]">
          {coverPreview ? (
            <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1A1614] to-[#2a2320]">
              <div
                className="absolute inset-0 opacity-30"
                style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #F5A623, transparent)' }}
              />
            </div>
          )}
          {/* Cover upload button */}
          <button
            onClick={() => coverInputRef.current?.click()}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/50 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-black/70 transition-colors"
          >
            <Camera size={12} />
            <span className={lang === 'dr' ? 'font-arabic' : ''}>
              {lang === 'dr' ? 'تغيير الغلاف' : 'Modifier la couverture'}
            </span>
          </button>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverChange}
          />
        </div>

        {/* Avatar — overlaps cover */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <div className="relative">
            <Avatar
              src={avatarPreview}
              name={name}
              size="xl"
              className="border-4 border-white"
            />
            <button
              onClick={() => avatarInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 bg-[#F5A623] rounded-full flex items-center justify-center border-2 border-white hover:bg-[#D4881A] transition-colors shadow-md"
            >
              <Camera size={13} className="text-[#1A1614]" />
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6">
        {/* Name & Info */}
        <div className="bg-white rounded-[24px] border border-[#E0DDD8] p-6 mb-6">
          {editMode ? (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className={`text-xs font-semibold text-[#9C9189] mb-1 block ${lang === 'dr' ? 'font-arabic' : ''}`}>
                    {lang === 'dr' ? 'الاسم الكامل' : 'Nom complet'}
                  </label>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full border border-[#E0DDD8] rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  />
                </div>
                <div>
                  <label className={`text-xs font-semibold text-[#9C9189] mb-1 block ${lang === 'dr' ? 'font-arabic' : ''}`}>
                    {t('phone_number')}
                  </label>
                  <input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full border border-[#E0DDD8] rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  />
                </div>
                <div>
                  <label className={`text-xs font-semibold text-[#9C9189] mb-1 block ${lang === 'dr' ? 'font-arabic' : ''}`}>
                    {lang === 'dr' ? 'المدينة' : 'Ville'}
                  </label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full border border-[#E0DDD8] rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  >
                    {['Tunis', 'Sfax', 'Sousse', 'Monastir', 'Bizerte'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <Button variant="ghost" size="sm" onClick={() => setEditMode(false)} className="flex-1">
                  {t('cancel')}
                </Button>
                <Button size="sm" onClick={handleSave} className="flex-1">
                  <span className={lang === 'dr' ? 'font-arabic' : ''}>{t('save')}</span>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-4">
                <h1 className="text-xl font-display font-bold text-[#1A1614] mb-0.5">{name}</h1>
                <p className="text-sm text-[#9C9189]">{phone}</p>
                <p className="text-sm text-[#9C9189]">{city}</p>
              </div>
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-1.5 mx-auto text-sm text-[#F5A623] font-semibold hover:underline"
              >
                <Pencil size={13} />
                <span className={lang === 'dr' ? 'font-arabic' : ''}>
                  {lang === 'dr' ? 'تعديل الملف' : 'Modifier le profil'}
                </span>
              </button>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#E0DDD8]">
                {[
                  { label: lang === 'dr' ? 'الحجوزات' : 'Réservations', value: BOOKINGS.length },
                  { label: lang === 'dr' ? 'المنجزة' : 'Terminées', value: completedBookings },
                  { label: lang === 'dr' ? 'تقييماتي' : 'Avis donnés', value: 2 },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <p className="text-xl font-bold text-[#1A1614]">{stat.value}</p>
                    <p className={`text-xs text-[#9C9189] mt-0.5 ${lang === 'dr' ? 'font-arabic' : ''}`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Menu */}
        <div className="bg-white rounded-[24px] border border-[#E0DDD8] overflow-hidden mb-6">
          {menuItems.map((item, i) => (
            <div key={item.labelFr}>
              {i > 0 && <div className="h-px bg-[#E0DDD8] mx-4" />}
              {item.isLang ? (
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#F7F5F2] rounded-[10px] flex items-center justify-center">
                      <item.icon size={18} className="text-[#9C9189]" />
                    </div>
                    <span className={`text-sm font-medium text-[#1A1614] ${lang === 'dr' ? 'font-arabic' : ''}`}>
                      {lang === 'dr' ? item.labelDr : item.labelFr}
                    </span>
                  </div>
                  <LangSwitch />
                </div>
              ) : (
                <Link href={item.href} className="flex items-center justify-between px-5 py-4 hover:bg-[#F7F5F2] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#F7F5F2] rounded-[10px] flex items-center justify-center">
                      <item.icon size={18} className="text-[#9C9189]" />
                    </div>
                    <span className={`text-sm font-medium text-[#1A1614] ${lang === 'dr' ? 'font-arabic' : ''}`}>
                      {lang === 'dr' ? item.labelDr : item.labelFr}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-[#9C9189]" />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Sign Out */}
        <Button variant="ghost" fullWidth className="text-[#E8472A] hover:bg-[#E8472A]/5 border border-[#E8472A]/20">
          <LogOut size={16} />
          <span className={lang === 'dr' ? 'font-arabic' : ''}>{t('sign_out')}</span>
        </Button>

        <p className="text-center text-xs text-[#9C9189] mt-6 mb-4">
          Khadamat v1.0 · خدامات
        </p>
      </div>
    </div>
  );
}
