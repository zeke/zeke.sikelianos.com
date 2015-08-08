const hbs = require('express-hbs')
const express = require('express')
const stylus = require('stylus')

var app = module.exports = express()

app.use(stylus.middleware(__dirname + '/..'))
app.use(express.static(__dirname + '/..'))

app.engine('hbs', hbs.express4({
  layoutsDir: __dirname + '/../templates/layouts',
  partialsDir: __dirname + '/../templates/partials',
  defaultLayout: __dirname + '/../templates/layouts/default.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/../templates')
app.set('port', Number(process.env.PORT) || 3000)
