import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useHomepageStore } from '../../store/homepageStore';

interface HeroSectionProps {
  toggleBookingWidget: () => void;
}

const HeroSection = ({ toggleBookingWidget }: HeroSectionProps) => {
  const { heroSlides } = useHomepageStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (heroSlides.length === 0) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Reset current slide if it's out of bounds
  useEffect(() => {
    if (currentSlide >= heroSlides.length && heroSlides.length > 0) {
      setCurrentSlide(0);
    }
  }, [heroSlides.length, currentSlide]);

  if (heroSlides.length === 0) {
    return (
      <div className="relative w-full h-screen-90 bg-navy flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
            Welcome to SaLaDonKon
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Your luxury experience awaits
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen-90 overflow-hidden">
      {/* Slide Images */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center z-10">
          <h1 
            className="text-4xl md:text-6xl font-playfair font-bold mb-4 transition-all duration-700 transform translate-y-0 opacity-100"
            style={{ color: heroSlides[currentSlide]?.titleColor || '#FFFFFF' }}
          >
            {heroSlides[currentSlide]?.title}
          </h1>
          <p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            style={{ color: heroSlides[currentSlide]?.subtitleColor || '#FFFFFF' }}
          >
            {heroSlides[currentSlide]?.subtitle}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      {heroSlides.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all z-20"
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all z-20"
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots */}
      {heroSlides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-gold w-6' : 'bg-white bg-opacity-50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSection;