import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[600px] overflow-hidden flex items-center justify-center">
      {/* Background Gradient simulating the fabric texture from the prompt */}
      <div className="absolute inset-0 bg-gradient-to-br from-meta-lavender via-meta-cream to-meta-rose opacity-80"></div>
      
      {/* Decorative Overlay simulating sheen */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] opacity-10 mix-blend-overlay"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Logo Container - Clean and Centered */}
        <div className="relative mb-8 group flex flex-col items-center justify-center">
            {/* Ambient Halo (Volume of light behind) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-white/60 blur-[60px] rounded-full pointer-events-none"></div>
            
            {/* Brand Text - Changed to Gold as requested */}
            <h1 className="relative z-10 font-display text-5xl md:text-7xl lg:text-8xl font-bold text-meta-gold tracking-[0.2em] animate-fade-in-up drop-shadow-sm text-center">
              METÁFORA
            </h1>
            
            {/* Subtitle - Swapped to Burgundy for contrast */}
            <span className="relative z-10 font-sans text-xs md:text-sm tracking-[0.4em] text-meta-burgundy mt-6 uppercase animate-fade-in-up animation-delay-200">
              Artisan Home Fragrances
            </span>
        </div>
        
        <p className="font-serif italic text-xl md:text-2xl text-meta-burgundy/80 mb-10 max-w-2xl mx-auto drop-shadow-sm relative z-10 leading-relaxed">
          "Iluminando momentos, limpiando el alma."
        </p>

        <a 
          href="#candles"
          className="relative z-10 bg-meta-burgundy text-white px-10 py-4 font-sans uppercase tracking-widest text-xs font-bold hover:bg-meta-gold transition-colors duration-300 rounded-sm shadow-lg hover:shadow-xl"
        >
          Descubrir Colección
        </a>
      </div>
    </section>
  );
};

export default Hero;