import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';
import { apiGet, apiPost, apiDelete } from '@/lib/api';
import type {
  FashionLook,
  SavedLook,
  SavedLookCreate,
  FacialMetrics,
  MatrixStats,
  MatrixQueryResponse
} from '@/types/fashion';
import {
  CLIENT_MATRIX_CATALOG,
  getFacialGeometryMetrics
} from '@/lib/matrix-engine';

import { HeaderNav } from '@/components/HeaderNav';
import { ScannerColumn } from '@/components/ScannerColumn';
import { MatrixCatalogColumn } from '@/components/MatrixCatalogColumn';
import { TelemetryTerminal } from '@/components/TelemetryTerminal';
import { LookDetailModal } from '@/components/LookDetailModal';
import { SavedWardrobeModal } from '@/components/SavedWardrobeModal';

export default function Home() {
  const queryClient = useQueryClient();

  // Biometric Modifier States
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [skin, setSkin] = useState<string>('olive');
  const [body, setBody] = useState<string>('athletic');
  const [hair, setHair] = useState<string>('textured');
  const [faceShape, setFaceShape] = useState<string>('oval');

  // Filter States
  const [cultureFilter, setCultureFilter] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // UI Interactive States
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [telemetryTrigger, setTelemetryTrigger] = useState<number>(1);
  const [selectedLook, setSelectedLook] = useState<FashionLook | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isWardrobeOpen, setIsWardrobeOpen] = useState<boolean>(false);

  // Active composite key
  const activeProfileKey = `${gender}_${skin}_${body}_${hair}_${faceShape}`;

  // Facial geometry metrics derived from active parameters
  const facialMetrics: FacialMetrics = useMemo(() => {
    return getFacialGeometryMetrics(faceShape, skin);
  }, [faceShape, skin]);

  // Fetch Saved Wardrobe from MongoDB via FastAPI
  const { data: savedLooksData = [] } = useQuery<SavedLook[]>({
    queryKey: ['saved-looks'],
    queryFn: async () => {
      try {
        return await apiGet<SavedLook[]>('/fashion/saved-looks');
      } catch (err) {
        console.warn("Backend saved-looks fetch error (falling back to local memory):", err);
        return [];
      }
    },
    staleTime: 10000
  });

  const savedLookCodes = useMemo(() => {
    return new Set(savedLooksData.map((s) => s.look_code));
  }, [savedLooksData]);

  // Mutation to save a look
  const saveLookMutation = useMutation({
    mutationFn: async (look: FashionLook) => {
      const payload: SavedLookCreate = {
        look_code: look.look_code,
        title: look.title,
        gender: look.gender,
        culture: look.culture,
        occasion: look.occasion,
        hero_image: look.hero_image,
        description: look.description,
        color_harmony: look.color_harmony,
        pieces: look.pieces,
        accessories_summary: look.accessories_summary,
        grooming_note: look.grooming_note,
        biometric_match_rate: look.biometric_match_rate,
        tags: look.tags
      };
      return await apiPost<SavedLook>('/fashion/saved-looks', payload);
    },
    onSuccess: (savedLook) => {
      queryClient.invalidateQueries({ queryKey: ['saved-looks'] });
      toast.success(`Look #${savedLook.look_code} bookmarked to your Wardrobe!`);
      // Log telemetry event
      apiPost('/fashion/telemetry', {
        event_type: 'wardrobe_save',
        details: { look_code: savedLook.look_code, title: savedLook.title }
      }).catch(() => {});
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to save look to wardrobe');
    }
  });

  // Mutation to delete a saved look
  const deleteLookMutation = useMutation({
    mutationFn: async ({ id }: { id: string; lookCode: string }) => {
      return await apiDelete(`/fashion/saved-looks/${id}`);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['saved-looks'] });
      toast.info(`Look #${variables.lookCode} removed from wardrobe`);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to delete look');
    }
  });

  // Execute Scan Sequence
  const handleExecuteScan = useCallback(() => {
    if (isScanning) return;
    setIsScanning(true);
    setTelemetryTrigger((prev) => prev + 1);

    // Randomize non-gender parameters to simulate AI facial biometric detection event
    const skinPool = ['fair', 'olive', 'deep'];
    const bodyPool = ['athletic', 'muscular', 'soft'];
    const hairPool = ['short', 'textured', 'long', 'curly'];
    const facePool = ['oval', 'square', 'heart', 'diamond'];

    setTimeout(() => {
      const randomSkin = skinPool[Math.floor(Math.random() * skinPool.length)];
      const randomBody = bodyPool[Math.floor(Math.random() * bodyPool.length)];
      const randomHair = hairPool[Math.floor(Math.random() * hairPool.length)];
      const randomFace = facePool[Math.floor(Math.random() * facePool.length)];

      setSkin(randomSkin);
      setBody(randomBody);
      setHair(randomHair);
      setFaceShape(randomFace);
      setIsScanning(false);

      toast.success(`Biometric scan complete: ${randomFace.toUpperCase()} face shape & ${randomSkin.toUpperCase()} undertone locked.`);

      // Log telemetry event to backend
      apiPost('/fashion/telemetry', {
        event_type: 'camera_scan',
        details: {
          gender,
          detected_skin: randomSkin,
          detected_face: randomFace,
          detected_body: randomBody,
          detected_hair: randomHair
        }
      }).catch(() => {});
    }, 2500);
  }, [isScanning, gender]);

  // When dropdowns update, trigger telemetry logs trace
  const handleProfileUpdate = (type: 'skin' | 'body' | 'hair' | 'face', val: string) => {
    if (type === 'skin') setSkin(val);
    if (type === 'body') setBody(val);
    if (type === 'hair') setHair(val);
    if (type === 'face') setFaceShape(val);
    setTelemetryTrigger((prev) => prev + 1);
  };

  // Randomize Matrix
  const handleRandomizeMatrix = () => {
    const skinPool = ['fair', 'olive', 'deep'];
    const bodyPool = ['athletic', 'muscular', 'soft'];
    const hairPool = ['short', 'textured', 'long', 'curly'];
    const facePool = ['oval', 'square', 'heart', 'diamond'];

    setSkin(skinPool[Math.floor(Math.random() * skinPool.length)]);
    setBody(bodyPool[Math.floor(Math.random() * bodyPool.length)]);
    setHair(hairPool[Math.floor(Math.random() * hairPool.length)]);
    setFaceShape(facePool[Math.floor(Math.random() * facePool.length)]);
    setTelemetryTrigger((prev) => prev + 1);
    toast.info("Procedural biometric modifiers randomized.");
  };

  // Reset Filters
  const handleResetFilters = () => {
    setCultureFilter('all');
    setSelectedOccasion('all');
    setSearchQuery('');
    setSkin('olive');
    setBody('athletic');
    setHair('textured');
    setFaceShape('oval');
    setTelemetryTrigger((prev) => prev + 1);
    toast.info("Filters reset to default recommended configuration.");
  };

  // Procedural Filtering of Looks from 144-Outfit Matrix
  const filteredLooks = useMemo(() => {
    let result = CLIENT_MATRIX_CATALOG;

    // Filter by Gender
    result = result.filter((l) => l.gender.toLowerCase() === gender.toLowerCase());

    // Filter by Culture
    if (cultureFilter !== 'all') {
      result = result.filter((l) => l.culture.toLowerCase() === cultureFilter.toLowerCase());
    }

    // Filter by Occasion
    if (selectedOccasion !== 'all') {
      result = result.filter((l) => l.occasion.toLowerCase() === selectedOccasion.toLowerCase());
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.look_code.toLowerCase().includes(q) ||
          l.pieces.some(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.brand_or_label.toLowerCase().includes(q) ||
              p.material.toLowerCase().includes(q)
          ) ||
          l.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort to prioritize exact biometric profile matches first
    return result.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      if (a.skin_type === skin) scoreA += 3;
      if (b.skin_type === skin) scoreB += 3;
      if (a.body_type === body) scoreA += 2;
      if (b.body_type === body) scoreB += 2;
      if (a.hair_type === hair) scoreA += 2;
      if (b.hair_type === hair) scoreB += 2;
      if (a.face_shape === faceShape) scoreA += 2;
      if (b.face_shape === faceShape) scoreB += 2;
      return scoreB - scoreA;
    });
  }, [gender, cultureFilter, selectedOccasion, searchQuery, skin, body, hair, faceShape]);

  return (
    <div className="min-h-screen bg-[#090d0b] text-[#f0fdf4] flex flex-col antialiased selection:bg-emerald-500 selection:text-black">
      {/* Sonner Toast Notification Container */}
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          className: "bg-slate-950/90 border border-emerald-500/40 text-emerald-200"
        }}
      />

      {/* Top Navigation Bar with Logo and Controls */}
      <HeaderNav
        gender={gender}
        setGender={(g) => {
          setGender(g);
          setTelemetryTrigger((prev) => prev + 1);
        }}
        savedCount={savedLooksData.length}
        onOpenWardrobe={() => setIsWardrobeOpen(true)}
        onRandomizeScan={handleRandomizeMatrix}
        totalOutfits={CLIENT_MATRIX_CATALOG.length}
      />

      {/* Main Dual-Column Dashboard Canvas */}
      <main className="flex-1 max-w-[1800px] w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Column 1: The Scanner (Hardware Viewfinder, Facial Geometry HUD & Modifiers) */}
          <div className="lg:col-span-4 xl:col-span-4 w-full">
            <ScannerColumn
              skin={skin}
              setSkin={(v) => handleProfileUpdate('skin', v)}
              body={body}
              setBody={(v) => handleProfileUpdate('body', v)}
              hair={hair}
              setHair={(v) => handleProfileUpdate('hair', v)}
              faceShape={faceShape}
              setFaceShape={(v) => handleProfileUpdate('face', v)}
              gender={gender}
              facialMetrics={facialMetrics}
              onExecuteScan={handleExecuteScan}
              isScanning={isScanning}
            />
          </div>

          {/* Column 2: Procedural 144-Outfit Matrix Catalog Viewport */}
          <div className="lg:col-span-8 xl:col-span-8 w-full">
            <MatrixCatalogColumn
              looks={filteredLooks}
              totalMatches={filteredLooks.length}
              gender={gender}
              cultureFilter={cultureFilter}
              setCultureFilter={(c) => {
                setCultureFilter(c);
                setTelemetryTrigger((prev) => prev + 1);
              }}
              selectedOccasion={selectedOccasion}
              setSelectedOccasion={(o) => {
                setSelectedOccasion(o);
                setTelemetryTrigger((prev) => prev + 1);
              }}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectLook={(look) => {
                setSelectedLook(look);
                setIsDetailOpen(true);
              }}
              onSaveLook={(look) => {
                saveLookMutation.mutate(look);
              }}
              savedLookCodes={savedLookCodes}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>

        {/* Bottom Section: Asynchronous Telemetry Streams Console */}
        <section className="w-full mt-2">
          <TelemetryTerminal
            triggerCount={telemetryTrigger}
            activeProfileKey={activeProfileKey}
          />
        </section>
      </main>

      {/* Look Deep-Dive Spec Modal */}
      <LookDetailModal
        look={selectedLook}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedLook(null);
        }}
        onSaveLook={(look) => {
          saveLookMutation.mutate(look);
        }}
        isSaved={selectedLook ? savedLookCodes.has(selectedLook.look_code) : false}
      />

      {/* Saved Wardrobe Modal */}
      <SavedWardrobeModal
        isOpen={isWardrobeOpen}
        onClose={() => setIsWardrobeOpen(false)}
        savedLooks={savedLooksData}
        onDeleteLook={(id, code) => {
          deleteLookMutation.mutate({ id, lookCode: code });
        }}
        onSelectLook={(look) => {
          setSelectedLook(look);
          setIsDetailOpen(true);
        }}
      />
    </div>
  );
}
