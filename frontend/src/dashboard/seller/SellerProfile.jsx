// import React from 'react'
// import SellerSidebar from './SellerSidebar.jsx'
// import SellerNavbar from './SellerNavbar.jsx'

// const SellerProfile = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <div className="hidden md:block">
//         <SellerSidebar />
//       </div>
//       <SellerNavbar/>
//       hi
//     </div>
//   )
// }

// export default SellerProfile


import React from 'react';
import SellerSidebar from './SellerSidebar.jsx';
import SellerNavbar from './SellerNavbar.jsx';

const SellerProfile = () => {
  return (
    <>
    <div className="flex min-h-screen bg-white">
      {/* Sidebar for medium and larger screens */}
      <div className="hidden md:block">
        <SellerSidebar />
      </div>

      {/* Navbar for mobile screens only */}
      <div className="md:hidden w-full">
        <SellerNavbar />
        
      </div>
      
           
    </div>
    
    </>
  );
};

export default SellerProfile;