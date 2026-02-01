import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  toggleCart: () => void;
  toggleFavorites: () => void;
  toggleSearch: () => void;
  favoritesCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, toggleCart, toggleFavorites, toggleSearch, favoritesCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileFavorites = () => {
    setIsMobileMenuOpen(false);
    toggleFavorites();
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-meta-cream/95 backdrop-blur-md border-b border-meta-gold/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Left: Menu button */}
          <div className="flex items-center w-1/3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-meta-burgundy hover:text-meta-gold transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Center: Brand Logo (Text Removed) */}
          <div className="flex justify-center w-1/3">
            <Link to="/" className="flex items-center justify-center group gap-3">
              <img 
                src="./logo.png" 
                alt="Metáfora Logo" 
                className="h-10 sm:h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Right: Icons (Search, Favorites, Cart) */}
          <div className="flex items-center justify-end space-x-2 sm:space-x-4 w-1/3">
            
            <button 
              onClick={toggleSearch}
              className="text-meta-dark hover:text-meta-gold transition-colors hidden sm:block" 
              title="Buscar"
            >
              <Search size={20} />
            </button>

            <button 
              onClick={toggleFavorites}
              className="text-meta-dark hover:text-meta-gold transition-colors hidden sm:block relative" 
              title="Favoritos"
            >
              <Heart size={20} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-meta-gold text-white text-[9px] font-bold h-3 w-3 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={toggleCart}
              className="text-meta-dark hover:text-meta-gold transition-colors relative pl-2"
              title="Carrito"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-meta-burgundy text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu - Visible on all screens when open */}
      {isMobileMenuOpen && (
        <div className="bg-meta-cream border-t border-meta-gold/20 absolute w-full shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            
            {/* Mobile Search Button */}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                toggleSearch();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-meta-dark font-serif hover:text-meta-gold transition-colors"
            >
              <Search size={16} />
              <span>Buscar</span>
            </button>

            {/* Collections Dropdown */}
            <div className="w-full max-w-xs text-center">
              <button 
                onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-meta-dark font-serif hover:text-meta-gold transition-colors"
              >
                <span>Colecciones</span>
                {isCollectionsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {isCollectionsOpen && (
                <div className="bg-meta-lavender/10 rounded-lg py-2 mb-2 animate-fade-in-up">
                  <a 
                    href="/#candles" 
                    onClick={handleLinkClick}
                    className="block px-3 py-2 text-sm text-meta-burgundy font-sans uppercase tracking-wider hover:bg-meta-gold/10"
                  >
                    Velas Aromáticas
                  </a>
                  <a 
                    href="/#soaps" 
                    onClick={handleLinkClick}
                    className="block px-3 py-2 text-sm text-meta-burgundy font-sans uppercase tracking-wider hover:bg-meta-gold/10"
                  >
                    Jabones Artesanales
                  </a>
                  <a 
                    href="/#diffusers" 
                    onClick={handleLinkClick}
                    className="block px-3 py-2 text-sm text-meta-burgundy font-sans uppercase tracking-wider hover:bg-meta-gold/10"
                  >
                    Aromatizadores
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Favorites Option */}
            <button 
              onClick={handleMobileFavorites}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-meta-dark font-serif hover:text-meta-gold transition-colors"
            >
              <span>Mis Favoritos</span>
              {favoritesCount > 0 && (
                <span className="bg-meta-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            <a 
              href="/#about" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-meta-dark font-serif hover:text-meta-gold transition-colors"
            >
              Nuestra Historia
            </a>
            
            <a 
              href="/#contact" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-meta-dark font-serif hover:text-meta-gold transition-colors"
            >
              Contacto
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;