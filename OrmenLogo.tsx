'use client';

import { motion } from 'framer-motion';

interface OrmenLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  animated?: boolean;
  className?: string;
}

export function OrmenLogo({ 
  size = 'md', 
  variant = 'dark', 
  showTagline = false, 
  animated = false,
  className = '' 
}: OrmenLogoProps) {
  const sizes = {
    sm: { width: 140, height: 45, textSize: 'text-lg', taglineSize: 'text-xs', iconSize: 36 },
    md: { width: 180, height: 60, textSize: 'text-xl', taglineSize: 'text-xs', iconSize: 48 },
    lg: { width: 220, height: 75, textSize: 'text-2xl', taglineSize: 'text-sm', iconSize: 60 },
    xl: { width: 300, height: 100, textSize: 'text-4xl', taglineSize: 'text-base', iconSize: 80 }
  };

  const colors = {
    light: {
      primary: '#ffffff',
      text: '#ffffff',
      shield: '#ffffff',
      accent: '#ffffff'
    },
    dark: {
      primary: '#1a1a1a',
      text: '#1a1a1a', 
      shield: '#1a1a1a',
      accent: '#1a1a1a'
    }
  };

  const currentSize = sizes[size];
  const currentColors = colors[variant];

  const logoVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const LogoComponent = animated ? motion.div : 'div';

  return (
    <LogoComponent
      className={`flex items-center space-x-4 ${className}`}
      {...(animated && { 
        variants: logoVariants,
        initial: "initial",
        animate: "animate"
      })}
    >
      {/* Shield Icon */}
      <div className="relative flex-shrink-0">
        <svg
          width={currentSize.iconSize}
          height={currentSize.iconSize}
          viewBox="0 0 100 100"
          className="overflow-visible"
        >
          {/* Shield outline */}
          <path
            d="M50 5 L85 20 L85 45 C85 65 70 80 50 95 C30 80 15 65 15 45 L15 20 Z"
            fill="none"
            stroke={currentColors.shield}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          
          {/* Top left section - Fabric weave pattern */}
          <g transform="translate(22, 22)">
            <path d="M0 0 L28 0 L28 28 L0 28 Z" fill="none" stroke={currentColors.primary} strokeWidth="1.5"/>
            <path d="M0 7 L28 7" stroke={currentColors.primary} strokeWidth="0.8"/>
            <path d="M0 14 L28 14" stroke={currentColors.primary} strokeWidth="0.8"/>
            <path d="M0 21 L28 21" stroke={currentColors.primary} strokeWidth="0.8"/>
            <path d="M7 0 L7 28" stroke={currentColors.primary} strokeWidth="0.8"/>
            <path d="M14 0 L14 28" stroke={currentColors.primary} strokeWidth="0.8"/>
            <path d="M21 0 L21 28" stroke={currentColors.primary} strokeWidth="0.8"/>
          </g>
          
          {/* Top right section - Textile symbol */}
          <g transform="translate(50, 22)">
            <path d="M0 0 L28 0 L28 28 L0 28 Z" fill="none" stroke={currentColors.primary} strokeWidth="1.5"/>
            <circle cx="14" cy="14" r="8" fill="none" stroke={currentColors.primary} strokeWidth="1.2"/>
            <path d="M14 6 L14 22" stroke={currentColors.primary} strokeWidth="1"/>
            <path d="M6 14 L22 14" stroke={currentColors.primary} strokeWidth="1"/>
          </g>
          
          {/* Bottom section - Quality diamond */}
          <g transform="translate(36, 50)">
            <path d="M0 0 L28 0 L28 28 L0 28 Z" fill="none" stroke={currentColors.primary} strokeWidth="1.5"/>
            <path d="M14 4 L22 14 L14 24 L6 14 Z" fill={currentColors.primary} fillOpacity="0.8"/>
            <path d="M14 4 L22 14 L14 24 L6 14 Z" fill="none" stroke={currentColors.primary} strokeWidth="1"/>
          </g>
          
          {/* Center dividing lines */}
          <path d="M22 50 L78 50" stroke={currentColors.primary} strokeWidth="1.5"/>
          <path d="M50 22 L50 50" stroke={currentColors.primary} strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <div className={`${currentSize.textSize} font-light tracking-[0.2em] leading-none`}>
          <span 
            className="font-normal"
            style={{ color: currentColors.text }}
          >
            ORMEN
          </span>
        </div>
        
        <div className={`${currentSize.textSize} font-extralight tracking-[0.25em] leading-none mt-1`}>
          <span 
            className="font-extralight"
            style={{ color: currentColors.text }}
          >
            TEKSTIL
          </span>
        </div>
        
        {showTagline && (
          <div 
            className={`${currentSize.taglineSize} font-light tracking-[0.3em] opacity-60 mt-2`}
            style={{ color: currentColors.text }}
          >
            QUALITY • TRUST • ELEGANCE
          </div>
        )}
      </div>
    </LogoComponent>
  );
}

// Compact version for mobile/small spaces
export function OrmenLogoCompact({ 
  variant = 'dark', 
  className = '' 
}: { 
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const colors = {
    light: { primary: '#ffffff', text: '#ffffff' },
    dark: { primary: '#1a1a1a', text: '#1a1a1a' }
  };

  const currentColors = colors[variant];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 100 100"
        className="flex-shrink-0"
      >
        <path
          d="M50 5 L85 20 L85 45 C85 65 70 80 50 95 C30 80 15 65 15 45 L15 20 Z"
          fill="none"
          stroke={currentColors.primary}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M22 50 L78 50" stroke={currentColors.primary} strokeWidth="2"/>
        <path d="M50 22 L50 50" stroke={currentColors.primary} strokeWidth="2"/>
        <path d="M50 18 L58 28 L50 38 L42 28 Z" fill={currentColors.primary} fillOpacity="0.8"/>
      </svg>
      
      <div className="flex flex-col">
        <span 
          className="text-base font-normal tracking-[0.15em] leading-none"
          style={{ color: currentColors.text }}
        >
          ORMEN
        </span>
        <span 
          className="text-sm font-extralight tracking-[0.2em] leading-none mt-0.5"
          style={{ color: currentColors.text }}
        >
          TEKSTIL
        </span>
      </div>
    </div>
  );
}

// Icon only version
export function OrmenIcon({ 
  size = 40, 
  variant = 'dark',
  className = '' 
}: { 
  size?: number;
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const colors = {
    light: { primary: '#ffffff' },
    dark: { primary: '#1a1a1a' }
  };

  const currentColors = colors[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${className}`}
    >
      <path
        d="M50 5 L85 20 L85 45 C85 65 70 80 50 95 C30 80 15 65 15 45 L15 20 Z"
        fill="none"
        stroke={currentColors.primary}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      
      {/* Simplified internal pattern */}
      <g transform="translate(22, 22)">
        <path d="M0 0 L28 0 L28 28 L0 28 Z" fill="none" stroke={currentColors.primary} strokeWidth="1.5"/>
        <path d="M0 9 L28 9" stroke={currentColors.primary} strokeWidth="0.8"/>
        <path d="M0 18 L28 18" stroke={currentColors.primary} strokeWidth="0.8"/>
        <path d="M9 0 L9 28" stroke={currentColors.primary} strokeWidth="0.8"/>
        <path d="M18 0 L18 28" stroke={currentColors.primary} strokeWidth="0.8"/>
      </g>
      
      <g transform="translate(50, 22)">
        <path d="M0 0 L28 0 L28 28 L0 28 Z" fill="none" stroke={currentColors.primary} strokeWidth="1.5"/>
        <circle cx="14" cy="14" r="6" fill="none" stroke={currentColors.primary} strokeWidth="1"/>
      </g>
      
      <g transform="translate(36, 50)">
        <path d="M0 0 L28 0 L28 28 L0 28 Z" fill="none" stroke={currentColors.primary} strokeWidth="1.5"/>
        <path d="M14 6 L20 14 L14 22 L8 14 Z" fill={currentColors.primary} fillOpacity="0.8"/>
      </g>
      
      <path d="M22 50 L78 50" stroke={currentColors.primary} strokeWidth="2"/>
      <path d="M50 22 L50 50" stroke={currentColors.primary} strokeWidth="2"/>
    </svg>
  );
}

// Minimalist version inspired by luxury brands
export function OrmenLogoMinimal({ 
  variant = 'dark',
  className = ''
}: { 
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const colors = {
    light: { primary: '#ffffff', text: '#ffffff' },
    dark: { primary: '#1a1a1a', text: '#1a1a1a' }
  };

  const currentColors = colors[variant];

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 100 100"
        className="flex-shrink-0"
      >
        <path
          d="M50 8 L82 22 L82 45 C82 65 68 78 50 92 C32 78 18 65 18 45 L18 22 Z"
          fill="none"
          stroke={currentColors.primary}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        
        {/* Minimal internal elements */}
        <path d="M50 22 L50 50" stroke={currentColors.primary} strokeWidth="1.5"/>
        <path d="M26 50 L74 50" stroke={currentColors.primary} strokeWidth="1.5"/>
        
        {/* Central quality symbol */}
        <path d="M50 20 L56 30 L50 40 L44 30 Z" fill={currentColors.primary} fillOpacity="0.9"/>
        
        {/* Side elements */}
        <circle cx="35" cy="65" r="3" fill="none" stroke={currentColors.primary} strokeWidth="1"/>
        <circle cx="65" cy="65" r="3" fill="none" stroke={currentColors.primary} strokeWidth="1"/>
      </svg>
      
      <div className="flex flex-col space-y-1">
        <span 
          className="text-2xl font-light tracking-[0.25em] leading-none"
          style={{ color: currentColors.text }}
        >
          ORMEN
        </span>
        <span 
          className="text-sm font-extralight tracking-[0.4em] leading-none opacity-80"
          style={{ color: currentColors.text }}
        >
          TEKSTIL
        </span>
      </div>
    </div>
  );
}
