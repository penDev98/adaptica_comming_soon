import React from 'react';

const ClientLogos: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center px-4">
      {/* Partner 1: ERA */}
      <div className="flex items-center justify-center p-4 group">
        <img
          src="/assets/partner-era.png"
          alt="ERA Real Estate"
          className="h-12 md:h-16 w-auto object-contain transition-all duration-300 grayscale brightness-150 opacity-80 hover:grayscale-0 hover:brightness-100 hover:opacity-100 hover:scale-105"
        />
      </div>

      {/* Partner 2: Dental Clinic */}
      <div className="flex items-center justify-center p-4 group">
        <img
          src="/assets/partner-dental.webp"
          alt="Da Vinci Dental Clinic"
          className="h-10 md:h-14 w-auto object-contain transition-all duration-300 grayscale opacity-80 hover:opacity-100 hover:grayscale-0 hover:scale-105"
        />
      </div>

      {/* Partner 3: Tonerland */}
      <div className="flex items-center justify-center p-4 group">
        <img
          src="/assets/partner-tonerland-new.png"
          alt="Tonerland"
          className="h-10 md:h-14 w-auto object-contain transition-all duration-300 grayscale opacity-80 hover:opacity-100 hover:grayscale-0 hover:scale-105"
        />
      </div>

      {/* Partner 4: UUID Image 2 */}
      <div className="flex items-center justify-center p-4 group">
        <img
          src="/assets/partner-4.png"
          alt="Partner Logo"
          className="h-10 md:h-14 w-auto object-contain transition-all duration-300 grayscale brightness-150 opacity-80 hover:grayscale-0 hover:brightness-100 hover:opacity-100 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default ClientLogos;