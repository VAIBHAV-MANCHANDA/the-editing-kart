import React from 'react';
import { ArrowRight, CheckCircle, Clock, Film, Layers3, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { COUNTRIES, SERVICE_PAGES } from '../data';
import { ServicePageKey, TabPage, TargetCountry } from '../types';
import StudioScene3D from './StudioScene3D';

interface ServicePageProps {
  selectedCountry: TargetCountry;
  serviceId: ServicePageKey;
  setActiveTab: (tab: TabPage) => void;
  setSelectedService: (service: ServicePageKey) => void;
}

const iconMap: Record<ServicePageKey, React.ElementType> = {
  'video-editing': Film,
  'film-making': Sparkles,
  'vfx-cgi': Layers3,
  'sound-design': Clock,
  '3d': Layers3,
  'motion-designing': Sparkles,
  'ai-film-making': Sparkles,
  wedding: Film,
};

export default function ServicePage({ selectedCountry, serviceId, setActiveTab, setSelectedService }: ServicePageProps) {
  const country = COUNTRIES[selectedCountry];
  const service = SERVICE_PAGES.find(item => item.id === serviceId) ?? SERVICE_PAGES[0];
  const Icon = iconMap[service.id];
  const related = SERVICE_PAGES.filter(item => item.id !== service.id).slice(0, 4);

  return (
    <section className="bg-white py-20 overflow-hidden" id={`service-page-${service.id}`}>
      <div className="section-wrap space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 space-y-7"
          >
            <span className="section-kicker block">{service.kicker}</span>
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h1 className="section-title">{service.title}</h1>
              <p className="t-body text-[#444444] leading-relaxed">{service.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setActiveTab('contact')} className="btn-primary">
                Start This Service <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => setActiveTab('portfolio')} className="btn-ghost">
                View Relevant Work
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="relative min-h-[420px] lg:min-h-[560px]">
              <div className="absolute inset-0">
                {service.id === '3d' || service.id === 'vfx-cgi' || service.id === 'film-making' ? (
                  <StudioScene3D className="w-full h-full min-h-[420px] lg:min-h-[560px]" activeTone="premium" />
                ) : (
                  <video
                    src={service.videoSrc}
                    className="w-full h-full min-h-[420px] lg:min-h-[560px] object-cover rounded-xl border border-[#E5E5E5]"
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                  />
                )}
              </div>
              <div className="absolute left-4 right-4 bottom-4 pin-card p-5 bg-white/95">
                <span className="t-body text-[#888888] uppercase tracking-wider font-semibold block">Delivery Region</span>
                <span className="t-body text-[#0A0A0A] font-semibold block mt-1">
                  {country.flag} {country.name} projects quoted in {country.currencyCode}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="pin-card p-6 space-y-4">
            <span className="section-kicker block">Outcomes</span>
            <ul className="space-y-3">
              {service.outcomes.map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                  <span className="t-body text-[#444444] font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pin-card p-6 space-y-4">
            <span className="section-kicker block">Process</span>
            <div className="space-y-3">
              {service.process.map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#F7F7F7] border border-[#E5E5E5] flex items-center justify-center t-body font-semibold text-[#0A0A0A] shrink-0">
                    {index + 1}
                  </span>
                  <span className="t-body text-[#444444] font-medium pt-0.5">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pin-card p-6 space-y-4">
            <span className="section-kicker block">Tools</span>
            <div className="flex flex-wrap gap-2">
              {service.tools.map(tool => (
                <span key={tool} className="pill">{tool}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <span className="section-kicker block mb-2">More Services</span>
              <h2 className="panel-title">Switch service page.</h2>
            </div>
            <button onClick={() => setActiveTab('home')} className="btn-ghost">
              Services Overview
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map(item => {
              const RelatedIcon = iconMap[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedService(item.id)}
                  className="pin-card p-5 text-left space-y-3 hover:border-[#0A0A0A] transition-colors"
                >
                  <RelatedIcon className="w-5 h-5 text-[#0A0A0A]" />
                  <span className="t-body text-[#0A0A0A] font-semibold block">{item.navLabel}</span>
                  <span className="t-body text-[#888888] leading-relaxed block">{item.summary}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
