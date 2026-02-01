import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Loader2 } from 'lucide-react';
import { getScentRecommendation } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AiConciergeProps {
  isOpen: boolean;
  onClose: () => void;
}

const AiConcierge: React.FC<AiConciergeProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bienvenido a Metáfora. Soy tu Conserje de Aromas. ¿Cómo te sientes hoy o para qué ocasión estás comprando?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const responseText = await getScentRecommendation(userMsg.text);
      const modelMsg: ChatMessage = { role: 'model', text: responseText, isProductRecommendation: true };
      setMessages(prev => [...prev, modelMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Tengo problemas para conectar con los espíritus de los aromas. Por favor inténtalo más tarde." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[90vw] sm:w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-meta-gold/30 flex flex-col overflow-hidden font-sans animate-fade-in-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-meta-lavender to-meta-rose p-4 flex justify-between items-center text-meta-dark">
        <div className="flex items-center gap-2">
            <div className="bg-white/50 p-1 rounded-full">
                <Sparkles size={16} className="text-meta-burgundy" />
            </div>
            <div>
                <h3 className="font-display text-sm font-bold">Conserje de Aromas</h3>
                <span className="text-[10px] uppercase tracking-widest opacity-70">Impulsado por Gemini</span>
            </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/30 p-1 rounded-full transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-meta-cream/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-meta-burgundy text-white rounded-tr-none' 
                  : 'bg-white border border-gray-100 shadow-sm text-meta-dark rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-meta-gold" />
              <span className="text-xs text-gray-400 italic">Consultando a los sentidos...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ej. Un domingo lluvioso..."
          className="flex-1 bg-gray-50 border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-meta-gold outline-none text-meta-dark placeholder-gray-400"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !query.trim()}
          className="bg-meta-gold text-white p-2 rounded-full hover:bg-meta-burgundy transition-colors disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AiConcierge;