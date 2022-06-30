import express, { Request, Response, NextFunction, Application, ErrorRequestHandler } from 'express'
import createHttpError from 'http-errors'
import { config } from 'dotenv'
import cors from 'cors'

import mongoDB from './db'
mongoDB.init({}) // init mongo before importing routes for registering models

import routes from './routes'

config()

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(routes)

app.use((req: Request, res: Response, next: NextFunction) => {
  console.warn('not found', req.url)
  next(new createHttpError.NotFound())
})

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    message: err.message,
  })
}
app.use(errorHandler)

const PORT = Number(process.env.PORT)

app.listen(PORT, () => console.log(`Server running in port ${PORT}`))
