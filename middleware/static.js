const path = require('path')
const express = require('express')

module.exports = [
  express.static(path.join(__dirname, '../styles')),
  express.static(path.join(__dirname, '../content')),
  express.static(path.join(__dirname, '../scripts'))
]
