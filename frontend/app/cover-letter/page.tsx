'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileSignature,
  Upload,
  Globe,
  RefreshCw,
  Download,
  FileText,
  CheckCircle2,
  Sparkles,
  Copy
import { API_BASE_URL } from '../lib/api';

export default function CoverLetter() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jobUrl, setJobUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState('');

  const handleGenerate = async () => {
    if (!cvFile || !jobUrl) return;
    setLoading(true);
    try {
      // 1. Parse PDF
      const formData = new FormData();
      formData.append('file', cvFile);
      const parseRes = await fetch(`${API_BASE_URL}/api/parse`, { method: 'POST', body: formData });
      const parsedCV = await parseRes.json();

      // 2. Generate cover letter via AI
      const aiRes = await fetch(`${API_BASE_URL}/api/ai/generate-cover-letter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv_data: parsedCV, job_url: jobUrl })
      });
      const data = await aiRes.json();
      setLetter(typeof data === 'string' ? data : data.letter || data.content || JSON.stringify(data));
    } catch (err) {
      console.error(err);
      alert("Error generando la carta. Revisa el backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letter);
    alert('Carta copiada al portapapeles.');
  };

  return (
    <div className="space-y-10 animate-fade pb-20">
      <div>
        <h1 className="text-3xl font-bold mb-2">Generador de <span className="text-emerald-400">Cover Letter</span></h1>
        <p className="text-slate-400">Crea una carta de presentación personalizada en segundos con IA.</p>
      </div>

      {!letter ? (
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="glass-card p-10 space-y-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <FileSignature className="text-emerald-400" size={32} />
              </div>
              <h3 className="text-xl font-bold">Personaliza tu carta</h3>
              <p className="text-sm text-slate-400 max-w-sm">Sube tu CV y pega la oferta. La IA generará una carta que conecte tu perfil con el puesto.</p>
            </div>

            {/* CV Upload */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">1. Tu CV (PDF)</label>
              <div className="relative">
                <input type="file" accept=".pdf" onChange={(e) => setCvFile(e.target.files?.[0] || null)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none" />
                {cvFile && <p className="text-xs text-emerald-400 font-bold mt-1">📄 {cvFile.name}</p>}
              </div>
            </div>

            {/* Job URL */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">2. URL de la Oferta</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input type="url" value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} placeholder="https://linkedin.com/jobs/..." className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-emerald-500/50 text-sm" />
              </div>
            </div>

            <button onClick={handleGenerate} disabled={loading || !cvFile || !jobUrl} className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl font-bold shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-3">
              {loading ? <><RefreshCw className="animate-spin" size={20} /> Generando con IA...</> : <><Sparkles size={20} /> Generar Cover Letter</>}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fade">
          <div className="glass-card p-8 border-emerald-500/20 bg-emerald-500/5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Carta Generada</h3>
                <p className="text-slate-400 text-sm">Revisa, edita y exporta.</p>
              </div>
            </div>
            <button onClick={() => setLetter('')} className="text-sm text-slate-500 hover:text-white">Nueva Carta</button>
          </div>

          {/* Letter Content */}
          <div className="glass-card p-8">
            <textarea
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              rows={18}
              className="w-full bg-transparent outline-none text-slate-200 text-sm leading-relaxed resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button onClick={handleCopy} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
              <Copy size={18} /> Copiar
            </button>
            <button className="flex-[2] py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl font-bold shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              <Download size={18} /> Descargar como PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
