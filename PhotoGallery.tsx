'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PhotoGalleryProps {
  images: string[];
  alts: string[];
  className?: string;
  direction?: 'left' | 'right'; // left = show right arrow only, right = show left arrow only
}

export function PhotoGallery({ images, alts, className = "", direction = 'right' }: PhotoGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className={`relative h-full group ${className}`}>
      {/* Main Image */}
      <div className="relative h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="relative h-full"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <ImageWithFallback
              src={images[currentImageIndex]}
              alt={alts[currentImageIndex]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </AnimatePresence>

        {/* Single Navigation Arrow - only inward facing */}
        {images.length > 1 && (
          <>
            {direction === 'left' && (
              <motion.button
                onClick={nextImage}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl"
                whileHover={{ scale: 1.15, x: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ x: 20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            )}

            {direction === 'right' && (
              <motion.button
                onClick={prevImage}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl"
                whileHover={{ scale: 1.15, x: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
            )}
          </>
        )}

        {/* Enhanced Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToImage(index)}
                className={`transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'w-8 h-3 bg-white rounded-full' 
                    : 'w-3 h-3 bg-white/50 hover:bg-white/80 rounded-full'
                }`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                layoutId={`dot-${index}`}
              />
            ))}
          </div>
        )}

        {/* Enhanced Image Counter */}
        {images.length > 1 && (
          <motion.div
            className="absolute top-6 right-6 bg-black/40 text-white px-4 py-2 rounded-full text-sm backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 font-light tracking-wide"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentImageIndex + 1} / {images.length}
          </motion.div>
        )}
      </div>
    </div>
  );
}
