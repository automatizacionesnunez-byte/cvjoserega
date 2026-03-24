'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Key, 
  Bell, 
  Shield, 
  CreditCard,
  Save,
  CheckCircle2
} from 'lucide-react';

export default function Settings() {
  const [saveStatus, setSaveStatus] = useState(false);

  const handleSave = () => {
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Ajustes del <span className="text-indigo-400">Sistema</span></h1>
          <p className="text-slate-400">Gestiona tus API Keys, perfil y preferencias de suscripción.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Nav */}
        <div className="space-y-2">
          {['Perfil', 'API Keys', 'Notificaciones', 'Seguridad', 'Plan SaaS'].map((item) => (
            <button key={item} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${item === 'API Keys' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
              {item}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-8">
          <div className="glass-card p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <Key className="text-indigo-400" />
              Configuración de AI
            </h3>
            
            <div className="space-y-4">
               <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">OpenAI Base URL</label>
                  <input 
                    type="text" 
                    defaultValue="https://api.siliconflow.cn/v1"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50"
                  />
               </div>
               <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">API Key Principal</label>
                  <input 
                    type="password" 
                    defaultValue="sk-sk-sk-sk-sk"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50"
                  />
               </div>
               <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/5 p-3 rounded-lg">
                  <Shield size={14} className="text-emerald-400" />
                  Tus llaves se guardan localmente de forma cifrada.
               </div>
            </div>
          </div>

          <div className="glass-card p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <CreditCard className="text-purple-400" />
              Estado de Suscripción
            </h3>
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex justify-between items-center">
              <div>
                <p className="font-bold text-purple-400">Plan Elite Activo</p>
                <p className="text-xs text-slate-500">Próximo pago: 24 Abril 2026</p>
              </div>
              <button className="text-xs font-bold uppercase tracking-widest text-white px-4 py-2 bg-purple-600 rounded-lg">Gestionar</button>
            </div>
          </div>

          <div className="flex justify-end gap-4">
             <button className="px-6 py-3 text-slate-400 hover:text-white transition-all text-sm font-bold">Descartar</button>
             <button 
                onClick={handleSave}
                className="px-10 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-purple-500/20 hover:scale-105 transition-all"
             >
                {saveStatus ? <CheckCircle2 size={18} /> : <Save size={18} />}
                {saveStatus ? 'Guardado' : 'Guardar Cambios'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
