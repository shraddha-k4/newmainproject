
// import React from 'react';
// import { motion } from 'framer-motion';
// import CustomerSidebar from './components/CustomerSidebar.jsx';
// import { getUser } from '../../utils/auth.js';
// import CustomerNavbar from './components/CustomerNavbar.jsx';


// const CustomerDashboard = () => {
//   const user = getUser();
//   return (
//     <div className="flex h-screen overflow-hidden">
//       <CustomerSidebar />
//       <div className="flex flex-col flex-1">
//         <main className="p-6 bg-gray-100 flex-1 overflow-auto flex flex-col">
//           <motion.h1
//             className="text-3xl font-bold mb-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             Welcome, {user.name}
//           </motion.h1>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white p-4 rounded-2xl shadow">
//               <h2 className="text-xl font-semibold mb-2">My Orders</h2>
//               <p>You haven’t placed any orders yet.</p>
//             </div>

//             <div className="bg-white p-4 rounded-2xl shadow">
//               <h2 className="text-xl font-semibold mb-2">Wishlist</h2>
//               <p>Your favorite products will appear here.</p>
//             </div>
            

//             <div className="bg-white p-4 rounded-2xl shadow md:col-span-2">
//               <h2 className="text-xl font-semibold mb-2">Profile Info</h2>
                        

//               {user && (
//                 <div className="text-sm">
//                   <p>Name: {user.name}</p>
//                   <p>Email: {user.email}</p>
//                  <p>Mobile No.: {user?.mobileno || "Not provided"}</p>

//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mobile-only Logout Button at Bottom */}
//           <CustomerNavbar/>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { get_to_cart } from '../../api/ApiEndPoints.jsx';
// import { getUser } from '../../utils/auth.js';
// import CustomerSidebar from './components/CustomerSidebar.jsx';
// import CustomerNavbar from './components/CustomerNavbar.jsx';
// import { motion } from 'framer-motion';

// const containerVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6 },
//   },
// };

// const CustomerDashboard = () => {
//   const user = getUser();
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const fetchCart = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       try {
//         const res = await axios.get(get_to_cart, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const items = res.data.cart?.items || [];
//         const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
//         setCartCount(totalQty);
//       } catch (error) {
//         console.error("Error fetching cart count", error);
//       }
//     };

//     fetchCart();
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       <CustomerNavbar />
//       <div className="flex flex-1">
//         <CustomerSidebar />
//         <main className="flex-1 p-6">
//           <motion.div
//             className="max-w-6xl mx-auto"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <h1 className="text-3xl font-bold text-green-700 mb-6">Welcome, {user?.name}</h1>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="bg-white p-4 rounded-2xl shadow">
//                 <h2 className="text-xl font-semibold mb-2">Cart Items</h2>
//                 <p>You have {cartCount} item{cartCount !== 1 ? "s" : ""} in your cart.</p>
//               </div>

//               <div className="bg-white p-4 rounded-2xl shadow">
//                 <h2 className="text-xl font-semibold mb-2">Wishlist Items</h2>
//                 <p>You have {cartCount} item{cartCount !== 1 ? "s" : ""} in your wishlist.</p>
//               </div>

//               <div className="bg-white p-4 rounded-2xl shadow">
//                 <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
//                 <p><span className="font-semibold">Name:</span> {user?.name}</p>
//                 <p><span className="font-semibold">Email:</span> {user?.email}</p>
//               </div>

//               {/* Add more dashboard cards here if needed */}
//             </div>
//           </motion.div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { get_to_cart, get_to_wishlist } from '../../api/ApiEndPoints.jsx';
import { getUser } from '../../utils/auth.js';
import CustomerSidebar from './components/CustomerSidebar.jsx';
import CustomerNavbar from './components/CustomerNavbar.jsx';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const CustomerDashboard = () => {
  const user = getUser();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch Cart Items Count
    const fetchCart = async () => {
      try {
        const res = await axios.get(get_to_cart, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const items = res.data.cart?.items || [];
        const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalQty);
      } catch (error) {
        console.error("Error fetching cart count", error);
      }
    };

    // Fetch Wishlist Items Count
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(get_to_wishlist, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Your wishlist API returns `res.data.items` (like in Wishlist.jsx)
        const items = res.data.items || [];

        // Only count valid products
        const validItems = items.filter(item => item?.productId);

        // Count is simply length of valid items
        setWishlistCount(validItems.length);
      } catch (error) {
        console.error("Error fetching wishlist count", error);
      }
    };

    fetchCart();
    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <CustomerNavbar />
      <div className="flex flex-1">
        <CustomerSidebar />
        <main className="flex-1 p-6">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-3xl font-bold text-green-700 mb-6">
              Welcome, {user?.name}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Cart Card */}
              <div className="bg-white p-4 rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-2">Cart Items</h2>
                <p>
                  You have {cartCount} item{cartCount !== 1 ? "s" : ""} in your cart.
                </p>
              </div>

              {/* Wishlist Card */}
              <div className="bg-white p-4 rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-2">Wishlist Items</h2>
                <p>
                  You have {wishlistCount} item{wishlistCount !== 1 ? "s" : ""} in your wishlist.
                </p>
              </div>

              {/* Profile Card */}
              <div className="bg-white p-4 rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
                <p><span className="font-semibold">Name:</span> {user?.name}</p>
                <p><span className="font-semibold">Email:</span> {user?.email}</p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
