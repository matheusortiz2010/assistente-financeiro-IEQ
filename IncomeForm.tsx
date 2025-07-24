import React, { useState } from 'react';

interface IncomeFormProps {
    onAddTransaction: (description: string, amount: number) => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ onAddTransaction }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numericAmount = parseFloat(amount);
        if (!description.trim() || isNaN(numericAmount) || numericAmount <= 0) {
            setError('Por favor, insira uma descrição válida e um valor positivo.');
            return;
        }
        onAddTransaction(description, numericAmount);
        setDescription('');
        setAmount('');
        setError('');
    };

    return (
        <div className="bg-gray-800/50 rounded-xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-amber-400">Adicionar Ganho</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300">Descrição</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ex: Salário, Venda, etc."
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    />
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-300">Valor (R$)</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="1000.00"
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-amber-500"
                >
                    Adicionar
                </button>
            </form>
        </div>
    );
};

export default IncomeForm;
