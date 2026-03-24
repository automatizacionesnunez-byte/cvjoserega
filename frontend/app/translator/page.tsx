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
  FileText
} from 'lucide-react';

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
      const parseRes = await fetch('http://127.0.0.1:8000/api/parse', { method: 'POST', body: formData });
      const parsedData = await parseRes.json();

      // 2. Translate
      const transRes = await fetch('http://127.0.0.1:8000/api/ai/translate-cv', {
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
      const res = await fetch(`http://127.0.0.1:8000/api/export/${format}`, {
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
    <div className="space-y-10 animate-fade">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Traductor <span className="text-blue-400">AI Nativo</span></h1>
          <p className="text-slate-400">Traduce tu CV a cualquier idioma manteniendo el formato profesional.</p>
        </div>
      </div>

      {!translatedCV ? (
        <div className="glass-card p-10 max-w-2xl mx-auto space-y-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <Languages className="text-blue-400" size={32} />
            </div>
            <h3 className="text-xl font-bold">Configura tu traducción</h3>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">1. Sube tu CV (PDF)</label>
            <input 
               type="file" 
               accept=".pdf" 
               onChange={(e) => setCvFile(e.target.files?.[0] || null)}
               className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
            />
            {cvFile && <p className="text-xs text-emerald-400 font-bold">📄 {cvFile.name} cargado.</p>}
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">2. Idioma Destino</label>
            <select 
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none text-white appearance-none cursor-pointer"
            >
              <option value="English">Inglés (USA/UK)</option>
              <option value="French">Francés</option>
              <option value="German">Alemán</option>
              <option value="Portuguese">Portugués</option>
              <option value="Italian">Italiano</option>
            </select>
          </div>

          <button 
            onClick={handleTranslate}
            disabled={loading || !cvFile}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? <RefreshCw className="animate-spin" /> : <Globe size={20} />}
            {loading ? 'Traduciendo con IA...' : 'Traducir Ahora'}
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-fade">
          <div className="glass-card p-8 border-emerald-500/20 bg-emerald-500/5 flex justify-between items-center">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="text-emerald-400" />
               </div>
               <div>
                  <h3 className="text-xl font-bold">Traducción Completa ({targetLanguage})</h3>
                  <p className="text-slate-400 text-sm">Revisa y exporta tu nuevo CV.</p>
               </div>
             </div>
             <div className="flex gap-4">
                <button onClick={() => setTranslatedCV(null)} className="text-sm text-slate-500 hover:text-white transition-all">Nueva Traducción</button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="glass-card p-8 space-y-6">
                <h4 className="font-bold flex items-center gap-2"><FileText size={18} /> Vista Rápida</h4>
                <div className="bg-white/5 p-6 rounded-xl space-y-4 text-sm text-slate-300">
                   <p className="font-bold text-white text-lg border-b border-white/10 pb-2">{translatedCV.personal_info?.name}</p>
                   <p className="italic text-slate-400">"{translatedCV.personal_info?.summary}"</p>
                   <div className="space-y-2 pt-4">
                      {translatedCV.experience?.slice(0, 2).map((exp: any, i: number) => (
                        <div key={i}>
                           <span className="font-bold text-indigo-400">{exp.role}</span> @ {exp.company}
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="glass-card p-8 flex flex-col justify-center gap-6">
                <h4 className="font-bold">Exportar en {targetLanguage}</h4>
                <button onClick={() => handleExport('pdf')} className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-bold shadow-xl shadow-purple-500/20 hover:scale-105 transition-all flex items-center justify-center gap-3">
                   <Download size={20} />
                   Descargar PDF Premium
                </button>
                <button onClick={() => handleExport('docx')} className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                   <FileText size={20} />
                   Descargar Word (ATS)
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
