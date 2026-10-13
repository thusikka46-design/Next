import React, { useState } from 'react';
import { PageId, VaultSnippet } from '../types';
import { INITIAL_VAULT_SNIPPETS, INTEGRATIONS_LIST } from '../data/mockData';
import { 
  Code2, 
  Terminal, 
  Search, 
  Copy, 
  Check, 
  Play, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Filter, 
  Layers, 
  Cpu, 
  Activity, 
  RefreshCw,
  Box,
  Ship,
  Database,
  Cloud
} from 'lucide-react';

interface VaultPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookDemo: () => void;
}

export const VaultPage: React.FC<VaultPageProps> = ({ onNavigate, onOpenBookDemo }) => {
  const [snippets, setSnippets] = useState<VaultSnippet[]>(INITIAL_VAULT_SNIPPETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [langFilter, setLangFilter] = useState<'All' | 'bash' | 'sql' | 'python'>('All');
  const [selectedSnippet, setSelectedSnippet] = useState<VaultSnippet>(INITIAL_VAULT_SNIPPETS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Simulation execution state
  const [isSimulating, setIsSimulating] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);

  const filteredSnippets = snippets.filter(snp => {
    const matchesLang = langFilter === 'All' || snp.language === langFilter;
    const matchesSearch = !searchQuery || 
      snp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      snp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snp.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLang && matchesSearch;
  });

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTerminalOutput(`[smartdesk-agent] Validating cryptographic signature for ${selectedSnippet.id}...\n[smartdesk-agent] Verified by: ${selectedSnippet.verifiedBy}\n[smartdesk-agent] Initializing isolated sandboxed container runtime (cgroups v2)...`);

    setTimeout(() => {
      setTerminalOutput(prev => `${prev}\n[exec] Running ${selectedSnippet.title}...\n[stdout] >> All checks completed without warnings.\n[stdout] >> Exit code 0 (Success). Duration: 1.48s.`);
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen text-slate-100 pb-24">
      {/* Cosmic background */}
      <div className="absolute inset-0 cosmic-grid-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <section className="relative pt-12 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>DEVELOPER COMMAND & RUNBOOK VAULT</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Peer-Reviewed Scripts That Never{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Break Production.
            </span>
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Replace unverified terminal snippets and outdated wikis with cryptographically signed, peer-reviewed operational playbooks for Bash, SQL, Kubernetes, Docker, and Python.
          </p>
        </div>
      </section>

      {/* INTERACTIVE VAULT SEARCH & TERMINAL RUNNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Snippet Selector & Filters (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-[#080C1A] border border-white/10 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by keyword, tool, or tag (Docker, Postgres, K8s)..."
                  className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Language Filters */}
              <div className="flex gap-1.5 p-1 bg-black/40 rounded-lg text-xs font-mono">
                {(['All', 'bash', 'sql', 'python'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLangFilter(lang as any)}
                    className={`px-3 py-1 rounded transition-colors uppercase ${
                      langFilter === lang
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Snippet List */}
            <div className="space-y-3">
              {filteredSnippets.map(snp => {
                const isSelected = selectedSnippet.id === snp.id;
                return (
                  <div
                    key={snp.id}
                    onClick={() => {
                      setSelectedSnippet(snp);
                      setTerminalOutput(null);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-[#0b1424] border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                        : 'bg-[#080C19] border-white/10 hover:border-emerald-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-emerald-400 font-semibold">{snp.id}</span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-slate-300">
                          {snp.language}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {snp.runsCount.toLocaleString()} runs
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-300">
                      {snp.title}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {snp.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {snp.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-slate-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Code Editor & Execution Terminal (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Code Box */}
            <div className="rounded-2xl bg-[#070A15] border border-white/10 overflow-hidden shadow-2xl">
              {/* Top Bar */}
              <div className="px-4 py-3 bg-[#0a0f21] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-semibold text-white">
                    {selectedSnippet.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(selectedSnippet.code, selectedSnippet.id)}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === selectedSnippet.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === selectedSnippet.id ? 'Copied' : 'Copy Code'}</span>
                  </button>

                  <button
                    onClick={handleRunSimulation}
                    disabled={isSimulating}
                    className="px-3 py-1 rounded bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-semibold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{isSimulating ? 'Executing...' : 'Run Simulation'}</span>
                  </button>
                </div>
              </div>

              {/* Code display */}
              <div className="p-4 bg-[#05070f] overflow-x-auto max-h-[340px]">
                <pre className="text-xs font-mono text-emerald-300 leading-relaxed whitespace-pre-wrap">
                  {selectedSnippet.code}
                </pre>
              </div>

              {/* Verified Badge */}
              <div className="px-4 py-2.5 bg-[#090D1A] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {selectedSnippet.verifiedBy}
                </span>
                <span>Category: {selectedSnippet.category}</span>
              </div>
            </div>

            {/* Interactive Terminal Execution Stream */}
            <div className="rounded-xl bg-[#03050C] border border-cyan-500/30 p-4 font-mono text-xs shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-[11px] pb-1 border-b border-white/5">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  ISOLATED SANDBOX TERMINAL
                </span>
                <span>TARGET: dev-sandbox-v2</span>
              </div>

              <div className="min-h-[110px] text-slate-300 leading-relaxed whitespace-pre-wrap">
                {terminalOutput ? (
                  <span className="text-cyan-300">{terminalOutput}</span>
                ) : (
                  <span className="text-slate-500 italic">
                    Ready. Click "Run Simulation" above to test runbook execution in a safe sandboxed container.
                  </span>
                )}
                {isSimulating && (
                  <div className="text-emerald-400 flex items-center gap-2 mt-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing pipeline dry-run...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTED INTEGRATIONS ECOSYSTEM */}
      <section id="integrations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-mono text-cyan-400 uppercase">Universal Compatibility</div>
          <h2 className="text-3xl font-extrabold font-heading text-white">
            Native Connectors Across Your Infrastructure Stack
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Bidirectional webhooks, OpenTelemetry exporters, and CLI drivers ready out of the box.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INTEGRATIONS_LIST.map(item => (
            <div
              key={item.name}
              className="p-5 rounded-xl bg-[#080C1A] border border-white/10 hover:border-cyan-400/40 transition-all space-y-2.5 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/5 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300">
                      {item.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500">{item.category}</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  {item.status} · {item.latency}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
