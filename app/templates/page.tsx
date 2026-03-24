'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

/* ─── Template Data ─── */
const templates = [
  { id: 'professional-light-v1', name: 'Ivory Archive', category: 'Clásico', color: 'from-[#f5f0e8] to-[#e8e0d0]', accent: '#8B7355', dark: false },
  { id: 'professional-light-v2', name: 'Minimal Academic', category: 'Clásico', color: 'from-white to-[#f7f7f7]', accent: '#374151', dark: false },
  { id: 'classic', name: 'Standard Times', category: 'Clásico', color: 'from-[#f8fafc] to-[#e2e8f0]', accent: '#1e293b', dark: false },
  { id: 'professional-dark-v1', name: 'Aetheric Tech', category: 'Moderno', color: 'from-[#1e1b4b] to-[#0f172a]', accent: '#818cf8', dark: true },
  { id: 'professional-dark-v2', name: 'Midnight Executive', category: 'Moderno', color: 'from-[#020617] to-[#0f172a]', accent: '#e2e8f0', dark: true },
  { id: 'professional-modern-v1', name: 'Indigo Matrix', category: 'Moderno', color: 'from-[#4f46e5] to-[#7c3aed]', accent: '#e0e7ff', dark: true },
  { id: 'professional-modern-v2', name: 'Startup Flow', category: 'Tech', color: 'from-[#3b82f6] to-[#6366f1]', accent: '#dbeafe', dark: true },
  { id: 'modern', name: 'Default Spark', category: 'Tech', color: 'from-[#6366f1] to-[#8b5cf6]', accent: '#c7d2fe', dark: true },
  { id: 'eye-catching-v1', name: 'Rose Curator', category: 'Creativo', color: 'from-[#fb7185] to-[#e11d48]', accent: '#fff1f2', dark: true },
  { id: 'eye-catching-v2', name: 'Vibrant Portfolio', category: 'Creativo', color: 'from-[#f43f5e] to-[#be123c]', accent: '#ffe4e6', dark: true },
];

const categories = ['Todos', 'Clásico', 'Moderno', 'Tech', 'Creativo'];

/* ─── Mini CV Mockup Component ─── */
function CVMockup({ tpl }: { tpl: typeof templates[0] }) {
  const textColor = tpl.dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.4)';
  const headingColor = tpl.dark ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.85)';
  const lineColor = tpl.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const pillBg = tpl.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)';

  return (
    <div className={`w-full h-full bg-gradient-to-br ${tpl.color} p-5 flex flex-col`}>
      {/* Header Area */}
      <div className="mb-3">
        <div className="h-[10px] rounded-full mb-1.5" style={{ width: '55%', backgroundColor: headingColor }} />
        <div className="h-[6px] rounded-full" style={{ width: '35%', backgroundColor: textColor }} />
      </div>

      {/* Divider */}
      <div className="h-px w-full mb-3" style={{ backgroundColor: lineColor }} />

      {/* Two Column Layout */}
      <div className="flex gap-3 flex-1">
        {/* Left Column */}
        <div className="flex-1 space-y-2">
          <div className="h-[7px] rounded-full" style={{ width: '40%', backgroundColor: tpl.accent, opacity: 0.9 }} />
          <div className="h-[5px] rounded-full" style={{ width: '90%', backgroundColor: textColor }} />
          <div className="h-[5px] rounded-full" style={{ width: '75%', backgroundColor: textColor }} />
          <div className="h-[5px] rounded-full" style={{ width: '85%', backgroundColor: textColor }} />

          <div className="pt-2">
            <div className="h-[7px] rounded-full mb-2" style={{ width: '40%', backgroundColor: tpl.accent, opacity: 0.9 }} />
            <div className="h-[5px] rounded-full" style={{ width: '95%', backgroundColor: textColor }} />
            <div className="h-[5px] rounded-full mt-1" style={{ width: '60%', backgroundColor: textColor }} />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[35%] space-y-2">
          <div className="h-[7px] rounded-full" style={{ width: '60%', backgroundColor: tpl.accent, opacity: 0.9 }} />
          <div className="flex flex-wrap gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[14px] rounded-md px-1" style={{ backgroundColor: pillBg, width: `${40 + i * 10}%` }} />
            ))}
          </div>
          <div className="pt-2">
            <div className="h-[7px] rounded-full mb-2" style={{ width: '55%', backgroundColor: tpl.accent, opacity: 0.9 }} />
            <div className="h-[5px] rounded-full" style={{ width: '80%', backgroundColor: textColor }} />
            <div className="h-[5px] rounded-full mt-1" style={{ width: '65%', backgroundColor: textColor }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function TemplateGallery() {
  const [selected, setSelected] = useState('modern');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return templates.filter(tpl => {
      const matchCategory = activeCategory === 'Todos' || tpl.category === activeCategory;
      const matchSearch = tpl.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const selectedTemplate = templates.find(t => t.id === selected);

  return (
    <div className="space-y-10 animate-fade pb-20">
      {/* ── Header ── */}
      <div className="text-center pt-4 space-y-3">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          Elige una <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">plantilla</span>
        </h1>
        <p className="text-slate-500 max-w-lg mx-auto text-sm">
          Todas optimizadas para sistemas ATS. Elige el estilo que mejor represente tu perfil profesional.
        </p>
      </div>

      {/* ── Search Bar ── */}
      <div className="max-w-2xl mx-auto flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar plantillas..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:border-indigo-500/50 transition-all text-sm"
          />
        </div>
        <button className="px-6 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/20 whitespace-nowrap">
          Buscar
        </button>
      </div>

      {/* ── Category Pills ── */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20'
                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Template Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((tpl) => (
            <motion.div
              key={tpl.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelected(tpl.id)}
              className="cursor-pointer group"
            >
              {/* Preview Card */}
              <div className={`aspect-[4/5] w-full rounded-2xl overflow-hidden transition-all duration-200 ${
                selected === tpl.id
                  ? 'ring-[3px] ring-indigo-500 ring-offset-4 ring-offset-[#020203] shadow-2xl shadow-indigo-500/20'
                  : 'ring-1 ring-white/10 group-hover:ring-2 group-hover:ring-white/20 group-hover:shadow-xl group-hover:shadow-black/40'
              }`}>
                <CVMockup tpl={tpl} />
              </div>

              {/* Title */}
              <div className="mt-3.5 px-1">
                <h3 className={`text-[15px] font-semibold transition-colors ${
                  selected === tpl.id ? 'text-indigo-400' : 'text-slate-300 group-hover:text-white'
                }`}>
                  {tpl.name}
                </h3>
                <p className="text-[11px] text-slate-600 mt-0.5">{tpl.category}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Empty State ── */}
      {filtered.length === 0 && (
        <div className="text-center py-16 opacity-40">
          <Search size={40} className="mx-auto mb-4" />
          <p className="text-lg font-bold">Sin resultados</p>
          <p className="text-sm text-slate-500">Prueba con otra búsqueda o categoría.</p>
        </div>
      )}

      {/* ── Sticky Footer CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
            <Sparkles className="text-indigo-400" size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold">
              {selectedTemplate ? (
                <>Plantilla seleccionada: <span className="text-indigo-400">{selectedTemplate.name}</span></>
              ) : (
                'Selecciona una plantilla'
              )}
            </h3>
            <p className="text-xs text-slate-500">Optimizada para ATS · Formato profesional · Descarga PDF/Word</p>
          </div>
        </div>
        <Link href={`/cvs/new?template=${selected}`}>
          <button className="flex items-center gap-2 px-8 py-3.5 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-white/10 whitespace-nowrap">
            Usar esta plantilla
            <ArrowRight size={18} />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
