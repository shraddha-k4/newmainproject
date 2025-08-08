import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, get_to_cart, remove_cart } from "../api/ApiEndPoints.jsx"
import Navbar from "../component/Navbar.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchCart = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login to view your cart");
    navigate("/profile");
    return;
  }

  try {
    const res = await axios.get(get_to_cart, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCartItems(res.data.cart?.items || []);
    calculateTotal(res.data.cart?.items || []);
  } catch (err) {
    console.error(err);
    alert("Failed to fetch cart");
  }
};

  const calculateTotal = (items) => {
    const totalAmount = items.reduce(
      (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
      0
    );
    setTotal(totalAmount);
  };

  const handleRemove = async (productId) => {
  try {
    const res = await axios.delete(remove_cart(productId), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Removed:", res.data);
    fetchCart(); // refresh cart
  } catch (error) {
    console.error("Remove failed:", error);
  }
};

  
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-green-700">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-lg text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.productId?._id}
                className="flex items-center justify-between border p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId?.images?.[0]}
                    alt={item.productId?.name}
                    className="w-24 h-24 object-contain rounded"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-green-700">
                      {item.productId?.name}
                    </h3>
                    <p className="text-gray-700">
                      ₹{item.productId?.price} x {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Size: {item.productId?.size}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.productId?._id)}
                  className="text-white bg-red-600 p-2 rounded cursor-pointer hover:bg-red-800 text-sm font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex justify-end">
              <div className="text-right mt-4">
                <p className="text-xl font-bold text-green-800">
                  Total: ₹{total}
                </p>
                <button className="mt-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

