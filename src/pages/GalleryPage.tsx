import { useState, useEffect } from 'react';
import galleryData from '../data/galleryData';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Get unique categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'floating-studio', name: 'Floating Studio' },
    { id: 'french-studio', name: 'French Studio' },
    { id: 'french-heritage-villa', name: 'French Heritage Villa' },
    { id: 'ban-din-deluxe', name: 'Ban Din Deluxe' },
    { id: 'ban-din-studio', name: 'Ban Din Studio' },
    { id: 'ban-lao-classic', name: 'Ban Lao Classic' },
    { id: 'facilities', name: 'Hotel Facilities' }
  ];
  
  const filteredImages = activeCategory === 'all' 
    ? galleryData 
    : galleryData.filter(image => image.category === activeCategory);
  
  // Disable scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);
  
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Our Gallery</h1>
            <p className="max-w-2xl mx-auto text-lg">
              Explore our spaces through stunning imagery that captures the essence of luxury and tranquility.
            </p>
          </div>
        </div>
      </div>
      
      {/* Category Filters */}
      <div className="bg-beige py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeCategory === category.id
                    ? 'bg-gold text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              layout
            >
              {filteredImages.map(image => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-all"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <img 
                    src={image.src} 
                    alt={image.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      
      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white p-2 hover:text-gold"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-h-[90vh] max-w-[90vw] object-contain"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;