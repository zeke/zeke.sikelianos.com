const path = require('path')
const stylus = require('stylus')

module.exports = stylus.middleware({
  src: path.join(__dirname + '../styles'),
  dest: path.join(__dirname + '../content/styles/'),
  debug: true,
  force: true
})