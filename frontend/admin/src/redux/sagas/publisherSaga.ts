import { takeEvery, put, call } from 'redux-saga/effects';
import * as ActionTypes from '@constants/actionTypes';
import { API } from '@config/axios';
import { Article } from '../../@types/Article';

export function* getArticles() {
  try {
    const articles: Article[] = yield call(getArticlesService);
    yield put({ type: ActionTypes.Publisher.SET_ARTICLES, payload: articles });
  } catch (err) {}
}

async function getArticlesService() {
  const res = await API.get('/');
  return res.data;
}

export function* getArticleBySlug(action: { type: string; payload: string }) {
  try {
    const article: Article = yield call(
      getArticleBySlugService,
      action.payload
    );
    yield put({ type: ActionTypes.Publisher.SET_ARTICLE, payload: article });
  } catch (err) {}
}

async function getArticleBySlugService(slug: string) {
  const res = await API.get(`/${slug}`);
  return res.data;
}

// export function* restoreHistory(action: {
//   type: string;
//   payload: { historyId: string; articleId: string };
// }) {
//   try {
//     const article: Article = yield call(
//       restoreArticleHistory,
//       action.payload.historyId,
//       action.payload.articleId
//     );
//   } catch (err) {}
// }

async function restoreArticleHistory(historyId: string, articleId: string) {
  const res = await API.post(
    `/articles/restoreHistory/${articleId}/${historyId}`
  );
  return res.data;
}

export function* publisherWatcher() {
  yield takeEvery(ActionTypes.Publisher.GET_ARTICLES, getArticles);
  yield takeEvery(ActionTypes.Publisher.GET_ARTICLE, getArticleBySlug);
  // yield takeEvery(ActionTypes.Publisher.RESTORE_HISTORY, restoreHistory);
}
