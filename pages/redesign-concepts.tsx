import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import Metadata from "@/components/metadata/Metadata";
import { client } from "@/helpers/clinet";
import { EN_HOME_SLUG, PAGE_TYPE } from "@/helpers/contentTypes";
import { richTextOptions } from "@/helpers/richTextOptions";

const defaultPrimaryCta = { label: "Book a discovery call", href: "" };
const secondaryCta = { label: "Portfolio", href: "/en/portfolio" };

type NavItem = { text: string; href: string };

const navItems: NavItem[] = [
  { text: "Portfolio", href: "/en/portfolio" },
  { text: "Video Ads", href: "/en/video-ads" },
  { text: "Email Sequences", href: "/en/email-sequences" },
  { text: "Landing Pages", href: "/en/landing-pages" },
  { text: "Contact", href: "/en/contact" },
];

const PreviewHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const cta = navItems[navItems.length - 1];
  const links = navItems.slice(0, -1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    if (!isOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-navy/10 bg-white/86 shadow-[0_10px_32px_rgba(10,31,68,0.05)] backdrop-blur-xl"
            : "border-transparent bg-white/92 backdrop-blur-sm"
        }`}
      >
        <div className="container flex h-14 items-center justify-between gap-5">
          <Link href="/" className="group inline-flex flex-col leading-none">
            <span className="text-base font-semibold tracking-[-0.035em] text-black transition-colors group-hover:text-navy sm:text-lg">
              Slavisa Bogdanovic
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0 rounded-full border border-black/10 bg-white/80 p-1 shadow-[0_8px_24px_rgba(10,31,68,0.04)] lg:flex"
            aria-label="Main"
          >
            {links.map((item) => {
              const isActive = router.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium outline-offset-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy ${
                    isActive
                      ? "bg-navy text-white"
                      : "text-black/62 hover:bg-navy/6 hover:text-black"
                  }`}
                >
                  {item.text}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              href={cta.href}
              className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(10,31,68,0.14)] outline-offset-4 ring-1 ring-navy/10 transition duration-300 hover:-translate-y-0.5 hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy"
            >
              {cta.text}
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm transition hover:border-navy/20 lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? "close menu" : "toggle menu"}
            aria-expanded={isOpen}
            aria-controls="redesign-mobile-menu"
          >
            <span className="sr-only">
              {isOpen ? "close menu" : "toggle menu"}
            </span>
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform ${
                  isOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-px w-5 bg-current transition-opacity ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform ${
                  isOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {isOpen ? (
        <div
          id="redesign-mobile-menu"
          className="fixed inset-x-0 top-14 z-40 border-b border-navy/10 bg-white/96 shadow-[0_24px_60px_rgba(10,31,68,0.12)] backdrop-blur-xl lg:hidden"
        >
          <nav className="container py-3" aria-label="Main">
            <div className="grid gap-1">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3.5 text-lg font-medium tracking-[-0.02em] text-black/78 transition hover:bg-navy/6 hover:text-black"
                >
                  {item.text}
                </Link>
              ))}
              <Link
                href={cta.href}
                className="mt-3 rounded-full bg-navy px-5 py-3.5 text-center text-base font-semibold text-white shadow-[0_10px_26px_rgba(10,31,68,0.14)] transition hover:bg-dark"
              >
                {cta.text}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
};

const PreviewFooter = () => (
  <footer className="border-t border-navy bg-navy text-white">
    <div className="container py-16 sm:py-[4.5rem]">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="max-w-xl">
          <span className="text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
            Slavisa Bogdanovic
          </span>
          <p className="mt-5 text-sm font-medium uppercase tracking-[0.22em] text-white/56">
            Copywriter
          </p>
          <p className="mt-4 text-lg font-medium italic leading-7 text-white/80">
            Human-written. AI-refined.
          </p>
        </div>
        <div className="flex flex-col gap-5 lg:items-end lg:text-right">
          <div className="flex flex-col gap-3 text-sm font-medium text-white/64 sm:flex-row sm:gap-6">
            <Link
              href="/en/privacy-policy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/en/terms-of-use"
              className="transition hover:text-white"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-sm leading-6 text-white/48 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Slavisa Bogdanovic. All Rights Reserved.</p>
        <p>
          Created by{" "}
          <a
            href="https://www.linkedin.com/in/danijel-glisic/"
            className="underline decoration-white/30 underline-offset-4 transition hover:text-white"
          >
            Danijel Glišić
          </a>
        </p>
      </div>
    </div>
  </footer>
);

const RedesignPreviewLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-white text-black">
    <PreviewHeader />
    <main>{children}</main>
    <PreviewFooter />
  </div>
);

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
  primaryCta: {
    label: string;
    href: string;
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
  primaryCta,
}: {
  hero: RedesignConceptsProps["hero"];
  primaryCta: RedesignConceptsProps["primaryCta"];
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.35 }}
    transition={{ staggerChildren: 0.06 }}
    className="relative z-10 max-w-4xl lg:pr-4"
  >
    {hero.heading ? (
      <motion.h1
        variants={fadeUp}
        transition={sharedTransition}
        className="text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-black sm:text-6xl lg:text-7xl xl:text-[5.5rem] xl:leading-[0.96]"
      >
        {hero.heading}
      </motion.h1>
    ) : null}
    {hero.heading2?.length ? (
      <motion.ul
        variants={fadeUp}
        transition={sharedTransition}
        className="mt-8 grid max-w-3xl gap-3 text-2xl font-semibold leading-tight tracking-[-0.035em] text-black/82 sm:text-3xl lg:text-[2rem]"
      >
        {hero.heading2.map((item) => (
          <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-3">
            <span aria-hidden="true" className="text-navy/20">
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
        className="mt-8 max-w-3xl text-lg leading-8 text-black/62 sm:text-xl sm:leading-9 [&_a]:text-black [&_a]:underline [&_p]:mb-4"
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
        <a className="rounded-full bg-navy px-7 py-3.5 text-center text-sm font-semibold text-white shadow-[0_16px_36px_rgba(10,31,68,0.14)] outline-offset-4 transition duration-300 hover:-translate-y-0.5 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black">
          {primaryCta.label}
        </a>
      </Link>
      <Link href={secondaryCta.href} legacyBehavior>
        <a className="rounded-full border border-navy/25 bg-white px-7 py-3.5 text-center text-sm font-semibold text-navy shadow-[0_12px_28px_rgba(10,31,68,0.07)] outline-offset-4 transition duration-300 hover:-translate-y-0.5 hover:border-navy/45 hover:bg-navy/4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black">
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
      className="relative mx-auto w-full max-w-[25.5rem] text-black/50 lg:max-w-[29.5rem]"
    >
      <div className="overflow-hidden rounded-[2rem] border border-navy/10 bg-white p-2 shadow-[0_24px_62px_rgba(10,31,68,0.12)]">
        <Image
          src={hero.image.url}
          alt={hero.image.alt || "Slavisa Bogdanovic"}
          width={520}
          height={640}
          priority
          className="h-auto w-full rounded-[1.5rem] object-cover"
        />
      </div>
      <figcaption className="mt-5 text-center text-sm font-medium text-black/52">
        Slavisa Bogdanovic
      </figcaption>
    </motion.figure>
  );
};

const QuietAuthorityHero = ({
  hero,
  primaryCta,
}: {
  hero: RedesignConceptsProps["hero"];
  primaryCta: RedesignConceptsProps["primaryCta"];
}) => (
  <section className="relative overflow-hidden bg-white">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(10,31,68,0.075),transparent_34%),linear-gradient(180deg,rgba(10,31,68,0.035),rgba(255,255,255,0)_38%)]" />
    <div className="container relative py-16 sm:py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.28fr)_minmax(22rem,0.72fr)] lg:gap-12">
        <HeroCopy hero={hero} primaryCta={primaryCta} />
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
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-black sm:text-4xl">
              {socialProof.title}
            </h2>
          ) : null}
          {socialProof.description ? (
            <p className="mt-4 text-lg leading-8 text-black/62">
              {socialProof.description}
            </p>
          ) : null}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {socialProof.images.slice(0, 4).map((image) => (
            <div
              key={image.url}
              className="overflow-hidden rounded-[1.25rem] bg-white p-2 shadow-[0_16px_44px_rgba(10,31,68,0.08)] ring-1 ring-navy/10"
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
  primaryCta,
  socialProof,
}: RedesignConceptsProps) => {
  return (
    <RedesignPreviewLayout>
      <Metadata
        title={seoTitle ?? "Slaviša Bogdanović"}
        description={seoDescription ?? ""}
        path="redesign-concepts"
      />
      <QuietAuthorityHero hero={hero} primaryCta={primaryCta} />
      <SocialProofPreview socialProof={socialProof} />
    </RedesignPreviewLayout>
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
  const heroSection = sections.find((section: any) => {
    const contentType = section?.sys?.contentType?.sys?.id;
    return (
      contentType === "landingSection" || contentType === "videoLandingSection"
    );
  });
  const photoSlider = sections.find(
    (section: any) => section?.sys?.contentType?.sys?.id === "photoSlider"
  );
  const consultationBanner = sections.find(
    (section: any) =>
      section?.sys?.contentType?.sys?.id === "freeConsultationBanner"
  );
  const heroFields = heroSection?.fields ?? {};
  const heroContentType = heroSection?.sys?.contentType?.sys?.id;
  const sliderFields = photoSlider?.fields ?? {};
  const consultationCta = consultationBanner?.fields?.cta?.fields;

  return {
    props: {
      seoTitle: homepage?.fields?.seoTitle ?? null,
      seoDescription: homepage?.fields?.seoDesctiption ?? null,
      hero: {
        heading:
          heroContentType === "videoLandingSection"
            ? (heroFields.title ?? null)
            : (heroFields.heading ?? null),
        heading2: heroFields.heading2 ?? [],
        text:
          heroContentType === "videoLandingSection"
            ? (heroFields.description ?? null)
            : (heroFields.text ?? null),
        image: getAsset(heroFields.image),
      },
      primaryCta: {
        label: "Book a discovery call",
        href: consultationCta?.url ?? defaultPrimaryCta.href,
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
