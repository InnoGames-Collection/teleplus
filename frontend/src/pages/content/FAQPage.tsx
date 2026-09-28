/**
 * FAQ Page Component for GoPlay
 * 
 * Sourced from the official FAQ Content specification (Q1 through Q10).
 */

import React, { useState } from 'react';
import { HelpCircle, ArrowLeft, Plus, Minus, Search } from 'lucide-react';

interface FAQPageProps {
  onBack?: () => void;
  showHeader?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is TelePlus?',
    answer:
      'TelePlus is the official mobile gaming entertainment portal for EthioTelecom and telebirr users, offering premium skill-based games, weekly competitions, leaderboards, and verified prize rewards.',
  },
  {
    id: 'faq-2',
    question: 'How do I subscribe to TelePlus?',
    answer:
      'You can subscribe to the TelePlus Daily Subscription (2 Birr/day) by sending OK via SMS to 9898 or tapping the Subscribe button in the app. You can also subscribe directly through telebirr.',
  },
  {
    id: 'faq-3',
    question: 'What is the subscription price?',
    answer:
      'TelePlus is available for only 2 Birr per day. The subscription gives you unlimited daily access to all active games and entry into the weekly competition.',
  },
  {
    id: 'faq-4',
    question: 'How do I pay for my subscription?',
    answer:
      'Billing is handled seamlessly through EthioTelecom airtime or telebirr balance. Sending OK to 9898 initiates the subscription.',
  },
  {
    id: 'faq-5',
    question: 'How does the weekly competition work?',
    answer:
      'The featured weekly challenge is Color Switch! Players compete each day of the 7-day tournament cycle. Your highest valid daily score contributes to your weekly competition ranking.',
  },
  {
    id: 'faq-6',
    question: 'How does the Leaderboard work?',
    answer:
      'The Leaderboard tracks top player scores for the active 7-Day Color Switch competition as well as individual game bests. Scores are recorded accurately and updated in real time.',
  },
  {
    id: 'faq-7',
    question: 'How is my privacy protected on the leaderboard?',
    answer:
      'To ensure complete user privacy, all player phone numbers (MSISDNs) are masked across all leaderboard rankings (for example: 091*****890). Your full mobile number is never publicly shown.',
  },
  {
    id: 'faq-8',
    question: 'How do I track my games and high scores?',
    answer:
      'Open the Profile tab and tap "My High Scores" or "My Games" to view your personal best performances and historical game records.',
  },
  {
    id: 'faq-9',
    question: 'How do I cancel or stop my subscription?',
    answer:
      'To unsubscribe, you can send STOP to SMS shortcode 9898 from your registered EthioTelecom mobile number or manage your plan under the Subscription section.',
  },
  {
    id: 'faq-10',
    question: 'What if I encounter gameplay or connection issues?',
    answer:
      'TelePlus is built for lightweight, low-latency mobile web play. If your connection drops momentarily, your high scores and progress are preserved. For further assistance, access Help & Support from the menu.',
  },
];

export const FAQPage: React.FC<FAQPageProps> = ({ onBack, showHeader = true }) => {
  // First FAQ item is expanded by default
  const [openItemIds, setOpenItemIds] = useState<Record<string, boolean>>({
    'faq-1': true,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenItemIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    FAQ_ITEMS.forEach((item) => {
      allOpen[item.id] = true;
    });
    setOpenItemIds(allOpen);
  };

  const collapseAll = () => {
    setOpenItemIds({});
  };

  const filteredItems = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-[#17202A] pb-24 max-w-md md:max-w-xl lg:max-w-3xl mx-auto px-3.5 pt-3 select-none">
      {/* 1. Header with Back Button */}
      {showHeader && (
        <div className="flex items-center justify-between gap-3 bg-[#1688C9] text-white p-3.5 rounded-2xl shadow-xs mb-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                id="faq-back-btn"
                onClick={onBack}
                className="px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 flex items-center gap-1.5 text-white transition-colors cursor-pointer shrink-0 text-xs font-bold"
                aria-label="Go Back"
                title="Go Back"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Go Back</span>
              </button>
            )}
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-300 shrink-0" />
              <h1 className="text-base font-black tracking-tight">FAQ</h1>
            </div>
          </div>
        </div>
      )}

      {/* 2. Search & Controls */}
      <div className="space-y-2.5 mb-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or topics..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-[#17202A] placeholder:text-slate-400 focus:outline-none focus:border-[#1688C9]"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
          <span>Click any question to view answer</span>
          <div className="flex items-center gap-3">
            <button
              onClick={expandAll}
              className="text-[#1688C9] hover:underline font-bold cursor-pointer"
            >
              Expand All
            </button>
            <span>•</span>
            <button
              onClick={collapseAll}
              className="text-slate-500 hover:underline font-bold cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* 3. Accordion Rows */}
      <div className="space-y-2.5">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
            No questions matched your search query.
          </div>
        ) : (
          filteredItems.map((item, index) => {
            const isOpen = !!openItemIds[item.id];
            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#1688C9]/40 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Accordion Row Header */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-4 py-3.5 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer select-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <span className="text-[10px] font-black font-mono text-[#1688C9] mt-0.5 shrink-0 px-1.5 py-0.5 rounded bg-blue-50">
                      Q{index + 1}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-black leading-snug transition-colors ${
                        isOpen ? 'text-[#1688C9]' : 'text-[#17202A] group-hover:text-[#1688C9]'
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  {/* Accordion Dynamic + / - Icon */}
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#1688C9] text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                </button>

                {/* Expanded Answer */}
                {isOpen && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/60 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pl-7">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
