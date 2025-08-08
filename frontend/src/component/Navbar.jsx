
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaBell, FaHeart, FaHome, FaUserCircle } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../useContext/AuthProvider.jsx';


const Navbar = () => {


  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { authed, logout } = useAuth();


  const isActive = (path) => location.pathname === path;
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  const handleProfileClick = () => {
    if (!authed) {
      navigate('/profile');
    } else {
      if (role === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/customer-dashboard');
      }
    }
  };


  return (
    <div className="w-full">
      {/* Top Navbar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-lg fixed top-0 left-0 w-full z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <span className="text-orange-500 font-bold text-2xl">SOUL</span>
            <span className="text-green-600 font-semibold">Organic</span>
          </div>

          {/* Search Bar (Desktop only) */}
          <div className="hidden sm:block w-full max-w-[200px] md:max-w-[300px] lg:max-w-[500px] relative mx-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-black text-gray-700 rounded-full px-10 py-1 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <IoMdSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-black text-lg" />
          </div>

          {/* Right Side Icons (Desktop only) */}
          <div className="hidden sm:flex items-center gap-4">
            <Link to="/cart">
              <FaCartShopping className="text-2xl text-black hover:text-green-700" />
            </Link>
            <Link to="/wishlist"><FaHeart className="text-2xl text-black hover:text-red-500" /></Link>
            <Link to="/notifications"><FaBell className="text-2xl text-black hover:text-yellow-500" /></Link>

            {/* Profile + Logout */}
            <div className="shadow-xl p-1 flex items-center gap-3">
              {authed ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <Link
                    to={role === 'seller' ? '/seller/dashboard' : '/customer-dashboard'}
                    className="flex items-center gap-1 text-black hover:text-green-600"
                  >
                    <FaUserCircle className="text-2xl shadow-2xl" />
                    <span className="text-sm">Profile</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm text-white bg-blue-600 p-1 rounded hover:bg-blue-800"
                  >
                    Logout
                  </button>
                </motion.div>
              ) : (
                <Link to="/profile" className="flex items-center gap-1 text-black hover:text-blue-600">
                  <FaUserCircle className="text-2xl" />
                  <span className="text-sm">Login</span>
                </Link>
              )}
            </div>
          </div>

          {/* Hamburger Menu (Mobile only) */}
          <div className="sm:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FaBars className="text-2xl text-black" />
            </button>
          </div>
        </div>

        {/* Second Row: Nav Links (Desktop only) */}
        <div className="hidden sm:flex justify-center bg-white border-t border-gray-200 py-2">
          <nav className="flex gap-10 text-lg font-semibold">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-red-500 border-b-2 border-red-500" : "text-black"}>Home</NavLink>
            <NavLink to="/product" className={({ isActive }) => isActive ? "text-red-500 border-b-2 border-red-500" : "text-black"}>Product</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "text-red-500 border-b-2 border-red-500" : "text-black"}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "text-red-500 border-b-2 border-red-500" : "text-black"}>Contact</NavLink>
          </nav>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden bg-white w-full px-4 pb-4 overflow-hidden"
            >
              <ul className="flex flex-col gap-3 text-base font-semibold">
                <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "text-red-500" : "text-black"}>Home</NavLink>
                <NavLink to="/product" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "text-red-500" : "text-black"}>Product</NavLink>
                <NavLink to="/about" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "text-red-500" : "text-black"}>About</NavLink>
                <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "text-red-500" : "text-black"}>Contact</NavLink>
              </ul>

              {/* Search Input (Mobile) */}
              <div className="w-full mt-4 relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full border border-black text-gray-700 rounded-full px-10 py-1 focus:outline-none focus:ring-1 focus:ring-black"
                />
                <IoMdSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-black text-lg" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Mobile Navbar */}

      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="sm:hidden fixed bottom-0 left-0 w-full bg-green-600 py-2 flex justify-around items-center z-40 text-white shadow"
      >
        <Link to="/"
          className={`flex flex-col items-center text-sm ${isActive('/') ? 'text-yellow-400' : ''
            }`}
        >
          <FaHome className="text-xl" />
          Home
        </Link>

        <Link
          to="/cart"
          className={`flex flex-col items-center text-sm ${isActive('/cart') ? 'text-yellow-400' : ''
            }`}
        >
          <FaCartShopping className="text-xl" />
          Cart
        </Link>

        <Link
          to="/wishlist"
          className={`flex flex-col items-center text-sm ${isActive('/wishlist') ? 'text-yellow-400' : ''
            }`}
        >
          <FaHeart className="text-xl" />
          Wishlist
        </Link>

        <Link
          to="/notifications"
          className={`flex flex-col items-center text-sm ${isActive('/notifications') ? 'text-yellow-400' : ''
            }`}
        >
          <FaBell className="text-xl" />
          Alerts
        </Link>

        <button
          onClick={handleProfileClick}
          className={`flex flex-col items-center text-sm ${(authed && role === 'seller' && isActive('/seller/dashboard')) ||
            (authed && role !== 'seller' && isActive('/customer-dashboard')) ||
            (!authed && isActive('/profile'))
            ? 'text-yellow-400'
            : ''
            }`}
        >
          <FaUserCircle className="text-xl" />
          Profile
        </button>
      </motion.div>



    </div>
  );
};

export default Navbar;





