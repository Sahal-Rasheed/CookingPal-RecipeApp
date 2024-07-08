import { useState } from "react";
import { ArrowLeft, ArrowRight, Dot } from "lucide-react";

const Hero = () => {
  const sliders = [
    {
      url: "https://res.cloudinary.com/ehizeex-shop/image/upload/v1672672076/NetflixApp/burger_emxbtv.jpg",
    },
    {
      url: "https://res.cloudinary.com/ehizeex-shop/image/upload/v1672672452/NetflixApp/pizza_osjb4f.jpg",
    },
    {
      url: "https://res.cloudinary.com/ehizeex-shop/image/upload/v1672672612/NetflixApp/ric_a4ewxo.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? sliders.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === sliders.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="h-[450px] w-full px-20 py-5 relative">
      <div
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500 relative overflow-hidden"
        style={{ backgroundImage: `url(${sliders[currentIndex].url})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="absolute top-1/2 left-0 w-full text-start px-32 transform -translate-y-1/2">
        <h4 className="text-xl font-medium text-orange-600 tracking-wide mb-3">
          Trending now
        </h4>
        <h2 className="text-4xl font-bold  text-white tracking-wide	mb-3 text-wrap w-full md:w-[25%]">
          Mikes famous salad with cheese
        </h2>
        <h6 className="text-lg font-medium text-slate-200 tracking-wide	">
          By Jhon Mike
        </h6>
      </div>
      <div className="absolute bottom-14 left-0 w-full flex justify-center items-center space-x-6">
        <div className="text-white border border-white rounded-full p-1">
          <ArrowLeft className="cursor-pointer" onClick={prevSlide} />
        </div>
        <div className="text-white border border-white rounded-full p-1">
          <ArrowRight className="cursor-pointer" onClick={nextSlide} />
        </div>
      </div>
      <div className="absolute bottom-6 left-0 w-full flex justify-center items-center">
        {sliders.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            className={`cursor-pointer ${
              currentIndex === slideIndex ? "text-orange-600" : "text-white"
            }`}
            onClick={() => setCurrentIndex(slideIndex)}
          >
            <Dot />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
