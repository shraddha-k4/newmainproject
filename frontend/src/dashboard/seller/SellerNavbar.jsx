// src/dashboard/SellerNavbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBoxOpen, FaPlus, FaShoppingBag } from 'react-icons/fa';

const SellerNavbar = () => {
  const location = useLocation();

  const links = [
    { to: '/seller/dashboard', label: 'Dashboard', icon: <FaBoxOpen /> },
    { to: '/seller/add-product', label: 'Add Product', icon: <FaPlus /> },
    { to: '/seller/my-products', label: 'My Products', icon: <FaBoxOpen /> },
    { to: '/seller/orders', label: 'Orders', icon: <FaShoppingBag /> },
  ];

  return (
    <div className="md:hidden flex justify-around bg-green-600 text-white py-2 left-0 right-0 shadow fixed w-full bottom-0 z-50">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`flex flex-col items-center text-sm ${
            location.pathname === link.to ? 'text-yellow-400' : ''
          }`}
        >
          {link.icon}
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default SellerNavbar;
