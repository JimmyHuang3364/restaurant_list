const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantsList = require('./restaurants.json')
const port = 3000

app.engine('handlebars', exphbs({ defaultlayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))


// restaurants list
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantsList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantsList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantsList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })

  res.render('index', { restaurants: restaurants, keyword: keyword })
})


app.listen(port, () => {
  console.log('server is running')
})