import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "@/components/layout/Layout";
import Metadata from "@/components/metadata/Metadata";
import { client } from "@/helpers/clinet";
import { EN_HOME_SLUG, PAGE_TYPE } from "@/helpers/contentTypes";
import { richTextOptions } from "@/helpers/richTextOptions";

const primaryCta = { label: "Book a consultation", href: "/en/contact" };
const secondaryCta = { label: "View portfolio", href: "/en/portfolio" };

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const sharedTransition = { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] };

type ConceptProps = {
  hero: {
    heading?: string;
    heading2?: string[];
    text?: any;
    image?: {
      url: string;
      alt: string;
    } | null;
  };
  socialProof: {
    title?: string;
    description?: string;
    images: {
      url: string;
      alt: string;
    }[];
  } | null;
};

const getAsset = (asset: any) => {
  const fileUrl = asset?.fields?.file?.url;

  if (!fileUrl) return null;

  return {
    url: fileUrl.startsWith("http") ? fileUrl : `https:${fileUrl}`,
    alt: asset?.fields?.description || asset?.fields?.title || "",
  };
};

const HeroCopy = ({
  hero,
  inverse = false,
}: {
  hero: ConceptProps["hero"];
  inverse?: boolean;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.35 }}
    transition={{ staggerChildren: 0.07 }}
    className="relative z-10 max-w-4xl"
  >
    <motion.div
      variants={fadeUp}
      transition={sharedTransition}
      className={`mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] ${inverse ? "text-slate-400" : "text-slate-500"}`}
    >
      <span
        className={`h-px w-10 ${inverse ? "bg-white/30" : "bg-slate-300"}`}
      />
      <span>Copywriter</span>
    </motion.div>
    <motion.h1
      variants={fadeUp}
      transition={sharedTransition}
      className={`text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-7xl ${inverse ? "text-white" : "text-slate-950"}`}
    >
      {hero.heading}
    </motion.h1>
    {hero.heading2?.length ? (
      <motion.ul
        variants={fadeUp}
        transition={sharedTransition}
        className={`mt-8 grid gap-3 text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl ${inverse ? "text-slate-100" : "text-slate-800"}`}
      >
        {hero.heading2.map((item) => (
          <li key={item} className="flex gap-3">
            <span className={inverse ? "text-slate-500" : "text-slate-300"}>
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </motion.ul>
    ) : null}
    {hero.text ? (
      <motion.div
        variants={fadeUp}
        transition={sharedTransition}
        className={`mt-8 max-w-3xl text-lg leading-8 sm:text-xl sm:leading-9 [&_p]:mb-4 ${inverse ? "text-slate-300" : "text-slate-600"}`}
      >
        {documentToReactComponents(hero.text, richTextOptions)}
      </motion.div>
    ) : null}
    <motion.div
      variants={fadeUp}
      transition={sharedTransition}
      className="mt-10 flex flex-col gap-3 sm:flex-row"
    >
      <Link href={primaryCta.href} legacyBehavior>
        <a
          className={`rounded-full px-6 py-3 text-center text-sm font-semibold shadow-[0_16px_40px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-0.5 ${inverse ? "bg-white text-slate-950 hover:bg-slate-100" : "bg-slate-950 text-white hover:bg-slate-800"}`}
        >
          {primaryCta.label}
        </a>
      </Link>
      <Link href={secondaryCta.href} legacyBehavior>
        <a
          className={`rounded-full border px-6 py-3 text-center text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${inverse ? "border-white/15 bg-white/5 text-white hover:bg-white/10" : "border-slate-200 bg-white text-slate-800 shadow-sm hover:border-slate-300"}`}
        >
          {secondaryCta.label}
        </a>
      </Link>
    </motion.div>
  </motion.div>
);

const Portrait = ({
  hero,
  inverse = false,
}: {
  hero: ConceptProps["hero"];
  inverse?: boolean;
}) => {
  if (!hero.image) return null;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ ...sharedTransition, delay: 0.12 }}
      className={`relative mx-auto w-full max-w-[22rem] ${inverse ? "text-slate-400" : "text-slate-500"}`}
    >
      <div
        className={`overflow-hidden rounded-[1.75rem] ${inverse ? "bg-white/5 ring-1 ring-white/10 shadow-[0_34px_80px_rgba(0,0,0,0.32)]" : "bg-slate-100 ring-1 ring-slate-200 shadow-[0_28px_70px_rgba(15,23,42,0.13)]"}`}
      >
        <Image
          src={hero.image.url}
          alt={hero.image.alt || "Slavisa Bogdanovic"}
          width={520}
          height={640}
          priority
          className="h-auto w-full object-cover"
        />
      </div>
      <figcaption className="mt-4 text-center text-sm font-medium">
        Slavisa Bogdanovic
      </figcaption>
    </motion.figure>
  );
};

const ConceptA = ({ hero }: { hero: ConceptProps["hero"] }) => (
  <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#fbfaf7] px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
    <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_0.65fr]">
      <HeroCopy hero={hero} />
      <Portrait hero={hero} />
    </div>
  </section>
);

const ConceptB = ({ hero }: { hero: ConceptProps["hero"] }) => (
  <section className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white px-6 py-16 shadow-[0_24px_75px_rgba(15,23,42,0.07)] sm:px-10 lg:px-16 lg:py-24">
    <div className="absolute inset-y-10 right-10 hidden w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent lg:block" />
    <div className="relative grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr]">
      <HeroCopy hero={hero} />
      <div className="rounded-[2.25rem] bg-slate-50 p-4 ring-1 ring-slate-100">
        <Portrait hero={hero} />
      </div>
    </div>
  </section>
);

const ConceptC = ({ hero }: { hero: ConceptProps["hero"] }) => (
  <section className="relative overflow-hidden rounded-[2.5rem] bg-[#080a0f] px-6 py-16 text-white shadow-[0_30px_90px_rgba(15,23,42,0.24)] sm:px-10 lg:px-16 lg:py-24">
    <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    <div className="relative grid items-center gap-14 lg:grid-cols-[1.28fr_0.72fr]">
      <HeroCopy hero={hero} inverse />
      <Portrait hero={hero} inverse />
    </div>
  </section>
);

const SocialProofPreview = ({
  socialProof,
}: {
  socialProof: ConceptProps["socialProof"];
}) => {
  if (!socialProof?.images.length) return null;

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-slate-50 px-6 py-12 sm:px-10">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          Social proof treatment
        </p>
        {socialProof.title ? (
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {socialProof.title}
          </h2>
        ) : null}
        {socialProof.description ? (
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {socialProof.description}
          </p>
        ) : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {socialProof.images.slice(0, 4).map((image) => (
          <div
            key={image.url}
            className="overflow-hidden rounded-[1.25rem] bg-white p-2 shadow-sm ring-1 ring-slate-200"
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={300}
              height={600}
              className="h-auto w-full rounded-[1rem]"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const RedesignConcepts = ({ hero, socialProof }: ConceptProps) => {
  return (
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
              Three responsive directions using the current Home page copy,
              existing Contentful photograph, current navigation links, and a
              restrained premium personal-brand presentation. The production
              Home page is unchanged.
            </p>
          </div>
          <div className="space-y-10">
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Concept A — Quiet Authority
              </h2>
              <ConceptA hero={hero} />
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Concept B — Balanced Premium
              </h2>
              <ConceptB hero={hero} />
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Concept C — Modern Premium
              </h2>
              <ConceptC hero={hero} />
            </div>
            <SocialProofPreview socialProof={socialProof} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RedesignConcepts;

export const getStaticProps: GetStaticProps<ConceptProps> = async () => {
  const homepageResponse = await client().getEntries({
    content_type: PAGE_TYPE,
    "fields.slug": EN_HOME_SLUG,
    include: 10,
  });
  const homepage = homepageResponse.items[0] as any;
  const sections = homepage?.fields?.contentSections ?? [];
  const landingSection = sections.find(
    (section: any) => section?.sys?.contentType?.sys?.id === "landingSection"
  );
  const photoSlider = sections.find(
    (section: any) => section?.sys?.contentType?.sys?.id === "photoSlider"
  );
  const landingFields = landingSection?.fields ?? {};
  const sliderFields = photoSlider?.fields ?? {};
  const heroImage = getAsset(landingFields.image);

  return {
    props: {
      hero: {
        heading: landingFields.heading ?? "Slavisa Bogdanovic",
        heading2: landingFields.heading2 ?? [],
        text: landingFields.text ?? null,
        image: heroImage,
      },
      socialProof: photoSlider
        ? {
            title: sliderFields.title ?? null,
            description: sliderFields.description ?? null,
            images:
              sliderFields.images
                ?.map((item: any) => getAsset(item?.fields?.image))
                .filter(Boolean) ?? [],
          }
        : null,
    },
  };
};
