import React from 'react';
import { ShoppingCart, Package, Wallet, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Aura Stylz Obsidian', price: 149, image: 'bg-zinc-800' },
  { id: '2', name: 'Aura Stylz Rose Gold', price: 179, image: 'bg-rose-900' },
  { id: '3', name: 'Aura Stylz Amethyst', price: 159, image: 'bg-purple-900' },
];

export const CartTab: React.FC = () => {
  const { appUser } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen bg-pure-black text-white p-6 pb-24">
      <header className="pt-4 mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-wider uppercase flex items-center justify-center">
          <ShoppingCart className="w-6 h-6 text-neo-gold mr-2" />
          Store
        </h1>
      </header>

      {/* Referral Balance Wallet */}
      <div className="bg-gradient-to-r from-deep-purple to-purple-900 rounded-3xl p-6 mb-8 neo-shadow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <p className="text-sm text-white/70 uppercase tracking-widest mb-1">Referral Balance</p>
            <div className="text-4xl font-bold text-white flex items-center">
              <span className="text-neo-gold mr-1">$</span>
              {appUser?.referralBalance || 0}
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Wallet className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Order Tracking Placeholder */}
      <div className="bg-dark-surface rounded-2xl p-4 mb-8 neo-shadow border border-white/5 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-dark-elevated flex items-center justify-center mr-4">
            <Package className="w-5 h-5 text-neo-gold" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Order #AS-8942</h3>
            <p className="text-xs text-gray-400">In Transit - Arriving Tomorrow</p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-500" />
      </div>

      {/* Product Listing */}
      <div>
        <h2 className="text-lg font-bold uppercase tracking-widest mb-4">Exclusive Collection</h2>
        <div className="grid grid-cols-1 gap-4">
          {MOCK_PRODUCTS.map((product) => (
            <motion.div 
              key={product.id}
              whileTap={{ scale: 0.98 }}
              className="bg-dark-surface rounded-2xl p-4 neo-shadow border border-white/5 flex items-center"
            >
              <div className={`w-20 h-20 rounded-xl ${product.image} mr-4 flex items-center justify-center`}>
                <span className="text-[10px] text-white/50 uppercase">Image</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">{product.name}</h3>
                <p className="text-neo-gold font-bold">${product.price}</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-dark-elevated flex items-center justify-center neo-shadow">
                <ShoppingCart className="w-4 h-4 text-white" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
