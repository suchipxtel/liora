import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle, CheckCircle2, Loader2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface UploadCardProps {
  onUpload: (file: File) => void;
  processingStatus: 'idle' | 'uploading' | 'processing' | 'complete';
}

export const UploadCard: React.FC<UploadCardProps> = ({ onUpload, processingStatus }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        onUpload(file);
      }
    }
  }, [onUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onUpload(files[0]);
    }
  }, [onUpload]);

  const getStatusContent = () => {
    switch (processingStatus) {
      case 'uploading':
        return (
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-semibold mb-2">Uploading Document</h3>
            <p className="text-muted-foreground mb-4">Securely transferring your file...</p>
            <Progress value={uploadProgress} className="w-full max-w-sm mx-auto" />
          </div>
        );
      
      case 'processing':
        return (
          <div className="text-center">
            <div className="relative mb-4">
              <Loader2 className="h-12 w-12 text-primary mx-auto animate-spin" />
              <Shield className="h-6 w-6 text-accent-green absolute -top-1 -right-1" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Processing Document</h3>
            <p className="text-muted-foreground mb-4">
              De-identifying content and generating simplified summary...
            </p>
            <div className="space-y-2 text-sm text-left max-w-md mx-auto">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-accent-green" />
                <span>Document scanned and transcribed</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-accent-green" />
                <span>Personal information removed (keeping DOB + ZIP)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating plain-language summary...</span>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center">
            <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload Medical Document</h3>
            <p className="text-muted-foreground mb-6">
              Drag and drop your discharge paperwork or click to browse
            </p>
            <div className="space-y-3">
              <Button className="btn-medical">
                <FileText className="h-4 w-4 mr-2" />
                Choose File
              </Button>
              <p className="text-xs text-muted-foreground">
                Supported: PDF, JPG, PNG • Max 20MB
              </p>
            </div>
          </div>
        );
    }
  };

  if (processingStatus !== 'idle') {
    return (
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-card border border-border rounded-xl p-8 shadow-soft">
          {getStatusContent()}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className={`upload-area ${dragOver ? 'drag-over' : ''}`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
      >
        {getStatusContent()}
        
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Enhanced Security & Compliance Notice */}
      <motion.div 
        className="mt-6 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="p-4 bg-accent-green/10 border border-accent-green/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-accent-green mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-accent-green mb-1">HIPAA Compliant Processing</p>
              <p className="text-muted-foreground mb-2">
                We automatically remove personal identifiers (names, addresses, SSN) while keeping 
                only your date of birth and ZIP code for medical context. All data is encrypted 
                and processed according to HIPAA guidelines.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• End-to-end encryption during transfer</li>
                <li>• Automatic document deletion after processing</li>
                <li>• No personal data stored on servers</li>
                <li>• Audit log of all access attempts</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Medical Disclaimer:</strong> This tool provides educational summaries only. 
            Always consult your healthcare provider for medical decisions and follow their instructions 
            regarding your treatment plan.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};