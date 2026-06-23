import React, { useState } from 'react';
import { TargetCountry, TabPage, BollywoodPreset } from '../types';
import { COUNTRIES, SERVICE_DETAILS_DATA } from '../data';
import { Sliders, Grid, Layers, CheckCircle, Cpu, Command, Scissors, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesSectionProps {
  selectedCountry: TargetCountry;
  setActiveTab: (tab: TabPage) => void;
  bollywoodPreset?: BollywoodPreset;
}

type ServiceTab = 'video' | '3d' | 'cgi';

export default function ServicesSection({ selectedCountry, setActiveTab }: ServicesSectionProps) {
  const [activeService, setActiveService] = useState<ServiceTab>('video');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isC3dWireframe, setIsC3dWireframe] = useState(false);
  const [vfxLayers, setVfxLayers] = useState({ chromakeyedActor: true, hologramTech: true, neonHighlights: true, rainMist: true });

  const country = COUNTRIES[selectedCountry];
  const data = SERVICE_DETAILS_DATA[activeService];
  const basePrices: Record<ServiceTab, number> = { video: 350, '3d': 750, cgi: 950 };

  const tabs: { id: ServiceTab; label: string; icon: React.ReactNode }[] = [
    { id: 'video', label: 'Video Editing', icon: <Scissors className="w-4 h-4" /> },
    { id: '3d',    label: '3D Rendering',  icon: <Cpu className="w-4 h-4" /> },
    { id: 'cgi',   label: 'CGI & VFX',     icon: <Layers className="w-4 h-4" /> },
  ];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setSliderPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <section className="py-24 bg-white" id="services-parent">
      <div className="section-wrap">

        {/* Header */}
        <div className="max-w-2xl mb-14 space-y-4">
          <span className="section-kicker block">Our Specializations</span>
          <h2 className="section-title">Craft that turns <em>vision</em> into finished film.</h2>
          <p className="t-body text-[#888888]">Three precise disciplines — click a tab to explore and interact with our studio demos.</p>
        </div>

        {/* Service tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {tabs.map(tab => {
            const isActive = activeService === tab.id;
            return (
              <button
                key={tab.id}
                id={`btn-service-${tab.id}`}
                onClick={() => setActiveService(tab.id)}
                className={`t-body flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-200 font-medium ${
                  isActive ? 'bg-[#FFD600] text-[#0A0A0A] border-[#FFD600]' : 'bg-white text-[#888888] border-[#E5E5E5] hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
                }`}
              >
                {tab.icon}{tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
          >
            {/* Info card */}
            <div className="pin-card p-8 space-y-6">
              <h3 className="section-title">{data.title}</h3>
              <p className="t-body italic text-[#888888]">"{data.headline}"</p>
              <p className="t-body text-[#444444] leading-relaxed">{data.description}</p>

              <ul className="space-y-2.5">
                {data.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                    <span className="t-body text-[#444444] font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-5 border-t border-[#E5E5E5] space-y-4">
                {/* Tech pills */}
                <div className="flex flex-wrap gap-2">
                  {data.techStack.map(tech => <span key={tech} className="pill">{tech}</span>)}
                </div>
                {/* Pricing row */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="t-body text-[#888888] uppercase tracking-wider font-medium block">Starting from</span>
                    <span className="t-display font-serif font-bold text-[#0A0A0A]">
                      {country.currencySymbol}{Math.round(basePrices[activeService] * country.rateMultiplier)}
                      <span className="t-body text-[#888888] font-normal"> / project</span>
                    </span>
                  </div>
                  <button id={`calc-service-cta-${activeService}`} onClick={() => setActiveTab('calculator')} className="btn-ghost">
                    Quote <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive demo */}
            <div className="pin-card p-6 space-y-4 bg-[#F7F7F7]">

              {/* VIDEO: color grade slider */}
              {activeService === 'video' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#0A0A0A]" />
                      <span className="t-body font-semibold text-[#0A0A0A]">Color Grading Demo</span>
                    </div>
                    <span className="pill">DaVinci Resolve</span>
                  </div>
                  <div
                    className="relative aspect-video rounded-xl overflow-hidden cursor-ew-resize select-none border border-[#E5E5E5]"
                    onMouseMove={handleSliderMove}
                    onTouchMove={handleSliderMove}
                  >
                    <div className="absolute inset-0">
                      <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200" alt="Graded" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <span className="pill pill-dark absolute top-3 right-3">GRADED</span>
                    </div>
                    <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                      <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200" alt="Raw" className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none grayscale contrast-[60%] brightness-[120%]" referrerPolicy="no-referrer" />
                      <span className="pill absolute top-3 left-3">RAW</span>
                    </div>
                    <div className="absolute inset-y-0 w-0.5 bg-white shadow-md" style={{ left: `${sliderPosition}%` }}>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border-2 border-[#0A0A0A] flex items-center justify-center shadow-md t-body text-[#0A0A0A] font-bold">↔</div>
                    </div>
                  </div>
                  <div className="flex justify-between t-body text-[#888888]">
                    <span>Raw log input</span>
                    <span>Finished Rec.709</span>
                  </div>
                </div>
              )}

              {/* 3D: wireframe toggle */}
              {activeService === '3d' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Grid className="w-4 h-4 text-[#0A0A0A]" />
                      <span className="t-body font-semibold text-[#0A0A0A]">3D Mesh Viewer</span>
                    </div>
                    <span className="pill">Redshift</span>
                  </div>
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-[#E5E5E5]">
                    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200" alt="3D product" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    {isC3dWireframe && (
                      <div className="absolute inset-0 bg-[#0A0A0A]/75 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full opacity-60" fill="none" stroke="#FFFFFF" strokeWidth="0.8">
                          <line x1="0" y1="33%" x2="100%" y2="33%" strokeDasharray="5,5" />
                          <line x1="0" y1="66%" x2="100%" y2="66%" strokeDasharray="5,5" />
                          <line x1="33%" y1="0" x2="33%" y2="100%" strokeDasharray="5,5" />
                          <line x1="66%" y1="0" x2="66%" y2="100%" strokeDasharray="5,5" />
                          <circle cx="50%" cy="50%" r="80" strokeDasharray="4,4" />
                          <circle cx="50%" cy="50%" r="45" />
                        </svg>
                        <div className="t-body text-white font-semibold text-center">
                          <div>GEOMETRY: QUAD_MESH</div>
                          <div className="text-[#AAAAAA]">1,482,000 VERTS</div>
                        </div>
                      </div>
                    )}
                    <button
                      id="wireframe-toggle-btn"
                      onClick={() => setIsC3dWireframe(!isC3dWireframe)}
                      className={`absolute bottom-3 left-3 ${isC3dWireframe ? 'btn-primary' : 'btn-ghost'}`}
                      style={{ padding: '0.4rem 1rem' }}
                    >
                      {isC3dWireframe ? 'Disable Wireframe' : 'Show Wireframe'}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 t-body text-[#888888]">
                    <Command className="w-3.5 h-3.5" />
                    Toggle to view CAD topology underneath the render.
                  </div>
                </div>
              )}

              {/* CGI: layer composite */}
              {activeService === 'cgi' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#0A0A0A]" />
                      <span className="t-body font-semibold text-[#0A0A0A]">CGI Composite Stack</span>
                    </div>
                    <span className="pill">Nuke Studio</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 relative aspect-video rounded-xl overflow-hidden border border-[#E5E5E5] bg-[#111]">
                      <img src="https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=600" alt="CGI" className="absolute inset-0 w-full h-full object-cover brightness-50" referrerPolicy="no-referrer" />
                      {vfxLayers.hologramTech && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="border-2 border-white/30 w-20 h-20 rounded-full animate-[spin_8s_linear_infinite] flex items-center justify-center">
                            <div className="border border-white/20 w-10 h-10 rounded-full animate-[spin_3s_linear_infinite_reverse]" />
                          </div>
                        </div>
                      )}
                      {vfxLayers.neonHighlights && (
                        <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                      )}
                      <div className="absolute inset-x-0 top-2 px-3 flex justify-between t-body text-white/60">
                        <span>COMP_ACTIVE</span><span>F:0432</span>
                      </div>
                    </div>
                    <div className="space-y-2 flex flex-col justify-center">
                      <span className="t-body text-[#888888] font-semibold uppercase tracking-wider block">Layers</span>
                      {[
                        { key: 'chromakeyedActor', label: 'Actor Key' },
                        { key: 'hologramTech',     label: 'Hologram'  },
                        { key: 'neonHighlights',   label: 'Glows'     },
                        { key: 'rainMist',         label: 'Weather'   },
                      ].map(opt => (
                        <label key={opt.key} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={vfxLayers[opt.key as keyof typeof vfxLayers]}
                            onChange={() => setVfxLayers(p => ({ ...p, [opt.key]: !p[opt.key as keyof typeof vfxLayers] }))}
                            className="w-3.5 h-3.5 accent-[#0A0A0A] cursor-pointer rounded"
                          />
                          <span className="t-body text-[#444444] font-medium">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
