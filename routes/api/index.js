const express = require('express');
const { getAppName } = require('../../config/constante');
const router = express.Router();


router.get('/', async function (req, res, next) {
  // code principal ici

  res.render(
    "api/index", {
    title: getAppName()
  });
});

module.exports = router;
