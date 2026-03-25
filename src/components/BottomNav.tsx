import React from 'react';
import { Home, Trophy, Sparkles, ShoppingCart, User } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'leaderboard', icon: Trophy, label: 'Rank' },
    { id: 'magiclog', icon: Sparkles, label: 'Magic Log', isCenter: true },
    { id: 'cart', icon: ShoppingCart, label: 'Cart' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-elevated/90 backdrop-blur-md border-t border-white/5 pb-safe pt-2 px-6 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto relative">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          if (tab.isCenter) {
            return (
              <div key={tab.id} className="relative -top-6">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onTabChange(tab.id)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center neo-shadow-gold transition-colors ${
                    isActive ? 'bg-neo-gold text-pure-black' : 'bg-dark-surface text-neo-gold border border-neo-gold/30'
                  }`}
                >
                  <Icon className="w-8 h-8" />
                </motion.button>
              </div>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${
                isActive ? 'text-neo-gold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium tracking-wider uppercase">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
