const find = require('lodash').find
const redirects = require('./lib/redirects')
const chipper = require('chipper')

var app = require('./lib/app')
var content = {}

chipper(__dirname, function(err, _content) {
  content = _content
  app.listen(app.get('port'), function () {
    console.log('listening on localhost:' + app.get('port'))
  })
})

app.get('/', function (req, res) {
  res.render('home', content)
})

app.get('/content.json', function (req, res) {
  res.json(content)
})

app.get('/*', function (req, res) {
  console.log(req.path)

  if (req.path in redirects) {
    return res.redirect(301, redirects[req.path])
  }

  var page = content.pages[req.path]

  if (!page) {
    return res.status(404).render('404', {
      url: req.url,
      pageId: 'fourohfour',
    })
  }

  res.render('page', {
    page: page,
    pages: content.pages,
    sections: content.sections
  })

})
