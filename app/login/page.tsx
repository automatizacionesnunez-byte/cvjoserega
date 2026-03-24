'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Mail, Lock, ArrowRight, Chrome, PlayIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { supabase } from '../lib/supabase';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      window.location.href = '/dashboard';
    } catch (err: any) {
      alert(err.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  const enterAsGuest = () => {
    localStorage.setItem('cvpilot_guest_mode', 'true');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#020203] flex items-center justify-center relative overflow-hidden text-slate-200">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/5 blur-[150px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/20">
              <PenTool className="text-white w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-white">CV<span className="text-indigo-400">Pilot</span></span>
          </Link>
          <h1 className="text-4xl font-black tracking-tight mb-2 text-white">Hola de nuevo</h1>
          <p className="text-slate-500 text-sm font-medium">Continúa con tu evolución profesional.</p>
        </div>

        {/* Form */}
        <div className="glass-card p-8 bg-white/[0.02] border-white/5 shadow-2xl space-y-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email corporativo</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-indigo-500/30 transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Password</label>
                <button type="button" className="text-[10px] font-black text-indigo-400 hover:text-white transition-colors uppercase tracking-widest">Recuperar</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-indigo-500/30 transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-white/5 hover:bg-slate-100 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'Accediendo...' : <>Entrar al Ecosistema <ArrowRight size={18} className="stroke-[3]" /></>}
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[10px] text-slate-700 font-black uppercase tracking-widest">Modo Beta</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <button 
            onClick={enterAsGuest}
            className="w-full py-5 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600/20 hover:text-white transition-all flex items-center justify-center gap-3"
          >
            <PlayIcon size={18} className="fill-current" />
            Entrar sin Registro
          </button>
        </div>

        <p className="text-center mt-12 text-xs font-bold text-slate-600">
          ¿No eres miembro? <Link href="/register" className="text-indigo-400 hover:text-white transition-colors underline underline-offset-4">Crea una cuenta hoy</Link>
        </p>
      </motion.div>
    </div>
  );
}
