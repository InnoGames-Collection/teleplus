/**
 * TelePlus - Official Five-Item Three-Line Menu Drawer
 * 
 * Strict Specification:
 * When opened, it must contain ONLY these five functions in exact order:
 * 1. Language (English, አማርኛ, Afaan Oromoo - functional & visually identifiable)
 * 2. Sound (Sound ON / Sound OFF toggle - functional, visually obvious, persisted)
 * 3. FAQ (opens existing FAQ page/section)
 * 4. Help & Support (opens existing Help & Support page/section)
 * ---------------- (visual separator)
 * 5. Log Out (clears session, returns to login page without wiping user game data)
 */

import React, { useState } from 'react';
import { 
  Globe, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Headphones, 
  LogOut, 
  X, 
  ChevronRight, 
  ChevronDown, 
  Check 
} from 'lucide-react';
import { LanguageCode } from '../types';
import { TelePlusLogo } from './TelePlusLogo';

export type MainMenuSection = 'faq' | 'help_support' | 'games' | 'subscription' | 'pricing' | 'terms' | 'privacy';

interface MainMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (section: 'faq' | 'help_support') => void;
  language?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  onLogOut?: () => void;
}

export const MainMenuDrawer: React.FC<MainMenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectSection,
  language = 'en',
  onLanguageChange,
  soundEnabled = true,
  onToggleSound,
  onLogOut,
}) => {
  const [isLangExpanded, setIsLangExpanded] = useState(false);

  if (!isOpen) return null;

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'am', label: 'Amharic', native: 'አማርኛ' },
    { code: 'om', label: 'Afaan Oromoo', native: 'Afaan Oromoo' },
  ];

  const currentLangLabel = languages.find((l) => l.code === language)?.native || 'English';

  const handleLanguageSelect = (code: LanguageCode) => {
    if (onLanguageChange) {
      onLanguageChange(code);
    }
  };

  const handleLogoutClick = () => {
    onClose();
    if (onLogOut) {
      onLogOut();
    }
  };

  return (
    <div 
      id="main-menu-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        id="main-menu-panel"
        className="w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 select-none font-['Plus_Jakarta_Sans',sans-serif]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 bg-white border-b border-slate-200/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TelePlusLogo size="sm" />
          </div>

          <button
            id="main-menu-close-btn"
            type="button"
            onClick={onClose}
            aria-label="Close Menu"
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 active:scale-95 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Menu Items (ONLY the 5 requested functions) */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-1.5">
          
          {/* 1. LANGUAGE */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
            <button
              id="menu-item-language"
              type="button"
              onClick={() => setIsLangExpanded(!isLangExpanded)}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1688C9] flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#17202A]">Language</div>
                  <div className="text-[10px] font-bold text-slate-400">
                    {currentLangLabel}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#1688C9] text-[10px] font-extrabold border border-blue-100">
                  {currentLangLabel}
                </span>
                {isLangExpanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </button>

            {/* Language Sub-Options */}
            {isLangExpanded && (
              <div className="border-t border-slate-100 bg-slate-50/70 p-2 space-y-1">
                {languages.map((item) => {
                  const isSelected = language === item.code;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => handleLanguageSelect(item.code)}
                      className={`w-full px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-[#1688C9] text-white font-black shadow-2xs' 
                          : 'text-[#17202A] hover:bg-slate-200/60 font-bold'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.native}</span>
                        {item.code !== 'en' && (
                          <span className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                            ({item.label})
                          </span>
                        )}
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-white stroke-[2.5]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. SOUND */}
          <div className="rounded-2xl border border-slate-200 bg-white p-3.5 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                soundEnabled 
                  ? 'bg-emerald-50 text-[#8BCB3D]' 
                  : 'bg-slate-100 text-slate-400'
              }`}>
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 stroke-[2.2]" />
                ) : (
                  <VolumeX className="w-4 h-4 stroke-[2.2]" />
                )}
              </div>
              <div>
                <div className="text-xs font-black text-[#17202A]">Sound</div>
                <div className="text-[10px] font-bold text-slate-400">
                  Game & UI Audio
                </div>
              </div>
            </div>

            <button
              id="menu-item-sound-toggle"
              type="button"
              onClick={onToggleSound}
              className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                soundEnabled
                  ? 'bg-[#8BCB3D] text-white hover:bg-[#7cb934]'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              <span>{soundEnabled ? 'Sound ON' : 'Sound OFF'}</span>
            </button>
          </div>

          {/* 3. FAQ */}
          <button
            id="menu-item-faq"
            type="button"
            onClick={() => {
              onClose();
              onSelectSection('faq');
            }}
            className="w-full p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                <HelpCircle className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-xs font-black text-[#17202A]">FAQ</div>
                <div className="text-[10px] font-bold text-slate-400">
                  Frequently Asked Questions
                </div>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* 4. HELP & SUPPORT */}
          <button
            id="menu-item-help-support"
            type="button"
            onClick={() => {
              onClose();
              onSelectSection('help_support');
            }}
            className="w-full p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#1688C9] flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-xs font-black text-[#17202A]">Help & Support</div>
                <div className="text-[10px] font-bold text-slate-400">
                  Customer Assistance & Guides
                </div>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* VISUAL SEPARATOR */}
          <div className="pt-2 pb-1">
            <div className="border-t border-slate-200/90" />
          </div>

          {/* 5. LOG OUT */}
          <button
            id="menu-item-logout"
            type="button"
            onClick={handleLogoutClick}
            className="w-full p-3.5 rounded-2xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100/80 text-rose-600 flex items-center justify-between transition-colors text-left cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <LogOut className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-xs font-black">Log Out</div>
                <div className="text-[10px] font-semibold text-rose-400">
                  End current session
                </div>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-rose-400" />
          </button>

        </div>

        {/* Drawer Footer */}
        <div className="p-3.5 border-t border-slate-200/90 text-center text-[10px] font-bold text-slate-400">
          <span>TelePlus • Gaming Portal</span>
        </div>
      </div>
    </div>
  );
};
