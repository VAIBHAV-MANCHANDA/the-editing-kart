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

const assetUrl = (filename: string) => new URL(`../assets/${filename}`, import.meta.url).href;

const VIDEO_ASSETS = {
  videoEditing: assetUrl('VIDEO EDITING.mp4'),
  advancedVideoEditing: assetUrl('ADVANCE VIDEO EDITING.mp4'),
  colorGrading: assetUrl('COLOR GRADING.mp4'),
  cgiVfx: assetUrl('CGI & VFX.mp4'),
  threeD: assetUrl('3D(1).mp4'),
  aiOne: assetUrl('Ai(1).mp4'),
  aiTwo: assetUrl('Ai(2).mp4'),
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'video-editing',
    title: 'VIDEO EDITING',
    category: 'Video Editing',
    client: 'Editorial Reel',
    location: 'Studio Showcase',
    image: VIDEO_ASSETS.videoEditing,
    videoSrc: VIDEO_ASSETS.videoEditing,
    stats: { label: 'Story polish', value: '100%' },
    duration: 'Portfolio sample',
    challenges: 'Cutting footage into a sharp, easy-to-watch sequence with clean rhythm, confident pacing, and smooth transitions.',
    deliverableText: 'Timeline edit, pacing pass, transitions, sound alignment, and final social-ready export.'
  },
  {
    id: 'advanced-video-editing',
    title: 'ADVANCE VIDEO EDITING',
    category: 'Advance Video Editing',
    client: 'Premium Edit Reel',
    location: 'Studio Showcase',
    image: VIDEO_ASSETS.advancedVideoEditing,
    videoSrc: VIDEO_ASSETS.advancedVideoEditing,
    stats: { label: 'Retention focus', value: '+142%' },
    duration: 'Portfolio sample',
    challenges: 'Building a more dynamic sequence with visual accents, motion emphasis, tighter hooks, and elevated post-production polish.',
    deliverableText: 'Advanced timeline treatment, speed ramps, motion graphics, beat-synced cuts, audio sweetening, and export mastering.'
  },
  {
    id: 'color-grading',
    title: 'COLOR GRADING',
    category: 'Color Grading',
    client: 'Color Suite Reel',
    location: 'Studio Showcase',
    image: VIDEO_ASSETS.colorGrading,
    videoSrc: VIDEO_ASSETS.colorGrading,
    stats: { label: 'Look development', value: '4K' },
    duration: 'Portfolio sample',
    challenges: 'Balancing tone, contrast, skin, highlights, and mood so the final video feels intentional instead of simply corrected.',
    deliverableText: 'Primary correction, secondary color work, contrast shaping, mood grade, and web-ready graded master.'
  },
  {
    id: 'cgi-vfx',
    title: 'CGI & VFX',
    category: 'CGI & VFX',
    client: 'Effects Reel',
    location: 'Studio Showcase',
    image: VIDEO_ASSETS.cgiVfx,
    videoSrc: VIDEO_ASSETS.cgiVfx,
    stats: { label: 'Visual impact', value: 'CGI' },
    duration: 'Portfolio sample',
    challenges: 'Combining crafted visual effects with footage so the added elements feel designed, cinematic, and believable.',
    deliverableText: 'VFX polish, compositing, scene enhancement, effect timing, and final rendered output.'
  },
  {
    id: 'three-d',
    title: '3D',
    category: '3D',
    client: '3D Reel',
    location: 'Studio Showcase',
    image: VIDEO_ASSETS.threeD,
    videoSrc: VIDEO_ASSETS.threeD,
    stats: { label: 'Product depth', value: '3D' },
    duration: 'Portfolio sample',
    challenges: 'Creating dimensional product or scene visuals that can carry a premium ad, explainer, or launch sequence.',
    deliverableText: '3D animation preview, lighting pass, camera movement, material styling, and rendered video output.'
  },
  {
    id: 'ai-one',
    title: 'AI VIDEO',
    category: 'AI',
    client: 'AI Reel 01',
    location: 'Studio Showcase',
    image: VIDEO_ASSETS.aiOne,
    videoSrc: VIDEO_ASSETS.aiOne,
    stats: { label: 'Creative range', value: 'AI' },
    duration: 'Portfolio sample',
    challenges: 'Using AI-led visuals as a production tool while still shaping the result through editorial judgment and finishing polish.',
    deliverableText: 'AI visual generation support, edit selection, cleanup, pacing, sound pass, and export.'
  },
  {
    id: 'ai-two',
    title: 'AI CREATIVE',
    category: 'AI',
    client: 'AI Reel 02',
    location: 'Studio Showcase',
    image: VIDEO_ASSETS.aiTwo,
    videoSrc: VIDEO_ASSETS.aiTwo,
    stats: { label: 'Concept speed', value: 'AI' },
    duration: 'Portfolio sample',
    challenges: 'Turning AI-driven footage into a useful brand or content asset with stronger structure, timing, and finishing.',
    deliverableText: 'AI concept refinement, visual sequencing, timing cleanup, music alignment, and final delivery.'
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
    text: 'Their video editing and speed ramps on our ad creatives delivered a clear increase in retention. The work felt polished, responsive, and easy to run across our timezone.',
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
      'Cinema grading suite with refined DaVinci look development',
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
