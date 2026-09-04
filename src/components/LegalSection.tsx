import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scale, ShieldCheck, Copy, Check, ChevronUp } from "lucide-react";

export type LegalTab = "impressum" | "datenschutz";

interface LegalSectionProps {
  isOpen: boolean;
  activeTab: LegalTab;
  onTabChange: (tab: LegalTab) => void;
  onClose: () => void;
}

export function LegalSection({
  isOpen,
  activeTab,
  onTabChange,
  onClose,
}: LegalSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    const el = document.getElementById("legal-text-container");
    if (el) {
      navigator.clipboard.writeText(el.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="legal" className="scroll-mt-24 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="legal-expanded"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-left"
          >
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4 md:gap-8">
              <div>
                <span className="inline-block py-1.5 px-3.5 mb-4 rounded-full border border-neutral-800 text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase bg-neutral-950/50 backdrop-blur-sm">
                  Rechtliche Angaben
                </span>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-3 italic tracking-tighter text-white">
                  Rechtliches:
                </h2>
                <p className="text-neutral-500 max-w-md italic uppercase text-xs sm:text-sm tracking-widest">
                  Impressum nach § 5 DDG &amp; Datenschutzerklärung nach DSGVO.
                </p>
              </div>

              <div className="h-[1px] flex-grow bg-neutral-900 hidden md:block mx-12 mb-4 origin-left" />

              <span className="font-mono text-xs sm:text-sm text-neutral-700 uppercase hidden md:block mb-4">
                Compliance • 2026
              </span>
            </div>

            {/* Controls Bar: Tabs & Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id="legal-tab-impressum"
                  onClick={() => onTabChange("impressum")}
                  className={`px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] transition-all whitespace-nowrap flex items-center gap-2 ${
                    activeTab === "impressum"
                      ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      : "bg-neutral-900 text-neutral-500 hover:text-white hover:bg-neutral-800"
                  }`}
                >
                  <Scale size={13} />
                  Impressum
                </button>

                <button
                  type="button"
                  id="legal-tab-datenschutz"
                  onClick={() => onTabChange("datenschutz")}
                  className={`px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] transition-all whitespace-nowrap flex items-center gap-2 ${
                    activeTab === "datenschutz"
                      ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      : "bg-neutral-900 text-neutral-500 hover:text-white hover:bg-neutral-800"
                  }`}
                >
                  <ShieldCheck size={13} />
                  Datenschutz
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="py-2.5 px-4 rounded-xl border border-neutral-800 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white hover:border-neutral-600 transition-all flex items-center gap-2 group"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400">Kopiert</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Text kopieren</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl border border-neutral-800 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-white hover:border-neutral-600 transition-all flex items-center gap-1.5"
                >
                  <ChevronUp size={14} />
                  <span>Schließen</span>
                </button>
              </div>
            </div>

            {/* Main Legal Content Container (Matching Project Details Card Style) */}
            <div className="bg-neutral-900/50 rounded-[24px] sm:rounded-[40px] p-6 sm:p-12 md:p-16 border border-neutral-800 relative overflow-hidden text-left">
              {/* Subtle background watermark */}
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <Scale size={280} />
              </div>

              <div className="relative z-10">
                {/* Meta header tag */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-3.5 py-1 rounded-full border border-neutral-700 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400">
                    {activeTab === "impressum" ? "§ 5 DDG • Anbieterkennzeichnung" : "DSGVO • Datenschutz"}
                  </span>
                  <div className="h-[1px] w-12 bg-neutral-800" />
                  <span className="text-neutral-500 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest">
                    Stand: 2026
                  </span>
                </div>

                <div id="legal-text-container" className="space-y-10 text-neutral-300 font-sans">
                  {activeTab === "impressum" ? <ImpressumDetails /> : <DatenschutzDetails />}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-6">
            <button
              type="button"
              onClick={() => {
                onTabChange("impressum");
              }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-neutral-800/80 bg-neutral-900/30 text-neutral-500 hover:text-white hover:border-neutral-600 transition-all font-mono text-xs uppercase tracking-widest"
            >
              <Scale size={14} />
              <span>Impressum &amp; Datenschutz anzeigen</span>
            </button>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ImpressumDetails() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-white mb-2">
          Impressum
        </h3>
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
          Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Diensteanbieter &amp; Verantwortlich
          </h4>
          <p className="text-sm text-neutral-300 leading-relaxed font-light">
            <strong className="text-white font-medium">Odin Dreier</strong><br />
            Postdamm 1<br />
            33129 Delbrück<br />
            Nordrhein-Westfalen, Deutschland
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Kontaktmöglichkeiten
          </h4>
          <p className="text-sm text-neutral-300 leading-relaxed font-light">
            E-Mail: <span className="font-mono text-white">info@flazzy.de</span><br />
            Website: <span className="font-mono text-white">https://flazzy.de</span>
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
        <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
          Redaktionell Verantwortlicher nach § 18 Abs. 2 MStV
        </h4>
        <p className="text-sm text-neutral-300 leading-relaxed font-light">
          Odin Dreier, Postdamm 1, 33129 Delbrück, Deutschland
        </p>
      </div>

      <div className="space-y-6 pt-4 border-t border-neutral-800/80 text-sm text-neutral-400 font-light leading-relaxed">
        <div>
          <h4 className="font-display font-medium text-lg text-white mb-2">
            EU-Streitschlichtung
          </h4>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4 hover:text-neutral-300 font-mono text-xs"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            .<br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
        </div>

        <div>
          <h4 className="font-display font-medium text-lg text-white mb-2">
            Verbraucherstreitbeilegung / Universalschlichtungsstelle
          </h4>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>

        <div>
          <h4 className="font-display font-medium text-lg text-white mb-2">
            Haftung für Inhalte
          </h4>
          <p className="mb-3">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
            zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
            Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
            der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </div>

        <div>
          <h4 className="font-display font-medium text-lg text-white mb-2">
            Haftung für Links
          </h4>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter (z. B. GitHub, Discord, Credly), auf
            deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der
            jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Rechtswidrige Inhalte waren zum
            Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
            derartige Links umgehend entfernen.
          </p>
        </div>

        <div>
          <h4 className="font-display font-medium text-lg text-white mb-2">
            Urheberrecht
          </h4>
          <p>
            Die durch den Seitenbetreiber erstellten Inhalte, Codes und Werke auf diesen Seiten unterliegen
            dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
            Autors bzw. Erstellers.
          </p>
        </div>
      </div>
    </div>
  );
}

function DatenschutzDetails() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-white mb-2">
          Datenschutzerklärung
        </h3>
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
          Nach DSGVO und TDDDG
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
        <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
          1. Datenschutz auf einen Blick
        </h4>
        <p className="text-sm text-neutral-300 leading-relaxed font-light">
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
          Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen
          Sie persönlich identifiziert werden können.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
        <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
          2. Verantwortliche Stelle
        </h4>
        <p className="text-sm text-neutral-300 leading-relaxed font-light">
          <strong className="text-white font-medium">Odin Dreier</strong><br />
          Postdamm 1<br />
          33129 Delbrück<br />
          Nordrhein-Westfalen, Deutschland<br />
          E-Mail: <span className="font-mono text-white">info@flazzy.de</span>
        </p>
      </div>

      <div className="space-y-6 pt-4 border-t border-neutral-800/80 text-sm text-neutral-400 font-light leading-relaxed">
        <div>
          <h4 className="font-display font-medium text-lg text-white mb-2">
            3. Allgemeine Pflichtinformationen &amp; Betroffenenrechte
          </h4>
          <p className="mb-3">
            Sie haben jederzeit im Rahmen der geltenden gesetzlichen Bestimmungen der DSGVO folgende Rechte:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-neutral-300 font-mono text-xs">
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Recht auf Widerspruch gegen die Datenverarbeitung (Art. 21 DSGVO)</li>
            <li>Beschwerderecht bei einer zuständigen Datenschutz-Aufsichtsbehörde</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-medium text-lg text-white mb-2">
            4. Hosting &amp; Content Delivery Network (Cloudflare)
          </h4>
          <p className="mb-3">
            Wir hosten unsere Website und nutzen ein Content Delivery Network (CDN) sowie Sicherheitsdienste des Anbieters <strong>Cloudflare</strong> (Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA).
          </p>
          <p className="mb-3">
            Cloudflare sorgt für schnelle weltweite Ladezeiten und schützt unsere Website vor Cyber-Angriffen (wie DDoS-Attacken). Technisch bedingt wird der Datenverkehr zwischen Ihrem Browser und unserer Website über die weltweiten Server von Cloudflare geroutet. Hierbei erfasst Cloudflare automatisch Verbindungs- und Protokolldaten (unter anderem Browsertyp, Betriebssystem, IP-Adresse, Zugriffszeiten und Referrer-URL).
          </p>
          <p className="mb-3">
            Die Rechtsgrundlage für den Einsatz von Cloudflare ist Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer stabilen, sicheren und schnellen Auslieferung unserer Website. Die Datenübermittlung in die USA erfolgt unter Einhaltung des EU-US Data Privacy Frameworks sowie auf Basis der Standardvertragsklauseln der EU-Kommission.
          </p>
          <p className="text-xs font-mono text-neutral-500">
            Datenschutzerklärung von Cloudflare:{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4 hover:text-neutral-300 font-mono text-xs"
            >
              https://www.cloudflare.com/privacypolicy/
            </a>
          </p>
        </div>

        <div>
          <h4 className="font-display font-medium text-lg text-white mb-2">
            5. Keine Tracking- oder Werbe-Cookies
          </h4>
          <p>
            Auf dieser Website werden keine Marketing-, Werbe- oder Third-Party-Tracking-Cookies eingesetzt.
            Es werden keine Verhaltens- oder Nutzungsprofile erstellt.
          </p>
        </div>

        <div>
          <h4 className="font-display font-medium text-lg text-white mb-2">
            6. Kontaktaufnahme per E-Mail
          </h4>
          <p>
            Wenn Sie uns per E-Mail kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden
            personenbezogenen Daten (Name, E-Mail-Adresse, Inhalt der Nachricht) zum Zwecke der Bearbeitung Ihres Anliegens
            bei uns gespeichert und verarbeitet (Art. 6 Abs. 1 lit. b &amp; lit. f DSGVO).
          </p>
        </div>

        <div>
          <h4 className="font-display font-medium text-lg text-white mb-2">
            7. Externe Zertifikats-Badges (Credly)
          </h4>
          <p>
            Zur visuellen Bestätigung verifizierter Qualifikationen binden wir Badges der Plattform Credly Inc.
            ein. Beim Aufruf des Zertifikatsbereichs kann eine Verbindung zu den Servern von Credly aufgebaut
            werden (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen:{" "}
            <a
              href="https://www.credly.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4 hover:text-neutral-300 font-mono text-xs"
            >
              https://www.credly.com/privacy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
