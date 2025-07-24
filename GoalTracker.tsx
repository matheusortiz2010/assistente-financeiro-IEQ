import React, { useState, useMemo } from 'react';
import { Goal } from '../types';

interface GoalTrackerProps {
    goal: Goal | null;
    onSetGoal: (goal: Goal | null) => void;
    totalIncome: number;
}

const GoalForm: React.FC<{
    onSave: (goal: Goal) => void;
    onCancel: () => void;
    onRemove: () => void;
    initialGoal: Goal | null;
}> = ({ onSave, onCancel, onRemove, initialGoal }) => {
    const [amount, setAmount] = useState(initialGoal?.amount.toString() || '');
    const [deadline, setDeadline] = useState(initialGoal?.deadline || '');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0 || !deadline) {
            setError('Por favor, insira um valor de meta positivo e uma data limite.');
            return;
        }
        onSave({ amount: numericAmount, deadline });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="goal-amount" className="block text-sm font-medium text-gray-300">Valor da Meta (R$)</label>
                <input
                    type="number"
                    id="goal-amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="5000.00"
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
            </div>
            <div>
                <label htmlFor="goal-deadline" className="block text-sm font-medium text-gray-300">Prazo Final</label>
                <input
                    type="date"
                    id="goal-deadline"
                    value={deadline}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex flex-wrap gap-2 pt-2">
                 <button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                    Salvar Meta
                </button>
                {initialGoal && (
                     <button type="button" onClick={onCancel} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                        Cancelar
                    </button>
                )}
            </div>
             {initialGoal && (
                <button type="button" onClick={onRemove} className="w-full text-center text-sm text-red-500 hover:text-red-400 pt-2 transition-colors">
                    Remover Meta
                </button>
            )}
        </form>
    );
};

const GoalProgress: React.FC<{ goal: Goal; totalIncome: number; onEdit: () => void }> = ({ goal, totalIncome, onEdit }) => {
    const { progress, formattedAmount, formattedTotal, formattedRemaining, formattedDeadline, isExpired } = useMemo(() => {
        const remaining = Math.max(0, goal.amount - totalIncome);
        const progress = goal.amount > 0 ? Math.min((totalIncome / goal.amount) * 100, 100) : 0;
        const formattedAmount = goal.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const formattedTotal = totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const formattedRemaining = remaining.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const deadlineDate = new Date(goal.deadline);
        const formattedDeadline = deadlineDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        const isExpired = new Date() > deadlineDate;

        return { progress, formattedAmount, formattedTotal, formattedRemaining, formattedDeadline, isExpired };
    }, [goal, totalIncome]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-baseline">
                <p className="text-gray-300">Meta: <span className="font-bold text-gray-100">{formattedAmount}</span></p>
                <button onClick={onEdit} className="text-sm text-amber-400 hover:text-amber-300">Editar</button>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                    className="bg-amber-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                ></div>
            </div>

            <div className="flex justify-between items-center text-sm">
                <p className="text-amber-400 font-semibold">{formattedTotal} <span className="text-gray-300">({progress.toFixed(1)}%)</span></p>
                <p className="text-yellow-400 font-semibold">Faltam {formattedRemaining}</p>
            </div>
            <div className="text-center text-sm">
                 <p className={`text-gray-400 ${isExpired && progress < 100 ? 'text-red-500 font-bold' : ''}`}>
                    {isExpired && progress < 100 ? `Prazo Expirado: ${formattedDeadline}` : `Prazo: ${formattedDeadline}`}
                </p>
            </div>
        </div>
    );
};


const GoalTracker: React.FC<GoalTrackerProps> = ({ goal, onSetGoal, totalIncome }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (newGoal: Goal) => {
        onSetGoal(newGoal);
        setIsEditing(false);
    };
    
    const handleRemove = () => {
        onSetGoal(null);
        setIsEditing(false);
    }

    return (
        <div className="bg-gray-800/50 rounded-xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-amber-400">Minha Meta</h2>
            {!goal && !isEditing ? (
                <div className="text-center">
                    <p className="text-gray-400 mb-4">Ainda não há nenhuma meta definida.</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                    >
                        Criar Meta
                    </button>
                </div>
            ) : isEditing ? (
                <GoalForm
                    initialGoal={goal}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                    onRemove={handleRemove}
                />
            ) : goal ? (
                <GoalProgress goal={goal} totalIncome={totalIncome} onEdit={() => setIsEditing(true)} />
            ) : null}
        </div>
    );
};

export default GoalTracker;
