'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  MessageCircle, 
  BookOpen, 
  Search,
  ChevronDown,
  ExternalLink,
  LifeBuoy
} from 'lucide-react';

const faqs = [
  { q: '¿Cómo funciona la optimización por IA?', a: 'CV-Pilot utiliza modelos LLM avanzados (Llama-3/Claude) para analizar tu CV frente a una oferta específica, detectando palabras clave faltantes y sugiriendo redacciones de alto impacto.' },
  { q: '¿Mis datos son seguros?', a: 'Sí. Utilizamos Supabase para el almacenamiento cifrado y nunca vendemos tus datos a terceros.' },
  { q: '¿Puedo exportar en otros formatos?', a: 'Actualmente soportamos PDF premium y Word (DOCX) optimizado para ATS.' },
  { q: '¿Qué es el buscador de leads?', a: 'Es una herramienta que extrae los responsables de RRHH de cualquier empresa que busques, permitiéndote conectar directamente.' }
];

export default function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-fade pb-20">
      <div className="text-center space-y-4 pt-10">
        <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 mb-4">
           <LifeBuoy className="text-indigo-400" size={32} />
        </div>
        <h1 className="text-4xl font-black">Centro de <span className="text-indigo-400">Ayuda</span></h1>
        <p className="text-slate-400 max-w-xl mx-auto">Todo lo que necesitas para dominar CV-Pilot y acelerar tu carrera profesional.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Base de Conocimiento', desc: 'Guías paso a paso sobre IA y ATS.', icon: BookOpen, color: 'text-blue-400' },
          { title: 'Chat Soporte', desc: 'Resuelve tus dudas en tiempo real.', icon: MessageCircle, color: 'text-purple-400' },
          { title: 'Tutorías PRO', desc: 'Revisión manual de expertos en RRHH.', icon: HelpCircle, color: 'text-emerald-400' }
        ].map((box, i) => (
          <div key={i} className="glass-card p-6 text-center space-y-3 hover:bg-white/5 transition-all cursor-pointer group">
            <box.icon className={`${box.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} size={28} />
            <h3 className="font-bold">{box.title}</h3>
            <p className="text-xs text-slate-500">{box.desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold flex items-center gap-2"><HelpCircle className="text-indigo-400" /> Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="glass-card overflow-hidden cursor-pointer"
            >
              <div className="p-5 flex justify-between items-center bg-white/5">
                <h4 className={`font-bold transition-colors ${openFaq === i ? 'text-indigo-400' : 'text-slate-200'}`}>{faq.q}</h4>
                <ChevronDown className={`text-slate-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} size={18} />
              </div>
              {openFaq === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="p-5 text-sm text-slate-400 border-t border-white/5 leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-10 relative overflow-hidden bg-gradient-to-br from-indigo-600/20 to-purple-600/20 text-center">
         <h3 className="text-xl font-bold mb-4">¿No encuentras lo que buscas?</h3>
         <button className="px-10 py-3 bg-white text-black font-black rounded-xl hover:scale-105 transition-all flex items-center gap-2 mx-auto shadow-2xl shadow-white/10">
           Contactar con Soporte Técnico
           <ExternalLink size={18} />
         </button>
      </div>
    </div>
  );
}
