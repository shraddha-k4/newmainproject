// import { Order } from "../model/Order.js";
// import  Product  from "../model/Product.js";


// export const addProduct = async (req, res) => {
//   try {

//     // console.log("Body:",req.body);
//     // console.log("Files:",req.files);
//     //  console.log("User ID:", req.user?.id);
//     const {
//       name,
//       brand,
//       price,
//       description,
//       ingredients,
//       category,
//       idealFor,
//       shelfLife,
//       manufacturer,
//       fssai,
//       size
//     } = req.body;

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: "No images uploaded" });
//     }


//     // const imagePaths = req.files.map(file => file.path);
//     const imagePaths = req.files.map(file => `uploads/${file.filename}`);


//     const newProduct = new Product({
//       name, brand, price, description,
//       ingredients, idealFor, shelfLife,category,
//       manufacturer, fssai, size,
//       images: imagePaths,
//       seller: req.user.id
//     });

//     await newProduct.save();
//     res.status(201).json({ message: 'Product created', product: newProduct });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// controller/productController.js

import Product from '../model/Product.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import {Order} from '../model/Order.js'

export const addProduct = async (req, res) => {
  try {
    const { name, brand, price, description, ingredients, idealFor, shelfLife, manufacturer, category, fssai, size } = req.body;

    let imageUrls = [];

    // Upload all images to cloudinary
    for (let file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'products',
      });

      imageUrls.push(result.secure_url);

      // delete local file after upload
      fs.unlinkSync(file.path);
    }

    const product = new Product({
      name,
      brand,
      price,
      description,
      ingredients,
      idealFor,
      shelfLife,
      manufacturer,
      category,
      fssai,
      size,
      images: imageUrls,
      seller: req.user.id, // from verifyToken middleware
    });

    await product.save();

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('Error in addProduct:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMyProducts = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const products = await Product.find({ seller: sellerId }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};



export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const updateProduct = async (req, res) => {
//   try {
//     const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// backend/src/controller/productController.js

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Trim ID if it has newline or space
    const trimmedId = id.trim();

    // Handle Cloudinary image upload
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => {
        return cloudinary.uploader.upload(file.path, {
          folder: 'products', // Cloudinary मध्ये 'products' नावाचा फोल्डर
        });
      });

      const results = await Promise.all(uploadPromises);
      const imageUrls = results.map((result) => result.secure_url);
      updatedData.images = imageUrls;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      trimmedId,
      updatedData,
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err });
  }
};



export const getSellerSummary = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const totalProducts = await Product.countDocuments({ seller: sellerId });

    const totalOrders = await Order.countDocuments({ seller: sellerId });

    const totalEarningsResult = await Order.aggregate([
      { $match: { seller: sellerId, status: 'Delivered' } },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" }
        }
      }
    ]);

    const totalEarnings = totalEarningsResult.length > 0 ? totalEarningsResult[0].total : 0;

    res.json({
      totalProducts,
      totalOrders,
      totalEarnings
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
