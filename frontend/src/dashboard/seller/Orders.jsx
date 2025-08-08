// src/dashboard/Orders.jsx
// import React from 'react';
// import SellerSidebar from './SellerSidebar';

// const sampleOrders = [
//   { id: 101, customer: "Rahul", status: "Pending" },
//   { id: 102, customer: "Sneha", status: "Delivered" },
// ];

// const Orders = () => {
//   return (
//     <div className="flex">
//       <SellerSidebar />
//       <div className="ml-64 p-10 w-full">
//         <h2 className="text-2xl font-semibold mb-4">Orders</h2>
//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 border">Order ID</th>
//               <th className="p-2 border">Customer</th>
//               <th className="p-2 border">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sampleOrders.map((order) => (
//               <tr key={order.id}>
//                 <td className="p-2 border">{order.id}</td>
//                 <td className="p-2 border">{order.customer}</td>
//                 <td className="p-2 border">{order.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React from 'react';
import SellerSidebar from './SellerSidebar.jsx';
import SellerNavbar from './SellerNavbar.jsx';

const Orders = () => {
  return (
    
    <>
      <div className="flex min-h-screen">
      <div className="hidden md:block">
        <SellerSidebar />
      </div>
      <div className="flex-1 p-4 pb-20 md:pb-4">
      <SellerNavbar />
      <h2 className="text-xl font-semibold">Orders</h2>
        {/* map product list here */}
       <p>No recent orders.</p>
    </div>
   </div>
    </>
  );
};

export default Orders;
