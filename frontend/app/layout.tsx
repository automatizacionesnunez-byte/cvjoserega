'use client';

import "./globals.css";
import Sidebar from './components/dashboard/Sidebar';
import { Inter } from "next/font/google";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const standalonePages = ['/', '/login', '/register', '/pricing', '/legal'];
  const isStandalone = standalonePages.includes(pathname);

  return (
    <html lang="es">
      <body className={inter.className}>
        {!isStandalone && <div className="floating-bg" />}
        {!isStandalone && <Sidebar />}
        <main className={isStandalone ? '' : 'main-content'}>
          {children}
        </main>
      </body>
    </html>
  );
}
