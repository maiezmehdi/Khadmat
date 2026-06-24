import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/context';
import { ToastProvider } from '@/components/ui/Toast';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Khadamat — خدامات | Les pros du quotidien',
  description: 'Trouvez, comparez et réservez des artisans vérifiés en Tunisie. Plombiers, électriciens, femmes de ménage et plus.',
  keywords: 'artisans, tunisie, services, réservation, plombier, électricien',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <body>
        <AppProvider>
          <ToastProvider>
            <Header />
            <main className="min-h-screen pb-20 md:pb-0">
              {children}
            </main>
            <Footer />
            <BottomNav />
          </ToastProvider>
        </AppProvider>
      </body>
    </html>
  );
}
