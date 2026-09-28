/**
 * TelePlus - Official Header
 * 
 * Strict Layout Rules:
 * - Brand: TelePlus
 * - NO Coins, NO Coin balances, NO Buy Coins buttons
 * - Left: Menu toggle + telebirr SuperApp indicator
 * - Center: TelePlus visual brand wordmark
 * - Right: Daily Subscription status badge (2 Birr/day)
 */

import React from 'react';
import { UserProfile } from '../types';
import { Menu, Zap } from 'lucide-react';
import { TelePlusLogo } from './GoPlayLogo';

interface HeaderProps {
  profile?: UserProfile;
  onOpenBuyCoins?: () => void;
  onOpenMenu?: () => void;
  onOpenSubscription?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenMenu,
  onOpenSubscription,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] select-none">
      <div className="max-w-md md:max-w-xl lg:max-w-3xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 min-h-[58px]">
        
        {/* 1. LEFT: Menu button & telebirr Mini-App Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {onOpenMenu && (
            <button
              id="header-main-menu-btn"
              type="button"
              onClick={onOpenMenu}
              aria-label="Open TelePlus Menu"
              className="p-1.5 rounded-xl text-[#17202A] hover:bg-slate-100 active:scale-95 transition-colors cursor-pointer"
              title="Menu"
            >
              <Menu className="w-5 h-5 stroke-[2.2]" />
            </button>
          )}

          <div 
            id="header-telebirr-chip"
            className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-sky-50 border border-sky-200 text-[#1688C9] cursor-pointer hover:bg-sky-100 transition-colors"
            title="telebirr SuperApp Game Center"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-5 h-5 rounded-lg bg-[#1688C9] text-white font-black text-[11px] flex items-center justify-center leading-none">
              tb
            </div>
            <div className="hidden xs:flex flex-col text-left leading-tight">
              <span className="text-[9px] font-black tracking-tight text-[#1688C9] uppercase">
                telebirr
              </span>
              <span className="text-[8px] font-semibold text-slate-500 -mt-0.5">
                SuperApp
              </span>
            </div>
          </div>
        </div>

        {/* 2. CENTER: TelePlus Visual Identity */}
        <div 
          id="header-teleplus-brand"
          className="flex items-center justify-center text-center cursor-pointer px-1 shrink-0 transition-transform active:scale-98"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="TelePlus"
        >
          <TelePlusLogo size="sm" />
        </div>

        {/* 3. RIGHT: Daily Subscription Indicator (NO COINS) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div 
            onClick={onOpenSubscription}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-xs font-black cursor-pointer hover:bg-emerald-100 transition-colors shadow-2xs"
            title="Daily Subscription • 2 Birr/day"
          >
            <Zap className="w-3 h-3 text-[#8BCB3D] fill-current" />
            <span>2 Birr/day</span>
          </div>
        </div>

      </div>
    </header>
  );
};
