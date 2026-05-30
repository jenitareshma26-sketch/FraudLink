import React from 'react';
import Layout from '../components/Layout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { mockTransactions } from '../data/mockData';

const RiskAnalysis: React.FC = () => {
  const distribution = [
    { name: '0-20', count: mockTransactions.filter(t => t.riskScore < 20).length },
    { name: '20-40', count: mockTransactions.filter(t => t.riskScore >= 20 && t.riskScore < 40).length },
    { name: '40-60', count: mockTransactions.filter(t => t.riskScore >= 40 && t.riskScore < 60).length },
    { name: '60-80', count: mockTransactions.filter(t => t.riskScore >= 60 && t.riskScore < 80).length },
    { name: '80-100', count: mockTransactions.filter(t => t.riskScore >= 80).length },
  ];

  return (
    <Layout>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold text-white'>Risk Analysis</h1>
        <p className='text-text-secondary'>Distribution of risk scores and anomaly detection insights</p>

        <div className='glass-card p-6 rounded-lg'>
          <h3 className='text-lg font-semibold text-white mb-4'>Risk Score Distribution</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={distribution}>
                <XAxis dataKey='name' stroke='#8892A4' />
                <YAxis stroke='#8892A4' />
                <Tooltip />
                <Bar dataKey='count' fill='#00D4FF' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='glass-card p-6 rounded-lg'>
            <h3 className='text-lg font-semibold text-white mb-4'>AI Confidence</h3>
            <p className='text-text-secondary'>Mock AI confidence gauge placeholder</p>
          </div>

          <div className='glass-card p-6 rounded-lg'>
            <h3 className='text-lg font-semibold text-white mb-4'>Behavioral Heatmap</h3>
            <p className='text-text-secondary'>Heatmap placeholder</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RiskAnalysis;
