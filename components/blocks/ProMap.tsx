'use client';

import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';
import { ProProfile } from '@/types';

const ProMapInner = dynamic(() => import('./ProMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-[#E8EDE4] to-[#D5DDD0] rounded-[20px] flex flex-col items-center justify-center gap-3">
      <MapPin size={28} className="text-[#9C9189] animate-bounce" />
      <span className="text-sm text-[#9C9189] font-medium">Chargement de la carte…</span>
    </div>
  ),
});

interface ProMapProps {
  pros: ProProfile[];
  lang: string;
}

export function ProMap({ pros, lang }: ProMapProps) {
  return <ProMapInner pros={pros} lang={lang} />;
}
