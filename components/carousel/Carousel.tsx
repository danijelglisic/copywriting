import { IPhotoSlider } from "@/@types/generated/contentful";
import React, { useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import arrow from "../../assets/svg/arrow.svg";

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
  const { title, description, images } = props.fields;

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
    <div className="py-20 text-secondary">
      <div className="container">
        <div className="text-center space-y-8">
          <h2 className="heading-4">{title}</h2>
          <p className="body-1">{description}</p>
        </div>
        <div className="flex flex-col">
          <Slider {...settings} ref={sliderRef}>
            {images?.map((image, id) => (
              <div key={id} className="p-2 rounded grid items-center">
                <Image
                  src={"https:" + image.fields.image?.fields.file.url}
                  alt={image.fields.imageDescription || ""}
                  width={300}
                  height={600}
                />
              </div>
            ))}
          </Slider>
          <div className="flex items-center justify-center gap-4">
            <button
              className="rotate-180 rounded-full bg-secondary p-2 left-0"
              onClick={handlePrevClick}
            >
              <Image src={arrow} alt="slick prev" width={20} height={20} />
            </button>
            <button
              className="rounded-full bg-secondary p-2 right-0"
              onClick={handleNextClick}
            >
              <Image src={arrow} alt="slick next" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
