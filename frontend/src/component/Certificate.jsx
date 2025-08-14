// // import React from 'react'
// // import img1 from '../assets/certifi/certi (1).jpeg';
// // import img2 from '../assets/certifi/certi (2).jpeg';
// // import img3 from '../assets/certifi/certi (3).jpeg';
// // import img4 from '../assets/certifi/certi (4).jpeg';
// // import img5 from '../assets/certifi/certi (5).jpeg';

// // const Certificate = () => {
// //   return (
// //     <>
// //     <div className='flex flex-row gap-3 '>
// //         <img src={img1} alt='img1'/>
// //         <img src={img2} alt='img2'/>
// //         <img src={img3} alt='img3'/>
// //         <img src={img4} alt='img4'/>
// //         <img src={img5} alt='img5'/>
      
// //     </div>
// //     </>
// //   )
// // }

// // export default Certificate


// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import img1 from '../assets/certifi/certi (1).jpeg';
// import img2 from '../assets/certifi/certi (2).jpeg';
// import img3 from '../assets/certifi/certi (3).jpeg';
// import img4 from '../assets/certifi/certi (4).jpeg';
// import img5 from '../assets/certifi/certi (5).jpeg';

// const images = [img1, img2, img3, img4, img5];

// const Certificate = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Auto-slide every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full flex flex-col items-center justify-center py-10 bg-white">
//       <h2 className="text-2xl font-bold text-green-700 mb-6">Our Certifications</h2>

//       <div className="relative w-[300px] h-[200px] overflow-hidden rounded-lg shadow-lg">
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={images[currentIndex]}
//             src={images[currentIndex]}
//             alt={`Certificate ${currentIndex + 1}`}
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -100 }}
//             transition={{ duration: 0.6 }}
//             className="w-full h-full object-contain"
//           />
//         </AnimatePresence>
//       </div>

//       <div className="flex gap-2 mt-4">
//         {images.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentIndex(idx)}
//             className={`w-3 h-3 rounded-full ${
//               currentIndex === idx ? 'bg-green-600' : 'bg-gray-300'
//             }`}
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Certificate;



import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import img1 from '../assets/certifi/certi (1).jpeg';
import img2 from '../assets/certifi/certi (2).jpeg';
import img3 from '../assets/certifi/certi (3).jpeg';
import img4 from '../assets/certifi/certi (4).jpeg';
import img5 from '../assets/certifi/certi (5).jpeg';

const images = [img1, img2, img3, img4, img5];

const Certificate = () => {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);

  const swipeConfidenceThreshold = 10000;

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const paginate = (newDir) => {
    setCurrentIndex(([prev]) => {
      const newIndex = (prev + newDir + images.length) % images.length;
      return [newIndex, newDir];
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 bg-green-100">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Our Certifications</h2>

      <div className="relative w-full p-6 max-w-xl h-[250px] bg-white/80 overflow-hidden rounded-lg shadow-lg">
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`Certificate ${currentIndex + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="w-full h-full object-contain"
          />
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-2 py-1 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-2 py-1 rounded-full"
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex([idx, 0])}
            className={`w-3 h-3 rounded-full ${
              currentIndex === idx ? 'bg-green-600' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Certificate; 