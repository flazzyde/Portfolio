import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "motion/react";
import { 
  Github, 
  Mail, 
  Terminal, 
  ChevronDown,
  Send,
  MessageSquare,
  CheckCircle2,
  Loader2,
  ArrowUp,
  Award,
  Menu,
  X
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { LegalSection, LegalTab } from "./components/LegalSection";
import { ContactSection } from "./components/ContactForm";

// Types for our data
interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: string;
  link?: string;
  github?: string;
  status?: string;
  discordInvite?: string;
  featured?: boolean;
  platform?: string;
  version?: string;
  features?: string[];
  highlights?: string[];
}

interface PortfolioData {
  name: string;
  tagline: string;
  bio: string;
  skills: string[];
  categories: string[];
  projects: Project[];
  socials: {
    github: string;
    email: string;
    phone: string;
    phoneFormatted: string;
  };
}


// Initial placeholder data
const DEFAULT_DATA: PortfolioData = {
  name: "Odin (Flazzy)",
  tagline: "Leidenschaftlicher Programmierer & Tech-Enthusiast",
  bio: "Hi, ich bin Odin – leidenschaftlicher Entwickler. Für mich bedeutet Programmieren, visionäre Ideen durch Code zum Leben zu erwecken. Von hochmodernen Web-Plattformen über intelligente Discord-Bots bis hin zu komplexen IT-Infrastrukturen erschaffe ich innovative Software-Lösungen mit unbändigem Tatendrang und absolutem Fokus auf Clean Code.",
  skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Python", "Lua", "Debian", "Linux", "Supabase", "VSCode", "Antigravity", "Docker"],
  categories: ["Alle", "FiveM", "Web", "Hosting", "System", "Bots", "Tools"],
  projects: [
    {
      id: "flazzy-toolbox",
      featured: true,
      category: "Tools",
      title: "Flazzy Toolbox",
      description: "Modulare Windows-Toolbox mit Plugin-System: Termine und Notizen per Hotkey anlegen, dazu Kalender, Aufgaben und weitere Apps zum Nachinstallieren. Alle Daten bleiben lokal, ohne Konto und ohne Tracking.",
      tech: ["Electron 33", "JavaScript", "NSIS", "Cloudflare R2", "Webviews"],
      link: "https://toolbox.flazzy.de",
      status: "v1.2.0 • In Entwicklung",
      platform: "Windows 10/11 (64-Bit)",
      version: "1.2.0",
      features: [
        "Quick-Add (Strg+Alt+Space): Termine & Notizen mit deutscher Erkennung von Datum und Uhrzeit",
        "Command Palette (Strg+K): Fuzzy-Suche über alle Aktionen und installierten Plugins",
        "Plugin-System: Apps wie Kalender, Notizen, Aufgaben & Passwort-Generator einzeln nachinstallierbar",
        "Windows-Toast Erinnerungen & Tray-Modus für nahtlosen Hintergrundbetrieb",
        "Tägliche Backups (max. 7), ZIP-Export/-Import & dynamische Theme-Engine (Dark/Light/System)",
        "Auto-Update mit SHA-256-Prüfung, Rollback-Schutz und getrenntem Stable/Beta-Kanal"
      ],
      highlights: [
        "100% lokal: Keine Registrierung, kein Login, kein Tracking",
        "Theme- und Akzentfarben-Vererbung an alle Webview-Plugins",
        "Granulare Update-Steuerung für jedes einzelne Plugin"
      ]
    },
    {
      id: "cloun",
      featured: false,
      category: "Web",
      title: "Cloun by Flazzy",
      description: "Ein Discord-Klon für Echtzeit-Kommunikation mit Servern, Channels, Direktnachrichten und Emoji-Reaktionen. (Entwicklung abgebrochen / archiviert).",
      tech: ["React", "TypeScript", "Supabase", "Tailwind"],
      link: "https://cloun.flazzy.de",
      discordInvite: "https://discord.gg/TQs6McKJJs",
      status: "Abgebrochen"
    },
    {
      id: "flazzydj",
      category: "Tools",
      title: "FlazzyDJ",
      description: "Ein intelligentes Python-Tool, das Demucs für die Stem-Separation nutzt und die Claude API als 'DJ-Brain' verwendet, um Musik dynamisch zu analysieren und zu mixen.",
      tech: ["Python", "Demucs", "Claude API"]
    },
    {
      id: "nsrp-bot",
      category: "Bots",
      title: "NSRP Discord Bot",
      description: "Ein umfangreicher Discord-Bot mit über 4700 Zeilen Code und 12 Cogs. Unterstützt thread-safe JSON-Datenhaltung und ist auf die Europe/Berlin Zeitzone optimiert.",
      tech: ["Python", "discord.py"]
    },
    {
      id: "flazzy-hub",
      category: "Web",
      title: "Flazzy Hub",
      description: "Eine Gaming-Plattform im Browser, die über die GameDistribution API eine Vielzahl von Spielen bereitstellt und AdSense für die Monetarisierung integriert.",
      tech: ["React", "GameDistribution API"]
    },
    {
      id: "content-engine",
      category: "Tools",
      title: "Content Engine 2026",
      description: "Ein umfassendes E-Book, das über Gumroad in deutscher und englischer Sprache vertrieben wird und wertvolle Insights für die digitale Zukunft bietet.",
      tech: ["Gumroad", "PDF"]
    },
    {
      id: "gdpr-cog",
      category: "Bots",
      title: "GDPR Discord Cog",
      description: "Ein spezialisiertes Modul für Discord-Bots, das DSGVO-konforme Datenabfragen (/meine-daten) mit HTML-Export und Live-Progress-Embeds ermöglicht.",
      tech: ["Python", "discord.py"]
    },
    {
      id: "egs-portal",
      category: "Web",
      title: "EGS Delbrück Portal",
      description: "Eine moderne Schul-Lernplattform mit interaktiven Quizzes, einem digitalen Sitzplan-Planer und einem Whiteboard für kollaboratives Lernen.",
      tech: ["React", "Supabase", "Flask-SocketIO", "Cloudflare Pages"]
    },
    {
      id: "nc",
      category: "Hosting",
      title: "Nextcloud Hosting",
      description: "Eigene Nextcloud-Instanz für sichere Datenverwaltung, Kalender-Synchronisation und Cloud-Storage.",
      tech: ["PHP", "MySQL", "Linux"]
    },
    {
      id: "odoo",
      category: "Hosting",
      title: "Odoo Cloud",
      description: "Deployment und Management einer Odoo ERP-Lösung in der Cloud für optimierte Geschäftsprozesse.",
      tech: ["Python", "PostgreSQL", "Docker"]
    },
    {
      id: "cd",
      category: "Tools",
      title: "PC Cheat Detector",
      description: "Ein spezialisiertes Tool zur Erkennung von Manipulationen und Third-Party Software auf Windows-Systemen.",
      tech: ["C++", "WinAPI"]
    },
    {
      id: "bt",
      category: "FiveM",
      title: "FiveM Ban Tool",
      description: "Globales Ban-System für FiveM Communities, um Cheater effektiv und dauerhaft auszuschließen.",
      tech: ["Node.js", "Lua", "Supabase"]
    },
    {
      id: "dw",
      category: "Web",
      title: "Discord Wrapped",
      description: "Eine Web-Anwendung, die Discord-Statistiken für Server-Communities visuell ansprechend aufbereitet.",
      tech: ["React", "D3.js", "Discord API"]
    },
    {
      id: "1",
      category: "FiveM",
      title: "FiveM Server",
      description: "Hosting und Management eines eigenen FiveM Servers mit Fokus auf Performance und Stabilität.",
      tech: ["Linux", "FiveM", "MySQL"]
    },
    {
      id: "2",
      category: "Hosting",
      title: "Datenbank Hosting",
      description: "Skalierbarer Hosting-Service für Datenbanken (PostgreSQL/MySQL) mit automatischer Optimierung.",
      tech: ["Docker", "PostgreSQL", "Debian"]
    },
    {
      id: "3",
      category: "Web",
      title: "100% E2E Chat",
      description: "Ein absolut sicherer Messenger mit vollständiger Ende-zu-Ende-Verschlüsselung der Nachrichten.",
      tech: ["Node.js", "Cryptography", "React"]
    },
    {
      id: "4",
      category: "Hosting",
      title: "Debian Server & Pterodactyl",
      description: "Einrichtung und Verwaltung eines eigenen Debian-Servers mit Pterodactyl Panel für Game-Server Hosting und Container-Management.",
      tech: ["Debian", "Linux", "Docker"]
    },
    {
      id: "5",
      category: "System",
      title: "Flazzy OS",
      description: "Ein vollwertiges Betriebssystem, entwickelt in Python, mit grafischer Oberfläche und eigenen System-Tools.",
      tech: ["Python", "GUI Libs"]
    },
    {
      id: "6",
      category: "FiveM",
      title: "FiveM Bus Simulation",
      description: "Ein hochgradig realistisches Bus-Simulations-Script für die FiveM-Plattform mit Fokus auf Immersion.",
      tech: ["Lua", "FiveM API"]
    },
    {
      id: "7",
      category: "Tools",
      title: "FiveM Server Launcher",
      description: "Ein maßgeschneiderter Launcher für FiveM Server mit integrierten Auto-Updates und optimierter Performance.",
      tech: ["C#", ".NET"]
    },
    {
      id: "8",
      category: "Bots",
      title: "Diverse Discord Bots",
      description: "Entwicklung verschiedenster Bots für Moderation, Entertainment und spezialisierte Community-Features.",
      tech: ["Node.js", "Discord.js"]
    },
    {
      id: "9",
      category: "Web",
      title: "WebAI",
      description: "Eine KI-gestützte Plattform für innovative Web-Services und intelligente Automatisierung. (Projekt eingestellt / archiviert)",
      tech: ["React", "Gemini API", "Tailwind"],
      status: "Eingestellt"
    },
    {
      id: "10",
      category: "Web",
      title: "Schul-Lehrervoting",
      description: "Ein sicheres und anonymes System zur Lehrerbewertung, entwickelt für den Einsatz an meiner Schule.",
      tech: ["React", "Supabase", "TypeScript"]
    },
    {
      id: "11",
      category: "Software",
      title: "Frosted Designs",
      description: "Full-Stack Ökosystem bestehend aus Website, Discord-Bot und Server-Management.",
      tech: ["Next.js", "Node.js", "Express"]
    },
    {
      id: "12",
      category: "Web",
      title: "Informatik Lernwebsite",
      description: "Eine Scratch-ähnliche visuelle Lernplattform, um Schülern die Grundlagen der Programmierung näherzubringen.",
      tech: ["React", "Blockly", "Motion"]
    },
    {
      id: "13",
      category: "Web",
      title: "Persönliches Portfolio",
      description: "Dieses Portfolio: Ein minimalistisches, hochperformantes Showcase meiner technischen Projekte.",
      tech: ["React", "Vite", "Motion"],
      link: "https://flazzy.de"
    }
  ],
  socials: {
    github: "https://github.com/builtbyodin",
    email: "info@flazzy.de",
    phone: "+4917677917635",
    phoneFormatted: "+49 0176 77917635"
  }
};

function SkillCard({ skill }: { skill: string; key?: React.Key }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1]
          }
        }
      }}
      whileHover={{ 
        y: -3,
        borderColor: "rgba(255, 255, 255, 0.25)",
        backgroundColor: "rgba(255, 255, 255, 0.04)"
      }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="p-4 sm:p-6 border border-neutral-800 rounded-xl flex items-center gap-3 sm:gap-4 bg-neutral-950/50 cursor-default group"
      id={`skill-${skill.toLowerCase()}`}
    >
      <div className="text-neutral-500 group-hover:text-white group-hover:scale-110 transition-all duration-200">
        <Terminal size={18} />
      </div>
      <span className="font-medium text-neutral-300 group-hover:text-white transition-colors duration-200">{skill}</span>
    </motion.div>
  );
}

interface Certificate {
  id: string;
  company: string;
  title: string;
  verificationUrl: string;
  isIframe: boolean;
  iframeSrc?: string;
}

const CERTIFICATES_DATA: Certificate[] = [
  {
    id: "cisco-ccst",
    company: "Cisco",
    title: "Cisco Certified Support Technician (CCST) Networking",
    verificationUrl: "https://www.credly.com/badges/6936701a-6e9e-47b3-92fa-60a3595aafc5",
    isIframe: true,
    iframeSrc: "https://www.credly.com/embedded_badge/6936701a-6e9e-47b3-92fa-60a3595aafc5"
  },
  {
    id: "cisco-cybersec",
    company: "Cisco",
    title: "Cisco Cybersecurity Badge",
    verificationUrl: "https://www.credly.com/badges/f88c4876-bdbc-4378-99c2-bb2979ebe7d2",
    isIframe: true,
    iframeSrc: "https://www.credly.com/embedded_badge/f88c4876-bdbc-4378-99c2-bb2979ebe7d2"
  },
  {
    id: "ibm-ai-literacy",
    company: "IBM",
    title: "IBM SkillsBuild - AI Literacy",
    verificationUrl: "https://www.credly.com/badges/a1b3d5da-0467-4ab5-bf56-54e08c26638c",
    isIframe: true,
    iframeSrc: "https://www.credly.com/embedded_badge/a1b3d5da-0467-4ab5-bf56-54e08c26638c"
  }
];

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Alle");
  const [activeCertFilter, setActiveCertFilter] = useState("Alle");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab>("impressum");
  const detailsRef = React.useRef<HTMLElement>(null);

  const filteredProjects = DEFAULT_DATA.projects.filter(project => 
    activeFilter === "Alle" || project.category === activeFilter
  );

  const filteredCertificates = CERTIFICATES_DATA.filter(cert =>
    activeCertFilter === "Alle" || cert.company === activeCertFilter
  );

  const openLegal = (tab: LegalTab) => {
    setActiveLegalTab(tab);
    setLegalOpen(true);
    try {
      window.history.pushState(null, "", `#${tab}`);
    } catch {
      // ignore
    }
    setTimeout(() => {
      const el = document.getElementById("legal");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const closeLegal = () => {
    setLegalOpen(false);
    if (window.location.hash === "#impressum" || window.location.hash === "#datenschutz") {
      try {
        window.history.pushState(null, "", window.location.pathname);
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#impressum") {
        setActiveLegalTab("impressum");
        setLegalOpen(true);
        setTimeout(() => {
          document.getElementById("legal")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      } else if (hash === "#datenschutz") {
        setActiveLegalTab("datenschutz");
        setLegalOpen(true);
        setTimeout(() => {
          document.getElementById("legal")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToDetails = (project: Project) => {
    setSelectedProject(project);
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -140]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 14, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.48,
        ease: [0.16, 1, 0.3, 1]
      }
    },
  };

  return (
    <div className="relative min-h-screen font-sans bg-black text-white overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-neutral-900/20 rounded-full blur-[120px]"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-neutral-900/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-display font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity">
            FLAZZY<span className="text-neutral-500">.DE</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            {["Zertifikate", "Projekte", "Skills", "Kontakt"].map((item) => (
              <a 
                key={item} 
                href={`#${item === "Projekte" ? "work" : item === "Zertifikate" ? "certificates" : item === "Kontakt" ? "contact" : item.toLowerCase()}`}
                className="hover:text-white transition-colors"
                id={`nav-${item.toLowerCase()}`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a 
              href="#contact"
              className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-neutral-200 transition-all cursor-pointer inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider"
              id="nav-hire-me"
            >
              <Mail size={14} />
              Kontakt
            </a>
          </div>

          <button 
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors focus:outline-none"
            aria-label="Menü öffnen"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer Outline */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full bg-neutral-950/95 border-b border-neutral-900 md:hidden overflow-hidden backdrop-blur-xl absolute top-16 left-0 right-0 z-30"
            >
              <div className="px-6 py-8 flex flex-col gap-6 text-left">
                {["Zertifikate", "Projekte", "Skills", "Kontakt"].map((item, idx) => (
                  <motion.a 
                    key={item}
                    href={`#${item === "Projekte" ? "work" : item === "Zertifikate" ? "certificates" : item === "Kontakt" ? "contact" : item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="font-display text-2xl font-bold tracking-tight text-neutral-300 hover:text-white transition-colors pb-2 border-b border-neutral-900/40"
                  >
                    {item}
                  </motion.a>
                ))}
                
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="pt-2 flex flex-col gap-3"
                >
                  <a 
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full py-3.5 rounded-xl bg-white text-black text-center font-bold text-sm tracking-wider uppercase font-mono shadow-md hover:bg-neutral-200 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    Kontaktformular
                  </a>
                  <a 
                    href={DEFAULT_DATA.socials.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl border border-neutral-800 text-neutral-400 text-center font-bold text-sm tracking-wider uppercase font-mono hover:bg-neutral-900/50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Github size={16} />
                    GitHub Profil
                  </a>

                  <div className="pt-2 border-t border-neutral-900 flex items-center justify-center gap-6 text-xs font-mono text-neutral-500">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        openLegal("impressum");
                      }}
                      className="hover:text-white transition-colors uppercase tracking-wider underline underline-offset-4 cursor-pointer"
                    >
                      Impressum
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        openLegal("datenschutz");
                      }}
                      className="hover:text-white transition-colors uppercase tracking-wider underline underline-offset-4 cursor-pointer"
                    >
                      Datenschutz
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block py-1.5 px-3.5 mb-6 md:mb-8 rounded-full border border-neutral-800 text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase bg-neutral-950/50 backdrop-blur-sm"
          >
            Verfügbar für neue Herausforderungen
          </motion.span>
          
          <h1 className="font-display text-4xl sm:text-7xl md:text-9xl font-bold tracking-tighter leading-[1.05] md:leading-[0.9] mb-6 md:mb-10 overflow-hidden">
            {DEFAULT_DATA.tagline.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 mr-[0.15em] sm:mr-[0.2em]">
                <motion.span 
                  variants={itemVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p 
            variants={itemVariants}
            className="max-w-2xl text-neutral-400 text-sm sm:text-base md:text-xl mb-10 md:mb-14 leading-relaxed font-light px-2"
          >
            {DEFAULT_DATA.bio}
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-6 md:gap-8 justify-center"
          >
            <a 
              href={DEFAULT_DATA.socials.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-all transform hover:scale-110" 
              id="hero-github"
            >
              <Github size={24} className="md:w-7 md:h-7" />
            </a>
            <a 
              href="#work"
              className="flex items-center gap-2 text-[11px] md:text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group"
            >
              Projekte ansehen
              <ChevronDown size={14} className="transform -rotate-90 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-16 md:mt-32 text-neutral-800"
        >
          <ChevronDown size={28} className="md:w-8 md:h-8" />
        </motion.div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-16 md:py-24 px-4 sm:px-6 border-t border-neutral-900 bg-neutral-950/20 relative overflow-hidden">
        {/* Background glow specific to certificates */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4 md:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-left"
            >
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-3 md:mb-4 italic tracking-tighter text-white">Meine Zertifikate:</h2>
              <p className="text-neutral-500 max-w-md italic uppercase text-xs sm:text-sm tracking-widest">Offizielle Auszeichnungen & verifizierte Qualifikationen.</p>
            </motion.div>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="h-[1px] flex-grow bg-neutral-900 hidden md:block mx-12 mb-4 origin-left" 
            />
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-mono text-xs sm:text-sm text-neutral-700 uppercase hidden md:block mb-4"
            >
              Qualifikationen ({filteredCertificates.length})
            </motion.span>
          </div>

          {/* Certificate Filter Bar */}
          <div className="flex gap-3 mb-12 md:mb-16 overflow-x-auto pb-4 scrollbar-hide">
            {["Alle", "Cisco", "IBM"].map((company) => (
              <button
                key={company}
                onClick={() => setActiveCertFilter(company)}
                className={`px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] transition-all whitespace-nowrap ${
                  activeCertFilter === company 
                  ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                  : "bg-neutral-900 text-neutral-500 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {company}
              </button>
            ))}
          </div>

          {/* Minimalist Grid of Badges */}
          <div className="flex flex-wrap gap-8 justify-center items-center min-h-[180px] py-4">
            <AnimatePresence mode="popLayout">
              {filteredCertificates.length > 0 ? (
                filteredCertificates.map((cert) => (
                  <motion.a
                    key={cert.id}
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${cert.title} – Auf Credly verifizieren`}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.25)" }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex items-center justify-center overflow-hidden w-[180px] h-[300px] rounded-2xl border border-neutral-900 bg-neutral-950/40 hover:border-neutral-700 transition-colors select-none cursor-pointer"
                  >
                    <div className="w-[150px] h-[270px] relative rounded-none overflow-hidden flex items-center justify-center pointer-events-none">
                      <div className="w-[150px] h-[270px] flex items-center justify-center">
                        <iframe 
                          name="acclaim-badge" 
                          frameBorder="0" 
                          id={`embedded-badge-${cert.id}`} 
                          scrolling="no" 
                          src={cert.iframeSrc} 
                          style={{ width: "150px", height: "270px" }} 
                          title={cert.title}
                          className="bg-transparent filter drop-shadow-md pointer-events-none"
                        />
                      </div>
                      <div className="absolute inset-0 bg-transparent z-10" />
                    </div>
                  </motion.a>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 font-mono text-xs uppercase tracking-widest text-center py-12"
                >
                  Noch keine Zertifikate gelistet
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto overflow-visible">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-left"
          >
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-3 md:mb-4 italic tracking-tighter text-white">Projekte</h2>
            <p className="text-neutral-500 max-w-md italic uppercase text-xs sm:text-sm tracking-widest">Ein Auszug meiner technischen Lösungen und Eigenentwicklungen.</p>
          </motion.div>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="h-[1px] flex-grow bg-neutral-900 hidden md:block mx-12 mb-4 origin-left" 
          />
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="font-mono text-sm text-neutral-700 uppercase hidden md:block mb-4"
          >
            Gesamt ({filteredProjects.length})
          </motion.span>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-3 mb-10 md:mb-16 overflow-x-auto pb-4 scrollbar-hide">
          {DEFAULT_DATA.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] transition-all whitespace-nowrap ${
                activeFilter === cat 
                ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                : "bg-neutral-900 text-neutral-500 hover:text-white hover:bg-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                whileHover={{ 
                  y: -4, 
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(255, 255, 255, 0.18)",
                  boxShadow: "0 16px 36px -12px rgba(0, 0, 0, 0.55)"
                }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ 
                  layout: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
                }}
                className={`group p-6 sm:p-8 rounded-[24px] sm:rounded-3xl border transition-all cursor-default flex flex-col h-full ${
                  project.featured 
                  ? "border-neutral-700 bg-neutral-900/40 col-span-1 md:col-span-2 lg:col-span-2" 
                  : "border-neutral-900 bg-neutral-950/50"
                }`}
                id={`project-${project.id}`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-3 rounded-2xl ${project.featured ? "bg-neutral-800 text-white" : "bg-neutral-900 text-neutral-400"} group-hover:text-white transition-colors`}>
                    <Terminal size={24} />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex flex-wrap gap-2 justify-end">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] font-mono border border-neutral-800 px-2 py-1 rounded text-neutral-500 uppercase tracking-tighter">
                          {t}
                        </span>
                      ))}
                    </div>
                    {project.status && (
                      <span className={`text-[9px] font-mono px-2 py-1 rounded uppercase tracking-[0.1em] ${
                        project.status.includes('Abgebrochen') || project.status.includes('Eingestellt')
                          ? 'bg-neutral-900 text-neutral-500 border border-neutral-800 line-through/none'
                          : project.status.includes('Entwicklung')
                          ? 'bg-amber-950/40 text-amber-400 border border-amber-900/40'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {project.status}
                      </span>
                    )}
                  </div>
                </div>
                
                <h3 className="text-2xl font-display font-medium mb-4 group-hover:text-white transition-colors">{project.title}</h3>
                
                <p className="text-neutral-500 leading-relaxed italic mb-10 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => scrollToDetails(project)}
                    className="w-full py-4 px-6 rounded-xl border border-neutral-800 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white hover:border-neutral-500 transition-all flex items-center justify-between group/btn"
                  >
                    Details ansehen
                    <ChevronDown size={14} className="transform -rotate-90 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  
                  {(project.discordInvite || project.link) && (
                    <div className={`grid gap-4 ${project.discordInvite && project.link ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {project.discordInvite && (
                        <a 
                          href={project.discordInvite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-4 px-6 rounded-xl bg-[#5865F2] text-white text-xs font-mono uppercase tracking-widest font-bold hover:bg-[#4752c4] transition-all flex items-center justify-center gap-2"
                        >
                          <MessageSquare size={14} />
                          Discord
                        </a>
                      )}
                      
                      {project.link && (
                        <a 
                          href={project.link}
                          target={project.link.startsWith("mailto:") ? "_self" : "_blank"}
                          rel="noopener noreferrer"
                          className="py-4 px-6 rounded-xl bg-white text-black text-xs font-mono uppercase tracking-widest font-bold hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                        >
                          {project.id === "flazzy-toolbox" 
                            ? "Website & Download" 
                            : project.link.startsWith("mailto:") 
                            ? "Kontakt" 
                            : "Demo"}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Project Details Placeholder Section */}
      <section 
        id="project-details" 
        ref={detailsRef}
        className="py-10 scroll-mt-24"
      >
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-7xl mx-auto px-4 sm:px-6"
            >
              <div className="bg-neutral-900/50 rounded-[24px] sm:rounded-[40px] p-6 sm:p-12 md:p-20 border border-neutral-800 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                  <Terminal size={300} />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <span className="px-3.5 py-1 rounded-full border border-neutral-700 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400">
                      {selectedProject.category}
                    </span>
                    <div className="h-[1px] w-12 bg-neutral-800" />
                    <span className="text-neutral-500 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest">
                      ID: {selectedProject.id}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-6 md:mb-10 tracking-tighter leading-tight">
                    {selectedProject.title}
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    <div>
                      <p className="text-base sm:text-xl text-neutral-300 leading-relaxed italic mb-6 md:mb-10 font-light">
                        {selectedProject.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2.5 mb-6 md:mb-10">
                        {selectedProject.tech.map(t => (
                          <span key={t} className="px-3 py-1 rounded-lg bg-neutral-800 text-[10px] sm:text-xs font-mono text-neutral-400 uppercase">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="p-5 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3 sm:mb-4">Projekt Status</h4>
                        <div className={`flex items-center gap-2 ${
                          selectedProject.status?.includes('Abgebrochen') || selectedProject.status?.includes('Eingestellt')
                            ? 'text-neutral-500'
                            : selectedProject.status?.includes('Entwicklung') 
                            ? 'text-amber-500' 
                            : 'text-green-500'
                        }`}>
                          {selectedProject.status?.includes('Abgebrochen') || selectedProject.status?.includes('Eingestellt') ? (
                            <X size={16} className="text-neutral-500" />
                          ) : selectedProject.status?.includes('Entwicklung') ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <CheckCircle2 size={16} />
                          )}
                          <span className="text-xs sm:text-sm font-mono">{selectedProject.status || 'Abgeschlossen / In Produktion'}</span>
                        </div>

                        {selectedProject.platform && (
                          <div className="mt-4 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-mono">
                            <span className="text-neutral-500 uppercase tracking-wider">Plattform</span>
                            <span className="text-neutral-300">{selectedProject.platform}</span>
                          </div>
                        )}
                      </div>

                      {selectedProject.features && selectedProject.features.length > 0 && (
                        <div className="mt-6 p-5 sm:p-8 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                          <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-white" />
                            Kernfunktionen & Features
                          </h4>
                          <ul className="space-y-2.5">
                            {selectedProject.features.map((feat, idx) => (
                              <li key={idx} className="text-xs sm:text-sm text-neutral-300 flex items-start gap-2.5 leading-relaxed font-light">
                                <span className="text-neutral-600 font-mono text-xs mt-0.5">•</span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-between gap-6">
                      <div>
                        {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                          <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-left">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">Besonderheiten & Architektur</h4>
                            <ul className="space-y-2.5">
                              {selectedProject.highlights.map((h, idx) => (
                                <li key={idx} className="text-xs sm:text-sm text-neutral-300 flex items-start gap-2.5 leading-relaxed font-light">
                                  <span className="text-white text-xs font-bold mt-0.5">✓</span>
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
                          {selectedProject.id === 'flazzy-toolbox'
                            ? "Flazzy Toolbox wurde als datenschutzfreundliche, modulare Windows-Produktivitätszentrale gebaut: Alle Termine, Notizen und Aufgaben verbleiben 100% lokal ohne Account-Zwang. Über das Webview-Plugin-System kann die App nahtlos um eigene Erweiterungen ergänzt werden."
                            : selectedProject.id === 'cloun' 
                            ? "Die Entwicklung von Cloun wurde offiziell abgebrochen. Das Projekt wird nicht mehr weitergeführt und dient als archivierte Referenz."
                            : selectedProject.id === '9'
                            ? "WebAI war eine modulare Plattform für KI-gestützte Web-Services und intelligente Automatisierung. Die Entwicklung wurde offiziell eingestellt und das Projekt dient als archivierte Code-Referenz."
                            : "Dies ist eine detaillierte Übersicht des Projekts. Hier könnten weitere Informationen wie Herausforderungen, Lösungen und Metriken stehen."
                          }
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-3 sm:gap-4">
                        {selectedProject.link && (
                          <a 
                            href={selectedProject.link}
                            target={selectedProject.link.startsWith("mailto:") ? "_self" : "_blank"}
                            rel="noopener noreferrer"
                            className="bg-white text-black px-6 py-3.5 rounded-xl font-bold hover:bg-neutral-200 transition-all text-center flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider font-mono shadow-md"
                          >
                            {selectedProject.id === 'flazzy-toolbox'
                              ? "Website & Download (toolbox.flazzy.de)"
                              : selectedProject.link.startsWith("mailto:") 
                              ? "Kontakt per E-Mail" 
                              : "Live Demo besuchen"}
                          </a>
                        )}
                        
                        {selectedProject.discordInvite && (
                          <a 
                            href={selectedProject.discordInvite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#5865F2] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-[#4752c4] transition-all text-center flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider font-mono shadow-md"
                          >
                            <MessageSquare size={16} />
                            Discord Server joinen
                          </a>
                        )}

                        <button 
                          onClick={() => setSelectedProject(null)}
                          className="border border-neutral-800 px-6 py-3.5 rounded-xl font-bold hover:bg-neutral-800 transition-all text-center text-xs sm:text-sm uppercase tracking-wider font-mono text-neutral-400 hover:text-white"
                        >
                          Schließen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-neutral-800/40 italic"
            >
              <p>Wähle ein Projekt aus, um Details zu sehen.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

{/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4 tracking-tighter text-white">Tech Stack</h2>
            <p className="text-neutral-500">Die Werkzeuge und Technologien, die ich nutze.</p>
          </div>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {DEFAULT_DATA.skills.map((skill) => (
              <SkillCard key={skill} skill={skill} />
            ))}
          </motion.div>
        </div>
      </section>


      {/* Contact Form Section (Formspree) */}
      <ContactSection onOpenLegal={openLegal} />

      {/* Legal Section (Impressum & Datenschutz) */}
      <LegalSection
        isOpen={legalOpen}
        activeTab={activeLegalTab}
        onClose={closeLegal}
        onTabChange={setActiveLegalTab}
      />

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-neutral-900 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} FLAZZY.DE — DESIGNED BY AI
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-3 text-neutral-500 text-sm font-medium">
            <a href="#certificates" className="hover:text-white transition-colors uppercase tracking-wider">Zertifikate</a>
            <a href="#work" className="hover:text-white transition-colors uppercase tracking-wider">Projekte</a>
            <a href="#skills" className="hover:text-white transition-colors uppercase tracking-wider">Skills</a>
            <a href="#contact" className="hover:text-white transition-colors uppercase tracking-wider">Kontakt</a>
            <a href={DEFAULT_DATA.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors uppercase tracking-wider">GitHub</a>
            <button
              type="button"
              onClick={() => openLegal("impressum")}
              className="hover:text-white transition-colors uppercase tracking-wider font-mono text-xs cursor-pointer text-neutral-400"
              id="footer-impressum-btn"
            >
              Impressum
            </button>
            <button
              type="button"
              onClick={() => openLegal("datenschutz")}
              className="hover:text-white transition-colors uppercase tracking-wider font-mono text-xs cursor-pointer text-neutral-400"
              id="footer-datenschutz-btn"
            >
              Datenschutz
            </button>
          </div>
        </div>
      </footer>

      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-4 rounded-full bg-neutral-900/90 border border-neutral-800 text-white shadow-2xl backdrop-blur-md hover:border-neutral-500 hover:bg-neutral-800 transition-colors"
            aria-label="Scroll to top"
            id="scroll-to-top"
          >
            <ArrowUp size={18} className="sm:w-5 sm:h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
