import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Aromatizantes from './components/Aromatizantes';
import ProductDetail from './components/ProductDetail';
import CartSidebar from './components/CartSidebar';
import FavoritesSidebar from './components/FavoritesSidebar';
import SearchOverlay from './components/SearchOverlay';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { MapPin, Phone, ChevronRight, Truck, Instagram, X } from 'lucide-react';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Initialize from local storage if available
    const saved = localStorage.getItem('metafora_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const navigate = useNavigate();

  // Save favorites to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('metafora_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const moveToCart = (product: Product) => {
    addToCart(product);
  };

  // Logic to handle navigating from Search Overlay to specific product
  const handleProductNavigation = (productId: string) => {
    setIsSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Get full product objects for favorites
  const favoriteProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-meta-rose selection:text-meta-burgundy">
      
      <Navbar 
        cartCount={cartCount} 
        favoritesCount={favorites.length}
        toggleCart={() => setIsCartOpen(true)} 
        toggleFavorites={() => setIsFavoritesOpen(true)}
        toggleSearch={() => setIsSearchOpen(true)}
      />
      
      <main className="flex-grow">
        <Routes>
            <Route path="/" element={
                <Home 
                    products={PRODUCTS}
                    addToCart={addToCart}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                />
            } />
            <Route path="/aromatizantes" element={
                <Aromatizantes 
                    products={PRODUCTS}
                    addToCart={addToCart}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                />
            } />
             <Route path="/product/:id" element={
                <ProductDetail 
                    products={PRODUCTS}
                    addToCart={addToCart}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                />
            } />
        </Routes>
      </main>

      <footer id="contact" className="bg-meta-dark text-white py-16 border-t-4 border-meta-gold">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-center md:text-left">
          
          {/* Col 1: Brand */}
          <div>
            {/* Logo with Halo/Shimmer Effect */}
            <div className="relative group inline-block cursor-pointer overflow-hidden rounded-lg mb-6 mx-auto md:mx-0">
              <img 
                src="./logo.png" 
                alt="Metáfora Logo" 
                className="h-28 w-auto object-contain opacity-95 transition-all duration-500 group-hover:opacity-100 drop-shadow-[0_0_10px_rgba(184,159,125,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(184,159,125,0.9)] group-hover:scale-105" 
              />
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-meta-gold to-transparent opacity-60 skew-x-[-25deg] group-hover:animate-shine pointer-events-none" />
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Trayendo luz y pureza a tu hogar a través de los mejores ingredientes de la naturaleza.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-display text-lg mb-6 text-meta-gold tracking-wider">Explorar</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="/#candles" className="hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start group">
                  <ChevronRight size={14} className="text-meta-gold group-hover:translate-x-1 transition-transform" />
                  Colecciones
                </a>
              </li>
              <li>
                <a href="/#about" className="hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start group">
                  <ChevronRight size={14} className="text-meta-gold group-hover:translate-x-1 transition-transform" />
                  Nuestra Historia
                </a>
              </li>
              <li>
                <a href="/#ingredients" className="hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start group">
                  <ChevronRight size={14} className="text-meta-gold group-hover:translate-x-1 transition-transform" />
                  Nuestros Ingredientes
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start group">
                  <ChevronRight size={14} className="text-meta-gold group-hover:translate-x-1 transition-transform" />
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Shipping Info (New) */}
          <div>
            <h4 className="font-display text-lg mb-6 text-meta-gold tracking-wider">Envíos</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <Truck size={18} className="text-meta-gold mt-1 shrink-0" />
                <span className="text-left">
                  Envíos a todo el país<br/>
                  <span className="text-xs opacity-70">República Argentina</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
             <h4 className="font-display text-lg mb-6 text-meta-gold tracking-wider">Contacto</h4>
             <ul className="space-y-4 text-sm text-gray-400">
               <li className="flex items-start gap-3 justify-center md:justify-start">
                 <MapPin size={18} className="text-meta-gold mt-1 shrink-0" />
                 <span>Merlo, San Luis<br/>CABA, Buenos Aires</span>
               </li>
               <li className="flex items-center gap-3 justify-center md:justify-start">
                 <Phone size={18} className="text-meta-gold shrink-0" />
                 <a href="tel:+5491167177759" className="hover:text-white transition-colors">+54 9 11 6717-7759</a>
               </li>
               <li className="flex items-center gap-3 justify-center md:justify-start">
                 <Instagram size={18} className="text-meta-gold shrink-0" />
                 <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@metaforaok</a>
               </li>
             </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <h4 className="font-display text-lg mb-6 text-meta-gold tracking-wider">Boletín</h4>
            <p className="text-xs text-gray-500 mb-4">Suscríbete para recibir ofertas exclusivas y novedades.</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Tu email..." className="bg-white/5 border border-white/10 p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-meta-gold transition-colors" />
              <button className="bg-meta-gold text-meta-dark font-bold uppercase text-xs py-3 px-4 hover:bg-white transition-colors tracking-widest">Suscribirse</button>
            </div>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-sans tracking-widest gap-4">
          <span>© 2026 METÁFORA. TODOS LOS DERECHOS RESERVADOS.</span>
          <div className="flex gap-4 flex-wrap justify-center">
             <a href="#" className="hover:text-meta-gold transition-colors">TÉRMINOS</a>
             <a href="#" className="hover:text-meta-gold transition-colors">PRIVACIDAD</a>
             <button onClick={() => setIsPolicyOpen(true)} className="hover:text-meta-gold transition-colors uppercase">CAMBIOS Y DEVOLUCIONES</button>
          </div>
        </div>
      </footer>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeFromCart}
      />

      <FavoritesSidebar
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoriteProducts}
        removeFavorite={toggleFavorite}
        moveToCart={moveToCart}
      />

      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onNavigate={handleProductNavigation}
      />

      {/* Returns & Exchanges Modal */}
      {isPolicyOpen && (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-meta-dark/60 backdrop-blur-sm animate-fade-in-up"
            onClick={() => setIsPolicyOpen(false)}
        >
            <div 
                className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative border border-meta-gold/20"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={() => setIsPolicyOpen(false)} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-meta-burgundy transition-colors"
                >
                    <X size={20} />
                </button>
                <h3 className="font-display text-xl text-meta-burgundy mb-4 tracking-wide border-b border-meta-gold/10 pb-4">
                    Cambios y Devoluciones
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed text-sm mb-6">
                    En el caso de necesitar cambiar un producto por rotura o falla, por favor contactanos para evaluar el caso al siguiente correo:
                </p>
                <div className="text-center bg-meta-cream/50 p-4 rounded-lg border border-meta-gold/10 hover:border-meta-gold/30 transition-colors">
                     <a href="mailto:hola@metafora.com" className="text-meta-burgundy font-serif italic text-lg hover:text-meta-gold transition-colors">
                        hola@metafora.com
                     </a>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}

export default App;