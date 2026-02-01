import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ArrowLeft, Minus, Plus, Heart, Share2, Truck, ShieldCheck, Star } from 'lucide-react';

interface ProductDetailProps {
  products: Product[];
  addToCart: (product: Product) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products, addToCart, favorites, toggleFavorite }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-meta-cream text-meta-dark">
        <h2 className="font-display text-2xl mb-4">Producto no encontrado</h2>
        <button onClick={() => navigate('/')} className="text-meta-burgundy hover:underline">
          Volver al inicio
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add logic to add multiple items if needed, for now we assume the main addToCart handles +1
    // Ideally update context to accept quantity, but we will loop for now or just add one.
    // For this implementation, we just trigger the existing add function 'quantity' times or update logic.
    // To keep it simple with existing props:
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
    // Reset or show feedback
  };

  const isFav = favorites.includes(product.id);

  return (
    <div className="min-h-screen bg-meta-cream pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-500 hover:text-meta-burgundy transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-serif italic">Volver</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left: Image */}
          <div className="relative animate-fade-in-up">
            <div className="aspect-[4/5] rounded-t-[200px] rounded-b-2xl overflow-hidden shadow-xl bg-white relative z-10">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none"
                style={{ backgroundColor: product.hexColor }}
              ></div>
            </div>
            
            {/* Decorative Element behind */}
            <div className="absolute top-10 -left-10 w-full h-full border-2 border-meta-gold/20 rounded-t-[200px] rounded-b-2xl -z-0 hidden md:block"></div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-center animate-fade-in-up animation-delay-200">
            <span className="text-meta-gold font-bold uppercase tracking-widest text-xs mb-4">{product.category}</span>
            <h1 className="font-display text-4xl md:text-5xl text-meta-dark mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="font-serif text-3xl text-meta-burgundy">${product.price.toFixed(2)}</span>
              <div className="flex items-center text-yellow-500 text-xs gap-1">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <span className="text-gray-400 ml-2 font-sans">(24 Reseñas)</span>
              </div>
            </div>

            <p className="font-sans text-gray-600 leading-loose text-lg mb-8 border-b border-meta-gold/10 pb-8">
              {product.description}
            </p>

            {/* Scent Profile */}
            <div className="mb-8">
              <h3 className="font-display text-sm text-meta-dark mb-3">Perfil Olfativo</h3>
              <div className="flex flex-wrap gap-2">
                {product.scentProfile.split(', ').map((note, index) => (
                  <span key={index} className="bg-white border border-meta-gold/30 px-4 py-2 rounded-full text-sm text-gray-600 font-serif italic">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
               {/* Quantity */}
               <div className="flex items-center border border-gray-300 rounded-full w-max bg-white">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4 text-gray-400 hover:text-meta-burgundy transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-meta-dark">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-4 text-gray-400 hover:text-meta-burgundy transition-colors"
                  >
                    <Plus size={16} />
                  </button>
               </div>

               {/* Add Button */}
               <button 
                onClick={handleAddToCart}
                className="flex-1 bg-meta-burgundy text-white py-4 px-8 rounded-full font-sans uppercase tracking-widest text-xs font-bold hover:bg-meta-gold transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
               >
                 Añadir al Carrito - ${(product.price * quantity).toFixed(2)}
               </button>

               {/* Favorite */}
               <button 
                onClick={() => toggleFavorite(product.id)}
                className={`p-4 rounded-full border transition-all ${isFav ? 'bg-meta-rose border-meta-rose text-white' : 'border-gray-300 text-gray-400 hover:border-meta-rose hover:text-meta-rose'}`}
               >
                 <Heart size={20} fill={isFav ? "currentColor" : "none"} />
               </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 font-sans bg-white/50 p-4 rounded-xl border border-meta-gold/10">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-meta-gold" />
                <span>Envío gratis desde $50.000</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-meta-gold" />
                <span>Garantía de calidad artesanal</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;