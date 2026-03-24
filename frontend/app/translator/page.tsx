'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  RefreshCw, 
  ArrowRight, 
  Languages,
  CheckCircle2,
  Download,
  FileText,
  ChevronRight
} from 'lucide-react';
import { API_BASE_URL } from '../lib/api';

export default function Translator() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [targetLanguage, setTargetLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [translatedCV, setTranslatedCV] = useState<any>(null);

  const handleTranslate = async () => {
    if (!cvFile) return;
    setLoading(true);
    try {
      // 1. Parse PDF
      const formData = new FormData();
      formData.append('file', cvFile);
      const parseRes = await fetch(`${API_BASE_URL}/api/parse`, { method: 'POST', body: formData });
      const parsedData = await parseRes.json();

      // 2. Translate
      const transRes = await fetch(`${API_BASE_URL}/api/ai/translate-cv`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv_data: parsedData, target_language: targetLanguage })
      });
      const data = await transRes.json();
      setTranslatedCV(data);
    } catch (err) {
      console.error(err);
      alert("Error en la traducción. Asegúrate de que el backend esté activo.");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format: 'pdf' | 'docx') => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/export/${format}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv_data: translatedCV, template_name: 'modern' })
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cv-translated-${targetLanguage}.${format}`;
      a.click();
    } catch (err) {
       console.error(err);
    }
  };

  return (
    <div className="space-y-10 animate-fade pb-20 mt-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Traductor <span className="text-blue-400">AI Nativo</span></h1>
          <p className="text-slate-400">Traduce tu CV a cualquier idioma manteniendo el formato profesional.</p>
        </div>
      </div>

      {!translatedCV ? (
        <div className="glass-card p-10 max-w-2xl mx-auto space-y-10 border-blue-500/10">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-xl shadow-blue-500/10">
              <Languages className="text-blue-400" size={32} />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight">IA Translator Expert</h3>
            <p className="text-xs text-slate-500 max-w-sm">Nuestra IA traduce tu perfil profesional evitando errores lógicos y adaptando términos técnicos al mercado destino.</p>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">1. Sube tu CV Original (PDF)</label>
            <div className="relative group">
               <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none group-hover:border-blue-500/30 transition-all font-bold text-sm"
               />
               {cvFile && <p className="text-xs text-emerald-400 font-black mt-2 flex items-center gap-2 tracking-widest uppercase"><CheckCircle2 size={12} /> {cvFile.name} CARGADO</p>}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">2. Idioma Destino</label>
            <div className="relative">
              <select 
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-white appearance-none cursor-pointer font-bold text-sm hover:bg-white/[0.08] transition-all"
              >
                <option value="English">Inglés (USA/UK)</option>
                <option value="French">Francés</option>
                <option value="German">Alemán</option>
                <option value="Portuguese">Portugués</option>
                <option value="Italian">Italiano</option>
                <option value="Chinese">Chino Mandarín</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                <ChevronRight className="rotate-90" size={16} />
              </div>
            </div>
          </div>

          <button 
            onClick={handleTranslate}
            disabled={loading || !cvFile}
            className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? <RefreshCw className="animate-spin" size={20} /> : <Globe size={22} />}
            {loading ? 'Traduciendo con IA Nativa...' : 'Traducir CV Ahora'}
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-fade pb-20">
          <div className="glass-card p-10 border-emerald-500/20 bg-emerald-500/5 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-5">
               <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="text-emerald-400" size={28} />
               </div>
               <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold uppercase tracking-tight">Traducción Lista</h3>
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">{targetLanguage}</span>
                  </div>
                  <p className="text-slate-400 text-sm">Tu CV ha sido traducido y adaptado culturalmente.</p>
               </div>
             </div>
             <button onClick={() => setTranslatedCV(null)} className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-white/5 transition-all hover:text-white">Nueva Traducción</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="glass-card p-8 space-y-6">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><FileText size={16} /> Vista Rápida del Contenido</h4>
                <div className="bg-white/5 p-8 rounded-2xl space-y-6 text-sm text-slate-300 border border-white/5 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity"><Languages size={120} /></div>
                   <div className="relative z-10">
                     <p className="font-black text-2xl text-white border-b border-white/10 pb-4 mb-4 tracking-tighter uppercase">{translatedCV.personal_info?.name || translatedCV.personal_info?.full_name}</p>
                     <p className="italic text-slate-400 leading-relaxed text-xs">"{translatedCV.personal_info?.summary}"</p>
                     <div className="space-y-4 pt-6">
                        {translatedCV.experience?.slice(0, 2).map((exp: any, i: number) => (
                          <div key={i} className="flex flex-col gap-1">
                             <span className="font-black text-indigo-400 text-[10px] uppercase tracking-widest">{exp.role || exp.title}</span>
                             <span className="text-xs font-bold text-slate-500">at {exp.company}</span>
                          </div>
                        ))}
                     </div>
                   </div>
                </div>
             </div>

             <div className="glass-card p-8 flex flex-col justify-center gap-6 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 border-indigo-500/10">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-black tracking-tight mb-2 uppercase">Exportar CV</h4>
                  <p className="text-xs text-slate-500 px-10">Elige el formato de salida para tu aplicación profesional en {targetLanguage}.</p>
                </div>
                <button onClick={() => handleExport('pdf')} className="w-full py-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-purple-500/30 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-4">
                   <Download size={22} />
                   Descargar PDF de Alto Impacto
                </button>
                <button onClick={() => handleExport('docx')} className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-4 text-slate-400 hover:text-white">
                   <FileText size={22} />
                   Descargar Formato Word (ATS Friendly)
                </button>
                <p className="text-[10px] text-center text-slate-600 uppercase tracking-widest font-bold">Optimizado para sistemas ATS internacionales</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
