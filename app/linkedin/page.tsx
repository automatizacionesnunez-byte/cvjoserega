'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link as LinkIcon, RefreshCw, CheckCircle2, AlertCircle, Sparkles, ArrowRight, Target, TrendingUp, Eye } from 'lucide-react';

import { API_BASE_URL } from '../lib/api';

export default function LinkedInOptimizer() {
  const [profileUrl, setProfileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!profileUrl) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/analyze-linkedin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile_url: profileUrl })
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      alert("Error analizando perfil. Verifica que el backend esté arriba.");
    } finally {
      setLoading(false);
    }
  };

  const ScoreBar = ({ score, label }: { score: number; label: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400 font-medium">{label}</span>
        <span className={`font-bold ${score >= 70 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>{score}%</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 1, ease: 'easeOut' }} className={`h-full rounded-full ${score >= 70 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} />
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-fade pb-20 mt-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Optimizador de <span className="text-blue-400">LinkedIn</span></h1>
        <p className="text-slate-400">Analiza tu perfil y recibe sugerencias AI para maximizar tu visibilidad.</p>
      </div>

      {!results ? (
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-10 space-y-10 border-blue-500/10">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-xl shadow-blue-500/10">
                <LinkIcon className="text-blue-400" size={32} />
              </div>
              <h3 className="text-xl font-bold">Analiza tu Perfil</h3>
              <p className="text-sm text-slate-400 max-w-sm">Pega la URL de tu perfil de LinkedIn. La IA evaluará cada sección y te dará recomendaciones accionables.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">URL de LinkedIn</label>
              <input type="url" value={profileUrl} onChange={(e) => setProfileUrl(e.target.value)} placeholder="https://linkedin.com/in/tu-perfil" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 text-sm" />
            </div>

            <button onClick={handleAnalyze} disabled={loading || !profileUrl} className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-3">
              {loading ? <><RefreshCw className="animate-spin" size={20} /> Analizando perfil...</> : <><Eye size={20} /> Analizar LinkedIn</>}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fade">
          {/* Score Overview */}
          <div className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-blue-500/5 to-indigo-500/5">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border-2 border-blue-500/30">
                <span className="text-4xl font-black text-blue-400">{results.score}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Puntuación Global</h3>
                <p className="text-sm text-slate-400">Tu perfil necesita mejoras para competir con el top 20%.</p>
              </div>
            </div>
            <button onClick={() => setResults(null)} className="text-sm text-slate-500 hover:text-white">Nuevo Análisis</button>
          </div>

          {/* Section Scores */}
          <div className="glass-card p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><TrendingUp className="text-blue-400" /> Desglose por Sección</h3>
            <ScoreBar score={results.headline.score} label="Headline" />
            <ScoreBar score={results.summary.score} label="About / Summary" />
            <ScoreBar score={results.skills.score} label="Skills" />
            <ScoreBar score={results.experience.score} label="Experience" />
          </div>

          {/* Headline Suggestion */}
          <div className="glass-card p-8 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2"><AlertCircle className="text-amber-400" size={18} /> Headline</h3>
            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4">
              <p className="text-xs text-red-400 font-bold mb-1">Actual:</p>
              <p className="text-sm text-slate-400 italic">"{results.headline.current}"</p>
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4">
              <p className="text-xs text-emerald-400 font-bold mb-1">Sugerido:</p>
              <p className="text-sm text-slate-200">"{results.headline.suggested}"</p>
            </div>
          </div>

          {/* Summary Suggestion */}
          <div className="glass-card p-8 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2"><Sparkles className="text-purple-400" size={18} /> About Section</h3>
            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4">
              <p className="text-xs text-emerald-400 font-bold mb-2">Sugerencia AI:</p>
              <p className="text-sm text-slate-200 leading-relaxed">"{results.summary.suggested}"</p>
            </div>
          </div>

          {/* Missing Skills */}
          <div className="glass-card p-8 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2"><Target className="text-indigo-400" size={18} /> Skills que faltan</h3>
            <div className="flex flex-wrap gap-2">
              {results.skills.missing.map((skill: string) => (
                <span key={skill} className="px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-xl text-sm font-bold border border-indigo-500/20">{skill}</span>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="glass-card p-8 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2"><CheckCircle2 className="text-emerald-400" size={18} /> Tips Accionables</h3>
            <ul className="space-y-3">
              {results.overall_tips.map((tip: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-emerald-400 text-xs font-bold">{i + 1}</span>
                  </div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
