module.exports = {
  authenticator: (req, res) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}