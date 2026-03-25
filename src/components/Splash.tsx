import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashProps {
  onComplete: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3 seconds splash
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pure-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-32 h-32 rounded-full neo-shadow-gold flex items-center justify-center mb-6">
          <span className="text-4xl font-bold text-neo-gold text-glow-gold">A</span>
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-3xl font-bold tracking-[0.2em] text-white uppercase"
        >
          Aura Stylz
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-deep-purple text-sm tracking-widest mt-2 uppercase font-medium"
        >
          Money Magnet
        </motion.p>
      </motion.div>
    </div>
  );
};
