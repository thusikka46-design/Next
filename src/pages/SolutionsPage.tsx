import React, { useState } from 'react';
import { PageId, Incident, SeverityLevel } from '../types';
import { INITIAL_INCIDENTS } from '../data/mockData';
import { 
  ShieldAlert, 
  Clock, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Terminal, 
  AlertTriangle, 
  ArrowRight, 
  Filter, 
  Layers, 
  GitBranch, 
  Search,
  MessageSquare,
  Activity,
  Sliders,
  Copy,
  Check
} from 'lucide-react';

interface SolutionsPageProps {
  onNavigate: (page: PageId) => void;
  onRequestWorkflow: () => void;
  onOpenBookDemo: () => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  onNavigate,
  onRequestWorkflow,
  onOpenBookDemo,
}) => {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Investigating' | 'Remediating' | 'Monitoring' | 'Resolved'>('All');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(INITIAL_INCIDENTS[0]);
  const [copiedRunbook, setCopiedRunbook] = useState(false);

  // Severity Calculator interactive states
  const [calcUsersPercent, setCalcUsersPercent] = useState<number>(35);
  const [calcServiceTier, setCalcServiceTier] = useState<'core' | 'supporting' | 'internal'>('core');
  const [calcRevenueImpact, setCalcRevenueImpact] = useState<boolean>(true);

  const calculateSeverity = (): { level: SeverityLevel; label: string; sla: string; color: string } => {
    if (calcServiceTier === 'core' && (calcUsersPercent > 20 || calcRevenueImpact)) {
      return { level: 'P1', label: 'Critical Outage (Blast Radius > 20%)', sla: '15 Minutes', color: 'text-red-400 bg-red-950 border-red-500/40' };
    }
    if (calcUsersPercent > 10 || calcRevenueImpact || calcServiceTier === 'core') {
      return { level: 'P2', label: 'Major Degradation', sla: '60 Minutes', color: 'text-amber-400 bg-amber-950 border-amber-500/40' };
    }
    if (calcUsersPercent > 2) {
      return { level: 'P3', label: 'Minor Issue (Workaround Available)', sla: '24 Hours', color: 'text-cyan-400 bg-cyan-950 border-cyan-500/40' };
    }
    return { level: 'P4', label: 'Low / Informational Ticket', sla: '72 Hours', color: 'text-slate-400 bg-slate-900 border-slate-700' };
  };

  const calculatedSeverity = calculateSeverity();

  const handleResolveIncident = (id: string) => {
    setIncidents(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'Resolved', slaRemaining: 'Resolved successfully' };
      }
      return item;
    }));
    if (selectedIncident?.id === id) {
      setSelectedIncident(prev => prev ? { ...prev, status: 'Resolved', slaRemaining: 'Resolved successfully' } : null);
    }
  };

  const filteredIncidents = incidents.filter(i => {
    if (statusFilter === 'All') return true;
    return i.status === statusFilter;
  });

  const handleCopyRunbook = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRunbook(true);
    setTimeout(() => setCopiedRunbook(false), 2000);
  };

  return (
    <div className="relative min-h-screen text-slate-100 pb-24">
      {/* Ambient background */}
      <div className="absolute inset-0 cosmic-grid-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <section className="relative pt-12 pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/40 text-violet-300 text-xs font-mono">
            <ShieldAlert className="w-3.5 h-3.5 text-violet-400" />
            <span>SOLUTIONS & INCIDENT MANAGEMENT HUB</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Stop Firefighting. Start{' '}
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              Autonomous Remediation.
            </span>
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Eliminate chaotic on-call war rooms. SmartDesk Pro correlates telemetry alerts, assigns objective blast-radius severities, and triggers automated remediation scripts before SLAs breach.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onRequestWorkflow}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-xs transition-all shadow-[0_0_20px_rgba(121,40,202,0.3)] cursor-pointer"
            >
              Request Custom Workflow Solution
            </button>
            <button
              onClick={onOpenBookDemo}
              className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-medium transition-colors cursor-pointer"
            >
              Schedule Live SRE Walkthrough
            </button>
          </div>
        </div>
      </section>

      {/* INTERACTIVE WORKFLOW PIPELINE ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#090D1C] border border-white/10 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase">Automated Pipeline</div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                How SmartDesk Resolves Outages in &lt; 90 Seconds
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-400 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
              Blast Radius Gate: ACTIVE · HSM Signed
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-[10px] font-mono text-cyan-400">01 / INGESTION</div>
              <div className="text-sm font-semibold text-white">Telemetry Intake</div>
              <p className="text-xs text-slate-400">
                eBPF probes, Datadog & Prometheus ingest 100k events/sec.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-white/5 border border-violet-500/30 space-y-2">
              <div className="text-[10px] font-mono text-violet-400">02 / AI DIAGNOSTIC</div>
              <div className="text-sm font-semibold text-white">Root Cause Filter</div>
              <p className="text-xs text-slate-400">
                AI cross-references recent Git deploys and identifies memory leaks.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-white/5 border border-amber-500/30 space-y-2">
              <div className="text-[10px] font-mono text-amber-400">03 / SEVERITY GATE</div>
              <div className="text-sm font-semibold text-white">P1-P4 Tagging</div>
              <p className="text-xs text-slate-400">
                Calculates user impact % and locks strict SLA countdown timers.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-white/5 border border-emerald-500/30 space-y-2">
              <div className="text-[10px] font-mono text-emerald-400">04 / VAULT EXEC</div>
              <div className="text-sm font-semibold text-white">Runbook Trigger</div>
              <p className="text-xs text-slate-400">
                Safe dry-run script executes via Kubernetes or Bastion runner.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-xl bg-white/5 border border-blue-500/30 space-y-2">
              <div className="text-[10px] font-mono text-blue-400">05 / POST-MORTEM</div>
              <div className="text-sm font-semibold text-white">Automated Report</div>
              <p className="text-xs text-slate-400">
                Auto-generates incident summary and Slack channel report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SEVERITY CALCULATOR + LIVE SLA TRACKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Severity Calculator */}
          <div className="lg:col-span-1 p-6 rounded-2xl bg-[#080C1A] border border-cyan-500/30 space-y-5">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> Interactive Calculator
              </div>
              <h3 className="text-lg font-bold font-heading text-white mt-1">
                Objective Severity Calculator
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulate how SmartDesk Pro categorizes production incidents based on blast radius:
              </p>
            </div>

            {/* Slider: Affected Users % */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">User Traffic Affected:</span>
                <span className="text-cyan-400 font-bold">{calcUsersPercent}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={calcUsersPercent}
                onChange={(e) => setCalcUsersPercent(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Service Criticality */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 block">
                Impacted Service Tier:
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
                {(['core', 'supporting', 'internal'] as const).map(tier => (
                  <button
                    key={tier}
                    onClick={() => setCalcServiceTier(tier)}
                    className={`py-1.5 px-2 rounded-lg border capitalize transition-all ${
                      calcServiceTier === tier
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 font-bold'
                        : 'bg-white/5 text-slate-400 border-white/5 hover:text-slate-200'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Revenue Impact Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
              <span className="text-slate-300 font-medium">Direct Revenue / Checkout Path</span>
              <button
                onClick={() => setCalcRevenueImpact(!calcRevenueImpact)}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  calcRevenueImpact
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {calcRevenueImpact ? 'YES (High Risk)' : 'NO'}
              </button>
            </div>

            {/* Output Severity Result */}
            <div className={`p-4 rounded-xl border space-y-1 ${calculatedSeverity.color}`}>
              <div className="text-[10px] font-mono tracking-wider uppercase font-semibold">
                CALCULATED SEVERITY:
              </div>
              <div className="text-2xl font-extrabold font-mono flex items-center justify-between">
                <span>{calculatedSeverity.level}</span>
                <span className="text-xs font-sans font-normal opacity-90">SLA: {calculatedSeverity.sla}</span>
              </div>
              <div className="text-xs font-sans mt-1">
                {calculatedSeverity.label}
              </div>
            </div>
          </div>

          {/* ACTIVE INCIDENTS MANAGEMENT BOARD */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#090D1C] border border-white/10 space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-white">
                  Live Incident Queue & SLA Breach Counters
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time synchronization with Slack War Rooms and PagerDuty schedules
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap gap-1 p-1 bg-black/40 rounded-lg text-xs">
                {(['All', 'Investigating', 'Remediating', 'Resolved'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setStatusFilter(tab as any)}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      statusFilter === tab
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Incidents Table */}
            <div className="space-y-3">
              {filteredIncidents.map(inc => {
                const isSelected = selectedIncident?.id === inc.id;
                return (
                  <div
                    key={inc.id}
                    onClick={() => setSelectedIncident(inc)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white/10 border-cyan-400/60 shadow-[0_0_20px_rgba(0,242,254,0.15)]'
                        : 'bg-white/5 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${
                          inc.severity === 'P1' ? 'bg-red-950 text-red-400 border-red-500/40' :
                          inc.severity === 'P2' ? 'bg-amber-950 text-amber-400 border-amber-500/40' :
                          'bg-cyan-950 text-cyan-400 border-cyan-500/40'
                        }`}>
                          {inc.severity}
                        </span>
                        <span className="font-mono text-xs text-slate-400">{inc.id}</span>
                        <h4 className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors">
                          {inc.title}
                        </h4>
                      </div>

                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                        inc.status === 'Resolved' ? 'bg-emerald-950/70 text-emerald-400' :
                        inc.status === 'Remediating' ? 'bg-violet-950/70 text-violet-300' : 'bg-amber-950/70 text-amber-400'
                      }`}>
                        {inc.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
                      <div>Service: <span className="text-slate-200">{inc.service}</span></div>
                      <div>Team: <span className="text-slate-200">{inc.assignedTeam}</span></div>
                      <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>SLA: {inc.slaRemaining}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Incident Drawer Details */}
            {selectedIncident && (
              <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/30 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-cyan-400 font-semibold">
                  <span>ROOT CAUSE & REMEDIATION RUNBOOK ({selectedIncident.id})</span>
                  {selectedIncident.status !== 'Resolved' && (
                    <button
                      onClick={() => handleResolveIncident(selectedIncident.id)}
                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Mark Resolved</span>
                    </button>
                  )}
                </div>

                <div className="text-slate-300">
                  <span className="text-slate-500 block text-[10px]">AI ANALYSIS:</span>
                  {selectedIncident.aiRootCause}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>SUGGESTED RUNBOOK:</span>
                    <button
                      onClick={() => handleCopyRunbook(selectedIncident.suggestedRunbook)}
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      {copiedRunbook ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedRunbook ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-2 rounded bg-black/80 border border-white/10 text-cyan-300 text-[11px] overflow-x-auto">
                    {selectedIncident.suggestedRunbook}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
