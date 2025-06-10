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
        fs.unlinkSync(file[0].path); // Xóa file tạm sau khi upload lên Cloudinary
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
    const { id, name, description, price, category, brand, bestseller } = req.body;
    const images = req.files;

    // Lấy sản phẩm hiện tại
    const existingProduct = await productModel.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Luôn đảm bảo mảng ảnh có 4 phần tử
    let newImages = [...existingProduct.images, '', '', '', ''].slice(0, 4);

    // Nếu có ảnh mới upload, cập nhật đúng vị trí
    if (images && Object.keys(images).length > 0) {
      for (const [field, files] of Object.entries(images)) {
        const index = parseInt(field.replace('image', '')) - 1;
        if (files && files[0]) {
          const result = await cloudinary.uploader.upload(files[0].path, { folder: "products" });
          newImages[index] = result.secure_url;
          fs.unlinkSync(files[0].path);
        }
      }
    }

    const updateData = {
      name, description, price, category, brand, bestseller,
      images: newImages,
    };

    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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