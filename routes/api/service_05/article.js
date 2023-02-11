const express = require('express');
const { getAppName } = require('../../../config/constante');
const router = express.Router();

const Article = require('../../../models/article');

router.get('/', async function (req, res, next) {
  // code principal ici
  res.redirect('/api/srv05/article/all');
});

router.get('/all', async function (req, res, next) {
  // code principal ici
  let result = {
    success: false,
  }

  try {
    datas = await Article.getAll()
    result.success = true
    result.data = datas
  } catch (error) {
    result.message = error.message
  }

  res.json(result);
});

module.exports = router;
