import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { Network, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        setShowOTP(true);
        setLoading(false);
      } else {
        setError('Please enter email and password');
        setLoading(false);
      }
    }, 1000);
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      if (otp === '123456' || otp.length === 6) {
        dispatch(login({ email, password }));
        navigate('/dashboard');
      } else {
        setError('Invalid OTP. Try 123456');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className='min-h-screen bg-dark-bg flex items-center justify-center px-4 py-8 sm:p-6 overflow-x-hidden relative'>
      {/* Animated Background Elements */}
      <div className='pointer-events-none absolute inset-0 opacity-5'>
        <div className='absolute top-10 left-4 sm:top-20 sm:left-10 w-56 h-56 sm:w-72 sm:h-72 bg-cyan-accent rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow'></div>
        <div className='absolute bottom-10 right-4 sm:bottom-20 sm:right-10 w-56 h-56 sm:w-72 sm:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow' style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Login Card */}
      <div className='relative z-10 w-full max-w-md mx-auto'>
        {/* Header */}
        <div className='text-center mb-6 sm:mb-8'>
          <div className='flex items-center justify-center gap-2 mb-3 sm:mb-4'>
            <Network className='text-cyan-accent' size={32} />
            <h1 className='text-3xl sm:text-4xl font-bold text-cyan-accent'>FraudLink</h1>
          </div>
          <p className='text-sm sm:text-base text-text-secondary'>AI-Powered Scam Network Detection</p>
        </div>

        {/* Card */}
        <div className='glass-card p-5 sm:p-8 rounded-xl border border-cyan-accent/30 shadow-glow-cyan'>
          {!showOTP ? (
            <>
              <h2 className='text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6'>Sign In</h2>

              {error && (
                <div className='mb-6 p-4 rounded-lg bg-danger/10 border border-danger/30 flex items-start gap-3'>
                  <AlertCircle size={20} className='text-danger flex-shrink-0 mt-0.5' />
                  <p className='text-danger text-sm'>{error}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className='space-y-4'>
                {/* Email */}
                <div>
                  <label className='block text-sm font-medium text-white mb-2'>Email Address</label>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='your@email.com'
                    className='input-field'
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className='block text-sm font-medium text-white mb-2'>Password</label>
                  <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='••••••••'
                    className='input-field'
                    required
                  />
                </div>

                {/* Remember & Forgot Password */}
                <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm'>
                  <label className='flex items-center gap-2 text-text-secondary hover:text-white cursor-pointer'>
                    <input type='checkbox' className='w-4 h-4 rounded' />
                    Remember me
                  </label>
                  <a href='#' className='text-cyan-accent hover:text-cyan-dark transition-colors'>
                    Forgot password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type='submit'
                  disabled={loading}
                  className='btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              {/* Demo Credentials */}
              <div className='mt-5 sm:mt-6 p-4 rounded-lg bg-dark-bg/50 border border-border-dark'>
                <p className='text-xs text-text-secondary mb-2 font-medium'>Demo Credentials:</p>
                <p className='text-xs text-cyan-accent/80'>Email: john@example.com</p>
                <p className='text-xs text-cyan-accent/80'>Password: password123</p>
              </div>
            </>
          ) : (
            <>
              <h2 className='text-xl sm:text-2xl font-bold text-white mb-2'>Two-Factor Authentication</h2>
              <p className='text-text-secondary text-sm mb-6'>Enter the 6-digit code sent to {email}</p>

              {error && (
                <div className='mb-6 p-4 rounded-lg bg-danger/10 border border-danger/30 flex items-start gap-3'>
                  <AlertCircle size={20} className='text-danger flex-shrink-0 mt-0.5' />
                  <p className='text-danger text-sm'>{error}</p>
                </div>
              )}

              <form onSubmit={handleOTPSubmit} className='space-y-4'>
                {/* OTP Input */}
                <div>
                  <label className='block text-sm font-medium text-white mb-2'>OTP Code</label>
                  <input
                    type='text'
                    value={otp}
                    onChange={(e) => setOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder='000000'
                    className='input-field text-center text-2xl tracking-widest font-mono'
                    maxLength={6}
                    required
                  />
                </div>

                {/* OTP Submit Button */}
                <button
                  type='submit'
                  disabled={loading || otp.length !== 6}
                  className='btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>

                {/* Back Button */}
                <button
                  type='button'
                  onClick={() => {
                    setShowOTP(false);
                    setOTP('');
                    setError('');
                  }}
                  className='btn-secondary w-full'
                >
                  Back
                </button>
              </form>

              {/* Demo OTP */}
              <div className='mt-5 sm:mt-6 p-4 rounded-lg bg-dark-bg/50 border border-border-dark'>
                <p className='text-xs text-text-secondary'>Demo OTP: <span className='text-cyan-accent'>123456</span></p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <p className='text-center text-text-secondary text-xs sm:text-sm mt-5 sm:mt-6 px-2'>
          Protected by enterprise-grade encryption and security protocols
        </p>
      </div>
    </div>
  );
};

export default Login;
