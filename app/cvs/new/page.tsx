'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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
  Rocket,
  Maximize2,
  X
} from 'lucide-react';
import { A4Preview } from '@/app/components/A4Preview';
import { supabase } from '@/app/lib/supabase';
import { API_BASE_URL } from '@/app/lib/api';

const wizardTemplates = [
  { 
    id: 'ceo-premium-v1', 
    name: 'CEO Premium', 
    category: 'Executive', 
    gradient: 'from-[#1a2744] to-[#2d3436]', 
    accent: '#d4ac0d', 
    secondary: '#f7f5f0', 
    dark: true, 
    layout: 'ceo-premium-v1', 
    photo: 'portrait_2.png', 
    fullName: 'Carlos Palacios Herrero', 
    jobTitle: 'CEO & Co-Founder' 
  },
  { 
    id: 'executive-sidebar-v1', 
    name: 'Executive Sidebar', 
    category: 'Executive', 
    gradient: 'from-[#1a2744] to-[#121c2f]', 
    accent: '#d4ac0d', 
    secondary: '#ffffff', 
    dark: true, 
    layout: 'executive-sidebar-v1', 
    photo: 'portrait_3.png', 
    fullName: 'Alejandro Moreno Vega', 
    jobTitle: 'COO & Operations' 
  },
  { 
    id: 'modern-full-sidebar-v1', 
    name: 'Modern Full Sidebar', 
    category: 'Modern', 
    gradient: 'from-[#008080] to-[#004d4d]', 
    accent: '#008080', 
    secondary: '#ffffff', 
    dark: true, 
    layout: 'modern-full-sidebar-v1', 
    photo: 'portrait_1.png', 
    fullName: 'Lucía Fernández Ruiz', 
    jobTitle: 'Creative Director' 
  },
  { 
    id: 'tech-clean-v1', 
    name: 'Tech Clean', 
    category: 'Tech', 
    gradient: 'from-[#1a1a1a] to-[#0a0a0c]', 
    accent: '#0066cc', 
    secondary: '#f4f7f6', 
    dark: true, 
    layout: 'tech-clean-v1', 
    photo: 'portrait_1.png', 
    fullName: 'David Sánchez López', 
    jobTitle: 'Engineering Lead' 
  },
  { 
    id: 'ux-split-v1', 
    name: 'UX Split', 
    category: 'Creative', 
    gradient: 'from-[#ff4d4d] to-[#cc0000]', 
    accent: '#ff4d4d', 
    secondary: '#ffffff', 
    dark: true, 
    layout: 'ux-split-v1', 
    photo: 'portrait_4.png', 
    fullName: 'Marta Giménez Sanz', 
    jobTitle: 'SR Product Designer' 
  }
];

function CVCreator() {
  const [step, setStep] = useState<'select' | 'briefing' | 'analyze' | 'result'>('select');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [jobUrl, setJobUrl] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [showLargePreview, setShowLargePreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('ceo-premium-v1');
  const [isGuest, setIsGuest] = useState(false);
  const [briefing, setBriefing] = useState({
    profession: '',
    level: 'Mid-Level',
    status: 'Buscando activamente',
    goal: ''
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    setIsGuest(localStorage.getItem('cvpilot_guest_mode') === 'true');
    const tplParam = searchParams.get('template');
    if (tplParam) setSelectedTemplate(tplParam);
  }, [searchParams]);

  const A4PreviewLarge = ({ templateId = selectedTemplate }: { templateId?: string }) => {
    return <A4Preview templateId={templateId} isLarge />;
  };

  const handleSaveCV = async () => {
    if (!analysis) return;
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
        {isGuest && (
          <div className="mb-10 p-4 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center gap-3">
            <Rocket size={18} className="text-indigo-400" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Modo Beta: Prueba todas las funciones sin limites.</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 italic">
              DISEÑA TU <span className="text-indigo-500">FUTURO</span>
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Paso {
              step === 'select' ? '1/4' : step === 'briefing' ? '2/4' : step === 'analyze' ? '3/4' : '4/4'
            }: {
              step === 'select' ? 'Elige tu Diseño' : 
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
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Diseño Seleccionado</h2>
                  <p className="text-slate-500 text-sm">Validado para máxima legibilidad y éxito profesional.</p>
                </div>
                <button 
                  onClick={() => setShowLargePreview(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  <Maximize2 size={14} /> Vista Nítida
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {wizardTemplates.map((tpl) => (
                  <motion.div 
                    key={tpl.id} 
                    layout 
                    whileHover={{ y: -8 }} 
                    onClick={() => setSelectedTemplate(tpl.id)} 
                    className="cursor-pointer group flex flex-col items-center"
                  >
                    <div className={`aspect-[1/1.414] w-full rounded-[24px] overflow-hidden transition-all duration-300 relative ${selectedTemplate === tpl.id ? 'ring-2 ring-indigo-500 ring-offset-4 ring-offset-[#020203] shadow-[0_0_40px_rgba(99,102,241,0.2)]' : 'ring-1 ring-white/5 group-hover:ring-white/20 opacity-80 hover:opacity-100'}`}>
                      <div className="w-full h-full bg-[#0a0a0c] absolute inset-0 flex items-start justify-center overflow-hidden">
                         <div className="origin-top transform-gpu scale-[0.22] md:scale-[0.25] lg:scale-[0.28]">
                            <A4PreviewLarge templateId={tpl.id} />
                         </div>
                         <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md z-10 text-[6px] font-black uppercase tracking-widest text-indigo-400">{tpl.category}</div>
                      </div>
                    </div>
                    <div className="mt-5 text-center px-1">
                      <h3 className={`text-[10px] font-black uppercase tracking-widest transition-colors ${selectedTemplate === tpl.id ? 'text-indigo-400' : 'text-slate-500 group-hover:text-white'}`}>{tpl.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {showLargePreview && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                  >
                    <button 
                      onClick={() => setShowLargePreview(false)}
                      className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all z-[110]"
                    >
                      <X size={24} />
                    </button>
                    
                    <motion.div 
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="max-w-4xl w-full h-[85vh] overflow-y-auto rounded-xl shadow-2xl custom-scrollbar"
                    >
                       <div className="min-w-[794px] w-full bg-white">
                          <A4PreviewLarge />
                       </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {step === 'briefing' && (
            <motion.div key="step-briefing" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="max-w-2xl mx-auto py-12">
               <div className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-8">
                 <div className="space-y-2">
                   <h2 className="text-2xl font-black uppercase tracking-tighter">Háblanos de tu <span className="text-indigo-400">Objetivo</span></h2>
                   <p className="text-slate-500 text-sm">Ayuda a la IA a priorizar tus logros más relevantes.</p>
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
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">¿Cuál es tu mayor fortaleza?</label>
                      <textarea 
                        rows={3}
                        placeholder="Ej: Liderazgo de equipos, optimización de procesos..." 
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
                 <motion.div key="analysis-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                   <div className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5">
                      <div className="flex justify-between items-start mb-10">
                        <div className="space-y-1">
                          <h2 className="text-4xl font-black uppercase tracking-tighter">Plan <span className="text-indigo-400">Maestro</span></h2>
                          <p className="text-slate-500 text-sm">Tu nuevo perfil ha sido optimizado para el puesto.</p>
                        </div>
                        <button onClick={handleSaveCV} disabled={saving} className="px-10 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl shadow-white/5 flex items-center gap-3">
                           {saving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
                           {saving ? 'GUARDANDO...' : 'GUARDAR CV FINAL'}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
                        <div className="space-y-12 overflow-y-auto max-h-[600px] pr-6 custom-scrollbar">
                           <div className="space-y-6">
                             <div className="flex items-center gap-3 text-indigo-400">
                               <CheckCircle2 size={20} />
                               <h3 className="text-xs font-black uppercase tracking-[0.3em]">Resumen Ejecutivo</h3>
                             </div>
                             <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/20 text-slate-300 italic text-sm leading-relaxed">
                               {analysis.refinedProfile}
                             </div>
                           </div>
                           
                           <div className="space-y-8">
                             <div className="flex items-center gap-3 text-purple-400">
                               <FileText size={20} />
                               <h3 className="text-xs font-black uppercase tracking-[0.3em]">Experiencia Optimizada</h3>
                             </div>
                             {analysis.experienceHighlights.map((exp: any, i: number) => (
                               <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                                  <div className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-xl">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white">{exp.role}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{exp.company}</span>
                                  </div>
                                  <p className="text-xs text-slate-400 leading-relaxed">• {exp.keyAchievement}</p>
                               </div>
                             ))}
                           </div>
                        </div>

                        <div className="space-y-8">
                           <div className="p-8 rounded-[40px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 space-y-6">
                              <h3 className="text-lg font-black uppercase tracking-tighter">Ajuste de Habilidades</h3>
                              <div className="space-y-6">
                                {analysis.matchSkills.map((sk: any, i: number) => (
                                  <div key={i} className="space-y-2">
                                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-slate-400">{sk.skill}</span>
                                        <span className="text-indigo-400">{sk.level}%</span>
                                     </div>
                                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${sk.level}%` }} transition={{ duration: 1.5, delay: i * 0.1 }} className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                     </div>
                                  </div>
                                ))}
                              </div>
                           </div>

                           <div className="p-8 rounded-[40px] border border-white/5 bg-white/[0.01] space-y-4">
                              <div className="flex items-center gap-3 text-emerald-400">
                                <AlertCircle size={20} />
                                <h3 className="text-xs font-black uppercase tracking-widest">Tip Estratégico</h3>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed italic border-l-2 border-emerald-500/20 pl-4">
                                "{analysis.strategicTip}"
                              </p>
                           </div>
                        </div>
                      </div>
                   </div>
                 </motion.div>
               )}
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div key="step-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto py-12">
               <div className="text-center space-y-8">
                  <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="text-emerald-500" size={48} />
                  </div>
                  <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">¡CV Finalizado!</h1>
                  <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">Tu currículum ha sido optimizado y guardado con éxito. Ya puedes descargarlo en tu dashboard.</p>
                  <Link href="/dashboard">
                    <button className="px-12 py-6 rounded-full bg-white text-black font-black uppercase tracking-[0.4em] text-xs hover:scale-105 transition-all shadow-2xl shadow-indigo-500/20 mt-10">Ir a mi Panel de Control →</button>
                  </Link>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center opacity-40 py-12">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Optimización Continua v2.0</p>
      </div>
    </div>
  );
}

export default function CVCreatorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020203] flex items-center justify-center text-white font-black uppercase tracking-widest">Iniciando Motor...</div>}>
      <CVCreator />
    </Suspense>
  );
}
