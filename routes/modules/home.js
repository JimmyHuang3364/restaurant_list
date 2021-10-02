const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// homepage: restaurants list
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.put('/sort', (req, res) => {
  // console.log(req.body.sort)
  const sortItems = {
    default: [{ _id: 'asc' }, ""],
    nameAsc: [{ name: 'asc' }, "A -> Z"],
    nameDesc: [{ name: 'desc' }, "Z -> A"],
    category: [{ category: 'asc' }, "category"],
    location: [{ location: 'asc' }, "location"],
  }
  const sortItem = sortItems[req.body.sort]
  const sortName = sortItem[1]

  console.log(sortItem)
  Restaurant.find()
    .lean()
    .sort(sortItem[0])
    .then(restaurants => res.render('index', { restaurants, sortName }))
    .catch(error => console.log(error))
})

module.exports = router