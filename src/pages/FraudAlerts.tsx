import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import type { RootState } from '../features/store';
import { AlertTriangle } from 'lucide-react';
import { escalateAlert, markAsReviewed } from '../features/alertSlice';

const severityClass = (severity: string) => {
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

const FraudAlerts: React.FC = () => {
  const severities = ['critical', 'high', 'medium', 'low'] as const;
  const dispatch = useDispatch();
  const alertsFromStore = useSelector((state: RootState) => state.alerts.items);
  const [alerts, setAlerts] = useState(alertsFromStore);

  useEffect(() => {
    setAlerts(alertsFromStore);
  }, [alertsFromStore]);

  const handleMarkReviewed = (alertId: string) => {
    setAlerts((current) => current.map((alert) => (
      alert.id === alertId ? { ...alert, reviewed: true } : alert
    )));
    dispatch(markAsReviewed(alertId));
  };

  const handleEscalate = (alertId: string) => {
    setAlerts((current) => current.map((alert) => (
      alert.id === alertId ? { ...alert, escalated: true, reviewed: true } : alert
    )));
    dispatch(escalateAlert(alertId));
  };

  return (
    <Layout>
      <div className='space-y-5 sm:space-y-6'>
        <div className='space-y-2'>
          <h1 className='text-2xl sm:text-3xl font-bold text-white'>Fraud Alerts</h1>
          <p className='text-sm sm:text-base text-text-secondary'>View and manage fraud alerts grouped by severity</p>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 sm:gap-5 items-start'>
          {severities.map((sev) => {
            const alertsForSeverity = alerts.filter((alert) => alert.severity === sev);

            return (
              <div key={sev} className='glass-card rounded-xl p-4 sm:p-5 h-full'>
                <div className='flex items-center justify-between gap-3 mb-4'>
                  <div>
                    <h3 className='text-base sm:text-lg font-semibold text-white capitalize'>{sev}</h3>
                    <p className='text-xs sm:text-sm text-text-secondary'>{alertsForSeverity.length} alerts</p>
                  </div>
                  <span className={`${severityClass(sev)} text-xs sm:text-sm`}>{sev}</span>
                </div>

                <div className='space-y-3'>
                  {alertsForSeverity.map((alert) => (
                    <div
                      key={alert.id}
                      className='rounded-lg border border-border-dark bg-dark-bg/50 p-3 sm:p-4 flex gap-3 items-start'
                    >
                      <div className='mt-0.5 shrink-0'>
                        <AlertTriangle className='text-danger' size={20} />
                      </div>
                      <div className='min-w-0 flex-1 space-y-3'>
                        <div className='flex items-center gap-3'>
                          <h4 className='text-white font-semibold text-sm sm:text-base leading-snug truncate'>{alert.title}</h4>
                          <div className='ml-auto flex items-center gap-2'>
                            <span className={`${severityClass(alert.severity)} text-xs sm:text-sm whitespace-nowrap`}>{alert.severity}</span>
                          </div>
                        </div>

                        <p className='text-text-secondary text-xs sm:text-sm leading-relaxed max-h-16 overflow-hidden break-words'>{alert.description}</p>
                        <p className='text-text-secondary text-xs'>Affected: <span className='font-medium'>{alert.affectedUserName}</span></p>

                        <div className='flex items-center justify-end gap-2'>
                          <button
                            type='button'
                            onClick={() => handleEscalate(alert.id)}
                            className='btn-primary text-sm'
                            disabled={alert.escalated}
                          >
                            {alert.escalated ? 'Escalated' : 'Escalate'}
                          </button>
                          <button
                            type='button'
                            onClick={() => handleMarkReviewed(alert.id)}
                            className='btn-secondary text-sm'
                            disabled={alert.reviewed}
                          >
                            {alert.reviewed ? 'Reviewed' : 'Mark Reviewed'}
                          </button>
                        </div>

                        <div className='flex flex-wrap gap-2 text-xs font-medium mt-2'>
                          {alert.reviewed && <span className='badge-success'>Reviewed</span>}
                          {alert.escalated && <span className='badge-warning'>Escalated</span>}
                        </div>
                      </div>
                    </div>
                  ))}

                  {alertsForSeverity.length === 0 && (
                    <div className='rounded-lg border border-dashed border-border-dark bg-dark-bg/30 p-4 text-center text-text-secondary text-sm'>
                      No alerts
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default FraudAlerts;
