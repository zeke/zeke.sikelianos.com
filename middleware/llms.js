const path = require('path')

const llmsPath = path.join(__dirname, '../llms.txt')

module.exports = function llms (req, res, next) {
  if (req.path !== '/llms.txt') return next()
  return res.sendFile(llmsPath)
}
