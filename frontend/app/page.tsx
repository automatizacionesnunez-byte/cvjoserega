'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Search, 
  FileCheck, 
  Zap, 
  Sparkles, 
  Check, 
  Globe,
  PenTool,
  BrainCircuit,
  Rocket,
  ExternalLink
} from 'lucide-react';

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  if (loading) return null;
  return (
    <div className="min-h-screen bg-[#020203] text-white selection:bg-purple-500/30">
      {/* Floating Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <PenTool className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter">
            CV<span className="text-purple-500">Pilot</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">
            Acceder
          </Link>
          <Link href="/dashboard">
            <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-slate-200 transition-all shadow-lg shadow-white/5">
              Registrarse
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-indigo-400 mb-8">
            <Sparkles size={14} />
            El Futuro de la Búsqueda de Empleo ya está aquí
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[1.1] mb-8 tracking-tighter">
            Transforma cada oferta en una <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-fill-transparent text-transparent">Entrevista</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Optimización de CVs con IA nivel experto, descubridor de leads estratégicos y exportación profesional que los ATS adoran.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/dashboard">
              <button className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-purple-500/20 hover:scale-105 transition-all overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <span className="flex items-center gap-3">
                  Empezar Gratis Ahora
                  <ArrowRight size={22} />
                </span>
              </button>
            </Link>
            <div className="flex items-center gap-4 text-slate-500 font-medium">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020203] bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                    {i}
                  </div>
                ))}
              </div>
              <span className="text-sm">+1.2k usuarios activos</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="relative z-10 py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Potencia tu búsqueda con IA</h2>
          <p className="text-slate-500">Todo lo que necesitas para vencer al mercado laboral actual.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Análisis Experto', 
              desc: 'Nuestra IA audita tu CV como un reclutador de Fortune 500.', 
              icon: BrainCircuit, 
              color: 'text-indigo-400',
              bg: 'bg-indigo-500/10'
            },
            { 
              title: 'Lead Finder', 
              desc: 'Encuentra directores de RRHH y sus emails directos en segundos.', 
              icon: Search, 
              color: 'text-purple-400',
              bg: 'bg-purple-500/10'
            },
            { 
              title: 'Exportación Premium', 
              desc: 'Genera PDFs pixel-perfect y archivos Word optimizados para ATS.', 
              icon: FileCheck, 
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10'
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={feature.color} size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-32 px-8 max-w-7xl mx-auto">
        <div className="glass-card p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
            <Rocket className="text-purple-500/20 w-48 h-48 -rotate-12" />
          </div>
          
          <h2 className="text-4xl font-bold mb-6">Planes adaptados a tu ambición</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
            {[
              { name: 'Básico', price: '0€', features: ['3 CVs/mes', 'Análisis Básico', 'Exportación PDF'] },
              { name: 'Pro', price: '19€', features: ['CVs Ilimitados', 'Análisis Experto (HR-AI)', 'Lead Finder (50/mes)', 'Soporte Prioritario'], active: true },
              { name: 'Elite', price: '49€', features: ['Todo lo Pro', 'Leads Ilimitados', 'Simulador de Entrevistas', 'Traducción Multi-idioma'] },
            ].map((plan, i) => (
              <div key={i} className={`p-8 rounded-3xl border transition-all ${plan.active ? 'bg-indigo-600 border-indigo-400 scale-105 shadow-2xl shadow-indigo-500/20' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-sm opacity-60">/mes</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-medium">
                      <Check size={16} className={plan.active ? 'text-white' : 'text-indigo-400'} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard">
                  <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.active ? 'bg-white text-indigo-600 hover:bg-slate-100' : 'bg-white/10 hover:bg-white/20'}`}>
                    Seleccionar
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-8 border-t border-white/5 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-slate-500 text-sm">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
               <PenTool size={16} />
             </div>
             <span className="font-bold text-white tracking-tighter">CV-Pilot</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
          <p>© 2026 CV-Pilot AI. Built for Winners.</p>
        </div>
      </footer>
    </div>
  );
}
