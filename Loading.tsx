'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { OrmenLogoMinimal } from './OrmenLogo';

interface LoadingProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  showLogo?: boolean;
  overlay?: boolean;
}

export function Loading({ 
  fullScreen = false, 
  size = 'md', 
  text, 
  showLogo = false,
  overlay = false 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center z-50' 
    : 'flex items-center justify-center p-4';

  const backgroundClasses = overlay
    ? 'bg-black/20 backdrop-blur-sm'
    : fullScreen
    ? 'bg-gradient-to-br from-gray-50 to-gray-100'
    : '';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`${containerClasses} ${backgroundClasses}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center space-y-4"
        >
          {/* Logo */}
          {showLogo && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <OrmenLogoMinimal variant="dark" />
            </motion.div>
          )}

          {/* Loading Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: showLogo ? 0.2 : 0 }}
            className="relative"
          >
            {/* Primary Spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className={`${sizeClasses[size]} text-amber-600`}
            >
              <Loader2 className="w-full h-full" />
            </motion.div>

            {/* Decorative Sparkles */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sparkles className={`${sizeClasses[size]} text-amber-400 opacity-60`} />
            </motion.div>
          </motion.div>

          {/* Loading Text */}
          {text && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: showLogo ? 0.3 : 0.1 }}
              className="text-sm text-gray-600 font-light"
            >
              {text}
            </motion.p>
          )}

          {/* Progress Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: showLogo ? 0.4 : 0.2 }}
            className="flex space-x-1"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-2 h-2 bg-amber-500 rounded-full"
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Skeleton Loading Components
export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
      <div className="space-y-2">
        <div className="bg-gray-200 rounded h-4 w-3/4"></div>
        <div className="bg-gray-200 rounded h-3 w-1/2"></div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`bg-gray-200 rounded h-3 ${
            i === lines - 1 ? 'w-2/3' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  );
}

export function SkeletonImage({ className = 'w-full h-48' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`}>
      <div className="flex items-center justify-center h-full">
        <svg 
          className="w-12 h-12 text-gray-400" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
    </div>
  );
}

// Page Loading Component
export function PageLoading() {
  return (
    <Loading 
      fullScreen 
      size="lg" 
      text="Sayfa yükleniyor..." 
      showLogo 
    />
  );
}

// Section Loading Component  
export function SectionLoading({ text = "Yükleniyor..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <Loading size="md" text={text} />
    </div>
  );
}

// Button Loading State
export function ButtonLoading({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}
    >
      <Loader2 className="w-full h-full" />
    </motion.div>
  );
}
