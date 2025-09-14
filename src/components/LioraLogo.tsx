import React from 'react';
import { motion } from 'framer-motion';
import lioraLogo from '@/assets/liora-logo.png';

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
      {/* Logo Image */}
      <motion.div 
        className={`${sizeClasses[size]} relative`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <img 
          src={lioraLogo} 
          alt="Liora Logo" 
          className="w-full h-full object-contain filter brightness-110 contrast-110"
        />
      </motion.div>

      {/* Brand Text */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
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