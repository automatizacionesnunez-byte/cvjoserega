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
  const [step, setStep] = useState<'select' | 'briefing' | 'analyze' | 'edit'>('select');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [jobUrl, setJobUrl] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('professional-light-v1');
  const [isGuest, setIsGuest] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [briefing, setBriefing] = useState({
    profession: '',
    level: 'Mid-Level',
    status: 'Buscando activamente',
    goal: ''
  });

  useEffect(() => {
    setIsGuest(localStorage.getItem('cvpilot_guest_mode') === 'true');
  }, []);

  const wizardCategories = ['Todos', 'Clásico', 'Moderno', 'Tech', 'Creativo', 'Executive', 'Minimalist'];

  const wizardTemplates = [
    { id: 'professional-light-v1', name: 'Ivory Archive', category: 'Clásico', gradient: 'from-[#f5f0e8] to-[#e8e0d0]', accent: '#8B7355', dark: false },
    { id: 'professional-light-v2', name: 'Minimal Academic', category: 'Clásico', gradient: 'from-white to-[#f7f7f7]', accent: '#374151', dark: false },
    { id: 'classic', name: 'Standard Times', category: 'Clásico', gradient: 'from-[#f8fafc] to-[#e2e8f0]', accent: '#1e293b', dark: false },
    { id: 'dev-focus-v1', name: 'Kernel Architect', category: 'Tech', gradient: 'from-[#0f172a] to-[#1e293b]', accent: '#38bdf8', dark: true },
    { id: 'dev-focus-v2', name: 'Fullstack Cloud', category: 'Tech', gradient: 'from-[#0b0e14] to-[#161b22]', accent: '#238636', dark: true },
    { id: 'professional-dark-v1', name: 'Aetheric Tech', category: 'Moderno', gradient: 'from-[#1e1b4b] to-[#0f172a]', accent: '#818cf8', dark: true },
    { id: 'professional-dark-v2', name: 'Midnight Executive', category: 'Moderno', gradient: 'from-[#020617] to-[#0f172a]', accent: '#e2e8f0', dark: true },
    { id: 'executive-blue-v1', name: 'Blue Chip Leader', category: 'Executive', gradient: 'from-[#f8fafc] to-[#f1f5f9]', accent: '#1e3a8a', dark: false },
    { id: 'executive-blue-v2', name: 'Royal Corporate', category: 'Executive', gradient: 'from-[#ffffff] to-[#eef2ff]', accent: '#3730a3', dark: false },
    { id: 'professional-modern-v1', name: 'Indigo Matrix', category: 'Moderno', gradient: 'from-[#4f46e5] to-[#7c3aed]', accent: '#e0e7ff', dark: true },
    { id: 'professional-modern-v2', name: 'Startup Flow', category: 'Tech', gradient: 'from-[#3b82f6] to-[#6366f1]', accent: '#dbeafe', dark: true },
    { id: 'minimal-grid-v1', name: 'Grid Curator', category: 'Creativo', gradient: 'from-[#ffffff] to-[#fafafa]', accent: '#000000', dark: false },
    { id: 'minimal-grid-v2', name: 'Swiss Type', category: 'Creativo', gradient: 'from-[#fdfdfd] to-[#f5f5f5]', accent: '#ff0000', dark: false },
    { id: 'eye-catching-v1', name: 'Rose Curator', category: 'Creativo', gradient: 'from-[#fb7185] to-[#e11d48]', accent: '#fff1f2', dark: true },
    { id: 'eye-catching-v2', name: 'Vibrant Portfolio', category: 'Creativo', gradient: 'from-[#f43f5e] to-[#be123c]', accent: '#ffe4e6', dark: true },
  ];

  const filteredWizardTemplates = wizardTemplates.filter(t => activeCategory === 'Todos' || t.category === activeCategory);

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
      
      // We pass the briefing data in the text to enrich the AI analysis
      const contextText = `PROFESIÓN: ${briefing.profession}. NIVEL: ${briefing.level}. OBJETIVO: ${briefing.goal}.`;
      
      const analyzeRes = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cv_text: `${contextText} \n\n ${JSON.stringify(parsedCV)}`, 
          job_url: jobUrl 
        })
      });
      const result = await analyzeRes.json();
      setAnalysis(result);
      setStep('analyze');
    } catch (err) {
      console.error(err);
      alert("Error procesando los datos. Asegúrate de que el backend esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020203] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Guest Mode Indicator */}
        {isGuest && (
          <div className="mb-10 p-4 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center gap-3">
            <Rocket size={18} className="text-indigo-400" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Modo Beta: Prueba todas las funciones sin limites.</p>
          </div>
        )}

        {/* Progress Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 italic">
              DISEÑA TU <span className="text-indigo-500">FUTURO</span>
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Paso {
              step === 'select' ? '1/4' : step === 'briefing' ? '2/4' : step === 'analyze' ? '3/4' : '4/4'
            }: {
              step === 'select' ? 'Elige tu ADN Visual' : 
              step === 'briefing' ? 'Define tu Perfil' : 
              step === 'analyze' ? 'Análisis Cuántico' : 'Refinado Final'
            }</p>
          </div>
          
          <div className="flex gap-4">
             {step !== 'select' && (
                <button 
                  onClick={() => setStep(step === 'briefing' ? 'select' : step === 'analyze' ? 'briefing' : 'analyze')}
                  className="px-6 py-3 rounded-full border border-white/10 text-slate-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
                >
                  Regresar
                </button>
             )}
             {step === 'select' && (
               <button 
                 onClick={() => setStep('briefing')}
                 className="px-8 py-3 rounded-full bg-white text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
               >
                 Siguiente Paso →
               </button>
             )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'select' && (
            <motion.div key="step-select" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                {wizardCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-white/5 text-slate-500 border border-white/10 hover:border-white/20'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Template Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {filteredWizardTemplates.map((tpl) => {
                  const textColor = tpl.dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)';
                  const headColor = tpl.dark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)';
                  const lineColor = tpl.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
                  
                  return (
                    <motion.div 
                      key={tpl.id} 
                      layout 
                      whileHover={{ y: -8 }} 
                      onClick={() => setSelectedTemplate(tpl.id)} 
                      className="cursor-pointer group flex flex-col items-center"
                    >
                      <div className={`aspect-[3/4] w-full rounded-[24px] overflow-hidden transition-all duration-300 ${selectedTemplate === tpl.id ? 'ring-2 ring-indigo-500 ring-offset-4 ring-offset-[#020203] shadow-[0_0_40px_rgba(99,102,241,0.2)]' : 'ring-1 ring-white/5 group-hover:ring-white/20 opacity-80 hover:opacity-100'}`}>
                        <div className={`w-full h-full bg-gradient-to-br ${tpl.gradient} p-4 flex flex-col relative`}>
                          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-black/10 border border-white/10 backdrop-blur-md">
                             <div className="text-[5px] font-black uppercase tracking-widest" style={{ color: textColor }}>{tpl.category}</div>
                          </div>

                          <div className="flex items-start gap-2.5 mb-3 border-b pb-3" style={{ borderColor: lineColor }}>
                            <div className="w-9 h-9 rounded-full bg-slate-300/30 shrink-0 border border-white/10 shadow-inner overflow-hidden" />
                            <div className="flex-1 space-y-0.5 pt-1">
                               <div className="text-[7px] font-black uppercase tracking-tight leading-none" style={{ color: headColor }}>DANIEL GARCÍA</div>
                               <div className="text-[5px] font-bold opacity-60 uppercase" style={{ color: textColor }}>Creative Technologist</div>
                            </div>
                          </div>

                          <div className="flex gap-4 flex-1 overflow-hidden">
                            <div className="flex-1 space-y-3 pt-1">
                              <div className="space-y-1.5">
                                <div className="text-[5px] font-black uppercase tracking-widest mb-1" style={{ color: tpl.accent }}>EXPERIENCIA</div>
                                <div className="space-y-1">
                                  <div className="h-1 rounded-full" style={{ width: '40%', backgroundColor: headColor, opacity: 0.8 }} />
                                  <div className="h-[3px] rounded-full" style={{ width: '90%', backgroundColor: textColor, opacity: 0.4 }} />
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <div className="text-[5px] font-black uppercase tracking-widest mb-1" style={{ color: tpl.accent }}>EDUCACIÓN</div>
                                <div className="h-1 rounded-full" style={{ width: '50%', backgroundColor: headColor, opacity: 0.8 }} />
                              </div>
                            </div>
                            <div className="w-[30%] space-y-4 border-l pl-2.5 pt-1" style={{ borderColor: lineColor }}>
                               <div className="space-y-2">
                                  <div className="text-[5px] font-black uppercase tracking-widest" style={{ color: tpl.accent }}>SKILLS</div>
                                  <div className="h-2 w-5 rounded-[2px] bg-black/5" />
                               </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 text-center px-1">
                        <h3 className={`text-[10px] font-black uppercase tracking-widest transition-colors ${selectedTemplate === tpl.id ? 'text-indigo-400' : 'text-slate-500 group-hover:text-white'}`}>{tpl.name}</h3>
                        <p className="text-[7px] font-bold text-slate-700 mt-1 uppercase tracking-[0.2em]">{tpl.category}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 'briefing' && (
            <motion.div key="step-briefing" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="max-w-2xl mx-auto py-12">
               <div className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-8">
                 <div className="space-y-2">
                   <h2 className="text-2xl font-black uppercase tracking-tighter">Háblanos de tu <span className="text-indigo-400">Objetivo</span></h2>
                   <p className="text-slate-500 text-sm">Estas 4 preguntas ayudarán a la IA a priorizar tus logros más relevantes.</p>
                 </div>

                 <div className="grid gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">¿A qué posición aspiras?</label>
                     <input 
                       type="text" 
                       placeholder="Ej: Senior Product Designer, Sales Executive..." 
                       value={briefing.profession}
                       onChange={(e) => setBriefing({...briefing, profession: e.target.value})}
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 transition-all outline-none"
                     />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nivel de Experiencia</label>
                       <select 
                         value={briefing.level}
                         onChange={(e) => setBriefing({...briefing, level: e.target.value})}
                         className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 transition-all outline-none"
                       >
                         <option>Junior (0-2 años)</option>
                         <option>Mid-Level (3-5 años)</option>
                         <option>Senior (6+ años)</option>
                         <option>Manager / Director</option>
                       </select>
                     </div>
                     <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Estado Actual</label>
                       <select 
                         value={briefing.status}
                         onChange={(e) => setBriefing({...briefing, status: e.target.value})}
                         className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 transition-all outline-none"
                       >
                         <option>Buscando activamente</option>
                         <option>En transición de carrera</option>
                         <option>Primer empleo / Estudiante</option>
                         <option>Solo explorando opciones</option>
                       </select>
                     </div>
                   </div>

                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">¿Cuál es tu mayor fortaleza hoy?</label>
                     <textarea 
                       rows={3}
                       placeholder="Ej: Liderazgo de equipos, optimización de procesos técnicos..." 
                       value={briefing.goal}
                       onChange={(e) => setBriefing({...briefing, goal: e.target.value})}
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 transition-all outline-none resize-none"
                     />
                   </div>
                 </div>

                 <div className="pt-4 flex items-center justify-between">
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest italic">✓ La IA personalizará el tono según tus respuestas</p>
                    <button 
                      onClick={() => setStep('analyze')}
                      className="px-8 py-3 rounded-full bg-indigo-500 text-white font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-indigo-500/20"
                    >
                      Personalizar IA →
                    </button>
                 </div>
               </div>
            </motion.div>
          )}

          {step === 'analyze' && (
            <motion.div key="step-analyze" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-12 max-w-4xl mx-auto py-12">
               {!analysis ? (
                 <div className="space-y-12">
                    <div className="text-center space-y-4">
                      <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">Inyección de <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Datos</span></h1>
                      <p className="text-slate-500 text-lg font-medium italic">Sincroniza tu perfil con el mercado en segundos.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="group relative p-12 rounded-[40px] bg-white/[0.01] border border-white/5 hover:border-indigo-500/20 transition-all cursor-pointer text-center">
                        <input type="file" accept=".pdf" onChange={(e) => setCvFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                        <div className="w-20 h-20 rounded-[28px] bg-white/5 flex items-center justify-center mx-auto mb-8 border border-white/5 group-hover:bg-indigo-500/10 transition-all">
                          <Upload className="text-slate-400 group-hover:text-indigo-400" size={36} />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Currículum Principal</h3>
                        {cvFile && <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">{cvFile.name}</span>}
                      </div>

                      <div className="p-12 rounded-[40px] bg-white/[0.01] border border-white/5 text-center group">
                        <div className="w-20 h-20 rounded-[28px] bg-white/5 flex items-center justify-center mx-auto mb-8 border border-white/5 group-focus-within:bg-purple-500/10 transition-all">
                          <Globe className="text-slate-400 group-focus-within:text-purple-400" size={36} />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">URL de la Oferta</h3>
                        <input type="url" value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} placeholder="https://..." className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500/50 transition-all text-sm font-medium text-white shadow-inner" />
                      </div>
                    </div>

                    <button onClick={handleProcess} disabled={loading || !cvFile || !jobUrl} className={`w-full py-6 rounded-[28px] font-black text-xs uppercase tracking-[0.4em] shadow-2xl transition-all flex items-center justify-center gap-4 ${loading ? 'bg-white/5 text-slate-500' : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-indigo-500/20'}`}>
                      {loading ? <RefreshCw className="animate-spin" size={20} /> : <BrainCircuit size={20} className="stroke-[2.5]" />}
                      {loading ? 'Digeriendo Información...' : 'Lanzar Análisis AI'}
                    </button>
                 </div>
               ) : (
                 <div className="space-y-12">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-10">
                      <div className="max-w-xl">
                        <h2 className="text-5xl font-black text-white tracking-tighter uppercase mb-4 leading-none">Veredicto <br/> de la IA</h2>
                        <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 flex items-baseline gap-3">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Match Score</span>
                          <span className="text-8xl font-black text-white leading-none tracking-tighter">{analysis.match_score}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="p-10 rounded-[48px] border border-emerald-500/10 bg-emerald-500/[0.02] space-y-8">
                        <div className="flex items-center gap-4">
                          <CheckCircle2 className="text-emerald-400" size={24} />
                          <h3 className="text-xl font-black text-white uppercase tracking-tighter">Puntos de Éxito</h3>
                        </div>
                        <ul className="space-y-4">
                          {analysis.strengths.map((s: string, i: number) => (
                            <li key={i} className="flex items-start gap-4 text-slate-400 font-medium">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-10 rounded-[48px] border border-amber-500/10 bg-amber-500/[0.02] space-y-8">
                        <div className="flex items-center gap-4">
                          <AlertCircle className="text-amber-400" size={24} />
                          <h3 className="text-xl font-black text-white uppercase tracking-tighter">Campos de Mejora</h3>
                        </div>
                        <ul className="space-y-4">
                          {analysis.weaknesses.map((w: string, i: number) => (
                            <li key={i} className="flex items-start gap-4 text-slate-400 font-medium">
                              <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button onClick={() => setStep('edit')} className="w-full py-7 bg-white text-black rounded-[32px] font-black text-sm uppercase tracking-[0.4em] shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-4">
                      Materializar Currículum Optimizado
                      <ArrowRight size={24} className="stroke-[3]" />
                    </button>
                 </div>
               )}
            </motion.div>
          )}

          {step === 'edit' && analysis && (
            <motion.div key="step-edit" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
              <CVPreview cvData={analysis.parsedCV} template={selectedTemplate} />
              <div className="flex flex-col sm:flex-row gap-6">
                 <button onClick={() => setStep('analyze')} className="flex-1 py-6 bg-white/5 hover:bg-white/10 rounded-[24px] font-black border border-white/5 text-slate-500 transition-all uppercase tracking-widest text-[10px]">Atrás</button>
                 <button onClick={handleSaveToDB} disabled={saving} className="flex-[2] py-6 bg-indigo-600 text-white rounded-[24px] font-black shadow-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.3em] text-[10px]">
                    {saving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />} {saving ? 'Sincronizando...' : 'Publicar en mi Historial'}
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
