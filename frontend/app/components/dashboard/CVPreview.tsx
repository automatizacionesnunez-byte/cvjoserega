'use client';

import { useState, useEffect } from 'react';
import { FileDown, Printer, FileEdit, CheckCircle, RefreshCw } from 'lucide-react';

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
        const res = await fetch(`http://127.0.0.1:8000/api/export/preview`, {
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
      const res = await fetch(`http://127.0.0.1:8000/api/export/${format}`, {
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
      <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <CheckCircle className="text-emerald-400" />
            ¡CV Optimizado con Éxito!
          </h3>
          <p className="text-slate-400 text-sm">Ahora puedes descargar tu CV en formatos profesionales.</p>
        </div>
        <div className="flex gap-3">
          <button 
             onClick={() => handleExport('docx')}
             className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-xl border border-blue-500/20 transition-all text-sm font-semibold"
          >
            <FileEdit size={16} />
            Descargar Word (ATS)
          </button>
          <button 
             onClick={() => handleExport('pdf')}
             className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg shadow-purple-500/20 hover:scale-105 transition-all text-sm font-bold"
          >
            <FileDown size={18} />
            Descargar PDF Premium
          </button>
        </div>
      </div>

      <div className="glass-card p-0 overflow-hidden bg-white shadow-2xl ring-1 ring-black/5">
        {loading ? (
          <div className="h-[842px] flex flex-col items-center justify-center gap-4 bg-slate-50">
            <RefreshCw className="animate-spin text-purple-500" size={40} />
            <p className="text-slate-500 font-bold animate-pulse">Generando Vista Previa HQ...</p>
          </div>
        ) : (
          <iframe 
            srcDoc={html}
            className="w-full min-h-[1100px] border-none"
            title="CV Preview"
          />
        )}
      </div>

      <div className="text-center">
        <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-4 flex items-center justify-center gap-2">
           <Printer size={12} />
           Vista Previa Renderizada por CV-Pilot Engine
        </p>
      </div>
    </div>
  );
}
