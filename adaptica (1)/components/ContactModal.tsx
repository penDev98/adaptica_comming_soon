import React, { useState, useMemo } from 'react';
import { X, Send, ShieldCheck, Activity } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
  triggerRect: DOMRect | null;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose, triggerRect }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* 
    Encode form data for Netlify
  */
  const encode = (data: any) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formState })
    })
      .then(() => setIsSubmitted(true))
      .catch(error => alert(error));
  };

  const animationStyles = useMemo(() => {
    if (!triggerRect) return {};
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    const triggerX = triggerRect.left + triggerRect.width / 2;
    const triggerY = triggerRect.top + triggerRect.height / 2;
    const deltaX = triggerX - screenCenterX;
    const deltaY = triggerY - screenCenterY;

    return {
      '--start-x': `${deltaX}px`,
      '--start-y': `${deltaY}px`
    } as React.CSSProperties;
  }, [triggerRect]);

  const beamPath = useMemo(() => {
    if (!triggerRect) return '';
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    const tx = triggerRect.left + triggerRect.width / 2;
    const ty = triggerRect.top + triggerRect.height / 2;
    const mx1 = screenCenterX - 200; 
    const mx2 = screenCenterX + 200; 
    const my = screenCenterY + 200; 
    return `M ${tx} ${ty} L ${mx1} ${my} L ${mx2} ${my} Z`;
  }, [triggerRect]);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {triggerRect && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible animate-hologram-fade">
            <defs>
                <linearGradient id="beamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#A63A42" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#A63A42" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={beamPath} fill="url(#beamGrad)" className="animate-pulse opacity-50" />
            <path d={beamPath} stroke="#A63A42" strokeWidth="1" fill="none" strokeOpacity="0.5" strokeDasharray="4 4" />
        </svg>
      )}

      <div 
        className="absolute inset-0 bg-[#000000]/60 backdrop-blur-xl transition-opacity duration-300 z-10"
        onClick={onClose}
      ></div>

      <div 
        style={animationStyles}
        className="relative z-20 w-full max-w-[480px] bg-[#1C1C1C] rounded-[40px] overflow-hidden animate-hologram-enter font-sans group border border-transparent shadow-[0_0_50px_rgba(166,58,66,0.3)] transition-all duration-500"
      >
        <div className="absolute inset-0 pointer-events-none animate-hologram-fade z-50">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(166,58,66,0.1)_1px,transparent_1px)] bg-[size:100%_4px]"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-adaptica-red/20 to-transparent"></div>
        </div>

        <div className={`absolute -top-20 -right-20 w-64 h-64 bg-adaptica-red/20 rounded-full blur-[80px] pointer-events-none opacity-60 transition-colors duration-700 ${isSubmitted ? 'bg-adaptica-green/20' : 'bg-adaptica-red/20'}`}></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-adaptica-green/10 rounded-full blur-[80px] pointer-events-none opacity-60"></div>

        <div className="relative z-10 p-8 md:p-10 min-h-[500px] flex flex-col">
          
          <div className="flex items-start justify-between mb-2">
             {!isSubmitted ? (
                <div className="space-y-1">
                    <h2 className="font-display text-3xl text-adaptica-base tracking-wide drop-shadow-md">
                    Get in touch
                    </h2>
                    <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-adaptica-green rounded-full animate-pulse shadow-[0_0_8px_#3E7C67]"></span>
                    <span className="text-[11px] font-medium text-adaptica-base/40 uppercase tracking-[0.2em]">
                        Systems Online
                    </span>
                    </div>
                </div>
             ) : (
                 <div className="w-full"></div> 
             )}

             <button 
               onClick={onClose}
               className="w-10 h-10 rounded-full bg-[#1C1C1C] text-adaptica-base/60 flex items-center justify-center shadow-[5px_5px_10px_#141414,-5px_-5px_10px_#242424] hover:shadow-[inset_5px_5px_10px_#141414,inset_-5px_-5px_10px_#242424] hover:text-adaptica-red transition-all duration-300 active:scale-95 z-50"
             >
               <X size={18} strokeWidth={2.5} />
             </button>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 mt-6 animate-hologram-enter" style={{animationDelay: '0.1s'}}>
                <div className="space-y-5">
                    <div className="group relative">
                    <input 
                        type="text" 
                        required
                        placeholder="Name"
                        className="w-full bg-[#181818] text-adaptica-base rounded-2xl px-6 py-4 text-[15px] placeholder-adaptica-base/20 outline-none shadow-[inset_2px_2px_4px_#0e0e0e,inset_-2px_-2px_4px_#2a2a2a] focus:shadow-[inset_2px_2px_4px_#0e0e0e,inset_-2px_-2px_4px_#2a2a2a,0_0_0_1px_#A63A42] transition-all duration-300"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                    </div>

                    <div className="group relative">
                    <input 
                        type="email" 
                        required
                        placeholder="Email"
                        className="w-full bg-[#181818] text-adaptica-base rounded-2xl px-6 py-4 text-[15px] placeholder-adaptica-base/20 outline-none shadow-[inset_2px_2px_4px_#0e0e0e,inset_-2px_-2px_4px_#2a2a2a] focus:shadow-[inset_2px_2px_4px_#0e0e0e,inset_-2px_-2px_4px_#2a2a2a,0_0_0_1px_#A63A42] transition-all duration-300"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                    </div>

                    <div className="group relative">
                    <input 
                        type="tel" 
                        placeholder="Phone"
                        className="w-full bg-[#181818] text-adaptica-base rounded-2xl px-6 py-4 text-[15px] placeholder-adaptica-base/20 outline-none shadow-[inset_2px_2px_4px_#0e0e0e,inset_-2px_-2px_4px_#2a2a2a] focus:shadow-[inset_2px_2px_4px_#0e0e0e,inset_-2px_-2px_4px_#2a2a2a,0_0_0_1px_#A63A42] transition-all duration-300"
                        value={formState.phone}
                        onChange={(e) => setFormState({...formState, phone: e.target.value})}
                    />
                    </div>

                    <div className="group relative">
                    <textarea 
                        rows={3}
                        required
                        placeholder="How can we help?"
                        className="w-full bg-[#181818] text-adaptica-base rounded-2xl px-6 py-4 text-[15px] placeholder-adaptica-base/20 outline-none shadow-[inset_2px_2px_4px_#0e0e0e,inset_-2px_-2px_4px_#2a2a2a] focus:shadow-[inset_2px_2px_4px_#0e0e0e,inset_-2px_-2px_4px_#2a2a2a,0_0_0_1px_#A63A42] transition-all duration-300 resize-none leading-relaxed"
                        value={formState.message}
                        onChange={(e) => setFormState({...formState, message: e.target.value})}
                    ></textarea>
                    </div>
                </div>

                <button 
                type="submit"
                className="w-full relative overflow-hidden bg-gradient-to-r from-adaptica-red to-[#802028] text-adaptica-base font-display font-medium tracking-[0.1em] uppercase text-sm py-5 rounded-2xl shadow-[0_10px_30px_-10px_rgba(166,58,66,0.6)] hover:shadow-[0_20px_40px_-10px_rgba(166,58,66,0.8)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] transition-all duration-300 group/btn"
                >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                    Initialize Protocol
                    <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover/btn:animate-[shimmer_1s_infinite]"></div>
                </button>
            </form>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-hologram-enter space-y-8 py-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-adaptica-green blur-[40px] opacity-20 animate-pulse"></div>
                    <div className="w-24 h-24 bg-[#181818] rounded-full flex items-center justify-center shadow-[inset_2px_2px_4px_#0e0e0e,inset_-2px_-2px_4px_#2a2a2a] border border-adaptica-green/20 relative z-10">
                        <ShieldCheck size={48} className="text-adaptica-green drop-shadow-[0_0_10px_rgba(62,124,103,0.8)]" />
                    </div>
                    <div className="absolute inset-0 animate-spin duration-[3s]">
                        <div className="w-2 h-2 bg-adaptica-green rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#3E7C67]"></div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="font-display text-2xl md:text-3xl text-adaptica-base tracking-widest uppercase">
                        Transmission<br/><span className="text-adaptica-green">Received</span>
                    </h3>
                    <p className="text-adaptica-base/60 text-sm md:text-base font-sans max-w-xs mx-auto leading-relaxed">
                        Your data packet has been successfully uploaded to our secure servers. An agent will intercept your signal shortly.
                    </p>
                </div>

                <div className="w-full max-w-xs bg-[#121212] rounded-lg p-4 border border-adaptica-base/5 flex items-center gap-3">
                     <Activity size={20} className="text-adaptica-green animate-pulse" />
                     <div className="flex-1 space-y-1">
                        <div className="flex justify-between text-[10px] uppercase tracking-widest text-adaptica-base/40 font-display">
                            <span>Upload Status</span>
                            <span>Complete</span>
                        </div>
                        <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden">
                             <div className="h-full bg-adaptica-green w-full shadow-[0_0_10px_#3E7C67]"></div>
                        </div>
                     </div>
                </div>

                <button 
                    onClick={onClose}
                    className="text-xs font-display tracking-[0.2em] text-adaptica-base/40 hover:text-adaptica-red transition-colors uppercase pt-4"
                >
                    [ Terminate Session ]
                </button>
            </div>
          )}
          
          {!isSubmitted && (
            <div className="mt-8 flex justify-center opacity-20">
                <div className="h-1 w-16 bg-adaptica-base rounded-full"></div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ContactModal;