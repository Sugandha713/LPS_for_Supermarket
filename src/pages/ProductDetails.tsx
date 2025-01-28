import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Shield, Truck, Package, Heart, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const product = {
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
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      price: selectedVariant.price,
      variant: selectedVariant.name,
      color: selectedColor.name
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-white">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-secondary' : 'border-transparent'
                }`}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <button className="btn-secondary flex-1">
              <span className="flex items-center justify-center gap-2">
                <Heart size={20} />
                Wishlist
              </span>
            </button>
            <button className="btn-secondary flex-1">
              <span className="flex items-center justify-center gap-2">
                <Share2 size={20} />
                Share
              </span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                  {product.rating} <Star size={14} className="inline" />
                </span>
                <span className="text-gray-500">{product.reviews} reviews</span>
              </div>
              <span className="text-gray-500">Brand: {product.brand}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-3xl font-bold">₹{selectedVariant.price.toLocaleString()}</div>
            {selectedVariant.price >= 300 && (
              <div className="text-secondary">
                Earn {Math.floor((selectedVariant.price - 300) / 50) + 1} diamonds
              </div>
            )}
          </div>

          {/* Variants */}
          <div>
            <h3 className="font-semibold mb-2">Storage</h3>
            <div className="flex gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-2 rounded-lg border-2 ${
                    selectedVariant.id === variant.id
                      ? 'border-secondary bg-secondary/10'
                      : 'border-gray-200'
                  }`}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-semibold mb-2">Color</h3>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full border-2 ${
                    selectedColor.id === color.id ? 'border-secondary' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.code }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-semibold mb-2">Highlights</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {product.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="text-green-600" size={20} />
              <span>1 Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="text-blue-600" size={20} />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Package className="text-orange-600" size={20} />
              <span>7 Day Replacement</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button onClick={handleAddToCart} className="btn-secondary flex-1 py-3">
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="btn-primary flex-1 py-3">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Specifications</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key}>
                <dt className="text-gray-600">{key}</dt>
                <dd className="font-medium mt-1">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}