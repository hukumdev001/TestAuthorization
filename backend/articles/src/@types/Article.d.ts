export interface Article {
  id?: string
  title: string
  description: string
  keywords: string
  metaDesc: string
  slug: string
  deletedAt?: null | Date
  createdBy?: string
  edited?: number
  deletedBy?: string
  authorName?: string
  featured_image?: string
}

export interface ArticleHistory extends Article {
  articleId: string
  updatedBy: string
}
