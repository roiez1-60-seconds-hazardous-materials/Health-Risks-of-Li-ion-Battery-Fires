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
  // ── Nav ──────────────────────────────────────────────
  'nav.title': { he: 'ניתוח 60 שניות | סיכוני שריפת סוללות ליתיום', en: '60 Seconds Analysis | Li-ion Battery Fire Risks' },
  'nav.home': { he: 'בית', en: 'Home' },
  'nav.scope': { he: 'המחקר', en: 'The Study' },
  'nav.metals': { he: 'מתכות', en: 'Metals' },
  'nav.ppe': { he: 'נוצת העשן', en: 'The Plume' },
  'nav.layers': { he: 'חדירה', en: 'Penetration' },
  'nav.pah': { he: 'PAH', en: 'PAH' },
  'nav.fluoride': { he: 'פלואוריד', en: 'Fluoride' },
  'nav.mutagen': { he: 'מוטגניות', en: 'Mutagenicity' },
  'nav.recommend': { he: 'המלצות', en: 'Guidance' },
  'nav.sources': { he: 'מקורות', en: 'Sources' },
  'nav.lang': { he: 'EN', en: 'עב' },

  // ── Hero ─────────────────────────────────────────────
  'hero.badge': { he: 'ניתוח מבוסס מחקר · 2025–2026', en: 'Research-Based Analysis · 2025–2026' },
  'hero.title': { he: 'הסכנה הנסתרת בעשן', en: 'The Hidden Hazard in the Smoke' },
  'hero.subtitle': { he: 'סיכונים בריאותיים בשריפות סוללות ליתיום-יון', en: 'Health Risks in Lithium-Ion Battery Fires' },
  'hero.desc': { he: 'מה באמת נשאר על ביגוד המגן של לוחם האש אחרי שריפת רכב חשמלי — מתכות סוללה, פחמימנים ארומטיים, פלואוריד ועשן מוטגני. ניתוח מלא של שני מחקרי FSRI פורצי דרך.', en: 'What actually remains on a firefighter\'s turnout gear after an EV fire — battery metals, aromatic hydrocarbons, fluoride and mutagenic smoke. A full analysis of two landmark FSRI studies.' },
  'hero.cta': { he: 'התחל בניתוח', en: 'Start the analysis' },
  'hero.cta2': { he: 'דלג להמלצות', en: 'Jump to guidance' },
  'hero.stat1': { he: 'רכבים חשמליים נשרפו', en: 'EVs burned' },
  'hero.stat2': { he: 'רכבי בנזין להשוואה', en: 'ICEVs compared' },
  'hero.stat3': { he: 'שכבות ביגוד נותחו', en: 'gear layers analyzed' },
  'hero.stat4': { he: 'יותר מתכות בעשן EV', en: 'more metals in EV smoke' },

  // ── Scope ────────────────────────────────────────────
  'scope.title': { he: 'הזירה המחקרית', en: 'Study Design' },
  'scope.subtitle': { he: 'שני מחקרי FSRI פורצי דרך, 2025–2026', en: 'Two landmark FSRI studies, 2025–2026' },
  'scope.intro': { he: 'עד היום רוב המחקרים על שריפות רכב חשמלי התמקדו בחום או בפליטת גזים. שני מחקרים חדשים של מכון FSRI (UL Research Institutes), בשיתוף NC State, EPA ו-NIOSH, שוברים שוויון — הם בוחנים בדיוק מה נשאר על ציוד לוחם האש, ומה העשן עושה ל-DNA של תאים חיים.', en: 'Until now, most EV-fire research focused on heat or gas emissions. Two new studies from FSRI (UL Research Institutes), with NC State, EPA and NIOSH, break new ground — examining exactly what stays on a firefighter\'s equipment, and what the smoke does to the DNA of living cells.' },
  'scope.c1t': { he: 'שריפה מלאה, ללא כיבוי', en: 'Full-Scale, Unsuppressed Burn' },
  'scope.c1d': { he: 'רכבים נשרפו עד כילוי בתנאי מעבדה מבוקרים — סימולציה של הגעת לוחמים לשריפת EV עם בריחה תרמית מתפשטת, לפני שמתחילים בכיבוי.', en: 'Vehicles burned to completion under controlled lab conditions — simulating firefighters arriving at an EV fire with propagating thermal runaway, before suppression begins.' },
  'scope.c2t': { he: '6 EV מול 3 רכבי בנזין', en: '6 EVs vs 3 Gasoline Vehicles' },
  'scope.c2d': { he: 'תוכנית של 13 שריפות: 6 רכבים חשמליים (EV) ו-3 רכבי בנזין (ICEV) בשריפה מלאה, ועוד 4 ניסויי כיבוי. זוג רכבים היו אותו דגם בדיוק — אחד חשמלי ואחד בנזין — להשוואה נקייה.', en: 'A 13-fire program: 6 electric (EV) and 3 gasoline (ICEV) vehicles burned to completion, plus 4 suppression tests. One pair was the identical model — one electric, one gas — for a clean comparison.' },
  'scope.c3t': { he: 'ניתוח שכבה-אחר-שכבה', en: 'Layer-by-Layer Analysis' },
  'scope.c3d': { he: 'לראשונה — שלוש שכבות ביגוד המגן נבדקו בנפרד: מעטפת חיצונית (OS), מחסום לחות (MB) ובטנה תרמית (TL). דגימות נלקחו בגובה גוף הלוחם, בתוך נוצת העשן, וישירות מהזרוע, הרגל והחזה תוך כדי הכיבוי.', en: 'For the first time — three turnout layers analyzed separately: outer shell (OS), moisture barrier (MB), thermal liner (TL). Samples were taken at firefighter body height, inside the smoke plume, and directly from the forearm, leg and chest during suppression.' },
  'scope.m1': { he: 'שריפות רכב', en: 'vehicle fires' },
  'scope.m2': { he: 'שכבות ביגוד', en: 'gear layers' },
  'scope.m3': { he: 'שיטות מדידה', en: 'analytical methods' },
  'scope.m3sub': { he: 'ICP-MS · כרומטוגרפיה יונית · מבחן איימס', en: 'ICP-MS · ion chromatography · Ames test' },

  // ── Metals ───────────────────────────────────────────
  'metals.title': { he: 'טביעת האצבע המתכתית', en: 'The Metallic Fingerprint' },
  'metals.subtitle': { he: 'מתכות הסוללה הן הסיכון הייחודי לשריפת EV', en: 'Battery metals are the signature risk of EV fires' },
  'metals.intro': { he: 'מתכות קתודת הסוללה — ניקל, מנגן, קובלט וליתיום — שלטו בעשן הרכב החשמלי. בעוד שבעשן רכב בנזין המתכת השכיחה היא אבץ (Zn), הרי שב-EV נמדדו פי 2 עד פי 7 יותר יסודות מתכתיים, ואלו נשארו על ביגוד המגן.', en: 'Battery-cathode metals — nickel, manganese, cobalt and lithium — dominated EV fire smoke. While gasoline smoke is dominated by zinc (Zn), EV fires released 2–7× more metallic elements, and these settled onto turnout gear.' },
  'metals.ni': { he: 'ניקל (Ni)', en: 'Nickel (Ni)' },
  'metals.ni.risk': { he: 'מסרטן ריאות בשאיפה, אלרגן עורי', en: 'Lung carcinogen (inhaled), skin allergen' },
  'metals.co': { he: 'קובלט (Co)', en: 'Cobalt (Co)' },
  'metals.co.risk': { he: 'רעיל ללב ולריאות, חשד מסרטן', en: 'Cardiac & respiratory toxin, suspected carcinogen' },
  'metals.mn': { he: 'מנגן (Mn)', en: 'Manganese (Mn)' },
  'metals.mn.risk': { he: 'רעילות עצבית, תסמינים דמויי פרקינסון', en: 'Neurotoxic, Parkinson-like symptoms' },
  'metals.li': { he: 'ליתיום (Li)', en: 'Lithium (Li)' },
  'metals.li.risk': { he: 'מגרה דרכי נשימה, רעיל במינון גבוה', en: 'Respiratory irritant, toxic at high dose' },
  'metals.massTitle': { he: 'חלק המתכות ממסת החלקיקים בעשן', en: 'Metals as a share of smoke particle mass' },
  'metals.massEv': { he: 'בעשן רכב חשמלי (EV)', en: 'in EV smoke' },
  'metals.massIce': { he: 'בעשן רכב בנזין (ICEV)', en: 'in gasoline smoke' },
  'metals.massNote': { he: 'עד 28% ממסת חלקיקי העשן ב-EV היו מתכות (ממוצע ~25%), לעומת 4–9% בלבד ברכב בנזין (Kim et al., 2025).', en: 'Up to 28% of EV smoke particle mass was metals (avg ~25%), versus only 4–9% in gasoline vehicles (Kim et al., 2025).' },
  'metals.tableTitle': { he: 'ריכוז מתכות כולל על המעטפת החיצונית (ng/cm²)', en: 'Total metal burden on the outer shell (ng/cm²)' },
  'metals.col.metric': { he: 'מיקום / מדד', en: 'Location / Metric' },
  'metals.col.ev': { he: 'רכב חשמלי (EV)', en: 'Electric (EV)' },
  'metals.col.ice': { he: 'רכב בנזין (ICEV)', en: 'Gasoline (ICEV)' },
  'metals.row1': { he: 'מתכות כולל — גובה גוף', en: 'Total metals — body level' },
  'metals.row2': { he: 'ניקל — גובה גוף', en: 'Nickel — body level' },
  'metals.row3': { he: 'ניקל — בתוך נוצת העשן', en: 'Nickel — inside plume' },
  'metals.row4': { he: 'מתכת דומיננטית', en: 'Dominant metal' },
  'metals.evMetals': { he: 'Ni · Mn · Co · Li', en: 'Ni · Mn · Co · Li' },
  'metals.iceMetals': { he: 'אבץ (Zn)', en: 'Zinc (Zn)' },
  'metals.note': { he: 'מתכות הסוללה (Ni, Co, Mn, Li) גבוהות מובהקת ב-EV. עופרת (Pb) ואבץ (Zn) דווקא בולטים יותר ברכב בנזין — מקורם במצבר העופרת ובחלקי הרכב. (Probert et al., 2026)', en: 'Battery metals (Ni, Co, Mn, Li) are significantly higher in EVs. Lead (Pb) and zinc (Zn) are more prominent in gasoline vehicles — sourced from the lead-acid battery and vehicle components. (Probert et al., 2026)' },

  // ── Plume vs floor ───────────────────────────────────
  'ppe.title': { he: 'נוצת העשן היא אזור ההרג', en: 'The Plume Is the Danger Zone' },
  'ppe.subtitle': { he: 'גובה החשיפה קובע את עוצמת הזיהום', en: 'Exposure height determines contamination magnitude' },
  'ppe.plumeNum': { he: 'פי 10', en: '10×' },
  'ppe.plumeLabel': { he: 'יותר מתכות בנוצת העשן מאשר בגובה הגוף', en: 'more metals in the plume than at body level' },
  'ppe.intro': { he: 'ריכוז המתכות על המעטפת החיצונית בתוך נוצת העשן היה גבוה עד פי 10 (סדר גודל שלם) מהדגימות בגובה הגוף. כל לוחם הפועל מעל הרכב, על גג, או בתנוחה גבוהה — נחשף לעומס הזיהום החמור ביותר.', en: 'Metal burden on the outer shell inside the plume was up to 10× (a full order of magnitude) higher than samples at body level. Any firefighter operating above the vehicle, on a roof, or in an elevated position faces the worst contamination load.' },
  'ppe.bodyTitle': { he: 'דגימות ישירות מגוף הלוחם', en: 'Samples taken directly off the firefighter' },
  'ppe.bodyDesc': { he: 'לראשונה הוצמדו דגימות ביגוד לזרוע, לרגל ולחזה תוך כדי כיבוי. הזרוע — שמושטת לתוך הרכב ואל מתחתיו — ספגה את הזיהום הגבוה ביותר.', en: 'For the first time, gear swatches were attached to the forearm, leg and chest during suppression. The forearm — reaching into and under the vehicle — absorbed the highest contamination.' },
  'ppe.zoneArm': { he: 'זרוע', en: 'Forearm' },
  'ppe.zoneChest': { he: 'חזה', en: 'Chest' },
  'ppe.zoneLeg': { he: 'רגל', en: 'Leg' },
  'ppe.opTitle': { he: 'המשמעות המבצעית', en: 'The Operational Meaning' },
  'ppe.opDesc': { he: 'בחלל סגור שבו העשן אינו מתפזר — חניון תת-קרקעי, מנהרה או מוסך — כל הגוף נמצא בעצם בתוך הנוצה. זהו תרחיש החשיפה החמור ביותר, וגם הסביר ביותר בעיר.', en: 'In an enclosed space where smoke cannot disperse — an underground garage, tunnel or workshop — the whole body is effectively inside the plume. This is the worst-case exposure, and also the most likely in an urban setting.' },

  // ── Layers ───────────────────────────────────────────
  'layers.title': { he: 'הזיהום חודר פנימה', en: 'Contamination Penetrates Inward' },
  'layers.subtitle': { he: 'אפילו השכבה שנוגעת בעור אינה חסינה', en: 'Even the skin-contact layer is not immune' },
  'layers.intro': { he: 'המעטפת החיצונית היא קו ההגנה הראשון וסופגת את רוב הזיהום — אך לא את כולו. מתכות הסוללה וה-PAH הקלים חדרו פנימה אל מחסום הלחות ואף אל הבטנה התרמית, השכבה שנוגעת ישירות בעור הלוחם. זהו מסלול חשיפה עורי שני, שמתקיים גם שעות אחרי השריפה אם הביגוד אינו מטוהר.', en: 'The outer shell is the first line of defense and absorbs most of the contamination — but not all of it. Battery metals and lighter PAHs penetrated inward to the moisture barrier and even the thermal liner, the layer in direct contact with the firefighter\'s skin. This is a secondary dermal exposure route that persists for hours after the fire if gear is not decontaminated.' },
  'layers.os': { he: 'מעטפת חיצונית (OS)', en: 'Outer Shell (OS)' },
  'layers.os.d': { he: 'קו ההגנה הראשון — סופג את עיקר עומס המתכות וה-PAH הכבדים.', en: 'First line of defense — absorbs the bulk of the metal load and heavy PAHs.' },
  'layers.mb': { he: 'מחסום לחות (MB)', en: 'Moisture Barrier (MB)' },
  'layers.mb.d': { he: 'אמור לעצור נוזלים — אך חלק מהמתכות וה-PAH הקלים חצו אותו.', en: 'Meant to stop liquids — yet part of the metals and light PAHs crossed it.' },
  'layers.tl': { he: 'בטנה תרמית (TL)', en: 'Thermal Liner (TL)' },
  'layers.tl.d': { he: 'השכבה הקרובה לעור. גילוי זיהום כאן = מסלול חשיפה עורי ישיר.', en: 'The layer closest to skin. Contamination here = a direct dermal route.' },
  'layers.skin': { he: '← נוגעת בעור', en: '← Skin contact' },
  'layers.dist': { he: 'עומק חדירת הזיהום דרך שכבות הביגוד', en: 'How deep contamination penetrates the gear' },
  'layers.legend': { he: 'מתכות סוללה ו-PAH במשקל מולקולרי נמוך', en: 'Battery metals & low-molecular-weight PAHs' },

  // ── PAH ──────────────────────────────────────────────
  'pah.title': { he: 'ומה עם ה-PAH?', en: 'And the PAHs?' },
  'pah.subtitle': { he: 'פחמימנים ארומטיים פוליציקליים — תוצר בעירה מסרטן', en: 'Polycyclic aromatic hydrocarbons — a carcinogenic combustion byproduct' },
  'pah.intro': { he: 'ה-PAH הם תוצר בעירה ידוע ומסרטן. כאן הממצא מפתיע — הריכוזים על הביגוד דומים בין רכב חשמלי לרכב בנזין. שריפת בעירה היא שריפת בעירה, ושני סוגי הרכב פולטים פחמימנים מסרטנים ברמה דומה.', en: 'PAHs are a well-known carcinogenic combustion byproduct. Here the finding is surprising — the concentrations on gear are similar between electric and gasoline vehicles. A combustion fire is a combustion fire, and both vehicle types emit carcinogenic hydrocarbons at comparable levels.' },
  'pah.evVal': { he: '0.92–3.96', en: '0.92–3.96' },
  'pah.iceVal': { he: '0.27–3.04', en: '0.27–3.04' },
  'pah.evLabel': { he: 'סך PAH על EV (ng/cm²)', en: 'Total PAH on EV (ng/cm²)' },
  'pah.iceLabel': { he: 'סך PAH על ICEV (ng/cm²)', en: 'Total PAH on ICEV (ng/cm²)' },
  'pah.c1t': { he: 'דומה בין EV ל-ICEV', en: 'Similar EV vs ICEV' },
  'pah.c1d': { he: 'הטווחים חופפים כמעט לחלוטין, ללא הבדל מובהק. ה-PAH אינם הסיכון שמבדיל בין EV לרכב רגיל — מתכות הסוללה והפלואוריד הם שמבדילים.', en: 'The ranges overlap almost entirely, with no significant difference. PAHs are not what sets an EV apart from a normal vehicle — the battery metals and fluoride are.' },
  'pah.c2t': { he: 'הקלים חודרים עמוק', en: 'Light Ones Go Deep' },
  'pah.c2d': { he: 'PAH במשקל מולקולרי נמוך (≤3 טבעות) זוהו בכל שלוש השכבות — כולל זו שנוגעת בעור. הכבדים יותר (≥4 טבעות), שחלקם המסרטנים ביותר, נשארו בעיקר על המעטפת החיצונית.', en: 'Low-molecular-weight PAHs (≤3 rings) were found in all three layers — including the skin-contact one. The heavier ones (≥4 rings), among them the most carcinogenic, stayed mainly on the outer shell.' },
  'pah.note': { he: 'רמות ה-PAH דומות לאלו של לוחם בעמדת אוורור חיצונית בשריפת מבנה — נמוכות מתקיפה פנימית, אך עדיין נוכחות ומחלחלות פנימה לאורך זמן.', en: 'PAH levels resemble those of a firefighter at an exterior ventilation position in a structure fire — lower than interior attack, but still present and diffusing inward over time.' },

  // ── Fluoride ─────────────────────────────────────────
  'fluoride.title': { he: 'הרוצח השקט: פלואוריד', en: 'The Silent Killer: Fluoride' },
  'fluoride.subtitle': { he: 'ייחודי לסוללות ליתיום — ופחות מוכר', en: 'Unique to lithium batteries — and less recognized' },
  'fluoride.pct': { he: 'ממסת החלקיקים בעשן EV', en: 'of EV smoke particle mass' },
  'fluoride.pctNote': { he: 'הפלואוריד מועשר חזק בעשן EV (עד ~2% מהמסה) וכמעט נעדר ברכב בנזין. מרביתו בצורת חלקיק — ולא כגז HF — מה שמסכן את העור והביגוד, לא רק את דרכי הנשימה.', en: 'Fluoride is strongly enriched in EV smoke (up to ~2% of mass) and nearly absent in gasoline vehicles. Most of it is particulate — not HF gas — which puts skin and gear at risk, not only the airways.' },
  'fluoride.mech': { he: 'מנגנון הפגיעה', en: 'Mechanism of Harm' },
  'fluoride.mechIntro': { he: 'במגע עם לחות — זיעה, ריאות, או מים מצינור הכיבוי — חלקיקי הפלואוריד הופכים ל:', en: 'On contact with moisture — sweat, lungs, or water from the hose line — fluoride particles convert to:' },
  'fluoride.hf': { he: 'חומצה הידרופלואורית (HF)', en: 'Hydrofluoric Acid (HF)' },
  'fluoride.b1': { he: 'חודרת עמוק לרקמות ולעצם, לעיתים ללא כאב מיידי', en: 'Penetrates deep into tissue and bone, sometimes with no immediate pain' },
  'fluoride.b2': { he: 'גורמת לכוויות כימיות מאוחרות, שעות אחרי המגע', en: 'Causes delayed chemical burns, hours after contact' },
  'fluoride.b3': { he: 'רעילות מערכתית: היפוקלצמיה והפרעות קצב לב', en: 'Systemic toxicity: hypocalcemia and cardiac arrhythmia' },
  'fluoride.note': { he: 'מכיוון שהפלואוריד הוא חלקיקי, הוא נשאר על הביגוד והעור גם אחרי שהעשן התפזר. שטיפה במים על שטח מזוהם עלולה דווקא להמיר אותו ל-HF פעיל. (Kim et al., 2025)', en: 'Because the fluoride is particulate, it remains on gear and skin even after the smoke clears. Rinsing a contaminated surface with water can actually convert it into active HF. (Kim et al., 2025)' },

  // ── Mutagenicity ─────────────────────────────────────
  'mutagen.title': { he: 'העשן פוגע ב-DNA', en: 'The Smoke Damages DNA' },
  'mutagen.subtitle': { he: 'מבחן איימס — עשן ה-EV מוטגני יותר', en: 'The Ames test — EV smoke is more mutagenic' },
  'mutagen.intro': { he: 'מחקר משלים (Kim et al., 2025) ביצע מבחן איימס: חשיפת חיידקי סלמונלה (זנים TA98 ו-TA100, עם ובלי הפעלה מטבולית S9) לתמצית האורגנית מעשן השריפה, וספירת מוטציות שחזרו. ככל שהציון גבוה יותר — כך פוטנציאל הפגיעה הגנטי גדול יותר.', en: 'A companion study (Kim et al., 2025) ran the Ames test: exposing Salmonella bacteria (strains TA98 and TA100, with and without S9 metabolic activation) to the organic extract from fire smoke, and counting reverted mutations. The higher the score, the greater the genetic-damage potential.' },
  'mutagen.chartTitle': { he: 'ציון מוטגניות כולל לכל רכב (סולם 0–3)', en: 'Total mutagenicity score per vehicle (0–3 scale)' },
  'mutagen.chartNote': { he: 'חמישה מתוך שישה רכבים חשמליים היו מוטגניים יותר מרכב הבנזין. EV6 — שהיה אותו דגם בדיוק כמו ICEV1 — היה המוטגני ביותר, מה שמספק השוואה ישירה ונקייה.', en: 'Five of six EVs were more mutagenic than the gasoline vehicle. EV6 — the identical model to ICEV1 — was the most mutagenic of all, providing a clean, direct comparison.' },
  'mutagen.matchTitle': { he: 'אותו דגם, מנוע שונה', en: 'Same Model, Different Engine' },
  'mutagen.matchDesc': { he: 'EV6 ו-ICEV1 היו אותו דגם רכב — אחד חשמלי, אחד בנזין. גרסת ה-EV הייתה פי כ-3 מוטגנית יותר. זו ההוכחה הנקייה ביותר שהסוללה, ולא רק שריפת הרכב, מוסיפה סיכון גנטי.', en: 'EV6 and ICEV1 were the same vehicle model — one electric, one gasoline. The EV version was roughly 3× more mutagenic. This is the cleanest proof that the battery, not just the vehicle burning, adds genetic risk.' },
  'mutagen.cmpTitle': { he: 'מול מקורות בעירה אחרים', en: 'Versus Other Combustion Sources' },
  'mutagen.cmpDesc': { he: 'אפילו ה-EV הכי פחות מוטגני היה מוטגני יותר מעשן עץ, גז טבעי וביו-דיזל. ה-EV המוטגני ביותר עלה אף על עשן שריפת פלסטיק ודיזל.', en: 'Even the least-mutagenic EV was more mutagenic than wood, natural-gas and biodiesel smoke. The most-mutagenic EV exceeded even plastic and diesel fire smoke.' },
  'mutagen.meaning': { he: 'המשמעות: פוטנציאל מסרטן מוגבר לטווח הארוך עבור לוחמי האש, הנובע מהשילוב הייחודי של פלסטיק שרוף, אלקטרוליטים ומתכות סוללה. ומכיוון שהמבחן בדק רק את החלק האורגני — מבלי המתכות — הסיכון הגנטי האמיתי כנראה גבוה אף יותר.', en: 'The meaning: an elevated long-term cancer potential for firefighters, arising from the unique mix of burnt plastic, electrolytes and battery metals. And because the test examined only the organic fraction — without the metals — the true genetic risk is likely even higher.' },
  'mutagen.you': { he: 'רכב חשמלי', en: 'Electric vehicle' },
  'mutagen.cmp.ev': { he: 'EV (הגבוה)', en: 'EV (highest)' },
  'mutagen.cmp.plastic': { he: 'שריפת פלסטיק', en: 'Plastic fire' },
  'mutagen.cmp.diesel': { he: 'דיזל', en: 'Diesel' },
  'mutagen.cmp.evlow': { he: 'EV (הנמוך)', en: 'EV (lowest)' },
  'mutagen.cmp.wood': { he: 'עץ למגורים', en: 'Residential wood' },
  'mutagen.cmp.gas': { he: 'גז טבעי', en: 'Natural gas' },

  // ── Recommendations ──────────────────────────────────
  'rec.title': { he: 'המלצות ללוחם האש', en: 'Guidance for the Firefighter' },
  'rec.subtitle': { he: 'מה לעשות — שלב אחר שלב — שנגזר ישירות מהמחקרים', en: 'What to do — step by step — derived directly from the research' },
  'rec.intro': { he: 'שריפת רכב חשמלי אינה "עוד שריפת רכב". יש להתייחס אליה כאירוע חומרים מסוכנים (חומ"ס) ממושך. ההמלצות הבאות נגזרות ישירות מממצאי שני המחקרים.', en: 'An EV fire is not "just another car fire." Treat it as a prolonged hazardous-materials (HazMat) incident. The following guidance is derived directly from the findings of both studies.' },

  'rec.p1.phase': { he: 'שלב 1 · הגעה והערכת מצב', en: 'Phase 1 · Arrival & Size-Up' },
  'rec.p1.a.t': { he: 'התקרבות מנגד הרוח', en: 'Approach from upwind' },
  'rec.p1.a.d': { he: 'נוצת העשן נושאת עד פי 10 ריכוז מתכות. התמקם תמיד במעלה הרוח והרחק מתחת לנוצה. הימנע מעמדה גבוהה מעל הרכב.', en: 'The plume carries up to 10× the metal concentration. Always position upwind and well clear of the plume. Avoid an elevated position over the vehicle.' },
  'rec.p1.b.t': { he: 'התייחס לזה כחומ"ס', en: 'Treat it as HazMat' },
  'rec.p1.b.d': { he: 'הגדר אזורי חם/חמים/קר. הרחק קהל וצוותים מיותרים. שריפת EV פולטת מתכות, פלואוריד ועשן מוטגני — לא רק חום.', en: 'Establish hot/warm/cold zones. Keep the public and non-essential crews back. An EV fire emits metals, fluoride and mutagenic smoke — not just heat.' },

  'rec.p2.phase': { he: 'שלב 2 · כיבוי וטיפול', en: 'Phase 2 · Suppression & Attack' },
  'rec.p2.a.t': { he: 'מנ"פ (SCBA) — תמיד', en: 'SCBA — always' },
  'rec.p2.a.d': { he: 'חובה בכל שלב, כולל בכיבוי שאריות (Overhaul). אל תסיר את המסכה גם כשהעשן נראה דליל — החלקיקים המסוכנים ביותר (מתכות, פלואוריד) הם בלתי נראים.', en: 'Mandatory at every stage, including overhaul. Do not remove the mask even when smoke looks thin — the most dangerous particles (metals, fluoride) are invisible.' },
  'rec.p2.b.t': { he: 'זהירות עם מים על פלואוריד', en: 'Caution: water on fluoride' },
  'rec.p2.b.d': { he: 'חלקיקי הפלואוריד הופכים ל-HF פעיל במגע עם מים. הימנע מנגיעה בעור חשוף ברסס הנגר, ושטוף ציוד הרחק מהגוף.', en: 'Fluoride particles turn into active HF on contact with water. Avoid bare-skin contact with runoff spray, and rinse equipment away from the body.' },
  'rec.p2.c.t': { he: 'שמור על כיסוי מלא', en: 'Keep full coverage' },
  'rec.p2.c.d': { he: 'הזרוע המושטת לתוך הרכב ספגה את הזיהום הגבוה ביותר. ודא חפיפה מלאה בין הכפפות לשרוול ובין הקסדה לצווארון — אין עור חשוף.', en: 'The forearm reaching into the vehicle absorbed the highest contamination. Ensure full overlap between gloves and sleeve, hood and collar — no exposed skin.' },

  'rec.p3.phase': { he: 'שלב 3 · יציאה וטיהור בשטח', en: 'Phase 3 · Exit & On-Scene Decon' },
  'rec.p3.a.t': { he: 'טיהור גס מיידי (Gross Decon)', en: 'Immediate gross decon' },
  'rec.p3.a.d': { he: 'מתכות כבדות אינן מתפרקות בשמש או באוויר. בצע שטיפת סבון ומים בשטח על המעטפת החיצונית עוד לפני הסרת הביגוד.', en: 'Heavy metals do not break down in sunlight or air. Perform a soap-and-water field rinse of the outer shell before removing the gear.' },
  'rec.p3.b.t': { he: 'נגב עור חשוף מיד', en: 'Wipe exposed skin at once' },
  'rec.p3.b.d': { he: 'נקה צוואר, ידיים, פנים ולסת עם מגבוני טיהור מיד עם היציאה — לפני הפסקה, שתייה או אכילה. כך מצמצמים ספיגה דרך העור.', en: 'Clean neck, hands, face and jaw with decon wipes immediately on exit — before any break, drink or food. This limits dermal uptake.' },
  'rec.p3.c.t': { he: 'הפרד מזוהם מנקי', en: 'Separate dirty from clean' },
  'rec.p3.c.d': { he: 'אטום את הביגוד בשקית, אחסן הרחק מתא הנהג והמושבים. אל תיכנס לרכב הכיבוי עם ביגוד מזוהם — הזיהום עובר לתא ולציוד.', en: 'Bag the gear, store it away from the cab and seats. Don\'t enter the apparatus in contaminated gear — contamination transfers to the cab and equipment.' },

  'rec.p4.phase': { he: 'שלב 4 · אחרי האירוע', en: 'Phase 4 · Post-Incident' },
  'rec.p4.a.t': { he: 'כביסה מקצועית לפי NFPA 1851', en: 'Pro laundering per NFPA 1851' },
  'rec.p4.a.d': { he: 'כביסה יסודית של כל שלוש השכבות — לא רק המעטפת. הזיהום חדר פנימה עד הבטנה התרמית. כביסה רגילה אינה מסירה הכל; דרושים מחזורים ייעודיים.', en: 'Thoroughly launder all three layers — not just the shell. Contamination penetrated to the thermal liner. Routine washing doesn\'t remove everything; dedicated cycles are needed.' },
  'rec.p4.b.t': { he: 'ניטור בריאותי ותיעוד חשיפה', en: 'Health monitoring & exposure logging' },
  'rec.p4.b.d': { he: 'תעד כל חשיפה לשריפת EV. העשן מוטגני ומכיל מסרטנים מוכרים — הצטרפות לניטור רפואי תקופתי ולמרשם סרטן לוחמי אש מומלצת מאוד.', en: 'Log every EV-fire exposure. The smoke is mutagenic and contains known carcinogens — enrolling in periodic medical surveillance and a firefighter cancer registry is strongly advised.' },
  'rec.p4.c.t': { he: 'נטר התלקחות מחדש', en: 'Monitor for re-ignition' },
  'rec.p4.c.d': { he: 'סוללות עלולות לחזור לבריחה תרמית שעות עד ימים אחר כך, ולפלוט שוב מתכות ופלואוריד. ככל שהניטור ארוך — חלון החשיפה גדל. שמור על מנ"פ בכל חזרה לרכב.', en: 'Batteries can re-enter thermal runaway hours to days later, re-emitting metals and fluoride. The longer the watch, the wider the exposure window. Keep SCBA on for every return to the vehicle.' },

  // ── Sources ──────────────────────────────────────────
  'sources.title': { he: 'מקורות', en: 'Sources' },
  'sources.subtitle': { he: 'שני מחקרים שפיטים מבוקרי עמיתים', en: 'Two peer-reviewed studies' },
  'sources.s1': { he: 'Probert, Kesler, Barowy, Ormond & Horn (2026) — זיהום פחמימנים ארומטיים ומתכות של ביגוד מגן לוחמי אש לאחר חשיפה לשריפת רכב חשמלי מלאה', en: 'Probert, Kesler, Barowy, Ormond & Horn (2026) — Polycyclic aromatic hydrocarbon and metal contamination of firefighter turnout gear after full-scale electric vehicle fire exposure' },
  'sources.s1pub': { he: 'Fire Safety Journal, כרך 163, מאמר 104865 · FSRI / UL Research Institutes · NC State', en: 'Fire Safety Journal, Vol. 163, Art. 104865 · FSRI / UL Research Institutes · NC State' },
  'sources.s2': { he: 'Kim et al. (2025) — מרכיבים כימיים בעשן שריפת רכב חשמלי ורכב בנזין והשפעותיהם המוטגניות', en: 'Kim et al. (2025) — Chemical components of electric vehicle and internal combustion engine vehicle fire smoke and their mutagenic effects' },
  'sources.s2pub': { he: 'Environmental Science and Pollution Research, 32(46):26629–26639 · EPA · FSRI/UL · NIOSH', en: 'Environmental Science and Pollution Research, 32(46):26629–26639 · EPA · FSRI/UL · NIOSH' },
  'sources.link': { he: 'למאמר המלא', en: 'Full article' },
  'sources.disclaimer': { he: 'ניתוח חינוכי לקהילת לוחמי האש. הנתונים מבוססים על המחקרים המצוטטים; אין בכך תחליף לנהלי הארגון, להנחיות היצרן או להכשרה מוסמכת.', en: 'An educational analysis for the firefighting community. Figures are based on the cited studies; this does not replace your department\'s SOPs, manufacturer guidance, or certified training.' },

  // ── Footer ───────────────────────────────────────────
  'footer.tag': { he: 'הידע הוא המיגון הטוב ביותר', en: 'Knowledge is the best protection' },
  'footer.by': { he: 'נותח ע"י רועי צוקרמן — מומחה חומ"ס וטב"ק', en: 'Analyzed by Roie Zukerman — HazMat & CBRN Specialist' },
  'footer.join': { he: 'הצטרפו לקבוצת 60 שניות חומ״ס', en: 'Join the 60 Seconds HazMat group' },
  'footer.views': { he: 'צפיות', en: 'views' },
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
