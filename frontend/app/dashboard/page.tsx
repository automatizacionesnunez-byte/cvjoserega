'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Upload, 
  TrendingUp, 
  FileCheck,
  Zap,
  ChevronRight,
  Sparkles,
  FileText,
  Search,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [stats, setStats] = useState({
    cvs: 0,
    leads: 12, // Mocked total
    matchScore: 88,
    interviews: 0
  });
  const [cvs, setCvs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const uid = session?.user?.id || 'demo-user-123';
        const name = session?.user?.user_metadata?.full_name || session?.user?.email?.split('@')[0] || 'Candidato';
        setUserName(name);

        const res = await fetch(`http://127.0.0.1:8000/api/cvs/${uid}`);
        const data = await res.json();
        setCvs(data.slice(0, 5)); // Just the last 5
        setStats((prev: any) => ({ ...prev, cvs: data.length }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-10 animate-fade">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-black tracking-tight">Hola, <span className="text-indigo-400">{userName || 'Candidato'}</span></h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Pro Member</span>
          </div>
          <p className="text-slate-400">Gestiona tu carrera con inteligencia artificial de nivel experto.</p>
        </div>
        <Link href="/cvs/new">
          <button className="flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-purple-500/30">
            <Plus size={20} />
            Nuevo CV Optimizado
          </button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'CVs Guardados', value: stats.cvs.toString(), icon: FileText, color: 'text-indigo-400' },
          { label: 'Oportunidades', value: stats.leads.toString(), icon: Search, color: 'text-purple-400' },
          { label: 'Match Promedio', value: stats.matchScore + '%', icon: Sparkles, color: 'text-emerald-400' },
          { label: 'Entrevistas Prep', value: stats.interviews.toString(), icon: Zap, color: 'text-amber-400' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 flex flex-col items-start space-y-4 hover:bg-white/[0.04] transition-all border-white/5"
          >
            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Start / Upload */}
        <div className="lg:col-span-2 space-y-6">
          <Link href="/cvs/new">
            <div className="glass-card p-8 border-dashed border-2 border-white/5 hover:border-purple-500/30 transition-all group cursor-pointer relative overflow-hidden bg-gradient-to-br from-indigo-500/[0.02] to-transparent">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col items-center text-center py-12 relative z-10">
                <div className="w-16 h-16 rounded-3xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <Upload className="text-purple-400 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Importar Currículum Actual</h3>
                <p className="text-slate-400 max-w-sm mb-8 text-sm leading-relaxed">Sube tu PDF actual y nuestra IA lo estructurará automáticamente para que puedas optimizarlo para cada oferta.</p>
                <div className="px-10 py-3 bg-white/5 rounded-xl font-bold border border-white/10 uppercase tracking-widest text-[10px] group-hover:bg-white/10 transition-colors">
                  Empezar ahora
                </div>
              </div>
            </div>
          </Link>

          <div className="flex justify-between items-center px-2 pt-4">
            <h2 className="text-xl font-bold">Currículums Recientes</h2>
            <Link href="/cvs" className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors">Ver Biblioteca completa</Link>
          </div>

          <div className="space-y-4">
            {loading ? (
               <div className="flex justify-center py-10"><RefreshCw className="animate-spin text-slate-700" size={24} /></div>
            ) : cvs.length === 0 ? (
              <div className="text-center py-20 glass-card bg-white/[0.01] border-dashed border-white/5 flex flex-col items-center text-slate-600">
                <FileText size={40} className="mb-4 opacity-20" />
                <p className="font-bold">Aún no has creado ningún CV.</p>
                <p className="text-xs">Usa el botón de arriba para empezar.</p>
              </div>
            ) : cvs.map((item) => (
              <Link key={item.id} href={`/cvs/${item.id}/edit`}>
                <div className="glass-card p-5 flex items-center justify-between group hover:bg-white/[0.04] cursor-pointer mb-4 border-white/5 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-indigo-500/30 transition-all">
                      <FileCheck size={22} className="text-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <h4 className="font-bold group-hover:text-indigo-400 transition-colors text-sm">{item.title}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mt-1">{new Date(item.updated_at).toLocaleDateString()} • {item.template_id || 'modern'}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar Actions / Tips */}
        <div className="space-y-6">
          <div className="glass-card p-8 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border-indigo-500/20 relative overflow-hidden group">
            <Sparkles className="text-indigo-400 mb-6 group-hover:rotate-12 transition-transform" size={28} />
            <h3 className="text-lg font-bold mb-3">Hack de Carrera 💡</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              "El 70% de los reclutadores buscan logros cuantificables. Usa números y porcentajes en tu sección de experiencia para destacar."
            </p>
            <Link href="/blog" className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300">Leer Artículo completo</Link>
          </div>

          <div className="glass-card p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl -z-10" />
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center justify-between">
              Meta de Carrera
              <TrendingUp size={14} className="text-emerald-400" />
            </h3>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-xs mb-3 font-bold">
                  <span className="text-slate-400">Perfil ATS Optimizado</span>
                  <span className="text-indigo-400 uppercase tracking-widest">80% Competitivo</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.3)]" 
                  />
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                  Te faltan <span className="text-white font-bold">2 certificaciones</span> y <span className="text-white font-bold">1 proyecto técnico</span> para alcanzar el nivel "Elite Headhunter".
                </p>
              </div>
              <Link href="/cvs/new" className="block">
                <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all text-slate-400 hover:text-white">
                  Ver Recomendaciones AI
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
