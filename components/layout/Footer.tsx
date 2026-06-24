import Link from 'next/link';

export function Footer() {
  return (
    <footer className="hidden md:block bg-[#1A1614] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h2 className="text-2xl font-display font-bold mb-2">Khad<span className="text-[#F5A623]">amat</span></h2>
            <p className="text-[#9C9189] text-sm leading-relaxed max-w-xs">Les pros du quotidien, à portée de main. La marketplace de services à domicile de référence en Tunisie.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-[#9C9189]">Services</h3>
            <ul className="space-y-2 text-sm text-[#9C9189]">
              {['Plomberie', 'Électricité', 'Ménage', 'Peinture', 'Jardinage'].map(s => (
                <li key={s}><Link href="/search" className="hover:text-white transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-[#9C9189]">Liens</h3>
            <ul className="space-y-2 text-sm text-[#9C9189]">
              <li><Link href="/auth/register-pro" className="hover:text-white">Devenir pro</Link></li>
              <li><Link href="/auth/login" className="hover:text-white">Connexion</Link></li>
              <li><Link href="/search" className="hover:text-white">Trouver un pro</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
          <p className="text-[#9C9189] text-sm">© 2026 Khadamat · Tous droits réservés</p>
          <p className="text-[#9C9189] text-sm font-arabic">خدامات · تونس</p>
        </div>
      </div>
    </footer>
  );
}
