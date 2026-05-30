import React from 'react';
import Layout from '../components/Layout';

const AdminSettings: React.FC = () => {
  return (
    <Layout>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold text-white'>Admin Settings</h1>
        <p className='text-text-secondary'>User management, thresholds, API keys, and AI settings</p>

        <div className='glass-card p-6 rounded-lg'>
          <p className='text-text-secondary'>Settings placeholders</p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminSettings;
