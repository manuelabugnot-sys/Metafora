import React, { useState, useEffect, useRef } from 'react';
import { X, Search, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onNavigate: (productId: string) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, products, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery(''); // Reset when closed
    }
  }, [isOpen]);

  // Filter logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.scentProfile.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-meta-cream/95 backdrop-blur-md transition-opacity duration-300 animate-fade-in-up"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-3xl px-6 h-full sm:h-auto flex flex-col z-50">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 sm:top-0 sm:-right-12 text-meta-burgundy hover:text-meta-gold transition-colors bg-white/50 rounded-full p-2"
        >
          <X size={28} />
        </button>

        {/* Search Input */}
        <div className="w-full border-b-2 border-meta-burgundy/20 py-4 mb-8 flex items-center mt-20 sm:mt-0">
          <Search size={32} className="text-meta-burgundy mr-4 opacity-50" />
          <input 
            ref={inputRef}
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar aromas, ingredientes..."
            className="w-full bg-transparent border-none outline-none font-serif text-2xl sm:text-4xl text-meta-dark placeholder-meta-burgundy/30"
          />
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto max-h-[60vh] space-y-2 pr-2">
          {query && results.length === 0 && (
             <div className="text-center py-10 text-gray-400 font-sans italic">
               No encontramos coincidencias para "{query}".
             </div>
          )}

          {results.map((product) => (
            <div 
              key={product.id}
              onClick={() => onNavigate(product.id)}
              className="flex items-center gap-4 p-4 hover:bg-white rounded-xl cursor-pointer group transition-all duration-300 border border-transparent hover:border-meta-gold/20 hover:shadow-sm"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-serif text-xl text-meta-dark group-hover:text-meta-burgundy transition-colors">{product.name}</h4>
                  <span className="font-sans text-xs text-meta-gold font-bold uppercase tracking-widest">{product.category}</span>
                </div>
                <p className="font-sans text-sm text-gray-500 line-clamp-1">{product.description}</p>
              </div>

              <ChevronRight size={20} className="text-gray-300 group-hover:text-meta-burgundy group-hover:translate-x-1 transition-all" />
            </div>
          ))}
          
          {!query && (
            <div className="text-center py-8 opacity-50">
                <span className="font-display text-sm text-meta-burgundy tracking-widest uppercase">Sugerencias Populares</span>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <button onClick={() => setQuery("Lavanda")} className="bg-white px-4 py-2 rounded-full text-xs hover:bg-meta-burgundy hover:text-white transition-colors">Lavanda</button>
                    <button onClick={() => setQuery("Vela")} className="bg-white px-4 py-2 rounded-full text-xs hover:bg-meta-burgundy hover:text-white transition-colors">Velas</button>
                    <button onClick={() => setQuery("Jabón")} className="bg-white px-4 py-2 rounded-full text-xs hover:bg-meta-burgundy hover:text-white transition-colors">Jabones</button>
                    <button onClick={() => setQuery("Cítrico")} className="bg-white px-4 py-2 rounded-full text-xs hover:bg-meta-burgundy hover:text-white transition-colors">Cítrico</button>
                </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SearchOverlay;