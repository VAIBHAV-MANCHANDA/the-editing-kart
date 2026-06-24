import React from 'react';
import { TargetCountry, TabPage, CreativePreset, ServicePageKey } from '../types';
import { COUNTRIES, SERVICE_PAGES } from '../data';
import { ArrowRight, CheckCircle, Command, Cpu, Film, Grid, Heart, Layers, Scissors, Sliders } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesSectionProps {
  selectedCountry: TargetCountry;
  setActiveTab: (tab: TabPage) => void;
  setSelectedService: (service: ServicePageKey) => void;
  creativePreset?: CreativePreset;
}

const iconMap: Record<ServicePageKey, React.ElementType> = {
  'video-editing': Scissors,
  'film-making': Film,
  'vfx-cgi': Layers,
  'sound-design': Sliders,
  '3d': Cpu,
  'motion-designing': Grid,
  'ai-film-making': Command,
  wedding: Heart,
};

export default function ServicesSection({ selectedCountry, setActiveTab, setSelectedService }: ServicesSectionProps) {
  const country = COUNTRIES[selectedCountry];

  const openService = (service: ServicePageKey) => {
    setSelectedService(service);
    setActiveTab('services');
  };

  return (
    <section className="py-24 bg-white" id="services-parent">
      <div className="section-wrap space-y-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            <span className="section-kicker block">Services</span>
            <h2 className="section-title">Choose the exact production lane.</h2>
            <p className="t-body text-[#888888] leading-relaxed">
              Eight focused service pages for {country.name} projects, each with its own process, outcomes, and delivery path.
            </p>
          </div>
          <div className="lg:col-span-5 pin-card p-5 bg-[#F7F7F7]">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#0A0A0A] shrink-0 mt-0.5" />
              <div>
                <span className="t-body text-[#0A0A0A] font-semibold block">Dropdown-ready navigation</span>
                <span className="t-body text-[#888888] block mt-1">
                  Pick a service from the nav or from this grid to open a dedicated page.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICE_PAGES.map((service, index) => {
            const Icon = iconMap[service.id];
            return (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                onClick={() => openService(service.id)}
                className="pin-card p-5 text-left space-y-5 hover:border-[#0A0A0A] transition-colors group"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="w-11 h-11 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#0A0A0A]" />
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#888888] group-hover:text-[#0A0A0A] transition-colors" />
                </div>
                <div className="space-y-2">
                  <span className="t-body text-[#0A0A0A] font-semibold block">{service.navLabel}</span>
                  <p className="t-body text-[#888888] leading-relaxed">{service.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.tools.slice(0, 2).map(tool => (
                    <span key={tool} className="pill">{tool}</span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
