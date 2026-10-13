import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Terminal, 
  ShieldAlert, 
  Layers, 
  Code2, 
  Activity, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Server, 
  Zap, 
  Cpu, 
  Database, 
  Play, 
  RefreshCw, 
  Flame, 
  Lock, 
  ExternalLink,
  ChevronRight,
  TrendingDown,
  Gauge
} from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookDemo: () => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBookDemo,
  onOpenSearch,
}) => {
  // Hero Preview Tab State
  const [activeHeroTab, setActiveHeroTab] = useState<'topology' | 'incidents' | 'latency' | 'vault'>('topology');

  // Interactive Live Demo Simulator State
  const [demoStep, setDemoStep] = useState<'normal' | 'incident' | 'diagnosing' | 'resolved'>('normal');
  const [demoLog, setDemoLog] = useState<string[]>([]);

  const handleRunDemoSimulation = () => {
    setDemoStep('incident');
    setDemoLog([
      '[21:14:02] ALERT: PostgreSQL read_pool_01 connection saturation reached 98%.',
      '[21:14:03] P1 Severity assigned: Blast radius > 35% user auth endpoints.'
    ]);

    setTimeout(() => {
      setDemoStep('diagnosing');
      setDemoLog(prev => [
        ...prev,
        '[21:14:05] SmartDesk AI: eBPF probe isolated 12 zombie pooler worker connections.',
        '[21:14:06] Suggested Runbook: VLT-102 (Graceful Lock Termination).'
      ]);
    }, 1200);

    setTimeout(() => {
      setDemoStep('resolved');
      setDemoLog(prev => [
        ...prev,
        '[21:14:08] Runbook executed successfully in 2.1s.',
        '[21:14:09] Connection saturation normalized to 24%. SLA met within 7 seconds.'
      ]);
    }, 2800);
  };

  const handleResetDemo = () => {
    setDemoStep('normal');
    setDemoLog([]);
  };

  return (
    <div className="relative min-h-screen text-slate-100 overflow-hidden">
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 cosmic-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-cyan-600/15 via-violet-600/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[45%] -left-40 w-[600px] h-[600px] bg-cyan-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[65%] -right-40 w-[600px] h-[600px] bg-violet-600/10 blur-[130px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Release Kicker Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold">SmartDesk Pro v2026.4</span>
            <span className="text-cyan-500">|</span>
            <span className="text-slate-300">Autonomous Incident Resolution & eBPF Asset Hub</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          {/* Bold Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight text-white leading-[1.08]">
            NextGen IT & Developer{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">
              Operations Platform
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Unify real-time incident triage, live eBPF asset discovery, developer runbook vault, and sub-second AI diagnostics into a single ultra-responsive glass pane.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('solutions')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 border border-cyan-400/50 shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,242,254,0.55)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Explore Incident Hub</span>
              <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenBookDemo}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Book a Live Demo</span>
            </button>
          </div>

          {/* Quick Stats Highlights */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Zero agent overhead (&lt;0.2% CPU)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> SOC2 Type II & FedRAMP Ready
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 14-Day Full Sandbox Trial
            </span>
          </div>
        </div>

        {/* 3D-STYLE PLATFORM PREVIEW HERO MOCKUP */}
        <div className="mt-14 relative max-w-5xl mx-auto rounded-2xl p-1 bg-gradient-to-b from-cyan-500/30 via-violet-500/20 to-transparent shadow-[0_0_60px_rgba(0,242,254,0.18)]">
          <div className="rounded-2xl bg-[#090D1C] border border-white/10 overflow-hidden">
            {/* Top Mockup Titlebar */}
            <div className="px-4 py-3 bg-[#0c1226] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-xs font-mono text-slate-400 ml-2">
                  smartdesk://telemetry-hub.prod.global
                </span>
              </div>

              {/* Mockup Tab Controls */}
              <div className="flex items-center gap-1 p-1 bg-black/40 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setActiveHeroTab('topology')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeHeroTab === 'topology'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Live Cluster Topology
                </button>
                <button
                  onClick={() => setActiveHeroTab('incidents')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeHeroTab === 'incidents'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Autonomous Triage
                </button>
                <button
                  onClick={() => setActiveHeroTab('latency')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeHeroTab === 'latency'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Latency Horizon
                </button>
                <button
                  onClick={() => setActiveHeroTab('vault')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeHeroTab === 'vault'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Remediation Vault
                </button>
              </div>
            </div>

            {/* Mockup Content Views */}
            <div className="p-6 min-h-[380px] bg-[#070A16]">
              {activeHeroTab === 'topology' && (
                <div className="space-y-6">
                  {/* Status header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                        <Activity className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          Global Mesh: 128 Active Compute Nodes
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          Multi-Region eBPF Telemetry Ingest: 48,200 events/sec
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                      HEALTH: 99.98%
                    </span>
                  </div>

                  {/* Topology Nodes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#0b1022] border border-cyan-500/30 space-y-2 hover:border-cyan-400 transition-colors">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-cyan-400 font-semibold">k8s-us-east-prod</span>
                        <span className="text-[10px] text-emerald-400 font-mono">3.2ms</span>
                      </div>
                      <div className="text-[11px] text-slate-300">Ingress Gateway & Mesh</div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-cyan-400 h-full w-[42%]" />
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono flex justify-between">
                        <span>CPU: 42%</span>
                        <span>MEM: 68%</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0b1022] border border-white/10 space-y-2 hover:border-cyan-400 transition-colors">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-violet-400 font-semibold">pg-distributed-01</span>
                        <span className="text-[10px] text-emerald-400 font-mono">1.8ms</span>
                      </div>
                      <div className="text-[11px] text-slate-300">PostgreSQL Sharded Core</div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-violet-400 h-full w-[65%]" />
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono flex justify-between">
                        <span>CPU: 36%</span>
                        <span>MEM: 62%</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0b1022] border border-amber-500/30 space-y-2 hover:border-amber-400 transition-colors">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-amber-400 font-semibold">redis-cache-farm</span>
                        <span className="text-[10px] text-amber-400 font-mono">6.4ms</span>
                      </div>
                      <div className="text-[11px] text-slate-300">Volatile Session Cache</div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full w-[84%]" />
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono flex justify-between">
                        <span>CPU: 78%</span>
                        <span>MEM: 84%</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0b1022] border border-white/10 space-y-2 hover:border-cyan-400 transition-colors">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-emerald-400 font-semibold">h100-gpu-cluster</span>
                        <span className="text-[10px] text-emerald-400 font-mono">0.8ms</span>
                      </div>
                      <div className="text-[11px] text-slate-300">Bare-Metal AI Compute</div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[89%]" />
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono flex justify-between">
                        <span>GPU: 89%</span>
                        <span>TEMP: 64°C</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      Dynamic eBPF kernel monitoring active across all cloud VPCs and physical racks.
                    </span>
                    <button 
                      onClick={() => onNavigate('assets')}
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                    >
                      View All 128 Assets <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {activeHeroTab === 'incidents' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-red-950 text-red-400 border border-red-500/40">
                          P1 CRITICAL
                        </span>
                        <span className="font-mono text-xs text-slate-300">INC-8942</span>
                        <span className="text-sm font-semibold text-white">PostgreSQL Connection Exhaustion</span>
                      </div>
                      <p className="text-xs text-slate-300">
                        AI Root Cause: Leaked connection handles from auth-service v2.8.4 worker pods.
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono text-slate-400">SLA Remaining</div>
                      <div className="text-sm font-mono font-bold text-red-400">10m 48s</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/60 border border-cyan-500/30 font-mono text-xs space-y-2">
                    <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      AUTONOMOUS RESOLUTION PIPELINE IN PROGRESS:
                    </div>
                    <div className="text-slate-300">
                      Step 1/3: Pod health check flagged pooler zombie handles. [PASSED]
                    </div>
                    <div className="text-slate-300">
                      Step 2/3: Dispatched runbook `pgbouncer_flush_zombies.sh --pool=read_write`. [EXECUTING]
                    </div>
                    <div className="text-slate-500">
                      Step 3/3: Re-verify connection latency & update PagerDuty incident. [PENDING]
                    </div>
                  </div>

                  <button 
                    onClick={() => onNavigate('solutions')}
                    className="w-full py-2.5 text-center text-xs font-semibold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-500/30 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    Open Incident Management Hub <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {activeHeroTab === 'latency' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-center">
                      <div className="text-xs text-slate-400 font-mono">P50 Latency</div>
                      <div className="text-xl font-bold font-mono text-emerald-400">1.8 ms</div>
                    </div>
                    <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-center">
                      <div className="text-xs text-slate-400 font-mono">P95 Latency</div>
                      <div className="text-xl font-bold font-mono text-cyan-400">6.4 ms</div>
                    </div>
                    <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-center">
                      <div className="text-xs text-slate-400 font-mono">P99 Latency</div>
                      <div className="text-xl font-bold font-mono text-violet-400">14.2 ms</div>
                    </div>
                  </div>

                  {/* Simulated Latency Bars */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                    <div className="text-xs font-mono text-slate-400 flex justify-between">
                      <span>Regional Distribution</span>
                      <span>Edge Gateway Ingress</span>
                    </div>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-slate-400">us-east-1</span>
                        <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-full w-[24%]" />
                        </div>
                        <span className="w-12 text-right text-emerald-400">2.4ms</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-slate-400">eu-central-1</span>
                        <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-cyan-400 h-full w-[38%]" />
                        </div>
                        <span className="w-12 text-right text-cyan-400">4.1ms</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-slate-400">ap-southeast-1</span>
                        <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-violet-400 h-full w-[62%]" />
                        </div>
                        <span className="w-12 text-right text-violet-400">8.9ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeHeroTab === 'vault' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Target Runbook: VLT-101 (Docker Prune & Storage Reclaim)</span>
                    <span className="text-cyan-400">Verified by SecOps</span>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-black/80 border border-cyan-500/20 text-cyan-300 overflow-x-auto text-[11px] leading-relaxed">
{`curl -sL https://vault.smartdesk.pro/run/VLT-101 | sudo bash
[SmartDesk] Verifying container storage limits...
[SmartDesk] Free disk space restored: +24.8 GB reclaimed with zero downtime.`}
                  </pre>
                  <button
                    onClick={() => onNavigate('vault')}
                    className="w-full py-2.5 text-center text-xs font-semibold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-500/30 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    Open Developer Command Vault <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE METRICS BAR */}
      <section className="relative py-12 border-y border-white/10 bg-[#060914]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center sm:text-left space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight flex items-center justify-center sm:justify-start gap-1">
                <span>99.98</span>
                <span className="text-cyan-400">%</span>
              </div>
              <div className="text-xs font-semibold text-slate-300">System Availability SLA</div>
              <p className="text-[11px] text-slate-400 font-mono">Guaranteed five-nines ready</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center sm:text-left space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight flex items-center justify-center sm:justify-start gap-1">
                <span>128</span>
                <span className="text-violet-400">+</span>
              </div>
              <div className="text-xs font-semibold text-slate-300">Enterprise Assets Managed</div>
              <p className="text-[11px] text-slate-400 font-mono">Cloud, Bare-Metal & DBs</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center sm:text-left space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight flex items-center justify-center sm:justify-start gap-1">
                <span>11</span>
                <span className="text-emerald-400">min</span>
              </div>
              <div className="text-xs font-semibold text-slate-300">Avg Resolution Time (MTTR)</div>
              <p className="text-[11px] text-slate-400 font-mono">Reduced down from 58 mins</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center sm:text-left space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight flex items-center justify-center sm:justify-start gap-1">
                <span>4.2M</span>
              </div>
              <div className="text-xs font-semibold text-slate-300">Automated Ops / Month</div>
              <p className="text-[11px] text-slate-400 font-mono">Zero-touch execution stream</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUE PROPOSITIONS GRID */}
      <section className="relative py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-mono font-semibold tracking-wider uppercase text-cyan-400">
            Engineered For High-Velocity SRE & DevOps
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Four Core Pillars. One Cohesive Control Hub.
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Eliminate alert fatigue and fragmented operations tools with an integrated intelligence platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Proposition 1: AI Diagnostics */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#090D1A] border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-cyan-400">01 / DIAGNOSTICS</span>
            </div>
            <h3 className="text-xl font-bold font-heading text-white mb-2">
              Autonomous AI Root-Cause Diagnostics
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Ingest stack traces, kernel faults, and distributed traces. SmartDesk isolates the faulting code commit or anomalous container within milliseconds, providing copy-ready mitigation commands.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 cursor-pointer" onClick={() => onNavigate('pricing')}>
              <span>Test AI Log Explainer in Sandbox</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Proposition 2: Incident Automation */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#090D1A] border border-violet-500/20 hover:border-violet-400/50 transition-all duration-300 group shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-violet-400">02 / INCIDENTS</span>
            </div>
            <h3 className="text-xl font-bold font-heading text-white mb-2">
              Real-Time SLA & Incident Workflow Hub
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Automated P1-P4 severity assignment based on blast radius calculation. Real-time countdown clocks, automated Slack war rooms, and instant escalation prevent costly contractual SLA breaches.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-violet-400 group-hover:text-violet-300 cursor-pointer" onClick={() => onNavigate('solutions')}>
              <span>View Incident Management Flow</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Proposition 3: Asset Tracking */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#090D1A] border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 group shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-amber-400">03 / ASSETS</span>
            </div>
            <h3 className="text-xl font-bold font-heading text-white mb-2">
              Continuous Asset & License Discovery
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Ultra-lightweight eBPF probes stream live CPU/Memory utilization, socket dependencies, and security compliance postures across AWS, GCP, bare-metal clusters, and SaaS licenses.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 group-hover:text-amber-300 cursor-pointer" onClick={() => onNavigate('assets')}>
              <span>Explore Live Asset Registry</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Proposition 4: Developer Vault */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#090D1A] border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 group shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-emerald-400">04 / RUNBOOKS</span>
            </div>
            <h3 className="text-xl font-bold font-heading text-white mb-2">
              Developer Command & Code Snippet Vault
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Stop hunting through old Slack threads or personal gists. Curate battle-tested, peer-reviewed SQL, Docker, Bash, and K8s playbooks with 1-click execution simulation and verification.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 cursor-pointer" onClick={() => onNavigate('vault')}>
              <span>Launch Command Runner</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE PRODUCT DEMO SHOWCASE (CHAOS SIMULATOR) */}
      <section className="relative py-16 bg-[#080C1A] border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold uppercase mb-1">
                <Zap className="w-3.5 h-3.5" /> Interactive Playground
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Experience Autonomous Resolution in Real Time
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Trigger a simulated database connection spike and watch SmartDesk Pro isolate and resolve it.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {demoStep === 'normal' && (
                <button
                  onClick={handleRunDemoSimulation}
                  className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-red-600/30 cursor-pointer"
                >
                  <Flame className="w-4 h-4 text-amber-200" />
                  <span>Simulate P1 Production Outage</span>
                </button>
              )}
              {demoStep !== 'normal' && (
                <button
                  onClick={handleResetDemo}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Simulation</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Simulation Terminal Box */}
          <div className="rounded-xl bg-[#030611] border border-cyan-500/30 p-4 font-mono text-xs overflow-hidden shadow-[0_0_40px_rgba(0,242,254,0.15)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-slate-400 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ENVIRONMENT: prod-us-east-cluster</span>
              </div>
              <span>STATE: {demoStep.toUpperCase()}</span>
            </div>

            <div className="py-4 space-y-2 min-h-[140px]">
              {demoStep === 'normal' && (
                <div className="text-slate-400 italic">
                  Cluster operational. System latency: 2.1ms. Click "Simulate P1 Production Outage" above to begin.
                </div>
              )}
              {demoLog.map((line, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed animate-in fade-in duration-200 ${
                    line.includes('P1') ? 'text-red-400 font-bold' :
                    line.includes('SmartDesk AI') ? 'text-cyan-300 font-semibold' :
                    line.includes('successfully') ? 'text-emerald-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  {line}
                </div>
              ))}
              {demoStep === 'diagnosing' && (
                <div className="text-cyan-400 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing zero-touch patch...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER TESTIMONIALS SECTION */}
      <section className="relative py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="text-xs font-mono font-semibold text-cyan-400 uppercase">
            Trusted By Engineering Leaders
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Built for Modern High-Availability Teams
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#090D1A] border border-white/10 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 inline-block">
                  {t.metrics}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border border-cyan-400/30"
                />
                <div>
                  <div className="text-sm font-bold text-white">{t.author}</div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                  <div className="text-xs text-cyan-400 font-mono">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
