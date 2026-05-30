import React, { useState } from 'react';
import { SimulationPartId, simulationData } from './data/simulations';
import { HelpCircle, AlertTriangle, BookOpen, Component } from 'lucide-react';
import RealisticPowerPlant from './components/RealisticPowerPlant';
import DetailsPanel from './components/DetailsPanel';
import PracticeTasks from './components/PracticeTasks';
import 'katex/dist/katex.min.css';

type ViewMode = 'simulation' | 'practice';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('simulation');
  const [selectedPart, setSelectedPart] = useState<SimulationPartId>('generator');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md z-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
           <ZapIcon className="w-6 h-6 text-yellow-300" />
           <h1 className="text-xl md:text-2xl font-bold tracking-tight">Váltakozó Áram Szimulátor</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-blue-700/50 p-1 rounded-lg">
            <button 
              onClick={() => setCurrentView('simulation')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${currentView === 'simulation' ? 'bg-white text-blue-700 shadow-sm' : 'text-blue-100 hover:text-white hover:bg-blue-600/50'}`}
            >
              <Component className="w-4 h-4" />
              Szimuláció
            </button>
            <button 
               onClick={() => setCurrentView('practice')}
               className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${currentView === 'practice' ? 'bg-white text-blue-700 shadow-sm' : 'text-blue-100 hover:text-white hover:bg-blue-600/50'}`}
            >
               <BookOpen className="w-4 h-4" />
               Feladatok
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-blue-100 border-l border-blue-500/50 pl-4">
            <span className="text-sm font-medium">8. osztályos fizika</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {currentView === 'simulation' ? (
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
          <aside className="w-full xl:w-[450px] shrink-0 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
             <DetailsPanel data={simulationData[selectedPart]} />
          </aside>

        </main>
      ) : (
        <main className="flex-1 w-full bg-slate-50">
           <PracticeTasks />
        </main>
      )}
    </div>
  );
}

// Simple internal icon for the header to avoid another import issue if `Zap` isn't grabbed right
function ZapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

