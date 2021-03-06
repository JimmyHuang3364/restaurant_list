const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// show: restaurant detail
router.get('/:id/detail', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// search: restaurants list
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then(allRestaurants => {
      const restaurants = allRestaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { restaurants })
    })
    .catch(error => console.log(error))
})

//about ceate new restaurant
router.get('/add', (req, res) => {
  return res.render('add')
})

router.post('/', (req, res) => {
  req.body.userId = req.user._id
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// about restaurant edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}/detail`))
    .catch(error => console.log(error))
})

// about restaurant remove
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndRemove(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// about restaurant sort
router.get('/sort', (req, res) => {
  const sortCondition = req.query.sortCondition
  const userId = req.user._id
  const sortItems = {
    nameAsc: {
      order: { _id: 'asc' },
      title: 'A -> Z'
    },
    nameDesc: {
      order: { name: 'desc' },
      title: 'Z -> A'
    },
    category: {
      order: { category: 'asc' },
      title: 'category'
    },
    location: {
      order: { location: 'asc' },
      title: 'location'
    },
  }
  const sortName = sortItems[sortCondition].title

  Restaurant.find({ userId })
    .lean()
    .sort(sortItems[sortCondition].order)
    .then(restaurants => res.render('index', { restaurants, sortName }))
    .catch(error => console.log(error))
})

module.exports = router