const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: '用戶不存在!!' })
        }
        if (user.password !== password) {
          return done(null, false, { message: '密碼錯誤!!' })
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))
  //序列化&反序列化
  passport.serializeUser((user, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}