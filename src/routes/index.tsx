import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowUpRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  Layers,
  Rocket,
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import roomyfyHome from "@/assets/projects/roomyfy-home.jpg";
import roomyfyChat from "@/assets/projects/roomyfy-chat.jpg";
import tripifyDashboard from "@/assets/projects/tripify-dashboard.jpg";
import tripifyDestinations from "@/assets/projects/tripify-destinations.jpg";
import tripifyPlanner from "@/assets/projects/tripify-planner.jpg";
import expertbookList from "@/assets/projects/expertbook-list.jpg";
import expertbookBooking from "@/assets/projects/expertbook-booking.jpg";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

/* -------------------------------------------------------------------------- */
/*                                 PRIMITIVES                                  */
/* -------------------------------------------------------------------------- */

function MagneticButton({
  children,
  className = "",
  href,
  variant = "primary",
  target,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  target?: "_blank" | "_self";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-tight transition-all will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-b from-[#FB923C] to-[#F97316] text-black shadow-[0_10px_40px_-12px_rgba(249,115,22,0.7)] hover:shadow-[0_18px_60px_-12px_rgba(249,115,22,0.9)] hover:brightness-110"
      : variant === "outline"
        ? "border border-white/12 bg-white/[0.02] text-white/90 hover:bg-white/[0.06] hover:border-white/25"
        : "text-white/70 hover:text-white";

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}

function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, num }: { children: React.ReactNode; num: string }) {
  return (
    <Reveal>
      <div className="mb-10 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/40">
        <span className="font-mono text-[#F97316]/85">{num}</span>
        <span className="h-px w-10 bg-gradient-to-r from-white/25 to-transparent" />
        <span>{children}</span>
      </div>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/*                              CURSOR SPOTLIGHT                               */
/* -------------------------------------------------------------------------- */

function CursorSpotlight() {
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    setMounted(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  const bg = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgba(249,115,22,0.10), rgba(56,189,248,0.06) 35%, transparent 65%)`;

  if (!mounted) return null;
  return (
    <motion.div
      aria-hidden
      style={{ background: bg }}
      className="pointer-events-none fixed inset-0 z-30 mix-blend-screen"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                 BACKGROUND                                  */
/* -------------------------------------------------------------------------- */

function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#050816]" />
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />

      <motion.div
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-52 -left-40 h-[640px] w-[640px] rounded-full bg-[#F97316] opacity-25 blur-[180px]"
      />
      <motion.div
        animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 -right-52 h-[680px] w-[680px] rounded-full bg-[#38BDF8] opacity-20 blur-[190px]"
      />
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-0 left-1/3 h-[520px] w-[520px] rounded-full bg-[#60A5FA] opacity-15 blur-[170px]"
      />

      <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050816_95%)]" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   NAVBAR                                    */
/* -------------------------------------------------------------------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2 px-3 sm:top-6"
    >
      <motion.nav
        animate={{
          scale: scrolled ? 0.96 : 1,
          y: scrolled ? -2 : 0,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className={`flex items-center gap-1 rounded-full border px-2 py-1.5 transition-all duration-500 ${
          scrolled
            ? "border-white/10 bg-[#0B1120]/65 backdrop-blur-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)]"
            : "border-white/8 bg-white/[0.025] backdrop-blur-xl"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 rounded-full px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F97316] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F97316]" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">Ritesh</span>
        </a>
        <div className="mx-1 hidden h-5 w-px bg-white/10 md:block" />
        <ul className="hidden items-center md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-full px-3 py-1.5 text-sm text-white/65 transition-colors hover:text-white"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 -z-0 scale-90 rounded-full bg-white/0 transition-all duration-300 hover:bg-white/[0.06] hover:scale-100" />
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-1">
          <MagneticButton href="#contact" variant="primary" className="!py-1.5 !px-4">
            Get in touch <ArrowUpRight className="h-3.5 w-3.5" />
          </MagneticButton>
        </div>
      </motion.nav>
    </motion.header>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    HERO                                     */
/* -------------------------------------------------------------------------- */

function PortraitCard() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 14);
    rx.set(-py * 14);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative aspect-[4/5] w-full max-w-md [transform-style:preserve-3d]"
    >
      <div className="absolute -inset-12 rounded-[40px] bg-[#F97316]/20 blur-[80px]" />
      <div className="absolute -inset-12 rounded-[40px] bg-[#38BDF8]/15 blur-[90px]" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-[2px] rounded-[28px] opacity-70"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(249,115,22,0.7), rgba(56,189,248,0.5), rgba(253,186,116,0.4), rgba(249,115,22,0.7))",
          filter: "blur(3px)",
        }}
      />

      <div className="relative h-full w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#0B1120] ring-glow">
        <img
          src={portrait}
          alt="Ritesh Rathore — Full Stack Developer & AI Builder"
          width={1024}
          height={1280}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#050816]/85 via-transparent to-[#38BDF8]/15" />
        <div className="absolute inset-0 bg-gradient-to-bl from-[#F97316]/15 via-transparent to-transparent" />

        <motion.div
          aria-hidden
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 4, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <div className="absolute inset-x-4 top-4 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-white/65">
          <span className="font-mono">ID · 0xRITESH</span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 backdrop-blur-md">v2026</span>
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">Engineer</p>
            <p className="text-lg font-semibold tracking-tight text-white">Ritesh Rathore</p>
          </div>
          <div className="glass rounded-md px-2 py-1 text-[10px] font-mono text-white/75">
            <span className="text-emerald-400">●</span> ONLINE
          </div>
        </div>

        <motion.div
          aria-hidden
          initial={{ y: "-20%" }}
          animate={{ y: "120%" }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-white/[0.07] to-transparent"
        />
      </div>
    </motion.div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 80]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.4]);

  return (
    <section id="top" className="relative pt-40 sm:pt-52">
      <motion.div style={{ y, opacity }} className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Open to new opportunities
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="max-w-2xl text-balance text-[clamp(2.2rem,4.8vw,4.3rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                <span className="hero-text">Building intelligent products</span>
                <br />
                <span className="accent-text-animated">with code</span>
                <br />
                <span className="hero-text">and desgin.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-8 max-w-xl text-balance text-base leading-relaxed text-white/55 sm:text-lg">
                I'm <span className="text-white">Ritesh Rathore</span> — Full Stack Developer,
                AI—focused builder, creating premium digital experiences, scalable systems and modern web products.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
               <MagneticButton
                href="/Ritesh_resume.pdf"
                variant="primary"
                 target="_blank"
                 >
                 <Download className="h-4 w-4" />
                  View resume
                </MagneticButton>
                <MagneticButton href="#projects" variant="outline">
                  View Projects <ArrowRight className="h-4 w-4" />
                </MagneticButton>
                <MagneticButton href="#contact" variant="ghost">
                  Contact Me
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-white/8 pt-7 text-sm">
                {[
                  ["3+", "Internship Experiences"],
                  ["4+", "projects"],
                  ["∞", "Curiosity"],
                ].map(([k, v]) => (
                  <div key={v}>
                    <div className="text-2xl font-semibold tracking-tight text-white">{k}</div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-white/40">{v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={40} className="flex justify-center lg:justify-end">
            <PortraitCard />
          </Reveal>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            SPOTLIGHT CARD WRAPPER                          */
/* -------------------------------------------------------------------------- */

function SpotlightCard({
  children,
  className = "",
  hue = "rgba(249,115,22,0.18)",
}: {
  children: React.ReactNode;
  className?: string;
  hue?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const bg = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, ${hue}, transparent 60%)`;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={`relative ${className}`}>
      <motion.div
        aria-hidden
        style={{ background: bg }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    ABOUT                                    */
/* -------------------------------------------------------------------------- */

function About() {
  const cards = [
    {
      icon: Layers,
      title: "Full Stack Engineering",
      desc: "Building full-stack applications with scalable architecture, modern UI systems, and production-ready performance.",
      hue: "#F97316",
      spot: "rgba(249,115,22,0.18)",
    },
    {
      icon: Sparkles,
      title: "AI Native Thinking",
      desc: "Creating AI-powered experiences using LLMs, intelligent workflows, automation, and modern data systems.",
      hue: "#38BDF8",
      spot: "rgba(56,189,248,0.16)",
    },
    {
      icon: Rocket,
      title: "Data & Analytics",
      desc: "Working with data visualization, analytics, and intelligent insights using Python, Power BI, and modern data systems.",
      hue: "#FDBA74",
      spot: "rgba(253,186,116,0.18)",
    },
  ];

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-40 sm:py-52">
      <SectionLabel num="01">About</SectionLabel>
      <Reveal>
        <h2 className="max-w-4xl text-balance text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
         I build products{" "}
          <span className="accent-text">that feel fast,</span> intelligent,{" "}
          <span className="accent-text"> and human</span>.
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/60">
          I focus on building premium digital products that combine modern engineering, intelligent systems, and cinematic user experiences.
         </p>
      </Reveal>

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Reveal key={c.title} delay={i * 0.1}>
              <SpotlightCard hue={c.spot} className="h-full">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 backdrop-blur-xl transition-colors duration-500 hover:border-white/15"
                >
                  <div
                    className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: c.hue }}
                  />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60" />
                  <div
                    className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
                    style={{ color: c.hue, boxShadow: `inset 0 0 20px ${c.hue}22` }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="relative mt-7 text-lg font-semibold tracking-tight text-white">{c.title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-white/55">{c.desc}</p>
                </motion.div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   SKILLS                                    */
/* -------------------------------------------------------------------------- */

const SKILL_GROUPS: { title: string; tags: string[]; accent: string; spot: string }[] = [
  {
    title: "Frontend",
    accent: "#F97316",
    spot: "rgba(249,115,22,0.18)",
    tags: ["React", "Next.js", "Tailwind", "Framer Motion", "TypeScript"],
  },
  {
    title: "Backend",
    accent: "#38BDF8",
    spot: "rgba(56,189,248,0.18)",
    tags: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "JWT Auth", "Prisma", "Socket.io"],
  },
  {
    title: "AI / Data",
    accent: "#FDBA74",
    spot: "rgba(253,186,116,0.18)",
    tags: ["Python", "OpenAI", "LangChain", "Power BI", "NumPy", "Embeddings", "Prompt Engineering"],
  },
  {
    title: "Programming Languages",
    accent: "#60A5FA",
    spot: "rgba(96,165,250,0.18)",
    tags: ["JavaScript", "TypeScript", "Python", "C++", "SQL"],
  },
  {
    title: "Tooling",
    accent: "#60A5FA",
    spot: "rgba(96,165,250,0.18)",
    tags: ["Git", "Github", "Docker", "Vercel", "Vite", "Vs Code"],
  },
];

function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-40 sm:py-52">
      <SectionLabel num="02">Stack</SectionLabel>
      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:items-end">
        <Reveal>
          <h2 className="text-balance text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            Tools I use to build <span className="accent-text"> modern digital products</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-balance text-white/55 md:text-lg">
           From full-stack engineering to AI workflows and data systems — a stack built for performance, scalability, and intelligent experiences.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {SKILL_GROUPS.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.08}>
            <SpotlightCard hue={g.spot} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-transparent p-7 backdrop-blur-xl transition-all duration-500 hover:border-white/15 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/85">
                    {g.title}
                  </h3>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: g.accent, boxShadow: `0 0 14px ${g.accent}` }}
                  />
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {g.tags.map((t, k) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 + k * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -2, scale: 1.05 }}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/75 transition-colors hover:border-white/30 hover:text-white"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
                <div
                  className="pointer-events-none absolute inset-x-0 -bottom-20 h-32 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: g.accent }}
                />
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   PROJECTS                                  */
/* -------------------------------------------------------------------------- */

const PROJECTS = [
  {
    name: "Roomyfy",
    tag: "Marketplace · AI",
    desc: "AI-assisted Full-Stack rental platform for modern student and urban living. Personalized listings, intelligent search, and seamless booking experience.",
    stack: ["React", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS", "Express", "JWT Auth", "Socket.io"],
    accent: "from-[#F97316]/40 to-[#FDBA74]/10",
    dot: "#F97316",
    spot: "rgba(249,115,22,0.16)",
    portrait: false,
    live: "https://roomyfy.vercel.app/",
    repo: "https://github.com/ritesh391/Roomyfy.git",
    images: [
      { src: roomyfyHome, alt: "Roomyfy — Home listings feed" },
      { src: roomyfyChat, alt: "Roomyfy — In-app messaging" },
    ],
  },
  {
    name: "Tripify India",
    tag: "AI Travel · Smart Tourism",
    desc: "AI-powered travel platform with smart itinerary planning, multilingual support, destination insights, and intelligent tourism experiences.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "OpenAI", "REST APIs"],
    accent: "from-[#38BDF8]/40 to-[#60A5FA]/10",
    dot: "#38BDF8",
    spot: "rgba(56,189,248,0.16)",
    portrait: true,
    live: null,
    repo: null,
    images: [
      { src: tripifyDashboard, alt: "Tripify — Intelligence Dashboard" },
      { src: tripifyDestinations, alt: "Tripify — Destinations explorer" },
      { src: tripifyPlanner, alt: "Tripify — AI Trip Planner" },
    ],
  },
  {
    name: "Expert Booking",
    tag: "Full Stack · Realtime Booking",
    desc: "Full-stack booking platform with realtime scheduling, secure authentication, responsive dashboards, and modern appointment workflows.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT Auth", "Tailwind CSS"],
    accent: "from-[#FDBA74]/30 to-[#F97316]/10",
    dot: "#FDBA74",
    spot: "rgba(253,186,116,0.16)",
    portrait: false,
    live: "https://expert-booking-swart.vercel.app/",
    repo: "https://github.com/ritesh391/expert-booking.git",
    images: [
      { src: expertbookList, alt: "ExpertBook — Expert directory" },
      { src: expertbookBooking, alt: "ExpertBook — Session booking form" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                            PROJECT IMAGE SLIDER                             */
/* -------------------------------------------------------------------------- */

/** Landscape slider — for desktop/web screenshots (Roomyfy, ExpertBook) */
function LandscapeSlider({
  images,
  dot,
  accent,
}: {
  images: { src: string; alt: string }[];
  dot: string;
  accent: string;
}) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = useCallback(
    (next: number) => {
      const wrapped = (next + images.length) % images.length;
      setDirection(next > active ? 1 : -1);
      setActive(wrapped);
    },
    [active, images.length]
  );

  return (
    <motion.div
      whileHover={{ y: -6, rotateX: 3, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      style={{ transformPerspective: 1200 }}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-60`} />

      {images.map((img, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{
            opacity: i === active ? 1 : 0,
            x: i === active ? "0%" : direction > 0 ? "-8%" : "8%",
            scale: i === active ? 1 : 0.97,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{ pointerEvents: i === active ? "auto" : "none" }}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="h-full w-full object-cover object-top"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/20 via-transparent to-transparent" />
        </motion.div>
      ))}

      {/* Browser chrome bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-7 items-center gap-1.5 border-b border-white/8 bg-black/40 px-3 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full" style={{ background: dot, boxShadow: `0 0 8px ${dot}` }} />
        <span className="ml-2 flex h-3.5 flex-1 max-w-[140px] items-center overflow-hidden rounded-sm bg-white/[0.06] px-1.5 text-[8px] font-mono text-white/40">
          {images[active].alt.split("—")[0].trim().toLowerCase().replace(/\s/g, "")}.app
        </span>
        <span className="ml-auto text-[9px] font-mono text-white/35">{active + 1} / {images.length}</span>
      </div>

      {images.length > 1 && (
        <>
          <button onClick={() => go(active - 1)} aria-label="Previous screenshot"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-black/70 hover:text-white active:scale-95">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => go(active + 1)} aria-label="Next screenshot"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-black/70 hover:text-white active:scale-95">
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={() => go(i)} aria-label={`Go to screenshot ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  height: "6px",
                  width: i === active ? "20px" : "6px",
                  background: i === active ? dot : "rgba(255,255,255,0.25)",
                  boxShadow: i === active ? `0 0 10px ${dot}` : "none",
                }}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

/** Portrait slider — for mobile app screenshots (Tripify).
 *  Shows all screenshots as phone frames in a scrollable row,
 *  with the active one centred and scaled up. */
function PortraitSlider({
  images,
  dot,
  accent,
}: {
  images: { src: string; alt: string }[];
  dot: string;
  accent: string;
}) {
  const [active, setActive] = useState(0);

  const go = useCallback(
    (next: number) => setActive((next + images.length) % images.length),
    [images.length]
  );

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] py-6"
      style={{ minHeight: "260px" }}
    >
      {/* Subtle gradient backdrop */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-40`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1),rgba(5,8,22,0.7))]" />

      {/* Phone frames row */}
      <div className="relative z-10 flex items-center justify-center gap-4 px-4">
        {images.map((img, i) => {
          const isActive = i === active;
          return (
            <motion.button
              key={i}
              onClick={() => go(i)}
              animate={{
                scale: isActive ? 1 : 0.78,
                opacity: isActive ? 1 : 0.5,
                y: isActive ? 0 : 12,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative flex-shrink-0 focus:outline-none"
              style={{ width: isActive ? "38%" : "24%" }}
              aria-label={img.alt}
            >
              {/* Phone shell */}
              <div
                className="relative overflow-hidden rounded-[18px] border-[3px]"
                style={{
                  borderColor: isActive ? dot : "rgba(255,255,255,0.12)",
                  boxShadow: isActive
                    ? `0 0 30px ${dot}55, 0 20px 40px rgba(0,0,0,0.6)`
                    : "0 8px 24px rgba(0,0,0,0.4)",
                  aspectRatio: "9/19.5",
                  background: "#000",
                }}
              >
                {/* Notch */}
                <div className="absolute inset-x-0 top-0 z-20 flex justify-center pt-1.5">
                  <div className="h-2 w-10 rounded-full bg-black" />
                </div>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover object-top"
                  draggable={false}
                />
                {/* Active glow overlay */}
                {isActive && (
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, ${dot}15, transparent 40%, ${dot}10)`,
                    }}
                  />
                )}
              </div>

              {/* Caption under active phone */}
              {isActive && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-center text-[10px] font-mono text-white/50 truncate"
                >
                  {img.alt.split("—")[1]?.trim() ?? img.alt}
                </motion.p>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to screenshot ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              height: "5px",
              width: i === active ? "18px" : "5px",
              background: i === active ? dot : "rgba(255,255,255,0.2)",
              boxShadow: i === active ? `0 0 8px ${dot}` : "none",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/** Auto-picks landscape or portrait layout based on the `portrait` flag */
function ProjectImageSlider({
  images,
  dot,
  accent,
  portrait,
}: {
  images: { src: string; alt: string }[];
  dot: string;
  accent: string;
  portrait: boolean;
}) {
  if (portrait) {
    return <PortraitSlider images={images} dot={dot} accent={accent} />;
  }
  return <LandscapeSlider images={images} dot={dot} accent={accent} />;
}

/* -------------------------------------------------------------------------- */
/*                                   PROJECTS SECTION                          */
/* -------------------------------------------------------------------------- */

function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-40 sm:py-52">
      <SectionLabel num="03">Selected work</SectionLabel>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <h2 className="max-w-3xl text-balance text-[clamp(2rem,4.4vw,3.8rem)] font-semibold leading-[1] tracking-[-0.035em] text-white">
            Products, <span className="accent-text">not portfolios.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-sm text-white/55">
            Each project is shipped, used, and iterated on — not a screenshot in a grid.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 space-y-8">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06}>
            <SpotlightCard hue={p.spot}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="group relative grid gap-10 overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 backdrop-blur-xl transition-colors duration-500 hover:border-white/15 md:grid-cols-[1.1fr_1fr] md:p-10"
              >
                <div
                  className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-55"
                  style={{ background: p.dot }}
                />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />

                {/* Left: text content */}
                <div className="relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/45">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: p.dot, boxShadow: `0 0 10px ${p.dot}` }}
                      />
                      {p.tag}
                    </div>
                    <h3 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      {p.name}
                    </h3>
                    <p className="mt-4 max-w-lg text-white/60">{p.desc}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/70 transition-colors hover:border-white/25 hover:text-white"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-10 flex flex-wrap items-center gap-3">
                    {p.live && (
                      <MagneticButton href={p.live} variant="primary" className="!py-2">
                        Live Demo <ExternalLink className="h-3.5 w-3.5" />
                      </MagneticButton>
                    )}
                    {p.repo && (
                      <MagneticButton href={p.repo} variant="outline" className="!py-2">
                        <Github className="h-3.5 w-3.5" /> GitHub
                      </MagneticButton>
                    )}
                    {!p.live && !p.repo && (
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/40">
                        Coming soon
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: real image slider */}
                <div className="relative">
                  <ProjectImageSlider
                    images={p.images}
                    dot={p.dot}
                    accent={p.accent}
                    portrait={p.portrait}
                  />
                </div>
              </motion.article>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 EXPERIENCE                                  */
/* -------------------------------------------------------------------------- */

const TIMELINE = [
  {
    when: "Apr 2026 — May 2026",
    title: "Frontend Developer Internship",
    place: "Industry Experience",
    desc: "Developed responsive user interfaces, optimized frontend performance, and contributed to production-ready web applications.",
  },
  {
    when: "2025 — Present",
    title: "Full Stack & AI Projects",
    place: "Independent Builder",
    desc: "Designed and built modern full-stack products including Roomyfy, Tripify India, and realtime booking platforms.",
  },
  {
    when: "2024 — 2025",
    title: "AI & Data Science Certifications",
    place: "Google · Cisco · Power BI",
    desc: "Completed certifications in Generative AI (Google × Simplilearn), AI Fundamentals (Cisco), Data Analysis (Cisco), and Power BI — covering modern AI workflows, data systems, and intelligent tooling.",
  },
];

function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-6 py-40 sm:py-52">
      <SectionLabel num="04">Experience</SectionLabel>
      <Reveal>
        <h2 className="max-w-3xl text-balance text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
          A short timeline of <span className="accent-text">building things that matter</span>.
        </h2>
      </Reveal>

      <div className="relative mt-20">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:left-1/2" />
        <ul className="space-y-14">
          {TIMELINE.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08}>
              <li
                className={`relative grid gap-6 pl-10 md:grid-cols-2 md:gap-12 md:pl-0 ${
                  i % 2 === 0 ? "md:[&>div:first-child]:text-right" : "md:[&>div:first-child]:order-2 md:[&>div:first-child]:text-left"
                }`}
              >
                <span
                  className="absolute left-1.5 top-2 h-3 w-3 rounded-full border border-white/30 bg-[#F97316] md:left-1/2 md:-translate-x-1/2"
                  style={{ boxShadow: "0 0 16px rgba(249,115,22,0.8)" }}
                />
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-white/40">{e.when}</div>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
                    {e.title}
                  </h3>
                  <div className="mt-1 text-sm text-white/55">{e.place}</div>
                </div>
                <div className="text-white/60">{e.desc}</div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   CONTACT                                   */
/* -------------------------------------------------------------------------- */

function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-40 sm:py-52">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#0B1120] p-10 sm:p-20 ring-glow">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#F97316]/40 blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-[#38BDF8]/35 blur-[130px]"
        />
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

        <div className="relative">
          <SectionLabel num="05">Contact</SectionLabel>
          <Reveal>
            <h2 className="max-w-3xl text-balance text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-[1] tracking-[-0.035em] text-white">
              Let's build something <span className="accent-text-animated">meaningful.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-balance text-white/60 sm:text-lg">
              Open to internships, freelance collaborations, and opportunities focused on full-stack engineering, AI systems, and modern digital products.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <MagneticButton href="mailto:riteshrathore391@gmail.com" variant="primary">
                <Mail className="h-4 w-4" />
                <span>riteshrathore391@gmail.com</span>
              </MagneticButton>
              <MagneticButton href="https://www.linkedin.com/in/ritesh-rathore-309369267" variant="outline">
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </MagneticButton>
              <MagneticButton href="https://github.com/ritesh391" variant="outline">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    FOOTER                                   */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-6 pb-12 pt-6">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs text-white/40 sm:flex-row">
        <p>Designed &amp; engineered with precision.</p>
        <p className="font-mono">© 2026 Ritesh Rathore</p>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   PORTFOLIO                                 */
/* -------------------------------------------------------------------------- */

function Portfolio() {
  return (
    <div className="relative min-h-screen text-white">
      <AmbientBackground />
      <CursorSpotlight />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}