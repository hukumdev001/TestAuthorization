import * as ActionTypes from '@constants/actionTypes';
import { Dispatch } from 'redux';
import { Article } from '../../@types/Article';

export const getArticle = (data: any) => {
  return {
    type: ActionTypes.Article.GET_ARTICLE,
    payload: data,
  };
};

export const createArticle = (data: Article) => (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.Article.CREATE_ARTICLE,
    payload: data,
  });
};
