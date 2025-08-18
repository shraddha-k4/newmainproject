import React, { useEffect, useState } from 'react';
import { getWishlist, removeFromWishlist } from '../api/wishlistApi.js';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar.jsx';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    try {
      const res = await getWishlist();
      // Filter out null or missing productId entries
      const validItems = res.data.items.filter(item => item?.productId);
      setWishlist(validItems);
    } catch (error) {
      toast.error('Failed to fetch wishlist');
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
      toast.success("Removed from wishlist");
      fetchWishlist();
    } catch (err) {
      toast.error("Error removing item");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="p-9 ">
        <h1 className="text-2xl sm:text-3xl text-green-600 font-bold mb-6 px-35 py-2 text-center sm:text-left">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <p className='px-35 py-2'>No items in wishlist.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.productId._id}
                className="bg-white shadow-md rounded-xl p-4 flex flex-col"
              >
                <img
                  src={item?.productId?.images?.[0] || "/placeholder.jpg"}
                  alt={item?.productId?.name || "Product unavailable"}
                  className="w-full h-40 object-contain mb-2 rounded"
                  onClick={() => navigate(`/product/${item.productId._id}`)}
                />
                <h2 className="text-lg font-semibold text-green-600">
                  {item?.productId?.name || "No name available"}
                </h2>
                <p>₹{item?.productId?.price || "N/A"}</p>
                <div className="mt-auto flex justify-between items-center">
                  <button
                    onClick={() => navigate(`/product/${item.productId._id}`)}
                    className="text-xl bg-green-600 text-yellow-400 px-4 py-1 rounded hover:bg-green-700"
                  >
                    View
                  </button>
                  <FaTrash
                    className="text-red-600 text-xl cursor-pointer"
                    onClick={() => handleRemove(item.productId._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
