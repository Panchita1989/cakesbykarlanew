const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const logger = require('morgan')
const connectDB = require('./config/database')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const cakeRoutes = require('./routes/cake')
const orderRoutes = require('./routes/order')
const contactRoutes = require('./routes/message')
const { v4: uuidv4 } = require('uuid')
const cookieParser = require('cookie-parser')



require('dotenv').config({path: './config/.env'})

require('./config/passport')(passport)

connectDB()

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use(logger('dev'))

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(
  session({
    secret: process.env.SESSION_SECRET,      // Cookie-Signatur
    resave: false,                            // Nur speichern, wenn sich was ändert
    saveUninitialized: false,                 // Nur speichern, wenn etwas drinsteht
    cookie:{
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_STRING,        // Verbindung zur MongoDB
      ttl: 14 * 24 * 60 * 60,                 // Session läuft nach 14 Tagen ab (optional)
    })
  })
)

app.use((req, res, next) => {
  if (!req.cookies.guestId && !req.user) {
    const guestId = uuidv4()
    res.cookie('guestId', guestId, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1 // 1 Tag gültig
    })
    req.guestId = guestId
  } else {
    req.guestId = req.cookies.guestId
  }
  next()
})

app.use(passport.initialize())
app.use(passport.session())

app.use('/user', authRoutes)
app.use('/cakes', cakeRoutes)
app.use('/checkout', orderRoutes);
app.use('/contact', contactRoutes)



app.listen(process.env.PORT, ()=> {
    console.log('Server is running, you better catch it!')
})