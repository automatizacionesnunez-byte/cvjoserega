'use client';

import { Shield, FileText, Cookie } from 'lucide-react';
import Link from 'next/link';

export default function Legal() {
  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-fade pb-20 pt-10">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black">Legal</h1>
        <p className="text-slate-500">Última actualización: 24 de marzo de 2026</p>
      </div>

      {/* Terms of Service */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <FileText className="text-indigo-400" size={20} />
          </div>
          <h2 className="text-2xl font-bold">Términos de Servicio</h2>
        </div>
        <div className="glass-card p-8 space-y-4 text-sm text-slate-400 leading-relaxed">
          <p><strong className="text-white">1. Aceptación.</strong> Al usar CV-Pilot, aceptas estos términos. Si no estás de acuerdo, no uses el servicio.</p>
          <p><strong className="text-white">2. Servicio.</strong> CV-Pilot proporciona herramientas de optimización de CV con IA, generación de cartas de presentación, preparación de entrevistas y búsqueda de contactos profesionales.</p>
          <p><strong className="text-white">3. Cuentas.</strong> Eres responsable de mantener la seguridad de tu cuenta y contraseña. Debes notificarnos inmediatamente de cualquier uso no autorizado.</p>
          <p><strong className="text-white">4. Contenido.</strong> Los CVs, cartas y datos que subas son de tu propiedad. Nos otorgas licencia para procesarlos con el fin de proporcionarte el servicio.</p>
          <p><strong className="text-white">5. IA.</strong> El contenido generado por IA es una sugerencia. Eres responsable de revisar y validar todo el contenido antes de usarlo.</p>
          <p><strong className="text-white">6. Pagos.</strong> Los planes de pago se facturan de forma recurrente. Puedes cancelar en cualquier momento desde la sección de ajustes.</p>
          <p><strong className="text-white">7. Limitación.</strong> CV-Pilot no garantiza resultados de empleo. Somos una herramienta de asistencia, no una agencia de colocación.</p>
        </div>
      </section>

      {/* Privacy Policy */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Shield className="text-emerald-400" size={20} />
          </div>
          <h2 className="text-2xl font-bold">Política de Privacidad</h2>
        </div>
        <div className="glass-card p-8 space-y-4 text-sm text-slate-400 leading-relaxed">
          <p><strong className="text-white">Datos que recopilamos:</strong> Email, nombre, CVs subidos, historial de uso y preferencias de plantilla.</p>
          <p><strong className="text-white">Cómo los usamos:</strong> Para proporcionar el servicio, mejorar la IA y enviarte comunicaciones relevantes (puedes darte de baja).</p>
          <p><strong className="text-white">Almacenamiento:</strong> Tus datos se almacenan de forma cifrada en Supabase (infraestructura AWS EU). No vendemos tus datos a terceros.</p>
          <p><strong className="text-white">IA y datos:</strong> Tus CVs son procesados por modelos de IA para generar sugerencias. No entrenamos modelos con tus datos personales.</p>
          <p><strong className="text-white">Tus derechos (GDPR):</strong> Puedes solicitar acceso, rectificación o eliminación de tus datos en cualquier momento contactando a soporte.</p>
          <p><strong className="text-white">Retención:</strong> Conservamos tus datos mientras tu cuenta esté activa. Al eliminar tu cuenta, todos tus datos se borran en un plazo de 30 días.</p>
        </div>
      </section>

      {/* Cookies */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Cookie className="text-amber-400" size={20} />
          </div>
          <h2 className="text-2xl font-bold">Política de Cookies</h2>
        </div>
        <div className="glass-card p-8 space-y-4 text-sm text-slate-400 leading-relaxed">
          <p>Usamos cookies esenciales para el funcionamiento de la aplicación (sesión, preferencias). No usamos cookies de tracking de terceros ni publicidad.</p>
        </div>
      </section>

      <div className="text-center text-xs text-slate-700">
        <p>© 2026 CV-Pilot. Todos los derechos reservados.</p>
        <p className="mt-1">¿Preguntas? <Link href="/support" className="text-indigo-400 hover:text-indigo-300">Contacta con soporte</Link></p>
      </div>
    </div>
  );
}
