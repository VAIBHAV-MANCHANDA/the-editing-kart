import React from 'react';
import { ArrowRight, Box, Clapperboard, Film, Layers3 } from 'lucide-react';
import { motion } from 'motion/react';
import { TabPage } from '../types';

interface StudioMotionStripProps {
  setActiveTab: (tab: TabPage) => void;
}

const assetUrl = (filename: string) => new URL(`../../assets/${filename}`, import.meta.url).href;

const STRIPS = [
  { label: 'Edit Assembly', video: assetUrl('VIDEO EDITING.mp4'), Icon: Clapperboard },
  { label: 'CGI Pass', video: assetUrl('CGI & VFX.mp4'), Icon: Layers3 },
  { label: '3D Render', video: assetUrl('3D(1).mp4'), Icon: Box },
  { label: 'Color Master', video: assetUrl('COLOR GRADING.mp4'), Icon: Film },
];

export default function StudioMotionStrip({ setActiveTab }: StudioMotionStripProps) {
  return (
    <section className="bg-[#0A0A0A] text-white py-16 overflow-hidden" id="animated-studio-flow">
      <div className="section-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-4 space-y-5"
          >
            <span className="t-body text-white/50 uppercase tracking-widest font-semibold block">Studio Flow</span>
            <h2 className="section-title text-white">A moving pipeline from rough cut to final master.</h2>
            <p className="t-body text-white/60 leading-relaxed">
              Every project moves through editorial, visual effects, 3D, and finishing with clear handoffs.
            </p>
            <button onClick={() => setActiveTab('services')} className="btn-primary">
              See Services <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <div className="lg:col-span-8 space-y-4">
            {STRIPS.map(({ label, video, Icon }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: index % 2 === 0 ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5"
              >
                <motion.div
                  animate={{ x: index % 2 === 0 ? ['-4%', '4%', '-4%'] : ['4%', '-4%', '4%'] }}
                  transition={{ duration: 8 + index, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center gap-3 p-3 min-w-[108%]"
                >
                  <div className="w-[180px] sm:w-[220px] flex items-center gap-3 px-3 shrink-0">
                    <span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#0A0A0A]" />
                    </span>
                    <span className="t-body text-white font-semibold">{label}</span>
                  </div>
                  {[0, 1, 2].map(item => (
                    <div key={item} className="w-[190px] sm:w-[220px] aspect-video rounded-xl overflow-hidden border border-white/10 bg-black shrink-0">
                      <video src={video} className="w-full h-full object-cover" muted loop playsInline autoPlay preload="metadata" />
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
