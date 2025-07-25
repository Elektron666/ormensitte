'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { OrmenLogoMinimal } from './OrmenLogo';

interface HeroSectionProps {
  language: 'tr' | 'en';
}

export function HeroSectionCustom({ language }: HeroSectionProps) {
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
      {/* KENDİ VİDEONUZ - /public/videos/ klasörüne koyun */}
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
            poster="/images/hero/hero-poster.jpg" // Kendi poster görseliniz
          >
            {/* KENDİ VİDEO DOSYANIZ */}
            <source 
              src="/videos/ormen-hero-video.mp4"  // ← Buraya kendi videonuzu koyun
              type="video/mp4" 
            />
            {/* Fallback video (opsiyonel) */}
            <source 
              src="/videos/ormen-hero-video.webm"  // ← WebM versiyonu (opsiyonel)
              type="video/webm" 
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Fallback - Kendi görselleriniz */}
      {showFallback && (
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative w-full h-full"
          >
            {/* Ana arka plan görseliniz */}
            <ImageWithFallback
              src="/images/hero/hero-background.jpg" // ← Kendi görseliniz
              alt="Ormen Tekstil kumaş koleksiyonu"
              className="w-full h-full object-cover"
            />
            
            {/* İkinci katman (parallax efekti için) */}
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
                backgroundImage: `url("/images/hero/hero-overlay.jpg")`, // ← Kendi overlay görseliniz
                backgroundSize: '120% 120%',
                opacity: 0.3,
                backgroundRepeat: 'no-repeat'
              }}
            />
          </motion.div>
        </div>
      )}

      {/* Rest of hero content... */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      
      {/* Center Logo Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {/* Logo ve içerik... */}
      </div>
    </section>
  );
}
