import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Article from "@components/Article";
import * as ActionTypes from "@constants/actionTypes";
import { Article as ArticleType } from "@@types/Article";

export default function Home() {
  const dispatch = useDispatch();
  const articles: ArticleType[] = useSelector(
    (state: any) => state.reducer.publisher.articles
  );

  console.log(articles);

  React.useEffect(() => {
    dispatch({ type: ActionTypes.Publisher.GET_ARTICLES });
  }, []);
  return (
    <>
      <>
        {articles.map((article, index) => (
          <Article article={article} key={index} />
        ))}
      </>
    </>
  );
}
