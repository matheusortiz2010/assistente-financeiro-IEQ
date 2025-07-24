import React, { useState } from 'react';

interface User {
    name: string;
    username: string;
}

interface UserWithPassword extends User {
    password: string;
}

interface LoginProps {
    onAuthSuccess: (user: User) => void;
}

const getUsers = (): UserWithPassword[] => {
    const usersJson = localStorage.getItem('app-users');
    if (usersJson) {
        try {
            const users = JSON.parse(usersJson);
            if (Array.isArray(users)) {
                return users;
            }
        } catch (e) {
            console.error("Failed to parse users from localStorage", e);
        }
    }
    const defaultAdmin: UserWithPassword[] = [{ name: 'Admin IEQ', username: 'admin@ieq.com', password: 'password' }];
    localStorage.setItem('app-users', JSON.stringify(defaultAdmin));
    return defaultAdmin;
};

const saveUsers = (users: UserWithPassword[]) => {
    localStorage.setItem('app-users', JSON.stringify(users));
};


const Login: React.FC<LoginProps> = ({ onAuthSuccess }) => {
    // State for both login and registration
    const [isRegistering, setIsRegistering] = useState(false);

    // Login state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // Registration state
    const [name, setName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const users = getUsers();
        const foundUser = users.find(u => u.username === username && u.password === password);

        if (foundUser) {
            setError('');
            onAuthSuccess({ name: foundUser.name, username: foundUser.username });
        } else {
            setError('Email ou senha inválidos.');
        }
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !regEmail || !regPassword) {
            setError('Todos os campos são obrigatórios.');
            return;
        }
        
        const users = getUsers();
        const existingUser = users.find(u => u.username === regEmail);

        if (existingUser) {
            setError('Este email já está em uso.');
            return;
        }

        const newUser: UserWithPassword = { name, username: regEmail, password: regPassword };
        const updatedUsers = [...users, newUser];
        saveUsers(updatedUsers);
        
        setError('');
        onAuthSuccess({ name: newUser.name, username: newUser.username });
    };

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
        setError('');
        // Clear input fields when toggling
        setUsername('');
        setPassword('');
        setName('');
        setRegEmail('');
        setRegPassword('');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                     <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-amber-400 to-blue-500 tracking-tighter">
                        27ºIEQ
                    </h2>
                     <h1 className="mt-2 text-2xl font-bold text-gray-300">
                        Meta para o Novo Templo
                    </h1>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-8 shadow-2xl">
                    {isRegistering ? (
                        <>
                            <h2 className="text-2xl font-bold mb-6 text-center text-amber-400">Criar Conta</h2>
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome Completo</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Seu nome"
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="reg-email" className="block text-sm font-medium text-gray-300">Email</label>
                                    <input
                                        type="email"
                                        id="reg-email"
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        placeholder="seu@email.com"
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="reg-password" className="block text-sm font-medium text-gray-300">Senha</label>
                                    <input
                                        type="password"
                                        id="reg-password"
                                        value={regPassword}
                                        onChange={(e) => setRegPassword(e.target.value)}
                                        placeholder="Crie uma senha"
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                        required
                                    />
                                </div>
                                
                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-amber-500"
                                    >
                                        Registrar e Entrar
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-6 text-center text-amber-400">Acessar Painel</h2>
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="admin@ieq.com"
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">Senha</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="password"
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                        required
                                    />
                                </div>
                                
                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-amber-500"
                                    >
                                        Entrar
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    <div className="text-center mt-6">
                        <button onClick={toggleForm} className="text-sm text-amber-400 hover:text-amber-300 hover:underline transition-colors">
                            {isRegistering ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Registre-se'}
                        </button>
                    </div>

                </div>

                 <p className="text-center text-gray-600 text-xs mt-8">
                    {isRegistering ? 'Crie sua conta para começar.' : 'Acesse com as credenciais fornecidas.'}
                </p>

            </div>
        </div>
    );
};

export default Login;