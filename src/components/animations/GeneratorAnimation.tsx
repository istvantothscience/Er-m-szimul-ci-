import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'motion/react';

export default function GeneratorAnimation() {
  const [points, setPoints] = useState<string>("");
  const controls = useAnimation();

  useEffect(() => {
    // Start continuous rotation for the magnet
    controls.start({
      rotate: [0, 360],
      transition: { duration: 4, ease: "linear", repeat: Infinity }
    });

    // Generate the sine wave points dynamically to simulate moving wave
    let frameId: number;
    let offset = 0;
    
    const animateWave = () => {
      offset += 0.05; // Speed of the wave
      const newPoints = [];
      for (let x = 0; x <= 200; x += 5) { // Width is ~200
        const y = Math.sin((x / 20) - offset) * 20 + 25; // Height scaling and offset
        newPoints.push(`${x},${y}`);
      }
      setPoints(newPoints.join(' '));
      frameId = requestAnimationFrame(animateWave);
    };

    animateWave();

    return () => cancelAnimationFrame(frameId);
  }, [controls]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-900 overflow-hidden relative">
      {/* Simulation Title text */}
      <div className="absolute top-2 left-3 text-xs text-slate-400 font-mono">
        Mozgási Indukció Modell
      </div>

      <div className="flex-1 flex items-center justify-center w-full relative">
         {/* Stator (Coil) */}
         <div className="absolute w-32 h-32 rounded-full border-8 border-orange-700/50 flex items-center justify-center">
            {/* Some coil turns purely for aesthetic */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-3 h-8 bg-orange-500/80 rounded-sm"
                style={{ transform: `rotate(${i * 45}deg) translateY(-16px)` }}
              />
            ))}
         </div>

         {/* Rotor (Magnet) */}
         <motion.div 
           animate={controls}
           className="w-8 h-20 bg-slate-800 flex flex-col rounded-sm overflow-hidden z-10 shadow-lg"
         >
            <div className="flex-1 bg-red-600 flex items-center justify-center text-white/50 text-xs font-bold">É</div>
            <div className="flex-1 bg-blue-600 flex items-center justify-center text-white/50 text-xs font-bold">D</div>
         </motion.div>
         
         {/* Magnetic Field Line abstract visual */}
         <motion.div 
           animate={controls}
           className="absolute w-40 h-40 border border-slate-700/50 border-dashed rounded-full"
         />
      </div>

      {/* Oscilloscope / Wave output */}
      <div className="h-16 w-full max-w-[200px] border border-green-900/50 bg-green-950/30 rounded-md p-1 relative flex flex-col justify-end">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
         <svg className="w-full h-full relative z-10" viewBox="0 0 200 50" preserveAspectRatio="none">
            {/* Center line */}
            <line x1="0" y1="25" x2="200" y2="25" stroke="rgba(0, 255, 0, 0.2)" strokeWidth="1" />
            <polyline
              points={points}
              fill="none"
              stroke="#00ff00"
              strokeWidth="2"
            />
         </svg>
         <div className="absolute top-1 right-2 text-[8px] text-green-500 font-mono">U(t)</div>
      </div>
    </div>
  );
}
