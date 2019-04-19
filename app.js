import Express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import logger from 'morgan'
import session from 'express-session'
import passport from 'passport'
import authRouter from './routes/auth'
import articlesRouter from './routes/articles'

const app = Express()

app.use(logger('dev'))
app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(Express.static(path.join(__dirname, 'client/build')))
app.use(Express.static(path.join(__dirname, 'public')))
app.use(
  session({ secret: process.env.SECRET, resave: true, saveUninitialized: true })
)
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)
app.use('/api/articles', articlesRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})
export default app
