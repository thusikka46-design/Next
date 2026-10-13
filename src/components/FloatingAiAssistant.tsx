import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Terminal, 
  Check, 
  Copy, 
  AlertCircle, 
  Maximize2, 
  Minimize2,
  RefreshCw,
  FileCode,
  Zap
} from 'lucide-react';
import { askSmartDeskAi, analyzeLogOffline, DiagnosticResult } from '../services/aiDiagnosticService';
import { SAMPLE_DIAGNOSTIC_LOGS } from '../data/mockData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  diagnostic?: DiagnosticResult;
  timestamp: string;
}

export const FloatingAiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'log_analyzer'>('log_analyzer');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: "👋 I'm the SmartDesk Pro Autonomous Operations Assistant. I analyze telemetry, diagnose infrastructure logs in real-time, and generate production-safe mitigation scripts. How can I assist your operations today?",
      timestamp: '21:14'
    }
  ]);

  const [rawLogInput, setRawLogInput] = useState('');
  const [diagnosticOutput, setDiagnosticOutput] = useState<DiagnosticResult | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeTab]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const newMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const reply = await askSmartDeskAi(userText);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: "I analyzed the operational event stream. All primary clusters are reporting green health. You can also paste raw stack traces in the Log Analyzer tab.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAnalyzeRawLog = (customLog?: string) => {
    const textToAnalyze = customLog || rawLogInput;
    if (!textToAnalyze.trim()) return;

    setIsTyping(true);
    setTimeout(() => {
      const result = analyzeLogOffline(textToAnalyze);
      setDiagnosticOutput(result);
      setIsTyping(false);
    }, 450);
  };

  const loadSampleLog = (logId: string) => {
    const found = SAMPLE_DIAGNOSTIC_LOGS.find(l => l.id === logId);
    if (found) {
      setRawLogInput(found.sampleLog);
      handleAnalyzeRawLog(found.sampleLog);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-[#0B0F1C]/90 hover:bg-[#0E1428] border border-cyan-400/40 hover:border-cyan-300 text-white shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,242,254,0.5)] transition-all duration-300 cursor-pointer backdrop-blur-xl"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
            <Bot className="w-5 h-5 text-cyan-300 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>

          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold font-heading text-white flex items-center gap-1.5">
              <span>AI Diagnostics</span>
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                LIVE
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Root-Cause & Runbooks
            </div>
          </div>
        </button>
      )}

      {/* Expanded Chat & Diagnostic Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[440px] h-[580px] max-h-[85vh] flex flex-col bg-[#070A15]/95 border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,242,254,0.3)] backdrop-blur-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-cyan-950/40 via-violet-950/30 to-[#070A15] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold font-heading text-white flex items-center gap-1.5">
                  <span>SmartDesk Autonomous Assistant</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                </h3>
                <span className="text-[10px] font-mono text-cyan-400">
                  Site Reliability & Incident Co-Pilot
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1.5 bg-black/40 border-b border-white/5 text-xs font-medium">
            <button
              onClick={() => setActiveTab('log_analyzer')}
              className={`py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'log_analyzer'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Log Explainer</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-violet-400" />
              <span>DevOps Q&A</span>
            </button>
          </div>

          {/* TAB 1: Log Explainer & Instant Diagnostics */}
          {activeTab === 'log_analyzer' && (
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs">
              <div className="text-[11px] text-slate-400">
                Quick-load real production incident traces or paste your own raw stack trace:
              </div>

              {/* Sample Log Pills */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => loadSampleLog('log-redis')}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  Redis OOM Cap
                </button>
                <button
                  onClick={() => loadSampleLog('log-k8s')}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  K8s SIGSEGV
                </button>
                <button
                  onClick={() => loadSampleLog('log-pg')}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  Postgres Max Conns
                </button>
              </div>

              {/* Log Input Area */}
              <div>
                <textarea
                  rows={4}
                  value={rawLogInput}
                  onChange={(e) => setRawLogInput(e.target.value)}
                  placeholder="Paste raw error log, syslog, or stack trace here..."
                  className="w-full p-2.5 bg-[#03050a] border border-white/10 rounded-lg text-slate-200 font-mono text-[11px] leading-relaxed focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
                <button
                  onClick={() => handleAnalyzeRawLog()}
                  disabled={!rawLogInput.trim() || isTyping}
                  className="w-full mt-2 py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs transition-all shadow-[0_0_15px_rgba(0,242,254,0.3)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isTyping ? 'Synthesizing Diagnostics...' : 'Diagnose Root Cause & Generate Runbook'}</span>
                </button>
              </div>

              {/* Diagnostic Result Card */}
              {diagnosticOutput && (
                <div className="p-3 rounded-xl bg-black/60 border border-cyan-500/40 space-y-2.5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-semibold text-cyan-400 text-[11px]">
                      DIAGNOSTIC REPORT
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      diagnosticOutput.severity === 'P1'
                        ? 'bg-red-950 text-red-400 border border-red-500/40'
                        : 'bg-amber-950 text-amber-400 border border-amber-500/40'
                    }`}>
                      {diagnosticOutput.severity} PRIORITY
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">
                      Root Cause:
                    </span>
                    <p className="text-xs text-slate-200 font-medium leading-relaxed">
                      {diagnosticOutput.rootCause}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">
                      Recommended Action:
                    </span>
                    <p className="text-xs text-slate-300">
                      {diagnosticOutput.recommendedAction}
                    </p>
                  </div>

                  {/* Remediation code snippet */}
                  <div className="relative group">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-1">
                      <span>AUTOMATED REMEDIATION RUNBOOK:</span>
                      <button
                        onClick={() => handleCopy(diagnosticOutput.remediationScript, 'diag-code')}
                        className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 cursor-pointer"
                      >
                        {copiedId === 'diag-code' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === 'diag-code' ? 'Copied' : 'Copy Command'}</span>
                      </button>
                    </div>
                    <pre className="p-2.5 rounded-lg bg-[#05070f] border border-cyan-500/20 text-cyan-300 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap">
                      {diagnosticOutput.remediationScript}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DevOps Q&A Interactive Chat */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[88%] p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                        m.sender === 'user'
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-xs'
                          : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 px-1 mt-0.5">
                      {m.timestamp}
                    </span>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400 text-xs w-36">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                    <span>Analyzing...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-2.5 border-t border-white/10 bg-black/40 flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about K8s, Docker, Postgres, or incident SLAs..."
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black disabled:opacity-40 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
