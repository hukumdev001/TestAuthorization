import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Article, ArticleHistory } from '@@types/Article';
import { API } from '@config/axios';
import ArticleSidebar from '@components/article/ArticleSidebar';

export default function Details() {
  const [article, setArticle] = useState<Article | null>(null);
  const [articleHistory, setArticleHistory] = useState<ArticleHistory[] | null>(
    null
  );
  const [error, setError] = useState(false);
  const { slug } = useParams();

  const getArticle = async (slug: string) => {
    try {
      const res = await API.get(`/articles/${slug}`);
      setArticle(res.data.article);
      setArticleHistory(res.data.articleHistories);
    } catch (err) {
      setError(true);
    }
  };

  const restoreHistory = async (historyId: string, articleId: string) => {
    const res = await API.post(
      `/articles/restoreHistory/${articleId}/${historyId}`
    );
    return getArticle(res.data.slug);
  };

  useEffect(() => {
    getArticle(slug || '');
  }, [slug]);

  if (error) return <div>Error</div>;
  if (!article) return <div>Loading...</div>;
  return (
    <>
      <div className='dark:bg-gray-900'>
        <div className='mx-auto container w-full flex md:flex-row flex-col justify-between px-6 lg:px-0'>
          <div className='flex flex-col justify-start items-start lg:w-3/5 px-2 lg:px-0'>
            <div className='md:mt-3'>
              <p className='text-gray-800 dark:text-white lg:text-4xl text-3xl font-extrabold leading-9'>
                {article.title}
              </p>
            </div>
            <div>
              <p className='lg:text-sm text-xs text-gray-600 dark:text-gray-300 font-medium leading-none pt-2'>
                {article.authorName}
              </p>
            </div>
            <div className='grid grid-cols-2 mt-8 gap-y-6'>
              <div>
                <p className='text-gray-800 dark:text-white text-sm lg:text-base font-medium leading-none'>
                  Published On:{' '}
                  <span className='font-semibold md:font-bold'>
                    {article.publishedOn}
                  </span>
                </p>
              </div>
              <div>
                <p className='text-gray-800 dark:text-white text-sm lg:text-base font-medium leading-none'>
                  {/* Edited: */}
                  <span className='font-semibold md:font-medium'>
                    {/* {article.edited} times */}
                  </span>
                </p>
              </div>
              <div>
                <p className='text-gray-800 dark:text-white text-sm lg:text-base font-medium leading-none'>
                  Edited:{' '}
                  <span className='font-semibold md:font-bold'>
                    {article.edited} Times
                  </span>
                </p>
              </div>
            </div>
            <div className='mx-auto container w-full flex xl:flex-row flex-col justify-between items-start mt-12 px-6 lg:px-0'>
              <div className='flex flex-col justify-start items-start px-3'>
                <div>
                  {article.featured_image && (
                    <img
                      className='w-full'
                      src={article.featured_image}
                      alt={article.title}
                    />
                  )}
                </div>
                <div
                  className='mt-8'
                  dangerouslySetInnerHTML={{ __html: article.description }}
                ></div>
              </div>
            </div>
          </div>
          <ArticleSidebar
            articleHistory={articleHistory}
            restoreHistory={restoreHistory}
          />
        </div>
      </div>
    </>
  );
}
