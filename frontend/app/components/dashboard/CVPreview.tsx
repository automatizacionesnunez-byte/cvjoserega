'use client';

import { useState, useEffect } from 'react';
import { FileDown, Printer, FileEdit, CheckCircle, RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '../../lib/api';

interface CVPreviewProps {
  cvData: any;
  template: string;
}

export default function CVPreview({ cvData, template }: CVPreviewProps) {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreview = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/export/preview`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cv_data: cvData, template_name: template })
        });
        const text = await res.text();
        setHtml(text);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPreview();
  }, [cvData, template]);

  const handleExport = async (format: 'pdf' | 'docx') => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/export/${format}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv_data: cvData, template_name: template })
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mi-cv.${format}`;
      a.click();
    } catch (err) {
      console.error(err);
      alert("Error al exportar. Revisa el backend.");
    }
  };

  return (
    <div className="space-y-8 animate-fade">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 p-8 rounded-3xl border border-white/10 gap-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-3">
            <CheckCircle className="text-emerald-400" size={24} />
            ¡CV Optimizado con Éxito!
          </h3>
          <p className="text-slate-500 text-sm mt-1">El motor de IA ha procesado tu perfil. Elige tu formato de descarga.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
             onClick={() => handleExport('docx')}
             className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 transition-all text-xs font-black uppercase tracking-widest"
          >
            <FileEdit size={16} />
            Word
          </button>
          <button 
             onClick={() => handleExport('pdf')}
             className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-xl shadow-purple-500/20 hover:scale-[1.03] active:scale-[0.97] transition-all text-xs font-black uppercase tracking-widest"
          >
            <FileDown size={20} />
            PDF Premium
          </button>
        </div>
      </div>

      <div className="glass-card p-0 overflow-hidden bg-white shadow-2xl ring-1 ring-black/5 rounded-2xl relative">
        {loading ? (
          <div className="h-[842px] flex flex-col items-center justify-center gap-4 bg-slate-50/50 backdrop-blur-sm">
            <RefreshCw className="animate-spin text-purple-500" size={40} />
            <p className="text-slate-500 font-bold animate-pulse uppercase tracking-[0.2em] text-[10px]">Generando Vista Previa HQ...</p>
          </div>
        ) : (
          <div className="w-full h-full overflow-auto bg-slate-100 p-4 md:p-10 flex justify-center">
             <div className="bg-white shadow-2xl w-full max-w-[800px] min-h-[1100px]">
                <iframe 
                  srcDoc={html}
                  className="w-full h-full min-h-[1100px] border-none"
                  title="CV Preview"
                />
             </div>
          </div>
        )}
      </div>

      <div className="text-center pt-4">
        <p className="text-slate-600 text-[10px] uppercase tracking-[0.3em] font-black flex items-center justify-center gap-3 opacity-40">
           <div className="w-10 h-px bg-slate-800" />
           <Printer size={12} />
           Renderizado por CV-Pilot Engine
           <div className="w-10 h-px bg-slate-800" />
        </p>
      </div>
    </div>
  );
}
