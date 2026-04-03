const express = require('express');
const routes = require('express').Router();
const c = require('../controllers/admin.controller');
const auth = require('../middleware/auth.middleware');

routes.post('/login', c.login);

routes.post('/category', auth, c.addCategory);
routes.get('/category', auth, c.getCategory);

routes.get('/get-sellers', auth, c.getSellers);
routes.get('/get-users', auth, c.getUsers);

routes.get('/total-sales', auth, c.getTotalPlatformSales);

module.exports = routes;