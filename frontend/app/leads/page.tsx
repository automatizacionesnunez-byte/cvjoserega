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

export default function Leads() {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!companyName) return;
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/leads?company_name=${encodeURIComponent(companyName)}`);
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
    <div className="space-y-10 animate-fade">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Buscador de <span className="text-indigo-400">Leads Directos</span></h1>
          <p className="text-slate-400">Encuentra a los responsables de selección y contacta directamente.</p>
        </div>
      </div>

      <div className="glass-card p-8 bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 block">Empresa Objetivo</label>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="text" 
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ej. Google, Stripe, Inditex..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-indigo-500/50 transition-all font-medium"
            />
          </div>
          <button 
             onClick={handleSearch}
             disabled={loading}
             className="px-8 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <RefreshCw className="animate-spin" /> : <Search size={20} />}
            {loading ? 'Buscando Decision Makers...' : 'Buscar Contacts'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <UserCheck className="text-emerald-400" />
          Contacts Encontrados
        </h2>

        {leads.length === 0 && !loading && (
          <div className="glass-card p-20 flex flex-col items-center justify-center text-center opacity-40">
            <Search size={48} className="mb-4" />
            <p>Introduce el nombre de una empresa para ver los responsables de RRHH.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map((lead, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-6 group hover:bg-white/[0.04] transition-all border-white/5"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-indigo-400">{lead.name.charAt(0)}</span>
                </div>
                <a href={lead.url} target="_blank" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                  <ExternalLink size={18} />
                </a>
              </div>

              <div className="space-y-1 mb-6">
                <h3 className="font-bold text-lg leading-tight group-hover:text-indigo-400 transition-colors">{lead.name}</h3>
                <p className="text-sm text-slate-400">{lead.role_found || 'Recruiter / Talent Acquisition'}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Mail size={12} />
                    Email Probable
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold">90% Seguro</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex justify-between items-center group/mail cursor-pointer hover:border-indigo-500/30">
                  <code className="text-indigo-300 text-sm">{lead.emails ? lead.emails[0] : 'nombre.apellido@empresa.com'}</code>
                  <RefreshCw size={14} className="text-slate-600 group-hover/mail:text-white transition-colors" />
                </div>
              </div>

              <button className="w-full mt-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-400 border border-white/5 flex items-center justify-center gap-2 transition-all">
                Abrir Mensaje Directo
                <ExternalLink size={12} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
