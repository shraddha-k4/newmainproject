import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../component/Navbar.jsx";
import CustomerSidebar from "../customer/components/CustomerSidebar.jsx";
import SellerSidebar from "../seller/SellerSidebar.jsx";
import { my_order, Auth_profile_Api } from "../../api/ApiEndPoints.jsx";

const CusOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please login to view your orders");
          return;
        }

        // ✅ Get user profile including role
        const userRes = await axios.get(Auth_profile_Api, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = userRes.data?.user;
        setRole(userData?.role || "customer");

        // ✅ Get orders
        const orderRes = await axios.get(my_order, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = orderRes.data;

        if (Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else if (Array.isArray(data)) {
          setOrders(data);
        } else if (data && data.items) {
          setOrders([data]);
        } else {
          console.warn("Unexpected order format:", data);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching user or orders:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndOrders();
  }, []);

  if (loading || role === null) {
    return <div className="text-center mt-10 text-lg text-gray-600">Loading your orders...</div>;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 flex-col sm:flex-row">
        {/* Sidebar hidden on mobile */}
        <div className="hidden sm:block sm:w-64">
          {role === "seller" ? <SellerSidebar /> : <CustomerSidebar />}
        </div>

        <div className="flex-1 p-4 sm:p-6">
          <h2 className="  font-bold text-3xl  text-green-800 mb-4  sm:text-left">
            My Orders
          </h2>

          {orders.length === 0 ? (
            <p className="text-gray-500 text-center sm:text-left">
              You have not placed any orders yet.
            </p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="space-y-6">
                  {order.items.map((item, idx) => {
                    const product = item.productId || {};
                    const imageUrl = product.images?.[0]?.trim();
                    const unitPrice = Number(product.price) || 0;
                    const itemTotal = Number(item.total) || unitPrice * item.quantity;
                    const itemStatus = item.status || order.status;
                    const orderDate = new Date(order.createdAt).toLocaleDateString();

                    return (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row justify-between items-center sm:items-start shadow-xl p-4 sm:p-6 rounded-lg gap-4"
                      >
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                          <img
                            src={imageUrl || "/placeholder.png"}
                            alt={product.name || "Product"}
                            className="w-24 h-24 object-contain rounded mx-auto sm:mx-0"
                          />
                          <div className="text-center sm:text-left">
                            <p className="font-semibold text-base sm:text-lg">
                              {product.name || "Unnamed Product"}
                            </p>
                            <p className="text-sm">Quantity: {item.quantity}</p>
                            <p className="text-sm">Unit Price: ₹{unitPrice.toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="text-center sm:text-right min-w-[150px] space-y-1">
                          <p className="font-semibold text-base">
                            Item Total: ₹{itemTotal.toFixed(2)}
                          </p>
                          <p
                            className={`text-sm font-bold ${
                              itemStatus === "Delivered" ? "text-green-600" : "text-yellow-600"
                            }`}
                          >
                            {itemStatus}
                          </p>
                          <p className="text-sm text-gray-500">Date: {orderDate}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CusOrder;