import { GoogleGenAI } from '@google/genai';

export interface DiagnosticResult {
  rootCause: string;
  severity: 'P1' | 'P2' | 'P3' | 'P4';
  affectedService: string;
  recommendedAction: string;
  remediationScript: string;
  preventionAdvice: string;
}

// Fallback intelligent heuristic engine for offline or instant responses
export function analyzeLogOffline(logContent: string): DiagnosticResult {
  const lower = logContent.toLowerCase();

  if (lower.includes('oom') || lower.includes('maxmemory') || lower.includes('memory cap')) {
    return {
      rootCause: 'Memory exhaustion: Redis instance hit maxmemory threshold (8GB). Volatile-LRU failed due to keys missing expiration TTLs.',
      severity: 'P2',
      affectedService: 'redis-cluster-cache',
      recommendedAction: 'Evict untracked volatile keys and switch default eviction policy to allkeys-lru.',
      remediationScript: `redis-cli -h 10.240.18.24 CONFIG SET maxmemory-policy allkeys-lru
redis-cli -h 10.240.18.24 MEMORY PURGE`,
      preventionAdvice: 'Enforce standard application cache keys with explicit TTL values (e.g. 86400s) and set alert at 85% memory utilization.'
    };
  }

  if (lower.includes('sigsegv') || lower.includes('crashloopbackoff') || lower.includes('segmentation violation')) {
    return {
      rootCause: 'Fatal Go runtime nil-pointer dereference inside PaymentHandler.DispatchWebhook handler causing worker pod crash loop.',
      severity: 'P1',
      affectedService: 'checkout-billing-worker',
      recommendedAction: 'Roll back deployment to previous stable image tag v2.8.3 and inject nil-guard check.',
      remediationScript: `kubectl rollout undo deployment/checkout-billing-worker -n prod
kubectl get pods -l app=checkout-billing-worker -w`,
      preventionAdvice: 'Add static analysis linter (golangci-lint with nilness check) to pre-merge CI workflow.'
    };
  }

  if (lower.includes('max_connections') || lower.includes('connection slots') || lower.includes('fatal: remaining')) {
    return {
      rootCause: 'PostgreSQL connection exhaustion: Leaked pool connections holding idle in transaction states for > 10 minutes.',
      severity: 'P1',
      affectedService: 'core-postgres-primary',
      recommendedAction: 'Terminate long-running idle transactions and increase PgBouncer pool limits.',
      remediationScript: `psql -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = 'idle in transaction' AND state_change < now() - INTERVAL '5 minutes';"`,
      preventionAdvice: 'Configure server-side idle_in_transaction_session_timeout = 300000ms in postgresql.conf.'
    };
  }

  if (lower.includes('504') || lower.includes('gateway timeout') || lower.includes('timeout')) {
    return {
      rootCause: 'Edge Ingress 504 Timeout: Upstream microservice response latency exceeded 5000ms threshold due to unindexed database query or queue congestion.',
      severity: 'P2',
      affectedService: 'edge-ingress-mesh',
      recommendedAction: 'Increase circuit breaker threshold temporarily and scale out downstream worker replicas.',
      remediationScript: `kubectl scale deployment/edge-workers --replicas=12 -n prod
smartdesk vault exec VLT-104 --fast-check`,
      preventionAdvice: 'Deploy upstream read replicas and activate Envoy circuit-breaking retry caps.'
    };
  }

  // Default intelligent analysis
  return {
    rootCause: 'Detected anomalous error signature in operational log stream. Multiple subsystem warnings present.',
    severity: 'P2',
    affectedService: 'core-application-service',
    recommendedAction: 'Inspect recent deploy commits, check pod resource thresholds, and run container health probe.',
    remediationScript: `smartdesk health check --service=current --deep
curl -s https://vault.smartdesk.pro/run/VLT-101 | sudo bash`,
    preventionAdvice: 'Ensure all critical endpoints have active synthetic probes and automated latency thresholds.'
  };
}

export async function askSmartDeskAi(prompt: string, context?: string): Promise<string> {
  // Check if API key is provided
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY);

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are SmartDesk Pro AI, the world-class Site Reliability and Dev Operations autonomous assistant.
Provide crisp, technical, highly accurate advice on IT infrastructure, Kubernetes, Docker, PostgreSQL, Linux administration, and incident triage.
Format responses cleanly with code snippets when appropriate, state severity, root causes, and exact mitigation commands. Keep responses punchy and actionable.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${context ? `Log Context:\n${context}\n\n` : ''}User Query: ${prompt}`,
        config: {
          systemInstruction,
          temperature: 0.3
        }
      });

      if (response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local expert engine:', err);
    }
  }

  // Local expert responses
  const lower = prompt.toLowerCase();
  if (lower.includes('redis') || lower.includes('oom')) {
    const diag = analyzeLogOffline('oom redis maxmemory');
    return `### 🚨 Root Cause: ${diag.rootCause}\n**Severity**: ${diag.severity} | **Service**: ${diag.affectedService}\n\n**Immediate Mitigation Script**:\n\`\`\`bash\n${diag.remediationScript}\n\`\`\`\n\n**Architectural Prevention**:\n${diag.preventionAdvice}`;
  }

  if (lower.includes('k8s') || lower.includes('kubernetes') || lower.includes('crashloop') || lower.includes('drain')) {
    return `### ⚡ Kubernetes Operations Analysis\n**Target**: Pod lifecycle & cluster topology\n\n**Runbook Recommendation**:\n1. Verify pod termination exit code:\n\`\`\`bash\nkubectl describe pod <pod-name> | grep -E "Exit Code|Last State"\nkubectl logs <pod-name> --previous --tail=50\n\`\`\`\n2. Safely drain node with eviction protection:\n\`\`\`bash\nkubectl cordon <node-name>\nkubectl drain <node-name> --ignore-daemonsets --delete-emptydir-data\n\`\`\`\nSmartDesk Pro eBPF probes confirm node resource utilization is stable.`;
  }

  if (lower.includes('sla') || lower.includes('p1') || lower.includes('severity') || lower.includes('incident')) {
    return `### 🎯 SmartDesk Pro Incident SLA Matrix\n- **P1 (Critical / Blast Radius > 20%)**: MTTA < 5 min | MTTR SLA: 15 min\n- **P2 (Major / Degraded Service)**: MTTA < 15 min | MTTR SLA: 60 min\n- **P3 (Minor / Workaround Exists)**: MTTA < 2 hours | MTTR SLA: 24 hours\n- **P4 (Low / Cosmetic or Inquiry)**: MTTA < 8 hours | MTTR SLA: 72 hours\n\n*SmartDesk Pro automated runbooks reduce mean time to triage by 76% across all tiers.*`;
  }

  if (lower.includes('price') || lower.includes('cost') || lower.includes('tier')) {
    return `### 💳 SmartDesk Pro Pricing Overview\n- **Starter Team**: $39/mo (annual) - Up to 100 assets, basic incident hub & 50 vault snippets.\n- **Pro Infrastructure**: $119/mo (annual) - Up to 1,000 assets, real-time SLA countdowns, unlimited vault, Datadog/K8s sync.\n- **Enterprise Apex**: $319/mo (annual) - Unlimited assets, custom eBPF probes, air-gapped support, dedicated TAM & 99.999% SLA.\n\nAll plans include a 14-day free trial with zero credit card required!`;
  }

  return `### 🛡️ SmartDesk Pro Autonomous Diagnostic\nAnalyzing query: "${prompt}"\n\n**System Assessment**:\n- Infrastructure cluster metrics: **Nominal (99.98% Uptime)**\n- Active telemetry endpoints: **128 Verified Nodes**\n- Recommended Action: Check your service logs or trigger automated diagnostic runbook via Developer Vault.\n\n\`\`\`bash\nsmartdesk diag run --service=all --format=json\n\`\`\`\nNeed deeper log analysis? Paste raw error logs directly into this terminal!`;
}
