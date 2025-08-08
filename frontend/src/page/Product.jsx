import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl, Get_All_Product_Api, add_to_wishlist, get_to_wishlist, remove_to_wishlist } from '../api/ApiEndPoints.jsx';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar.jsx';
import { FaHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const [wishlistIds, setWishlistIds] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(Get_All_Product_Api);
      setProducts(res.data);
      const indexes = {};
      res.data.forEach(product => {
        indexes[product._id] = 0;
      });
      setImageIndexes(indexes);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(get_to_wishlist, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const ids = res.data.items.map(item => item.productId._id);
      setWishlistIds(ids);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    }
  };

  const handleWishlistToggle = async (productId) => {
    try {
      const res = await axios.post(
        add_to_wishlist,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        fetchWishlist();
      }
    } catch (err) {
      if (err.response?.status === 409) {
        await axios.delete(remove_to_wishlist, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { productId },
        });
        fetchWishlist();
      } else {
        console.error('Wishlist toggle error:', err);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes(prev => {
        const updated = { ...prev };
        products.forEach(product => {
          const length = product.images?.length || 0;
          if (length > 1) {
            const currentIndex = prev[product._id] || 0;
            updated[product._id] = (currentIndex + 1) % length;
          }
        });
        return updated;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [products]);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {products.map((product, index) => {
          const currentImageIndex = imageIndexes[product._id] || 0;
          const imageKey = `${product._id}-${currentImageIndex}`;
          const currentImage = product.images?.[currentImageIndex];

          return (
            <motion.div
              key={product._id}
              className="bg-white rounded-xl px-4 py-7 shadow-md cursor-pointer hover:shadow-xl hover:scale-105 transition-all relative"
              onClick={() => navigate(`/product/${product._id}`)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Wishlist Icon */}
              <div
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  handleWishlistToggle(product._id);
                }}
                className="absolute top-2 right-2 text-2xl p-1 cursor-pointer"
              >
                <FaHeart
                  className={`stroke-black stroke-[20] ${
                    wishlistIds.includes(product._id) ? 'text-red-500 stroke-red-600' : 'text-white'
                  }`}
                />
              </div>

              <div className="w-full h-48 mb-4 flex justify-center items-center overflow-hidden rounded">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imageKey}
                    src={currentImage}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </AnimatePresence>
              </div>

              <div className='flex flex-col space-y-2 justify-center items-center'>
                <h2 className="text-2xl text-green-600 font-bold">{product.name}</h2>
                <p className="text-lg">Rs. {product.price}</p>
                <button className='py-1 rounded text-yellow-400 px-12 bg-green-600 hover:bg-green-700 cursor-pointer'>Add To Cart</button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
