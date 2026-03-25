import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Splash } from './components/Splash';
import { Onboarding } from './components/Onboarding';
import { HomeTab } from './components/HomeTab';
import { LeaderboardTab } from './components/LeaderboardTab';
import { MagicLogTab } from './components/MagicLogTab';
import { CartTab } from './components/CartTab';
import { ProfileTab } from './components/ProfileTab';
import { BottomNav } from './components/BottomNav';
import { AnimatePresence, motion } from 'motion/react';

const AppContent: React.FC = () => {
  const { user, loading } = useAppContext();
  const [showSplash, setShowSplash] = useState(true);
  const [currentTab, setCurrentTab] = useState('home');

  if (showSplash) {
    return <Splash onComplete={() => setShowSplash(false)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-pure-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-neo-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Onboarding />;
  }

  return (
    <div className="min-h-screen bg-pure-black relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {currentTab === 'home' && <HomeTab />}
          {currentTab === 'leaderboard' && <LeaderboardTab />}
          {currentTab === 'magiclog' && <MagicLogTab />}
          {currentTab === 'cart' && <CartTab />}
          {currentTab === 'profile' && <ProfileTab />}
        </motion.div>
      </AnimatePresence>
      
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
