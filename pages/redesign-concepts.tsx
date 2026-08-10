import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { useRouter } from "next/router";
import Metadata from "@/components/metadata/Metadata";
import { client } from "@/helpers/clinet";
import { EN_HOME_SLUG, PAGE_TYPE } from "@/helpers/contentTypes";
import { richTextOptions } from "@/helpers/richTextOptions";

const defaultPrimaryCta = { label: "Book a discovery call", href: "" };
const secondaryCta = { label: "Portfolio", href: "/en/portfolio" };
const primaryButtonClass =
  "rounded-full bg-navy px-7 py-[0.8125rem] text-center text-sm font-semibold text-white shadow-[0_18px_38px_rgba(10,31,68,0.16)] outline-offset-4 ring-1 ring-navy/10 transition duration-300 hover:-translate-y-0.5 hover:bg-black active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black";
const serviceTitleClass = "text-xl font-bold uppercase text-black";
const serviceBodyClass = "pt-10 text-lg leading-9 text-black/68";
const PrimaryCtaLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} legacyBehavior>
    <a className={primaryButtonClass}>{label}</a>
  </Link>
);

const renderHeroHeading = (heading: string) =>
  heading.split(/(Converting)/g).map((part, index) =>
    part === "Converting" ? (
      <span key={`${part}-${index}`} className="inline-block whitespace-nowrap">
        Conve<span className="mr-[0.02em] inline-block">r</span>ting
      </span>
    ) : (
      part
    )
  );

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
            ? "border-navy/10 bg-white/94 shadow-[0_14px_36px_rgba(10,31,68,0.055)] backdrop-blur-2xl"
            : "border-transparent bg-white/98 backdrop-blur-lg"
        }`}
      >
        <div className="container flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="group inline-flex translate-y-px flex-col pl-0.5 leading-none"
          >
            <span className="text-xl font-bold tracking-[-0.045em] text-black transition-colors group-hover:text-navy sm:text-2xl">
              Slavisa Bogdanovic
            </span>
          </Link>

          <nav
            className="hidden items-center gap-2 rounded-full border border-black/10 bg-white/80 p-1.5 shadow-[0_8px_24px_rgba(10,31,68,0.04)] lg:flex"
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
              className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(10,31,68,0.14)] outline-offset-4 ring-1 ring-navy/10 transition duration-300 hover:-translate-y-0.5 hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy"
            >
              {cta.text}
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm transition hover:border-navy/20 lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? "close menu" : "toggle menu"}
            aria-expanded={isOpen}
            aria-controls="redesign-mobile-menu"
          >
            <span className="sr-only">
              {isOpen ? "close menu" : "toggle menu"}
            </span>
            <svg
              viewBox="0 0 20 16"
              className="h-4 w-5"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="butt"
            >
              <line
                x1="0"
                y1="0.5"
                x2="20"
                y2="0.5"
                className={`origin-center [transform-box:fill-box] transition-transform ${
                  isOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <line
                x1="0"
                y1="7.5"
                x2="20"
                y2="7.5"
                className={`transition-opacity ${isOpen ? "opacity-0" : ""}`}
              />
              <line
                x1="0"
                y1="14.5"
                x2="20"
                y2="14.5"
                className={`origin-center [transform-box:fill-box] transition-transform ${
                  isOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </svg>
          </button>
        </div>
      </header>

      {isOpen ? (
        <div
          id="redesign-mobile-menu"
          className="fixed inset-x-0 top-16 z-40 border-b border-navy/10 bg-white/96 shadow-[0_24px_60px_rgba(10,31,68,0.12)] backdrop-blur-xl lg:hidden"
        >
          <nav className="container py-4" aria-label="Main">
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

export const PreviewFooter = () => (
  <footer className="border-t border-navy bg-navy text-white">
    <div className="container py-16 sm:py-[4.5rem]">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
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
      <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-sm leading-6 text-white/48 sm:flex-row sm:items-center sm:justify-between">
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

export const RedesignPreviewLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
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
  meetSarah: {
    title?: string;
    subtitle?: string;
    richText?: any;
    image?: {
      url: string;
      alt: string;
    } | null;
    cta?: {
      label?: string;
      href?: string;
    } | null;
  } | null;
  landingPages: {
    title?: string;
    subtitle?: string;
    richText?: any;
    cta?: {
      label?: string;
      href?: string;
    } | null;
  } | null;
  emailSequences: {
    title?: string;
    subtitle?: string;
    richText?: any;
    image?: {
      url: string;
      alt: string;
    } | null;
    cta?: {
      label?: string;
      href?: string;
    } | null;
  } | null;
  transition: {
    headline?: string;
    description?: string;
    cta?: {
      label?: string;
      href?: string;
    } | null;
  } | null;
  whatToExpect: {
    title?: string;
    subtitle?: string;
    richText?: any;
    image?: {
      url: string;
      alt: string;
    } | null;
    cta?: {
      label?: string;
      href?: string;
    } | null;
  } | null;
  socialProof: {
    title?: string;
    description?: string;
    images: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    }[];
  } | null;
  finalCta: {
    headline?: string;
    description?: string;
    cta?: {
      label?: string;
      href?: string;
    } | null;
  } | null;
};

const getAsset = (asset: any) => {
  const fileUrl = asset?.fields?.file?.url;
  const dimensions = asset?.fields?.file?.details?.image;

  if (!fileUrl) return null;

  return {
    url: fileUrl.startsWith("http") ? fileUrl : `https:${fileUrl}`,
    alt: asset?.fields?.description || asset?.fields?.title || "",
    width: dimensions?.width,
    height: dimensions?.height,
  };
};

const getImageContentAsset = (image: any) => {
  const asset = getAsset(image?.fields?.image);

  if (!asset) return null;

  return {
    ...asset,
    alt: image?.fields?.imageDescription || asset.alt,
  };
};

const getContentText = (value: any): string => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(getContentText).join(" ");
  if (typeof value === "object") {
    return Object.values(value).map(getContentText).filter(Boolean).join(" ");
  }

  return "";
};

const sectionIncludes = (section: any, text: string) =>
  getContentText(section?.fields).toLowerCase().includes(text);

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
        className="text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-black [font-kerning:normal] sm:text-6xl lg:text-7xl xl:text-[5.5rem] xl:leading-[0.96]"
      >
        {renderHeroHeading(hero.heading)}
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
        className="mt-8 max-w-3xl text-lg leading-8 text-black/68 sm:text-xl sm:leading-9 [&_a]:text-black [&_a]:underline [&_p]:mb-4"
      >
        {documentToReactComponents(hero.text, richTextOptions)}
      </motion.div>
    ) : null}
    <motion.div
      variants={fadeUp}
      transition={sharedTransition}
      className="mt-10 flex flex-col gap-3 sm:flex-row"
    >
      <PrimaryCtaLink href={primaryCta.href} label={primaryCta.label} />
      <Link href={secondaryCta.href} legacyBehavior>
        <a className="rounded-full border border-navy/55 bg-white px-7 py-[0.8125rem] text-center text-sm font-semibold text-black/90 shadow-[0_12px_28px_rgba(10,31,68,0.08)] outline-offset-4 transition duration-300 hover:-translate-y-0.5 hover:border-navy/70 hover:bg-navy/3 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black">
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
      className="relative mx-auto w-full max-w-[26.75rem] text-black/50 lg:mx-0 lg:max-w-[31rem] lg:-translate-x-3"
    >
      <div className="overflow-hidden rounded-[2rem] border border-navy/10 bg-white p-2 shadow-[0_26px_66px_rgba(10,31,68,0.12)]">
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
  <section className="relative overflow-hidden bg-[#F9F9F7]">
    <div className="container relative pb-16 pt-3 sm:pb-20 sm:pt-5 lg:pb-28 lg:pt-7">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.28fr)_minmax(22rem,0.72fr)] lg:gap-10">
        <HeroCopy hero={hero} primaryCta={primaryCta} />
        <Portrait hero={hero} />
      </div>
    </div>
  </section>
);

const isVideoAdsLabel = (value?: string) =>
  value?.trim().toLowerCase() === "video ads";

const getNodeText = (node: any): string => {
  if (!node?.content) return "";

  return node.content
    .map((child: any) => child.value ?? getNodeText(child))
    .join("");
};

const meetSarahRichTextOptions = {
  ...richTextOptions,
  renderNode: {
    ...richTextOptions.renderNode,
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => {
      const text = getNodeText(node).trim();
      const normalizedText = text.toLowerCase().replace(/’/g, "'");

      if (!text) return null;

      if (normalizedText.startsWith("but she landed on a page")) {
        return <p className="mb-12">{children}</p>;
      }

      if (normalizedText.startsWith("she wasn't convinced")) {
        return <p className="mb-16">{children}</p>;
      }

      if (normalizedText.startsWith("if your video ad")) {
        return <p className="mb-12">{children}</p>;
      }

      if (normalizedText.startsWith("let's give her a reason")) {
        return <p className="mb-0">{children}</p>;
      }

      return <p className="mb-5 last:mb-0">{children}</p>;
    },
    [BLOCKS.QUOTE]: (_node: any, children: React.ReactNode) => (
      <blockquote className="mb-10 border-l-4 border-secondary pl-4 italic [&_p]:mb-0">
        {children}
      </blockquote>
    ),
  },
};

const landingPagesRichTextOptions = {
  ...richTextOptions,
  renderNode: {
    ...richTextOptions.renderNode,
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => {
      const text = getNodeText(node).trim();
      const normalizedText = text.toLowerCase().replace(/’/g, "'");

      if (!text) return null;

      if (normalizedText === "landing pages") {
        return <p className="mb-12">{children}</p>;
      }

      if (normalizedText.startsWith("but she landed on a page")) {
        return <p className="mb-5">{children}</p>;
      }

      if (normalizedText.startsWith("she wasn't convinced")) {
        return <p className="mb-8">{children}</p>;
      }

      if (normalizedText.startsWith("if your video ad sends people")) {
        return <p className="mb-5">{children}</p>;
      }

      if (normalizedText.startsWith("let's give her a reason")) {
        return <p className="mb-0">{children}</p>;
      }

      return <p className="mb-5 last:mb-0">{children}</p>;
    },
    [BLOCKS.QUOTE]: (_node: any, children: React.ReactNode) => (
      <blockquote className="mb-10 border-l-4 border-secondary pl-4 italic [&_p]:mb-0">
        {children}
      </blockquote>
    ),
  },
};

const emailSequencesRichTextOptions = {
  ...richTextOptions,
  renderNode: {
    ...richTextOptions.renderNode,
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => {
      const text = getNodeText(node).trim();
      const normalizedText = text.toLowerCase().replace(/’/g, "'");

      if (!text) return null;

      if (normalizedText.startsWith("she wasn't")) {
        return <p className="mb-10">{children}</p>;
      }

      return <p className="mb-5 last:mb-0">{children}</p>;
    },
    [BLOCKS.QUOTE]: (_node: any, children: React.ReactNode) => (
      <blockquote className="my-10 border-l-4 border-secondary pl-4 italic [&_p]:mb-0">
        {children}
      </blockquote>
    ),
  },
};

const whatToExpectRichTextOptions = {
  ...richTextOptions,
  renderNode: {
    ...richTextOptions.renderNode,
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => {
      const text = getNodeText(node).trim();
      const normalizedText = text.toLowerCase().replace(/’/g, "'");

      if (!text) return null;

      if (normalizedText === "what you can expect") {
        return <p className="mb-12 font-bold">{children}</p>;
      }

      if (normalizedText.startsWith("if your hook")) {
        return <p className="mb-5 mt-10">{children}</p>;
      }

      return <p className="mb-5 last:mb-0">{children}</p>;
    },
  },
};

const MeetSarahPreview = ({
  section,
}: {
  section: RedesignConceptsProps["meetSarah"];
}) => {
  if (!section) return null;

  const richTextContent = section.richText?.content ?? [];
  const videoAdsIndex = richTextContent.findIndex((node: any) =>
    isVideoAdsLabel(getNodeText(node))
  );
  const videoAdsLabel =
    videoAdsIndex >= 0
      ? getNodeText(richTextContent[videoAdsIndex]).trim()
      : isVideoAdsLabel(section.subtitle)
        ? section.subtitle
        : isVideoAdsLabel(section.title)
          ? section.title
          : null;
  const introRichText =
    videoAdsIndex > 0
      ? {
          ...section.richText,
          content: richTextContent.slice(0, videoAdsIndex),
        }
      : null;
  const videoAdsRichText = section.richText
    ? {
        ...section.richText,
        content:
          videoAdsIndex >= 0
            ? richTextContent.slice(videoAdsIndex + 1)
            : richTextContent,
      }
    : null;

  return (
    <>
      <section className="bg-white py-16 sm:py-20">
        <div className="container">
          <div className="max-w-3xl">
            {section.title && !isVideoAdsLabel(section.title) ? (
              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.045em] text-black sm:text-5xl">
                {section.title}
              </h2>
            ) : null}
            {section.subtitle && !isVideoAdsLabel(section.subtitle) ? (
              <p className="mt-7 text-xl font-medium leading-8 text-black/72">
                {section.subtitle}
              </p>
            ) : null}
            {introRichText ? (
              <div className="mt-5 text-lg leading-9 text-black/68">
                {documentToReactComponents(introRichText, richTextOptions)}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-[#F9F9F7] py-16 sm:py-20 lg:py-16">
        <div className="container">
          <div className="grid items-start gap-14 lg:grid-cols-[minmax(18rem,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={sharedTransition}
              className="relative"
            >
              <div className="absolute inset-8 rounded-[2rem] bg-navy/5 blur-3xl" />
              {section.image ? (
                <div className="relative overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white p-2 shadow-[0_14px_34px_rgba(10,31,68,0.08)] transition duration-300 hover:-translate-y-1">
                  <Image
                    src={section.image.url}
                    alt={section.image.alt}
                    width={520}
                    height={640}
                    className="h-auto w-full rounded-[1.35rem]"
                  />
                </div>
              ) : null}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ ...sharedTransition, delay: 0.08 }}
              className="max-w-3xl"
            >
              {videoAdsLabel ? (
                <p className={serviceTitleClass}>{videoAdsLabel}</p>
              ) : null}
              {videoAdsRichText ? (
                <div className={serviceBodyClass}>
                  {documentToReactComponents(
                    videoAdsRichText,
                    meetSarahRichTextOptions
                  )}
                </div>
              ) : null}
              {section.cta?.href && section.cta?.label ? (
                <div className="mt-8">
                  <PrimaryCtaLink
                    href={section.cta.href}
                    label={section.cta.label}
                  />
                </div>
              ) : null}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

const LandingPagesPreview = ({
  section,
}: {
  section: RedesignConceptsProps["landingPages"];
}) => {
  if (!section) return null;

  const label = section.subtitle ?? section.title;
  const heading = section.subtitle ? section.title : null;

  return (
    <section className="bg-white py-16 sm:py-20 lg:pb-24 lg:pt-16">
      <div className="container">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={sharedTransition}
            className="max-w-3xl"
          >
            {label ? (
              <p className={`${serviceTitleClass} mb-12`}>{label}</p>
            ) : null}
            {heading || section.richText ? (
              <div className={serviceBodyClass}>
                {heading ? (
                  <h2 className="text-4xl font-semibold leading-tight tracking-[-0.045em] text-black sm:text-5xl">
                    {heading}
                  </h2>
                ) : null}
                {section.richText ? (
                  <div
                    className={
                      heading ? "mt-32 border-4 border-red-500" : undefined
                    }
                  >
                    {documentToReactComponents(
                      section.richText,
                      landingPagesRichTextOptions
                    )}
                  </div>
                ) : null}
              </div>
            ) : null}
            {section.cta?.href && section.cta?.label ? (
              <div className="mt-8">
                <div className="sm:hidden">
                  <PrimaryCtaLink
                    href="/en/landing-pages"
                    label="Landing pages"
                  />
                </div>
                <div className="hidden sm:block">
                  <PrimaryCtaLink
                    href={section.cta.href}
                    label="Landing pages"
                  />
                </div>
              </div>
            ) : null}
          </motion.div>
          <div className="hidden min-h-[22rem] lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

const EmailSequencesPreview = ({
  section,
}: {
  section: RedesignConceptsProps["emailSequences"];
}) => {
  if (!section) return null;

  const label = section.title ?? section.subtitle;

  return (
    <section className="bg-[#F9F9F7] py-16 sm:py-20 lg:py-24">
      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(18rem,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={sharedTransition}
            className="relative"
          >
            <div className="absolute inset-8 rounded-[2rem] bg-navy/5 blur-3xl" />
            {section.image ? (
              <div className="relative overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white p-2 shadow-[0_14px_34px_rgba(10,31,68,0.08)] transition duration-300 hover:-translate-y-1">
                <Image
                  src={section.image.url}
                  alt={section.image.alt}
                  width={520}
                  height={640}
                  className="h-auto w-full rounded-[1.35rem]"
                />
              </div>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ ...sharedTransition, delay: 0.08 }}
            className="max-w-3xl"
          >
            {label ? <p className={serviceTitleClass}>{label}</p> : null}
            {section.richText ? (
              <div className={serviceBodyClass}>
                {documentToReactComponents(
                  section.richText,
                  emailSequencesRichTextOptions
                )}
              </div>
            ) : null}
            {section.cta?.href && section.cta?.label ? (
              <div className="mt-8">
                <div className="sm:hidden">
                  <PrimaryCtaLink
                    href="/en/email-sequences"
                    label={section.cta.label}
                  />
                </div>
                <div className="hidden sm:block">
                  <PrimaryCtaLink
                    href={section.cta.href}
                    label={section.cta.label}
                  />
                </div>
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TransitionPreview = ({
  section,
}: {
  section: RedesignConceptsProps["transition"];
}) => {
  if (!section) return null;

  return (
    <section className="bg-dark py-16 text-white sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-5xl">
            {"Sarah isn't imaginary."}
          </h2>
          <div className="mx-auto mt-7 max-w-3xl space-y-5 text-lg leading-9 text-white/72">
            <p>
              Someone like her clicks on your ads and visits your website every
              day.
            </p>
            <p>{"Don't lose her because of a copy."}</p>
          </div>
          {section.cta?.href ? (
            <div className="mt-8">
              <PrimaryCtaLink
                href={section.cta.href}
                label="Book a discovery call"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

const WhatToExpectPreview = ({
  section,
}: {
  section: RedesignConceptsProps["whatToExpect"];
}) => {
  if (!section) return null;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={sharedTransition}
            className="max-w-3xl"
          >
            <div className="space-y-28">
              {section.title ? (
                <h2 className="text-xl font-black uppercase text-black [-webkit-text-stroke:0.35px_currentColor]">
                  WHAT YOU CAN EXPECT TEST
                </h2>
              ) : null}
              <div className="text-lg leading-9 text-black/68">
                {section.subtitle ? (
                  <p className="mb-12 font-bold">{section.subtitle}</p>
                ) : null}
                {section.richText
                  ? documentToReactComponents(
                      section.richText,
                      whatToExpectRichTextOptions
                    )
                  : null}
              </div>
            </div>
            {section.cta?.href && section.cta?.label ? (
              <div className="mt-8">
                <PrimaryCtaLink
                  href={section.cta.href}
                  label={section.cta.label}
                />
              </div>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ ...sharedTransition, delay: 0.08 }}
            className="mx-auto w-full max-w-[28rem] lg:mx-0 lg:pt-14"
          >
            {section.image ? (
              <div className="overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white p-2 shadow-[0_14px_34px_rgba(10,31,68,0.08)]">
                <Image
                  src={section.image.url}
                  alt={section.image.alt}
                  width={520}
                  height={640}
                  className="h-auto w-full rounded-[1.35rem]"
                />
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SocialProofPreview = ({
  socialProof,
}: {
  socialProof: RedesignConceptsProps["socialProof"];
}) => {
  const sliderRef = useRef<Slider>(null);

  if (!socialProof?.images.length) return null;

  const sliderSettings = {
    accessibility: true,
    arrows: false,
    autoplay: false,
    dots: false,
    infinite: true,
    speed: 350,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-[#F9F9F7] py-16 sm:py-20">
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
        <div className="mt-10 overflow-hidden">
          <Slider ref={sliderRef} {...sliderSettings}>
            {socialProof.images.map((image) => (
              <div key={image.url} className="px-2 pb-5">
                <div className="overflow-hidden rounded-[1.25rem] bg-white p-2 shadow-[0_16px_44px_rgba(10,31,68,0.08)] ring-1 ring-navy/10">
                  <div className="sm:hidden">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={image.width ?? 360}
                      height={image.height ?? 720}
                      className="h-auto w-full rounded-[1rem]"
                    />
                  </div>
                  <div className="hidden sm:block">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={360}
                      height={720}
                      className="h-auto w-full rounded-[1rem]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => sliderRef.current?.slickPrev()}
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-navy/20 bg-white text-navy outline-offset-4 transition hover:border-navy/40 hover:bg-navy/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy sm:inline-flex"
            aria-label="Previous testimonial"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => sliderRef.current?.slickPrev()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy bg-white text-navy outline-offset-4 transition hover:-translate-y-0.5 hover:bg-navy/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy max-sm:hover:translate-y-0 sm:hidden"
            aria-label="Previous testimonial"
          >
            <span
              className="inline-block rotate-180 font-bold text-navy"
              aria-hidden="true"
            >
              →
            </span>
          </button>
          <button
            type="button"
            onClick={() => sliderRef.current?.slickNext()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy bg-white text-navy outline-offset-4 transition hover:-translate-y-0.5 hover:bg-navy/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy max-sm:hover:translate-y-0"
            aria-label="Next testimonial"
          >
            <span className="font-bold text-navy" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export const FinalCtaPreview = ({
  section,
}: {
  section: RedesignConceptsProps["finalCta"];
}) => {
  if (!section) return null;

  return (
    <section className="bg-dark py-16 text-white sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          {section.headline ? (
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-5xl">
              {section.headline}
            </h2>
          ) : null}
          {section.description ? (
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-white/72">
              {section.description}
            </p>
          ) : null}
          {section.cta?.href && section.cta?.label ? (
            <div className="mt-6">
              <PrimaryCtaLink
                href={section.cta.href}
                label={section.cta.label}
              />
            </div>
          ) : null}
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
  meetSarah,
  landingPages,
  emailSequences,
  transition,
  whatToExpect,
  socialProof,
  finalCta,
}: RedesignConceptsProps) => {
  return (
    <RedesignPreviewLayout>
      <Metadata
        title={seoTitle ?? "Slaviša Bogdanović"}
        description={seoDescription ?? ""}
        path="redesign-concepts"
      />
      <QuietAuthorityHero hero={hero} primaryCta={primaryCta} />
      <MeetSarahPreview section={meetSarah} />
      <LandingPagesPreview section={landingPages} />
      <EmailSequencesPreview section={emailSequences} />
      <TransitionPreview section={transition} />
      <WhatToExpectPreview section={whatToExpect} />
      <SocialProofPreview socialProof={socialProof} />
      <FinalCtaPreview section={finalCta} />
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
  const zSections = sections.filter(
    (section: any) => section?.sys?.contentType?.sys?.id === "zSection"
  );
  const landingPagesSection = zSections.find((section: any) =>
    sectionIncludes(section, "landing")
  );
  const emailSequencesSection = zSections.find((section: any) =>
    sectionIncludes(section, "email sequences")
  );
  const whatToExpectSection = zSections.find((section: any) =>
    sectionIncludes(section, "what you can expect")
  );
  const meetSarahSection =
    zSections.find((section: any) => sectionIncludes(section, "sarah")) ??
    zSections.find(
      (section: any) =>
        sectionIncludes(section, "video ads") &&
        section?.sys?.id !== landingPagesSection?.sys?.id &&
        section?.sys?.id !== emailSequencesSection?.sys?.id &&
        section?.sys?.id !== whatToExpectSection?.sys?.id
    ) ??
    zSections.find(
      (section: any) =>
        section?.sys?.id !== landingPagesSection?.sys?.id &&
        section?.sys?.id !== emailSequencesSection?.sys?.id &&
        section?.sys?.id !== whatToExpectSection?.sys?.id
    );
  const consultationBanners = sections.filter(
    (section: any) =>
      section?.sys?.contentType?.sys?.id === "freeConsultationBanner"
  );
  const transitionBanner =
    consultationBanners.find((section: any) =>
      sectionIncludes(section, "imaginary")
    ) ?? consultationBanners[0];
  const finalCtaBanner =
    [...consultationBanners]
      .reverse()
      .find((section: any) => section?.sys?.id !== transitionBanner?.sys?.id) ??
    null;
  const heroFields = heroSection?.fields ?? {};
  const heroContentType = heroSection?.sys?.contentType?.sys?.id;
  const meetSarahFields = meetSarahSection?.fields ?? {};
  const landingPagesFields = landingPagesSection?.fields ?? {};
  const emailSequencesFields = emailSequencesSection?.fields ?? {};
  const whatToExpectFields = whatToExpectSection?.fields ?? {};

  const sliderFields = photoSlider?.fields ?? {};
  const consultationCta = transitionBanner?.fields?.cta?.fields;
  const finalCta = finalCtaBanner?.fields?.cta?.fields;

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
      meetSarah: meetSarahSection
        ? {
            title: meetSarahFields.title ?? null,
            subtitle: meetSarahFields.subtitle ?? null,
            richText: meetSarahFields.richText ?? null,
            image: getImageContentAsset(meetSarahFields.image),
            cta: meetSarahFields.cta?.fields
              ? {
                  label: meetSarahFields.cta.fields.text ?? null,
                  href: meetSarahFields.cta.fields.url ?? null,
                }
              : null,
          }
        : null,
      landingPages: landingPagesSection
        ? {
            title: landingPagesFields.title ?? null,
            subtitle: landingPagesFields.subtitle ?? null,
            richText: landingPagesFields.richText ?? null,
            cta: landingPagesFields.cta?.fields
              ? {
                  label: landingPagesFields.cta.fields.text ?? null,
                  href: landingPagesFields.cta.fields.url ?? null,
                }
              : null,
          }
        : null,
      emailSequences: emailSequencesSection
        ? {
            title: emailSequencesFields.title ?? null,
            subtitle: emailSequencesFields.subtitle ?? null,
            richText: emailSequencesFields.richText ?? null,
            image: getImageContentAsset(emailSequencesFields.image),
            cta: emailSequencesFields.cta?.fields
              ? {
                  label: emailSequencesFields.cta.fields.text ?? null,
                  href: emailSequencesFields.cta.fields.url ?? null,
                }
              : null,
          }
        : null,
      transition: transitionBanner
        ? {
            headline: transitionBanner.fields?.text ?? null,
            description: transitionBanner.fields?.description ?? null,
            cta: consultationCta
              ? {
                  label: consultationCta.text ?? null,
                  href: consultationCta.url ?? null,
                }
              : null,
          }
        : null,
      whatToExpect: whatToExpectSection
        ? {
            title: whatToExpectFields.title ?? null,
            subtitle: whatToExpectFields.subtitle ?? null,
            richText: whatToExpectFields.richText ?? null,
            image: getImageContentAsset(whatToExpectFields.image),
            cta: whatToExpectFields.cta?.fields
              ? {
                  label: whatToExpectFields.cta.fields.text ?? null,
                  href: whatToExpectFields.cta.fields.url ?? null,
                }
              : null,
          }
        : null,
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
      finalCta: finalCtaBanner
        ? {
            headline: finalCtaBanner.fields?.text ?? null,
            description: finalCtaBanner.fields?.description ?? null,
            cta: finalCta
              ? {
                  label: finalCta.text ?? null,
                  href: finalCta.url ?? null,
                }
              : null,
          }
        : null,
    },
  };
};
