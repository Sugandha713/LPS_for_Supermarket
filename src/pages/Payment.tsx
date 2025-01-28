import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Calendar, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Payment() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Payment Details</h1>
      
      <form onSubmit={handlePayment} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="input-field pl-10"
                  required
                  pattern="[0-9\s]{16,19}"
                />
                <CreditCard className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="input-field pl-10"
                    required
                    pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                  />
                  <Calendar className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="123"
                    className="input-field pl-10"
                    required
                    pattern="[0-9]{3,4}"
                  />
                  <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Holder Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input-field"
                required
              />
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className="btn-secondary w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </span>
          ) : (
            'Pay Now'
          )}
        </button>
      </form>
    </div>
  );
}