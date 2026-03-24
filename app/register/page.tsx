'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { supabase } from '../lib/supabase';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name }
        }
      });

      if (error) throw error;
      alert("Registro correcto. Revisa tu email si la confirmación está activa.");
      window.location.href = '/dashboard';
    } catch (err: any) {
      alert(err.message || "Error al registrarse.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020203] flex items-center justify-center relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/8 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/8 blur-[150px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md px-6"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/20">
              <PenTool className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">CV<span className="text-purple-500">Pilot</span></span>
          </Link>
          <h1 className="text-3xl font-black tracking-tight mb-2">Crea tu cuenta</h1>
          <p className="text-slate-500 text-sm">Empieza a optimizar tu carrera con IA en 30 segundos.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nombre completo</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="María García" className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-indigo-500/50 transition-all text-sm" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-indigo-500/50 transition-all text-sm" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-indigo-500/50 transition-all text-sm" required minLength={8} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-bold text-sm shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? 'Creando cuenta...' : <>Empezar Gratis <ArrowRight size={16} /></>}
          </button>
        </form>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-slate-600 font-medium">o</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3">
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.462.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
          Registrarse con Google
        </button>

        <p className="text-center mt-8 text-sm text-slate-500">
          ¿Ya tienes cuenta? <Link href="/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">Iniciar sesión</Link>
        </p>

        <p className="text-center mt-4 text-[10px] text-slate-700">
          Al registrarte, aceptas nuestros <Link href="/legal" className="underline hover:text-slate-500">Términos de Servicio</Link> y <Link href="/legal" className="underline hover:text-slate-500">Política de Privacidad</Link>.
        </p>
      </motion.div>
    </div>
  );
}
