
import React from 'react';
import { 
  Home, 
  Wallet, 
  PieChart, 
  Sparkles, 
  PlusCircle, 
  TrendingDown, 
  TrendingUp,
  X,
  Plus,
  ChevronRight,
  Trash2,
  BrainCircuit
} from 'lucide-react';

export const CATEGORY_COLORS: Record<string, string> = {
  Food: '#f87171',
  Transport: '#fb923c',
  Housing: '#fbbf24',
  Entertainment: '#4ade80',
  Shopping: '#22d3ee',
  Utilities: '#818cf8',
  Salary: '#c084fc',
  Investment: '#f472b6',
  Other: '#94a3b8'
};

export const ICONS = {
  Dashboard: <Home size={20} />,
  Transactions: <Wallet size={20} />,
  Stats: <PieChart size={20} />,
  AI: <Sparkles size={20} />,
  Add: <PlusCircle size={20} />,
  Expense: <TrendingDown size={18} />,
  Income: <TrendingUp size={18} />,
  Close: <X size={20} />,
  Plus: <Plus size={20} />,
  Chevron: <ChevronRight size={20} />,
  Delete: <Trash2 size={18} />,
  Brain: <BrainCircuit size={24} />,
  // Add Wallet component directly to allow custom sizing where needed
  Wallet: Wallet
};
