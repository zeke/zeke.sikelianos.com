require('./tooltips')()
require('browser-date-formatter')()

var analytics = require('analytics.js-loader')({writeKey: 'Swfv9Hp8UkkaNuJtj5ZsxTPYQyB6Vhgj'})

document.addEventListener('DOMContentLoaded', function (event) {
  document.querySelectorAll('figure > img.multiply').forEach(img => {
    var width = img.clientWidth
    var height = img.clientHeight
    
    var figure = img.parentElement
    figure.style.width = width
    figure.style.height = height
    figure.style.background = 'url("' + img.getAttribute('src') + '") no-repeat'
    figure.style['-webkit-background-size'] = 'cover'
    figure.style['-moz-background-size'] = 'cover'
    figure.style['-o-background-size'] = 'cover'
    figure.style['background-size'] = 'cover'
    figure.style['background-blend-mode'] = 'multiply'
    figure.style['background-color'] = '#F5F5F5'
    figure.style.overflow = 'hidden'

    var caption = figure.querySelector('figcaption')
    if (caption) {
      caption.style.marginTop = '100px'
    }

    img.style.opacity = 0
    console.log(img,width, height)
  })
})
