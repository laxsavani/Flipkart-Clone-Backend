require('dotenv').config();
const { User, Order, OrderItems, Product, Cart, CartItems, Otp } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOtpMail } = require('../utils/mail');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body; 

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
           return res.status(409).json({ message: "Email already exists" });
        }

        const user = await User.create({name, email, Password: bcrypt.hashSync(password, 10)});
        res.status(201).send({ message: 'User registered successfully', user });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "User Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
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

exports.filterProducts = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.query;
    if(categoryId && !subCategoryId){
      const products = await Product.findAll({ where: { categoryId } });
      if (!products) {
        return res.status(404).json({ message: "Product's Category not found" });
      }
      res.status(200).json({ message: "Products fetched successfully By Category", products });
    }
    else if(subCategoryId && !categoryId){
      const products = await Product.findAll({ where: { subCategoryId } });
      if (!products) {
        return res.status(404).json({ message: "Product's SubCategory not found" });
      }
      res.status(200).json({ message: "Products fetched successfully By SubCategory", products });
    }
    else{
      const products = await Product.findAll({ where: { categoryId, subCategoryId } });
      if (!products) {
        return res.status(404).json({ message: "Products not found" });
      }
      res.status(200).json({ message: "Products fetched successfully", products });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { items } = req.body;
    const user_id = req.user.id;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items array is required"
      });
    }

    const [cart] = await Cart.findOrCreate({
      where: { user_id }
    });

    for (const item of items) {
      const { product_id, quantity } = item;

      if (!product_id || !quantity || quantity <= 0) continue;

      const existingItem = await CartItems.findOne({
        where: {
          cart_id: cart.id,
          product_id
        }
      });

      if (existingItem) {
        existingItem.quantity += quantity;
        await existingItem.save();
      } else {
        await CartItems.create({
          cart_id: cart.id,
          product_id,
          quantity
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Items added to cart"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    console.log(user_id);
    const cart = await Cart.findOne({ where: { user_id } });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const cartItems = await CartItems.findAll({ where: { cart_id: cart.id } });
    res.status(200).json({ message: "Cart fetched successfully", cartItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await CartItems.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    await cartItem.destroy();
    res.status(200).json({ message: "Cart item removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.placeOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const payment = req.body.payment;

    const cart = await Cart.findOne({ where: { user_id }});
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItems = await CartItems.findAll({
      where: { cart_id: cart.id },
      include: [{ model: Product }]
    });

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orders = [];

    for (const item of cartItems) {
      const product = item.Product;

      if (product.stock < item.quantity) {
        throw new Error(
          `Insufficient stock for product: ${product.name}`
        );
      }

      const totalPrice = product.price * item.quantity;

      const order = await Order.create({
        user_id,
        seller_id: product.seller_id,
        product_id: product.id, 
        quantity: item.quantity,
        totalPrice,
        paymentMethod: payment,
        status: "Placed"
      });

      await OrderItems.create({
        order_id: order.id,
        product_id: product.id,
        quantity: item.quantity,
        price: product.price
      });

      await Product.update(
        { stock: product.stock - item.quantity },
        { where: { id: product.id }}
      );

      orders.push(order);
    }

    await CartItems.destroy({ where: { cart_id: cart.id }});
    await Cart.destroy({ where: { id: cart.id }});

    return res.status(200).json({
      message: "Orders placed successfully",
      orders
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const user_id = req.user.id;

    const orders = await Order.findAll({ where: { user_id } });

    if (!orders.length) {
      return res.status(404).json({ message: "Orders not found" });
    }

    return res.status(200).json({
      message: "Orders fetched successfully",
      orders
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.orderTracking = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order fetched successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.update({ status: "Cancelled" });

    res.status(200).json({
      message: "Order cancelled successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "No user account found with this email" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Delete any existing unused OTPs for this email
    await Otp.destroy({ where: { email, type: 'user', used: false } });

    // Save new OTP in DB
    await Otp.create({ email, otp, type: 'user', expiresAt });

    // Send OTP via email
    await sendOtpMail(user.name, user.email, otp);

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

    // Find OTP record
    const otpRecord = await Otp.findOne({
      where: { email, otp, type: 'user', used: false }
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP. Please request a new one." });
    }

    // Check if OTP has expired
    if (new Date() > new Date(otpRecord.expiresAt)) {
      await otpRecord.destroy();
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // OTP is valid — find user and update password
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.Password = bcrypt.hashSync(newPassword, 10);
    await user.save();

    // Mark OTP as used
    otpRecord.used = true;
    await otpRecord.save();

    res.status(200).json({ message: "Password reset successfully. You can now login with your new password." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
