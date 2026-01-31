
import React from 'react';
import { Transaction, TransactionType } from '../types';
import { ICONS, CATEGORY_COLORS } from '../constants';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <div className="p-4 bg-slate-100 rounded-full mb-4">
          <ICONS.Wallet size={48} className="opacity-20" />
        </div>
        <p className="text-sm">No transactions yet.</p>
        <p className="text-xs">Your financial journey starts here!</p>
      </div>
    );
  }

  // Group by date
  const groups = transactions.reduce((acc, t) => {
    const date = new Date(t.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(t);
    return acc;
  }, {} as Record<string, Transaction[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groups).map(([date, items]) => (
        <div key={date} className="space-y-2">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">{date}</h3>
          <div className="space-y-1">
            {items.map((t) => (
              <div 
                key={t.id} 
                className="group relative flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-emerald-100 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: CATEGORY_COLORS[t.category] || '#94a3b8' }}
                  >
                    {t.category.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{t.category}</p>
                    <p className="text-xs text-slate-400 truncate max-w-[150px]">
                      {t.description || 'No description'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-bold ${
                    t.type === TransactionType.INCOME ? 'text-emerald-500' : 'text-slate-800'
                  }`}>
                    {t.type === TransactionType.INCOME ? '+' : '-'}
                    ${t.amount.toFixed(2)}
                  </span>
                  
                  <button 
                    onClick={() => onDelete(t.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-rose-300 hover:text-rose-500 transition-all"
                  >
                    {ICONS.Delete}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
