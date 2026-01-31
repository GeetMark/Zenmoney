
import React, { useState, useEffect } from 'react';
import { Transaction, AIInsight } from '../types';
import { getFinancialInsights } from '../services/appsgmService';
import { ICONS } from '../constants';

interface InsightsProps {
  transactions: Transaction[];
}

const Insights: React.FC<InsightsProps> = ({ transactions }) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        const data = await getFinancialInsights(transactions);
        setInsights(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center text-emerald-600 animate-pulse">
            {ICONS.Brain}
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-bold text-slate-800">Thinking deeply...</p>
          <p className="text-xs text-slate-400">Analyzing your spending habits</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl text-white shadow-xl shadow-emerald-100">
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
          {ICONS.Brain}
        </div>
        <div>
          <h2 className="text-lg font-bold">Zen Appsgm Insights</h2>
          <p className="text-xs text-emerald-100 opacity-80">Smart tips based on your wallet activity</p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <div 
            key={idx} 
            className={`p-6 rounded-3xl border transition-all ${
              insight.severity === 'warning' 
                ? 'bg-rose-50 border-rose-100' 
                : insight.severity === 'positive'
                ? 'bg-emerald-50 border-emerald-100'
                : 'bg-white border-slate-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                insight.severity === 'warning' 
                  ? 'bg-rose-200 text-rose-700' 
                  : insight.severity === 'positive'
                  ? 'bg-emerald-200 text-emerald-700'
                  : 'bg-slate-200 text-slate-700'
              }`}>
                {insight.severity}
              </span>
              <h3 className="text-sm font-bold text-slate-800">{insight.title}</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{insight.content}</p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-100 rounded-2xl text-center">
        <p className="text-[10px] text-slate-400 font-medium">
          Insights update whenever you add new transactions. <br/>
          Built with Appsgm AI.
        </p>
      </div>
    </div>
  );
};

export default Insights;
