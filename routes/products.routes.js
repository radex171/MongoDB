const express = require('express');
const router = express.Router();

const productsControllers = require('../controllers/products.controller');

router.get('/products', productsControllers.getAll);
router.get('/products/random', productsControllers.getRandom);
router.get('/products/:id', productsControllers.getId);
router.post('/products', productsControllers.postNew);
router.put('/products/:id', productsControllers.putUpdate);
router.delete('/products/:id', productsControllers.delete);

module.exports = router;
