import React from 'react';
import { motion } from 'motion/react';

interface TransformerAnimationProps {
  mode: 'step-up' | 'step-down';
}

export default function TransformerAnimation({ mode }: TransformerAnimationProps) {
  const primaryTurns = mode === 'step-up' ? 3 : 8;
  const secondaryTurns = mode === 'step-up' ? 8 : 3;

  const wireColor = '#fb923c'; // orange-400
  const coreColor = '#475569'; // slate-600

  // Draw turns
  const renderTurns = (x: number, numTurns: number) => {
    return Array.from({ length: numTurns }).map((_, i) => {
      const yOffset = 40 + i * (80 / Math.max(numTurns, 1));
      return (
        <path
          key={i}
          d={`M ${x - 15} ${yOffset} C ${x + 20} ${yOffset + 5}, ${x + 20} ${yOffset + 15}, ${x - 15} ${yOffset + 20}`}
          fill="none"
          stroke={wireColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
      );
    });
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-900 p-4 relative overflow-hidden">
      <div className="absolute top-2 left-3 text-xs text-slate-400 font-mono">
        {mode === 'step-up' ? 'Feltranszformátor' : 'Letranszformátor'} Modell
      </div>
      
      <svg width="240" height="180" viewBox="0 0 240 180" className="relative z-10">
        <defs>
          <linearGradient id="flux-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Iron Core (Square frame) */}
        <path 
           d="M 40 20 L 200 20 L 200 160 L 40 160 Z" 
           fill="none" 
           stroke={coreColor} 
           strokeWidth="30" 
           strokeLinejoin="round" 
        />
        <path 
           d="M 55 35 L 185 35 L 185 145 L 55 145 Z" 
           fill="none" 
           stroke="#334155" 
           strokeWidth="1" 
        />

        {/* Dynamic Magnetic Flux lines running through the core */}
        <motion.path
           d="M 40 20 L 200 20 L 200 160 L 40 160 Z"
           fill="none"
           stroke="url(#flux-gradient)"
           strokeWidth="6"
           strokeLinejoin="round" 
           strokeDasharray="560" // roughly perimeter
           initial={{ strokeDashoffset: 560 }}
           animate={{ strokeDashoffset: 0 }}
           transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Primary Coil */}
        {renderTurns(40, primaryTurns)}
        <text x="40" y="15" fill="#f8fafc" fontSize="10" textAnchor="middle" className="font-mono">Primer</text>
        
        {/* Secondary Coil */}
        {renderTurns(200, secondaryTurns)}
        <text x="200" y="15" fill="#f8fafc" fontSize="10" textAnchor="middle" className="font-mono">Szekunder</text>
        
        {/* Voltmeter / Indicators primary */}
        <text x="40" y="175" fill="#94a3b8" fontSize="10" textAnchor="middle">{mode === 'step-up' ? '~ 10 kV' : '~ 400 kV'}</text>
        
        {/* Voltmeter / Indicators secondary */}
        <text x="200" y="175" fill={mode === 'step-up' ? '#ef4444' : '#22c55e'} fontSize="10" textAnchor="middle" fontWeight="bold">
          {mode === 'step-up' ? '~ 400 kV !' : '~ 230 V'}
        </text>

      </svg>
    </div>
  );
}
