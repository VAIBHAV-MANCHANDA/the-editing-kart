import React from 'react';
import { CreativePreset } from '../types';
import { Aperture, AudioLines, Layers3, ScanLine } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CreativeDirectionPanelProps {
  currentPreset: CreativePreset;
  onPresetChange: (preset: CreativePreset) => void;
}

const PRESETS: { id: CreativePreset; label: string; Icon: React.ElementType }[] = [
  { id: 'precision',   label: 'Precision Cut',    Icon: ScanLine },
  { id: 'soft',        label: 'Soft Editorial',   Icon: Aperture },
  { id: 'premium',     label: 'Premium CGI',      Icon: Layers3 },
  { id: 'documentary', label: 'Documentary Tone', Icon: AudioLines },
];

const DIRECTION_NOTES: Record<CreativePreset, string> = {
  precision: 'Tight pacing, clean hooks, and controlled sound impact.',
  soft: 'Warm grade, measured motion, and elegant visual restraint.',
  premium: 'Detailed CGI, composed frames, and refined finishing.',
  documentary: 'Natural texture, honest rhythm, and grounded sound design.',
};

export default function CreativeDirectionPanel({ currentPreset, onPresetChange }: CreativeDirectionPanelProps) {
  return (
    <div className="bg-[#F7F7F7] border-b border-[#E5E5E5] py-4 px-4" id="creative-direction-control-panel">
      <div className="section-wrap">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">

          {/* Label */}
          <div className="shrink-0 space-y-0.5">
            <div className="t-body font-semibold text-[#0A0A0A] uppercase tracking-widest">Creative Direction</div>
            <div className="t-body text-[#888888]">Choose the finishing tone</div>
          </div>

          {/* Preset pills */}
          <div className="flex flex-wrap gap-2 flex-1">
            {PRESETS.map(({ id, label, Icon }) => {
              const isActive = currentPreset === id;
              return (
                <button
                  key={id}
                  onClick={() => onPresetChange(id)}
                  className={`t-body flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer font-medium ${
                    isActive
                      ? 'bg-[#FFD600] text-[#0A0A0A] border-[#FFD600]'
                      : 'bg-white text-[#888888] border-[#E5E5E5] hover:border-[#BBBBBB] hover:text-[#0A0A0A]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />{label}
                </button>
              );
            })}
          </div>

          {/* Dialogue */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPreset}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="shrink-0 hidden lg:block max-w-xs t-body text-[#888888] italic text-right leading-snug"
            >
              {DIRECTION_NOTES[currentPreset]}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
