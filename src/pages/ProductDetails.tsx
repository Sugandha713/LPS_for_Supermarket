import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailsComponent from '../components/ProductDetails';

// Sample products data - In a real app, this would come from an API
const products = {
  'm1': {
    id: 'm1',
    name: 'iPhone 15 Pro',
    price: 129999,
    rating: 4.7,
    reviews: 2834,
    brand: 'Apple',
    category: 'Mobiles',
    description: 'The most powerful iPhone ever with A17 Pro chip, titanium design, and advanced camera system.',
    images: [
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500&q=80',
      'https://images.unsplash.com/photo-1697644371824-41f1e7e9a140?w=500&q=80',
      'https://images.unsplash.com/photo-1697644371663-a11c895b844d?w=500&q=80'
    ],
    highlights: [
      'A17 Pro chip',
      'Titanium design',
      '48MP main camera',
      'USB-C connector',
      'All-day battery life'
    ],
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Processor': 'A17 Pro chip',
      'Storage': '256GB',
      'Camera': '48MP + 12MP + 12MP',
      'Battery': '3274 mAh'
    },
    variants: [
      { id: 1, name: '128GB', price: 129999 },
      { id: 2, name: '256GB', price: 139999 },
      { id: 3, name: '512GB', price: 159999 }
    ],
    colors: [
      { id: 1, name: 'Natural Titanium', code: '#E4E4E0' },
      { id: 2, name: 'Blue Titanium', code: '#394E6E' },
      { id: 3, name: 'White Titanium', code: '#F5F5F0' },
      { id: 4, name: 'Black Titanium', code: '#4A4A4A' }
    ]
  },
  'm2': {
    id: 'm2',
    name: 'Samsung Galaxy S24',
    price: 79999,
    rating: 4.5,
    reviews: 1523,
    brand: 'Samsung',
    category: 'Mobiles',
    description: 'Experience the next level of mobile innovation with Galaxy AI.',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80',
      'https://images.unsplash.com/photo-1678911820864-e5c67e784b30?w=500&q=80'
    ],
    highlights: [
      'Snapdragon 8 Gen 3',
      'AI-powered features',
      '50MP main camera',
      'Dynamic AMOLED 2X',
      '4000mAh battery'
    ],
    specifications: {
      'Display': '6.2-inch Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3',
      'Storage': '256GB',
      'Camera': '50MP + 12MP + 10MP',
      'Battery': '4000 mAh'
    },
    variants: [
      { id: 1, name: '128GB', price: 79999 },
      { id: 2, name: '256GB', price: 89999 }
    ],
    colors: [
      { id: 1, name: 'Phantom Black', code: '#000000' },
      { id: 2, name: 'Cream', code: '#F5E6D3' },
      { id: 3, name: 'Violet', code: '#A5B4FF' }
    ]
  },
  'l1': {
    id: 'l1',
    name: 'MacBook Air M2',
    price: 114999,
    rating: 4.8,
    reviews: 1245,
    brand: 'Apple',
    category: 'Laptops',
    description: 'Supercharged by M2 chip for breakthrough performance and up to 18 hours of battery life.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80'
    ],
    highlights: [
      'Apple M2 chip',
      'Up to 18 hours battery life',
      '13.6-inch Liquid Retina display',
      'MagSafe charging',
      '1080p FaceTime HD camera'
    ],
    specifications: {
      'Display': '13.6-inch Liquid Retina',
      'Processor': 'Apple M2',
      'Memory': '8GB unified memory',
      'Storage': '256GB SSD',
      'Battery': 'Up to 18 hours'
    },
    variants: [
      { id: 1, name: '256GB', price: 114999 },
      { id: 2, name: '512GB', price: 134999 }
    ],
    colors: [
      { id: 1, name: 'Space Gray', code: '#666666' },
      { id: 2, name: 'Silver', code: '#E3E3E3' },
      { id: 3, name: 'Starlight', code: '#F3E5DC' },
      { id: 4, name: 'Midnight', code: '#1E1E1E' }
    ]
  },
   w1: {
      id: 'w1',
      name: 'Rolex Submariner',
      price: 850000,
      rating: 4.9,
      reviews: 1203,
      brand: 'Rolex',
      category: 'Watches',
      description: 'A luxury diving watch with an automatic movement and ceramic bezel.',
      images: [
        'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&q=80',
        'https://images.unsplash.com/photo-1559563458-527698bf3267?w=500&q=80'
      ],
      highlights: [
        'Automatic Movement',
        'Water-resistant up to 300m',
        'Ceramic Bezel',
        'Scratch-resistant sapphire crystal'
      ],
      specifications: {
        'Movement': 'Automatic',
        'Material': 'Stainless Steel',
        'Water Resistance': '300m',
        'Dial': 'Black'
      },
      variants: [
        { id: 1, name: 'Black Dial', price: 850000 },
        { id: 2, name: 'Blue Dial', price: 870000 }
      ],
      colors: [
        { id: 1, name: 'Black', code: '#000000' },
        { id: 2, name: 'Blue', code: '#0000FF' }
      ]
    },
    c1: {
      id: 'c1',
      name: 'Nike Hoodie',
      price: 4999,
      rating: 4.7,
      reviews: 956,
      brand: 'Nike',
      category: 'Clothes',
      description: 'A comfortable and stylish hoodie perfect for casual wear.',
      images: [
        'https://images.unsplash.com/photo-1585059895525-ace2b53b022b?w=500&q=80',
        'https://images.unsplash.com/photo-1596755095361-d03a097111a5?w=500&q=80'
      ],
      highlights: [
        'Soft cotton blend',
        'Front kangaroo pocket',
        'Adjustable hood'
      ],
      specifications: {
        'Material': 'Cotton Blend',
        'Fit': 'Regular Fit',
        'Sleeve Length': 'Full Sleeve',
        'Wash Care': 'Machine Wash'
      },
      variants: [
        { id: 1, name: 'S', price: 4999 },
        { id: 2, name: 'M', price: 4999 },
        { id: 3, name: 'L', price: 4999 }
      ],
      colors: [
        { id: 1, name: 'Black', code: '#000000' },
        { id: 2, name: 'Grey', code: '#808080' }
      ]
    },
    e1 :{
      id: 'e1',
      name: 'Sony WH-1000XM5 Headphones',
      price: 29999,
      rating: 4.8,
      reviews: 1345,
      brand: 'Sony',
      category: 'Electronics',
      description: 'Industry-leading noise-canceling headphones with immersive sound quality.',
      images: [
        'https://images.unsplash.com/photo-1592194996308-7b43878e84a0?w=500&q=80',
        'https://images.unsplash.com/photo-1611847038529-6c5f479c7f5e?w=500&q=80'
      ],
      highlights: [
        'Adaptive noise cancellation',
        'Up to 30 hours battery life',
        'Touch controls'
      ],
      specifications: {
        'Driver Size': '40mm',
        'Battery Life': '30 hours',
        'Charging': 'USB-C',
        'Connectivity': 'Bluetooth 5.2'
      },
      variants: [
        { id: 1, name: 'Black', price: 29999 },
        { id: 2, name: 'Silver', price: 29999 }
      ],
      colors: [
        { id: 1, name: 'Black', code: '#000000' },
        { id: 2, name: 'Silver', code: '#C0C0C0' }
      ]
    },
    f1 :{
      id: 'f1',
    name: 'Ikea Study Table',
    price: 7999,
    rating: 4.5,
    reviews: 876,
    brand: 'Ikea',
    category: 'Furniture',
    description: 'A sleek and modern study table with durable wood finish.',
    images: [
      'https://images.unsplash.com/photo-1598300187583-43a7c5e4d07c?w=500&q=80',
      'https://images.unsplash.com/photo-1592151529787-5932b6579923?w=500&q=80'
    ],
    highlights: [
      'Durable wood finish',
      'Spacious surface',
      'Modern design'
    ],
    specifications: {
      'Material': 'Engineered Wood',
      'Dimensions': '120 x 60 x 75 cm',
      'Weight': '15 kg',
      'Color': 'White'
    },
    variants: [
      { id: 1, name: 'White', price: 7999 },
      { id: 2, name: 'Brown', price: 8499 }
    ],
    colors: [
      { id: 1, name: 'White', code: '#FFFFFF' },
      { id: 2, name: 'Brown', code: '#8B4513' }
    ]
  }
};

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = products[id as keyof typeof products];

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-gray-600">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return <ProductDetailsComponent product={product} />;
}