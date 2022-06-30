import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Comments from "@components/Comments";
import * as ActionTypes from "@constants/actionTypes";
import PopularArticles from "@components/PopularArticles";

export default function ArticleDetails() {
  const dispatch = useDispatch();

  const article = useSelector((state: any) => state.reducer.publisher.article);

  const { slug } = useParams();

  const renderStars = (n: number) => {
    let stars = [];
    for (let i = 1; i <= n; ++i) {
      stars.push(
        <svg
          className="mx-1 w-4 h-4 fill-current text-yellow-500 "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          key={"ad" + i}
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }
    for (let i = n; i < 5; i++) {
      stars.push(
        <svg
          className="mx-1 w-4 h-4 fill-current text-gray-400 "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          key={"ad_re" + i}
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }
    return stars;
  };

  useEffect(() => {
    dispatch({ type: ActionTypes.Publisher.GET_ARTICLE, payload: slug });
  }, [slug]);

  if (!article) return <>Error</>;

  return (
    <>
      <div className="dark:bg-gray-900">
        <div className="mx-auto container w-full flex md:flex-row flex-col justify-between px-6 lg:px-0">
          <div className="flex flex-col justify-start items-start lg:w-3/5 px-2 lg:px-0">
            <div className="md:mt-3">
              <p className="text-gray-800 dark:text-white lg:text-4xl text-3xl font-extrabold leading-9">
                {article.title}
              </p>
            </div>
            <div>
              <p className="lg:text-sm text-xs text-gray-600 dark:text-gray-300 font-medium leading-none pt-2">
                {article.authorName}
              </p>
            </div>
            <div className="grid grid-cols-1 mt-8 gap-y-6">
              <div>
                <p className="text-gray-800 dark:text-white text-sm lg:text-base font-medium leading-none">
                  Published On:{" "}
                  <span className="font-semibold md:font-bold">
                    {new Date(article.createdAt).toDateString()}
                  </span>
                </p>
              </div>
              <div>
                <div className="text-gray-800 dark:text-white text-sm lg:text-base font-medium leading-none">
                  <div className="flex justify-start items-center">
                    <h4>Ratings:</h4>
                    <div className="flex items-center mt-3 ml-3 mb-4">
                      {renderStars(article.averageRating)}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-gray-800 dark:text-white text-sm lg:text-base font-medium leading-none">
                  Edited:{" "}
                  <span className="font-semibold md:font-bold">
                    {article.edited} times
                  </span>
                </p>
              </div>
            </div>
            <div className="mx-auto container w-full flex xl:flex-row flex-col justify-between items-start mt-12 px-6 lg:px-0">
              <div className="flex flex-col justify-start items-start px-3">
                <div>
                  {article.featured_image && (
                    <img
                      className="w-full"
                      src={article.featured_image}
                      alt={article.title}
                    />
                  )}
                </div>
                <div
                  className="mt-8 text-justify"
                  dangerouslySetInnerHTML={{ __html: article.description }}
                ></div>
              </div>
            </div>
            <Comments
              articleId={article._id}
              comments={article.comments || []}
            />
          </div>
          <div className="lg:w-1/3">
            <PopularArticles />
          </div>
        </div>
      </div>
    </>
  );
}
