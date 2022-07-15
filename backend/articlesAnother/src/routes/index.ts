import { Router } from 'express'
// import client from '../utils/authClient'
// import articleRouter from './articleRouter'
// import commentRouter from './commentRouter'
// import homeRouter from './homeRouter'
import axios from 'axios'

const routes = Router()

// routes.use('/articles', articleRouter)
// routes.use('/comments', commentRouter)
// routes.use('/', homeRouter)

routes.get('/test', async () => {
  try {
    const response = await axios.get(
      `https://ohju954u00.execute-api.us-east-1.amazonaws.com/v1/permissions/`
    )

    console.log('resoons', response)
    return response.data
  } catch (err) {
    console.log('console', err)
  }
})

export default routes
