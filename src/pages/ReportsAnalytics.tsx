import React from 'react';
import Layout from '../components/Layout';

const ReportsAnalytics: React.FC = () => {
  return (
    <Layout>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold text-white'>Reports & Analytics</h1>
        <p className='text-text-secondary'>Generate and download reports</p>

        <div className='glass-card p-6 rounded-lg'>
          <p className='text-text-secondary'>Report generation placeholders (PDF/Excel export)</p>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsAnalytics;
