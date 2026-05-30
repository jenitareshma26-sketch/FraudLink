// Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'investigator' | 'analyst';
  avatar?: string;
  phone?: string;
  joinDate: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Transaction Types
export interface Transaction {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  amount: number;
  currency: string;
  timestamp: string;
  riskScore: number;
  status: 'safe' | 'suspicious' | 'flagged';
  description: string;
  method: 'bank_transfer' | 'card' | 'wallet' | 'crypto';
}

// Fraud Alert Types
export interface FraudAlert {
  id: string;
  type: 'suspicious_login' | 'rapid_transactions' | 'shared_device' | 'money_laundering' | 'unusual_location';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  affectedUserId: string;
  affectedUserName: string;
  timestamp: string;
  reviewed: boolean;
  escalated?: boolean;
  evidence?: string[];
}

// User Profile Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  fraudScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  linkedAccounts: string[];
  linkedDevices: string[];
  linkedIPs: string[];
  totalTransactions: number;
  flaggedTransactions: number;
  lastActivity: string;
}

// Network Node Types
export interface NetworkNode {
  id: string;
  type: 'user' | 'device' | 'ip_address' | 'account' | 'transaction';
  label: string;
  riskScore: number;
  metadata?: Record<string, any>;
  color?: string;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  weight: number;
  type: 'uses' | 'transfers_to' | 'shares_ip' | 'linked_account';
}

export interface ScamNetwork {
  id: string;
  name: string;
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  memberCount: number;
  estimatedLoss: number;
  createdDate: string;
  lastUpdated: string;
}

// Case Types
export interface Case {
  id: string;
  caseId: string;
  title: string;
  suspectId: string;
  suspectName: string;
  assignedTo: string;
  status: 'open' | 'investigating' | 'resolved' | 'escalated';
  createdDate: string;
  updatedDate: string;
  notes: string;
  evidence: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

// Device Types
export interface Device {
  id: string;
  type: 'desktop' | 'mobile' | 'tablet';
  name: string;
  linkedAccounts: string[];
  riskLevel: 'low' | 'medium' | 'high';
  lastSeen: string;
}

// IP Address Types
export interface IPInfo {
  ip: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  linkedAccounts: string[];
  riskLevel: 'low' | 'medium' | 'high';
  lastSeen: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalTransactions: number;
  fraudAlerts: number;
  highRiskUsers: number;
  activeScamNetworks: number;
}

// Redux Slices
export interface TransactionState {
  items: Transaction[];
  loading: boolean;
  error: string | null;
  filters: {
    dateRange?: [string, string];
    amountRange?: [number, number];
    riskLevel?: string;
    status?: string;
  };
}

export interface AlertState {
  items: FraudAlert[];
  loading: boolean;
  error: string | null;
  unreadCount: number;
}

export interface CaseState {
  items: Case[];
  loading: boolean;
  error: string | null;
  selectedCase: Case | null;
}
