var express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const UrlShorten = mongoose.model('UrlShorten')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index')
})

router.get('/:code', async (req, res) => {
  const urlCode = req.params.code
  const item = await UrlShorten.findOne({ urlCode: urlCode })
  if (item) {
    return res.redirect(item.originalUrl)
  } else {
    return res.redirect('/')
  }
})

module.exports = router
