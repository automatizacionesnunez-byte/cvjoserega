'use client';

import "./globals.css";
import Sidebar from './components/dashboard/Sidebar';
import { Inter, Playfair_Display, Raleway } from "next/font/google";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const raleway = Raleway({ subsets: ["latin"], variable: '--font-raleway' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const standalonePages = ['/', '/login', '/register', '/pricing', '/legal'];
  const isStandalone = standalonePages.includes(pathname);

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${raleway.variable} font-sans`}>
        {!isStandalone && <div className="floating-bg" />}
        {!isStandalone && <Sidebar />}
        <main className={isStandalone ? '' : 'main-content'}>
          {children}
        </main>
      </body>
    </html>
  );
}
