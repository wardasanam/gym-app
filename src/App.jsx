import React, { useState, useEffect, useRef } from 'react';
import { 
  Dumbbell, Zap, Users, Calendar, ChevronRight, ChevronLeft,
  CheckCircle2, Menu, X, Instagram, Facebook, Twitter,
  Calculator, Flame, MapPin, Phone, Mail, TrendingUp,
  Award, Play, ArrowRight, Send, Info, ChevronDown,
  Activity, Sparkles, Star, Quote, Eye, Maximize,
  Minimize, Clock, UserCheck, Trophy, Heart, ShieldCheck,
  Target, Box, Linkedin, Brain, ArrowUpRight, Monitor, ExternalLink,
  Plus, Cpu, BarChart3, Fingerprint, Waves, Scan, Radio, Loader2,
  Hexagon, Thermometer, Briefcase, Award as Medal, ClipboardList
} from 'lucide-react';

// --- DATA CONSTANTS ---

const programs = [
  { 
    id: 1, title: 'Hypertrophy Max', Icon: Dumbbell, 
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000', 
    desc: 'Advanced muscle building protocols involving high-volume sets and specialized time-under-tension techniques.', 
    tag: 'STRENGTH', span: 'lg:col-span-2 lg:row-span-2',
    specs: { intensity: 85, duration: 90, technical: 70 },
    code: 'MOD_H-MAX_01', loadHash: '0x88_HYP',
    longDesc: 'Our Hypertrophy protocol focuses on the architectural rebuilding of muscle tissue. We utilize a combination of mechanical tension, metabolic stress, and muscle damage to force biological adaptation. Ideal for those seeking significant gains in lean mass and structural integrity.'
  },
  { 
    id: 2, title: 'Endurance Pro', Icon: Zap, 
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000', 
    desc: 'Unlock your aerobic potential with professional-grade metabolic conditioning.', 
    tag: 'PERFORMANCE', span: 'lg:col-span-1 lg:row-span-1',
    specs: { intensity: 95, duration: 45, technical: 60 },
    code: 'MOD_E-PRO_02', loadHash: '0x12_END',
    longDesc: 'The Endurance Pro module recalibrates your cardiovascular engine through mitochondrial density enhancement and VO2 Max optimization.'
  },
  { 
    id: 3, title: 'Mobility Flow', Icon: Flame, 
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000', 
    desc: 'Technical active range of motion designed for elite longevity.', 
    tag: 'FLEXIBILITY', span: 'lg:col-span-1 lg:row-span-2',
    specs: { intensity: 40, duration: 60, technical: 90 },
    code: 'MOD_M-FLOW_03', loadHash: '0x44_MOB',
    longDesc: 'Mobility is the prerequisite for all power. Our Flow protocol targets the joint capsules for absolute kinetic freedom and fascial health.'
  },
  { 
    id: 4, title: 'Combat Lab', Icon: Activity, 
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000', 
    desc: 'Elite core resilience and rotational explosive power.', 
    tag: 'COMBAT', span: 'lg:col-span-1 lg:row-span-1',
    specs: { intensity: 90, duration: 75, technical: 85 },
    code: 'MOD_C-LAB_04', loadHash: '0x99_CBT',
    longDesc: 'The Combat Lab is where physics meets grit, transferring power from the ground through the core with absolute precision and explosive speed.'
  }
];

const outcomes = [
  { 
    id: '01', title: 'Biological Optimization', 
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000',
    desc: 'Recalibrate your systems for peak metabolic efficiency and sustained daily output.',
    metrics: { 'Rate': '+22%', 'Recovery': '-30%', 'Hormone': 'Balanced' },
    status: 'OPTIMIZED',
    longDesc: 'Optimization involves the systemic realignment of metabolic pathways. By focusing on nutrient timing and specific intensity thresholds, we force the body to operate at its highest possible efficiency.'
  },
  { 
    id: '02', title: 'Neural Resilience', 
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000',
    desc: 'Enhance the mind-muscle connection through high-tension motor control drills.',
    metrics: { 'Drive': '+40%', 'Reaction': '-15ms', 'Control': 'Elite' },
    status: 'CALIBRATED',
    longDesc: 'Resilience is built at the intersection of the brain and the muscle fiber. Our protocols increase recruitment density, ensuring that every signal sent from the motor cortex results in absolute physical execution.'
  },
  { 
    id: '03', title: 'Structural Integrity', 
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000',
    desc: 'Fortify your skeletal frame and connective tissue for long-term durability.',
    metrics: { 'Density': '+12%', 'Strength': '+35%', 'Posture': '98%' },
    status: 'FORTIFIED',
    longDesc: 'We treat the skeleton as the foundation of the performance machine. Through progressive loading of the bone matrix and collagen synthesis protocols, we create a frame built for high-impact output.'
  },
  { 
    id: '04', title: 'Kinetic Intelligence', 
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1000',
    desc: 'Master the mechanics of motion, allowing for explosive power without compromising form.',
    metrics: { 'Power': '+28%', 'Leakage': '-45%', 'Agility': 'A+' },
    status: 'SYNCED',
    longDesc: 'Intelligence in motion is the elimination of mechanical leakage. We utilize multi-planar movement patterns to ensure energy is transferred through the kinetic chain with zero waste.'
  }
];

const trainers = [
  { 
    id: 1, name: "Marcus Thorne", role: "Strength Architect", 
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000", 
    philosophy: "Force is the variable that cannot be faked.", 
    stats: { rank: 'S-Tier', exp: '15y', load: '800kg' }, 
    perfMetrics: { strength: 98, endurance: 65, technical: 92, adaptive: 88 }, 
    longBio: "Marcus specializes in the Westside Barbell conjugate method adapted for modern athletics. His sessions focus on absolute force production and CNS management.",
    qualifications: ["NSCA Certified Strength Specialist", "Bio-Mechanics PhD", "Elite Conjugate Master"],
    specializations: ["Neural Drive Protocols", "Post-Injury Hypertrophy", "Force-Velocity Profiling"],
    schedule: [
      { day: "MON", slots: ["06:00", "08:00", "14:00"] },
      { day: "WED", slots: ["06:00", "09:00", "15:00"] },
      { day: "FRI", slots: ["07:00", "10:00", "16:00"] }
    ]
  },
  { 
    id: 2, name: "Elena Rossi", role: "Mobility Lead", 
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000", 
    philosophy: "Range of motion is the prerequisite for all power.", 
    stats: { rank: 'Elite', exp: '10y', flow: '99%' }, 
    perfMetrics: { strength: 60, endurance: 75, technical: 99, recovery: 95 }, 
    longBio: "Elena is a master of FRC (Functional Range Conditioning). She believes that strength without mobility is an accident waiting to happen.",
    qualifications: ["FRC Mastery", "Yoga Alliance 500h", "Kinesiology BS"],
    specializations: ["Fascial Line Mapping", "Joint Capsule Expansion", "Isokinetic Flow Techniques"],
    schedule: [
      { day: "TUE", slots: ["09:00", "11:00", "17:00"] },
      { day: "THU", slots: ["08:00", "10:00", "16:00"] },
      { day: "SAT", slots: ["10:00", "12:00"] }
    ]
  },
  { 
    id: 3, name: "David Wu", role: "Metabolic Specialist", 
    img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000", 
    philosophy: "Endurance is managing suffering at high intensities.", 
    stats: { rank: 'A-Tier', exp: '12y', VO2: 'Extreme' }, 
    perfMetrics: { strength: 70, endurance: 98, technical: 85, grit: 100 }, 
    longBio: "David uses data-driven aerobic models to build massive engines in elite athletes across all disciplines.",
    qualifications: ["Ironman Coach Cert", "NASM Performance Spec.", "Nutritional Sci Masters"],
    specializations: ["Lactate Threshold Shifting", "EPOC Optimization", "Metabolic Flexibility"],
    schedule: [
      { day: "MON", slots: ["05:00", "12:00", "18:00"] },
      { day: "WED", slots: ["05:00", "12:00", "18:00"] },
      { day: "FRI", slots: ["05:00", "12:00"] }
    ]
  },
  { 
    id: 4, name: "Sarah Jenkins", role: "Combat Architect", 
    img: "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=1000", 
    philosophy: "Precision in motion creates performance lethality.", 
    stats: { rank: 'S-Tier', exp: '8y', power: 'High' }, 
    perfMetrics: { strength: 88, endurance: 82, technical: 95, reaction: 98 }, 
    longBio: "Sarah bridges the gap between traditional combat technique and modern conditioning. Her sessions are high-intensity tests of grit.",
    qualifications: ["Black Belt Krav Maga", "Muay Thai Int. Cert", "Tactical Fitness Specialist"],
    specializations: ["Explosive Chain Transfer", "Reflexive Stability", "Neuromuscular Strike Power"],
    schedule: [
      { day: "TUE", slots: ["06:00", "12:00", "19:00"] },
      { day: "THU", slots: ["06:00", "12:00", "19:00"] },
      { day: "SAT", slots: ["08:00", "11:00"] }
    ]
  }
];

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000", label: "Olympic Alley", sector: '01', temp: '18.2', tag: 'STRENGTH_LAB', longDesc: 'A high-density lifting sector featuring 12 professional-grade racks and Olympic-certified iron.' },
  { url: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000", label: "Precision Weights", sector: '02', temp: '19.5', tag: 'FREE_WEIGHTS', longDesc: 'Calibrated industrial dumbbells from 2kg to 100kg. Balanced for architectural precision.' },
  { url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000", label: "Recovery Zone", sector: '03', temp: '04.1', tag: 'CRYO_LAB', longDesc: 'Sub-zero cryotherapy and infrared thermal calibration pods for total cellular reset.' },
  { url: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1000", label: "Cardio Lab", sector: '04', temp: '20.8', tag: 'METABOLIC_FLUX', longDesc: 'High-performance treadmills and rowers integrated with real-time biometric tracking.' },
  { url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000", label: "The Rack", sector: '05', temp: '18.5', tag: 'SKELETAL_LOADING', longDesc: 'Custom-engineered power cages with sensor arrays for biomechanical bar path analysis.' },
  { url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000", label: "Performance Floor", sector: '06', temp: '19.1', tag: 'KINETIC_TURF', longDesc: 'High-density impact turf for explosive plyometrics and multi-planar agility drills.' }
];

// --- STYLES ---

const ThemeStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;700&family=Bebas+Neue&display=swap');

    :root {
      --accent: #2D5BFF;
      --bg: #F9F9F7;
      --dark: #1A1A1A;
      --muted: #666666;
    }

    body {
      background-color: var(--dark);
      color: var(--bg);
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
      scroll-behavior: smooth;
    }

    .mono { font-family: 'JetBrains Mono', monospace; }
    .bebas { font-family: 'Bebas Neue', sans-serif; }

    @keyframes shutterReveal {
      0% { clip-path: inset(0 100% 0 0); transform: scale(1.1); }
      100% { clip-path: inset(0 0 0 0); transform: scale(1); }
    }

    .animate-shutter { animation: shutterReveal 1.6s cubic-bezier(0.77, 0, 0.175, 1) forwards; }
    
    .scroll-reveal { 
      opacity: 0; 
      transform: translateY(30px); 
      transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .scroll-reveal.visible { opacity: 1; transform: translateY(0); }

    .btn-swiss {
      background: white;
      color: var(--dark);
      padding: 1.25rem 2.5rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      transition: all 0.4s ease;
      display: inline-flex;
      align-items: center;
      gap: 1rem;
    }
    .btn-swiss:hover {
      background: var(--accent);
      color: white;
      padding-right: 3.5rem;
    }

    .tag-floating {
       position: absolute;
       background: rgba(0, 0, 0, 0.7);
       backdrop-filter: blur(8px);
       padding: 4px 10px;
       border: 1px solid rgba(255, 255, 255, 0.1);
       color: white;
       font-size: 8px;
       font-family: 'JetBrains Mono', monospace;
       text-transform: uppercase;
       font-weight: 700;
       letter-spacing: 1px;
       z-index: 20;
    }

    .metric-bar { height: 2px; background: rgba(0,0,0,0.05); position: relative; }
    .metric-bar-fill { position: absolute; top: 0; left: 0; height: 100%; background: var(--accent); transition: width 1.5s ease; }

    .module-card { cursor: pointer; background: #000; overflow: hidden; position: relative; }
    .module-card img { transition: transform 1.2s ease, opacity 0.6s ease; opacity: 0.5; }
    .module-card:hover img { transform: scale(1.1); opacity: 0.8; }

    .overlay-container { animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }

    .bg-section-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.15;
      filter: grayscale(100%) contrast(120%);
      pointer-events: none;
      z-index: 0;
    }

    .section-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent 0%, var(--dark) 100%);
      z-index: 1;
      pointer-events: none;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: var(--accent); }
  `}</style>
);

// --- COMPONENTS ---

const ForgeLogo = ({ dark = false }) => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <div className="relative w-10 h-10 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 border-2 border-blue-600 rotate-45 group-hover:rotate-[135deg] transition-all duration-1000" />
      <div className="w-4 h-4 bg-blue-600 group-hover:scale-125 transition-transform" />
    </div>
    <span className={`text-2xl font-black italic tracking-tighter uppercase ${dark ? 'text-black' : 'text-white'}`}>
      FORGE<span className="text-blue-500">FIT</span>
    </span>
  </div>
);

const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => { entry.target.classList.add('visible'); }, delay);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className="scroll-reveal">{children}</div>;
};

// --- MODALS ---

const JoinModal = ({ isOpen, onClose, context }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleNext = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step < 2) setStep(step + 1);
      else onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <div className="relative w-full max-w-xl bg-white p-12 shadow-2xl border border-gray-100">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"><X size={24}/></button>
        <div className="mono text-[10px] text-blue-600 font-black uppercase mb-4 tracking-widest">Protocol // Enrollment</div>
        <h2 className="text-5xl font-black uppercase italic bebas tracking-tighter text-black mb-4">INITIALIZE ACCESS</h2>
        
        {context && (
           <div className="bg-blue-50 p-4 border-l-4 border-blue-600 mb-8">
              <span className="mono text-[9px] font-black text-blue-600 uppercase block mb-1">Target Context:</span>
              <p className="text-xs font-bold text-gray-800 uppercase tracking-widest">{context}</p>
           </div>
        )}

        {step === 1 && (
          <form className="space-y-6" onSubmit={handleNext}>
             <input type="text" placeholder="FULL IDENTITY" required className="w-full border-b-2 border-gray-200 p-4 font-bold text-xs outline-none focus:border-blue-600 text-black" />
             <input type="email" placeholder="EMAIL@UPLINK.COM" required className="w-full border-b-2 border-gray-200 p-4 font-bold text-xs outline-none focus:border-blue-600 text-black" />
             <button disabled={loading} className="w-full bg-blue-600 text-white py-6 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3">
               {loading ? <Loader2 className="animate-spin" size={16} /> : "Verify Identity"} <ChevronRight size={16}/>
             </button>
          </form>
        )}

        {step === 2 && (
          <div className="text-center space-y-8 py-10">
             <div className="w-20 h-20 bg-green-50 text-green-600 flex items-center justify-center mx-auto rounded-full">
                <CheckCircle2 size={40} />
             </div>
             <h2 className="text-4xl font-black uppercase italic bebas tracking-tighter text-black">Authorization Confirmed</h2>
             <p className="text-muted text-sm font-medium">Your request for <span className="font-bold">{context}</span> has been synced. An architect will contact you for final biometric verification.</p>
             <button onClick={onClose} className="w-full bg-black text-white py-6 font-black uppercase tracking-widest text-xs">Acknowledge</button>
          </div>
        )}
      </div>
    </div>
  );
};

const TimetableModal = ({ trainer, isOpen, onClose, onRequest }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  if (!isOpen || !trainer) return null;

  return (
    <div className="fixed inset-0 z-[650] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-white text-black p-12 shadow-2xl border-t-4 border-blue-600">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"><X size={24}/></button>
        <div className="mono text-[10px] text-blue-600 font-bold uppercase tracking-widest mb-4 uppercase">Personnel Access // Node: {trainer.id}</div>
        <h2 className="text-5xl font-black uppercase italic bebas tracking-tighter mb-10 leading-none">Operational <br />Schedule: {trainer.name}</h2>
        
        <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4">
          {trainer.schedule.map(s => (
            <div key={s.day} className="flex items-center gap-8 border-b border-gray-100 pb-4">
               <div className="w-16 bebas text-3xl text-blue-600">{s.day}</div>
               <div className="flex flex-wrap gap-3">
                  {s.slots.map(slot => (
                    <button 
                      key={slot} 
                      onClick={() => setSelectedSlot(`${s.day} @ ${slot}`)}
                      className={`mono text-[10px] font-bold border px-4 py-2 transition-all cursor-pointer ${selectedSlot === `${s.day} @ ${slot}` ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-105' : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-blue-300'}`}
                    >
                      {slot}
                    </button>
                  ))}
               </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 space-y-4">
          <div className={`mono text-[10px] font-black uppercase text-center transition-opacity ${selectedSlot ? 'opacity-100' : 'opacity-0'}`}>
             Selected: <span className="text-blue-600">{selectedSlot}</span>
          </div>
          <button 
            disabled={!selectedSlot}
            onClick={() => onRequest(selectedSlot)}
            className="w-full bg-black text-white py-6 font-black uppercase tracking-widest text-xs uppercase disabled:opacity-30 disabled:grayscale transition-all hover:bg-blue-600 flex items-center justify-center gap-4"
          >
            Request Slot Calibration <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- DISCOVERY OVERLAY ---

const DiscoveryOverlay = ({ item, onClose, onJoin, onShowSchedule }) => {
  if (!item) return null;
  const isTrainer = !!item.philosophy;
  const isFacility = !!item.sector;

  return (
    <div className="fixed inset-0 z-[500] flex justify-end">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-5xl h-full bg-[#F9F9F7] overlay-container overflow-y-auto flex flex-col lg:flex-row shadow-2xl">
        
        {/* Visual Side */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-full bg-black relative lg:sticky lg:top-0">
          <img src={item.image || item.url || item.img} className="w-full h-full object-cover grayscale brightness-50" alt="View" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          <button onClick={onClose} className="absolute top-8 left-8 bg-white text-black p-4 rounded-full hover:bg-blue-600 hover:text-white transition-all z-50">
            <X size={24} />
          </button>

          <div className="absolute bottom-16 left-12 right-12 text-white">
            <span className="mono text-xs font-bold text-blue-500 uppercase tracking-[0.4em] mb-4 block tracking-widest uppercase">
              {item.tag || item.role || `Sector ${item.sector}`}
            </span>
            <h2 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8] bebas mb-6">
              {item.title || item.name || item.label}
            </h2>
            <div className="h-1 w-20 bg-blue-600" />
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full lg:w-1/2 p-12 lg:p-24 space-y-16">
          <section className="space-y-8 text-black">
            <div className="flex items-center gap-4 text-blue-600 font-bold text-[10px] uppercase tracking-widest tracking-widest uppercase">
              <Activity size={14} /> Intelligence Dossier
            </div>
            <p className="text-4xl font-medium leading-tight italic font-serif">
              "{item.desc || item.detail || item.philosophy}"
            </p>
            <p className="text-lg text-gray-500 leading-relaxed font-medium">
              {item.longDesc || item.longBio}
            </p>
          </section>

          {isTrainer && (
            <section className="space-y-8">
               <div className="flex items-center gap-4 text-blue-600 font-bold text-[10px] uppercase tracking-widest uppercase">
                  <ShieldCheck size={14} /> Tactical Specializations
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.specializations.map(spec => (
                    <div key={spec} className="flex items-center gap-3 p-4 border border-gray-100 bg-white shadow-sm">
                       <CheckCircle2 size={16} className="text-blue-600" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-black">{spec}</span>
                    </div>
                  ))}
               </div>
            </section>
          )}

          <section className="space-y-12">
            <div className="flex items-center gap-4 text-muted font-bold text-[10px] uppercase tracking-widest tracking-widest uppercase">
              <BarChart3 size={14} /> Performance Analysis
            </div>
            <div className="grid gap-10">
              {Object.entries(item.specs || item.perfMetrics || item.metrics || {}).map(([key, val]) => (
                <div key={key} className="space-y-3">
                   <div className="flex justify-between items-end">
                      <span className="mono text-[10px] uppercase font-bold text-gray-400 uppercase">{key}</span>
                      <span className="text-xl font-black italic bebas text-blue-600 tracking-widest">{val}{typeof val === 'number' ? '%' : ''}</span>
                   </div>
                   <div className="metric-bar"><div className="metric-bar-fill" style={{ width: typeof val === 'number' ? `${val}%` : '100%' }} /></div>
                </div>
              ))}
            </div>
          </section>

          {isFacility && (
             <section className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-16">
                <div className="space-y-2">
                   <span className="mono text-[9px] uppercase font-bold text-gray-400 uppercase">Node Sector</span>
                   <div className="text-sm font-black uppercase text-black">{item.sector}</div>
                </div>
                <div className="space-y-2">
                   <span className="mono text-[9px] uppercase font-bold text-gray-400 uppercase">Ambient Temp</span>
                   <div className="text-sm font-black uppercase text-blue-600">{item.temp}°C</div>
                </div>
             </section>
          )}

          <div className="pt-10 space-y-4">
             {isTrainer && (
               <button onClick={onShowSchedule} className="w-full border-2 border-black text-black py-8 font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 hover:bg-black hover:text-white transition-all shadow-lg tracking-widest uppercase">
                  Open Operational Schedule <Clock size={18} />
               </button>
             )}
             <button 
              onClick={() => onJoin(isTrainer ? `Personnel Inquiry: ${item.name}` : `Module Activation: ${item.title}`)} 
              className="w-full bg-blue-600 text-white py-8 font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 hover:bg-black transition-all shadow-xl tracking-widest uppercase"
             >
                {isTrainer ? 'Initialize Arrangement' : 'Initialize Session'} <ArrowRight size={18} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- APP ROOT ---

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [joinContext, setJoinContext] = useState('');
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openJoinFromSchedule = (slot) => {
    setIsScheduleOpen(false);
    setJoinContext(`Slot calibration with ${activeItem.name} for ${slot}`);
    setIsJoinOpen(true);
  };

  return (
    <div className="min-h-screen">
      <ThemeStyles />

      {activeItem && (
        <DiscoveryOverlay 
          item={activeItem} 
          onClose={() => setActiveItem(null)} 
          onJoin={(ctx) => { setActiveItem(null); setJoinContext(ctx); setIsJoinOpen(true); }} 
          onShowSchedule={() => setIsScheduleOpen(true)}
        />
      )}
      
      <JoinModal isOpen={isJoinOpen} context={joinContext} onClose={() => setIsJoinOpen(false)} />
      
      <TimetableModal 
        trainer={activeItem && activeItem.philosophy ? activeItem : null} 
        isOpen={isScheduleOpen} 
        onClose={() => setIsScheduleOpen(false)} 
        onRequest={openJoinFromSchedule}
      />

      {/* NAVIGATION */}
      <nav className={`fixed w-full z-[100] transition-all duration-700 ${scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-xl border-b border-gray-100' : 'py-8'}`}>
        <div className="max-w-[1440px] mx-auto px-8 flex justify-between items-center">
          <div onClick={() => scrollToSection('home')}><ForgeLogo dark={scrolled} /></div>
          
          <div className={`hidden lg:flex items-center gap-12 font-black text-[10px] uppercase tracking-[0.3em] ${scrolled ? 'text-black' : 'text-white'}`}>
            {['Services', 'Results', 'Trainers', 'Facility', 'Pricing'].map(item => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-blue-500 transition-colors uppercase tracking-widest uppercase">{item}</button>
            ))}
            <button onClick={() => { setJoinContext('Elite Tier Access'); setIsJoinOpen(true); }} className="bg-blue-600 text-white px-8 py-3 hover:bg-black transition-all font-black uppercase tracking-widest uppercase">INITIALIZE</button>
          </div>
          <Menu className={scrolled ? 'text-black' : 'text-white'} />
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 animate-shutter">
           <div className="w-full h-full bg-cover bg-center grayscale brightness-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2500')" }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/30 to-transparent z-10" />

        <div className="max-w-[1440px] mx-auto px-8 w-full z-30 relative text-white">
          <Reveal>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-blue-500 font-bold tracking-[0.4em] text-[10px] uppercase tracking-widest tracking-widest uppercase">
                <div className="h-[1.5px] w-12 bg-blue-600" />
                ESTABLISHED 2026 // GLOBAL INFRASTRUCTURE
              </div>
              <h1 className="text-8xl md:text-9xl lg:text-[14rem] font-black leading-[0.75] tracking-tighter bebas tracking-widest tracking-widest uppercase">
                BEYOND <br /> <span className="text-outline">THE LIMIT.</span>
              </h1>
              <p className="max-w-xl text-lg text-gray-300 font-medium italic">
                Surgical-grade athletic conditioning for the elite biological mainframe.
              </p>
              <div className="flex gap-4 pt-8">
                 <button className="btn-swiss tracking-widest uppercase" onClick={() => scrollToSection('services')}>Start Training</button>
                 <button onClick={() => scrollToSection('facility')} className="px-10 border border-white/20 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all tracking-widest uppercase">Facility Tours</button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BIOLOGICAL OUTCOMES */}
      <section id="results" className="relative py-40 px-8 bg-black text-white overflow-hidden border-b border-white/10">
        <img src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2000" className="bg-section-img" alt="Background Section" />
        <div className="section-gradient" />
        <div className="max-w-[1440px] mx-auto relative z-10">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-12 mb-24">
              <div className="lg:col-span-6">
                <span className="text-xs font-black tracking-[0.4em] text-blue-600 mb-6 block uppercase tracking-widest uppercase">Adaptive Outcomes</span>
                <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none bebas italic tracking-widest tracking-widest uppercase">CELLULAR <br />EVOLUTION</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[600px]">
              {outcomes.map((item) => (
                <div key={item.id} onClick={() => setActiveItem(item)} className="relative group cursor-pointer overflow-hidden bg-zinc-900 border border-white/5 h-full">
                   <img src={item.image} className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" alt={item.title} />
                   <div className="tag-floating top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">STATUS: {item.status}</div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                   <div className="absolute inset-0 p-10 flex flex-col justify-between">
                      <span className="text-5xl font-black text-blue-500 opacity-20 bebas italic">{item.id}</span>
                      <h3 className="text-3xl font-black uppercase tracking-tighter bebas tracking-widest uppercase">{item.title}</h3>
                   </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CORE MODULES */}
      <section id="services" className="relative py-40 px-8 bg-[#F9F9F7] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2000" className="bg-section-img opacity-[0.05]" alt="Background Section" />
        <div className="max-w-[1440px] mx-auto relative z-10 text-black">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
               <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] bebas text-blue-600 tracking-widest tracking-widest uppercase">CORE <br />MODULES</h2>
               <div className="max-w-xs text-right space-y-4">
                  <Radio className="text-blue-600 animate-pulse ml-auto" size={24} />
                  <p className="text-muted text-sm italic">Surgical-grade training interventions designed for absolute adaptation.</p>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-px bg-zinc-200 border border-zinc-200 shadow-2xl">
              {programs.map((prog) => (
                <div key={prog.id} onClick={() => setActiveItem(prog)} className={`module-card group ${prog.span} min-h-[450px]`}>
                  <img src={prog.image} className="absolute inset-0 w-full h-full object-cover grayscale" alt={prog.title} />
                  <div className="tag-floating top-10 right-10 flex items-center gap-2 group-hover:bg-blue-600 transition-colors">
                     <Cpu size={10}/> HASH: {prog.loadHash}
                  </div>
                  <div className="absolute top-10 left-10 flex items-start gap-4">
                    <div className="bg-blue-600 text-white p-3"><prog.Icon size={20} /></div>
                    <span className="mono text-[10px] font-bold text-blue-400 tracking-widest">{prog.code}</span>
                  </div>
                  <div className="absolute bottom-10 left-10 right-10">
                     <div className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-3 tracking-widest uppercase">Target Node</div>
                     <h4 className="text-white text-4xl lg:text-7xl font-black uppercase tracking-tighter bebas tracking-widest uppercase">{prog.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRAINERS */}
      <section id="trainers" className="relative py-40 px-8 bg-white overflow-hidden border-y border-gray-100">
        <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2000" className="bg-section-img opacity-[0.03]" alt="Background Section" />
        <div className="max-w-[1440px] mx-auto relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-8 text-black">
               <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] bebas tracking-widest tracking-widest uppercase">CORE <br />FACULTY</h2>
               <div className="h-[2px] w-20 bg-blue-600 ml-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {trainers.map((trainer) => (
                <div key={trainer.id} onClick={() => setActiveItem(trainer)} className="trainer-card group cursor-pointer text-black">
                  <div className="relative aspect-[4/5] bg-zinc-100 overflow-hidden mb-8 shadow-xl">
                    <img src={trainer.img} className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" alt={trainer.name} />
                    <div className="tag-floating top-6 right-6">RANK: {trainer.stats.rank}</div>
                  </div>
                  <div className="space-y-4">
                     <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase block tracking-widest uppercase">{trainer.role}</span>
                     <h4 className="text-4xl font-black uppercase tracking-tighter bebas tracking-widest uppercase">{trainer.name}</h4>
                     <p className="text-[11px] italic text-muted leading-relaxed border-l-2 border-blue-600 pl-4 h-12 overflow-hidden">{trainer.philosophy}</p>
                     <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 border-b border-blue-600 pb-1 tracking-widest uppercase">Dossier Details</button>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FACILITY */}
      <section id="facility" className="relative py-40 px-8 bg-zinc-950 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2500" className="bg-section-img opacity-[0.2]" alt="Background Section" />
        <div className="max-w-[1440px] mx-auto relative z-10">
          <Reveal>
            <h2 className="text-white text-8xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-24 bebas tracking-widest tracking-widest uppercase">LAB <br /><span className="text-blue-500">RECORDS</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((img, i) => (
                <div key={i} onClick={() => setActiveItem(img)} className="group relative aspect-[4/3] overflow-hidden bg-black border border-white/5 cursor-pointer">
                  <img src={img.url} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" alt={img.label} />
                  <div className="absolute top-6 left-6 mono text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity flex gap-4">
                     <span>SEC: {img.sector}</span>
                     <span>TEMP: {img.temp}°C</span>
                  </div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                     <h5 className="text-white font-black uppercase text-2xl bebas tracking-widest tracking-widest uppercase">{img.label}</h5>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative py-40 px-8 bg-black text-white">
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <div className="text-center mb-24">
               <h2 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter text-outline bebas tracking-widest tracking-widest uppercase">PROTOCOLS</h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
               {[{ name: 'Standard', price: '60', perks: ['24/7 Access', 'Biometric ID'] }, { name: 'Elite', price: '120', perks: ['Recovery Zone', 'Tactical Mentorship'], featured: true }, { name: 'Foundry', price: '250', perks: ['Private Architect', 'Unlimited Recovery'] }].map((plan, i) => (
                 <div key={i} className={`glass-card p-16 flex flex-col justify-between transition-all hover:scale-[1.02] ${plan.featured ? 'border-blue-600 bg-blue-600/10' : ''}`}>
                    <div>
                      <h4 className="text-xs font-black tracking-widest uppercase text-white/40 mb-12 tracking-widest uppercase">Protocol Tier</h4>
                      <div className="flex items-baseline gap-2 mb-12"><span className="text-8xl font-black italic bebas">${plan.price}</span><span className="text-xs font-bold opacity-40 uppercase tracking-widest uppercase">/mo</span></div>
                      <ul className="space-y-6 mb-16">
                        {plan.perks.map(p => (<li key={p} className="flex items-center gap-4 text-xs font-bold uppercase text-white/60 tracking-widest tracking-widest uppercase"><CheckCircle2 size={16} className="text-blue-500" /> {p}</li>))}
                      </ul>
                    </div>
                    <button onClick={() => { setJoinContext(`${plan.name} Tier Enrollment`); setIsJoinOpen(true); }} className={`w-full py-6 text-xs font-black uppercase tracking-[0.2em] transition-all tracking-widest tracking-widest uppercase ${plan.featured ? 'bg-blue-600 text-white' : 'bg-white text-black hover:bg-blue-600 hover:text-white'}`}>Access Protocol</button>
                 </div>
               ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-40 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid lg:grid-cols-12 gap-20 mb-32">
             <div className="lg:col-span-5">
                <ForgeLogo />
                <p className="text-gray-500 max-w-md mt-10 italic leading-relaxed font-medium">Building the next century of athletic excellence through biological engineering.</p>
                <div className="flex gap-4 mt-10">
                   {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (<a key={i} href="#" className="w-14 h-14 glass-card flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer"><Icon size={20} /></a>))}
                </div>
             </div>
             <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 font-black text-[10px] tracking-widest">
                <div className="space-y-8 flex flex-col items-start uppercase tracking-widest tracking-widest uppercase">
                   <h5 className="text-blue-500 uppercase tracking-widest uppercase">Infrastructure</h5>
                   <button onClick={() => scrollToSection('facility')}>Facility</button>
                   <button onClick={() => scrollToSection('results')}>Results</button>
                   <button onClick={() => scrollToSection('trainers')}>Faculty</button>
                </div>
                <div className="space-y-8 col-span-2 md:col-span-1">
                   <h5 className="text-blue-500 uppercase tracking-widest uppercase">The Journal</h5>
                   <form className="flex items-center border-b border-white/10 pb-4">
                      <input type="email" placeholder="IDENTITY@DOMAIN.COM" className="bg-transparent text-[10px] font-bold outline-none flex-1 uppercase tracking-widest uppercase" />
                      <button className="text-blue-500 hover:text-white transition-colors"><Send size={18} /></button>
                   </form>
                </div>
             </div>
          </div>
          <div className="text-[10px] font-bold tracking-[0.5em] text-gray-700 uppercase tracking-widest uppercase">© 2026 FORGEFIT GLOBAL INFRASTRUCTURE</div>
        </div>
      </footer>
    </div>
  );
};

export default App;