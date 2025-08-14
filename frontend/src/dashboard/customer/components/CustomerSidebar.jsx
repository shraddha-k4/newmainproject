// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const CustomerSidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <motion.aside
//       animate={{ width: isOpen ? 240 : 60 }}
//       className="bg-orange-500 shadow h-full flex flex-col transition-all duration-300"
//     >
//       <div className="p-4 border-b flex items-center justify-between bg-orange-600">
//         <span className="font-bold text-lg ">{isOpen ? 'Menu' : '☰'}</span>
//         {/* <button onClick={() => setIsOpen(!isOpen)} className="text-sm">
//           {isOpen ? '⇤' : '⇥'}
//         </button> */} 
//       </div>
//       <nav className="flex flex-col p-2 space-y-2">
//         <Link to="/customer" className="hover:bg-orange-600 p-2 rounded">Dashboard</Link>
//         <Link to="/customer/orders" className="hover:bg-orange-600 p-2 rounded">Orders</Link>
//         <Link to="/customer/wishlist" className="hover:bg-orange-600 p-2 rounded">Wishlist</Link>
//         <Link to="/customer/profile" className="hover:bg-orange-600 p-2 rounded">Profile</Link>
//       </nav>
//     </motion.aside>
//   );
// };

// export default CustomerSidebar;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const CustomerSidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <motion.aside
//       animate={{ width: isOpen ? 240 : 60 }}
//       className="hidden md:flex bg-orange-500 shadow h-full flex-col transition-all duration-300"
//     >
//       <div className="p-4 border-b flex items-center justify-between bg-orange-600">
//         <span className="font-bold text-lg ">{isOpen ? 'Menu' : '☰'}</span>
//         {/* You can enable toggle later if needed */}
//       </div>
//       <nav className="flex flex-col p-2 space-y-2">
//         <Link to="/customer" className="hover:bg-orange-600 p-2 rounded">Dashboard</Link>
//         <Link to="/customer/orders" className="hover:bg-orange-600 p-2 rounded">Orders</Link>
//         <Link to="/customer/wishlist" className="hover:bg-orange-600 p-2 rounded">Wishlist</Link>
//         <Link to="/customer/profile" className="hover:bg-orange-600 p-2 rounded">Profile</Link>
//       </nav>
//     </motion.aside>
//   );
// };

// export default CustomerSidebar;


import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CustomerSidebar = () => {
  return (
    <motion.aside
      animate={{ width: 240 }}
      className="hidden md:flex bg-orange-500 shadow min-h-full  h-screen flex-col transition-all duration-300"
    >
      <div className="p-4 border-b flex items-center justify-between  bg-orange-600">
        <span className="font-bold text-lg">Menu</span>
      </div>
      <nav className="flex flex-col p-2 space-y-2">
        <Link to="/customer/dashboard" className="hover:bg-orange-600 p-2 rounded">Dashboard</Link>
        <Link to="/customer/orders" className="hover:bg-orange-600 p-2 rounded">Orders</Link>
        <Link to="/wishlist" className="hover:bg-orange-600 p-2 rounded">Wishlist</Link>
        <Link to="/customer/profile" className="hover:bg-orange-600 p-2 rounded">Profile</Link>
      </nav>
    </motion.aside>
  );
};

export default CustomerSidebar;
