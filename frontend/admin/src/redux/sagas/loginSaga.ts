import { takeEvery, put, call } from 'redux-saga/effects';
import * as ActionTypes from '@constants/actionTypes';
import { GuestAPI } from '@config/axios';

export function* login(action: {
  type: string;
  payload: { email: string; password: string };
}) {
  try {
    yield put({
      type: ActionTypes.Auth.LOGIN_ERROR,
      payload: null,
    });
    yield put({
      type: ActionTypes.Auth.LOADING,
      payload: true,
    });
    const data: { token: string; roles: string[] } = yield call(
      loginService,
      action.payload
    );
    yield put({ type: ActionTypes.Auth.SAVE_LOGIN, payload: data });
  } catch (e: any) {
    yield put({
      type: ActionTypes.Auth.LOGIN_ERROR,
      payload: e.response.data.message,
    });
  } finally {
    yield put({
      type: ActionTypes.Auth.LOADING,
      payload: false,
    });
  }
}

export function* oAuthLogin(action: {
  type: string;
  payload: { code: string; service: string };
}) {
  try {
    yield put({
      type: ActionTypes.Auth.LOADING,
      payload: true,
    });
    const data: { token: string; roles: string[] } = yield call(
      oAuthLoginService,
      action.payload
    );

    yield put({
      type: ActionTypes.Auth.SAVE_LOGIN,
      payload: data,
    });
  } catch (e: any) {
    yield put({
      type: ActionTypes.Auth.LOGIN_ERROR,
      payload: e.response.data.message,
    });
  } finally {
    yield put({
      type: ActionTypes.Auth.LOADING,
      payload: false,
    });
  }
}

async function loginService(data: { email: string; password: string }) {
  try {
    const res = await GuestAPI.post('/auth/login', data);
    return res.data;
  } catch (e: any) {
    throw e;
  }
}

async function oAuthLoginService({
  code,
  service,
}: {
  code: string;
  service: string;
}) {
  const res = await GuestAPI.get(`/auth/${service}-callback?code=${code}`);
  return res.data;
}

export function* loginWatcher() {
  yield takeEvery(ActionTypes.Auth.LOGIN, login);
  yield takeEvery(ActionTypes.Auth.OAUTH_LOGIN, oAuthLogin);
}
