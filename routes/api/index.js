const mongoose = require('mongoose')
const validUrl = require('valid-url')
const UrlShorten = mongoose.model('UrlShorten')
const shortid = require('shortid')
var express = require('express')
var router = express.Router()

router.post('/shorturl', async (req, res) => {
  const { originalUrl } = req.body
  const shortBaseUrl = process.env.BASE_URL
  const urlCode = shortid.generate()
  const updatedAt = new Date()
  if (validUrl.isWebUri(originalUrl)) {
    try {
      const item = await UrlShorten.findOne({ originalUrl: originalUrl })
      if (item) {
        res.status(200).json({
          status: true,
          originalUrl: item.originalUrl,
          shortUrl: item.shortUrl,
        })
      } else {
        shortUrl = shortBaseUrl + '/' + urlCode
        const item = new UrlShorten({
          originalUrl,
          shortUrl,
          urlCode,
          updatedAt,
        })
        await item.save()
        res.status(200).json({
          status: true,
          originalUrl: item.originalUrl,
          shortUrl: item.shortUrl,
        })
      }
    } catch (err) {
      return res.status(401).json({
        status: false,
        message: 'Something went wrong, please try again.',
      })
    }
  } else {
    return res.status(401).json({
      status: false,
      message: 'Please enter a valid URL',
    })
  }
})

module.exports = router
