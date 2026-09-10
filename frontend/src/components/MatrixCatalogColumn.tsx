import React, { useState } from 'react';
import {
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Search,
  Filter,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Tag,
  Palette,
  Eye,
  SlidersHorizontal,
  Shirt
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { FashionLook } from '@/types/fashion';

interface MatrixCatalogColumnProps {
  looks: FashionLook[];
  totalMatches: number;
  gender: 'male' | 'female';
  cultureFilter: string;
  setCultureFilter: (c: string) => void;
  selectedOccasion: string;
  setSelectedOccasion: (o: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectLook: (look: FashionLook) => void;
  onSaveLook: (look: FashionLook) => void;
  savedLookCodes: Set<string>;
  onResetFilters: () => void;
}

const OCCASIONS_LIST = [
  "All Occasions",
  "Red Carpet Gala",
  "Cyber Streetwear Drop",
  "Royal Festive Wedding",
  "Executive Board Soiree",
  "Modern Sangeet & Reception",
  "Futuristic Cocktail Lounge"
];

export const MatrixCatalogColumn: React.FC<MatrixCatalogColumnProps> = ({
  looks,
  totalMatches,
  gender,
  cultureFilter,
  setCultureFilter,
  selectedOccasion,
  setSelectedOccasion,
  searchQuery,
  setSearchQuery,
  onSelectLook,
  onSaveLook,
  savedLookCodes,
  onResetFilters
}) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Top Controls & Category Filters */}
      <div
        data-testid="catalog-controls-container"
        className="glass-panel-glow rounded-2xl p-4 sm:p-5 flex flex-col gap-4 border border-emerald-500/25 hud-corner"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide font-heading flex items-center gap-2">
                Procedural 144-Outfit Matrix Catalog
                <Badge
                  variant="outline"
                  className="border-emerald-500/40 text-emerald-300 text-[11px] font-mono bg-emerald-950/50"
                >
                  {gender.toUpperCase()} WARDROBE
                </Badge>
              </h2>
              <p className="text-xs text-slate-400">
                Relational multi-dimensional lookup matching your biometric geometry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span data-testid="catalog-matches-count">
              {totalMatches} Looks Active
            </span>
          </div>
        </div>

        {/* Culture Switcher & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Culture Segmented Switcher */}
          <div
            data-testid="culture-filter-tabs"
            className="flex items-center overflow-x-auto p-1 rounded-xl bg-slate-950 border border-emerald-500/25"
          >
            <button
              data-testid="filter-culture-all"
              onClick={() => setCultureFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                cultureFilter === 'all'
                  ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              All Cultures
            </button>
            <button
              data-testid="filter-culture-indian"
              onClick={() => setCultureFilter('indian')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                cultureFilter === 'indian'
                  ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              Indian Heritage &amp; Festive
            </button>
            <button
              data-testid="filter-culture-western"
              onClick={() => setCultureFilter('western')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                cultureFilter === 'western'
                  ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              Western Luxury &amp; Streetwear
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-emerald-400" />
            <Input
              data-testid="catalog-search-input"
              type="text"
              placeholder="Search fabrics, cuts, styles, or codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-slate-950 border-emerald-500/30 text-xs text-slate-200 placeholder:text-slate-500 focus:border-emerald-400 h-9"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-emerald-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Occasion Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] text-slate-400 uppercase font-mono mr-1 flex items-center gap-1">
            <Tag className="w-3 h-3 text-emerald-400" />
            Occasion:
          </span>
          {OCCASIONS_LIST.map((occ) => {
            const isSelected =
              occ === "All Occasions" ? selectedOccasion === "all" : selectedOccasion === occ;
            return (
              <button
                key={occ}
                data-testid={`occasion-filter-${occ.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedOccasion(occ === "All Occasions" ? "all" : occ)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                    : 'bg-slate-950/60 border-emerald-500/20 text-slate-400 hover:text-slate-200 hover:border-emerald-500/40'
                }`}
              >
                {occ}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Catalog Grid */}
      {looks.length === 0 ? (
        <div
          data-testid="empty-catalog-state"
          className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center border border-emerald-500/20"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center mb-4">
            <Shirt className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-base font-bold text-white">No Matching Matrix Looks Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
            No outfit payload matches your specific biometric filter combination. Try adjusting profile modifiers or clearing search terms.
          </p>
          <Button
            data-testid="reset-filters-button"
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-500 hover:text-black text-xs"
          >
            Reset Filters to Recommended Baseline
          </Button>
        </div>
      ) : (
        <div
          data-testid="catalog-looks-grid"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {looks.map((look) => {
            const isSaved = savedLookCodes.has(look.look_code);
            return (
              <div
                key={look.look_code}
                data-testid={`look-card-${look.look_code.toLowerCase()}`}
                className="group glass-panel hover:glass-panel-glow rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-400/60 transition-all duration-300 flex flex-col shadow-lg"
              >
                {/* Look Image & Badges */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
                  <img
                    src={look.hero_image}
                    alt={look.title}
                    data-testid={`look-image-${look.look_code.toLowerCase()}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d0b] via-transparent to-black/30 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-slate-950/90 border border-emerald-400 text-emerald-300 font-mono text-[11px] font-bold px-2 py-0.5 rounded shadow">
                      #{look.look_code}
                    </span>

                    <span className="bg-emerald-950/90 border border-emerald-400/70 text-emerald-300 font-mono text-[11px] px-2 py-0.5 rounded shadow flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>{look.biometric_match_rate}% RES</span>
                    </span>
                  </div>

                  {/* Culture & Occasion Tag Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px]">
                    <span className="bg-slate-950/80 border border-emerald-500/30 text-emerald-300 uppercase font-mono px-2 py-0.5 rounded">
                      {look.culture.toUpperCase()} • {look.gender.toUpperCase()}
                    </span>

                    <span className="bg-slate-950/80 border border-slate-700 text-slate-300 text-[10px] px-2 py-0.5 rounded">
                      {look.occasion}
                    </span>
                  </div>
                </div>

                {/* Card Body Details */}
                <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
                  <div>
                    <h3
                      data-testid={`look-title-${look.look_code.toLowerCase()}`}
                      className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1"
                    >
                      {look.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {look.description}
                    </p>
                  </div>

                  {/* 5-Piece Micro Preview Indicators */}
                  <div className="bg-slate-950/60 border border-emerald-500/15 p-2 rounded-xl flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-1">
                      <span>5-PIECE OUTFIT SUITE</span>
                      <span className="text-emerald-400">{look.pieces[0].brand_or_label.split(' ')[0]}</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1 text-[9px] font-mono text-slate-300 text-center">
                      <div className="bg-slate-900/90 py-1 rounded border border-slate-800" title={look.pieces[0].name}>
                        TOP
                      </div>
                      <div className="bg-slate-900/90 py-1 rounded border border-slate-800" title={look.pieces[1].name}>
                        BOT
                      </div>
                      <div className="bg-slate-900/90 py-1 rounded border border-slate-800" title={look.pieces[2].name}>
                        SHOE
                      </div>
                      <div className="bg-slate-900/90 py-1 rounded border border-slate-800" title={look.pieces[3].name}>
                        OPTIC
                      </div>
                      <div className="bg-slate-900/90 py-1 rounded border border-slate-800" title={look.pieces[4].name}>
                        JEWEL
                      </div>
                    </div>
                  </div>

                  {/* Color Harmony Strip */}
                  <div className="flex items-center justify-between bg-slate-950/80 border border-emerald-500/15 px-2.5 py-1.5 rounded-lg text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-slate-300 text-[10px] truncate max-w-[130px]">
                        {look.color_harmony.scheme_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-full border border-white/20 shadow"
                        style={{ backgroundColor: look.color_harmony.dominant_hex }}
                        title={`Dominant: ${look.color_harmony.dominant_hex}`}
                      />
                      <div
                        className="w-3 h-3 rounded-full border border-white/20 shadow"
                        style={{ backgroundColor: look.color_harmony.secondary_hex }}
                        title={`Secondary: ${look.color_harmony.secondary_hex}`}
                      />
                      <div
                        className="w-3 h-3 rounded-full border border-white/20 shadow"
                        style={{ backgroundColor: look.color_harmony.accent_hex }}
                        title={`Accent: ${look.color_harmony.accent_hex}`}
                      />
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      data-testid={`inspect-look-${look.look_code.toLowerCase()}`}
                      variant="outline"
                      size="sm"
                      onClick={() => onSelectLook(look)}
                      className="flex-1 bg-slate-950/80 border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/40 text-emerald-300 text-xs font-semibold py-1.5 gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Look</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-emerald-400 opacity-70" />
                    </Button>

                    <Button
                      data-testid={`bookmark-look-${look.look_code.toLowerCase()}`}
                      variant={isSaved ? "default" : "outline"}
                      size="icon-sm"
                      onClick={() => onSaveLook(look)}
                      title={isSaved ? "Saved to Wardrobe" : "Save to Wardrobe"}
                      className={
                        isSaved
                          ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                          : "border-emerald-500/30 hover:border-emerald-400 text-slate-300 hover:text-emerald-300 bg-slate-950/80"
                      }
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-black" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
