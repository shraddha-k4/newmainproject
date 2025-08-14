// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import SellerSidebar from './SellerSidebar.jsx';
// import SellerNavbar from './SellerNavbar.jsx';
// import { PlusCircle } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { Link } from 'react-router-dom';
// import { getSellerSummary } from '../../api/ApiEndPoints.jsx';
// import { Button } from './ui/Button.jsx';
// import { Card, CardContent } from './ui/Card.jsx';



// // Dummy line chart data
// const data = [
//   { date: 'Jul 1', orders: 4 },
//   { date: 'Jul 2', orders: 7 },
//   { date: 'Jul 3', orders: 3 },
//   { date: 'Jul 4', orders: 5 },
// ];

// // Animation
// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0 }
// };

// const SellerDashboard = () => {
//   const [summary, setSummary] = useState({
//     totalProducts: 0,
//     totalOrders: 0,
//     totalEarnings: 0,
//   });

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(getSellerSummary, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setSummary(res.data);
//       } catch (error) {
//         console.error("Failed to fetch summary:", error.response?.data || error.message);
//       }
//     };

//     fetchSummary();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="hidden md:block">
//         <SellerSidebar />
//       </div>

//       {/* Main */}
//       <div className="flex-1 flex flex-col">
//         <motion.div
//           className="p-4 md:p-6 flex-1 overflow-y-auto pb-24 md:pb-4"
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           transition={{ duration: 0.5 }}
//         >
//           {/* Header */}
//           <motion.div
//             className="flex justify-between items-center mb-8"
//             variants={fadeInUp}
//             transition={{ delay: 0.1 }}
//           >
//             <h1 className="text-3xl font-bold text-green-800">Seller Dashboard</h1>
//             <Link to='/seller/add-product'>
//               <Button className="flex gap-2 items-center px-4 py-2 transition-all duration-300 hover:scale-105 hover:bg-green-700">
//                 <PlusCircle size={18} />
//                 Add Product
//               </Button>
//             </Link>
//           </motion.div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//             {[
//               { label: "Total Products", value: summary.totalProducts },
//               { label: "Total Orders", value: summary.totalOrders },
//               { label: "Total Earnings", value: `₹${summary.totalEarnings}`, textColor: "text-green-600" }
//             ].map((item, idx) => (
//               <motion.div key={idx} variants={fadeInUp} transition={{ delay: 0.2 + idx * 0.1 }}>
//                 <Card className="hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
//                   <CardContent className="p-6">
//                     <h2 className="text-sm text-gray-500 mb-2">{item.label}</h2>
//                     <p className={`text-3xl font-semibold ${item.textColor || ''}`}>{item.value}</p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>

//           {/* Chart */}
//           <motion.div
//             className="bg-white rounded-2xl shadow-md p-6 mb-10"
//             variants={fadeInUp}
//             transition={{ delay: 0.5 }}
//           >
//             <h3 className="text-lg font-semibold mb-4">Order Trends</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={data}>
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </motion.div>

//           {/* Recent Orders - Static for now */}
//           <motion.div
//             className="bg-white rounded-2xl shadow-md p-6"
//             variants={fadeInUp}
//             transition={{ delay: 0.6 }}
//           >
//             <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left border-b border-gray-200 text-gray-600">
//                   <th className="py-2">Order ID</th>
//                   <th className="py-2">Product</th>
//                   <th className="py-2">Quantity</th>
//                   <th className="py-2">Amount</th>
//                   <th className="py-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {[
//                   { id: "#1001", product: "Organic Honey", qty: 2, amount: "₹800", status: "Delivered", color: "text-green-600" },
//                   { id: "#1002", product: "Desi Ghee", qty: 1, amount: "₹499", status: "Shipped", color: "text-yellow-600" },
//                   { id: "#1003", product: "Organic Turmeric", qty: 3, amount: "₹600", status: "Pending", color: "text-red-600" }
//                 ].map((order, i) => (
//                   <tr key={i} className="border-b hover:bg-gray-100 transition-colors duration-200">
//                     <td className="py-2">{order.id}</td>
//                     <td>{order.product}</td>
//                     <td>{order.qty}</td>
//                     <td>{order.amount}</td>
//                     <td className={order.color}>{order.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </motion.div>

//           {/* Logout Button - Mobile Only */}
//           <button
//             className="md:hidden m-5 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
//             onClick={() => {
//               localStorage.removeItem("token");
//               window.location.href = "/profile"; // Or your login route
//             }}
//           >
//             Logout
//           </button>
//         </motion.div>

//         {/* Mobile Navbar */}
//         <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
//           <SellerNavbar />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerDashboard;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import SellerSidebar from './SellerSidebar.jsx';
import SellerNavbar from './SellerNavbar.jsx';
import { PlusCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { getSellerSummary, seller_order } from '../../api/ApiEndPoints.jsx';
import { Button } from './ui/Button.jsx';
import { Card, CardContent } from './ui/Card.jsx';

// Dummy line chart data
const data = [
  { date: 'Jul 1', orders: 4 },
  { date: 'Jul 2', orders: 7 },
  { date: 'Jul 3', orders: 3 },
  { date: 'Jul 4', orders: 5 },
];

// Animation
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const SellerDashboard = () => {
  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalEarnings: 0,
  });

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const [summaryRes, ordersRes] = await Promise.all([
          axios.get(getSellerSummary, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(seller_order, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setSummary(summaryRes.data);
        setOrders(ordersRes.data || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error.response?.data || error.message);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block">
        <SellerSidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <motion.div
          className="p-4 md:p-6 flex-1 overflow-y-auto pb-24 md:pb-4"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <motion.div
            className="flex justify-between items-center mb-8"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold text-green-800">Seller Dashboard</h1>
            <Link to='/seller/add-product'>
              <Button className="flex gap-2 items-center px-4 py-2 transition-all duration-300 hover:scale-105 hover:bg-green-700">
                <PlusCircle size={18} />
                Add Product
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              { label: "Total Products", value: summary.totalProducts },
              { label: "Total Orders", value: summary.totalOrders },
              { label: "Total Earnings", value: `₹${summary.totalEarnings}`, textColor: "text-green-600" }
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeInUp} transition={{ delay: 0.2 + idx * 0.1 }}>
                <Card className="hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-6">
                    <h2 className="text-sm text-gray-500 mb-2">{item.label}</h2>
                    <p className={`text-3xl font-semibold ${item.textColor || ''}`}>{item.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 mb-10"
            variants={fadeInUp}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4">Order Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Orders - Dynamic */}
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

            {loadingOrders ? (
              <p className="text-gray-500">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-500">No recent orders.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-200 text-gray-600">
                    <th className="py-2">Order ID</th>
                    <th className="py-2">Product</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order) =>
                    order.items.map((item, idx) => {
                      const product = item.productId || {};
                      return (
                        <tr key={`${order._id}-${idx}`} className="border-b hover:bg-gray-100 transition-colors duration-200">
                          <td className="py-2">{order._id}</td>
                          <td>{product.name || "Unnamed Product"}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.totalAmount.toFixed(2)}</td>
                          <td className={
                            order.status === "Delivered" ? "text-green-600" :
                            order.status === "Shipped" ? "text-yellow-600" :
                            "text-red-600"
                          }>
                            {order.status}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </motion.div>

          
        </motion.div>

        {/* Mobile Navbar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          {/* <SellerNavbar /> */}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;