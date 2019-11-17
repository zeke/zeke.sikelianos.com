// `?inspect` query param for debugging request context

const { get } = require('lodash')

module.exports = function (req, res, next) {  
  if ('inspect' in req.query) {
    if (req.query.inspect.length > 1) {
      // deep reference: ?inspect=page.permalinks
      return res.json(get(req.context, req.query.inspect))
    } else {
      // dump all the keys: ?inspect
      return res.json(req.context)
    }
  }
  return next()
}
