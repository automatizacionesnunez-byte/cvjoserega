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
  ZapIcon,
  Play
} from 'lucide-react';

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      // Check if already in guest mode
      if (localStorage.getItem('cvpilot_guest_mode') === 'true') {
        router.push('/dashboard');
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  const enterAsGuest = () => {
    localStorage.setItem('cvpilot_guest_mode', 'true');
    router.push('/dashboard');
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#020203] text-slate-200 selection:bg-purple-500/30 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#020203]/80 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <PenTool className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              CV<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Pilot</span>
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            <Link href="#features" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Características</Link>
            <Link href="#pricing" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Precios</Link>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={enterAsGuest} className="hidden sm:block text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white px-4 transition-colors">
              Modo Beta
            </button>
            <Link href="/login">
              <button className="bg-white text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all active:scale-95 shadow-2xl shadow-white/10">
                Log In
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-56 pb-40 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-10 shadow-xl shadow-indigo-500/5"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            Acceso Beta Público Disponible
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tight mb-10"
          >
            Hackea tu <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 to-purple-600">Futuro</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed font-medium opacity-80"
          >
            Optimización de CVs con inteligencia artificial nivel experto, buscador de leads directos y exportación profesional que los ATS adoran.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8"
          >
            <button onClick={enterAsGuest} className="w-full md:w-auto group relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-12 py-6 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-500/30">
              <span className="flex items-center gap-3">
                <Play size={20} className="fill-current" />
                Probar sin Cuenta
              </span>
            </button>
            
            <Link href="/register" className="w-full md:w-auto">
              <button className="w-full md:w-auto group border border-white/10 bg-white/5 text-white px-12 py-6 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                Crear Perfil
                <ArrowRight className="inline-span ml-3 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-10 mb-24">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">Herramientas de <br/>Grado Militar</h2>
              <p className="text-slate-500 text-lg font-medium italic">"No es suerte, es ingeniería."</p>
            </div>
            <div className="flex items-center gap-8 text-slate-600 font-black uppercase tracking-widest text-xs">
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-indigo-500/20" /> Análisis</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-purple-500/20" /> Extracción</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-emerald-500/20" /> Exportación</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: 'Auditor&iacute;a HR-AI', 
                desc: 'An\u00e1lisis profundo de palabras clave, estructura y verbos de acci\u00f3n para superar cualquier ATS.', 
                icon: BrainCircuit, 
                color: 'text-indigo-400',
                glow: 'from-indigo-500/10 to-transparent',
                border: 'hover:border-indigo-500/40'
              },
              { 
                title: 'Strategic Lead Search', 
                desc: 'Identifica a los hiring managers directamente y obt&eacute;n sus perfiles verificados.', 
                icon: Search, 
                color: 'text-purple-400',
                glow: 'from-purple-500/10 to-transparent',
                border: 'hover:border-purple-500/40'
              },
              { 
                title: 'Exportaci&oacute;n HD', 
                desc: 'Descarga PDFs Premium con dise&ntilde;os que destacan entre miles de aplicaciones.', 
                icon: FileCheck, 
                color: 'text-emerald-400',
                glow: 'from-emerald-500/10 to-transparent',
                border: 'hover:border-emerald-500/40'
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative p-12 rounded-[48px] bg-[#0a0a0c] border border-white/5 ${feature.border} transition-all duration-500 overflow-hidden shadow-2xl`}
              >
                {/* Glow Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-700">
                  <feature.icon size={160} className="stroke-[1]" />
                </div>

                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-12 shadow-inner group-hover:bg-white/10 transition-all border border-white/5">
                    <feature.icon className={feature.color} size={40} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter leading-none">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium text-lg leading-relaxed">{feature.desc}</p>
                  
                  <div className="mt-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    Probar ahora <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">Planes para Ganar</h2>
            <p className="text-slate-500 text-xl font-medium">Escoge tu arsenal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Standard', price: '0', features: ['3 CVs Optimizados', 'Análisis Básico', 'Exportación PDF Std'] },
              { name: 'Professional', price: '19', active: true, features: ['CVs Ilimitados', 'Análisis Experto (HR-AI)', 'Lead Finder (50/mes)', 'Soporte 24/7'] },
              { name: 'Legendary', price: '49', features: ['Todo lo Pro', 'Leads Ilimitados', 'Simulador de Entrevista', 'Traducción Multi-idioma'] },
            ].map((plan, i) => (
              <div key={i} className={`p-12 rounded-[48px] border flex flex-col transition-all relative overflow-hidden ${plan.active ? 'bg-white text-black border-white scale-105 shadow-[0_0_80px_rgba(255,255,255,0.1)]' : 'bg-[#0a0a0c] border-white/5 text-slate-200'}`}>
                {plan.active && <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-black px-6 py-2 uppercase tracking-widest rotate-45 translate-x-8 translate-y-4">Recién Añadido</div>}
                
                <h3 className="text-4xl font-black mb-8 uppercase tracking-tighter">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-16">
                  <span className="text-7xl font-black leading-none">{plan.price}€</span>
                  <span className="text-sm font-black opacity-40 uppercase tracking-widest">/mes</span>
                </div>
                
                <div className="space-y-6 mb-20 flex-1">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-4 text-sm font-black group">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${plan.active ? 'bg-indigo-600 text-white' : 'bg-white/5 text-indigo-400'}`}>
                        <Check size={18} />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>

                <button onClick={enterAsGuest} className={`w-full py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.3em] transition-all ${plan.active ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xl shadow-indigo-500/20' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  Seleccionar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 pt-40 pb-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="max-w-sm">
               <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                   <PenTool size={20} />
                 </div>
                 <span className="font-black text-white text-2xl tracking-tighter">CV-Pilot</span>
               </div>
               <p className="text-slate-500 text-lg font-medium leading-relaxed">
                 La plataforma definitiva para profesionales que no se conforman. Impulsado por el motor de búsqueda de Automatizaciones Nuñez Byte.
               </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div className="space-y-6 text-sm font-black uppercase tracking-[0.2em]">
                <p className="text-white mb-8">Producto</p>
                <Link href="#features" className="block text-slate-500 hover:text-white transition-colors">Features</Link>
                <Link href="#pricing" className="block text-slate-500 hover:text-white transition-colors">Pricing</Link>
              </div>
              <div className="space-y-6 text-sm font-black uppercase tracking-[0.2em]">
                <p className="text-white mb-8">Compañía</p>
                <Link href="#" className="block text-slate-500 hover:text-white transition-colors">About</Link>
                <Link href="#" className="block text-slate-500 hover:text-white transition-colors">Legal</Link>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">© 2026 CV-Pilot AI. Built for Winners.</p>
            <div className="flex gap-6">
              {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full bg-white/5" />)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
