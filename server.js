const express = require('express')
const port = Number(process.env.PORT) || 4000
const app = express()

require('./middleware')(app)

if (!module.parent) {
  const server = require('http').createServer(app)
  server.listen(port, () => console.log(`app running on http://localhost:${port}`))
    .on('error', () => server.close())
}

module.exports = app
