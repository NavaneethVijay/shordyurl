const mongoose = require('mongoose')
const { Schema } = mongoose
const urlShortenSchema = new Schema(
  {
    originalUrl: String,
    urlCode: String,
    shortUrl: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000,
    },
  }
)
mongoose.model('UrlShorten', urlShortenSchema)
