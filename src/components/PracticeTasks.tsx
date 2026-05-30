import React, { useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...classes: (string | undefined | null | false)[]) {
  return twMerge(clsx(classes));
}

export default function PracticeTasks() {
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  
  const [res1, setRes1] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [res2, setRes2] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const check1 = () => {
    const val = parseFloat(ans1.replace(',', '.'));
    if (val === 48) {
      setRes1('correct');
    } else {
      setRes1('incorrect');
    }
  };

  const check2 = () => {
    const val = parseInt(ans2.trim(), 10);
    if (val === 160) {
      setRes2('correct');
    } else {
      setRes2('incorrect');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-10 px-4">
      <div className="mb-10 p-6 bg-blue-50 border border-blue-100 rounded-xl">
         <h2 className="text-2xl font-bold text-blue-900 mb-2">Gyakorló feladatok: Transzformátor</h2>
         <p className="text-blue-800">
           Alkalmazd a transzformátorokra tanult képletet:
         </p>
         <div className="my-4 text-center text-blue-900 bg-white p-4 rounded-lg shadow-sm border border-blue-100">
            <BlockMath math="\frac{U_p}{U_{sz}} = \frac{N_p}{N_{sz}}" />
         </div>
      </div>

      <div className="space-y-8">
        {/* Task 1 */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">1. Feladat: Feltranszformálás</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            Egy transzformátor primer tekercsének menetszáma <InlineMath math="N_p = 300" />, a szekunder tekercsének menetszáma <InlineMath math="N_{sz} = 1200" />. A primer tekercsre kapcsolt feszültség <InlineMath math="U_p = 12\text{ V}" />.
          </p>
          <p className="font-semibold text-slate-800 mb-6">
            Mekkora a szekunder tekercsen indukálódó <InlineMath math="U_{sz}" /> feszültség?
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative">
               <input 
                 type="number" 
                 value={ans1}
                 onChange={(e) => {
                   setAns1(e.target.value);
                   setRes1('idle');
                 }}
                 placeholder="Eredmény..."
                 className="pl-4 pr-10 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-48 text-center text-lg"
               />
               <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">V</span>
            </div>
            <button 
              onClick={check1}
              disabled={ans1.trim() === ''}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto"
            >
              Ellenőrzés
            </button>
            
            {res1 === 'correct' && (
              <div className="flex items-center gap-2 text-green-600 font-semibold shrink-0">
                <CheckCircle className="w-6 h-6" /> Helyes! (48 V)
              </div>
            )}
            {res1 === 'incorrect' && (
              <div className="flex items-center gap-2 text-red-500 font-semibold shrink-0">
                <XCircle className="w-6 h-6" /> Próbáld újra!
              </div>
            )}
          </div>
        </div>

        {/* Task 2 */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">2. Feladat: Csengőtranszformátor</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            Egy lakásokban is használt csengőreduktor a <InlineMath math="230\text{ V}" />-os hálózati feszültséget <InlineMath math="8\text{ V}" />-ra transzformálja le (<InlineMath math="U_p = 230\text{ V}, U_{sz} = 8\text{ V}" />). 
            A berendezés primer tekercsének menetszáma <InlineMath math="N_p = 4600" />.
          </p>
          <p className="font-semibold text-slate-800 mb-6">
            Mennyi a szekunder tekercs menetszáma (<InlineMath math="N_{sz}" />)?
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative">
               <input 
                 type="number" 
                 value={ans2}
                 onChange={(e) => {
                   setAns2(e.target.value);
                   setRes2('idle');
                 }}
                 placeholder="Menetszám..."
                 className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-48 text-center text-lg"
               />
            </div>
            <button 
              onClick={check2}
              disabled={ans2.trim() === ''}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto"
            >
              Ellenőrzés
            </button>
            
            {res2 === 'correct' && (
              <div className="flex items-center gap-2 text-green-600 font-semibold shrink-0">
                <CheckCircle className="w-6 h-6" /> Helyes! (160)
              </div>
            )}
            {res2 === 'incorrect' && (
              <div className="flex items-center gap-2 text-red-500 font-semibold shrink-0">
                <XCircle className="w-6 h-6" /> Próbáld újra!
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
