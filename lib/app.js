const hbs = require('express-hbs')
const express = require('express')

var app = module.exports = express()

app.use(express.static(__dirname))
app.engine('hbs', hbs.express4({
  layoutsDir: __dirname + '/../templates/layouts',
  partialsDir: __dirname + '/../templates/partials',
  defaultLayout: __dirname + '/../templates/layouts/default.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/../templates')
app.set('port', Number(process.env.PORT) || 3000)
