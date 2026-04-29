import { ReactNode } from 'react';

export type SimulationPartId = 'furnace' | 'turbine' | 'generator' | 'transformer' | 'transmission';

export interface SimulationPart {
  id: SimulationPartId;
  title: string;
  description: string;
  detailedText: string[];
  formulas: { label: string; math: string }[];
  animationType?: 'generator' | 'transformer' | 'transmission';
}

export const simulationData: Record<SimulationPartId, SimulationPart> = {
  'furnace': {
    id: 'furnace',
    title: 'Kazán (Hőenergia)',
    description: 'A fűtőanyag (pl. szén) elégetésével vizet melegítünk, amiből nagy nyomású gőz keletkezik.',
    detailedText: [
      'A hőerőművekben valamilyen energiahordozó (szén, gáz, fa) elégetésével hőt termelnek a kazánban.',
      'Ezzel a hővel a kazán csőrendszerében keringő vizet forralják fel, amely hatalmas nyomású és hőmérsékletű gőzzé alakul.',
      'A folyamat célja a kémiai energia (kötési energia) hőenergiává alakítása.',
      'A füstgázok a kéményen keresztül távoznak a szabadba.'
    ],
    formulas: [
      { label: 'Hőmennyiség (Joule)', math: 'Q = c \\cdot m \\cdot \\Delta T' }
    ]
  },
  'turbine': {
    id: 'turbine',
    title: 'Gőzturbina és Kondenzátor',
    description: 'A gőz nyomása megforgatja a turbinát, így a hőenergia mechanikai mozgási energiává alakul.',
    detailedText: [
      'A kazánból érkező nagy nyomású gőz a gőzturbinába kerül, ahol a turbina lapátjainak ütközve megforgatja azt.',
      'Ezzel a gőz hőenergiája mozgási (kinetikus) energiává alakul át.',
      'A munkát végzett, lecsökkent nyomású gőz a kondenzátorba jut, ahol egy hűtőrendszer (pl. folyóvíz vagy hűtőtorony) segítségével lehűtik.',
      'A gőz itt ismét folyékony vízzé csapódik le (kondenzálódik), amit egy szivattyú visszajuttat a kazánba, így a körfolyamat bezárul.'
    ],
    formulas: [
      { label: 'Forgási kinetikus energia', math: 'E_k = \\frac{1}{2} \\Theta \\omega^2' }
    ]
  },
  'generator': {
    id: 'generator',
    title: 'Generátor (Elektromosság)',
    description: 'A gőzturbina által megforgatott generátor az elektromágneses indukció révén váltakozó áramot állít elő.',
    detailedText: [
      'A turbina közös tengelyen van a generátor forgórészével (rotor), amiben egy erős elektromágnes található.',
      'Amikor a rotor forog a körülötte lévő rögzített tekercsek (állórész) belsejében, a változó mágneses mező feszültséget indukál.',
      'A Faraday-féle mozgási indukció törvénye értelmében ez váltakozó feszültséget és ezáltal váltakozó áramot hoz létre, melynek iránya és nagysága másodpercenként 100-szor változik (Európában 50 Hz).',
      'Ebben a lépésben alakul át a mechanikai mozgási energia elektromos energiává.'
    ],
    formulas: [
      { label: 'Indukált feszültség (Faraday-Lenz törvény)', math: 'U_e = - N \\cdot \\frac{\\Delta \\Phi}{\\Delta t}' },
      { label: 'Váltakozó feszültség', math: 'U(t) = U_{max} \\cdot \\sin(\\omega t)' }
    ],
    animationType: 'generator'
  },
  'transformer': {
    id: 'transformer',
    title: 'Transzformátor (Átalakítás)',
    description: 'A generátor által előállított feszültséget megnöveli a távvezetéken való szállítás előkészítéseként.',
    detailedText: [
      'A generátor feszültsége (általában 10-20 kV) még nem elég nagy ahhoz, hogy veszteség nélkül nagy távolságra szállítsuk.',
      'Az erőmű mellett lévő feltranszformátor a nyugalmi indukció elve alapján megnöveli ezt a feszültséget (pl. 120 kV, 220 kV vagy 400 kV-ra).',
      'Hűködési elve: a primer tekercsen átfolyó váltakozó áram változó mágnest teremt a vasmagban, ami a szekunder tekercsben nagyobb feszültséget indukál (mivel annak nagyobb a menetszáma).'
    ],
    formulas: [
      { label: 'Ideális transzformátor áttétel', math: '\\frac{U_p}{U_s} = \\frac{N_p}{N_s}' }
    ],
    animationType: 'transformer'
  },
  'transmission': {
    id: 'transmission',
    title: 'Távvezetékek és Hálózat',
    description: 'Az áram nagyfeszültségen történő elszállítása a távoli fogyasztókhoz minimális veszteséggel.',
    detailedText: [
      'A villamos energiát hosszú utakon magas oszlopokon, légvezetékeken szállítják az elosztóközpontokba, majd onnan a városokba.',
      'A magas feszültség jelentősége abban áll, hogy azonos teljesítmény ($\\,P = U \\cdot I\\,$) továbbításához nagy feszültség mellett sokkal kisebb áramerősségre van szükség.',
      'A kisebb áramerősség miatt a vezetékek Joule-hő vesztesége ($\\,I^2 \\cdot R\\,$) töredéke marad.',
      'A lakossági fogyasztók közelében letranszformátorokat (alállomások, oszloptranszformátorok) használnak a hálózati 230 V effektív feszültség eléréséhez.'
    ],
    formulas: [
      { label: 'Elektromos hőveszteség', math: 'P_{veszt.} = I^2 \\cdot R' }
    ],
    animationType: 'transmission'
  }
};
