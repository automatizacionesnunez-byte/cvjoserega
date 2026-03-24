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
  ShieldCheck,
  ZapIcon
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
    <div className="min-h-screen bg-[#020203] text-slate-200 selection:bg-purple-500/30 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#020203]/80 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <PenTool className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">
              CV<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Pilot</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Características</Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Precios</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-slate-400 hover:text-white px-4 transition-colors">
              Log In
            </Link>
            <Link href="/register">
              <button className="bg-white text-black px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-tighter hover:bg-indigo-50 transition-all active:scale-95 shadow-lg shadow-white/5">
                Join Now
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-48 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-8"
          >
            <ZapIcon size={12} className="fill-current" />
            Impulsado por DeepSeek v3.1
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-8"
          >
            Consigue la <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 to-purple-600">Entrevista</span> de tu vida
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Optimización de CVs con inteligencia artificial nivel experto, buscador de leads directos y exportación profesional que los ATS adoran.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/register">
              <button className="group relative bg-white text-black px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10">
                Lanzar mi carrera
                <ArrowRight className="inline-span ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </Link>
            
            <div className="flex items-center gap-4 py-4 px-6 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-[#020203] bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                    {i}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-white">+1,200 profesionales</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Confiando en CV-Pilot</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="relative z-10 py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">El motor de IA más potente</h2>
            <p className="text-slate-500 font-medium">Diseñado por y para expertos en reclutamiento IT.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Auditoría Experta', 
                desc: 'Análisis profundo de palabras clave, estructura y verbos de acción para superar cualquier ATS.', 
                icon: BrainCircuit, 
                color: 'text-indigo-400',
                glow: 'group-hover:shadow-indigo-500/20'
              },
              { 
                title: 'Strategic Lead Finder', 
                desc: 'Identifica a los "hiring managers" directamente y obtén sus perfiles verificados.', 
                icon: Search, 
                color: 'text-purple-400',
                glow: 'group-hover:shadow-purple-500/20'
              },
              { 
                title: 'Exportación HD', 
                desc: 'Descarga PDFs Premium con diseños que destacan entre miles de aplicaciones.', 
                icon: FileCheck, 
                color: 'text-emerald-400',
                glow: 'group-hover:shadow-emerald-500/20'
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="group p-10 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 transition-transform ${feature.glow}`}>
                  <feature.icon className={feature.color} size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Big Call to Action */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative p-12 md:p-24 rounded-[48px] overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-800 shadow-2xl shadow-indigo-500/10">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Rocket size={400} className="-rotate-12" />
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">¿Listo para triplicar tus llamadas?</h2>
              <p className="text-indigo-100 text-lg md:text-xl mb-12 opacity-80 leading-relaxed font-medium">
                Únete a la nueva generación de candidatos que usan la tecnología para posicionarse donde merecen.
              </p>
              <Link href="/register">
                <button className="bg-white text-indigo-700 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl">
                  Empezar ahora gratis
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-32 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-white tracking-tighter mb-4">Planes Transparentes</h2>
            <p className="text-slate-500 font-medium">Sin comisiones, sin permanencia. Cancela cuando quieras.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: 'Starter', price: '0', desc: 'Para búsquedas puntuales.', features: ['3 CVs Optimizados', 'Análisis Básico', 'Exportación PDF Std'] },
              { name: 'Professional', price: '19', active: true, desc: 'Nuestra opción más popular.', features: ['CVs Ilimitados', 'Análisis Experto (HR-AI)', 'Lead Finder (50/mes)', 'Soporte 24/7'] },
              { name: 'Elite', price: '49', desc: 'Para dominar el mercado.', features: ['Todo lo Pro', 'Leads Ilimitados', 'Simulador de Entrevista', 'Traducción Multi-idioma'] },
            ].map((plan, i) => (
              <div key={i} className={`p-10 rounded-[32px] border flex flex-col transition-all ${plan.active ? 'bg-white text-black border-white scale-105 shadow-2xl shadow-white/5' : 'bg-white/[0.02] border-white/5 text-slate-200'}`}>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">{plan.name}</h3>
                <p className={`text-sm mb-10 font-bold ${plan.active ? 'text-slate-600' : 'text-slate-500'}`}>{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-12">
                  <span className="text-6xl font-black leading-none">{plan.price}€</span>
                  <span className="text-sm font-bold opacity-60">/mes</span>
                </div>
                <ul className="space-y-4 mb-12 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-bold">
                      <ShieldCheck size={18} className={plan.active ? 'text-indigo-600' : 'text-emerald-500'} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <button className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${plan.active ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-500/20' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                    Seleccionar Plan
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 pt-32 pb-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16 text-slate-500">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                 <PenTool size={16} />
               </div>
               <span className="font-black text-white text-lg tracking-tighter">CV-Pilot</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest">
              <Link href="#" className="hover:text-white transition-colors">Términos</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
              <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="#" className="hover:text-white transition-colors">Contacto</Link>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-white/5">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">© 2026 CV-Pilot AI. Engine by Automatizaciones Nuñez Byte.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
