import React, { useState } from 'react';
import { PageId, Asset, AssetCategory } from '../types';
import { INITIAL_ASSETS } from '../data/mockData';
import { 
  Layers, 
  Search, 
  Server, 
  Cpu, 
  Database, 
  ShieldCheck, 
  HardDrive, 
  Check, 
  X, 
  Activity, 
  RefreshCw, 
  Zap, 
  Lock, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface AssetsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookDemo: () => void;
}

export const AssetsPage: React.FC<AssetsPageProps> = ({ onNavigate, onOpenBookDemo }) => {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [categoryFilter, setCategoryFilter] = useState<'All' | AssetCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(INITIAL_ASSETS[0]);
  const [isProbing, setIsProbing] = useState(false);

  const filteredAssets = assets.filter(item => {
    const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.hostname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSimulateProbe = () => {
    setIsProbing(true);
    setTimeout(() => {
      setIsProbing(false);
      if (selectedAsset) {
        setSelectedAsset({
          ...selectedAsset,
          healthScore: Math.min(100, selectedAsset.healthScore + 2),
          lastAudit: 'Just now (eBPF Verified)'
        });
      }
    }, 700);
  };

  return (
    <div className="relative min-h-screen text-slate-100 pb-24">
      {/* Background patterns */}
      <div className="absolute inset-0 cosmic-grid-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <section className="relative pt-12 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>CONTINUOUS INFRASTRUCTURE & ASSET DISCOVERY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Single-Pane Visibility Over{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              Every Server, Pod & License.
            </span>
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Legacy CMDBs rot the day after they are filled. SmartDesk Pro's ultra-lightweight eBPF probes stream live topology, socket metrics, and security compliance directly from Linux kernels.
          </p>
        </div>
      </section>

      {/* LIVE ASSET EXPLORER & DETAIL INSPECTOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Asset Search, Filters & Grid */}
          <div className="lg:col-span-2 space-y-5">
            {/* Filter & Search Bar */}
            <div className="p-4 rounded-xl bg-[#080C1A] border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by hostname, IP address, region, or service..."
                  className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Category Segmented Tabs */}
              <div className="flex flex-wrap gap-1 p-1 bg-black/40 rounded-lg text-xs font-mono">
                {(['All', 'Cloud', 'Database', 'Hardware', 'License'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat as any)}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      categoryFilter === cat
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Asset Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredAssets.map(asset => {
                const isSelected = selectedAsset?.id === asset.id;
                return (
                  <div
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'bg-[#0E152B] border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.2)]'
                        : 'bg-[#080C19] border-white/10 hover:border-cyan-500/40 hover:bg-[#0b1022]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-cyan-400 font-semibold">
                        {asset.id}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        asset.status === 'Healthy' ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' :
                        asset.status === 'Degraded' ? 'bg-amber-950 text-amber-400 border-amber-500/40' :
                        'bg-red-950 text-red-400 border-red-500/40'
                      }`}>
                        {asset.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300">
                        {asset.name}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">
                        {asset.hostname}
                      </p>
                    </div>

                    {/* Quick Metric Bars */}
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="flex justify-between text-slate-400">
                        <span>CPU Load: {asset.cpuUsage}%</span>
                        <span>Memory: {asset.memoryUsage}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            asset.cpuUsage > 85 ? 'bg-red-400' : asset.cpuUsage > 70 ? 'bg-amber-400' : 'bg-cyan-400'
                          }`}
                          style={{ width: `${asset.cpuUsage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-white/5">
                      <span>{asset.region}</span>
                      <span className="text-emerald-400">{asset.healthScore}% Score</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Col: Selected Asset Detail Inspector */}
          {selectedAsset && (
            <div className="p-6 rounded-2xl bg-[#090D1C] border border-cyan-500/30 space-y-5 h-fit shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">ASSET INSPECTOR</span>
                  <h3 className="text-lg font-bold font-heading text-white">{selectedAsset.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold font-mono text-emerald-400">
                    {selectedAsset.healthScore}%
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">HEALTH SCORE</div>
                </div>
              </div>

              {/* Technical Attributes */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Asset ID:</span>
                  <span className="text-slate-200">{selectedAsset.id}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Hostname:</span>
                  <span className="text-cyan-300 truncate max-w-[200px]">{selectedAsset.hostname}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">IP Address:</span>
                  <span className="text-slate-200">{selectedAsset.ipAddress}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Category / Env:</span>
                  <span className="text-slate-200">{selectedAsset.category} · {selectedAsset.environment}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Region:</span>
                  <span className="text-slate-200">{selectedAsset.region}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Last eBPF Audit:</span>
                  <span className="text-emerald-400">{selectedAsset.lastAudit}</span>
                </div>
              </div>

              {/* Compliance Badges */}
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-2">
                  Compliance Posture:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAsset.compliance.map(badge => (
                    <span
                      key={badge}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-cyan-300 flex items-center gap-1"
                    >
                      <ShieldCheck className="w-3 h-3 text-cyan-400" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleSimulateProbe}
                  disabled={isProbing}
                  className="w-full py-2.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isProbing ? 'animate-spin' : ''}`} />
                  <span>{isProbing ? 'Probing Kernel Sockets...' : 'Trigger Deep eBPF Health Probe'}</span>
                </button>
                <button
                  onClick={() => onNavigate('vault')}
                  className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <span>Attach Remediation Runbook</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FEATURE COMPARISON MATRIX (SMARTDESK PRO VS LEGACY ITSM) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-mono text-cyan-400 uppercase">Competitive Matrix</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Why Modern Engineering Teams Choose SmartDesk Pro
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Compare SmartDesk Pro with legacy ITSM CMDB solutions.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#080C1A] shadow-xl">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-slate-300">
                <th className="p-4 font-semibold font-sans">Capability</th>
                <th className="p-4 font-semibold text-cyan-400 bg-cyan-950/30 border-x border-cyan-500/20">SmartDesk Pro</th>
                <th className="p-4 font-semibold text-slate-400">Legacy CMDB (ServiceNow)</th>
                <th className="p-4 font-semibold text-slate-400">Jira Service Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="p-4 font-sans font-medium text-white">Kernel-Level eBPF Discovery</td>
                <td className="p-4 bg-cyan-950/20 text-cyan-300 font-bold border-x border-cyan-500/20">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-400" /> Continuous (&lt; 0.2% CPU)</span>
                </td>
                <td className="p-4 text-slate-500">Requires Heavy Agents</td>
                <td className="p-4 text-slate-500">Manual / Plugin Dependant</td>
              </tr>
              <tr>
                <td className="p-4 font-sans font-medium text-white">Autonomous AI Root-Cause Diagnostics</td>
                <td className="p-4 bg-cyan-950/20 text-cyan-300 font-bold border-x border-cyan-500/20">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-400" /> Sub-Second Log Synthesis</span>
                </td>
                <td className="p-4 text-slate-500">Manual triage required</td>
                <td className="p-4 text-slate-500">Basic keyword search</td>
              </tr>
              <tr>
                <td className="p-4 font-sans font-medium text-white">Curated Developer Command Vault</td>
                <td className="p-4 bg-cyan-950/20 text-cyan-300 font-bold border-x border-cyan-500/20">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-400" /> Built-in with 1-Click Execution</span>
                </td>
                <td className="p-4 text-slate-500">Not Supported</td>
                <td className="p-4 text-slate-500">External Confluence docs</td>
              </tr>
              <tr>
                <td className="p-4 font-sans font-medium text-white">Time to Value & Setup</td>
                <td className="p-4 bg-cyan-950/20 text-cyan-300 font-bold border-x border-cyan-500/20">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-400" /> 10 Minutes via Helm / CLI</span>
                </td>
                <td className="p-4 text-slate-500">6 - 9 Months Consultant Setup</td>
                <td className="p-4 text-slate-500">2 - 4 Weeks Complex Setup</td>
              </tr>
              <tr>
                <td className="p-4 font-sans font-medium text-white">Air-Gapped & FedRAMP Support</td>
                <td className="p-4 bg-cyan-950/20 text-cyan-300 font-bold border-x border-cyan-500/20">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-400" /> Available in Enterprise</span>
                </td>
                <td className="p-4 text-slate-300">Expensive Custom Contract</td>
                <td className="p-4 text-slate-500">Limited Cloud only</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
