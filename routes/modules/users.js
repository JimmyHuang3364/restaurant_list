const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body  //拿到表單送出的資料
  const errors = []
  //以下註冊流程
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '有*必填欄位未填寫' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符!!' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  //檢查email是否重複
  User.findOne({ email })
    .then(user => {
      //重複，回註冊頁，並恢復所填之資訊，並出現異常訊息
      if (user) {
        errors.push({ message: '此email已使用' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      //不重複，執行新增至資料庫流程
      return bcrypt
        .genSalt(10) //產鹽
        .then(salt => bcrypt.hash(password, salt)) //加鹽，並雜湊
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

    })

})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router