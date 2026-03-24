'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Mail, 
  ExternalLink, 
  Building2,
  UserCheck,
  RefreshCw
} from 'lucide-react';
import { API_BASE_URL } from '../lib/api';

export default function Leads() {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!companyName) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/leads?company_name=${encodeURIComponent(companyName)}`);
      const data = await res.json();
      setLeads(data.results || []);
    } catch (err) {
      console.error(err);
      alert("Error buscando leads.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade pb-20 mt-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Buscador de <span className="text-indigo-400">Leads Directos</span></h1>
          <p className="text-slate-400">Encuentra a los responsables de selección y contacta directamente.</p>
        </div>
      </div>

      <div className="glass-card p-10 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-indigo-500/10">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block">Empresa Objetivo</label>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={22} />
            <input 
              type="text" 
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ej. Google, Stripe, Inditex..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 outline-none focus:border-indigo-500/50 transition-all font-bold text-lg"
            />
          </div>
          <button 
             onClick={handleSearch}
             disabled={loading}
             className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 transition-all disabled:opacity-50"
          >
            {loading ? <RefreshCw className="animate-spin" size={20} /> : <Search size={22} />}
            {loading ? 'Buscando Responsables...' : 'Buscar Contactos'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <UserCheck className="text-emerald-400" />
          Contacts Encontrados
        </h2>

        {leads.length === 0 && !loading && (
          <div className="glass-card p-24 flex flex-col items-center justify-center text-center opacity-30 border-dashed border-2 border-white/5">
            <Search size={64} className="mb-6" />
            <p className="font-bold text-lg">Inicia una búsqueda</p>
            <p className="text-sm">Escribe el nombre de una empresa para ver los responsables de RRHH.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leads.map((lead, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 group hover:bg-white/[0.04] transition-all border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -z-10" />
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                  <span className="text-2xl font-black text-indigo-400">{lead.name.charAt(0)}</span>
                </div>
                <a href={lead.url} target="_blank" className="p-3 bg-white/5 hover:bg-indigo-500/20 rounded-xl text-slate-400 hover:text-white transition-all">
                  <ExternalLink size={20} />
                </a>
              </div>

              <div className="space-y-2 mb-8">
                <h3 className="font-black text-xl leading-tight group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{lead.name}</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{lead.role_found || 'Talent Acquisition Expert'}</p>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                    <Mail size={12} />
                    Probable Correo
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">90% Verified</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center group/mail cursor-pointer hover:border-indigo-500/30 transition-all">
                  <code className="text-indigo-300 text-sm font-bold">{lead.emails ? lead.emails[0] : 'nombre.apellido@empresa.com'}</code>
                  <RefreshCw size={14} className="text-slate-600 group-hover/mail:text-white transition-colors" />
                </div>
              </div>

              <button className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 border border-white/5 flex items-center justify-center gap-3 transition-all hover:text-white">
                Ver Estrategia de Contacto
                <ChevronRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
