import { takeEvery, put, call } from 'redux-saga/effects';
import * as ActionTypes from '@constants/actionTypes';
import { API } from '@config/axios';
import { Article } from '../../@types/Article';

import { history } from '../../App';

export function* getArticle() {
  try {
    const articles: Article[] = yield call(getArticleService);
    yield put({ type: ActionTypes.Article.SET_ARTICLE, payload: articles });
  } catch (err) {}
}

export function* createArticle(action: { type: string; payload: Article }) {
  try {
    yield call(createArticleService, action.payload);
    yield put({ type: ActionTypes.Article.GET_ARTICLE });
    yield put({ type: ActionTypes.Article.SET_ERRORS, payload: [] });
    history.push('/admin/articles');
  } catch (e: any) {
    if (e.response.status == 422) {
      yield put({
        type: ActionTypes.Article.SET_ERRORS,
        payload: e.response.data.errors,
      });
    }
  }
}

export function* updateArticle(action: { type: string; payload: Article }) {
  try {
    yield call(updateArticleService, action.payload);
    yield put({ type: ActionTypes.Article.GET_ARTICLE });
    yield put({ type: ActionTypes.Article.SET_ERRORS, payload: [] });
    history.push('/admin/articles');
  } catch (e: any) {
    if (e.response.status == 422) {
      yield put({
        type: ActionTypes.Article.SET_ERRORS,
        payload: e.response.data.errors,
      });
    }
  }
}

export function* deleteArticle(action: { type: string; payload: string }) {
  try {
    yield call(deleteArticleService, action.payload);
    yield put({ type: ActionTypes.Article.GET_ARTICLE });
  } catch (e) {}
}

async function createArticleService(data: Article) {
  const res = await API.post('/articles/create', data);
  return res.data;
}

async function updateArticleService(data: Article) {
  const res = await API.patch(`/articles/update/${data._id}`, data);
  return res.data;
}

async function deleteArticleService(id: string) {
  const res = await API.delete(`/articles/${id}`);
  return res.data;
}

async function getArticleService() {
  const res = await API.get('/articles');
  return res.data;
}

export function* articleWatcher() {
  yield takeEvery(ActionTypes.Article.GET_ARTICLE, getArticle);
  yield takeEvery(ActionTypes.Article.CREATE_ARTICLE, createArticle);
  yield takeEvery(ActionTypes.Article.UPDATE_ARTICLE, updateArticle);
  yield takeEvery(ActionTypes.Article.DELETE_ARTICLE, deleteArticle);
}
