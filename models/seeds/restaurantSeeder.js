const restaurant = require('../restaurant')
const restaurantsList = require('./restaurants.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!!')
  restaurantsList.results.forEach(element => {
    restaurant.create({
      name: element.name,
      name_en: element.name_en,
      category: element.category,
      image: element.image,
      location: element.location,
      phone: element.phone,
      google_map: element.google_map,
      rating: element.rating,
      description: element.description
    })
  })
  console.log('種子資料載入完成!!')
  console.log('按 Ctrl + C 退出')
})