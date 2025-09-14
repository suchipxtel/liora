import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Copy, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DocumentViewerProps {
  document: any;
  onJargonClick: (term: string, section?: string) => void;
  selectedJargon: string | null;
  accessibilityMode: {
    highContrast: boolean;
    fontSize: 'small' | 'normal' | 'large';
  };
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  document, 
  onJargonClick, 
  selectedJargon,
  accessibilityMode
}) => {
  const [showRedacted, setShowRedacted] = useState(false);
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [hoveredTerm, setHoveredTerm] = useState<{term: string, definition: string, x: number, y: number} | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  // Handle jargon term clicks and hover tooltips
  useEffect(() => {
    if (!viewerRef.current) return;

    const handleJargonClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('medical-term')) {
        const term = target.getAttribute('data-term');
        const section = target.getAttribute('data-section');
        if (term) {
          onJargonClick(term, section || undefined);
        }
      }
    };

    const handleJargonHover = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('medical-term')) {
        const term = target.getAttribute('data-term');
        const definition = target.getAttribute('data-definition');
        const rect = target.getBoundingClientRect();
        
        if (term && definition) {
          setHoveredTerm({
            term,
            definition,
            x: rect.left + rect.width / 2,
            y: rect.top - 10
          });
        }
      }
    };

    const handleJargonLeave = () => {
      setHoveredTerm(null);
    };

    viewerRef.current.addEventListener('click', handleJargonClick);
    viewerRef.current.addEventListener('mouseenter', handleJargonHover, true);
    viewerRef.current.addEventListener('mouseleave', handleJargonLeave, true);
    
    return () => {
      viewerRef.current?.removeEventListener('click', handleJargonClick);
      viewerRef.current?.removeEventListener('mouseenter', handleJargonHover, true);
      viewerRef.current?.removeEventListener('mouseleave', handleJargonLeave, true);
    };
  }, [onJargonClick]);

  // Create HTML content with proper jargon highlighting and tooltips
  const createDocumentHTML = () => {
    if (!document?.redactedText) return '';
    
    const contrastClass = accessibilityMode.highContrast ? 'high-contrast' : '';
    
    return document.redactedText.replace(
      /<span class="medical-term" data-term="([^"]+)" data-definition="([^"]+)">([^<]+)<\/span>/g,
      (match: string, term: string, definition: string, text: string) => {
        const isSelected = selectedJargon === term;
        const highlightClass = isSelected ? 'highlight-sync' : '';
        // Map terms to sections for better interactivity
        const section = getTermSection(term);
        return `<span class="medical-term ${highlightClass} ${contrastClass} tooltip-trigger" 
                       data-term="${term}" 
                       data-definition="${definition}" 
                       data-section="${section}"
                       title="Click for definition and explanation">${text}</span>`;
      }
    );
  };

  // Helper to map medical terms to summary sections
  const getTermSection = (term: string) => {
    const termLower = term.toLowerCase();
    if (termLower.includes('nstemi') || termLower.includes('heart') || termLower.includes('chest')) return 'diagnosis';
    if (termLower.includes('aspirin') || termLower.includes('ticagrelor') || termLower.includes('medication')) return 'medications';
    if (termLower.includes('troponin') || termLower.includes('ekg')) return 'hospitalCourse';
    return 'instructions';
  };

  const handleCopyText = () => {
    if (document?.redactedText) {
      // Strip HTML tags for plain text copy
      const plainText = document.redactedText.replace(/<[^>]*>/g, '');
      navigator.clipboard.writeText(plainText);
    }
  };

  return (
    <div className="space-y-4 relative">
      {/* Tooltip for medical terms */}
      {hoveredTerm && (
        <div
          className="fixed z-50 bg-card border border-border rounded-lg p-3 shadow-lg max-w-xs"
          style={{
            left: hoveredTerm.x,
            top: hoveredTerm.y,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          <div className="text-sm font-semibold text-primary mb-1">
            {hoveredTerm.term}
          </div>
          <div className="text-xs text-muted-foreground">
            {hoveredTerm.definition}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
          </div>
        </div>
      )}
      
      {/* Document Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">Original Document</h2>
            <p className="text-sm text-muted-foreground">
              {document?.fileName || 'Medical Discharge Summary'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs">
            De-identified
          </Badge>
          <Badge variant="outline" className="text-xs text-accent-green">
            Secure
          </Badge>
        </div>
      </div>

      {/* Document Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/50 rounded-lg">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={handleCopyText}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Text
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy document text to clipboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download processed document</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center space-x-2 ml-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={showRedacted ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setShowRedacted(!showRedacted)}
                >
                  {showRedacted ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {showRedacted ? 'Hide' : 'Show'} redacted content preview
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={highlightEnabled ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setHighlightEnabled(!highlightEnabled)}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {highlightEnabled ? 'Disable' : 'Enable'} jargon highlighting
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Document Content */}
      <motion.div
        className={`document-viewer ${!highlightEnabled ? 'no-highlight' : ''} ${
          accessibilityMode.highContrast ? 'bg-gray-900 text-white border-gray-600' : ''
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div
          ref={viewerRef}
          className={`prose prose-sm max-w-none ${
            accessibilityMode.highContrast ? 'prose-invert' : ''
          }`}
          dangerouslySetInnerHTML={{ __html: createDocumentHTML() }}
        />
      </motion.div>

      {/* Legend */}
      <motion.div
        className="p-4 bg-card border border-border rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="font-medium mb-3 text-sm">Legend</h4>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-3 h-3 bg-jargon-background border border-jargon-border rounded"></span>
            <span>Medical terminology (click for definition)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-block w-3 h-3 bg-muted rounded"></span>
            <span>[REDACTED] Personal information removed</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};