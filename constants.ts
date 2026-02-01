import { Product, ProductCategory } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Niebla de Lavanda',
    description: 'Una mezcla relajante de lavanda francesa y manzanilla para calmar la mente.',
    price: 28.00,
    category: ProductCategory.CANDLE,
    image: 'https://images.unsplash.com/photo-1603006905393-c75693026338?auto=format&fit=crop&q=80&w=800', // Lavender Candle
    scentProfile: 'Floral, Herbal, Calmante',
    hexColor: '#E6D7E5'
  },
  {
    id: '2',
    name: 'Resplandor Oro Rosa',
    description: 'Pétalos de rosa elegantes con un toque de champán espumoso y almizcle.',
    price: 32.00,
    category: ProductCategory.CANDLE,
    image: 'https://images.unsplash.com/photo-1563823485-61c16f272a51?auto=format&fit=crop&q=80&w=800', // Elegant Pink Candle
    scentProfile: 'Floral, Dulce, Lujoso',
    hexColor: '#E0B0A8'
  },
  {
    id: '10',
    name: 'Jardín de Peonías',
    description: 'Floración primaveral con notas de peonía rosa, cuero suave y madera.',
    price: 30.00,
    category: ProductCategory.CANDLE,
    image: 'https://images.unsplash.com/photo-1602825700859-96860a69a57e?auto=format&fit=crop&q=80&w=800', // Peony Candle
    scentProfile: 'Floral, Fresco, Romántico',
    hexColor: '#F4C2C2'
  },
  {
    id: '3',
    name: 'Pino del Bosque Profundo',
    description: 'Notas de abeto balsámico, madera de cedro y musgo terroso.',
    price: 26.00,
    category: ProductCategory.SOAP,
    image: 'https://images.unsplash.com/photo-1607006411520-2c70a8d41333?auto=format&fit=crop&q=80&w=800', // Green Soap Bars
    scentProfile: 'Amaderado, Terroso, Fresco',
    hexColor: '#A3B18A'
  },
  {
    id: '4',
    name: 'Burbujas de Champán',
    description: 'Notas cítricas efervescentes con un final cremoso de vainilla.',
    price: 18.00,
    category: ProductCategory.SOAP,
    image: 'https://images.unsplash.com/photo-1600857062255-b4618e47852a?auto=format&fit=crop&q=80&w=800', // Creamy Soap Stack
    scentProfile: 'Cítrico, Dulce, Burbujeante',
    hexColor: '#F2E8CF'
  },
  {
    id: '11',
    name: 'Avena y Miel',
    description: 'Exfoliación suave con avena orgánica y miel pura para pieles sensibles.',
    price: 16.00,
    category: ProductCategory.SOAP,
    image: 'https://images.unsplash.com/photo-1610450917637-4d76b9f2963b?auto=format&fit=crop&q=80&w=800', // Oatmeal Soap
    scentProfile: 'Dulce, Reconfortante, Suave',
    hexColor: '#EADDCA'
  },
  {
    id: '5',
    name: 'Ámbar de Medianoche',
    description: 'Ámbar rico, sándalo y un toque de especia misteriosa.',
    price: 34.00,
    category: ProductCategory.CANDLE,
    image: 'https://images.unsplash.com/photo-1608181114410-db2dc4494513?auto=format&fit=crop&q=80&w=800', // Dark Moody Candle
    scentProfile: 'Especiado, Cálido, Intenso',
    hexColor: '#B89F7D'
  },
  {
    id: '6',
    name: 'Sal Marina y Orquídea',
    description: 'Brisa limpia del océano mezclada con suaves notas florales de orquídea.',
    price: 22.00,
    category: ProductCategory.SOAP,
    image: 'https://images.unsplash.com/photo-1596435010996-2612662c5750?auto=format&fit=crop&q=80&w=800', // White/Blue Soap
    scentProfile: 'Fresco, Acuático, Floral',
    hexColor: '#BFD7EA'
  },
  {
    id: '7',
    name: 'Difusor Zen Cerámica',
    description: 'Difusor ultrasónico de cerámica blanca mate con luz cálida ambiental.',
    price: 85.00,
    category: ProductCategory.DIFFUSER,
    image: 'https://images.unsplash.com/photo-1608528577891-955c4d0b171c?auto=format&fit=crop&q=80&w=800', // Ceramic Diffuser / Oils
    scentProfile: 'Neutro, Decorativo, Relajante',
    hexColor: '#F5F5F5'
  },
  {
    id: '8',
    name: 'Spray Lino Fresco',
    description: 'Spray ambiental instantáneo con notas de algodón limpio, lavanda y limón.',
    price: 24.00,
    category: ProductCategory.DIFFUSER,
    image: 'https://images.unsplash.com/photo-1628163013233-0304a0857f35?auto=format&fit=crop&q=80&w=800', // Spray Bottle
    scentProfile: 'Limpio, Cítrico, Aireado',
    hexColor: '#D4E2E8'
  },
  {
    id: '9',
    name: 'Varitas Bambú & Té Blanco',
    description: 'Difusor de varitas (reeds) de larga duración con esencia de té blanco.',
    price: 45.00,
    category: ProductCategory.DIFFUSER,
    image: 'https://images.unsplash.com/photo-1615485925694-a03144d27bd6?auto=format&fit=crop&q=80&w=800', // Reed Diffuser
    scentProfile: 'Herbal, Suave, Elegante',
    hexColor: '#C8C6AF'
  },
  {
    id: '12',
    name: 'Bruma de Té Verde',
    description: 'Energía renovada con hojas de té verde, bergamota y jazmín.',
    price: 38.00,
    category: ProductCategory.DIFFUSER,
    image: 'https://images.unsplash.com/photo-1595350356501-72f53d348a4c?auto=format&fit=crop&q=80&w=800', // Green Tea Diffuser
    scentProfile: 'Herbal, Zen, Vigorizante',
    hexColor: '#C1E1C1'
  }
];