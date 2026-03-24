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
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { API_BASE_URL } from '../lib/api';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    cvs: 0,
    leads: 12,
    matchScore: 88,
    interviews: 0
  });
  const [cvs, setCvs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const guestMode = localStorage.getItem('cvpilot_guest_mode') === 'true';
        setIsGuest(guestMode);

        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session && !guestMode) {
          router.push('/login');
          return;
        }

        const uid = session?.user?.id || 'guest-001';
        const name = session?.user?.user_metadata?.full_name || session?.user?.email?.split('@')[0] || (guestMode ? 'Invitado Beta' : 'Candidato');
        setUserName(name);

        // Fetch user CVs (if guest, they might have 0 or some demo data)
        const res = await fetch(`${API_BASE_URL}/api/cvs/${uid}`);
        if (res.ok) {
          const data = await res.json();
          setCvs(data.slice(0, 5));
          setStats((prev: any) => ({ ...prev, cvs: data.length }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  const exitGuestMode = () => {
    localStorage.removeItem('cvpilot_guest_mode');
    router.push('/');
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <RefreshCw className="animate-spin text-purple-500" size={40} />
      <p className="text-sm font-black uppercase tracking-widest text-slate-500">Iniciando Ecosistema AI...</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-fade pb-20">
      {isGuest && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 bg-amber-500/10 border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
             <AlertCircle className="text-amber-400" size={20} />
             <p className="text-xs font-bold text-amber-200 uppercase tracking-widest">
               Modo Beta / Sesión de Invitado: Los datos del navegador se borrarán si reinicias la sesión.
             </p>
          </div>
          <button 
            onClick={exitGuestMode}
            className="px-6 py-2 bg-amber-500 text-[10px] font-black uppercase tracking-widest text-black rounded-lg hover:bg-amber-400 transition-colors"
          >
            Finalizar Demo
          </button>
        </motion.div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-black tracking-tighter">
              Hola, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{userName}</span>
            </h1>
            <span className={`px-2 py-0.5 rounded-full ${isGuest ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/20 text-emerald-400'} text-[9px] font-black uppercase tracking-widest border border-white/5`}>
              {isGuest ? 'Beta Access' : 'Pro Member'}
            </span>
          </div>
          <p className="text-slate-500 font-medium">Gestiona tu carrera con inteligencia artificial de nivel experto.</p>
        </div>
        <Link href="/cvs/new">
          <button className="flex items-center gap-4 bg-white text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-white/5 hover:scale-[1.02] active:scale-95 transition-all">
            <Plus size={20} className="stroke-[3]" />
            Nueva Optimización
          </button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'CVs Activos', value: stats.cvs.toString(), icon: FileText, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
          { label: 'Match Rate', value: stats.matchScore + '%', icon: Sparkles, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Leads IA', value: stats.leads.toString(), icon: Search, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Ahorro Tiempo', value: '45h', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all overflow-hidden"
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
              <stat.icon className={stat.color} size={28} />
            </div>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <h3 className="text-4xl font-black text-white">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <Link href="/cvs/new">
            <div className="relative group overflow-hidden p-1 bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-500 rounded-[40px] shadow-2xl shadow-indigo-500/10 transition-transform hover:scale-[1.01]">
              <div className="relative bg-[#0a0a0c] rounded-[39px] p-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-[28px] bg-white/5 flex items-center justify-center mb-8 border border-white/5 shadow-inner group-hover:rotate-12 transition-transform">
                  <Upload className="text-white w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Importar Perfil Profesional</h3>
                <p className="text-slate-500 max-w-sm mb-10 text-lg leading-relaxed font-medium">Sube tu PDF y deja que nuestra IA haga el trabajo sucio.</p>
                <div className="px-12 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-slate-100 transition-colors shadow-xl">
                  Empezar Ahora
                </div>
              </div>
            </div>
          </Link>

          <div className="flex justify-between items-center px-4">
             <h2 className="text-xl font-black uppercase tracking-tight">Experiencia Reciente</h2>
             <Link href="/cvs" className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400/50 hover:text-white transition-colors">Historial Completo</Link>
          </div>

          <div className="space-y-4">
            {cvs.length === 0 ? (
              <div className="text-center py-20 rounded-[32px] bg-white/[0.01] border border-dashed border-white/5 flex flex-col items-center text-slate-600">
                <FileText size={48} className="mb-6 opacity-10" />
                <p className="font-black uppercase tracking-widest text-xs">Sin documentos generados</p>
                <p className="text-[10px] mt-2 font-bold opacity-50">Tu legado comienza aqu&iacute;.</p>
              </div>
            ) : cvs.map((item) => (
              <Link key={item.id} href={`/cvs/${item.id}/edit`}>
                <div className="group p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-indigo-500/20 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-indigo-500/10 transition-all">
                      <FileCheck size={28} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-black text-white group-hover:text-indigo-400 transition-colors">{item.title}</h4>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mt-2">
                        {new Date(item.updated_at).toLocaleDateString()} • MATCH 92%
                      </p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:translate-x-1 transition-all">
                    <ChevronRight size={20} className="text-slate-700 group-hover:text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-8">
           <div className="p-10 rounded-[40px] bg-gradient-to-br from-indigo-600 to-purple-800 relative overflow-hidden group shadow-2xl shadow-indigo-500/10">
              <Sparkles className="text-white mb-8 opacity-40 group-hover:scale-125 transition-transform" size={40} />
              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight leading-none">Career Hack <br/> Semanal</h3>
              <p className="text-indigo-100/70 text-base font-medium leading-relaxed mb-10">
                "Usa métricas tangibles. No digas 'Mejoré las ventas', di 'Crecimiento del 45% en 6 meses'."
              </p>
              <button className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all backdrop-blur-md">
                Ver Gu&iacute;a de impacto
              </button>
           </div>

           <div className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-10">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Estado Competitivo</h3>
                <TrendingUp size={16} className="text-emerald-400" />
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-end mb-2">
                   <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Nivel Senior IT</span>
                   <span className="text-2xl font-black text-white">82%</span>
                 </div>
                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '82%' }}
                    className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                   />
                 </div>
                 <p className="text-[10px] font-medium text-slate-500 mt-4 leading-relaxed italic">
                   A&ntilde;ade 3 proyectos de Cloud para desbloquear el nivel "Expert Architect".
                 </p>
              </div>

              <button className="w-full py-5 rounded-2xl bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white hover:bg-white/10 border border-white/5 transition-all">
                Optimizar Perfil
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
