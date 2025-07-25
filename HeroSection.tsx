'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { OrmenLogoMinimal } from './OrmenLogo';

interface HeroSectionProps {
  language: 'tr' | 'en';
}

export function HeroSection({ language }: HeroSectionProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setShowFallback(true);
  };

  // Timeout for video loading - if video doesn't load in 8 seconds, show fallback
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isVideoLoaded) {
        setShowFallback(true);
      }
    }, 8000);

    return () => clearTimeout(timeout);
  }, [isVideoLoaded]);

  return (
    <section className="h-screen relative overflow-hidden">
      {/* Video Background */}
      {!showFallback && (
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            poster="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=90"
          >
            <source 
              src="https://videos.pexels.com/video-files/6580030/6580030-uhd_2732_1440_25fps.mp4"
              type="video/mp4" 
            />
            {/* Fallback for browsers that don't support the video */}
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Fallback Background - Elegant Fabric Imagery */}
      {showFallback && (
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative w-full h-full"
          >
            {/* Primary fabric background */}
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=90"
              alt="Ormen Tekstil kumaş koleksiyonu"
              className="w-full h-full object-cover"
            />
            
            {/* Subtle parallax overlay for depth */}
            <motion.div 
              className="absolute inset-0"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: "linear"
              }}
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=90")`,
                backgroundSize: '120% 120%',
                opacity: 0.3,
                backgroundRepeat: 'no-repeat'
              }}
            />

            {/* Sophisticated overlay with fabric texture */}
            <motion.div 
              className="absolute inset-0"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1604147495798-57beb5bf6991?w=1920&q=90")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                mixBlendMode: 'multiply'
              }}
            />
          </motion.div>
        </div>
      )}

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

      {/* Animated fabric particles overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full relative overflow-hidden">
          {/* Floating fabric particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -120, 0],
                opacity: [0, 0.8, 0],
                scale: [0.3, 1.2, 0.3],
              }}
              transition={{
                duration: 8 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Elegant fabric wave animation */}
          <motion.div
            className="absolute inset-0"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.08), rgba(255,255,255,0.05), transparent)',
              transform: 'skewX(-12deg)',
            }}
          />

          {/* Secondary wave for depth */}
          <motion.div
            className="absolute inset-0"
            animate={{
              x: ['200%', '-100%'],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
              transform: 'skewX(8deg)',
            }}
          />
        </div>
      </div>

      {/* Center Logo Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          className="text-center flex flex-col items-center justify-center w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.5 }}
        >
          {/* Main Logo - Perfectly Centered */}
          <motion.div
            className="mb-8 flex items-center justify-center"
            initial={{ opacity: 0, y: 20, scale: 1.2 }}
            animate={{ opacity: 1, y: 0, scale: 1.5 }}
            transition={{ duration: 2.5, delay: 1 }}
          >
            <OrmenLogoMinimal variant="light" />
          </motion.div>
          
          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 128, opacity: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
          />
          
          <motion.p
            className="text-white/90 text-sm lg:text-base tracking-[0.25em] font-light mb-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 2.2 }}
          >
            {language === 'tr' ? 'KALİTE • GÜVEN • ZARAFET' : 'QUALITY • TRUST • ELEGANCE'}
          </motion.p>
          
          <motion.div
            className="text-white/70 text-xs lg:text-sm font-light tracking-wide mb-8 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 2.8 }}
          >
            <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              {language === 'tr' 
                ? "1999'dan bu yana tekstil sektörünün güvenilir adresi"
                : "Trusted address of textile industry since 1999"
              }
            </span>
          </motion.div>
          
          <motion.div
            className="text-white/60 text-xs font-light tracking-wide max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 3.2 }}
          >
            <div className="flex flex-wrap justify-center gap-2">
              {(language === 'tr' ? [
                'Mimarlar',
                'İç Mimarlık', 
                'Otel Projeleri',
                'Restoran & Kafe',
                'Kurumsal Projeler',
                'Parekende Satış',
                'Toptan Satış'
              ] : [
                'Architects',
                'Interior Design', 
                'Hotel Projects',
                'Restaurant & Cafe',
                'Corporate Projects',
                'Retail Sales',
                'Wholesale'
              ]).map((item, index) => (
                <motion.span
                  key={item}
                  className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 3.5 + index * 0.1 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 4 }}
      >
        <motion.div
          className="w-6 h-10 border border-white/40 rounded-full flex justify-center backdrop-blur-sm"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ 
              y: [0, 4, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.p 
          className="text-white/50 text-xs font-light tracking-wide mt-2 text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {language === 'tr' ? 'Keşfetmeye devam edin' : 'Continue exploring'}
        </motion.p>
      </motion.div>

      {/* Enhanced Video Loading State */}
      {(!isVideoLoaded && !showFallback) && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center z-20"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-white text-center flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Elegant loading spinner */}
            <motion.div 
              className="relative w-16 h-16 mx-auto mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 border-2 border-white/20 rounded-full"></div>
              <div className="absolute inset-0 border-2 border-transparent border-t-white rounded-full"></div>
              <div className="absolute inset-2 border border-white/30 rounded-full"></div>
            </motion.div>
            
            <motion.div 
              className="mb-4 flex justify-center"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <OrmenLogoMinimal variant="light" />
            </motion.div>
            
            <motion.p 
              className="text-sm font-light tracking-wide text-white/70"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {language === 'tr' ? 'Hazırlanıyor...' : 'Loading...'}
            </motion.p>
            
            {/* Progress dots */}
            <div className="flex justify-center mt-4 space-x-1">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-white/40 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
