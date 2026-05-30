import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../features/store';

interface TopbarProps {
  onMenuClick?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const unreadAlerts = useSelector((state: RootState) => state.alerts.unreadCount);
  const navigate = useNavigate();

  return (
    <div className='fixed top-0 left-0 right-0 md:left-64 h-16 bg-dark-secondary border-b border-border-dark flex items-center justify-between gap-3 px-4 sm:px-6 z-30'>
      <div className='flex items-center gap-3 flex-1 min-w-0'>
        <button
          type='button'
          onClick={onMenuClick}
          className='md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-border-dark text-text-secondary hover:text-white hover:bg-dark-bg/50'
          aria-label='Open menu'
        >
          <span className='text-lg leading-none'>☰</span>
        </button>

        {/* Search Bar */}
        <div className='hidden sm:block flex-1 max-w-md'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search transactions, users, alerts...'
            className='input-field pl-10 py-2 text-sm'
          />
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary' size={16} />
        </div>
        </div>
      </div>

      {/* Right Side Items */}
      <div className='flex items-center gap-2 sm:gap-4 flex-shrink-0'>
        {/* Notifications */}
        <button
          type='button'
          onClick={() => navigate('/notifications')}
          className='relative p-2 text-text-secondary hover:text-white rounded-lg hover:bg-dark-bg/50 transition-all duration-200'
          aria-label='Open notifications'
        >
          <Bell size={20} />
          {unreadAlerts > 0 && (
            <span className='absolute top-1 right-1 w-5 h-5 bg-danger rounded-full flex items-center justify-center text-white text-xs font-bold'>
              {unreadAlerts}
            </span>
          )}
        </button>

        {/* User Profile Dropdown */}
        <div className='flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-border-dark'>
          <div className='text-right hidden md:block'>
            <p className='text-sm font-medium text-white'>{user?.name || 'User'}</p>
            <p className='text-xs text-text-secondary capitalize'>{user?.role || 'analyst'}</p>
          </div>
          <button
            type='button'
            onClick={() => navigate('/profiles')}
            className='w-10 h-10 rounded-full bg-gradient-to-r from-cyan-accent to-blue-500 flex items-center justify-center hover:shadow-glow-cyan transition-all duration-200'
            aria-label='Open profile'
          >
            <User size={20} className='text-white' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
