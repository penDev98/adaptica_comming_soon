import React from 'react';
import Header from './components/Header';
import ClientLogos from './components/ClientLogos';
import HeroCard from './components/HeroCard';
import InteractiveBackground from './components/InteractiveBackground';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-transparent text-adaptica-base flex flex-col items-center overflow-x-hidden">
      <InteractiveBackground />

      {/* Main Content with z-index to sit above background */}
      <div className="relative z-10 w-full max-w-5xl px-6 py-4 flex flex-col items-center gap-6">
        <Header />
        <HeroCard />
        <ClientLogos />
      </div>

      {/* Footer Element for extra vibe */}
      <div className="fixed bottom-4 right-6 hidden lg:flex gap-2 opacity-50 z-10">
        <div className="w-2 h-8 bg-adaptica-red"></div>
        <div className="w-2 h-8 bg-adaptica-base"></div>
        <div className="w-2 h-8 bg-adaptica-green"></div>
      </div>
    </div>
  );
};

export default App;