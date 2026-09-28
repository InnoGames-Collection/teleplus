/**
 * Games Content Page Component for TelePlus
 * 
 * Displays the 8 official player-facing games:
 * • Emoji
 * • Color Switch
 * • Fruit Slice
 * • Candy Crush
 * • Bubble Pop
 * • Piano
 * • Picture Match
 * • Dama
 */

import React, { useState } from 'react';
import { 
  Gamepad2, 
  ArrowLeft, 
  Play, 
  ChevronDown, 
  ChevronUp, 
  Sparkles
} from 'lucide-react';
import { GameCatalog, CatalogGame } from '../../services/gameCatalog';
import { catalogGameToDefinition } from '../../games/registry';
import { GameDefinition, UserProfile } from '../../types';

interface GamesContentPageProps {
  games?: GameDefinition[];
  profile?: UserProfile;
  onLaunchGame?: (game: GameDefinition) => void;
  onBack?: () => void;
  showHeader?: boolean;
}

export const GamesContentPage: React.FC<GamesContentPageProps> = ({
  profile,
  onLaunchGame,
  onBack,
  showHeader = true,
}) => {
  const [expandedGameId, setExpandedGameId] = useState<string | null>(null);

  const officialGames: CatalogGame[] = GameCatalog.getAll();

  const toggleExpand = (gameId: string) => {
    setExpandedGameId((prev) => (prev === gameId ? null : gameId));
  };

  const handlePlayClick = (game: CatalogGame) => {
    if (!onLaunchGame) return;
    onLaunchGame(catalogGameToDefinition(game));
  };

  return (
    <div className="min-h-screen bg-white text-[#17202A] pb-24 max-w-md md:max-w-xl lg:max-w-3xl mx-auto px-3.5 pt-3 select-none">
      {/* 1. Header with Back Button */}
      {showHeader && (
        <div className="flex items-center justify-between gap-3 bg-[#1688C9] text-white p-3.5 rounded-2xl shadow-xs mb-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                id="games-content-back-btn"
                onClick={onBack}
                className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
                title="Go Back"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-[#8BCB3D] shrink-0" />
              <h1 className="text-base font-black tracking-tight">TelePlus Games</h1>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-100">
            {officialGames.length} Official Games
          </span>
        </div>
      )}

      {/* 2. 8 Official Games Cards */}
      <div className="space-y-4">
        {officialGames.map((game) => {
          const isExpanded = expandedGameId === game.gameId;
          const personalBest = profile?.highScores?.[game.gameId] || 0;

          return (
            <div
              key={game.gameId}
              id={`game-content-card-${game.gameId}`}
              className="bg-white rounded-2xl border border-slate-200 hover:border-[#1688C9]/50 shadow-xs overflow-hidden transition-all"
            >
              {/* Top Banner Row */}
              <div className="p-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={game.thumbnail || game.banner}
                    alt={game.gameName}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover bg-slate-900 border border-slate-200 shadow-xs shrink-0"
                  />

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9.5px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-50 text-[#1688C9] border border-blue-100">
                        {game.category}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold">
                        {game.genre}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-black text-[#17202A] leading-tight truncate">
                      {game.gameName}
                    </h2>

                    {profile && (
                      <div className="text-[11px] font-mono font-black text-[#1688C9]">
                        Best Score: {personalBest.toLocaleString()} PTS
                      </div>
                    )}
                  </div>
                </div>

                {onLaunchGame && (
                  <button
                    onClick={() => handlePlayClick(game)}
                    className="px-4 py-2 rounded-xl bg-[#8BCB3D] hover:bg-[#7cb736] active:scale-95 text-white font-black text-xs uppercase tracking-wider shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play</span>
                  </button>
                )}
              </div>

              {/* Tagline & Overview */}
              <div className="px-4 pb-3 space-y-2.5">
                <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="font-bold text-[#17202A] mb-1">{game.tagline}</p>
                  <p className="text-slate-600">{game.description}</p>
                </div>

                {/* Accordion Toggle for Instructions & Controls */}
                <button
                  type="button"
                  onClick={() => toggleExpand(game.gameId)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-black text-[#17202A] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{isExpanded ? 'Hide' : 'View'} Instructions & Rules</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#1688C9]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </button>
              </div>

              {/* Expanded Detailed Rules & Instructions */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/70 space-y-3 animate-in fade-in">
                  {/* Instructions */}
                  {game.instructions && game.instructions.length > 0 && (
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-black text-[#17202A] uppercase tracking-wider">
                        How to Play:
                      </h4>
                      <ol className="list-decimal list-inside space-y-1 text-xs text-slate-700 pl-1 leading-relaxed">
                        {game.instructions.map((step, stepIdx) => (
                          <li key={stepIdx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Controls */}
                  {game.controlsDescription && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-950 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#8BCB3D] shrink-0" />
                      <span className="font-medium"><strong>Controls:</strong> {game.controlsDescription}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
