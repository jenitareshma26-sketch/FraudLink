import React, { useState } from 'react';
import Layout from '../components/Layout';
import { mockUserProfiles, mockTransactions } from '../data/mockData';
import { Mail, Phone, Calendar, TrendingUp, Activity, Smartphone, Globe } from 'lucide-react';

const UserProfileInvestigation: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>('USER-001');
  const user = mockUserProfiles.find(u => u.id === selectedUserId);

  if (!user) {
    return <Layout><div>User not found</div></Layout>;
  }

  const userTransactions = mockTransactions.filter(
    t => t.senderId === selectedUserId || t.receiverId === selectedUserId
  );

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-danger/20 text-danger border border-danger/30';
      case 'high':
        return 'bg-warning/20 text-warning border border-warning/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      default:
        return 'bg-success/20 text-success border border-success/30';
    }
  };

  return (
    <Layout>
      <div className='space-y-6'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold text-white'>User Profile Investigation</h1>
          <p className='text-text-secondary mt-2'>Detailed analysis of user behavior and associated fraud risk</p>
        </div>

        {/* User Selector */}
        <div className='glass-card p-4 rounded-lg'>
          <label className='text-sm font-medium text-white mb-2 block'>Select User</label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className='input-field'
          >
            {mockUserProfiles.map(u => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.id}) - Risk: {u.fraudScore}%
              </option>
            ))}
          </select>
        </div>

        {/* User Details Card */}
        <div className='glass-card p-6 rounded-lg border border-cyan-accent/30'>
          <div className='flex items-start justify-between mb-6'>
            <div>
              <h2 className='text-2xl font-bold text-white'>{user.name}</h2>
              <p className='text-text-secondary'>{user.id}</p>
            </div>
            <div className={`px-4 py-2 rounded-lg font-semibold ${getRiskLevelColor(user.riskLevel)}`}>
              {user.riskLevel.toUpperCase()} RISK
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
            <div className='bg-dark-bg/50 p-4 rounded-lg'>
              <p className='text-text-secondary text-sm mb-1 flex items-center gap-2'>
                <Mail size={16} />
                Email
              </p>
              <p className='text-white font-mono text-sm'>{user.email}</p>
            </div>

            <div className='bg-dark-bg/50 p-4 rounded-lg'>
              <p className='text-text-secondary text-sm mb-1 flex items-center gap-2'>
                <Phone size={16} />
                Phone
              </p>
              <p className='text-white font-mono text-sm'>{user.phone}</p>
            </div>

            <div className='bg-dark-bg/50 p-4 rounded-lg'>
              <p className='text-text-secondary text-sm mb-1 flex items-center gap-2'>
                <Calendar size={16} />
                Join Date
              </p>
              <p className='text-white text-sm'>{new Date(user.joinDate).toLocaleDateString()}</p>
            </div>

            <div className='bg-dark-bg/50 p-4 rounded-lg'>
              <p className='text-text-secondary text-sm mb-1 flex items-center gap-2'>
                <TrendingUp size={16} />
                Fraud Score
              </p>
              <p className='text-2xl font-bold text-danger'>{user.fraudScore}%</p>
            </div>
          </div>

          {/* Activity Metrics */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-dark-bg/50 p-4 rounded-lg border-l-4 border-cyan-accent'>
              <p className='text-text-secondary text-sm mb-1'>Total Transactions</p>
              <p className='text-2xl font-bold text-white'>{user.totalTransactions}</p>
            </div>

            <div className='bg-dark-bg/50 p-4 rounded-lg border-l-4 border-danger'>
              <p className='text-text-secondary text-sm mb-1'>Flagged Transactions</p>
              <p className='text-2xl font-bold text-danger'>{user.flaggedTransactions}</p>
            </div>

            <div className='bg-dark-bg/50 p-4 rounded-lg border-l-4 border-success'>
              <p className='text-text-secondary text-sm mb-1'>Last Activity</p>
              <p className='text-sm text-white'>
                {new Date(user.lastActivity).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Linked Accounts, Devices, and IPs */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='glass-card p-6 rounded-lg'>
            <h3 className='text-lg font-bold text-white mb-4 flex items-center gap-2'>
              <Smartphone size={20} className='text-cyan-accent' />
              Linked Devices ({user.linkedDevices.length})
            </h3>
            <div className='space-y-2'>
              {user.linkedDevices.map(device => (
                <div key={device} className='p-3 bg-dark-bg/50 rounded-lg text-sm'>
                  {device}
                </div>
              ))}
            </div>
          </div>

          <div className='glass-card p-6 rounded-lg'>
            <h3 className='text-lg font-bold text-white mb-4 flex items-center gap-2'>
              <Globe size={20} className='text-warning' />
              Linked IP Addresses ({user.linkedIPs.length})
            </h3>
            <div className='space-y-2'>
              {user.linkedIPs.map(ip => (
                <div key={ip} className='p-3 bg-dark-bg/50 rounded-lg text-sm font-mono'>
                  {ip}
                </div>
              ))}
            </div>
          </div>

          <div className='glass-card p-6 rounded-lg'>
            <h3 className='text-lg font-bold text-white mb-4 flex items-center gap-2'>
              <TrendingUp size={20} className='text-success' />
              Linked Accounts ({user.linkedAccounts.length})
            </h3>
            <div className='space-y-2'>
              {user.linkedAccounts.map(account => (
                <div key={account} className='p-3 bg-dark-bg/50 rounded-lg text-sm'>
                  {account}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className='glass-card p-6 rounded-lg'>
          <h3 className='text-lg font-bold text-white mb-4 flex items-center gap-2'>
            <Activity size={20} />
            Transaction History
          </h3>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-border-dark'>
                  <th className='text-left py-3 px-4 text-text-secondary font-medium'>Transaction ID</th>
                  <th className='text-left py-3 px-4 text-text-secondary font-medium'>Counterparty</th>
                  <th className='text-right py-3 px-4 text-text-secondary font-medium'>Amount</th>
                  <th className='text-center py-3 px-4 text-text-secondary font-medium'>Risk Score</th>
                  <th className='text-left py-3 px-4 text-text-secondary font-medium'>Status</th>
                  <th className='text-left py-3 px-4 text-text-secondary font-medium'>Date</th>
                </tr>
              </thead>
              <tbody>
                {userTransactions.slice(0, 10).map(tx => (
                  <tr key={tx.id} className='border-b border-border-dark hover:bg-dark-bg/50'>
                    <td className='py-3 px-4 font-mono text-cyan-accent'>{tx.id}</td>
                    <td className='py-3 px-4'>
                      {tx.senderId === selectedUserId ? tx.receiverName : tx.senderName}
                    </td>
                    <td className='py-3 px-4 text-right'>
                      ${tx.amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    </td>
                    <td className='py-3 px-4 text-center'>
                      <span className='badge badge-danger'>{tx.riskScore}%</span>
                    </td>
                    <td className='py-3 px-4 capitalize'>{tx.status}</td>
                    <td className='py-3 px-4 text-text-secondary'>
                      {new Date(tx.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfileInvestigation;
