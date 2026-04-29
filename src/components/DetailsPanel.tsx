import React from 'react';
import { SimulationPart } from '../data/simulations';
import { motion, AnimatePresence } from 'motion/react';
import { BlockMath } from 'react-katex';
import GeneratorAnimation from './animations/GeneratorAnimation';
import TransformerAnimation from './animations/TransformerAnimation';
import TransmissionAnimation from './animations/TransmissionAnimation';

interface DetailsPanelProps {
  data: SimulationPart;
}

export default function DetailsPanel({ data }: DetailsPanelProps) {
  // Render specific animation based on the selected part
  const renderAnimation = () => {
    switch (data.animationType) {
      case 'generator':
        return <GeneratorAnimation />;
      case 'transformer':
        return <TransformerAnimation mode="step-up" />;
      case 'transmission':
        return <TransmissionAnimation />;
      default:
        // No inline animation needed for furnace/turbine as it is shown on the main SVG
        return null;
    }
  };

  const animComponent = renderAnimation();

  return (
    <div className="h-full flex flex-col bg-white rounded-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={data.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col h-full"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50 rounded-t-xl shrink-0">
             <h2 className="text-2xl font-bold text-slate-800">{data.title}</h2>
             <p className="text-slate-600 mt-2 leading-snug">{data.description}</p>
          </div>

          {/* Animation Area (if available) */}
          {animComponent && (
            <div className="w-full h-48 sm:h-56 border-b border-slate-200 bg-slate-900 relative shrink-0">
              {animComponent}
            </div>
          )}

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
             {/* Detailed Explanation */}
             <div className="space-y-3">
               {data.detailedText.map((paragraph, idx) => (
                 <p key={idx} className="text-sm text-slate-700 leading-relaxed text-justify">
                   {paragraph}
                 </p>
               ))}
             </div>

             {/* Formulas Section */}
             {data.formulas.length > 0 && (
               <div className="mt-8 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                 <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-4">Fizikai Képletek</h3>
                 <div className="space-y-4">
                   {data.formulas.map((formula, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                         <span className="text-xs text-blue-600/80 mb-1">{formula.label}</span>
                         <div className="bg-white px-2 py-3 sm:px-6 sm:py-3 rounded-md shadow-sm border border-slate-200 w-full text-center overflow-x-auto text-[0.8rem] sm:text-base">
                            <BlockMath math={formula.math} />
                         </div>
                      </div>
                   ))}
                 </div>
               </div>
             )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
