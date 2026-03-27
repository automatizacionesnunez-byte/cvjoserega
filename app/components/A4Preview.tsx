'use client';

import React from 'react';

interface A4PreviewProps {
  templateId?: string;
  isLarge?: boolean;
}

export const A4Preview = ({ templateId = 'ceo-premium-v1', isLarge = false }: A4PreviewProps) => {
  const baseSize = 10;

  // REUSABLE SECTIONS FOR PREVIEWS
  const ProfileText = "Estratega con más de 12 años de trayectoria liderando proyectos de alto impacto. Experto en optimización de procesos y gestión de equipos multidisciplinares.";
  const ExpList = [
    { role: "Director Regional", co: "Global Tech SL", date: "2018-2024" },
    { role: "Project Manager", co: "InnoSoft SL", date: "2014-2018" }
  ];
  const Edu = { title: "Máster en Dirección", school: "IE Business School", date: "2012-2013" };
  const Certs = ["PMP Certification", "Scrum Master"];
  const Skills = [{l: "Liderazgo", v: 95}, {l: "Estrategia", v: 90}];
  const Extras = "Permiso A/B. Disponibilidad para viajar.";

  const containerStyle = {
    width: '794px',
    height: '1123px',
    fontSize: `${baseSize}px`,
    backgroundColor: 'white'
  };

  if (templateId === 'executive-sidebar-v1') {
    return (
      <div className="flex h-full font-['Raleway']" style={containerStyle}>
        <div className="w-[30%] bg-[#1a2744] text-white p-[6%] flex flex-col gap-[6%]">
          <div className="aspect-square rounded-full border-2 border-[#d4ac0d] overflow-hidden mb-2">
            <img src="/portraits/portrait_3.png" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-[10%]">
            <div className="text-[1.2rem] font-black text-[#d4ac0d] border-b border-white/20 pb-[2%] uppercase tracking-widest leading-none">CONTACTO</div>
            <div className="text-[0.9rem] text-white/70 space-y-[4%] font-bold">
              <div>+34 626 048 712</div>
              <div>madrid, esp</div>
            </div>
            <div className="text-[1.2rem] font-black text-[#d4ac0d] border-b border-white/20 pb-[2%] uppercase tracking-widest leading-none">SKILLS</div>
            <div className="space-y-[4%]">
               {Skills.map(s => (
                 <div key={s.l} className="text-[0.9rem] flex justify-between">
                   <span>{s.l}</span>
                   <span>{s.v}%</span>
                 </div>
               ))}
            </div>
            <div className="text-[1.2rem] font-black text-[#d4ac0d] border-b border-white/20 pb-[2%] uppercase tracking-widest leading-none">IDIOMAS</div>
            <div className="text-[0.9rem] space-y-1">
               <div>Español (Nativo)</div>
               <div>Inglés (C1)</div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-[8%] space-y-[6%] flex flex-col text-[#2d3436]">
          <div className="space-y-[1%] mb-[4%] border-b-4 border-[#1a2744] pb-4">
            <div className="text-[3.2rem] font-black text-[#1a2744] font-['Playfair_Display'] leading-[0.95]">ALEJANDRO<br/>MORENO</div>
            <div className="text-[1.3rem] font-bold text-[#d4ac0d] tracking-[0.3em] uppercase mt-2">COO & OPERATIONS</div>
          </div>
          <div className="text-[1.6rem] font-black text-[#1a2744] uppercase tracking-tighter">Perfil Profesional</div>
          <p className="text-[1.1rem] text-slate-500 italic leading-relaxed">{ProfileText}</p>
          <div className="text-[1.6rem] font-black text-[#1a2744] uppercase tracking-tighter">Experiencia</div>
          <div className="space-y-4">
            {ExpList.map((e, i) => (
               <div key={i} className="border-l-2 border-slate-100 pl-4 py-1">
                  <div className="flex justify-between items-baseline mb-1">
                     <span className="text-[1.3rem] font-black text-slate-800 uppercase">{e.role}</span>
                     <span className="text-[0.9rem] text-slate-400 font-bold">{e.date}</span>
                  </div>
                  <div className="text-[1rem] font-bold text-[#d4ac0d]">{e.co}</div>
                  <div className="text-[0.9rem] text-slate-400 mt-1 italic">Optimización de margen operativo en un 15%.</div>
               </div>
            ))}
          </div>
          <div className="text-[1.6rem] font-black text-[#1a2744] uppercase tracking-tighter">Formación</div>
          <div className="text-[1.1rem] font-bold text-slate-700">{Edu.title}</div>
          <div className="text-[0.9rem] text-slate-500">{Edu.school} | {Edu.date}</div>
          <div className="mt-auto pt-6 border-t border-slate-50 text-[0.85rem] text-slate-400 font-bold uppercase tracking-widest italic">{Extras}</div>
        </div>
      </div>
    );
  }

  if (templateId === 'modern-full-sidebar-v1') {
    return (
      <div className="flex h-full font-sans" style={containerStyle}>
        <div className="w-[38%] bg-[#008080] text-white p-[8%] flex flex-col gap-[8%]">
          <div className="aspect-[4/5] bg-white/10 rounded-2xl overflow-hidden mb-4 border border-white/20">
             <img src="/portraits/portrait_1.png" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1">
            <div className="text-[2.2rem] font-black leading-[0.95] uppercase tracking-tighter">LUCÍA<br/>FERNÁNDEZ</div>
            <div className="text-[1.1rem] font-bold opacity-60 uppercase tracking-[0.2em] mt-2 italic">Creative Director</div>
          </div>
          <div className="mt-4 space-y-6">
             <div className="text-[1.1rem] font-black border-l-2 border-white pl-3 uppercase">Contacto</div>
             <div className="text-[0.9rem] opacity-70 space-y-2">
                <div>+34 912 345 678</div>
                <div>lucia.fer@email.com</div>
             </div>
             <div className="text-[1.1rem] font-black border-l-2 border-white pl-3 uppercase">Habilidades</div>
             <div className="grid grid-cols-1 gap-3">
                {Skills.map(s => (
                  <div key={s.l} className="space-y-1.5">
                     <div className="text-[0.8rem] uppercase font-bold opacity-80">{s.l}</div>
                     <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white" style={{ width: `${s.v}%` }}></div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
        <div className="flex-1 p-[8%] space-y-[8%] flex flex-col text-[#2d3436]">
          <div className="space-y-4">
             <div className="text-[2rem] font-black text-[#008080] italic uppercase leading-none border-b-4 border-[#008080]/10 pb-2">Sobre mí</div>
             <p className="text-[1.1rem] leading-relaxed text-slate-600 font-medium">{ProfileText}</p>
          </div>
          <div className="space-y-6">
             <div className="text-[2rem] font-black text-[#008080] italic uppercase leading-none border-b-4 border-[#008080]/10 pb-2">Trayectoria</div>
             <div className="space-y-6">
                {ExpList.map((e, i) => (
                  <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[#008080] before:rounded-full">
                     <div className="text-[1.3rem] font-black text-slate-800 uppercase tracking-tight">{e.role}</div>
                     <div className="flex justify-between items-center text-[1rem] font-bold text-[#008080] mt-1">
                        <span>{e.co}</span>
                        <span className="opacity-50 text-[0.8rem] italic">{e.date}</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>
          <div className="space-y-4">
             <div className="text-[2rem] font-black text-[#008080] italic uppercase leading-none border-b-4 border-[#008080]/10 pb-2">Educación</div>
             <div className="text-[1.2rem] font-black text-slate-700">{Edu.title}</div>
             <div className="text-[1rem] font-bold text-slate-400">{Edu.school} • {Edu.date}</div>
          </div>
          <div className="mt-auto text-[0.9rem] font-black text-slate-300 uppercase italic tracking-[0.3em]">{Extras}</div>
        </div>
      </div>
    );
  }

  if (templateId === 'tech-clean-v1') {
    return (
      <div className="bg-[#f4f7f6] p-[6%] flex flex-col font-mono h-full overflow-hidden" style={containerStyle}>
        <div className="bg-white p-[8%] shadow-2xl border-t-[14px] border-[#1a1a1a] flex-1 flex flex-col gap-[6%]">
          <div className="flex justify-between items-start border-b-4 border-[#1a1a1a] pb-[4%]">
            <div className="space-y-2">
              <div className="text-[4.5rem] font-black tracking-tighter leading-[0.85] uppercase text-[#1a1a1a]">DAVID<br/>SÁNCHEZ</div>
              <div className="text-[1.2rem] text-[#0066cc] font-black uppercase italic mt-1 tracking-tight">Backend Lead Architect</div>
            </div>
            <div className="text-right text-[0.8rem] font-bold text-slate-400 space-y-1">
               <div>+34 600 000 000</div>
               <div>GITHUB.COM/DSLZ</div>
               <div>MADRID, ES</div>
            </div>
          </div>

          <div className="grid grid-cols-[140px_1fr] gap-[8%] text-[#1a1a1a]">
             <div className="space-y-8 border-r border-slate-100 pr-4">
                <div>
                  <div className="text-[1.1rem] font-black text-[#1a1a1a] uppercase bg-slate-50 p-2 mb-4 italic">Habilidades_</div>
                  <div className="space-y-3 text-[0.85rem] font-bold text-slate-500">
                     <div>• Node.js / Go</div>
                     <div>• Kubernetes</div>
                     <div>• PostgreSQL</div>
                     <div>• System Design</div>
                  </div>
                </div>
                <div>
                  <div className="text-[1.1rem] font-black text-[#1a1a1a] uppercase bg-slate-50 p-2 mb-4 italic">Idiomas_</div>
                  <div className="space-y-2 text-[0.85rem] font-bold text-slate-500">
                     <div>EN: C2 PROFICIENT</div>
                     <div>ES: NATIVE</div>
                  </div>
                </div>
             </div>
             <div className="space-y-8">
                <div>
                  <div className="text-[1.3rem] font-black text-[#1a1a1a] uppercase mb-4 border-b border-slate-100 pb-1 underline decoration-2 decoration-[#0066cc] underline-offset-4">Experiencia_</div>
                  <div className="space-y-6">
                     {ExpList.map((e, i) => (
                       <div key={i} className="group text-[#1a1a1a]">
                          <div className="flex justify-between font-black uppercase italic bg-slate-50 px-2 py-1">
                             <span className="text-[1.1rem]">{e.role}</span>
                             <span className="text-[0.8rem] text-slate-400">{e.date}</span>
                          </div>
                          <div className="mt-1 text-[0.9rem] font-black text-[#0066cc] px-2 uppercase">{e.co}</div>
                          <p className="mt-2 text-[0.95rem] text-slate-500 leading-relaxed px-2">Design and scaling of heavy-traffic REST/gRPC APIs.</p>
                       </div>
                     ))}
                  </div>
                </div>
                <div>
                  <div className="text-[1.3rem] font-black text-[#1a1a1a] uppercase mb-4 border-b border-slate-100 pb-1 italic">Formación_</div>
                  <div className="px-2">
                     <div className="text-[1.1rem] font-black italic">{Edu.title}</div>
                     <div className="text-[0.9rem] font-bold text-slate-400 uppercase mt-1">{Edu.school} | {Edu.date}</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-50 text-[0.8rem] text-slate-400 font-bold italic">
                   {Extras}
                </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  if (templateId === 'ux-split-v1') {
    return (
      <div className="bg-white p-[8%] relative h-full flex flex-col font-sans overflow-hidden text-[#2d3436]" style={containerStyle}>
        <div className="absolute left-0 top-0 w-[12px] h-full bg-[#ff4d4d]"></div>
        <div className="flex border-b-2 border-slate-100 pb-[6%] mb-[6%] items-center">
          <div className="w-[110px] aspect-square bg-slate-50 border-2 border-slate-100 rounded-3xl flex items-center justify-center mr-[6%] overflow-hidden">
            <img src="/portraits/portrait_4.png" className="w-full h-full object-cover grayscale" />
          </div>
          <div className="flex-1">
             <div className="text-[4.5rem] font-black underline decoration-[#ff4d4d] decoration-[12px] underline-offset-[10px] mb-2 leading-none uppercase tracking-tighter">MARTA G.</div>
             <div className="text-[1.2rem] text-slate-400 font-black uppercase tracking-[0.3em] mt-3">SR PRODUCT DESIGNER</div>
          </div>
        </div>
        <div className="flex gap-[8%] flex-1">
           <div className="flex-[1.8] space-y-[8%]">
              <div>
                 <div className="text-[1.8rem] font-black text-slate-900 border-b-2 border-[#ff4d4d] pb-1 w-fit mb-4 uppercase">Experiencia</div>
                 <div className="space-y-6">
                    {ExpList.map((e, i) => (
                      <div key={i} className="space-y-1">
                         <div className="text-[1.3rem] font-black uppercase leading-none">{e.role}</div>
                         <div className="flex justify-between items-center text-[0.9rem] font-bold text-[#ff4d4d]">
                            <span>{e.co}</span>
                            <span className="opacity-50">{e.date}</span>
                         </div>
                         <p className="text-[0.95rem] text-slate-500 leading-relaxed mt-2 italic">Liderazgo de diseño visual y sistemas escalables.</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div>
                 <div className="text-[1.8rem] font-black text-slate-900 border-b-2 border-[#ff4d4d] pb-1 w-fit mb-4 uppercase">Formación</div>
                 <div className="text-[1.1rem] font-black">{Edu.title}</div>
                 <div className="text-[0.9rem] font-bold text-slate-400 mt-1">{Edu.school}</div>
              </div>
           </div>
           <div className="flex-1 space-y-[8%] border-l-2 border-slate-50 pl-6">
              <div>
                 <div className="text-[1.3rem] font-black text-slate-900 mb-4 tracking-widest uppercase italic">Competencias</div>
                 <div className="space-y-4">
                    {Skills.map(s => (
                      <div key={s.l} className="space-y-1.5">
                         <div className="flex justify-between text-[0.8rem] font-black uppercase">
                            <span>{s.l}</span>
                            <span className="text-[#ff4d4d]">{s.v}%</span>
                         </div>
                         <div className="flex gap-1">
                            {[1,2,3,4,5].map(dot => <div key={dot} className={`h-1.5 flex-1 rounded-full ${dot <= (s.v/20) ? 'bg-[#ff4d4d]' : 'bg-slate-100'}`}></div>)}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div>
                <div className="text-[1.3rem] font-black text-slate-900 mb-4 tracking-widest uppercase italic">Certificados</div>
                <div className="space-y-2 text-[0.9rem] font-bold text-slate-500 italic uppercase">
                   {Certs.map(c => <div key={c}>- {c}</div>)}
                </div>
              </div>
              <div className="mt-auto pt-8 border-t-2 border-slate-50 text-[0.8rem] font-black text-slate-300 uppercase tracking-widest">
                 {Extras}
              </div>
           </div>
        </div>
      </div>
    );
  }

  // DEFAULT: CEO PREMIUM
  return (
    <div 
      className="flex flex-col text-[#2d3436] w-full h-full font-['Raleway']" 
      style={containerStyle}
    >
      <div className="bg-[#1a2744] h-[28%] p-[6%] relative overflow-hidden flex items-center gap-[5%]">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-white opacity-[0.03] rotate-[15deg] transform-gpu"></div>
        <div className="w-[18%] aspect-square rounded-xl border-4 border-[#d4ac0d] bg-white/10 shrink-0 overflow-hidden z-10 shadow-2xl">
           <img src="/portraits/portrait_2.png" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 z-10 space-y-2 px-4 text-white">
          <div className="text-[3.8rem] font-black italic text-white leading-[0.9] uppercase tracking-tighter">CARLOS<br/>PALACIOS</div>
          <div className="text-[1.4rem] font-bold text-[#d4ac0d] tracking-[0.3em] uppercase mt-2">CEO & FOUNDER</div>
          <div className="h-[3px] w-[60px] bg-[#d4ac0d] mt-2"></div>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-[2] p-[6%] space-y-7">
          <div className="space-y-3">
            <div className="text-[2rem] font-black text-[#1a2744] uppercase tracking-tighter border-b-2 border-slate-100 pb-2">Perfil Ejecutivo</div>
            <p className="text-[1.2rem] text-slate-600 leading-relaxed font-medium italic">{ProfileText}</p>
          </div>
          <div className="space-y-6 text-[#2d3436]">
            <div className="text-[2rem] font-black text-[#1a2744] uppercase tracking-tighter border-b-2 border-slate-100 pb-2">Experiencia</div>
            {ExpList.map((e, i) => (
              <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#d4ac0d] before:rounded-full">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[1.5rem] font-black text-slate-800 uppercase">{e.role}</span>
                  <span className="text-[0.9rem] text-slate-400 font-bold uppercase">{e.date}</span>
                </div>
                <div className="text-[1.1rem] font-bold text-[#1a2744] uppercase">{e.co}</div>
                <p className="text-[1rem] text-slate-500 mt-2 leading-relaxed">Gestión integral de P&L y equipos directivos.</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="text-[2rem] font-black text-[#1a2744] uppercase tracking-tighter border-b-2 border-slate-100 pb-2">Formación</div>
            <div className="text-[1.3rem] font-black text-slate-800 uppercase leading-none">{Edu.title}</div>
            <div className="text-[1rem] font-bold text-slate-400 mt-1 uppercase tracking-wider">{Edu.school} | {Edu.date}</div>
          </div>
        </div>
        <div className="flex-1 bg-[#f7f5f0] p-[6%] border-l border-slate-100 flex flex-col gap-6">
          <div>
            <div className="text-[1.4rem] font-black text-[#1a2744] border-b-2 border-[#d4ac0d] pb-2 uppercase tracking-widest mb-4">COMPETENCIAS</div>
            <div className="space-y-4 text-[1.1rem] font-bold text-slate-600">
               {['NEGOCIACIÓN', 'ESTRATEGIA', 'FINANZAS'].map(s => (
                 <div key={s} className="border-b border-dotted border-slate-300 pb-2 uppercase tracking-tighter">{s}</div>
               ))}
            </div>
          </div>
          <div>
            <div className="text-[1.4rem] font-black text-[#1a2744] border-b-2 border-[#d4ac0d] pb-2 uppercase tracking-widest mb-4">IDIOMAS</div>
            <div className="space-y-3">
               <div className="flex justify-between items-center text-[1rem] font-black text-slate-800 uppercase italic">ES <span>NATIVO</span></div>
               <div className="flex justify-between items-center text-[1rem] font-black text-slate-800 uppercase italic">EN <span>C1 HIGH</span></div>
            </div>
          </div>
          <div className="mt-auto text-[0.8rem] font-black text-slate-300 uppercase italic tracking-widest leading-relaxed">
             {Extras}
          </div>
        </div>
      </div>
    </div>
  );
};
