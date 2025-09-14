import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, ExternalLink, AlertCircle, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  sources?: Array<{ label: string; url: string }>;
  confidence?: number;
}

interface ChatbotProps {
  document: any;
}

export const Chatbot: React.FC<ChatbotProps> = ({ document }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hi! I\'m here to help you understand your medical document. You can ask me questions about your diagnosis, medications, or what any of the medical terms mean.',
      timestamp: new Date(),
      confidence: 0.95
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock intelligent responses based on input
    let botResponse = '';
    let sources: Array<{ label: string; url: string }> = [];
    let confidence = 0.9;

    const input = inputValue.toLowerCase();
    
    if (input.includes('nstemi') || input.includes('heart attack')) {
      botResponse = 'NSTEMI stands for Non-ST Elevation Myocardial Infarction. This is a type of heart attack where one of the arteries supplying blood to your heart muscle becomes partially blocked. Unlike a STEMI (where the artery is completely blocked), an NSTEMI is usually less severe but still requires immediate treatment. The good news is that with proper medication and follow-up care, most people recover well from this type of heart attack.';
      sources = [
        { label: 'Heart Attack Types - Mayo Clinic', url: 'https://www.mayoclinic.org/diseases-conditions/heart-attack' },
        { label: 'NSTEMI Treatment - AHA', url: 'https://www.heart.org/' }
      ];
    } else if (input.includes('aspirin') || input.includes('medication') || input.includes('medicine')) {
      botResponse = 'The aspirin and ticagrelor you\'ve been prescribed work together to prevent blood clots. Aspirin (81mg daily) is a low-dose "baby aspirin" that helps keep your blood from clotting too easily. Ticagrelor (90mg twice daily) is a stronger blood thinner that specifically prevents platelets from sticking together. Together, these medications significantly reduce your risk of having another heart attack. It\'s very important to take them exactly as prescribed and not to stop them without talking to your doctor first.';
      sources = [
        { label: 'Antiplatelet Therapy - AHA', url: 'https://www.heart.org/' },
        { label: 'Aspirin for Heart Disease - NIH', url: 'https://www.nhlbi.nih.gov/' }
      ];
    } else if (input.includes('follow up') || input.includes('next') || input.includes('appointment')) {
      botResponse = 'Your follow-up appointment is very important for monitoring your recovery. Your cardiologist will check how well your heart is healing, review your medications, and may order tests like an EKG or echocardiogram. They\'ll also discuss lifestyle changes that can help prevent future heart problems, such as diet, exercise, and stress management. Don\'t skip this appointment - it\'s a crucial part of your recovery process.';
      confidence = 0.85;
    } else {
      botResponse = 'I can help explain the medical terms and recommendations in your discharge summary. Try asking me about specific medications, your diagnosis (NSTEMI), or what you should do for follow-up care. I\'m here to make sure you understand everything about your treatment plan.';
      confidence = 0.7;
    }

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: botResponse,
      timestamp: new Date(),
      sources: sources.length > 0 ? sources : undefined,
      confidence
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mb-4 w-96 h-[500px] bg-card border border-border rounded-2xl shadow-elevation overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-chat-primary to-teal-700 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Medical Assistant</h3>
                    <p className="text-xs text-white/80">Ask about your document</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 h-[340px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && (
                        <div className="p-1.5 bg-chat-primary text-white rounded-full">
                          <Bot className="h-3 w-3" />
                        </div>
                      )}
                      
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        
                        {message.sources && (
                          <div className="mt-3 space-y-1">
                            <p className="text-xs font-medium opacity-80">Sources:</p>
                            {message.sources.map((source, idx) => (
                              <a
                                key={idx}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-xs text-primary hover:underline"
                              >
                                <ExternalLink className="h-3 w-3" />
                                <span>{source.label}</span>
                              </a>
                            ))}
                          </div>
                        )}
                        
                        {message.confidence && message.confidence < 0.8 && (
                          <div className="mt-2 flex items-center space-x-1">
                            <AlertCircle className="h-3 w-3 text-yellow-600" />
                            <span className="text-xs text-yellow-600">
                              Consider consulting your doctor for specific advice
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {message.type === 'user' && (
                        <div className="p-1.5 bg-primary text-primary-foreground rounded-full">
                          <User className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-chat-primary text-white rounded-full">
                      <Bot className="h-3 w-3" />
                    </div>
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your medical document..."
                  className="chat-input flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-chat-primary hover:bg-chat-primary/90 text-white p-2"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                This AI assistant provides educational information. Always consult your doctor for medical advice.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="chat-bubble w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          {isOpen ? (
            <ChevronUp className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </motion.div>

      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-0 right-20 mb-4 mr-2"
        >
          <div className="bg-chat-primary text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
            Ask me about your document!
            <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2">
              <div className="w-0 h-0 border-l-4 border-l-chat-primary border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};