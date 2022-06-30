import { takeEvery, call, put } from 'redux-saga/effects';
import * as ActionTypes from '@constants/actionTypes';
import { API } from '@config/axios';
import { Comment } from '../../@types/Comment';

export function* createComment(action: {
  type: string;
  payload: { comment: Comment; articleSlug: string };
}) {
  try {
    yield call(addCommentService, action.payload.comment);
    yield put({
      type: ActionTypes.Publisher.GET_ARTICLE,
      payload: action.payload.articleSlug,
    });
  } catch (e) {}
}

async function addCommentService(data: Comment) {
  const res = await API.post('/comments/create', data);
  return res.data;
}

export function* commentWatcher() {
  yield takeEvery(ActionTypes.Comment.CREATE_COMMENT, createComment);
}
