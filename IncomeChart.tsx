import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Transaction, ViewMode } from '../types';

interface IncomeChartProps {
    data: Transaction[];
    viewMode: ViewMode;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800 p-2 border border-gray-700 rounded-md shadow-lg">
                <p className="label text-gray-300">{`${label}`}</p>
                <p className="intro text-amber-400 font-bold">{`Ganho: ${payload[0].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</p>
            </div>
        );
    }
    return null;
};

const IncomeChart: React.FC<IncomeChartProps> = ({ data, viewMode }) => {
    const chartData = useMemo(() => {
        if (viewMode === 'year') {
            const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
            const monthlyData = months.map(month => ({ name: month, Ganho: 0 }));
            data.forEach(t => {
                const monthIndex = t.date.getMonth();
                monthlyData[monthIndex].Ganho += t.amount;
            });
            return monthlyData;
        }

        if (viewMode === 'week') {
            const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
            const dailyData = days.map(day => ({ name: day, Ganho: 0 }));
            data.forEach(t => {
                const dayIndex = t.date.getDay();
                dailyData[dayIndex].Ganho += t.amount;
            });
            return dailyData;
        }
        
        // Month view
        const now = new Date();
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
            name: `${i + 1}`,
            Ganho: 0,
        }));
        data.forEach(t => {
            // Only consider transactions from the current month
            if (t.date.getMonth() === now.getMonth() && t.date.getFullYear() === now.getFullYear()) {
                 const dayIndex = t.date.getDate() - 1;
                 if(dailyData[dayIndex]) {
                    dailyData[dayIndex].Ganho += t.amount;
                 }
            }
        });
        return dailyData;

    }, [data, viewMode]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value/1000}k`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(245, 158, 11, 0.1)' }} />
                <Bar dataKey="Ganho" radius={[4, 4, 0, 0]}>
                    {
                        chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.Ganho > 0 ? '#f59e0b' : '#4b5563'} />
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default IncomeChart;
