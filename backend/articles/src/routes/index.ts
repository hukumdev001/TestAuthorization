import { Router } from 'express'
import { checkPermissions } from '../middlewares/checkAuth'
import articleRouter from './articleRouter'
import commentRouter from './commentRouter'
import homeRouter from './homeRouter'

const routes = Router()

routes.use('/articles', checkPermissions(['article-create', 'article-read', 'article-update', 'article-delete']), articleRouter)
routes.use('/comments', checkPermissions(['comments-create', 'comments-read', 'comments-update', 'comments-delete']), commentRouter)
routes.use('/', homeRouter)

export default routes
