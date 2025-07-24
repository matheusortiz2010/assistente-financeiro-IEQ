import React from 'react';
import { ViewMode } from '../types';

interface SummaryProps {
    total: number;
    viewMode: ViewMode;
}

const viewModeTextMap = {
    week: 'nesta semana',
    month: 'neste mês',
    year: 'neste ano',
};

const Summary: React.FC<SummaryProps> = ({ total, viewMode }) => {
    return (
        <div className="text-center">
            <p className="text-gray-400">Total ganho {viewModeTextMap[viewMode]}</p>
            <p className="text-4xl md:text-5xl font-bold text-white mt-1">
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
        </div>
    );
};

export default Summary;
