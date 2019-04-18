import Express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import logger from 'morgan'
import session from 'express-session'
import passport from 'passport'
import authRouter from './routes/auth'
import articlesRouter from './routes/articles'
import indexRouter from './routes/index'

const app = Express()

app.use(logger('dev'))
app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(Express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'cats' }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/articles', articlesRouter)
export default app
