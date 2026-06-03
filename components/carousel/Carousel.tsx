import { IPhotoSlider } from "@/@types/generated/contentful";
import React, { useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { FadeUp } from "@/components/ui/FadeUp";


interface CarouselProps {
  props: IPhotoSlider;
}

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  arrows: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 2,
  initialSlide: 0,
  nextArrow: <div className="none-imp"></div>,
  prevArrow: <div className="none-imp"></div>,
  dotsClass: "none-imp",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

const Carousel = ({ props }: CarouselProps) => {
  const sliderRef = useRef<Slider>(null);
  const fields = props.fields as any; // Temporary fix for type issue
  const title = fields?.title;
  const description = fields?.description;
  const images = fields?.images;

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="py-20 text-dark">
      <div className="container">
        <div className="text-center space-y-8 mb-10">
          <h2 className="heading-4">{title && <AnimatedText text={title} />}</h2>
          <FadeUp delay={0.2}><p className="body-1">{description}</p></FadeUp>
        </div>
        <div className="flex flex-col">
          <Slider {...settings} ref={sliderRef}>
            {images?.map((image: any, id: number) => (
              <div key={id} className="p-2 grid items-center">
                {image.fields.image?.fields.file.url && (
                  <Image
                    src={"https:" + image.fields.image.fields.file.url}
                    alt={image.fields.imageDescription || ""}
                    width={300}
                    height={600}
                  />
                )}
              </div>
            ))}
          </Slider>
          <div className="flex items-center justify-center gap-4">
            <button
              className="rotate-180 bg-secondary p-2 left-0"
              onClick={handlePrevClick}
            >
              <Image src="/svg/arrow.svg" alt="slick prev" width={20} height={20} />
            </button>
            <button
              className="bg-secondary p-2 right-0"
              onClick={handleNextClick}
            >
              <Image src="/svg/arrow.svg" alt="slick next" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
