import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';
import { INITIAL_ASSETS, INITIAL_INCIDENTS, INITIAL_VAULT_SNIPPETS, RESOURCE_ARTICLES } from '../data/mockData';
import { 
  Search, 
  X, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Code2, 
  BookOpen, 
  CreditCard,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPages = [
    { id: 'home' as PageId, title: 'Platform Overview & Live Topology', section: 'Navigation', icon: <Cpu className="w-4 h-4 text-cyan-400" /> },
    { id: 'solutions' as PageId, title: 'Incident Hub & Real-Time SLA Tracking', section: 'Navigation', icon: <ShieldCheck className="w-4 h-4 text-violet-400" /> },
    { id: 'assets' as PageId, title: 'Asset Management & Health Monitoring', section: 'Navigation', icon: <Layers className="w-4 h-4 text-amber-400" /> },
    { id: 'vault' as PageId, title: 'Developer Command Vault & Shell Runner', section: 'Navigation', icon: <Code2 className="w-4 h-4 text-emerald-400" /> },
    { id: 'resources' as PageId, title: 'Documentation, Specs & SRE Runbooks', section: 'Navigation', icon: <BookOpen className="w-4 h-4 text-blue-400" /> },
    { id: 'pricing' as PageId, title: 'Pricing Tiers & Enterprise ROI Calculator', section: 'Navigation', icon: <CreditCard className="w-4 h-4 text-cyan-400" /> },
  ].filter(p => !query || p.title.toLowerCase().includes(query.toLowerCase()));

  const filteredIncidents = INITIAL_INCIDENTS.filter(i => 
    !query || i.title.toLowerCase().includes(query.toLowerCase()) || i.service.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredAssets = INITIAL_ASSETS.filter(a => 
    !query || a.name.toLowerCase().includes(query.toLowerCase()) || a.hostname.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredSnippets = INITIAL_VAULT_SNIPPETS.filter(s => 
    !query || s.title.toLowerCase().includes(query.toLowerCase()) || s.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 3);

  const filteredDocs = RESOURCE_ARTICLES.filter(d => 
    !query || d.title.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2);

  const handleSelectPage = (page: PageId) => {
    onNavigate(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#090D1A] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,242,254,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-[#0c1224]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, active incidents, assets, vault commands..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4 text-xs">
          {/* Pages */}
          {filteredPages.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 font-mono text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Pages & Hubs
              </div>
              <div className="space-y-1">
                {filteredPages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => handleSelectPage(page.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-white/5 group-hover:bg-cyan-500/20">
                        {page.icon}
                      </div>
                      <span className="text-sm text-slate-200 group-hover:text-cyan-300 font-medium">
                        {page.title}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Incidents */}
          {filteredIncidents.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 font-mono text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Active Incidents
              </div>
              <div className="space-y-1">
                {filteredIncidents.map((inc) => (
                  <button
                    key={inc.id}
                    onClick={() => handleSelectPage('solutions')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white/5 border border-white/5 text-left transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-cyan-400 font-medium">{inc.id}</span>
                        <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
                          {inc.title}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {inc.service} · SLA Remaining: {inc.slaRemaining}
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                      inc.severity === 'P1' ? 'bg-red-950 text-red-400 border-red-500/40' : 'bg-amber-950 text-amber-400 border-amber-500/40'
                    }`}>
                      {inc.severity}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Assets */}
          {filteredAssets.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 font-mono text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Monitored Assets
              </div>
              <div className="space-y-1">
                {filteredAssets.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => handleSelectPage('assets')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white/5 border border-white/5 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
                        {asset.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {asset.hostname} · {asset.region}
                      </div>
                    </div>
                    <span className="font-mono text-emerald-400 text-xs">
                      {asset.healthScore}% Health
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Vault Commands */}
          {filteredSnippets.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 font-mono text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Developer Vault Runbooks
              </div>
              <div className="space-y-1">
                {filteredSnippets.map((snp) => (
                  <button
                    key={snp.id}
                    onClick={() => handleSelectPage('vault')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white/5 border border-white/5 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
                        {snp.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5 line-clamp-1">
                        {snp.commandSnippet}
                      </div>
                    </div>
                    <span className="font-mono text-cyan-400 text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                      {snp.language}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/10 bg-[#060914] text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 py-0.5 bg-white/10 rounded font-mono text-slate-300">↵</kbd> Select</span>
            <span><kbd className="px-1 py-0.5 bg-white/10 rounded font-mono text-slate-300">ESC</kbd> Close</span>
          </div>
          <span className="font-mono text-cyan-400">SmartDesk Pro v2026.4</span>
        </div>
      </div>
    </div>
  );
};
