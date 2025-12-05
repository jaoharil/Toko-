export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  onPromotion?: boolean;
  discount?: number;
};

export const categories = ['Elektronik', 'Fashion', 'Makanan', 'Kesehatan'];

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone XYZ',
    description: 'Layar 6.5", RAM 8GB, Kamera 64MP',
    price: 3500000,
    category: 'Elektronik',
    image: '/images/phone.jpeg',
    rating: 4.5,
    reviews: 128,
    onPromotion: true,
    discount: 15,
  },
  {
    id: '2',
    name: 'Baju Kemeja Katun',
    description: 'Nyaman dipakai sehari-hari',
    price: 150000,
    category: 'Fashion',
    image: '/images/shrit.jpg',
    rating: 4.2,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Minyak Goreng 1L',
    description: '100% minyak kelapa sawit',
    price: 22000,
    category: 'Makanan',
    image: '/images/oil.jpg',
    rating: 4.0,
    reviews: 210,
    onPromotion: true,
    discount: 10,
  },
  {
    id: '4',
    name: 'Vitamin C 60 Tablet',
    description: 'Meningkatkan imun tubuh',
    price: 85000,
    category: 'Kesehatan',
    image: '/images/vitamin.jpeg',
    rating: 4.7,
    reviews: 320,
  },
  {
    id: '5',
    name: 'Laptop Gaming Pro',
    description: 'RTX 4060, i7-13700H, 16GB RAM',
    price: 18500000,
    category: 'Elektronik',
    image: '/images/laptop.jpeg',
    rating: 4.8,
    reviews: 75,
    onPromotion: true,
    discount: 8,
  },
];

export const getProductsByCategory = (category: string) => products.filter((p) => p.category === category);

export const getPromotions = () => products.filter((p) => p.onPromotion);
