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
  capabilities: { heading: string; intro: string; tools: ContenderTool[] };
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
    creatorDesc: string;
    firstAppNote: string;
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
        count: "~29",
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
      "Cincisprezece instrumente de date, toate gratuite cu o singură excepție. Mai jos, zece dintre ele.",
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
          "Un scor compozit de la 0 la 100 (100 = curat), cu detaliere pe factori: rata de contestare, suspendări și anulări în instanță, severitatea deciziilor ANSC. Determinist, nu ghicit.",
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
        tagline: "Pachet de contestație gata de depus",
        returns:
          "Generează un pachet de contestație de calitate juridică, pre-completat pentru depunere la ANSC: top-5 temeiuri cu scor de tărie, calendar procedural, scrisoare-tip oficială în română, listă de probe, precedente citate și scor de probabilitate de succes.",
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
      "Termenele și temeiurile nu sunt aproximate. CONTender încarcă la pornire articolele relevante și le citează structural: etichetă, articol, rezumat, sursă și data intrării în vigoare. Comută automat între regimuri în funcție de data procedurii.",
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
      "Parcursul de citire și investigare, adică 99% din utilizare, nu cere niciodată cont sau autentificare. Un singur instrument costă.",
    freeTitle: "Gratuit și anonim",
    freeDesc:
      "Tot ce ține de citire, audit, scoruri, semnale roșii, profiluri și cronologii este gratuit și anonim. Fără cont, fără autentificare.",
    paidTitle: "Pachetul de contestație — 5 USD o dată",
    paidDesc:
      "Singurul instrument plătit este prepare_filing_pack: 5 USD o singură dată, aproximativ 1% din onorariul unui avocat, cu rambursare în 7 zile.",
    civicTitle: "Gratuit pentru uz civic",
    civicDesc:
      "Jurnaliștii de investigație înregistrați, ONG-urile, cadrele academice și studenții la drept primesc pachetele gratuit, dintr-un fond comun de credite civice.",
    giveTitle: "Buy-One-Give-Ten",
    giveDesc:
      "Fiecare pachet plătit adaugă de 10 ori credite civice în fondul comun: o cumpărare „dăruiește” zece pachete civice gratuite.",
  },
  setup: {
    heading: "Cum îl adaugi în ChatGPT",
    intro:
      "Fără instalare și fără cod. Funcționează pe ChatGPT gratuit sau plătit, iar odată adăugat pe desktop apare și pe telefon. La final, conexiunea se face fără autentificare (No Auth).",
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
          "Pornește „Developer mode” (toggle-ul devine albastru). Apare „ELEVATED RISK” — este avertismentul standard pentru orice aplicație adăugată manual. Lasă „Enforce CSP” pe OFF.",
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
        a: "Nu pentru aproape tot. 99% din parcurs — citire, audit, scoruri de integritate, semnale roșii, profiluri, cronologii — este gratuit și anonim. Singurul instrument plătit este pachetul de contestație, 5 USD o dată, gratuit pentru tierul civic.",
      },
      {
        q: "Este sigur? De ce mă avertizează ChatGPT?",
        a: "Da. CONTender doar citește; niciun instrument nu modifică datele sursă, deci îl poți rula de oricâte ori. Avertismentul „ELEVATED RISK” apare pentru orice aplicație adăugată manual în modul dezvoltator, nu este specific acestei aplicații.",
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
      "esempla systems (esempla.com) — companie gov-tech din Chișinău, fondată în 2009, care construiește servicii publice digitale, interoperabilitate de date și cloud pentru guverne. Peste cincisprezece ani de experiență în felul în care sunt cablate sistemele publice moldovenești; printre realizări, serviciul eAPP de apostilă electronică al Moldovei.",
    creatorDesc:
      "Creator: Ion Calmîș (handle „nalyk”), site personal nalyk.dev, fondatorul Yoda Digital.",
    firstAppNote:
      "Primul ChatGPT App din Republica Moldova: o echipă mică a ajuns pe o suprafață globală de distribuție nou-nouță în același moment cu toți ceilalți și a plantat acolo civic-tech.",
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
        count: "~29",
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
    intro: "Fifteen data tools, all free with a single exception. Below, ten of them.",
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
          "A composite score from 0 to 100 (100 = clean), broken down by factor: appeal rate, court suspensions and annulments, ANSC decision severity. Deterministic, not guessed.",
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
        tagline: "Appeal pack ready to file",
        returns:
          "Generates a lawyer-grade appeal pack, pre-filled for filing at ANSC: top-5 grounds with strength scores, a procedural calendar, an official Romanian draft letter, an evidence checklist, cited precedents and a success-probability score.",
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
      "Deadlines and legal grounds are not approximated. At startup CONTender loads the relevant articles and cites them structurally: label, article, summary, source and in-force date. It switches automatically between regimes based on the procedure's date.",
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
      "The reading and investigation path, which is 99% of use, never requires an account or sign-in. Only one tool costs anything.",
    freeTitle: "Free and anonymous",
    freeDesc:
      "Everything to do with reading, audits, scores, red flags, profiles and timelines is free and anonymous. No account, no sign-in.",
    paidTitle: "The appeal pack — $5 once",
    paidDesc:
      "The only paid tool is prepare_filing_pack: $5 one time, roughly 1% of a lawyer's fee, refundable within 7 days.",
    civicTitle: "Free for civic use",
    civicDesc:
      "Registered investigative journalists, NGOs, academics and law students receive the packs for free, from a shared pool of civic credits.",
    giveTitle: "Buy-One-Give-Ten",
    giveDesc:
      'Every paid pack adds 10× civic credits to the common fund: one purchase "gifts" ten free civic packs.',
  },
  setup: {
    heading: "How to add it to ChatGPT",
    intro:
      "No install and no code. It works on free or paid ChatGPT, and once added on desktop it appears on your phone too. At the end, the connection is made with no sign-in (No Auth).",
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
          'Switch on "Developer mode" (the toggle turns blue). "ELEVATED RISK" appears — it is the standard warning for any manually added app. Leave "Enforce CSP" OFF.',
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
        a: "Not for almost everything. 99% of the path — reading, audits, integrity scores, red flags, profiles, timelines — is free and anonymous. The only paid tool is the appeal pack, $5 once, free for the civic tier.",
      },
      {
        q: "Is it safe? Why does ChatGPT warn me?",
        a: 'Yes. CONTender only reads; no tool modifies the source data, so you can run it as many times as you like. The "ELEVATED RISK" warning appears for any app added manually in developer mode; it is not specific to this app.',
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
      "esempla systems (esempla.com) — a Chișinău gov-tech company, founded in 2009, building digital public services, data interoperability and cloud for governments. More than fifteen years of experience in how Moldova's public systems are wired; among its work, Moldova's eAPP electronic apostille service.",
    creatorDesc:
      'Creator: Ion Calmîș (handle "nalyk"), personal site nalyk.dev, founder of Yoda Digital.',
    firstAppNote:
      "The first ChatGPT App from the Republic of Moldova: a small team reached a brand-new global distribution surface at the same moment as everyone else and planted civic-tech there.",
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
        count: "~29",
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
      "Пятнадцать инструментов данных, все бесплатны за единственным исключением. Ниже десять из них.",
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
          "Сводная оценка от 0 до 100 (100 = чисто) с разбивкой по факторам: доля обжалований, судебные приостановления и аннулирования, тяжесть решений ANSC. Детерминированная, не угаданная.",
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
        tagline: "Пакет жалобы для подачи",
        returns:
          "Формирует пакет жалобы юридического качества, предзаполненный для подачи в ANSC: топ-5 оснований с оценкой силы, процедурный календарь, официальное письмо-шаблон на румынском, перечень доказательств, цитируемые прецеденты и оценка вероятности успеха.",
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
      "Сроки и основания не приблизительны. При запуске CONTender загружает релевантные статьи и цитирует их структурно: метка, статья, краткое содержание, источник и дата вступления в силу. Автоматически переключается между режимами в зависимости от даты процедуры.",
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
      "Путь чтения и расследования, то есть 99% использования, никогда не требует аккаунта или авторизации. Платный только один инструмент.",
    freeTitle: "Бесплатно и анонимно",
    freeDesc:
      "Всё, что связано с чтением, аудитом, оценками, красными флагами, профилями и хронологиями, бесплатно и анонимно. Без аккаунта, без авторизации.",
    paidTitle: "Пакет жалобы — 5 USD один раз",
    paidDesc:
      "Единственный платный инструмент — prepare_filing_pack: 5 USD единоразово, примерно 1% от гонорара адвоката, с возвратом средств в течение 7 дней.",
    civicTitle: "Бесплатно для гражданского сектора",
    civicDesc:
      "Зарегистрированные журналисты-расследователи, НКО, академические сотрудники и студенты-юристы получают пакеты бесплатно из общего фонда гражданских кредитов.",
    giveTitle: "Buy-One-Give-Ten",
    giveDesc:
      "Каждый оплаченный пакет добавляет в общий фонд десятикратный объём гражданских кредитов: одна покупка «дарит» десять бесплатных гражданских пакетов.",
  },
  setup: {
    heading: "Как добавить в ChatGPT",
    intro:
      "Без установки и без кода. Работает на бесплатном или платном ChatGPT, и однажды добавленное на компьютере появляется и в телефоне. Подключение в конце выполняется без авторизации (No Auth).",
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
          "Включите «Developer mode» (переключатель станет синим). Появится «ELEVATED RISK» — это стандартное предупреждение для любого приложения, добавленного вручную. Оставьте «Enforce CSP» в положении OFF.",
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
        a: "Почти за всё — нет. 99% работы — чтение, аудит, оценки добросовестности, красные флаги, профили, хронологии — бесплатны и анонимны. Платный только пакет жалобы: 5 USD один раз, бесплатно для гражданского тарифа.",
      },
      {
        q: "Это безопасно? Почему ChatGPT меня предупреждает?",
        a: "Да. CONTender только читает; ни один инструмент не изменяет исходные данные, поэтому запускать его можно сколько угодно раз. Предупреждение «ELEVATED RISK» появляется для любого приложения, добавленного вручную в режиме разработчика, и не относится конкретно к этому приложению.",
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
      "esempla systems (esempla.com) — gov-tech-компания из Кишинёва, основанная в 2009 году, которая строит цифровые публичные сервисы, интероперабельность данных и облако для государств. Более пятнадцати лет опыта в том, как устроены молдавские государственные системы; среди реализаций — сервис электронного апостиля eAPP Молдовы.",
    creatorDesc:
      "Создатель: Ион Калмыш (handle «nalyk»), личный сайт nalyk.dev, основатель Yoda Digital.",
    firstAppNote:
      "Первое приложение ChatGPT из Республики Молдова: небольшая команда вышла на совершенно новую глобальную площадку распространения одновременно со всеми остальными и поставила там civic-tech.",
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
