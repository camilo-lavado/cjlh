import React, { useState, useEffect } from 'react';
import { 
  Trophy, Skull, Zap, Shield, Award, 
  ChevronDown, ChevronUp, Moon, Sun, 
  Siren, Sword, Crown, Info, Activity,
  Users, Target, Ghost, Flame, Medal,
  Dna, History, Star, Hash, Calendar,
  Table, CloudRain, CloudSun, Wind,
  MapPin, CheckCircle2, ScrollText, Sparkles,
  Eye, Newspaper, X, Quote, Coins, TrendingUp,
  ArrowRight, ThumbsUp, ThumbsDown, LayoutList
} from 'lucide-react';

/**
 * ============================================================================
 * DATOS SIMULADOS
 * ============================================================================
 */

const CHRONICLES = {
  recap: {
    id: 'recap',
    type: 'newspaper',
    title: "¡MASACRE EN EL PIT!",
    headline: "La Carnicería del Sábado: 4 Muertos y un Árbitro Desaparecido",
    subtitle: "Jornada 4 - Edición Especial de Necrología",
    excerpt: "Si alguien esperaba ver 'deporte' este fin de semana, se equivocó de liga. Los Orcland Raiders no jugaron al balón, jugaron a los bolos con las costillas de los elfos...",
    fullText: [
      "Si alguien esperaba ver 'deporte' este fin de semana, definitivamente se equivocó de liga. La Jornada 4 será recordada no por los pases completados, sino por el récord histórico de huesos rotos por minuto.",
      "El encuentro estelar entre los Orcland Raiders y los Elfheim Eagles comenzó con un minuto de silencio, que duró exactamente 3 segundos antes de que un Blitzer orco decidiera que el silencio era aburrido y placara al aguador.",
      "Destacable actuación del troll 'Traga-Piedras', que logró no comerse a ningún compañero durante 3 turnos seguidos (nuevo récord personal). Sin embargo, su intento de lanzar al goblin 'Vuela-Bajo' resultó en un touchdown... en su propia zona de anotación.",
      "Por otro lado, el partido de los Goblins fue suspendido temporalmente cuando el árbitro 'accidentalmente' cayó en un pozo de estacas que apareció misteriosamente en la línea de medio campo. La organización de la liga ha declarado que el pozo es parte del terreno de juego natural.",
      "En resumen: 4 muertos confirmados, 12 heridos graves, un árbitro desaparecido y un Touchdown que nadie vio porque los cámaras estaban apostando en la grada."
    ],
    author: "Jim Johnson",
    role: "Cronista de Necrología"
  },
  oracle: {
    id: 'oracle',
    type: 'mystic',
    title: "EL OJO DE NUFFLE",
    headline: "Oráculo — Fecha 2 “Jamón tu vieja”",
    subtitle: "Visiones, Predicciones y Bancarrotas",
    excerpt: "Duelo de élites élficas, Orcos que necesitan una pelea de bar y el choque de necesitados. Nuffle ha hablado (y estaba borracho).",
    matches: [
      {
        home: "Los Giga Chads",
        homeCoach: "Albert Rigniro",
        away: "Saint Goretti",
        awayCoach: "Jacku",
        prediction: "2 – 1",
        winner: "home",
        confidence: 60,
        bounty: "150k",
        tacticalKey: "Duelo de élites élficas. Si Rigniro repite la muralla defensiva del primer tiempo contra la IA y no regala placajes gratis, debería robarle al menos una posesión a Jacku. El partido se define en quién proteja mejor a sus receptores clave.",
        remark: "Si alguno se olvida de marcar, no es error táctico: es que Nuffle quiere contenido para el compilado “Cómo NO marcar a un catcher MA7+”."
      },
      {
        home: "Ultra Kanarioz",
        homeCoach: "Blood Bowl Ralo",
        away: "Gwynevere Simps!",
        awayCoach: "Lord Hugo",
        prediction: "1 – 2",
        winner: "away",
        confidence: 55,
        bounty: "80k",
        tacticalKey: "Los orcos de Ralo tienen que transformar el partido en pelea de bar: marcar a los elfos cuerpo a cuerpo, encerrar al ball carrier y obligar a Hugo a tirar dados “de fe”. El problema: el lanzador orco acróbata ya está en la enfermería.",
        remark: "Si Ultra Kanarioz termina el partido con más armaduras rotas que casillas avanzadas, no fue derrota: fue una auditoría gratuita al sistema de salud orco."
      },
      {
        home: "Ork In Black",
        homeCoach: "Matías Valencia",
        away: "Rikashonez",
        awayCoach: "Bisquit",
        prediction: "1 – 1",
        winner: "draw",
        confidence: 50,
        bounty: "10k",
        tacticalKey: "Choque de necesitados. Ork In Black debe abusar de la superioridad en armadura y controlar la LOS. Rikashonez tiene que jugar “a la humana”: jaulas limpias y pases cortos.",
        remark: "El que pierda este partido pasa automáticamente a la zona “reunión motivacional con el staff técnico” (también conocida como tirar hojas de equipo a la basura)."
      },
      {
        home: "Camarilla Corrompida",
        homeCoach: "Kroszover",
        away: "Threat of the Bone",
        awayCoach: "IA",
        prediction: "2 – 1",
        winner: "home",
        confidence: 45,
        bounty: "200k",
        tacticalKey: "Partido de redención. Si Kroszover logra tener más de 3 vampiros en cancha al final del encuentro y modera el bloodlust, la calidad individual debería imponerse.",
        remark: "Si la Camarilla termina otra vez con menos SPP que mordiscos a thralls, el próximo partido lo deberían jugar directamente con bolsas de sangre en vez de jugadores."
      }
    ],
    author: "Bob Bifford",
    role: "Ludópata Visionario"
  }
};

const PLAYED_MATCHES = [
  { home: "ORC", away: "ELF", score: "2-1", status: "FT" },
  { home: "HUM", away: "UND", score: "0-0", status: "FT" },
  { home: "DWF", away: "SKV", score: "1-3", status: "FT" },
  { home: "CHA", away: "NUR", score: "1-1", status: "FT (OT)" },
  { home: "KHO", away: "NOR", score: "0-2", status: "FT" }
];

const CURRENT_STANDINGS = [
  { rank: 1, team: "Dark Pact Demolition", race: "Pacto del Caos", coach: "Lord Xaphan", p: 5, w: 4, d: 1, l: 0, cas: 12, pts: 13 },
  { rank: 2, team: "Orcland Raiders", race: "Orcos", coach: "El Carnicero", p: 5, w: 3, d: 2, l: 0, cas: 18, pts: 11 },
  { rank: 3, team: "Skaven Blight", race: "Skaven", coach: "Sly", p: 5, w: 3, d: 1, l: 1, cas: 4, pts: 10 },
  { rank: 4, team: "Bretonnian Knights", race: "Bretonia", coach: "Sir Lancelot", p: 5, w: 3, d: 0, l: 2, cas: 8, pts: 9 },
  { rank: 5, team: "Dwarf Giants", race: "Enanos", coach: "The Wall", p: 5, w: 2, d: 2, l: 1, cas: 15, pts: 8 },
  { rank: 6, team: "Elfheim Eagles", race: "Elfos Silvanos", coach: "Legolas", p: 5, w: 2, d: 0, l: 3, cas: 2, pts: 6 },
  { rank: 7, team: "Oigros United", race: "Oigros", coach: "Snotling King", p: 5, w: 0, d: 2, l: 3, cas: 10, pts: 2 },
  { rank: 8, team: "Goblin Cheaters", race: "Goblins", coach: "Dirty Dan", p: 5, w: 0, d: 0, l: 5, cas: 1, pts: 0 },
];

const CURRENT_FIXTURE = [
  { 
    id: "m1", 
    home: { team: "Dark Pact Demolition", race: "Pacto del Caos", logo: "Skull" },
    away: { team: "Orcland Raiders", race: "Orcos", logo: "Shield" },
    date: "12 NOV", time: "21:00", stadium: "The Pit", weather: "Blizzard", weatherIcon: "CloudRain",
    bounty: "150k", 
    odds: { home: 1.55, draw: 3.10, away: 2.80 }
  },
  { 
    id: "m2", 
    home: { team: "Skaven Blight", race: "Skaven", logo: "Zap" },
    away: { team: "Bretonnian Knights", race: "Bretonia", logo: "Sword" },
    date: "15 NOV", time: "19:30", stadium: "Sewer Arena", weather: "Nice", weatherIcon: "CloudSun",
    bounty: "80k",
    odds: { home: 2.10, draw: 2.90, away: 1.85 }
  },
  { 
    id: "m3", 
    home: { team: "Oigros United", race: "Oigros", logo: "Ghost" },
    away: { team: "Goblin Cheaters", race: "Goblins", logo: "Target" },
    date: "18 NOV", time: "16:00", stadium: "Mud Bowl", weather: "Sweltering", weatherIcon: "Wind",
    bounty: "10k",
    odds: { home: 1.90, draw: 4.00, away: 1.90 }
  },
  { 
    id: "m4", 
    home: { team: "Dwarf Giants", race: "Enanos", logo: "Shield" },
    away: { team: "Elfheim Eagles", race: "Elfos Silvanos", logo: "Zap" },
    date: "23 NOV", time: "22:00", stadium: "Rock Deep", weather: "Perfect", weatherIcon: "CloudSun",
    bounty: "200k",
    odds: { home: 1.75, draw: 3.20, away: 2.40 }
  }
];

const CHAMPIONS = [
  {
    edicion: 4,
    nombre: "Copa del Caos IV",
    estado: "Vigente",
    campeon: { manager: "Lord Xaphan", equipo: "Dark Pact Demolition", faccion: "Pacto del Caos" },
    subcampeon: { manager: "Sir Lancelot", equipo: "Bretonnian Knights", faccion: "Bretonia" },
    bronce: { manager: "Snotling King", equipo: "Oigros United", faccion: "Oigros" },
  },
  {
    edicion: 3,
    nombre: "Torneo de las Tres Lunas",
    estado: "Finalizado",
    campeon: { manager: "El Carnicero", equipo: "Orcland Raiders", faccion: "Orcos" },
    subcampeon: { manager: "Sly", equipo: "Skaven Blight", faccion: "Skaven" },
    bronce: { manager: "Grim", equipo: "Dwarf Giants", faccion: "Enanos" },
  },
  {
    edicion: 2,
    nombre: "Copa Inicial",
    estado: "Finalizado",
    campeon: { manager: "Grim", equipo: "Dwarf Giants", faccion: "Enanos" },
    subcampeon: { manager: "Legolas", equipo: "Elfheim Eagles", faccion: "Elfos Silvanos" },
    bronce: { manager: "Lady Luck", equipo: "High Asur", faccion: "Altos Elfos" },
  }
];

const COACHES = [
  {
    id: "c1",
    nickname: "El Carnicero",
    realName: "Roberto G.",
    faccionMain: "Orcos",
    favoriteRace: "Orcos Negros",
    style: "Agresivo",
    quote: "Si no sangran, no cuenta como placaje.",
    history: {
      teams: ["Orcland Raiders", "Badland Brawlers"],
      races: ["Orcos", "Orcos Negros"]
    },
    titles: { gold: 1, silver: 0, bronze: 2, special: 3 },
    avatar: { icon: "Skull", hue: 0, accent: "#ef4444" }
  },
  {
    id: "c2",
    nickname: "Lady Luck",
    realName: "Elena V.",
    faccionMain: "Elfos",
    favoriteRace: "Elfos Pro",
    style: "Aerial",
    quote: "Mis dados están bendecidos por Nuffle.",
    history: {
      teams: ["Elfheim Eagles", "Naggaroth Nightmares"],
      races: ["Elfos Silvanos", "Elfos Oscuros", "Unión Elfica"]
    },
    titles: { gold: 0, silver: 2, bronze: 0, special: 5 },
    avatar: { icon: "Zap", hue: 45, accent: "#eab308" }
  },
  {
    id: "c3",
    nickname: "The Wall",
    realName: "Carlos M.",
    faccionMain: "Enanos",
    favoriteRace: "Enanos",
    style: "Control",
    quote: "Avanzamos una casilla por turno. Sin prisa.",
    history: {
      teams: ["Dwarf Giants", "Khorne's Chosen"],
      races: ["Enanos", "Khorne"]
    },
    titles: { gold: 1, silver: 1, bronze: 1, special: 1 },
    avatar: { icon: "Shield", hue: 200, accent: "#3b82f6" }
  },
  {
    id: "c4",
    nickname: "Snotling King",
    realName: "Javi P.",
    faccionMain: "Oigros",
    favoriteRace: "Snotlings",
    style: "Triquiñuelas",
    quote: "Lanzar compañeros es una táctica válida.",
    history: {
      teams: ["Oigros United", "Swamp Things"],
      races: ["Oigros", "Snotlings", "Underworld"]
    },
    titles: { gold: 0, silver: 0, bronze: 1, special: 8 },
    avatar: { icon: "Ghost", hue: 120, accent: "#22c55e" }
  }
];

const AWARDS = [
  {
    id: "a1",
    nombre: "Serrucho de Oro",
    descripcion: "Mayor nº de faltas/partido sin expulsión.",
    icon: "Sword",
    rarity: "gold", 
    ganadores: ["El Carnicero (Ed.4)", "Dirty Dan (Ed.3)"]
  },
  {
    id: "a2",
    nombre: "Sanatorio Nuffle",
    descripcion: "Coach con más jugadores propios en la enfermería.",
    icon: "Activity",
    rarity: "epic",
    ganadores: ["Sly (Ed.4)"]
  },
  {
    id: "a3",
    nombre: "Dado de Madera",
    descripcion: "Maldición estadística: Más 1s en tiradas críticas.",
    icon: "Dna",
    rarity: "common",
    ganadores: ["The Wall (Ed.2)"]
  },
  {
    id: "a4",
    nombre: "El Touchdown Fantasma",
    descripcion: "Anotar en el turno 16 tras un rebote imposible.",
    icon: "Ghost",
    rarity: "epic",
    ganadores: ["Lady Luck (Ed.1)"]
  },
  {
    id: "a5",
    nombre: "MVP: Most Violent Player",
    descripcion: "Jugador con más bajas causadas en una temporada.",
    icon: "Skull",
    rarity: "gold",
    ganadores: ["Bob 'El Martillo' (Ed.3)"]
  },
  {
    id: "a6",
    nombre: "La Bota de Plomo",
    descripcion: "Fallo de A Por Ellos (GFX) en la línea de Touchdown.",
    icon: "Target",
    rarity: "common",
    ganadores: ["Todos (Siempre)"]
  }
];

const TICKER_ITEMS = [
  { label: "ÚLTIMA HORA: Los Orcland Raiders fichan a un Troll con inteligencia negativa.", href: "#" },
  { label: "MERCADO: Subida del precio de los apotecarios tras la jornada sangrienta.", href: "#" },
  { label: "RUMOR: ¿Árbitros sobornados o simplemente ciegos? La polémica continúa.", href: "#" },
  { label: "PRÓXIMA MOCHA: Enanos vs Goblins - Se repartirán cascos gratis a la entrada.", href: "#" }
];

/**
 * ============================================================================
 * ESTILOS INYECTADOS
 * ============================================================================
 */
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    @keyframes glitch {
      0% { text-shadow: 2px 2px #7a1c1c, -2px -2px #0ea5e9; }
      25% { text-shadow: -2px -2px #7a1c1c, 2px 2px #0ea5e9; }
      50% { text-shadow: 2px -2px #7a1c1c, -2px 2px #0ea5e9; }
      75% { text-shadow: -2px 2px #7a1c1c, 2px -2px #0ea5e9; }
      100% { text-shadow: 2px 2px #7a1c1c, -2px -2px #0ea5e9; }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
      100% { transform: translateY(0px); }
    }
    @keyframes borderPulse {
      0% { box-shadow: 0 1px 2px rgba(220, 38, 38, 0.1); }
      50% { box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4); }
      100% { box-shadow: 0 1px 2px rgba(220, 38, 38, 0.1); }
    }
    @keyframes textGlow {
      0%, 100% { text-shadow: 0 0 5px rgba(167, 139, 250, 0.5); }
      50% { text-shadow: 0 0 20px rgba(167, 139, 250, 0.8), 0 0 10px rgba(139, 92, 246, 0.6); }
    }
    @keyframes coinSpin {
      0% { transform: rotateY(0deg); }
      100% { transform: rotateY(360deg); }
    }
    @keyframes fadeOutUp {
      0% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-20px); }
    }
    /* Efectos Mágicos */
    @keyframes mysticPulse {
      0% { box-shadow: 0 0 10px rgba(139, 92, 246, 0.2), inset 0 0 10px rgba(139, 92, 246, 0.1); }
      50% { box-shadow: 0 0 25px rgba(139, 92, 246, 0.6), inset 0 0 20px rgba(139, 92, 246, 0.3); border-color: rgba(167, 139, 250, 0.8); }
      100% { box-shadow: 0 0 10px rgba(139, 92, 246, 0.2), inset 0 0 10px rgba(139, 92, 246, 0.1); }
    }
    @keyframes sparkle {
      0%, 100% { opacity: 0; transform: scale(0); }
      50% { opacity: 1; transform: scale(1); }
    }
    @keyframes borderFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .animate-marquee {
      display: flex;
      width: fit-content;
      animation: marquee 20s linear infinite;
    }
    .animate-marquee:hover {
      animation-play-state: paused;
    }
    .glitch-text {
      animation: glitch 3s infinite;
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
    .animate-border-pulse {
      animation: borderPulse 3s infinite ease-in-out;
    }
    .animate-text-glow {
      animation: textGlow 3s infinite;
    }
    .animate-coin {
      animation: coinSpin 3s infinite linear;
    }
    .animate-toast {
      animation: fadeOutUp 2s forwards;
      animation-delay: 2s;
    }
    .animate-mystic-pulse {
      animation: mysticPulse 4s infinite ease-in-out;
    }
    .animate-border-flow {
        background: linear-gradient(270deg, #6366f1, #a855f7, #ec4899, #6366f1);
        background-size: 600% 600%;
        animation: borderFlow 5s ease infinite;
    }
    
    .oracle-card-bg {
        background: linear-gradient(145deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.6) 100%);
        backdrop-filter: blur(10px);
        box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.1), 
            0 2px 4px -1px rgba(0, 0, 0, 0.06),
            inset 0 0 20px rgba(139, 92, 246, 0.1);
    }

    .bg-carbon {
      background-color: #0b0d10;
      background-image: 
        linear-gradient(45deg, #1a1d23 25%, transparent 25%, transparent 75%, #1a1d23 75%, #1a1d23), 
        linear-gradient(45deg, #1a1d23 25%, transparent 25%, transparent 75%, #1a1d23 75%, #1a1d23);
      background-position: 0 0, 10px 10px;
      background-size: 20px 20px;
    }
    .bg-ice-gradient {
      background: linear-gradient(135deg, #e2e8f0 0%, #bfdbfe 50%, #cbd5e1 100%);
      background-attachment: fixed;
    }
    
    /* Modal Transitions */
    .modal-enter { opacity: 0; transform: scale(0.95); }
    .modal-enter-active { opacity: 1; transform: scale(1); transition: opacity 300ms, transform 300ms; }
    .modal-exit { opacity: 1; transform: scale(1); }
    .modal-exit-active { opacity: 0; transform: scale(0.95); transition: opacity 200ms, transform 200ms; }
    
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0f172a; }
    ::-webkit-scrollbar-thumb { background: #7a1c1c; border-radius: 4px; }
  `}} />
);

/**
 * ============================================================================
 * COMPONENTES AUXILIARES
 * ============================================================================
 */

const ThemeToggle = ({ isDark, toggle }) => (
  <button 
    onClick={toggle}
    className="p-2 rounded-full bg-slate-300/50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors hover:bg-blue-300 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 ring-red-500"
    aria-label={isDark ? "Modo Claro" : "Modo Oscuro"}
  >
    {isDark ? <Sun size={20} /> : <Moon size={20} />}
  </button>
);

const UserWallet = ({ balance }) => (
  <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-yellow-500/30 text-yellow-500 font-mono text-sm shadow-[0_0_10px_rgba(234,179,8,0.1)]">
    <Coins size={16} className="animate-coin" />
    <span className="font-bold tracking-wide">{balance.toLocaleString()} MO</span>
  </div>
);

const Ticker = ({ items }) => (
  <div className="w-full bg-yellow-500 text-black font-bold border-b-4 border-red-900 overflow-hidden h-9 flex items-center relative z-20 shadow-md">
    <div className="absolute left-0 bg-red-700 text-white px-4 h-full flex items-center z-10 text-xs uppercase tracking-wider shadow-lg skew-x-[-10deg] -ml-2 pl-5">
      <Siren size={14} className="mr-2 animate-pulse" /> Noticias
    </div>
    <div className="animate-marquee whitespace-nowrap pl-28">
      {[...items, ...items, ...items].map((item, idx) => (
        <span key={idx} className="mx-6 inline-flex items-center text-sm">
          <span className="w-2 h-2 bg-red-700 rounded-full mr-2"></span>
          {item.href ? <a href={item.href} className="hover:underline decoration-2">{item.label}</a> : item.label}
        </span>
      ))}
    </div>
  </div>
);

const ScoreBar = ({ matches }) => (
  <div className="w-full bg-slate-900 text-slate-100 border-b border-slate-700 overflow-x-auto scrollbar-hide">
    <div className="container mx-auto max-w-7xl flex items-center h-10 divide-x divide-slate-700 text-xs sm:text-sm font-mono">
      <div className="px-4 flex items-center text-slate-400 font-bold italic tracking-tighter whitespace-nowrap uppercase">
        <CheckCircle2 size={14} className="mr-2 text-slate-500" />
        Resultados Quincena
      </div>
      {matches.map((m, i) => (
        <div key={i} className="px-4 flex items-center space-x-3 min-w-fit hover:bg-slate-800 transition-colors cursor-default group">
          <span className="font-bold text-slate-400 group-hover:text-white transition-colors">{m.home}</span>
          <span className="bg-slate-800 px-2 py-0.5 rounded text-white border border-slate-600 font-bold shadow-sm">{m.score}</span>
          <span className="font-bold text-slate-400 group-hover:text-white transition-colors">{m.away}</span>
          {m.status && <span className="text-[9px] text-slate-600 uppercase font-bold tracking-tight border border-slate-700 px-1 rounded">{m.status}</span>}
        </div>
      ))}
    </div>
  </div>
);

const SectionHeading = ({ title, subtitle, id, align = "left" }) => (
  <div className={`mb-12 relative ${align === "center" ? "text-center" : "text-left"} animate-fade-in-up`} id={id}>
    <h2 className="text-4xl md:text-5xl font-extrabold italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-orange-600 drop-shadow-sm">
      {title}
    </h2>
    {subtitle && (
      <p className="text-slate-700 dark:text-slate-400 font-mono text-sm mt-2 border-l-4 border-red-600 pl-3 inline-block font-bold">
        {subtitle}
      </p>
    )}
  </div>
);

const CoachCard = ({ coach }) => {
  const IconMap = { Skull, Zap, Shield, Ghost };
  const Icon = IconMap[coach.avatar.icon] || Skull;

  return (
    <div className="group relative h-full perspective-1000 animate-fade-in-up">
      <div className="absolute inset-0 bg-slate-100/80 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-xl border border-slate-300/50 dark:border-slate-700 transition-all duration-500 group-hover:shadow-2xl group-hover:border-red-500/50 overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-slate-300 dark:to-slate-900 opacity-50 transform rotate-45 translate-x-8 -translate-y-8"></div>
      </div>
      
      <div className="relative p-5 flex flex-col h-full z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-black uppercase italic text-slate-900 dark:text-white leading-none mb-1">{coach.nickname}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">{coach.realName}</p>
          </div>
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg ring-2 ring-slate-200 dark:ring-slate-700 animate-float"
            style={{ background: `linear-gradient(135deg, ${coach.avatar.accent}, #000)` }}
          >
            <Icon size={28} color="white" />
          </div>
        </div>

        <div className="mb-4">
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-500 block mb-1">Especialidad</span>
            <div className="inline-flex items-center bg-slate-200 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 px-3 py-1 rounded border border-slate-300 dark:border-slate-600 text-xs font-bold">
               <Dna size={12} className="mr-2 text-red-500" /> {coach.favoriteRace}
            </div>
        </div>

        <div className="mb-4 space-y-2">
           <div>
             <p className="text-[10px] uppercase font-bold text-slate-500 mb-1 flex items-center"><History size={10} className="mr-1"/> Equipos Históricos</p>
             <p className="text-xs text-slate-700 dark:text-slate-300 leading-tight">{coach.history.teams.join(", ")}</p>
           </div>
        </div>

        <div className="grid grid-cols-4 gap-1 mb-4 text-center text-xs font-bold bg-slate-200/50 dark:bg-black/30 p-2 rounded border border-slate-300/30 dark:border-white/5">
          <div className="flex flex-col items-center group/stat">
            <Trophy size={14} className="mb-1 text-yellow-600 dark:text-yellow-500 group-hover/stat:scale-110 transition" />
            <span className="text-slate-900 dark:text-white">{coach.titles.gold}</span>
          </div>
          <div className="flex flex-col items-center group/stat">
            <Medal size={14} className="mb-1 text-slate-400 group-hover/stat:scale-110 transition" />
            <span className="text-slate-900 dark:text-white">{coach.titles.silver}</span>
          </div>
          <div className="flex flex-col items-center group/stat">
            <Shield size={14} className="mb-1 text-amber-700 group-hover/stat:scale-110 transition" />
            <span className="text-slate-900 dark:text-white">{coach.titles.bronze}</span>
          </div>
          <div className="flex flex-col items-center group/stat">
            <Star size={14} className="mb-1 text-purple-500 group-hover/stat:scale-110 transition" />
            <span className="text-slate-900 dark:text-white">{coach.titles.special}</span>
          </div>
        </div>

        <blockquote className="mt-auto italic text-xs text-slate-600 dark:text-slate-400 border-l-2 border-red-600 pl-2 py-1 bg-slate-50 dark:bg-white/5 rounded-r">
          "{coach.quote}"
        </blockquote>
      </div>
    </div>
  );
};

const AchievementGrid = ({ awards }) => {
  const IconMap = { Sword, Activity, Dna, Ghost, Skull, Target };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {awards.map((award) => {
        const Icon = IconMap[award.icon] || Award;
        let borderColor, glowColor;
        
        if (award.rarity === 'gold') {
          borderColor = 'border-yellow-500';
          glowColor = 'group-hover:shadow-yellow-500/20';
        } else if (award.rarity === 'epic') {
          borderColor = 'border-purple-500';
          glowColor = 'group-hover:shadow-purple-500/20';
        } else {
          borderColor = 'border-slate-400';
          glowColor = 'group-hover:shadow-slate-400/20';
        }

        return (
          <div key={award.id} className={`group relative bg-gradient-to-b from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 border-2 ${borderColor} rounded-lg p-4 transition-all duration-300 hover:-translate-y-1 shadow-md ${glowColor} hover:shadow-xl`}>
             
             <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-lg border border-slate-700">
                <p className="font-bold mb-1 text-center">{award.criterio}</p>
                <p className="text-slate-400 text-center italic">"{award.descripcion}"</p>
                <div className="mt-2 pt-2 border-t border-slate-800">
                  <p className="text-[10px] uppercase text-slate-500 text-center">Últimos Ganadores:</p>
                  <ul className="text-[10px] text-center">
                    {award.ganadores.map(g => <li key={g}>{g}</li>)}
                  </ul>
                </div>
             </div>

             <div className="flex flex-col items-center text-center h-full">
                <div className={`w-16 h-16 rounded-full bg-slate-200 dark:bg-black flex items-center justify-center mb-3 shadow-inner ring-4 ring-opacity-20 ${award.rarity === 'gold' ? 'ring-yellow-500 text-yellow-600' : award.rarity === 'epic' ? 'ring-purple-500 text-purple-500' : 'ring-slate-400 text-slate-500'}`}>
                   <Icon size={32} strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-sm leading-tight text-slate-900 dark:text-slate-100 mb-1">{award.nombre}</h4>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{award.rarity} Award</p>
             </div>
          </div>
        );
      })}
    </div>
  );
};

const StandingsSection = () => (
  <div className="overflow-hidden rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 backdrop-blur-md">
    <div className="bg-slate-900 text-white px-4 py-3 flex justify-between items-center border-b-4 border-red-600">
      <h3 className="font-bold uppercase tracking-widest flex items-center gap-2">
        <Table size={18} className="text-red-500" /> Clasificación General
      </h3>
      <span className="text-xs font-mono text-slate-400">Jornada 5/12</span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-slate-100 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th className="px-4 py-3 text-center">#</th>
            <th className="px-4 py-3">Equipo / Coach</th>
            <th className="px-4 py-3 text-center" title="Partidos Jugados">PJ</th>
            <th className="px-4 py-3 text-center text-green-600 dark:text-green-400" title="Ganados">G</th>
            <th className="px-4 py-3 text-center text-slate-400" title="Empatados">E</th>
            <th className="px-4 py-3 text-center text-red-500" title="Perdidos">P</th>
            <th className="px-4 py-3 text-center font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 border-x border-red-100 dark:border-red-900/20" title="Casualties (Bajas Causadas)">CAS</th>
            <th className="px-4 py-3 text-center font-black text-lg">PTS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
          {CURRENT_STANDINGS.map((team, idx) => (
            <tr key={idx} className={`hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${idx < 4 ? 'bg-green-50/30 dark:bg-green-900/5' : ''}`}>
              <td className="px-4 py-3 text-center font-mono font-bold text-slate-400 relative">
                {team.rank}
                {idx < 4 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>}
              </td>
              <td className="px-4 py-3">
                <div className="font-bold text-slate-800 dark:text-slate-200">{team.team}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex gap-2">
                  <span>{team.race}</span> • <span className="italic">{team.coach}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-center font-mono text-slate-500">{team.p}</td>
              <td className="px-4 py-3 text-center font-mono">{team.w}</td>
              <td className="px-4 py-3 text-center font-mono">{team.d}</td>
              <td className="px-4 py-3 text-center font-mono">{team.l}</td>
              <td className="px-4 py-3 text-center font-mono font-bold text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-900/5 border-x border-red-100 dark:border-red-900/10">{team.cas}</td>
              <td className="px-4 py-3 text-center font-black text-lg text-slate-900 dark:text-white">{team.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 text-[10px] text-slate-500 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
      <span><span className="w-2 h-2 inline-block bg-green-500 rounded-full mr-1"></span> Zona Playoff</span>
      <span className="italic">* Criterio de desempate: Nº de Muertos</span>
    </div>
  </div>
);

// --- FIXTURE SIMPLIFICADO (SIN BOTONES DE APUESTA) ---
const FixtureSection = () => {
  const WeatherIcons = { CloudRain, CloudSun, Wind };
  
  const currentMatchday = {
      number: 5,
      title: "Fase Regular - Bloque B",
      dates: "10 Nov - 24 Nov",
      status: "Abierta"
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-slate-900 px-4 py-3 flex justify-between items-center border-b border-slate-700 border-t-4 border-t-red-600">
         <div className="flex items-center gap-4">
            <h3 className="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <Calendar size={18} className="text-red-500" /> Calendario Quincenal
            </h3>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-xs font-mono border border-slate-700">
               {currentMatchday.dates}
            </span>
         </div>
         <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-bold uppercase border border-green-500/30 animate-pulse">
            Jornada {currentMatchday.number} ({currentMatchday.status})
         </span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
        {CURRENT_FIXTURE.map((match) => {
          const WeatherIcon = WeatherIcons[match.weatherIcon] || CloudSun;

          return (
            <div key={match.id} className="p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group flex flex-col md:flex-row items-center gap-4">
               
               {/* 1. META INFO (Fecha y Clima) */}
               <div className="w-full md:w-32 flex md:flex-col justify-between md:justify-center items-center md:items-start text-xs text-slate-500 border-b md:border-b-0 border-slate-200 dark:border-slate-700 pb-2 md:pb-0">
                   <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 px-1.5 rounded">{match.date}</span>
                      <span className="font-mono">{match.time}</span>
                   </div>
                   <div className="flex items-center gap-1 mt-1 text-blue-400">
                       <WeatherIcon size={12} /> {match.weather}
                   </div>
               </div>

               {/* 2. MATCHUP (Centro) */}
               <div className="flex-1 w-full flex items-center justify-between gap-4">
                   {/* Local */}
                   <div className="flex-1 text-right">
                       <div className="font-black text-slate-900 dark:text-white text-lg leading-none">{match.home.team}</div>
                       <div className="text-xs text-slate-500 font-mono mt-1">{match.home.race}</div>
                   </div>
                   
                   {/* VS Badge */}
                   <div className="flex flex-col items-center">
                      <span className="text-xl font-black italic text-red-600">VS</span>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                         <MapPin size={10} /> {match.stadium}
                      </div>
                   </div>

                   {/* Visitante */}
                   <div className="flex-1 text-left">
                       <div className="font-black text-slate-900 dark:text-white text-lg leading-none">{match.away.team}</div>
                       <div className="text-xs text-slate-500 font-mono mt-1">{match.away.race}</div>
                   </div>
               </div>

               {/* 3. BOUNTY & INFO (Derecha) */}
               <div className="w-full md:w-32 flex flex-col items-center justify-center gap-2 border-t md:border-t-0 border-slate-200 dark:border-slate-700 pt-2 md:pt-0">
                   
                   {/* INDICADOR DE POZO (BOUNTY) */}
                   {match.bounty && (
                      <div className="flex flex-col items-center animate-pulse">
                          <div className="text-yellow-500 flex items-center gap-1 text-xs font-black uppercase tracking-wider">
                              <Coins size={14} className="animate-coin" /> 
                              <span>Pozo Activo</span>
                          </div>
                          <span className="text-[10px] font-bold text-yellow-600/80 dark:text-yellow-400/80">{match.bounty}</span>
                      </div>
                   )}
               </div>

            </div>
          );
        })}
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-900/30 p-2 text-center border-t border-slate-200 dark:border-slate-700">
         <button className="text-xs font-bold text-slate-500 hover:text-red-600 uppercase tracking-wide transition-colors w-full flex justify-center items-center gap-2">
            <Calendar size={14} /> Ver Calendario Completo
         </button>
      </div>
    </div>
  );
};

const ChronicleModal = ({ chronicle, onClose, onBet }) => {
  if (!chronicle) return null;

  const isNewspaper = chronicle.type === 'newspaper';
  const isOracle = chronicle.type === 'mystic';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className={`relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-lg shadow-2xl animate-fade-in-up transform transition-all
        ${isNewspaper ? 'bg-[#f3f1e7] text-slate-900' : 'bg-[#0f0821] text-indigo-100 border-2 border-transparent animate-mystic-pulse'}
      `}>
        {isNewspaper && (
           <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")'}}></div>
        )}
        {!isNewspaper && (
           <>
             <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-indigo-900/20 pointer-events-none"></div>
             {/* Efecto de destellos mágicos (simulado con divs absolutos) */}
             <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-sparkle" style={{boxShadow: '0 0 10px 2px white'}}></div>
             <div className="absolute bottom-20 right-10 w-1 h-1 bg-white rounded-full animate-sparkle" style={{boxShadow: '0 0 10px 2px white', animationDelay: '1s'}}></div>
             <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-purple-300 rounded-full animate-sparkle" style={{boxShadow: '0 0 15px 3px #d8b4fe', animationDelay: '0.5s'}}></div>
             <div className="absolute inset-0 rounded-lg p-[2px] animate-border-flow pointer-events-none" style={{zIndex: -1}}>
                <div className="h-full w-full bg-[#0f0821] rounded-lg"></div>
             </div>
           </>
        )}

        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-colors
            ${isNewspaper ? 'hover:bg-red-700 hover:text-white text-slate-800' : 'hover:bg-indigo-600 text-indigo-300 hover:text-white'}
          `}
        >
          <X size={24} />
        </button>

        <div className="relative z-10 p-8 md:p-12">
          
          {/* --- ORACLE LAYOUT (MATCH CARDS) --- */}
          {isOracle ? (
            <>
              <div className="text-center mb-8 border-b border-indigo-500/30 pb-4">
                 <h2 className="text-3xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-2 animate-text-glow">{chronicle.headline}</h2>
                 <p className="text-sm text-indigo-400 font-mono uppercase">{chronicle.subtitle}</p>
              </div>

              <div className="space-y-8">
                {chronicle.matches.map((match, idx) => (
                  <div key={idx} className="oracle-card-bg rounded-lg border border-indigo-500/30 p-6 relative overflow-hidden hover:border-indigo-500/60 transition-all group hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                     <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-70"></div>
                     
                     {/* Match Header */}
                     <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-indigo-900/40 p-4 rounded-lg relative shadow-inner border border-indigo-500/20">
                        
                        <div className="text-center md:text-right flex-1">
                           <h4 className="font-black text-xl text-white leading-tight tracking-tight">{match.home}</h4>
                           <p className="text-xs text-indigo-300 font-mono uppercase tracking-wider">{match.homeCoach}</p>
                        </div>
                        <div className="flex flex-col items-center px-4 relative z-10">
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent blur-xl -z-10 rounded-full transform scale-150"></div>
                           <span className="text-4xl font-black text-yellow-300 tracking-widest drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] animate-text-glow">{match.prediction}</span>
                           <span className="text-[10px] uppercase font-bold bg-indigo-600/30 px-3 py-1 rounded-full text-indigo-200 mt-2 border border-indigo-500/40 shadow-sm backdrop-blur-sm">Confianza: {match.confidence}%</span>
                        </div>
                        <div className="text-center md:text-left flex-1">
                           <h4 className="font-black text-xl text-white leading-tight tracking-tight">{match.away}</h4>
                           <p className="text-xs text-indigo-300 font-mono uppercase tracking-wider">{match.awayCoach}</p>
                        </div>
                     </div>

                     {/* Analysis */}
                     <div className="mb-6 space-y-4 text-sm font-light text-indigo-100">
                        <div className="flex gap-3">
                           <div className="min-w-[24px] pt-1"><LayoutList size={18} className="text-purple-400"/></div>
                           <div>
                              <strong className="text-purple-400 uppercase text-xs tracking-wider block mb-1">Clave Táctica</strong>
                              <p className="leading-relaxed opacity-90">{match.tacticalKey}</p>
                           </div>
                        </div>
                        <div className="flex gap-3">
                           <div className="min-w-[24px] pt-1"><Quote size={18} className="text-indigo-400"/></div>
                           <div>
                              <strong className="text-indigo-400 uppercase text-xs tracking-wider block mb-1">El Comentario Ácido</strong>
                              <p className="italic text-indigo-200 leading-relaxed">"{match.remark}"</p>
                           </div>
                        </div>
                     </div>

                     {/* Betting Actions inside Oracle */}
                     <div className="flex justify-center gap-3 pt-4 border-t border-indigo-500/20">
                        <button 
                          onClick={() => onBet(`oracle-${idx}`, 'follow', 1.90)} // Simulated generic odd
                          className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded text-xs font-bold uppercase transition-all hover:shadow-[0_0_10px_rgba(74,222,128,0.2)]"
                        >
                          <ThumbsUp size={14} /> Seguir al Oráculo (x1.90)
                        </button>
                        <button 
                          onClick={() => onBet(`oracle-${idx}`, 'against', 2.50)} 
                          className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded text-xs font-bold uppercase transition-all hover:shadow-[0_0_10px_rgba(248,113,113,0.2)]"
                        >
                          <ThumbsDown size={14} /> Ir a la Contra (x2.50)
                        </button>
                     </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* --- NEWSPAPER LAYOUT --- */
            <>
              <div className="text-center mb-8 pb-6 border-b-4 border-double border-slate-800">
                 <span className="block text-xs font-bold uppercase tracking-[0.3em] mb-2 text-red-700">
                   {chronicle.title}
                 </span>
                 <h2 className="text-4xl md:text-5xl font-black uppercase leading-none mb-4 font-serif">
                   {chronicle.headline}
                 </h2>
                 <div className="flex justify-center items-center gap-4 text-xs font-bold uppercase text-slate-500">
                   <span>{chronicle.subtitle}</span>
                   <span>•</span>
                   <span>Por {chronicle.author}</span>
                 </div>
              </div>

              <div className="space-y-6 text-lg leading-relaxed font-serif text-justify">
                 {chronicle.fullText.map((paragraph, idx) => (
                   <p key={idx} className={idx === 0 ? "first-letter:text-5xl first-letter:font-black first-letter:text-slate-900 first-letter:mr-2 first-letter:float-left" : ""}>
                     {paragraph}
                   </p>
                 ))}
              </div>
            </>
          )}

          <div className={`mt-12 pt-6 border-t ${isNewspaper ? 'border-slate-300' : 'border-indigo-500/30'} flex flex-col items-center`}>
             {isNewspaper ? (
               <div className="text-center">
                 <Newspaper size={32} className="mx-auto mb-2 text-slate-400" />
                 <p className="text-[10px] font-mono uppercase text-slate-500">Diario de la Morgue • Edición Impresa con Sangre Real</p>
               </div>
             ) : (
               <div className="text-center">
                 <Eye size={32} className="mx-auto mb-2 text-indigo-500 animate-pulse" />
                 <p className="text-[10px] font-mono uppercase text-indigo-400">El Ojo de Nuffle lo ve todo • No se aceptan devoluciones</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChroniclesSection = ({ onBet }) => {
  const [selectedChronicle, setSelectedChronicle] = useState(null);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        
        <div className="bg-[#f3f1e7] dark:bg-[#1a1816] text-slate-900 dark:text-[#d0c8c0] rounded-lg shadow-xl overflow-hidden border-2 border-slate-400 dark:border-[#4a403a] relative group transition-transform hover:-translate-y-1">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")'}}></div>
          
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-900/20 rounded-full blur-xl pointer-events-none"></div>

          <div className="p-6 relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4 border-b-2 border-slate-800 dark:border-[#5e5045] pb-2">
              <div className="bg-slate-800 text-white p-2 rounded-full">
                <Newspaper size={24} />
              </div>
              <div>
                <h3 className="font-black uppercase text-2xl leading-none font-serif">Diario de la Morgue</h3>
                <span className="text-xs font-bold text-red-700 dark:text-red-500 uppercase tracking-widest">Edición Sangrienta</span>
              </div>
            </div>
            
            <div className="mb-4 flex-grow">
              <h4 className="text-xl font-bold font-serif mb-1 leading-tight uppercase">{CHRONICLES.recap.headline}</h4>
              <p className="text-xs uppercase font-bold text-slate-500 dark:text-[#8a7d72] mb-3 border-b border-slate-300 dark:border-[#3a302a] pb-2 inline-block">{CHRONICLES.recap.subtitle}</p>
              <p className="text-sm font-serif leading-relaxed text-justify opacity-90 line-clamp-4">
                {CHRONICLES.recap.excerpt}
              </p>
            </div>
            
            <div className="mt-4 pt-4 border-t-2 border-double border-slate-300 dark:border-[#3a302a] flex justify-between items-center text-xs font-mono">
              <span className="italic text-slate-500 font-bold">{CHRONICLES.recap.author}</span>
              <button 
                onClick={() => setSelectedChronicle(CHRONICLES.recap)}
                className="bg-slate-800 text-[#f3f1e7] px-3 py-1 font-bold uppercase hover:bg-red-700 transition-colors transform rotate-1 flex items-center gap-2"
              >
                Leer Completo <ArrowRight size={12}/>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-indigo-950 dark:bg-[#120b29] text-indigo-100 rounded-lg shadow-xl overflow-hidden border-2 border-indigo-500/30 relative group transition-transform hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent pointer-events-none"></div>
          <div className="absolute -right-10 -top-10 text-indigo-500/10 rotate-12 animate-pulse">
            <Eye size={180} />
          </div>

          <div className="p-6 relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4 border-b-2 border-indigo-500/30 pb-2">
              <div className="bg-indigo-600 text-white p-2 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="font-black uppercase text-2xl leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-400">El Oráculo</h3>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Predicciones & Apuestas</span>
              </div>
            </div>
            
            <div className="mb-4 flex-grow">
              <h4 className="text-xl font-bold italic mb-1 text-white drop-shadow-lg">{CHRONICLES.oracle.headline}</h4>
              <p className="text-xs uppercase font-bold text-indigo-400 mb-3">{CHRONICLES.oracle.subtitle}</p>
              <div className="relative">
                 <Quote size={24} className="absolute -left-2 -top-2 text-indigo-500/20" />
                 <p className="text-sm font-light leading-relaxed text-indigo-200 text-justify italic pl-4 border-l-2 border-indigo-500/30">
                   "{CHRONICLES.oracle.excerpt}"
                 </p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-indigo-500/30 flex justify-between items-center text-xs font-mono">
              <span className="italic text-indigo-400">{CHRONICLES.oracle.author}</span>
              <button 
                onClick={() => setSelectedChronicle(CHRONICLES.oracle)}
                className="border border-indigo-400 text-indigo-300 px-3 py-1 font-bold uppercase hover:bg-indigo-500 hover:text-white hover:border-transparent transition-all shadow-[0_0_10px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] flex items-center gap-2"
              >
                Consultar <ArrowRight size={12}/>
              </button>
            </div>
          </div>
        </div>

      </div>

      {selectedChronicle && (
        <ChronicleModal 
          chronicle={selectedChronicle} 
          onClose={() => setSelectedChronicle(null)}
          onBet={onBet} 
        />
      )}
    </>
  );
};

/**
 * ============================================================================
 * APP PRINCIPAL
 * ============================================================================
 */

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [wallet, setWallet] = useState(50000); // 50k MO iniciales
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  // Función para procesar apuestas
  const handleBet = (matchId, selection, odd) => {
    const betAmount = 1000; // Apuesta fija por demo
    
    if (wallet < betAmount) {
      showNotification("¡Estás en bancarrota! Pide un préstamo al Goblin.", "error");
      return;
    }

    setWallet(prev => prev - betAmount);
    
    // Feedback personalizado según origen
    if (matchId.toString().startsWith('oracle')) {
       const isFollow = selection === 'follow';
       showNotification(
         isFollow 
           ? `¡Siguiendo al Oráculo! Apuesta de 1000 MO aceptada.`
           : `¡Desafiando al Oráculo! Apuesta de 1000 MO en contra.`,
         "success"
       );
    } else {
       // Esto ya no debería dispararse desde el Fixture si quitamos los botones, 
       // pero lo mantenemos por robustez.
       showNotification(`Apuesta registrada. ¡Suerte!`, "success");
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-red-900 selection:text-white ${isDark ? 'dark bg-carbon text-slate-200' : 'bg-ice-gradient text-slate-800'}`}>
      <GlobalStyles />
      
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-20 right-4 z-[100] px-6 py-4 rounded-lg shadow-2xl border-l-4 animate-toast font-bold flex items-center gap-3 ${notification.type === 'error' ? 'bg-red-900 text-white border-red-500' : 'bg-slate-900 text-yellow-500 border-yellow-500'}`}>
           {notification.type === 'error' ? <Siren size={20}/> : <Coins size={20}/>}
           {notification.message}
        </div>
      )}

      {/* --- Header --- */}
      <header className="sticky top-0 z-50 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md border-b-4 border-slate-800 dark:border-slate-900 shadow-lg transition-colors duration-500">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between relative z-20">
          <div className="flex items-center gap-2">
            <div className="bg-red-700 text-white p-1.5 font-black italic transform -skew-x-12 shadow-md">
              LJ
            </div>
            <span className="font-extrabold tracking-tighter text-xl uppercase hidden sm:block text-slate-800 dark:text-white">
              Liga <span className="text-red-600">Jamón</span>
            </span>
          </div>

          <nav className="hidden lg:flex gap-6 text-sm font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400 items-center">
            <a href="#torneo" className="hover:text-red-600 transition-colors">Torneo</a>
            <a href="#cronicas" className="hover:text-red-600 transition-colors">Prensa</a>
            <a href="#campeones" className="hover:text-red-600 transition-colors">Campeones</a>
            <a href="#premios" className="hover:text-red-600 transition-colors">Logros</a>
          </nav>

          <div className="flex items-center gap-4">
            <UserWallet balance={wallet} />
            <a href="#" className="bg-red-700 hover:bg-red-600 text-white px-4 py-1.5 rounded text-xs font-bold uppercase transform transition hover:scale-105 shadow-lg shadow-red-900/20">
              Únete
            </a>
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
          </div>
        </div>
        
        {/* Efecto de "Alta Tensión" */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-900 via-red-600 to-red-900 animate-border-pulse shadow-[0_0_15px_rgba(220,38,38,0.6)] z-10"></div>
      </header>

      <main>
        {/* --- Hero --- */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-5 dark:opacity-10">
             <Skull size={500} strokeWidth={0.5} className="animate-pulse" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-red-900/10 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs font-bold uppercase mb-4 border border-red-500/30 backdrop-blur-sm">
              Temporada V: Pretemporada Sangrienta
            </span>
            <h1 className="text-6xl md:text-9xl font-black italic uppercase leading-none mb-6 glitch-text tracking-tighter text-slate-900 dark:text-white">
              Sangre, Sudor <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                & Embutidos
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 font-light">
              La liga de Blood Bowl donde las reglas son sugerencias y la integridad física es completamente opcional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#torneo" className="px-8 py-4 bg-red-700 hover:bg-red-600 text-white font-black uppercase italic tracking-wider rounded shadow-lg hover:shadow-red-500/50 transition transform hover:-translate-y-1 relative overflow-hidden group block text-center">
                <span className="relative z-10">Ver Clasificación</span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition duration-700"></div>
              </a>
            </div>
          </div>
        </section>

        <Ticker items={TICKER_ITEMS} />

        {/* --- SECCIÓN ACCIÓN EN VIVO --- */}
        <section id="torneo" className="py-20 border-b border-slate-300/50 dark:border-slate-800 bg-slate-50/50 dark:bg-black/20 backdrop-blur-sm">
           <div className="container mx-auto px-4 max-w-6xl">
             <SectionHeading title="Acción en Vivo" subtitle="Temporada V - Fase Regular" />
             
             <div className="space-y-12 animate-fade-in-up">
                {/* 1. Fixture con Apuestas */}
                <div>
                   <FixtureSection onBet={handleBet} />
                </div>

                {/* 2. Clasificación General */}
                <div>
                   <StandingsSection />
                </div>
             </div>
           </div>
        </section>

        {/* --- SECCIÓN CRÓNICAS --- */}
        <section id="cronicas" className="py-20 border-b border-slate-300/50 dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-6xl">
            <SectionHeading title="Prensa y Rumores" subtitle="Lo que nadie se atreve a decir (sobrios)" />
            <ChroniclesSection onBet={handleBet} />
          </div>
        </section>

        {/* --- Campeones --- */}
        <section id="campeones" className="py-24 border-b border-slate-300/50 dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-5xl">
            <SectionHeading title="Salón de la Fama" subtitle="El Podio de la Muerte" />
            
            <div className="space-y-8 animate-fade-in-up">
              {CHAMPIONS.map((c) => (
                <div key={c.edicion} className="relative group">
                   <div className={`bg-white dark:bg-slate-900/80 backdrop-blur-sm border-l-4 ${c.estado === 'Vigente' ? 'border-green-500' : 'border-slate-500'} rounded-r-xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:translate-x-1`}>
                     
                     <div className="bg-slate-100 dark:bg-black/40 px-6 py-3 flex justify-between items-center border-b border-slate-200 dark:border-white/5">
                        <div className="flex items-center gap-3">
                           <span className="text-3xl font-black italic text-slate-300 dark:text-slate-700 select-none">#{c.edicion}</span>
                           <h3 className="text-lg font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">{c.nombre}</h3>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${c.estado === 'Vigente' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/20'}`}>
                           {c.estado}
                        </span>
                     </div>

                     <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        <div className="md:col-span-6 flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 relative overflow-hidden">
                           <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
                           <div className="p-3 bg-yellow-500 rounded-full text-white shadow-lg shadow-yellow-500/20">
                              <Crown size={24} fill="currentColor" className="text-white" />
                           </div>
                           <div>
                              <span className="block text-[10px] uppercase font-bold text-yellow-600 dark:text-yellow-500 tracking-wider mb-1">Campeón</span>
                              <h4 className="text-2xl font-black uppercase italic text-slate-900 dark:text-white leading-none mb-1">{c.campeon.equipo}</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">{c.campeon.manager} <span className="opacity-50">|</span> {c.campeon.faccion}</p>
                           </div>
                           <div className="absolute right-0 top-0 p-4 opacity-10 pointer-events-none">
                              <Trophy size={64} className="text-yellow-500" />
                           </div>
                        </div>

                        <div className="md:col-span-6 grid grid-cols-2 gap-4">
                           <div className="flex flex-col p-3 rounded bg-slate-50 dark:bg-white/5 border-l-2 border-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition">
                              <div className="flex items-center gap-2 mb-2">
                                 <Medal size={14} className="text-slate-400" />
                                 <span className="text-[10px] uppercase font-bold text-slate-500">Subcampeón</span>
                              </div>
                              <span className="font-bold text-slate-800 dark:text-slate-200 leading-tight">{c.subcampeon.equipo}</span>
                              <span className="text-xs text-slate-500 truncate">{c.subcampeon.manager}</span>
                           </div>

                           <div className="flex flex-col p-3 rounded bg-slate-50 dark:bg-white/5 border-l-2 border-amber-700 hover:bg-slate-100 dark:hover:bg-white/10 transition">
                              <div className="flex items-center gap-2 mb-2">
                                 <Shield size={14} className="text-amber-700" />
                                 <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-600">Tercero</span>
                              </div>
                              {c.bronce ? (
                                 <>
                                    <span className="font-bold text-slate-800 dark:text-slate-200 leading-tight">{c.bronce.equipo}</span>
                                    <span className="text-xs text-slate-500 truncate">{c.bronce.manager}</span>
                                 </>
                              ) : (
                                 <span className="text-xs italic text-slate-400 mt-1">Sin datos</span>
                              )}
                           </div>

                        </div>
                     </div>
                   </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* --- Coaches Grid (Expanded) --- */}
        <section id="coaches" className="py-20 bg-slate-50/50 dark:bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <SectionHeading title="Staff Técnico" subtitle="Estadísticas, manías y antecedentes penales" align="right" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {COACHES.map((coach) => (
                <div key={coach.id} className="h-auto">
                  <CoachCard coach={coach} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Premios --- */}
        <section id="premios" className="py-24 relative">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 animate-fade-in-up">
              <SectionHeading title="Logros Desbloqueados" subtitle="Hitos infames de la liga" />
            </div>
            
            <AchievementGrid awards={AWARDS} />
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t-4 border-red-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <h4 className="text-white font-black italic text-3xl mb-4 uppercase tracking-tighter">Liga Jamón</h4>
              <p className="text-sm max-w-xs mb-6 text-slate-500 leading-relaxed">
                Plataforma no oficial de Blood Bowl. El uso de dados cargados está estrictamente permitido siempre que el comisario no esté mirando.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center hover:bg-red-700 hover:text-white transition cursor-pointer"><Target size={20} /></div>
                <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center hover:bg-red-700 hover:text-white transition cursor-pointer"><Users size={20} /></div>
              </div>
            </div>
            
            <div>
              <h5 className="text-white font-bold uppercase mb-6 text-xs tracking-widest">Recursos</h5>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Reglamento NAF</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Calculadora de Placajes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Donaciones (Sobornos)</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold uppercase mb-6 text-xs tracking-widest">Patrocinadores</h5>
              <div className="font-black text-4xl text-slate-800 uppercase leading-none space-y-2 select-none">
                <div className="hover:text-slate-600 transition-colors duration-500 cursor-help" title="Sabe a sangre, huele a victoria">ORCA COLA</div>
                <div className="hover:text-slate-600 transition-colors duration-500 cursor-help" title="Las mejores hamburguesas de rata">McMURTY'S</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-slate-600">
            <p>&copy; {new Date().getFullYear()} Liga Jamón. Construido sobre un cementerio indio.</p>
            <p className="mt-2 md:mt-0 flex items-center hover:text-red-500 transition-colors cursor-pointer">
              <Info size={12} className="mr-2" /> 
              Reportar bug (o jugador muerto)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;