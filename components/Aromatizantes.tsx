import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product, ProductCategory } from '../types';

interface AromatizantesProps {
  products: Product[];
  addToCart: (product: Product) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const Aromatizantes: React.FC<AromatizantesProps> = ({ products, addToCart, favorites, toggleFavorite }) => {
  // Filter for Diffusers
  const diffusers = products.filter(p => p.category === ProductCategory.DIFFUSER);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-12 pb-24 bg-meta-cream/30">
      
      {/* Header */}
      <div className="relative py-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-meta-lavender/10 -z-10"></div>
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-meta-gold font-bold uppercase tracking-widest text-xs mb-3 block animate-fade-in-up">Colección Especial</span>
          <h1 className="font-display text-4xl md:text-6xl text-meta-dark mb-6 animate-fade-in-up">Aromatizadores & Difusores</h1>
          <p className="font-serif text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up leading-relaxed">
            Transforma la atmósfera de cada habitación con nuestras fragancias continuas. Diseñados para perdurar y decorar.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
            {diffusers.map(product => (
            <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
                isFavorite={favorites.includes(product.id)}
                toggleFavorite={toggleFavorite}
            />
            ))}
        </div>

        {diffusers.length === 0 && (
            <div className="text-center py-20">
                <p className="text-gray-500 font-serif italic">Próximamente...</p>
            </div>
        )}
      </div>

      {/* Usage Tips */}
      <div className="max-w-4xl mx-auto px-4 mt-24">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-meta-gold/10">
            <h3 className="font-display text-2xl text-meta-dark mb-6 text-center">Rituales de Aroma</h3>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600">
                <div className="space-y-2">
                    <h4 className="font-bold text-meta-terracotta uppercase tracking-wider text-xs">Difusores de Varitas</h4>
                    <p>Para una difusión constante, voltea las varitas una vez a la semana. Ideales para baños y recibidores donde buscas una bienvenida olfativa suave pero presente.</p>
                </div>
                <div className="space-y-2">
                    <h4 className="font-bold text-meta-terracotta uppercase tracking-wider text-xs">Sprays de Ambiente</h4>
                    <p>Úsalos para refrescar textiles (a distancia prudente) o para cambiar instantáneamente la energía de una habitación antes de meditar o recibir invitados.</p>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Aromatizantes;