'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Search, 
  Sparkles, 
  Settings, 
  LogOut,
  PenTool,
  Globe,
  MessageSquare,
  Layout,
  LifeBuoy,
  FileSignature,
  Link2,
  BookOpen,
  Eye,
  Rocket
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const coreItems = [
  { name: 'Portal AI', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Biblioteca CV', icon: FileText, path: '/cvs' },
  { name: 'Templates', icon: Layout, path: '/templates' },
  { name: 'Nueva Optimización', icon: Sparkles, path: '/cvs/new' },
];

const toolItems = [
  { name: 'Cover Letter', icon: FileSignature, path: '/cover-letter' },
  { name: 'LinkedIn Booster', icon: Link2, path: '/linkedin' },
  { name: 'Entrevistas AI', icon: MessageSquare, path: '/interviews' },
  { name: 'Lead Search', icon: Search, path: '/leads' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    setIsGuest(localStorage.getItem('cvpilot_guest_mode') === 'true');
  }, [pathname]);

  const handleSignOut = async () => {
    if (isGuest) {
      localStorage.removeItem('cvpilot_guest_mode');
    } else {
      await supabase.auth.signOut();
    }
    router.push('/');
  };

  const renderSection = (label: string, items: typeof coreItems) => (
    <div className="space-y-2 mb-10">
      <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] px-4 pb-2">{label}</p>
      {items.map((item) => {
        const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
        return (
          <Link 
            key={item.path} 
            href={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-bold text-sm group ${isActive ? 'bg-white/5 text-white border border-white/5 shadow-inner' : 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.02]'}`}
          >
            <item.icon size={18} className={isActive ? 'text-indigo-400 opacity-100' : 'opacity-40 group-hover:opacity-100 transition-opacity'} />
            {item.name}
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="sidebar border-r border-white/5 bg-[#020203]/50 backdrop-blur-3xl animate-fade p-6 flex flex-col h-screen fixed left-0 top-0 w-72">
      <div className="flex items-center gap-4 mb-14 px-2">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/20">
          <PenTool className="text-white w-6 h-6 stroke-[2]" />
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-white">
          CV<span className="text-indigo-500">Pilot</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
        {renderSection('Ecosystem', coreItems)}
        {renderSection('AI Arsenal', toolItems)}
      </nav>

      <div className="mt-auto space-y-4 pt-10 border-t border-white/5">
        {isGuest && (
          <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 mb-4">
             <div className="flex items-center gap-3 mb-2">
                <Rocket size={14} className="text-indigo-400" />
                <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest leading-none">Modo Beta</span>
             </div>
             <p className="text-[10px] text-slate-500 italic leading-tight">Acceso total sin registro.</p>
          </div>
        )}
        
        <Link href="/settings" className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-bold text-sm text-slate-500 hover:text-slate-200 hover:bg-white/[0.02] ${pathname === '/settings' ? 'bg-white/5 text-white' : ''}`}>
          <Settings size={18} className="opacity-40" />
          Configuración
        </Link>
        
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-bold text-sm text-red-500/50 hover:text-red-500 hover:bg-red-500/5"
        >
          <LogOut size={18} className="opacity-40" />
          {isGuest ? 'Salir de Beta' : 'Cerrar Sesión'}
        </button>
      </div>
    </div>
  );
}
