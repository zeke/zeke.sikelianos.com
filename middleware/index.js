module.exports = function (app) {
  app.use(require('./load-pages'))
  app.use(require('./rss'))
  app.use(require('./inspect'))
  app.use(require('./render-page'))
  app.use(require('./styles'))
  app.use(require('./static'))
  return app
}
