import React, { useState } from 'react';
import { PageId, ResourceArticle } from '../types';
import { RESOURCE_ARTICLES } from '../data/mockData';
import { 
  BookOpen, 
  Search, 
  FileText, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Layers, 
  Download, 
  Terminal,
  Activity,
  Server
} from 'lucide-react';

interface ResourcesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookDemo: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigate, onOpenBookDemo }) => {
  const [articles, setArticles] = useState<ResourceArticle[]>(RESOURCE_ARTICLES);
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Guides' | 'Whitepapers' | 'Architecture' | 'Runbooks' | 'Compliance'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<ResourceArticle | null>(null);

  const filteredArticles = articles.filter(art => {
    const matchesCat = categoryFilter === 'All' || art.category === categoryFilter;
    const matchesSearch = !searchQuery || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="relative min-h-screen text-slate-100 pb-24">
      {/* Background grid */}
      <div className="absolute inset-0 cosmic-grid-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <section className="relative pt-12 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/40 text-blue-300 text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>KNOWLEDGE BASE, ARCHITECTURE & RUNBOOKS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Engineering Specs, Whitepapers &{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              Zero-Touch Guides.
            </span>
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Everything you need to deploy, integrate, and scale autonomous IT operations across multi-cloud and bare-metal environments.
          </p>
        </div>
      </section>

      {/* INTERACTIVE ARCHITECTURE BLUEPRINT VISUALIZER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#090D1C] border border-cyan-500/30 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase">SYSTEM ARCHITECTURE</span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                SmartDesk Core Distributed Topology
              </h2>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
              Latency: &lt; 2.4ms Worldwide
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            {/* Box 1 */}
            <div className="p-4 rounded-xl bg-[#060914] border border-white/10 space-y-2">
              <div className="text-cyan-400 flex items-center gap-1.5 font-semibold">
                <Server className="w-4 h-4" />
                <span>1. Edge Ingress Layer</span>
              </div>
              <p className="text-slate-400 text-[11px] font-sans">
                High-availability Envoy mesh, TLS termination, DDoS shield, and real-time socket rate limiters.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-4 rounded-xl bg-[#060914] border border-violet-500/30 space-y-2">
              <div className="text-violet-400 flex items-center gap-1.5 font-semibold">
                <Cpu className="w-4 h-4" />
                <span>2. AI Inference Engine</span>
              </div>
              <p className="text-slate-400 text-[11px] font-sans">
                Gemini-powered real-time log synthesizer, AST parser, and blast-radius classifier.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-4 rounded-xl bg-[#060914] border border-emerald-500/30 space-y-2">
              <div className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                <Activity className="w-4 h-4" />
                <span>3. eBPF Kernel Probes</span>
              </div>
              <p className="text-slate-400 text-[11px] font-sans">
                Zero-overhead kernel filters gathering network TCP retransmits and socket states.
              </p>
            </div>

            {/* Box 4 */}
            <div className="p-4 rounded-xl bg-[#060914] border border-amber-500/30 space-y-2">
              <div className="text-amber-400 flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>4. Cryptographic Vault</span>
              </div>
              <p className="text-slate-400 text-[11px] font-sans">
                HSM key storage, immutable append-only execution logs, and RBAC policy enforcement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCHABLE RESOURCE LIBRARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-4 rounded-xl bg-[#080C1A] border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-blue-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation, whitepapers, runbook guides..."
              className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex flex-wrap gap-1 p-1 bg-black/40 rounded-lg text-xs font-mono">
            {(['All', 'Whitepapers', 'Architecture', 'Runbooks', 'Compliance'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat as any)}
                className={`px-3 py-1 rounded transition-colors ${
                  categoryFilter === cat
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map(art => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="p-6 rounded-2xl bg-[#080C19] border border-white/10 hover:border-blue-400/40 hover:bg-[#0B1024] transition-all cursor-pointer flex flex-col justify-between space-y-4 group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30 uppercase">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                    <span>{art.readTime}</span>
                    <span>·</span>
                    <span>{art.date}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="text-xs">
                  <span className="font-semibold text-white block">{art.author}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{art.authorRole}</span>
                </div>

                <span className="text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Read Spec</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ARTICLE READER DRAWER / MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-3xl max-h-[85vh] bg-[#080C1A] border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-white/10 bg-[#0c1224] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                  <span>{selectedArticle.category}</span>
                  <span>·</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <h3 className="text-xl font-bold font-heading text-white">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-cyan-200 text-xs font-mono">
                Author: {selectedArticle.author} ({selectedArticle.authorRole}) · {selectedArticle.date}
              </div>

              <div className="prose prose-invert max-w-none space-y-4">
                <div className="whitespace-pre-wrap font-mono text-xs text-slate-300">
                  {selectedArticle.content}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-[#060914] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">SmartDesk Architecture Standards</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-colors cursor-pointer"
              >
                Close Spec Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
