import type { User, Transaction, FraudAlert, UserProfile, Device, IPInfo, Case, ScamNetwork, NetworkNode, NetworkEdge } from '../types';

// Mock Users
export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', phone: '+1234567890', joinDate: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'investigator', phone: '+1234567891', joinDate: '2024-02-10' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'analyst', phone: '+1234567892', joinDate: '2024-03-05' },
];

// Mock Transactions
export const mockTransactions: Transaction[] = Array.from({ length: 50 }, (_, i) => ({
  id: `TXN-${String(i + 1).padStart(5, '0')}`,
  senderId: `USER-${String(Math.floor(Math.random() * 20) + 1).padStart(3, '0')}`,
  senderName: `User ${Math.floor(Math.random() * 20) + 1}`,
  receiverId: `USER-${String(Math.floor(Math.random() * 20) + 1).padStart(3, '0')}`,
  receiverName: `User ${Math.floor(Math.random() * 20) + 1}`,
  amount: Math.random() * 50000 + 100,
  currency: 'USD',
  timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  riskScore: Math.floor(Math.random() * 100),
  status: Math.random() > 0.7 ? 'flagged' : Math.random() > 0.5 ? 'suspicious' : 'safe',
  description: `Transfer to account ${Math.random().toString(36).substring(7)}`,
  method: ['bank_transfer', 'card', 'wallet', 'crypto'][Math.floor(Math.random() * 4)] as any,
}));

// Mock Fraud Alerts
export const mockFraudAlerts: FraudAlert[] = [
  {
    id: 'ALERT-001',
    type: 'suspicious_login',
    severity: 'critical',
    title: 'Suspicious Login Detected',
    description: 'Multiple login attempts from different IPs in 30 minutes',
    affectedUserId: 'USER-005',
    affectedUserName: 'Sarah Connor',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    reviewed: false,
  },
  {
    id: 'ALERT-002',
    type: 'rapid_transactions',
    severity: 'high',
    title: 'Rapid Transactions',
    description: '15 transactions in 5 minutes from same account',
    affectedUserId: 'USER-012',
    affectedUserName: 'James Wilson',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    reviewed: false,
  },
  {
    id: 'ALERT-003',
    type: 'shared_device',
    severity: 'high',
    title: 'Shared Device Detected',
    description: 'Device used by 8 different accounts in 24 hours',
    affectedUserId: 'USER-018',
    affectedUserName: 'Emma Davis',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    reviewed: true,
  },
  {
    id: 'ALERT-004',
    type: 'money_laundering',
    severity: 'critical',
    title: 'Money Laundering Pattern',
    description: 'Structured deposits matching known laundering pattern',
    affectedUserId: 'USER-003',
    affectedUserName: 'Robert Brown',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    reviewed: false,
  },
  {
    id: 'ALERT-005',
    type: 'unusual_location',
    severity: 'medium',
    title: 'Unusual Location',
    description: 'Account accessed from new country within 2 hours',
    affectedUserId: 'USER-009',
    affectedUserName: 'Lisa Martinez',
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    reviewed: true,
  },
  {
    id: 'ALERT-006',
    type: 'rapid_transactions',
    severity: 'medium',
    title: 'Moderate Transaction Spike',
    description: '8 transactions in 1 hour (usual: 1-2)',
    affectedUserId: 'USER-015',
    affectedUserName: 'Christopher Lee',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    reviewed: true,
  },
];

// Mock User Profiles
export const mockUserProfiles: UserProfile[] = [
  {
    id: 'USER-001',
    name: 'Sarah Connor',
    email: 'sarah.connor@email.com',
    phone: '+1-555-0001',
    joinDate: '2023-01-15',
    fraudScore: 85,
    riskLevel: 'high',
    linkedAccounts: ['ACC-001', 'ACC-002'],
    linkedDevices: ['DEV-001', 'DEV-005'],
    linkedIPs: ['192.168.1.100', '10.0.0.50'],
    totalTransactions: 245,
    flaggedTransactions: 18,
    lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'USER-002',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '+1-555-0002',
    joinDate: '2023-02-20',
    fraudScore: 72,
    riskLevel: 'high',
    linkedAccounts: ['ACC-003', 'ACC-004'],
    linkedDevices: ['DEV-002'],
    linkedIPs: ['192.168.2.100'],
    totalTransactions: 156,
    flaggedTransactions: 12,
    lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock Devices
export const mockDevices: Device[] = [
  {
    id: 'DEV-001',
    type: 'desktop',
    name: 'Desktop-001',
    linkedAccounts: ['ACC-001', 'ACC-002', 'ACC-005'],
    riskLevel: 'high',
    lastSeen: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'DEV-002',
    type: 'mobile',
    name: 'iPhone-X',
    linkedAccounts: ['ACC-003'],
    riskLevel: 'medium',
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock IP Addresses
export const mockIPAddresses: IPInfo[] = [
  {
    ip: '192.168.1.100',
    country: 'United States',
    city: 'New York',
    latitude: 40.7128,
    longitude: -74.006,
    linkedAccounts: ['ACC-001', 'ACC-002'],
    riskLevel: 'high',
    lastSeen: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    ip: '203.0.113.45',
    country: 'Nigeria',
    city: 'Lagos',
    latitude: 6.5244,
    longitude: 3.3792,
    linkedAccounts: ['ACC-005', 'ACC-010'],
    riskLevel: 'high',
    lastSeen: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock Cases
export const mockCases: Case[] = [
  {
    id: 'CASE-001',
    caseId: 'CASE-2024-001',
    title: 'Organized Fraud Ring Investigation',
    suspectId: 'USER-001',
    suspectName: 'Sarah Connor',
    assignedTo: 'Jane Smith',
    status: 'investigating',
    createdDate: '2024-05-15',
    updatedDate: '2024-05-28',
    notes: 'Multiple flagged transactions detected. Coordinating with bank.',
    evidence: ['EVIDENCE-001', 'EVIDENCE-002'],
    priority: 'critical',
  },
  {
    id: 'CASE-002',
    caseId: 'CASE-2024-002',
    title: 'Account Takeover Attempt',
    suspectId: 'USER-002',
    suspectName: 'James Wilson',
    assignedTo: 'Mike Johnson',
    status: 'open',
    createdDate: '2024-05-20',
    updatedDate: '2024-05-27',
    notes: 'Suspicious login patterns from new device',
    evidence: [],
    priority: 'high',
  },
];

// Mock Scam Network
export const mockScamNetworks: ScamNetwork[] = [
  {
    id: 'NETWORK-001',
    name: 'Fraud Ring Alpha',
    severity: 'critical',
    memberCount: 12,
    estimatedLoss: 250000,
    createdDate: '2024-01-15',
    lastUpdated: new Date().toISOString(),
    nodes: [
      { id: 'USER-001', type: 'user', label: 'Sarah Connor', riskScore: 95, color: '#FF3B3B' },
      { id: 'USER-005', type: 'user', label: 'Unknown User 5', riskScore: 88, color: '#FF3B3B' },
      { id: 'DEV-001', type: 'device', label: 'Desktop-001', riskScore: 82, color: '#C75DFF' },
      { id: 'IP-001', type: 'ip_address', label: '192.168.1.100', riskScore: 85, color: '#FFB500' },
      { id: 'ACC-001', type: 'account', label: 'Account ABC123', riskScore: 90, color: '#FFD700' },
      { id: 'TXN-001', type: 'transaction', label: 'TXN-00001', riskScore: 75, color: '#FF6B6B' },
    ],
    edges: [
      { id: 'EDGE-001', source: 'USER-001', target: 'ACC-001', label: 'owns', weight: 1, type: 'linked_account' },
      { id: 'EDGE-002', source: 'USER-001', target: 'DEV-001', label: 'uses', weight: 1, type: 'uses' },
      { id: 'EDGE-003', source: 'DEV-001', target: 'IP-001', label: 'connects from', weight: 1, type: 'uses' },
      { id: 'EDGE-004', source: 'ACC-001', target: 'TXN-001', label: 'initiates', weight: 1, type: 'transfers_to' },
      { id: 'EDGE-005', source: 'USER-001', target: 'USER-005', label: 'collaborates with', weight: 2, type: 'linked_account' },
    ],
  },
];

// Mock Network Nodes and Edges for visualization
export const mockNetworkNodes: NetworkNode[] = [
  { id: 'user-1', type: 'user', label: 'User A', riskScore: 85, color: '#3B82F6' },
  { id: 'user-2', type: 'user', label: 'User B', riskScore: 78, color: '#3B82F6' },
  { id: 'user-3', type: 'user', label: 'User C', riskScore: 92, color: '#3B82F6' },
  { id: 'device-1', type: 'device', label: 'Device X', riskScore: 88, color: '#C75DFF' },
  { id: 'device-2', type: 'device', label: 'Device Y', riskScore: 75, color: '#C75DFF' },
  { id: 'ip-1', type: 'ip_address', label: 'IP 192.168.1.100', riskScore: 90, color: '#FFB500' },
  { id: 'account-1', type: 'account', label: 'Account XYZ', riskScore: 82, color: '#FFD700' },
];

export const mockNetworkEdges: NetworkEdge[] = [
  { id: 'edge-1', source: 'user-1', target: 'device-1', label: 'uses', weight: 1, type: 'uses' },
  { id: 'edge-2', source: 'user-1', target: 'account-1', label: 'owns', weight: 1, type: 'linked_account' },
  { id: 'edge-3', source: 'user-2', target: 'device-1', label: 'uses', weight: 2, type: 'uses' },
  { id: 'edge-4', source: 'device-1', target: 'ip-1', label: 'connects from', weight: 1, type: 'uses' },
  { id: 'edge-5', source: 'user-3', target: 'ip-1', label: 'shares ip', weight: 2, type: 'shares_ip' },
];
