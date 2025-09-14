import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, ExternalLink, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import heartAttackImage from '@/assets/heart-attack-diagram.jpg';
import medicationsImage from '@/assets/medications.jpg';

interface SummaryPanelProps {
  summary: {
    diagnosis: string;
    hospitalCourse: string;
    medications: string;
    instructions: string;
  };
  readabilityScore: number;
  confidence: number;
  citations: Array<{ id: string; label: string; url: string }>;
  selectedJargon: string | null;
  highlightedSection: string | null;
  accessibilityMode: {
    highContrast: boolean;
    fontSize: 'small' | 'normal' | 'large';
  };
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({
  summary,
  readabilityScore,
  confidence,
  citations,
  selectedJargon,
  highlightedSection,
  accessibilityMode
}) => {
  const [expandedCitations, setExpandedCitations] = useState(false);

  const getReadabilityColor = (score: number) => {
    if (score <= 6) return 'text-red-600';
    if (score <= 8) return 'text-accent-green';
    return 'text-yellow-600';
  };

  const getReadabilityLabel = (score: number) => {
    if (score <= 6) return 'Elementary';
    if (score <= 8) return 'Middle School';
    if (score <= 10) return 'High School';
    return 'College Level';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-accent-green';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Individual section readability scores (simulated)
  const sectionScores = {
    diagnosis: 7.2,
    hospitalCourse: 6.8,
    medications: 8.1,
    instructions: 6.5
  };

  const getSectionReadabilityBadge = (score: number) => {
    if (score <= 6) return { label: 'Excellent', color: 'bg-green-100 text-green-800', icon: '🟢' };
    if (score <= 8) return { label: 'Good', color: 'bg-blue-100 text-blue-800', icon: '🔵' };
    return { label: 'Fair', color: 'bg-yellow-100 text-yellow-800', icon: '🟡' };
  };

  const getSectionClass = (sectionName: string) => {
    const isHighlighted = highlightedSection === sectionName;
    const baseClass = `summary-section transition-all duration-500`;
    const highlightClass = isHighlighted ? 'ring-2 ring-primary shadow-lg scale-[1.02]' : '';
    const contrastClass = accessibilityMode.highContrast ? 'bg-gray-800 text-white border-gray-600' : '';
    return `${baseClass} ${highlightClass} ${contrastClass}`;
  };

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-5 w-5 text-accent-green" />
          <div>
            <h2 className="text-lg font-semibold">Simplified Summary</h2>
            <p className="text-sm text-muted-foreground">Easy-to-understand explanation</p>
          </div>
        </div>
      </div>


      {/* Summary Sections */}
      <div className="space-y-4">
        {/* Diagnosis */}
        <motion.div
          className={getSectionClass('diagnosis')}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          id="diagnosis-section"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gradient-liora rounded-full shadow-glow"></div>
              <h3 className="text-xl font-bold text-primary">What happened to you?</h3>
            </div>
            <Badge className="bg-green-100 text-green-800 font-semibold px-3 py-1">
              🎯 Key Finding
            </Badge>
          </div>
          
          {/* Medical Illustration */}
          <div className="mb-4 p-4 bg-muted/30 rounded-lg">
            <img 
              src={heartAttackImage} 
              alt="Heart attack diagram showing partially blocked coronary artery"
              className="w-full max-w-md mx-auto rounded-lg shadow-sm"
            />
            <p className="text-xs text-muted-foreground text-center mt-2">
              Illustration: Heart attack (NSTEMI) with partially blocked artery
            </p>
          </div>
          
          <p className="text-foreground leading-relaxed text-lg font-medium">{summary.diagnosis}</p>
        </motion.div>

        {/* Hospital Course */}
        <motion.div
          className={getSectionClass('hospitalCourse')}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          id="hospital-course-section"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gradient-accent rounded-full shadow-glow"></div>
              <h3 className="text-xl font-bold text-accent">What we did to help</h3>
            </div>
            <Badge className="bg-blue-100 text-blue-800 font-semibold px-3 py-1">
              📋 Treatment Plan
            </Badge>
          </div>
          <p className="text-foreground leading-relaxed text-lg font-medium">{summary.hospitalCourse}</p>
        </motion.div>

        {/* Medications */}
        <motion.div
          className={getSectionClass('medications')}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          id="medications-section"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-glow"></div>
              <h3 className="text-xl font-bold text-purple-600">Your medicines</h3>
            </div>
            <Badge className="bg-purple-100 text-purple-800 font-semibold px-3 py-1">
              💊 Critical
            </Badge>
          </div>
          
          
          <p className="text-foreground leading-relaxed text-lg font-medium">{summary.medications}</p>
          <div className={`mt-3 p-3 rounded-lg border ${
            accessibilityMode.highContrast 
              ? 'bg-yellow-900 border-yellow-700 text-yellow-100' 
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
              <p className={`text-sm ${accessibilityMode.highContrast ? 'text-yellow-100' : 'text-yellow-800'}`}>
                <strong>Important:</strong> Take all medicines exactly as prescribed. 
                Don't stop without talking to your doctor first.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          className={getSectionClass('instructions')}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          id="instructions-section"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-glow"></div>
              <h3 className="text-xl font-bold text-emerald-600">What to do next</h3>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800 font-semibold px-3 py-1">
              ⚡ Action Items
            </Badge>
          </div>
          
          {/* Important action items as bullet points */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-emerald-50 border-l-4 border-emerald-400 rounded-r-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-emerald-800">Schedule Follow-up (URGENT)</h4>
                <p className="text-emerald-700 text-sm">Book appointment with cardiologist within 1-2 weeks - this is critical for your recovery</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-red-800">Emergency Warning Signs</h4>
                <p className="text-red-700 text-sm">Call 911 immediately if you experience: chest pain, shortness of breath, or feeling faint</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-blue-800">Take Medications as Prescribed</h4>
                <p className="text-blue-700 text-sm">Do not skip doses or stop taking medications without consulting your doctor first</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-purple-800">Activity Guidelines</h4>
                <p className="text-purple-700 text-sm">Avoid strenuous activity for the next week, but gentle walking is encouraged for recovery</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-orange-800">Heart-Healthy Diet</h4>
                <p className="text-orange-700 text-sm">Start a diet low in sodium and saturated fats to support your heart health</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Evidence & Citations */}
      <motion.div
        className={`border rounded-lg p-4 ${
          accessibilityMode.highContrast 
            ? 'bg-gray-800 text-white border-gray-600' 
            : 'bg-card border-border'
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Collapsible open={expandedCitations} onOpenChange={setExpandedCitations}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <div className="flex items-center space-x-2">
                <ExternalLink className="h-4 w-4 text-primary" />
                <span className="font-medium">Medical Sources & References</span>
                <Badge variant="secondary" className="ml-2">
                  {citations.length} sources
                </Badge>
              </div>
              {expandedCitations ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-4 space-y-2">
            {citations.map((citation) => (
              <motion.a
                key={citation.id}
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  accessibilityMode.highContrast 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-muted/50 hover:bg-muted'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <ExternalLink className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary hover:underline">
                  {citation.label}
                </span>
              </motion.a>
            ))}
            
            <div className={`mt-4 p-3 border rounded-lg ${
              accessibilityMode.highContrast 
                ? 'bg-green-900 border-green-700 text-green-100' 
                : 'bg-accent-green/10 border-accent-green/20'
            }`}>
              <p className={`text-xs ${
                accessibilityMode.highContrast ? 'text-green-100' : 'text-muted-foreground'
              }`}>
                All explanations are based on trusted medical sources including Mayo Clinic, 
                NIH, and American Heart Association. This summary is for educational purposes 
                and should not replace professional medical advice.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </motion.div>
    </div>
  );
};