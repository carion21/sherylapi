const express = require('express');
const { getAppName } = require('../../../config/constante');
const router = express.Router();

const ArticleModel = require('../../../models/article_model');

router.get('/', async function (req, res, next) {
  // code principal ici
  res.redirect('/api/srv05/article_model/all');
});

router.get('/all', async function (req, res, next) {
  // code principal ici
  let result = {
    success: false,
  }

  try {
    datas = await ArticleModel.getAll()
    result.success = true
    result.data = datas
  } catch (error) {
    result.message = error.message
  }

  res.json(result);
});

module.exports = router;
