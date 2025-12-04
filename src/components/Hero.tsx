import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useHeroBanner } from '../hooks/useHeroBanner';
import { HeroBannerFeature } from '../types';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { heroBanner, loading, error } = useHeroBanner();

  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  // Auto-advance carousel - must be called every render
  useEffect(() => {
    if (!heroBanner || !heroBanner.enabled || !heroBanner.features || heroBanner.features.length === 0) {
      return;
    }

    const featuresLength = heroBanner.features.length;
    const intervalMs = heroBanner.autoAdvanceInterval;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuresLength);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [heroBanner]);

  const renderIcon = (feature: HeroBannerFeature) => {
    const iconClass = "w-16 h-16";
    
    switch (feature.iconType) {
      case 'clock':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'star':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'heart':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'custom':
        return feature.customIcon ? (
          <img src={feature.customIcon} alt={feature.title} className={iconClass} />
        ) : null;
      default:
        return null;
    }
  };

  // Show loading state briefly, then render or hide
  if (loading) {
    // Return null during initial load to prevent flash
    return null;
  }

  // Don't render if disabled, no features, or invalid data
  if (!heroBanner || !heroBanner.enabled || !heroBanner.features || !heroBanner.features.length) {
    return null;
  }

  const features = heroBanner.features;

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  return (
    <section className="bg-baker-beige py-12 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {features.map((feature, index) => (
              <div 
                key={feature.id} 
                className={`min-w-full rounded-lg p-8 md:p-12 text-center relative overflow-hidden ${
                  feature.image ? '' : 'bg-baker-beige-light'
                }`}
                style={feature.image ? {
                  backgroundImage: `url(${feature.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                } : {}}
              >
                {/* Overlay for text readability when image is present */}
                {feature.image && (
                  <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
                )}
                
                {/* Content with relative positioning to appear above overlay */}
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className={feature.image ? "text-white" : "text-baker-brown-dark"}>
                      {renderIcon(feature)}
                    </div>
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-bold mb-4 font-fredoka ${
                    feature.image ? 'text-white' : 'text-baker-brown-dark'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-nunito ${
                    feature.image ? 'text-white' : 'text-baker-brown'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-baker-beige-light/90 hover:bg-baker-beige-light text-baker-brown-dark p-2 rounded-full shadow-lg transition-all duration-200 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-baker-beige-light/90 hover:bg-baker-beige-light text-baker-brown-dark p-2 rounded-full shadow-lg transition-all duration-200 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index
                  ? 'w-8 h-2 bg-baker-brown-dark'
                  : 'w-2 h-2 bg-baker-brown-dark/30 hover:bg-baker-brown-dark/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;