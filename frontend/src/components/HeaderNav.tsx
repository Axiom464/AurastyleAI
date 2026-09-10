import React from 'react';
import { Sparkles, Bookmark, ShieldCheck, RefreshCw, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface HeaderNavProps {
  gender: 'male' | 'female';
  setGender: (gender: 'male' | 'female') => void;
  savedCount: number;
  onOpenWardrobe: () => void;
  onRandomizeScan: () => void;
  totalOutfits: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  gender,
  setGender,
  savedCount,
  onOpenWardrobe,
  onRandomizeScan,
  totalOutfits
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-500/20 bg-[#090d0b]/90 backdrop-blur-xl">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Aura */}
        <div className="flex items-center gap-3">
          <div className="relative group flex items-center justify-center">
            <div className="absolute -inset-1 rounded-full bg-emerald-500/30 blur-md group-hover:bg-emerald-500/50 transition-all duration-300"></div>
            <img
              src="./logo.png"
              alt="AuraStyle AI Logo"
              data-testid="brand-logo"
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              onError={(e) => {
                // Fallback to /logo.png if relative path issues
                (e.target as HTMLImageElement).src = '/logo.png';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-lg sm:text-xl text-white font-heading">
                AURA<span className="text-emerald-400 text-glow">STYLE</span>
              </span>
              <Badge
                variant="outline"
                className="hidden sm:inline-flex border-emerald-500/40 text-emerald-300 text-[10px] tracking-widest uppercase bg-emerald-950/40 px-1.5 py-0"
              >
                AI MATRIX v3.8
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              Neural Fashion Architecture &amp; Procedural Biometric Lookup Engine
            </p>
          </div>
        </div>

        {/* Center Pill Metrics */}
        <div className="hidden lg:flex items-center gap-3 bg-slate-950/60 border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs text-slate-300">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>144-Outfit Matrix Active</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>{totalOutfits}+ Look Permutations</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Biometric Hardware Synced</span>
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Gender Catalog Switcher */}
          <div
            data-testid="gender-selector-container"
            className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-emerald-500/30"
          >
            <button
              data-testid="gender-toggle-male"
              onClick={() => setGender('male')}
              className={`px-2.5 sm:px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                gender === 'male'
                  ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              MEN'S
            </button>
            <button
              data-testid="gender-toggle-female"
              onClick={() => setGender('female')}
              className={`px-2.5 sm:px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                gender === 'female'
                  ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              WOMEN'S
            </button>
          </div>

          {/* Randomizer */}
          <Button
            data-testid="randomize-matrix-button"
            variant="outline"
            size="sm"
            onClick={onRandomizeScan}
            className="hidden sm:inline-flex border-emerald-500/30 bg-slate-950/80 hover:bg-emerald-950/50 hover:border-emerald-400 text-emerald-300 text-xs gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Randomize Matrix</span>
          </Button>

          {/* Saved Wardrobe Button */}
          <Button
            data-testid="open-wardrobe-button"
            variant="default"
            size="sm"
            onClick={onOpenWardrobe}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs px-3 shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-1.5"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Wardrobe</span>
            <span
              data-testid="wardrobe-count-badge"
              className="bg-black text-emerald-300 px-1.5 py-0.2 rounded-full text-[10px] font-mono ml-0.5"
            >
              {savedCount}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};
