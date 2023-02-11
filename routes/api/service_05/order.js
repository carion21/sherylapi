const express = require('express');
const { getAppName } = require('../../../config/constante');
const router = express.Router();

const Order = require('../../../models/order');

router.get('/', async function (req, res, next) {
  // code principal ici
  res.redirect('/api/srv05/order/all');
});

router.get('/all', async function (req, res, next) {
  // code principal ici
  let result = {
    success: false,
  }

  try {
    datas = await Order.getAll()
    result.success = true
    result.data = datas
  } catch (error) {
    result.message = error.message
  }

  res.json(result);
});

module.exports = router;
