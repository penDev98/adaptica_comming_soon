import React, { useState, useRef } from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import ContactModal from './ContactModal';

const HeroCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpenModal = () => {
    if (buttonRef.current) {
      setTriggerRect(buttonRef.current.getBoundingClientRect());
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative w-full group">
        {/* Retro Shadow/Depth Effect - Light shadow for dark mode lift */}
        <div className="absolute top-2 left-2 w-full h-full bg-adaptica-base/5 rounded-[2rem] -z-10 translate-x-2 translate-y-2 blur-sm"></div>
        
        {/* Main Card Container */}
        <div className="relative w-full bg-adaptica-dark rounded-[2rem] overflow-hidden p-8 md:p-14 lg:p-20 shadow-2xl border border-adaptica-base/10">
          
          {/* VFX: Brand Color Bars */}
          <div className="absolute top-0 left-0 w-full h-2 flex opacity-80">
              <div className="flex-1 bg-adaptica-base"></div>
              <div className="flex-1 bg-adaptica-green"></div>
              <div className="flex-1 bg-adaptica-red"></div>
              <div className="flex-1 bg-adaptica-dark border-r border-l border-adaptica-base/20"></div>
              <div className="flex-1 bg-adaptica-red"></div>
              <div className="flex-1 bg-adaptica-green"></div>
              <div className="flex-1 bg-adaptica-base"></div>
          </div>

          {/* Background Texture for the Card */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
               style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23F5F5F7' fill-rule='evenodd'/%3E%3C/svg%3E")`
               }}>
          </div>

          {/* Glitch Line Decoration */}
          <div className="absolute top-1/4 right-0 w-32 h-[1px] bg-adaptica-red/50"></div>
          <div className="absolute top-1/4 right-0 w-1 h-8 bg-adaptica-red/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-adaptica-green rounded-full animate-pulse"></div>
                <span className="font-display text-adaptica-green text-xs tracking-widest uppercase">System Online</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl text-adaptica-base leading-[1.1] tracking-wide">
              It’s time to move from<br />
              <span className="text-adaptica-green">AI curious</span> to <span className="text-adaptica-red">AI-native.</span>
            </h1>

            <div className="space-y-6 text-[1.05rem] md:text-lg leading-relaxed text-adaptica-base/80 font-light font-sans tracking-wide">
              <p>
                At <strong className="text-adaptica-base font-medium">ADAPTICA</strong>, we believe the conversation around artificial
                intelligence has been dominated by hype, fear, and empty promises.
                Too many businesses have been left with pretty slides and failed
                prototypes, but no real progress.
              </p>

              <p>
                The challenges ahead are real: slowing productivity, tighter
                competition, and rising expectations.
                The margin for inefficiency is gone. Every
                company now faces a choice - <span className="text-adaptica-base underline decoration-adaptica-red underline-offset-4">speed up or fall behind.</span>
              </p>

              <p>
                AI is the path forward. It provides the infrastructure for a new level of
                business performance. Used well, AI does not replace people. It
                fundamentally redefines how they create value. 
              </p>
              
              <div className="pl-4 border-l-2 border-adaptica-red py-2 my-4 bg-adaptica-base/5">
                  <p className="italic text-adaptica-base">
                    We don’t just implement AI. We build AI operating systems for the next decade of growth.
                  </p>
              </div>

              <p>
                The future has arrived. And it belongs to those who are willing to step
                off the sidelines and into the action.
              </p>
            </div>

            {/* Button Section: Signature Red Glossy Button */}
            <div className="flex justify-end pt-8 items-center gap-4">
                <span className="font-display text-xs text-adaptica-base/40 uppercase tracking-widest hidden sm:block">
                    // Initialize Protocol
                </span>
                <button 
                  ref={buttonRef}
                  onClick={handleOpenModal}
                  className="relative bg-adaptica-red text-adaptica-base px-8 py-4 rounded-xl font-display text-lg tracking-widest uppercase shadow-glossy-red hover:shadow-glossy-red-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 border border-adaptica-base/10"
                >
                    Get in touch
                    <div className="bg-adaptica-dark/20 p-1 rounded">
                      <ArrowRight size={18} />
                    </div>
                </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} triggerRect={triggerRect} />}
    </>
  );
};

export default HeroCard;