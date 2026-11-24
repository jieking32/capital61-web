import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';
import { LoanCategory } from '../types';

interface NavbarProps {
  onOpenDealModal: (loanType?: LoanCategory) => void;
  onOpenCompanyProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDealModal,
  onOpenCompanyProfile,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Calculators', href: '#calculators' },
    { label: 'Track Record', href: '#track-record' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#07080A]/85 backdrop-blur-xl border-b border-white/[0.08]'
          : 'bg-[#07080A]/60 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo */}
        <a
          href="#"
          className="flex items-center shrink-0 transition-opacity duration-200 hover:opacity-85"
          id="nav-brand-logo"
          aria-label="Capital 61 Home"
        >
          <Logo size="sm" />
        </a>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary Navigation">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[13px] font-medium text-[#F5F3EF]/75 hover:text-[#D4B06A] transition-colors whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            onClick={() => onOpenDealModal('project_finance')}
            className="px-5 py-2 rounded-full text-xs font-semibold tracking-wide text-[#07080A] bg-[#D4B06A] hover:bg-[#E5C787] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            id="btn-submit-deal-header"
          >
            Submit Deal
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenDealModal('project_finance')}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-[#07080A] bg-[#D4B06A] whitespace-nowrap shrink-0"
          >
            Submit Deal
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-[#F5F3EF]/80 hover:text-[#D4B06A] transition-colors"
            aria-label="Toggle navigation menu"
            id="btn-mobile-menu-toggle"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Minimal Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0B0C10]/95 backdrop-blur-xl border-b border-white/[0.08] px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-[#F5F3EF]/85 hover:text-[#D4B06A] py-1"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenCompanyProfile();
              }}
              className="text-left text-sm font-medium text-[#D4B06A] py-1"
            >
              Company Profile
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
