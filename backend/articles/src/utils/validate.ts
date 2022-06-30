import { validationResult, checkSchema, Schema } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

interface ErrorType {
  param: string
  msg: string
}
interface extractedErrorsType {
  [key: string]: string[]
}
export default (scheme: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(checkSchema(scheme).map((validation) => validation.run(req)))
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors: extractedErrorsType = {}
    const keys: string[] = []
    errors.array().forEach((err: ErrorType) => {
      if (!keys.includes(err.param)) {
        keys.push(err.param)
        extractedErrors[err.param] = [err.msg]
        return
      }
      extractedErrors[err.param].push(err.msg)
    })

    return res.status(422).json({
      errors: extractedErrors,
    })
  }
}
