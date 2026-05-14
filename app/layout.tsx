import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HydSense v2 - Water Monitoring Dashboard',
  description: 'Real-time IoT water leak detection and monitoring system',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-[#F9FAFB]">
          {/* Sidebar - Fixed positioned */}
          <Sidebar />

          {/* Main Content Area - Add padding-left for fixed sidebar */}
          <div className="flex-1 flex flex-col pl-60">
            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
