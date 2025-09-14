import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, MessageCircle, Clock, CheckCircle2, Trash2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { UploadCard } from '@/components/UploadCard';
import { DocumentViewer } from '@/components/DocumentViewer';
import { SummaryPanel } from '@/components/SummaryPanel';
import { Chatbot } from '@/components/Chatbot';
import { DrugPriceComparison } from '@/components/DrugPriceComparison';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentDocument, setCurrentDocument] = useState<any>(null);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'uploading' | 'processing' | 'complete'>('idle');
  const [selectedJargon, setSelectedJargon] = useState<string | null>(null);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [accessibilityMode, setAccessibilityMode] = useState({
    highContrast: false,
    fontSize: 'normal' as 'small' | 'normal' | 'large'
  });

  const handleDocumentUpload = async (file: File) => {
    setProcessingStatus('uploading');
    
    // Simulate upload and processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessingStatus('processing');
    
    // Simulate de-identification and LLM processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock detailed document data
    const mockDocument = {
      id: 'doc_123',
      fileName: file.name,
      redactedText: `
**COMPREHENSIVE EMERGENCY DEPARTMENT DISCHARGE SUMMARY**

Patient [REDACTED] presented to the emergency department on [REDACTED] at 14:30 hours with chief complaints of severe <span class="medical-term" data-term="chest pain" data-definition="Discomfort or pain felt in the chest area, often indicating heart problems">chest pain</span> radiating to the left arm and <span class="medical-term" data-term="dyspnea" data-definition="Shortness of breath or difficulty breathing">dyspnea</span> of 3-hour duration.

**CLINICAL PRESENTATION:**
- Pain described as crushing, substernal, 8/10 severity
- Associated with <span class="medical-term" data-term="diaphoresis" data-definition="Excessive sweating, often a sign of heart stress">diaphoresis</span> and <span class="medical-term" data-term="nausea" data-definition="Feeling of sickness with an inclination to vomit">nausea</span>
- <span class="medical-term" data-term="vital signs" data-definition="Basic body measurements like blood pressure, heart rate, temperature">Vital signs</span>: BP 165/95, HR 88, RR 22, O2 sat 94% on room air

**DIAGNOSTIC FINDINGS:**
Initial evaluation revealed significantly elevated <span class="medical-term" data-term="troponin I" data-definition="A protein released when heart muscle is damaged, indicating a heart attack">troponin I</span> levels at 8.4 ng/mL (normal <0.04) and <span class="medical-term" data-term="EKG" data-definition="Electrocardiogram - a test that measures heart electrical activity">EKG</span> changes showing <span class="medical-term" data-term="ST depressions" data-definition="Changes in heart rhythm pattern indicating heart muscle damage">ST depressions</span> in leads II, III, and aVF, consistent with <span class="medical-term" data-term="NSTEMI" data-definition="Non-ST Elevation Myocardial Infarction - a type of heart attack where arteries are partially blocked">NSTEMI</span>.

Additional labs: <span class="medical-term" data-term="CK-MB" data-definition="An enzyme that rises when heart muscle is damaged">CK-MB</span> 45 U/L, <span class="medical-term" data-term="BNP" data-definition="Brain natriuretic peptide - indicates heart strain">BNP</span> 892 pg/mL, <span class="medical-term" data-term="lipid panel" data-definition="Blood test measuring cholesterol and other fats">lipid panel</span> showing LDL 165 mg/dL.

**TREATMENT INITIATED:**
Patient was immediately started on <span class="medical-term" data-term="dual antiplatelet therapy" data-definition="Two medications that prevent blood clots">dual antiplatelet therapy</span> consisting of:
- <span class="medical-term" data-term="aspirin 81mg" data-definition="Low-dose blood thinner taken daily to prevent clots">Aspirin 81mg</span> daily
- <span class="medical-term" data-term="ticagrelor 90mg bid" data-definition="Blood thinner taken twice daily to prevent clots - brand name Brilinta">Ticagrelor 90mg bid</span>

Additional medications:
- <span class="medical-term" data-term="atorvastatin 80mg" data-definition="High-intensity statin to lower cholesterol">Atorvastatin 80mg</span> daily
- <span class="medical-term" data-term="metoprolol 25mg" data-definition="Beta-blocker to reduce heart rate and blood pressure">Metoprolol 25mg</span> twice daily

DOB: 03/14/1967
ZIP: [REDACTED]
Emergency Contact: [REDACTED]`,
      
      summary: {
        diagnosis: "You had a type of heart attack called NSTEMI (Non-ST Elevation Myocardial Infarction). This happens when one of the arteries that supplies blood to your heart gets partially blocked by a blood clot or plaque buildup. Unlike a massive heart attack, your artery wasn't completely blocked, which is why you're recovering well. The chest pain you felt was your heart muscle not getting enough oxygen.",
        hospitalCourse: "When you arrived, our medical team immediately ran several important tests. Your blood tests showed elevated troponin, which is a protein that leaks out when heart muscle is damaged. Your EKG (heart rhythm test) showed specific changes that confirmed the heart attack. We started you on emergency medications right away to prevent further damage and began monitoring your heart closely in our cardiac unit.",
        medications: "You'll be taking several important medications: Aspirin (81mg daily) - this is a blood thinner that helps prevent new clots. Ticagrelor (90mg twice daily) - this is a stronger blood thinner that works differently than aspirin. Together, these two medications significantly reduce your risk of another heart attack. You'll also take Atorvastatin (80mg daily) to lower your cholesterol and Metoprolol (25mg twice daily) to help your heart work more efficiently.",
        instructions: "Schedule a follow-up appointment with a cardiologist within 1-2 weeks - this is very important for your recovery. Call 911 immediately if you experience chest pain, shortness of breath, or feel faint. Take all medications exactly as prescribed - do not skip doses or stop without talking to your doctor first. Avoid strenuous activity for the next week, but gentle walking is encouraged. Start a heart-healthy diet low in sodium and saturated fats."
      },
      medications: ['aspirin', 'ticagrelor', 'atorvastatin', 'metoprolol'],
      
      readabilityScore: 6.8,
      confidence: 0.92,
      citations: [
        { id: 'c1', label: 'Heart Attack - Mayo Clinic', url: 'https://www.mayoclinic.org/diseases-conditions/heart-attack' },
        { id: 'c2', label: 'Antiplatelet Therapy - AHA', url: 'https://www.heart.org/en/health-topics/antiplatelet-therapy' }
      ]
    };
    
    setCurrentDocument(mockDocument);
    setProcessingStatus('complete');
  };

  const handleJargonClick = useCallback((term: string, section?: string) => {
    setSelectedJargon(term);
    if (section) {
      setHighlightedSection(section);
      // Auto-scroll to section after a brief delay
      setTimeout(() => setHighlightedSection(null), 2000);
    }
  }, []);

  const toggleAccessibility = (type: 'contrast' | 'fontSize', value?: string) => {
    setAccessibilityMode(prev => ({
      ...prev,
      ...(type === 'contrast' 
        ? { highContrast: !prev.highContrast }
        : { fontSize: value as any || (prev.fontSize === 'normal' ? 'large' : 'normal') }
      )
    }));
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      accessibilityMode.highContrast 
        ? 'bg-black text-white' 
        : 'bg-background'
    } ${
      accessibilityMode.fontSize === 'large' 
        ? 'text-lg' 
        : accessibilityMode.fontSize === 'small' 
        ? 'text-sm' 
        : ''
    }`}>
      <Header 
        accessibilityMode={accessibilityMode}
        onToggleAccessibility={toggleAccessibility}
      />
      
      <main className="container mx-auto px-4 py-8">
        {!currentDocument ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Hero Section */}
            <div className="text-center mb-12">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-gradient-liora mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Liora
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Advanced AI-powered medical document analysis with personalized insights. 
                Upload your discharge paperwork and get comprehensive explanations, medication pricing, and care guidance.
              </motion.p>
              
              {/* Features */}
                <div className="flex items-center space-x-6 mb-12">
                  <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-card shadow-soft hover-lift">
                    <Clock className="h-6 w-6 text-primary" />
                    <span className="font-medium">Instant Processing</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-card shadow-soft hover-lift">
                    <CheckCircle2 className="h-6 w-6 text-accent-green" />
                    <span className="font-medium">AI-Powered Analysis</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-card shadow-soft hover-lift">
                    <Trash2 className="h-6 w-6 text-muted-foreground" />
                    <span className="font-medium">Delete My Data</span>
                  </div>
                </div>
            </div>

            <UploadCard 
              onUpload={handleDocumentUpload}
              processingStatus={processingStatus}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-2 gap-8 mb-24"
          >
            {/* Left Column - Document & Price Comparison */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <DocumentViewer 
                document={currentDocument}
                onJargonClick={handleJargonClick}
                selectedJargon={selectedJargon}
                accessibilityMode={accessibilityMode}
              />
              <DrugPriceComparison medications={currentDocument.medications} />
            </motion.div>

            {/* Right Column - Simplified Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
            <SummaryPanel 
                summary={currentDocument.summary}
                readabilityScore={currentDocument.readabilityScore}
                confidence={currentDocument.confidence}
                citations={currentDocument.citations}
                selectedJargon={selectedJargon}
                highlightedSection={highlightedSection}
                accessibilityMode={accessibilityMode}
              />
            </motion.div>
          </motion.div>
        )}
      </main>

      {/* Chatbot - Always visible when document is loaded */}
      {currentDocument && <Chatbot document={currentDocument} />}
    </div>
  );
};

export default Index;