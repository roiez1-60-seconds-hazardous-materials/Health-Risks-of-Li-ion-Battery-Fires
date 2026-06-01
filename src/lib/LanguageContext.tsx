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
  'nav.ppe': { he: 'פלומת העשן', en: 'The Plume' },
  'nav.layers': { he: 'חדירה', en: 'Penetration' },
  'nav.pah': { he: 'PAH', en: 'PAH' },
  'nav.fluoride': { he: 'פלואוריד', en: 'Fluoride' },
  'nav.mutagen': { he: 'מוטגניות', en: 'Mutagenicity' },
  'nav.recommend': { he: 'המלצות', en: 'Guidance' },
  'nav.sources': { he: 'מקורות', en: 'Sources' },
  'nav.lang': { he: 'EN', en: 'עב' },

  // ── Hero ─────────────────────────────────────────────
  'hero.badge': { he: 'ניתוח מבוסס מחקר · 2025–2026', en: 'Research-Based · 2025–2026' },
  'hero.title': { he: 'הסכנה הנסתרת בעשן', en: 'The Hidden Hazard in the Smoke' },
  'hero.subtitle': { he: 'סיכונים בריאותיים בשריפות סוללות ליתיום', en: 'Health Risks in Lithium-Ion Battery Fires' },
  'hero.desc': { he: 'מה נשאר על חליפת הלוחם אחרי שריפת רכב חשמלי — מתכות סוללה, פחמימנים מסרטנים, פלואוריד ועשן פוגע-DNA. ניתוח שני מחקרי FSRI, בשפה פשוטה.', en: 'What stays on a firefighter\'s gear after an EV fire — battery metals, carcinogens, fluoride and DNA-damaging smoke. Two FSRI studies, made simple.' },
  'hero.cta': { he: 'התחל בניתוח', en: 'Start the analysis' },
  'hero.cta2': { he: 'דלג להמלצות', en: 'Jump to guidance' },
  'hero.stat1': { he: 'רכבים חשמליים', en: 'EVs burned' },
  'hero.stat2': { he: 'רכבי בנזין', en: 'gasoline cars' },
  'hero.stat3': { he: 'שכבות חליפה', en: 'gear layers' },
  'hero.stat4': { he: 'יותר מתכות ב-EV', en: 'more metals in EV' },

  // ── Scope ────────────────────────────────────────────
  'scope.title': { he: 'הזירה המחקרית', en: 'Study Design' },
  'scope.subtitle': { he: 'שני מחקרי FSRI פורצי דרך', en: 'Two landmark FSRI studies' },
  'scope.intro': { he: 'רוב המחקרים על שריפות רכב חשמלי עסקו בחום ובגזים. שני מחקרי FSRI חדשים בודקים משהו אחר: מה נשאר על ציוד הלוחם — ומה העשן עושה ל-DNA.', en: 'Most EV-fire research looked at heat and gases. Two new FSRI studies ask something different: what stays on the firefighter\'s gear — and what the smoke does to DNA.' },
  'scope.c1t': { he: 'שריפה מלאה, בלי כיבוי', en: 'Full Burn, No Suppression' },
  'scope.c1d': { he: 'רכבים נשרפו עד הסוף במעבדה, בלי כיבוי — בדיוק כמו שלוחם פוגש שריפת EV בבריחה תרמית.', en: 'Vehicles burned to the end in the lab, with no suppression — just as a firefighter meets an EV in thermal runaway.' },
  'scope.c2t': { he: '6 חשמליים מול 3 בנזין', en: '6 Electric vs 3 Gasoline' },
  'scope.c2d': { he: '13 שריפות בסך הכל. זוג רכבים היה אותו דגם בדיוק — חשמלי מול בנזין — להשוואה נקייה.', en: '13 fires in total. One pair was the exact same model — electric vs gasoline — for a clean comparison.' },
  'scope.c3t': { he: 'בדיקה שכבה-אחר-שכבה', en: 'Layer by Layer' },
  'scope.c3d': { he: 'שלוש שכבות החליפה נבדקו בנפרד. דגמו בגובה הגוף, בתוך פלומת העשן, ומהזרוע, הרגל והחזה תוך כדי כיבוי.', en: 'All three gear layers tested separately. Sampled at body height, inside the plume, and off the arm, leg and chest during suppression.' },
  'scope.m1': { he: 'שריפות רכב', en: 'vehicle fires' },
  'scope.m2': { he: 'שכבות חליפה', en: 'gear layers' },
  'scope.m3': { he: 'שיטות מדידה', en: 'lab methods' },
  'scope.m3sub': { he: 'ICP-MS · מבחן איימס', en: 'ICP-MS · Ames test' },

  // ── Metals ───────────────────────────────────────────
  'metals.title': { he: 'טביעת האצבע המתכתית', en: 'The Metallic Fingerprint' },
  'metals.subtitle': { he: 'מתכות הסוללה — הסיכון הייחודי ל-EV', en: 'Battery metals — the signature EV risk' },
  'metals.intro': { he: 'מתכות הסוללה — ניקל, מנגן, קובלט וליתיום — שלטו בעשן ה-EV. בעשן בנזין המתכת השכיחה היא אבץ. ברכב חשמלי נמדדו פי 2 עד 7 יותר מתכות — והן נדבקו לחליפה.', en: 'Battery metals — nickel, manganese, cobalt, lithium — dominated EV smoke. Gasoline smoke is mostly zinc. EVs released 2–7× more metal — and it stuck to the gear.' },
  'metals.ni': { he: 'ניקל (Ni)', en: 'Nickel (Ni)' },
  'metals.ni.risk': { he: 'מסרטן ריאות, אלרגן עורי', en: 'Lung carcinogen, skin allergen' },
  'metals.co': { he: 'קובלט (Co)', en: 'Cobalt (Co)' },
  'metals.co.risk': { he: 'רעיל ללב ולריאות', en: 'Cardiac & lung toxin' },
  'metals.mn': { he: 'מנגן (Mn)', en: 'Manganese (Mn)' },
  'metals.mn.risk': { he: 'רעילות עצבית', en: 'Neurotoxic' },
  'metals.li': { he: 'ליתיום (Li)', en: 'Lithium (Li)' },
  'metals.li.risk': { he: 'מגרה דרכי נשימה', en: 'Respiratory irritant' },
  'metals.massTitle': { he: 'חלק המתכות מתוך חלקיקי העשן', en: 'Metals as a share of smoke particles' },
  'metals.massEv': { he: 'עשן רכב חשמלי', en: 'EV smoke' },
  'metals.massIce': { he: 'עשן רכב בנזין', en: 'Gasoline smoke' },
  'metals.massNote': { he: 'עד 28% מחלקיקי עשן ה-EV היו מתכות — מול 4–9% בלבד ברכב בנזין (Kim et al., 2025).', en: 'Up to 28% of EV smoke particles were metals — vs just 4–9% in gasoline (Kim et al., 2025).' },
  'metals.tableTitle': { he: 'מתכות על המעטפת החיצונית (ng/cm²)', en: 'Metals on the outer shell (ng/cm²)' },
  'metals.col.metric': { he: 'מדד', en: 'Metric' },
  'metals.col.ev': { he: 'חשמלי', en: 'Electric' },
  'metals.col.ice': { he: 'בנזין', en: 'Gasoline' },
  'metals.row1': { he: 'סך מתכות — גובה גוף', en: 'Total — body level' },
  'metals.row2': { he: 'ניקל — גובה גוף', en: 'Nickel — body' },
  'metals.row3': { he: 'ניקל — בפלומת העשן', en: 'Nickel — in plume' },
  'metals.row4': { he: 'מתכת דומיננטית', en: 'Dominant metal' },
  'metals.evMetals': { he: 'Ni · Mn · Co · Li', en: 'Ni · Mn · Co · Li' },
  'metals.iceMetals': { he: 'אבץ (Zn)', en: 'Zinc (Zn)' },
  'metals.note': { he: 'מתכות הסוללה גבוהות בהרבה ב-EV. עופרת ואבץ דווקא בולטים יותר ברכב בנזין — ממצבר העופרת וחלקי הרכב (Probert et al., 2026).', en: 'Battery metals are far higher in EVs. Lead and zinc are higher in gasoline cars — from the lead-acid battery and body parts (Probert et al., 2026).' },

  // ── Plume vs body ────────────────────────────────────
  'ppe.title': { he: 'פלומת העשן — אזור הסיכון הגבוה ביותר', en: 'The Plume Is the Danger Zone' },
  'ppe.subtitle': { he: 'גובה החשיפה קובע את עוצמת הזיהום', en: 'Exposure height sets the contamination level' },
  'ppe.plumeNum': { he: 'פי 10', en: '10×' },
  'ppe.plumeLabel': { he: 'יותר מתכות בפלומה מאשר בגובה הגוף', en: 'more metals in the plume than at body level' },
  'ppe.intro': { he: 'בתוך פלומת העשן נמדדו עד פי 10 יותר מתכות מאשר בגובה הגוף. לוחם שפועל מעל הרכב, על גג או בעמדה גבוהה — נמצא בזיהום החמור ביותר.', en: 'Inside the plume there was up to 10× more metal than at body level. A firefighter above the vehicle, on a roof or in a high position is in the worst contamination.' },
  'ppe.bodyTitle': { he: 'דגימות ישירות מגוף הלוחם', en: 'Samples off the firefighter' },
  'ppe.bodyDesc': { he: 'הוצמדו דגימות לזרוע, לרגל ולחזה תוך כדי כיבוי. הזרוע — שמושטת לתוך הרכב — נחשפה הכי הרבה.', en: 'Swatches were attached to the arm, leg and chest during suppression. The arm — reaching into the vehicle — was hit hardest.' },
  'ppe.zoneArm': { he: 'זרוע', en: 'Forearm' },
  'ppe.zoneChest': { he: 'חזה', en: 'Chest' },
  'ppe.zoneLeg': { he: 'רגל', en: 'Leg' },
  'ppe.opTitle': { he: 'המשמעות המבצעית', en: 'Why It Matters' },
  'ppe.opDesc': { he: 'בחלל סגור שבו העשן לא מתפזר — חניון תת-קרקעי, מנהרה או מוסך — כל הגוף נמצא בתוך הפלומה. זה התרחיש החמור ביותר, וגם הנפוץ בעיר.', en: 'In a closed space where smoke can\'t disperse — an underground garage, tunnel or workshop — the whole body is inside the plume. The worst case, and the most common in a city.' },

  // ── Layers ───────────────────────────────────────────
  'layers.title': { he: 'הזיהום חודר פנימה', en: 'Contamination Goes Inward' },
  'layers.subtitle': { he: 'שלוש שכבות חליפת המגן של לוחם האש', en: 'The three layers of the firefighter\'s turnout gear' },
  'layers.intro': { he: 'חליפת המגן (חליפת התקיפה) של לוחם האש בנויה משלוש שכבות. המעטפת החיצונית סופגת את רוב הזיהום — אבל לא הכול. מתכות ו-PAH קלים חדרו פנימה, עד הבטנה שנוגעת בעור. זהו מסלול חשיפה נוסף, שנשאר שעות אחרי השריפה אם לא מטהרים.', en: 'A firefighter\'s protective turnout suit is built from three layers. The outer shell soaks up most of the contamination — but not all. Metals and light PAHs reached inward, down to the skin-contact liner. That\'s a second exposure route, lasting hours after the fire if gear isn\'t cleaned.' },
  'layers.cap': { he: 'האחוזים = חלקו של הזיהום שנמצא בכל שכבה (Probert et al., 2026)', en: 'Percentages = share of contamination found in each layer (Probert et al., 2026)' },
  'layers.os': { he: 'מעטפת חיצונית (OS)', en: 'Outer Shell (OS)' },
  'layers.os.d': { he: 'קו ההגנה הראשון — סופג את רוב המתכות וה-PAH הכבדים.', en: 'First line of defense — soaks up most metals and heavy PAHs.' },
  'layers.mb': { he: 'מחסום לחות (MB)', en: 'Moisture Barrier (MB)' },
  'layers.mb.d': { he: 'אמור לעצור נוזלים — אך חלק מהזיהום חצה אותו.', en: 'Meant to stop liquids — yet some contamination crossed it.' },
  'layers.tl': { he: 'בטנה תרמית (TL)', en: 'Thermal Liner (TL)' },
  'layers.tl.d': { he: 'נוגעת בעור. זיהום כאן = מגע ישיר עם העור.', en: 'Touches the skin. Contamination here = direct skin contact.' },
  'layers.skin': { he: '← נוגעת בעור', en: '← Skin' },
  'layers.dist': { he: 'עומק חדירת הזיהום בשכבות חליפת המגן', en: 'How deep contamination reaches in the turnout gear' },
  'layers.legend': { he: 'מתכות סוללה ו-PAH קלים', en: 'Battery metals & light PAHs' },

  // ── PAH ──────────────────────────────────────────────
  'pah.title': { he: 'ומה עם ה-PAH?', en: 'And the PAHs?' },
  'pah.subtitle': { he: 'פחמימנים ארומטיים — תוצר בעירה מסרטן', en: 'Aromatic hydrocarbons — a carcinogenic byproduct' },
  'pah.intro': { he: 'ה-PAH הם תוצר בעירה מסרטן ידוע. ההפתעה: הרמות על החליפה דומות ב-EV ובבנזין. כאן אין הבדל — מה שמבדיל EV הוא המתכות והפלואוריד.', en: 'PAHs are a known carcinogenic byproduct. The surprise: levels on the gear are similar for EV and gasoline. No difference here — what sets an EV apart is the metals and fluoride.' },
  'pah.evVal': { he: '0.92–3.96', en: '0.92–3.96' },
  'pah.iceVal': { he: '0.27–3.04', en: '0.27–3.04' },
  'pah.evLabel': { he: 'PAH על רכב חשמלי', en: 'PAH on EV' },
  'pah.iceLabel': { he: 'PAH על רכב בנזין', en: 'PAH on gasoline' },
  'pah.c1t': { he: 'דומה ב-EV ובבנזין', en: 'Similar EV vs gasoline' },
  'pah.c1d': { he: 'הטווחים כמעט זהים, ללא הבדל מובהק. ה-PAH אינם הסיכון שמבדיל בין EV לרכב רגיל.', en: 'The ranges nearly overlap, with no real difference. PAHs are not what makes an EV different.' },
  'pah.c2t': { he: 'הקלים חודרים עמוק', en: 'Light Ones Go Deep' },
  'pah.c2d': { he: 'PAH קלים נמצאו בכל שלוש השכבות — גם זו שנוגעת בעור. הכבדים נשארו בעיקר על המעטפת.', en: 'Light PAHs reached all three layers — even the skin one. Heavy ones stayed mostly on the shell.' },
  'pah.note': { he: 'הרמות דומות ללוחם בעמדת אוורור חיצונית — נמוכות מתקיפה פנימית, אך עדיין נוכחות ומחלחלות פנימה.', en: 'Levels resemble a firefighter at an exterior position — lower than interior attack, but still present and seeping inward.' },

  // ── Fluoride ─────────────────────────────────────────
  'fluoride.title': { he: 'הרוצח השקט: פלואוריד', en: 'The Silent Killer: Fluoride' },
  'fluoride.subtitle': { he: 'ייחודי לסוללות ליתיום, ופחות מוכר', en: 'Unique to lithium batteries, less known' },
  'fluoride.pct': { he: 'מחלקיקי עשן ה-EV', en: 'of EV smoke particles' },
  'fluoride.pctNote': { he: 'הפלואוריד מרוכז בעשן ה-EV וכמעט נעדר בבנזין. רובו חלקיק — מסכן גם את העור והחליפה, לא רק את הנשימה.', en: 'Fluoride is concentrated in EV smoke and nearly absent in gasoline. Most is particulate — a risk to skin and gear, not just the lungs.' },
  'fluoride.mech': { he: 'מנגנון הפגיעה', en: 'How It Harms' },
  'fluoride.mechIntro': { he: 'במגע עם לחות — זיעה, ריאות או מי כיבוי — הפלואוריד הופך ל:', en: 'On contact with moisture — sweat, lungs or hose water — fluoride becomes:' },
  'fluoride.hf': { he: 'חומצה הידרופלואורית (HF)', en: 'Hydrofluoric Acid (HF)' },
  'fluoride.b1': { he: 'חודרת עמוק לרקמות ולעצם, לעיתים בלי כאב', en: 'Penetrates deep into tissue and bone, often painlessly' },
  'fluoride.b2': { he: 'כוויות כימיות מאוחרות, שעות אחר כך', en: 'Delayed chemical burns, hours later' },
  'fluoride.b3': { he: 'רעילות מערכתית והפרעות קצב לב', en: 'Systemic toxicity and cardiac arrhythmia' },
  'fluoride.note': { he: 'הפלואוריד החלקיקי נשאר על החליפה והעור גם אחרי שהעשן התפזר. שטיפה במים על שטח מזוהם עלולה דווקא להפעיל את ה-HF (Kim et al., 2025).', en: 'Particulate fluoride stays on gear and skin after the smoke clears. Rinsing a contaminated surface can even activate HF (Kim et al., 2025).' },

  // ── Mutagenicity ─────────────────────────────────────
  'mutagen.title': { he: 'העשן פוגע ב-DNA', en: 'The Smoke Damages DNA' },
  'mutagen.subtitle': { he: 'מבחן איימס — עשן ה-EV מוטגני יותר', en: 'The Ames test — EV smoke is more mutagenic' },
  'mutagen.intro': { he: 'מבחן איימס בודק כמה חומר גורם למוטציות ב-DNA. חשפו חיידקים לתמצית מהעשן וספרו מוטציות. ככל שהציון גבוה — כך הסיכון הגנטי גדול יותר.', en: 'The Ames test measures how much a substance mutates DNA. Bacteria were exposed to a smoke extract and mutations counted. Higher score = greater genetic risk.' },
  'mutagen.chartTitle': { he: 'ציון מוטגניות לכל רכב (0–3)', en: 'Mutagenicity score per vehicle (0–3)' },
  'mutagen.chartNote': { he: '5 מתוך 6 הרכבים החשמליים היו מוטגניים יותר מרכב הבנזין. EV6 — שהיה אותו דגם בדיוק כמו ICEV1 — היה הגבוה ביותר.', en: '5 of 6 EVs were more mutagenic than the gasoline car. EV6 — the same model as ICEV1 — scored highest.' },
  'mutagen.matchTitle': { he: 'אותו דגם, מנוע שונה', en: 'Same Model, Different Engine' },
  'mutagen.matchDesc': { he: 'EV6 ו-ICEV1 היו אותו דגם רכב. גרסת ה-EV הייתה פי 3 מוטגנית יותר — ההוכחה הנקייה שהסוללה מוסיפה סיכון גנטי.', en: 'EV6 and ICEV1 were the same model. The EV version was 3× more mutagenic — clean proof that the battery adds genetic risk.' },
  'mutagen.cmpTitle': { he: 'מול מקורות בעירה אחרים', en: 'Versus Other Fires' },
  'mutagen.cmpDesc': { he: 'אפילו ה-EV הכי פחות מוטגני עלה על עשן עץ, גז וביו-דיזל. ה-EV הגבוה עלה אף על שריפת פלסטיק ודיזל.', en: 'Even the least-mutagenic EV beat wood, gas and biodiesel smoke. The highest EV beat even plastic and diesel fires.' },
  'mutagen.meaning': { he: 'המשמעות: סיכון מסרטן מוגבר לטווח ארוך ללוחמים. והמבחן בדק רק את החלק האורגני — בלי המתכות — כך שהסיכון האמיתי כנראה גבוה אף יותר.', en: 'The takeaway: a higher long-term cancer risk for firefighters. And the test checked only the organic part — without the metals — so the real risk is likely even higher.' },
  'mutagen.you': { he: 'רכב חשמלי', en: 'Electric vehicle' },
  'mutagen.cmp.ev': { he: 'EV (הגבוה)', en: 'EV (highest)' },
  'mutagen.cmp.plastic': { he: 'שריפת פלסטיק', en: 'Plastic fire' },
  'mutagen.cmp.diesel': { he: 'דיזל', en: 'Diesel' },
  'mutagen.cmp.evlow': { he: 'EV (הנמוך)', en: 'EV (lowest)' },
  'mutagen.cmp.wood': { he: 'עץ', en: 'Wood' },
  'mutagen.cmp.gas': { he: 'גז טבעי', en: 'Natural gas' },

  // ── Recommendations ──────────────────────────────────
  'rec.title': { he: 'המלצות ללוחם האש', en: 'Guidance for the Firefighter' },
  'rec.subtitle': { he: 'שלב אחר שלב — נגזר ישירות מהמחקרים', en: 'Step by step — straight from the research' },
  'rec.intro': { he: 'שריפת רכב חשמלי אינה "עוד שריפת רכב". התייחס אליה כאירוע חומ"ס ממושך. ההמלצות נגזרות מממצאי שני המחקרים.', en: 'An EV fire is not "just another car fire." Treat it as a prolonged HazMat incident. This guidance comes straight from both studies.' },

  'rec.p1.phase': { he: 'שלב 1 · הגעה והערכת מצב', en: 'Phase 1 · Arrival & Size-Up' },
  'rec.p1.a.t': { he: 'התקרב נגד הרוח', en: 'Approach Upwind' },
  'rec.p1.a.d': { he: 'הפלומה נושאת עד פי 10 מתכות. התמקם תמיד נגד הרוח ומתחת לפלומה. הימנע מעמדה גבוהה מעל הרכב.', en: 'The plume carries up to 10× the metals. Always stay upwind and clear of it. Avoid a position above the vehicle.' },
  'rec.p1.b.t': { he: 'התייחס לזה כחומ"ס', en: 'Treat It as HazMat' },
  'rec.p1.b.d': { he: 'הגדר אזור חם, פושר וקר והרחק קהל וצוותים מיותרים. זו פליטה של מתכות, פלואוריד ועשן מוטגני — לא רק חום.', en: 'Set hot, warm and cold zones; keep the public and extra crews back. This emits metals, fluoride and mutagenic smoke — not just heat.' },

  'rec.p2.phase': { he: 'שלב 2 · כיבוי וטיפול', en: 'Phase 2 · Suppression' },
  'rec.p2.a.t': { he: 'מנ"פ (SCBA) — תמיד', en: 'SCBA — Always' },
  'rec.p2.a.d': { he: 'חובה בכל שלב, כולל בכיבוי שאריות. אל תסיר מסכה גם כשהעשן דליל — החלקיקים המסוכנים בלתי נראים.', en: 'Mandatory at every stage, including overhaul. Don\'t remove the mask even in thin smoke — the dangerous particles are invisible.' },
  'rec.p2.b.t': { he: 'זהירות מהנגר המזוהם', en: 'Beware Contaminated Runoff' },
  'rec.p2.b.d': { he: 'הנגר ומי השטיפה נושאים מתכות ופלואוריד מומסים, שעלולים להפוך ל-HF. הימנע ממגע של עור חשוף עם הנגר והשטיפים.', en: 'Runoff and wash-water carry dissolved metals and fluoride that can turn into HF. Keep bare skin away from the runoff and rinse-water.' },
  'rec.p2.c.t': { he: 'כיסוי גוף מלא', en: 'Full Coverage' },
  'rec.p2.c.d': { he: 'הזרוע ספגה הכי הרבה זיהום. ודא חפיפה מלאה בין כפפה לשרוול ובין קסדה לצווארון — אין עור חשוף.', en: 'The arm took the most contamination. Make sure gloves, sleeves, hood and collar fully overlap — no exposed skin.' },

  'rec.p3.phase': { he: 'שלב 3 · יציאה וטיהור', en: 'Phase 3 · Exit & Decon' },
  'rec.p3.a.t': { he: 'טיהור גס מיידי', en: 'Immediate Gross Decon' },
  'rec.p3.a.d': { he: 'מתכות כבדות לא מתפרקות מעצמן. שטוף את המעטפת בסבון ומים בשטח, עוד לפני שמורידים את החליפה.', en: 'Heavy metals don\'t break down on their own. Rinse the shell with soap and water on-scene, before removing the gear.' },
  'rec.p3.b.t': { he: 'נגב עור חשוף מיד', en: 'Wipe Skin at Once' },
  'rec.p3.b.d': { he: 'נקה צוואר, ידיים ופנים במגבוני טיהור מיד עם היציאה — לפני הפסקה, שתייה או אכילה.', en: 'Wipe neck, hands and face with decon wipes right on exit — before any break, drink or food.' },
  'rec.p3.c.t': { he: 'הפרד מזוהם מנקי', en: 'Separate Dirty from Clean' },
  'rec.p3.c.d': { he: 'אטום את החליפה בשקית והרחק מתא הנהג. אל תיכנס לרכב הכיבוי בחליפה מזוהמת.', en: 'Bag the gear and keep it away from the cab. Don\'t enter the apparatus in contaminated gear.' },

  'rec.p4.phase': { he: 'שלב 4 · אחרי האירוע', en: 'Phase 4 · After the Call' },
  'rec.p4.a.t': { he: 'כביסה לפי NFPA 1851', en: 'Launder per NFPA 1851' },
  'rec.p4.a.d': { he: 'כבס את שלוש השכבות, לא רק המעטפת. הזיהום חדר עד הבטנה. כביסה רגילה לא מספיקה.', en: 'Wash all three layers, not just the shell. Contamination reached the liner. A regular wash isn\'t enough.' },
  'rec.p4.b.t': { he: 'ניטור בריאותי', en: 'Health Monitoring' },
  'rec.p4.b.d': { he: 'תעד כל חשיפה לשריפת EV. העשן מוטגני ומכיל מסרטנים — הצטרף לניטור רפואי תקופתי.', en: 'Log every EV-fire exposure. The smoke is mutagenic and carcinogenic — join periodic medical surveillance.' },
  'rec.p4.c.t': { he: 'נטר התלקחות מחדש', en: 'Watch for Re-Ignition' },
  'rec.p4.c.d': { he: 'הסוללה עלולה לחזור לבריחה תרמית שעות-ימים אחר כך ולפלוט שוב. שמור על מנ"פ בכל חזרה לרכב.', en: 'The battery can re-enter thermal runaway hours to days later and re-emit. Keep SCBA on for every return to the vehicle.' },

  // ── Sources ──────────────────────────────────────────
  'sources.title': { he: 'מקורות', en: 'Sources' },
  'sources.subtitle': { he: 'שני מחקרים מבוקרי עמיתים', en: 'Two peer-reviewed studies' },
  'sources.s1': { he: 'Probert et al. (2026) — זיהום פחמימנים ארומטיים ומתכות של חליפת לוחם אש אחרי שריפת רכב חשמלי מלאה', en: 'Probert et al. (2026) — PAH and metal contamination of firefighter turnout gear after a full-scale EV fire' },
  'sources.s1pub': { he: 'Fire Safety Journal 163, מאמר 104865 · FSRI / UL · NC State', en: 'Fire Safety Journal 163, Art. 104865 · FSRI / UL · NC State' },
  'sources.s2': { he: 'Kim et al. (2025) — מרכיבים כימיים בעשן רכב חשמלי ובנזין והשפעתם המוטגנית', en: 'Kim et al. (2025) — Chemical components of EV and gasoline fire smoke and their mutagenic effects' },
  'sources.s2pub': { he: 'Environ Sci Pollut Res 32(46) · EPA · FSRI/UL · NIOSH', en: 'Environ Sci Pollut Res 32(46) · EPA · FSRI/UL · NIOSH' },
  'sources.link': { he: 'למאמר המלא', en: 'Full article' },
  'sources.disclaimer': { he: 'ניתוח חינוכי לקהילת לוחמי האש, מבוסס על המחקרים המצוטטים. אין בכך תחליף לנהלי הארגון, להנחיות היצרן או להכשרה מוסמכת.', en: 'An educational analysis for firefighters, based on the cited studies. Not a substitute for your department\'s SOPs, manufacturer guidance, or certified training.' },

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
