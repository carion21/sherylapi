const express = require('express');
const router = express.Router();

const index = require('../routes/api/index')

const srv03_article_brand = require('../routes/api/service_05/article_brand')
const srv03_article_gender = require('../routes/api/service_05/article_gender')
const srv03_article_type = require('../routes/api/service_05/article_type')
const srv03_article_model = require('../routes/api/service_05/article_model')
const srv03_article_sale = require('../routes/api/service_05/article_sale')
const srv03_article = require('../routes/api/service_05/article')

const srv03_detail_order_temp = require('../routes/api/service_05/detail_order_temp')
const srv03_detail_order_final = require('../routes/api/service_05/detail_order_final')
const srv03_order = require('../routes/api/service_05/order')

const srv03_categorie = require('../routes/api/service_05/categorie')
const srv03_payment = require('../routes/api/service_05/payment')
const srv03_stock = require('../routes/api/service_05/stock')

const user = require('../routes/api/user')


router.use('/', index)

router.use('/srv03/article_brand', srv03_article_brand)
router.use('/srv03/article_gender', srv03_article_gender)
router.use('/srv03/article_type', srv03_article_type)
router.use('/srv03/article_model', srv03_article_model)
router.use('/srv03/article_sale', srv03_article_sale)
router.use('/srv03/article_type', srv03_article_type)
router.use('/srv03/article', srv03_article)

router.use('/srv03/detail_order_temp', srv03_detail_order_temp)
router.use('/srv03/detail_order_final', srv03_detail_order_final)
router.use('/srv03/order', srv03_order)

router.use('/srv03/categorie', srv03_categorie)
router.use('/srv03/payment', srv03_payment)
router.use('/srv03/stock', srv03_stock)

router.use('/user', user)



module.exports = router;