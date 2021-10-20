const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body  //拿到表單送出的資料
  //以下註冊流程
  //檢查email是否重複
  User.findOne({ email })
    .then(user => {
      //重複，回註冊頁，並恢復所填之資訊
      if (user) {
        console.log('此email已使用')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else { //不重複，執行新增至資料庫流程
        return User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })

})

module.exports = router