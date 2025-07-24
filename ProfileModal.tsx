import React, { useState, useEffect } from 'react';

interface User {
    name: string;
    username: string;
}

interface ProfileModalProps {
    user: User;
    onClose: () => void;
    onSave: (updatedData: { name: string; username: string }) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose, onSave }) => {
    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        if (!name.trim() || !username.trim()) {
            setError('Nome e email não podem estar em branco.');
            return;
        }

        setError('');
        // In a real app, password change would be handled separately
        console.log('Profile updated. New password (if provided):', password);
        onSave({ name, username });
    };

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-gray-800 rounded-xl p-8 shadow-2xl w-full max-w-md m-4 relative animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
                    aria-label="Fechar modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-amber-400">Editar Perfil</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="profile-name" className="block text-sm font-medium text-gray-300">Nome Completo</label>
                        <input
                            type="text"
                            id="profile-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="profile-email" className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            id="profile-email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="profile-password" className="block text-sm font-medium text-gray-300">Nova Senha (opcional)</label>
                        <input
                            type="password"
                            id="profile-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                             placeholder="Deixe em branco para não alterar"
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                     <div>
                        <label htmlFor="profile-confirm-password" className="block text-sm font-medium text-gray-300">Confirmar Nova Senha</label>
                        <input
                            type="password"
                            id="profile-confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                             placeholder="Confirme a nova senha"
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 order-2 sm:order-1"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-amber-500 order-1 sm:order-2"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ProfileModal;