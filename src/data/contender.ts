/**
 * CONTender ChatGPT App — bespoke landing page content.
 *
 * Hand-written, fully trilingual (ro/en/ru). Facts (tool counts, law articles,
 * prices, persona prompts) are pinned against the product's own documentation;
 * never machine-translated. One entry per locale; the page derives from this.
 */

import type { Locale } from "~/data/repos";

export const CONTENDER_APP_URL = "https://contender.yoda.digital";
export const CONTENDER_MCP_URL = "https://contender.yoda.digital/mcp";
export const CREATOR_URL = "https://nalyk.dev";

/**
 * Downloadable resource PDFs (the official guide + capability doc + the five
 * persona scenario booklets), rendered as cover cards. Language-agnostic
 * (file/thumb/accent); each locale supplies title + desc in the same order.
 */
export const resourceFiles: {
  id: string;
  file: string;
  thumb: string;
  accent: string;
  kind: "guide" | "persona";
}[] = [
  {
    id: "ghid",
    file: "/contender/docs/ghid-chatgpt.pdf",
    thumb: "/contender/docs/thumb-ghid-chatgpt.png",
    accent: "#af9568",
    kind: "guide",
  },
  {
    id: "capabilitati",
    file: "/contender/docs/capabilitati-complete.pdf",
    thumb: "/contender/docs/thumb-capabilitati-complete.png",
    accent: "#4f6995",
    kind: "guide",
  },
  {
    id: "jurnalist",
    file: "/contender/docs/persona-jurnalist.pdf",
    thumb: "/contender/docs/thumb-persona-jurnalist.png",
    accent: "#d2533f",
    kind: "persona",
  },
  {
    id: "avocat",
    file: "/contender/docs/persona-avocat.pdf",
    thumb: "/contender/docs/thumb-persona-avocat.png",
    accent: "#5a83c4",
    kind: "persona",
  },
  {
    id: "operator",
    file: "/contender/docs/persona-operator.pdf",
    thumb: "/contender/docs/thumb-persona-operator.png",
    accent: "#2faa72",
    kind: "persona",
  },
  {
    id: "autoritate",
    file: "/contender/docs/persona-autoritate.pdf",
    thumb: "/contender/docs/thumb-persona-autoritate.png",
    accent: "#9a7bd0",
    kind: "persona",
  },
  {
    id: "societate",
    file: "/contender/docs/persona-societate.pdf",
    thumb: "/contender/docs/thumb-persona-societate.png",
    accent: "#caa53e",
    kind: "persona",
  },
];

/** Per-step setup screenshots (step 1 is pure navigation → no shot). */
export const setupShots: (string | null)[] = [
  null,
  "/contender/setup/step2.png",
  "/contender/setup/step3.png",
  "/contender/setup/step4.png",
  "/contender/setup/step5.png",
];

/** Per-persona signature colors (used for card accents + glow). */
export const personaMeta: Record<string, { color: string; rgb: string }> = {
  journalist: { color: "#d2533f", rgb: "210,83,63" },
  lawyer: { color: "#5a83c4", rgb: "90,131,196" },
  supplier: { color: "#2faa72", rgb: "47,170,114" },
  authority: { color: "#9a7bd0", rgb: "154,123,208" },
  civilSociety: { color: "#caa53e", rgb: "202,165,62" },
};

/** Source links surfaced in the "what it is" dual-source diagram. */
export const sourceLinks = {
  mtender: "https://mtender.gov.md",
  ansc: "https://ansc.md",
};

/** Hub-and-spoke cross-links (pillar + the two backing MCP projects). */
export const relatedLinks: { slug: string; kind: "pillar" | "project" }[] = [
  { slug: "moldova-public-procurement-ai", kind: "pillar" },
  { slug: "ansc-mcp-server", kind: "project" },
  { slug: "mtender-mcp-server", kind: "project" },
];

export interface ContenderTool {
  key: string;
  tagline: string;
  returns: string;
  widget: string;
  free: boolean;
}

export interface ContenderPersona {
  id: string;
  title: string;
  blurb: string;
  why: string;
  prompt: string;
}

export interface ContenderCopy {
  meta: { title: string; description: string; keywords: string[] };
  hero: {
    eyebrow: string;
    betaTag: string;
    h1: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    mtenderTag: string;
    anscTag: string;
  };
  trustStrip: string[];
  stats: { value: string; label: string }[];
  whatItIs: {
    heading: string;
    paragraphs: string[];
    mtenderName: string;
    mtenderDesc: string;
    anscName: string;
    anscDesc: string;
  };
  howItWorks: {
    heading: string;
    intro: string;
    types: { n: string; name: string; count: string; desc: string }[];
    chainNote: string;
  };
  capabilities: {
    heading: string;
    intro: string;
    filingDisclaimer: string;
    tools: ContenderTool[];
  };
  widgets: { heading: string; intro: string; modesNote: string };
  personas: { heading: string; intro: string; items: ContenderPersona[] };
  legal: {
    heading: string;
    intro: string;
    currentTitle: string;
    currentPoints: string[];
    oldTitle: string;
    oldPoints: string[];
    note: string;
  };
  pricing: {
    heading: string;
    intro: string;
    betaNote: string;
    freeTitle: string;
    freeDesc: string;
    paidTitle: string;
    paidDesc: string;
    civicTitle: string;
    civicDesc: string;
    giveTitle: string;
    giveDesc: string;
  };
  setup: {
    heading: string;
    intro: string;
    betaNote: string;
    timeNote: string;
    urlLabel: string;
    steps: { title: string; detail: string }[];
  };
  faq: { heading: string; items: { q: string; a: string }[] };
  builtBy: {
    heading: string;
    story: string;
    yodaRole: string;
    esemplaRole: string;
    creatorName: string;
    creatorRole: string;
    firstAppNote: string;
  };
  resources: {
    heading: string;
    intro: string;
    downloadLabel: string;
    guidesLabel: string;
    scenariosLabel: string;
    items: { title: string; desc: string }[];
  };
  closing: { heading: string; body: string; ctaLabel: string };
  /** Labels for partner/credit microcopy rendered around the lockup. */
  partners: { yoda: string; esempla: string; inPartnership: string };
}

// Locale objects are attached below to keep each language reviewable on its own.
export const contenderCopy = {} as Record<Locale, ContenderCopy>;

contenderCopy.ro = {
  meta: {
    title: "CONTender: AI pentru achiziții publice Moldova",
    description:
      "Primul ChatGPT App din Moldova pentru integritatea achizițiilor publice. Unește MTender și ANSC într-o conversație: scor integritate, semnale roșii, contestații.",
    keywords: [
      "achiziții publice Moldova AI",
      "integritate achiziții publice Moldova",
      "asistent AI achiziții publice",
      "MTender analiză",
      "ANSC contestații",
      "scor integritate achiziții publice",
      "contestație achiziție publică Moldova",
      "ChatGPT achiziții publice Moldova",
    ],
  },
  hero: {
    eyebrow: "Primul ChatGPT App din Republica Moldova",
    betaTag: "Beta · în testare",
    h1: "CONTender — integritatea achizițiilor publice, direct în ChatGPT",
    lead: "CONTender unește cele două surse oficiale ale achizițiilor publice din Moldova, MTender și ANSC, într-o singură conversație. Întrebi în limbaj firesc, iar răspunsul vine ca widget interactiv, cu datele combinate și calculate. 99% din parcurs este gratuit și anonim: nu cere cont și nu modifică nimic.",
    ctaPrimary: "Adaugă în ChatGPT",
    ctaSecondary: "Vezi ce poate face",
    mtenderTag: "MTender · OCDS",
    anscTag: "ANSC · contestații",
  },
  trustStrip: [
    "99% gratuit și anonim",
    "Doar citește, nu modifică",
    "Trilingv: RO / RU / EN",
    "Ancorat în lege",
    "Un singur instrument plătit: 5 USD",
    "Gratuit pentru uz civic",
  ],
  stats: [
    { value: "2", label: "surse oficiale unite" },
    { value: "15", label: "instrumente de date" },
    { value: "14", label: "widgeturi interactive" },
    { value: "5", label: "comenzi rapide" },
  ],
  whatItIs: {
    heading: "O singură întrebare, ambele baze de date",
    paragraphs: [
      "Datele despre achizițiile publice din Moldova stau în două sisteme separate: ciclul procedurii în MTender și contestațiile în ANSC. Ca să corelezi un tender cu o contestație, în mod normal deschizi două portaluri și împaci manual două formate. CONTender face asta într-o propoziție: interoghează ambele surse în fundal, le combină, calculează și îți arată rezultatul.",
      "CONTender nu deține date proprii. Orchestrează doar cele două surse publice oficiale, ceea ce înseamnă că orice cifră poate fi verificată la sursă. Funcționează în română, rusă și engleză, cu româna ca limbă implicită. Termenii juridici și motivele semnalelor roșii sunt ancorați în articole reale de lege, încărcate la pornire și citate structural; modelul nu inventează temei legal.",
      "Rulează în interiorul ChatGPT, pe OpenAI Apps SDK peste protocolul MCP. Nu este un site separat și nici un chatbot independent: este o aplicație care răspunde în conversație și desenează widgeturi interactive.",
    ],
    mtenderName: "MTender",
    mtenderDesc:
      "Ciclul de viață al achiziției în standardul deschis OCDS 1.1.5: planificare, licitație, atribuire, contract și modificări. Sursa: mtender.gov.md.",
    anscName: "ANSC",
    anscDesc:
      "Agenția Națională pentru Soluționarea Contestațiilor — „tribunalul” administrativ al achizițiilor: contestații, decizii, ședințe și ordine de suspendare. Sursa: ansc.md.",
  },
  howItWorks: {
    heading: "Cum funcționează",
    intro:
      "CONTender expune patru tipuri de capabilități. Unele răspund direct, altele se înlănțuie: un instrument calculează datele, alt instrument le desenează.",
    types: [
      {
        n: "1",
        name: "Instrumente de date",
        count: "15",
        desc: "Interoghează ambele surse, combină și calculează: audit de tender, scor de integritate, radar de semnale roșii, cronologii cu termene legale. Unele randează direct, altele se cuplează cu un instrument de afișare.",
      },
      {
        n: "2",
        name: "Instrumente de afișare",
        count: "5",
        desc: "show_audit, show_red_flags, show_buyer_profile, show_supplier_profile, show_document. Primesc datele de la un instrument de date și le desenează în widget. Nu calculează nimic; sunt mereu pasul final al unui lanț.",
      },
      {
        n: "3",
        name: "Instrumente brute (proxy)",
        count: "29",
        desc: "La pornire, CONTender descoperă și re-expune fiecare instrument al surselor exact așa cum este: 12 de la ANSC și 17 de la MTender. Acces granular direct la API-urile brute, pentru întrebări foarte precise.",
      },
      {
        n: "4",
        name: "Comenzi rapide",
        count: "5",
        desc: "Comenzi conversaționale predefinite în română care lansează un instrument și formatează frumos răspunsul: audit, timeline, integrity, redflags, hearings.",
      },
    ],
    chainNote:
      "Modelul „decuplat” separă calculul de randare: un instrument de date produce rezultatul, iar un instrument show_* îl afișează. De aceea unele acțiuni înseamnă două apeluri înlănțuite, de exemplu audit_tender care trimite datele către show_audit, care le desenează în widgetul procurement-timeline.",
  },
  capabilities: {
    heading: "Ce poate face",
    intro:
      "Cincisprezece instrumente de date, toate gratuite în această fază de testare. Mai jos, zece dintre ele; restul, în documentația completă de mai jos.",
    filingDisclaimer:
      "Pachetul de contestație generat este un draft informativ, nu consultanță juridică. Este un punct de plecare, de verificat cu un jurist înainte de depunere. Instrumentul este în pregătire și încă nu este activ.",
    tools: [
      {
        key: "audit_tender",
        tagline: "Audit complet al unui tender",
        returns:
          "Auditul cap-coadă al unui tender: tot ciclul OCDS plus toate contestațiile, deciziile și suspendările ANSC asociate.",
        widget: "procurement-timeline",
        free: true,
      },
      {
        key: "integrity_score",
        tagline: "Scor de integritate 0–100",
        returns:
          "Un scor compozit de la 0 la 100, calculat din semnalele ANSC: rata contestațiilor, suspendări și anulări în instanță, severitatea deciziilor. Scor mare = procedură curată; scor mic = semnale de risc (100 = niciun risc detectat). Determinist, nu ghicit; datele MTender oferă context, nu intră în scor.",
        widget: "integrity-score-card",
        free: true,
      },
      {
        key: "red_flag_radar",
        tagline: "Radar de semnale roșii",
        returns:
          "Scanează datele recente după anomalii: atribuiri cu un singur ofertant, decizii ANSC suspendate sau anulate în instanță, ordonate după severitate.",
        widget: "red-flag-radar",
        free: true,
      },
      {
        key: "procurement_timeline",
        tagline: "Cronologie cu termene legale",
        returns:
          "Cronologia unificată a procedurii plus termenele legale calculate: fereastra de depunere, fereastra de răspuns, zilele rămase și temeiul legal.",
        widget: "procurement-timeline",
        free: true,
      },
      {
        key: "adversarial_network",
        tagline: "Graf de relații prin contestații",
        returns:
          "Construiește un graf de relații pornind de la un actor: noduri pentru cumpărători, furnizori, contestatari și complete, muchii pentru contestații. Arată cine pe cine a contestat.",
        widget: "adversarial-graph",
        free: true,
      },
      {
        key: "cpv_heatmap",
        tagline: "Hartă termică pe categorii CPV",
        returns:
          "Eșantionează un an de tendere, extrage codul CPV și valoarea, apoi agregă pe categorie: număr de tendere, valoare totală și rata de contestare.",
        widget: "cpv-heatmap",
        free: true,
      },
      {
        key: "compare",
        tagline: "Comparație A față de B",
        returns:
          "Compară două tendere cap la cap (titlu, autoritate, valoare, stare, metodă, contestații și decizii) și evidențiază diferențele și tiparele suspecte.",
        widget: "comparison-table",
        free: true,
      },
      {
        key: "buyer_profile",
        tagline: "Profil de autoritate contractantă",
        returns:
          "Agregă pentru o autoritate contractantă: numărul de tendere, cheltuiala totală și contestațiile primite.",
        widget: "profile-dashboard",
        free: true,
      },
      {
        key: "document_intelligence",
        tagline: "Întrebări pe un PDF oficial",
        returns:
          "Descarcă un PDF (decizie ANSC sau document de tender MTender) și îl expune ca text plus imagini per pagină, pentru întrebări în limbaj firesc cu viziunea ChatGPT.",
        widget: "document-viewer",
        free: true,
      },
      {
        key: "prepare_filing_pack",
        tagline: "Schelet de contestație pre-completat",
        returns:
          "Va genera un schelet de contestație pre-completat, ca punct de plecare pentru depunere la ANSC: top-5 temeiuri cu scor de tărie, calendar procedural, scrisoare-tip în română, listă de probe, precedente citate și o estimare orientativă a șanselor. (În pregătire — vezi nota de mai jos.)",
        widget: "filing-pack-viewer",
        free: false,
      },
    ],
  },
  widgets: {
    heading: "Widgeturi interactive",
    intro:
      "Răspunsurile nu sunt blocuri de text, ci 14 widgeturi interactive: carduri de tender, cronologii, scoruri de integritate, radar de semnale roșii, agende de ședințe, dashboarduri de profil, tabele de comparație, vizualizator de documente, grafuri de relații, hărți termice CPV și vizualizator de pachet de contestație.",
    modesNote:
      "Fiecare widget funcționează în trei moduri: Inline în conversație, Fullscreen pentru detaliu și Picture-in-Picture ca să-l ții la vedere în timp ce continui discuția.",
  },
  personas: {
    heading: "Pentru cine este",
    intro:
      "Aceleași date deschise, întrebări diferite. Cinci profiluri, fiecare cu un prompt real de copiat și lipit în ChatGPT.",
    items: [
      {
        id: "journalist",
        title: "Jurnalistul de investigație",
        blurb:
          "Urmărește banul public: contracte suspecte, monopoluri de facto, firmele „de casă” ale primăriilor și deciziile ANSC răsturnate în instanță.",
        why: "Are nevoie de probe rapide, vizuale și verificabile, fără să fie expert în OCDS. CONTender îi dă semnalele și profilurile în câteva propoziții, iar tierul civic îi oferă pachetele gratuit.",
        prompt:
          "Scanează ultimele 200 de tendere și deciziile ANSC din 2026 pentru semnale roșii. Apoi fă-mi profilul furnizorului care apare cel mai des în atribuirile cu un singur ofertant.",
      },
      {
        id: "lawyer",
        title: "Avocatul / juristul",
        blurb: "Reprezintă un operator care contestă o atribuire sau o autoritate care se apără.",
        why: "Are nevoie de termene exacte, temei legal corect citat și un draft de la care să pornească. Cronologia îi spune câte zile mai are; pachetul de contestație îi dă scrisoarea-tip.",
        prompt:
          "Construiește cronologia procedurii ocds-b3wdp1-MD-… și spune-mi câte zile mai am ca să depun contestație și pe ce articol.",
      },
      {
        id: "supplier",
        title: "Operatorul economic",
        blurb:
          "O firmă care licitează: vrea să-și înțeleagă poziția de piață, să evalueze concurenții și să decidă dacă o pierdere merită contestată.",
        why: "Verifică o autoritate înainte de a licita și calculează dacă un caz stă în picioare. Regula de aur: scor de integritate mic plus termen încă deschis înseamnă un caz care merită depus.",
        prompt:
          "Care e scorul de integritate al tenderului … și mai sunt în termen să contest? Dacă da, pregătește pachetul ca challenger.",
      },
      {
        id: "authority",
        title: "Autoritatea contractantă",
        blurb:
          "Un responsabil de achiziții sau un auditor intern care își auto-evaluează propriile proceduri.",
        why: "Vrea să anticipeze contestațiile și să-și pregătească apărarea. Filosofia: rulează aceleași analize pe care le-ar rula un contestatar, înainte ca el să o facă.",
        prompt:
          "Calculează scorul de integritate pentru OCID și explică-mi fiecare factor care îl trage în jos.",
      },
      {
        id: "civilSociety",
        title: "Societatea civilă / cercetătorul",
        blurb:
          "Un ONG de monitorizare, un cercetător sau un student la drept care studiază tipare sistemice, nu cazuri izolate.",
        why: "Beneficiază de tierul civic și de agregare: corelează categorii de cheltuieli cu riscul pe ani întregi. Fondul Buy-One-Give-Ten îi acoperă pachetele.",
        prompt:
          "Heatmap CPV pe 2025 (top 200) și un radar de semnale roșii pentru același an — vreau să corelez categoriile cu riscul.",
      },
    ],
  },
  legal: {
    heading: "Ancorat în lege",
    intro:
      "Termenele sunt calculate pe baza datelor disponibile și a regimului legal aplicabil, iar temeiurile sunt citate structural: etichetă, articol, rezumat, sursă și data intrării în vigoare (articolele se încarcă la pornire). CONTender comută automat între regimuri în funcție de data procedurii.",
    currentTitle:
      "Legea 20/2026 — privind remediile și căile de atac în achizițiile publice (regimul curent)",
    currentPoints: [
      "art. 19 — termen de contestare: 10 zile (mijloace electronice) sau 15 zile (alte mijloace) de la luarea la cunoștință; fără re-depunere.",
      "art. 20 — termen de așteptare (standstill): 11 zile (electronic) sau 16 zile; contractele semnate mai devreme sunt nule.",
      "art. 23 — soluțiile ANSC: admite (integral sau parțial) ori respinge ca neîntemeiată, putând dispune măsuri de remediere.",
    ],
    oldTitle:
      "Legea 131/2015 — privind achizițiile publice (regimul vechi, abrogat parțial din 01.04.2026)",
    oldPoints: [
      "art. 79–86 — vechea procedură de contestare, cu fereastră de 5 zile.",
      "art. 19 (eligibilitatea operatorului), art. 25 (lista de interdicție, 3 ani), art. 71 (anularea procedurii).",
    ],
    note: "Regula de regim: procedurile începute după 01.04.2026 intră sub Legea 20/2026 (depunere 10 zile, standstill 11 zile); cele anterioare rămân sub Legea 131/2015 (5 zile). Cronologia și pachetul de contestație comută regimul automat.",
  },
  pricing: {
    heading: "Preț",
    intro:
      "Parcursul de citire și investigare, adică 99% din utilizare, nu cere niciodată cont sau autentificare.",
    betaNote:
      "Aplicația este în fază de testare (preview), în Developer mode pe ChatGPT. Acum totul este gratuit, inclusiv pachetul de contestație. Prețul de 5 USD, tierul civic și Buy-One-Give-Ten descriu modelul planificat după lansarea oficială — nu sunt active încă.",
    freeTitle: "Gratuit și anonim",
    freeDesc:
      "Tot ce ține de citire, audit, scoruri, semnale roșii, profiluri și cronologii este gratuit și anonim. Fără cont, fără autentificare.",
    paidTitle: "Pachetul de contestație — 5 USD (planificat)",
    paidDesc:
      "După lansarea oficială, singurul instrument care va costa va fi prepare_filing_pack: 5 USD o singură dată, aproximativ 1% din onorariul unui avocat, cu rambursare în 7 zile. Acum, în testare, este gratuit.",
    civicTitle: "Gratuit pentru uz civic (planificat)",
    civicDesc:
      "În modelul planificat, jurnaliștii de investigație înregistrați, ONG-urile, cadrele academice și studenții la drept vor primi pachetele gratuit, dintr-un fond comun de credite civice.",
    giveTitle: "Buy-One-Give-Ten (planificat)",
    giveDesc:
      "Model planificat: fiecare pachet plătit va adăuga de 10 ori credite civice în fondul comun — o cumpărare „dăruiește” zece pachete civice gratuite.",
  },
  setup: {
    heading: "Cum îl adaugi în ChatGPT",
    intro:
      "Fără instalare și fără cod. Funcționează pe ChatGPT gratuit sau plătit, iar odată adăugat pe desktop apare și pe telefon. La final, conexiunea se face fără autentificare (No Auth).",
    betaNote:
      "Adăugarea se face prin Developer mode pentru că aplicația este în fază de testare (preview) și nu este încă publicată în directorul oficial OpenAI. Pașii de mai jos sunt normali pentru această etapă.",
    timeNote: "~3 minute, fără instalare",
    urlLabel: "Adresa pe care o lipești la pasul 5",
    steps: [
      {
        title: "Deschide setările de Apps",
        detail:
          "În ChatGPT (chatgpt.com), apasă pe numele/avatarul tău → Settings → din meniul din stânga, Apps (numit și „Apps & Connectors”).",
      },
      {
        title: "Intră în Advanced settings",
        detail: "În secțiunea Apps, derulează până la „Advanced settings” și deschide-o.",
      },
      {
        title: "Activează Developer mode",
        detail:
          "Pornește „Developer mode” (toggle-ul devine albastru). Apare „ELEVATED RISK” — avertismentul standard pentru orice aplicație adăugată manual. „Enforce CSP” este un setting ChatGPT separat; în faza de testare prin Developer mode îl lași pe OFF, iar CONTender are oricum o politică CSP strictă definită la nivel de widget.",
      },
      {
        title: "Apasă Create app",
        detail: "Apasă „Create app” în partea de sus a paginii.",
      },
      {
        title: "Completează formularul New App",
        detail:
          "Name = Contender; Description = „Asistent AI pentru integritatea achizițiilor publice din Moldova.”; Connection = Server URL; URL = adresa de mai sus (https://contender.yoda.digital/mcp); Authentication = No Auth; bifează „I understand and want to continue” și apasă Create. Apoi, într-un chat nou, „+” → More → Contender și pune o întrebare.",
      },
    ],
  },
  faq: {
    heading: "Întrebări frecvente",
    items: [
      {
        q: "Trebuie să plătesc ca să-l folosesc?",
        a: "Acum, în faza de testare, absolut tot este gratuit — inclusiv pachetul de contestație. Modelul cu un singur instrument plătit (5 USD), tierul civic și Buy-One-Give-Ten sunt planificate pentru după lansarea oficială; momentan nu sunt active.",
      },
      {
        q: "Pachetul de contestație ține loc de avocat?",
        a: "Nu. Pachetul este un draft informativ, un punct de plecare — nu consultanță juridică. Verifică-l întotdeauna cu un jurist înainte de a-l depune la ANSC. În plus, instrumentul este încă în pregătire în această fază de testare.",
      },
      {
        q: "Este sigur? De ce mă avertizează ChatGPT?",
        a: "CONTender funcționează doar în citire (read-only): interoghează surse publice — MTender și ANSC — și nu modifică nimic la sursă, deci îl poți rula de oricâte ori. Avertismentul „ELEVATED RISK” apare pentru orice aplicație adăugată manual în modul dezvoltator; nu este specific CONTender.",
      },
      {
        q: "Funcționează pe telefon?",
        a: "Da. Odată adăugat pe desktop, apare automat și în aplicația ChatGPT de pe telefon. Widgeturile funcționează inline, în fullscreen și în Picture-in-Picture.",
      },
      {
        q: "În ce limbi răspunde?",
        a: "În română, rusă și engleză. Fiecare instrument funcționează în toate trei; româna este limba implicită dacă nu alegi alta. Scrisoarea-tip din pachetul de contestație rămâne în română indiferent de limba aleasă.",
      },
      {
        q: "Îmi stochează datele?",
        a: "Parcursul de citire și investigare este anonim și nu cere cont. CONTender nu deține date proprii: orchestrează doar sursele publice MTender și ANSC. Creditele de acces sunt în memorie și se resetează la repornire.",
      },
      {
        q: "De unde știu că cifrele sunt corecte?",
        a: "Datele vin direct din MTender (OCDS 1.1.5) și ANSC, iar termenele și temeiurile juridice sunt citate structural, cu articol și sursă. Scorul de integritate este determinist, calculat din factori, nu ghicit, deci poate fi verificat la sursă.",
      },
      {
        q: "Ce fac dacă nu văd butonul Create app?",
        a: "Asigură-te că ai deschis „Advanced settings” în secțiunea Apps și că ai pornit „Developer mode” (toggle-ul devine albastru). „Create app” apare în partea de sus a paginii doar după activarea modului dezvoltator.",
      },
      {
        q: "Pot folosi documentele mele?",
        a: "Da. Poți încărca un PDF direct în ChatGPT, iar CONTender îl analizează cu același motor de extragere ca pentru documentele oficiale, expunându-l ca text și imagini per pagină pentru întrebări în limbaj firesc.",
      },
    ],
  },
  builtBy: {
    heading: "Cine l-a construit",
    story:
      "CONTender este primul ChatGPT App din și pentru Republica Moldova, construit pe OpenAI Apps SDK peste protocolul MCP. L-au făcut două case moldovenești cu competențe complementare: un studio de inginerie AI-nativă și un integrator gov-tech cu experiență. Ingineria de agenți a unuia se sprijină pe cunoașterea sistemelor publice a celuilalt.",
    yodaRole:
      "Yoda Digital (yoda.digital) — studio de infrastructură AI-nativă și inginerie civic-tech. Întreține cele două servere open-source pe care stă CONTender, ansc-mcp-server și mtender-mcp-server, care împachetează sursele oficiale ca servicii MCP. Pentru că sunt open-source, stratul de integritate este auditabil și reutilizabil, nu o cutie neagră.",
    esemplaRole:
      "esempla systems (esempla.com) — companie gov-tech din Chișinău, activă din 2009, care construiește platforme de e-guvernare și interoperabilitate de date pentru statul moldovenesc. A dezvoltat e-licitatie.md, una dintre platformele de tranzacționare ale sistemului MTender, și a asigurat interoperabilitatea acestuia cu alte registre de stat; tot ei au livrat eApostille, eIntegrity (declarații de avere și interese) și eGuarantee. Această experiență tehnică în gov-tech dă context relevant — însă CONTender folosește exclusiv surse publice și nu are acces privilegiat la date.",
    creatorName: "Ion Calmîș",
    creatorRole: "CTO la Yoda Digital",
    firstAppNote:
      "Primul ChatGPT App din Republica Moldova (după informațiile publice disponibile la momentul publicării): o echipă mică a ajuns pe o suprafață globală de distribuție nou-nouță în același moment cu toți ceilalți și a plantat acolo civic-tech.",
  },
  resources: {
    heading: "Documentație și ghiduri",
    intro:
      "Tot ce ai nevoie ca să înțelegi și să folosești CONTender, în PDF-uri gata de descărcat: ghidul de instalare pas cu pas, documentația completă a capabilităților și cinci scenarii reale, câte unul pentru fiecare profil.",
    downloadLabel: "Descarcă PDF",
    guidesLabel: "Ghiduri",
    scenariosLabel: "Scenarii pe profil",
    items: [
      {
        title: "Ghid pas cu pas pentru ChatGPT",
        desc: "Cum adaugi aplicația în ChatGPT în câteva minute, cu imagini. Nivel începător, fără termeni complicați.",
      },
      {
        title: "Capabilități complete",
        desc: "Toate instrumentele, widgeturile, prompturile și baza legală, explicate pe scurt și pe înțeles.",
      },
      {
        title: "Jurnalistul de investigație",
        desc: "Semnale roșii, profiluri de furnizor și grafuri de relații — probe vizuale în secunde.",
      },
      {
        title: "Avocatul / juristul",
        desc: "Termene exacte, bază legală citată corect și un draft de contestație ca punct de plecare.",
      },
      {
        title: "Operatorul economic",
        desc: "Poziția pe piață, evaluarea concurenței și decizia de a contesta, bazate pe date.",
      },
      {
        title: "Autoritatea contractantă",
        desc: "Auto-evaluare proactivă: rulează analizele unui contestatar înainte să o facă el.",
      },
      {
        title: "Societatea civilă / cercetătorul",
        desc: "Analiză sistemică pe ani întregi, agregare și tierul civic pentru pachete gratuite.",
      },
    ],
  },
  closing: {
    heading: "Datele sunt deja deschise. Pune-le întrebări.",
    body: "Moldova publică achizițiile prin MTender în standardul OCDS și soluționează contestațiile prin ANSC, un fundament de date neobișnuit de deschis pentru regiune. Dar datele deschise valorează cât întrebările pe care le poți pune. CONTender le face accesibile oricui, în română, rusă sau engleză — fără să fii expert și fără să plătești un avocat ca să începi.",
    ctaLabel: "Adaugă CONTender în ChatGPT",
  },
  partners: {
    yoda: "Yoda Digital",
    esempla: "esempla systems",
    inPartnership: "în parteneriat cu",
  },
};

contenderCopy.en = {
  meta: {
    title: "CONTender: AI for Moldova Public Procurement",
    description:
      "The first ChatGPT App from Moldova for public-procurement integrity. MTender and ANSC in one conversation: integrity scores, red flags, appeals.",
    keywords: [
      "Moldova public procurement AI",
      "public procurement integrity Moldova",
      "procurement integrity assistant",
      "MTender data analysis",
      "ANSC appeals Moldova",
      "procurement integrity score",
      "public procurement red flags",
      "ChatGPT app Moldova procurement",
    ],
  },
  hero: {
    eyebrow: "The first ChatGPT App from the Republic of Moldova",
    betaTag: "Beta · in testing",
    h1: "CONTender — public-procurement integrity, right inside ChatGPT",
    lead: "CONTender brings together Moldova's two official public-procurement sources, MTender and ANSC, in a single conversation. You ask in plain language, and the answer comes back as an interactive widget with the data already combined and computed. 99% of the path is free and anonymous: no account, and it never alters anything at the source.",
    ctaPrimary: "Add to ChatGPT",
    ctaSecondary: "See what it can do",
    mtenderTag: "MTender · OCDS",
    anscTag: "ANSC · appeals",
  },
  trustStrip: [
    "99% free and anonymous",
    "Read-only, never edits",
    "Trilingual: RO / RU / EN",
    "Law-anchored",
    "One paid tool: $5",
    "Free for civic use",
  ],
  stats: [
    { value: "2", label: "official sources united" },
    { value: "15", label: "data tools" },
    { value: "14", label: "interactive widgets" },
    { value: "5", label: "shortcut commands" },
  ],
  whatItIs: {
    heading: "One question, both databases",
    paragraphs: [
      "Moldova's public-procurement data lives in two separate systems: the procedure lifecycle in MTender and the appeals in ANSC. To connect a tender with an appeal, you normally open two portals and reconcile two formats by hand. CONTender does it in a single sentence: it queries both sources in the background, combines them, computes, and shows you the result.",
      "CONTender owns no data of its own. It only orchestrates the two official public sources, which means any figure can be checked against the source. It works in Romanian, Russian and English, with Romanian as the default. Legal terms and the reasons behind red flags are anchored in real law articles, loaded at startup and cited structurally; the model invents no legal basis.",
      "It runs inside ChatGPT, on the OpenAI Apps SDK over the MCP protocol. It is not a separate website or a standalone chatbot: it is an app that answers in the conversation and draws interactive widgets.",
    ],
    mtenderName: "MTender",
    mtenderDesc:
      "The procurement lifecycle in the open OCDS 1.1.5 standard: planning, tender, award, contract and amendments. Source: mtender.gov.md.",
    anscName: "ANSC",
    anscDesc:
      'Agenția Națională pentru Soluționarea Contestațiilor — the administrative "tribunal" of procurement: appeals, decisions, hearings and suspension orders. Source: ansc.md.',
  },
  howItWorks: {
    heading: "How it works",
    intro:
      "CONTender exposes four kinds of capability. Some answer directly; others chain: one tool computes the data, another draws it.",
    types: [
      {
        n: "1",
        name: "Data tools",
        count: "15",
        desc: "Query both sources, combine and compute: tender audit, integrity score, red-flag radar, timelines with legal deadlines. Some render directly, others pair with a display tool.",
      },
      {
        n: "2",
        name: "Display tools",
        count: "5",
        desc: "show_audit, show_red_flags, show_buyer_profile, show_supplier_profile, show_document. They receive data from a data tool and draw it in a widget. They compute nothing; they are always the final step in a chain.",
      },
      {
        n: "3",
        name: "Raw (proxy) tools",
        count: "29",
        desc: "At startup, CONTender discovers and re-exposes every source tool exactly as it is: 12 from ANSC and 17 from MTender. Direct, granular access to the raw APIs, for very precise questions.",
      },
      {
        n: "4",
        name: "Shortcut commands",
        count: "5",
        desc: "Predefined Romanian conversational commands that launch a tool and format the answer cleanly: audit, timeline, integrity, redflags, hearings.",
      },
    ],
    chainNote:
      'The "decoupled" model separates computation from rendering: a data tool produces the result, and a show_* tool displays it. That is why some actions mean two chained calls, for example audit_tender sending its data to show_audit, which draws it in the procurement-timeline widget.',
  },
  capabilities: {
    heading: "What it can do",
    intro:
      "Fifteen data tools, all free in this testing phase. Below, ten of them; the rest are in the full documentation below.",
    filingDisclaimer:
      "The appeal pack it generates is an informative draft, not legal advice. It is a starting point, to be checked by a lawyer before filing. The tool is still in preparation and not active yet.",
    tools: [
      {
        key: "audit_tender",
        tagline: "Full audit of one tender",
        returns:
          "An end-to-end audit of a tender: the entire OCDS lifecycle plus every associated ANSC appeal, decision and suspension.",
        widget: "procurement-timeline",
        free: true,
      },
      {
        key: "integrity_score",
        tagline: "Integrity score, 0 to 100",
        returns:
          "A composite score from 0 to 100, computed from ANSC signals: appeal rate, court suspensions and annulments, decision severity. A high score means a clean procedure; a low score flags risk (100 = no risk detected). Deterministic, not guessed; MTender data is context and does not enter the score.",
        widget: "integrity-score-card",
        free: true,
      },
      {
        key: "red_flag_radar",
        tagline: "Red-flag radar",
        returns:
          "Scans recent data for anomalies: single-bidder awards, ANSC decisions suspended or annulled in court, ordered by severity.",
        widget: "red-flag-radar",
        free: true,
      },
      {
        key: "procurement_timeline",
        tagline: "Timeline with legal deadlines",
        returns:
          "The unified chronology of the procedure plus the computed legal deadlines: filing window, response window, days remaining and the legal basis.",
        widget: "procurement-timeline",
        free: true,
      },
      {
        key: "adversarial_network",
        tagline: "Relationship graph from appeals",
        returns:
          "Builds a relationship graph from a seed actor: nodes for buyers, suppliers, challengers and panels, edges for appeals. It shows who contested whom.",
        widget: "adversarial-graph",
        free: true,
      },
      {
        key: "cpv_heatmap",
        tagline: "Heatmap by CPV category",
        returns:
          "Samples a year of tenders, extracts the CPV code and value, then aggregates by category: tender count, total value and appeal rate.",
        widget: "cpv-heatmap",
        free: true,
      },
      {
        key: "compare",
        tagline: "Compare A against B",
        returns:
          "Compares two tenders side by side (title, authority, value, status, method, appeals and decisions) and highlights differences and suspicious patterns.",
        widget: "comparison-table",
        free: true,
      },
      {
        key: "buyer_profile",
        tagline: "Contracting authority profile",
        returns:
          "Aggregates for one contracting authority: number of tenders, total spend and appeals received.",
        widget: "profile-dashboard",
        free: true,
      },
      {
        key: "document_intelligence",
        tagline: "Ask questions of an official PDF",
        returns:
          "Downloads a PDF (an ANSC decision or an MTender tender document) and exposes it as text plus per-page images, for plain-language questions using ChatGPT vision.",
        widget: "document-viewer",
        free: true,
      },
      {
        key: "prepare_filing_pack",
        tagline: "Pre-filled appeal-pack draft",
        returns:
          "Will generate a pre-filled appeal-pack draft as a starting point for filing at ANSC: top-5 grounds with strength scores, a procedural calendar, a Romanian draft letter, an evidence checklist, cited precedents and a rough success estimate. (In preparation — see the note below.)",
        widget: "filing-pack-viewer",
        free: false,
      },
    ],
  },
  widgets: {
    heading: "Interactive widgets",
    intro:
      "Answers are not blocks of text but 14 interactive widgets: tender cards, timelines, integrity scores, red-flag radar, hearing agendas, profile dashboards, comparison tables, a document viewer, relationship graphs, CPV heatmaps and an appeal-pack viewer.",
    modesNote:
      "Each widget works in three modes: Inline in the conversation, Fullscreen for detail, and Picture-in-Picture so you can keep it in view while the discussion continues.",
  },
  personas: {
    heading: "Who it is for",
    intro:
      "The same open data, different questions. Five profiles, each with a real prompt to copy and paste into ChatGPT.",
    items: [
      {
        id: "journalist",
        title: "The investigative journalist",
        blurb:
          'Follows public money: suspicious contracts, de-facto monopolies, the councils\' "house" firms, and ANSC decisions overturned in court.',
        why: "Needs fast, visual, verifiable evidence without being an OCDS expert. CONTender delivers the signals and profiles in a few sentences, and the civic tier covers the packs for free.",
        prompt:
          "Scan the last 200 tenders and the 2026 ANSC decisions for red flags. Then build me the profile of the supplier that shows up most often in single-bidder awards.",
      },
      {
        id: "lawyer",
        title: "The lawyer / legal counsel",
        blurb: "Represents an operator contesting an award, or an authority defending one.",
        why: "Needs exact deadlines, a correctly cited legal basis and a draft to start from. The timeline tells you how many days you have left; the appeal pack gives you the draft letter.",
        prompt:
          "Build the timeline for procedure ocds-b3wdp1-MD-… and tell me how many days I have left to file an appeal and on which article.",
      },
      {
        id: "supplier",
        title: "The economic operator",
        blurb:
          "A bidding firm that wants to understand its market position, size up competitors and decide whether a loss is worth contesting.",
        why: "Vets an authority before bidding and works out whether a case holds up. The golden rule: a low integrity score plus a still-open window means a case worth filing.",
        prompt:
          "What is the integrity score of tender … and am I still within the window to contest? If so, prepare the pack as challenger.",
      },
      {
        id: "authority",
        title: "The contracting authority",
        blurb: "A procurement officer or internal auditor self-assessing their own procedures.",
        why: "Wants to anticipate appeals and prepare a defense. The philosophy: run the same analyses a challenger would run, before they do.",
        prompt: "Compute the integrity score for OCID and explain each factor that drags it down.",
      },
      {
        id: "civilSociety",
        title: "Civil society / the researcher",
        blurb:
          "A monitoring NGO, a researcher or a law student studying systemic patterns rather than isolated cases.",
        why: "Benefits from the civic tier and from aggregation: correlating spending categories with risk across whole years. The Buy-One-Give-Ten fund covers the packs.",
        prompt:
          "CPV heatmap for 2025 (top 200) and a red-flag radar for the same year — I want to correlate the categories with the risk.",
      },
    ],
  },
  legal: {
    heading: "Anchored in law",
    intro:
      "Deadlines are computed from the available data and the applicable legal regime, and the grounds are cited structurally: label, article, summary, source and in-force date (the articles load at startup). CONTender switches automatically between regimes based on the procedure's date.",
    currentTitle:
      "Law 20/2026 — on remedies and means of appeal in public procurement (the current regime)",
    currentPoints: [
      "art. 19 — appeal term: 10 days (electronic means) or 15 days (other means) from becoming aware; no re-filing.",
      "art. 20 — standstill (await) term: 11 days (electronic) or 16 days; contracts signed earlier are void.",
      "art. 23 — ANSC solutions: admits the appeal (fully or partially) or rejects it as unfounded, and may order remedial measures.",
    ],
    oldTitle:
      "Law 131/2015 — on public procurement (the old regime, partially repealed from 01.04.2026)",
    oldPoints: [
      "art. 79–86 — the old appeals procedure, with a 5-day window.",
      "art. 19 (operator eligibility), art. 25 (interdiction list, 3 years), art. 71 (annulment of the procedure).",
    ],
    note: "The regime rule: procedures started after 01.04.2026 fall under Law 20/2026 (10-day filing, 11-day standstill); earlier ones remain under Law 131/2015 (5 days). The timeline and the appeal pack switch regime automatically.",
  },
  pricing: {
    heading: "Price",
    intro:
      "The reading and investigation path, which is 99% of use, never requires an account or sign-in.",
    betaNote:
      "The app is in a testing phase (preview), in Developer mode on ChatGPT. Right now everything is free, including the appeal pack. The $5 price, the civic tier and Buy-One-Give-Ten describe the model planned for after the official launch — they are not active yet.",
    freeTitle: "Free and anonymous",
    freeDesc:
      "Everything to do with reading, audits, scores, red flags, profiles and timelines is free and anonymous. No account, no sign-in.",
    paidTitle: "The appeal pack — $5 (planned)",
    paidDesc:
      "After the official launch, the only tool that will cost anything is prepare_filing_pack: $5 one time, roughly 1% of a lawyer's fee, refundable within 7 days. For now, in testing, it is free.",
    civicTitle: "Free for civic use (planned)",
    civicDesc:
      "In the planned model, registered investigative journalists, NGOs, academics and law students will receive the packs for free, from a shared pool of civic credits.",
    giveTitle: "Buy-One-Give-Ten (planned)",
    giveDesc:
      'A planned model: every paid pack will add 10× civic credits to the common fund — one purchase "gifts" ten free civic packs.',
  },
  setup: {
    heading: "How to add it to ChatGPT",
    intro:
      "No install and no code. It works on free or paid ChatGPT, and once added on desktop it appears on your phone too. At the end, the connection is made with no sign-in (No Auth).",
    betaNote:
      "You add it through Developer mode because the app is still in a testing phase (preview) and not yet published in OpenAI's official directory. The steps below are normal for this stage.",
    timeNote: "~3 minutes, no install",
    urlLabel: "The address you paste at step 5",
    steps: [
      {
        title: "Open the Apps settings",
        detail:
          'In ChatGPT (chatgpt.com), click your name/avatar → Settings → in the left menu, Apps (also called "Apps & Connectors").',
      },
      {
        title: "Go to Advanced settings",
        detail: 'In the Apps section, scroll down to "Advanced settings" and open it.',
      },
      {
        title: "Turn on Developer mode",
        detail:
          'Switch on "Developer mode" (the toggle turns blue). "ELEVATED RISK" appears — the standard warning for any manually added app. "Enforce CSP" is a separate ChatGPT setting; during testing via Developer mode you leave it OFF, and CONTender ships a strict widget-level CSP anyway.',
      },
      {
        title: "Click Create app",
        detail: 'Click "Create app" at the top of the page.',
      },
      {
        title: "Fill in the New App form",
        detail:
          'Name = Contender; Description = "Asistent AI pentru integritatea achizițiilor publice din Moldova."; Connection = Server URL; URL = the address above (https://contender.yoda.digital/mcp); Authentication = No Auth; tick "I understand and want to continue" and click Create. Then, in a new chat, "+" → More → Contender and ask a question.',
      },
    ],
  },
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        q: "Do I have to pay to use it?",
        a: "Right now, in the testing phase, everything is free — including the appeal pack. The single-paid-tool model ($5), the civic tier and Buy-One-Give-Ten are planned for after the official launch; they are not active yet.",
      },
      {
        q: "Does the appeal pack replace a lawyer?",
        a: "No. The pack is an informative draft, a starting point — not legal advice. Always check it with a lawyer before filing it at ANSC. On top of that, the tool is still in preparation during this testing phase.",
      },
      {
        q: "Is it safe? Why does ChatGPT warn me?",
        a: 'CONTender is read-only: it queries public sources — MTender and ANSC — and changes nothing at the source, so you can run it as many times as you like. The "ELEVATED RISK" warning appears for any app added manually in developer mode; it is not specific to CONTender.',
      },
      {
        q: "Does it work on a phone?",
        a: "Yes. Once added on desktop, it appears automatically in the ChatGPT app on your phone. The widgets work inline, in fullscreen and in Picture-in-Picture.",
      },
      {
        q: "Which languages does it answer in?",
        a: "Romanian, Russian and English. Every tool works in all three; Romanian is the default if you do not pick another. The draft letter in the appeal pack stays in Romanian regardless of the language chosen.",
      },
      {
        q: "Does it store my data?",
        a: "The reading and investigation path is anonymous and requires no account. CONTender owns no data of its own: it only orchestrates the public MTender and ANSC sources. Access credits are held in memory and reset on restart.",
      },
      {
        q: "How do I know the figures are correct?",
        a: "The data comes straight from MTender (OCDS 1.1.5) and ANSC, and legal deadlines and grounds are cited structurally, with article and source. The integrity score is deterministic, computed from factors rather than guessed, so it can be checked against the source.",
      },
      {
        q: "What if I don't see the Create app button?",
        a: 'Make sure you have opened "Advanced settings" in the Apps section and turned on "Developer mode" (the toggle turns blue). "Create app" only appears at the top of the page once developer mode is on.',
      },
      {
        q: "Can I use my own documents?",
        a: "Yes. You can upload a PDF straight into ChatGPT, and CONTender analyzes it with the same extraction engine it uses for official documents, exposing it as text and per-page images for plain-language questions.",
      },
    ],
  },
  builtBy: {
    heading: "Who built it",
    story:
      "CONTender is the first ChatGPT App from and for the Republic of Moldova, built on the OpenAI Apps SDK over the MCP protocol. It was made by two Moldovan houses with complementary skills: an AI-native engineering studio and a long-standing gov-tech integrator. One side's agent engineering rests on the other's knowledge of how public systems are actually wired.",
    yodaRole:
      "Yoda Digital (yoda.digital) — an AI-native infrastructure and civic-tech engineering studio. It maintains the two open-source servers CONTender stands on, ansc-mcp-server and mtender-mcp-server, which wrap the official sources as MCP services. Because they are open source, the integrity layer is auditable and reusable, not a black box.",
    esemplaRole:
      "esempla systems (esempla.com) — a Chișinău gov-tech company, active since 2009, building e-government platforms and data interoperability for the Moldovan state. It developed e-licitatie.md, one of the trading platforms on the MTender system, and wired MTender's interoperability with other state registries; it also delivered eApostille, eIntegrity (asset and interest declarations) and eGuarantee. That hands-on gov-tech experience gives relevant context — but CONTender uses only public sources and has no privileged access to data.",
    creatorName: "Ion Calmîș",
    creatorRole: "CTO at Yoda Digital",
    firstAppNote:
      "The first ChatGPT App from the Republic of Moldova (to the best of public knowledge at the time of writing): a small team reached a brand-new global distribution surface at the same moment as everyone else and planted civic-tech there.",
  },
  resources: {
    heading: "Documentation and guides",
    intro:
      "Everything you need to understand and use CONTender, as ready-to-download PDFs: the step-by-step setup guide, the full capability documentation, and five real scenarios — one for each profile.",
    downloadLabel: "Download PDF",
    guidesLabel: "Guides",
    scenariosLabel: "Scenarios by profile",
    items: [
      {
        title: "Step-by-step ChatGPT guide",
        desc: "How to add the app to ChatGPT in a few minutes, with screenshots. Beginner level, no jargon.",
      },
      {
        title: "Full capabilities",
        desc: "Every tool, widget, prompt and the legal corpus, explained briefly and in plain language.",
      },
      {
        title: "The investigative journalist",
        desc: "Red flags, supplier profiles and relationship graphs — visual evidence in seconds.",
      },
      {
        title: "The lawyer / legal counsel",
        desc: "Exact deadlines, a correctly cited legal basis, and a draft appeal pack to start from.",
      },
      {
        title: "The economic operator",
        desc: "Market position, competitor sizing, and the decision to contest — grounded in data.",
      },
      {
        title: "The contracting authority",
        desc: "Proactive self-assessment: run a challenger's analyses before they do.",
      },
      {
        title: "Civil society / the researcher",
        desc: "Systemic analysis across whole years, aggregation, and the civic tier for free packs.",
      },
    ],
  },
  closing: {
    heading: "The data is already open. Ask it questions.",
    body: "Moldova publishes its procurement through MTender in the OCDS standard and resolves appeals through ANSC, a data foundation unusually open for the region. But open data is worth only as much as the questions you can ask of it. CONTender puts those questions in reach of anyone, in Romanian, Russian or English — no expertise required, and no lawyer needed to begin.",
    ctaLabel: "Add CONTender to ChatGPT",
  },
  partners: {
    yoda: "Yoda Digital",
    esempla: "esempla systems",
    inPartnership: "in partnership with",
  },
};

contenderCopy.ru = {
  meta: {
    title: "CONTender: ИИ для госзакупок Молдовы",
    description:
      "Первое приложение ChatGPT из Молдовы для добросовестности госзакупок. Объединяет MTender и ANSC в одном диалоге: оценка добросовестности, красные флаги, обжалование.",
    keywords: [
      "госзакупки Молдова ИИ",
      "добросовестность госзакупок Молдова",
      "ИИ-ассистент госзакупки",
      "анализ MTender",
      "обжалование ANSC Молдова",
      "оценка добросовестности закупок",
      "красные флаги госзакупок",
      "приложение ChatGPT госзакупки Молдова",
    ],
  },
  hero: {
    eyebrow: "Первое приложение ChatGPT из Республики Молдова",
    betaTag: "Бета · в тестировании",
    h1: "CONTender — добросовестность госзакупок прямо в ChatGPT",
    lead: "CONTender объединяет два официальных источника данных о госзакупках Молдовы, MTender и ANSC, в одном диалоге. Вы спрашиваете на обычном языке, а ответ приходит интерактивным виджетом, с уже сведёнными и рассчитанными данными. 99% работы бесплатны и анонимны: аккаунт не нужен, и ничего не изменяется в источнике.",
    ctaPrimary: "Добавить в ChatGPT",
    ctaSecondary: "Посмотреть возможности",
    mtenderTag: "MTender · OCDS",
    anscTag: "ANSC · обжалование",
  },
  trustStrip: [
    "99% бесплатно и анонимно",
    "Только чтение, без изменений",
    "Три языка: RO / RU / EN",
    "Опирается на закон",
    "Один платный инструмент: 5 USD",
    "Бесплатно для гражданского сектора",
  ],
  stats: [
    { value: "2", label: "объединённых официальных источника" },
    { value: "15", label: "инструментов данных" },
    { value: "14", label: "интерактивных виджетов" },
    { value: "5", label: "быстрых команд" },
  ],
  whatItIs: {
    heading: "Один вопрос — обе базы данных",
    paragraphs: [
      "Данные о госзакупках Молдовы хранятся в двух отдельных системах: ход процедуры в MTender и обжалования в ANSC. Чтобы сопоставить тендер с жалобой, обычно приходится открывать два портала и вручную сводить два разных формата. CONTender делает это в одном предложении: запрашивает оба источника в фоне, объединяет данные, рассчитывает и показывает результат.",
      "CONTender не владеет собственными данными. Он лишь связывает воедино два публичных официальных источника, а значит любую цифру можно проверить у первоисточника. Работает на румынском, русском и английском, румынский — язык по умолчанию. Юридические термины и основания для красных флагов опираются на реальные статьи закона, которые загружаются при запуске и цитируются структурно; модель не выдумывает правовые основания.",
      "Приложение работает внутри ChatGPT, на OpenAI Apps SDK поверх протокола MCP. Это не отдельный сайт и не самостоятельный чат-бот: это приложение, которое отвечает прямо в диалоге и рисует интерактивные виджеты.",
    ],
    mtenderName: "MTender",
    mtenderDesc:
      "Жизненный цикл закупки в открытом стандарте OCDS 1.1.5: планирование, тендер, присуждение, контракт и изменения. Источник: mtender.gov.md.",
    anscName: "ANSC",
    anscDesc:
      "Национальное агентство по разрешению обжалований (Agenția Națională pentru Soluționarea Contestațiilor) — административный «трибунал» по госзакупкам: жалобы, решения, заседания и постановления о приостановлении. Источник: ansc.md.",
  },
  howItWorks: {
    heading: "Как это работает",
    intro:
      "CONTender предоставляет четыре типа возможностей. Одни отвечают сразу, другие выстраиваются в цепочку: один инструмент рассчитывает данные, другой их рисует.",
    types: [
      {
        n: "1",
        name: "Инструменты данных",
        count: "15",
        desc: "Запрашивают оба источника, объединяют и считают: аудит тендера, оценка добросовестности, радар красных флагов, хронологии с расчётом юридических сроков. Часть рисует результат сама, часть передаёт его инструменту отображения.",
      },
      {
        n: "2",
        name: "Инструменты отображения",
        count: "5",
        desc: "show_audit, show_red_flags, show_buyer_profile, show_supplier_profile, show_document. Получают данные от инструмента данных и рисуют их в виджете. Ничего не вычисляют; это всегда финальный шаг цепочки.",
      },
      {
        n: "3",
        name: "Сырые инструменты (proxy)",
        count: "29",
        desc: "При запуске CONTender обнаруживает и заново публикует каждый инструмент источников ровно как есть: 12 от ANSC и 17 от MTender. Прямой гранулярный доступ к исходным API для очень точных запросов.",
      },
      {
        n: "4",
        name: "Быстрые команды",
        count: "5",
        desc: "Готовые разговорные команды на румынском, которые запускают инструмент и аккуратно форматируют ответ: audit, timeline, integrity, redflags, hearings.",
      },
    ],
    chainNote:
      "«Разделённая» модель отделяет вычисление от отрисовки: инструмент данных выдаёт результат, а инструмент show_* его отображает. Поэтому некоторые действия означают два вызова в цепочке — например, audit_tender передаёт данные в show_audit, который рисует их в виджете procurement-timeline.",
  },
  capabilities: {
    heading: "Что он умеет",
    intro:
      "Пятнадцать инструментов данных, все бесплатны в этой фазе тестирования. Ниже десять из них; остальные — в полной документации ниже.",
    filingDisclaimer:
      "Формируемый пакет жалобы — это информативный черновик, а не юридическая консультация. Это отправная точка, которую нужно проверить у юриста перед подачей. Инструмент пока в подготовке и ещё не активен.",
    tools: [
      {
        key: "audit_tender",
        tagline: "Полный аудит тендера",
        returns:
          "Сквозной аудит тендера: весь цикл OCDS плюс все связанные с ним жалобы, решения и приостановления ANSC.",
        widget: "procurement-timeline",
        free: true,
      },
      {
        key: "integrity_score",
        tagline: "Оценка добросовестности 0–100",
        returns:
          "Сводная оценка от 0 до 100, рассчитанная по сигналам ANSC: доля обжалований, судебные приостановления и аннулирования, тяжесть решений. Высокая оценка = чистая процедура; низкая = сигналы риска (100 = риск не выявлен). Детерминированная, не угаданная; данные MTender дают контекст и не входят в оценку.",
        widget: "integrity-score-card",
        free: true,
      },
      {
        key: "red_flag_radar",
        tagline: "Радар красных флагов",
        returns:
          "Сканирует свежие данные на аномалии: присуждения с единственным участником, решения ANSC, приостановленные или отменённые судом, по убыванию тяжести.",
        widget: "red-flag-radar",
        free: true,
      },
      {
        key: "procurement_timeline",
        tagline: "Хронология с юридическими сроками",
        returns:
          "Единая хронология процедуры плюс рассчитанные юридические сроки: окно подачи, окно ответа, оставшиеся дни и правовое основание.",
        widget: "procurement-timeline",
        free: true,
      },
      {
        key: "adversarial_network",
        tagline: "Граф связей по обжалованиям",
        returns:
          "Строит граф связей от заданного участника: узлы — закупающие органы, поставщики, заявители и составы, рёбра — обжалования. Показывает, кто кого обжаловал.",
        widget: "adversarial-graph",
        free: true,
      },
      {
        key: "cpv_heatmap",
        tagline: "Тепловая карта категорий CPV",
        returns:
          "Выбирает год тендеров, извлекает код CPV и стоимость, затем агрегирует по категориям: число тендеров, общую стоимость и долю обжалований.",
        widget: "cpv-heatmap",
        free: true,
      },
      {
        key: "compare",
        tagline: "Сравнение A против B",
        returns:
          "Сравнивает два тендера лицом к лицу (наименование, орган, стоимость, статус, метод, жалобы и решения) и подсвечивает различия и подозрительные закономерности.",
        widget: "comparison-table",
        free: true,
      },
      {
        key: "buyer_profile",
        tagline: "Профиль закупающего органа",
        returns:
          "Агрегирует данные по закупающему органу: число тендеров, суммарные расходы и полученные жалобы.",
        widget: "profile-dashboard",
        free: true,
      },
      {
        key: "document_intelligence",
        tagline: "Вопросы по официальному PDF",
        returns:
          "Скачивает PDF (решение ANSC или тендерный документ MTender) и выдаёт его как текст плюс изображения по страницам для вопросов на обычном языке с распознаванием ChatGPT.",
        widget: "document-viewer",
        free: true,
      },
      {
        key: "prepare_filing_pack",
        tagline: "Предзаполненный черновик жалобы",
        returns:
          "Сформирует предзаполненный черновик жалобы как отправную точку для подачи в ANSC: топ-5 оснований с оценкой силы, процедурный календарь, письмо-шаблон на румынском, перечень доказательств, цитируемые прецеденты и ориентировочную оценку шансов. (В подготовке — см. примечание ниже.)",
        widget: "filing-pack-viewer",
        free: false,
      },
    ],
  },
  widgets: {
    heading: "Интерактивные виджеты",
    intro:
      "Ответы — это не блоки текста, а 14 интерактивных виджетов: карточки тендеров, хронологии, оценки добросовестности, радар красных флагов, повестки заседаний, дашборды профилей, таблицы сравнения, просмотрщик документов, графы связей, тепловые карты CPV и просмотрщик пакета жалобы.",
    modesNote:
      "Каждый виджет работает в трёх режимах: Inline прямо в диалоге, Fullscreen для деталей и Picture-in-Picture, чтобы держать его перед глазами, пока продолжаете обсуждение.",
  },
  personas: {
    heading: "Для кого это",
    intro:
      "Одни и те же открытые данные, разные вопросы. Пять профилей, у каждого реальный промпт, который можно скопировать и вставить в ChatGPT.",
    items: [
      {
        id: "journalist",
        title: "Журналист-расследователь",
        blurb:
          "Следит за публичными деньгами: подозрительные контракты, фактические монополии, «карманные» фирмы примэрий и решения ANSC, отменённые в суде.",
        why: "Ему нужны быстрые, наглядные и проверяемые доказательства без экспертизы в OCDS. CONTender выдаёт сигналы и профили в несколько предложений, а гражданский тариф даёт пакеты бесплатно.",
        prompt:
          "Просканируй последние 200 тендеров и решения ANSC за 2026 год на красные флаги. Потом составь профиль поставщика, который чаще всего фигурирует в присуждениях с единственным участником.",
      },
      {
        id: "lawyer",
        title: "Адвокат / юрист",
        blurb: "Представляет оператора, обжалующего присуждение, или орган, который защищается.",
        why: "Ему нужны точные сроки, корректно процитированное правовое основание и черновик, от которого можно оттолкнуться. Хронология показывает, сколько дней осталось; пакет жалобы даёт письмо-шаблон.",
        prompt:
          "Построй хронологию процедуры ocds-b3wdp1-MD-… и скажи, сколько дней у меня осталось, чтобы подать жалобу, и по какой статье.",
      },
      {
        id: "supplier",
        title: "Экономический оператор",
        blurb:
          "Фирма-участник: хочет понять свою позицию на рынке, оценить конкурентов и решить, стоит ли обжаловать проигрыш.",
        why: "Проверяет орган перед участием в тендере и оценивает, есть ли основания для дела. Золотое правило: низкая оценка добросовестности плюс ещё открытый срок означают дело, которое стоит подать.",
        prompt:
          "Какова оценка добросовестности тендера … и успеваю ли я ещё подать жалобу? Если да, подготовь пакет как для заявителя.",
      },
      {
        id: "authority",
        title: "Закупающий орган",
        blurb:
          "Специалист по закупкам или внутренний аудитор, который сам проверяет собственные процедуры.",
        why: "Хочет предвидеть обжалования и подготовить защиту. Философия: запусти тот же анализ, который запустит заявитель, раньше, чем это сделает он.",
        prompt:
          "Рассчитай оценку добросовестности для OCID и объясни мне каждый фактор, который тянет её вниз.",
      },
      {
        id: "civilSociety",
        title: "Гражданское общество / исследователь",
        blurb:
          "Мониторинговое НКО, исследователь или студент-юрист, изучающий системные закономерности, а не отдельные случаи.",
        why: "Пользуется гражданским тарифом и агрегацией: связывает категории расходов с риском по целым годам. Пакеты покрываются фондом Buy-One-Give-Ten.",
        prompt:
          "Тепловая карта CPV за 2025 год (топ-200) и радар красных флагов за тот же год — хочу соотнести категории с риском.",
      },
    ],
  },
  legal: {
    heading: "Опирается на закон",
    intro:
      "Сроки рассчитываются по доступным данным и применимому правовому режиму, а основания цитируются структурно: метка, статья, краткое содержание, источник и дата вступления в силу (статьи загружаются при запуске). CONTender автоматически переключается между режимами в зависимости от даты процедуры.",
    currentTitle:
      "Закон 20/2026 — о средствах правовой защиты и способах обжалования в сфере госзакупок (действующий режим)",
    currentPoints: [
      "ст. 19 — срок обжалования: 10 дней (электронные средства) или 15 дней (иные средства) со дня, когда стало известно; повторная подача не допускается.",
      "ст. 20 — срок ожидания (standstill): 11 дней (электронно) или 16 дней; контракты, подписанные раньше, ничтожны.",
      "ст. 23 — решения ANSC: удовлетворяет (полностью или частично) либо отклоняет как необоснованную, может предписать меры по устранению нарушений.",
    ],
    oldTitle: "Закон 131/2015 — о госзакупках (прежний режим, частично отменён с 01.04.2026)",
    oldPoints: [
      "ст. 79–86 — прежняя процедура обжалования с окном в 5 дней.",
      "ст. 19 (правоспособность оператора), ст. 25 (реестр недобросовестных поставщиков, 3 года), ст. 71 (аннулирование процедуры).",
    ],
    note: "Правило режима: процедуры, начатые после 01.04.2026, подпадают под Закон 20/2026 (подача 10 дней, standstill 11 дней); более ранние остаются под Законом 131/2015 (5 дней). Хронология и пакет жалобы переключают режим автоматически.",
  },
  pricing: {
    heading: "Цена",
    intro:
      "Путь чтения и расследования, то есть 99% использования, никогда не требует аккаунта или авторизации.",
    betaNote:
      "Приложение находится в фазе тестирования (preview), в режиме Developer mode в ChatGPT. Сейчас всё бесплатно, включая пакет жалобы. Цена 5 USD, гражданский тариф и Buy-One-Give-Ten описывают модель, запланированную после официального запуска, — они ещё не активны.",
    freeTitle: "Бесплатно и анонимно",
    freeDesc:
      "Всё, что связано с чтением, аудитом, оценками, красными флагами, профилями и хронологиями, бесплатно и анонимно. Без аккаунта, без авторизации.",
    paidTitle: "Пакет жалобы — 5 USD (планируется)",
    paidDesc:
      "После официального запуска единственным платным инструментом станет prepare_filing_pack: 5 USD единоразово, примерно 1% от гонорара адвоката, с возвратом средств в течение 7 дней. Сейчас, в тестировании, он бесплатен.",
    civicTitle: "Бесплатно для гражданского сектора (планируется)",
    civicDesc:
      "В планируемой модели зарегистрированные журналисты-расследователи, НКО, академические сотрудники и студенты-юристы будут получать пакеты бесплатно из общего фонда гражданских кредитов.",
    giveTitle: "Buy-One-Give-Ten (планируется)",
    giveDesc:
      "Планируемая модель: каждый оплаченный пакет будет добавлять в общий фонд десятикратный объём гражданских кредитов — одна покупка «дарит» десять бесплатных гражданских пакетов.",
  },
  setup: {
    heading: "Как добавить в ChatGPT",
    intro:
      "Без установки и без кода. Работает на бесплатном или платном ChatGPT, и однажды добавленное на компьютере появляется и в телефоне. Подключение в конце выполняется без авторизации (No Auth).",
    betaNote:
      "Добавление выполняется через Developer mode, потому что приложение пока в фазе тестирования (preview) и ещё не опубликовано в официальном каталоге OpenAI. Шаги ниже нормальны для этого этапа.",
    timeNote: "~3 минуты, без установки",
    urlLabel: "Адрес, который вы вставляете на шаге 5",
    steps: [
      {
        title: "Откройте настройки Apps",
        detail:
          "В ChatGPT (chatgpt.com) нажмите на ваше имя/аватар → Settings → в левом меню Apps (он же «Apps & Connectors»).",
      },
      {
        title: "Зайдите в Advanced settings",
        detail: "В разделе Apps прокрутите до «Advanced settings» и откройте его.",
      },
      {
        title: "Включите Developer mode",
        detail:
          "Включите «Developer mode» (переключатель станет синим). Появится «ELEVATED RISK» — стандартное предупреждение для любого приложения, добавленного вручную. «Enforce CSP» — это отдельная настройка ChatGPT; в фазе тестирования через Developer mode оставьте её OFF, а у CONTender в любом случае есть строгая CSP-политика на уровне виджета.",
      },
      {
        title: "Нажмите Create app",
        detail: "Нажмите «Create app» в верхней части страницы.",
      },
      {
        title: "Заполните форму New App",
        detail:
          "Name = Contender; Description = «Asistent AI pentru integritatea achizițiilor publice din Moldova.»; Connection = Server URL; URL = адрес выше (https://contender.yoda.digital/mcp); Authentication = No Auth; отметьте «I understand and want to continue» и нажмите Create. Затем в новом чате «+» → More → Contender и задайте вопрос.",
      },
    ],
  },
  faq: {
    heading: "Частые вопросы",
    items: [
      {
        q: "Нужно ли платить, чтобы пользоваться?",
        a: "Сейчас, в фазе тестирования, всё бесплатно — включая пакет жалобы. Модель с единственным платным инструментом (5 USD), гражданский тариф и Buy-One-Give-Ten запланированы на период после официального запуска; пока они не активны.",
      },
      {
        q: "Заменяет ли пакет жалобы адвоката?",
        a: "Нет. Пакет — это информативный черновик, отправная точка, а не юридическая консультация. Всегда проверяйте его у юриста перед подачей в ANSC. К тому же инструмент пока в подготовке в этой фазе тестирования.",
      },
      {
        q: "Это безопасно? Почему ChatGPT меня предупреждает?",
        a: "CONTender работает только на чтение (read-only): он запрашивает публичные источники — MTender и ANSC — и ничего не меняет в источнике, поэтому запускать его можно сколько угодно раз. Предупреждение «ELEVATED RISK» появляется для любого приложения, добавленного вручную в режиме разработчика; оно не относится конкретно к CONTender.",
      },
      {
        q: "Работает ли на телефоне?",
        a: "Да. Однажды добавленное на компьютере, приложение автоматически появляется и в ChatGPT на телефоне. Виджеты работают inline, в полноэкранном режиме и в Picture-in-Picture.",
      },
      {
        q: "На каких языках он отвечает?",
        a: "На румынском, русском и английском. Каждый инструмент работает на всех трёх; румынский — язык по умолчанию, если вы не выбрали другой. Письмо-шаблон в пакете жалобы остаётся на румынском независимо от выбранного языка.",
      },
      {
        q: "Хранит ли он мои данные?",
        a: "Путь чтения и расследования анонимен и не требует аккаунта. CONTender не владеет собственными данными: он лишь связывает воедино публичные источники MTender и ANSC. Кредиты доступа хранятся в памяти и сбрасываются при перезапуске.",
      },
      {
        q: "Откуда мне знать, что цифры верны?",
        a: "Данные приходят напрямую из MTender (OCDS 1.1.5) и ANSC, а сроки и правовые основания цитируются структурно, со статьёй и источником. Оценка добросовестности детерминирована, рассчитана из факторов, а не угадана, и может быть проверена у первоисточника.",
      },
      {
        q: "Что делать, если я не вижу кнопку Create app?",
        a: "Убедитесь, что вы открыли «Advanced settings» в разделе Apps и включили «Developer mode» (переключатель стал синим). «Create app» появляется в верхней части страницы только после включения режима разработчика.",
      },
      {
        q: "Могу ли я использовать свои документы?",
        a: "Да. Вы можете загрузить PDF прямо в ChatGPT, и CONTender проанализирует его тем же движком извлечения, что и официальные документы, выдав его как текст и изображения по страницам для вопросов на обычном языке.",
      },
    ],
  },
  builtBy: {
    heading: "Кто его построил",
    story:
      "CONTender — первое приложение ChatGPT из и для Республики Молдова, построенное на OpenAI Apps SDK поверх протокола MCP. Его создали два молдавских коллектива со взаимодополняющими компетенциями: студия AI-нативной инженерии и опытный gov-tech-интегратор. Агентная инженерия одного опирается на знание того, как на самом деле устроены государственные системы, у другого.",
    yodaRole:
      "Yoda Digital (yoda.digital) — студия AI-нативной инфраструктуры и civic-tech-инженерии. Поддерживает два open-source-сервера, на которых стоит CONTender, ansc-mcp-server и mtender-mcp-server, которые упаковывают официальные источники как MCP-сервисы. Поскольку они open-source, слой добросовестности можно проверять и переиспользовать, это не чёрный ящик.",
    esemplaRole:
      "esempla systems (esempla.com) — gov-tech-компания из Кишинёва, работающая с 2009 года, которая строит платформы электронного правительства и интероперабельность данных для молдавского государства. Она разработала e-licitatie.md — одну из торговых площадок системы MTender — и обеспечила её взаимодействие с другими государственными реестрами; ею же реализованы eApostille, eIntegrity (декларации об имуществе и интересах) и eGuarantee. Этот технический опыт в gov-tech даёт релевантный контекст — но CONTender использует только публичные источники и не имеет привилегированного доступа к данным.",
    creatorName: "Ион Калмыш",
    creatorRole: "CTO в Yoda Digital",
    firstAppNote:
      "Первое приложение ChatGPT из Республики Молдова (по публично доступным сведениям на момент публикации): небольшая команда вышла на совершенно новую глобальную площадку распространения одновременно со всеми остальными и поставила там civic-tech.",
  },
  resources: {
    heading: "Документация и руководства",
    intro:
      "Всё, что нужно, чтобы понять и использовать CONTender, в готовых к скачиванию PDF: пошаговое руководство по установке, полная документация возможностей и пять реальных сценариев — по одному на каждый профиль.",
    downloadLabel: "Скачать PDF",
    guidesLabel: "Руководства",
    scenariosLabel: "Сценарии по профилям",
    items: [
      {
        title: "Пошаговое руководство для ChatGPT",
        desc: "Как добавить приложение в ChatGPT за несколько минут, со скриншотами. Начальный уровень, без сложных терминов.",
      },
      {
        title: "Полные возможности",
        desc: "Все инструменты, виджеты, промпты и правовая база, объяснённые кратко и понятно.",
      },
      {
        title: "Журналист-расследователь",
        desc: "Красные флаги, профили поставщиков и графы связей — наглядные доказательства за секунды.",
      },
      {
        title: "Адвокат / юрист",
        desc: "Точные сроки, корректно процитированное правовое основание и черновик пакета жалобы как отправную точку.",
      },
      {
        title: "Экономический оператор",
        desc: "Позиция на рынке, оценка конкурентов и решение об обжаловании — на основе данных.",
      },
      {
        title: "Закупающий орган",
        desc: "Проактивная самопроверка: запустите анализ заявителя раньше, чем это сделает он.",
      },
      {
        title: "Гражданское общество / исследователь",
        desc: "Системный анализ за целые годы, агрегация и гражданский тариф для бесплатных пакетов.",
      },
    ],
  },
  closing: {
    heading: "Данные уже открыты. Задавайте им вопросы.",
    body: "Молдова публикует госзакупки через MTender в стандарте OCDS и разрешает обжалования через ANSC — необычно открытый фундамент данных для региона. Но открытые данные стоят ровно столько, сколько вопросов вы можете им задать. CONTender делает эти вопросы доступными каждому — на румынском, русском или английском, без экспертизы и без адвоката, чтобы начать.",
    ctaLabel: "Добавить CONTender в ChatGPT",
  },
  partners: {
    yoda: "Yoda Digital",
    esempla: "esempla systems",
    inPartnership: "в партнёрстве с",
  },
};

/** Featured promo for the home page — CONTender gets top billing. */
export const contenderHomeFeature: Record<
  Locale,
  { eyebrow: string; title: string; desc: string; cta: string; tagFree: string; tagSources: string }
> = {
  ro: {
    eyebrow: "Beta · Primul ChatGPT App din Moldova",
    title: "CONTender — integritatea achizițiilor publice, în ChatGPT",
    desc: "Unește MTender și ANSC într-o singură conversație: scor de integritate, semnale roșii, cronologii cu termene legale și schelet de contestație. Gratuit și anonim în faza de testare.",
    cta: "Descoperă CONTender",
    tagFree: "Gratuit în beta",
    tagSources: "MTender + ANSC",
  },
  en: {
    eyebrow: "Beta · The first ChatGPT App from Moldova",
    title: "CONTender — public-procurement integrity, in ChatGPT",
    desc: "MTender and ANSC united in one conversation: integrity scores, red flags, timelines with legal deadlines, and a draft appeal pack. Free and anonymous during testing.",
    cta: "Discover CONTender",
    tagFree: "Free in beta",
    tagSources: "MTender + ANSC",
  },
  ru: {
    eyebrow: "Бета · Первое приложение ChatGPT из Молдовы",
    title: "CONTender — добросовестность госзакупок, в ChatGPT",
    desc: "MTender и ANSC в одном диалоге: оценка добросовестности, красные флаги, хронологии с юридическими сроками и черновик пакета жалобы. Бесплатно и анонимно в фазе тестирования.",
    cta: "Открыть CONTender",
    tagFree: "Бесплатно в бете",
    tagSources: "MTender + ANSC",
  },
};

// ── Standalone doc pages (privacy + scoring methodology) ─────────────────────
// Plain prose, anchored strictly in the CONTender server code. Rendered by
// ContenderDocPage.astro. One entry per locale.
export interface ContenderDocSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}
export interface ContenderDoc {
  meta: { title: string; description: string };
  eyebrow: string;
  h1: string;
  updatedLabel: string;
  intro: string;
  sections: ContenderDocSection[];
  backLabel: string;
}

export const contenderPrivacy: Record<Locale, ContenderDoc> = {
  ro: {
    meta: {
      title: "Confidențialitate · CONTender",
      description:
        "Politica de confidențialitate a aplicației CONTender: fără cont, fără persistență, doar citire. Ancorat în codul serverului MCP.",
    },
    eyebrow: "CONTender · Confidențialitate",
    h1: "Politica de confidențialitate",
    updatedLabel: "Actualizat: 6 iunie 2026",
    intro:
      "CONTender este o aplicație ChatGPT (server MCP) pentru integritatea achizițiilor publice. Această politică descrie exact ce face serverul, conform codului sursă — nimic în plus.",
    sections: [
      {
        heading: "Pe scurt",
        bullets: [
          "Fără cont și fără autentificare pentru parcursul de citire (No Auth).",
          "Fără persistență: nicio bază de date, nicio scriere pe disc. Totul stă în memorie și se resetează la repornire.",
          "Doar citire: interoghează surse publice și nu modifică nimic la sursă.",
        ],
      },
      {
        heading: "Cont și autentificare",
        paragraphs: [
          "Modul implicit este „No Auth”: nu se creează niciun cont de utilizator și nu se cere autentificare. O identitate stabilă (subject) este folosită doar pentru un eventual instrument plătit și provine din contextul oferit de host (ChatGPT), nu dintr-un cont CONTender. Autentificarea OAuth există în cod, dar este opțională și inactivă în această fază.",
        ],
      },
      {
        heading: "Ce stocăm",
        paragraphs: [
          "Nimic persistent. Nu există bază de date și nu se scrie pe disc. Stările aplicației sunt strict în memorie și dispar la repornirea serverului:",
        ],
        bullets: [
          "Drepturile/creditele pentru pachetul de contestație — într-o structură în memorie (cu fereastră de rambursare de 7 zile).",
          "Registrul „uz civic” și contorul Buy-One-Give-Ten — variabile în memorie.",
          "Cache pentru datele oficiale: MTender (TTL ~10 minute) și ANSC (LRU), ambele în memorie, pentru a evita re-interogarea acelorași înregistrări.",
        ],
      },
      {
        heading: "Jurnalizare (logging)",
        paragraphs: [
          "Serverul scrie jurnale operaționale doar la stderr (fără fișier, fără bază de date). Acestea pot include numele instrumentului apelat, argumentele apelului, un identificator de sesiune și metadate despre rezultat. Retenția jurnalelor nu este definită în aplicație — depinde de mediul de găzduire (container/host).",
        ],
      },
      {
        heading: "Servicii terțe",
        paragraphs: [
          "Serverul comunică doar cu sursele oficiale ale achizițiilor publice: MTender (public.mtender.gov.md, storage.mtender.gov.md) și ANSC (ansc.md / elo.ansc.md). La acestea se adaugă ChatGPT ca platformă-gazdă și Stripe — dar numai dacă plata este configurată (inactivă în faza curentă). Nu există analytics sau telemetrie de la terți în server.",
        ],
      },
      {
        heading: "Documente încărcate",
        paragraphs: [
          "Când analizezi un document, serverul primește un URL (pentru fișierele încărcate în ChatGPT, URL-ul este obținut de widget). Conținutul este descărcat și extras în memorie (text + imagini per pagină), apoi returnat. Serverul nu stochează fișierul și nu îl scrie pe disc.",
        ],
      },
      {
        heading: "Acest site",
        paragraphs: [
          "Pagina pe care o citești acum (opensource.yoda.digital) folosește Google Analytics în mod agregat, doar după ce accepți cookie-urile. Aceasta este o măsurătoare a site-ului și este complet separată de serverul MCP al aplicației CONTender.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Întrebări despre confidențialitate: dev.ungheni@gmail.com (Ion Calmîș, Yoda Digital).",
        ],
      },
    ],
    backLabel: "Înapoi la CONTender",
  },
  en: {
    meta: {
      title: "Privacy · CONTender",
      description:
        "CONTender's privacy policy: no account, no persistence, read-only. Anchored in the MCP server's source code.",
    },
    eyebrow: "CONTender · Privacy",
    h1: "Privacy policy",
    updatedLabel: "Updated: 6 June 2026",
    intro:
      "CONTender is a ChatGPT App (MCP server) for public-procurement integrity. This policy describes exactly what the server does, per its source code — nothing more.",
    sections: [
      {
        heading: "In short",
        bullets: [
          "No account and no sign-in for the reading path (No Auth).",
          "No persistence: no database, no disk writes. Everything is in memory and resets on restart.",
          "Read-only: it queries public sources and changes nothing at the source.",
        ],
      },
      {
        heading: "Account and authentication",
        paragraphs: [
          'The default mode is "No Auth": no user account is created and no sign-in is required. A stable identity (subject) is used only for a possible paid tool and comes from the host (ChatGPT) context, not from a CONTender account. OAuth exists in the code but is optional and inactive in this phase.',
        ],
      },
      {
        heading: "What we store",
        paragraphs: [
          "Nothing persistent. There is no database and nothing is written to disk. Application state is strictly in memory and disappears when the server restarts:",
        ],
        bullets: [
          "Entitlements/credits for the appeal pack — in an in-memory store (with a 7-day refund window).",
          "The civic-use ledger and the Buy-One-Give-Ten counter — in-memory variables.",
          "Caches for the official data: MTender (~10-minute TTL) and ANSC (LRU), both in memory, to avoid re-fetching the same records.",
        ],
      },
      {
        heading: "Logging",
        paragraphs: [
          "The server writes operational logs to stderr only (no file, no database). These may include the called tool's name, the call arguments, a session identifier, and result metadata. Log retention is not defined in the application — it depends on the hosting environment (container/host).",
        ],
      },
      {
        heading: "Third-party services",
        paragraphs: [
          "The server talks only to the official procurement sources: MTender (public.mtender.gov.md, storage.mtender.gov.md) and ANSC (ansc.md / elo.ansc.md). Add to that ChatGPT as the host platform and Stripe — but only if payment is configured (inactive in the current phase). There is no third-party analytics or telemetry in the server.",
        ],
      },
      {
        heading: "Uploaded documents",
        paragraphs: [
          "When you analyze a document, the server receives a URL (for files uploaded into ChatGPT, the URL is resolved by the widget). The content is downloaded and extracted in memory (text + per-page images), then returned. The server does not store the file and never writes it to disk.",
        ],
      },
      {
        heading: "This website",
        paragraphs: [
          "The page you are reading now (opensource.yoda.digital) uses Google Analytics in aggregate, only after you accept cookies. That is website measurement and is entirely separate from the CONTender app's MCP server.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: ["Privacy questions: dev.ungheni@gmail.com (Ion Calmîș, Yoda Digital)."],
      },
    ],
    backLabel: "Back to CONTender",
  },
  ru: {
    meta: {
      title: "Конфиденциальность · CONTender",
      description:
        "Политика конфиденциальности CONTender: без аккаунта, без хранения, только чтение. Опирается на исходный код MCP-сервера.",
    },
    eyebrow: "CONTender · Конфиденциальность",
    h1: "Политика конфиденциальности",
    updatedLabel: "Обновлено: 6 июня 2026",
    intro:
      "CONTender — это приложение ChatGPT (MCP-сервер) для добросовестности госзакупок. Эта политика описывает ровно то, что делает сервер согласно исходному коду, — не больше.",
    sections: [
      {
        heading: "Коротко",
        bullets: [
          "Без аккаунта и без авторизации для пути чтения (No Auth).",
          "Без хранения: нет базы данных, нет записи на диск. Всё в памяти и сбрасывается при перезапуске.",
          "Только чтение: запрашивает публичные источники и ничего не меняет в источнике.",
        ],
      },
      {
        heading: "Аккаунт и аутентификация",
        paragraphs: [
          "Режим по умолчанию — «No Auth»: аккаунт пользователя не создаётся и авторизация не требуется. Стабильный идентификатор (subject) используется только для возможного платного инструмента и приходит из контекста хоста (ChatGPT), а не из аккаунта CONTender. OAuth есть в коде, но он опционален и неактивен в этой фазе.",
        ],
      },
      {
        heading: "Что мы храним",
        paragraphs: [
          "Ничего постоянного. Базы данных нет, на диск ничего не пишется. Состояние приложения строго в памяти и исчезает при перезапуске сервера:",
        ],
        bullets: [
          "Права/кредиты на пакет жалобы — в хранилище в памяти (с окном возврата 7 дней).",
          "Реестр «гражданского использования» и счётчик Buy-One-Give-Ten — переменные в памяти.",
          "Кэш официальных данных: MTender (TTL ~10 минут) и ANSC (LRU), оба в памяти, чтобы не запрашивать одни и те же записи повторно.",
        ],
      },
      {
        heading: "Логирование",
        paragraphs: [
          "Сервер пишет операционные логи только в stderr (без файла, без базы данных). Они могут включать имя вызванного инструмента, аргументы вызова, идентификатор сессии и метаданные результата. Срок хранения логов в приложении не задан — он зависит от среды хостинга (контейнер/хост).",
        ],
      },
      {
        heading: "Сторонние сервисы",
        paragraphs: [
          "Сервер обращается только к официальным источникам закупок: MTender (public.mtender.gov.md, storage.mtender.gov.md) и ANSC (ansc.md / elo.ansc.md). К ним добавляются ChatGPT как хост-платформа и Stripe — но только если оплата настроена (в текущей фазе неактивна). Сторонней аналитики или телеметрии в сервере нет.",
        ],
      },
      {
        heading: "Загруженные документы",
        paragraphs: [
          "При анализе документа сервер получает URL (для файлов, загруженных в ChatGPT, URL определяет виджет). Содержимое скачивается и извлекается в памяти (текст + изображения по страницам), затем возвращается. Сервер не хранит файл и не записывает его на диск.",
        ],
      },
      {
        heading: "Этот сайт",
        paragraphs: [
          "Страница, которую вы сейчас читаете (opensource.yoda.digital), использует Google Analytics в агрегированном виде и только после вашего согласия на cookie. Это измерение сайта, и оно полностью отделено от MCP-сервера приложения CONTender.",
        ],
      },
      {
        heading: "Контакт",
        paragraphs: [
          "Вопросы по конфиденциальности: dev.ungheni@gmail.com (Ион Калмыш, Yoda Digital).",
        ],
      },
    ],
    backLabel: "Назад к CONTender",
  },
};

export const contenderMethodology: Record<Locale, ContenderDoc> = {
  ro: {
    meta: {
      title: "Metodologia scorului de integritate · CONTender",
      description:
        "Cum se calculează scorul de integritate CONTender: 4 factori, ponderi, formule, praguri. Determinist, doar din date ANSC.",
    },
    eyebrow: "CONTender · Metodologie",
    h1: "Cum se calculează scorul de integritate",
    updatedLabel: "Actualizat: 6 iunie 2026",
    intro:
      "Scorul de integritate (0–100) este determinist și verificabil. Aici este formula exactă din codul serverului. Scor mare = procedură curată; scor mic = semnale de risc.",
    sections: [
      {
        heading: "Ce măsoară",
        paragraphs: [
          "Un scor compozit de la 0 la 100 pentru o procedură. 100 înseamnă niciun factor de risc detectat în datele disponibile; un scor mic înseamnă că au fost detectate semnale (contestații, suspendări sau anulări în instanță, decizii severe).",
        ],
      },
      {
        heading: "Cei patru factori și ponderile",
        bullets: [
          "Contestații (appeals) — pondere 0,25.",
          "Suspendări de către instanță (court_suspensions) — pondere 0,30.",
          "Anulări de către instanță (court_reversals) — pondere 0,20.",
          "Severitatea deciziilor (decision_content) — pondere 0,25.",
        ],
      },
      {
        heading: "Sub-scoruri (fiecare limitat la 0–100)",
        bullets: [
          "Contestații = 100 − (număr contestații × 20)",
          "Suspendări în instanță = 100 − (număr suspendări × 50)",
          "Anulări în instanță = 100 − (număr anulări × 50)",
          "Decizii severe = 100 − (număr decizii severe × 25)",
          "Decizii „severe” = ProcedureCanceled, ProcedurePartiallyCanceled, RemedialMeasures, ComplaintUpheld, ComplaintPartiallyUpheld.",
        ],
      },
      {
        heading: "Agregare și praguri",
        paragraphs: [
          "Scorul final = rotunjirea sumei (sub-scor × pondere) pentru cei patru factori.",
        ],
        bullets: [
          "≥ 80 → curat (high)",
          "50–79 → mediu (medium)",
          "< 50 → risc (low)",
          "100 = niciun risc detectat.",
        ],
      },
      {
        heading: "Sursă și determinism",
        paragraphs: [
          "Toți cei patru factori provin exclusiv din ANSC (contestații, decizii, suspendări/anulări în instanță). Datele MTender oferă context, dar nu intră în scor. Calculul este pur aritmetic: aceeași intrare produce mereu același rezultat, fără AI și fără aleatoriu.",
        ],
      },
      {
        heading: "Limitări (transparent)",
        bullets: [
          "Dacă apelurile către ANSC eșuează parțial, listele rămân goale, iar scorul tinde spre 100 — cu o notă despre eroare în rezultat. Citește întotdeauna notele.",
          "Scorul reflectă doar ce există în datele ANSC, nu calitatea intrinsecă a procedurii.",
          "Aplicația este în fază de testare; metodologia poate evolua.",
        ],
      },
    ],
    backLabel: "Înapoi la CONTender",
  },
  en: {
    meta: {
      title: "Integrity-score methodology · CONTender",
      description:
        "How CONTender computes its integrity score: 4 factors, weights, formulas, thresholds. Deterministic, ANSC data only.",
    },
    eyebrow: "CONTender · Methodology",
    h1: "How the integrity score is computed",
    updatedLabel: "Updated: 6 June 2026",
    intro:
      "The integrity score (0–100) is deterministic and verifiable. Here is the exact formula from the server's code. A high score means a clean procedure; a low score flags risk.",
    sections: [
      {
        heading: "What it measures",
        paragraphs: [
          "A composite score from 0 to 100 for a procedure. 100 means no risk factor detected in the available data; a low score means signals were detected (appeals, court suspensions or annulments, severe decisions).",
        ],
      },
      {
        heading: "The four factors and their weights",
        bullets: [
          "Appeals — weight 0.25.",
          "Court suspensions — weight 0.30.",
          "Court reversals (annulments) — weight 0.20.",
          "Decision severity (decision_content) — weight 0.25.",
        ],
      },
      {
        heading: "Sub-scores (each clamped to 0–100)",
        bullets: [
          "Appeals = 100 − (appeal count × 20)",
          "Court suspensions = 100 − (suspension count × 50)",
          "Court reversals = 100 − (reversal count × 50)",
          "Severe decisions = 100 − (severe-decision count × 25)",
          '"Severe" decisions = ProcedureCanceled, ProcedurePartiallyCanceled, RemedialMeasures, ComplaintUpheld, ComplaintPartiallyUpheld.',
        ],
      },
      {
        heading: "Aggregation and thresholds",
        paragraphs: [
          "Final score = the rounded sum of (sub-score × weight) across the four factors.",
        ],
        bullets: [
          "≥ 80 → clean (high)",
          "50–79 → medium",
          "< 50 → risk (low)",
          "100 = no risk detected.",
        ],
      },
      {
        heading: "Source and determinism",
        paragraphs: [
          "All four factors come exclusively from ANSC (appeals, decisions, court suspensions/annulments). MTender data provides context but does not enter the score. The computation is pure arithmetic: the same input always yields the same result, with no AI and no randomness.",
        ],
      },
      {
        heading: "Limitations (stated plainly)",
        bullets: [
          "If the ANSC calls partially fail, the lists stay empty and the score tends toward 100 — with an error note in the result. Always read the notes.",
          "The score reflects only what exists in the ANSC data, not the intrinsic quality of the procedure.",
          "The app is in a testing phase; the methodology may evolve.",
        ],
      },
    ],
    backLabel: "Back to CONTender",
  },
  ru: {
    meta: {
      title: "Методология оценки добросовестности · CONTender",
      description:
        "Как CONTender вычисляет оценку добросовестности: 4 фактора, веса, формулы, пороги. Детерминированно, только данные ANSC.",
    },
    eyebrow: "CONTender · Методология",
    h1: "Как вычисляется оценка добросовестности",
    updatedLabel: "Обновлено: 6 июня 2026",
    intro:
      "Оценка добросовестности (0–100) детерминирована и проверяема. Здесь — точная формула из кода сервера. Высокая оценка = чистая процедура; низкая = сигналы риска.",
    sections: [
      {
        heading: "Что измеряется",
        paragraphs: [
          "Сводная оценка от 0 до 100 для процедуры. 100 означает, что в доступных данных не выявлено факторов риска; низкая оценка означает, что обнаружены сигналы (жалобы, судебные приостановления или аннулирования, тяжёлые решения).",
        ],
      },
      {
        heading: "Четыре фактора и их веса",
        bullets: [
          "Жалобы (appeals) — вес 0,25.",
          "Судебные приостановления (court_suspensions) — вес 0,30.",
          "Судебные аннулирования (court_reversals) — вес 0,20.",
          "Тяжесть решений (decision_content) — вес 0,25.",
        ],
      },
      {
        heading: "Под-оценки (каждая ограничена 0–100)",
        bullets: [
          "Жалобы = 100 − (число жалоб × 20)",
          "Судебные приостановления = 100 − (число приостановлений × 50)",
          "Судебные аннулирования = 100 − (число аннулирований × 50)",
          "Тяжёлые решения = 100 − (число тяжёлых решений × 25)",
          "«Тяжёлые» решения = ProcedureCanceled, ProcedurePartiallyCanceled, RemedialMeasures, ComplaintUpheld, ComplaintPartiallyUpheld.",
        ],
      },
      {
        heading: "Агрегация и пороги",
        paragraphs: ["Итоговая оценка = округлённая сумма (под-оценка × вес) по четырём факторам."],
        bullets: [
          "≥ 80 → чисто (high)",
          "50–79 → средне (medium)",
          "< 50 → риск (low)",
          "100 = риск не выявлен.",
        ],
      },
      {
        heading: "Источник и детерминизм",
        paragraphs: [
          "Все четыре фактора берутся исключительно из ANSC (жалобы, решения, судебные приостановления/аннулирования). Данные MTender дают контекст, но не входят в оценку. Вычисление — чистая арифметика: одинаковый вход всегда даёт одинаковый результат, без ИИ и без случайности.",
        ],
      },
      {
        heading: "Ограничения (честно)",
        bullets: [
          "Если вызовы к ANSC частично не удаются, списки остаются пустыми, и оценка стремится к 100 — с примечанием об ошибке в результате. Всегда читайте примечания.",
          "Оценка отражает только то, что есть в данных ANSC, а не внутреннее качество процедуры.",
          "Приложение в фазе тестирования; методология может развиваться.",
        ],
      },
    ],
    backLabel: "Назад к CONTender",
  },
};
