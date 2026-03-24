'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Target, 
  Flame, 
  RefreshCw,
  ChevronRight,
  BrainCircuit,
  Lightbulb
} from 'lucide-react';

export default function Interviews() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);

  const handleSimulate = async () => {
    if (!cvFile || !jobDescription) return;
    setLoading(true);
    try {
      // 1. Parse
      const formData = new FormData();
      formData.append('file', cvFile);
      const parseRes = await fetch('http://127.0.0.1:8000/api/parse', { method: 'POST', body: formData });
      const parsedCV = await parseRes.json();

      // 2. Prep
      const prepRes = await fetch('http://127.0.0.1:8000/api/ai/interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv_data: parsedCV, job_description: jobDescription })
      });
      const data = await prepRes.json();
      setQuestions(data);
    } catch (err) {
      console.error(err);
      alert("Error simulando entrevista.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Simulador de <span className="text-purple-400">Entrevistas AI</span></h1>
          <p className="text-slate-400">Prepárate para las preguntas más difíciles basadas en tu CV y la oferta.</p>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <BrainCircuit className="text-purple-400" />
              Tu Perfil
            </h3>
            <p className="text-sm text-slate-400">Sube tu CV para que la IA sepa quién eres.</p>
            <input 
               type="file" 
               accept=".pdf" 
               onChange={(e) => setCvFile(e.target.files?.[0] || null)}
               className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div className="glass-card p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <Target className="text-indigo-400" />
              La Posición
            </h3>
            <p className="text-sm text-slate-400">Pega la descripción del puesto o la oferta.</p>
            <textarea 
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Requisitos, responsabilidades..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <button 
              onClick={handleSimulate}
              disabled={loading || !cvFile || !jobDescription}
              className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-3"
            >
              {loading ? <RefreshCw className="animate-spin" /> : <Flame size={24} />}
              {loading ? 'Preparando Entrenamiento AI...' : 'Generar Sesión de Entrenamiento'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fade pb-20">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Sesión de Entrenamiento</h2>
            <button onClick={() => setQuestions([])} className="text-sm text-slate-500 hover:text-white transition-colors">Reiniciar</button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {questions.map((q, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 space-y-6 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-1 rounded mb-3 inline-block">Pregunta {i+1}</span>
                    <h3 className="text-xl font-bold text-slate-200">{q.question}</h3>
                  </div>
                  <div className="p-3 bg-white/5 rounded-full group-hover:scale-110 transition-transform">
                    <MessageSquare className="text-slate-500" size={24} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                   <div className="space-y-3">
                      <h4 className="flex items-center gap-2 text-sm font-bold text-indigo-400">
                        <Target size={16} /> 
                        Por qué preguntan:
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed italic">"{q.reason}"</p>
                   </div>
                   <div className="space-y-3">
                      <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                        <Lightbulb size={16} /> 
                        Estrategia Ganadora:
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{q.suggested_answer_strategy}</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="glass-card p-8 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border-purple-500/20 text-center">
             <h3 className="text-xl font-bold mb-2">¿Listo para arrasar?</h3>
             <p className="text-slate-400 mb-6">Práctica estas respuestas enfocándote en tus logros cuantificados.</p>
             <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2 mx-auto">
               Marcar Sesión como Completada
               <ChevronRight size={18} />
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
