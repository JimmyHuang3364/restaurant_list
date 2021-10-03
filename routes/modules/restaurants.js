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
  // console.log(sortCondition)

  const sortItems = {
    default: [{ _id: 'asc' }, ""],
    nameAsc: [{ name: 'asc' }, "A -> Z"],
    nameDesc: [{ name: 'desc' }, "Z -> A"],
    category: [{ category: 'asc' }, "category"],
    location: [{ location: 'asc' }, "location"],
  }

  // console.log(sortItems[sortCondition])
  const sortName = sortItems[sortCondition][1]

  Restaurant.find()
    .lean()
    .sort(sortItems[sortCondition][0])
    .then(restaurants => res.render('index', { restaurants, sortName }))
    .catch(error => console.log(error))
})

module.exports = router