import React, { useState } from 'react';
import { User, Settings, LogOut, Edit3, Save } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';

export const ProfileTab: React.FC = () => {
  const { appUser, updateProfile } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [dream, setDream] = useState(appUser?.dream || '');

  const handleSave = async () => {
    await updateProfile({ dream });
    setIsEditing(false);
  };

  const handleLogout = () => {
    console.log("Logout disabled in mock mode");
  };

  return (
    <div className="flex flex-col min-h-screen bg-pure-black text-white p-6 pb-24">
      <header className="pt-4 mb-8 text-center flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wider uppercase flex items-center">
          <User className="w-6 h-6 text-neo-gold mr-2" />
          Profile
        </h1>
        <button onClick={handleLogout} className="p-2 rounded-full bg-dark-elevated neo-shadow">
          <LogOut className="w-5 h-5 text-gray-400" />
        </button>
      </header>

      {/* Profile Header */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neo-gold to-deep-purple p-1 mb-4 neo-shadow-gold">
          <div className="w-full h-full bg-pure-black rounded-full flex items-center justify-center overflow-hidden">
            <User className="w-10 h-10 text-gray-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white">{appUser?.name || 'Seeker'}</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">UID: {appUser?.uid}</p>
      </div>

      {/* Dream Setting */}
      <div className="bg-dark-surface rounded-3xl p-6 mb-6 neo-shadow border border-white/5 relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm uppercase tracking-widest text-gray-400">Your Current Dream</h3>
          <button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
            {isEditing ? <Save className="w-5 h-5 text-neo-gold" /> : <Edit3 className="w-5 h-5 text-gray-500" />}
          </button>
        </div>
        
        {isEditing ? (
          <input 
            type="text"
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            className="w-full bg-dark-elevated border border-neo-gold/50 rounded-xl p-4 text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-neo-gold/50"
            autoFocus
          />
        ) : (
          <p className="text-2xl font-bold text-neo-gold text-glow-gold">
            {appUser?.dream || 'Not Set'}
          </p>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-dark-elevated p-4 rounded-2xl text-center border border-white/5">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Energy Score</p>
          <p className="font-bold text-white text-2xl">{appUser?.positiveEnergyScore || 0}</p>
        </div>
        <div className="bg-dark-elevated p-4 rounded-2xl text-center border border-white/5">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Day Streak</p>
          <p className="font-bold text-white text-2xl">{appUser?.manifestationStreak || 0}</p>
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-4">
        <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-2">Settings</h3>
        {['Notifications', 'Privacy Policy', 'Terms of Service', 'Help & Support'].map((item, i) => (
          <motion.button 
            key={i}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-dark-surface rounded-2xl p-4 neo-shadow border border-white/5 flex items-center justify-between"
          >
            <span className="font-medium text-gray-300">{item}</span>
            <Settings className="w-4 h-4 text-gray-500" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};
