const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const RESTAURANT = require('../restaurant')
const User = require('../user')
const restaurantsList = require('./restaurants.json').results
const SEED_USER = require('./users.json').results
const db = require('../../config/mongoose')


db.once('open', () => {
  console.log('加載種子資料')
  Promise.all(
    Array.from(SEED_USER, element => {
      return bcrypt
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
          Array.from(element.favoriteReataurantIdex, index => {
            restaurantsList[index].userId = userId
            userFavorite.push(restaurantsList[index])
          })
          return RESTAURANT.create(userFavorite)
        })
    }))
    .then(() => {
      console.log('加載完成')
      console.log('退出程式')
      process.exit()
    })
    .catch(err => console.log(err))
})