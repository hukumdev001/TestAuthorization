import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as ActionTypes from '@constants/actionTypes';
import Table from '@components/Table';

const listItems = [
  {
    title: 'Title',
    key: 'title',
  },
  {
    title: 'Published On',
    key: 'publishedOn',
  },
  {
    title: 'Author',
    key: 'authorName',
  },
];

export default function Article() {
  const dispatch = useDispatch();
  const articles = useSelector((state: any) => state.reducer.article.articles);

  React.useEffect(() => {
    dispatch({ type: ActionTypes.Article.GET_ARTICLE });
  }, []);

  return (
    <Table title='All Articles' listItems={listItems} data={articles}></Table>
  );
}
