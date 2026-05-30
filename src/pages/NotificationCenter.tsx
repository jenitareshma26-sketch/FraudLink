import React from 'react';
import Layout from '../components/Layout';
import { mockFraudAlerts } from '../data/mockData';

const NotificationCenter: React.FC = () => {
  return (
    <Layout>
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Notification Center</h1>
          <p className='text-text-secondary mt-2'>Recent alerts and system notifications</p>
        </div>

        <div className='space-y-3'>
          {mockFraudAlerts.slice(0, 5).map((alert) => (
            <div key={alert.id} className='glass-card p-4 rounded-lg border border-border-dark'>
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <h3 className='text-white font-semibold'>{alert.title}</h3>
                  <p className='text-text-secondary text-sm mt-1'>{alert.description}</p>
                  <p className='text-text-secondary text-xs mt-2'>User: {alert.affectedUserName}</p>
                </div>
                <span className='badge badge-danger capitalize'>{alert.severity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default NotificationCenter;
