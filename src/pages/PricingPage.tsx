import React, { useState } from 'react';
import { PageId } from '../types';
import { PRICING_PLANS, SAMPLE_DIAGNOSTIC_LOGS } from '../data/mockData';
import { 
  CreditCard, 
  Check, 
  Sparkles, 
  Calculator, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Terminal, 
  Copy, 
  RefreshCw, 
  Zap, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { analyzeLogOffline, askSmartDeskAi, DiagnosticResult } from '../services/aiDiagnosticService';

interface PricingPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookDemo: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate, onOpenBookDemo }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // ROI Calculator state
  const [teamSize, setTeamSize] = useState<number>(35);
  const [outageHoursPerMonth, setOutageHoursPerMonth] = useState<number>(14);
  const hourlyEngRate = 120; // $120/hr average loaded cost

  // Calculated ROI savings
  const monthlyCurrentCost = teamSize * 0.2 * outageHoursPerMonth * hourlyEngRate;
  const smartdeskSavedPercent = 0.78; // 78% MTTR reduction
  const monthlySavings = Math.round(monthlyCurrentCost * smartdeskSavedPercent);
  const annualSavings = monthlySavings * 12;

  // AI Diagnostic Showcase State
  const [selectedSampleLog, setSelectedSampleLog] = useState(SAMPLE_DIAGNOSTIC_LOGS[0].sampleLog);
  const [showcaseResult, setShowcaseResult] = useState<DiagnosticResult | null>(() => 
    analyzeLogOffline(SAMPLE_DIAGNOSTIC_LOGS[0].sampleLog)
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does SmartDesk Pro connect to our private VPCs and bare-metal nodes?',
      a: 'We provide a lightweight, single-binary eBPF agent deployable via Helm, Ansible, or Docker. It operates completely out-of-band with under 0.2% CPU overhead and requires zero incoming firewall ports.'
    },
    {
      q: 'Is our sensitive application log data sent to external AI servers?',
      a: 'No. SmartDesk Pro performs local AST redaction to mask PII, tokens, and passwords prior to synthesis. For Enterprise Apex customers, dedicated on-premise or private tenant models ensure zero third-party data egress.'
    },
    {
      q: 'Can we configure human-in-the-loop approvals before runbooks execute?',
      a: 'Yes! Every runbook can be set to either "Fully Autonomous" (with configurable confidence thresholds) or "Require 1-Click Slack / PagerDuty Approval" before applying hotfixes.'
    },
    {
      q: 'Do you offer custom SLA agreements and dedicated support?',
      a: 'Yes. Enterprise Apex includes a contractual 99.999% SLA guarantee, dedicated Technical Account Managers (TAM), and 24/7 Slack Connect war room bridges.'
    }
  ];

  const handleRunSampleAnalysis = (logText: string) => {
    setSelectedSampleLog(logText);
    setIsAnalyzing(true);
    setTimeout(() => {
      setShowcaseResult(analyzeLogOffline(logText));
      setIsAnalyzing(false);
    }, 400);
  };

  const handleCopyShowcase = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="relative min-h-screen text-slate-100 pb-24">
      {/* Background patterns */}
      <div className="absolute inset-0 cosmic-grid-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 blur-[130px] pointer-events-none" />

      {/* Hero Header */}
      <section className="relative pt-12 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
            <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
            <span>TRANSPARENT ENTERPRISE PRICING</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Predictable Infrastructure.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">
              Zero Surprise Bills.
            </span>
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            Choose the tier that matches your engineering velocity. Scale from startup clusters to global multi-cloud enterprise deployments with guaranteed SLAs.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3 text-xs font-medium">
            <span className={billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-7 rounded-full bg-[#0a0f20] border border-cyan-500/40 p-0.5 transition-colors"
              aria-label="Toggle annual or monthly billing"
            >
              <div
                className={`w-5.5 h-5.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0.5'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={billingCycle === 'yearly' ? 'text-white' : 'text-slate-400'}>
                Annual Billing
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                SAVE 20%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map(plan => {
            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.id}
                className={`p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-300 relative ${
                  plan.popular
                    ? 'bg-[#0a0f24] border-2 border-cyan-400 shadow-[0_0_40px_rgba(0,242,254,0.25)] scale-105 z-10'
                    : 'bg-[#080C19] border border-white/10 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-mono font-bold text-[10px] uppercase tracking-wider shadow-lg">
                    MOST POPULAR HUB
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 min-h-[36px]">{plan.tagline}</p>
                  </div>

                  <div className="pt-2 flex items-baseline gap-1.5 font-mono">
                    <span className="text-4xl font-extrabold text-white">${price}</span>
                    <span className="text-xs text-slate-400">/ seat / month</span>
                  </div>

                  <button
                    onClick={onOpenBookDemo}
                    className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-lg shadow-cyan-500/25'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                    }`}
                  >
                    {plan.ctaText}
                  </button>

                  <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                      INCLUDED CAPABILITIES:
                    </span>
                    {plan.features.map(f => (
                      <div key={f} className="flex items-start gap-2.5 text-slate-300">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-500 text-center">
                  14-day free trial · Cancel anytime
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ROI CALCULATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="p-6 sm:p-10 rounded-2xl bg-[#090D1C] border border-cyan-500/30 shadow-2xl">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 uppercase font-semibold mb-1">
              <Calculator className="w-3.5 h-3.5" /> ROI & Cost Recovery Model
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Calculate Your Engineering Team's Savings
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Estimate how much downtime cost and engineer salary waste SmartDesk Pro saves each month.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input sliders (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1: Team Size */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Engineering & SRE Team Size:</span>
                  <span className="text-cyan-400 font-bold text-sm">{teamSize} Engineers</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="250"
                  step="5"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Slider 2: Outage hours per month */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Average Incident Response Hours / Month:</span>
                  <span className="text-violet-400 font-bold text-sm">{outageHoursPerMonth} Hours</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="60"
                  value={outageHoursPerMonth}
                  onChange={(e) => setOutageHoursPerMonth(Number(e.target.value))}
                  className="w-full accent-violet-400 cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400 font-mono flex items-center justify-between">
                <span>Assumed Industry Standard Hourly SRE Rate:</span>
                <span className="text-white font-bold">$120 / hr</span>
              </div>
            </div>

            {/* Output Metric Cards (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-gradient-to-br from-[#0c1328] to-[#080d1c] border border-cyan-400/40 space-y-4 text-center">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                  PROJECTED ANNUAL SAVINGS
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-400 tracking-tight mt-1">
                  ${annualSavings.toLocaleString()}
                </div>
                <span className="text-xs text-slate-400 mt-0.5 block">
                  ~${monthlySavings.toLocaleString()} saved every single month
                </span>
              </div>

              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <div className="text-slate-400">MTTR Saved</div>
                  <div className="text-base font-bold text-cyan-300">78% Faster</div>
                </div>
                <div>
                  <div className="text-slate-400">Engineer Hours Back</div>
                  <div className="text-base font-bold text-violet-300">
                    {Math.round(teamSize * 0.2 * outageHoursPerMonth * 0.78)} hrs/mo
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenBookDemo}
                className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-colors cursor-pointer"
              >
                Claim ROI Guarantee on Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE AI DIAGNOSTICS ASSISTANT SHOWCASE */}
      <section id="diagnostics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="p-6 sm:p-10 rounded-2xl bg-[#090D1C] border border-violet-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-violet-400 uppercase font-semibold">
                <Zap className="w-3.5 h-3.5" /> Interactive AI Diagnostics Showcase
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-1">
                Live Autonomous IT Log Analysis Playground
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Click a sample production incident trace below to see the AI diagnostic pipeline in action:
              </p>
            </div>

            {/* Quick Log Presets */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {SAMPLE_DIAGNOSTIC_LOGS.map(log => (
                <button
                  key={log.id}
                  onClick={() => handleRunSampleAnalysis(log.sampleLog)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    selectedSampleLog === log.sampleLog
                      ? 'bg-violet-500/20 text-violet-300 border-violet-400/60 font-semibold'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
                  }`}
                >
                  {log.title.split(' ')[0]} {log.title.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Analyzer Sandbox */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Input Log */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>RAW INCIDENT TRACE (TELEMETRY INPUT):</span>
                <span className="text-cyan-400">Log format: RFC 5424</span>
              </span>
              <textarea
                rows={9}
                value={selectedSampleLog}
                onChange={(e) => handleRunSampleAnalysis(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-[#030611] border border-white/10 text-slate-300 font-mono text-[11px] leading-relaxed focus:outline-none focus:border-violet-400"
              />
            </div>

            {/* Right: Output Diagnostic */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>SYNTHESIZED MITIGATION PLAN:</span>
                <span className="text-emerald-400">Confidence: 99.4%</span>
              </span>

              {showcaseResult && (
                <div className="p-4 rounded-xl bg-[#030611] border border-violet-500/40 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-bold">ROOT CAUSE ISOLATED:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      showcaseResult.severity === 'P1'
                        ? 'bg-red-950 text-red-400 border-red-500/40'
                        : 'bg-amber-950 text-amber-400 border-amber-500/40'
                    }`}>
                      {showcaseResult.severity} SEVERITY
                    </span>
                  </div>

                  <p className="text-slate-200 text-xs font-sans">
                    {showcaseResult.rootCause}
                  </p>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Automated Runbook Fix:</span>
                    <div className="relative group mt-1">
                      <pre className="p-2.5 rounded-lg bg-black/80 border border-violet-500/20 text-cyan-300 text-[11px] overflow-x-auto whitespace-pre-wrap">
                        {showcaseResult.remediationScript}
                      </pre>
                      <button
                        onClick={() => handleCopyShowcase(showcaseResult.remediationScript)}
                        className="absolute top-2 right-2 p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 transition-colors text-[10px]"
                      >
                        {copiedCode ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <div className="text-xs font-mono text-cyan-400 uppercase">Frequently Asked Questions</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Enterprise Architecture & Security FAQ
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#080C1A] border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4.5 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-4.5 pb-4.5 text-xs text-slate-300 leading-relaxed font-sans border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
