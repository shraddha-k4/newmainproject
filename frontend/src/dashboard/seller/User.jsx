// import React from 'react'
// import SellerSidebar from './SellerSidebar.jsx'

// const User = () => {
//   return (
//     <>
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar for medium and larger screens */}
//       <div className="hidden md:block">
//         <SellerSidebar />
//       </div>
//       <h2 className="text-3xl m-4 font-bold text-green-800">My Profile</h2>

       
      
//     </div>
//     </>
//   )
// }

// export default User


// import React from 'react';
// import SellerSidebar from './SellerSidebar.jsx';
// import { FaUserCircle } from 'react-icons/fa';

// const User = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar for medium and larger screens */}
//       <div className="hidden md:block">
//         <SellerSidebar />
//       </div>

//       {/* Main content */}
//       <div className="flex-1 p-6  ">
//         <h2 className="text-3xl font-bold text-green-800 mb-6">My Profile</h2>

//         <form className="space-y-6 max-w-md">
//             {/* Profile Photo */}
//           <div>

           
//             <FaUserCircle className='text-8xl '/>
//             <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700">
//               Profile Photo
//             </label>
//           </div>

//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
//               placeholder="you@example.com"
//             />
//           </div>

          

//           {/* Mobile Number */}
//           <div>
//             <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
//               Mobile Number
//             </label>
//             <input
//               type="tel"
//               id="mobileNo"
//               name="mobileNo"
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
//               placeholder="+91 9876543210"
//             />
//           </div>

//           {/* Role */}
//           <div>
//             <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//               Role
//             </label>
//             <select
//               id="role"
//               name="role"
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
//             >
//               <option value="">Select role</option>
//               <option value="seller">Seller</option>
//               <option value="customer">Customer</option>
              
//             </select>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default User;


// import React from 'react';
// import SellerSidebar from './SellerSidebar.jsx';
// import { FaUserCircle } from 'react-icons/fa';

// const User = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar for medium and larger screens */}
//       <div className="hidden md:block">
//         <SellerSidebar />
//       </div>

//       {/* Main content */}
//       <div className="flex-1 p-6">
//         <h2 className="text-3xl font-bold text-green-800 mb-6">My Profile</h2>

//         <form className="space-y-6 max-w-md">
//           {/* Profile Photo */}
//           <div className="flex flex-col items-center space-y-2">
//             <label htmlFor="profilePhoto" className="cursor-pointer">
//               <FaUserCircle className="text-8xl text-gray-500 hover:text-green-600 transition duration-200" />
//             </label>
//             <input
//               type="file"
//               id="profilePhoto"
//               name="profilePhoto"
//               accept="image/*"
//               className="hidden"
//             />
//             <span className="text-sm text-gray-600">Click icon to upload photo</span>
//           </div>

//             {/* Email */}
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="name"
//               id="name"
//               name="name"
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
//               placeholder="Enter your name"
//             />
//           </div>



//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
//               placeholder="you@example.com"
//             />
//           </div>

//           {/* Mobile Number */}
//           <div>
//             <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
//               Mobile Number
//             </label>
//             <input
//               type="tel"
//               id="mobileNo"
//               name="mobileNo"
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
//               placeholder="+91 9876543210"
//             />
//           </div>

//           {/* Role */}
//           <div>
//             <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//               Role
//             </label>
//             <select
//               id="role"
//               name="role"
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
//             >
//               <option value="">Select role</option>
//               <option value="seller">Seller</option>
//               <option value="customer">Customer</option>
//             </select>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default User;



import React, { useEffect, useState } from 'react';
import SellerSidebar from './SellerSidebar.jsx';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { Auth_profile_Api } from '../../api/ApiEndPoints.jsx'; // Adjust path if needed

const User = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    mobileNo: '',
    role: '',
    profilePhoto: '', // Optional: add logic if photo URL is available
  });

  // Fetch profile data from API
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No token found. User may not be logged in.');
        return;
      }

      const response = await axios.get(Auth_profile_Api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data.user;

      setProfile({
        name: user.name || '',
        email: user.email || '',
        mobileNo: user.mobileno?.toString() || '',
        role: user.role || '',
        profilePhoto: '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  fetchProfile();
}, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for medium and larger screens */}
      <div className="hidden md:block">
        <SellerSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-green-800 mb-6">My Profile</h2>

        <form className="space-y-6 max-w-md">
          {/* Profile Photo */}
          <div className="flex flex-col items-center space-y-2">
            <label htmlFor="profilePhoto" className="cursor-pointer">
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-8xl text-gray-500 hover:text-green-600 transition duration-200" />
              )}
            </label>
            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              accept="image/*"
              className="hidden"
            />
            <span className="text-sm text-gray-600">Click icon to upload photo</span>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your name"
              readOnly
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="you@example.com"
              readOnly
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNo"
              name="mobileNo"
              value={profile.mobileNo}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="+91 9876543210"
              readOnly
            />
          </div>


          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
             Role
            </label>
            <input
            
              id="role"
              name="role"
              value={profile.role}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="+91 9876543210"
              readOnly
            />
          </div>

         
        </form>
      </div>
    </div>
  );
};

export default User;