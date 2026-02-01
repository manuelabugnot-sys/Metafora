import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Heart, Share2, X, Copy, Check, Facebook, Twitter, Linkedin, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isFavorite, toggleFavorite }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();

  // Simulating a real product URL structure
  const shareUrl = `${window.location.origin}/product/${product.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleSocialShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    const text = `Descubre ${product.name} en Metáfora`;
    let url = '';

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <div 
        id={`product-${product.id}`}
        className="group relative flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 rounded-t-[100px] rounded-b-none border border-meta-gold/10 pb-6 scroll-mt-32"
      >
        
        {/* Image container with specific shape */}
        <div 
          className="relative w-full h-80 overflow-hidden rounded-t-[100px] bg-gray-100 cursor-pointer"
          onClick={handleViewProduct}
        >
          <div 
              className="absolute inset-0 bg-opacity-20 transition-colors duration-300 group-hover:bg-opacity-0"
              style={{ backgroundColor: product.hexColor }}
          ></div>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Share Button (Top Right - Left of Heart) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsShareOpen(true);
            }}
            className="absolute top-4 right-14 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-all duration-300 z-10 mr-2"
            title="Compartir"
          >
            <Share2 
              size={18} 
              className="text-gray-400 hover:text-meta-gold transition-colors duration-300" 
            />
          </button>

          {/* Favorite Button (Top Right) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-all duration-300 z-10"
            title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <Heart 
              size={18} 
              className={`transition-colors duration-300 ${isFavorite ? 'fill-meta-burgundy text-meta-burgundy' : 'text-gray-400 hover:text-meta-burgundy'}`} 
            />
          </button>
          
          {/* Action Buttons Container */}
          <div className="absolute bottom-4 right-4 flex gap-2 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
             {/* View Details Button */}
             <button 
              onClick={(e) => {
                e.stopPropagation();
                handleViewProduct();
              }}
              className="bg-white text-meta-dark p-3 rounded-full shadow-md hover:bg-meta-gold hover:text-white transition-all duration-300"
              title="Ver Producto"
            >
              <Eye size={20} />
            </button>

            {/* Quick Add Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="bg-white text-meta-burgundy p-3 rounded-full shadow-md hover:bg-meta-burgundy hover:text-white transition-all duration-300"
              title="Añadir al carrito"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="px-6 pt-6 text-center flex-grow flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-meta-gold mb-2 block">
              {product.category}
            </span>
            <h3 
              onClick={handleViewProduct}
              className="font-serif text-2xl text-meta-dark mb-2 group-hover:text-meta-burgundy transition-colors cursor-pointer"
            >
              {product.name}
            </h3>
            <p className="font-sans text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
              {product.description}
            </p>
          </div>
          
          <div className="mt-2 border-t border-gray-100 pt-4">
            <span className="font-serif italic text-lg text-meta-dark">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-meta-dark/40 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setIsShareOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm relative border border-meta-gold/20"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsShareOpen(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-meta-burgundy transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <span className="text-meta-gold font-bold uppercase tracking-widest text-[10px] mb-2 block">Compartir</span>
              <h3 className="font-display text-xl text-meta-dark">{product.name}</h3>
            </div>

            {/* Copy Link Section */}
            <div className="flex items-center gap-2 bg-meta-cream/50 p-3 rounded-lg border border-meta-gold/10 mb-8">
               <span className="text-xs text-gray-500 truncate flex-1 font-sans selection:bg-meta-gold selection:text-white">
                 {shareUrl}
               </span>
               <button 
                 onClick={handleCopy} 
                 className="p-2 bg-white rounded-md shadow-sm hover:text-meta-gold transition-colors text-meta-dark"
                 title="Copiar enlace"
               >
                  {isCopied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
               </button>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-8 border-t border-gray-100 pt-6">
              <button onClick={() => handleSocialShare('facebook')} className="group flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 group-hover:border-blue-600 group-hover:text-blue-600 transition-all duration-300">
                   <Facebook size={18} />
                </div>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-blue-600">Post</span>
              </button>

              <button onClick={() => handleSocialShare('twitter')} className="group flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 group-hover:border-sky-500 group-hover:text-sky-500 transition-all duration-300">
                   <Twitter size={18} />
                </div>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-sky-500">Tweet</span>
              </button>

              <button onClick={() => handleSocialShare('linkedin')} className="group flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 group-hover:border-indigo-600 group-hover:text-indigo-600 transition-all duration-300">
                   <Linkedin size={18} />
                </div>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-indigo-600">Share</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;