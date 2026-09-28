import React from 'react';

interface TelePlusLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark'; // 'light' = dark text for white headers, 'dark' = white text
}

export const TelePlusLogo: React.FC<TelePlusLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light',
}) => {
  const height = 
    size === 'xs' ? 20 :
    size === 'sm' ? 26 : 
    size === 'lg' ? 40 : 
    size === 'xl' ? 52 : 
    32;

  const textColor = variant === 'dark' ? '#FFFFFF' : '#17202A';

  return (
    <div className={`inline-flex items-center gap-1.5 select-none shrink-0 ${className}`} aria-label="TelePlus Official Logo">
      <div 
        className="rounded-xl bg-[#1688C9] flex items-center justify-center text-white font-black shadow-xs shrink-0"
        style={{
          width: height * 0.95,
          height: height * 0.95,
          fontSize: height * 0.48,
        }}
      >
        <span className="leading-none tracking-tighter">T</span>
        <span className="text-[#8BCB3D] leading-none -ml-0.5 font-black">+</span>
      </div>

      <div className="flex items-baseline tracking-tight font-black font-['Fredoka',sans-serif]" style={{ fontSize: height * 0.68 }}>
        <span style={{ color: textColor }}>Tele</span>
        <span className="text-[#8BCB3D]">Plus</span>
      </div>
    </div>
  );
};

// Backwards-compatible export for any existing references
export const GoPlayLogo = TelePlusLogo;
