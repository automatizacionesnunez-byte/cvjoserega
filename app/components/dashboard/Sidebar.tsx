'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  Eye
} from 'lucide-react';

const coreItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Mis CVs', icon: FileText, path: '/cvs' },
  { name: 'Plantillas', icon: Layout, path: '/templates' },
  { name: 'Crear CV (AI)', icon: Sparkles, path: '/cvs/new' },
];

const toolItems = [
  { name: 'Cover Letter', icon: FileSignature, path: '/cover-letter' },
  { name: 'LinkedIn', icon: Link2, path: '/linkedin' },
  { name: 'Traductor', icon: Globe, path: '/translator' },
  { name: 'Entrevistas', icon: MessageSquare, path: '/interviews' },
  { name: 'Leads', icon: Search, path: '/leads' },
];

const resourceItems = [
  { name: 'Blog', icon: BookOpen, path: '/blog' },
  { name: 'Ejemplos', icon: Eye, path: '/examples' },
  { name: 'Ayuda', icon: LifeBuoy, path: '/support' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const renderSection = (label: string, items: typeof coreItems) => (
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em] px-3 pb-1">{label}</p>
      {items.map((item) => {
        const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
        return (
          <Link 
            key={item.path} 
            href={item.path}
            className={`nav-link ${isActive ? 'active' : ''}`}
          >
            <item.icon size={18} className={isActive ? 'text-purple-400' : ''} />
            {item.name}
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="sidebar animate-fade">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
          <PenTool className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">
          CV<span className="text-purple-500">Pilot</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto">
        {renderSection('Principal', coreItems)}
        {renderSection('Herramientas AI', toolItems)}
        {renderSection('Recursos', resourceItems)}
      </nav>

      <div className="mt-auto space-y-2 border-t border-white/5 pt-6">
        <Link href="/settings" className="nav-link">
          <Settings size={18} />
          Ajustes
        </Link>
        <Link href="/login" className="nav-link text-red-400/80 hover:text-red-400">
          <LogOut size={18} />
          Cerrar Sesión
        </Link>
      </div>
    </div>
  );
}
