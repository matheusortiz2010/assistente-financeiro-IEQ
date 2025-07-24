import React from 'react';
import { Transaction } from '../types';

interface TransactionListProps {
    transactions: Transaction[];
    onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
    const sortedTransactions = [...transactions].sort((a, b) => b.date.getTime() - a.date.getTime());

    return (
        <div className="bg-gray-800/50 rounded-xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-amber-400">Histórico de Ganhos</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {sortedTransactions.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">Nenhum ganho registrado ainda.</p>
                ) : (
                    sortedTransactions.map(t => (
                        <div key={t.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            <div>
                                <p className="font-semibold text-gray-100">{t.description}</p>
                                <p className="text-sm text-gray-400">{t.date.toLocaleDateString('pt-BR')}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                               <p className="font-bold text-amber-400">
                                  {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                               </p>
                                <button onClick={() => onDeleteTransaction(t.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TransactionList;
