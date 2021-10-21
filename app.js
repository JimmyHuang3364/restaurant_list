// 載入 express 並建構應用程式伺服器
const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const routes = require('./routes')
const port = 3000

// 連線資料庫
require('./config/mongoose')


app.engine('hbs', exphbs({ defaultlayout: 'main' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)

// app.use((req, res, next) => {
//   res.locals.isAuthemticaed = req.isAuthenticated()
//   res.locals.user = req.user
//   next()
// })

app.use(routes)


app.listen(port, () => {
  console.log('server is running')
})