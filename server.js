const find = require('lodash').find
const redirects = require('./lib/redirects')
const chipper = require('chipper')

var app = require('./lib/app')
var pages = {}

chipper(__dirname, function(err, _pages) {
  pages = _pages
  console.log(Object.keys(pages))
  app.listen(app.get('port'), function () {
    console.log('listening on localhost:' + app.get('port'))
  })
})

app.get('/', function (req, res) {
  res.render('home', {
    pages: pages
  })
})

app.get('/*', function (req, res) {

  if (req.path in redirects) {
    return res.redirect(301, redirects[req.path])
  }

  console.log(req.path)

  var page = pages[req.path]

  if (!page) {
    return res.status(404).render('404', {
      url: req.url,
      pageId: 'fourohfour',
    })
  }

  res.render('page', {
    page: page,
    pages: pages,
  })

})
