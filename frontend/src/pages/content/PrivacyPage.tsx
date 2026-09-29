/**
 * Privacy Policy Page Component for TelePlus
 * 
 * Preserves all 5 source Privacy Policy sections exactly with designated icons and ordering.
 */

import React from 'react';
import { ShieldCheck, ArrowLeft, Lock, Smartphone, Database, CheckCircle2 } from 'lucide-react';

interface PrivacyPageProps {
  onBack?: () => void;
  showHeader?: boolean;
}

export const PRIVACY_SECTIONS = [
  {
    title: 'Data Collection & Processing (Section 14.24)',
    icon: Database,
    paragraphs: [
      'User information is processed strictly as necessary to provide the gaming service, manage subscriptions, operate skill-based games, calculate leaderboards, prevent unfair gameplay, provide customer support, and complete required prize verifications.',
    ],
    bulletPoints: [
      'Mobile phone number (MSISDN) for subscription management and authentication.',
      'Game session scores, accuracy metrics, and tournament leaderboard timestamps.',
      'Coin balances, transaction records, and prize delivery verifications.',
    ],
  },
  {
    title: 'Masked Identity & Public Display Protection',
    icon: Smartphone,
    paragraphs: [
      'To protect subscriber identity, phone numbers are masked across all public leaderboard views (e.g., 091*****890). Your full mobile number is never publicly displayed.',
    ],
  },
  {
    title: 'Zero Unnecessary Device Permissions',
    icon: Lock,
    paragraphs: [
      'TelePlus operates within your browser or mobile web container with zero invasive device permissions. The service does not request access to device contacts, microphone, camera, or external file storage.',
    ],
  },
  {
    title: 'Data Security & Fair Play Integrity',
    icon: ShieldCheck,
    paragraphs: [
      'All score submissions, coin purchases, and subscription commands are transmitted over secure TLS encrypted connections. Access controls and audit logging prevent unauthorized access and data manipulation.',
    ],
  },
  {
    title: 'Regulatory Compliance & Legal Review Status',
    icon: CheckCircle2,
    paragraphs: [
      'This Privacy Policy reflects the current data processing practices of the TelePlus gaming service. Official additional regulatory compliance provisions will be published upon conclusion of scheduled regulatory reviews.',
    ],
  },
];

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack, showHeader = true }) => {
  return (
    <div className="min-h-screen bg-white text-[#17202A] pb-24 max-w-md md:max-w-xl lg:max-w-3xl mx-auto px-3.5 pt-3 select-none">
      {/* 1. Header with Back Button */}
      {showHeader && (
        <div className="flex items-center justify-between gap-3 bg-[#1688C9] text-white p-3.5 rounded-2xl shadow-xs mb-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                id="privacy-back-btn"
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
              <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0" />
              <h1 className="text-base font-black tracking-tight">Privacy Policy</h1>
            </div>
          </div>
        </div>
      )}

      {/* 2. Overview Card */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-950 leading-relaxed mb-4 space-y-1">
        <h2 className="font-black text-emerald-900 text-sm">TelePlus Privacy Policy</h2>
        <p>
          TelePlus is committed to protecting user privacy and handling personal information responsibly, transparently, and securely in accordance with applicable laws and telecommunications standards.
        </p>
      </div>

      {/* 3. Sections */}
      <div className="space-y-3">
        {PRIVACY_SECTIONS.map((section, idx) => {
          const SectionIcon = section.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2"
            >
              <div className="flex items-center gap-2">
                <SectionIcon className="w-4 h-4 text-[#1688C9] shrink-0" />
                <h3 className="text-xs sm:text-sm font-black text-[#17202A]">{section.title}</h3>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 leading-relaxed pl-1">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}

                {section.bulletPoints && (
                  <ul className="list-disc list-inside space-y-1 text-slate-700 pl-2">
                    {section.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx}>{bp}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
