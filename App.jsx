
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Gavel,
  Scale,
  Phone,
  Mail,
  MessageCircle,
  Languages,
  ArrowRight,
  FileText,
  HelpCircle,
  ChevronUp,
  LockKeyhole,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const neon = {
  ring: "shadow-[0_0_40px_rgba(56,189,248,0.35)]",
  text: "drop-shadow-[0_0_18px_rgba(56,189,248,0.65)]",
  border: "[box-shadow:0_0_0_1px_rgba(56,189,248,0.25),0_0_40px_rgba(56,189,248,0.25)_inset]",
};

function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let w = (c.width = window.innerWidth);
    let h = (c.height = Math.max(window.innerHeight, 900));

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * Math.PI * 2,
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createRadialGradient(w * 0.7, h * 0.2, 0, w * 0.7, h * 0.2, w);
      g.addColorStop(0, "#0b1226");
      g.addColorStop(1, "#070b17");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(56,189,248,${0.04 + Math.random() * 0.06})`;
        const rx = (i % 2 ? 0.2 : 0.8) * w + (Math.random() - 0.5) * 60;
        const ry = (i < 2 ? 0.25 : 0.75) * h + (Math.random() - 0.5) * 60;
        ctx.arc(rx, ry, 160 + Math.random() * 120, 0, Math.PI * 2);
        ctx.fill();
      }

      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.a += 0.004;
        p.vx += Math.cos(p.a) * 0.0005; p.vy += Math.sin(p.a) * 0.0005;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = "rgba(96,165,250,0.9)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]; const dx = p.x - q.x; const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56,189,248,${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6; ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { w = c.width = window.innerWidth; h = Math.max(window.innerHeight, 900); c.height = h; };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return <canvas ref={ref} className="fixed inset-0 -z-10 opacity-90" style={{ filter: "saturate(120%) blur(0.2px)" }} />;
}

const HERO_PHOTOS = ["/photos/maria-1.jpg","/photos/maria-2.jpg","/photos/maria-3.jpg","/photos/maria-4.jpg"];

function HeroSlider({ photos = HERO_PHOTOS, lang = "ru" }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || photos.length <= 1) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % photos.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused, photos.length]);

  const paginate = (dir) => {
    setDirection(dir);
    setIndex((i) => (i + dir + photos.length) % photos.length);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir < 0 ? 80 : -80, opacity: 0, scale: 0.98 }),
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#0a1122]/60 p-3 ${neon.border}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-80 overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            src={photos[index]}
            alt="Attorney hero"
            className="absolute inset-0 h-full w-full object-cover"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            draggable={false}
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={() => paginate(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur hover:bg-black/60"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur hover:bg-black/60"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-cyan-400' : 'w-3 bg-white/25 hover:bg-white/40'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
      <div className="mt-2 text-center text-sm text-slate-400">
        {lang === "ru" ? "Реальные фото адвоката" : "Real attorney photos"}
      </div>
    </div>
  );
}

const content = {
  ru: {
    locale: "ru",
    brand: "Адвокат по уголовным делам",
    name: "Мария Орлова",
    heroTitle: "Защита, когда на кону свобода",
    heroSub:
      "Профессиональная защита по уголовным делам на любой стадии: задержание, следствие, суд. Стратегия, тактика и постоянная связь.",
    ctaPrimary: "Бесплатная консультация",
    ctaSecondary: "Написать в мессенджер",
    trust: ["10+ лет практики","24/7 на связи","Конфиденциальность","Честная оценка рисков"],
    areasTitle: "Практика",
    areas: [
      { title: "Экономические преступления", desc: "Мошенничество, присвоение, уклонение, легализация." },
      { title: "Преступления против личности", desc: "Вред здоровью, угрозы, бытовые конфликты." },
      { title: "Наркотические статьи", desc: "Сбыты/хранение, провокация, проверка материалов ОРМ." },
      { title: "ДТП и транспорт", desc: "Пьяное вождение, наезды, оставление места ДТП." },
      { title: "Предварительная проверка", desc: "Доследственные проверки, вызовы, обыски." },
      { title: "Суды присяжных", desc: "Подготовка, отбор присяжных, стратегия защиты." },
    ],
    systemTitle: "Система работы",
    resultsTitle: "Результаты (конфиденциально, примеры)",
    faqTitle: "Частые вопросы",
    contactTitle: "Связаться",
    contactLead: "Опишите ситуацию в 2–3 предложениях — вернусь с планом действий и стоимостью этапов.",
    form: {
      name: "Ваше имя", phone: "Телефон", email: "Email", message: "Кратко о ситуации",
      consent: "Согласен(на) на обработку персональных данных", send: "Отправить заявку",
      ok: "Заявка отправлена. Я свяжусь с вами в ближайшее время.", fail: "Ошибка отправки. Попробуйте позже."
    },
    footer: "*Информация на сайте не является публичной офертой и не заменяет юридическую консультацию.",
  },
  en: {
    locale: "en",
    brand: "Criminal Defense Attorney",
    name: "Maria Orlova",
    heroTitle: "Defense when freedom is at stake",
    heroSub:
      "Strategic criminal defense at every stage: arrest, investigation, trial. Clear plan, proactive tactics, constant communication.",
    ctaPrimary: "Free Consultation",
    ctaSecondary: "Message Now",
    trust: ["10+ years in practice","24/7 availability","Confidential","Honest risk assessment"],
    areasTitle: "Practice Areas",
    areas: [
      { title: "White-Collar & Fraud", desc: "Fraud, embezzlement, tax matters, AML." },
      { title: "Crimes Against Person", desc: "Bodily harm, threats, domestic conflicts." },
      { title: "Narcotics Offenses", desc: "Sale/possession, entrapment issues, ORM materials review." },
      { title: "Traffic & DUI", desc: "Drunk driving, hit-and-run, serious collisions." },
      { title: "Pre‑Charge & Investigations", desc: "Pre‑trial checks, summons, searches." },
      { title: "Jury Trials", desc: "Preparation, voir dire, defense theory building." },
    ],
    systemTitle: "Working System",
    resultsTitle: "Results (confidential, samples)",
    faqTitle: "FAQ",
    contactTitle: "Contact",
    contactLead: "Describe the situation in 2–3 sentences — I will return with an action plan and stage pricing.",
    form: {
      name: "Your Name", phone: "Phone", email: "Email", message: "Brief case summary",
      consent: "I consent to processing personal data", send: "Submit Request",
      ok: "Request sent successfully. I will contact you soon.", fail: "Send failed. Please try again later."
    },
    footer: "*Information is not legal advice and does not create an attorney‑client relationship.",
  },
};

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`relative mx-auto max-w-7xl px-6 md:px-10 ${className}`}>{children}</section>
);

const Pill = ({ children }) => (
  <span className={`inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 px-3 py-1 text-xs text-cyan-200 ${neon.border}`}>{children}</span>
);

function useScrollTop(threshold = 300) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > threshold);
    onScroll(); window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return show;
}

export default function App() {
  const [lang, setLang] = useState("ru");
  const t = content[lang];
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const [ts0] = useState(() => Date.now());
  const showTop = useScrollTop(500);

  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${t.name} — ${t.brand}`,
    areaServed: "Criminal Defense",
    url: "https://example.com/",
    image: "/photos/maria-1.jpg",
    person: {"@type":"Person", name: t.name, jobTitle: t.brand},
  }), [t]);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("company")) return;
    if (!fd.get("consent")) return alert(lang === "ru" ? "Подтвердите согласие на обработку данных" : "Please confirm data processing consent");

    setSending(true); setStatus("");
    const payload = {
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      message: fd.get("message"),
      locale: t.locale,
      ts: Date.now(),
      elapsed: Date.now() - ts0,
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad");
      setStatus(t.form.ok);
      e.currentTarget.reset();
    } catch (err) {
      setStatus(t.form.fail);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="relative min-h-screen scroll-smooth bg-[#070b17] text-slate-200">
      <Particles />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="sticky top-0 z-30 border-b border-white/5 backdrop-blur supports-[backdrop-filter]:bg-[#070b17]/60">
        <Section className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className={`relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 ${neon.border}`}>
              <span className={`text-sm font-extrabold tracking-wider text-cyan-200 ${neon.text}`}>MO</span>
              <span className="pointer-events-none absolute inset-0 rounded-xl opacity-60 blur-xl" style={{background:"radial-gradient(60px 60px at 30% 30%, rgba(59,130,246,0.5), transparent)"}} />
            </div>
            <div>
              <div className={`text-sm font-medium text-cyan-200 ${neon.text}`}>{t.brand}</div>
              <div className="text-base font-semibold text-white">{t.name}</div>
            </div>
          </div>

          <nav className="hidden gap-6 md:flex">
            <a href="#areas" className="text-sm text-slate-300 hover:text-white">{t.areasTitle}</a>
            <a href="#system" className="text-sm text-slate-300 hover:text-white">{t.systemTitle}</a>
            <a href="#results" className="text-sm text-slate-300 hover:text-white">{t.resultsTitle?.split?.(" (")[0]||"Results"}</a>
            <a href="#faq" className="text-sm text-slate-300 hover:text-white">{t.faqTitle}</a>
            <a href="#contact" className="text-sm text-slate-300 hover:text-white">{t.contactTitle}</a>
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setLang((p) => (p === "ru" ? "en" : "ru"))}
              className={`group relative inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-white/5 px-3 py-2 text-xs text-cyan-200 transition ${neon.border}`} aria-label="Toggle language">
              <Languages className="h-4 w-4" /><span className="font-medium">{lang.toUpperCase()}</span>
              <span className="pointer-events-none absolute -inset-1 -z-10 rounded-xl opacity-40 blur-lg transition group-hover:opacity-70" style={{background:"radial-gradient(80px 80px at 50% 50%, rgba(34,211,238,0.35), transparent)"}} />
            </button>
            <a href="#contact" className={`hidden rounded-xl bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-200 md:inline-flex ${neon.border}`}>{t.ctaPrimary}</a>
          </div>
        </Section>
      </header>

      <Section className="pt-16">
        <div className="relative grid gap-12 pb-16 pt-6 md:grid-cols-2 md:items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <Pill><ShieldCheck className="h-4 w-4" /><span>Criminal Defense</span></Pill>
            <h1 className={`mt-4 text-4xl font-extrabold leading-tight text-white md:text-5xl ${neon.text}`}>{t.heroTitle}</h1>
            <p className="mt-4 max-w-xl text-slate-300">{t.heroSub}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className={`group relative inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600/90 to-blue-600/90 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98] ${neon.ring}`}>
                <Phone className="h-4 w-4" />{t.ctaPrimary}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a href="#contact" className={`inline-flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-white/5 px-5 py-3 text-sm font-semibold text-cyan-200 ${neon.border}`}>
                <MessageCircle className="h-4 w-4" />{t.ctaSecondary}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {t.trust.map((x, i) => (
                <span key={i} className={`rounded-full border border-cyan-400/20 bg-[#0b1226]/60 px-3 py-1 text-xs text-slate-300 ${neon.border}`}>{x}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <HeroSlider photos={HERO_PHOTOS} lang={lang} />
          </motion.div>
        </div>
      </Section>

      <Section id="areas" className="py-8">
        <motion.h2 className={`mb-6 text-2xl font-bold text-white ${neon.text}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {t.areasTitle}
        </motion.h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.areas.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-white/5 p-5 ${neon.border}`}>
              <div className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-xl transition group-hover:opacity-60" style={{background:"radial-gradient(160px 100px at 80% 20%, rgba(56,189,248,0.45), transparent)"}} />
              <div className="relative">
                <div className="mb-2 flex items-center gap-2 text-cyan-200"><Gavel className="h-4 w-4" /><span className="text-sm font-semibold">{a.title}</span></div>
                <p className="text-sm text-slate-300">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="system" className="py-12">
        <motion.h2 className={`mb-6 text-2xl font-bold text-white ${neon.text}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {t.systemTitle}
        </motion.h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {t: lang==="ru"?"Знакомство и анализ":"Intake & Case Map", d: lang==="ru"?"Созваниваемся, фиксируем факты, проверяем документы. Обозначаем риски и ресурсную карту.":"Call, gather facts and documents, outline risks and resources.", icon: <FileText className="w-5 h-5" />},
            {t: lang==="ru"?"Защита с первой минуты":"Immediate Protection", d: lang==="ru"?"При задержании — выезд, участие в следственных действиях, контроль процессуальных сроков.":"24/7 response at arrest, interviews, deadlines control.", icon: <ShieldCheck className="w-5 h-5" />},
            {t: lang==="ru"?"Стратегия и тактика":"Strategy & Tactics", d: lang==="ru"?"Гипотезы защиты, ходатайства, экспертизы, свидетели.":"Defense hypotheses, motions, experts, witnesses.", icon: <Gavel className="w-5 h-5" />},
            {t: lang==="ru"?"Коммуникация":"Communication", d: lang==="ru"?"Постоянная связь и отчёты.":"Always reachable, milestone reports.", icon: <MessageCircle className="w-5 h-5" />},
            {t: lang==="ru"?"Суд":"Trial", d: lang==="ru"?"Активная позиция, перекрёстные вопросы, доказательства.":"Courtroom advocacy, cross‑examination, evidence.", icon: <Scale className="w-5 h-5" />},
            {t: lang==="ru"?"Безопасность и конфиденциальность":"Security & Privacy", d: lang==="ru"?"Шифрованные каналы, закрытый доступ, NDA.":"Encrypted channels, restricted access, NDA.", icon: <LockKeyhole className="w-5 h-5" />},
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.04 * i }}
              className={`relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#0a1122]/50 p-5 ${neon.border}`}>
              <div className="pointer-events-none absolute -inset-1 rounded-2xl opacity-60 blur-xl" style={{background: i % 2 === 0 ? "radial-gradient(180px 120px at 10% 20%, rgba(34,211,238,0.2), transparent)" : "radial-gradient(180px 120px at 80% 20%, rgba(59,130,246,0.2), transparent)"}} />
              <div className="relative">
                <div className="mb-2 flex items-center gap-2 text-cyan-200">{s.icon}<span className="text-sm font-semibold">{s.t}</span></div>
                <p className="text-sm text-slate-300">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="faq" className="py-12">
        <motion.h2 className={`mb-6 text-2xl font-bold text-white ${neon.text}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>{t.faqTitle}</motion.h2>
        <div className="divide-y divide-white/5 rounded-2xl border border-white/5 bg-white/5">
          {(lang==="ru" ? [
            {q:"Можно ли говорить со следователем без адвоката?", a:"Не рекомендую. Любое сказанное слово фиксируется и может трактоваться против вас."},
            {q:"Вы работаете срочно, ночью?", a:"Да, выезд возможен 24/7 по предварительной договорённости."},
            {q:"Как формируется гонорар?", a:"По этапам: анализ/следствие/суд. Прозрачная смета и фиксированные блоки работ."},
          ]:[
            {q:"Should I talk to investigators without a lawyer?", a:"No. Anything you say is recorded and may be used against you."},
            {q:"Do you take urgent/night calls?", a:"Yes, 24/7 response on arrangement."},
            {q:"How do you price cases?", a:"By stages: intake/investigation/trial. Transparent scope & fixed blocks."},
          ]).map((f,i)=>(
            <details key={i} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm text-white">
                <span className="pr-4 font-medium">{f.q}</span>
                <HelpCircle className="h-4 w-4 text-cyan-300 transition group-open:rotate-45" />
              </summary>
              <div className="px-5 pb-5 text-sm text-slate-300">{f.a}</div>
            </details>
          ))}
        </div>
      </Section>

      <Section id="contact" className="py-14">
        <motion.h2 className={`mb-2 text-2xl font-bold text-white ${neon.text}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>{t.contactTitle}</motion.h2>
        <p className="mb-6 max-w-2xl text-slate-300">{t.contactLead}</p>

        <div className="grid gap-6 md:grid-cols-3">
          <form onSubmit={handleSubmit} className={`relative col-span-2 space-y-3 rounded-2xl border border-cyan-400/20 bg-white/5 p-6 ${neon.border}`}>
            <div className="grid gap-3 md:grid-cols-2">
              <input name="name" placeholder={t.form.name} className="rounded-xl border border-white/10 bg-[#0b1226]/60 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-cyan-400/50" required />
              <input name="phone" placeholder={t.form.phone} className="rounded-xl border border-white/10 bg-[#0b1226]/60 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-cyan-400/50" />
            </div>
            <input name="email" type="email" placeholder={t.form.email} className="w-full rounded-xl border border-white/10 bg-[#0b1226]/60 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-cyan-400/50" required />
            <textarea name="message" rows={5} placeholder={t.form.message} className="w-full rounded-xl border border-white/10 bg-[#0b1226]/60 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-cyan-400/50" />
            <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
            <input type="hidden" name="ts" value={ts0} />
            <label className="flex items-start gap-3 text-xs text-slate-300"><input name="consent" type="checkbox" className="mt-0.5" /> {t.form.consent}</label>
            <button disabled={sending} className={`group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:opacity-60 ${neon.ring}`}>
              <ShieldCheck className="h-4 w-4" />{sending ? (lang === "ru" ? "Отправка..." : "Sending...") : t.form.send}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            {status && <div className="text-xs text-slate-300">{status}</div>}
            <div className="text-xs text-slate-400">lawyer@example.com · +7 (900) 000‑00‑00</div>
          </form>

          <div className={`relative rounded-2xl border border-cyan-400/20 bg-[#0a1122]/50 p-6 ${neon.border}`}>
            <div className="mb-3 text-sm font-semibold text-cyan-200">{lang === "ru" ? "Быстрые контакты" : "Quick Contacts"}</div>
            <div className="grid gap-3 text-sm">
              <a href="tel:+79000000000" className="inline-flex items-center gap-2 text-slate-200 hover:text-white"><Phone className="h-4 w-4 text-cyan-300" /> +7 (900) 000‑00‑00</a>
              <a href="mailto:lawyer@example.com" className="inline-flex items-center gap-2 text-slate-200 hover:text-white"><Mail className="h-4 w-4 text-cyan-300" /> lawyer@example.com</a>
              <a href="https://t.me/username" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-200 hover:text-white"><MessageCircle className="h-4 w-4 text-cyan-300" /> Telegram</a>
              <a href="https://wa.me/70000000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-200 hover:text-white"><MessageCircle className="h-4 w-4 text-cyan-300" /> WhatsApp</a>
            </div>
            <div className="pointer-events-none absolute -inset-1 rounded-2xl opacity-60 blur-xl" style={{background:"radial-gradient(180px 120px at 80% 10%, rgba(59,130,246,0.25), transparent)"}} />
            <div className="mt-6 text-xs text-slate-400">
              {lang==="ru" ? "Замените контакты на свои в коде (поиск по example.com и номеру)." : "Replace contact placeholders in code (search for example.com and the number)."}
            </div>
          </div>
        </div>
      </Section>

      <footer className="border-t border-white/5 py-8">
        <Section className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div className="text-xs text-slate-400">© {new Date().getFullYear()} {t.name}. {t.brand}.</div>
          <div className="text-xs text-slate-400">{t.footer}</div>
        </Section>
      </footer>

      <div className="fixed bottom-6 right-6 z-30">
        <a href="#contact" className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 ${neon.ring}`}>
          <Phone className="h-4 w-4" /> {t.ctaPrimary}
        </a>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button key="topbtn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed bottom-6 left-6 z-30 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 px-4 py-2 text-xs text-cyan-200 ${neon.border}`}>
            <ChevronUp className="h-4 w-4" />Top
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
