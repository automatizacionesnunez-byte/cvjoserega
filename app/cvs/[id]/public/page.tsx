'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { RefreshCw, Download, ArrowLeft, Share2, FileText, Eye } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase';
import { API_BASE_URL } from '../../../lib/api';

export default function PublicCVView() {
  const params = useParams();
  const cvId = params.id as string;
  const [cv, setCv] = useState<any>(null);
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCV() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/cvs/get/${cvId}`);
        const found = await res.json();
        
        if (found) {
          setCv(found);
          const previewRes = await fetch(`${API_BASE_URL}/api/export/preview`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              cv_data: found.cv_data, 
              template_name: found.template_id || 'modern' 
            })
          });
          const htmlText = await previewRes.text();
          setHtml(htmlText);
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    fetchCV();
  }, [cvId]);

  const handleExport = async (format: 'pdf' | 'docx') => {
    if (!cv) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/export/${format}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv_data: cv.cv_data, template_name: cv.template_id || 'modern' })
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cv.title || 'cv'}.${format}`;
      a.click();
    } catch (err) { console.error(err); }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <RefreshCw className="animate-spin text-purple-500" size={40} />
        <p className="text-slate-400 font-bold animate-pulse">Cargando CV...</p>
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <FileText className="text-slate-600" size={48} />
        <p className="text-slate-400 text-xl font-bold">CV no encontrado</p>
        <Link href="/cvs" className="text-indigo-400 hover:text-indigo-300">← Volver a Mis CVs</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade pb-20 mt-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/cvs" className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{cv.title || 'CV Sin Título'}</h1>
            <p className="text-xs text-slate-500">
              Plantilla: <span className="text-indigo-400 font-bold">{cv.template_id || 'modern'}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => handleExport('docx')} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold border border-white/10 transition-all uppercase tracking-widest">
            Word
          </button>
          <button onClick={() => handleExport('pdf')} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-xs font-bold shadow-lg shadow-purple-500/20 hover:scale-105 transition-all uppercase tracking-widest">
            <Download size={16} /> PDF
          </button>
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('URL copiada al portapapeles.'); }} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold border border-white/10 transition-all uppercase tracking-widest">
            <Share2 size={16} />
          </button>
        </div>
      </div>

      <div className="glass-card p-0 overflow-hidden bg-white shadow-2xl ring-1 ring-black/5 rounded-2xl">
        <iframe srcDoc={html} className="w-full min-h-[1100px] border-none" title="CV Preview" />
      </div>
    </div>
  );
}
