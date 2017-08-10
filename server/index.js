const express = require('express')
const path = require('path')
const app = express()
const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)

app.use(staticMiddleware)

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
