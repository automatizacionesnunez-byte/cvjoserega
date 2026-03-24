'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, Search, User } from 'lucide-react';
import Link from 'next/link';

const posts = [
  { slug: 'ats-keywords-2026', title: 'Cómo Superar los Filtros ATS en 2026', excerpt: 'Los sistemas ATS han evolucionado. Aprende las 10 técnicas que los expertos en RRHH recomiendan para que tu CV nunca sea descartado automáticamente.', category: 'ATS', date: '22 Mar 2026', readTime: '6 min', color: 'text-blue-400' },
  { slug: 'ai-resume-writing', title: 'IA para Escribir CVs: Guía Completa', excerpt: 'Descubre cómo usar la inteligencia artificial de forma ética y efectiva para crear CVs que impresionen a recruiters y pasen filtros automáticos.', category: 'IA', date: '20 Mar 2026', readTime: '8 min', color: 'text-purple-400' },
  { slug: 'cover-letter-formula', title: 'La Fórmula de la Cover Letter Perfecta', excerpt: 'Estructura probada en 10,000+ aplicaciones que triplica tu tasa de respuesta. Incluye plantilla descargable.', category: 'Carrera', date: '18 Mar 2026', readTime: '5 min', color: 'text-emerald-400' },
  { slug: 'linkedin-optimization', title: 'LinkedIn en 2026: Las 7 Claves de Visibilidad', excerpt: 'Tu perfil de LinkedIn es tu tarjeta de visita digital. Estos 7 cambios pueden aumentar tus views un 400%.', category: 'LinkedIn', date: '15 Mar 2026', readTime: '7 min', color: 'text-blue-400' },
  { slug: 'salary-negotiation', title: 'Negociación Salarial: Lo que Nadie te Dice', excerpt: 'Estrategias avanzadas de negociación basadas en datos del mercado para maximizar tu compensación.', category: 'Carrera', date: '12 Mar 2026', readTime: '9 min', color: 'text-amber-400' },
  { slug: 'remote-job-cv', title: 'Cómo Adaptar tu CV para Trabajo Remoto', excerpt: 'Las empresas remote-first buscan habilidades específicas. Aprende a destacarlas en tu currículum.', category: 'Remoto', date: '10 Mar 2026', readTime: '5 min', color: 'text-emerald-400' },
];

const categories = ['Todos', 'ATS', 'IA', 'Carrera', 'LinkedIn', 'Remoto'];

export default function Blog() {
  return (
    <div className="space-y-10 animate-fade pb-20">
      {/* Header */}
      <div className="text-center pt-4 space-y-3">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          Recursos <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Profesionales</span>
        </h1>
        <p className="text-slate-500 max-w-lg mx-auto text-sm">Guías, tips y estrategias de expertos en RRHH para dominar tu búsqueda de empleo.</p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input type="text" placeholder="Buscar artículos..." className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:border-indigo-500/50 transition-all text-sm" />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(cat => (
          <button key={cat} className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${cat === 'Todos' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card p-0 overflow-hidden group hover:bg-white/[0.03] transition-all cursor-pointer"
          >
            {/* Color Bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${
              post.category === 'ATS' ? 'from-blue-500 to-cyan-500' :
              post.category === 'IA' ? 'from-purple-500 to-indigo-500' :
              post.category === 'LinkedIn' ? 'from-blue-600 to-blue-400' :
              post.category === 'Carrera' ? 'from-amber-500 to-orange-500' :
              'from-emerald-500 to-teal-500'
            }`} />

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className={`font-black uppercase tracking-widest ${post.color}`}>{post.category}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
              </div>
              <h3 className="text-lg font-bold leading-snug group-hover:text-indigo-400 transition-colors">{post.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-600">{post.date}</span>
                <span className="text-xs text-indigo-400 font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Leer <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
