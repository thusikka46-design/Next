import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Terminal, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Code2, 
  BookOpen, 
  CreditCard,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenSearch: () => void;
  onOpenBookDemo: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenBookDemo,
  isDarkMode,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string; icon: React.ReactNode; isNew?: boolean }[] = [
    { id: 'home', label: 'Platform', icon: <Cpu className="w-4 h-4" /> },
    { id: 'solutions', label: 'Incident Hub', icon: <ShieldCheck className="w-4 h-4" />, isNew: true },
    { id: 'assets', label: 'Asset Tracking', icon: <Layers className="w-4 h-4" /> },
    { id: 'vault', label: 'Dev Vault', icon: <Code2 className="w-4 h-4" /> },
    { id: 'resources', label: 'Docs & Specs', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'pricing', label: 'Pricing', icon: <CreditCard className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-200 border-white/10 bg-[#05070F]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-violet-600/30 to-blue-600/20 border border-cyan-400/40 group-hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.25)]">
            <Terminal className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold font-heading tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                SmartDesk
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold tracking-wider uppercase rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-tight -mt-0.5 hidden sm:block">
              IT & Dev Operations Hub
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_12px_rgba(0,242,254,0.15)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>{item.label}</span>
                {item.isNew && (
                  <span className="text-[9px] font-mono tracking-wider px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 border border-violet-500/40">
                    LIVE
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & CTAs */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search Bar trigger */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all group"
            title="Search SmartDesk (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="font-sans">Search hub...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded text-slate-300 border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* Theme Switcher Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-lg border border-white/10 transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Demo CTA Button */}
          <button
            onClick={onOpenBookDemo}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-300 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,242,254,0.5)] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
            <span>Book a Demo</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg border border-white/10"
            aria-label="Toggle mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#070A14] px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="mb-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-slate-300 bg-white/5 rounded-lg border border-white/10"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400" />
                <span>Search assets, runbooks & tickets</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[11px] font-mono bg-white/10 rounded text-slate-300">
                ⌘K
              </kbd>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookDemo();
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-center text-white rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 border border-cyan-400/40 shadow-lg shadow-cyan-500/20"
            >
              Book an Enterprise Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
