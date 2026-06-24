'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang } from './i18n';
import { User } from '@/types';

interface AppContextType {
  lang: Lang; setLang: (lang: Lang) => void;
  user: User | null; setUser: (user: User | null) => void;
  isRTL: boolean;
}

const AppContext = createContext<AppContextType>({
  lang: 'fr', setLang: () => {}, user: null, setUser: () => {}, isRTL: false,
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('khadamat_lang') as Lang;
    if (saved === 'fr' || saved === 'dr') setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('khadamat_lang', l);
    document.documentElement.dir = l === 'dr' ? 'rtl' : 'ltr';
    document.documentElement.lang = l === 'dr' ? 'ar' : 'fr';
  };

  useEffect(() => {
    document.documentElement.dir = lang === 'dr' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang === 'dr' ? 'ar' : 'fr';
  }, [lang]);

  return (
    <AppContext.Provider value={{ lang, setLang, user, setUser, isRTL: lang === 'dr' }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() { return useContext(AppContext); }
