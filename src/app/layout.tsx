import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Encarta 26',
  description: 'The modern encyclopedia in classic Encarta style',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: '#0a1628' }}>
        {/* Title Bar */}
        <header className="encarta-titlebar flex items-center px-4 py-2 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Encarta Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c8a84b] to-[#8a6820] flex items-center justify-center encarta-panel">
                <span className="text-[#0a1628] font-bold text-sm" style={{ fontFamily: 'Georgia, serif' }}>E</span>
              </div>
              <div>
                <Link href="/">
                  <h1 className="text-2xl font-bold text-white leading-none cursor-pointer hover:text-[#c8a84b] transition-colors"
                    style={{ fontFamily: 'Georgia, serif', textShadow: '0 0 20px rgba(200,168,75,0.3), 1px 1px 2px rgba(0,0,0,0.8)' }}>
                    Encarta
                    <span className="text-[#c8a84b] ml-1">26</span>
                  </h1>
                </Link>
                <p className="text-[#4a6a8a] text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  The Complete Encyclopedia
                </p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="ml-8 flex items-center gap-1">
            {['Home', 'Atlas', 'Index'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="px-3 py-1 text-sm text-[#a8c8e8] hover:text-[#c8a84b] hover:bg-[#1a3a5c] transition-colors encarta-button"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {item}
              </Link>
            ))}
          </nav>
          
          <div className="ml-auto text-[#4a6a8a] text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Powered by Wikipedia
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
          {/* Left Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4" style={{ backgroundColor: '#0a1628' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
