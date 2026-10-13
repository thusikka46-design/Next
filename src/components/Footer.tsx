import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Terminal, 
  Activity, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Github, 
  Twitter, 
  Linkedin,
  ArrowUpRight,
  Server,
  Lock
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenBookDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBookDemo }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#04060C] text-slate-400 overflow-hidden">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-400/30">
                <Terminal className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xl font-bold font-heading text-white tracking-tight">
                SmartDesk <span className="text-cyan-400">Pro</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The NextGen autonomous IT & Developer Operations Hub. Unifying real-time incident triage, live asset discovery, code snippet vault, and AI diagnostics into a single glass pane.
            </p>

            {/* Live System Status Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono font-medium">All Systems Operational · 99.99% SLA</span>
            </div>

            {/* Compliance Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" /> SOC2 Type II
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-violet-500" /> ISO 27001
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-amber-500" /> FedRAMP Ready
              </span>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-4">
              Platform & Hubs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('solutions')} className="hover:text-cyan-400 transition-colors">
                  Incident Hub & SLA
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('assets')} className="hover:text-cyan-400 transition-colors">
                  Live Asset Tracking
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('vault')} className="hover:text-cyan-400 transition-colors">
                  Developer Command Vault
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-cyan-400 transition-colors">
                  Pricing & ROI Calculator
                </button>
              </li>
              <li>
                <button onClick={onOpenBookDemo} className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                  Book Enterprise Demo <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-4">
              Resources & Tech
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-cyan-400 transition-colors">
                  Architecture Specs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-cyan-400 transition-colors">
                  Zero-Touch Runbooks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-cyan-400 transition-colors">
                  Security Whitepapers
                </button>
              </li>
              <li>
                <a href="#integrations" onClick={() => onNavigate('vault')} className="hover:text-cyan-400 transition-colors">
                  Integrations Ecosystem
                </a>
              </li>
              <li>
                <a href="#diagnostics" onClick={() => onNavigate('pricing')} className="hover:text-cyan-400 transition-colors">
                  AI Log Diagnostics Lab
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-4">
              DevOps Intelligence
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Weekly curated incident post-mortems, SRE runbook snippets, and eBPF deep-dives.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Subscribed! Check your inbox for the SRE Starter Kit.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sre-team@company.com"
                    required
                    className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1 bg-cyan-500 hover:bg-cyan-400 text-black rounded transition-colors"
                    title="Subscribe"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Zero spam. One-click unsubscribe anytime.
                </span>
              </form>
            )}

            <div className="mt-6 flex items-center gap-3">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-cyan-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 SmartDesk Technologies Inc.</span>
            <span>·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Security Portal</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Status Dashboard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
