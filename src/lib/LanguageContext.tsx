'use client';
import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

type Lang = 'he' | 'en';

interface LangCtx {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
  toggle: () => void;
}

const dict: Record<string, Record<Lang, string>> = {
  // Nav
  'nav.title': { he: 'ניתוח 60 שניות | סיכוני שריפת סוללות ליתיום', en: '60 Seconds Analysis | Li-ion Battery Fire Risks' },
  'nav.home': { he: 'בית', en: 'Home' },
  'nav.scope': { he: 'המחקר', en: 'The Study' },
  'nav.metals': { he: 'מתכות', en: 'Metals' },
  'nav.ppe': { he: 'ביגוד מגן', en: 'Turnout Gear' },
  'nav.layers': { he: 'חדירה', en: 'Penetration' },
  'nav.pah': { he: 'PAH', en: 'PAH' },
  'nav.fluoride': { he: 'פלואוריד', en: 'Fluoride' },
  'nav.mutagen': { he: 'מוטגניות', en: 'Mutagenicity' },
  'nav.ops': { he: 'מבצעי', en: 'Operational' },
  'nav.sources': { he: 'מקורות', en: 'Sources' },
  'nav.lang': { he: 'EN', en: 'עב' },

  // Hero
  'hero.badge': { he: 'עדכון מחקר 2026', en: 'Research Update 2026' },
  'hero.title': { he: 'הסכנה הנסתרת בעשן', en: 'The Hidden Hazard in the Smoke' },
  'hero.subtitle': { he: 'סיכונים בריאותיים בשריפות סוללות ליתיום-יון', en: 'Health Risks in Lithium-Ion Battery Fires' },
  'hero.desc': { he: 'מה נשאר על ביגוד המגן של לוחם האש אחרי שריפת רכב חשמלי — מתכות סוללה, פחמימנים ארומטיים, ופלואוריד', en: 'What remains on a firefighter\'s turnout gear after an EV fire — battery metals, aromatic hydrocarbons, and fluoride' },
  'hero.cta': { he: 'גלול לניתוח ↓', en: 'Scroll to analysis ↓' },
  'hero.stat1': { he: 'רכבים חשמליים נשרפו', en: 'EVs burned' },
  'hero.stat2': { he: 'רכבי בנזין להשוואה', en: 'ICEVs compared' },
  'hero.stat3': { he: 'שכבות ביגוד נבדקו', en: 'gear layers analyzed' },
  'hero.stat4': { he: 'יותר מתכות ב-EV (פי)', en: 'more metals in EV (×)' },

  // Scope
  'scope.title': { he: 'הזירה המחקרית', en: 'Study Design' },
  'scope.subtitle': { he: 'שני מחקרי FSRI פורצי דרך, 2025–2026', en: 'Two landmark FSRI studies, 2025–2026' },
  'scope.intro': { he: 'עד היום רוב המחקרים על שריפות רכב חשמלי התמקדו בחום או בפליטת גזים. שני מחקרים חדשים של מכון FSRI שוברים שוויון — הם בוחנים מה בדיוק נשאר על הציוד של לוחם האש, וכיצד העשן משפיע על תאים חיים.', en: 'Until now, most EV-fire research focused on heat or gas emissions. Two new FSRI studies break new ground — examining exactly what remains on a firefighter\'s equipment, and how the smoke affects living cells.' },
  'scope.c1t': { he: 'שריפה מלאה', en: 'Full-Scale Burn' },
  'scope.c1d': { he: 'רכבים נשרפו עד כילוי במעבדת אש סגורה (33×33 מ\'), ללא התערבות כיבוי — סימולציה של הגעת לוחמים לשריפת EV עם בריחה תרמית מתפשטת.', en: 'Vehicles burned to completion in a closed 33×33 m fire lab, with no suppression — simulating firefighters arriving at an EV fire with propagating thermal runaway.' },
  'scope.c2t': { he: 'השוואה ישירה', en: 'Direct Comparison' },
  'scope.c2d': { he: '6 רכבים חשמליים (EV) מול 3 רכבי בנזין (ICEV), שנבחרו לייצג את שוק הרכב האמריקאי לשנת 2023.', en: '6 electric vehicles (EV) vs 3 gasoline vehicles (ICEV), selected to represent the 2023 US automotive market.' },
  'scope.c3t': { he: 'ניתוח לפי שכבה', en: 'Layer-by-Layer' },
  'scope.c3d': { he: 'לראשונה — כל שלוש שכבות ביגוד המגן נותחו בנפרד: מעטפת חיצונית (OS), מחסום לחות (MB), בטנה תרמית (TL). שתי עמדות: גובה חזה ובתוך נוצת העשן.', en: 'For the first time — all three turnout layers analyzed separately: outer shell (OS), moisture barrier (MB), thermal liner (TL). Two positions: chest height and inside the smoke plume.' },

  // Metals
  'metals.title': { he: 'טביעת האצבע המתכתית', en: 'The Metallic Fingerprint' },
  'metals.subtitle': { he: 'מתכות הסוללה הן הסיכון הייחודי לשריפת EV', en: 'Battery metals are the signature risk of EV fires' },
  'metals.intro': { he: 'מתכות הסוללה — ניקל, קובלט, מנגן וליתיום — היו הנפוצות ביותר בעשן הרכב החשמלי, בריכוזים גבוהים מובהקת מאשר ברכב בנזין.', en: 'Battery metals — nickel, cobalt, manganese and lithium — dominated EV fire emissions, at concentrations significantly higher than gasoline vehicles.' },
  'metals.ni': { he: 'ניקל (Ni)', en: 'Nickel (Ni)' },
  'metals.ni.risk': { he: 'מסרטן ריאות בשאיפה, אלרגן', en: 'Lung carcinogen (inhaled), allergen' },
  'metals.co': { he: 'קובלט (Co)', en: 'Cobalt (Co)' },
  'metals.co.risk': { he: 'רעיל ללב ולריאות, חשד מסרטן', en: 'Cardiac & respiratory toxicity, suspected carcinogen' },
  'metals.mn': { he: 'מנגן (Mn)', en: 'Manganese (Mn)' },
  'metals.mn.risk': { he: 'רעילות עצבית, דמוי פרקינסון', en: 'Neurotoxicity, Parkinson-like effects' },
  'metals.li': { he: 'ליתיום (Li)', en: 'Lithium (Li)' },
  'metals.li.risk': { he: 'רעילות כליות ועצבית במינון גבוה', en: 'Renal & neurological toxicity at high dose' },
  'metals.pb': { he: 'עופרת (Pb)', en: 'Lead (Pb)' },
  'metals.pb.risk': { he: 'גבוהה דווקא ב-ICEV — ממצבר העופרת', en: 'Higher in ICEV — from the lead-acid battery' },
  'metals.tableTitle': { he: 'ריכוז מתכות כולל על המעטפת החיצונית (ng/cm²)', en: 'Total metal burden on outer shell (ng/cm²)' },
  'metals.col.metric': { he: 'מיקום / מדד', en: 'Location / Metric' },
  'metals.col.ev': { he: 'רכב חשמלי (EV)', en: 'Electric (EV)' },
  'metals.col.ice': { he: 'רכב בנזין (ICEV)', en: 'Gasoline (ICEV)' },
  'metals.row1': { he: 'מתכות כולל — רצפה', en: 'Total metals — floor' },
  'metals.row2': { he: 'ניקל — רצפה', en: 'Nickel — floor' },
  'metals.row3': { he: 'ניקל — נוצת עשן', en: 'Nickel — plume' },
  'metals.row4': { he: 'עופרת', en: 'Lead' },
  'metals.pbLow': { he: 'נמוך', en: 'Low' },
  'metals.pbHigh': { he: 'גבוה יותר', en: 'Higher' },
  'metals.note': { he: 'מתכות הסוללה (Ni, Co, Mn, Li) גבוהות מובהקת ב-EV (p<0.001). עופרת היא המתכת היחידה שהייתה גבוהה יותר ברכב בנזין — מקורה במצבר העופרת.', en: 'Battery metals (Ni, Co, Mn, Li) are significantly higher in EVs (p<0.001). Lead was the only metal higher in gasoline vehicles — sourced from the lead-acid battery.' },

  // PPE / plume vs floor
  'ppe.title': { he: 'נוצת העשן היא האזור הקטלני', en: 'The Plume Is the Danger Zone' },
  'ppe.subtitle': { he: 'גובה חשיפה קובע את עוצמת הזיהום', en: 'Exposure height determines contamination magnitude' },
  'ppe.plumeNum': { he: 'פי 10', en: '10×' },
  'ppe.plumeLabel': { he: 'יותר מתכות בנוצה מאשר ברצפה', en: 'more metals in plume vs floor' },
  'ppe.intro': { he: 'ריכוז המתכות על המעטפת החיצונית בתוך נוצת העשן היה גבוה עד פי 10 מרמת הרצפה. הניקל בנוצה הגיע ל-1,322–8,437 ng/cm² לעומת 161–538 ng/cm² ברצפה.', en: 'Metal burden on the outer shell inside the plume was up to an order of magnitude higher than at floor level. Plume nickel reached 1,322–8,437 ng/cm² versus 161–538 ng/cm² at the floor.' },
  'ppe.opTitle': { he: 'המשמעות המבצעית', en: 'The Operational Meaning' },
  'ppe.opDesc': { he: 'בחלל סגור שבו העשן אינו מתפזר — חניון תת-קרקעי, מנהרה, מוסך — לוחם האש נחשף לרמות הזיהום של הנוצה. זהו תרחיש החשיפה החמור ביותר.', en: 'In an enclosed space where smoke cannot disperse — an underground garage, tunnel, or workshop — the firefighter is exposed to plume-level contamination. This is the worst-case exposure scenario.' },

  // Layers
  'layers.title': { he: 'הזיהום חודר פנימה', en: 'Contamination Penetrates Inward' },
  'layers.subtitle': { he: 'אפילו השכבה שנוגעת בעור אינה חסינה', en: 'Even the skin-contact layer is not immune' },
  'layers.intro': { he: 'המעטפת החיצונית היא קו ההגנה הראשי, אך ברמת הרצפה מתכות הסוללה חדרו גם למחסום הלחות ולבטנה התרמית — השכבה שנוגעת ישירות בעור לוחם האש. זהו מסלול חשיפה משני אם הביגוד אינו מטוהר.', en: 'The outer shell is the primary barrier, but at floor level battery metals penetrated into the moisture barrier and even the thermal liner — the layer in direct contact with the firefighter\'s skin. This is a secondary exposure route if gear is not decontaminated.' },
  'layers.os': { he: 'מעטפת חיצונית (OS)', en: 'Outer Shell (OS)' },
  'layers.mb': { he: 'מחסום לחות (MB)', en: 'Moisture Barrier (MB)' },
  'layers.tl': { he: 'בטנה תרמית (TL)', en: 'Thermal Liner (TL)' },
  'layers.skin': { he: '← נוגעת בעור', en: '← Skin contact' },
  'layers.dist': { he: 'התפלגות מתכות סוללה (רצפה, EV)', en: 'Battery metal distribution (floor, EV)' },

  // PAH
  'pah.title': { he: 'ומה עם ה-PAH?', en: 'And the PAHs?' },
  'pah.subtitle': { he: 'פחמימנים ארומטיים — תוצר בעירה מסרטן', en: 'Polycyclic aromatic hydrocarbons — carcinogenic combustion byproduct' },
  'pah.intro': { he: 'הפחמימנים הארומטיים הפוליציקליים (PAH) הם תוצר בעירה ידוע ומסרטן. כאן הממצא מפתיע — הם דומים בין רכב חשמלי לרכב בנזין.', en: 'Polycyclic aromatic hydrocarbons (PAHs) are a well-known carcinogenic combustion byproduct. Here the finding is surprising — they were similar between electric and gasoline vehicles.' },
  'pah.c1t': { he: 'דומה בין EV ל-ICEV', en: 'Similar EV vs ICEV' },
  'pah.c1d': { he: 'סך ה-PAH על הביגוד נע בין 0.27 ל-3.96 ng/cm² בשני סוגי הרכב — ללא הבדל סטטיסטי מובהק. שריפת בעירה היא שריפת בעירה.', en: 'Total PAH on gear ranged from 0.27 to 3.96 ng/cm² across both vehicle types — with no statistically significant difference. A combustion fire is a combustion fire.' },
  'pah.c2t': { he: 'הקלים חודרים עמוק', en: 'Light Ones Go Deep' },
  'pah.c2d': { he: 'PAH במשקל מולקולרי נמוך (≤3 טבעות) נמצאו בכל שלוש השכבות — כולל זו שנוגעת בעור. הכבדים (≥4 טבעות) נשארו בעיקר על המעטפת החיצונית.', en: 'Low-molecular-weight PAHs (≤3 rings) were found in all three layers — including the skin-contact one. Heavy ones (≥4 rings) stayed mainly on the outer shell.' },
  'pah.note': { he: 'רמות ה-PAH דומות לאלו של לוחם הפועל בעמדת אוורור חיצונית בשריפת מבנה — נמוכות יותר מתקיפה פנימית, אך עדיין נוכחות ומחלחלות פנימה.', en: 'PAH levels resemble those of a firefighter at an exterior ventilation position in a structure fire — lower than interior attack, but still present and diffusing inward.' },

  // Fluoride
  'fluoride.title': { he: 'הרוצח השקט: פלואוריד', en: 'The Silent Killer: Fluoride' },
  'fluoride.subtitle': { he: 'ייחודי לסוללות ליתיום — ופחות מוכר', en: 'Unique to lithium batteries — and less recognized' },
  'fluoride.pct': { he: 'ממסת החלקיקים', en: 'of particle mass' },
  'fluoride.mech': { he: 'מנגנון הפגיעה', en: 'Mechanism of Harm' },
  'fluoride.mechIntro': { he: 'במגע עם לחות (זיעה, ריאות), חלקיקי הפלואוריד הופכים ל:', en: 'On contact with moisture (sweat, lungs), fluoride particles convert to:' },
  'fluoride.hf': { he: 'חומצה הידרופלואורית (HF)', en: 'Hydrofluoric Acid (HF)' },
  'fluoride.b1': { he: 'חודרת עמוק לרקמות ולעצם', en: 'Penetrates deep into tissue and bone' },
  'fluoride.b2': { he: 'גורמת לכוויות כימיות מאוחרות', en: 'Causes delayed chemical burns' },
  'fluoride.b3': { he: 'רעילות מערכתית (הפרעות קצב לב)', en: 'Systemic toxicity (cardiac arrhythmia)' },
  'fluoride.note': { he: 'כמות ה-HF הכוללת בשריפת EV גדולה יותר מאשר ברכב בנזין, ונפלטת לאורך זמן רב יותר ככל שהסוללה בוערת בבריחה תרמית.', en: 'Total HF produced in an EV fire is greater than in a gasoline vehicle, and is released over a longer period as the battery burns in thermal runaway.' },

  // Mutagenicity
  'mutagen.title': { he: 'השפעה גנטית (Mutagenicity)', en: 'Genetic Effect (Mutagenicity)' },
  'mutagen.subtitle': { he: 'העשן פוגע ב-DNA — מבחן איימס', en: 'The smoke damages DNA — the Ames Test' },
  'mutagen.intro': { he: 'מחקר משלים (Kim et al., 2025) ביצע מבחן איימס: חשיפת חיידקים לעשן ובדיקת שינויים ב-DNA. הממצא — עשן הרכב החשמלי מוטגני יותר.', en: 'A companion study (Kim et al., 2025) ran the Ames Test: exposing bacteria to smoke and measuring DNA changes. The finding — EV smoke is more mutagenic.' },
  'mutagen.c1t': { he: 'ממצאי המעבדה', en: 'Laboratory Findings' },
  'mutagen.c1d': { he: 'החומרים האורגניים בעשן הרכב החשמלי הראו סבירות גבוהה יותר לגרום למוטציות מאשר עשן רגיל.', en: 'The organic compounds in EV smoke showed a higher likelihood of inducing mutations than ordinary smoke.' },
  'mutagen.c2t': { he: 'המשמעות', en: 'The Meaning' },
  'mutagen.c2d': { he: 'פוטנציאל מסרטן גבוה יותר לטווח הארוך עבור לוחמי האש, הנובע מהשילוב הייחודי של פלסטיק שרוף, אלקטרוליטים ומתכות.', en: 'A higher long-term cancer potential for firefighters, arising from the unique combination of burnt plastic, electrolytes and metals.' },

  // Operational
  'ops.title': { he: 'השלכות ללוחם האש', en: 'Implications for the Firefighter' },
  'ops.subtitle': { he: 'מה לעשות בשטח ואחרי', en: 'What to do on-scene and after' },
  'ops.scbaT': { he: 'נשימה (מנ״פ)', en: 'Breathing (SCBA)' },
  'ops.scbaD': { he: 'חובה בכל שלב, כולל ב-Overhaul. אין להסיר מסיכה גם כשהעשן נראה דליל — החלקיקים המזיקים ביותר הם הבלתי נראים.', en: 'Mandatory at every stage, including overhaul. Do not remove the mask even when smoke appears thin — the most harmful particles are invisible.' },
  'ops.deconT': { he: 'טיהור (Decon)', en: 'Decontamination' },
  'ops.deconD': { he: 'מתכות כבדות אינן מתפרקות בשמש. עדיפות לניקל, קובלט ומנגן. חובה טיהור יסודי בשטח וכביסה מקצועית — כולל הבטנה הפנימית.', en: 'Heavy metals do not break down in sunlight. Prioritize nickel, cobalt, manganese. Thorough on-scene gross decon and professional laundering are required — including the inner liner.' },
  'ops.skinT': { he: 'עור', en: 'Skin' },
  'ops.skinD': { he: 'כיסוי מלא. מנע מגע של העשן עם הזיעה (סכנת HF). נקה אזורים חשופים — צוואר, ידיים, פנים — מיד עם היציאה.', en: 'Full coverage. Prevent smoke contact with sweat (HF risk). Clean exposed areas — neck, hands, face — immediately on exit.' },
  'ops.timeT': { he: 'זמן חשיפה', en: 'Exposure Time' },
  'ops.timeD': { he: 'שריפות EV נמשכות זמן רב ודורשות ניטור ממושך לבריחה תרמית חוזרת. ככל שמתעכבים בטיהור (בשל סיכון התלקחות מחדש), חלון החשיפה גדל.', en: 'EV fires last long and require extended monitoring for re-ignition. The longer decon is delayed (due to reignition risk), the wider the exposure window.' },

  // Sources
  'sources.title': { he: 'מקורות', en: 'Sources' },
  'sources.subtitle': { he: 'שני מחקרים שפיטים מבוקרי עמיתים', en: 'Two peer-reviewed studies' },
  'sources.s1': { he: 'Probert et al. (2026) — זיהום פחמימנים ארומטיים ומתכות של ביגוד מגן לוחמי אש לאחר חשיפה לשריפת רכב חשמלי מלאה', en: 'Probert et al. (2026) — Polycyclic aromatic hydrocarbon and metal contamination of firefighter turnout gear after full-scale electric vehicle fire exposure' },
  'sources.s1pub': { he: 'Fire Safety Journal 163 · FSRI / UL Research Institutes · NC State', en: 'Fire Safety Journal 163 · FSRI / UL Research Institutes · NC State' },
  'sources.s2': { he: 'Kim et al. (2025) — מרכיבים כימיים בעשן שריפת רכב חשמלי ורכב בנזין והשפעותיהם המוטגניות', en: 'Kim et al. (2025) — Chemical components of EV and ICEV fire smoke and their mutagenic effects' },
  'sources.s2pub': { he: 'FSRI · UL · EPA · NIOSH', en: 'FSRI · UL · EPA · NIOSH' },
  'sources.link': { he: 'למחקר המלא', en: 'Full study' },

  // Footer
  'footer.tag': { he: 'הידע הוא המיגון הטוב ביותר', en: 'Knowledge is the best protection' },
  'footer.by': { he: 'נותח ע"י רועי צוקרמן — מומחה חומ"ס וטב"ק', en: 'Analyzed by Roie Zukerman — HazMat & CBRN Specialist' },
  'footer.join': { he: 'הצטרפו לקבוצת 60 שניות חומ״ס', en: 'Join the 60 Seconds HazMat group' },
};

const LangContext = createContext<LangCtx>({
  lang: 'he', dir: 'rtl', t: (k) => k, toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('lang');
      if (p === 'en' || p === 'he') return p;
    }
    return 'he';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggle = useCallback(() => {
    setLang(prev => {
      const next = prev === 'he' ? 'en' : 'he';
      document.documentElement.lang = next;
      document.documentElement.dir = next === 'he' ? 'rtl' : 'ltr';
      return next;
    });
  }, []);

  const t = useCallback((key: string) => dict[key]?.[lang] ?? key, [lang]);
  const dir = lang === 'he' ? 'rtl' as const : 'ltr' as const;

  return (
    <LangContext.Provider value={{ lang, dir, t, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
