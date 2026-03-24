'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Globe, 
  BrainCircuit, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  RefreshCw,
  Save,
  Rocket
} from 'lucide-react';
import CVPreview from '@/app/components/dashboard/CVPreview';
import { supabase } from '@/app/lib/supabase';
import { API_BASE_URL } from '@/app/lib/api';

export default function NewCV() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [jobUrl, setJobUrl] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    setIsGuest(localStorage.getItem('cvpilot_guest_mode') === 'true');
  }, []);

  const wizardCategories = ['Todos', 'Clásico', 'Moderno', 'Tech', 'Creativo'];

  const wizardTemplates = [
    { id: 'professional-light-v1', name: 'Ivory Archive', category: 'Clásico', gradient: 'from-[#f5f0e8] to-[#e8e0d0]', accent: '#8B7355', dark: false },
    { id: 'professional-light-v2', name: 'Minimal Academic', category: 'Clásico', gradient: 'from-white to-[#f7f7f7]', accent: '#374151', dark: false },
    { id: 'classic', name: 'Standard Times', category: 'Clásico', gradient: 'from-[#f8fafc] to-[#e2e8f0]', accent: '#1e293b', dark: false },
    { id: 'professional-dark-v1', name: 'Aetheric Tech', category: 'Moderno', gradient: 'from-[#1e1b4b] to-[#0f172a]', accent: '#818cf8', dark: true },
    { id: 'professional-dark-v2', name: 'Midnight Executive', category: 'Moderno', gradient: 'from-[#020617] to-[#0f172a]', accent: '#e2e8f0', dark: true },
    { id: 'professional-modern-v1', name: 'Indigo Matrix', category: 'Moderno', gradient: 'from-[#4f46e5] to-[#7c3aed]', accent: '#e0e7ff', dark: true },
    { id: 'professional-modern-v2', name: 'Startup Flow', category: 'Tech', gradient: 'from-[#3b82f6] to-[#6366f1]', accent: '#dbeafe', dark: true },
    { id: 'modern', name: 'Default Spark', category: 'Tech', gradient: 'from-[#6366f1] to-[#8b5cf6]', accent: '#c7d2fe', dark: true },
    { id: 'eye-catching-v1', name: 'Rose Curator', category: 'Creativo', gradient: 'from-[#fb7185] to-[#e11d48]', accent: '#fff1f2', dark: true },
    { id: 'eye-catching-v2', name: 'Vibrant Portfolio', category: 'Creativo', gradient: 'from-[#f43f5e] to-[#be123c]', accent: '#ffe4e6', dark: true },
  ];

  const [wizardFilter, setWizardFilter] = useState('Todos');

  const filteredWizardTemplates = wizardTemplates.filter(t => wizardFilter === 'Todos' || t.category === wizardFilter);

  const handleSaveToDB = async () => {
    setSaving(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const currentUid = sessionData.session?.user?.id || (isGuest ? 'guest-001' : 'demo-user-123');
      
      const res = await fetch(`${API_BASE_URL}/api/cvs/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUid,
          cv_data: analysis.parsedCV,
          template_id: selectedTemplate,
          title: `CV Optimizado - ${new Date().toLocaleDateString()}`
        })
      });
      
      if (!res.ok) throw new Error("Error al guardar");

      alert(isGuest ? "AVISO BETA: CV Guardado en la sesión de invitado." : "CV Guardado en tu Dashboard.");
      window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
      alert("Error al guardar CV. ¿Está el backend encendido?");
    } finally {
      setSaving(false);
    }
  };

  const handleProcess = async () => {
    if (!cvFile || !jobUrl) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', cvFile);
      const parseRes = await fetch(`${API_BASE_URL}/api/parse`, { method: 'POST', body: formData });
      const parsedCV = await parseRes.json();
      
      const analyzeRes = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv_text: JSON.stringify(parsedCV), job_url: jobUrl })
      });
      const result = await analyzeRes.json();
      setAnalysis(result);
      setStep(3);
    } catch (err) {
      console.error(err);
      alert("Error procesando los datos. Asegúrate de que el backend esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      {isGuest && (
        <div className="mb-10 p-4 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center gap-3">
           <Rocket size={18} className="text-indigo-400" />
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Modo Beta: Prueba todas las funciones sin limites.</p>
        </div>
      )}

      {/* Steps Indicator */}
      <div className="flex items-center justify-center gap-6 mb-20">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${step >= s ? 'bg-white text-black shadow-2xl shadow-white/5' : 'bg-white/5 text-slate-700 border border-white/5'}`}>
              0{s}
            </div>
            {s < 4 && <div className={`w-16 h-px ${step > s ? 'bg-white/20' : 'bg-white/5'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">Estilo <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Ejecutivo</span></h1>
              <p className="text-slate-500 text-lg font-medium max-w-md mx-auto italic">Selecciona el chasis de tu nueva carrera profesional.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {wizardCategories.map(cat => (
                <button key={cat} onClick={() => setWizardFilter(cat)} className={`px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase border transition-all ${wizardFilter === cat ? 'bg-white text-black border-white shadow-xl shadow-white/5' : 'bg-white/5 text-slate-500 border-white/5 hover:text-white'}`}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredWizardTemplates.map((tpl) => {
                  const textColor = tpl.dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)';
                  const headColor = tpl.dark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)';
                  const lineColor = tpl.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
                  
                  return (
                    <motion.div 
                      key={tpl.id} 
                      layout 
                      initial={{ opacity: 0, scale: 0.9 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.9 }} 
                      whileHover={{ y: -8 }} 
                      onClick={() => setSelectedTemplate(tpl.id)} 
                      className="cursor-pointer group flex flex-col items-center"
                    >
                      <div className={`aspect-[3/4] w-full rounded-[24px] overflow-hidden transition-all duration-300 ${selectedTemplate === tpl.id ? 'ring-2 ring-indigo-500 ring-offset-4 ring-offset-[#020203] shadow-[0_0_40px_rgba(99,102,241,0.2)]' : 'ring-1 ring-white/5 group-hover:ring-white/20 opacity-80 hover:opacity-100'}`}>
                        {/* Realistic Resume Simulation */}
                        <div className={`w-full h-full bg-gradient-to-br ${tpl.gradient} p-4 flex flex-col`}>
                          {/* Header Area */}
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-white/20 shrink-0 border border-white/10" />
                            <div className="flex-1 space-y-1.5 pt-1">
                               <div className="h-2 rounded-full" style={{ width: '80%', backgroundColor: headColor }} />
                               <div className="h-1 rounded-full" style={{ width: '40%', backgroundColor: textColor }} />
                            </div>
                          </div>

                          <div className="h-px w-full mb-4" style={{ backgroundColor: lineColor }} />

                          {/* Columns */}
                          <div className="flex gap-4 flex-1">
                            {/* Left Col (Main content) */}
                            <div className="flex-1 space-y-3">
                              <div className="space-y-1.5">
                                <div className="h-1.5 rounded-full" style={{ width: '30%', backgroundColor: tpl.accent, opacity: 0.6 }} />
                                <div className="h-1 rounded-full" style={{ width: '90%', backgroundColor: textColor }} />
                                <div className="h-1 rounded-full" style={{ width: '100%', backgroundColor: textColor }} />
                                <div className="h-1 rounded-full" style={{ width: '85%', backgroundColor: textColor }} />
                              </div>
                              <div className="space-y-1.5">
                                <div className="h-1.5 rounded-full" style={{ width: '40%', backgroundColor: tpl.accent, opacity: 0.6 }} />
                                <div className="h-1 rounded-full" style={{ width: '95%', backgroundColor: textColor }} />
                                <div className="h-1 rounded-full" style={{ width: '80%', backgroundColor: textColor }} />
                              </div>
                            </div>
                            
                            {/* Right Col (Sidebar) */}
                            <div className="w-[30%] space-y-3 border-l px-2" style={{ borderColor: lineColor }}>
                               <div className="space-y-1.5">
                                  <div className="h-1.5 rounded-full" style={{ width: '100%', backgroundColor: tpl.accent, opacity: 0.4 }} />
                                  <div className="h-1 rounded-full" style={{ width: '80%', backgroundColor: textColor }} />
                                  <div className="h-1 rounded-full" style={{ width: '60%', backgroundColor: textColor }} />
                               </div>
                               <div className="space-y-1.5">
                                  <div className="h-1.5 rounded-full" style={{ width: '100%', backgroundColor: tpl.accent, opacity: 0.4 }} />
                                  <div className="h-1 rounded-full" style={{ width: '70%', backgroundColor: textColor }} />
                               </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 text-center px-1">
                        <h3 className={`text-[10px] font-black uppercase tracking-widest transition-colors ${selectedTemplate === tpl.id ? 'text-indigo-400' : 'text-slate-500 group-hover:text-white'}`}>{tpl.name}</h3>
                        <p className="text-[8px] font-bold text-slate-700 mt-1 uppercase tracking-tighter">{tpl.category}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <button onClick={() => setStep(2)} className="w-full py-6 bg-white text-black rounded-[24px] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-white/5 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-4">
              Configurar Inteligencia
              <ArrowRight size={20} className="stroke-[3]" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-12 max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">Inyección de <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Datos</span></h1>
              <p className="text-slate-500 text-lg font-medium italic">Sincroniza tu perfil con el mercado en segundos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="group relative p-12 rounded-[40px] bg-white/[0.01] border border-white/5 hover:border-indigo-500/20 transition-all cursor-pointer overflow-hidden text-center">
                <input type="file" accept=".pdf" onChange={(e) => setCvFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-[28px] bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all">
                    <Upload className="text-slate-400 group-hover:text-indigo-400 transition-colors" size={36} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Currículum Principal</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">Arrastra tu PDF para empezar el escaneo.</p>
                  {cvFile && <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest mt-6 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">{cvFile.name}</span>}
                </div>
              </div>

              <div className="p-12 rounded-[40px] bg-white/[0.01] border border-white/5 space-y-10 group overflow-hidden relative">
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-20 h-20 rounded-[28px] bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-focus-within:bg-purple-500/10 transition-all">
                    <Globe className="text-slate-400 group-focus-within:text-purple-400 transition-colors" size={36} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">URL de la Oferta</h3>
                  <p className="text-slate-500 font-medium mb-8 italic text-sm">Copia el enlace de LinkedIn o InfoJobs.</p>
                  <input type="url" value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} placeholder="https://..." className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500/50 transition-all text-sm font-medium text-white shadow-inner" />
                </div>
              </div>
            </div>

            <button onClick={handleProcess} disabled={loading || !cvFile || !jobUrl} className={`w-full py-6 rounded-[28px] font-black text-xs uppercase tracking-[0.4em] shadow-2xl transition-all flex items-center justify-center gap-4 ${loading ? 'bg-white/5 text-slate-500' : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-indigo-500/20'}`}>
              {loading ? <RefreshCw className="animate-spin" size={20} /> : <BrainCircuit size={20} className="stroke-[2.5]" />}
              {loading ? 'Digeriendo Información...' : 'Lanzar Análisis AI'}
            </button>
          </motion.div>
        )}

        {step === 3 && analysis && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
            <div className="flex flex-col md:flex-row items-end justify-between gap-10">
              <div className="max-w-xl">
                <h2 className="text-5xl font-black text-white tracking-tighter uppercase mb-4 leading-none">Veredicto <br/> de la IA</h2>
                <p className="text-slate-500 text-lg font-medium italic">Análisis granular de competitividad.</p>
              </div>
              <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 flex items-baseline gap-3 shadow-2xl">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Match Score</span>
                 <span className="text-8xl font-black text-white leading-none tracking-tighter">{analysis.match_score}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-10 rounded-[48px] border border-emerald-500/10 bg-emerald-500/[0.02] hover:bg-emerald-500/[0.04] transition-all group">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="text-emerald-400" size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Puntos de Éxito</h3>
                </div>
                <ul className="space-y-4">
                  {analysis.strengths.map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 text-slate-400 font-medium leading-relaxed group-hover:text-emerald-50/70 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-10 rounded-[48px] border border-amber-500/10 bg-amber-500/[0.02] hover:bg-amber-500/[0.04] transition-all group">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertCircle className="text-amber-400" size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Campos de Mejora</h3>
                </div>
                <ul className="space-y-4">
                  {analysis.weaknesses.map((w: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 text-slate-400 font-medium leading-relaxed group-hover:text-amber-50/70 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button onClick={() => setStep(4)} className="w-full py-7 bg-white text-black rounded-[32px] font-black text-sm uppercase tracking-[0.4em] shadow-2xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-4">
              Materializar Currículum Optimizado
              <ArrowRight size={24} className="stroke-[3]" />
            </button>
          </motion.div>
        )}

        {step === 4 && analysis && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <CVPreview cvData={analysis.parsedCV} template={selectedTemplate} />
            <div className="flex flex-col sm:flex-row gap-6">
               <button onClick={() => setStep(3)} className="flex-1 py-6 bg-white/5 hover:bg-white/10 rounded-[24px] font-black border border-white/5 transition-all uppercase tracking-widest text-[10px] text-slate-500 hover:text-white">Atrás</button>
               <button onClick={handleSaveToDB} disabled={saving} className="flex-[2] py-6 bg-indigo-600 text-white rounded-[24px] font-black shadow-2xl hover:bg-indigo-700 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.3em] text-[10px] shadow-indigo-500/20">
                  {saving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} className="stroke-[2.5]" />} {saving ? 'Sincronizando...' : 'Publicar en mi Historial'}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
