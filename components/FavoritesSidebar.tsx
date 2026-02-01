import React from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface FavoritesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Product[];
  removeFavorite: (id: string) => void;
  moveToCart: (product: Product) => void;
}

const FavoritesSidebar: React.FC<FavoritesSidebarProps> = ({ isOpen, onClose, favorites, removeFavorite, moveToCart }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-meta-dark/20 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-meta-cream z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-6 border-b border-meta-gold/20 flex justify-between items-center bg-white">
            <h2 className="font-display text-xl text-meta-burgundy">Mis Favoritos</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-meta-burgundy">
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {favorites.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <span className="text-meta-gold opacity-50 text-6xl font-serif italic">♡</span>
                <p className="text-gray-500 font-sans">Guarda tus aromas preferidos aquí.</p>
                <button onClick={onClose} className="mt-4 text-meta-burgundy underline font-serif">Explorar Colección</button>
              </div>
            ) : (
              favorites.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-20 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-serif text-meta-dark text-lg leading-tight">{item.name}</h3>
                      <p className="text-xs text-gray-500 font-sans mt-1">{item.category}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="font-serif italic text-meta-burgundy">${item.price.toFixed(2)}</span>
                      
                      <div className="flex gap-2">
                        <button 
                            onClick={() => removeFavorite(item.id)}
                            className="p-2 text-gray-300 hover:text-red-400 transition-colors"
                            title="Eliminar"
                        >
                            <Trash2 size={16} />
                        </button>
                        <button 
                            onClick={() => moveToCart(item)}
                            className="bg-meta-gold text-white p-2 rounded-full hover:bg-meta-burgundy transition-colors shadow-sm"
                            title="Mover al carrito"
                        >
                            <ShoppingBag size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoritesSidebar;