import React, { useState } from 'react';
import { TargetCountry, PortfolioItem, CreativePreset } from '../types';
import { COUNTRIES, PORTFOLIO_ITEMS } from '../data';
import { X, Clock, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PortfolioSectionProps {
  selectedCountry: TargetCountry;
  creativePreset?: CreativePreset;
}

const HEIGHTS = ['aspect-[4/5]', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/5]'];

export default function PortfolioSection({ selectedCountry }: PortfolioSectionProps) {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const country = COUNTRIES[selectedCountry];

  const formatVal = (val: string) =>
    val.includes('US$') ? `${country.currencySymbol}${Math.round(120000 * country.rateMultiplier / 1000)}k` : val;

  const filteredItems = PORTFOLIO_ITEMS.filter(item => filter === 'all' || item.category === filter);

  const filters = [
    { id: 'all', label: 'All' },
    ...Array.from(new Set(PORTFOLIO_ITEMS.map(item => item.category))).map(category => ({
      id: category,
      label: category,
    })),
  ];

  return (
    <section className="py-20" id="portfolio-container-section">
      <div className="section-wrap">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-lg">
            <span className="section-kicker block">Selected Works</span>
            <h2 className="section-title">Work that <em>proves</em> the craft.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f.id}
                id={`btn-filter-${f.id}`}
                onClick={() => setFilter(f.id)}
                className={`t-body px-4 py-2 rounded-full border transition-all font-medium ${
                  filter === f.id
                    ? 'bg-[#FFD600] text-[#0A0A0A] border-[#FFD600]'
                    : 'bg-white text-[#888888] border-[#E5E5E5] hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid" id="portfolio-grid-items">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="masonry-item"
              >
                <div id={`portfolio-card-${item.id}`} className="pin-card cursor-pointer group" onClick={() => setSelectedProject(item)}>
                  <div className={`${HEIGHTS[index % HEIGHTS.length]} relative overflow-hidden`}>
                    <video
                      src={item.videoSrc}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={event => event.currentTarget.play().catch(() => undefined)}
                      onMouseLeave={event => {
                        event.currentTarget.pause();
                        event.currentTarget.currentTime = 0;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                    <span className="pill pill-dark absolute top-3 left-3">{item.category}</span>
                    <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-[#0A0A0A] flex items-center justify-center shadow-sm">
                      <Play className="w-4 h-4 fill-current" />
                    </span>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="t-display font-serif font-bold text-white block">{formatVal(item.stats.value)}</span>
                      <span className="t-body text-white/80 font-medium block">{item.stats.label}</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="t-body text-[#888888] font-medium block">{item.client}</span>
                    <h3 className="t-body font-semibold text-[#0A0A0A] leading-snug line-clamp-2">{item.title}</h3>
                    <div className="flex items-center gap-1.5 t-body text-[#888888]">
                      <Clock className="w-3 h-3" /><span>{item.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="case-study-modal-overlay">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 16 }}
                className="relative bg-white rounded-2xl max-w-2xl w-full mx-auto overflow-hidden shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
              >
                {/* Modal header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
                  <div className="flex items-center gap-2">
                    <span className="pill pill-dark">{selectedProject.category}</span>
                    <span className="t-body text-[#888888]">{selectedProject.client}</span>
                  </div>
                  <button id="btn-close-modal" onClick={() => setSelectedProject(null)} className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:bg-[#F7F7F7] transition-colors">
                    <X className="w-4 h-4 text-[#444444]" />
                  </button>
                </div>

                {/* Hero video */}
                <div className="aspect-video relative bg-black">
                  <video
                    key={selectedProject.id}
                    src={selectedProject.videoSrc}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 p-6">
                    <h2 className="t-display font-serif font-bold text-white">{selectedProject.title}</h2>
                    <span className="t-body text-white/70 block mt-1">{selectedProject.location}</span>
                  </div>
                </div>

                {/* Meta grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 py-4 bg-[#F7F7F7] border-b border-[#E5E5E5]">
                  {[
                    { label: 'Category', value: selectedProject.category },
                    { label: 'Location', value: selectedProject.location },
                    { label: 'KPI',      value: formatVal(selectedProject.stats.value), bold: true },
                    { label: 'Metric',   value: selectedProject.stats.label },
                  ].map(m => (
                    <div key={m.label}>
                      <span className="t-body text-[#888888] uppercase tracking-wider block">{m.label}</span>
                      <span className={`t-body block mt-0.5 ${m.bold ? 'font-bold text-[#0A0A0A]' : 'font-semibold text-[#444444]'}`}>{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Body */}
                <div className="px-6 py-6 space-y-5">
                  <div>
                    <h4 className="t-body font-semibold text-[#888888] uppercase tracking-wider mb-2">The Challenge</h4>
                    <p className="t-body text-[#444444] leading-relaxed">{selectedProject.challenges}</p>
                  </div>
                  <div>
                    <h4 className="t-body font-semibold text-[#888888] uppercase tracking-wider mb-2">Deliverables</h4>
                    <p className="t-body text-[#444444] leading-relaxed pl-4 border-l-2 border-[#E5E5E5]">{selectedProject.deliverableText}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex items-center justify-between gap-4 flex-wrap">
                  <span className="t-body text-[#888888]">Active hours synced to {country.name}</span>
                  <button
                    id="modal-order-sim"
                    onClick={() => { setSelectedProject(null); (document.getElementById('nav-item-contact') as HTMLButtonElement | null)?.click(); }}
                    className="btn-primary"
                  >
                    Discuss this project
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
