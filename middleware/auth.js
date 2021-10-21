module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '先登入再開始使用。')
    res.redirect('/users/login')
  }
}