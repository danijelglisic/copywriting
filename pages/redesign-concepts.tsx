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

const primaryCta = { label: "Contact", href: "/en/contact" };
const secondaryCta = { label: "Portfolio", href: "/en/portfolio" };

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const sharedTransition = { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] };

type RedesignConceptsProps = {
  seoTitle?: string;
  seoDescription?: string;
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

const HeroCopy = ({ hero }: { hero: RedesignConceptsProps["hero"] }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.35 }}
    transition={{ staggerChildren: 0.06 }}
    className="relative z-10 max-w-4xl"
  >
    {hero.heading ? (
      <motion.h1
        variants={fadeUp}
        transition={sharedTransition}
        className="text-5xl font-semibold leading-[0.94] tracking-[-0.065em] text-slate-950 sm:text-6xl lg:text-7xl xl:text-8xl"
      >
        {hero.heading}
      </motion.h1>
    ) : null}
    {hero.heading2?.length ? (
      <motion.ul
        variants={fadeUp}
        transition={sharedTransition}
        className="mt-8 grid max-w-3xl gap-3 text-2xl font-semibold leading-tight tracking-[-0.035em] text-slate-800 sm:text-3xl lg:text-4xl"
      >
        {hero.heading2.map((item) => (
          <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-3">
            <span aria-hidden="true" className="text-slate-300">
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
        className="mt-8 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9 [&_a]:text-slate-950 [&_a]:underline [&_p]:mb-4"
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
        <a className="rounded-full bg-slate-950 px-7 py-3.5 text-center text-sm font-semibold text-white shadow-[0_16px_36px_rgba(15,23,42,0.14)] outline-offset-4 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-950">
          {primaryCta.label}
        </a>
      </Link>
      <Link href={secondaryCta.href} legacyBehavior>
        <a className="rounded-full border border-slate-200 bg-white px-7 py-3.5 text-center text-sm font-semibold text-slate-800 shadow-sm outline-offset-4 transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-950">
          {secondaryCta.label}
        </a>
      </Link>
    </motion.div>
  </motion.div>
);

const Portrait = ({ hero }: { hero: RedesignConceptsProps["hero"] }) => {
  if (!hero.image) return null;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ ...sharedTransition, delay: 0.1 }}
      className="relative mx-auto w-full max-w-[20rem] text-slate-500 lg:max-w-[22rem]"
    >
      <div className="overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-[0_24px_60px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80">
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

const QuietAuthorityHero = ({
  hero,
}: {
  hero: RedesignConceptsProps["hero"];
}) => (
  <section className="overflow-hidden bg-[#fbfaf7]">
    <div className="container py-16 sm:py-20 lg:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)] lg:gap-16">
        <HeroCopy hero={hero} />
        <Portrait hero={hero} />
      </div>
    </div>
  </section>
);

const SocialProofPreview = ({
  socialProof,
}: {
  socialProof: RedesignConceptsProps["socialProof"];
}) => {
  if (!socialProof?.images.length) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          {socialProof.title ? (
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {socialProof.title}
            </h2>
          ) : null}
          {socialProof.description ? (
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {socialProof.description}
            </p>
          ) : null}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {socialProof.images.slice(0, 4).map((image) => (
            <div
              key={image.url}
              className="overflow-hidden rounded-[1.25rem] bg-white p-2 shadow-[0_16px_44px_rgba(15,23,42,0.08)] ring-1 ring-slate-200"
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
      </div>
    </section>
  );
};

const RedesignConcepts = ({
  seoTitle,
  seoDescription,
  hero,
  socialProof,
}: RedesignConceptsProps) => {
  return (
    <Layout>
      <Metadata
        title={seoTitle ?? "Slaviša Bogdanović"}
        description={seoDescription ?? ""}
        path="redesign-concepts"
      />
      <QuietAuthorityHero hero={hero} />
      <SocialProofPreview socialProof={socialProof} />
    </Layout>
  );
};

export default RedesignConcepts;

export const getStaticProps: GetStaticProps<
  RedesignConceptsProps
> = async () => {
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

  return {
    props: {
      seoTitle: homepage?.fields?.seoTitle ?? null,
      seoDescription: homepage?.fields?.seoDesctiption ?? null,
      hero: {
        heading: landingFields.heading ?? null,
        heading2: landingFields.heading2 ?? [],
        text: landingFields.text ?? null,
        image: getAsset(landingFields.image),
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
