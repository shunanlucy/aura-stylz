import React from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { Zap, Shield, Star } from 'lucide-react';
import '@google/model-viewer';

export const HomeTab: React.FC = () => {
  const { appUser, manifestNow } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen bg-[radial-gradient(circle_at_center,_var(--color-deep-purple)_0%,_var(--color-pure-black)_70%)] text-white p-6 relative overflow-hidden pb-24">
      {/* Header */}
      <header className="flex justify-between items-center z-10 pt-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wider">Aura Stylz</h1>
          <p className="text-sm text-gray-300">Welcome, {appUser?.name?.split(' ')[0] || 'Seeker'}</p>
        </div>
        <div className="bg-dark-elevated px-4 py-2 rounded-full neo-shadow border border-white/5 flex items-center space-x-2">
          <Zap className="w-4 h-4 text-neo-gold" />
          <span className="font-bold">{appUser?.positiveEnergyScore || 0}</span>
        </div>
      </header>

      {/* Centered 3D Asset */}
      <div className="flex-1 flex items-center justify-center relative z-10 w-full h-full min-h-[300px]">
        <model-viewer
          src="assets/bracelet.glb"
          alt="Aura Stylz Bracelet"
          camera-controls
          auto-rotate
          shadow-intensity="1"
          style={{ width: '100%', height: '100%', minHeight: '300px' }}
        ></model-viewer>

        {/* Side Action Buttons */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col space-y-4">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={manifestNow}
            className="w-12 h-12 bg-dark-elevated rounded-full neo-shadow flex items-center justify-center border border-white/10"
          >
            <Zap className="w-5 h-5 text-neo-gold" />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-dark-elevated rounded-full neo-shadow flex items-center justify-center border border-white/10"
          >
            <Shield className="w-5 h-5 text-deep-purple" />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-dark-elevated rounded-full neo-shadow flex items-center justify-center border border-white/10"
          >
            <Star className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="z-10 text-center mb-4">
        <h2 className="text-lg font-medium text-gray-300 uppercase tracking-widest mb-2">Current Dream</h2>
        <p className="text-2xl font-bold text-neo-gold text-glow-gold">
          {appUser?.dream || "Set your dream in Profile"}
        </p>
      </div>
    </div>
  );
};
