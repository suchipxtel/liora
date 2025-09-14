import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, User, Settings, Type, Contrast, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LioraLogo } from '@/components/LioraLogo';

interface HeaderProps {
  accessibilityMode: {
    highContrast: boolean;
    fontSize: 'small' | 'normal' | 'large';
  };
  onToggleAccessibility: (type: 'contrast' | 'fontSize', value?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ accessibilityMode, onToggleAccessibility }) => {
  return (
    <motion.header 
      className="bg-gradient-liora shadow-soft border-b border-border/50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <LioraLogo size="md" />

          {/* Navigation - now shows Delete My Data */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-white/90">
              <Trash2 className="h-4 w-4" />
              <span className="text-sm font-medium">Delete My Data</span>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Settings className="h-4 w-4 mr-2" />
                  Accessibility
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-4">
                  <h4 className="font-medium">Accessibility Settings</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Contrast className="h-4 w-4" />
                        <span className="text-sm">High Contrast</span>
                      </div>
                      <Button
                        variant={accessibilityMode.highContrast ? "default" : "outline"}
                        size="sm"
                        onClick={() => onToggleAccessibility('contrast')}
                      >
                        {accessibilityMode.highContrast ? 'On' : 'Off'}
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Type className="h-4 w-4" />
                        <span className="text-sm">Font Size</span>
                      </div>
                      <div className="flex space-x-1">
                        {['small', 'normal', 'large'].map((size) => (
                          <Button
                            key={size}
                            variant={accessibilityMode.fontSize === size ? "default" : "outline"}
                            size="sm"
                            className="text-xs capitalize"
                            onClick={() => onToggleAccessibility('fontSize', size)}
                          >
                            {size === 'small' ? 'S' : size === 'normal' ? 'M' : 'L'}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};