import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../features/store';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Layout from '../components/Layout';
import { TrendingUp, AlertTriangle, Users, Network } from 'lucide-react';

const Dashboard: React.FC = () => {
  const transactions = useSelector((state: RootState) => state.transactions.items);
  const alerts = useSelector((state: RootState) => state.alerts.items);

  // Calculate stats
  const totalTransactions = transactions.length;
  const fraudAlerts = alerts.length;
  const highRiskUsers = new Set(transactions.filter(t => t.riskScore > 70).map(t => t.senderId)).size;
  const totalFraudValue = transactions
    .filter(t => t.status === 'flagged')
    .reduce((sum, t) => sum + t.amount, 0);

  // Fraud trends data (last 30 days)
  const fraudTrendsData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fraudCount: Math.floor(Math.random() * 20) + 5,
      alerts: Math.floor(Math.random() * 15) + 2,
    };
  });

  // Fraud categories
  const fraudCategories = [
    { name: 'Money Laundering', value: 35, color: '#FF3B3B' },
    { name: 'Account Takeover', value: 25, color: '#FFB500' },
    { name: 'Rapid Transactions', value: 20, color: '#00FF88' },
    { name: 'Shared Device', value: 12, color: '#00D4FF' },
    { name: 'Other', value: 8, color: '#C75DFF' },
  ];

  const recentAlerts = alerts.slice(0, 5);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'badge-danger';
      case 'high':
        return 'badge-warning';
      case 'medium':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };

  return (
    <Layout>
      <div className='space-y-6'>
        {/* Page Header */}
        <div>
          <h1 className='text-3xl font-bold text-white'>Dashboard</h1>
          <p className='text-text-secondary mt-2'>Real-time fraud detection and network analysis</p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {/* Total Transactions */}
          <div className='stat-card'>
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-text-secondary text-sm mb-1'>Total Transactions</p>
                <p className='text-3xl font-bold text-white'>{totalTransactions.toLocaleString()}</p>
                <p className='text-success text-xs mt-2'>↑ 12% from last month</p>
              </div>
              <div className='p-3 rounded-lg bg-cyan-accent/10'>
                <TrendingUp className='text-cyan-accent' size={24} />
              </div>
            </div>
          </div>

          {/* Fraud Alerts */}
          <div className='stat-card'>
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-text-secondary text-sm mb-1'>Fraud Alerts</p>
                <p className='text-3xl font-bold text-white'>{fraudAlerts}</p>
                <p className='text-danger text-xs mt-2'>4 unreviewed</p>
              </div>
              <div className='p-3 rounded-lg bg-danger/10'>
                <AlertTriangle className='text-danger' size={24} />
              </div>
            </div>
          </div>

          {/* High-Risk Users */}
          <div className='stat-card'>
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-text-secondary text-sm mb-1'>High-Risk Users</p>
                <p className='text-3xl font-bold text-white'>{highRiskUsers}</p>
                <p className='text-warning text-xs mt-2'>Requires investigation</p>
              </div>
              <div className='p-3 rounded-lg bg-warning/10'>
                <Users className='text-warning' size={24} />
              </div>
            </div>
          </div>

          {/* Active Scam Networks */}
          <div className='stat-card'>
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-text-secondary text-sm mb-1'>Scam Networks</p>
                <p className='text-3xl font-bold text-white'>5</p>
                <p className='text-danger text-xs mt-2'>${totalFraudValue.toLocaleString()} loss</p>
              </div>
              <div className='p-3 rounded-lg bg-success/10'>
                <Network className='text-success' size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Fraud Trends Chart */}
          <div className='lg:col-span-2 glass-card p-6 rounded-lg'>
            <h2 className='text-lg font-bold text-white mb-4'>Fraud Trends (Last 30 Days)</h2>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={fraudTrendsData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#1A2332' />
                <XAxis
                  dataKey='date'
                  stroke='#5A6270'
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.split(' ')[0]}
                />
                <YAxis stroke='#5A6270' tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111729',
                    border: '1px solid #00D4FF',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#00D4FF' }}
                />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='fraudCount'
                  stroke='#FF3B3B'
                  name='Fraud Cases'
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type='monotone'
                  dataKey='alerts'
                  stroke='#00D4FF'
                  name='Alerts'
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Fraud Categories Pie Chart */}
          <div className='glass-card p-6 rounded-lg'>
            <h2 className='text-lg font-bold text-white mb-4'>Fraud Categories</h2>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={fraudCategories}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill='#8884d8'
                  dataKey='value'
                >
                  {fraudCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts Table */}
        <div className='glass-card p-6 rounded-lg'>
          <h2 className='text-lg font-bold text-white mb-4'>Recent Alerts</h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-border-dark'>
                  <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Type</th>
                  <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Severity</th>
                  <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Affected User</th>
                  <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Time</th>
                  <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAlerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className='border-b border-border-dark hover:bg-dark-bg/50 transition-colors'
                  >
                    <td className='py-3 px-4 text-sm'>
                      <span className='capitalize'>{alert.type.replace('_', ' ')}</span>
                    </td>
                    <td className='py-3 px-4 text-sm'>
                      <span className={`badge ${getSeverityBadge(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className='py-3 px-4 text-sm'>{alert.affectedUserName}</td>
                    <td className='py-3 px-4 text-sm text-text-secondary'>
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </td>
                    <td className='py-3 px-4 text-sm'>
                      {alert.reviewed ? (
                        <span className='badge-success'>Reviewed</span>
                      ) : (
                        <span className='badge-danger'>Unreviewed</span>
                      )}
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

export default Dashboard;
