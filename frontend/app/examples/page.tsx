'use client';

import { motion } from 'framer-motion';
import { FileText, ExternalLink, Download, Search, Eye } from 'lucide-react';
import Link from 'next/link';

const examples = [
  { title: 'Ingeniero Full-Stack', industry: 'Tech', experience: 'Senior (5+ años)', template: 'Indigo Matrix', score: 94, color: 'from-indigo-500 to-purple-600' },
  { title: 'Product Manager', industry: 'Tech', experience: 'Mid (3-5 años)', template: 'Startup Flow', score: 91, color: 'from-blue-500 to-indigo-500' },
  { title: 'Diseñador UX/UI', industry: 'Diseño', experience: 'Senior (5+ años)', template: 'Rose Curator', score: 89, color: 'from-pink-500 to-rose-600' },
  { title: 'Data Scientist', industry: 'Tech', experience: 'Junior (1-3 años)', template: 'Aetheric Tech', score: 87, color: 'from-slate-700 to-indigo-900' },
  { title: 'Marketing Manager', industry: 'Marketing', experience: 'Senior (5+ años)', template: 'Vibrant Portfolio', score: 92, color: 'from-rose-500 to-pink-600' },
  { title: 'Abogado Corporativo', industry: 'Legal', experience: 'Senior (5+ años)', template: 'Ivory Archive', score: 95, color: 'from-stone-300 to-stone-400' },
  { title: 'Enfermero/a Especialista', industry: 'Sanidad', experience: 'Mid (3-5 años)', template: 'Minimal Academic', score: 88, color: 'from-white to-slate-200' },
  { title: 'Profesor Universitario', industry: 'Educación', experience: 'Senior (5+ años)', template: 'Standard Times', score: 93, color: 'from-slate-200 to-slate-300' },
  { title: 'DevOps Engineer', industry: 'Tech', experience: 'Mid (3-5 años)', template: 'Midnight Executive', score: 90, color: 'from-slate-800 to-black' },
];

const industries = ['Todos', 'Tech', 'Diseño', 'Marketing', 'Legal', 'Sanidad', 'Educación'];

export default function Examples() {
  return (
    <div className="space-y-10 animate-fade pb-20">
      <div className="text-center pt-4 space-y-3">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          Ejemplos de <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">CV Reales</span>
        </h1>
        <p className="text-slate-500 max-w-lg mx-auto text-sm">CVs optimizados por nuestra IA con puntuaciones ATS reales. Usa cualquiera como inspiración.</p>
      </div>

      <div className="max-w-xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input type="text" placeholder="Buscar por cargo o industria..." className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:border-indigo-500/50 transition-all text-sm" />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {industries.map(ind => (
          <button key={ind} className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${ind === 'Todos' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'}`}>
            {ind}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {examples.map((ex, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card overflow-hidden group hover:bg-white/[0.03] transition-all cursor-pointer"
          >
            {/* Mini Preview */}
            <div className={`h-40 bg-gradient-to-br ${ex.color} relative p-4`}>
              <div className="bg-white/90 w-full h-full rounded-lg p-3 space-y-2">
                <div className="h-[6px] w-1/2 bg-slate-200 rounded" />
                <div className="h-[4px] w-1/3 bg-slate-100 rounded" />
                <div className="h-px w-full bg-slate-100 mt-2" />
                <div className="flex gap-2 flex-1">
                  <div className="flex-1 space-y-1">
                    <div className="h-[4px] w-3/4 bg-slate-100 rounded" />
                    <div className="h-[4px] w-full bg-slate-50 rounded" />
                    <div className="h-[4px] w-2/3 bg-slate-50 rounded" />
                  </div>
                  <div className="w-[30%] space-y-1">
                    <div className="h-[4px] w-full bg-slate-100 rounded" />
                    <div className="h-[4px] w-3/4 bg-slate-50 rounded" />
                  </div>
                </div>
              </div>
              {/* ATS Score Badge */}
              <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-black px-2 py-1 rounded-lg shadow-lg">
                ATS {ex.score}%
              </div>
            </div>

            <div className="p-5 space-y-3">
              <h3 className="font-bold text-lg group-hover:text-indigo-400 transition-colors">{ex.title}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-1 rounded">{ex.industry}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-1 rounded">{ex.experience}</span>
              </div>
              <p className="text-xs text-slate-600">Template: <span className="text-indigo-400 font-bold">{ex.template}</span></p>
              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all">
                  <Eye size={12} /> Ver
                </button>
                <button className="flex-1 py-2 bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all">
                  <Download size={12} /> Usar
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
