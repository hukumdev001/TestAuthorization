import React, { useState, useEffect, Suspense } from 'react';
import * as ActionTypes from '@constants/actionTypes';

import Form from '@components/article/Form';
import { Article } from '@@types/Article';
import { useParams } from 'react-router-dom';
import { API } from '@config/axios';

export default function Edit() {
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState(false);

  const getArticle = async (slug: string) => {
    try {
      const res = await API.get(`/articles/${slug}`);
      setArticle(res.data.article);
    } catch (err) {
      setError(true);
    }
  };
  const { slug } = useParams();
  useEffect(() => {
    getArticle(slug || '');
  }, [slug]);

  if (error) return <div>Error</div>;
  if (!article) return <div>Loading...</div>;

  return (
    <Form
      edit={true}
      article={article}
      action={ActionTypes.Article.UPDATE_ARTICLE}
    />
  );
}
