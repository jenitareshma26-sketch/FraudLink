import React from 'react';
import Layout from '../components/Layout';
import { mockCases } from '../data/mockData';

const CaseManagement: React.FC = () => {
  return (
    <Layout>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold text-white'>Case Management</h1>
        <p className='text-text-secondary'>Manage investigation cases and evidence</p>

        <div className='glass-card p-6 rounded-lg overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-border-dark'>
                <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Case ID</th>
                <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Title</th>
                <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Suspect</th>
                <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Assigned To</th>
                <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Status</th>
                <th className='text-left py-3 px-4 text-text-secondary text-sm font-medium'>Priority</th>
              </tr>
            </thead>
            <tbody>
              {mockCases.map(c => (
                <tr key={c.id} className='border-b border-border-dark hover:bg-dark-bg/50'>
                  <td className='py-3 px-4'>{c.caseId}</td>
                  <td className='py-3 px-4'>{c.title}</td>
                  <td className='py-3 px-4'>{c.suspectName}</td>
                  <td className='py-3 px-4'>{c.assignedTo}</td>
                  <td className='py-3 px-4 capitalize'>{c.status}</td>
                  <td className='py-3 px-4 capitalize'>{c.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CaseManagement;
