import React from "react";
import { IRichTextSection } from "@/@types/generated/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextOptions } from "@/helpers/richTextOptions";

interface RichTextSectionProps {
  props: IRichTextSection;
}

const RichTextSection = ({ props }: RichTextSectionProps) => {
  const fields = props.fields as any; // Temporary fix for type issue
  const { title, content } = fields;

  return (
    <div className="text-dark py-20">
      <div className="container">
        {/* Naslov stoji u istoj koloni kao i tekst i poravnat je levo.
            Ranije je bio centriran, pa je sekcija sa naslovom iz polja `title`
            izgledala drugacije od sekcije gde je naslov otkucan unutar teksta
            kao Heading — isti sadrzaj, dva razlicita izgleda. Sve je sada levo;
            centriran ostaje samo CTA baner. */}
        <div className="mx-auto w-full max-w-3xl body-2">
          {title && (
            // h2, ne h1: primarni naslov strane dolazi iz hero sekcije. Ranije
            // su strane imale i po tri h1.
            <h2 className="heading-4 mb-8 text-secondary">{title}</h2>
          )}
          {content && documentToReactComponents(content, richTextOptions)}
        </div>
      </div>
    </div>
  );
};

export default RichTextSection;
