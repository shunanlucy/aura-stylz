import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { Activity, Zap, ShoppingBag, LogOut } from 'lucide-react';
import { auth } from '../firebase';

export const Dashboard: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { appUser, manifestNow } = useAppContext();
  const [isManifesting, setIsManifesting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Calculate progress based on streak (max 30 days for visual)
  const targetProgress = Math.min((appUser?.manifestationStreak || 0) / 30 * 100, 100);

  useEffect(() => {
    // Animate progress bar on load
    const timer = setTimeout(() => setProgress(targetProgress), 500);
    return () => clearTimeout(timer);
  }, [targetProgress]);

  const handleManifest = async () => {
    setIsManifesting(true);
    await manifestNow();
    setTimeout(() => setIsManifesting(false), 1500);
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const circumference = 2 * Math.PI * 120; // r=120
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col min-h-screen bg-pure-black text-white p-6 relative overflow-y-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 z-10">
        <div>
          <h1 className="text-2xl font-bold tracking-wider">Aura Stylz</h1>
          <p className="text-sm text-gray-400">Welcome back, {appUser?.name?.split(' ')[0] || 'Seeker'}</p>
        </div>
        <button onClick={handleLogout} className="p-3 rounded-full bg-dark-elevated neo-shadow">
          <LogOut className="w-5 h-5 text-gray-400" />
        </button>
      </header>

      {/* Daily Manifestation Tracker */}
      <section className="flex flex-col items-center justify-center mb-12 relative z-10">
        <div className="relative w-72 h-72 flex items-center justify-center">
          {/* Background Circle */}
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle
              cx="144"
              cy="144"
              r="120"
              stroke="#111"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="144"
              cy="144"
              r="120"
              stroke="url(#goldGradient)"
              strokeWidth="12"
              fill="transparent"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ strokeDasharray: circumference }}
              className="drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
            />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFA500" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="flex flex-col items-center text-center z-10">
            <span className="text-5xl font-bold text-white text-glow-gold">
              {appUser?.manifestationStreak || 0}
            </span>
            <span className="text-xs uppercase tracking-widest text-neo-gold mt-2">Day Streak</span>
          </div>
        </div>
      </section>

      {/* Positive Energy Score */}
      <section className="mb-12 z-10">
        <div className="bg-dark-surface rounded-3xl p-6 neo-shadow relative overflow-hidden">
          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-0" />
          
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-1">Energy Score</h3>
              <div className="text-4xl font-bold text-white">
                {appUser?.positiveEnergyScore || 0}
                <span className="text-lg text-gray-500 font-normal">/100</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full bg-deep-purple/20 flex items-center justify-center border border-deep-purple/30">
              <Zap className="w-8 h-8 text-deep-purple text-glow-purple" />
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="grid grid-cols-1 gap-4 z-10 pb-8">
        <button 
          onClick={handleManifest}
          disabled={isManifesting}
          className="w-full py-5 rounded-2xl bg-neo-gold text-pure-black font-bold tracking-wider uppercase transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,215,0,0.2)] flex items-center justify-center space-x-3"
        >
          {isManifesting ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <Zap className="w-6 h-6" />
            </motion.div>
          ) : (
            <>
              <Zap className="w-6 h-6" />
              <span>Manifest Now</span>
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => onNavigate('rewards')}
            className="py-5 rounded-2xl bg-dark-elevated neo-shadow text-white font-semibold tracking-wider uppercase transition-transform active:scale-95 flex flex-col items-center justify-center space-y-2"
          >
            <Activity className="w-6 h-6 text-neo-gold" />
            <span className="text-xs">Rewards</span>
          </button>
          
          <button 
            className="py-5 rounded-2xl bg-dark-elevated neo-shadow text-white font-semibold tracking-wider uppercase transition-transform active:scale-95 flex flex-col items-center justify-center space-y-2"
          >
            <ShoppingBag className="w-6 h-6 text-deep-purple" />
            <span className="text-xs">Shop Exclusive</span>
          </button>
        </div>
      </section>
      
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
