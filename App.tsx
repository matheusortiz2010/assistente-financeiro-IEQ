import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Transaction, Goal } from './types';
import IncomeForm from './components/IncomeForm';
import TransactionList from './components/TransactionList';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import GoalTracker from './components/GoalTracker';

// Some initial data to populate the app on first load
const initialTransactions: Transaction[] = [
    { id: '1', description: 'Salário', amount: 5000, date: new Date() },
    { id: '2', description: 'Freelance', amount: 750, date: new Date(new Date().setDate(new Date().getDate() - 3)) },
    { id: '3', description: 'Venda online', amount: 120, date: new Date(new Date().setDate(new Date().getDate() - 10)) },
    { id: '4', description: 'Consultoria', amount: 1200, date: new Date(new Date().setMonth(new Date().getMonth() - 1)) },
];

const App: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const [goal, setGoal] = useState<Goal | null>(() => {
        const savedGoal = localStorage.getItem('financialGoal');
        if (savedGoal) {
            try {
                const parsedGoal = JSON.parse(savedGoal);
                // Basic validation
                if (parsedGoal.amount && parsedGoal.deadline) {
                    return parsedGoal;
                }
            } catch (e) {
                return null;
            }
        }
        return null;
    });

    useEffect(() => {
        if (goal) {
            localStorage.setItem('financialGoal', JSON.stringify(goal));
        } else {
            localStorage.removeItem('financialGoal');
        }
    }, [goal]);

    const handleAddTransaction = useCallback((description: string, amount: number) => {
        const newTransaction: Transaction = {
            id: crypto.randomUUID(),
            description,
            amount,
            date: new Date(),
        };
        setTransactions(prev => [...prev, newTransaction]);
    }, []);

    const handleDeleteTransaction = useCallback((id: string) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    }, []);

    const totalIncome = useMemo(() => {
        return transactions.reduce((sum, t) => sum + t.amount, 0);
    }, [transactions]);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
            <main className="container mx-auto p-4 md:p-8">
                <Header />
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-1 space-y-8">
                        <IncomeForm onAddTransaction={handleAddTransaction} />
                        <GoalTracker goal={goal} onSetGoal={setGoal} totalIncome={totalIncome} />
                        <TransactionList transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 mt-8 lg:mt-0">
                       <Dashboard transactions={transactions} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
