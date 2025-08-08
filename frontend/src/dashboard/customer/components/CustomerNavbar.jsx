import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const CustomerNavbar = () => {
  return (
    <div className="md:hidden mt-auto flex justify-end px-6 py-14">
      <button className="text-sm rounded px-4 py-2 flex items-center gap-2 bg-blue-700 text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-white">
        <FaArrowLeft/>Logout
      </button>
    </div>
  );
};

export default CustomerNavbar;




// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FaHome, FaShoppingBag, FaHeart, FaUser } from 'react-icons/fa';

// const CustomerNavbar = () => {
//   const location = useLocation();

//   const links = [
//     { to: '/customer/dashboard', label: 'Home', icon: <FaHome /> },
//     { to: '/customer/orders', label: 'Orders', icon: <FaShoppingBag /> },
//     { to: '/customer/wishlist', label: 'Wishlist', icon: <FaHeart /> },
//     { to: '/customer/profile', label: 'Profile', icon: <FaUser /> },
//   ];

//   return (
//     <div className="md:hidden flex justify-around bg-blue-600 text-white py-2 left-0 right-0 shadow fixed w-full bottom-0 z-50">
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

// export default CustomerNavbar;

