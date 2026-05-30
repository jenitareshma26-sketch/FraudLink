import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../features/store';
import Layout from '../components/Layout';
import { Filter, Download, Search, Flag, AlertTriangle, PlusCircle } from 'lucide-react';
import { addAlert } from '../features/alertSlice';
import { addCase } from '../features/caseSlice';
import type { FraudAlert, Case } from '../types';

const TransactionMonitoring: React.FC = () => {
  const transactions = useSelector((state: RootState) => state.transactions.items);
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getRiskBadgeColor = (riskScore: number) => {
    if (riskScore >= 80) return 'badge-danger';
    if (riskScore >= 50) return 'badge-warning';
    return 'badge-success';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'text-success';
      case 'suspicious':
        return 'text-warning';
      case 'flagged':
        return 'text-danger';
      default:
        return 'text-cyan-accent';
    }
  };

  const filtered = useMemo(() => transactions.filter(t => {
    const matchesSearch = 
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.receiverName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || 
      (riskFilter === 'high' && t.riskScore >= 70) ||
      (riskFilter === 'medium' && t.riskScore >= 40 && t.riskScore < 70) ||
      (riskFilter === 'low' && t.riskScore < 40);

    return matchesSearch && matchesStatus && matchesRisk;
  }), [transactions, searchTerm, statusFilter, riskFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  const exportCSV = () => {
    const headers = ['id', 'sender', 'receiver', 'amount', 'riskScore', 'status', 'method', 'timestamp'];
    const rows = filtered.map(t => [t.id, t.senderName, t.receiverName, t.amount.toString(), t.riskScore.toString(), t.status, t.method, t.timestamp]);
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_export_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFlagTransaction = (tx: any) => {
    const alert: FraudAlert = {
      id: `alert-${tx.id}`,
      type: 'rapid_transactions',
      severity: tx.riskScore >= 80 ? 'critical' : (tx.riskScore >= 60 ? 'high' : 'medium'),
      title: `Flagged transaction ${tx.id}`,
      description: `Transaction ${tx.id} flagged from ${tx.senderName} to ${tx.receiverName} for $${tx.amount}`,
      affectedUserId: tx.senderId,
      affectedUserName: tx.senderName,
      timestamp: new Date().toISOString(),
      reviewed: false,
      escalated: false,
      evidence: [tx.id],
    };
    dispatch(addAlert(alert));
  };

  const handleOpenCase = (tx: any) => {
    const newCase: Case = {
      id: `case-${tx.id}`,
      caseId: `CASE-${tx.id}`,
      title: `Investigation: ${tx.id}`,
      suspectId: tx.senderId,
      suspectName: tx.senderName,
      assignedTo: 'unassigned',
      status: 'open',
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      notes: `Auto-created case for transaction ${tx.id}`,
      evidence: [tx.id],
      priority: tx.riskScore >= 80 ? 'critical' : 'high',
    };
    dispatch(addCase(newCase));
  };

  const handleEscalate = (tx: any) => {
    // create an escalated alert immediately
    const alert: FraudAlert = {
      id: `alert-escalate-${tx.id}`,
      type: 'money_laundering',
      severity: 'critical',
      title: `Escalation: ${tx.id}`,
      description: `Escalated transaction ${tx.id} for immediate review`,
      affectedUserId: tx.senderId,
      affectedUserName: tx.senderName,
      timestamp: new Date().toISOString(),
      reviewed: true,
      escalated: true,
      evidence: [tx.id],
    };
    dispatch(addAlert(alert));
  };

  return (
    <Layout>
      <div className='space-y-6'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold text-white'>Transaction Monitoring</h1>
          <p className='text-text-secondary mt-2'>Real-time monitoring and analysis of all transactions</p>
        </div>

        {/* Controls */}
        <div className='glass-card p-6 rounded-lg space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-white flex items-center gap-2'>
              <Filter size={20} />
              Filters
            </h2>
            <button className='btn-secondary flex items-center gap-2'>
              <Download size={16} />
              Export
            </button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Search */}
            <div>
              <label className='text-sm font-medium text-white mb-2 block'>Search</label>
              <div className='relative'>
                <input
                  type='text'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder='Search by ID, sender, or receiver...'
                  className='input-field pl-10'
                />
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary' size={16} />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className='text-sm font-medium text-white mb-2 block'>Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='input-field'
              >
                <option value='all'>All Statuses</option>
                <option value='safe'>Safe</option>
                <option value='suspicious'>Suspicious</option>
                <option value='flagged'>Flagged</option>
              </select>
            </div>

            {/* Risk Level Filter */}
            <div>
              <label className='text-sm font-medium text-white mb-2 block'>Risk Level</label>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className='input-field'
              >
                <option value='all'>All Levels</option>
                <option value='low'>Low (0-40%)</option>
                <option value='medium'>Medium (40-70%)</option>
                <option value='high'>High (70-100%)</option>
              </select>
            </div>
          </div>

          <p className='text-text-secondary text-sm'>
            Showing {filtered.length} of {transactions.length} transactions
          </p>
        </div>

        {/* Transactions Table */}
        <div className='glass-card p-6 rounded-lg overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-border-dark'>
                <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Transaction ID</th>
                <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Sender</th>
                <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Receiver</th>
                <th className='text-right py-3 px-4 text-text-secondary text-sm font-medium'>Amount</th>
                <th className='text-center py-3 px-4 text-text-secondary text-sm font-medium'>Risk Score</th>
                <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Status</th>
                <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Method</th>
                <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Time</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((tx) => (
                <tr
                  key={tx.id}
                  className='border-b border-border-dark hover:bg-dark-bg/50 transition-colors cursor-pointer'
                >
                  <td className='py-3 px-4 text-sm font-mono text-cyan-accent'>{tx.id}</td>
                  <td className='py-3 px-4 text-sm'>{tx.senderName}</td>
                  <td className='py-3 px-4 text-sm'>{tx.receiverName}</td>
                  <td className='py-3 px-4 text-sm text-right font-semibold'>
                    ${tx.amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </td>
                  <td className='py-3 px-4 text-sm text-center'>
                    <span className={`badge ${getRiskBadgeColor(tx.riskScore)}`}>
                      {tx.riskScore}%
                    </span>
                  </td>
                  <td className='py-3 px-4 text-sm'>
                    <span className={`capitalize font-medium ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className='py-3 px-4 text-sm text-text-secondary capitalize'>
                    {tx.method.replace('_', ' ')}
                  </td>
                  <td className='py-3 px-4 text-sm text-text-secondary'>
                    {new Date(tx.timestamp).toLocaleString()}
                  </td>
                  <td className='py-3 px-4 text-sm text-right space-x-2'>
                    <button onClick={() => handleFlagTransaction(tx)} className='btn-ghost inline-flex items-center gap-2'>
                      <Flag size={14} /> Flag
                    </button>
                    <button onClick={() => handleEscalate(tx)} className='btn-ghost inline-flex items-center gap-2'>
                      <AlertTriangle size={14} /> Escalate
                    </button>
                    <button onClick={() => handleOpenCase(tx)} className='btn-ghost inline-flex items-center gap-2'>
                      <PlusCircle size={14} /> Case
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination / Export */}
        <div className='flex items-center justify-between mt-4'>
          <div className='flex items-center gap-3'>
            <button onClick={exportCSV} className='btn-secondary inline-flex items-center gap-2'>
              <Download size={14} /> Export CSV
            </button>
            <div className='text-sm text-text-secondary'>
              Showing {Math.min(filtered.length, page * pageSize)} of {filtered.length}
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className='input-field'>
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
            </select>
            <div className='flex items-center gap-2'>
              <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} className='btn-ghost'>Prev</button>
              <span className='text-sm text-text-secondary'>Page {page} / {pageCount}</span>
              <button disabled={page === pageCount} onClick={() => setPage(p => Math.min(pageCount, p + 1))} className='btn-ghost'>Next</button>
            </div>
          </div>
        </div>
        {/* Summary Stats */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='stat-card'>
            <p className='text-text-secondary text-sm mb-1'>Total Amount</p>
            <p className='text-2xl font-bold text-white'>
              ${filtered.reduce((sum, t) => sum + t.amount, 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className='stat-card'>
            <p className='text-text-secondary text-sm mb-1'>Safe Transactions</p>
            <p className='text-2xl font-bold text-success'>
              {filtered.filter(t => t.status === 'safe').length}
            </p>
          </div>

          <div className='stat-card'>
            <p className='text-text-secondary text-sm mb-1'>Suspicious</p>
            <p className='text-2xl font-bold text-warning'>
              {filtered.filter(t => t.status === 'suspicious').length}
            </p>
          </div>

          <div className='stat-card'>
            <p className='text-text-secondary text-sm mb-1'>Flagged</p>
            <p className='text-2xl font-bold text-danger'>
              {filtered.filter(t => t.status === 'flagged').length}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransactionMonitoring;
