import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';

export interface AppUser {
  uid: string;
  email: string;
  name?: string;
  positiveEnergyScore: number;
  manifestationStreak: number;
  lastManifestationDate?: string;
  dream?: string;
  magicLogCount: number;
  referralBalance: number;
}

interface AppContextType {
  user: FirebaseUser | null;
  appUser: AppUser | null;
  loading: boolean;
  manifestNow: () => Promise<void>;
  updateProfile: (data: Partial<AppUser>) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const MOCK_USER: AppUser = {
  uid: 'mock-user-123',
  email: 'seeker@aurastylz.com',
  name: 'Seeker',
  positiveEnergyScore: 50,
  manifestationStreak: 3,
  dream: 'Financial Freedom',
  magicLogCount: 12,
  referralBalance: 150,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Bypass Firebase Auth for now and use mock data
    setTimeout(() => {
      setUser({ uid: MOCK_USER.uid, email: MOCK_USER.email, displayName: MOCK_USER.name } as FirebaseUser);
      setAppUser(MOCK_USER);
      setLoading(false);
    }, 500); // Small delay to show splash screen
  }, []);

  const updateProfile = async (data: Partial<AppUser>) => {
    if (!appUser) return;
    // Update local state instead of Firestore
    setAppUser({ ...appUser, ...data });
  };

  const manifestNow = async () => {
    if (!appUser) return;
    
    const today = new Date().toISOString().split('T')[0];
    const lastDate = appUser.lastManifestationDate?.split('T')[0];
    
    if (today === lastDate) {
      return;
    }
    
    const newScore = Math.min(100, appUser.positiveEnergyScore + 5);
    const newStreak = appUser.manifestationStreak + 1;
    
    // Update local state instead of Firestore
    setAppUser({
      ...appUser,
      positiveEnergyScore: newScore,
      manifestationStreak: newStreak,
      lastManifestationDate: new Date().toISOString()
    });
  };

  return (
    <AppContext.Provider value={{ user, appUser, loading, manifestNow, updateProfile }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
