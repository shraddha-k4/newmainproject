import { useState } from 'react';
import Navbar from './component/Navbar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home.jsx';
import Contact from './page/Contact.jsx';
import Cart from './page/Cart.jsx';
import Wishlist from './page/Wishlist.jsx';
// import Notifications from './page/Notifications.jsx';
import Product from './page/Product.jsx';
import Profile from './page/Profile.jsx'
import About from './page/About.jsx'
// import Footer from './page/Footer.jsx';

import ProtectedRoute from './route/ProtectedRoute.jsx';

import CustomerDashboard from './dashboard/customer/CustomerDashboard.jsx';
import { AuthProvider } from './useContext/AuthProvider.jsx';

//seller dashboard
import SellerDashboard from './dashboard/seller/SellerDashboard.jsx';
import AddProduct from './dashboard/seller/AddProduct.jsx';
import MyProducts from './dashboard/seller/MyProducts.jsx';
import Orders from './dashboard/seller/Orders.jsx';
import EditProduct from './dashboard/seller/EditProduct.jsx';
import SingleProduct from './page/SingleProduct.jsx';
import PurchasePage from './page/PurchasePage.jsx';
import CusOrder from './dashboard/customer/CusOrder.jsx';
import SellerProfile from './dashboard/seller/SellerProfile.jsx';
import Footer from './page/Footer.jsx';
import SellerNavbar from './dashboard/seller/SellerNavbar.jsx';
import User from './dashboard/seller/User.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <AuthProvider>

          <Navbar />
          <div className="pt-16 md:pt-24 lg:pt-25">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/wishlist' element={<Wishlist />} />
              {/* <Route path='/notifications' element={<Notifications/>}/> */}
              <Route path='/product' element={<Product />} />
              <Route path="/product/:id" element={<SingleProduct />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/about' element={<About />} />
              <Route path="/purchase/:id" element={<PurchasePage />} />


              {/* Seller Routes */}
              <Route path="/seller/profile" element={<ProtectedRoute allowedRoles={['seller']}><SellerProfile /></ProtectedRoute>} />
              <Route path="/seller/dashboard" element={<ProtectedRoute allowedRoles={['seller']}><SellerDashboard /></ProtectedRoute>} />
              <Route path="/seller/add-product" element={<ProtectedRoute allowedRoles={['seller']}><AddProduct /></ProtectedRoute>} />
              <Route path="/seller/my-products" element={<ProtectedRoute allowedRoles={['seller']}><MyProducts /></ProtectedRoute>} />
              <Route path="/seller/orders" element={<ProtectedRoute allowedRoles={['seller']}><Orders /></ProtectedRoute>} />
              <Route path="/seller/editproduct/:id" element={<EditProduct />} />
              <Route path='/seller/profile/user' element={<ProtectedRoute allowedRoles={['seller']}><User /></ProtectedRoute>} />

              {/* Customer Protected Route */}
              <Route path="/customer-dashboard" element={<ProtectedRoute allowedRoles={["customer"]}><CustomerDashboard /></ProtectedRoute>} />
              {/* <Route path="/customer/orders" element={<ProtectedRoute allowedRoles={['customer,seller']}> <CusOrder />  </ProtectedRoute> } /> */}
              <Route path="/customer/orders" element={ <CusOrder /> } />


            </Routes>
          </div>
          {/* <Footer /> */}

        </AuthProvider>
      </BrowserRouter>
    </>
  )
}


export default App
