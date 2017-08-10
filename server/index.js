const express = require('express')
const path = require('path')
const app = express()
const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)

app.use(staticMiddleware)
