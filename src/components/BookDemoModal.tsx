import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Calendar, ShieldCheck, Users, Mail, Building, Clock } from 'lucide-react';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '51-200 engineers',
    moduleInterest: 'Full Enterprise Operations Suite',
    preferredDate: '2026-10-16',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#080C19] border border-cyan-500/30 rounded-2xl shadow-[0_0_60px_rgba(0,242,254,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Glow */}
        <div className="p-6 pb-4 border-b border-white/10 bg-gradient-to-r from-cyan-950/40 via-violet-950/20 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-white">
                Book an Enterprise Live Demo
              </h3>
              <p className="text-xs text-slate-400">
                1-on-1 walkthrough with an SRE solutions engineer tailored to your stack.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
            </div>
            <h4 className="text-xl font-bold font-heading text-white">
              Demo Confirmed for {formData.company || 'Your Team'}!
            </h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              We have dispatched a calendar invitation to <strong className="text-cyan-300">{formData.email}</strong> with credentials to our sandbox environment.
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-left font-mono space-y-1.5 text-slate-300 max-w-sm mx-auto">
              <div className="flex items-center justify-between text-slate-400">
                <span>Session Duration:</span>
                <span className="text-white">30 Minutes</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Assigned Solutions Architect:</span>
                <span className="text-cyan-400">Alex Rivera (Staff SRE)</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Focus Track:</span>
                <span className="text-violet-300">{formData.moduleInterest}</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all"
            >
              Done & Return to Hub
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Sarah Jenkins"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Work Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="s.jenkins@enterprise.com"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Company Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Global Inc."
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Engineering Team Size
                </label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0d1426] border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="1-20 engineers">1 - 20 engineers</option>
                  <option value="21-50 engineers">21 - 50 engineers</option>
                  <option value="51-200 engineers">51 - 200 engineers</option>
                  <option value="200+ engineers">200+ engineers</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Primary Module Interest
              </label>
              <select
                value={formData.moduleInterest}
                onChange={(e) => setFormData({ ...formData, moduleInterest: e.target.value })}
                className="w-full px-3 py-2 bg-[#0d1426] border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Full Enterprise Operations Suite">Full Enterprise Operations Suite (All Modules)</option>
                <option value="Incident & Ticket Hub with Real-Time SLA">Incident & Ticket Hub with Real-Time SLA</option>
                <option value="Live IT Asset Tracking & eBPF Health">Live IT Asset Tracking & eBPF Health</option>
                <option value="Developer Command & Code Snippet Vault">Developer Command & Code Snippet Vault</option>
                <option value="AI Autonomous Diagnostics & Log Explainer">AI Autonomous Diagnostics & Log Explainer</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Target Date for 30-min Walkthrough
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-3 py-2 bg-[#0d1426] border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Schedule Walkthrough
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
