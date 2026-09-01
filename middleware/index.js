module.exports = function (app) {
  app.use(require('./redirects'))
  app.use(require('./trailing-slash'))
  app.use(require('./load-pages'))
  app.use(require('./rss'))
  app.use(require('./sitemap'))
  app.use(require('./robots'))
  app.use(require('./llms'))
  app.use(require('./llms-full'))
  app.use(require('./inspect'))
  app.use(require('./render-page'))
  app.use(require('./static'))
  return app
}
