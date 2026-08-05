import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import Metadata from "@/components/metadata/Metadata";

const HERO_COPY = {
  eyebrow: "COPYWRITER",
  heading: "Slavisa Bogdanovic",
  description:
    "Human-written. AI-refined. Premium direct-response copy for brands that need clear thinking, sharper positioning, and words that move serious buyers to act.",
};

const primaryCta = { label: "Book a consultation", href: "/en/contact" };
const secondaryCta = { label: "View portfolio", href: "/en/portfolio" };

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const sharedTransition = { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] };

const HeroCopy = ({
  alignment = "left",
}: {
  alignment?: "left" | "center";
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.35 }}
    transition={{ staggerChildren: 0.08 }}
    className={`relative z-10 ${alignment === "center" ? "mx-auto max-w-4xl text-center" : "max-w-3xl"}`}
  >
    <motion.p
      variants={fadeUp}
      transition={sharedTransition}
      className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-slate-500"
    >
      {HERO_COPY.eyebrow}
    </motion.p>
    <motion.h1
      variants={fadeUp}
      transition={sharedTransition}
      className="text-5xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl"
    >
      {HERO_COPY.heading}
    </motion.h1>
    <motion.p
      variants={fadeUp}
      transition={sharedTransition}
      className={`mt-7 text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9 ${alignment === "center" ? "mx-auto max-w-3xl" : "max-w-2xl"}`}
    >
      {HERO_COPY.description}
    </motion.p>
    <motion.div
      variants={fadeUp}
      transition={sharedTransition}
      className={`mt-10 flex flex-col gap-3 sm:flex-row ${alignment === "center" ? "justify-center" : ""}`}
    >
      <Link href={primaryCta.href} legacyBehavior>
        <a className="rounded-full bg-slate-950 px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800">
          {primaryCta.label}
        </a>
      </Link>
      <Link href={secondaryCta.href} legacyBehavior>
        <a className="rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-center text-sm font-semibold text-slate-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white">
          {secondaryCta.label}
        </a>
      </Link>
    </motion.div>
  </motion.div>
);

const Portrait = ({
  variant,
}: {
  variant: "quiet" | "balanced" | "modern";
}) => {
  const styles = {
    quiet:
      "rounded-[2rem] shadow-[0_30px_80px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/70",
    balanced:
      "rounded-[2.5rem] shadow-[0_35px_90px_rgba(15,23,42,0.2)] ring-1 ring-white/70",
    modern:
      "rounded-[2rem] shadow-[0_35px_100px_rgba(30,41,59,0.28)] ring-1 ring-white/50",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 18 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ ...sharedTransition, delay: 0.12 }}
      className={`relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden bg-slate-100 ${styles[variant]}`}
    >
      <Image
        src="/placeholder.jpg"
        alt="Slavisa Bogdanovic"
        fill
        priority
        className="object-cover"
      />
    </motion.div>
  );
};

const ConceptA = () => (
  <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f8f8f6] px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
    <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
      <HeroCopy />
      <Portrait variant="quiet" />
    </div>
  </section>
);

const ConceptB = () => (
  <section className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white px-6 py-16 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:px-10 lg:px-16 lg:py-24">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(74,144,217,0.18),transparent_28%),linear-gradient(135deg,rgba(248,250,252,0.7),rgba(255,255,255,0))]" />
    <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
      <HeroCopy />
      <div className="relative">
        <div className="absolute -inset-6 rounded-[3rem] bg-slate-950/[0.04] blur-2xl" />
        <Portrait variant="balanced" />
      </div>
    </div>
  </section>
);

const ConceptC = () => (
  <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-16 text-white shadow-[0_30px_100px_rgba(15,23,42,0.22)] sm:px-10 lg:px-16 lg:py-24">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(74,144,217,0.26),transparent_30%),radial-gradient(circle_at_78%_35%,rgba(255,255,255,0.14),transparent_26%)]" />
    <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
    <div className="relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="order-2 lg:order-1">
        <Portrait variant="modern" />
      </div>
      <div className="order-1 lg:order-2 [&_h1]:text-white [&_p]:text-slate-300 [&_p:first-child]:text-slate-400 [&_a:first-child]:bg-white [&_a:first-child]:text-slate-950 [&_a:last-child]:border-white/15 [&_a:last-child]:bg-white/10 [&_a:last-child]:text-white">
        <HeroCopy />
      </div>
    </div>
  </section>
);

const RedesignConcepts = () => (
  <Layout>
    <Metadata
      title="Hero Redesign Concepts | Slavisa Bogdanovic"
      description="Temporary live comparison of three premium hero redesign concepts."
      path="redesign-concepts"
    />
    <div className="bg-white">
      <div className="container py-12 sm:py-16">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
            Temporary preview
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            Live Hero concepts
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Three responsive directions using the existing hero copy, existing
            photograph, current navigation links, and restrained premium
            presentation. The current Home page is unchanged.
          </p>
        </div>
        <div className="space-y-10">
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Concept A — Quiet Authority
            </h2>
            <ConceptA />
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Concept B — Balanced Premium
            </h2>
            <ConceptB />
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Concept C — Modern Premium
            </h2>
            <ConceptC />
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default RedesignConcepts;
