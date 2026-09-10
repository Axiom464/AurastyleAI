import React from 'react';
import {
  X,
  Bookmark,
  BookmarkCheck,
  Share2,
  Download,
  Sparkles,
  Palette,
  ShieldCheck,
  Crown,
  Layers,
  Shirt,
  Scissors,
  Check,
  ExternalLink
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { FashionLook } from '@/types/fashion';
import { toast } from 'sonner';

interface LookDetailModalProps {
  look: FashionLook | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveLook: (look: FashionLook) => void;
  isSaved: boolean;
}

export const LookDetailModal: React.FC<LookDetailModalProps> = ({
  look,
  isOpen,
  onClose,
  onSaveLook,
  isSaved
}) => {
  if (!look) return null;

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(look, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `AuraStyle_${look.look_code}_spec.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success(`Exported Look ${look.look_code} specification`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-testid="look-detail-modal"
        className="max-w-5xl w-[94vw] max-h-[92vh] overflow-y-auto bg-[#090d0b]/98 border border-emerald-500/30 text-white backdrop-blur-2xl p-5 sm:p-7 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.95)]"
      >
        <DialogHeader className="border-b border-emerald-500/20 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
            <div className="flex items-center gap-2">
              <span className="bg-slate-950 border border-emerald-400 text-emerald-300 font-mono text-xs px-2.5 py-0.5 rounded font-bold">
                #{look.look_code}
              </span>
              <Badge
                variant="outline"
                className="border-emerald-500/40 text-emerald-300 bg-emerald-950/40 font-mono text-[11px] uppercase"
              >
                {look.culture} • {look.gender}
              </Badge>
              <Badge
                variant="outline"
                className="border-slate-700 text-slate-300 bg-slate-900 text-[11px]"
              >
                {look.occasion}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{look.biometric_match_rate}% Biometric Resonance</span>
              </span>
            </div>
          </div>

          <DialogTitle
            data-testid="modal-look-title"
            className="text-xl sm:text-2xl font-extrabold text-white mt-3 font-heading"
          >
            {look.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-300 leading-relaxed mt-1">
            {look.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-4">
          {/* Left Column: Hero Image & Color Theory Card */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-emerald-500/30 shadow-lg bg-slate-950">
              <img
                src={look.hero_image}
                alt={look.title}
                data-testid="modal-hero-image"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-xs">
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest block">
                  Couture Specimen
                </span>
                <span className="font-bold text-white text-sm">{look.pieces[0].brand_or_label}</span>
              </div>
            </div>

            {/* Color Theory Harmony Box */}
            <div
              data-testid="color-theory-card"
              className="glass-panel rounded-xl p-4 border border-emerald-500/25 flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-xs font-heading">
                  <Palette className="w-4 h-4 text-emerald-400" />
                  <span>Color Theory Harmony</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {look.color_harmony.contrast_ratio}
                </span>
              </div>

              <span className="text-xs font-semibold text-white">
                {look.color_harmony.scheme_name}
              </span>

              <div className="flex items-center gap-2 my-1">
                <div className="flex-1 flex flex-col gap-1">
                  <div
                    className="h-6 rounded-md border border-white/20 shadow"
                    style={{ backgroundColor: look.color_harmony.dominant_hex }}
                  />
                  <span className="text-[9px] font-mono text-slate-400 text-center truncate">
                    Dom: {look.color_harmony.dominant_hex}
                  </span>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <div
                    className="h-6 rounded-md border border-white/20 shadow"
                    style={{ backgroundColor: look.color_harmony.secondary_hex }}
                  />
                  <span className="text-[9px] font-mono text-slate-400 text-center truncate">
                    Sec: {look.color_harmony.secondary_hex}
                  </span>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <div
                    className="h-6 rounded-md border border-white/20 shadow"
                    style={{ backgroundColor: look.color_harmony.accent_hex }}
                  />
                  <span className="text-[9px] font-mono text-slate-400 text-center truncate">
                    Acc: {look.color_harmony.accent_hex}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950/60 p-2 rounded border border-emerald-500/10">
                {look.color_harmony.theory_description}
              </p>
            </div>
          </div>

          {/* Right Column: 5-Piece Breakdown & Biometric Match */}
          <div className="md:col-span-7 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-heading flex items-center gap-2 border-b border-emerald-500/20 pb-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>5-Piece Itemized Ensemble Breakdown</span>
            </h4>

            <div className="flex flex-col gap-2">
              {look.pieces.map((piece, idx) => (
                <div
                  key={idx}
                  data-testid={`piece-item-${idx}`}
                  className="bg-slate-950/90 border border-emerald-500/20 hover:border-emerald-500/40 p-2.5 rounded-xl flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={piece.image_url}
                      alt={piece.name}
                      className="w-11 h-11 rounded-lg object-cover border border-emerald-500/20 bg-slate-900 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 block">
                        {piece.category}
                      </span>
                      <h5 className="text-xs font-bold text-white truncate">{piece.name}</h5>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5 truncate">
                        <span className="text-slate-300">{piece.brand_or_label}</span>
                        <span>•</span>
                        <span>{piece.material}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-300">
                      {piece.price_tag}
                    </span>
                    <div className="flex items-center gap-1 text-[9px] font-mono text-slate-400">
                      <div
                        className="w-2.5 h-2.5 rounded-full border border-white/30"
                        style={{ backgroundColor: piece.color_hex }}
                      />
                      <span className="truncate max-w-[80px]">{piece.color_name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Grooming & Accessories Note */}
            <div className="bg-slate-950/70 border border-emerald-500/15 p-3 rounded-xl flex flex-col gap-1.5 text-xs mt-1">
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <Scissors className="w-3.5 h-3.5 text-cyan-400" />
                <span>Grooming &amp; Hair Styling Direction</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {look.grooming_note}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="border-t border-emerald-500/20 pt-4 flex flex-wrap items-center justify-between gap-3">
          <Button
            data-testid="modal-export-json-button"
            variant="outline"
            size="sm"
            onClick={handleExportJson}
            className="border-emerald-500/30 bg-slate-950 text-xs text-slate-300 hover:text-emerald-300 gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Outfit JSON</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              data-testid="modal-save-wardrobe-button"
              variant={isSaved ? "outline" : "default"}
              size="sm"
              onClick={() => {
                onSaveLook(look);
              }}
              className={
                isSaved
                  ? "border-emerald-500 bg-emerald-950/50 text-emerald-300 text-xs gap-1.5"
                  : "bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              }
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                  <span>Saved in Wardrobe</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Bookmark to Wardrobe</span>
                </>
              )}
            </Button>

            <DialogClose render={<Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400 text-xs hover:text-white" />}>
              Close
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
