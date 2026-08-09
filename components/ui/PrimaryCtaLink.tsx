import Link from "next/link";

const primaryButtonClass =
  "rounded-full bg-navy px-7 py-[0.8125rem] text-center text-sm font-semibold text-white shadow-[0_18px_38px_rgba(10,31,68,0.16)] outline-offset-4 ring-1 ring-navy/10 transition duration-300 hover:-translate-y-0.5 hover:bg-black active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black";

const PrimaryCtaLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} legacyBehavior>
    <a className={primaryButtonClass}>{label}</a>
  </Link>
);

export default PrimaryCtaLink;
