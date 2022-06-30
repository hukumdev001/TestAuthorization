import React from "react";
import { Link } from "react-router-dom";
import { Article as ArticleType } from "@@types/Article";

const Article = ({ article }: { article: ArticleType }) => {
  return (
    <>
      <div className="my-4 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2">
        <Link to={`/article/${article.slug}`}>
          <div>
            <div className="relative">
              <img
                src={
                  article.featured_image || "https://i.ibb.co/HxkBZQM/img-1.png"
                }
                alt="stairs"
              />
              <div className="bg-white absolute top-0 left-0">
                <p className="text-base leading-4 py-3 px-5 text-gray-800">
                  {article.authorName}
                </p>
              </div>
            </div>
            <p className="text-base font-light leading-4 text-gray-800 mt-6">
              {article.publishedOn}
            </p>
            <h1 className="text-2xl font-semibold leading-7 sm:pr-20 mt-2 text-gray-800">
              {article.title}
            </h1>
            <p
              className="text-base leading-normal mt-4 sm:pr-20 md:pr-10 text-gray-600"
              dangerouslySetInnerHTML={{
                __html: article.description.substring(0, 250),
              }}
            ></p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Article;
