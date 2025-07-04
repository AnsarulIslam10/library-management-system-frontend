import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      content: "Carousel 2 - Slide 1 Content",
      imgSrc: "https://i.ibb.co/wZXXGhvb/thought-catalog-qk-CTQFXid-V8-unsplash-1.jpg",
    },
    {
      id: 2,
      content: "Carousel 2 - Slide 2 Content",
      imgSrc: "https://i.ibb.co/k25FxYK9/thought-catalog-B1d-QCWz0-U2w-unsplash-1.jpg",
    },
    {
      id: 3,
      content: "Carousel 2 - Slide 3 Content",
      imgSrc: "https://i.ibb.co/7N0wCZft/orv-1.png",
    },
    {
      id: 4,
      content: "Carousel 2 - Slide 3 Content",
      imgSrc: "https://i.ibb.co/5JCdhbS/got-1.jpg",
    },
  ];

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(autoSlide);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative flex items-center justify-center h-[30vh] sm:h-[60vh] md:h-[70vh] w-full overflow-hidden">
      <ArrowLeft
        className="absolute left-5 text-secondary text-[1.8rem] cursor-pointer z-10"
        onClick={prevSlide}
      />
      <img
        src={slides[currentSlide].imgSrc}
        alt={slides[currentSlide].content}
        className="w-full h-full object-cover"
      />
      <ArrowRight
        className="absolute right-5 text-secondary text-[1.8rem] cursor-pointer z-10"
        onClick={nextSlide}
      />
    </div>
  );
};

export default Carousel;
