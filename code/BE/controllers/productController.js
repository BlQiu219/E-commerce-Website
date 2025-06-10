import fs from 'fs'; // Use import instead of require
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Hàm thêm sản phẩm
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand } = req.body;
    const images = req.files;

    if (!name || !description || !price || !category || !brand) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const uploadedImages = [];
    for (const file of Object.values(images)) {
      try {
        const result = await cloudinary.uploader.upload(file[0].path, {
          folder: "products",
        });
        console.log("Uploaded image URL:", result.secure_url); // Log URL ảnh được tải lên
        uploadedImages.push(result.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const newProduct = new productModel({
      name,
      description,
      price,
      category,
      brand,
      bestseller: req.body.bestseller === 'true', // Convert string to boolean
      images: uploadedImages,
      date: new Date(),
    });

    await newProduct.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Hàm cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded files:", req.files);

    const { id, name, description, price, category, brand, bestseller } = req.body;

    const existingProduct = await productModel.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let images = [...existingProduct.images];

    if (req.files) {
      if (req.files.image1) {
        images[0] = `${req.protocol}://${req.get('host')}/${req.files.image1[0].path.replace(/\\/g, '/')}`;
      }
      if (req.files.image2) {
        images[1] = `${req.protocol}://${req.get('host')}/${req.files.image2[0].path.replace(/\\/g, '/')}`;
      }
      if (req.files.image3) {
        images[2] = `${req.protocol}://${req.get('host')}/${req.files.image3[0].path.replace(/\\/g, '/')}`;
      }
      if (req.files.image4) {
        images[3] = `${req.protocol}://${req.get('host')}/${req.files.image4[0].path.replace(/\\/g, '/')}`;
      }
    }

    if (!req.files.image1 && req.body.image1) images[0] = req.body.image1;
    if (!req.files.image2 && req.body.image2) images[1] = req.body.image2;
    if (!req.files.image3 && req.body.image3) images[2] = req.body.image3;
    if (!req.files.image4 && req.body.image4) images[3] = req.body.image4;

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, description, price, category, brand, bestseller, images },
      { new: true }
    );

    console.log("Updated product:", updatedProduct);
    res.json({ success: true, message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Hàm lấy danh sách sản phẩm
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Hàm xóa sản phẩm
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Hàm lấy chi tiết sản phẩm
const singleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("Product ID received in backend:", productId); // Log giá trị `id`

    if (!productId || productId === "undefined") {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }    
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product }); // Đảm bảo trả về `product.images`
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct, updateProduct };