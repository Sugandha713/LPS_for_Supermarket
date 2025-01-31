import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Package, MapPin, User, Diamond, History, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from "react";

function Profile() {
  const { user } = useAuth();
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Full Name</label>
          <p className="mt-1 text-lg">{user?.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <p className="mt-1 text-lg">{user?.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Phone</label>
          <p className="mt-1 text-lg">{user?.phone || 'Not added'}</p>
        </div>
      </div>
    </div>
  );
}

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/orders") // Replace with your backend URL
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="space-y-4">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.orderId} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Order #{order.orderId}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Ordered on: {order.date}</p>
              <p>Items: {order.items.join(", ")}</p>
              <p className="font-semibold">Total: ₹{order.totalAmount}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}
    </div>
  );
}

function Addresses() {
  const { user } = useAuth();
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {user?.addresses.map((address) => (
        <div key={address.id} className="bg-white rounded-lg shadow p-6">
          {address.isDefault && (
            <span className="inline-block bg-secondary/10 text-secondary text-sm px-2 py-1 rounded mb-2">
              Default Address
            </span>
          )}
          <p className="font-semibold mb-2">{address.street}</p>
          <p className="text-gray-600">
            {address.city}, {address.state} - {address.pincode}
          </p>
        </div>
      ))}
    </div>
  );
}

function DiamondZone() {
  const { user } = useAuth();
  const rewards = [
    {
      id: '1',
      name: '₹50 Off on Next Purchase',
      diamonds: 17,
      image: 'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=500&q=80'
    },
    {
      id: '2',
      name: 'Free Delivery (3 Orders)',
      diamonds: 25,
      image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=500&q=80'
    },
    {
      id: '3',
      name: 'Premium Membership (1 Month)',
      diamonds: 100,
      image: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=500&q=80'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-secondary to-primary/50 text-white rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Diamond size={32} />
          <div>
            <h3 className="text-2xl font-bold">{user?.diamonds} Diamonds</h3>
            <p>Use your diamonds to get exclusive rewards!</p>
          </div>
        </div>
        <div className="text-sm">
          <p>• Earn 1 diamond for every ₹50 spent above ₹300</p>
          <p>• Each diamond is worth ₹3 in rewards</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => (
          <div key={reward.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={reward.image} alt={reward.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="font-semibold mb-2">{reward.name}</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Diamond size={16} className="text-secondary" />
                  <span>{reward.diamonds} diamonds</span>
                </div>
                <button
                  className="btn-secondary"
                  disabled={user?.diamonds < reward.diamonds}
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function Account() {
  const location = useLocation();
  const { user , logout} = useAuth();

  const tabs = [
    { path: '/account', icon: User, label: 'Profile' },
    { path: '/account/orders', icon: Package, label: 'Orders' },
    { path: '/account/addresses', icon: MapPin, label: 'Addresses' },
    { path: '/account/diamonds', icon: Diamond, label: 'Diamond Zone' },
    { path: '/logout', icon: LogOut, label: 'Log Out' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Account</h1>
        <p className="text-gray-600">Manage your profile, orders, and rewards</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <nav className="md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.path;
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-secondary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>


        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/addresses" element={<Addresses />} />
            <Route path="/diamonds" element={<DiamondZone />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}