import { Router } from 'express'
import articleRouter from './articleRouter'
import commentRouter from './commentRouter'
import homeRouter from './homeRouter'

const routes = Router()

routes.use('/articles', articleRouter)
routes.use('/comments', commentRouter)
routes.use('/', homeRouter)



export default routes
