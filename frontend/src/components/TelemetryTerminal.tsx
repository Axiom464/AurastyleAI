import React, { useEffect, useState, useRef } from 'react';
import { Terminal, Cpu, Activity, CheckCircle2, ShieldCheck, Copy, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TelemetryTerminalProps {
  triggerCount: number;
  activeProfileKey: string;
}

const TRACE_LINES = [
  "[Webcam Hardware] Stream initialization verified. Ingesting video frames array tokens...",
  "[Routing Agent] Compiling multi-variable matrix composite key index vector...",
  "[Retrieval Agent] Executing automated context search inside 144-outfit Vector Knowledge Base...",
  "[Critique Agent] Running style-to-geometry structural constraint validation filters...",
  "[SUCCESS] Output payload compliance verified. Dynamic look cards pushed to Catalogue Viewport."
];

export const TelemetryTerminal: React.FC<TelemetryTerminalProps> = ({
  triggerCount,
  activeProfileKey
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentTypingLine, setCurrentTypingLine] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  // Trigger typing simulation when triggerCount changes
  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    setLogs([]);
    setCurrentTypingLine('');
    setIsStreaming(true);

    const stepDelay = 400; // ms between lines
    const charDelay = 12; // ms per character typing

    TRACE_LINES.forEach((fullLine, lineIndex) => {
      const lineStartTimeout = setTimeout(() => {
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex <= fullLine.length) {
            setCurrentTypingLine(fullLine.substring(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typeInterval);
            setLogs((prev) => [...prev, fullLine]);
            setCurrentTypingLine('');
            if (lineIndex === TRACE_LINES.length - 1) {
              setIsStreaming(false);
            }
          }
        }, charDelay);
      }, lineIndex * (stepDelay + fullLine.length * charDelay));

      timeouts.push(lineStartTimeout);
    });

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [triggerCount]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, currentTypingLine]);

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(logs.join('\n'));
    toast.success("Telemetry logs copied to clipboard");
  };

  const handleClearLogs = () => {
    setLogs([]);
    setCurrentTypingLine('');
  };

  return (
    <div
      data-testid="telemetry-terminal-container"
      className="w-full glass-panel-glow rounded-2xl p-4 sm:p-5 border border-emerald-500/30 flex flex-col gap-3 font-mono text-xs shadow-2xl relative overflow-hidden"
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-emerald-300 tracking-wider">
              ASYNCHRONOUS TELEMETRY TRACING ENGINE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            data-testid="telemetry-status-badge"
            variant="outline"
            className={`border-emerald-500/40 text-[10px] uppercase font-mono px-2 py-0.5 ${
              isStreaming
                ? 'text-amber-400 bg-amber-950/40 border-amber-500/40 animate-pulse'
                : 'text-emerald-400 bg-emerald-950/50'
            }`}
          >
            {isStreaming ? 'STREAMING TRACE...' : 'COMPLIANCE VERIFIED'}
          </Badge>

          <span className="text-slate-500 text-[10px] hidden sm:inline">
            KEY: <span className="text-emerald-400">{activeProfileKey.toUpperCase()}</span>
          </span>

          <Button
            data-testid="copy-telemetry-button"
            variant="ghost"
            size="icon-xs"
            onClick={handleCopyLogs}
            title="Copy Logs"
            className="text-slate-400 hover:text-emerald-300"
          >
            <Copy className="w-3.5 h-3.5" />
          </Button>

          <Button
            data-testid="clear-telemetry-button"
            variant="ghost"
            size="icon-xs"
            onClick={handleClearLogs}
            title="Clear Console"
            className="text-slate-400 hover:text-red-400"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Terminal Log Output Window */}
      <div
        data-testid="telemetry-log-output"
        className="bg-black/95 rounded-xl p-4 min-h-[140px] max-h-[190px] overflow-y-auto border border-emerald-500/20 text-[11px] leading-relaxed flex flex-col gap-1.5 shadow-inner"
      >
        <div className="text-slate-600 select-none pb-1 border-b border-slate-900">
          --- AuraStyle Matrix Telemetry Channel v3.8 [Online / Buffer OK] ---
        </div>

        {logs.map((log, index) => {
          const isSuccess = log.startsWith("[SUCCESS]");
          return (
            <div
              key={index}
              data-testid={`telemetry-log-line-${index}`}
              className={`flex items-start gap-2 ${
                isSuccess ? 'text-emerald-300 font-bold' : 'text-emerald-400/90'
              }`}
            >
              <span className="text-emerald-700 select-none">&gt;</span>
              <span>{log}</span>
            </div>
          );
        })}

        {currentTypingLine && (
          <div
            data-testid="telemetry-typing-line"
            className="flex items-start gap-2 text-emerald-300"
          >
            <span className="text-emerald-700 select-none">&gt;</span>
            <span>
              {currentTypingLine}
              <span className="inline-block w-2 h-3.5 bg-emerald-400 ml-1 animate-pulse align-middle" />
            </span>
          </div>
        )}

        {!isStreaming && logs.length === 0 && !currentTypingLine && (
          <div className="text-slate-500 italic py-2">
            Terminal idle. Trigger a camera scan or adjust biometric sliders to generate telemetry vectors.
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
