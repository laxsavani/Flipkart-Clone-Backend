require('dotenv').config();
const { Seller, SubCategory, Product, Order, Otp } = require('../models');
const bcrypt = require('bcryptjs');
const { registerMailForSeller, sendOtpMail } = require('../utils/mail');
const cloudinary = require('../config/cloudinary');
const { generateSellerToken } = require('../utils/token');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body; 

        const existingSeller = await Seller.findOne({ where: { email } });
        if (existingSeller) {
           return res.status(409).json({ message: "Email already exists" });
        }

        await registerMailForSeller(req.body.name, req.body.email);
        
        const seller = await Seller.create({name, email, Password: bcrypt.hashSync(password, 10)});
        res.status(201).send({ message: 'Seller registered successfully', seller });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ where: { email } });
    if (!seller) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, seller.Password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateSellerToken({id: seller.id, email: seller.email})

    res.status(200).json({ message: "Seller Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addSubCategory = async (req, res) => {
    try {
        const { name, category_id } = req.body;
        if(!name || !category_id){
            return res.status(400).json({ message: "SubCategory name and category id is required" });
        }
        const subCategory = await SubCategory.create({ name, category_id });
        res.status(201).json({ message: "SubCategory added successfully", subCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const subCategory = await SubCategory.findByPk(id);
        if (!subCategory) return res.status(404).json({ message: "SubCategory not found" });
        await subCategory.destroy();
        res.status(200).json({ message: "SubCategory deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.restoreSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const subCategory = await SubCategory.findByPk(id, { paranoid: false });
        if (!subCategory) return res.status(404).json({ message: "SubCategory not found" });
        await subCategory.restore();
        res.status(200).json({ message: "SubCategory restored successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, mrp, stock, subCategory_id } = req.body;
    const seller_id = req.user.id;

    if (!name || !description || !price || !mrp || !stock || !seller_id || !subCategory_id) {
      return res.status(400).json({ message: "All product details are required" });
    }

    const images = req.files?.map(file => file.path) || [];
    if (images.length === 0) return res.status(400).json({ message: "At least one product image is required" });
    if (images.length > 5) return res.status(400).json({ message: "You can upload a maximum of 5 images" });

    const product = await Product.create({
      name, description, price, mrp, stock, seller_id, subCategory_id,
      images: JSON.stringify(images),
    });

    const rp = product.toJSON();
    rp.images = JSON.parse(rp.images);

    res.status(201).json({ message: "Product added successfully", product: rp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, mrp, stock, seller_id, category_id, subCategory_id } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.files && req.files.length > 0) {
      if (req.files.length > 5) {
        return res.status(400).json({ message: "You can upload a maximum of 5 images" });
      }
      
      if (product.images) {
        try {
          const oldImages = JSON.parse(product.images);
          for (const url of oldImages) {
            const parts = url.split('/');
            const folder = parts[parts.length - 2];
            const fileName = parts[parts.length - 1].split('.')[0];
            const publicId = `${folder}/${fileName}`;
            await cloudinary.uploader.destroy(publicId);
          }
        } catch (err) {
          console.error("Error deleting old images from Cloudinary:", err);
        }
      }
      product.images = JSON.stringify(req.files.map(file => file.path));
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.mrp = mrp || product.mrp;
    product.stock = stock || product.stock;
    product.seller_id = seller_id || product.seller_id;
    product.category_id = category_id || product.category_id;
    product.subCategory_id = subCategory_id || product.subCategory_id;

    await product.save(); 

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const products = await Product.findAll();
    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.status(200).json({ message: "Products fetched successfully", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findAll({ where: { seller_id: id } });
    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.status(200).json({ message: "Products fetched successfully", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const id = req.user.id;
    const orders = await Order.findAll({ where: { seller_id: id } });
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.filterOrders = async (req, res) => {
  try {
    const { status } = req.params;
    const id = req.user.id;
    const orders = await Order.findAll({ where: { seller_id: id, status: status } });
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    res.status(200).json({ message: "Orders fetched successfully", orders });
  }catch(error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateOredrStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.status = status;
    await order.save();
    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete images from Cloudinary
    if (product.images) {
      try {
        const images = JSON.parse(product.images);
        for (const url of images) {
          const parts = url.split('/');
          const folder = parts[parts.length - 2];
          const fileName = parts[parts.length - 1].split('.')[0];
          const publicId = `${folder}/${fileName}`;
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (err) {
        console.error("Error deleting images from Cloudinary during product deletion:", err);
      }
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.restoreProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, { paranoid: false });
    if (!product) return res.status(404).json({ message: "Product not found" });
    await product.restore();
    res.status(200).json({ message: "Product restored successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const seller = await Seller.findOne({ where: { email } });
    if (!seller) {
      return res.status(404).json({ message: "No seller account found with this email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

    await Otp.destroy({ where: { email, type: 'seller', used: false } });

    await Otp.create({ email, otp, type: 'seller', expiresAt });

    await sendOtpMail(seller.name, seller.email, otp);

    res.status(200).json({
      message: "OTP sent to your email. It is valid for 10 minutes."
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyOtpAndReset = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }

    const otpRecord = await Otp.findOne({
      where: { email, otp, type: 'seller', used: false }
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP. Please request a new one." });
    }

    if (new Date() > new Date(otpRecord.expiresAt)) {
      await otpRecord.destroy();
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    const seller = await Seller.findOne({ where: { email } });
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    seller.Password = bcrypt.hashSync(newPassword, 10);
    await seller.save();

    otpRecord.used = true;
    await otpRecord.save();

    res.status(200).json({ message: "Password reset successfully. You can now login with your new password." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
