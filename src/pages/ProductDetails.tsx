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
    'data:image/jpeg;base64,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',
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