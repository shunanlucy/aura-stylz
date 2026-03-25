import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { motion } from 'motion/react';

// Mock leaderboard data
const MOCK_LEADERBOARD = [
  { id: '1', name: 'Alex M.', dream: 'Tesla Model 3', magicLogs: 142, rank: 1 },
  { id: '2', name: 'Sarah J.', dream: 'Bali Vacation', magicLogs: 128, rank: 2 },
  { id: '3', name: 'David K.', dream: 'Debt Free', magicLogs: 115, rank: 3 },
  { id: '4', name: 'Emma R.', dream: 'New Home', magicLogs: 98, rank: 4 },
  { id: '5', name: 'Michael T.', dream: 'Rolex Watch', magicLogs: 87, rank: 5 },
  { id: '6', name: 'Jessica L.', dream: 'Startup Funding', magicLogs: 76, rank: 6 },
  { id: '7', name: 'Chris B.', dream: 'World Tour', magicLogs: 65, rank: 7 },
];

export const LeaderboardTab: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-pure-black text-white p-6 pb-24">
      <header className="pt-4 mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-wider uppercase flex items-center justify-center">
          <Trophy className="w-6 h-6 text-neo-gold mr-2" />
          Leaderboard
        </h1>
        <p className="text-sm text-gray-400 mt-2">Top Manifestors this week</p>
      </header>

      <div className="flex-1 overflow-y-auto space-y-4">
        {MOCK_LEADERBOARD.map((user, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={user.id}
            className="bg-dark-surface rounded-2xl p-4 neo-shadow flex items-center border border-white/5"
          >
            {/* Rank Badge */}
            <div className="w-10 flex justify-center mr-3">
              {user.rank === 1 ? <Trophy className="w-6 h-6 text-neo-gold" /> :
               user.rank === 2 ? <Medal className="w-6 h-6 text-gray-300" /> :
               user.rank === 3 ? <Award className="w-6 h-6 text-amber-600" /> :
               <span className="text-lg font-bold text-gray-500">#{user.rank}</span>}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h3 className="font-bold text-white">{user.name}</h3>
              <p className="text-xs text-neo-gold">{user.dream}</p>
            </div>

            {/* Magic Logs Count */}
            <div className="text-right">
              <div className="text-xl font-bold text-deep-purple text-glow-purple">{user.magicLogs}</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">Logs</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
