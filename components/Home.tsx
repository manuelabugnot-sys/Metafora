import React from 'react';
import Hero from './Hero';
import ProductCard from './ProductCard';
import { Product, ProductCategory } from '../types';
import { Truck, ShieldCheck, CreditCard, ChevronRight, Flower2, Trees, Grape } from 'lucide-react';

interface HomeProps {
  products: Product[];
  addToCart: (product: Product) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const SeeMoreCard = () => (
  <div className="min-w-[200px] flex flex-col items-center justify-center bg-white rounded-t-[100px] border border-meta-gold/10 hover:bg-meta-gold/5 transition-colors cursor-pointer group snap-center h-full min-h-[400px]">
      <div className="w-16 h-16 rounded-full bg-meta-cream flex items-center justify-center text-meta-burgundy mb-4 group-hover:scale-110 transition-transform shadow-sm">
          <ChevronRight size={24} />
      </div>
      <span className="font-display text-meta-burgundy font-bold text-lg">Ver Toda</span>
      <span className="font-serif text-meta-gold italic text-sm">La Colección</span>
  </div>
);

const Home: React.FC<HomeProps> = ({ products, addToCart, favorites, toggleFavorite }) => {
  // Separate products by category
  const candles = products.filter(p => p.category === ProductCategory.CANDLE);
  const soaps = products.filter(p => p.category === ProductCategory.SOAP);
  const diffusers = products.filter(p => p.category === ProductCategory.DIFFUSER);

  return (
    <>
      <Hero />

      {/* Trust/Service Banner */}
      <div className="bg-white border-b border-meta-gold/10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            
            {/* Shipping */}
            <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start group">
              <div className="p-3 bg-meta-cream rounded-full text-meta-burgundy group-hover:bg-meta-burgundy group-hover:text-white transition-colors duration-300">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-meta-dark tracking-wider">ENVÍOS A TODO EL PAÍS</h3>
                <p className="font-sans text-xs text-gray-500 mt-1">Llevamos la esencia de Metáfora a cada rincón de México.</p>
              </div>
            </div>

            {/* Security */}
            <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start group">
               <div className="p-3 bg-meta-cream rounded-full text-meta-burgundy group-hover:bg-meta-burgundy group-hover:text-white transition-colors duration-300">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-meta-dark tracking-wider">COMPRA SEGURA</h3>
                <p className="font-sans text-xs text-gray-500 mt-1">Pagos protegidos y garantía de satisfacción en cada pedido.</p>
              </div>
            </div>

            {/* Payment */}
            <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start group">
               <div className="p-3 bg-meta-cream rounded-full text-meta-burgundy group-hover:bg-meta-burgundy group-hover:text-white transition-colors duration-300">
                <CreditCard size={24} />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-meta-dark tracking-wider">PAGO FLEXIBLE</h3>
                <p className="font-sans text-xs text-gray-500 mt-1">Aceptamos todas las tarjetas y métodos de pago digitales.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div id="shop" className="max-w-[100vw] overflow-hidden py-16 space-y-24">
        
        {/* Candles Section */}
        <section id="candles" className="scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 text-center mb-12">
            <span className="text-meta-gold font-bold uppercase tracking-widest text-xs mb-3 block">Hecho a Mano</span>
            <h2 className="font-display text-3xl md:text-4xl text-meta-dark">Velas Aromáticas</h2>
            <div className="w-24 h-0.5 bg-meta-gold/30 mx-auto mt-6"></div>
          </div>

          <div className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-12 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-meta-gold/20 scrollbar-track-transparent items-stretch">
            {candles.map(product => (
              <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-center">
                  <ProductCard 
                      product={product} 
                      onAddToCart={addToCart}
                      isFavorite={favorites.includes(product.id)}
                      toggleFavorite={toggleFavorite}
                  />
              </div>
            ))}
            <SeeMoreCard />
          </div>
        </section>

        {/* Soaps Section */}
        <section id="soaps" className="scroll-mt-24 bg-meta-cream/30 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center mb-12">
            <span className="text-meta-gold font-bold uppercase tracking-widest text-xs mb-3 block">Cuidado Natural</span>
            <h2 className="font-display text-3xl md:text-4xl text-meta-dark">Jabones Artesanales</h2>
            <div className="w-24 h-0.5 bg-meta-gold/30 mx-auto mt-6"></div>
          </div>

          <div className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-12 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-meta-gold/20 scrollbar-track-transparent items-stretch">
            {soaps.map(product => (
              <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-center">
                  <ProductCard 
                      product={product} 
                      onAddToCart={addToCart}
                      isFavorite={favorites.includes(product.id)}
                      toggleFavorite={toggleFavorite}
                  />
              </div>
            ))}
            <SeeMoreCard />
          </div>
        </section>

        {/* Diffusers Section */}
        <section id="diffusers" className="scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 text-center mb-12">
            <span className="text-meta-gold font-bold uppercase tracking-widest text-xs mb-3 block">Ambiente Continuo</span>
            <h2 className="font-display text-3xl md:text-4xl text-meta-dark">Aromatizadores</h2>
            <div className="w-24 h-0.5 bg-meta-gold/30 mx-auto mt-6"></div>
          </div>

          <div className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-12 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-meta-gold/20 scrollbar-track-transparent items-stretch">
            {diffusers.map(product => (
              <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-center">
                  <ProductCard 
                      product={product} 
                      onAddToCart={addToCart}
                      isFavorite={favorites.includes(product.id)}
                      toggleFavorite={toggleFavorite}
                  />
              </div>
            ))}
            <SeeMoreCard />
          </div>
        </section>

      </div>

      {/* Ingredientes Section */}
      <section id="ingredients" className="bg-meta-softgray py-20 px-4 scroll-mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-meta-gold font-bold uppercase tracking-widest text-xs mb-3 block">Nuestra Trilogía</span>
          <h2 className="font-display text-3xl md:text-4xl text-meta-dark mb-12">Perfiles Olfativos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Floral */}
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-meta-cream rounded-full flex items-center justify-center mx-auto mb-4 text-meta-burgundy group-hover:bg-meta-burgundy group-hover:text-white transition-colors duration-300">
                <Flower2 size={24} />
              </div>
              <h3 className="font-serif text-xl text-meta-dark mb-2">Floral</h3>
              <p className="text-gray-600 text-sm">La elegancia de los valles silvestres y la serenidad de la lavanda en cada suspiro.</p>
            </div>
            
            {/* Frutal */}
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-meta-cream rounded-full flex items-center justify-center mx-auto mb-4 text-meta-burgundy group-hover:bg-meta-burgundy group-hover:text-white transition-colors duration-300">
                <Grape size={24} />
              </div>
              <h3 className="font-serif text-xl text-meta-dark mb-2">Frutal</h3>
              <p className="text-gray-600 text-sm">La frescura vibrante de la cosecha local, aportando energía y luz a tus espacios.</p>
            </div>

            {/* Madera */}
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-meta-cream rounded-full flex items-center justify-center mx-auto mb-4 text-meta-burgundy group-hover:bg-meta-burgundy group-hover:text-white transition-colors duration-300">
                <Trees size={24} />
              </div>
              <h3 className="font-serif text-xl text-meta-dark mb-2">Madera</h3>
              <p className="text-gray-600 text-sm">La calidez profunda y ancestral de la madera para crear un refugio acogedor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestra Historia Section */}
      <section id="about" className="bg-meta-lavender/30 py-20 px-4 scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 bg-meta-cream rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <span className="font-serif text-2xl text-meta-gold">M</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl text-meta-dark">Nuestra Historia</h2>
          
          <div className="font-serif text-lg md:text-xl text-meta-burgundy/80 italic max-w-2xl mx-auto">
            "Creando armonía entre la naturaleza y el hogar."
          </div>

          <div className="font-sans text-gray-600 leading-loose text-base md:text-lg space-y-6 text-justify md:text-center px-4 md:px-12">
            <p>
              Metáfora nació de un deseo simple: capturar la esencia de la naturaleza y llevarla a la intimidad de tu hogar. Sin embargo, nuestra verdadera inspiración floreció en los campos de <span className="text-meta-burgundy font-serif italic">lavanda</span> y en la serenidad de <span className="text-meta-burgundy font-serif italic">las sierras</span>. Esta flor noble y los paisajes de altura se convirtieron en nuestro emblema.
            </p>
            <p>
              Para nosotros, el aroma es un viaje. Por eso, hemos incorporado la pureza de las sierras en nuestras creaciones, combinando lo <span className="font-bold text-meta-gold">floral</span> de los valles silvestres, la frescura <span className="font-bold text-meta-gold">frutal</span> de la cosecha local y la calidez de la <span className="font-bold text-meta-gold">madera</span> antigua. Esta trinidad olfativa busca no solo relajar, sino transportar tus sentidos a un refugio natural lejos del ruido cotidiano.
            </p>
            <p>
              Nos enorgullece mantener un proceso 100% artesanal, honrando a nuestra musa floral y montañosa. Seleccionamos meticulosamente ingredientes orgánicos, ceras naturales y esencias aromáticas de alta calidad. Creemos que el verdadero lujo reside en la pureza y en el tiempo dedicado a cada detalle, en todos nuestros productos.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;