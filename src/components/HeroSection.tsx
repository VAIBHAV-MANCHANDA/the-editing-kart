import React, { useEffect, useState } from 'react';
import { TargetCountry, TabPage, BollywoodPreset } from '../types';
import { COUNTRIES } from '../data';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  selectedCountry: TargetCountry;
  setActiveTab: (tab: TabPage) => void;
  bollywoodPreset?: BollywoodPreset;
}

const HERO_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600', label: 'Video Edit',  aspect: 'aspect-[4/5]' },
  { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600', label: '3D Render',   aspect: 'aspect-[3/4]' },
  { src: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=600', label: 'CGI / VFX',  aspect: 'aspect-[4/5]' },
  { src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600', label: 'Motion',      aspect: 'aspect-[3/4]' },
];

const STATS = [
  { value: '48hr', label: 'First Cut SLA'  },
  { value: '6+',   label: 'Regions Served' },
  { value: '100%', label: 'NDA Protected'  },
];

const HEADLINES: Record<BollywoodPreset, string> = {
  dhamaka: 'High-voltage edits that grip audiences worldwide.',
  romance: 'Dream sequences that melt millions of hearts.',
  royal:   'Grand operatic spectacles crafted frame by frame.',
  gritty:  'Raw, unfiltered storytelling cut with precision.',
};

const SUBLINES: Record<BollywoodPreset, string> = {
  dhamaka: 'Explosive pacing, photorealistic VFX, and cinematic color — content that converts.',
  romance: 'Dreamy slow-motion, warm grading, emotional sound design — built for brands that want to be felt.',
  royal:   'Symmetrical CGI sets, rich textures, and orchestral depth — campaigns that command attention.',
  gritty:  'Authentic grain, contrast-heavy tones, raw foley — for stories that demand to be believed.',
};

export default function HeroSection({ selectedCountry, setActiveTab, bollywoodPreset = 'dhamaka' }: HeroSectionProps) {
  const country = COUNTRIES[selectedCountry];
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const tzMap: Record<TargetCountry, string> = {
      usa: 'America/New_York', uk: 'Europe/London', europe: 'Europe/Berlin',
      canada: 'America/Toronto', australia: 'Australia/Sydney', newzealand: 'Pacific/Auckland',
    };
    const update = () => {
      try {
        setLocalTime(new Intl.DateTimeFormat('en-US', {
          timeZone: tzMap[selectedCountry], hour: '2-digit', minute: '2-digit', hour12: true,
        }).format(new Date()));
      } catch { setLocalTime(''); }
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, [selectedCountry]);

  return (
    <section className="bg-white pt-14 pb-20 overflow-hidden">
      <div className="section-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="space-y-8">

            {/* Live badge */}
            <div className="inline-flex items-center gap-2 border border-[#E5E5E5] rounded-full px-4 py-2 bg-[#F7F7F7]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0A0A0A] opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0A0A0A]" />
              </span>
              <span className="t-body font-medium text-[#444444]">{country.flag} {country.name} · {localTime}</span>
            </div>

            {/* Headline — display size */}
            <h1 className="t-display font-serif font-bold text-[#0A0A0A] leading-tight">
              {HEADLINES[bollywoodPreset]}
            </h1>

            {/* Sub — body size */}
            <p className="t-body text-[#888888] leading-relaxed">
              {SUBLINES[bollywoodPreset]}{' '}
              <strong className="text-[#0A0A0A] font-semibold">The Editing Kart</strong> is your remote post-production partner.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button onClick={() => setActiveTab('contact')} className="btn-primary">
                Start a Project <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => setActiveTab('portfolio')} className="btn-ghost">
                <Play className="w-4 h-4" /> View Showreel
              </button>
            </div>

            {/* Stats — body size labels, display size numbers */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-[#E5E5E5]">
              {STATS.map(s => (
                <div key={s.value}>
                  <span className="t-display font-serif font-bold text-[#0A0A0A] block">{s.value}</span>
                  <span className="t-body text-[#888888] uppercase tracking-widest font-medium block">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Masonry image grid */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="hidden lg:grid grid-cols-2 gap-4">
            {HERO_IMAGES.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className={`pin-card overflow-hidden ${img.aspect} ${i % 2 === 1 ? 'mt-6' : ''}`}
              >
                <div className="relative w-full h-full group cursor-pointer" onClick={() => setActiveTab('portfolio')}>
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-3">
                    <span className="t-body font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 px-2.5 py-1 rounded-full">
                      {img.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
