export interface Rating {
  id?: string
  rating: number
  email: string //randomly generated if not provided
  ipAddress: string // for tracking spams
  articleId: string
}
