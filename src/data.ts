import { TargetCountry, CountryConfig, PortfolioItem, Testimonial, FAQItem } from './types';

export const COUNTRIES: Record<TargetCountry, CountryConfig> = {
  usa: {
    code: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    currencySymbol: '$',
    currencyCode: 'USD',
    rateMultiplier: 1.0,
    primaryTimezone: 'EST / PST (UTC-5 / UTC-8)',
    representativeClient: 'Nexa Group, Los Angeles'
  },
  uk: {
    code: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currencySymbol: '£',
    currencyCode: 'GBP',
    rateMultiplier: 0.82,
    primaryTimezone: 'GMT / BST (UTC+0 / UTC+1)',
    representativeClient: 'Aura Media, London'
  },
  europe: {
    code: 'europe',
    name: 'Europe (EU)',
    flag: '🇪🇺',
    currencySymbol: '€',
    currencyCode: 'EUR',
    rateMultiplier: 0.94,
    primaryTimezone: 'CET / CEST (UTC+1 / UTC+2)',
    representativeClient: 'Atelier Berlin, Germany'
  },
  canada: {
    code: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    currencySymbol: 'CA$',
    currencyCode: 'CAD',
    rateMultiplier: 1.38,
    primaryTimezone: 'EST / MST / PST',
    representativeClient: 'Peak Creative, Vancouver'
  },
  australia: {
    code: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    currencySymbol: 'A$',
    currencyCode: 'AUD',
    rateMultiplier: 1.52,
    primaryTimezone: 'AEST (UTC+10)',
    representativeClient: 'Shift Studio, Sydney'
  },
  newzealand: {
    code: 'newzealand',
    name: 'New Zealand',
    flag: '🇳🇿',
    currencySymbol: 'NZ$',
    currencyCode: 'NZD',
    rateMultiplier: 1.65,
    primaryTimezone: 'NZST (UTC+12)',
    representativeClient: 'Vanguard Films, Auckland'
  }
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Veloce Motors — Cinematic Brand Launch',
    category: 'video',
    client: 'Veloce Supercars',
    location: 'California, US',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=805',
    stats: { label: 'In-app Conversions', value: '+142%' },
    duration: '2 minutes 40 seconds',
    challenges: 'Blending high-speed action tracking shots with deep audio-reactive foley, custom sound design, and micro-framing adjustments to hold maximum user retention in the first 8 seconds.',
    deliverableText: 'Ultimate color suite in DaVinci Resolve, heavy atmospheric soundscapes, custom cross-dissolves, speed ramps and 8K master output.'
  },
  {
    id: 'p2',
    title: 'Aura Premium Diffuser — 3D Product Visualizer',
    category: '3d',
    client: 'Aura Home Wellness',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800',
    stats: { label: 'Direct Sales Lift', value: '38%' },
    duration: '1 minute loop',
    challenges: 'Simulating complex fluid/smoke interaction representing aromatherapy vapor using highly advanced high-fidelity simulation and photorealistic lighting/materials setup in Cinema 4D and Redshift.',
    deliverableText: '6 photorealistic high-res marketing renders plus two seamless looped commercials for instagram and web-head.'
  },
  {
    id: 'p3',
    title: 'Neon Tokyo — Sci-Fi CGI City Overhaul',
    category: 'cgi',
    client: 'Studio Shinto',
    location: 'Sydney, Australia',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=800',
    stats: { label: 'Audience Engagement', value: '4.8M Views' },
    duration: '35 seconds sequence',
    challenges: 'Integrating high-fidelity holographic advertisements, flying car wireframes, and rain reflections onto raw real-world footage by matching hand-held camera jitter and precise camera-tracking datasets.',
    deliverableText: 'A finished composited scene, visual tracking charts, and complete multi-pass render comps.'
  },
  {
    id: 'p4',
    title: 'Apex Esports League — Championship Teaser',
    category: 'video',
    client: 'Apex Championship',
    location: 'Berlin, Germany',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    stats: { label: 'Active Retweets', value: '25K+' },
    duration: '45 seconds hyper-teaser',
    challenges: 'Stitching fragmented twitch gameplays, dynamic graphics overlays, neon lighting strokes and bass-heavy dynamic effects to craft a high-energy adrenaline pumping promo.',
    deliverableText: 'Dynamic keyframe motion graphics, premium game-sfx mixing, optimized high compression configurations for multi-network delivery.'
  },
  {
    id: 'p5',
    title: 'Chronos Mechanical Elite — Luxury Wristwatch',
    category: '3d',
    client: 'Chronos AG',
    location: 'Geneva, Switzerland',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    stats: { label: 'Pre-order Subscriptions', value: '180%' },
    duration: 'Exploded View rendering',
    challenges: 'Precision CAD conversion mapping over 432 moving clockwork components, using customized hand-crafted procedural anodized gold, sapphire crystal, and polished chrome materials.',
    deliverableText: 'A full 30-second technical assembly showcase, macro slow-motion loop, and 5 flat layout transparency frames.'
  },
  {
    id: 'p6',
    title: 'Post-Apocalypse Wasteland — Matte Painted Enviro',
    category: 'cgi',
    client: 'Vanguard Productions',
    location: 'Auckland, NZ',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800',
    stats: { label: 'Production Cost Saved', value: 'US$120K' },
    duration: '3 camera angles',
    challenges: 'Establishing a sense of scale across dried-out cracked ground plates, decaying structural bridges and atmospheric toxic fog by keying green screen elements and merging them seamlessly.',
    deliverableText: 'High dynamic range sky backdrops, depth map files, composited target screens for post-production team.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Creative Director',
    company: 'Nexa Group',
    country: 'usa',
    text: 'Working with The Editing Kart has completely transformed our video output. Their video editors have an incredible human intuition for pacing and storytelling that simply cannot be replicated. Our engagement numbers soared immediately.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Oliver Thorne',
    role: 'Lead Producer',
    company: 'Aura Media',
    country: 'uk',
    text: 'We commissioned a Redshift product visualization and were blown away. The attention to material imperfection and natural lighting made the product shoot look completely real, yet beautifully stylized. Flawless communication all across.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Matthias Brandt',
    role: 'Brand Lead',
    company: 'Atelier Berlin',
    country: 'europe',
    text: 'The CGI integration on our latest lifestyle commercial was stunning. They kept camera tracking perfectly stable and provided multiple composting passes for our internal colorists. Best studio experience we have had in years.',
    rating: 5
  },
  {
    id: 't4',
    name: 'Jessica Reynolds',
    role: 'Founder',
    company: 'Peak Creative',
    country: 'canada',
    text: 'Canada is famous for high-standard production, and finding a partner that fits our strict delivery rules is tough. The Editing Kart delivered under pressure, on-budget, and the response was so professional. Unwavering support and talent.',
    rating: 5
  },
  {
    id: 't5',
    name: 'Lachlan McKay',
    role: 'Head of Content',
    company: 'Shift Studio',
    country: 'australia',
    text: 'Their video editing and speed ramps on our ad creatives pulled a massive increase in retention. Absolute legends down under! Our timezone offsets were handled with absolute priority and zero lag.',
    rating: 5
  },
  {
    id: 't6',
    name: 'Kiri Te-Wiata',
    role: 'Executive Producer',
    company: 'Vanguard Films',
    country: 'newzealand',
    text: 'A visual effects project needs serious mathematical planning and artistic eye. The team at The Editing Kart managed the entire multi-pass compositing sequence on our feature project flawlessly. Will absolutely use them on our next feature film.',
    rating: 5
  }
];

export const SERVICE_DETAILS_DATA = {
  video: {
    title: 'High-Retention Video Editing',
    headline: 'Editing with human rhythm, timing, and psychological impact.',
    description: 'We do not throw assets together. We treat every single frame as a critical piece of prime real estate. By dissecting target demographics, we adjust structural hook lengths, utilize visual pacing shifts, match downbeats with surgical precision, and integrate customized sound design environments that drive real actions.',
    deliverables: [
      'Multi-Cam narrative assembly & editorial curation',
      'Advanced High-Fidelity Sound Design & Foley atmospheres',
      'Cinema grading suite with Hollywood-style DaVinci lutting',
      'Social/ad format optimization (9:16 vertical hooks with custom kinetic typography)',
      'High frame rate stabilization and keyframe adjustments'
    ],
    techStack: ['Adobe Premiere Pro', 'DaVinci Resolve Studio', 'Avid Media Composer', 'Logic Pro X']
  },
  '3d': {
    title: 'Photorealistic 3D Visualization',
    headline: 'Hyper-detailed lighting, CAD precision, and fluid physics.',
    description: 'Whether it is an exploded CAD view showing industrial mechanics or a lifestyle liquid cosmetic product render, our custom 3D studio handles modeling, texturing, atmospheric simulations, and rendering. We pay ultimate attention to imperfections like microscopic scratches, dusty surface materials, and real-world focal depth to make the outcomes look entirely organic and high-end.',
    deliverables: [
      'Precision CAD model import & polygon optimization',
      'Photorealistic procedural textures (leather, aluminum, water droplet, gold, glass)',
      'Atmospheric physics (smoke, fire, mist, liquid simulations)',
      'Exploded configuration animations & functional assembly loops',
      'Optimized network-ready WebGL, GLTF formats & Ultra-HD 4K renders'
    ],
    techStack: ['Maxon Cinema 4D', 'Blender Professional', 'Redshift Renderer', 'OctaneRender', 'Houdini']
  },
  cgi: {
    title: 'High-End CGI & VFX Compositing',
    headline: 'Integrating imaginative art flawlessly with real-world optics.',
    description: 'Fusing physical elements with virtual environments requires extreme optical precision. We manage the pipeline from original frame stabilization, 3D camera tracker analysis, chroma-keying green screens, matching shadows, adding lens aberrations, matching natural film grains, to layering final matte-painted backdrops.',
    deliverables: [
      '3D Camera Tracking, Matchmoving & object tracking analysis',
      'Advanced clean plates, rotoscopes, and high-fidelity keying workflows',
      'Matte painting environmental extensions and atmospheric effects',
      'CG element rendering & optical color integration',
      'Motion graphics, UI overlay designs, futuristic hologram projection elements'
    ],
    techStack: ['Foundry Nuke Studio', 'Adobe After Effects', 'Unreal Engine 5', 'Syntheyes', 'DaVinci Fusion']
  }
};

export const INITIAL_FAQS: FAQItem[] = [
  {
    category: 'general',
    question: 'How do you coordinate with international clients?',
    answer: 'We utilize dedicated client success managers assigned specifically to match your regional business hours (USA EST/PST, UK GMT, European CET, Australian AEST, etc.). Real-time review sessions happen on Frame.io/Slack where you can provide feedback on precise frames.'
  },
  {
    category: 'process',
    question: 'What does the general collaboration cycle look like?',
    answer: 'It starts with custom asset collection & brief alignment. We render/edit a First Cut (Assembly), receive your structured feedback on Frame.io, produce a Fine Cut with sound fx and color grading, and finally deliver the polished master source files.'
  },
  {
    category: 'pricing',
    question: 'Are source project files included in the delivery package?',
    answer: 'Standard packages deliver finalized 4K high bit-rate files. Premiere project packages, Cinema 4D project archives carrying active materials, and Nuke scripts can be included depending on premium licenses requested during the Project Planner initiation stage.'
  },
  {
    category: 'general',
    question: 'What is your turnaround SLA for time-critical assets?',
    answer: 'Social ads/promos have a robust SLA of 48-72 hours. High-end CGI keying and complex 3D physics rendering cycles are custom calculated depending entirely on pipeline depth and geometry complexities.'
  }
];

export const CALCULATOR_BASE_PRICING = {
  video: {
    base: 350,
    options: [
      { id: 'v1', name: 'Raw footage assembly & Cut', price: 0 },
      { id: 'v2', name: 'Premium Color Grading Suit', price: 150 },
      { id: 'v3', name: 'Audio Soundscape & Foley', price: 100 },
      { id: 'v4', name: 'Custom Motion Graphic HUDs', price: 200 }
    ]
  },
  '3d': {
    base: 750,
    options: [
      { id: 't1', name: 'Polygon Modeling (Custom CAD)', price: 0 },
      { id: 't2', name: 'Redshift / Octane Texturing', price: 250 },
      { id: 't3', name: 'Exploded/Assembly Motion', price: 400 },
      { id: 't4', name: 'Fluid & Particle Dynamics', price: 450 }
    ]
  },
  cgi: {
    base: 950,
    options: [
      { id: 'c1', name: 'Camera Tracking & Keying', price: 0 },
      { id: 'c2', name: 'Rotoscoping & Paint Prep', price: 300 },
      { id: 'c3', name: 'Set Extension (Matte Painting)', price: 450 },
      { id: 'c4', name: 'Optical Match & Lens FX Overlay', price: 250 }
    ]
  }
};
