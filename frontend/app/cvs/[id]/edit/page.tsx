'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Save, RefreshCw, ArrowLeft, Eye, Plus, Trash2, User, Briefcase, GraduationCap, Code
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase';
import { API_BASE_URL } from '../../../lib/api';

interface CVData {
  personal_info: { full_name: string; email: string; phone: string; location: string; summary: string; linkedin?: string; github?: string; website?: string };
  experience: { title: string; company: string; dates: string; description: string }[];
  education: { degree: string; institution: string; dates: string }[];
  skills: string[];
}

export default function CVEditor() {
  const params = useParams();
  const cvId = params.id as string;
  const [cv, setCv] = useState<any>(null);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>('demo-user-123');

  useEffect(() => {
    async function fetch_() {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session?.user) {
          setUserId(sessionData.session.user.id);
        }

        const res = await fetch(`${API_BASE_URL}/api/cvs/get/${cvId}`);
        const found = await res.json();
        if (found) {
          setCv(found);
          setCvData(found.cv_data || { 
            personal_info: { full_name: '', email: '', phone: '', location: '', summary: '' }, 
            experience: [], 
            education: [], 
            skills: [] 
          });
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    fetch_();
  }, [cvId]);

  const handleSave = async () => {
    if (!cvData) return;
    setSaving(true);
    try {
      await fetch(`${API_BASE_URL}/api/cvs/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: cvId,
          user_id: userId, 
          cv_data: cvData, 
          template_id: cv?.template_id || 'modern', 
          title: cv?.title || 'CV Editado' 
        })
      });
      alert('CV guardado correctamente.');
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const updatePersonal = (field: string, value: string) => {
    if (!cvData) return;
    setCvData({ ...cvData, personal_info: { ...cvData.personal_info, [field]: value } });
  };

  const updateExperience = (idx: number, field: string, value: string) => {
    if (!cvData) return;
    const updated = [...cvData.experience];
    (updated[idx] as any)[field] = value;
    setCvData({ ...cvData, experience: updated });
  };

  const addExperience = () => {
    if (!cvData) return;
    setCvData({ ...cvData, experience: [...cvData.experience, { title: '', company: '', dates: '', description: '' }] });
  };

  const removeExperience = (idx: number) => {
    if (!cvData) return;
    setCvData({ ...cvData, experience: cvData.experience.filter((_, i) => i !== idx) });
  };

  const updateEducation = (idx: number, field: string, value: string) => {
    if (!cvData) return;
    const updated = [...cvData.education];
    (updated[idx] as any)[field] = value;
    setCvData({ ...cvData, education: updated });
  };

  const addEducation = () => {
    if (!cvData) return;
    setCvData({ ...cvData, education: [...cvData.education, { degree: '', institution: '', dates: '' }] });
  };

  const removeEducation = (idx: number) => {
    if (!cvData) return;
    setCvData({ ...cvData, education: cvData.education.filter((_, i) => i !== idx) });
  };

  if (loading) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4"><RefreshCw className="animate-spin text-purple-500" size={40} /><p className="text-slate-500">Cargando editor...</p></div>;
  if (!cvData) return <div className="text-center py-20 text-slate-500">CV no encontrado. <Link href="/cvs" className="text-indigo-400">Volver</Link></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade pb-20 mt-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/cvs` || '/dashboard'} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"><ArrowLeft size={20} /></Link>
          <h1 className="text-2xl font-bold">Editor de CV</h1>
        </div>
        <div className="flex gap-3">
          <Link href={`/cvs/${cvId}/public`} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-white/10 transition-all uppercase tracking-widest"><Eye size={16} /> Preview</Link>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-xs font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 uppercase tracking-widest">
            {saving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />} {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>

      {/* Personal Info */}
      <section className="glass-card p-8 space-y-6">
        <h2 className="text-lg font-bold flex items-center gap-2"><User className="text-indigo-400" size={18} /> Información Personal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Nombre Completo', field: 'full_name', ph: 'María García' },
            { label: 'Email Profesional', field: 'email', ph: 'maria@email.com' },
            { label: 'Teléfono', field: 'phone', ph: '+34 612 345 678' },
            { label: 'Ubicación', field: 'location', ph: 'Madrid, España' },
            { label: 'LinkedIn URL', field: 'linkedin', ph: 'linkedin.com/in/maria' }
          ].map(({ label, field, ph }) => (
            <div key={field} className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
              <input value={(cvData.personal_info as any)[field] || ''} onChange={(e) => updatePersonal(field, e.target.value)} placeholder={ph} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50 text-sm" />
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Resumen Profesional</label>
          <textarea value={cvData.personal_info.summary || ''} onChange={(e) => updatePersonal('summary', e.target.value)} rows={4} placeholder="Escribe un resumen impactante de tu carrera..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50 text-sm resize-none" />
        </div>
      </section>

      {/* Experience */}
      <section className="glass-card p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2"><Briefcase className="text-purple-400" size={18} /> Experiencia Laboral</h2>
          <button onClick={addExperience} className="px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-purple-500/20 transition-all uppercase tracking-widest"><Plus size={14} /> Añadir</button>
        </div>
        {cvData.experience.map((exp: any, idx: number) => (
          <div key={idx} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4 relative group">
            <button onClick={() => removeExperience(idx)} className="absolute top-4 right-4 text-red-400/30 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Cargo</label>
                <input value={exp.title} onChange={(e) => updateExperience(idx, 'title', e.target.value)} placeholder="Ej: Senior Developer" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Empresa</label>
                <input value={exp.company} onChange={(e) => updateExperience(idx, 'company', e.target.value)} placeholder="Ej: Google" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Fechas</label>
                <input value={exp.dates} onChange={(e) => updateExperience(idx, 'dates', e.target.value)} placeholder="Ene 2020 - Ago 2023" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Descripción y Logros</label>
              <textarea value={exp.description} onChange={(e) => updateExperience(idx, 'description', e.target.value)} rows={3} placeholder="Describe tus responsabilidades y logros clave..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none text-sm resize-none" />
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="glass-card p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2"><GraduationCap className="text-emerald-400" size={18} /> Formación Académica</h2>
          <button onClick={addEducation} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-emerald-500/20 transition-all uppercase tracking-widest"><Plus size={14} /> Añadir</button>
        </div>
        {cvData.education.map((edu: any, idx: number) => (
          <div key={idx} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4 relative group">
            <button onClick={() => removeEducation(idx)} className="absolute top-4 right-4 text-red-400/30 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Título / Grado</label>
                <input value={edu.degree} onChange={(e) => updateEducation(idx, 'degree', e.target.value)} placeholder="Ej: Grado en Ing. Informática" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Institución</label>
                <input value={edu.institution} onChange={(e) => updateEducation(idx, 'institution', e.target.value)} placeholder="Ej: Universidad Complutense" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Fechas</label>
                <input value={edu.dates} onChange={(e) => updateEducation(idx, 'dates', e.target.value)} placeholder="2016 - 2020" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="glass-card p-8 space-y-6">
        <h2 className="text-lg font-bold flex items-center gap-2"><Code className="text-amber-400" size={18} /> Habilidades Técnicas</h2>
        <div className="flex flex-wrap gap-2">
          {cvData.skills.map((skill: string, idx: number) => (
            <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm transition-all group hover:border-amber-500/30">
              <input value={skill} onChange={(e) => { const s = [...cvData.skills]; s[idx] = e.target.value; setCvData({ ...cvData, skills: s }); }} className="bg-transparent outline-none w-24 text-slate-300 focus:text-white" />
              <button onClick={() => setCvData({ ...cvData, skills: cvData.skills.filter((_, i) => i !== idx) })} className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
            </div>
          ))}
          <button onClick={() => setCvData({ ...cvData, skills: [...cvData.skills, ''] })} className="px-4 py-2 bg-amber-500/10 text-amber-400 rounded-xl text-xs font-bold flex items-center gap-1 border border-amber-500/20 hover:bg-amber-500/20 transition-all uppercase tracking-widest"><Plus size={14} /> Añadir Skill</button>
        </div>
      </section>

      {/* Sticky Save */}
      <div className="sticky bottom-6 glass-card p-5 flex justify-between items-center bg-[#020203]/90 backdrop-blur-xl border-white/10 z-50 shadow-2xl">
        <div className="flex flex-col">
          <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-0.5">Modo Edición</p>
          <p className="text-xs text-slate-400">Los cambios se guardarán permanentemente en la nube.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-black text-sm shadow-xl shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-3 uppercase tracking-widest">
          {saving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />} {saving ? 'Sincronizando...' : 'Guardar Cambios'}
        </button>
      </div>
    </div>
  );
}
