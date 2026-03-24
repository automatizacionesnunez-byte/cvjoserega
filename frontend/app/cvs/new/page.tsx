'use client';

import { useState } from 'react';
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
  Save
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
  const [userId, setUserId] = useState<string>('demo-user-123');

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
      const currentUid = sessionData.session?.user?.id || userId;
      
      await fetch(`${API_BASE_URL}/api/cvs/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUid,
          cv_data: analysis.parsedCV,
          template_id: selectedTemplate,
          title: `CV Optimizado - ${new Date().toLocaleDateString()}`
        })
      });
      alert("CV Guardado en tu Dashboard.");
      window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
      alert("Error al guardar CV.");
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
    <div className="max-w-4xl mx-auto py-10">
      {/* Steps Indicator */}
      <div className="flex items-center justify-center gap-4 mb-16">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'bg-white/5 text-slate-500 border border-white/10'}`}>
              {s}
            </div>
            {s < 4 && <div className={`w-12 h-0.5 rounded-full ${step > s ? 'bg-purple-500' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10">
            <div className="text-center space-y-3">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">Elige tu <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">plantilla</span></h1>
              <p className="text-slate-500 text-sm max-w-md mx-auto">Selecciona el estilo que mejor represente tu perfil profesional.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {wizardCategories.map(cat => (
                <button key={cat} onClick={() => setWizardFilter(cat)} className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${wizardFilter === cat ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20' : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'}`}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredWizardTemplates.map((tpl) => {
                  const textColor = tpl.dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.3)';
                  const headColor = tpl.dark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)';
                  const lineColor = tpl.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
                  return (
                    <motion.div key={tpl.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} whileHover={{ y: -4 }} onClick={() => setSelectedTemplate(tpl.id)} className="cursor-pointer group">
                      <div className={`aspect-[3/4] w-full rounded-2xl overflow-hidden transition-all duration-200 ${selectedTemplate === tpl.id ? 'ring-[3px] ring-purple-500 ring-offset-4 ring-offset-[#020203] shadow-2xl shadow-purple-500/20' : 'ring-1 ring-white/10 group-hover:ring-2 group-hover:ring-white/20'}`}>
                        <div className={`w-full h-full bg-gradient-to-br ${tpl.gradient} p-4 flex flex-col`}>
                          <div className="h-[8px] rounded-full mb-1" style={{ width: '50%', backgroundColor: headColor }} />
                          <div className="h-[5px] rounded-full mb-2" style={{ width: '30%', backgroundColor: textColor }} />
                          <div className="h-px w-full mb-2" style={{ backgroundColor: lineColor }} />
                          <div className="flex gap-2 flex-1">
                            <div className="flex-1 space-y-1.5">
                              <div className="h-[5px] rounded-full" style={{ width: '35%', backgroundColor: tpl.accent, opacity: 0.8 }} />
                              <div className="h-[4px] rounded-full" style={{ width: '85%', backgroundColor: textColor }} />
                              <div className="h-[4px] rounded-full" style={{ width: '70%', backgroundColor: textColor }} />
                            </div>
                            <div className="w-[30%] space-y-1.5">
                              <div className="h-[4px] rounded-full" style={{ width: '80%', backgroundColor: textColor }} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2.5 px-0.5">
                        <h3 className={`text-sm font-semibold transition-colors ${selectedTemplate === tpl.id ? 'text-purple-400' : 'text-slate-300 group-hover:text-white'}`}>{tpl.name}</h3>
                        <p className="text-[10px] text-slate-600">{tpl.category}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <button onClick={() => setStep(2)} className="w-full py-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest">
              Continuar con {wizardTemplates.find(t => t.id === selectedTemplate)?.name || 'plantilla'}
              <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-4xl font-extrabold tracking-tight">Optimiza tu <span className="text-indigo-400">Futuro</span></h1>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">Sube tu CV actual y pega la oferta que deseas. Nuestra IA hará el resto.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-8 group hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden">
                <input type="file" accept=".pdf" onChange={(e) => setCvFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform"><Upload className="text-indigo-400" size={32} /></div>
                  <h3 className="text-xl font-bold">Currículum (PDF)</h3>
                  <p className="text-slate-400 text-sm">Arrastra tu archivo o haz clic para subir.</p>
                  {cvFile && <span className="text-emerald-400 font-medium flex items-center gap-2 mt-2 bg-emerald-500/10 px-3 py-1 rounded-full text-xs"><CheckCircle2 size={14} /> {cvFile.name}</span>}
                </div>
              </div>

              <div className="glass-card p-8 group hover:border-purple-500/30 transition-all">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform"><Globe className="text-purple-400" size={32} /></div>
                  <h3 className="text-xl font-bold">Oferta de Trabajo</h3>
                  <p className="text-slate-400 text-sm">Pega la URL de LinkedIn o InfoJobs.</p>
                  <input type="url" value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} placeholder="https://linkedin.com/jobs/..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500/50 transition-colors text-sm" />
                </div>
              </div>
            </div>

            <button onClick={handleProcess} disabled={loading || !cvFile || !jobUrl} className="w-full py-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest">
              {loading ? <><RefreshCw className="animate-spin" size={24} /> Analizando con IA...</> : <><BrainCircuit size={24} /> Empezar Optimización</>}
            </button>
          </motion.div>
        )}

        {step === 3 && analysis && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
            <div className="flex items-center justify-between">
              <div><h2 className="text-3xl font-bold mb-2">Análisis de <span className="text-emerald-400">Match</span></h2><p className="text-slate-400">Nuestro HR-Expert ha detectado los siguientes gaps.</p></div>
              <div className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-3xl border border-white/10">
                <span className="text-slate-400 font-medium">Score</span><span className="text-4xl font-black text-emerald-400">{analysis.match_score}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-6 border-emerald-500/20 bg-emerald-500/5">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-3"><CheckCircle2 className="text-emerald-400" size={20} /> Fortalezas</h3>
                <ul className="space-y-3">
                  {analysis.strengths.map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />{s}</li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-6 border-amber-500/20 bg-amber-500/5">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-3"><AlertCircle className="text-amber-400" size={20} /> Debilidades</h3>
                <ul className="space-y-3">
                  {analysis.weaknesses.map((w: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />{w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button onClick={() => setStep(4)} className="w-full py-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 uppercase tracking-widest">
              Generar CV Optimizado AI <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 4 && analysis && (
          <div className="space-y-6">
            <CVPreview cvData={analysis.parsedCV} template={selectedTemplate} />
            <div className="flex gap-4 pt-8">
               <button onClick={() => setStep(3)} className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold border border-white/10 transition-all uppercase tracking-widest text-xs">Atrás</button>
               <button onClick={handleSaveToDB} disabled={saving} className="flex-[2] py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-black shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                  {saving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />} {saving ? 'Sincronizando...' : 'Guardar en mi Historial'}
               </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
