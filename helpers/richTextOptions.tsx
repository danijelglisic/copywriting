import React from "react";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { Options } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

/**
 * Opcije za Contentful rich text.
 *
 * Bez ovoga se `documentToReactComponents` poziva bez ijedne opcije, pa vraca
 * gole <p> i <ul> elemente. Tailwind preflight skida margine pasusima i tacke
 * listama, tako da je sve ispadalo kao jedan blok teksta bez nabrajanja —
 * upravo ono sto je klijent prijavio na Contact i Video Ads stranama.
 *
 * Sadrzaj u CMS-u je bio ispravan: en/contact ima `unordered-list` i
 * `list-item` cvorove. Falilo je samo renderovanje.
 */
export const richTextOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong className="font-bold">{text}</strong>,
    [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
    [MARKS.UNDERLINE]: (text) => <u className="underline">{text}</u>,
    [MARKS.CODE]: (text) => (
      <code className="rounded bg-black/10 px-1.5 py-0.5 font-mono text-[0.9em]">
        {text}
      </code>
    ),
  },
  renderNode: {
    // Prazan pasus u Contentfulu je namerni razmak izmedju blokova teksta.
    // Bez min-height bi se skupio na nulu.
    [BLOCKS.PARAGRAPH]: (_node, children) => {
      const isEmpty =
        Array.isArray(children) &&
        children.every((c) => typeof c === "string" && c.trim() === "");

      if (isEmpty) return <p className="h-4" aria-hidden="true" />;

      return <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>;
    },

    [BLOCKS.HEADING_1]: (_n, c) => <h2 className="heading-4 mb-4 mt-8">{c}</h2>,
    [BLOCKS.HEADING_2]: (_n, c) => <h2 className="heading-5 mb-4 mt-8">{c}</h2>,
    [BLOCKS.HEADING_3]: (_n, c) => <h3 className="subtitle-1 mb-3 mt-6">{c}</h3>,
    [BLOCKS.HEADING_4]: (_n, c) => <h4 className="subtitle-2 mb-3 mt-6">{c}</h4>,

    [BLOCKS.UL_LIST]: (_n, c) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 last:mb-0 marker:text-secondary">
        {c}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_n, c) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 last:mb-0 marker:text-secondary">
        {c}
      </ol>
    ),
    // Contentful svaku stavku liste pakuje u <p>. Bez ovoga bi svaka stavka
    // dobila donju marginu iz PARAGRAPH pravila i lista bi se raskuvala.
    [BLOCKS.LIST_ITEM]: (_n, c) => (
      <li className="[&>p]:mb-0 [&>p]:leading-relaxed">{c}</li>
    ),

    [BLOCKS.QUOTE]: (_n, c) => (
      <blockquote className="mb-4 border-l-4 border-secondary pl-4 italic last:mb-0">
        {c}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-current opacity-20" />,

    [INLINES.HYPERLINK]: (node, children) => {
      const uri = (node.data as any)?.uri as string;
      const isExternal = /^https?:\/\//i.test(uri || "");

      if (isExternal) {
        return (
          <a
            href={uri}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-80"
          >
            {children}
          </a>
        );
      }

      return (
        <Link href={uri || "#"} className="underline underline-offset-2 hover:opacity-80">
          {children}
        </Link>
      );
    },
  },
};
