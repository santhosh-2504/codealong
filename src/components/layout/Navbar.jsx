import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { href: '/playlists', label: 'Playlists' },
    { href: '/keys', label: 'API Keys' },
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Premium Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center gap-1">
                <span className="text-lg md:text-xl font-black text-white group-hover:text-gray-100 transition-colors duration-200 drop-shadow-lg">
                  CODE
                </span>
                <div className="relative">
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-red-500 blur-md opacity-25 rounded transform -skew-x-6 scale-105 group-hover:opacity-35 transition-opacity duration-300"></div>
                  
                  <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-red-600 px-1.5 md:px-2 py-0.5 md:py-1 rounded transform -skew-x-6 group-hover:shadow-lg group-hover:shadow-red-500/40 transition-all duration-300 shadow-md">
                    <span className="text-white font-black flex items-center gap-0.5 text-xs md:text-sm drop-shadow-md">
                      AL
                      <div className="w-0 h-0 border-l-[6px] md:border-l-[8px] border-l-white border-t-[5px] md:border-t-[7px] border-t-transparent border-b-[5px] md:border-b-[7px] border-b-transparent drop-shadow-sm"></div>
                      NG
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="mx-2 mt-2 mb-3 bg-slate-800/50 rounded-lg border border-slate-700/50 backdrop-blur-xl overflow-hidden">
              <div className="py-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 text-base font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}