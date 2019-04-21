import Express from 'express'
import { Article } from '../db/models'

const router = Express.Router()

router.get('/:id?', async (req, res, next) => {
  if (!req.params.id) return next()

  const article = await Article.findByPk(req.params.id)
  res.json(article)
})

router.get('/', async (req, res) => {
  const articles = await Article.findAll()
  res.json(articles)
})

router.post('/', async (req, res) => {
  const {
    topic,
    application,
    description,
    expirationDate,
    activeDate,
    link1,
    link2
  } = req.body

  const { id } = await Article.create({
    topic,
    application,
    description,
    expirationDate,
    activeDate,
    link1,
    link2
  })
  res.status(201).json({ id })
})

router.put('/', async (req, res) => {
  let {
    id,
    topic,
    application,
    activeDate,
    expirationDate,
    description,
    link1,
    link2
  } = req.body

  // random db thing
  if (!expirationDate) expirationDate = null

  const result = await Article.upsert({
    id,
    topic,
    application,
    activeDate,
    expirationDate,
    description,
    link1,
    link2
  })

  res.status(200).send({})
})

router.delete('/:id', async (req, res) => {
  const deleted = await Article.destroy({
    where: {
      id: req.params.id
    }
  })
  res.status(204).send()
})

export default router
