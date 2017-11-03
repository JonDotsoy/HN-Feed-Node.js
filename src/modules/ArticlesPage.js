import {Router} from 'express'
import moment from 'moment'
export const router = Router()

router.get('/', async (req, res, next) => {
  const {Article} = req.configs.db

  let articles
  try {
    articles = await Article.find({__removed: false}).sort({ created_at: -1 })
  } catch (ex) {
    next(ex)
  }

  articles.forEach(article => {
    const d = moment(article.created_at)
    article.__good_date = d.fromNow()
    article.__good_title = d.format('LLLL')
  })

  // res.json({articles})
  res.render('articles', {articles})
})

router.post('/article/:idArticle', async (req, res, next) => {
  const {Article} = req.configs.db
  const {idArticle} = req.params

  try {
    await Article.remove({objectID: idArticle})
    res.json({
      ok: true
    })
  } catch (ex) {
    next(ex)
  }
})
