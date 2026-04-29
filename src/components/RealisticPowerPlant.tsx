import React from 'react';
import { SimulationPartId } from '../data/simulations';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...classes: (string | undefined | null | false)[]) {
  return twMerge(clsx(classes));
}

interface RealisticPowerPlantProps {
  selectedPart: SimulationPartId;
  onSelectPart: (part: SimulationPartId) => void;
}

export default function RealisticPowerPlant({ selectedPart, onSelectPart }: RealisticPowerPlantProps) {
  // Common interactive wrapper styles
  const interactiveArea = (id: SimulationPartId) => {
    const isSelected = selectedPart === id;
    return cn(
      "absolute cursor-pointer rounded-lg border-2 transition-all duration-300 z-50 overflow-hidden",
      isSelected 
        ? "border-blue-500 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
        : "border-transparent hover:border-white/50 hover:bg-white/10"
    );
  };

  return (
    <div className="w-full max-w-[1000px] aspect-[16/9] bg-white relative rounded-xl shadow-inner border border-slate-200 overflow-hidden select-none">
      
      <svg className="w-full h-full" viewBox="0 0 1000 562" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0f7fa" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eab308" /> {/* orange-yellow */}
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          
          <radialGradient id="fireGrad" cx="50%" cy="80%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f97316" />
            <stop offset="80%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Background Layers */}
        <rect width="1000" height="350" fill="url(#skyGrad)" />
        <rect y="350" width="1000" height="212" fill="url(#groundGrad)" />

        {/* Water / River */}
        <path d="M 0 380 L 450 380 L 450 420 L 0 420 Z" fill="url(#waterGrad)" />
        <text x="200" y="405" fill="#ffffff" opacity="0.8" fontSize="16" fontWeight="bold">Folyó (Hűtővíz)</text>
        
        <path d="M 450 400 L 750 400 L 750 415 L 450 415 Z" fill="url(#waterGrad)" />
        <path d="M 720 370 L 750 370 L 750 415 L 720 415 Z" fill="url(#waterGrad)" />
        <text x="500" y="450" fill="#000000" fontSize="14" fontWeight="600">Hűtőrendszer</text>


        {/* === Coal Piles & Conveyor === */}
        <path d="M 50 350 L 150 250 L 250 350 Z" fill="#64748b" />
        <path d="M 180 350 L 250 280 L 320 350 Z" fill="#475569" />
        <rect x="180" y="270" width="30" height="80" fill="#94a3b8" />
        {/* Conveyor Belt */}
        <path d="M 200 270 L 430 310" stroke="#334155" strokeWidth="6" />
        <text x="130" y="230" fill="#000000" fontSize="16" fontWeight="600">Szén</text>

        {/* === Boiler Building (Kazán) === */}
        {/* Chimney */}
        <path d="M 420 350 L 440 60 L 460 60 L 480 350 Z" fill="#1e293b" />
        <text x="490" y="80" fill="#000000" fontSize="16" fontWeight="600">Kémény</text>
        {/* Smoke animation */}
        <circle cx="440" cy="40" r="15" fill="#cbd5e1" opacity="0.6">
             <animate attributeName="cy" values="40; 0" dur="2s" repeatCount="indefinite" />
             <animate attributeName="opacity" values="0.6; 0" dur="2s" repeatCount="indefinite" />
             <animate attributeName="r" values="15; 30" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="455" cy="50" r="10" fill="#94a3b8" opacity="0.6">
             <animate attributeName="cy" values="50; 10" dur="2.5s" repeatCount="indefinite" />
             <animate attributeName="opacity" values="0.6; 0" dur="2.5s" repeatCount="indefinite" />
             <animate attributeName="r" values="10; 25" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* Boiler Outer */}
        <rect x="420" y="150" width="380" height="200" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="4" />
        {/* Furnace Chamber */}
        <path d="M 500 200 L 600 200 L 610 350 L 490 350 Z" fill="#1e293b" />
        {/* Fire Block */}
        <rect x="500" y="270" width="100" height="80" fill="url(#fireGrad)" />
        <text x="505" y="180" fill="#000000" fontSize="14" fontWeight="600">Kazán</text>

        {/* Boiler Tubes (Water heating up) */}
        <path d="M 510 340 L 510 220 L 530 220 L 530 340 L 550 340 L 550 220 L 570 220 L 570 340 L 590 340 L 590 220" fill="none" stroke="#60a5fa" strokeWidth="4" />
        
        {/* Steam Pipe to Turbine */}
        <path d="M 590 220 L 610 220 L 610 180 L 700 180 L 700 220" fill="none" stroke="#fca5a5" strokeWidth="6" />
        <text x="615" y="165" fill="#000000" fontSize="14" fontWeight="600">Nagy nyomású gőz</text>


        {/* === Turbine Room === */}
        {/* Turbine Housing */}
        <rect x="680" y="220" width="80" height="60" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
        <polygon points="685,240 715,225 715,275 685,260" fill="#ef4444" />
        <polygon points="755,240 725,225 725,275 755,260" fill="#ef4444" />
        <rect x="710" y="247" width="20" height="6" fill="#475569" />
        <text x="690" y="210" fill="#000000" fontSize="14" fontWeight="600">Turbina</text>
        
        {/* Shaft */}
        <rect x="760" y="246" width="30" height="8" fill="#64748b" />
        
        {/* Condenser (Under turbine) */}
        <rect x="680" y="280" width="80" height="70" fill="#bae6fd" stroke="#7dd3fc" strokeWidth="3" />
        <path d="M 685 300 L 755 300 M 685 320 L 755 320 M 685 340 L 755 340" stroke="#0284c7" strokeWidth="3" />
        <text x="765" y="325" fill="#000000" fontSize="14" fontWeight="600">Kondenzátor</text>

        {/* Cold water return to boiler */}
        <path d="M 680 340 L 620 340 L 620 330 L 510 330" fill="none" stroke="#2563eb" strokeWidth="6" />
        
        {/* === Generator === */}
        <rect x="790" y="210" width="60" height="80" fill="#94a3b8" rx="8" stroke="#475569" strokeWidth="3" />
        <rect x="800" y="220" width="40" height="60" fill="#334155" />
        <text x="785" y="195" fill="#000000" fontSize="14" fontWeight="600">Generátor</text>

        {/* Wires to Transformer */}
        <path d="M 850 280 L 880 280 L 880 320 L 910 320" fill="none" stroke="#eab308" strokeWidth="4" />
        
        {/* === Step-up Transformer === */}
        <rect x="910" y="270" width="70" height="80" fill="#f59e0b" stroke="#b45309" strokeWidth="4" />
        {/* Transformer coils/ribs */}
        <line x1="920" y1="280" x2="920" y2="340" stroke="#b45309" strokeWidth="4" />
        <line x1="945" y1="280" x2="945" y2="340" stroke="#b45309" strokeWidth="4" />
        <line x1="970" y1="280" x2="970" y2="340" stroke="#b45309" strokeWidth="4" />
        <text x="890" y="380" fill="#000000" fontSize="14" fontWeight="600">Transzformátor</text>

        {/* === Transmission Lines (Távvezeték) === */}
        {/* Wires from transformer up */}
        <path d="M 945 270 L 945 200 L 980 200" fill="none" stroke="#334155" strokeWidth="2" />
        <path d="M 970 270 L 970 215 L 980 215" fill="none" stroke="#334155" strokeWidth="2" />
        <path d="M 920 270 L 920 185 L 980 185" fill="none" stroke="#334155" strokeWidth="2" />
        
        {/* Power Pole */}
        <line x1="990" y1="160" x2="990" y2="350" stroke="#64748b" strokeWidth="6" />
        <line x1="970" y1="185" x2="1010" y2="185" stroke="#64748b" strokeWidth="4" />
        <line x1="965" y1="200" x2="1015" y2="200" stroke="#64748b" strokeWidth="4" />
        <line x1="975" y1="215" x2="1005" y2="215" stroke="#64748b" strokeWidth="4" />
        
        {/* Lines out of bounds */}
        <line x1="990" y1="185" x2="1100" y2="185" stroke="#94a3b8" strokeWidth="2" />
        <line x1="990" y1="200" x2="1100" y2="200" stroke="#94a3b8" strokeWidth="2" />
        <line x1="990" y1="215" x2="1100" y2="215" stroke="#94a3b8" strokeWidth="2" />
        <text x="920" y="150" fill="#000000" fontSize="14" fontWeight="600">Távvezeték</text>

      </svg>

      {/* Interactive Overlay Zones */}
      
      {/* 1. Furnace / Boiler */}
      <div 
        className={interactiveArea('furnace')}
        style={{ top: '15%', left: '42%', width: '21%', height: '52%' }}
        onClick={() => onSelectPart('furnace')}
      />

      {/* 2. Turbine */}
      <div 
        className={interactiveArea('turbine')}
        style={{ top: '35%', left: '66%', width: '12%', height: '30%' }}
        onClick={() => onSelectPart('turbine')}
      />

      {/* 3. Generator */}
      <div 
        className={interactiveArea('generator')}
        style={{ top: '30%', left: '78%', width: '8%', height: '22%' }}
        onClick={() => onSelectPart('generator')}
      />

      {/* 4. Transformer */}
      <div 
        className={interactiveArea('transformer')}
        style={{ top: '45%', left: '88%', width: '10%', height: '22%' }}
        onClick={() => onSelectPart('transformer')}
      />

      {/* 5. Transmission */}
      <div 
        className={interactiveArea('transmission')}
        style={{ top: '15%', left: '90%', width: '10%', height: '25%' }}
        onClick={() => onSelectPart('transmission')}
      />

    </div>
  );
}
