const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const logger = require('morgan')
const connectDB = require('./config/database')
const cors = require('cors')
//const mainRoutes = require('./routes/main')
const authRoutes = require('./routes/auth')
//const cartRoutes = require('./routes/cart')

require('dotenv').config({path: './config/.env'})

require('./config/passport')(passport)

connectDB()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(logger('dev'))

app.use(cors())

app.use(
  session({
    secret: process.env.SESSION_SECRET,      // Cookie-Signatur
    resave: false,                            // Nur speichern, wenn sich was ändert
    saveUninitialized: false,                 // Nur speichern, wenn etwas drinsteht
    store: MongoStore.create({
      mongoUrl: process.env.DB_STRING,        // Verbindung zur MongoDB
      ttl: 14 * 24 * 60 * 60,                 // Session läuft nach 14 Tagen ab (optional)
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 Tag gültig
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/user', authRoutes)
//app.use('/cart', cartRoutes)

app.listen(process.env.PORT, ()=> {
    console.log('Server is running, you better catch it!')
})