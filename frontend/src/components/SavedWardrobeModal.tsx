import React from 'react';
import {
  Bookmark,
  Trash2,
  ExternalLink,
  Download,
  Sparkles,
  ShoppingBag,
  Eye,
  CheckCircle2
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
import type { SavedLook, FashionLook } from '@/types/fashion';
import { toast } from 'sonner';

interface SavedWardrobeModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedLooks: SavedLook[];
  onDeleteLook: (id: string, lookCode: string) => void;
  onSelectLook: (look: FashionLook) => void;
}

export const SavedWardrobeModal: React.FC<SavedWardrobeModalProps> = ({
  isOpen,
  onClose,
  savedLooks,
  onDeleteLook,
  onSelectLook
}) => {
  const handleExportAll = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedLooks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `AuraStyle_Wardrobe_Collection_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Exported full wardrobe collection");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-testid="saved-wardrobe-modal"
        className="max-w-4xl w-[94vw] max-h-[88vh] overflow-y-auto bg-[#090d0b]/98 border border-emerald-500/30 text-white backdrop-blur-2xl p-5 sm:p-7 rounded-2xl shadow-2xl"
      >
        <DialogHeader className="border-b border-emerald-500/20 pb-4">
          <div className="flex items-center justify-between pr-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
                <Bookmark className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <DialogTitle className="text-lg sm:text-xl font-bold font-heading text-white">
                  Biometric Wardrobe &amp; Lookbook
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400">
                  {savedLooks.length} curated style vectors saved in database
                </DialogDescription>
              </div>
            </div>

            {savedLooks.length > 0 && (
              <Button
                data-testid="export-all-wardrobe-button"
                variant="outline"
                size="sm"
                onClick={handleExportAll}
                className="border-emerald-500/30 bg-slate-950 text-xs text-emerald-300 hover:bg-emerald-950/40 gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export All</span>
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="my-4">
          {savedLooks.length === 0 ? (
            <div
              data-testid="empty-wardrobe-state"
              className="py-12 text-center flex flex-col items-center justify-center border border-dashed border-emerald-500/20 rounded-xl bg-slate-950/40"
            >
              <ShoppingBag className="w-10 h-10 text-emerald-400/50 mb-3 animate-pulse" />
              <h4 className="text-sm font-bold text-white">Wardrobe Is Empty</h4>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Scan your camera or browse the 144-outfit matrix and click the bookmark icon to save looks.
              </p>
            </div>
          ) : (
            <div
              data-testid="wardrobe-items-list"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {savedLooks.map((look) => (
                <div
                  key={look.id}
                  data-testid={`saved-look-card-${look.look_code.toLowerCase()}`}
                  className="bg-slate-950/80 border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl p-3 flex gap-3.5 transition-all shadow-md group"
                >
                  <img
                    src={look.hero_image}
                    alt={look.title}
                    className="w-20 h-24 rounded-lg object-cover bg-slate-900 border border-emerald-500/20 flex-shrink-0"
                  />
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          #{look.look_code}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">
                          {look.culture} • {look.gender}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-white line-clamp-1 mt-0.5 group-hover:text-emerald-300">
                        {look.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 block line-clamp-1 mt-0.5">
                        {look.occasion}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 mt-1">
                      <button
                        onClick={() => {
                          onSelectLook(look as any);
                          onClose();
                        }}
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>

                      <button
                        data-testid={`delete-saved-look-${look.look_code.toLowerCase()}`}
                        onClick={() => onDeleteLook(look.id, look.look_code)}
                        className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                        title="Remove from Wardrobe"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-emerald-500/20 pt-3 flex justify-end">
          <DialogClose render={<Button variant="outline" size="sm" onClick={onClose} className="border-emerald-500/30 text-xs text-slate-300" />}>
            Close
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
