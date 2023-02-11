const express = require('express');
const router = express.Router();

const index     = require('../routes/home/index')
const docs      = require('../routes/home/docs')
const swagger   = require('../routes/home/swagger')


router.use('/', index)
router.use('/docs', docs)   
router.use('/swagger', swagger)

module.exports = router;