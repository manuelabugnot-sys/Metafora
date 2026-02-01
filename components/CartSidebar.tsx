import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, Truck, MapPin, Store, ChevronRight, Loader2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, updateQuantity, removeItem }) => {
  const [zipCode, setZipCode] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [shippingRates, setShippingRates] = useState<{ caba: number; sanLuis: number } | null>(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const calculateShipping = () => {
    if (!zipCode || zipCode.length < 4) return;

    setIsCalculating(true);
    setShippingRates(null);

    // Simulation of API call
    setTimeout(() => {
      const cp = parseInt(zipCode.replace(/\D/g, '')) || 1000;
      
      // Mock logic: 
      // CABA base CP ~1000-1400.
      // San Luis base CP ~5700.
      // Base cost $2500 + distance factor.
      
      const distCaba = Math.abs(cp - 1000);
      const distSL = Math.abs(cp - 5700);

      // Simple algorithmic cost (Not real rates, just simulation)
      const costCaba = 3500 + (distCaba * 0.8);
      const costSL = 3200 + (distSL * 0.8);

      setShippingRates({
        caba: Math.round(costCaba / 100) * 100, // Round to nearest 100
        sanLuis: Math.round(costSL / 100) * 100
      });
      setIsCalculating(false);
    }, 1000);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-meta-dark/20 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-meta-cream z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-6 border-b border-meta-gold/20 flex justify-between items-center bg-white">
            <h2 className="font-display text-xl text-meta-burgundy">Tu Selección</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-meta-burgundy">
              <X size={24} />
            </button>
          </div>

          {/* Items Container - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {/* Products List */}
            <div className="p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <span className="text-meta-gold opacity-50 text-6xl font-serif italic">Vacío</span>
                  <p className="text-gray-500 font-sans">Tu cesta está esperando algo especial.</p>
                  <button onClick={onClose} className="mt-4 text-meta-burgundy underline font-serif">Continuar Comprando</button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-meta-dark">{item.name}</h3>
                        <p className="text-xs text-gray-500 font-sans">{item.category}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-gray-400 hover:text-meta-burgundy disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-gray-400 hover:text-meta-burgundy"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-serif italic text-meta-burgundy">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-400 self-start"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Shipping & Pickup Calculator */}
            {cart.length > 0 && (
              <div className="px-6 py-6 bg-white border-t border-meta-gold/10">
                <div className="mb-4">
                  <h3 className="font-display text-sm text-meta-dark uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Truck size={16} className="text-meta-gold" />
                    Envío y Retiro
                  </h3>
                  
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Tu Código Postal (ej. 1425)"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="flex-1 bg-meta-cream border border-gray-200 p-2 text-sm rounded-sm focus:outline-none focus:border-meta-gold font-sans"
                    />
                    <button 
                      onClick={calculateShipping}
                      disabled={isCalculating || !zipCode}
                      className="bg-meta-dark text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-meta-gold transition-colors disabled:opacity-50"
                    >
                      {isCalculating ? <Loader2 size={16} className="animate-spin" /> : 'Calcular'}
                    </button>
                  </div>
                </div>

                {/* Shipping Results */}
                {shippingRates && (
                  <div className="space-y-3 animate-fade-in-up">
                    <div className="bg-meta-softgray/50 p-3 rounded-md border border-gray-100">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-meta-dark flex items-center gap-2">
                          <MapPin size={14} className="text-meta-gold" />
                          Desde CABA
                        </span>
                        <span className="text-sm font-serif italic text-meta-burgundy">${shippingRates.caba}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 pl-6">Envío estándar a domicilio</p>
                    </div>

                    <div className="bg-meta-softgray/50 p-3 rounded-md border border-gray-100">
                      <div className="flex justify-between items-center mb-1">
                         <span className="text-sm font-bold text-meta-dark flex items-center gap-2">
                          <MapPin size={14} className="text-meta-gold" />
                          Desde San Luis
                        </span>
                        <span className="text-sm font-serif italic text-meta-burgundy">${shippingRates.sanLuis}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 pl-6">Envío estándar a domicilio</p>
                    </div>
                  </div>
                )}

                {/* Pickup Options (Always visible or after calculation) */}
                <div className="mt-4 space-y-2">
                   <div className="flex justify-between items-start border-l-2 border-green-700 pl-3 py-1">
                      <div>
                        <span className="text-xs font-bold text-meta-dark block flex items-center gap-1">
                           <Store size={12} /> Retiro en Tienda (CABA)
                        </span>
                        <span className="text-[10px] text-gray-500">Palermo Soho, Lun-Sab 10-20hs</span>
                      </div>
                      <span className="text-xs font-bold text-green-700 uppercase">Gratis</span>
                   </div>
                   <div className="flex justify-between items-start border-l-2 border-green-700 pl-3 py-1">
                      <div>
                        <span className="text-xs font-bold text-meta-dark block flex items-center gap-1">
                           <Store size={12} /> Retiro en Tienda (San Luis)
                        </span>
                        <span className="text-[10px] text-gray-500">Merlo, Lun-Vie 9-17hs</span>
                      </div>
                      <span className="text-xs font-bold text-green-700 uppercase">Gratis</span>
                   </div>
                </div>

              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-meta-gold/20 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-4">
                <span className="font-sans text-sm uppercase tracking-wider text-gray-500">Subtotal</span>
                <span className="font-display text-2xl text-meta-dark">${total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400 mb-4 text-center">Impuestos incluidos. El envío se selecciona en el siguiente paso.</p>
              <button className="w-full bg-meta-burgundy text-white py-4 font-sans uppercase tracking-widest text-xs font-bold hover:bg-meta-gold transition-colors shadow-lg flex items-center justify-center gap-2 group">
                Iniciar Pago <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;