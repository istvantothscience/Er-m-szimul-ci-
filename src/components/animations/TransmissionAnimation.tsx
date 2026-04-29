import React from 'react';
import { motion } from 'motion/react';

export default function TransmissionAnimation() {
  return (
    <div className="w-full h-full flex items-center justify-between bg-slate-900 p-4 relative overflow-hidden">
      <div className="absolute top-2 left-3 text-xs text-slate-400 font-mono">
        Távvezeték Hálózat
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-950/40 border-t border-green-900/50" />

      {/* Poles and wires */}
      <div className="w-full h-full relative mt-4">
        {/* Wires */}
        {[30, 45, 60].map((yOffset, i) => (
          <div key={`wire-${i}`} className="absolute left-0 right-0 h-[1px] bg-slate-600" style={{ top: yOffset }}>
             {/* Particles acting as current */}
             <motion.div 
                className="w-8 h-[2px] bg-yellow-400 blur-[1px] rounded-full"
                animate={{ x: ['-100%', '800%'] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: i * 0.3
                }}
             />
          </div>
        ))}

        {/* Utility Poles */}
        {[20, 50, 80].map((leftPos, i) => (
          <div key={`pole-${i}`} className="absolute bottom-4 flex flex-col items-center" style={{ left: `${leftPos}%`, transform: 'translateX(-50%)' }}>
            {/* Cross arms */}
            <div className="w-16 h-1 bg-slate-500 absolute top-[-90px]" />
            <div className="w-20 h-1 bg-slate-500 absolute top-[-75px]" />
            <div className="w-24 h-1 bg-slate-500 absolute top-[-60px]" />
            
            {/* Main pillar */}
            <div className="w-2 h-[100px] bg-slate-400" />
            
            {/* Base */}
            <div className="w-4 h-2 bg-slate-600" />
          </div>
        ))}
      </div>

      {/* Loss warning abstract visual */}
      <div className="absolute top-2 right-3 flex items-center gap-2">
         <motion.div 
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[10px] text-red-400 bg-red-950/50 px-2 py-0.5 rounded font-mono border border-red-900/50"
         >
           I²·R Veszteség minimalizálva
         </motion.div>
      </div>
    </div>
  );
}
