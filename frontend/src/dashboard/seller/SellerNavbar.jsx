// // src/dashboard/SellerNavbar.jsx
// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FaBoxOpen, FaPlus, FaShoppingBag, FaUserAlt } from 'react-icons/fa';

// const SellerNavbar = () => {
//   const location = useLocation();

//   const links = [
//     {to:'/seller/profile',label: 'Profile', icon:<FaUserAlt/>},
//     { to: '/seller/dashboard', label: 'Dashboard', icon: <FaBoxOpen /> },
//     { to: '/seller/add-product', label: 'Add Product', icon: <FaPlus /> },
//     { to: '/seller/my-products', label: 'My Products', icon: <FaBoxOpen /> },
//     { to: '/seller/orders', label: 'Orders', icon: <FaShoppingBag /> },
//     {to:'/customer/orders',label:'My Orders',icon:<FaShoppingBag/>},
//   ];

//   return (
//     <div className="md:hidden flex justify-around bg-green-600 text-white py-2 left-0 right-0 shadow  z-50">
//       {links.map((link) => (
//         <Link
//           key={link.to}
//           to={link.to}
//           className={`flex flex-col items-center text-sm ${
//             location.pathname === link.to ? 'text-yellow-400' : ''
//           }`}
//         >
//           {link.icon}
//           {link.label}
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default SellerNavbar;



// src/dashboard/SellerMenu.jsx
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FaBoxOpen, FaPlus, FaShoppingBag, FaUserAlt } from "react-icons/fa";

// const SellerNavbar = () => {
//   const location = useLocation();

//   const links = [
//     {
//       to: "/seller/profile/user",
//       label: "Profile",
//       subtext: "View and edit your profile",
//       icon: <FaUserAlt className="text-5xl"/>,
//     },
//     {
//       to: "/seller/dashboard",
//       label: "Dashboard",
//       subtext: "Overview of your sales",
//       icon: <FaBoxOpen />,
//     },
//     {
//       to: "/seller/add-product",
//       label: "Add Product",
//       subtext: "Add new items for sale",
//       icon: <FaPlus />,
//     },
//     {
//       to: "/seller/my-products",
//       label: "My Products",
//       subtext: "Manage your listings",
//       icon: <FaBoxOpen />,
//     },
//     {
//       to: "/seller/orders",
//       label: "Orders",
//       subtext: "Customer order details",
//       icon: <FaShoppingBag />,
//     },
//     {
//       to: "/customer/orders",
//       label: "My Orders",
//       subtext: "View your purchases",
//       icon: <FaShoppingBag />,
//     },
//   ];

//   return (
//     <div className="sm:hidden min-h-screen bg-white">
//       <nav className="bg-white  space-y-5">
//         {links.map(({ to, label, subtext, icon }) => (
//           <Link
//             key={to}
//             to={to}
//             className={`flex items-center p-4 hover:bg-gray-50 shadow-sm ${
//               location.pathname === to ? "bg-gray-100" : ""
//             }`}
//           >
//             <div className="text-xl text-gray-600">{icon}</div>
//             <div className="ml-4">
//               <p className="text-base font-medium">{label}</p>
//               <p className="text-sm text-gray-500">{subtext}</p>
//             </div>
//           </Link>
//         ))}
//       </nav>
//        {/* Logout Button - Mobile Only */}
//           <button
//             className="md:hidden m-5 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
//             onClick={() => {
//               localStorage.removeItem("token");
//               window.location.href = "/profile";
//             }}
//           >
//             Logout
//           </button>
//     </div>
//   );
// };

// export default SellerNavbar;



import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBoxOpen, FaPlus, FaShoppingBag, FaUserAlt, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { Auth_profile_Api } from "../../api/ApiEndPoints.jsx";




const SellerNavbar = () => {
  const location = useLocation();
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(Auth_profile_Api, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Extract user details from the correct place
      const userData = response.data.user || {};
      setUser({
        name: userData.name || "Profile",
        email: userData.email || "View and edit your profile",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  fetchProfile();
}, []);

  const links = [
    {
      to: "/seller/profile/user",
      label: user.name,
      subtext: user.email,
      icon: <FaUserCircle className="text-8xl" />,
    },
    {
      to: "/seller/dashboard",
      label: "Dashboard",
      subtext: "Overview of your sales",
      icon: <FaBoxOpen />,
    },
    {
      to: "/seller/add-product",
      label: "Add Product",
      subtext: "Add new items for sale",
      icon: <FaPlus />,
    },
    {
      to: "/seller/my-products",
      label: "My Products",
      subtext: "Manage your listings",
      icon: <FaBoxOpen />,
    },
    {
      to: "/seller/orders",
      label: "Orders",
      subtext: "Customer order details",
      icon: <FaShoppingBag />,
    },
    {
      to: "/customer/orders",
      label: "My Orders",
      subtext: "View your purchases",
      icon: <FaShoppingBag />,
    },
  ];

  return (
    <div className="sm:hidden min-h-screen bg-white">
      <nav className="bg-white space-y-5">
        {links.map(({ to, label, subtext, icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center p-4 hover:bg-gray-50 shadow-sm ${
              location.pathname === to ? "bg-gray-100" : ""
            }`}
          >
            <div className="text-xl text-gray-600">{icon}</div>
            <div className="ml-4">
              <p className="text-base font-medium">{label}</p>
              <p className="text-sm text-gray-500">{subtext}</p>
            </div>
          </Link>
        ))}
      </nav>

      {/* Logout Button - Mobile Only */}
      <button
        className="md:hidden m-5 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/profile";
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default SellerNavbar;