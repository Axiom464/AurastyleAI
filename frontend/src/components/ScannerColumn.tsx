import React, { useRef, useState, useEffect } from 'react';
import {
  Camera,
  CameraOff,
  Scan,
  RefreshCcw,
  Sparkles,
  Sliders,
  CheckCircle2,
  Cpu,
  User,
  Zap,
  Glasses,
  Scissors,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { FacialMetrics } from '@/types/fashion';

interface ScannerColumnProps {
  skin: string;
  setSkin: (v: string) => void;
  body: string;
  setBody: (v: string) => void;
  hair: string;
  setHair: (v: string) => void;
  faceShape: string;
  setFaceShape: (v: string) => void;
  gender: 'male' | 'female';
  facialMetrics: FacialMetrics;
  onExecuteScan: () => void;
  isScanning: boolean;
}

export const ScannerColumn: React.FC<ScannerColumnProps> = ({
  skin,
  setSkin,
  body,
  setBody,
  hair,
  setHair,
  faceShape,
  setFaceShape,
  gender,
  facialMetrics,
  onExecuteScan,
  isScanning
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [streamActive, setStreamActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [frozenFrame, setFrozenFrame] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  // Start Camera Stream
  const startCamera = async () => {
    try {
      setCameraError(null);
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode,
            width: { ideal: 640 },
            height: { ideal: 480 }
          },
          audio: false
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((err) => {
            console.warn("Video play error:", err);
          });
        }
        setStreamActive(true);
        setFrozenFrame(null);
      } else {
        setCameraError("Webcam hardware API not supported in this browser. Running in simulated neural mode.");
      }
    } catch (err: any) {
      console.warn("Camera access request error:", err);
      setCameraError(err.message || "Camera permission denied or camera device in use. Using High-Definition Neural Synthesizer.");
      setStreamActive(false);
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
  };

  // Switch Camera Front/Back
  const toggleFacingMode = () => {
    stopCamera();
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  // Automatically handle scan execution: starts camera if needed, plays 2.5s scan animation, freezes frame
  const handleScanClick = async () => {
    if (!streamActive) {
      await startCamera();
    }
    setFrozenFrame(null);
    onExecuteScan();

    // After 2.5 seconds, freeze frame by capturing canvas from video
    setTimeout(() => {
      if (videoRef.current && streamActive && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setFrozenFrame(dataUrl);
        }
      }
    }, 2500);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Viewfinder & Hardware Capture Box */}
      <div
        data-testid="scanner-viewfinder-container"
        className="glass-panel-glow rounded-2xl p-4 sm:p-5 flex flex-col gap-4 hud-corner relative overflow-hidden"
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  streamActive ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  streamActive ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              ></span>
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 font-bold">
              {streamActive ? 'NEURAL SENSOR LIVE' : 'SENSOR STANDBY'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {streamActive ? (
              <Button
                data-testid="toggle-camera-stop-button"
                variant="ghost"
                size="icon-xs"
                onClick={stopCamera}
                title="Stop Live Feed"
                className="text-slate-400 hover:text-red-400 hover:bg-red-950/30"
              >
                <CameraOff className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button
                data-testid="toggle-camera-start-button"
                variant="ghost"
                size="icon-xs"
                onClick={startCamera}
                title="Start Webcam"
                className="text-emerald-400 hover:bg-emerald-950/40"
              >
                <Camera className="w-3.5 h-3.5" />
              </Button>
            )}

            <Button
              data-testid="flip-camera-button"
              variant="ghost"
              size="icon-xs"
              onClick={toggleFacingMode}
              title="Flip Facing Camera"
              className="text-slate-400 hover:text-emerald-300 hover:bg-emerald-950/40"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Viewfinder Screen (HTML5 Video & Canvas) */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/90 border border-emerald-500/30 shadow-inner flex items-center justify-center">
          {/* Active HTML5 Video Element */}
          <video
            ref={videoRef}
            data-testid="webcam-video-feed"
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              streamActive && !frozenFrame ? 'opacity-100' : 'opacity-0 absolute'
            } ${facingMode === 'user' ? '-scale-x-100' : ''}`}
          />

          {/* Frozen Canvas Frame Simulation after Scan */}
          {frozenFrame && (
            <img
              src={frozenFrame}
              alt="Frozen Scan Vector Frame"
              data-testid="frozen-scan-frame"
              className={`w-full h-full object-cover absolute inset-0 ${facingMode === 'user' ? '-scale-x-100' : ''}`}
            />
          )}

          {/* Fallback Simulation UI when Camera is Offline */}
          {!streamActive && !frozenFrame && (
            <div
              data-testid="simulated-viewfinder-screen"
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-950/80 via-emerald-950/30 to-slate-950/90"
            >
              <div className="w-16 h-16 rounded-full border border-emerald-500/40 flex items-center justify-center mb-3 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Camera className="w-8 h-8 text-emerald-400 animate-pulse" />
              </div>
              <p className="text-sm font-semibold text-emerald-300">Aura Camera Ready</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
                Click <span className="text-emerald-400 font-bold">"EXECUTE IMAGE SCAN"</span> to initialize live stream &amp; ingest biometric tokens.
              </p>
              {cameraError && (
                <p className="text-[11px] text-amber-400/90 bg-amber-950/40 border border-amber-500/30 px-2 py-1 rounded mt-2 max-w-[260px]">
                  {cameraError}
                </p>
              )}
            </div>
          )}

          {/* Hidden Canvas for vector snapshotting */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Real-time Facial Landmark Mesh HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Target Reticle */}
            <div className="relative w-48 h-56 border border-emerald-400/40 rounded-full flex items-center justify-center">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>

              {/* Landmark points */}
              <div className="absolute top-14 left-12 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]"></div>
              <div className="absolute top-14 right-12 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]"></div>
              <div className="absolute top-24 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#06b6d4]"></div>
              <div className="absolute bottom-16 w-3 h-0.5 bg-emerald-400/70"></div>
              <div className="absolute bottom-8 w-6 h-0.5 border-b border-emerald-400/80"></div>

              {/* Facial Geometry Tag */}
              <div className="absolute -top-6 bg-slate-950/90 border border-emerald-500/60 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-300 shadow">
                FACE: {faceShape.toUpperCase()} [{facialMetrics.jawline_angle}]
              </div>

              {/* Undertone Tag */}
              <div className="absolute -bottom-6 bg-slate-950/90 border border-emerald-500/60 px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 shadow">
                UNDERTONE: {facialMetrics.undertone.toUpperCase()}
              </div>
            </div>

            {/* Radar Lines */}
            <div className="absolute inset-0 border border-emerald-500/10 grid grid-cols-3 grid-rows-3"></div>
          </div>

          {/* 2.5s Pulsing Emerald Neon Overlay Scan-Bar Animation */}
          {isScanning && (
            <div
              data-testid="laser-scan-overlay"
              className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
            >
              <div className="w-full h-1 bg-emerald-400 shadow-[0_0_20px_#10b981,0_0_40px_#10b981] animate-laser absolute"></div>
              <div className="absolute inset-0 bg-emerald-500/10 animate-pulse"></div>
              <div className="absolute top-4 left-4 text-[11px] font-mono text-emerald-300 bg-slate-950/90 border border-emerald-400 px-2 py-1 rounded">
                [AI VECTOR SCAN IN PROGRESS...]
              </div>
            </div>
          )}

          {/* Scan Frozen Badge */}
          {frozenFrame && !isScanning && (
            <div className="absolute top-3 right-3 bg-emerald-950/90 border border-emerald-400/80 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 shadow">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>VECTOR CAPTURED</span>
            </div>
          )}
        </div>

        {/* Action Button: EXECUTE IMAGE SCAN */}
        <Button
          data-testid="execute-scan-button"
          onClick={handleScanClick}
          disabled={isScanning}
          className="w-full py-6 text-sm sm:text-base font-extrabold uppercase tracking-wider bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-black shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          {isScanning ? (
            <>
              <RefreshCcw className="w-5 h-5 animate-spin text-black" />
              <span>Scanning Biometric Geometry...</span>
            </>
          ) : (
            <>
              <Scan className="w-5 h-5 text-black" />
              <span>EXECUTE IMAGE SCAN</span>
            </>
          )}
        </Button>
      </div>

      {/* Facial Geometry & Accessory Intelligence HUD Card */}
      <div
        data-testid="facial-geometry-hud-card"
        className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 border border-emerald-500/25"
      >
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-heading">
              Facial Geometry &amp; Accessory Match
            </h3>
          </div>
          <Badge
            variant="outline"
            className="border-emerald-500/40 text-emerald-400 text-[10px] font-mono bg-emerald-950/40"
          >
            SYMMETRY: {facialMetrics.symmetry_score}%
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="bg-slate-950/70 border border-emerald-500/15 p-2.5 rounded-lg">
            <span className="text-[10px] text-slate-400 uppercase block font-mono">Face Geometry</span>
            <span
              data-testid="detected-face-shape-value"
              className="font-bold text-white text-sm capitalize"
            >
              {facialMetrics.face_shape}
            </span>
            <span className="text-[11px] text-emerald-400 block mt-0.5">{facialMetrics.jawline_angle}</span>
          </div>

          <div className="bg-slate-950/70 border border-emerald-500/15 p-2.5 rounded-lg">
            <span className="text-[10px] text-slate-400 uppercase block font-mono">Skin Undertone</span>
            <span
              data-testid="detected-undertone-value"
              className="font-bold text-white text-sm"
            >
              {facialMetrics.undertone}
            </span>
            <span className="text-[11px] text-slate-300 block mt-0.5">{facialMetrics.skin_tone} Profile</span>
          </div>
        </div>

        {/* Eyewear Suggestion */}
        <div className="bg-slate-950/70 border border-emerald-500/15 p-2.5 rounded-lg text-xs">
          <div className="flex items-center gap-1.5 text-emerald-300 font-semibold mb-1">
            <Glasses className="w-3.5 h-3.5 text-emerald-400" />
            <span>Optics &amp; Eyewear Geometry</span>
          </div>
          <p
            data-testid="eyewear-recommendation-text"
            className="text-slate-300 text-[11px] leading-relaxed"
          >
            {facialMetrics.eyewear_recommendation}
          </p>
        </div>

        {/* Precious Metal Harmony */}
        <div className="bg-slate-950/70 border border-emerald-500/15 p-2.5 rounded-lg text-xs">
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Precious Metal Harmony</span>
          </div>
          <p
            data-testid="metal-harmony-text"
            className="text-slate-300 text-[11px] leading-relaxed"
          >
            {facialMetrics.metal_harmony}
          </p>
        </div>

        {/* Grooming Advice */}
        <div className="bg-slate-950/70 border border-emerald-500/15 p-2.5 rounded-lg text-xs">
          <div className="flex items-center gap-1.5 text-cyan-300 font-semibold mb-1">
            <Scissors className="w-3.5 h-3.5 text-cyan-400" />
            <span>Hairstyle &amp; Grooming Architecture</span>
          </div>
          <p
            data-testid="grooming-advice-text"
            className="text-slate-300 text-[11px] leading-relaxed"
          >
            {facialMetrics.grooming_advice}
          </p>
        </div>
      </div>

      {/* Procedural Modifier Parameters (Relational Look Filters) */}
      <div
        data-testid="procedural-modifiers-card"
        className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-col gap-4 border border-emerald-500/20"
      >
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-heading">
              Biometric Profile Modifiers
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">36 Base × 4 Variations</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Skin Tone Selector */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
              Skin Tone (3)
            </Label>
            <Select value={skin} onValueChange={(val: string) => setSkin(val)}>
              <SelectTrigger
                data-testid="select-skin-tone"
                className="bg-slate-950 border-emerald-500/30 text-xs text-emerald-200"
              >
                <SelectValue>{(val) => (val ? (val as string).toUpperCase() : 'SELECT')}</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-slate-950 border-emerald-500/40 text-slate-200">
                <SelectItem value="fair">FAIR / COOL</SelectItem>
                <SelectItem value="olive">OLIVE / WARM</SelectItem>
                <SelectItem value="deep">DEEP / RICH</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Body Build Selector */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
              Body Build (3)
            </Label>
            <Select value={body} onValueChange={(val: string) => setBody(val)}>
              <SelectTrigger
                data-testid="select-body-type"
                className="bg-slate-950 border-emerald-500/30 text-xs text-emerald-200"
              >
                <SelectValue>{(val) => (val ? (val as string).toUpperCase() : 'SELECT')}</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-slate-950 border-emerald-500/40 text-slate-200">
                <SelectItem value="athletic">ATHLETIC / SLIM</SelectItem>
                <SelectItem value="muscular">MUSCULAR / BROAD</SelectItem>
                <SelectItem value="soft">SOFT / RELAXED</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hair Style Selector */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
              Hair Aesthetic (4)
            </Label>
            <Select value={hair} onValueChange={(val: string) => setHair(val)}>
              <SelectTrigger
                data-testid="select-hair-style"
                className="bg-slate-950 border-emerald-500/30 text-xs text-emerald-200"
              >
                <SelectValue>{(val) => (val ? (val as string).toUpperCase() : 'SELECT')}</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-slate-950 border-emerald-500/40 text-slate-200">
                <SelectItem value="short">BUZZ / SHORT</SelectItem>
                <SelectItem value="textured">TEXTURED / CROP</SelectItem>
                <SelectItem value="long">LONG / FLOWING</SelectItem>
                <SelectItem value="curly">CURLY / WAVY</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Face Geometry Selector */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
              Face Shape (4)
            </Label>
            <Select value={faceShape} onValueChange={(val: string) => setFaceShape(val)}>
              <SelectTrigger
                data-testid="select-face-shape"
                className="bg-slate-950 border-emerald-500/30 text-xs text-emerald-200"
              >
                <SelectValue>{(val) => (val ? (val as string).toUpperCase() : 'SELECT')}</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-slate-950 border-emerald-500/40 text-slate-200">
                <SelectItem value="oval">OVAL (BALANCED)</SelectItem>
                <SelectItem value="square">SQUARE (ANGULAR)</SelectItem>
                <SelectItem value="heart">HEART (DEFINED)</SelectItem>
                <SelectItem value="diamond">DIAMOND (CHEEK)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
