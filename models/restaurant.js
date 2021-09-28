const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  name_en: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: false
  },
  location: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  google_map: {
    type: String,
    require: false
  },
  rating: {
    type: String,
    require: false
  },
  description: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('restaurant', restaurantSchema)