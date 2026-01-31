
import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { FinancialState, TransactionType } from '../types';
import { ICONS, CATEGORY_COLORS } from '../constants';

interface DashboardProps {
  state: FinancialState;
}

const Dashboard: React.FC<DashboardProps> = ({ state }) => {
  const { transactions } = state;

  const summary = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      balance: income - expense,
      income,
      expense
    };
  }, [transactions]);

  const categoryData = useMemo(() => {
    const totals: Record<string, number> = {};
    transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .forEach(t => {
        totals[t.category] = (totals[t.category] || 0) + t.amount;
      });
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const recentActivity = useMemo(() => {
    // Last 7 days aggregation
    const days: Record<string, number> = {};
    const today = new Date();
    for(let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      days[d.toISOString().split('T')[0]] = 0;
    }

    transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .forEach(t => {
        if (days[t.date] !== undefined) {
          days[t.date] += t.amount;
        }
      });

    return Object.entries(days).map(([date, amount]) => ({
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      amount
    }));
  }, [transactions]);

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-1">Total Balance</p>
        <h2 className="text-4xl font-bold mb-6">${summary.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
        
        <div className="flex gap-4">
          <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                {ICONS.Income}
              </div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Income</span>
            </div>
            <p className="font-bold text-emerald-400">${summary.income.toFixed(2)}</p>
          </div>
          <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                {ICONS.Expense}
              </div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Expense</span>
            </div>
            <p className="font-bold text-rose-400">${summary.expense.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Spending Trend */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
          Weekly Spending
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={recentActivity}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8' }} 
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]} fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-4">Categories</h3>
        {categoryData.length > 0 ? (
          <div className="flex items-center">
            <div className="w-1/2 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || '#94a3b8'} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-2">
              {categoryData.slice(0, 4).map((entry) => (
                <div key={entry.name} className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[entry.name] }}></div>
                    <span className="text-slate-500 font-medium">{entry.name}</span>
                  </div>
                  <span className="font-bold text-slate-800">${entry.value.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-slate-300 text-xs italic">No expense data to analyze</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
