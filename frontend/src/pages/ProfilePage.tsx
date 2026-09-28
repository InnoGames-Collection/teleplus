/**
 * TelePlus - Customer Profile & Account Page
 * 
 * Strict Specification:
 * - Pure White Background (#FFFFFF)
 * - ONLY ONE TelePlus logo (in top header, NO duplicate logo in Account Card)
 * - NO duplicate "Teleplus" text in Account Card
 * - Full Profile menu:
 *   1. Subscription
 *   2. Pricing
 *   3. My Games
 *   4. My High Scores
 *   5. FAQ
 *   6. Help & Support
 *   7. Terms & Conditions
 *   8. Privacy Policy
 * - Game Sound Effects preference card (persisted via StorageService)
 * - Footer branding
 * - FINAL ITEM AT VERY BOTTOM: Functional "Log Out" button that clears the session
 */

import React, { useState, useMemo } from 'react';
import { 
  UserProfile, 
  GameDefinition, 
  EnergyTransaction, 
  ClaimableReward,
  LanguageCode 
} from '../types';
import { 
  Gamepad2, 
  Trophy, 
  CreditCard, 
  Headphones, 
  HelpCircle, 
  FileText, 
  ShieldCheck, 
  ArrowLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Flame,
  BadgePercent,
  User,
  LogOut
} from 'lucide-react';
import { FAQPage } from './content/FAQPage';
import { HelpSupportPage } from './content/HelpSupportPage';
import { SubscriptionPage } from './content/SubscriptionPage';
import { PricingPage } from './content/PricingPage';
import { TermsPage } from './content/TermsPage';
import { PrivacyPage } from './content/PrivacyPage';
import { GameCatalog } from '../services/gameCatalog';
import { catalogGameToDefinition } from '../games/registry';
import { ColorSwitchCompetitionService } from '../services/colorSwitchCompetitionService';
import { StorageService } from '../services/storageService';

export type ProfileSubView =
  | null
  | 'subscriptions'
  | 'pricing'
  | 'my_games'
  | 'my_scores'
  | 'faq'
  | 'help_support'
  | 'terms'
  | 'privacy';

interface ProfilePageProps {
  profile: UserProfile;
  games: GameDefinition[];
  energyTransactions?: EnergyTransaction[];
  claimableRewards?: ClaimableReward[];
  language?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
  onOpenEnergyModal?: () => void;
  onOpenSubscriptionModal?: () => void;
  onOpenAuthModal?: () => void;
  onPlayGame: (game: GameDefinition) => void;
  onClaimReward?: (rewardId: string) => void;
  onSignOut?: () => void;
  onOpenBuyCoins?: () => void;
  onProfileUpdate?: (updated: UserProfile) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  onPlayGame,
  onOpenBuyCoins,
  onSignOut,
  onProfileUpdate,
}) => {
  const [subView, setSubView] = useState<ProfileSubView>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => StorageService.getAudioEnabled());

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    StorageService.saveAudioEnabled(next);
  };

  const phone = profile.phoneNumber || '0911428890';
  const digits = phone.replace(/\D/g, '');
  const cleanPhone = digits.startsWith('09') ? '251' + digits.slice(1) : digits.startsWith('9') ? '251' + digits : digits;
  const maskedMsisdn = cleanPhone.length >= 9
    ? `${cleanPhone.slice(0, 4)}*****${cleanPhone.slice(-2)}`
    : '2519*****22';

  // 7-Day Competition score
  const { sevenDayTotalScore } = useMemo(() => {
    return ColorSwitchCompetitionService.getUserScores(profile);
  }, [profile]);

  // Overall highest score across games
  const bestScore = useMemo(() => {
    const scores = Object.values(profile.highScores || {}) as number[];
    const maxScore = scores.length > 0 ? Math.max(...scores) : 0;
    return Math.max(maxScore, sevenDayTotalScore);
  }, [profile, sevenDayTotalScore]);

  // Catalog games list (strictly the 8 official games)
  const allAvailableGames = useMemo(() => {
    return GameCatalog.getAll().map(catalogGameToDefinition);
  }, []);

  // =========================================================================
  // SUB-PAGES ROUTING
  // =========================================================================

  // 1. Subscription
  if (subView === 'subscriptions') {
    return (
      <SubscriptionPage
        onBack={() => setSubView(null)}
        profile={profile}
        onProfileUpdate={onProfileUpdate}
      />
    );
  }

  // 2. Pricing
  if (subView === 'pricing') {
    return (
      <PricingPage
        onBack={() => setSubView(null)}
        onBuyCoins={onOpenBuyCoins}
      />
    );
  }

  // 3. My Games
  if (subView === 'my_games') {
    return (
      <div className="min-h-screen bg-white text-[#17202A] pb-24 max-w-md md:max-w-xl lg:max-w-3xl mx-auto px-3.5 pt-3 select-none space-y-4">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between gap-3 bg-[#1688C9] text-white p-3.5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSubView(null)}
              className="px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 flex items-center gap-1.5 text-white transition-colors cursor-pointer shrink-0 text-xs font-bold"
              aria-label="Go Back"
              title="Go Back"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Go Back</span>
            </button>
            <h1 className="text-base font-black tracking-tight">My Games</h1>
          </div>
          <span className="text-xs font-bold text-blue-100">
            {allAvailableGames.length} Games
          </span>
        </div>

        {/* Games List */}
        <div className="space-y-2.5">
          {allAvailableGames.map((g) => {
            const personalHighScore = profile.highScores?.[g.id] ?? 0;
            return (
              <div
                key={g.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 hover:border-[#1688C9] transition-all shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={g.thumbnailUrl || g.bannerUrl}
                    alt={g.title}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-900 shrink-0 border border-slate-200"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-black text-[#17202A] truncate">{g.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-slate-500 capitalize">{g.category}</span>
                      <span className="text-[10px] text-slate-300">•</span>
                      <span className="text-[11px] font-extrabold text-[#1688C9]">
                        Best: {personalHighScore > 0 ? `${personalHighScore.toLocaleString()} pts` : '0 pts'}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onPlayGame(g)}
                  className="px-4 py-2 rounded-xl bg-[#8BCB3D] hover:bg-[#7cb934] active:scale-95 text-white text-xs font-black shrink-0 transition-transform cursor-pointer shadow-xs"
                >
                  Play
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. My High Scores
  if (subView === 'my_scores') {
    const recordedEntries = Object.entries(profile.highScores || {});
    const displayList = recordedEntries.length > 0
      ? recordedEntries.map(([gameId, score]) => {
          const catalogGame = GameCatalog.getById(gameId);
          return {
            gameId,
            name: catalogGame?.gameName || gameId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            category: catalogGame?.category || 'Arcade',
            score: score as number,
          };
        })
      : allAvailableGames.map((g) => ({
          gameId: g.id,
          name: g.title,
          category: g.category,
          score: profile.highScores?.[g.id] ?? 0,
        }));

    return (
      <div className="min-h-screen bg-white text-[#17202A] pb-24 max-w-md md:max-w-xl lg:max-w-3xl mx-auto px-3.5 pt-3 select-none space-y-4">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between gap-3 bg-[#1688C9] text-white p-3.5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSubView(null)}
              className="px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 flex items-center gap-1.5 text-white transition-colors cursor-pointer shrink-0 text-xs font-bold"
              aria-label="Go Back"
              title="Go Back"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Go Back</span>
            </button>
            <h1 className="text-base font-black tracking-tight">My High Scores</h1>
          </div>
        </div>

        {/* Scores Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-2xs">
          {displayList.map((entry) => (
            <div key={entry.gameId} className="p-3.5 flex items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-black text-[#17202A]">{entry.name}</h4>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{entry.category}</span>
              </div>
              <div className="text-right">
                <span className="text-base font-black font-mono text-[#1688C9]">
                  {entry.score.toLocaleString()}
                </span>
                <span className="text-[10px] font-bold text-slate-400 ml-1">pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. FAQ
  if (subView === 'faq') {
    return <FAQPage onBack={() => setSubView(null)} />;
  }

  // 6. Help & Support
  if (subView === 'help_support') {
    return <HelpSupportPage onBack={() => setSubView(null)} />;
  }

  // 7. Terms & Conditions
  if (subView === 'terms') {
    return <TermsPage onBack={() => setSubView(null)} />;
  }

  // 8. Privacy Policy
  if (subView === 'privacy') {
    return <PrivacyPage onBack={() => setSubView(null)} />;
  }

  // =========================================================================
  // MAIN PROFILE SCREEN (Pure White Background, Zero Duplicate Logos)
  // =========================================================================
  return (
    <div className="min-h-screen bg-white text-[#17202A] pb-24 max-w-md md:max-w-xl lg:max-w-3xl mx-auto px-3.5 pt-2 space-y-4 select-none font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. AUTHENTICATED ACCOUNT CARD (Single TelePlus brand in Header, NO duplicate logo here) */}
      <div 
        id="profile-account-card"
        className="rounded-3xl bg-[#1688C9] text-white p-4.5 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar / Account Icon Container (NO duplicate TelePlus logo) */}
            <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-xs shrink-0">
              <User className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-blue-100 font-black uppercase tracking-wider">
                  Account
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-[#8BCB3D] text-white text-[8px] font-black uppercase tracking-wider">
                  VERIFIED
                </span>
              </div>
              <div className="text-base font-black font-mono tracking-wider text-white">
                {maskedMsisdn}
              </div>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold shrink-0">
            2 Birr/day
          </div>
        </div>
      </div>

      {/* 3. TWO-CARD STATISTICS GRID */}
      <div className="grid grid-cols-2 gap-3">
        {/* CARD 1: Available Coins / 7-Day Competition Score */}
        <div 
          id="profile-stat-7day-score"
          onClick={() => setSubView('my_scores')}
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-[#8BCB3D]/50 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 tracking-wider uppercase">
              7-Day Score
            </span>
            <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <Flame className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#17202A] font-mono flex items-baseline gap-1">
            <span>{sevenDayTotalScore.toLocaleString()}</span>
            <span className="text-xs font-bold text-slate-400 font-sans">pts</span>
          </div>
        </div>

        {/* CARD 2: Best Score */}
        <div 
          id="profile-stat-best-score"
          onClick={() => setSubView('my_scores')}
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-[#1688C9]/50 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 tracking-wider uppercase">
              Best Score
            </span>
            <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
              <Trophy className="w-3.5 h-3.5 text-[#1688C9]" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#17202A] font-mono flex items-baseline gap-1">
            <span>{bestScore.toLocaleString()}</span>
            <span className="text-xs font-bold text-slate-400 font-sans">pts</span>
          </div>
        </div>
      </div>

      {/* 4. PROFILE NAVIGATION MENU (In Exact Preserved Order) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden divide-y divide-slate-100">
        {[
          { id: 'subscriptions', label: 'Subscription', icon: CreditCard },
          { id: 'pricing', label: 'Pricing', icon: BadgePercent },
          { id: 'my_games', label: 'My Games', icon: Gamepad2 },
          { id: 'my_scores', label: 'My High Scores', icon: Trophy },
          { id: 'faq', label: 'FAQ', icon: HelpCircle },
          { id: 'help_support', label: 'Help & Support', icon: Headphones },
          { id: 'terms', label: 'Terms & Conditions', icon: FileText },
          { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`profile-menu-item-${item.id}`}
              onClick={() => setSubView(item.id as ProfileSubView)}
              className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1688C9] flex items-center justify-center group-hover:bg-[#1688C9] group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-xs sm:text-sm font-black text-[#17202A] group-hover:text-[#1688C9] transition-colors">
                  {item.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1688C9] transition-transform" />
              </div>
            </button>
          );
        })}
      </div>

      {/* 5. GAME SOUND EFFECTS PREFERENCE CARD */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-[#8BCB3D]" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
          <span className="text-xs font-bold text-slate-700">Game Sound Effects</span>
        </div>
        <button
          id="profile-sound-toggle"
          aria-label="Toggle game sound effects"
          onClick={handleToggleSound}
          className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
            soundEnabled ? 'bg-[#8BCB3D]' : 'bg-slate-300'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
              soundEnabled ? 'left-6' : 'left-1'
            }`}
          />
        </button>
      </div>

      {/* 6. FOOTER BRANDING */}
      <div className="text-center pt-1 text-[10px] text-slate-400 font-bold space-y-0.5">
        <div>TelePlus v2.0 • Gaming Edition</div>
        <div>Official Gaming Portal</div>
      </div>

      {/* 7. FINAL ACTION AT VERY BOTTOM: Functional LOG OUT Button */}
      <div className="pt-2">
        <button
          id="profile-logout-btn"
          type="button"
          onClick={onSignOut}
          className="w-full py-3.5 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 active:scale-98 border border-rose-200 text-rose-600 font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
        >
          <LogOut className="w-4 h-4 stroke-[2.2]" />
          <span>Log Out</span>
        </button>
      </div>

    </div>
  );
};
