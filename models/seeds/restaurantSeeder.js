const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const RESTAURANT = require('../restaurant')
const User = require('../user')
const restaurantsList = require('./restaurants.json')
const SEED_USER = require('./users.json')
const db = require('../../config/mongoose')


db.once('open', () => {
  SEED_USER.results.forEach(element => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(element.password, salt))
      .then(hash => User.create({
        mame: element.name,
        email: element.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        const userFavorite = []
        element.favoriteReataurantID.forEach(idNum => {
          userFavorite.push(restaurantsList.results.find((item) => {
            return item.id === idNum
          }))
        })


        Array.from(userFavorite, restaurant => {
          RESTAURANT.create({
            name: restaurant.name,
            name_en: restaurant.name_en,
            category: restaurant.category,
            image: restaurant.image,
            location: restaurant.location,
            phone: restaurant.phone,
            google_map: restaurant.google_map,
            rating: restaurant.rating,
            description: restaurant.description,
            userId: userId
          })
        })
      })
    // .then(() => {
    //   console.log('done.')
    //   process.exit()
    // })
  })

  console.log('種子資料載入完成!!')
  console.log('按 Ctrl + C 退出')
})