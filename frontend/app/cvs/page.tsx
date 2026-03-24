'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Search, 
  MoreVertical, 
  Download, 
  Trash2,
  ExternalLink,
  RefreshCw,
  Clock,
  Eye,
  Copy
} from 'lucide-react';
import Link from 'next/link';

import { supabase } from '../lib/supabase';

export default function CVList() {
  const [cvs, setCvs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [userId, setUserId] = useState<string>('demo-user-123');

  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUserId(data.session.user.id);
        fetchCvs(data.session.user.id);
      } else {
        fetchCvs('demo-user-123');
      }
    }
    getSession();
  }, []);

  const fetchCvs = async (uid: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/cvs/${uid}`);
      const data = await res.json();
      setCvs(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleExport = async (cv: any) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/export/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv_data: cv.cv_data, template_name: cv.template_id || 'modern' })
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cv.title || 'cv'}.pdf`;
      a.click();
    } catch (err) { alert("Error al exportar."); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este CV?")) return;
    try {
      await fetch(`http://127.0.0.1:8000/api/cvs/${id}`, { method: 'DELETE' });
      setCvs(cvs.filter(c => c.id !== id));
    } catch (err) { alert("Error al eliminar."); }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/cvs/duplicate/${id}`, { method: 'POST' });
      const newCv = await res.json();
      setCvs([newCv, ...cvs]);
    } catch (err) { alert("Error al duplicar."); }
  };

  const filteredCvs = cvs.filter(c => 
    c.title?.toLowerCase().includes(search.toLowerCase()) || 
    c.template_id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-fade">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mis <span className="text-indigo-400">Curriculums</span></h1>
          <p className="text-slate-400">Gestiona y descarga todas tus versiones optimizadas.</p>
        </div>
        <Link href="/cvs/new">
          <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 rounded-2xl font-bold shadow-lg shadow-purple-500/20 hover:scale-105 transition-all text-sm">
            <Plus size={20} />
            Nuevo CV
          </button>
        </Link>
      </div>

      <div className="relative">
         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
         <input 
            type="text" 
            placeholder="Buscar por título o plantilla..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-indigo-500/50 transition-all text-sm"
         />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><RefreshCw className="animate-spin text-purple-500" size={32} /></div>
      ) : filteredCvs.length === 0 ? (
        <div className="glass-card p-20 flex flex-col items-center text-center space-y-4 opacity-40">
           <FileText size={48} /><p className="text-xl font-bold">No se encontraron CVs.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filteredCvs.map((cv, idx) => (
            <motion.div key={cv.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="glass-card p-6 group hover:bg-white/[0.04] transition-all border-white/5 relative">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center"><FileText className="text-indigo-400" size={20} /></div>
                <div className="flex gap-2">
                  <button onClick={() => handleDuplicate(cv.id)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-slate-500 hover:text-white" title="Duplicar"><Copy size={14} /></button>
                  <button onClick={() => handleDelete(cv.id)} className="p-2 bg-white/5 hover:bg-red-500/10 rounded-lg transition-all text-slate-500 hover:text-red-400" title="Eliminar"><Trash2 size={14} /></button>
                </div>
              </div>

              <Link href={`/cvs/${cv.id}/edit`}>
                <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-400 transition-colors line-clamp-1 cursor-pointer">{cv.title || 'Untitled CV'}</h3>
              </Link>
              
              <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-6">
                <Clock size={10} /> {new Date(cv.updated_at).toLocaleDateString()}
                <span className="ml-auto font-black uppercase tracking-widest text-[8px] bg-white/5 px-2 py-0.5 rounded">{cv.template_id || 'modern'}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                <Link href={`/cvs/${cv.id}/public`} className="w-full">
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                     <Eye size={14} /> Ver
                  </button>
                </Link>
                <button onClick={() => handleExport(cv)} className="flex items-center justify-center gap-2 py-2.5 bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                   <Download size={14} /> PDF
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
