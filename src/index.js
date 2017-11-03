import 'dotenv/config'
import url from 'url'
import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import ArticleSchema from './schemas/Article'

// Declare configs
const configs = { db: {} }

// Configure mongo connection
mongoose.Promise = Promise

// Prepare connection with mongo
configs.db.connection = mongoose.createConnection (url.format({
  protocol: 'mongodb',
  slashes: true,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  hostname: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '27017',
  pathname: process.env.DB_NAME || 'practice',
}))

// Create the models
configs.db.Article = configs.db.connection.model('articles', ArticleSchema)

// Configure APP Express
const app = express()

app.use(async (req, res, next) => {
  try {
    await configs.db.connection
  } catch (ex) {
    next(new Error(ex))
  }
  req.configs = configs
  next()
})

// configure pug engine
app.set('view engine', 'pug')
app.set('views', path.resolve(__dirname, 'resources/views'))

// allow links to resources (bootstrap, jquery, popper)
app.use( express.static( path.resolve( path.dirname( require.resolve('bootstrap') ), '..' ) )   )
app.use( '/js', express.static( path.dirname( require.resolve('jquery') ) ) )
app.use( '/js', express.static( path.dirname( require.resolve('popper.js') ) ) )

// Load modules app
import * as fetching from './modules/fetching'
import * as ArticlesPage from './modules/ArticlesPage'
fetching.setup(configs)
app.use(fetching.router)
app.use(ArticlesPage.router)

// Listen server
const server = app.listen(process.env.PORT||'3000', process.env.HOST||'::', function ready () {
  const {address, port} = server.address()

  console.log(`Server ready on ${url.format({
    protocol: 'http',
    slashes: true,
    hostname: address,
    port,
  })}`)
})
