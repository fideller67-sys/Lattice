import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { Mail, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { verifyOtp, unverifiedEmail } = useAuth();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(59);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple chars
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Move to next input automatically
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otp = code.join('');
    if (otp.length < 6 || !unverifiedEmail) return;

    setIsLoading(true);
    setError('');
    try {
      await verifyOtp(unverifiedEmail, otp);
      navigate('/setup-workspace');
    } catch (err) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-[#111116] border border-white/5 rounded-2xl p-8 max-w-sm mx-auto shadow-2xl relative mt-10">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-[#16161c] border border-white/10 rounded-xl flex items-center justify-center text-cyan-400">
            <Mail className="w-6 h-6" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2 text-white">Verify your email</h1>
          <p className="text-gray-400 text-sm">We sent a 6-digit code to<br/>
            <span className="text-white font-medium">
              {unverifiedEmail ? unverifiedEmail.replace(/(.{1}).*(@.*)/, '$1***$2') : 'your email'}
            </span>
          </p>
        </div>

        <form onSubmit={handleVerify}>
          <div className="flex justify-between gap-2 mb-8">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={inputRefs[idx]}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`w-12 h-14 bg-[#16161c] border rounded-lg text-center text-xl font-bold text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors ${digit ? 'border-cyan-400/50' : 'border-white/10'}`}
                required
              />
            ))}
          </div>

          {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

          <button 
            type="submit" 
            disabled={code.some(c => c === '') || isLoading || !unverifiedEmail}
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-3 rounded-lg text-sm transition-colors shadow-cyan-500/20 shadow-lg mb-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-black" /> : 'Verify Email'}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 font-medium">
          Didn't receive a code?{' '}
          {countdown > 0 ? (
            <span className="text-gray-400">Resend code in 0:{countdown.toString().padStart(2, '0')}</span>
          ) : (
            <button className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer">Resend code now</button>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
