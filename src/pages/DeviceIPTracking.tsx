import React from 'react';
import Layout from '../components/Layout';
import { mockIPAddresses } from '../data/mockData';

const DeviceIPTracking: React.FC = () => {
  return (
    <Layout>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold text-white'>Device & IP Tracking</h1>
        <p className='text-text-secondary'>Map of flagged IP addresses and device clusters</p>

        <div className='glass-card p-6 rounded-lg'>
          <div className='mb-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='stat-card'>
              <p className='text-text-secondary text-sm mb-1'>Tracked IPs</p>
              <p className='text-2xl font-bold text-white'>{mockIPAddresses.length}</p>
            </div>
            <div className='stat-card'>
              <p className='text-text-secondary text-sm mb-1'>High Risk</p>
              <p className='text-2xl font-bold text-danger'>
                {mockIPAddresses.filter(ip => ip.riskLevel === 'high').length}
              </p>
            </div>
            <div className='stat-card'>
              <p className='text-text-secondary text-sm mb-1'>Linked Accounts</p>
              <p className='text-2xl font-bold text-cyan-accent'>
                {mockIPAddresses.reduce((total, ip) => total + ip.linkedAccounts.length, 0)}
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4'>
            <div className='relative overflow-hidden rounded-xl border border-border-dark bg-gradient-to-br from-dark-bg via-dark-secondary to-dark-bg min-h-[420px]'>
              <div className='absolute inset-0 opacity-20' style={{
                backgroundImage:
                  'linear-gradient(rgba(0,212,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.15) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }} />
              <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.10),transparent_55%)]' />
              <div className='absolute inset-0 p-6'>
                <div className='flex h-full items-center justify-center'>
                  <div className='relative w-full max-w-4xl h-[320px] rounded-2xl border border-cyan-accent/20 bg-dark-secondary/70 shadow-glow-cyan/20 overflow-hidden'>
                    {mockIPAddresses.map((ip) => {
                      const left = `${20 + ((ip.longitude + 180) / 360) * 60}%`;
                      const top = `${15 + ((90 - ip.latitude) / 180) * 70}%`;
                      return (
                        <div
                          key={ip.ip}
                          className='absolute -translate-x-1/2 -translate-y-1/2'
                          style={{ left, top }}
                        >
                          <div className={`h-4 w-4 rounded-full ${ip.riskLevel === 'high' ? 'bg-danger' : 'bg-warning'} shadow-lg`} />
                          <div className='absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-md border border-border-dark bg-dark-bg/90 px-3 py-2 text-xs text-white shadow-lg'>
                            <p className='font-semibold'>{ip.city}</p>
                            <p className='text-text-secondary'>{ip.ip}</p>
                          </div>
                        </div>
                      );
                    })}
                    <div className='absolute left-[52%] top-[42%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-accent/25 bg-cyan-accent/5 blur-[2px]' />
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-3'>
              {mockIPAddresses.map((ip) => (
                <div key={ip.ip} className='rounded-xl border border-border-dark bg-dark-secondary/70 p-4'>
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <p className='text-white font-semibold'>{ip.ip}</p>
                      <p className='text-text-secondary text-sm'>{ip.city}, {ip.country}</p>
                    </div>
                    <span className='badge badge-danger capitalize'>{ip.riskLevel}</span>
                  </div>
                  <div className='mt-3 text-sm text-text-secondary'>
                    <p>Linked accounts: {ip.linkedAccounts.join(', ')}</p>
                    <p>Last seen: {new Date(ip.lastSeen).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default DeviceIPTracking;
