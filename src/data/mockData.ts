import { Asset, Incident, Integration, PricingPlan, ResourceArticle, VaultSnippet, DiagnosticLog } from '../types';

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-8942',
    title: 'PostgreSQL Primary Pooler Connection Exhaustion',
    service: 'db-cluster-prod-us-east',
    severity: 'P1',
    status: 'Remediating',
    timeElapsed: '4m 12s',
    slaRemaining: '10m 48s',
    assignedTeam: 'Data Reliability Team',
    aiRootCause: 'Leaked connection handles detected from auth-service v2.8.4 worker pods after deployment at 21:04 UTC.',
    suggestedRunbook: 'runbooks/db/pgbouncer_flush_zombies.sh --pool=read_write',
    affectedNodes: 12
  },
  {
    id: 'INC-8940',
    title: 'Kubernetes Ingress Gateway 504 Gateway Timeout Spike',
    service: 'edge-ingress-mesh',
    severity: 'P2',
    status: 'Investigating',
    timeElapsed: '12m 30s',
    slaRemaining: '47m 30s',
    assignedTeam: 'Edge SRE Team',
    aiRootCause: 'Upstream payment-gateway API response latency exceeded 5000ms timeout threshold due to third-party bank webhook queue backlog.',
    suggestedRunbook: 'runbooks/ingress/scale_circuit_breaker.sh --threshold=2500ms',
    affectedNodes: 6
  },
  {
    id: 'INC-8938',
    title: 'SSL / TLS Certificate Expiry Horizon Alert (8 Days Remaining)',
    service: 'auth.smartdesk-gateway.io',
    severity: 'P3',
    status: 'Monitoring',
    timeElapsed: '1h 14m',
    slaRemaining: '22h 46m',
    assignedTeam: 'Security Operations',
    aiRootCause: 'ACME cert-manager daemon token expired on external Route53 verification provider.',
    suggestedRunbook: 'runbooks/security/renew_acme_cert.sh --domain=smartdesk-gateway.io',
    affectedNodes: 1
  },
  {
    id: 'INC-8935',
    title: 'Redis Cluster Node #04 Memory Saturation (94.2%)',
    service: 'cache-redis-emea-1',
    severity: 'P2',
    status: 'Resolved',
    timeElapsed: '34m 10s',
    slaRemaining: 'Resolved within SLA',
    assignedTeam: 'Core Infrastructure',
    aiRootCause: 'Unbounded session token serialization with missing TTL key expiration parameter.',
    suggestedRunbook: 'runbooks/cache/evict_expired_sessions.sh --ttl=86400',
    affectedNodes: 4
  }
];

export const INITIAL_ASSETS: Asset[] = [
  {
    id: 'AST-1049',
    name: 'Primary API Gateway K8s Cluster',
    hostname: 'k8s-master-01.us-east.prod.net',
    category: 'Cloud',
    environment: 'Production',
    healthScore: 99,
    status: 'Healthy',
    cpuUsage: 42,
    memoryUsage: 68,
    ipAddress: '10.240.12.8',
    region: 'us-east-1 (N. Virginia)',
    compliance: ['SOC2 Type II', 'ISO 27001', 'PCI-DSS'],
    lastAudit: '2026-10-10'
  },
  {
    id: 'AST-1052',
    name: 'High-Throughput Redis Cache Farm',
    hostname: 'redis-node-03.us-west.internal',
    category: 'Database',
    environment: 'Production',
    healthScore: 84,
    status: 'Degraded',
    cpuUsage: 78,
    memoryUsage: 91,
    ipAddress: '10.240.18.24',
    region: 'us-west-2 (Oregon)',
    compliance: ['SOC2 Type II', 'ISO 27001'],
    lastAudit: '2026-10-11'
  },
  {
    id: 'AST-1077',
    name: 'Bare-Metal AI Inference Node #08 (NVIDIA H100)',
    hostname: 'h100-compute-gpu-08.iad-dc2.net',
    category: 'Hardware',
    environment: 'Production',
    healthScore: 97,
    status: 'Healthy',
    cpuUsage: 89,
    memoryUsage: 74,
    ipAddress: '192.168.100.88',
    region: 'Ashburn Datacenter 2',
    compliance: ['ISO 27001', 'NIST 800-53'],
    lastAudit: '2026-10-08'
  },
  {
    id: 'AST-1085',
    name: 'PostgreSQL Distributed Shard #02',
    hostname: 'pg-sharded-02.eu-central.aws',
    category: 'Database',
    environment: 'Multi-Region',
    healthScore: 95,
    status: 'Healthy',
    cpuUsage: 36,
    memoryUsage: 62,
    ipAddress: '10.110.4.15',
    region: 'eu-central-1 (Frankfurt)',
    compliance: ['GDPR Compliant', 'SOC2 Type II', 'HIPAA'],
    lastAudit: '2026-10-09'
  },
  {
    id: 'AST-1090',
    name: 'Enterprise Datadog Enterprise APM License',
    hostname: 'license.datadog.ent.smartdesk',
    category: 'License',
    environment: 'Production',
    healthScore: 100,
    status: 'Healthy',
    cpuUsage: 0,
    memoryUsage: 0,
    ipAddress: 'SaaS Integration',
    region: 'Global Tier',
    compliance: ['Annual Renewal Active', '1,500 Hosts'],
    lastAudit: '2026-09-15'
  },
  {
    id: 'AST-1104',
    name: 'Core Border BGP Router Leaf-04',
    hostname: 'core-switch-leaf04.dc1.internal',
    category: 'Network',
    environment: 'Production',
    healthScore: 68,
    status: 'Critical',
    cpuUsage: 94,
    memoryUsage: 82,
    ipAddress: '172.16.0.4',
    region: 'San Jose Datacenter 1',
    compliance: ['ISO 27001'],
    lastAudit: '2026-10-12'
  }
];

export const INITIAL_VAULT_SNIPPETS: VaultSnippet[] = [
  {
    id: 'VLT-101',
    title: 'Purge Stale Container Volumes & Dead Daemon Mounts',
    language: 'bash',
    category: 'Docker',
    description: 'Safe zero-downtime garbage collection for Docker build kits, unattached overlay2 volumes, and orphaned networks.',
    code: `#!/usr/bin/env bash
set -euo pipefail

echo "=== [SmartDesk Pro] Initializing Safe Docker Cleanup ==="
# Audit disk pressure threshold
DISK_USAGE=$(df -h /var/lib/docker | awk 'NR==2 {print $5}' | tr -d '%')
echo "Current Docker Partition Disk Pressure: \${DISK_USAGE}%"

if [ "\${DISK_USAGE}" -gt 80 ]; then
  echo "High pressure detected. Removing dangling images and buildkit caches..."
  docker system prune -f --filter "until=48h" --volumes
  docker builder prune -f --keep-storage 10GB
  echo "Cleanup complete. Target recovery ~15GB-40GB."
else
  echo "Disk pressure normal (<80%). Executing passive trim."
  docker image prune -f
fi`,
    commandSnippet: `curl -sL https://vault.smartdesk.pro/run/VLT-101 | sudo bash`,
    tags: ['Docker', 'DiskPressure', 'Cleanup', 'SRE'],
    verifiedBy: 'SecOps Automated CI (Passed 10/10)',
    runsCount: 14820
  },
  {
    id: 'VLT-102',
    title: 'Kill Deadlocked Postgres Queries with Graceful Wait',
    language: 'sql',
    category: 'Database',
    description: 'Identifies non-idle database queries running longer than 90 seconds and issues pg_terminate_backend with process logging.',
    code: `/* SmartDesk Pro Safe PostgreSQL Lock Resolver */
WITH slow_queries AS (
  SELECT
    pid,
    now() - pg_stat_activity.query_start AS duration,
    query,
    state,
    wait_event_type,
    wait_event
  FROM pg_stat_activity
  WHERE (now() - pg_stat_activity.query_start) > interval '90 seconds'
    AND state != 'idle'
    AND pid <> pg_backend_pid()
)
SELECT
  pid,
  duration,
  query,
  pg_terminate_backend(pid) as terminated_cleanly
FROM slow_queries
ORDER BY duration DESC;`,
    commandSnippet: `psql -h $PG_HOST -U postgres -d core_db -f vault_lock_breaker.sql`,
    tags: ['Postgres', 'Locks', 'Performance', 'SQL'],
    verifiedBy: 'Data Platform Guild',
    runsCount: 8940
  },
  {
    id: 'VLT-103',
    title: 'Drain & Cordon Kubernetes Node with PDB Check',
    language: 'bash',
    category: 'Kubernetes',
    description: 'Safely evicts pods respecting PodDisruptionBudgets while logging evicted workloads to SmartDesk audit stream.',
    code: `#!/usr/bin/env bash
NODE_TARGET="\${1:-k8s-worker-node-04}"
echo "Targeting Node: \${NODE_TARGET}"

kubectl cordon "\${NODE_TARGET}"
echo "Node cordoned. Checking active PodDisruptionBudgets..."

kubectl drain "\${NODE_TARGET}" \\
  --ignore-daemonsets \\
  --delete-emptydir-data \\
  --force \\
  --grace-period=60 \\
  --timeout=300s

echo "Success: \${NODE_TARGET} safely drained and ready for maintenance."`,
    commandSnippet: `smartdesk vault exec VLT-103 --node=k8s-node-worker-08`,
    tags: ['Kubernetes', 'K8s', 'Drain', 'ClusterOps'],
    verifiedBy: 'Cloud Arch Review',
    runsCount: 22100
  },
  {
    id: 'VLT-104',
    title: 'Multi-Region DNS Health Probe & Failover Test',
    language: 'python',
    category: 'Network',
    description: 'Automated Python latency benchmarking across AWS CloudFront, Cloudflare edge, and Fastly POPs with latency percentile reporting.',
    code: `import time
import requests
import statistics

ENDPOINTS = [
    ("US-East", "https://api-useast.smartdesk-demo.net/healthz"),
    ("EU-Central", "https://api-fra.smartdesk-demo.net/healthz"),
    ("AP-South", "https://api-sin.smartdesk-demo.net/healthz")
]

print("=== SmartDesk Edge Latency Diagnostic ===")
for region, url in ENDPOINTS:
    latencies = []
    for _ in range(3):
        t0 = time.perf_counter()
        try:
            r = requests.get(url, timeout=3.0)
            latency_ms = (time.perf_counter() - t0) * 1000
            if r.status_code == 200:
                latencies.append(latency_ms)
        except Exception:
            pass
    if latencies:
        print(f"[{region}] Median: {statistics.median(latencies):.1f}ms | Min: {min(latencies):.1f}ms")
    else:
        print(f"[{region}] FAILED - Circuit Breaker Tripped")`,
    commandSnippet: `python3 -m smartdesk.diagnostics.probe_dns --regions=all`,
    tags: ['Python', 'Network', 'DNS', 'Reliability'],
    verifiedBy: 'SRE Core Team',
    runsCount: 5410
  }
];

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    id: 'DOC-01',
    title: 'Zero-Touch Incident Remediation: Architecture & Blast Radius Controls',
    category: 'Whitepapers',
    readTime: '8 min read',
    date: 'Updated Oct 2026',
    summary: 'A deep-dive into autonomous runbook execution without human wake-up calls, backed by formal safety gates and blast radius limitation policies.',
    content: `## 1. The Autonomous Incident Paradox
Traditional incident response incurs a high toll in mean-time-to-acknowledge (MTTA) and engineer burnout. SmartDesk Pro's Zero-Touch remediation engine closes the feedback loop between telemetry ingestion (OpenTelemetry, Prometheus, Datadog) and vault runbook execution.

### Key Pillars:
- **Heuristic Certainty Thresholds**: No automated code snippet executes without a minimum 94% probabilistic certainty score from the AI diagnostics engine.
- **Canary Isolation**: Multi-region rollbacks are trialed on an isolated 2% traffic slice before widespread container scaling or cluster draining.
- **Bi-Directional Audit Logs**: Every execution is signed with cryptographic hardware keys (HSM) and streamed to append-only tamper-resistant logs.

\`\`\`yaml
# SmartDesk Autonomous Policy
policyVersion: 2026.4
name: "db-exhaustion-auto-heal"
triggers:
  - metric: "pg_stat_database_numbackends"
    operator: "GREATER_THAN"
    value: 95
actions:
  - executeVaultSnippet: "VLT-102"
    timeoutSeconds: 30
    requireApproval: false
\`\`\`
`,
    author: 'Dr. Evelyn Zhang',
    authorRole: 'Chief Systems Architect, SmartDesk Labs'
  },
  {
    id: 'DOC-02',
    title: 'Continuous Asset Discovery: Mapping Cloud & Bare-Metal in Sub-Second Real-Time',
    category: 'Architecture',
    readTime: '6 min read',
    date: 'Updated Oct 2026',
    summary: 'How eBPF probes and cloud control plane connectors stream live hardware topology, socket dependencies, and rogue compute discovery.',
    content: `## Modern Infrastructure Complexity
Enterprise environments now sprawl across AWS, GCP, on-prem bare-metal GPU clusters, and edge CDN nodes. Spreadsheets and legacy CMDB tools degrade within hours of deployment.

### eBPF Kernel-Level Discovery
SmartDesk Pro deploys lightweight eBPF (extended Berkeley Packet Filter) probes directly onto Linux kernels, monitoring socket connections without agent overhead (< 0.2% CPU).

1. **Topology Graphing**: Live directed acyclic graph (DAG) mapping microservices and inter-node latency.
2. **Zombie Detection**: Automatically flagging cloud VMs and disk volumes with 0 compute activity over a 7-day period to reduce cloud spend by up to 34%.
3. **Security Drift Detection**: Instant notification when unauthorized SSH keys or non-compliant kernel modules are loaded.
`,
    author: 'Marcus Vance',
    authorRole: 'Head of Infrastructure Engineering'
  },
  {
    id: 'DOC-03',
    title: 'Enterprise Runbook Engineering: Standardizing Shell, SQL, and K8s Playbooks',
    category: 'Runbooks',
    readTime: '11 min read',
    date: 'Updated Oct 2026',
    summary: 'Best practices for writing modular, dry-runnable, and self-documenting incident mitigation scripts for developer operations.',
    content: `## Runbooks That Don't Break Production
Most outages are exacerbated by outdated or poorly documented bash scripts executed under high stress at 3 AM.

### Standard Conventions
- **Always provide a \`--dry-run\` flag**: Scripts must print their target state and mutations before executing destructive operations.
- **Idempotency**: Running a runbook twice in succession must produce the identical state without side effects.
- **Structured JSON Output**: All vault scripts emit structured logs consumed directly by the SmartDesk timeline viewer.
`,
    author: 'Siddharth Rao',
    authorRole: 'Director of SRE & Operations'
  },
  {
    id: 'DOC-04',
    title: 'SOC2 Type II, ISO 27001 & FedRAMP Compliance Automation Guide',
    category: 'Compliance',
    readTime: '5 min read',
    date: 'Updated Sep 2026',
    summary: 'Automate continuous evidence collection across 450+ security controls directly from your CI/CD pipelines and infrastructure states.',
    content: `## Continuous Evidence Generation
Say goodbye to audit screenshot weeks. SmartDesk Pro hooks directly into your Git providers, AWS CloudTrail, and Kubernetes cluster RBAC configurations to continuously compile signed compliance audit bundles.

- Automated access review reconciliation every 24 hours.
- Cryptographic proof of least-privilege credential access.
- Real-time posture scoring visible on your Asset Management dashboard.
`,
    author: 'Elena Rostova',
    authorRole: 'VP of Information Security'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Team',
    tagline: 'Ideal for fast-growing engineering teams & startups streamlining IT Ops.',
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      'Up to 100 Managed Assets (Cloud & On-prem)',
      'Automated Incident Hub with P1-P4 Tagging',
      'Developer Vault (50 Shared Snippets)',
      'AI Diagnostics Engine (Basic Telemetry)',
      'Slack & Email Real-Time Alerts',
      'Standard 99.9% Platform SLA',
      'Community & Docs Support'
    ],
    limitations: [
      'Custom eBPF probes',
      'Autonomous zero-touch remediation'
    ],
    ctaText: 'Start 14-Day Free Trial'
  },
  {
    id: 'pro',
    name: 'Pro Infrastructure',
    tagline: 'The battle-tested hub for scaling engineering organizations and high-velocity SRE teams.',
    monthlyPrice: 149,
    yearlyPrice: 119,
    popular: true,
    features: [
      'Up to 1,000 Managed Assets with Live Topology',
      'Real-Time SLA Clocks & Breach Countdown',
      'Autonomous AI Diagnostics & Log Explainer',
      'Unlimited Developer Vault & Terminal Runner',
      'PagerDuty, Datadog & Kubernetes Integrations',
      'Custom Incident Triage Workflow Builder',
      'Role-Based Access Control (RBAC) & SSO',
      'Guaranteed 99.98% High Availability SLA',
      'Priority 24/7 Slack Connect Support'
    ],
    ctaText: 'Deploy Pro Hub'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Apex',
    tagline: 'For mission-critical global enterprises needing air-gapped security, FedRAMP, and custom AI models.',
    monthlyPrice: 399,
    yearlyPrice: 319,
    features: [
      'Unlimited Assets, Nodes & Microservices',
      'Zero-Touch Autonomous Remediation Safety Engine',
      'Dedicated Private AI Diagnostic Agent Instance',
      'Multi-Cloud, Bare-Metal & Air-Gapped Deployment',
      'SOC2 Type II, ISO 27001, HIPAA & FedRAMP Kits',
      'Sub-Second Custom eBPF Deep Kernel Probes',
      'Custom Webhook & API Gateway Integrations',
      'Dedicated SRE Technical Account Manager',
      'Custom 99.999% Five-Nines Uptime SLA Contract'
    ],
    ctaText: 'Schedule Enterprise Briefing'
  }
];

export const INTEGRATIONS_LIST: Integration[] = [
  { name: 'Kubernetes', category: 'Orchestration', icon: 'Ship', description: 'Deep pod lifecycle metrics, cluster drain, and automated replica scaling.', status: 'Connected', latency: '4ms' },
  { name: 'Docker', category: 'Containers', icon: 'Box', description: 'Container image cache optimization and daemon disk pressure monitor.', status: 'Connected', latency: '2ms' },
  { name: 'Terraform', category: 'IaC', icon: 'Layers', description: 'State lock conflict detection and automated infrastructure drift alerts.', status: 'Connected', latency: '12ms' },
  { name: 'PostgreSQL', category: 'Database', icon: 'Database', description: 'Connection pool metrics, dead lock termination, and index bloat detection.', status: 'Connected', latency: '3ms' },
  { name: 'GitHub Actions', category: 'CI/CD', icon: 'GitBranch', description: 'Trigger vault runbooks directly upon pipeline failures and broken builds.', status: 'Connected', latency: '15ms' },
  { name: 'Datadog', category: 'Observability', icon: 'Activity', description: 'Bi-directional alert synchronization and live trace correlation.', status: 'Connected', latency: '8ms' },
  { name: 'AWS Cloud', category: 'Cloud', icon: 'Cloud', description: 'Automated IAM privilege auditing and multi-region EC2/RDS discovery.', status: 'Connected', latency: '10ms' },
  { name: 'PagerDuty', category: 'Incidents', icon: 'Bell', description: 'Smart deduplication, escalation policy override, and MTTR tracker.', status: 'Connected', latency: '5ms' },
  { name: 'Slack Ops', category: 'ChatOps', icon: 'MessageSquare', description: 'Interactive Incident War Room bot with 1-click runbook execution.', status: 'Connected', latency: '6ms' }
];

export const SAMPLE_DIAGNOSTIC_LOGS: DiagnosticLog[] = [
  {
    id: 'log-redis',
    title: 'Redis OOM Command Not Allowed (Memory Cap Exceeded)',
    service: 'session-cache-prod-02',
    environment: 'Production',
    sampleLog: `[2026-10-12 21:04:18.492] [ERROR] [redis-server:6379] OOM command not allowed when used memory > 'maxmemory' (8589934592 bytes).
Client address=10.240.12.102:44912 flags=N db=0 sub=0 psub=0 multi=-1 qbuf=26 qbuf-free=32742 obl=0 oll=0 omem=0 events=r cmd=setex
Eviction policy volatile-lru failed: no keys eligible for expiration under current dataset tag.
Triggering emergency write-rejection mode.`
  },
  {
    id: 'log-k8s',
    title: 'Kubernetes CrashLoopBackOff: SIGSEGV in Go Microservice',
    service: 'checkout-billing-worker-pod',
    environment: 'Production',
    sampleLog: `2026-10-12T21:11:02.129342Z stderr F fatal error: unexpected signal during runtime execution
2026-10-12T21:11:02.129380Z stderr F [signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x8f21bc]
2026-10-12T21:11:02.129402Z stderr F goroutine 84 [running]:
2026-10-12T21:11:02.129420Z stderr F main.(*PaymentHandler).DispatchWebhook(0x0, 0xc000412800)
2026-10-12T21:11:02.129438Z stderr F 	/app/handlers/webhook.go:142 +0x3c
2026-10-12T21:11:02.129450Z stderr F Back-off 5m0s restarting failed container billing-worker in pod checkout-billing-worker-pod-7df84d-v4x2`
  },
  {
    id: 'log-pg',
    title: 'PostgreSQL FATAL: remaining connection slots reserved for superusers',
    service: 'core-postgres-primary',
    environment: 'Production',
    sampleLog: `2026-10-12 21:09:44 UTC [18442]: [3-1] user=app_user,db=prod_analytics FATAL:  remaining connection slots are reserved for non-replication superuser connections
2026-10-12 21:09:44 UTC [18442]: [4-1] user=app_user,db=prod_analytics DETAIL:  Active connections: 498 / 500 max_connections. Idle in transaction: 312 connections with idle duration > 600s.
2026-10-12 21:09:45 UTC [18443]: [1-1] user=app_user,db=prod_analytics LOG:  could not accept client SSL handshake`
  }
];

export const TESTIMONIALS = [
  {
    quote: "SmartDesk Pro cut our incident MTTR from 58 minutes to under 9 minutes. The AI diagnostic engine identified a silent memory leak in our Go microservices before it even triggered user-facing errors.",
    author: "Elena Rostova",
    role: "VP of Platform Engineering",
    company: "CloudScale Technologies",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    metrics: "84% MTTR Reduction"
  },
  {
    quote: "The Developer Vault combined with real-time asset health monitoring is what modern DevOps has been missing for a decade. Our on-call engineers sleep peacefully now.",
    author: "Kavita Chen",
    role: "Director of Site Reliability",
    company: "Apex FinTech Global",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    metrics: "99.992% System Uptime"
  },
  {
    quote: "We consolidated 4 disparate tools—CMDB, runbook wiki, PagerDuty scripts, and ad-hoc bastion servers—into a single glass pane. It paid for itself in our first quarter.",
    author: "David Thorne",
    role: "Chief Technology Officer",
    company: "QuantumGrid Data Systems",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    metrics: "$320k Cloud Waste Saved"
  }
];
