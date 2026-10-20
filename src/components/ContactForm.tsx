import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, User, MessageSquare, Phone, Scale } from "lucide-react";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactSectionProps {
  onOpenLegal?: (tab: "impressum" | "datenschutz") => void;
}

export function ContactSection({ onOpenLegal }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const errors: FormErrors = {};
    if (!name.trim()) {
      errors.name = "Bitte gib deinen Namen an.";
    }
    if (!email.trim()) {
      errors.email = "Bitte gib deine E-Mail-Adresse an.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    }
    if (!message.trim()) {
      errors.message = "Bitte gib eine Nachricht ein.";
    } else if (message.trim().length < 5) {
      errors.message = "Die Nachricht sollte mindestens 5 Zeichen lang sein.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mdekdlgq", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || "Keine angegeben",
          message: message.trim(),
          _subject: `Neue Kontaktanfrage von ${name.trim()} (flazzy.de)`
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setFieldErrors({});
      } else {
        if (data && Array.isArray(data.errors) && data.errors.length > 0) {
          setErrorMessage(data.errors.map((err: { message: string }) => err.message).join(", "));
        } else {
          setErrorMessage("Beim Senden ist ein Fehler aufgetreten. Bitte versuche es später noch einmal oder schreibe direkt an info@flazzy.de.");
        }
      }
    } catch {
      setErrorMessage("Netzwerkfehler beim Versenden. Bitte prüfe deine Internetverbindung oder sende eine Direkt-Mail an info@flazzy.de.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center mb-12 sm:mb-16">
        <span className="inline-block py-1.5 px-3.5 mb-4 rounded-full border border-neutral-800 text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase bg-neutral-950/60 backdrop-blur-sm">
          Get in Touch
        </span>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tighter text-white">
          Kontakt aufnehmen
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base">
          Hast du ein Projekt, eine Frage oder eine Zusammenarbeit im Sinn? Schreib mir direkt über dieses Formular oder per E-Mail.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 bg-neutral-950/70 border border-neutral-900 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
            Lass uns sprechen
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed mb-8 font-light">
            Ich antworte in der Regel innerhalb von 24 Stunden auf alle Anfragen. Egal ob FiveM-Entwicklung, Webanwendungen, Discord-Bots oder IT-Infrastruktur.
          </p>

          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <a 
              href="mailto:info@flazzy.de"
              className="flex items-center gap-4 p-3.5 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-300 hover:text-white transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-800/80 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-neutral-500">Direkt per E-Mail</div>
                <div className="font-semibold text-white">info@flazzy.de</div>
              </div>
            </a>

            <div className="p-4 rounded-2xl bg-neutral-900/30 border border-neutral-900 text-neutral-400 text-xs leading-relaxed space-y-1.5">
              <div className="flex items-center gap-2 text-neutral-300 font-medium">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Schnelle Antwortzeiten</span>
              </div>
              <p className="text-neutral-500 font-sans text-xs">
                Projektanfragen und Support-Nachrichten werden gewöhnlich innerhalb von 24 Stunden beantwortet.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col gap-2.5">
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              Rechtliche Pflichtangaben, vollständige Anschrift und Telefonnummer findest du im Impressum.
            </p>
            {onOpenLegal ? (
              <button
                type="button"
                onClick={() => onOpenLegal("impressum")}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer w-fit group"
              >
                <Scale size={13} className="text-neutral-500 group-hover:text-white transition-colors" />
                <span className="underline underline-offset-4">Zum Impressum (§ 5 DDG) →</span>
              </button>
            ) : (
              <a
                href="#impressum"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors w-fit group"
              >
                <Scale size={13} className="text-neutral-500 group-hover:text-white transition-colors" />
                <span className="underline underline-offset-4">Zum Impressum (§ 5 DDG) →</span>
              </a>
            )}
          </div>
        </div>

        {/* Formspree Form Box */}
        <div className="lg:col-span-7 bg-neutral-950/70 border border-neutral-900 rounded-3xl p-6 sm:p-10 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 px-4 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                  Nachricht erfolgreich gesendet!
                </h3>
                <p className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto mb-8 font-light">
                  Vielen Dank für deine Nachricht. Ich habe deine Anfrage erhalten und melde mich schnellstmöglich bei dir zurück.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-mono uppercase tracking-wider transition-all"
                >
                  Weitere Nachricht senden
                </button>
              </motion.div>
            ) : (
              <form key="form" onSubmit={handleSubmit} className="space-y-6 text-left" noValidate>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-950/50 border border-red-900/50 text-red-300 text-xs sm:text-sm flex items-start gap-3"
                  >
                    <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="form-name" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Dein Name <span className="text-neutral-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <User size={16} />
                      </div>
                      <input
                        type="text"
                        id="form-name"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Max Mustermann"
                        disabled={submitting}
                        className={`w-full pl-10 pr-4 py-3 bg-neutral-900/70 border ${
                          fieldErrors.name ? "border-red-500 focus:border-red-500" : "border-neutral-800 focus:border-neutral-500"
                        } rounded-xl text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors`}
                      />
                    </div>
                    {fieldErrors.name && (
                      <p className="mt-1.5 text-xs text-red-400 font-mono">{fieldErrors.name}</p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="form-email" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Deine E-Mail-Adresse <span className="text-neutral-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <Mail size={16} />
                      </div>
                      <input
                        type="email"
                        id="form-email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
                        }}
                        placeholder="name@example.com"
                        disabled={submitting}
                        className={`w-full pl-10 pr-4 py-3 bg-neutral-900/70 border ${
                          fieldErrors.email ? "border-red-500 focus:border-red-500" : "border-neutral-800 focus:border-neutral-500"
                        } rounded-xl text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors`}
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="mt-1.5 text-xs text-red-400 font-mono">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Optional Phone Input */}
                <div>
                  <label htmlFor="form-phone" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Telefonnummer <span className="text-neutral-600 font-normal normal-case">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                      <Phone size={16} />
                    </div>
                    <input
                      type="tel"
                      id="form-phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+49 176 12345678"
                      disabled={submitting}
                      className="w-full pl-10 pr-4 py-3 bg-neutral-900/70 border border-neutral-800 focus:border-neutral-500 rounded-xl text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="form-message" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Deine Nachricht <span className="text-neutral-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-3.5 pointer-events-none text-neutral-500">
                      <MessageSquare size={16} />
                    </div>
                    <textarea
                      id="form-message"
                      name="message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (fieldErrors.message) setFieldErrors(prev => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Hi, ich habe ein Projekt / eine Frage zu..."
                      disabled={submitting}
                      className={`w-full pl-10 pr-4 py-3 bg-neutral-900/70 border ${
                        fieldErrors.message ? "border-red-500 focus:border-red-500" : "border-neutral-800 focus:border-neutral-500"
                      } rounded-xl text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors resize-y min-h-[120px]`}
                    />
                  </div>
                  {fieldErrors.message && (
                    <p className="mt-1.5 text-xs text-red-400 font-mono">{fieldErrors.message}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-[11px] text-neutral-500 font-mono">
                    Formular per SSL verschlüsselt via Formspree.
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black font-bold font-mono text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-neutral-200 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
                    id="contact-submit-btn"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Wird gesendet...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Nachricht senden</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
