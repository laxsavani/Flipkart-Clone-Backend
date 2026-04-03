const express = require("express");
const router = express.Router();
const c = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

router.post("/register", c.register);
router.post("/login", c.login);
router.post("/forgot-password", c.forgotPassword);
router.post("/verify-otp-reset", c.verifyOtpAndReset);

router.get('/get-products', auth, c.getProducts);
router.get('/filter-products', auth, c.filterProducts);

router.post('/add-to-cart', auth, c.addToCart);
router.get('/get-cart/:id', auth, c.getCart);
router.delete('/remove-from-cart/:id', auth, c.removeFromCart);

router.post('/place-order', auth, c.placeOrder);
router.get('/get-order', auth, c.getOrders);
router.get('/order-tracking/:id', auth, c.orderTracking);
router.post('/cancel-order/:id', auth, c.cancelOrder);

module.exports = router;