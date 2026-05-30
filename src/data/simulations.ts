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
    description: 'A generátor mechanikai energiát alakít át elektromos energiává a mozgási indukció elve alapján.',
    detailedText: [
      'Ha egy tekercset mágneses mezőben mozgatunk, vagy egy mágnest forgatunk a tekercs belsejében (esetleg körülötte), a kivezetései között feszültség indukálódik. Ezt a jelenséget mozgási indukciónak nevezzük, melyet Michael Faraday fedezte fel.',
      'A turbina közös tengelyen van a generátor forgórészével (rotor), amiben egy erős elektromágnes található. A rögzített tekercsek (állórész) fémgyűrűkön és keféken keresztül csatlakoznak a hálózathoz.',
      'Mágneses mezőben mozgó vezetőben csak akkor indukálódik feszültség, ha a vezető mozgása során keresztezi a mágneses erővonalakat.',
      'Az így előállított feszültség időben változik, ezért váltakozó feszültségnek nevezzük. Az áram, amelynek erőssége és iránya is periodikusan változik, a váltakozó áram.',
      'Magyarországon a hálózati váltakozó áram feszültsége 230 V, frekvenciája 50 Hz. Ez azt jelenti, hogy az áram iránya másodpercenként 100-szor változik meg.',
      'Érdekesség: A 50 Hz körüli váltakozó áramnak súlyosabb élettani hatása van, mint az egyenáramnak, mert könnyen megzavarhatja a normális szívműködést.'
    ],
    formulas: [
      { label: 'Indukált feszültség (Faraday-törvény)', math: 'U_e = - N \\cdot \\frac{\\Delta \\Phi}{\\Delta t}' }
    ],
    animationType: 'generator'
  },
  'transformer': {
    id: 'transformer',
    title: 'Transzformátor',
    description: 'A váltakozó feszültség nagyságát átalakító, elektromágneses indukció elvén működő berendezés.',
    detailedText: [
      'A generátor közepes feszültségét a távvezetéken való szállítás előtt fel kell transzformálni, hogy csökkentsük a veszteségeket.',
      'A transzformátor két tekercsből (primer és szekunder) és egy közös vasmagból áll. A primer az a tekercs, amelyikbe a váltakozó áramot bevezetjük, a szekunder pedig, amelyikben a feszültség indukálódik.',
      'A primer tekercsre kapcsolt váltakozó áram változó mágneses mezőt hoz létre a közös vasmagban, ami a nyugalmi indukció révén a szekunder tekercsben feszültséget indukál.',
      'A menetszámok aránya egyenlő a feszültségek arányával. Ha a szekunder menetszám nagyobb (N_{sz} > N_p), akkor a feszültség "feltranszformálódik". Ha N_{sz} < N_p, akkor "letranszformálódik".',
      'Érdekesség: A zárt vasmagú transzformátort Déri Miksa, Bláthy Ottó Titusz és Zipernowsky Károly (a Ganz-gyár mérnökei) találták fel, 1885-ben mutatták be.'
    ],
    formulas: [
      { label: 'Áttételi arány', math: '\\frac{N_p}{N_{sz}} = \\frac{U_p}{U_{sz}}' }
    ],
    animationType: 'transformer'
  },
  'transmission': {
    id: 'transmission',
    title: 'Távvezetékek és Hálózat',
    description: 'Az áram nagyfeszültségen történő elszállítása a távoli fogyasztókhoz minimális veszteséggel.',
    detailedText: [
      'A villamos energiát hosszú utakon, magas oszlopokon, légvezetékeken szállítják az elosztóközpontokba, majd onnan a városokba.',
      'A magas feszültség jelentősége abban áll, hogy azonos teljesítmény (P = U · I) továbbításához nagy feszültség mellett sokkal kisebb áramerősségre van szükség.',
      'A kisebb áramerősség miatt a vezetékek melegedéséből származó hővesztesége (I² · R) a töredéke marad.',
      'A lakossági fogyasztók közelében letranszformátorokat használnak, melyek a távvezetékek 120 kV, 220 kV vagy 400 kV feszültségét a háztartásokban engedélyezett biztonságos hálózati értékre juttatják.',
      'Európában a hálózati váltakozó feszültség effektív értéke 230 V.'
    ],
    formulas: [
      { label: 'Elektromos teljesítmény', math: 'P = U \\cdot I' },
      { label: 'Hőveszteség a vezetéken', math: 'P_{veszt} = I^2 \\cdot R' }
    ],
    animationType: 'transmission'
  }
};
