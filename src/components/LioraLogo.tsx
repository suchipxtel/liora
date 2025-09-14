import React from 'react';
import { motion } from 'framer-motion';

interface LioraLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const LioraLogo: React.FC<LioraLogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Flowing Logo Icon */}
      <motion.div 
        className={`${sizeClasses[size]} relative`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="flowing-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(220, 80%, 70%)" />
              <stop offset="25%" stopColor="hsl(215, 85%, 75%)" />
              <stop offset="50%" stopColor="hsl(210, 90%, 80%)" />
              <stop offset="75%" stopColor="hsl(205, 85%, 83%)" />
              <stop offset="100%" stopColor="hsl(210, 90%, 80%)" />
            </linearGradient>
            <linearGradient id="inner-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(215, 90%, 85%)" />
              <stop offset="100%" stopColor="hsl(220, 85%, 78%)" />
            </linearGradient>
            <linearGradient id="accent-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(210, 95%, 92%)" />
              <stop offset="100%" stopColor="hsl(220, 90%, 88%)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Flowing background shape */}
          <motion.path
            d="M8 12 Q20 4, 32 12 Q28 20, 20 24 Q12 28, 8 20 Q4 16, 8 12 Z"
            fill="url(#flowing-gradient)"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Inner flowing element */}
          <motion.path
            d="M12 16 Q20 10, 28 16 Q24 22, 20 20 Q16 18, 12 16 Z"
            fill="url(#inner-glow)"
            opacity="0.8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
          
          {/* Central highlight */}
          <motion.circle
            cx="20"
            cy="18"
            r="4"
            fill="url(#accent-glow)"
            opacity="0.95"
            initial={{ r: 0 }}
            animate={{ r: 4 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          />
          
          {/* Dynamic flowing accent */}
          <motion.path
            d="M16 14 Q20 12, 24 14 Q22 18, 20 16 Q18 14, 16 14 Z"
            fill="hsl(220, 85%, 90%)"
            opacity="0.8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
        </svg>
      </motion.div>

      {/* Brand Text */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className={`${textSizeClasses[size]} font-bold text-gradient-liora font-serif`}>
            Liora
          </h1>
          {size !== 'sm' && (
            <p className="text-xs text-muted-foreground font-medium tracking-wide">
              AI Medical Intelligence
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};