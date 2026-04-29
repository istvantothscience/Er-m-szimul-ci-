import React, { useState } from 'react';
import { SimulationPartId, simulationData } from './data/simulations';
import { HelpCircle, AlertTriangle } from 'lucide-react';
import RealisticPowerPlant from './components/RealisticPowerPlant';
import DetailsPanel from './components/DetailsPanel';
import 'katex/dist/katex.min.css';

export default function App() {
  const [selectedPart, setSelectedPart] = useState<SimulationPartId>('generator');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md z-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Váltakozó Áram Szimulátor</h1>
        <div className="flex items-center gap-4 text-blue-100">
          <span className="text-sm">9. osztályos fizika</span>
          <HelpCircle className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col xl:flex-row gap-8">
        
        {/* Left Side: Interactive Schematic / Map */}
        <section className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full min-h-[500px]">
          <div className="bg-slate-100 p-3 border-b border-slate-200">
            <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-widest">Hőerőmű Modell</h2>
          </div>
          <div className="flex-1 relative p-4 flex items-center justify-center bg-sky-50 overflow-auto">
             <RealisticPowerPlant 
                selectedPart={selectedPart} 
                onSelectPart={setSelectedPart} 
             />
          </div>
          <div className="bg-yellow-50 border-t border-yellow-200 p-3 text-sm text-yellow-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-yellow-600" />
            <p>Kattints a fenti animált ábra egyes részeire (Kazán, Turbina, Generátor, Transzformátor, Távvezeték) a részletes fizikai magyarázatokért!</p>
          </div>
        </section>

        {/* Right Side: Details Panel */}
        <aside className="w-full xl:w-[450px] shrink-0 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-auto xl:max-h-[calc(100vh-120px)]">
           <DetailsPanel data={simulationData[selectedPart]} />
        </aside>

      </main>
    </div>
  );
}
