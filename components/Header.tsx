'use client';

import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';

const NAV_LINKS = [
  { label: '课程', href: '#courses' },
  { label: '老师', href: '#teacher' },
  { label: '提分路径', href: '#advantages' },
  { label: '案例', href: '#cases' },
  { label: '评价', href: '#reviews' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#courses');

  useEffect(() => {
    const navHrefs = new Set(NAV_LINKS.map((link) => link.href));

    const updateHeader = () => {
      setScrolled(window.scrollY > 16);

      if (navHrefs.has(window.location.hash)) {
        setActiveHref(window.location.hash);
        return;
      }

      const current = NAV_LINKS.reduce((active, link) => {
        const section = document.querySelector(link.href);
        if (!section) return active;

        const top = section.getBoundingClientRect().top;
        return top <= 120 ? link.href : active;
      }, NAV_LINKS[0].href);

      setActiveHref(current);
    };

    updateHeader();
    window.setTimeout(updateHeader, 120);
    window.addEventListener('hashchange', updateHeader);
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => {
      window.removeEventListener('hashchange', updateHeader);
      window.removeEventListener('scroll', updateHeader);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setActiveHref(href);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-sm backdrop-blur-sm' : 'bg-white/85 backdrop-blur-sm'
      }`}
    >
      <div className="container-narrow flex h-[68px] items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink-900 text-sm font-bold text-amber-300">
            程
          </span>
          <span className="text-base font-bold text-ink-900 md:text-lg">武大数学程老师</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`nav-link ${activeHref === link.href ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sage-700"
          >
            <Phone size={16} />
            免费诊断
          </a>
        </nav>

        <button
          className="p-2 text-ink-900 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-ink-100 bg-white shadow-lg md:hidden">
          <nav className="container-narrow flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`mobile-nav-link ${activeHref === link.href ? 'mobile-nav-link-active' : ''}`}
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 rounded-full bg-ink-900 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-sage-700"
              onClick={() => setMenuOpen(false)}
            >
              免费学情诊断
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
