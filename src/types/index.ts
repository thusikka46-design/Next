export type PageId = 'home' | 'solutions' | 'assets' | 'vault' | 'resources' | 'pricing';

export interface NavItem {
  id: PageId;
  label: string;
  badge?: string;
  description?: string;
}

export type SeverityLevel = 'P1' | 'P2' | 'P3' | 'P4';

export interface Incident {
  id: string;
  title: string;
  service: string;
  severity: SeverityLevel;
  status: 'Investigating' | 'Remediating' | 'Monitoring' | 'Resolved';
  timeElapsed: string;
  slaRemaining: string;
  assignedTeam: string;
  aiRootCause: string;
  suggestedRunbook: string;
  affectedNodes: number;
}

export type AssetCategory = 'Cloud' | 'Hardware' | 'Database' | 'License' | 'Network';

export interface Asset {
  id: string;
  name: string;
  hostname: string;
  category: AssetCategory;
  environment: 'Production' | 'Staging' | 'Multi-Region';
  healthScore: number;
  status: 'Healthy' | 'Degraded' | 'Critical' | 'Maintenance';
  cpuUsage: number;
  memoryUsage: number;
  ipAddress: string;
  region: string;
  compliance: string[];
  lastAudit: string;
}

export interface VaultSnippet {
  id: string;
  title: string;
  language: 'bash' | 'sql' | 'docker' | 'python' | 'javascript';
  category: 'Kubernetes' | 'Database' | 'Docker' | 'Network' | 'Security' | 'AWS/Cloud';
  description: string;
  code: string;
  commandSnippet: string;
  tags: string[];
  verifiedBy: string;
  runsCount: number;
}

export interface ResourceArticle {
  id: string;
  title: string;
  category: 'Guides' | 'Whitepapers' | 'Architecture' | 'Runbooks' | 'Compliance';
  readTime: string;
  date: string;
  summary: string;
  content: string;
  author: string;
  authorRole: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  features: string[];
  limitations?: string[];
  ctaText: string;
}

export interface Integration {
  name: string;
  category: string;
  icon: string;
  description: string;
  status: 'Connected' | 'Ready' | 'Enterprise';
  latency: string;
}

export interface DiagnosticLog {
  id: string;
  title: string;
  sampleLog: string;
  service: string;
  environment: string;
}
