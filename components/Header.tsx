import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center gap-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center gap-4 w-full">
          {/* Adaptica Logo Image */}
          <div className="relative w-[600px] h-48 rounded-xl flex items-center justify-center group overflow-hidden">
            <img
              src="/assets/logo.png"
              alt="Adaptica Logo"
              className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;