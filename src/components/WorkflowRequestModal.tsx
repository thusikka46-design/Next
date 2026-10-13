import React, { useState } from 'react';
import { X, CheckCircle2, GitMerge, Send, Cpu, Shield, AlertTriangle } from 'lucide-react';

interface WorkflowRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkflowRequestModal: React.FC<WorkflowRequestModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    triggerService: 'Kubernetes Pod Health Check',
    remediationAction: 'Auto-drain node and trigger container rollback',
    maxSlaTime: 'Under 5 minutes',
    contactEmail: '',
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
        className="relative w-full max-w-lg bg-[#080C1A] border border-violet-500/40 rounded-2xl shadow-[0_0_60px_rgba(121,40,202,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-white/10 bg-gradient-to-r from-violet-950/40 via-cyan-950/20 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-violet-500/20 border border-violet-500/40">
              <GitMerge className="w-5 h-5 text-violet-300" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-white">
                Request Custom Workflow Automation
              </h3>
              <p className="text-xs text-slate-400">
                Design custom autonomous incident remediation pipelines
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-7 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-violet-500/20 border border-violet-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-violet-400" />
            </div>
            <h4 className="text-lg font-bold font-heading text-white">
              Workflow Solution Spec Received!
            </h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Our Reliability Engineering team has generated an initial blueprint. An architect will reach out to <span className="text-cyan-300 font-mono">{formData.contactEmail}</span> within 4 hours.
            </p>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-left font-mono text-xs text-slate-400 max-w-sm mx-auto space-y-1">
              <div>Trigger: <span className="text-slate-200">{formData.triggerService}</span></div>
              <div>Action: <span className="text-slate-200">{formData.remediationAction}</span></div>
              <div>Target SLA: <span className="text-cyan-400">{formData.maxSlaTime}</span></div>
            </div>
            <button
              onClick={handleReset}
              className="mt-2 px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Workflow Goal / Project Name *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Autonomous Multi-Region PostgreSQL Deadlock Resolution"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Trigger Event Source
                </label>
                <select
                  value={formData.triggerService}
                  onChange={(e) => setFormData({ ...formData, triggerService: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0d1426] border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400"
                >
                  <option value="Kubernetes Pod Health Check">Kubernetes Pod Crash / OOM</option>
                  <option value="PostgreSQL Connection Exhaustion">Postgres Pool Exhaustion</option>
                  <option value="Edge API Latency 504 Spikes">API Gateway 504 Latency Spike</option>
                  <option value="SSL / Certificate Expiry Horizon">SSL / TLS Expiry Countdown</option>
                  <option value="Custom Datadog / Prometheus Alert">Custom Prometheus Alert</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Required SLA Target
                </label>
                <select
                  value={formData.maxSlaTime}
                  onChange={(e) => setFormData({ ...formData, maxSlaTime: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0d1426] border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400"
                >
                  <option value="Under 2 minutes (Zero-Touch)">Under 2 minutes (Zero-Touch)</option>
                  <option value="Under 5 minutes (P1 Critical)">Under 5 minutes (P1 Critical)</option>
                  <option value="Under 15 minutes (P2 Major)">Under 15 minutes (P2 Major)</option>
                  <option value="Under 1 hour">Under 1 hour</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Remediation Policy / Desired Actions
              </label>
              <input
                type="text"
                value={formData.remediationAction}
                onChange={(e) => setFormData({ ...formData, remediationAction: e.target.value })}
                placeholder="e.g. Execute safe failover, evict stale sessions, alert on-call in Slack"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Your Work Email *
              </label>
              <input
                type="email"
                required
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="eng-leads@company.io"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-400"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium shadow-md shadow-violet-600/30 cursor-pointer"
              >
                Submit Custom Solution Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
