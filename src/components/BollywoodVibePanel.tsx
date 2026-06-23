import React from 'react';
import { BollywoodPreset } from '../types';
import { Flame, Heart, Crown, Skull } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BollywoodVibePanelProps {
  currentPreset: BollywoodPreset;
  onPresetChange: (preset: BollywoodPreset) => void;
}

const PRESETS: { id: BollywoodPreset; label: string; Icon: React.ElementType }[] = [
  { id: 'dhamaka', label: 'Dhamaka Action', Icon: Flame },
  { id: 'romance', label: 'Dream Romance',  Icon: Heart },
  { id: 'royal',   label: 'Shahi Grandeur', Icon: Crown },
  { id: 'gritty',  label: 'Gritty Realism', Icon: Skull },
];

const DIALOGUES: Record<BollywoodPreset, string> = {
  dhamaka: '💥 "Singham Entry active — bass impact at 100%!"',
  romance: '🌸 "Wind machine on level 9. Swiss pastel grading enabled."',
  royal:   '👑 "Shahi durbar CGI set. Majestic lens filter on."',
  gritty:  '🔪 "180° shutter, raw grain, uncensored foley. Cut!"',
};

export default function BollywoodVibePanel({ currentPreset, onPresetChange }: BollywoodVibePanelProps) {
  return (
    <div className="bg-[#F7F7F7] border-b border-[#E5E5E5] py-4 px-4" id="bollywood-lens-control-panel">
      <div className="section-wrap">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">

          {/* Label */}
          <div className="shrink-0 space-y-0.5">
            <div className="t-body font-semibold text-[#0A0A0A] uppercase tracking-widest">Director Mode</div>
            <div className="t-body text-[#888888]">Switch editing style</div>
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
              {DIALOGUES[currentPreset]}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
