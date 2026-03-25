import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { Sparkles, Zap, Target } from 'lucide-react';

const ONBOARDING_STEPS = [
  {
    title: "Energy",
    description: "Align your vibrations with the frequency of wealth and abundance.",
    icon: <Zap className="w-12 h-12 text-neo-gold" />
  },
  {
    title: "Focus",
    description: "Channel your intentions clearly. The bracelet acts as your physical anchor.",
    icon: <Target className="w-12 h-12 text-deep-purple" />
  },
  {
    title: "Abundance",
    description: "Attract prosperity effortlessly. Your journey to financial freedom starts here.",
    icon: <Sparkles className="w-12 h-12 text-neo-gold" />
  }
];

export const Onboarding: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleNext = () => {
    if (step < ONBOARDING_STEPS.length - 1) {
      setStep(step + 1);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-pure-black p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-deep-purple/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-neo-gold/10 rounded-full blur-[100px]" />

      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-32 h-32 rounded-full bg-dark-surface neo-shadow flex items-center justify-center mb-10">
              {ONBOARDING_STEPS[step].icon}
            </div>
            
            <h2 className="text-3xl font-bold mb-4 tracking-wide text-white">
              {ONBOARDING_STEPS[step].title}
            </h2>
            
            <p className="text-gray-400 text-lg max-w-xs leading-relaxed">
              {ONBOARDING_STEPS[step].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="z-10 pb-8 flex flex-col items-center w-full">
        {/* Pagination Dots */}
        <div className="flex space-x-3 mb-10">
          {ONBOARDING_STEPS.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-neo-gold' : 'w-2 bg-gray-700'}`}
            />
          ))}
        </div>

        {step < ONBOARDING_STEPS.length - 1 ? (
          <button 
            onClick={handleNext}
            className="w-full max-w-sm py-4 rounded-2xl bg-dark-elevated neo-shadow text-white font-semibold tracking-wider uppercase transition-transform active:scale-95"
          >
            Continue
          </button>
        ) : (
          <button 
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full max-w-sm py-4 rounded-2xl bg-neo-gold text-pure-black font-bold tracking-wider uppercase transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,215,0,0.3)] disabled:opacity-70"
          >
            {isLoggingIn ? 'Connecting...' : 'Enter the Aura'}
          </button>
        )}
      </div>
    </div>
  );
};
