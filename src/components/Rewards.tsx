import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Gift } from 'lucide-react';

// Mock rewards data
const MOCK_REWARDS = [
  { id: '1', title: '10% Off Next Bracelet', description: 'Use code AURA10 at checkout.', isScratched: false },
  { id: '2', title: 'Free Energy Cleansing Guide', description: 'Download your exclusive PDF guide.', isScratched: true },
  { id: '3', title: 'Mystery Gift', description: 'Scratch to reveal your cosmic surprise.', isScratched: false },
  { id: '4', title: 'Double Energy Points', description: 'Active for the next 24 hours.', isScratched: false },
];

export const Rewards: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [rewards, setRewards] = useState(MOCK_REWARDS);

  const handleScratch = (id: string) => {
    setRewards(rewards.map(r => r.id === id ? { ...r, isScratched: true } : r));
  };

  return (
    <div className="flex flex-col min-h-screen bg-pure-black text-white p-6">
      <header className="flex items-center mb-10">
        <button 
          onClick={() => onNavigate('dashboard')}
          className="p-3 rounded-full bg-dark-elevated neo-shadow mr-4"
        >
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </button>
        <h1 className="text-2xl font-bold tracking-wider">Your Rewards</h1>
      </header>

      <div className="grid grid-cols-2 gap-6 pb-8">
        {rewards.map((reward) => (
          <motion.div
            key={reward.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => !reward.isScratched && handleScratch(reward.id)}
            className="relative aspect-square rounded-3xl bg-dark-surface neo-shadow overflow-hidden cursor-pointer flex flex-col items-center justify-center p-4 text-center"
          >
            {reward.isScratched ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full w-full"
              >
                <Gift className="w-8 h-8 text-neo-gold mb-3" />
                <h3 className="text-sm font-bold text-white mb-2">{reward.title}</h3>
                <p className="text-xs text-gray-400">{reward.description}</p>
              </motion.div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-deep-purple to-[#2A004A] flex flex-col items-center justify-center z-10">
                <div className="w-full h-full absolute opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] mix-blend-overlay" />
                <span className="text-xs uppercase tracking-widest text-white/80 font-bold z-20">Tap to Scratch</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
