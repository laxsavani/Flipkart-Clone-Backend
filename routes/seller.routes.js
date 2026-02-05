const express = require("express");
const router = express.Router();
const c = require("../controllers/seller.controller");
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.post("/register", c.register);
router.post("/login", c.login);

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
router.put('/update-order-status/:id', auth, c.updateOredrStatus);


module.exports = router;