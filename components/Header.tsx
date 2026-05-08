'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: '课程体系', href: '#courses' },
  { label: '师资介绍', href: '#teacher' },
  { label: '提分优势', href: '#advantages' },
  { label: '学员好评', href: '#reviews' },
  { label: '报名咨询', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-narrow flex items-center justify-between h-[72px]">
        <a href="#" className="flex items-center gap-2">
          <span className="w-2 h-8 bg-orange-500 rounded-full" />
          <span className={`text-lg font-bold transition-colors ${scrolled ? 'text-navy-800' : 'text-white'}`}>
            武大数学程老师
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                scrolled ? 'text-navy-600' : 'text-white/90'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm font-medium px-5 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          >
            免费试听
          </a>
        </nav>

        <button
          className={`md:hidden p-2 ${scrolled ? 'text-navy-800' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="container-narrow py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-navy-700 text-sm font-medium py-3 px-4 rounded-lg hover:bg-navy-50 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 text-sm font-medium px-5 py-3 bg-orange-500 text-white rounded-full text-center hover:bg-orange-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              免费试听
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
