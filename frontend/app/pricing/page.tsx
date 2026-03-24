'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Rocket, ArrowRight, Sparkles, PenTool } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '0',
    period: 'para siempre',
    description: 'Ideal para explorar la plataforma.',
    icon: Zap,
    color: 'from-slate-500 to-slate-600',
    features: [
      '1 CV optimizado por IA',
      '2 plantillas básicas',
      'Exportar PDF (con marca de agua)',
      'Análisis ATS básico',
    ],
    cta: 'Empezar Gratis',
    popular: false,
  },
  {
    name: 'Pro',
    price: '9.99',
    period: '/mes',
    description: 'Para profesionales que buscan activamente.',
    icon: Crown,
    color: 'from-indigo-500 to-purple-600',
    features: [
      'CVs ilimitados',
      '10 plantillas premium',
      'Exportar PDF + Word sin marca',
      'Análisis ATS experto con scoring',
      'Generador de Cover Letter',
      'Traductor AI a 5 idiomas',
      'Simulador de entrevistas',
      'Buscador de leads (5/día)',
    ],
    cta: 'Empezar con Pro',
    popular: true,
  },
  {
    name: 'Elite',
    price: '24.99',
    period: '/mes',
    description: 'Máxima potencia para headhunters y coaches.',
    icon: Rocket,
    color: 'from-amber-500 to-orange-600',
    features: [
      'Todo en Pro',
      'Plantillas exclusivas Elite',
      'Optimizador de LinkedIn',
      'Leads ilimitados',
      'API access',
      'Soporte prioritario 24/7',
      'URL pública personalizada',
      'Revisión humana mensual por experto',
    ],
    cta: 'Ir a Elite',
    popular: false,
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="min-h-screen bg-[#020203] text-white relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-indigo-500/8 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] bg-purple-500/8 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Nav */}
        <nav className="flex items-center justify-between mb-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <PenTool className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold">CV<span className="text-purple-500">Pilot</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Iniciar Sesión</Link>
            <Link href="/register" className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">Registro</Link>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={12} /> Pricing
            </span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
              Invierte en tu <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">carrera</span>
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">Planes diseñados para cada etapa de tu búsqueda profesional.</p>
          </motion.div>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 rounded-2xl p-1 border border-white/10 flex">
            <button onClick={() => setBilling('monthly')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${billing === 'monthly' ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}>
              Mensual
            </button>
            <button onClick={() => setBilling('annual')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${billing === 'annual' ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}>
              Anual <span className="text-emerald-500 text-xs font-black">-40%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-3xl p-8 transition-all ${
                plan.popular
                  ? 'bg-gradient-to-b from-indigo-500/10 to-purple-500/5 border-2 border-indigo-500/30 shadow-2xl shadow-indigo-500/10'
                  : 'bg-white/[0.02] border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  Más Popular
                </div>
              )}

              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                <plan.icon size={22} className="text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm text-slate-500 mb-6">{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black">
                  €{billing === 'annual' && plan.price !== '0' ? (Number(plan.price) * 0.6).toFixed(2) : plan.price}
                </span>
                <span className="text-slate-500 text-sm">{plan.period}</span>
              </div>

              <button className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                plan.popular
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl shadow-purple-500/20 hover:scale-[1.02]'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}>
                {plan.cta} <ArrowRight size={16} />
              </button>

              <div className="mt-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <Check size={16} className={plan.popular ? 'text-indigo-400 mt-0.5 shrink-0' : 'text-slate-600 mt-0.5 shrink-0'} />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 text-center">
          <p className="text-slate-500 text-sm">¿Tienes preguntas? <Link href="/support" className="text-indigo-400 font-bold hover:text-indigo-300">Visita nuestro centro de ayuda</Link></p>
        </div>
      </div>
    </div>
  );
}
