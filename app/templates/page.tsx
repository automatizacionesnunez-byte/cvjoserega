'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Maximize2, X } from 'lucide-react';
import Link from 'next/link';

/* ─── Template Data ─── */
const templates = [
  { 
    id: 'ceo-premium-v1', 
    name: 'CEO Premium', 
    category: 'Executive', 
    color: 'bg-[#1a2744]', 
    accent: '#d4ac0d', 
    secondary: '#f7f5f0',
    dark: true 
  },
  { 
    id: 'executive-sidebar-v1', 
    name: 'Executive Sidebar', 
    category: 'Executive', 
    color: 'bg-[#1a2744]', 
    accent: '#d4ac0d', 
    secondary: '#ffffff',
    dark: true 
  },
  { 
    id: 'modern-full-sidebar-v1', 
    name: 'Modern Full Sidebar', 
    category: 'Modern', 
    color: 'bg-[#008080]', 
    accent: '#008080', 
    secondary: '#ffffff',
    dark: true 
  },
  { 
    id: 'tech-clean-v1', 
    name: 'Tech Clean', 
    category: 'Tech', 
    color: 'bg-[#1a1a1a]', 
    accent: '#0066cc', 
    secondary: '#f4f7f6',
    dark: true 
  },
  { 
    id: 'ux-split-v1', 
    name: 'UX Split', 
    category: 'Creative', 
    color: 'bg-[#ff4d4d]', 
    accent: '#ff4d4d', 
    secondary: '#ffffff',
    dark: true 
  }
];

import { A4Preview } from '@/app/components/A4Preview';

/* ─── Main Component ─── */
export default function TemplateGallery() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [showLarge, setShowLarge] = useState(false);
  const tpl = selectedTemplate;

  return (
    <div className="space-y-12 animate-fade pb-20 max-w-6xl mx-auto px-4">
      {/* ── Header ── */}
      <div className="text-center pt-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-2">
          <Sparkles size={14} className="text-indigo-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Diseños Optimizados</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none italic uppercase">
          NUESTRAS <span className="text-indigo-500 underline decoration-[#d4ac0d]/30 decoration-8 underline-offset-8">PLANTILLAS</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-base font-medium">
          Selección de diseños especializados para cargos C-Level, perfiles técnicos y creativos senior.
        </p>
      </div>

      <div className="grid md:grid-cols-[450px_1fr] gap-16 items-start bg-white/[0.02] p-6 md:p-12 rounded-[60px] border border-white/5 relative overflow-hidden group mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full -mr-48 -mt-24 pointer-events-none"></div>
        
        {/* Visual Preview */}
        <div className="relative group/preview cursor-zoom-in" onClick={() => setShowLarge(true)}>
          <div className="aspect-[1/1.414] w-full rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-all group-hover/preview:scale-[1.02] group-hover/preview:shadow-indigo-500/20 relative bg-[#0a0a0c]">
             <div className="absolute inset-0 flex items-start justify-center overflow-hidden">
                <div className="origin-top transform-gpu scale-[0.45] md:scale-[0.55]">
                   <A4Preview templateId={tpl.id} />
                </div>
             </div>
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm rounded-2xl">
             <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                   <Maximize2 className="text-white" size={32} />
                </div>
                <p className="text-white font-black uppercase tracking-[0.3em] text-[10px]">Ver nítido</p>
             </div>
          </div>
        </div>

        {/* Content & Benefits */}
        <div className="space-y-10 pt-4 relative z-10">
           <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic">{tpl.name}</h2>
              <div className="flex gap-4">
                 <span className="text-indigo-400 font-bold uppercase tracking-[0.2em] text-[10px] bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">{tpl.category}</span>
                 <span className="text-[#d4ac0d] font-bold uppercase tracking-[0.2em] text-[10px] bg-[#d4ac0d]/10 px-3 py-1 rounded-full border border-[#d4ac0d]/20">ATS READY</span>
              </div>
           </div>

           <p className="text-slate-400 leading-relaxed text-sm md:text-base">
             Cada plantilla ha sido validada por expertos en selección para garantizar la máxima legibilidad y una presentación impecable.
           </p>

           <div className="grid gap-5">
              {[
                "Jerarquía visual optimizada",
                "Tipografías modernas (Google Fonts)",
                "Diseño pixel-perfect",
                "Totalmente integrado con el motor PDF",
                "Estructura modular personalizada"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-4 group/item">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                     <CheckCircle2 size={16} className="text-green-500" />
                  </div>
                  <span className="text-slate-300 text-sm md:text-base font-semibold">{benefit}</span>
                </div>
              ))}
           </div>

           <div className="pt-10 flex flex-col sm:flex-row gap-6">
             <Link href={`/cvs/new?template=${tpl.id}`} className="flex-1">
               <button className="w-full group flex items-center justify-center gap-4 px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-slate-100 transition-all shadow-2xl shadow-indigo-500/10">
                 Usar este modelo
                 <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
               </button>
             </Link>
             <button 
                onClick={() => setShowLarge(true)}
                className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full font-black uppercase tracking-widest text-[10px] transition-all"
             >
                Ver en Detalle
             </button>
           </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-black italic tracking-tighter uppercase px-2 border-l-4 border-indigo-500">Otras Opciones</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {templates.map((t) => (
            <motion.div
              key={t.id}
              whileHover={{ y: -5 }}
              className={`cursor-pointer rounded-3xl p-4 transition-all border ${
                tpl.id === t.id 
                  ? 'bg-indigo-500/10 border-indigo-500/30 ring-2 ring-indigo-500/20' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
              onClick={() => setSelectedTemplate(t)}
            >
              <div className="aspect-[1/1.414] rounded-2xl overflow-hidden mb-4 shadow-lg ring-1 ring-white/10 relative bg-[#0a0a0c]">
                <div className="absolute inset-0 flex items-start justify-center overflow-hidden">
                   <div className="origin-top transform-gpu scale-[0.22] md:scale-[0.25] lg:scale-[0.28]">
                      <A4Preview templateId={t.id} />
                   </div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{t.category}</div>
                <div className="text-[11px] font-bold text-white truncate uppercase">{t.name}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Large Preview Modal ── */}
      <AnimatePresence>
        {showLarge && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
          >
            <button 
              onClick={() => setShowLarge(false)}
              className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all z-[110]"
            >
              <X size={32} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-4xl w-full h-full md:h-[90vh] overflow-y-auto rounded-xl shadow-2xl custom-scrollbar flex justify-center p-4"
            >
                <div className="min-w-[794px] max-w-[794px] h-fit bg-white">
                   <A4Preview templateId={tpl.id} />
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footnote ── */}
      <div className="text-center opacity-40 py-12">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Optimización Continua v2.0</p>
      </div>
    </div>
  );
}
