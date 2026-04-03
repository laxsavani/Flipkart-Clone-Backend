const { Admin, Category, Seller, User, Order } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Admin Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const findCategory = await Category.findOne({ where: { name } });
        if (findCategory) {
            return res.status(409).json({ message: "Category already exists" });
        }
        if(!name){
            return res.status(400).json({ message: "Category name is required" });
        }
        const category = await Category.create({ name });
        res.status(201).json({ message: "Category added successfully", category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findAll();
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }        
        res.status(200).json({ message: "Category fetched successfully", category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSellers = async (req, res) => {
    try {
        const sellers = await Seller.findAll();
        if (!sellers) {
            return res.status(404).json({ message: "Sellers not found" });
        }        
        res.status(200).json({ message: "Sellers fetched successfully", sellers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        if (!users) {
            return res.status(404).json({ message: "Users not found" });
        }        
        res.status(200).json({ message: "Users fetched successfully", users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTotalPlatformSales = async (req, res) => {
    try {
        const totalPlatformSales = await Order.sum('totalPrice', { where: { status: "Delivered" } });
        if (!totalPlatformSales) {
            return res.status(404).json({ message: "Total platform sales not found" });
        }        
        res.status(200).json({ message: "Total platform sales fetched successfully", totalPlatformSales });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};