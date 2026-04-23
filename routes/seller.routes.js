const express = require("express");
const router = express.Router();
const c = require("../controllers/seller.controller");
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.use((req, res, next) => {
    // #swagger.tags = ['Seller APIs']
    next();
});

router.post("/register", c.register);
router.post("/login", c.login);
router.post("/forgot-password", c.forgotPassword);
router.post("/verify-otp", c.verifyOtp);
router.post("/reset-password", c.resetPassword);

router.post('/add-sub-category', auth, c.addSubCategory);
router.delete('/delete-sub-category/:id', auth, c.deleteSubCategory);
router.post('/restore-sub-category/:id', auth, c.restoreSubCategory);

router.post('/add-product', auth, upload.array('images', 5), c.addProduct)
router.put('/upadte-product/:id', auth, upload.array('images', 5), c.updateProduct);
router.get('/get-product/:id', auth, c.listProducts);
router.get('/get-product', auth, c.getProduct);
router.delete('/delete-product/:id', auth, c.deleteProduct);
router.post('/restore-product/:id', auth, c.restoreProduct);

router.get('/get-orders', auth, c.getOrders);
router.get('/filter-order/:status', auth, c.filterOrders);
router.put('/update-order-status/:id', auth, c.updateOredrStatus);


module.exports = router;