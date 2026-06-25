import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

function IconInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconTikTok({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}

const services = ['Plomberie', 'Électricité', 'Ménage', 'Peinture', 'Jardinage', 'Climatisation'];
const links = [
  { label: 'Trouver un pro', href: '/search' },
  { label: 'Devenir pro', href: '/auth/register-pro' },
  { label: 'Abonnements', href: '/subscription' },
  { label: 'Connexion', href: '/auth/login' },
];
const socials = [
  { label: 'Instagram', href: '#', Icon: IconInstagram, color: 'hover:text-[#E1306C]' },
  { label: 'Facebook', href: '#', Icon: IconFacebook, color: 'hover:text-[#1877F2]' },
  { label: 'TikTok', href: '#', Icon: IconTikTok, color: 'hover:text-white' },
];

export function Footer() {
  return (
    <footer className="bg-[#0D1117] text-white pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <h2 className="text-2xl font-display font-bold mb-3">
              Khad<span className="text-[#10B981]">amat</span>
              <span className="text-base font-arabic font-normal text-[#6B7280] ml-2">خدامات</span>
            </h2>
            <p className="text-[#6B7280] text-sm leading-relaxed max-w-xs mb-5">
              La marketplace de services à domicile de référence en Tunisie. Artisans vérifiés, réservation en ligne, paiement sécurisé.
            </p>
            {/* Contact */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <MapPin size={14} className="text-[#10B981] flex-shrink-0" />
                <span>Tunis, Tunisie 🇹🇳</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <Phone size={14} className="text-[#10B981] flex-shrink-0" />
                <span>+216 71 000 000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <Mail size={14} className="text-[#10B981] flex-shrink-0" />
                <span>contact@khadamat.tn</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <Link href={`/search?category=${s.toLowerCase()}`} className="text-sm text-[#9CA3AF] hover:text-white transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-4">Liens</h3>
            <ul className="space-y-2.5">
              {links.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-[#9CA3AF] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-3">Suivez-nous</h3>
              <div className="flex gap-3">
                {socials.map(({ Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`w-9 h-9 rounded-[10px] bg-white/8 text-[#6B7280] ${color} hover:bg-white/12 flex items-center justify-center transition-all`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#4B5563]">© 2026 Khadamat · Tous droits réservés</p>
          <div className="flex items-center gap-4 text-xs text-[#4B5563]">
            <Link href="#" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link href="#" className="hover:text-white transition-colors">Conditions</Link>
            <span className="font-arabic">خدامات · تونس</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
