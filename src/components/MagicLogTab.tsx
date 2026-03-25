import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { Camera, Image as ImageIcon, Sparkles, CheckCircle } from 'lucide-react';

export const MagicLogTab: React.FC = () => {
  const { appUser, updateProfile } = useAppContext();
  const [isUploading, setIsUploading] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setShowAchievement(true);
      if (appUser) {
        updateProfile({ magicLogCount: (appUser.magicLogCount || 0) + 1 });
      }
      setTimeout(() => setShowAchievement(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-pure-black text-white p-6 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-deep-purple/20 rounded-full blur-[120px] pointer-events-none" />

      <header className="pt-4 mb-8 text-center z-10">
        <h1 className="text-2xl font-bold tracking-wider uppercase flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-neo-gold mr-2" />
          Magic Log
        </h1>
      </header>

      {/* User Profile Data */}
      <div className="bg-dark-surface rounded-3xl p-6 neo-shadow mb-8 z-10 border border-white/5">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neo-gold to-deep-purple p-1 mr-4">
            <div className="w-full h-full bg-pure-black rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">{appUser?.name?.charAt(0) || 'U'}</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{appUser?.name || 'User'}</h2>
            <p className="text-xs text-gray-500 font-mono">UID: {appUser?.uid.substring(0, 8)}...</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-dark-elevated p-4 rounded-2xl text-center border border-white/5">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Dream</p>
            <p className="font-bold text-neo-gold text-sm truncate">{appUser?.dream || 'Not Set'}</p>
          </div>
          <div className="bg-dark-elevated p-4 rounded-2xl text-center border border-white/5">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Logs</p>
            <p className="font-bold text-deep-purple text-xl">{appUser?.magicLogCount || 0}</p>
          </div>
        </div>
      </div>

      {/* Achievement Unlocked Toast */}
      {showAchievement && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-20 left-6 right-6 bg-neo-gold text-pure-black p-4 rounded-2xl neo-shadow-gold flex items-center z-50"
        >
          <CheckCircle className="w-6 h-6 mr-3" />
          <div>
            <h4 className="font-bold">Achievement Unlocked!</h4>
            <p className="text-xs">Magic Log added to your journey.</p>
          </div>
        </motion.div>
      )}

      {/* Upload Interface */}
      <div className="flex-1 flex flex-col justify-center z-10">
        <h3 className="text-center text-gray-400 mb-6 uppercase tracking-widest text-sm">Capture the Magic</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleUpload}
            disabled={isUploading}
            className="aspect-square rounded-3xl bg-dark-elevated neo-shadow flex flex-col items-center justify-center border border-white/5 hover:border-neo-gold/50 transition-colors"
          >
            <Camera className="w-10 h-10 text-neo-gold mb-4" />
            <span className="font-bold text-sm uppercase tracking-wider">Record</span>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleUpload}
            disabled={isUploading}
            className="aspect-square rounded-3xl bg-dark-elevated neo-shadow flex flex-col items-center justify-center border border-white/5 hover:border-deep-purple/50 transition-colors"
          >
            <ImageIcon className="w-10 h-10 text-deep-purple mb-4" />
            <span className="font-bold text-sm uppercase tracking-wider">Gallery</span>
          </motion.button>
        </div>

        {isUploading && (
          <div className="mt-8 text-center text-neo-gold animate-pulse">
            Syncing with the universe...
          </div>
        )}
      </div>
    </div>
  );
};
