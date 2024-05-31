// backend/routes/exampleRoute.js
const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/controllerTest');

// Define a route and link it to the controller method
router.get('/', exampleController.getExample);

module.exports = router;
