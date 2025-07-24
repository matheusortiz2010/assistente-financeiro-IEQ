import React from 'react';

interface User {
    name: string;
    username: string;
}

interface HeaderProps {
    currentUser: User;
    onLogout: () => void;
    onOpenProfile: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout, onOpenProfile }) => {
    return (
        <header className="grid grid-cols-2 md:grid-cols-3 items-center gap-4">
            {/* Identity Group */}
            <div className="flex items-center justify-start">
                <h2 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-amber-400 to-blue-500 tracking-tighter">
                    27ºIEQ
                </h2>
            </div>

            {/* Title Group */}
            <div className="text-center col-span-2 md:col-span-1 md:col-start-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-blue-500">
                    Meta para o Novo Templo
                </h1>
                <p className="mt-2 text-base md:text-lg text-gray-400">
                    Seu painel de controle para uma vida financeira mais saudável.
                </p>
            </div>
            
            {/* User Actions */}
            <div className="col-start-2 md:col-start-3 flex justify-end items-center gap-2">
                <div className="text-right hidden sm:block">
                     <span className="text-gray-300 text-sm">Olá, {currentUser.name.split(' ')[0]}</span>
                </div>
                 <button 
                    onClick={onOpenProfile} 
                    title="Meu Perfil"
                    className="bg-gray-700/80 hover:bg-gray-700 text-gray-300 hover:text-white p-2 rounded-full transition-colors duration-300"
                    aria-label="Meu Perfil"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </button>
                 <button 
                    onClick={onLogout} 
                    title="Sair"
                    className="bg-gray-700/80 hover:bg-red-600 text-gray-300 hover:text-white p-2 rounded-full transition-colors duration-300"
                    aria-label="Sair"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;