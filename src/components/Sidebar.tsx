import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  BarChart3,
  Network,
  Zap,
  AlertTriangle,
  Users,
  Settings,
  TrendingUp,
  FolderOpen,
  Globe,
  LogOut,
} from 'lucide-react';
import { logout } from '../features/authSlice';

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: <BarChart3 size={20} /> },
    { label: 'Network Map', path: '/network', icon: <Network size={20} /> },
    { label: 'Transactions', path: '/transactions', icon: <Zap size={20} /> },
    { label: 'Fraud Alerts', path: '/alerts', icon: <AlertTriangle size={20} />, badge: 4 },
    { label: 'User Profiles', path: '/profiles', icon: <Users size={20} /> },
    { label: 'Cases', path: '/cases', icon: <FolderOpen size={20} /> },
    { label: 'Devices & IPs', path: '/devices', icon: <Globe size={20} /> },
    { label: 'Analytics', path: '/analytics', icon: <TrendingUp size={20} /> },
    { label: 'Reports', path: '/reports', icon: <FolderOpen size={20} /> },
    { label: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`fixed inset-y-0 left-0 z-50 h-screen w-64 bg-dark-secondary border-r border-border-dark flex flex-col transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      {/* Logo */}
      <div className='flex items-center justify-between h-16 border-b border-border-dark px-4'>
        <div className='flex items-center justify-center gap-3'>
          <Network className='text-cyan-accent md:hidden' size={28} />
          <h1 className='hidden text-xl font-bold text-cyan-accent glow-text md:block'>FraudLink</h1>
        </div>
        <button
          type='button'
          onClick={onClose}
          className='md:hidden rounded-md px-2 py-1 text-text-secondary hover:text-white hover:bg-dark-bg/50'
          aria-label='Close menu'
        >
          ✕
        </button>
      </div>

      {/* Navigation Items */}
      <nav className='flex-1 overflow-y-auto py-4'>
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={`flex items-center justify-between px-4 py-3 mx-2 mb-2 rounded-lg transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-cyan-accent bg-opacity-10 text-cyan-accent border border-cyan-accent shadow-glow-cyan'
                : 'text-text-secondary hover:bg-dark-bg/50 hover:text-white'
            }`}
            title={!isOpen ? item.label : ''}
          >
            <span className='flex items-center gap-3'>
              {item.icon}
              <span className={`text-sm font-medium ${isOpen ? 'block' : 'hidden'} md:block`}>
                {item.label}
              </span>
            </span>
            {item.badge && (
              <span className='badge-danger px-2 py-1 text-xs font-bold'>{item.badge}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className='border-t border-border-dark p-4'>
        <button
          type='button'
          onClick={() => {
            dispatch(logout());
            onClose?.();
          }}
          className='flex items-center gap-3 w-full rounded-lg bg-danger/10 hover:bg-danger/20 text-danger px-4 py-2 transition-all duration-200'
        >
          <LogOut size={20} />
          <span className='text-sm font-medium md:block'>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
