import { Schema } from 'express-validator'

export const articleValidation: Schema = {
  title: {
    notEmpty: {
      errorMessage: 'title is required',
    },
  },
  slug: {
    notEmpty: {
      errorMessage: 'slug is required',
    },
    custom: {
      options(value: string) {
        return /^[a-z](-?[a-z])*$/.test(value)
      },
      errorMessage: 'Invalid Slug',
    },
  },
  keywords: {
    notEmpty: {
      errorMessage: 'Meta keywords is required for SEO',
    },
  },
  metaDesc: {
    notEmpty: {
      errorMessage: 'Meta Description is required for SEO',
    },
  },
  description: {
    notEmpty: {
      errorMessage: 'Description is required',
    },
  },
  featured_image: {
    notEmpty: {
      errorMessage: 'A feature Image will help the article stand out',
    },
  },
}
