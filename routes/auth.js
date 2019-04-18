import Express from 'express'
const router = Express.Router()

router.post('/login', () => {
  passport.authenticate('local', { failureRedirect: '/login' }),
    res.send('logged in')
})

router.put('/logout', (req, res) => {
  res.send('logged out')
})

router.post('/register', (req, res) => {
  res.send('created')
})

export default router
