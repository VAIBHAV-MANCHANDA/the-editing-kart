import React, { useEffect, useState } from 'react';
import { TargetCountry, TabPage, CreativePreset } from '../types';
import { COUNTRIES } from '../data';
import { ArrowRight, Layers3, Play, ScanLine, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import StudioScene3D from './StudioScene3D';

interface HeroSectionProps {
  selectedCountry: TargetCountry;
  setActiveTab: (tab: TabPage) => void;
  creativePreset?: CreativePreset;
}

const assetUrl = (filename: string) => new URL(`../../assets/${filename}`, import.meta.url).href;

const HERO_IMAGES = [
  { src: assetUrl('VIDEO EDITING.mp4'), label: 'Video Editing', aspect: 'aspect-[4/5]' },
  { src: assetUrl('3D(1).mp4'), label: '3D', aspect: 'aspect-[3/4]' },
  { src: assetUrl('CGI & VFX.mp4'), label: 'CGI & VFX', aspect: 'aspect-[4/5]' },
  { src: assetUrl('COLOR GRADING.mp4'), label: 'Color Grading', aspect: 'aspect-[3/4]' },
];

const STATS = [
  { value: '48hr', label: 'First Cut SLA'  },
  { value: '6+',   label: 'Regions Served' },
  { value: '100%', label: 'NDA Protected'  },
];

const PIPELINE = [
  { label: 'Brief', icon: ScanLine },
  { label: 'Edit', icon: Layers3 },
  { label: 'Master', icon: Sparkles },
];

const HEADLINES: Record<CreativePreset, string> = {
  precision: 'Refined edits built for brands that value attention.',
  soft: 'Elegant films with warmth, rhythm, and quiet confidence.',
  premium: 'High-end CGI and post-production shaped with restraint.',
  documentary: 'Grounded stories edited with clarity and care.',
};

const SUBLINES: Record<CreativePreset, string> = {
  precision: 'Sharp pacing, polished VFX, and cinematic color for content that feels deliberate.',
  soft: 'Warm grading, measured motion, and thoughtful sound design for brands that want to feel composed.',
  premium: 'Detailed CGI, rich textures, and careful finishing for campaigns with a premium presence.',
  documentary: 'Natural texture, clean structure, and believable sound for stories that need trust.',
};

export default function HeroSection({ selectedCountry, setActiveTab, creativePreset = 'precision' }: HeroSectionProps) {
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* Left: Text */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="lg:col-span-5 space-y-8">

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
              {HEADLINES[creativePreset]}
            </h1>

            {/* Sub — body size */}
            <p className="t-body text-[#888888] leading-relaxed">
              {SUBLINES[creativePreset]}{' '}
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

            <div className="grid grid-cols-3 gap-3">
              {PIPELINE.map(({ label, icon: Icon }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 + index * 0.08 }}
                  className="border border-[#E5E5E5] bg-[#F7F7F7] rounded-xl p-3"
                >
                  <Icon className="w-4 h-4 text-[#0A0A0A] mb-2" />
                  <span className="t-body text-[#444444] font-semibold block">{label}</span>
                </motion.div>
              ))}
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

          {/* Right: animated 3D studio stage */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 relative min-h-[440px] lg:min-h-[620px]"
            style={{ perspective: '1200px' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <StudioScene3D className="w-full h-full min-h-[440px] lg:min-h-[620px]" activeTone={creativePreset} />
            </div>

            <motion.div
              animate={{ y: [0, -12, 0], rotateZ: [0, -1.5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-4 left-0 w-[46%] max-w-[260px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="pin-card overflow-hidden aspect-[4/5]">
                <video src={HERO_IMAGES[0].src} className="w-full h-full object-cover" muted loop playsInline autoPlay preload="metadata" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 14, 0], rotateZ: [0, 1.5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-14 right-0 w-[42%] max-w-[230px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="pin-card overflow-hidden aspect-[3/4]">
                <video src={HERO_IMAGES[1].src} className="w-full h-full object-cover" muted loop playsInline autoPlay preload="metadata" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0], rotateZ: [0, 1.2, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-0 left-[12%] w-[40%] max-w-[220px]"
            >
              <div className="pin-card overflow-hidden aspect-[4/3]">
                <video src={HERO_IMAGES[2].src} className="w-full h-full object-cover" muted loop playsInline autoPlay preload="metadata" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 11, 0], rotateZ: [0, -1.2, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-10 right-[10%] w-[38%] max-w-[210px]"
            >
              <div className="pin-card overflow-hidden aspect-[4/5]">
                <video src={HERO_IMAGES[3].src} className="w-full h-full object-cover" muted loop playsInline autoPlay preload="metadata" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="absolute left-1/2 top-1/2 w-[48%] max-w-[300px] -translate-x-1/2 -translate-y-1/2"
            >
              <button onClick={() => setActiveTab('portfolio')} className="btn-primary w-full justify-center shadow-[0_16px_48px_rgba(0,0,0,0.18)]">
                Explore the Studio <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            <div className="absolute inset-x-0 bottom-2 flex justify-center">
              <div className="inline-flex items-center gap-2 bg-white/90 border border-[#E5E5E5] rounded-full px-4 py-2 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD600] opacity-70" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD600]" />
                </span>
                <span className="t-body font-medium text-[#444444]">Live 3D post-production pipeline</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
