const find = require('lodash').find
const redirects = require('./lib/redirects')
const juicer = require('juicer')

var app = require('./lib/app')
var content = {}

juicer(__dirname, function(err, _content) {
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
  var href = req.path.replace(/\/$/, '')
  console.log(href)

  if (href in redirects) {
    return res.redirect(301, redirects[href])
  }

  var page = content.pages[href]

  if (!page) {
    return res
      .status(404)
      .render('404', {url: req.url, pageId: 'fourohfour',})
  }

  res.render('page', {
    page: page,
    pages: content.pages,
    sections: content.sections
  })

})
