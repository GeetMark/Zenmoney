
import React, { useState, useEffect, useCallback } from 'react';
import { FinancialState, Transaction } from './types';
import { storageService } from './services/storageService';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import Insights from './components/Insights';
import AddTransactionModal from './components/AddTransactionModal';
import { ICONS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [state, setState] = useState<FinancialState>({ transactions: [], budgets: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize data once
  useEffect(() => {
    const data = storageService.loadState();
    setState(data);
  }, []);

  const handleAddTransaction = useCallback((transaction: Transaction) => {
    storageService.addTransaction(transaction);
    setState(storageService.loadState());
  }, []);

  const handleDeleteTransaction = useCallback((id: string) => {
    storageService.deleteTransaction(id);
    setState(storageService.loadState());
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard state={state} />;
      case 'transactions':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">History</h2>
              <div className="text-xs text-slate-400 font-medium">
                {state.transactions.length} items
              </div>
            </div>
            <TransactionList 
              transactions={state.transactions} 
              onDelete={handleDeleteTransaction} 
            />
          </div>
        );
      case 'insights':
        return <Insights transactions={state.transactions} />;
      default:
        return <Dashboard state={state} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {renderContent()}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-xl shadow-emerald-200 flex items-center justify-center transition-all active:scale-90 z-40"
        title="Add Transaction"
      >
        <div className="bg-white/20 p-2 rounded-xl">
          {ICONS.Plus}
        </div>
      </button>

      {isModalOpen && (
        <AddTransactionModal 
          onClose={() => setIsModalOpen(false)} 
          onAdd={handleAddTransaction} 
        />
      )}
    </Layout>
  );
};

export default App;
