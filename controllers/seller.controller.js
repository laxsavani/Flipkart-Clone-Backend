require('dotenv').config();
const { Seller, SubCategory, Product, Order } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body; 

        const existingSeller = await Seller.findOne({ where: { email } });
        if (existingSeller) {
           return res.status(409).json({ message: "Email already exists" });
        }

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

    const token = jwt.sign(
      { id: seller.id, email: seller.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

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

    const images = req.files?.map(file => file.filename) || [];
    if (images.length === 0) return res.status(400).json({ message: "At least one product image is required" });

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

    console.log(req.params);

    if (!name || !description || !price || !mrp || !stock || !seller_id || !category_id || !subCategory_id) {
      return res.status(400).json({ message: "All product details are required" });
    }

    const images = req.files?.map(file => file.filename) || [];
    if (images.length === 0) return res.status(400).json({ message: "At least one product image is required" });

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name;
    product.description = description;
    product.price = price;
    product.mrp = mrp;
    product.stock = stock;
    product.seller_id = seller_id;
    product.category_id = category_id;
    product.subCategory_id = subCategory_id;
    product.images = JSON.stringify(images);

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