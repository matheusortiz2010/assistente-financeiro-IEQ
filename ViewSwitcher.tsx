import React from 'react';
import { ViewMode } from '../types';

interface ViewSwitcherProps {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
}

const viewOptions: { id: ViewMode; label: string }[] = [
    { id: 'week', label: 'Semana' },
    { id: 'month', label: 'Mês' },
    { id: 'year', label: 'Ano' },
];

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ viewMode, setViewMode }) => {
    return (
        <div className="flex justify-center bg-gray-700/50 p-1 rounded-lg">
            {viewOptions.map(option => (
                <button
                    key={option.id}
                    onClick={() => setViewMode(option.id)}
                    className={`w-full py-2 px-4 rounded-md text-sm font-semibold transition-all duration-300 focus:outline-none ${
                        viewMode === option.id
                            ? 'bg-amber-500 text-white shadow'
                            : 'bg-transparent text-gray-300 hover:bg-gray-600/50'
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default ViewSwitcher;
