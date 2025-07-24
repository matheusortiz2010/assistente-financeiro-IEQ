import React, { useState, useMemo } from 'react';
import { Transaction, ViewMode } from '../types';
import ViewSwitcher from './ViewSwitcher';
import Summary from './Summary';
import IncomeChart from './IncomeChart';

interface DashboardProps {
    transactions: Transaction[];
}

const Dashboard: React.FC<DashboardProps> = ({ transactions }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('month');

    const { filteredTransactions, totalIncome } = useMemo(() => {
        const now = new Date();
        let startDate: Date;

        switch (viewMode) {
            case 'year':
                startDate = new Date(now.getFullYear(), 0, 1);
                break;
            case 'week':
                const firstDayOfWeek = now.getDate() - now.getDay();
                startDate = new Date(now.setDate(firstDayOfWeek));
                startDate.setHours(0,0,0,0);
                break;
            case 'month':
            default:
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
        }

        const filtered = transactions.filter(t => t.date >= startDate);
        const total = filtered.reduce((sum, t) => sum + t.amount, 0);

        return { filteredTransactions: filtered, totalIncome: total };
    }, [transactions, viewMode]);

    return (
        <div className="bg-gray-800/50 rounded-xl p-4 md:p-6 shadow-2xl space-y-6">
            <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
            <Summary total={totalIncome} viewMode={viewMode} />
            <div className="h-80 md:h-96">
                 <IncomeChart data={filteredTransactions} viewMode={viewMode} />
            </div>
        </div>
    );
};

export default Dashboard;
